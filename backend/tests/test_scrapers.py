"""Scraper unit tests with mocked HTTP responses."""

from __future__ import annotations

from unittest.mock import patch, MagicMock

import pytest


class TestAlibabaScraper:
    def test_parse_empty_results(self):
        """Returns empty list when no cards found."""
        from app.scrapers.alibaba import AlibabaScraper

        scraper = AlibabaScraper()

        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = "<html><body>No results</body></html>"
        mock_response.raise_for_status = MagicMock()

        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
            patch.object(scraper.client, "get", return_value=mock_response),
        ):
            result = scraper._scrape("test query")

        assert isinstance(result, list)
        assert len(result) == 0


class TestUSITCScraper:
    def test_parse_tariff_response(self):
        """Parses USITC API response correctly."""
        from app.scrapers.usitc import USITCScraper

        scraper = USITCScraper()

        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "results": [
                {
                    "htsno": "7323.93",
                    "description": "Table, kitchen or other household articles",
                    "general": "3.4%",
                    "special": "Free (A,AU,BH,CA,CL,CO)",
                    "other": "34%",
                }
            ]
        }
        mock_response.raise_for_status = MagicMock()

        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
            patch.object(scraper.client, "get", return_value=mock_response),
        ):
            result = scraper._scrape("7323.93")

        assert result["hs_code"] == "7323.93"
        assert result["general_rate"] == "3.4%"
        assert result["china_rate"] == "34%"

    def test_no_results(self):
        """Returns empty entry when no results found."""
        from app.scrapers.usitc import USITCScraper

        scraper = USITCScraper()

        mock_response = MagicMock()
        mock_response.json.return_value = {"results": []}
        mock_response.raise_for_status = MagicMock()

        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
            patch.object(scraper.client, "get", return_value=mock_response),
        ):
            result = scraper._scrape("9999.99")

        assert result["hs_code"] == "9999.99"
        assert result["description"] == "No results found"


class TestComtradeScraper:
    def test_parse_trade_data(self):
        """Parses UN Comtrade response with partners."""
        from app.scrapers.comtrade import ComtradeScraper

        scraper = ComtradeScraper()

        mock_response = MagicMock()
        mock_response.json.return_value = {
            "data": [
                {
                    "partnerCode": 0,
                    "partnerDesc": "World",
                    "primaryValue": 5000000000,
                },
                {
                    "partnerCode": 156,
                    "partnerDesc": "China",
                    "primaryValue": 3000000000,
                },
                {
                    "partnerCode": 704,
                    "partnerDesc": "Viet Nam",
                    "primaryValue": 500000000,
                },
            ]
        }
        mock_response.raise_for_status = MagicMock()

        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
            patch.object(scraper.client, "get", return_value=mock_response),
        ):
            result = scraper._scrape("7323")

        assert result["hs_code"] == "7323"
        assert result["import_value_usd"] == 5000000000
        assert len(result["top_partners"]) == 2
        assert result["top_partners"][0]["country"] == "China"


class TestGoogleTrendsScraper:
    @patch("app.scrapers.google_trends.TrendReq")
    def test_scrape_returns_trend_data(self, mock_trendreq_class):
        """Returns structured trend data."""
        from app.scrapers.google_trends import GoogleTrendsScraper
        import pandas as pd

        mock_pytrends = MagicMock()
        mock_trendreq_class.return_value = mock_pytrends

        # Mock interest_over_time
        mock_pytrends.interest_over_time.return_value = pd.DataFrame()

        # Mock related_queries
        mock_pytrends.related_queries.return_value = {
            "water bottle": {"top": None, "rising": None}
        }

        # Mock interest_by_region
        mock_pytrends.interest_by_region.return_value = pd.DataFrame()

        scraper = GoogleTrendsScraper()
        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
        ):
            result = scraper._scrape("water bottle")

        assert result["keyword"] == "water bottle"
        assert isinstance(result["related_queries"], list)


class TestAmazonScraper:
    def test_parse_empty_results(self):
        """Returns empty list when no products found."""
        from app.scrapers.amazon import AmazonScraper

        scraper = AmazonScraper()

        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = "<html><body>No results</body></html>"
        mock_response.raise_for_status = MagicMock()

        with (
            patch.object(scraper, "_cache_get", return_value=None),
            patch.object(scraper, "_cache_set"),
            patch.object(scraper.client, "get", return_value=mock_response),
        ):
            result = scraper._scrape("nonexistent product xyz")

        assert isinstance(result, list)
        assert len(result) == 0


class TestBaseScraper:
    def test_cache_hit_skips_scrape(self):
        """When cache has data, _scrape is not called."""
        from app.scrapers.usitc import USITCScraper

        scraper = USITCScraper()
        cached_data = {"hs_code": "7323.93", "general_rate": "3.4%"}

        with (
            patch.object(scraper, "_cache_get", return_value=cached_data),
            patch.object(scraper, "_scrape") as mock_scrape,
        ):
            result = scraper.scrape("7323.93")

        assert result == cached_data
        mock_scrape.assert_not_called()
