import { NextResponse } from 'next/server'
import { createReport } from '@/lib/supabase'
import { createCheckoutSession } from '@/lib/stripe'
import { extractProductName } from '@/lib/claude'
import type { CreateCheckoutRequest } from '@/types'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateCheckoutRequest
    const { productInput } = body

    if (!productInput?.productDescription || !productInput?.userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: productDescription and userEmail' },
        { status: 400 }
      )
    }

    // Extract a short product name from the description
    const productName = await extractProductName(
      productInput.productDescription
    )

    // Create report record in Supabase (unpaid)
    const report = await createReport({
      userEmail: productInput.userEmail,
      productName,
      productDescription: productInput.productDescription,
      imageUrl: productInput.imageUrl,
      targetPrice: productInput.targetPrice,
      mainConcern: productInput.mainConcern,
      quantity: productInput.quantity,
      status: 'pending',
      isPaid: false,
      plan: 'single',
      shareCount: 0,
    })

    // Create Stripe Checkout Session
    const checkoutUrl = await createCheckoutSession({
      reportId: report.id,
      userEmail: productInput.userEmail,
      productName,
    })

    return NextResponse.json({ url: checkoutUrl, reportId: report.id })
  } catch (error) {
    console.error('create-checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
