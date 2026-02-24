# TASKS.md — Development Task List

> Read this file before starting work each day. Check off tasks as you complete them.
> This file is your progress tracker and priority guide.

---

## Current Status

**Stage:** Phase 1 — MVP Build
**Goal:** Launch in 2 weeks, get first paying customer
**Today's Date:** Update here

---

## Phase 1: MVP (Day 1-14)

### Project Setup (Day 1)
- [ ] Initialize Next.js 14 project (App Router + TypeScript)
- [ ] Install all dependencies (see TECH.md)
- [ ] Configure Tailwind + brand colors (see DESIGN.md)
- [ ] Initialize Shadcn/ui
- [ ] Create .env.local and .env.example
- [ ] Create complete folder structure
- [ ] Initialize Git + push to GitHub

### Landing Page (Day 2-3)
- [ ] `app/page.tsx` — Landing page main file
- [ ] `components/LandingHero.tsx` — Hero section (input box + animated numbers)
- [ ] `components/LandingStats.tsx` — Stats section (Framer Motion counters)
- [ ] `components/LandingDemo.tsx` — Before/After demo
- [ ] Report card preview (sample data)
- [ ] Testimonials section
- [ ] Pricing card
- [ ] Footer
- [ ] Mobile responsive testing

### Submission Form (Day 3-4)
- [ ] `components/SubmitForm.tsx` — Three-step form
- [ ] `app/analyze/page.tsx` — Form page
- [ ] Step 1: Product description + image upload
- [ ] Step 2: Three multiple-choice questions (card-style)
- [ ] Step 3: Email + payment button
- [ ] Step transition animations (Framer Motion)
- [ ] Form validation

### Database (Day 4)
- [ ] Create Supabase account
- [ ] Run table creation SQL from TECH.md
- [ ] `lib/supabase.ts` — Client wrapper
- [ ] Test CRUD operations

### Stripe Payments (Day 5)
- [ ] Create Stripe account (test mode)
- [ ] `lib/stripe.ts` — Client wrapper
- [ ] `app/api/create-checkout/route.ts` — Create Checkout Session
- [ ] `app/api/webhook/route.ts` — Handle payment success events
- [ ] Local Webhook testing (`stripe listen`)
- [ ] End-to-end payment flow test

### Claude API (Day 5-6)
- [ ] Get Anthropic API Key
- [ ] `lib/claude.ts` — Analysis function (see PROMPTS.md)
- [ ] `app/api/analyze/route.ts` — Analysis endpoint
- [ ] Multimodal image support
- [ ] JSON parsing + error handling
- [ ] Test with 5 different product types

### Report Page (Day 6-7)
- [ ] `components/ReportCard.tsx` — Shareable card
- [ ] Circular progress bar (feasibility score)
- [ ] Four-panel data grid
- [ ] `components/ReportDetail.tsx` — Detailed content
- [ ] Supplier comparison table
- [ ] Action checklist (checkable)
- [ ] `app/report/[id]/page.tsx` — Report page
- [ ] OG meta tags

### Sharing Features (Day 7-8)
- [ ] `components/ShareButton.tsx`
- [ ] PNG download (html-to-image)
- [ ] Twitter share (pre-filled copy)
- [ ] LinkedIn share
- [ ] Share count tracking

### Email (Day 8)
- [ ] Create Resend account
- [ ] `lib/resend.ts` — Email sending wrapper
- [ ] Email #1: Payment confirmation template
- [ ] Email #2: Report completion notification template
- [ ] Test email delivery

### Deployment (Day 9)
- [ ] Connect Vercel account to GitHub
- [ ] Configure all environment variables on Vercel
- [ ] First production deployment
- [ ] Custom domain (bottlecap.io or similar)
- [ ] Update Stripe Webhook URL to production URL

### Infrastructure (Day 9-10)
- [ ] Add rate limiting to API routes
- [ ] Add error monitoring (Sentry or similar)
- [ ] Add abandoned checkout cleanup logic
- [ ] Add basic analytics (Vercel Analytics)

### Pre-Launch Testing (Day 10)
- [ ] Full flow test (submit -> payment -> analysis -> email -> report)
- [ ] Mobile testing
- [ ] Test with 3 different product types
- [ ] Error scenario testing (network failure, payment cancellation, etc.)

---

## Phase 2: Growth (Day 15-30)

### Content Marketing
- [ ] Create Twitter account (@bottlecap_io)
- [ ] Daily content plan (see templates below)
- [ ] ProductHunt launch preparation
- [ ] r/entrepreneur post
- [ ] r/ecommerce post

### Product Optimization
- [ ] Waiting period progress email (auto-send after 24 hours)
- [ ] $199 Supplier List Upsell
- [ ] NPS survey (auto-send 3 days after report delivery)
- [ ] User feedback collection

### Data & Analytics
- [ ] Integrate Posthog or Vercel Analytics
- [ ] Track key conversion funnels
- [ ] Weekly data review

---

## Phase 3: Fundraising Preparation (Day 31-60)

- [ ] Compile user case studies (5 cases with specific metrics)
- [ ] Build Pitch Deck (see BUSINESS.md)
- [ ] Prepare financial model
- [ ] YC S26 application
- [ ] Build angel investor list (YC alumni first)
- [ ] Start pitch meetings

---

## Daily Content Publishing Templates

Post one per day, using a consistent format:

**Twitter Template A (Product Case Study):**
```
Just analyzed a [product category] with Bottlecap

Findings:
> Feasibility: [X]/100
> If manufactured in [Country A], tariff [X]%
> Switch to [Country B], save $[X]/year
> Unit cost: $[min]-[max]

Here's the report card:
[screenshot]

bottlecap.io
```

**Twitter Template B (Interesting Discovery):**
```
Did you know [interesting manufacturing fact]?

For example: [specific example with numbers]

If you have a product idea, this is the first thing you need to know

> bottlecap.io crunches the numbers for you
```

---

## Known Bugs / To Resolve

(Log issues here as you encounter them)

| Issue | Priority | Status |
|-------|----------|--------|
|       |          |        |

---

## Ideas Backlog

(Good ideas but not doing yet — parked here so we don't forget)

- Batch analysis (upload multiple products, bundle pricing)
- Supplier review community (users share real experiences)
- Real-time tariff alerts (price change email notifications)
- API access (for other startup tools to integrate)
- Chrome extension (analyze directly on Alibaba product pages)
