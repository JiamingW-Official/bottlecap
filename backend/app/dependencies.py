"""FastAPI dependency injection providers."""

from __future__ import annotations

from functools import lru_cache
from typing import AsyncGenerator

import redis.asyncio as aioredis
from supabase import create_client, Client as SupabaseClient

from app.config import Settings, get_settings


# ---------------------------------------------------------------------------
# Supabase (service-role client for server-side CRUD)
# ---------------------------------------------------------------------------

_supabase_admin: SupabaseClient | None = None


def get_supabase() -> SupabaseClient:
    global _supabase_admin
    if _supabase_admin is None:
        settings = get_settings()
        _supabase_admin = create_client(
            settings.supabase_url,
            settings.supabase_service_role_key,
        )
    return _supabase_admin


# ---------------------------------------------------------------------------
# Redis (async client)
# ---------------------------------------------------------------------------

_redis_pool: aioredis.Redis | None = None


async def get_redis() -> aioredis.Redis:
    global _redis_pool
    if _redis_pool is None:
        settings = get_settings()
        _redis_pool = aioredis.from_url(
            settings.redis_url,
            decode_responses=True,
        )
    return _redis_pool


async def close_redis() -> None:
    global _redis_pool
    if _redis_pool is not None:
        await _redis_pool.aclose()
        _redis_pool = None
