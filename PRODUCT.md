# PRODUCT.md — Product Definition

> Claude Code reads this file to understand: who we're building for, what problem we solve, and how users interact with the product.

---

## Target Users (Be Specific)

### Primary: The Product Dreamer

**Who they are:**
- 25-40 years old, has a product idea but zero manufacturing background
- Could be a designer, entrepreneur, engineer, or anyone with a vision
- Has been sitting on this idea for months, doesn't know where to start
- Not a corporate procurement team — individuals or small teams

**Their real psychology:**
- "I have this idea, but manufacturing feels like an unreachable black box"
- "A sourcing agent quoted me $5,000 and I don't know if it's worth it"
- "I've been searching Alibaba for three weeks and I'm more confused than ever"
- "It's my first time — I'm afraid of getting ripped off"

**What they actually want:**
Not a report. They want **confidence** — "My idea is feasible, and here's my next step."

### Secondary: DTC Brand Owners

Running a Shopify store, looking to expand product lines, or re-evaluating suppliers due to tariff changes. They already know the basics but need a fast second opinion.

---

## Complete User Journey

### Stage 1: Discovery (Where users find us)

**Touchpoints:**
- Twitter/X: Someone shares an orange report card showing "Feasibility: 87/100"
- Reddit (r/entrepreneur, r/ecommerce): Searching "how to find a manufacturer"
- ProductHunt: Launch day
- Word of mouth: "I used this to find my first factory"

**User emotion: Curious + mildly skeptical**

**What we need to do:**
Make the user understand what this is in 3 seconds, and feel "this might be exactly what I need."

---

### Stage 2: Landing Page (The 60 seconds that decide payment)

**User behavior path:**
1. See headline → understand the product
2. See the input box in the Hero section → feel "I can just try this"
3. Scroll to see the report card preview → "Oh, that's what I'll get"
4. See testimonials → "Others have used it and it worked"
5. See pricing → "$99 with a money-back guarantee, worth a shot"

**Key conversion elements:**
- Hero input box with a relatable placeholder example
- Report card preview that looks good enough to share
- Testimonials with specific numbers ("saved $38,000" is 10x more powerful than "great tool")

---

### Stage 3: Submission Form (3-minute experience)

**Design principle: Feel like a conversation, not a form**

**Step 1 — "Tell me your idea" (60 seconds)**
- Large text area, oversized placeholder
- Image upload (optional but encouraged)
- Next button

**Step 2 — "Help me understand more" (60 seconds)**
- Three card-style multiple choice questions (tap to select)
- Target price range
- Biggest concern
- Expected quantity

**Step 3 — "One last thing" (60 seconds)**
- Email input
- Report content checklist (checkmarks)
- Stripe payment button

**Key:** Each step asks only one thing. Don't make users feel interrogated.

---

### Stage 4: Analysis & Delivery

**Technical reality:** Claude AI analysis completes in 2-5 minutes.

**Immediately after payment (Auto email #1):**
Subject: "Got it! Analyzing your product now"
Content: Confirmation, 3 things they can prepare while waiting, set expectations

**When report is ready (Auto email #2):**
Subject: "Your report is ready — there's something you should see"
Content: Teaser of key finding, link to full report

**User emotion goal:** From "I hope this is worth it" to "I can't wait to see my results"

---

### Stage 5: Report Delivery (Core Experience)

**The report page must include:**

1. **Summary Card (top, most important)**
   - Feasibility score (big number + circular progress bar)
   - One-liner summary (encouraging tone)
   - Four data points: cost, sourcing country, tariff, lead time
   - This card must be downloadable as PNG — good enough to share on Twitter

2. **Detailed Analysis (expandable sections)**
   - Materials analysis
   - Supplier country comparison table
   - Manufacturing optimization tips (each with savings amount)
   - Action checklist (7 checkable items)

3. **Upsell (bottom)**
   "Want contact info for 3 verified suppliers?" → $199

**User emotion goal:** Surprised, feels $99 was a bargain, immediately wants to share

---

### Stage 6: Sharing & Viral Loop (Critical)

**Trigger sharing with:**

A prominent button at the top of the report: "Share My Results"
Clicking it generates a PNG card + pre-filled Twitter copy:

```
Just used @bottlecap_io to analyze my product idea "{productName}"

Feasibility: {score}/100
Recommended: {country}
Cost: ${min}-${max}/unit
Tariff: {rate}%

Every aspiring product maker should check their numbers
bottlecap.io
```

**Why this spreads:**
- Specific numbers (credible)
- Personal story (relatable)
- Curiosity-driven ("what are MY numbers?")
- Clear CTA

---

### Stage 7: Retention & Upgrades

**Day 3 email:** Latest supply chain market updates (establish "ongoing value")
**Day 7 email:** Monthly subscription offer ($199/month, unlimited analyses)

**Retention logic:** Serial entrepreneurs need new analyses quarterly — subscription beats pay-per-use.

---

## Core Feature List

### MVP Must-Have (Required for first paying user)
- [ ] Landing page (clearly explains the product)
- [ ] Submission form (3 steps)
- [ ] Stripe payment ($99)
- [ ] Claude API analysis (structured JSON output)
- [ ] Report page (well-designed, shareable)
- [ ] Report card PNG download
- [ ] Twitter share button
- [ ] Payment confirmation email
- [ ] Report ready email

### V2 (After 10 users)
- [ ] Progress update emails during analysis
- [ ] $199 supplier list upsell (requires manual supplier verification process)
- [ ] Monthly subscription $199/month

### V3 (After 100 users)
- [ ] User account system
- [ ] Report history
- [ ] Supplier rating database
- [ ] Local model to replace API (cost reduction)

---

## What We Don't Do (Scope Control)

- No live chat
- No supplier marketplace (too complex)
- No multi-language (English first, Mandarin later)
- No mobile app (web first)
- No enterprise tier (individual users first)
- No fabricated social proof (use real data or beta labels only)
