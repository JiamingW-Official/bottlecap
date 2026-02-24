"""Health check endpoint."""

from __future__ import annotations

from fastapi import APIRouter

from app.dependencies import get_redis

router = APIRouter()


@router.get("/health")
async def health_check() -> dict:
    """Check API, Redis, and Celery health."""
    status = {"status": "ok", "version": "1.0.0"}

    # Redis check
    try:
        r = await get_redis()
        await r.ping()
        status["redis"] = True
    except Exception:
        status["redis"] = False

    # Celery check
    try:
        from app.tasks.celery_app import celery_app
        insp = celery_app.control.inspect()
        ping_result = insp.ping()
        status["celery"] = bool(ping_result)
    except Exception:
        status["celery"] = False

    if not status["redis"]:
        status["status"] = "degraded"

    return status
