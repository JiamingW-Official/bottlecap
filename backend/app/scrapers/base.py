"""Base scraper ABC with retry, caching, and rate limits."""

from __future__ import annotations

import hashlib
import logging
from abc import ABC, abstractmethod
from typing import Any

from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)
import httpx

from app.config import get_settings
from app.services.supabase import cache_get, cache_set

logger = logging.getLogger(__name__)


class ScraperError(Exception):
    """Raised when a scraper fails after retries."""
    pass


class BaseScraper(ABC):
    """Abstract base for all data scrapers.

    Features:
    - 24h Supabase-backed cache
    - tenacity retry with exponential backoff
    - httpx client with timeout
    """

    source_name: str = "base"
    timeout: float = 15.0
    max_retries: int = 3

    def __init__(self) -> None:
        self._client: httpx.Client | None = None

    @property
    def client(self) -> httpx.Client:
        if self._client is None or self._client.is_closed:
            self._client = httpx.Client(
                timeout=self.timeout,
                follow_redirects=True,
                headers={
                    "User-Agent": (
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                        "AppleWebKit/537.36 (KHTML, like Gecko) "
                        "Chrome/131.0.0.0 Safari/537.36"
                    )
                },
            )
        return self._client

    def close(self) -> None:
        if self._client and not self._client.is_closed:
            self._client.close()

    # ----- Cache helpers -----

    @staticmethod
    def _hash_query(query: str) -> str:
        return hashlib.sha256(query.encode()).hexdigest()

    def _cache_get(self, query: str) -> Any | None:
        qh = self._hash_query(query)
        return cache_get(self.source_name, qh)

    def _cache_set(self, query: str, data: Any) -> None:
        qh = self._hash_query(query)
        ttl = get_settings().cache_ttl_seconds
        cache_set(self.source_name, qh, query, data, ttl)

    # ----- Abstract method -----

    @abstractmethod
    def _scrape(self, query: str) -> Any:
        """Implement actual scraping logic. Return serializable data."""
        ...

    # ----- Public entry point -----

    def scrape(self, query: str) -> Any:
        """Scrape with cache-first strategy and retries."""
        # Check cache
        cached = self._cache_get(query)
        if cached is not None:
            logger.info("%s: cache hit for %r", self.source_name, query[:50])
            return cached

        # Scrape with retry
        try:
            data = self._scrape_with_retry(query)
        except Exception as exc:
            logger.error("%s: failed after retries for %r: %s", self.source_name, query[:50], exc)
            raise ScraperError(f"{self.source_name} scrape failed: {exc}") from exc

        # Cache the result
        try:
            self._cache_set(query, data)
        except Exception:
            logger.warning("%s: failed to cache result", self.source_name, exc_info=True)

        return data

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        retry=retry_if_exception_type((httpx.HTTPError, httpx.TimeoutException)),
        reraise=True,
    )
    def _scrape_with_retry(self, query: str) -> Any:
        return self._scrape(query)
