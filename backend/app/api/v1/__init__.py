"""API v1 router."""

from fastapi import APIRouter

from app.api.v1.health import router as health_router
from app.api.v1.analyze import router as analyze_router
from app.api.v1.progress import router as progress_router
from app.api.v1.trending import router as trending_router

router = APIRouter(prefix="/api/v1")
router.include_router(health_router, tags=["health"])
router.include_router(analyze_router, tags=["analyze"])
router.include_router(progress_router, tags=["progress"])
router.include_router(trending_router, tags=["trending"])
