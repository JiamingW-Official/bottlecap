# TECH.md — Technical Architecture

> Claude Code must read this file before writing any backend code, APIs, or database logic.

---

## Project Structure

```
bottlecap/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, global styles)
│   ├── page.tsx                  # Landing page /
│   ├── analyze/
│   │   └── page.tsx              # Submission form page /analyze
│   ├── report/
│   │   └── [id]/
│   │       └── page.tsx          # Report page /report/[id]
│   └── api/
│       ├── analyze/
│       │   └── route.ts          # POST /api/analyze (core AI endpoint)
│       ├── webhook/
│       │   └── route.ts          # POST /api/webhook (Stripe callback)
│       └── og/
│           └── route.tsx         # GET /api/og (dynamic OG image)
│
├── components/
│   ├── ui/                       # Shadcn base components (do not modify manually)
│   ├── LandingHero.tsx           # Landing page hero section
│   ├── LandingStats.tsx          # Landing page statistics
│   ├── LandingDemo.tsx           # Before/After demo
│   ├── LandingPricing.tsx        # Pricing section
│   ├── SubmitForm.tsx            # Three-step submission form
│   ├── ReportCard.tsx            # Shareable report card
│   ├── ReportDetail.tsx          # Detailed report content
│   ├── ShareButton.tsx           # Share button group
│   └── LoadingAnalysis.tsx       # Loading animation
│
├── lib/
│   ├── claude.ts                 # Claude API wrapper
│   ├── supabase.ts               # Supabase client
│   ├── stripe.ts                 # Stripe client
│   ├── resend.ts                 # Email sending
│   └── utils.ts                  # Utility functions
│
├── types/
│   └── index.ts                  # Global TypeScript types
│
├── public/
│   └── og-default.png            # Default OG image
│
├── .env.local                    # Environment variables (do not commit)
├── .env.example                  # Environment variable template (commit to Git)
├── PRODUCT.md
├── DESIGN.md
├── TECH.md
├── PROMPTS.md
├── BUSINESS.md
├── TASKS.md
├── CURSOR_PROMPTS.md
└── README.md
```

---

## Environment Variables

```bash
# .env.example (all variables, values left blank)

# Anthropic
ANTHROPIC_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE=
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@bottlecap.io

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Database Schema (Supabase)

### Run in Supabase SQL Editor:

```sql
-- Reports table (core)
CREATE TABLE reports (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email      TEXT NOT NULL,
  product_name    TEXT,
  product_description TEXT NOT NULL,
  image_url       TEXT,

  -- User input options
  target_price    TEXT,   -- 'under_30' | '30_100' | '100_300' | 'unsure'
  main_concern    TEXT,   -- 'cost' | 'factory' | 'quality' | 'start'
  quantity        TEXT,   -- 'under_100' | '100_1000' | 'over_1000' | 'unsure'

  -- Analysis result (full JSON)
  analysis_result JSONB,

  -- Status
  status          TEXT DEFAULT 'pending',
                  -- 'pending' | 'processing' | 'complete' | 'failed'

  -- Payment
  stripe_session_id  TEXT,
  stripe_payment_id  TEXT,
  is_paid            BOOLEAN DEFAULT FALSE,
  plan               TEXT DEFAULT 'single', -- 'single' | 'monthly'

  -- Social
  share_count     INTEGER DEFAULT 0,

  -- Timestamps
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_reports_email ON reports(user_email);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created ON reports(created_at DESC);

-- Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access by ID (used for shareable links).
-- NOTE: This means anyone with a report URL can view that report.
-- This is intentional to support the sharing flow (social sharing, email links).
-- Reports use UUIDs so they are not enumerable, but there is no per-user
-- access control on reads. If stricter access is needed in the future,
-- consider adding an auth check or a signed-token approach.
CREATE POLICY "Reports viewable by id"
ON reports FOR SELECT
USING (true);

-- Only allow server-side writes (via service role key)
CREATE POLICY "Service role can do anything"
ON reports
USING (auth.role() = 'service_role');
```

---

## TypeScript Type Definitions

```typescript
// types/index.ts

export interface ProductInput {
  productDescription: string
  imageUrl?: string
  targetPrice?: 'under_30' | '30_100' | '100_300' | 'unsure'
  mainConcern?: 'cost' | 'factory' | 'quality' | 'start'
  quantity?: 'under_100' | '100_1000' | 'over_1000' | 'unsure'
  userEmail: string
}

export interface SourcingCountry {
  country: string
  countryCode: string       // 'VN' | 'CN' | 'MX' | 'IN' etc.
  countryEmoji: string      // e.g. flag emoji
  tariffRate: number        // 12 (percentage)
  leadTimeDays: number      // 35
  moq: number               // 500
  recommendationScore: number // 0-100
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface MaterialAlternative {
  material: string
  costImpact: string        // '-30%' or '+10%'
  reason: string
}

export interface OptimizationTip {
  tip: string
  potentialSaving: string   // '$2-3/unit' or '20% cost reduction'
}

export interface AnalysisResult {
  feasibilityScore: number           // 0-100
  feasibilityLabel: 'Highly Feasible' | 'Feasible' | 'Needs Adjustment' | 'Challenging'
  oneLinerSummary: string

  hsCode: string
  hsCodeConfidence: number
  category: string

  costEstimate: {
    min: number
    max: number
    currency: 'USD'
    perUnit: true
    assumptions: string
  }

  annualSavingsOpportunity: number   // Estimated savings compared to using a broker

  sourcingCountries: SourcingCountry[]

  manufacturingSpecs: string[]       // 10 key parameters

  materialsAnalysis: {
    suggested: string[]
    alternatives: MaterialAlternative[]
  }

  optimizationTips: OptimizationTip[]

  actionItems: string[]              // 7 actionable next steps

  redFlags: string[]                 // Risk warnings

  encouragingNote: string            // Motivational closing note
}

export interface Report {
  id: string
  userEmail: string
  productName?: string
  productDescription: string
  imageUrl?: string
  analysisResult?: AnalysisResult
  status: 'pending' | 'processing' | 'complete' | 'failed'
  isPaid: boolean
  plan: 'single' | 'monthly'
  shareCount: number
  createdAt: string
  completedAt?: string
}
```

---

## API Endpoint Specifications

### POST /api/analyze
Trigger: Called after successful Stripe payment (via webhook)

```typescript
// Request body
interface AnalyzeRequest {
  reportId: string
}

// Response body
interface AnalyzeResponse {
  success: boolean
  reportId: string
  error?: string
}

// Flow:
// 1. Read report from Supabase
// 2. Verify is_paid === true
// 3. Update status = 'processing'
// 4. Call analyzeProduct() from claude.ts
// 5. Store result in analysis_result
// 6. Update status = 'complete'
// 7. Send email notification to user
// 8. Return success: true
```

### POST /api/webhook (Stripe)
```typescript
// Listens for event: checkout.session.completed
// Flow:
// 1. Verify Stripe signature
// 2. Read reportId from metadata
// 3. Update is_paid = true
// 4. Call /api/analyze
```

### GET /api/og?id=[reportId]
```typescript
// Dynamically generates an OG image (for social sharing previews)
// Uses @vercel/og
// Output: 1200x630px PNG
// Content: Simplified version of the report card
```

---

## Claude API Call Specification

```typescript
// lib/claude.ts

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function analyzeProduct(input: ProductInput): Promise<AnalysisResult> {
  const messages = []

  // If an image is provided, use multimodal input
  if (input.imageUrl) {
    messages.push({
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'url',
            url: input.imageUrl
          }
        },
        {
          type: 'text',
          text: buildUserPrompt(input)
        }
      ]
    })
  } else {
    messages.push({
      role: 'user',
      content: buildUserPrompt(input)
    })
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,  // See PROMPTS.md
    messages
  })

  // Parse the JSON response
  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  const result = JSON.parse(content.text) as AnalysisResult
  return result
}
```

---

## Stripe Payment Flow

```typescript
// lib/stripe.ts
// Flow:
// 1. User completes the submission form
// 2. Frontend POSTs to /api/create-checkout
// 3. Backend creates a report in Supabase (status: 'pending')
// 4. Backend creates a Stripe Checkout Session
//    metadata: { reportId: report.id }
// 5. Frontend redirects to Stripe Checkout
// 6. User completes payment
// 7. Stripe calls /api/webhook
// 8. Webhook triggers /api/analyze
// 9. Analysis completes, email sent to user
// 10. User clicks email link -> /report/[id]

