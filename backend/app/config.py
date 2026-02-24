from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Anthropic
    anthropic_api_key: str = ""

    # Supabase
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    # Stripe
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    # Resend
    resend_api_key: str = ""
    resend_from_email: str = "hello@bottlecap.io"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # FastAPI
    fastapi_secret_key: str = "change-me-in-production"
    backend_api_key: str = "change-me-in-production"

    # App
    base_url: str = "https://bottlecap.io"
    python_backend_url: str = "http://localhost:8000"

    # Scraper cache TTL (seconds)
    cache_ttl_seconds: int = 86400  # 24 hours

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()
