"""Main analysis Celery task chain: scrape → enrich → Claude → save."""

from __future__ import annotations

import logging
from datetime import datetime, timezone

from celery import group

from app.config import get_settings
from app.models.product import ProductInput, AnalysisResult
from app.models.scraping import (
    ScrapedData,
    SupplierListing,
    TariffEntry,
    TradeVolume,
    TrendData,
    AmazonProduct,
)
from app.services.supabase import get_report, mark_processing, mark_failed, save_analysis
from app.services.claude import analyze_product, extract_product_name
from app.services.email import send_confirmation_email, send_report_ready_email
from app.services.progress import publish_progress_sync
from app.tasks.celery_app import celery_app

logger = logging.getLogger(__name__)


def _progress(report_id: str, step: str, progress: int, message: str) -> None:
    """Publish progress event to Redis."""
    try:
        redis_url = get_settings().redis_url
        publish_progress_sync(redis_url, report_id, step, progress, message)
    except Exception:
        logger.warning("Failed to publish progress", exc_info=True)


# ---------------------------------------------------------------------------
# Individual scraper tasks
# ---------------------------------------------------------------------------

@celery_app.task(name="app.tasks.analyze.scrape_alibaba", bind=True, max_retries=1)
def scrape_alibaba(self, query: str) -> list[dict] | None:
    try:
        from app.scrapers.alibaba import AlibabaScraper
        scraper = AlibabaScraper()
        result = scraper.scrape(query)
        scraper.close()
        return result
    except Exception as exc:
        logger.error("scrape_alibaba failed: %s", exc)
        return None


@celery_app.task(name="app.tasks.analyze.scrape_trends", bind=True, max_retries=1)
def scrape_trends(self, keyword: str) -> dict | None:
    try:
        from app.scrapers.google_trends import GoogleTrendsScraper
        scraper = GoogleTrendsScraper()
        result = scraper.scrape(keyword)
        scraper.close()
        return result
    except Exception as exc:
        logger.error("scrape_trends failed: %s", exc)
        return None


@celery_app.task(name="app.tasks.analyze.scrape_usitc", bind=True, max_retries=1)
def scrape_usitc(self, hs_code: str) -> dict | None:
    try:
        from app.scrapers.usitc import USITCScraper
        scraper = USITCScraper()
        result = scraper.scrape(hs_code)
        scraper.close()
        return result
    except Exception as exc:
        logger.error("scrape_usitc failed: %s", exc)
        return None


@celery_app.task(name="app.tasks.analyze.scrape_comtrade", bind=True, max_retries=1)
def scrape_comtrade(self, query: str) -> dict | None:
    try:
        from app.scrapers.comtrade import ComtradeScraper
        scraper = ComtradeScraper()
        result = scraper.scrape(query)
        scraper.close()
        return result
    except Exception as exc:
        logger.error("scrape_comtrade failed: %s", exc)
        return None


@celery_app.task(name="app.tasks.analyze.scrape_amazon", bind=True, max_retries=1)
def scrape_amazon(self, query: str) -> list[dict] | None:
    try:
        from app.scrapers.amazon import AmazonScraper
        scraper = AmazonScraper()
        result = scraper.scrape(query)
        scraper.close()
        return result
    except Exception as exc:
        logger.error("scrape_amazon failed: %s", exc)
        return None


# ---------------------------------------------------------------------------
# Main orchestration task
# ---------------------------------------------------------------------------

