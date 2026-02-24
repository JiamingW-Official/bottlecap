"""Health endpoint tests."""

from __future__ import annotations


def test_root(client):
    resp = client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["service"] == "bottlecap-api"


def test_health_ok(client, mock_redis):
    """Health check returns ok when Redis is available."""
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] in ("ok", "degraded")
    assert "redis" in data
    assert "version" in data
