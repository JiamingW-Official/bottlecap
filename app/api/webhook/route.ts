import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { markReportPaid } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const reportId = session.metadata?.reportId

    if (!reportId) {
      console.error('Webhook: missing reportId in metadata')
      return NextResponse.json(
        { error: 'Missing reportId' },
        { status: 400 }
      )
    }

    try {
      // Mark the report as paid
      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || session.id

      await markReportPaid(reportId, paymentIntentId)

      // Try Python FastAPI backend first, fallback to local /api/analyze
      const backendUrl = process.env.PYTHON_BACKEND_URL

      if (backendUrl) {
        try {
          const res = await fetch(`${backendUrl}/api/v1/analyze`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
            },
            body: JSON.stringify({ report_id: reportId }),
          })
          if (res.ok) {
            console.log('Analysis dispatched to FastAPI backend')
            return NextResponse.json({ received: true })
          }
          console.error('FastAPI returned non-ok:', res.status, await res.text())
        } catch (e) {
          console.error('FastAPI unreachable, falling back to local:', e)
        }
      }

      // Fallback: existing local analysis
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      fetch(`${baseUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      }).catch((err) => console.error('Failed to trigger analysis:', err))
    } catch (error) {
      console.error('Webhook processing error:', error)
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
