"""Scraper data models."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SupplierListing(BaseModel):
    supplier_name: str
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    currency: str = "USD"
    moq: Optional[int] = None
    location: Optional[str] = None
    rating: Optional[float] = None
    url: Optional[str] = None


class TariffEntry(BaseModel):
    hs_code: str
    description: str = ""
    general_rate: Optional[str] = None
    china_rate: Optional[str] = None
    special_rates: dict[str, str] = {}


class TradeVolume(BaseModel):
    hs_code: str
    reporter: str = "USA"
    year: Optional[int] = None
    import_value_usd: Optional[float] = None
    export_value_usd: Optional[float] = None
    top_partners: list[dict[str, str | float]] = []


class TrendData(BaseModel):
    keyword: str
    interest_over_time: list[dict[str, str | int]] = []
    average_interest: Optional[int] = None
    yoy_growth_pct: Optional[float] = None
    related_queries: list[str] = []
    regional_interest: list[dict[str, str | int]] = []


class AmazonProduct(BaseModel):
    title: str
    price: Optional[float] = None
    currency: str = "USD"
    bsr: Optional[int] = None
    bsr_category: Optional[str] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    url: Optional[str] = None


class ScrapedData(BaseModel):
    """Aggregated result from all scrapers for a single analysis."""
    suppliers: list[SupplierListing] = []
    tariff: Optional[TariffEntry] = None
    trade_volume: Optional[TradeVolume] = None
    trends: Optional[TrendData] = None
    amazon_products: list[AmazonProduct] = []
    scraped_at: Optional[datetime] = None
    errors: dict[str, str] = {}
