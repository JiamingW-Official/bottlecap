"""Celery Beat scheduled tasks."""

from __future__ import annotations

import logging
from datetime import datetime, timezone

from app.dependencies import get_supabase
from app.scrapers.google_trends import GoogleTrendsScraper
from app.tasks.celery_app import celery_app

logger = logging.getLogger(__name__)

# Keywords to track for trending products
TRENDING_KEYWORDS = [
    "custom phone case",
    "reusable water bottle",
    "LED strip lights",
    "portable blender",
    "wireless earbuds",
    "yoga mat",
    "standing desk",
    "air purifier",
    "smart home gadget",
    "eco friendly packaging",
    "pet accessories",
    "fitness tracker",
    "portable charger",
    "travel organizer",
    "desk accessories",
]


@celery_app.task(name="app.tasks.scheduled.refresh_trending")
def refresh_trending() -> dict:
    """Daily task: scrape Google Trends for trending product keywords."""
    scraper = GoogleTrendsScraper()
    sb = get_supabase()
    updated = 0
    errors = 0

    for keyword in TRENDING_KEYWORDS:
        try:
            data = scraper.scrape(keyword)

            row = {
                "keyword": keyword,
                "trend_score": data.get("average_interest"),
                "yoy_growth": (
                    f"{data['yoy_growth_pct']:+.1f}%"
                    if data.get("yoy_growth_pct") is not None
                    else None
                ),
                "trend_data": data,
                "scraped_at": datetime.now(timezone.utc).isoformat(),
            }

            # Upsert by keyword
            sb.table("trending_products").upsert(
                row,
                on_conflict="keyword",
            ).execute()

            updated += 1

        except Exception:
            logger.warning("Failed to refresh trend for %r", keyword, exc_info=True)
            errors += 1

    scraper.close()

    logger.info("refresh_trending: updated=%d, errors=%d", updated, errors)
    return {"updated": updated, "errors": errors}
