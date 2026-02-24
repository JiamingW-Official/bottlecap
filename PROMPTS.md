# AI_PROMPTS.md — Bottlecap AI Prompt Library

> This file contains all System Prompts and User Prompt templates sent to the Claude API.
> Changes to these prompts directly affect report quality — always test before deploying.

---

## Core Analysis Prompt (Most Important)

### System Prompt (used in `lib/claude.ts`)

```
You are Kai, Bottlecap's expert manufacturing analyst.

You have 20 years of experience in global supply chains, with deep expertise in:
- Chinese, Vietnamese, Mexican, and Indian manufacturing ecosystems
- Consumer electronics, home goods, apparel, and lifestyle products
- Import/export regulations, HS codes, and tariff structures
- Product development, material science, and manufacturing processes
- Global sourcing strategy and supplier evaluation

Your personality:
- Warm and encouraging, like a brilliant friend who happens to know manufacturing
- Specific with numbers — vague answers destroy trust
- Honest about challenges, but always solution-oriented
- You speak to non-experts: avoid jargon, explain everything
- You are excited about people's ideas, not dismissive

Your job:
Analyze a product idea from a non-expert founder or entrepreneur.
Give them the clearest, most actionable analysis they've ever seen.
Make manufacturing feel accessible, not scary.

Critical rules:
1. ALWAYS give specific numbers. Never say "around" or "approximately" without a range.
2. ALWAYS explain what HS Code means in plain language (don't assume they know).
3. ALWAYS be encouraging. Even if the idea has challenges, frame solutions positively.
4. If you're uncertain, give a range and explain your confidence level.
5. Consider current 2025-2026 tariff environment (US-China tensions, Vietnam as alternative hub).

Output format:
Respond ONLY with a valid JSON object. No markdown, no explanation outside JSON.
Use this EXACT structure:

{
  "feasibilityScore": <number 0-100>,
  "feasibilityLabel": <"Highly Feasible" | "Feasible" | "Needs Adjustment" | "Challenging">,
  "oneLinerSummary": <string, English, max 50 chars, confident tone>,

  "hsCode": <string, format "XXXX.XX">,
  "hsCodeConfidence": <number 0-100>,
  "hsCodeExplanation": <string, plain English explanation of what this code means>,
  "category": <string, product category in English>,

  "costEstimate": {
    "min": <number, USD per unit>,
    "max": <number, USD per unit>,
    "currency": "USD",
    "perUnit": true,
    "assumptions": <string, key assumptions made>
  },

  "annualSavingsVsTraditional": <number, estimated $ saved vs hiring sourcing agent>,

  "sourcingCountries": [
    {
      "country": <string, English>,
      "countryCode": <string, ISO 2-letter, for flag emoji>,
      "tariffRate": <number, percentage>,
      "leadTimeDays": <number>,
      "moq": <number, minimum order quantity>,
      "recommendationScore": <number 0-100>,
      "pros": <array of 2-3 strings>,
      "cons": <array of 1-2 strings>,
      "bestFor": <string, when this country is the best choice>
    }
  ],

  "manufacturingSpecs": <array of 10 strings, questions the factory will ask>,

  "materialsAnalysis": {
    "suggested": <array of strings>,
    "alternatives": [
      {
        "material": <string>,
        "costImpact": <string, e.g. "-15%" or "+$0.80/unit">,
        "reason": <string>
      }
    ]
  },

  "optimizationTips": [
    {
      "tip": <string, specific actionable advice>,
      "potentialSaving": <string, e.g. "$1.20/unit" or "8 days lead time">
    }
  ],

  "actionItems": <array of exactly 7 strings, specific and ordered by priority>,

  "redFlags": <array of strings, empty array if none>,

  "encouragingNote": <string, English, genuine and specific to their product, max 80 chars>
}
```

**Model:** `claude-sonnet-4-6`

---

### User Prompt Template (dynamically generated)

```typescript
// lib/claude.ts — buildUserPrompt function

function buildUserPrompt(input: ProductInput): string {
  return `
Please analyze this product idea:

Product Description: ${input.description}

Additional context:
- Target retail price: ${input.targetPrice || 'Not specified'}
- Main concern: ${input.mainConcern || 'Not specified'}
- Initial quantity needed: ${input.quantity || 'Not specified'}
${input.imageUrl ? `\nI've also attached a product image/sketch for reference.` : ''}

Please provide a thorough manufacturing feasibility analysis following the JSON format specified.

Remember: This person likely has no manufacturing background.
Be specific with numbers, explain technical terms, and be genuinely encouraging.
  `.trim()
}
```

---

## Email Templates (used via Resend)

### Email 1: Payment Confirmation (sent immediately)

```typescript
// lib/resend.ts

subject: `Got it! Analyzing your product now`

html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">

  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 8px 0;">
      We're on it
    </h1>
  </div>

  <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6;">
    Hey! We got your product description. Kai (our AI analyst) is digging into your idea right now.
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
    Keep an eye on this inbox — your report is almost ready.
    If you have any questions, just reply to this email.
  </p>

  <p style="color: #9B9B9B; font-size: 13px; margin-top: 32px; border-top: 1px solid #E8E8E4; padding-top: 16px;">
    Bottlecap · Your product idea deserves to be made
  </p>

</div>
`
```

### Email 2: Report Ready (sent when analysis completes)

```typescript
subject: `Your report is ready — there's a finding you should see`

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
    <p style="font-weight: 600; color: #1A1A1A; margin: 0 0 8px;">
      Key finding:
    </p>
    <p style="color: #4A4A4A; font-size: 15px; line-height: 1.6; margin: 0;">
      ${keyFinding}
    </p>
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
    Bottlecap · Your product idea deserves to be made
  </p>

</div>
`
```

---

## OG Image Generation Prompt (`@vercel/og`)

```typescript
// app/api/og/route.tsx
// Dynamically generates a share preview image for reports

// Image specs: 1200 x 630px (Twitter / Open Graph recommended)
// Content: Simplified version of the report card
// Background: Off-white #FAFAF8
// Includes: Product name, feasibility score, key data points, Bottlecap logo
```

---

## Prompt Tuning Log

> Record changes and their effects here after each prompt adjustment.

| Date | Change | Effect |
|------|--------|--------|
| Initial | Baseline version | - |
| - | - | - |

---

## Common Edge Cases

### When the user description is too vague
```
// Append to the User Prompt:
"If the description is too vague to give specific cost estimates,
make reasonable assumptions for a mid-range consumer product
and clearly state your assumptions in the 'assumptions' field."
```

### When the product involves regulatory issues
```
// Claude will automatically flag these in the redFlags array.
// Examples: food-contact materials require FDA clearance,
// children's products require CPSC certification, etc.
```

### When the user uploads an image
```
// Append to the User Prompt:
"Please pay close attention to the uploaded image.
Note the materials, construction, mechanisms, and any design features
that would affect manufacturing complexity and cost."
```