@celery_app.task(name="app.tasks.analyze.run_analysis", bind=True, max_retries=0)
def run_analysis(self, report_id: str) -> dict:
    """Full analysis pipeline: validate → scrape → Claude → save → email."""
    try:
        # 1. Fetch and validate report
        report = get_report(report_id)
        if not report:
            raise ValueError(f"Report {report_id} not found")

        if not report.is_paid:
            raise ValueError(f"Report {report_id} is not paid")

        if report.status != "pending":
            logger.warning("Report %s already %s, skipping", report_id, report.status)
            return {"status": "skipped", "reason": f"already {report.status}"}

        # 2. Mark as processing
        mark_processing(report_id)
        _progress(report_id, "starting", 5, "Starting your analysis...")

        # 3. Send confirmation email
        product_name = report.product_name or "Your Product"
        try:
            send_confirmation_email(report.user_email, product_name, report_id)
        except Exception:
            logger.warning("Failed to send confirmation email", exc_info=True)

        # 4. Scrape all sources in parallel
        _progress(report_id, "scraping", 10, "Searching Alibaba for suppliers...")

        query = report.product_description[:200]
        scrape_results = _run_scrapers_parallel(report_id, query)

        # 5. Build ScrapedData from results
        scraped_data = _build_scraped_data(scrape_results)

        # 6. Run Claude analysis with enriched prompt
        _progress(report_id, "analyzing", 55, "Analyzing market data with AI...")

        product_input = ProductInput(
            product_description=report.product_description,
            image_url=report.image_url,
            target_price=report.target_price,
            main_concern=report.main_concern,
            quantity=report.quantity,
            user_email=report.user_email,
        )

        _progress(report_id, "analyzing", 70, "Generating recommendations...")
        analysis_result = analyze_product(product_input, scraped_data)

        # 7. Save to Supabase
        _progress(report_id, "finalizing", 90, "Saving your report...")
        result_dict = analysis_result.model_dump(by_alias=True)
        save_analysis(report_id, result_dict)

        # 8. Send report-ready email
        _progress(report_id, "finalizing", 95, "Sending your report email...")
        try:
            send_report_ready_email(
                report.user_email,
                product_name,
                result_dict,
                report_id,
            )
        except Exception:
            logger.warning("Failed to send report-ready email", exc_info=True)

        _progress(report_id, "complete", 100, "Your report is ready!")

        return {"status": "complete", "report_id": report_id}

    except Exception as exc:
        logger.exception("Analysis failed for report %s", report_id)
        try:
            mark_failed(report_id)
        except Exception:
            logger.error("Failed to mark report as failed", exc_info=True)
        _progress(report_id, "error", 0, f"Analysis failed: {exc}")
        raise


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _run_scrapers_parallel(report_id: str, query: str) -> dict:
    """Run all scrapers in a Celery group and collect results."""
    # Dispatch all scraper tasks
    job = group(
        scrape_alibaba.s(query),
        scrape_trends.s(query),
        scrape_usitc.s(query[:10]),      # Use first part as rough HS code hint
        scrape_comtrade.s(query[:10]),
        scrape_amazon.s(query),
    )

    _progress(report_id, "scraping", 15, "Searching suppliers and market data...")

    result = job.apply_async()

    # Wait for all scrapers (with timeout)
    try:
        scraper_results = result.get(timeout=60, propagate=False)
    except Exception as exc:
        logger.warning("Scraper group timed out or failed: %s", exc)
        scraper_results = [None, None, None, None, None]

    _progress(report_id, "scraping", 50, "Market data collected!")

    return {
        "alibaba": scraper_results[0] if len(scraper_results) > 0 else None,
        "trends": scraper_results[1] if len(scraper_results) > 1 else None,
        "usitc": scraper_results[2] if len(scraper_results) > 2 else None,
        "comtrade": scraper_results[3] if len(scraper_results) > 3 else None,
        "amazon": scraper_results[4] if len(scraper_results) > 4 else None,
    }


def _build_scraped_data(results: dict) -> ScrapedData:
    """Convert raw scraper results into a ScrapedData model."""
    errors: dict[str, str] = {}

    # Alibaba
    suppliers = []
    if results.get("alibaba"):
        suppliers = [SupplierListing(**s) for s in results["alibaba"]]
    else:
        errors["alibaba"] = "No supplier data available"

    # Trends
    trends = None
    if results.get("trends"):
        trends = TrendData(**results["trends"])
    else:
        errors["google_trends"] = "Trend data unavailable"

    # USITC
    tariff = None
    if results.get("usitc"):
        tariff = TariffEntry(**results["usitc"])
    else:
        errors["usitc"] = "Tariff data unavailable"

    # Comtrade
    trade_volume = None
    if results.get("comtrade"):
        trade_volume = TradeVolume(**results["comtrade"])
    else:
        errors["comtrade"] = "Trade volume data unavailable"

    # Amazon
    amazon_products = []
    if results.get("amazon"):
        amazon_products = [AmazonProduct(**p) for p in results["amazon"]]
    else:
        errors["amazon"] = "Amazon market data unavailable"

    return ScrapedData(
        suppliers=suppliers,
        tariff=tariff,
        trade_volume=trade_volume,
        trends=trends,
        amazon_products=amazon_products,
        scraped_at=datetime.now(timezone.utc),
        errors=errors,
    )
