"""Amazon product data scraper using httpx + BeautifulSoup."""

from __future__ import annotations

import logging
import re
from typing import Any

from bs4 import BeautifulSoup

from app.models.scraping import AmazonProduct
from app.scrapers.base import BaseScraper

logger = logging.getLogger(__name__)


class AmazonScraper(BaseScraper):
    source_name = "amazon"
    timeout = 20.0

    def _scrape(self, query: str) -> list[dict[str, Any]]:
        """Search Amazon for competing products."""
        url = "https://www.amazon.com/s"
        params = {"k": query, "ref": "nb_sb_noss"}

        resp = self.client.get(url, params=params)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")
        products: list[dict[str, Any]] = []

        # Parse search result cards
        cards = soup.select("[data-component-type='s-search-result']")

        for card in cards[:10]:
            try:
                product = self._parse_card(card)
                if product:
                    products.append(product)
            except Exception:
                logger.debug("Failed to parse Amazon card", exc_info=True)
                continue

        logger.info("amazon: found %d products for %r", len(products), query[:50])
        return products

    def _parse_card(self, card: BeautifulSoup) -> dict[str, Any] | None:
        # Title
        title_el = card.select_one("h2 a span, h2 span")
        title = title_el.get_text(strip=True) if title_el else None
        if not title:
            return None

        # Price
        price_whole = card.select_one(".a-price-whole")
        price_frac = card.select_one(".a-price-fraction")
        price = None
        if price_whole:
            price_text = price_whole.get_text(strip=True).replace(",", "").rstrip(".")
            frac_text = price_frac.get_text(strip=True) if price_frac else "00"
            try:
                price = float(f"{price_text}.{frac_text}")
            except ValueError:
                pass

        # Rating
        rating_el = card.select_one("[class*='a-icon-alt']")
        rating = None
        if rating_el:
            rating_match = re.search(r"(\d+\.?\d*)\s+out\s+of", rating_el.get_text())
            if rating_match:
                rating = float(rating_match.group(1))

        # Review count
        review_el = card.select_one("[class*='s-underline-text'], .a-size-base.s-underline-text")
        review_count = None
        if review_el:
            review_text = review_el.get_text(strip=True).replace(",", "")
            review_nums = re.findall(r"\d+", review_text)
            if review_nums:
                review_count = int(review_nums[0])

        # URL
        link_el = card.select_one("h2 a")
        url = None
        if link_el and link_el.get("href"):
            href = link_el["href"]
            if href.startswith("/"):
                url = f"https://www.amazon.com{href}"
            else:
                url = href

        return AmazonProduct(
            title=title,
            price=price,
            rating=rating,
            review_count=review_count,
            url=url,
        ).model_dump()
