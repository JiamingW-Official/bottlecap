"""Analyze endpoint — triggers Celery analysis chain."""

from __future__ import annotations

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

from app.config import get_settings
from app.services.supabase import get_report
from app.tasks.analyze import run_analysis

router = APIRouter()


class AnalyzeRequest(BaseModel):
    report_id: str


class AnalyzeResponse(BaseModel):
    task_id: str
    report_id: str
    message: str = "Analysis started"


@router.post("/analyze", response_model=AnalyzeResponse)
async def trigger_analysis(
    body: AnalyzeRequest,
    authorization: str = Header(...),
) -> AnalyzeResponse:
    """Validate report and dispatch Celery analysis task.

    Called by the Next.js webhook handler after Stripe payment.
    """
    # Verify API key
    settings = get_settings()
    expected = f"Bearer {settings.backend_api_key}"
    if authorization != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")

    # Validate report exists and is paid
    report = get_report(body.report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    if not report.is_paid:
        raise HTTPException(status_code=403, detail="Report has not been paid for")

    if report.status != "pending":
        raise HTTPException(
            status_code=409,
            detail=f"Report is already {report.status}",
        )

    # Dispatch Celery task
    task = run_analysis.delay(body.report_id)

    return AnalyzeResponse(
        task_id=task.id,
        report_id=body.report_id,
    )
