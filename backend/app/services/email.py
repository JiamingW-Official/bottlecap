"""Email service — port of lib/resend.ts."""

from __future__ import annotations

import logging

import resend

from app.config import get_settings

logger = logging.getLogger(__name__)


def _configure_resend() -> None:
    resend.api_key = get_settings().resend_api_key


def _from_email() -> str:
    return f"Bottlecap <{get_settings().resend_from_email}>"


# ---------------------------------------------------------------------------
# Email 1: Payment confirmation
# ---------------------------------------------------------------------------

def send_confirmation_email(to: str, product_name: str, report_id: str) -> None:
    _configure_resend()
    try:
        resend.Emails.send({
            "from": _from_email(),
            "to": to,
            "subject": "Got it! Analyzing your product now",
            "html": f"""
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 8px 0;">
      We're on it
    </h1>
  </div>

  <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6;">
    Hey! We got your product description for <strong>{product_name}</strong>.
    Kai (our AI analyst) is digging into your idea right now.
    Your full report will land in your inbox in <strong>2-5 minutes</strong>.
  </p>

  <div style="background: #FFF0EB; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-weight: 600; color: #FF6B35; margin: 0 0 8px;">
      While you wait, here are 3 things to think about:
    </p>
    <ul style="color: #1A1A1A; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
      <li>Approximate size and weight of your product</li>
      <li>Your ideal packaging style (boxed / bagged / bulk)</li>
      <li>Preferred materials (if you have any in mind)</li>
    </ul>
  </div>

  <p style="color: #6B6B6B; font-size: 14px;">
    Keep an eye on this inbox &mdash; your report is almost ready.
    If you have any questions, just reply to this email.
  </p>

  <p style="color: #9B9B9B; font-size: 13px; margin-top: 32px; border-top: 1px solid #E8E8E4; padding-top: 16px;">
    Bottlecap &middot; Your product idea deserves to be made
  </p>
</div>""",
        })
    except Exception:
        logger.exception("sendConfirmationEmail error")


# ---------------------------------------------------------------------------
# Email 2: Report ready
# ---------------------------------------------------------------------------

def send_report_ready_email(
    to: str,
    product_name: str,
    analysis: dict,
    report_id: str,
) -> None:
    _configure_resend()
    settings = get_settings()
    report_url = f"{settings.base_url}/report/{report_id}"
    score = analysis.get("feasibilityScore", 0)

    # Dynamic key finding line
    if score >= 80:
        countries = analysis.get("sourcingCountries", [])
        country = countries[0]["country"] if countries else "a great sourcing region"
        cost_min = analysis.get("costEstimate", {}).get("min", "?")
        cost_max = analysis.get("costEstimate", {}).get("max", "?")
        key_finding = (
            f"{product_name} is highly feasible! We recommend manufacturing in "
            f"{country} at ${cost_min}-${cost_max}/unit."
        )
    elif score >= 50:
        tips_count = len(analysis.get("optimizationTips", []))
        key_finding = (
            f"{product_name} is feasible with some adjustments. Check your report "
            f"for {tips_count} optimization tips that could save you money."
        )
    else:
        items_count = len(analysis.get("actionItems", []))
        key_finding = (
            f"We found some challenges with {product_name}, but also clear paths "
            f"forward. Your report includes {items_count} specific next steps."
        )

    try:
        resend.Emails.send({
            "from": _from_email(),
            "to": to,
            "subject": "Your report is ready \u2014 there's a finding you should see",
            "html": f"""
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 8px 0;">
      Your Report Is Ready
    </h1>
  </div>

  <div style="text-align: center; margin: 24px 0;">
    <span style="font-size: 48px; font-weight: 800; color: #FF6B35;">{score}</span>
    <span style="font-size: 20px; color: #6B6B6B;">/100</span>
    <p style="color: #6B6B6B; font-size: 14px; margin-top: 4px;">Feasibility Score</p>
  </div>

  <div style="background: #FFF0EB; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-weight: 600; color: #1A1A1A; margin: 0 0 8px;">Key finding:</p>
    <p style="color: #4A4A4A; font-size: 15px; line-height: 1.6; margin: 0;">{key_finding}</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="{report_url}" style="display: inline-block; background: #FF6B35; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      View Your Full Report
    </a>
  </div>

  <p style="color: #6B6B6B; font-size: 14px; text-align: center;">
    Think a friend has a product idea too? Share the love.
  </p>

  <p style="color: #9B9B9B; font-size: 13px; margin-top: 32px; border-top: 1px solid #E8E8E4; padding-top: 16px;">
    Bottlecap &middot; Your product idea deserves to be made
  </p>
</div>""",
        })
    except Exception:
        logger.exception("sendReportReadyEmail error")
