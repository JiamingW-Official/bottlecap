"""FastAPI application entry point."""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import router as v1_router
from app.config import get_settings
from app.dependencies import close_redis, get_redis


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    """Startup/shutdown lifecycle."""
    # Startup: warm up Redis connection
    await get_redis()
    yield
    # Shutdown: close Redis pool
    await close_redis()


app = FastAPI(
    title="Bottlecap API",
    description="Manufacturing analysis backend with real market data scrapers",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.base_url,
        "http://localhost:3000",
        "https://bottlecap.io",
        "https://www.bottlecap.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 API routes
app.include_router(v1_router)


@app.get("/")
async def root() -> dict:
    return {"service": "bottlecap-api", "version": "1.0.0"}
