"""Shared test fixtures."""

from __future__ import annotations

import os
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient


# Set test env vars before importing app
os.environ.setdefault("ANTHROPIC_API_KEY", "test-key")
os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_ANON_KEY", "test-anon-key")
os.environ.setdefault("SUPABASE_SERVICE_ROLE_KEY", "test-service-key")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379/0")
os.environ.setdefault("BACKEND_API_KEY", "test-api-key")
os.environ.setdefault("FASTAPI_SECRET_KEY", "test-secret")
os.environ.setdefault("RESEND_API_KEY", "test-resend-key")


@pytest.fixture()
def mock_supabase():
    """Mock Supabase client."""
    mock = MagicMock()
    mock.table.return_value = mock
    mock.select.return_value = mock
    mock.insert.return_value = mock
    mock.update.return_value = mock
    mock.upsert.return_value = mock
    mock.eq.return_value = mock
    mock.gt.return_value = mock
    mock.order.return_value = mock
    mock.limit.return_value = mock
    mock.single.return_value = mock
    mock.execute.return_value = MagicMock(data=[])
    with patch("app.dependencies.get_supabase", return_value=mock):
        yield mock


@pytest.fixture()
def mock_redis():
    """Mock async Redis client."""
    mock = MagicMock()
    mock.ping = MagicMock(return_value=True)
    mock.get = MagicMock(return_value=None)
    mock.setex = MagicMock()
    mock.publish = MagicMock()
    with patch("app.dependencies.get_redis", return_value=mock):
        yield mock


@pytest.fixture()
def client(mock_supabase, mock_redis):
    """FastAPI test client with mocked dependencies."""
    from app.main import app
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def auth_header():
    """Valid auth header for API calls."""
    return {"Authorization": "Bearer test-api-key"}


@pytest.fixture()
def sample_report():
    """Sample report data as returned by Supabase."""
    return {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "user_email": "test@example.com",
        "product_name": "Custom Water Bottle",
        "product_description": "A 32oz insulated stainless steel water bottle with custom branding",
        "image_url": None,
        "target_price": "30_100",
        "main_concern": "cost",
        "quantity": "100_1000",
        "analysis_result": None,
        "status": "pending",
        "stripe_session_id": "cs_test_123",
        "stripe_payment_id": "pi_test_123",
        "is_paid": True,
        "plan": "single",
        "share_count": 0,
        "created_at": "2026-02-24T12:00:00Z",
        "completed_at": None,
    }


@pytest.fixture()
def sample_analysis_result():
    """Sample Claude analysis result."""
    return {
        "feasibilityScore": 82,
        "feasibilityLabel": "Highly Feasible",
        "oneLinerSummary": "Great potential for custom bottles",
        "hsCode": "7323.93",
        "hsCodeConfidence": 85,
        "hsCodeExplanation": "Stainless steel table and kitchenware",
        "category": "Drinkware",
        "costEstimate": {
            "min": 4.50,
            "max": 8.20,
            "currency": "USD",
            "perUnit": True,
            "assumptions": "Based on 500-unit MOQ from Chinese manufacturers",
        },
        "annualSavingsOpportunity": 3200,
        "sourcingCountries": [
            {
                "country": "China",
                "countryCode": "CN",
                "countryEmoji": "\ud83c\udde8\ud83c\uddf3",
                "tariffRate": 7.5,
                "leadTimeDays": 35,
                "moq": 500,
                "recommendationScore": 88,
                "pros": ["Lowest cost", "Most experienced"],
                "cons": ["Tariff risk"],
                "bestFor": "Cost-optimized large orders",
            }
        ],
        "manufacturingSpecs": ["Material grade?", "Capacity?"],
        "materialsAnalysis": {
            "suggested": ["304 Stainless Steel"],
            "alternatives": [
                {
                    "material": "201 Stainless Steel",
                    "costImpact": "-20%",
                    "reason": "Lower grade but sufficient for drinkware",
                }
            ],
        },
        "optimizationTips": [
            {
                "tip": "Order 1000+ units",
                "potentialSaving": "$1.50/unit",
            }
        ],
        "actionItems": [
            "Request samples from 3 suppliers",
            "Compare shipping costs",
            "Check import requirements",
            "Decide on branding method",
            "Set quality standards",
            "Plan packaging design",
            "Calculate landed cost",
        ],
        "redFlags": [],
        "encouragingNote": "Water bottles are a proven market — go for it!",
    }
