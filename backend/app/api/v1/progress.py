"""SSE progress stream endpoint."""

from __future__ import annotations

import json

from fastapi import APIRouter, Query
from sse_starlette.sse import EventSourceResponse

from app.services.progress import subscribe_progress

router = APIRouter()


@router.get("/progress/{report_id}")
async def stream_progress(
    report_id: str,
    token: str = Query(..., description="JWT auth token"),
) -> EventSourceResponse:
    """Stream analysis progress events via SSE.

    The frontend connects to this endpoint after triggering analysis
    and receives step-by-step progress updates.
    """
    # Validate JWT token
    _validate_token(token, report_id)

    async def event_generator():
        async for event in subscribe_progress(report_id):
            if event.get("keepalive"):
                yield {"event": "keepalive", "data": ""}
            else:
                yield {"event": "progress", "data": json.dumps(event)}

    return EventSourceResponse(event_generator())


def _validate_token(token: str, report_id: str) -> None:
    """Validate the JWT token for SSE auth."""
    import jwt
    from app.config import get_settings

    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            settings.fastapi_secret_key,
            algorithms=["HS256"],
        )
        if payload.get("report_id") != report_id:
            from fastapi import HTTPException
            raise HTTPException(status_code=403, detail="Token does not match report")
    except jwt.InvalidTokenError:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Invalid token")
