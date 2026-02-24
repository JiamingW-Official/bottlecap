"""SSE progress tracking via Redis pub/sub."""

from __future__ import annotations

import asyncio
import json
import logging
from typing import AsyncGenerator

import redis.asyncio as aioredis

from app.dependencies import get_redis

logger = logging.getLogger(__name__)

CHANNEL_PREFIX = "progress:"


# ---------------------------------------------------------------------------
# Publish (called from Celery tasks — sync Redis)
# ---------------------------------------------------------------------------

def publish_progress_sync(
    redis_url: str,
    report_id: str,
    step: str,
    progress: int,
    message: str,
) -> None:
    """Synchronous publish for use inside Celery workers."""
    import redis as sync_redis

    r = sync_redis.from_url(redis_url, decode_responses=True)
    channel = f"{CHANNEL_PREFIX}{report_id}"
    payload = json.dumps({
        "step": step,
        "progress": progress,
        "message": message,
    })
    r.publish(channel, payload)
    # Also store last state for late-joining clients
    r.setex(f"progress:last:{report_id}", 300, payload)
    r.close()


# ---------------------------------------------------------------------------
# Subscribe (SSE endpoint — async Redis)
# ---------------------------------------------------------------------------

async def subscribe_progress(report_id: str) -> AsyncGenerator[dict, None]:
    """Async generator that yields progress events for a report."""
    r = await get_redis()
    pubsub = r.pubsub()
    channel = f"{CHANNEL_PREFIX}{report_id}"

    await pubsub.subscribe(channel)

    try:
        # First, send last known state if any
        last = await r.get(f"progress:last:{report_id}")
        if last:
            yield json.loads(last)

        # Stream new events
        while True:
            message = await pubsub.get_message(
                ignore_subscribe_messages=True,
                timeout=1.0,
            )
            if message and message["type"] == "message":
                data = json.loads(message["data"])
                yield data
                if data.get("step") == "complete":
                    break
            else:
                # Send keepalive comment every second
                yield {"keepalive": True}
                await asyncio.sleep(0.5)
    finally:
        await pubsub.unsubscribe(channel)
        await pubsub.aclose()
