"""Trending products endpoint."""

from __future__ import annotations

from fastapi import APIRouter

from app.dependencies import get_supabase

router = APIRouter()


@router.get("/trending")
async def get_trending() -> dict:
    """Return latest trending products from the database."""
    sb = get_supabase()
    resp = (
        sb.table("trending_products")
        .select("keyword, category, trend_score, yoy_growth, scraped_at")
        .order("trend_score", desc=True)
        .limit(20)
        .execute()
    )

    return {
        "products": resp.data or [],
        "count": len(resp.data or []),
    }
