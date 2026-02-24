# CURSOR_PROMPTS.md — Complete Prompt Library for Claude Code

> Every prompt in this file can be copied and pasted directly into Cursor's Claude Code.
> Execute them in order — finish one before moving to the next.

---

## How to Use

1. Open Cursor
2. Open Chat in the project root directory (Cmd+L or Ctrl+L)
3. Copy the corresponding prompt below and paste it
4. Wait for Claude Code to finish, then test the feature
5. Once done, check it off in TASKS.md and continue to the next one

---

## PROMPT-01: Project Initialization

```
I'm building a SaaS product called Bottlecap that helps anyone turn a product idea into a manufacturing analysis report.

Please fully initialize the project:

Step 1: Create a Next.js 14 project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

Step 2: Install all dependencies
npm install @anthropic-ai/sdk @supabase/supabase-js stripe resend framer-motion html-to-image lucide-react @vercel/og

Step 3: Initialize shadcn/ui
npx shadcn@latest init
(Select: Default style, slate base color, yes for CSS variables)

Step 4: Install shadcn components
npx shadcn@latest add button card input textarea progress badge separator toast dialog

Step 5: Add brand colors in tailwind.config.ts under extend.colors:
primary: { DEFAULT: '#FF6B35', hover: '#E85A25', light: '#FFF0EB' }
background: '#FAFAF8'
surface: { DEFAULT: '#FFFFFF', 2: '#F5F5F0' }
muted: '#6B6B6B'
border: { DEFAULT: '#E8E8E4', strong: '#D0D0C8' }

Step 6: Create these empty files (content will be filled in later):
- app/analyze/page.tsx
- app/report/[id]/page.tsx
- app/api/analyze/route.ts
- app/api/create-checkout/route.ts
- app/api/webhook/route.ts
- components/LandingHero.tsx
- components/SubmitForm.tsx
- components/ReportCard.tsx
- components/ShareButton.tsx
- lib/claude.ts
- lib/supabase.ts
- lib/stripe.ts
- lib/resend.ts
- types/index.ts

Step 7: Create a .env.example file with the following contents:
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@bottlecap.io
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Step 8: Create .env.local (copy from .env.example, leave values empty)

Step 9: Update app/layout.tsx:
- Page title: "Bottlecap — Your product idea deserves to be made"
- Background color: #FAFAF8
- Import the Inter font

When finished, tell me all created file paths and whether npm run dev starts successfully.
```

---

## PROMPT-02: TypeScript Type Definitions

```
Please fill in types/index.ts with all TypeScript types needed for the Bottlecap project.

The following interfaces are required (full definitions, do not omit fields):

1. ProductInput — Product information submitted by the user
2. SourcingCountry — Supplier country information
3. MaterialAlternative — Material alternative options
4. OptimizationTip — Optimization suggestions (with savings amount)
5. AnalysisResult — Complete analysis result returned by the Claude API (see structure below)
6. Report — Complete report record stored in Supabase

AnalysisResult JSON structure:
{
  feasibilityScore: number (0-100)
  feasibilityLabel: 'Highly Feasible' | 'Feasible' | 'Needs Adjustment' | 'Challenging'
  oneLinerSummary: string
  hsCode: string
  hsCodeConfidence: number
  category: string
  costEstimate: { min, max, currency:'USD', perUnit:true, assumptions:string }
  annualSavingsOpportunity: number
  sourcingCountries: SourcingCountry[]
  manufacturingSpecs: string[]
  materialsAnalysis: { suggested:string[], alternatives:MaterialAlternative[] }
  optimizationTips: OptimizationTip[]
  actionItems: string[]
  redFlags: string[]
  encouragingNote: string
}

All types must be exported. Add a comment at the top of the file explaining the purpose of each type.
```

---

## PROMPT-03: Supabase Configuration

```
Please complete lib/supabase.ts — create the Supabase client and database operation functions.

Requirements:
1. Create two clients:
   - supabaseClient (for the frontend, using the anon key)
   - supabaseAdmin (for the server side, using the service role key)

2. Export the following functions:
   - createReport(data: Omit<Report, 'id'|'createdAt'>) → Promise<Report>
   - getReport(id: string) → Promise<Report | null>
   - updateReport(id: string, data: Partial<Report>) → Promise<Report>
   - markReportPaid(id: string, stripePaymentId: string) → Promise<void>
   - updateAnalysisResult(id: string, result: AnalysisResult) → Promise<void>
   - incrementShareCount(id: string) → Promise<void>

3. All functions must have complete TypeScript types
4. All functions must have try/catch error handling
5. Use Report and AnalysisResult types (import from @/types)

Also provide the SQL CREATE TABLE statement to run in the Supabase SQL Editor.
```

