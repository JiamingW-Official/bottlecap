"""UN Comtrade trade data scraper using the public REST API."""

from __future__ import annotations

import logging
from typing import Any

from app.models.scraping import TradeVolume
from app.scrapers.base import BaseScraper

logger = logging.getLogger(__name__)


class ComtradeScraper(BaseScraper):
    source_name = "comtrade"
    timeout = 20.0

    BASE_URL = "https://comtradeapi.un.org/public/v1/preview/C/A/HS"

    def _scrape(self, query: str) -> dict[str, Any]:
        """Fetch trade volume data.

        Args:
            query: Format "HS_CODE" or "HS_CODE:REPORTER_CODE" (default reporter=842 USA).
        """
        parts = query.split(":")
        hs_code = parts[0].replace(".", "").strip()
        reporter_code = parts[1] if len(parts) > 1 else "842"  # 842 = USA

        # Use 4-digit HS code for broader results
        hs_4digit = hs_code[:4] if len(hs_code) >= 4 else hs_code

        resp = self.client.get(
            self.BASE_URL,
            params={
                "reporterCode": reporter_code,
                "cmdCode": hs_4digit,
                "flowCode": "M",  # Imports
                "partnerCode": "0",  # World (all partners)
                "period": "2024",
            },
        )
        resp.raise_for_status()
        data = resp.json()

        records = data.get("data", [])
        if not records:
            logger.info("comtrade: no data for HS %s", hs_code)
            return TradeVolume(hs_code=hs_code).model_dump()

        # Aggregate total import value
        total_import = sum(
            r.get("primaryValue", 0) or 0
            for r in records
            if r.get("partnerCode") == 0  # World total
        )

        # Get top partner countries
        partner_records = [
            r for r in records
            if r.get("partnerCode") != 0 and r.get("primaryValue")
        ]
        partner_records.sort(key=lambda r: r.get("primaryValue", 0), reverse=True)

        top_partners: list[dict[str, str | float]] = []
        for pr in partner_records[:10]:
            pct = (
                round(pr["primaryValue"] / total_import * 100, 1)
                if total_import > 0
                else 0
            )
            top_partners.append({
                "country": pr.get("partnerDesc", "Unknown"),
                "value_usd": pr.get("primaryValue", 0),
                "pct": pct,
            })

        result = TradeVolume(
            hs_code=hs_code,
            reporter="USA",
            year=2024,
            import_value_usd=total_import,
            top_partners=top_partners,
        )

        logger.info(
            "comtrade: HS %s → $%sM imports, %d partners",
            hs_code,
            round(total_import / 1e6, 1) if total_import else 0,
            len(top_partners),
        )
        return result.model_dump()
