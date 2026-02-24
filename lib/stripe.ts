import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  }
  return _stripe
}

export async function createCheckoutSession({
  reportId,
  userEmail,
  productName,
}: {
  reportId: string
  userEmail: string
  productName: string
}): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Bottlecap Analysis: ${productName}`,
            description:
              'Full manufacturing feasibility report, delivered in minutes',
          },
          unit_amount: 9900,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/report/${reportId}?success=true`,
    cancel_url: `${baseUrl}/analyze?cancelled=true`,
    customer_email: userEmail,
    metadata: { reportId },
  })

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL')
  }

  return session.url
}
