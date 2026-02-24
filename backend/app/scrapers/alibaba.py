"""Alibaba supplier scraper using httpx + BeautifulSoup."""

from __future__ import annotations

import logging
import re
from typing import Any

from bs4 import BeautifulSoup

from app.models.scraping import SupplierListing
from app.scrapers.base import BaseScraper

logger = logging.getLogger(__name__)


class AlibabaScraper(BaseScraper):
    source_name = "alibaba"
    timeout = 20.0

    def _scrape(self, query: str) -> list[dict[str, Any]]:
        """Search Alibaba for supplier listings."""
        url = "https://www.alibaba.com/trade/search"
        params = {"SearchText": query, "viewtype": "G"}

        resp = self.client.get(url, params=params)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")
        listings: list[dict[str, Any]] = []

        # Parse product cards from search results
        cards = soup.select("[class*='organic-list'] [class*='list-no-v2-outter']")
        if not cards:
            # Fallback: try alternative selectors
            cards = soup.select(".J-offer-wrapper, .organic-gallery-offer-outter")

        for card in cards[:10]:
            try:
                listing = self._parse_card(card)
                if listing:
                    listings.append(listing)
            except Exception:
                logger.debug("Failed to parse Alibaba card", exc_info=True)
                continue

        logger.info("alibaba: found %d listings for %r", len(listings), query[:50])
        return listings

    def _parse_card(self, card: BeautifulSoup) -> dict[str, Any] | None:
        # Supplier name
        supplier_el = card.select_one("[class*='company-name'], .seller-tag a")
        supplier_name = supplier_el.get_text(strip=True) if supplier_el else None
        if not supplier_name:
            return None

        # Price
        price_el = card.select_one("[class*='price'], .gallery-offer-price")
        price_min, price_max = None, None
        if price_el:
            price_text = price_el.get_text(strip=True)
            prices = re.findall(r"\d+\.?\d*", price_text)
            if len(prices) >= 2:
                price_min = float(prices[0])
                price_max = float(prices[1])
            elif len(prices) == 1:
                price_min = float(prices[0])

        # MOQ
        moq_el = card.select_one("[class*='moq'], [class*='min-order']")
        moq = None
        if moq_el:
            moq_nums = re.findall(r"\d+", moq_el.get_text())
            if moq_nums:
                moq = int(moq_nums[0])

        # Location
        location_el = card.select_one("[class*='country'], [class*='location']")
        location = location_el.get_text(strip=True) if location_el else None

        # Rating
        rating_el = card.select_one("[class*='star-rating'], [class*='score']")
        rating = None
        if rating_el:
            rating_nums = re.findall(r"\d+\.?\d*", rating_el.get_text())
            if rating_nums:
                rating = float(rating_nums[0])

        # URL
        link_el = card.select_one("a[href*='alibaba.com']")
        url = link_el["href"] if link_el and link_el.get("href") else None

        return SupplierListing(
            supplier_name=supplier_name,
            price_min=price_min,
            price_max=price_max,
            moq=moq,
            location=location,
            rating=rating,
            url=url,
        ).model_dump()