// Stripe Checkout Session configuration
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Bottlecap Product Analysis',
        description: 'Full manufacturing feasibility report, delivered in minutes',
      },
      unit_amount: 9900,  // $99.00
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/report/${report.id}?success=true`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/analyze?cancelled=true`,
  customer_email: input.userEmail,
  metadata: {
    reportId: report.id
  }
})
```

---

## Email Template Specification

```typescript
// lib/resend.ts
// Uses Resend for delivery, React Email for templates

// Email #1: Payment Confirmation (sent immediately)
// Subject: Got it! Your report is being generated
// Content: Payment confirmation + 3 things user can do in the meantime + estimated delivery time

// Email #2: Report Ready Notification
// Subject: Your Bottlecap report is ready — there's a finding you need to see
// Content: Key finding teaser + View Full Report button (links to /report/[id])
```

---

## Security

- All database writes must use the `service role key` (server-side only)
- Frontend only uses the `anon key` (read-only access to public data)
- Stripe webhook must verify signature (`stripe.webhooks.constructEvent`)
- Image uploads: Accept only JPEG/PNG/WebP, limit to 10MB, store in Supabase Storage
- User email: Validate format before storing; do not store other personal information
- Report IDs use UUIDs, not auto-incrementing integers (prevents enumeration attacks)

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# First deployment
vercel

# Production deployment
vercel --prod
```

**Vercel Environment Variables:** Add all variables from `.env.example` one by one in Vercel Dashboard -> Settings -> Environment Variables.

**Stripe Webhook URL:** `https://yourdomain.vercel.app/api/webhook`

---

## Common Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npx supabase login   # Log in to Supabase CLI
stripe listen        # Listen for Stripe webhooks locally (for development)
```

---

## Missing Infrastructure (To Add)

### Rate Limiting
- Add rate limiting to all API routes (e.g., using upstash/ratelimit)
- Prevent abuse of /api/analyze endpoint

### Error Monitoring
- Integrate Sentry or similar for production error tracking
- Log all API failures with context

### Abandoned Checkout Cleanup
- Reports created before payment that never get paid accumulate as orphan records
- Add a daily cron job or Supabase function to clean up reports where:
  is_paid = false AND created_at < NOW() - INTERVAL '24 hours'

### Analytics
- Add Vercel Analytics or PostHog for conversion funnel tracking
- Track: page views -> form starts -> form completes -> payment -> report views -> shares
