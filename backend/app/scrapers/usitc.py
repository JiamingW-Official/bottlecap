"""USITC tariff scraper using the HTS API (hts.usitc.gov)."""

from __future__ import annotations

import logging
from typing import Any

from app.models.scraping import TariffEntry
from app.scrapers.base import BaseScraper

logger = logging.getLogger(__name__)


class USITCScraper(BaseScraper):
    source_name = "usitc"
    timeout = 15.0

    BASE_URL = "https://hts.usitc.gov/api/search"

    def _scrape(self, hs_code: str) -> dict[str, Any]:
        """Look up tariff rates for an HS code."""
        # Clean HS code (remove dots for API query)
        clean_code = hs_code.replace(".", "").strip()

        resp = self.client.get(
            self.BASE_URL,
            params={"query": clean_code},
        )
        resp.raise_for_status()
        data = resp.json()

        results = data.get("results", [])
        if not results:
            logger.info("usitc: no results for HS %s", hs_code)
            return TariffEntry(
                hs_code=hs_code,
                description="No results found",
            ).model_dump()

        # Find the best match (most specific HS code)
        best = results[0]
        for r in results:
            hts_num = r.get("htsno", "")
            if hts_num.replace(".", "") == clean_code:
                best = r
                break

        # Extract rates
        general_rate = best.get("general", "")
        special_rate = best.get("special", "")
        other_rate = best.get("other", "")
        description = best.get("description", "")

        # Parse special rates into dict
        special_rates: dict[str, str] = {}
        if special_rate:
            # e.g., "Free (A,AU,BH,CA,CL,...)" or "2% (MA)"
            import re
            matches = re.findall(r"([^(]+)\(([^)]+)\)", special_rate)
            for rate_val, programs in matches:
                for prog in programs.split(","):
                    prog = prog.strip()
                    if prog:
                        special_rates[prog] = rate_val.strip()

        # Column 2 rate is typically the China-specific rate
        # In USITC data, "other" column often applies to non-NTR countries
        china_rate = other_rate if other_rate else None

        result = TariffEntry(
            hs_code=hs_code,
            description=description,
            general_rate=general_rate,
            china_rate=china_rate,
            special_rates=special_rates,
        )

        logger.info(
            "usitc: HS %s → general=%s, china=%s",
            hs_code,
            general_rate,
            china_rate,
        )
        return result.model_dump()