---

## PROMPT-04: Claude API Integration

```
Please complete lib/claude.ts — wrap the Claude API calls.

Requirements:
1. Read the System Prompt from PROMPTS.md (file is at PROMPTS.md in the project root)

2. Create an analyzeProduct function:
   - Accepts a ProductInput parameter
   - If imageUrl is present, use multimodal (vision) calling
   - If no image, use text-only calling
   - Use the claude-sonnet-4-6 model
   - max_tokens: 4096
   - Return a parsed AnalysisResult type

3. Create a buildUserPrompt function:
   - Accepts ProductInput
   - Maps targetPrice/quantity/mainConcern to English labels
   - Returns a formatted user prompt string

4. Create an extractProductName function:
   - Accepts a product description string
   - Calls Claude to extract a short product name (max 6 words)
   - Returns string

5. Full error handling:
   - Log the raw response on JSON parse failure
   - Return a meaningful error message on API call failure
   - All errors should go to console.error

System Prompt content (copy the full content from PROMPTS.md into a constant in claude.ts):

[Paste the complete System Prompt content from PROMPTS.md here]
```

---

## PROMPT-05: Stripe Payment Flow

```
Please complete all Stripe payment-related files.

1. lib/stripe.ts:
   - Create the Stripe client (server-side)
   - Export a createCheckoutSession function:
     * Accepts: reportId, userEmail, productName
     * Creates a Stripe Checkout Session
     * Amount: 9900 ($99.00)
     * Success redirect: ${BASE_URL}/report/{reportId}?success=true
     * Cancel redirect: ${BASE_URL}/analyze?cancelled=true
     * Store reportId in metadata
     * Return session.url

2. app/api/create-checkout/route.ts (POST):
   - Accepts: { productInput: ProductInput }
   - Creates a report record in Supabase (status: 'pending', isPaid: false)
   - Extracts product name (calls extractProductName)
   - Creates a Stripe Checkout Session
   - Returns { url: checkoutUrl, reportId }

3. app/api/webhook/route.ts (POST):
   - Verifies the Stripe webhook signature
   - Listens for checkout.session.completed events
   - Reads reportId from metadata
   - Calls markReportPaid(reportId, paymentIntentId)
   - Triggers analysis: POST to /api/analyze (passing reportId)
   - Returns 200 OK

Note: The webhook route must use Request instead of NextRequest,
and must export const config = { api: { bodyParser: false } }
to get the raw request body for signature verification.
```

---

## PROMPT-06: Analysis API Route

```
Please complete app/api/analyze/route.ts.

This route is responsible for: calling the Claude API to analyze the product, saving results to the database, and sending an email notification to the user.

POST flow:
1. Accepts { reportId: string }
2. Reads the report from Supabase (getReport)
3. Verifies report.isPaid === true (otherwise return 403)
4. Verifies report.status === 'pending' (prevent duplicate processing)
5. Updates status to 'processing'
6. Calls analyzeProduct(report as ProductInput)
7. Updates analysis_result and status to 'complete'
8. Updates completedAt timestamp
9. Sends completion notification email (calls function from lib/resend.ts)
10. Returns { success: true, reportId }

Error handling:
- If any step fails, update status to 'failed'
- Log the full error to console.error
- Return 500 + error message

Timeout handling:
- Set export const maxDuration = 60
```

---

## PROMPT-07: Landing Page

