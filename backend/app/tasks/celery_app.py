"""Celery application configuration."""

from __future__ import annotations

import os

from celery import Celery

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "bottlecap",
    broker=REDIS_URL,
    backend=REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    # Route tasks to specific queues
    task_routes={
        "app.tasks.analyze.*": {"queue": "analysis"},
        "app.tasks.scheduled.*": {"queue": "scheduled"},
    },
    # Beat schedule
    beat_schedule={
        "refresh-trending-daily": {
            "task": "app.tasks.scheduled.refresh_trending",
            "schedule": 86400.0,  # 24 hours
        },
    },
)

# Auto-discover tasks in these modules
celery_app.autodiscover_tasks(["app.tasks"])
