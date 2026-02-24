import { Resend } from 'resend'
import type { AnalysisResult } from '@/types'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || 'hello@bottlecap.io'
}

// ---------------------------------------------------------------------------
// Email 1: Payment confirmation (sent immediately after checkout)
// ---------------------------------------------------------------------------

export async function sendConfirmationEmail(
  to: string,
  productName: string,
  _reportId: string
): Promise<void> {
  try {
    await getResend().emails.send({
      from: `Bottlecap <${getFromEmail()}>`,
      to,
      subject: 'Got it! Analyzing your product now',
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 8px 0;">
      We're on it
    </h1>
  </div>

  <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6;">
    Hey! We got your product description for <strong>${productName}</strong>.
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
</div>`,
    })
  } catch (error) {
    console.error('sendConfirmationEmail error:', error)
  }
}

// ---------------------------------------------------------------------------
// Email 2: Report ready (sent when analysis completes)
// ---------------------------------------------------------------------------

export async function sendReportReadyEmail(
  to: string,
  productName: string,
  analysis: AnalysisResult,
  reportId: string
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bottlecap.io'
  const reportUrl = `${baseUrl}/report/${reportId}`
  const score = analysis.feasibilityScore

  // Build a dynamic key finding line
  let keyFinding: string
  if (score >= 80) {
    const country =
      analysis.sourcingCountries[0]?.country || 'a great sourcing region'
    keyFinding = `${productName} is highly feasible! We recommend manufacturing in ${country} at $${analysis.costEstimate.min}-${analysis.costEstimate.max}/unit.`
  } else if (score >= 50) {
    keyFinding = `${productName} is feasible with some adjustments. Check your report for ${analysis.optimizationTips.length} optimization tips that could save you money.`
  } else {
    keyFinding = `We found some challenges with ${productName}, but also clear paths forward. Your report includes ${analysis.actionItems.length} specific next steps.`
  }

  try {
    await getResend().emails.send({
      from: `Bottlecap <${getFromEmail()}>`,
      to,
      subject: "Your report is ready — there's a finding you should see",
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 8px 0;">
      Your Report Is Ready
    </h1>
  </div>

  <div style="text-align: center; margin: 24px 0;">
    <span style="font-size: 48px; font-weight: 800; color: #FF6B35;">${score}</span>
    <span style="font-size: 20px; color: #6B6B6B;">/100</span>
    <p style="color: #6B6B6B; font-size: 14px; margin-top: 4px;">Feasibility Score</p>
  </div>

  <div style="background: #FFF0EB; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-weight: 600; color: #1A1A1A; margin: 0 0 8px;">Key finding:</p>
    <p style="color: #4A4A4A; font-size: 15px; line-height: 1.6; margin: 0;">${keyFinding}</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${reportUrl}" style="display: inline-block; background: #FF6B35; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      View Your Full Report
    </a>
  </div>

  <p style="color: #6B6B6B; font-size: 14px; text-align: center;">
    Think a friend has a product idea too? Share the love.
  </p>

  <p style="color: #9B9B9B; font-size: 13px; margin-top: 32px; border-top: 1px solid #E8E8E4; padding-top: 16px;">
    Bottlecap &middot; Your product idea deserves to be made
  </p>
</div>`,
    })
  } catch (error) {
    console.error('sendReportReadyEmail error:', error)
  }
}