```
Please complete app/page.tsx — this is the Bottlecap landing page.

Read DESIGN.md for all color, font, and spacing specifications.
Read PRODUCT.md to understand product positioning and user psychology.

The page contains the following sections from top to bottom (in order):

1. Navigation bar (fixed top, semi-transparent white background)
   - Left: Bottlecap (emoji + text, font-bold)
   - Right: GitHub star placeholder + "Start Analysis" button (#FF6B35, rounded-full)

2. Hero section (min-h-screen, vertically centered)
   - Large heading (text-6xl sm:text-7xl font-black):
     "Your product idea" (first line)
     "deserves to be made" (second line, orange underline decoration on this line)
   - Subtitle (text-xl text-muted):
     "Tell me what you want to make. I'll tell you if it's feasible, how much it costs, and where to manufacture it."
   - Large input box (rounded-2xl, with orange focus border):
     placeholder: "Try: A smart water bottle that reminds me to stay hydrated..."
     Orange button on the right: "Analyze this idea →"
   - Three trust badges (no animated counters, no fake stats):
     "Powered by AI" | "2-5 min delivery" | "Money-back guarantee"

3. Social proof (3 user story cards, horizontal row)
   - Each card: avatar (use bg-gradient circle) + name + one quote + a specific number
   - English testimonials (e.g., "Saved $38,000 on my first production run")
   - Cards hover: slight lift (framer-motion whileHover)

4. Report preview (large white card with shadow, slight rotation)
   - Title: "This is what your report looks like"
   - Display a sample report card (using example data):
     Product: Smart Thermos
     Score: 87/100
     Cost: $6.2-8.4/unit
     Sourcing: Vietnam
     Tariff: 12%
     Lead time: 32 days

5. Pricing (two cards)
   - Single report $99 (top-right orange tag: "Most popular")
   - Monthly subscription $199/mo
   - Shared bottom text: "Not satisfied? Full refund within 72 hours"

6. Final CTA
   - Large heading: "Your next product starts here"
   - Orange filled button: "See an example" (link to sample report)
   - Orange outlined button: "Analyze my idea" (link to /analyze)

7. Footer (minimal)
   - "Bottlecap — Bridging creativity and manufacturing"
   - Privacy | Terms | @bottlecap_io

Technical requirements:
- Use framer-motion to add fadeInUp entrance animation to each section
- Mobile responsive (single column, smaller font sizes)
- All colors use values defined in DESIGN.md (#FF6B35, etc.)
- Do NOT use fake statistics or counters
```

---

## PROMPT-08: Submission Form

```
Please complete components/SubmitForm.tsx and app/analyze/page.tsx.

SubmitForm.tsx is a three-step form that feels like a conversation, not a form.

State management:
- currentStep: 1 | 2 | 3
- formData: ProductInput object
- isSubmitting: boolean
- imageFile: File | null
- imagePreview: string | null

Step 1 — "Tell me your idea":
- Title: Large text "What product do you want to make?"
- textarea: rows=5, oversized placeholder (with line breaks):
  "For example:
  A smart pet collar that tracks location,
  silicone shell, built-in GPS module,
  waterproof, 7-day battery life..."
- Image upload area: dashed border, supports drag-and-drop and click
  - After upload, show preview image (object-cover)
  - Display "Image selected" with a check mark
- "Next →" button (validate description is not empty)

Step 2 — "Help me understand more":
- Three sets of selection questions, each using large cards (click to select, selected state shows orange border + light orange background)

Question 1: "How much do you plan to sell it for?"
Option cards: Under $30 / $30-$100 / $100-$300 / Not sure yet

Question 2: "What's your biggest concern?"
Option cards: Cost too high / Can't find a factory / Quality worries / Don't know where to start

Question 3: "How many units?"
Option cards: Under 100 / 100-1,000 / Over 1,000 / Not decided yet

"Next →" button (selection is not mandatory, can skip)

Step 3 — "One last thing":
- Title: "Your report will be sent to your email"
- email input (validate format)
- Report contents checklist (6 items with checks):
  Manufacturing feasibility score (0-100)
  Per-unit cost breakdown
  3-country supplier comparison
  Tariff impact calculation
  10 manufacturing optimization tips
  Shareable report card
- Large orange button: "Pay $99 — Start Analysis"
  - On click: calls POST /api/create-checkout
  - After getting url, redirect with window.location.href
  - Loading state: button shows spinner + "Creating your order..."
- Below the button: "Stripe secure payment · 72-hour refund guarantee"

Top progress bar:
Three segments, current step in orange (w-16), incomplete steps in gray (w-8)

Step transition animations (framer-motion AnimatePresence):
- Old content: opacity 0 + x -20 (slides left to exit)
- New content: opacity 0 + x 20 → opacity 1 + x 0 (slides in from right)

app/analyze/page.tsx:
- max-w-2xl mx-auto
- Top back link: "← Back to home"
- Import and render the SubmitForm component
- Bottom trust badges: Stripe logo + Anthropic powered
```

