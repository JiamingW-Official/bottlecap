"""Supabase CRUD — port of lib/supabase.ts."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Optional

from app.dependencies import get_supabase
from app.models.product import AnalysisResult, Report


# ---------------------------------------------------------------------------
# Row ↔ Model conversion
# ---------------------------------------------------------------------------

def _to_report(row: dict[str, Any]) -> Report:
    return Report(
        id=row["id"],
        user_email=row["user_email"],
        product_name=row.get("product_name"),
        product_description=row["product_description"],
        image_url=row.get("image_url"),
        target_price=row.get("target_price"),
        main_concern=row.get("main_concern"),
        quantity=row.get("quantity"),
        analysis_result=row.get("analysis_result"),
        status=row.get("status", "pending"),
        stripe_session_id=row.get("stripe_session_id"),
        stripe_payment_id=row.get("stripe_payment_id"),
        is_paid=row.get("is_paid", False),
        plan=row.get("plan", "single"),
        share_count=row.get("share_count", 0),
        created_at=row.get("created_at"),
        completed_at=row.get("completed_at"),
    )


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------

def get_report(report_id: str) -> Optional[Report]:
    sb = get_supabase()
    resp = sb.table("reports").select("*").eq("id", report_id).execute()
    if not resp.data:
        return None
    return _to_report(resp.data[0])


def update_report(report_id: str, data: dict[str, Any]) -> Report:
    sb = get_supabase()
    resp = sb.table("reports").update(data).eq("id", report_id).execute()
    if not resp.data:
        raise Exception(f"Failed to update report {report_id}")
    return _to_report(resp.data[0])


def mark_processing(report_id: str) -> Report:
    return update_report(report_id, {"status": "processing"})


def mark_failed(report_id: str) -> None:
    sb = get_supabase()
    sb.table("reports").update({"status": "failed"}).eq("id", report_id).execute()


def save_analysis(report_id: str, result: dict[str, Any]) -> Report:
    return update_report(report_id, {
        "analysis_result": result,
        "status": "complete",
        "completed_at": datetime.now(timezone.utc).isoformat(),
    })


# ---------------------------------------------------------------------------
# Scraper cache
# ---------------------------------------------------------------------------

def cache_get(source: str, query_hash: str) -> Optional[dict[str, Any]]:
    sb = get_supabase()
    resp = (
        sb.table("scraped_data_cache")
        .select("data")
        .eq("source", source)
        .eq("query_hash", query_hash)
        .gt("expires_at", datetime.now(timezone.utc).isoformat())
        .execute()
    )
    if resp.data:
        return resp.data[0]["data"]
    return None


def cache_set(
    source: str,
    query_hash: str,
    query: str,
    data: dict[str, Any],
    ttl_seconds: int = 86400,
) -> None:
    from datetime import timedelta

    sb = get_supabase()
    expires_at = (datetime.now(timezone.utc) + timedelta(seconds=ttl_seconds)).isoformat()
    sb.table("scraped_data_cache").upsert(
        {
            "source": source,
            "query_hash": query_hash,
            "query": query,
            "data": data,
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "expires_at": expires_at,
        },
        on_conflict="source,query_hash",
    ).execute()
