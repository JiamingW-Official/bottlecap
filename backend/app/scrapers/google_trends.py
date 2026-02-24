"""Google Trends scraper using pytrends."""

from __future__ import annotations

import logging
from typing import Any

from pytrends.request import TrendReq

from app.models.scraping import TrendData
from app.scrapers.base import BaseScraper

logger = logging.getLogger(__name__)


class GoogleTrendsScraper(BaseScraper):
    source_name = "google_trends"
    timeout = 20.0

    def _scrape(self, keyword: str) -> dict[str, Any]:
        """Fetch Google Trends data for a keyword."""
        pytrends = TrendReq(hl="en-US", tz=360)
        pytrends.build_payload([keyword], timeframe="today 12-m", geo="US")

        # Interest over time
        iot_df = pytrends.interest_over_time()
        interest_over_time: list[dict[str, str | int]] = []
        average_interest: int | None = None
        yoy_growth: float | None = None

        if not iot_df.empty and keyword in iot_df.columns:
            series = iot_df[keyword]
            interest_over_time = [
                {"date": str(date.date()), "value": int(val)}
                for date, val in series.items()
            ]
            average_interest = int(series.mean())

            # YoY growth: compare last 3 months avg to first 3 months avg
            if len(series) >= 24:
                recent = series[-12:].mean()
                older = series[:12].mean()
                if older > 0:
                    yoy_growth = round(((recent - older) / older) * 100, 1)

        # Related queries
        related = pytrends.related_queries()
        related_queries: list[str] = []
        if keyword in related and related[keyword].get("top") is not None:
            top_df = related[keyword]["top"]
            related_queries = top_df["query"].tolist()[:10]

        # Regional interest
        region_df = pytrends.interest_by_region(resolution="COUNTRY", inc_low_vol=False)
        regional_interest: list[dict[str, str | int]] = []
        if not region_df.empty and keyword in region_df.columns:
            top_regions = region_df[keyword].sort_values(ascending=False).head(10)
            regional_interest = [
                {"region": region, "value": int(val)}
                for region, val in top_regions.items()
                if val > 0
            ]

        result = TrendData(
            keyword=keyword,
            interest_over_time=interest_over_time,
            average_interest=average_interest,
            yoy_growth_pct=yoy_growth,
            related_queries=related_queries,
            regional_interest=regional_interest,
        )

        logger.info(
            "google_trends: %r avg_interest=%s yoy=%s",
            keyword[:30],
            average_interest,
            yoy_growth,
        )
        return result.model_dump()