---

## PROMPT-09: Report Card Component

```
Please complete components/ReportCard.tsx.

This is Bottlecap's most important component because users will screenshot and share it.
Every detail must be carefully designed.

Props:
interface ReportCardProps {
  analysis: AnalysisResult
  productName: string
  reportId: string
  showActions?: boolean  // defaults to true, set to false when exporting PNG
}

Card structure (top to bottom):

Top bar (flex justify-between items-center):
- Left: Bottlecap (small, gray)
- Right: Generated date (small, gray, format: "January 15, 2024")

Separator line

Product name area:
- Product name (text-2xl font-bold, single-line truncation)
- Right side: feasibility label badge (color changes based on feasibilityLabel)
  Highly Feasible → green background
  Feasible → blue background
  Needs Adjustment → yellow background
  Challenging → red background

Score area (centered):
- Circular progress bar (SVG, diameter 120px)
  Arc color based on score:
  80-100: #22C55E (green)
  50-79: #F59E0B (yellow)
  0-49: #EF4444 (red)
- Large number (text-6xl font-black) centered
- "/100" (text-xl text-muted)
- oneLinerSummary (text-sm text-primary, centered, mt-2)

Four-cell data grid (grid grid-cols-2 gap-3):
Each cell:
- emoji + label (text-xs text-muted)
- Value (text-lg font-bold)

Cell 1: Cost/unit / $6.2 - $8.4
Cell 2: Sourcing / Vietnam
Cell 3: Min. Order / 500 units
Cell 4: Lead Time / 32 days

Bottom (if redFlags exist, show one warning):
[redFlags[0]] (small red text)

encouragingNote:
- Wrapped in quotes, italic, gray, centered
- text-sm

Actions area (shown when showActions is true):
- [Download Card] button → calls html-to-image to export PNG
- [Share on Twitter] → opens Twitter with pre-filled copy
- [Share on LinkedIn] → same as above

PNG export functionality:
Use html-to-image's toPng method
Bind ref to the card div
When exporting, set showActions to false (hide buttons via clone or filter)
File name: bottlecap-{productName}-report.png

Twitter share copy:
"Just used @bottlecap_io to analyze my product idea "{productName}"

Feasibility: {score}/100
Recommended: {country}
Cost: ${min}-${max}/unit
Tariff: {rate}%

Every aspiring product maker should check their numbers
bottlecap.io/report/{reportId}"

Styles:
- Overall: bg-white rounded-3xl p-8 shadow-xl
- Card width: w-full max-w-[480px]
- All colors from DESIGN.md
```

---

## PROMPT-10: Report Detail Page

```
Please complete app/report/[id]/page.tsx.

This is the page users land on after clicking the link in their email.

Data fetching:
- Get id from the URL (useParams)
- Call getReport(id) from Supabase to fetch data
- If status !== 'complete', show a waiting state
- If report doesn't exist, show 404

Page structure:

Loading state (status === 'processing' or 'pending'):
- Large loading animation (spinning orange arc)
- "Your report is being generated..."
- "Usually takes 2-5 minutes"
- Use useEffect to poll the API every 5 seconds

Report complete (status === 'complete'):

Top area:
- "Your report is ready!" title
- Small text: generation time

Main content (two-column layout on desktop):
Left column (sticky, 40% width on desktop):
- ReportCard component (displays analysis results)
- Share buttons

Right column (60% width, scrollable):
Collapsible detail sections (using Shadcn Accordion or custom):

Section 1: Supplier Country Comparison
- Table: Country | Tariff | Lead Time | MOQ | Recommendation Score
- Most recommended country highlighted with orange row
- Each row expands to show pros/cons

Section 2: Materials Analysis
- Recommended materials (tag cloud style)
- Alternative material comparison (each with cost impact label)

Section 3: Manufacturing Specs Checklist
- Numbered list, 10 parameters the factory needs
- Each item has a "copy" button (copy to clipboard)

Section 4: Optimization Tips
- Each tip as a card (white background, orange left border)
- Right side shows potential savings amount (green)

Section 5: Action Checklist (interactive)
- 7 checkable checkbox items
- Checked items get strikethrough + gray color
- Progress display: "Completed 3/7"

Bottom Upsell Card:
- Orange gradient background
- "Want contact info for 3 verified suppliers?"
- Details of what's included (factory name, contact person, WhatsApp, past work examples)
- Large button: "Unlock Supplier List — $199"
- Small text: "Manually verified real suppliers, not Alibaba search results"

OG tags (for social share previews):
In the generateMetadata function, return:
title: "{productName} Manufacturing Analysis | Bottlecap"
description: "Feasibility {score}/100 · ${min}-${max}/unit · Recommended: {country}"
og:image: /api/og?id={reportId}
```

