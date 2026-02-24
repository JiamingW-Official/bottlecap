"""Analysis endpoint and pipeline tests."""

from __future__ import annotations

from unittest.mock import patch, MagicMock


def test_analyze_missing_auth(client):
    """Reject requests without auth header."""
    resp = client.post(
        "/api/v1/analyze",
        json={"report_id": "test-id"},
    )
    assert resp.status_code == 422  # missing required header


def test_analyze_invalid_auth(client):
    """Reject requests with wrong API key."""
    resp = client.post(
        "/api/v1/analyze",
        json={"report_id": "test-id"},
        headers={"Authorization": "Bearer wrong-key"},
    )
    assert resp.status_code == 401


def test_analyze_report_not_found(client, auth_header, mock_supabase):
    """Return 404 when report doesn't exist."""
    mock_supabase.execute.return_value = MagicMock(data=[])

    with patch("app.api.v1.analyze.get_report", return_value=None):
        resp = client.post(
            "/api/v1/analyze",
            json={"report_id": "nonexistent-id"},
            headers=auth_header,
        )
    assert resp.status_code == 404


def test_analyze_report_not_paid(client, auth_header, sample_report):
    """Return 403 when report is not paid."""
    sample_report["is_paid"] = False

    with patch("app.api.v1.analyze.get_report") as mock_get:
        from app.models.product import Report
        mock_get.return_value = Report(**sample_report)
        resp = client.post(
            "/api/v1/analyze",
            json={"report_id": sample_report["id"]},
            headers=auth_header,
        )
    assert resp.status_code == 403


def test_analyze_already_processing(client, auth_header, sample_report):
    """Return 409 when report is already being processed."""
    sample_report["status"] = "processing"

    with patch("app.api.v1.analyze.get_report") as mock_get:
        from app.models.product import Report
        mock_get.return_value = Report(**sample_report)
        resp = client.post(
            "/api/v1/analyze",
            json={"report_id": sample_report["id"]},
            headers=auth_header,
        )
    assert resp.status_code == 409


def test_analyze_success(client, auth_header, sample_report):
    """Successfully dispatch analysis task."""
    with (
        patch("app.api.v1.analyze.get_report") as mock_get,
        patch("app.api.v1.analyze.run_analysis") as mock_task,
    ):
        from app.models.product import Report
        mock_get.return_value = Report(**sample_report)
        mock_task.delay.return_value = MagicMock(id="celery-task-123")

        resp = client.post(
            "/api/v1/analyze",
            json={"report_id": sample_report["id"]},
            headers=auth_header,
        )

    assert resp.status_code == 200
    data = resp.json()
    assert data["task_id"] == "celery-task-123"
    assert data["report_id"] == sample_report["id"]
    mock_task.delay.assert_called_once_with(sample_report["id"])