---

## PROMPT-11: Email Templates

```
Please complete lib/resend.ts with two email templates.

lib/resend.ts exports two functions:

1. sendConfirmationEmail(to: string, productName: string, reportId: string)
   — Sent immediately after payment

2. sendReportReadyEmail(to: string, productName: string, analysis: AnalysisResult, reportId: string)
   — Sent after report generation is complete

Emails use HTML string format (Resend supports this), no React Email needed.

Email 1 — Payment Confirmation:
Subject: Got it! Analyzing your product now
Style: Concise, warm, builds anticipation

HTML structure:
- Top: Bottlecap logo
- Title: "We're on it"
- Body:
  "Hey! We got your product description. Kai (our AI analyst) is
  digging into your idea right now.
  Your full report usually takes a few minutes.

  While you wait, here are 3 things to think about:
  1. Approximate size and weight of your product
  2. Your ideal packaging style (boxed / bagged / bulk)
  3. Preferred materials (if you have any in mind)

  Keep an eye on this inbox — your report is almost ready."
- Bottom: Bottlecap · Your product idea deserves to be made

Email 2 — Report Ready:
Subject: Your report is ready — there's a finding you should see
Style: Creates suspense, makes users want to click immediately

HTML structure:
- Top: Colored score display (large number {score}/100)
- Key finding (2-3 lines, generated from analysis result):
  If high feasibility: "{productName} is totally viable! Recommended: {country}, ${min}-${max}/unit"
  If savings opportunity: "Switching to {country} could save $X/year in tariffs"
  If risks exist: "There's something you should pay attention to..."
- CTA button: "View Your Full Report" (orange, large)
- Button link: {BASE_URL}/report/{reportId}
- Small text: "Think a friend has a product idea too? Share the love."
- Footer: "Bottlecap · Your product idea deserves to be made"

Notes:
- All HTML must use inline styles (email clients don't support external CSS)
- Primary color: #FF6B35
- Max width: 600px, centered
```

---

## PROMPT-12: GitHub Configuration

```
Please complete the following GitHub-related configuration:

1. Create .gitignore, making sure it includes:
   .env.local
   .env.*.local
   node_modules/
   .next/
   out/
   *.log

2. Create README.md (project root), keep it concise:
   - Bottlecap logo emoji + project name
   - One-line description: "Turn any product idea into a full manufacturing analysis report"
   - Tech stack badges
   - Quick start steps (5 lines or fewer)
   - Note: "Full documentation files are in the project root (DESIGN.md, PRODUCT.md, TECH.md, PROMPTS.md)"

3. Create GitHub Actions file .github/workflows/ci.yml:
   - Trigger: push to main branch
   - Steps: npm install → npm run build → npm run lint
   - Use Node.js 20

4. Confirm all documentation .md files exist in the project root

Run:
git init
git add .
git commit -m "feat: initial Bottlecap project setup"

Then tell me the commands I need to run manually after creating the GitHub repo.
```

---

## Debug Prompt (use this when you hit an error)

```
I encountered this error:

[paste the full error message here]

File with the error: [file path]
What I was doing before the error: [description]

Please:
1. Explain the cause of this error
2. Provide a fix
3. Apply the code changes directly
4. Tell me how to verify the fix worked
```

---

## Standard Prompt for Starting a New Task

```
I'm working on the Bottlecap project (see documentation files in the project root).

Please read TECH.md first to understand the technical architecture,
then read DESIGN.md for the design specifications.

Now help me complete: [specific task]

Requirements:
- Follow all specifications from the root-level documentation files
- Code must have TypeScript types
- Must include error handling
- Tell me how to test when finished
```
