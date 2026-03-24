"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  FileText,
  Package,
  DollarSign,
  Shield,
  CheckCircle,
  Copy,
  Check,
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Award,
  Gamepad2,
  Settings,
  Star,
  TrendingDown,
  Search,
  Globe,
  BarChart3,
} from "lucide-react"

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Phase {
  id: string
  number: number
  title: string
  icon: React.ReactNode
  description: string
  readTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  keyTakeaway: string
}

interface NegotiationTactic {
  name: string
  script: string
  whenToUse: string
  expectedOutcome: string
  successRate: string
  riskLevel: "Low" | "Medium" | "High"
  exampleDialogue?: string
}

interface ContractItem {
  label: string
  description: string
}

interface ChecklistItem {
  label: string
  detail?: string
}

interface DefectCategory {
  level: string
  color: string
  description: string
  examples: string[]
}

interface ScoringItem {
  criteria: string
  description: string
}

interface SimulatorScenario {
  id: string
  title: string
  description: string
  factoryQuote: number
  targetPrice: number
  quantity: number
  options: {
    label: string
    dialogue: string
    result: number
    feedback: string
  }[]
}

interface SampleCostBenchmark {
  category: string
  range: string
  shippingNote: string
}

interface AQLRow {
  lot: string
  levelI: { sample: number; accept: number; reject: number }
  levelII: { sample: number; accept: number; reject: number }
  levelIII: { sample: number; accept: number; reject: number }
}

// ---------------------------------------------------------------------------
// Phase definitions
// ---------------------------------------------------------------------------

const PHASES: Phase[] = [
  {
    id: "outreach",
    number: 1,
    title: "Initial Outreach",
    icon: <Mail className="w-4 h-4" />,
    description: "First contact with potential factories across multiple platforms",
    readTime: "~12 min reading",
    difficulty: "Beginner",
    keyTakeaway: "Your first message determines whether the factory sees you as a serious buyer or a tire-kicker. Use platform-specific templates, send during their business hours, and ask the golden questions that signal buying intent.",
  },
  {
    id: "rfq",
    number: 2,
    title: "Request for Quote",
    icon: <FileText className="w-4 h-4" />,
    description: "Getting detailed, comparable pricing from suppliers with a 20+ line-item RFQ",
    readTime: "~15 min reading",
    difficulty: "Intermediate",
    keyTakeaway: "A detailed RFQ with 20+ line items gets you apples-to-apples quotes. Calculate your target FOB price from retail backwards, and never accept the first quote.",
  },
  {
    id: "sample",
    number: 3,
    title: "Sample Evaluation",
    icon: <Package className="w-4 h-4" />,
    description: "Requesting, evaluating, and scoring product samples with a 15-point system",
    readTime: "~10 min reading",
    difficulty: "Intermediate",
    keyTakeaway: "Use the 15-point scoring sheet to objectively evaluate every sample. Know your cost benchmarks before ordering, and never approve based on photos alone.",
  },
  {
    id: "price",
    number: 4,
    title: "Price Negotiation",
    icon: <DollarSign className="w-4 h-4" />,
    description: "8 tactical scripts with success rates, risk levels, and a negotiation simulator",
    readTime: "~15 min reading",
    difficulty: "Advanced",
    keyTakeaway: "Price negotiation is a skill, not a confrontation. Use data-backed tactics, understand the factory's cost structure, and always leave them profitable enough to prioritize your order.",
  },
  {
    id: "contract",
    number: 5,
    title: "Contract Terms",
    icon: <Shield className="w-4 h-4" />,
    description: "Protecting your IP, molds, and business with enforceable agreements",
    readTime: "~12 min reading",
    difficulty: "Advanced",
    keyTakeaway: "The tooling ownership clause is the single most critical term. Without it, your factory can hold your molds hostage. Also include IP assignment, exclusivity, and structured payment milestones.",
  },
  {
    id: "qa",
    number: 6,
    title: "Quality Assurance",
    icon: <CheckCircle className="w-4 h-4" />,
    description: "Full AQL tables, third-party inspection guides, golden sample protocol, and defect management",
    readTime: "~15 min reading",
    difficulty: "Advanced",
    keyTakeaway: "Third-party inspection at $250-400 per visit is the cheapest insurance in manufacturing. Use AQL Level II for standard orders and maintain a golden sample protocol from day one.",
  },
]

// ---------------------------------------------------------------------------
// Phase 1 - Initial Outreach (3 platform-specific templates)
// ---------------------------------------------------------------------------

const OUTREACH_ALIBABA_TEMPLATE = `Subject: Sourcing Partner for [Product Type] — [Your Company Name]

Dear [Factory Name] Team,

We found your company through your Alibaba Gold Supplier listing for [product category]. We are [Your Company Name], a US-based [e-commerce brand / product company / Amazon seller] looking for a reliable manufacturing partner for [product description].

ABOUT OUR REQUIREMENTS:
- Product: [Specific product type with key specs]
- Initial order: [X] units
- Ongoing potential: [X] units/month
- Target market: [US / EU / Global]

QUESTIONS FOR YOU:
1. Are you the direct manufacturer, or a trading company?
2. What is your MOQ for this product type?
3. Can you share photos of your factory floor and production lines?
4. Do you have existing certifications relevant to our product (ISO, CE, FDA, etc.)?
5. What is your sample lead time and cost?
6. Can you provide references from current US/EU clients?

We have reviewed your Alibaba profile and are impressed by [mention specific product or rating]. We are evaluating 3-5 factories and plan to select a partner within [X] weeks.

Best regards,
[Your Name]
[Title]
[Company Name]
[Website URL]
[Phone with WhatsApp availability]`

const OUTREACH_MADE_IN_CHINA_TEMPLATE = `Subject: Manufacturing Inquiry — [Product Type] — [Your Company Name]

Dear [Factory Name],

We discovered your company on Made-in-China.com and are interested in your [product category] manufacturing capabilities. We are [Your Company Name], based in [City, State, USA].

PROJECT OVERVIEW:
- Product: [Detailed product description]
- Material requirements: [Primary materials]
- Estimated annual volume: [X] units
- Quality standard: [ISO / industry-specific standard]
- Certifications needed: [CE / FCC / FDA / UL / RoHS]

We are looking for a factory (not a trading company) with:
- Proven experience in [product type]
- In-house QC team
- Export experience to the US/EU market
- Willingness to work with new product development

Could you please reply with:
1. Your factory profile (location, employee count, production capacity)
2. Product photos and relevant certifications
3. MOQ and approximate lead time
4. Whether you can accommodate custom designs

We look forward to potentially building a long-term manufacturing relationship.

Best regards,
[Your Name]
[Company Name]
[Email] | [WhatsApp: +1-XXX-XXX-XXXX]`

const OUTREACH_DIRECT_TEMPLATE = `Subject: Follow-up from [Trade Show Name / Referral Source] — Manufacturing Partnership

Dear [Contact Name],

It was great [meeting you at {Trade Show Name} / receiving your referral from {Referral Name}]. I am following up regarding manufacturing capabilities for [product type].

ABOUT US:
[Your Company Name] is a [brief description — e.g., "growing DTC brand specializing in premium kitchen accessories"]. We currently sell through [Amazon / Shopify / retail partnerships] and are looking to [start manufacturing / switch manufacturers / scale production].

WHAT WE ARE LOOKING FOR:
- Product: [Detailed description]
- Volume: [X] units initial, scaling to [X] units within 12 months
- Timeline: We need samples by [date] and first production by [date]
- Budget: We have a competitive target price in mind and are happy to discuss

WHY WE ARE INTERESTED IN YOUR FACTORY:
[Mention specific reason — e.g., "Your experience with food-grade silicone products aligns perfectly with our needs" or "Your quality certifications exceed our requirements"]

NEXT STEPS:
Could we schedule a 30-minute video call this week to discuss? I am available:
- [Day/Time option 1] (your time zone: [CST/China Standard Time equivalent])
- [Day/Time option 2]
- [Day/Time option 3]

I have attached our product concept brief for your review.

Best regards,
[Your Name]
[Title]
[Company Name]
[Website] | [LinkedIn]
[Phone / WhatsApp]`

const GOLDEN_QUESTIONS = [
  {
    question: "Are you the direct manufacturer or a trading company?",
    why: "Trading companies add 10-30% markup. Direct factories give better prices and faster communication.",
    followUp: "Can you share photos of your factory floor and production lines?",
  },
  {
    question: "What percentage of your production goes to [US/EU/your target market]?",
    why: "Factories with export experience understand Western quality standards and compliance requirements.",
    followUp: "Can you share the names of any US/EU brands you currently produce for?",
  },
  {
    question: "What is your current production capacity utilization?",
    why: "A factory at 90%+ capacity may deprioritize your order. 50-70% utilization is ideal.",
    followUp: "How many production lines do you have for this product type?",
  },
  {
    question: "Do you have an in-house quality control team?",
    why: "In-house QC means fewer defects. Factories without QC rely on you to catch problems.",
    followUp: "How many QC staff and what inspection stages do they cover?",
  },
  {
    question: "Can you provide a factory audit report (BSCI, SMETA, SA8000)?",
    why: "Audit reports verify working conditions, which matters for brand reputation and retailer requirements.",
    followUp: "When was your last third-party audit, and can you share the report?",
  },
  {
    question: "What is your policy on tooling/mold ownership?",
    why: "This one question immediately tells the factory you are experienced and protects your assets.",
    followUp: "Will you sign a tooling ownership agreement confirming we own all molds we pay for?",
  },
]

const RESPONSE_TIME_EXPECTATIONS = [
  { platform: "Alibaba", responseTime: "12-48 hours", notes: "Gold Suppliers typically respond faster. Verified manufacturers are more reliable." },
  { platform: "Made-in-China", responseTime: "24-72 hours", notes: "Slightly slower platform. Follow up after 3 days if no response." },
  { platform: "Direct / Trade Show", responseTime: "2-5 business days", notes: "Personal connections respond slower but more thoughtfully. Email + WeChat follow-up recommended." },
  { platform: "Global Sources", responseTime: "24-48 hours", notes: "Suppliers here are export-focused. Good response quality." },
  { platform: "DHgate / 1688", responseTime: "Varies widely", notes: "Less reliable for custom manufacturing. Better for off-the-shelf products." },
]

const OUTREACH_DOS = [
  "Use a professional email address with your company domain (not Gmail/Yahoo)",
  "Mention specific product details to show you are a serious buyer",
  "Reference their listing source so they know how you found them",
  "Include your company website or LinkedIn for credibility",
  "Send during their business hours (9 AM - 6 PM CST = 10 PM - 7 AM EST)",
  "Follow up after 48-72 hours if no response (factories get hundreds of inquiries)",
  "Mention your target market (US/EU) to signal compliance awareness",
  "Ask questions that only a real buyer would ask (golden questions above)",
]

const OUTREACH_DONTS = [
  "Don't reveal your budget or target price in the first message",
  "Don't ask for pricing without specifying quantity",
  "Don't send the same template to 50+ factories at once (spray-and-pray wastes everyone's time)",
  "Don't use overly casual language, slang, or emojis",
  "Don't share proprietary designs without an NDA in place",
  "Don't demand immediate responses or use urgency pressure",
  "Don't ask 'What is your best price?' in the first message (signals amateur buyer)",
  "Don't ignore time zones — a message at 3 AM their time signals carelessness",
]

const OUTREACH_RED_FLAGS = [
  "Response within minutes with a generic price (likely a trading company, not a factory)",
  "No factory photos, certifications, or audit reports available upon request",
  "Pressure to place an order immediately without sampling",
  "Unwillingness to do a video call or factory tour",
  "Prices significantly below market rate (quality corners being cut or bait-and-switch)",
  "Cannot provide references from existing customers",
  "Requests full payment upfront before any samples",
  "Uses only a free email address (QQ mail, 163.com) with no company domain",
  "Vague about factory location, employee count, or production capacity",
  "Cannot name specific certifications or testing they have completed",
]

// ---------------------------------------------------------------------------
// Phase 2 - RFQ (20+ line-item template)
// ---------------------------------------------------------------------------

const RFQ_TEMPLATE = `Subject: RFQ — [Product Name] — [SKU(s)] — [Your Company Name]

Dear [Factory Contact Name],

Thank you for confirming your manufacturing capabilities. Please find our detailed Request for Quote below. We require pricing for all quantity tiers listed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION A: PRODUCT IDENTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01. Product Name:        [Full product name]
02. SKU / Model No:      [Your internal SKU]
03. Product Description: [2-3 sentence description of the product and its use case]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION B: MATERIALS & CONSTRUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
04. Primary Material:    [e.g., ABS plastic, 304 stainless steel, 100% organic cotton]
05. Secondary Material:  [e.g., silicone gasket, zinc alloy hardware, polyester lining]
06. Surface Finish:      [Matte / Gloss / Brushed / Textured / Powder-coated / Anodized]
07. Printing Method:     [Silk screen / Pad print / UV print / Emboss / Deboss / Laser engrave / Heat transfer]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION C: DIMENSIONS & SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
08. Dimensions (L x W x H): [mm or inches, with tolerances, e.g., 150mm x 80mm x 45mm ±1mm]
09. Weight Target:           [X grams/kg ±X% tolerance]
10. Color(s):                [Pantone reference(s), e.g., Pantone 7621 C (matte)]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION D: PACKAGING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. Inner Packaging:     [Polybag / Blister / Custom box / Sleeve / None]
12. Retail Packaging:    [Custom printed box / Hang card / Window box / Kraft box]
13. Master Carton:       [Preferred dimensions, max weight: 20kg / 44lbs recommended]
14. Units per Carton:    [Target units per master carton]
15. Labeling Requirements: [UPC/EAN barcode, country of origin, FBA labels, care labels]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION E: COMPLIANCE & TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
16. Compliance Standards:  [FDA / CE / FCC / UL / RoHS / REACH / CPSC / Prop 65]
17. Testing Requirements:  [Drop test / Tensile test / Chemical test / Electrical safety]
18. Target Market:          [USA / EU / UK / Canada / Australia / Global]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION F: PRICING & TERMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
19. Target FOB Price:    $[X.XX] per unit (FOB [Shenzhen / Ningbo / Shanghai / Yiwu])
20. Quantity Tiers (please quote each):
    - Tier 1:  500 units
    - Tier 2:  1,000 units
    - Tier 3:  2,500 units
    - Tier 4:  5,000 units
    - Tier 5:  10,000 units
21. Tooling/Mold Costs:   Please quote separately (one-time cost)
22. Sample Cost & Lead Time: Please include

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION G: LOGISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
23. Preferred Incoterm:     [FOB / CIF / DDP / EXW]
24. Destination Port:       [e.g., Los Angeles, CA / Newark, NJ / Felixstowe, UK]
25. Production Lead Time:   Please state (weeks from order confirmation)
26. Payment Terms:          Preferred: 30% deposit / 30% pre-production approval / 40% pre-shipment
                            Please state your standard terms.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please respond by [date]. We are evaluating [3-5] qualified suppliers and aim to select a manufacturing partner within [2-3] weeks.

We are happy to schedule a video call to discuss specifications in detail.

Best regards,
[Your Name]
[Title]
[Company Name]
[Email] | [Phone / WhatsApp]`

const RFQ_CHECKLIST: ChecklistItem[] = [
  { label: "Product name, SKU, and detailed description", detail: "Ambiguity here leads to wrong quotes. Be obsessively specific." },
  { label: "Primary and secondary materials specified", detail: "e.g., 'ABS plastic body with silicone grip' — not just 'plastic'" },
  { label: "Dimensions with tolerances (L x W x H ± Xmm)", detail: "Without tolerances, the factory defines 'close enough' for you" },
  { label: "Weight target with tolerance", detail: "Important for shipping cost calculations and product feel" },
  { label: "Color with Pantone references", detail: "Never say 'blue' — say 'Pantone 286 C'. Colors are subjective without a standard." },
  { label: "Surface finish type specified", detail: "Matte vs. gloss changes cost and tooling requirements" },
  { label: "Printing method specified", detail: "Silk screen, pad print, UV print — each has different cost and quality" },
  { label: "Packaging fully specified (inner, retail, master carton)", detail: "Custom printed boxes can add $0.50-$3.00 per unit" },
  { label: "Labeling and barcode requirements listed", detail: "Amazon FBA has specific barcode requirements (FNSKU)" },
  { label: "Compliance standards listed (FDA/CE/FCC/UL/RoHS)", detail: "Missing certifications can block customs entry or get your listing removed" },
  { label: "Testing requirements specified", detail: "Some tests are destructive — factor sample cost into your budget" },
  { label: "Minimum 4-5 quantity tiers requested", detail: "More tiers reveal the real price curve and negotiation room" },
  { label: "Target FOB price included", detail: "Anchoring with a target price sets expectations. Calculate from retail price." },
  { label: "Tooling/mold costs quoted separately", detail: "Tooling is a one-time cost — know it upfront so it doesn't get hidden in unit price" },
  { label: "Incoterm preference stated", detail: "FOB = you handle shipping. CIF = factory arranges shipping. DDP = door-to-door." },
  { label: "Payment terms proposed", detail: "30/30/40 milestone is ideal. Never 100% upfront." },
  { label: "Sample cost and lead time requested", detail: "Ask in the same RFQ to avoid back-and-forth" },
  { label: "Response deadline included", detail: "Creates urgency and helps you compare quotes simultaneously" },
  { label: "Target market/destination port specified", detail: "Affects compliance, packaging, and shipping logistics" },
  { label: "Mention of competitive evaluation", detail: "'We are evaluating 3-5 suppliers' signals seriousness" },
]

const FOB_PRICE_GUIDE = [
  { category: "Consumer Electronics", multiplier: "4-5x", example: "$50 retail / 5 = $10 target FOB", notes: "High component cost + tooling amortization" },
  { category: "Apparel & Textiles", multiplier: "6-8x", example: "$40 retail / 7 = $5.71 target FOB", notes: "Low material cost, higher labor intensity" },
  { category: "Beauty & Cosmetics", multiplier: "8-12x", example: "$30 retail / 10 = $3.00 target FOB", notes: "Very high margin; packaging drives cost" },
  { category: "Home Goods & Kitchen", multiplier: "5-7x", example: "$35 retail / 6 = $5.83 target FOB", notes: "Varies widely by material (plastic vs. metal)" },
  { category: "Toys & Games", multiplier: "5-7x", example: "$25 retail / 6 = $4.17 target FOB", notes: "Safety testing adds significant compliance cost" },
  { category: "Pet Products", multiplier: "5-8x", example: "$20 retail / 6 = $3.33 target FOB", notes: "Material safety standards similar to children's products" },
  { category: "Bags & Accessories", multiplier: "6-10x", example: "$60 retail / 8 = $7.50 target FOB", notes: "Brand premium allows wider margins" },
  { category: "Sporting Goods", multiplier: "4-6x", example: "$80 retail / 5 = $16.00 target FOB", notes: "Performance materials increase COGS" },
]

const QUOTE_COMPARISON = [
  "Unit price at each quantity tier",
  "Tooling/mold cost (amortized per unit over first order)",
  "Sample cost and lead time",
  "Payment terms offered",
  "Lead time from order confirmation to shipment",
  "Included certifications vs. additional cost",
  "Packaging cost (included or separate?)",
  "Shipping estimate to your destination port",
  "Communication responsiveness (hours to reply)",
  "Factory capacity and current utilization %",
  "Years of experience with your product category",
  "Export experience to your target market",
]

// ---------------------------------------------------------------------------
// Phase 3 - Sample Evaluation
// ---------------------------------------------------------------------------

const SAMPLE_TEMPLATE = `Dear [Factory Contact],

We are ready to proceed with sample evaluation. Please arrange the following:

SAMPLE REQUEST:
- Product: [Product name / SKU]
- Quantity: 3 samples (to check consistency across units)
- Specifications: Per our RFQ dated [date] (attached for reference)
- Material: [Confirm exact material — e.g., "ABS GF-30, not regular ABS"]
- Color: [Pantone reference — e.g., "Pantone 7621 C, matte finish"]
- Packaging: Include production-intent retail packaging if possible

IMPORTANT NOTES:
- Samples must use PRODUCTION-GRADE tooling and materials (not prototype)
- Include all accessories, inserts, and packaging components
- Label each sample with a unique number for reference

SHIPPING:
- Ship via: [DHL / FedEx / UPS] — express air only
- Ship to: [Full address with zip code]
- Courier account: [Your account number OR "Please quote shipping cost"]

PLEASE CONFIRM:
1. Sample cost per unit: $[X]
2. Are sample costs refundable upon order placement?
3. Expected sample lead time (days)
4. Will samples use production-grade or prototype tooling?
5. Can you include a material certificate / test report with the samples?

We will evaluate samples within [5-7] business days of receipt and provide detailed feedback.

Best regards,
[Your Name]
[Company Name]`

const SAMPLE_COST_BENCHMARKS: SampleCostBenchmark[] = [
  { category: "Consumer Electronics", range: "$50 - $200 per sample", shippingNote: "Shipping: $30-80 via DHL/FedEx (2-4 days)" },
  { category: "Apparel & Textiles", range: "$20 - $80 per sample", shippingNote: "Shipping: $20-50 via DHL/FedEx (2-3 days)" },
  { category: "Beauty & Cosmetics", range: "$30 - $100 per sample", shippingNote: "Shipping: $15-40 (lightweight, hazmat rules may apply)" },
  { category: "Home Goods & Kitchen", range: "$15 - $60 per sample", shippingNote: "Shipping: $25-80 depending on size/weight" },
  { category: "Toys & Games", range: "$20 - $80 per sample", shippingNote: "Shipping: $20-50 via DHL/FedEx" },
  { category: "Bags & Accessories", range: "$15 - $50 per sample", shippingNote: "Shipping: $20-40 (lightweight)" },
  { category: "Pet Products", range: "$10 - $50 per sample", shippingNote: "Shipping: $15-40 via DHL/FedEx" },
  { category: "Sporting Goods", range: "$30 - $150 per sample", shippingNote: "Shipping: $40-100 (often bulky/heavy)" },
]

const SAMPLE_SCORING_SHEET: ScoringItem[] = [
  { criteria: "Dimensional Accuracy", description: "All measurements within specified tolerances (use calipers, not a ruler)" },
  { criteria: "Material Quality", description: "Correct material used, appropriate thickness/density, no brittleness or weakness" },
  { criteria: "Color Match", description: "Matches Pantone reference under natural daylight (not fluorescent lighting)" },
  { criteria: "Finish Quality", description: "Surface finish matches spec — no scratches, orange peel, burrs, or flash marks" },
  { criteria: "Function Test", description: "All moving parts, buttons, mechanisms work correctly through 50+ cycles" },
  { criteria: "Durability", description: "Withstands drop test, flex test, or stress test appropriate to product type" },
  { criteria: "Weight Accuracy", description: "Within specified weight tolerance (use digital scale accurate to 0.1g)" },
  { criteria: "Packaging Quality", description: "Retail packaging protects product, prints correctly, folds/assembles cleanly" },
  { criteria: "Labeling Accuracy", description: "All labels, barcodes, and regulatory marks correctly placed and legible" },
  { criteria: "Smell / Off-gassing", description: "No chemical, plastic, or adhesive odors (especially critical for food/children's products)" },
  { criteria: "Assembly Quality", description: "No gaps, misalignment, loose parts, or visible glue/adhesive residue" },
  { criteria: "Print Quality", description: "Logos, text, and graphics are sharp, correctly positioned, and properly adhered" },
  { criteria: "Safety Compliance", description: "No sharp edges, small detachable parts, or pinch points on consumer products" },
  { criteria: "Compliance Marks", description: "Required marks (CE, FCC, etc.) present, correctly sized, and properly placed" },
  { criteria: "Overall Impression", description: "Would a customer feel this is a premium/quality product when unboxing?" },
]

const SAMPLE_TIPS = [
  "Most factories waive sample costs if you proceed with an order -- always ask before paying",
  "Request 3 samples minimum to check consistency between units (not just one perfect piece)",
  "Ask explicitly if samples will use production-grade tooling or prototype tooling -- the difference is significant",
  "Pay for express air shipping (DHL/FedEx) -- sea freight samples take 3-6 weeks and delay everything",
  "Take detailed photos and measurements immediately upon receiving -- document everything",
  "Compare samples side-by-side with competitor products and your golden sample reference",
  "Test under real-world conditions: use the product as a customer would for at least a week",
  "If a sample is close but not perfect, provide specific written feedback with photos and request a revised sample before ordering",
]

// ---------------------------------------------------------------------------
// Phase 4 - Price Negotiation (8 tactics + simulator)
// ---------------------------------------------------------------------------

const NEGOTIATION_TACTICS: NegotiationTactic[] = [
  {
    name: "Volume Leverage",
    script: `"We are planning to scale significantly. If we commit to [X] units/month on a 12-month rolling forecast, can you offer $[target]? We want one factory partner, not three."`,
    whenToUse: "When you have genuine plans to scale and can commit to recurring orders.",
    expectedOutcome: "5-15% reduction from initial quote. Factories value predictable volume over one-time large orders.",
    successRate: "Works ~80% of the time",
    riskLevel: "Low",
    exampleDialogue: "You: 'Our forecast shows 2,000 units/month by Q3. At that volume, we need $8.50 to hit our margins. Can we agree on a price ladder?' Factory: 'For 2,000/month commitment, we can do $9.00. If you reach 3,000, we drop to $8.50.' You: 'Deal. Let's formalize the price ladder in our supply agreement.'",
  },
  {
    name: "Competitive Quotes",
    script: `"We have received comparable quotes from [2-3] qualified factories in the $[X]-$[Y] range. Your quality is strong, but pricing needs to be competitive. Can you match $[target] at [quantity] MOQ?"`,
    whenToUse: "When you genuinely have competing quotes. Never bluff -- experienced factories can tell.",
    expectedOutcome: "3-10% reduction. Most factories will meet competitive pricing rather than lose the business.",
    successRate: "Works ~75% of the time",
    riskLevel: "Low",
    exampleDialogue: "You: 'Factory B quoted $11.20 for the same spec at 1,000 units. Your quality edge is worth something to us, but not $2/unit. Can you come to $11.50?' Factory: 'Our materials are higher grade. Best we can do is $11.80.' You: 'If you hold $11.80 for our first 3 orders, we have a deal.'",
  },
  {
    name: "Payment Terms Swap",
    script: `"Would you consider reducing to $[target] if we adjust payment to 50% deposit upfront? That improves your cash flow and reduces your risk."`,
    whenToUse: "When you have cash flexibility. Offering more upfront reduces factory's financing cost.",
    expectedOutcome: "2-5% price reduction for favorable payment terms.",
    successRate: "Works ~70% of the time",
    riskLevel: "Medium",
    exampleDialogue: "You: 'Standard is 30/70. What if we do 50/50 — does that move the needle on price?' Factory: 'For 50% deposit, we can reduce by 3%, so $10.67 instead of $11.00.' You: 'Let's do it. I'll need a PI with updated terms.'",
  },
  {
    name: "Material Substitution",
    script: `"Are there cost-effective alternative materials that maintain quality? Could you quote using [alternative] instead of [current]? We trust your professional recommendation."`,
    whenToUse: "When material cost is a significant portion of unit price (plastics, metals, textiles).",
    expectedOutcome: "5-20% reduction depending on material. The factory often knows cheaper alternatives.",
    successRate: "Works ~65% of the time",
    riskLevel: "Medium",
    exampleDialogue: "You: 'We specified PC plastic but wondering if ABS would work for non-structural parts?' Factory: 'ABS for the housing saves $1.20/unit. We can keep PC for the internal brackets where strength matters.' You: 'Send revised samples with the ABS housing, and if they pass our tests, we move forward.'",
  },
  {
    name: "Long-term Partnership",
    script: `"We see this as multi-year. Our plan targets [X] units Year 1, scaling to [X] by Year 2. Can we agree on a price ladder that rewards our growth?"`,
    whenToUse: "When you have a credible growth story backed by data (sales projections, marketing budget).",
    expectedOutcome: "Graduated 10-25% reduction over time.",
    successRate: "Works ~70% of the time",
    riskLevel: "Low",
    exampleDialogue: "You: 'Year 1 we project 5,000 units, Year 2 is 15,000. Here is our Amazon sales trajectory. What price makes sense at each level?' Factory: '$12 at 5K, $10.50 at 10K, $9.80 at 15K+.' You: 'Let's put that in writing with quarterly reviews.'",
  },
  {
    name: "Reverse Engineering",
    script: `"We have had this product quoted at $[X] by a factory in [Dongguan/Ningbo]. Their sample quality was acceptable. Can you match or beat that price given your [advantage]?"`,
    whenToUse: "When you have a real competing quote and want to leverage a preferred factory's eagerness to win the business.",
    expectedOutcome: "3-8% reduction. Creates urgency without being adversarial.",
    successRate: "Works ~70% of the time",
    riskLevel: "Medium",
    exampleDialogue: "You: 'We got $9.50 from a Dongguan factory with similar specs. We prefer working with you because of your testing lab, but we need pricing closer to $9.50.' Factory: 'We cannot match $9.50 with our materials, but we can do $9.90 and include free compliance testing.' You: 'The free testing closes the gap. Let's proceed.'",
  },
  {
    name: "Design Optimization",
    script: `"If we simplify [specific feature], how much does the unit cost drop? We are open to design modifications that reduce cost without affecting the customer experience."`,
    whenToUse: "When your product has features that add manufacturing complexity (extra mold cavities, secondary operations, etc.).",
    expectedOutcome: "5-15% reduction by eliminating unnecessary complexity.",
    successRate: "Works ~60% of the time",
    riskLevel: "Low",
    exampleDialogue: "You: 'The textured grip requires a secondary mold operation. What if we switch to a smooth finish?' Factory: 'Smooth finish eliminates one production step and saves $0.80/unit. Total drops from $14.50 to $13.70.' You: 'What about keeping texture only on the front panel?' Factory: 'Front panel only: $14.10. Good compromise.'",
  },
  {
    name: "Tooling Amortization",
    script: `"If we amortize the $[tooling cost] over [5,000] units instead of [1,000], the per-unit tooling component drops from $[X] to $[Y]. Can we reflect that in the unit price for larger orders?"`,
    whenToUse: "When tooling/mold cost is significant (>$3,000) and you plan multiple production runs.",
    expectedOutcome: "Reduces effective unit cost by $0.50-$3.00 depending on tooling investment.",
    successRate: "Works ~85% of the time",
    riskLevel: "Low",
    exampleDialogue: "You: 'Tooling is $8,000. At 1,000 units that's $8/unit just for tooling. If we commit to 5,000 units across 3 orders, that drops to $1.60/unit. Can we price accordingly?' Factory: 'Yes, for a 5,000 unit commitment we can quote $12.50 instead of $18.50. Tooling amortized.' You: 'Perfect. Let's do a 3-order purchase commitment with the amortized pricing.'",
  },
]

const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: "electronics",
    title: "Bluetooth Speaker Negotiation",
    description: "A Shenzhen factory quotes $12.50/unit for 1,000 Bluetooth speakers. Your target is $10.00.",
    factoryQuote: 12.50,
    targetPrice: 10.00,
    quantity: 1000,
    options: [
      {
        label: "A: Lead with volume commitment",
        dialogue: "\"We plan to order 3,000 units over the next 6 months. At that volume, we need $10.00 to hit our margins. Can you work with us on a price ladder?\"",
        result: 10.80,
        feedback: "Good move! You negotiated to $10.80/unit -- 13.6% below asking price. The factory gave a meaningful discount for the volume commitment. A strong opening tactic.",
      },
      {
        label: "B: Present competitive quotes",
        dialogue: "\"We have quotes from two other Shenzhen factories at $10.50 and $11.00 for comparable specs. Your quality is better, but we need competitive pricing. Can you match $10.50?\"",
        result: 10.50,
        feedback: "Excellent! You leveraged competition to reach $10.50/unit -- 16% below asking price. Using real competitor quotes is one of the most effective tactics when done honestly.",
      },
      {
        label: "C: Ask for the best price directly",
        dialogue: "\"$12.50 is too high. What is your best price?\"",
        result: 11.80,
        feedback: "The factory dropped to $11.80 -- only 5.6% off. Asking for 'best price' without leverage gives them no reason to move much. Always bring data or commitment to the table.",
      },
    ],
  },
  {
    id: "apparel",
    title: "Custom T-Shirt Negotiation",
    description: "A Guangzhou factory quotes $4.80/unit for 2,000 custom printed t-shirts. Your target is $3.50.",
    factoryQuote: 4.80,
    targetPrice: 3.50,
    quantity: 2000,
    options: [
      {
        label: "A: Suggest material substitution",
        dialogue: "\"Could we use 180gsm cotton instead of 200gsm? And would 2-color screen print instead of 4-color reduce the cost significantly?\"",
        result: 3.80,
        feedback: "Smart optimization! $3.80/unit is 20.8% below asking. Material and printing changes are the fastest way to reduce apparel costs without sacrificing perceived quality.",
      },
      {
        label: "B: Offer bigger deposit",
        dialogue: "\"What if we pay 50% deposit instead of 30%? That improves your cash position. In exchange, we need $3.60/unit.\"",
        result: 4.10,
        feedback: "You reached $4.10 -- 14.6% reduction. Payment terms help but aren't as impactful for apparel where material costs dominate. Better to combine this with volume or material tactics.",
      },
      {
        label: "C: Combine volume + long-term",
        dialogue: "\"We are launching 4 SKUs this quarter, totaling 8,000 units. If we consolidate all production with you, can you quote $3.50 across the range?\"",
        result: 3.60,
        feedback: "Very strong result at $3.60 -- 25% below asking! Consolidating SKUs gives the factory efficiency gains they can share. Multi-SKU orders are highly attractive to manufacturers.",
      },
    ],
  },
  {
    id: "homegoods",
    title: "Silicone Kitchen Utensil Set Negotiation",
    description: "A Ningbo factory quotes $6.20/unit for 1,500 silicone spatula sets. Your target is $4.80. Tooling cost is $5,000.",
    factoryQuote: 6.20,
    targetPrice: 4.80,
    quantity: 1500,
    options: [
      {
        label: "A: Amortize tooling over larger commitment",
        dialogue: "\"The $5,000 tooling adds $3.33/unit at 1,500. If we commit to 5,000 units over 3 orders, tooling drops to $1.00/unit. Can we get $5.00/unit with the amortized tooling?\"",
        result: 5.10,
        feedback: "Solid tactic! $5.10/unit is 17.7% below asking. Tooling amortization is an underused but powerful lever. The factory likes the commitment, and you get a real cost reduction.",
      },
      {
        label: "B: Simplify the design",
        dialogue: "\"The embossed logo requires a secondary operation. What if we switch to a laser-engraved logo? And can we use a standard Pantone color instead of a custom mix?\"",
        result: 5.40,
        feedback: "Decent result at $5.40 -- 12.9% reduction. Design simplification works but has limits for home goods where material cost (food-grade silicone) is the biggest driver.",
      },
      {
        label: "C: Reverse-engineer with competitor quote",
        dialogue: "\"A Yiwu factory quoted $5.00 for similar specs. We prefer your FDA certification and testing lab. Can you come close to $5.00?\"",
        result: 5.20,
        feedback: "Good negotiation at $5.20 -- 16.1% off. The factory values that you recognize their quality advantage. Pairing competitor pricing with genuine appreciation is effective.",
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Phase 5 - Contract Terms
// ---------------------------------------------------------------------------

const CONTRACT_CHECKLIST: ContractItem[] = [
  { label: "Payment terms & milestones", description: "Deposit %, balance timing, payment method (T/T, L/C, escrow), currency (USD)" },
  { label: "Quality standards & AQL", description: "AQL levels, inspection rights, approved golden sample reference number" },
  { label: "Defect rate tolerance", description: "Maximum acceptable defect rate (typically 1-2.5% for consumer goods)" },
  { label: "IP protection clause", description: "Prohibit factory from manufacturing your product for others or using your designs" },
  { label: "NDA / Confidentiality", description: "Covers product designs, pricing, business information, customer data" },
  { label: "Tooling ownership (CRITICAL)", description: "You own all molds and tooling. Factory must return or transfer on request." },
  { label: "Exclusivity / non-compete", description: "Territory, duration, and conditions for exclusive manufacturing arrangement" },
  { label: "IP assignment for custom designs", description: "All custom designs, engineering, and improvements are your intellectual property" },
  { label: "Delivery schedule & penalties", description: "Specific ship dates with penalties for late delivery (typically 1-2% per week, capped)" },
  { label: "Warranty terms", description: "Duration, coverage, replacement process for defective units post-delivery" },
  { label: "Inspection rights", description: "Right to inspect factory, production line, and finished goods at any time with 48hr notice" },
  { label: "Force majeure", description: "Natural disasters, pandemics, government actions -- defined triggers and remedies" },
  { label: "Governing jurisdiction", description: "Hong Kong or Singapore arbitration (enforceable in China under NY Convention)" },
  { label: "Termination clause", description: "Conditions for ending agreement, notice period, handling of remaining inventory and tooling" },
  { label: "Confidentiality survival", description: "NDA obligations continue after contract termination (typically 3-5 years)" },
  { label: "Sample retention protocol", description: "Factory retains sealed golden sample as production reference for contract duration" },
]

const TOOLING_OWNERSHIP_TEMPLATE = `TOOLING AND MOLD OWNERSHIP CLAUSE

1. OWNERSHIP: All molds, tooling, dies, jigs, fixtures, and production aids ("Tooling") created for the manufacture of Buyer's products shall be the sole and exclusive property of Buyer, regardless of which party paid for their creation or modification.

2. IDENTIFICATION: All Tooling shall be clearly labeled with "Property of [YOUR COMPANY NAME]" and a unique identification number within 30 days of creation.

3. MAINTENANCE: Factory shall maintain all Tooling in good working condition at Factory's expense. Factory shall notify Buyer immediately if any Tooling requires repair or replacement.

4. NO LIEN: Factory shall not pledge, encumber, or create any lien against Buyer's Tooling. Tooling shall not be subject to Factory's creditors.

5. RETURN OR TRANSFER: Upon Buyer's written request, or upon termination of this Agreement, Factory shall:
   (a) Return all Tooling to Buyer at Buyer's expense within 30 days, OR
   (b) Transfer Tooling to a third party designated by Buyer within 30 days

6. NO UNAUTHORIZED USE: Factory shall NOT use Buyer's Tooling to manufacture products for any third party without prior written consent from Buyer.

7. INSURANCE: Factory shall maintain adequate insurance covering loss, damage, or destruction of Buyer's Tooling while in Factory's possession.

8. PENALTY: Unauthorized use of Buyer's Tooling shall constitute a material breach entitling Buyer to immediate termination and damages of no less than $[AMOUNT] per unauthorized unit produced.

[CRITICAL: Without this clause, many factories claim mold ownership and refuse to release your tooling when you try to switch manufacturers. This is the #1 dispute in China manufacturing.]`

const EXCLUSIVITY_TEMPLATE = `EXCLUSIVITY AND NON-COMPETE CLAUSE

1. EXCLUSIVE MANUFACTURING: During the term of this Agreement, Factory agrees to manufacture the Products exclusively for Buyer within the following territory: [TERRITORY — e.g., "United States, Canada, European Union, United Kingdom, and Australia"].

2. NON-COMPETE: Factory shall not manufacture, sell, or distribute:
   (a) Products identical or substantially similar to Buyer's Products
   (b) Products using Buyer's designs, specifications, or trade dress
   (c) Products marketed to Buyer's identified customers or distribution channels

3. DURATION: This non-compete obligation applies during the term of this Agreement and for [24] months following termination.

4. EXCEPTIONS: This clause does not apply to:
   (a) Products manufactured by Factory prior to this Agreement (with evidence)
   (b) Products materially different in design, function, or target market
   (c) Generic, non-branded products sold through Factory's existing channels

5. AUDIT: Buyer reserves the right to audit Factory's customer and production records upon reasonable notice to verify compliance with this clause.

6. BREACH REMEDY: Violation of this clause entitles Buyer to liquidated damages of $[AMOUNT] per breach plus injunctive relief in the agreed jurisdiction.`

const IP_ASSIGNMENT_TEMPLATE = `INTELLECTUAL PROPERTY ASSIGNMENT CLAUSE

1. ASSIGNMENT: Factory hereby irrevocably assigns to Buyer all right, title, and interest in and to:
   (a) All custom product designs developed under this Agreement
   (b) All engineering drawings, CAD files, and technical specifications
   (c) All improvements, modifications, or derivative designs
   (d) All packaging designs and artwork created for Buyer's products

2. WORK FOR HIRE: All creative works produced by Factory under this Agreement are deemed "works made for hire" under applicable copyright law. To the extent any work does not qualify as work for hire, Factory assigns all copyright to Buyer.

3. COOPERATION: Factory shall execute any documents and take any actions reasonably requested by Buyer to perfect Buyer's ownership of the assigned IP, including patent, trademark, and copyright applications.

4. NO RETENTION: Factory shall not retain copies of Buyer's designs or specifications following termination, except as required by law or necessary for warranty support (with Buyer's written approval).

5. PRE-EXISTING IP: This clause does not transfer Factory's pre-existing intellectual property or general manufacturing know-how.`

const PAYMENT_MILESTONE_TEMPLATE = `PAYMENT MILESTONE STRUCTURE

Recommended: 30/30/40 split (protects both parties)

MILESTONE 1 — 30% DEPOSIT
- Trigger: Upon signing of Purchase Order
- Purpose: Covers raw material procurement
- Payment method: T/T wire transfer
- Due within: 5 business days of PO signing
- Factory obligation: Begin material sourcing; provide material certificates within 14 days

MILESTONE 2 — 30% PRE-PRODUCTION APPROVAL
- Trigger: Buyer approves pre-production samples and confirms BOM
- Purpose: Confirms specifications before mass production begins
- Payment method: T/T wire transfer
- Due within: 3 business days of written approval
- Factory obligation: Commence mass production within 5 business days of payment receipt

MILESTONE 3 — 40% BEFORE SHIPMENT
- Trigger: Buyer or third-party inspector passes final QC inspection (AQL standards met)
- Purpose: Balance payment after quality confirmation
- Payment method: T/T wire transfer
- Due within: 3 business days of inspection pass
- Factory obligation: Ship within 5 business days of payment receipt; provide B/L and packing list

ALTERNATIVE STRUCTURES:
- Conservative: 20/30/50 (more leverage on final payment — good for first orders)
- Trust-based: 30/70 (standard but riskier — use only with proven factories)
- New factory: 0/30/30/40 (no deposit; pay 30% after pre-production approval)
- Letter of Credit (L/C): For orders >$50K — bank guarantees payment upon document compliance`

const ESCROW_GUIDANCE = [
  {
    method: "Alibaba Trade Assurance",
    pros: "Free, integrated with Alibaba, dispute resolution process, protects against non-delivery",
    cons: "Limited to Alibaba suppliers, resolution can be slow (30-60 days), favors the platform",
    bestFor: "First orders with Alibaba-sourced factories, orders under $20K",
    cost: "Free for buyers (factory pays a fee)",
  },
  {
    method: "Bank Escrow (Third-party)",
    pros: "Neutral third party, customizable terms, works with any factory",
    cons: "Setup fees ($200-500), requires both parties to agree, slower processing",
    bestFor: "Orders $10K-$100K with non-Alibaba factories, custom products",
    cost: "$200-500 setup + 1-2% of transaction",
  },
  {
    method: "Letter of Credit (L/C)",
    pros: "Bank-guaranteed, industry standard for large orders, strong legal protection",
    cons: "Complex setup, expensive fees, requires banking relationship, slow amendments",
    bestFor: "Orders >$50K, ongoing production relationships, risk-averse buyers",
    cost: "1-3% of L/C value + bank fees (~$500-1,500)",
  },
  {
    method: "PayPal Business",
    pros: "Fast, familiar, buyer protection built in, easy refund process",
    cons: "3-4% fees (high), $10K-$25K transaction limits, factory may not accept",
    bestFor: "Small sample orders, first-time transactions under $5K",
    cost: "2.9-3.9% + $0.30 per transaction",
  },
]

const NDA_TEMPLATE = `CONFIDENTIALITY CLAUSE

Both parties agree to maintain strict confidentiality regarding all proprietary information shared during the course of this manufacturing relationship, including but not limited to:

(a) Product designs, specifications, and engineering drawings
(b) Pricing, cost structures, and business terms
(c) Customer lists, sales data, and market strategies
(d) Manufacturing processes specific to the Product
(e) Business plans, forecasts, and financial information

This obligation survives termination of this agreement for a period of [3/5] years. Breach of this clause entitles the disclosing party to seek injunctive relief and damages in the agreed jurisdiction.

Neither party shall reverse-engineer, copy, or derive products from the other party's proprietary information without explicit written consent.

ENFORCEMENT: Both parties agree to submit disputes arising from this clause to binding arbitration in [Hong Kong / Singapore] under [HKIAC / SIAC] rules. The prevailing party shall be entitled to recover reasonable legal fees.`

const QUALITY_AGREEMENT_TEMPLATE = `QUALITY AGREEMENT CLAUSE

1. QUALITY STANDARD: All products shall conform to the approved Golden Sample (reference: [sample ID/date]) and the written specifications in Appendix [X].

2. INSPECTION: Buyer reserves the right to conduct or commission third-party inspection at any stage of production. Factory shall provide reasonable access and cooperation with 48 hours notice.

3. AQL STANDARD: Final inspection shall follow ISO 2859-1 (ANSI/ASQ Z1.4), General Inspection Level II:
   - Critical defects: 0% AQL (zero tolerance)
   - Major defects: 2.5% AQL
   - Minor defects: 4.0% AQL

4. DEFECT RESOLUTION: For shipments failing AQL inspection:
   - Factory shall sort and replace defective units at factory's cost
   - If defect rate exceeds [X]%, Buyer may reject the entire shipment
   - Factory bears all costs of re-inspection and re-work

5. WARRANTY: Factory warrants all products against manufacturing defects for [12/24] months from delivery date.

6. CONTINUOUS IMPROVEMENT: Factory shall implement corrective actions for recurring defects and provide written root cause analysis within 10 business days of any quality complaint.`

const CONTRACT_RED_FLAGS = [
  "No mention of IP protection or confidentiality in the contract",
  "100% payment required before production starts (standard is 30% max deposit)",
  "No defect rate tolerance specified — leaves quality entirely subjective",
  "Factory retains ownership of tooling and molds you paid for",
  "No right to inspect during production or before shipment",
  "Governing law set exclusively in mainland China (hard to enforce for foreign companies)",
  "No delivery penalties for late shipments — no incentive to ship on time",
  "Vague quality standards with no reference to approved golden samples or AQL",
  "Automatic renewal without notification period — locks you in silently",
  "No termination clause or unreasonable termination penalties (>3 months notice)",
  "Factory can subcontract production without your approval",
  "No provision for tooling return upon termination",
]

// ---------------------------------------------------------------------------
// Phase 6 - Quality Assurance
// ---------------------------------------------------------------------------

const PRE_PRODUCTION_CHECKLIST: ChecklistItem[] = [
  { label: "Golden sample approved, sealed, and retained by both parties", detail: "Both you and the factory keep an identical sealed reference sample" },
  { label: "Bill of materials (BOM) confirmed and signed off", detail: "Every component, material grade, and supplier specified" },
  { label: "Production timeline agreed with milestone dates", detail: "Include: material sourcing, production start, DUPRO, final QC, ship date" },
  { label: "Raw materials sourced and quality verified", detail: "Request material certificates and test reports before production begins" },
  { label: "Tooling/molds tested and approved (T1 samples passed)", detail: "T1 = first samples from production tooling. Must match golden sample." },
  { label: "Packaging artwork and specifications approved (print-ready files sent)", detail: "Check bleeds, die lines, color separations, and barcode scannability" },
  { label: "Certification testing completed and reports received", detail: "FDA, CE, FCC, etc. must be complete BEFORE production, not after" },
  { label: "Pre-production meeting conducted (in-person or video)", detail: "Walk through every spec line-by-line with the factory team" },
  { label: "Third-party inspector booked for DUPRO and pre-shipment", detail: "Book early — inspectors in busy seasons (Sept-Nov) fill up fast" },
]

const DURING_PRODUCTION_TEMPLATE = `Subject: Production Inspection Report — [Product] — [PO Number]

Dear [Factory Contact],

We would like to schedule a during-production inspection (DUPRO) at the following milestone:

Inspection timing: When [30-40]% of production is complete
Inspector: [Your name / third-party company name]
Date requested: [Date]

Please confirm:
1) Current production progress (% complete)
2) Any issues encountered so far
3) Available date for inspection
4) Photos of current production output (minimum 10 photos)

Items to be inspected:
- Conformance to approved golden sample (visual + dimensional)
- Materials match BOM specifications (with certificates)
- Workmanship quality (finish, assembly, function)
- Production line setup and process controls
- Packaging materials readiness
- In-line defect rate tracking data

Please provide a production progress update by [date].

Best regards,
[Your Name]`

const PRE_SHIPMENT_CHECKLIST: ChecklistItem[] = [
  { label: "Visual inspection of finished units (random sample per AQL)", detail: "Use the AQL table below to determine sample size" },
  { label: "Dimensional check against specifications (calipers required)", detail: "Check L/W/H, tolerances, and weight on randomly selected units" },
  { label: "Functional testing of all features", detail: "Test every feature through multiple cycles on randomly selected units" },
  { label: "Packaging inspection (labeling, barcodes, inserts)", detail: "Scan every barcode. Check FBA labels if selling on Amazon." },
  { label: "Carton drop test (single wall: 76cm, double wall: 91cm)", detail: "Drop on each face, edge, and corner. Check product inside for damage." },
  { label: "Weight verification per carton", detail: "Weigh random cartons. Ensure they match packing list within 5%." },
  { label: "Quantity count verification", detail: "Count units in at least 10% of cartons. Match against PO quantity." },
  { label: "Shipping marks and labels correct", detail: "Verify consignee, PO number, carton numbers, and handling marks" },
  { label: "Export documentation complete", detail: "Commercial invoice, packing list, B/L, certificates of origin" },
  { label: "Photos of packed and palletized goods", detail: "Get photos showing loading, container seal number, and packing" },
]

const AQL_TABLE_FULL: AQLRow[] = [
  { lot: "2-8", levelI: { sample: 2, accept: 0, reject: 1 }, levelII: { sample: 3, accept: 0, reject: 1 }, levelIII: { sample: 5, accept: 0, reject: 1 } },
  { lot: "9-15", levelI: { sample: 2, accept: 0, reject: 1 }, levelII: { sample: 3, accept: 0, reject: 1 }, levelIII: { sample: 8, accept: 0, reject: 1 } },
  { lot: "16-25", levelI: { sample: 2, accept: 0, reject: 1 }, levelII: { sample: 5, accept: 0, reject: 1 }, levelIII: { sample: 8, accept: 1, reject: 2 } },
  { lot: "26-50", levelI: { sample: 3, accept: 0, reject: 1 }, levelII: { sample: 8, accept: 0, reject: 1 }, levelIII: { sample: 13, accept: 1, reject: 2 } },
  { lot: "51-90", levelI: { sample: 3, accept: 0, reject: 1 }, levelII: { sample: 13, accept: 1, reject: 2 }, levelIII: { sample: 20, accept: 1, reject: 2 } },
  { lot: "91-150", levelI: { sample: 5, accept: 0, reject: 1 }, levelII: { sample: 20, accept: 1, reject: 2 }, levelIII: { sample: 32, accept: 2, reject: 3 } },
  { lot: "151-280", levelI: { sample: 5, accept: 0, reject: 1 }, levelII: { sample: 32, accept: 2, reject: 3 }, levelIII: { sample: 50, accept: 3, reject: 4 } },
  { lot: "281-500", levelI: { sample: 8, accept: 0, reject: 1 }, levelII: { sample: 50, accept: 3, reject: 4 }, levelIII: { sample: 80, accept: 5, reject: 6 } },
  { lot: "501-1,200", levelI: { sample: 13, accept: 1, reject: 2 }, levelII: { sample: 80, accept: 5, reject: 6 }, levelIII: { sample: 125, accept: 7, reject: 8 } },
  { lot: "1,201-3,200", levelI: { sample: 20, accept: 1, reject: 2 }, levelII: { sample: 125, accept: 7, reject: 8 }, levelIII: { sample: 200, accept: 10, reject: 11 } },
  { lot: "3,201-10,000", levelI: { sample: 32, accept: 2, reject: 3 }, levelII: { sample: 200, accept: 10, reject: 11 }, levelIII: { sample: 315, accept: 14, reject: 15 } },
  { lot: "10,001-35,000", levelI: { sample: 50, accept: 3, reject: 4 }, levelII: { sample: 315, accept: 14, reject: 15 }, levelIII: { sample: 500, accept: 21, reject: 22 } },
  { lot: "35,001-150,000", levelI: { sample: 80, accept: 5, reject: 6 }, levelII: { sample: 500, accept: 21, reject: 22 }, levelIII: { sample: 800, accept: 21, reject: 22 } },
  { lot: "150,001-500,000", levelI: { sample: 125, accept: 7, reject: 8 }, levelII: { sample: 800, accept: 21, reject: 22 }, levelIII: { sample: 1250, accept: 21, reject: 22 } },
]

const INSPECTION_AGENCIES = [
  {
    name: "SGS",
    cost: "$250-$350/inspection",
    coverage: "Worldwide — largest inspection company globally",
    bestFor: "Enterprise clients, comprehensive reports, global supply chains",
    website: "sgs.com",
  },
  {
    name: "Bureau Veritas",
    cost: "$250-$350/inspection",
    coverage: "Strong in China, Vietnam, India, Bangladesh",
    bestFor: "Apparel, textiles, consumer goods, detailed technical inspections",
    website: "bureauveritas.com",
  },
  {
    name: "TUV Rheinland",
    cost: "$280-$400/inspection",
    coverage: "Europe-focused with strong Asia presence",
    bestFor: "CE marking, product safety, electronics, automotive components",
    website: "tuv.com",
  },
  {
    name: "QIMA (AsiaInspection)",
    cost: "$268-$338/inspection",
    coverage: "China, Southeast Asia, South Asia, Africa",
    bestFor: "SMBs, fast booking (48hr), user-friendly online platform, transparent pricing",
    website: "qima.com",
  },
  {
    name: "Intertek",
    cost: "$280-$380/inspection",
    coverage: "Global — strong in safety testing and certification",
    bestFor: "Products requiring safety certification (UL, ETL), lab testing + inspection combo",
    website: "intertek.com",
  },
  {
    name: "V-Trust",
    cost: "$188-$268/inspection",
    coverage: "China-focused, growing Southeast Asia presence",
    bestFor: "Budget-conscious startups, China-specific manufacturing, fast turnaround",
    website: "v-trust.com",
  },
]

const GOLDEN_SAMPLE_PROTOCOL = [
  "Create 2 identical golden samples — one for you, one sealed at the factory",
  "Photograph the golden sample from 6+ angles with a ruler/scale for reference",
  "Document all measurements, weight, and color values in a specification sheet",
  "Seal the factory's copy in a tamper-evident bag with both parties' signatures and date",
  "Store your copy in a climate-controlled environment (not a hot warehouse or garage)",
  "Reference the golden sample number in every PO, inspection report, and quality dispute",
  "Re-validate the golden sample annually or when tooling is repaired/modified",
  "If the golden sample degrades (color fade, material breakdown), create a new sealed reference",
]

const DEFECT_CATEGORIES: DefectCategory[] = [
  {
    level: "Critical",
    color: "#EF4444",
    description: "Could cause harm to the user or violates mandatory regulations. Zero tolerance — AQL 0%.",
    examples: [
      "Sharp edges on a consumer product (cut hazard)",
      "Electrical components that could cause shock or fire",
      "Toxic materials exceeding legal limits (lead, phthalates, BPA)",
      "Choking hazards on children's products (parts <3cm)",
      "Structural failure under normal use conditions",
      "Missing safety warnings required by law",
      "Electronics: Solder bridges, cold solder joints, exposed wiring",
    ],
  },
  {
    level: "Major",
    color: "#F59E0B",
    description: "Reduces usability, likely to cause returns or negative reviews. AQL 2.5% typical.",
    examples: [
      "Product does not function as intended (buttons, mechanisms fail)",
      "Significant color deviation from approved golden sample",
      "Missing components or accessories from packaging",
      "Incorrect labeling, wrong barcode, or missing regulatory marks",
      "Visible damage or defect on primary (customer-facing) surfaces",
      "Apparel: Color bleeding, wrong sizing, visible loose threads on front",
      "Beauty: Product leaking, pump malfunction, label misalignment >3mm",
      "Electronics: Firmware bugs, connectivity failures, battery drain",
    ],
  },
  {
    level: "Minor",
    color: "#22C55E",
    description: "Cosmetic imperfection unlikely to affect sale or use. AQL 4.0% typical.",
    examples: [
      "Slight color variation within acceptable tolerance range",
      "Minor scratches on non-visible or secondary surfaces",
      "Small imperfections in packaging (not affecting product protection)",
      "Slight variations in texture or finish within tolerance",
      "Minor label misalignment (<2mm) on non-critical surfaces",
      "Apparel: Minor thread trim needed, slight pressing wrinkle",
      "Beauty: Minor print registration offset (<1mm), slight shade variation in batch",
    ],
  },
]

const QUALITY_COMPLAINT_TEMPLATE = `Subject: Quality Issue Report — [Product] — [PO Number] — URGENT

Dear [Factory Contact],

We have identified quality issues with the shipment received on [date] for PO [number].

ISSUE SUMMARY:
- Total units received: [X]
- Units inspected: [X] (per AQL Level II sampling)
- Defective units found: [X] ([X]% defect rate)
- Defect classification: [Critical / Major / Minor]

DEFECT DESCRIPTION:
[Detailed description of each defect type with reference to approved golden sample and specifications]

EVIDENCE:
[Attach: photos with annotations, videos, measurement data, comparison to golden sample]

IMPACT:
- [X] units cannot be sold in current condition
- Estimated revenue loss: $[X]
- Customer complaints received: [X]
- Amazon listing health impact: [if applicable]

REQUESTED RESOLUTION:
1. Written root cause analysis within 5 business days
2. Replacement of [X] defective units at factory's cost (including shipping)
3. Credit of $[X] against next order OR refund
4. Corrective action plan (CAP) to prevent recurrence
5. Revised QC checklist incorporating lessons learned

We expect a response within 48 hours. Please arrange a video call to discuss at your earliest convenience.

This issue is governed by Section [X] of our Supply Agreement dated [date] and the Quality Agreement Clause.

Best regards,
[Your Name]
[Title]
[Company Name]`

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200"
      style={{
        borderColor: copied ? "#22C55E" : "#E8E8E4",
        backgroundColor: copied ? "#F0FDF4" : "#FAFAF8",
        color: copied ? "#22C55E" : "#6B6B6B",
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label || "Copy template"}
    </button>
  )
}

function InsiderTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-xl p-4 flex gap-3">
      <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
      <div className="text-sm text-[#92400E] leading-relaxed">{children}</div>
    </div>
  )
}

function TemplateBlock({ content, label }: { content: string; label?: string }) {
  const lines = content.split("\n")
  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#333] bg-[#252525]">
        <span className="text-xs font-semibold text-[#999]">{label || "Template"}</span>
        <CopyButton text={content} />
      </div>
      <div className="px-0 py-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed font-mono">
          {lines.map((line, i) => {
            // Highlight [PLACEHOLDER] values in orange
            const parts = line.split(/(\[[^\]]+\])/g)
            return (
              <div key={i} className="flex hover:bg-[#252525] transition-colors">
                <span className="text-[#555] text-xs w-10 text-right pr-3 select-none shrink-0 pt-px font-mono">
                  {i + 1}
                </span>
                <span className="text-[#E8E8E4] whitespace-pre-wrap pr-4">
                  {parts.map((part, j) =>
                    part.startsWith("[") && part.endsWith("]") ? (
                      <span key={j} className="text-[#FF6B35] font-semibold">{part}</span>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </span>
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}

function ChecklistBlock({ items, title }: { items: ChecklistItem[]; title: string }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-[#1A1A1A] mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 bg-white border border-[#E8E8E4] rounded-lg px-4 py-3">
            <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
              {item.detail && (
                <p className="text-xs text-[#6B6B6B] mt-0.5">{item.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionDivider() {
  return <div className="h-px bg-[#E8E8E4] my-6" />
}

function DifficultyBadge({ level }: { level: "Beginner" | "Intermediate" | "Advanced" }) {
  const config = {
    Beginner: { bg: "#F0FDF4", color: "#22C55E", border: "#22C55E" },
    Intermediate: { bg: "#FFFBEB", color: "#F59E0B", border: "#F59E0B" },
    Advanced: { bg: "#FEF2F2", color: "#EF4444", border: "#EF4444" },
  }
  const c = config[level]
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
      style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}30` }}
    >
      {level}
    </span>
  )
}

function KeyTakeawayCard({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-[#FFF0EB] to-[#FFFBEB] border border-[#FF6B35]/20 rounded-xl p-4 flex gap-3 mb-6">
      <Target className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
      <div>
        <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-wider">Key Takeaway</span>
        <p className="text-sm text-[#1A1A1A] leading-relaxed mt-1">{text}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Template Customizer Component
// ---------------------------------------------------------------------------

function TemplateCustomizer({ onApply }: { onApply: (values: { company: string; product: string; quantity: string; price: string }) => void }) {
  const [company, setCompany] = useState("")
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [applied, setApplied] = useState(false)

  const handleApply = () => {
    onApply({ company, product, quantity, price })
    setApplied(true)
    setTimeout(() => setApplied(false), 2000)
  }

  const hasValues = company || product || quantity || price

  return (
    <div className="bg-gradient-to-r from-[#F0F9FF] to-[#F0FDF4] border border-[#3B82F6]/20 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-4 h-4 text-[#3B82F6]" />
        <h4 className="text-sm font-bold text-[#1A1A1A]">Template Customizer</h4>
        <span className="text-[10px] font-semibold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">Auto-fill all templates</span>
      </div>
      <p className="text-xs text-[#6B6B6B] mb-4">Enter your details below. When you click &quot;Apply to Templates&quot;, all placeholder values across every phase will be filled with your information.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wider block mb-1">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Acme Products Inc."
            className="w-full px-3 py-2 text-sm border border-[#E8E8E4] rounded-lg bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wider block mb-1">Product Name</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g., Wireless Bluetooth Speaker"
            className="w-full px-3 py-2 text-sm border border-[#E8E8E4] rounded-lg bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wider block mb-1">Target Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 1,000 units"
            className="w-full px-3 py-2 text-sm border border-[#E8E8E4] rounded-lg bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wider block mb-1">Target Price (USD)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., $10.00"
            className="w-full px-3 py-2 text-sm border border-[#E8E8E4] rounded-lg bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        disabled={!hasValues}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: applied ? "#22C55E" : "#3B82F6",
          color: "white",
        }}
      >
        {applied ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
        {applied ? "Applied to all templates!" : "Apply to Templates"}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Negotiation Simulator Component
// ---------------------------------------------------------------------------

function NegotiationSimulator() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const scenario = SIMULATOR_SCENARIOS[activeScenario]

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowResult(true)
  }

  const handleReset = () => {
    setSelectedOption(null)
    setShowResult(false)
  }

  const handleNextScenario = () => {
    setActiveScenario((prev) => (prev + 1) % SIMULATOR_SCENARIOS.length)
    setSelectedOption(null)
    setShowResult(false)
  }

  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A1A0A] border border-[#FF6B35]/30 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#333] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-[#FF6B35]" />
          <span className="text-sm font-bold text-white">Negotiation Simulator</span>
          <span className="text-[10px] font-semibold text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded-full">Interactive</span>
        </div>
        <div className="flex gap-1.5">
          {SIMULATOR_SCENARIOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveScenario(i)
                setSelectedOption(null)
                setShowResult(false)
              }}
              className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors"
              style={{
                backgroundColor: i === activeScenario ? "#FF6B35" : "#333",
                color: i === activeScenario ? "white" : "#999",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-white font-bold text-base mb-2">{scenario.title}</h4>
        <p className="text-[#999] text-sm mb-1">{scenario.description}</p>
        <div className="flex gap-4 mb-5">
          <span className="text-xs text-[#FF6B35]">Factory quote: <strong>${scenario.factoryQuote.toFixed(2)}</strong></span>
          <span className="text-xs text-[#22C55E]">Your target: <strong>${scenario.targetPrice.toFixed(2)}</strong></span>
          <span className="text-xs text-[#999]">Qty: <strong>{scenario.quantity.toLocaleString()}</strong></span>
        </div>

        <p className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wider mb-3">Choose your negotiation approach:</p>

        <div className="space-y-3">
          {scenario.options.map((option, i) => {
            const isSelected = selectedOption === i
            const isOtherSelected = selectedOption !== null && selectedOption !== i
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: isOtherSelected && showResult ? 0.4 : 1,
                  scale: isSelected && showResult ? 1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => !showResult && handleSelect(i)}
                  disabled={showResult}
                  className="w-full text-left rounded-xl p-4 transition-all duration-200 border"
                  style={{
                    backgroundColor: isSelected ? "#FF6B35" + "15" : "#252525",
                    borderColor: isSelected ? "#FF6B35" : "#333",
                  }}
                >
                  <p className="text-sm font-semibold text-white mb-1">{option.label}</p>
                  <p className="text-xs text-[#BBB] italic leading-relaxed">{option.dialogue}</p>
                </button>

                {isSelected && showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-3 rounded-xl p-4 border border-[#22C55E]/30 bg-[#22C55E]/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-sm font-bold text-white">
                        Result: ${option.result.toFixed(2)}/unit
                      </span>
                      <span className="text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
                        {((1 - option.result / scenario.factoryQuote) * 100).toFixed(1)}% below asking
                      </span>
                    </div>
                    <p className="text-xs text-[#CCC] leading-relaxed">{option.feedback}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleReset}
                        className="text-[10px] font-semibold text-[#999] hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-[#333]"
                      >
                        Try again
                      </button>
                      <button
                        onClick={handleNextScenario}
                        className="text-[10px] font-semibold text-[#FF6B35] hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-[#FF6B35]/10"
                      >
                        Next scenario
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phase Content Renderers
// ---------------------------------------------------------------------------

function PhaseOutreach() {
  const [activeTemplate, setActiveTemplate] = useState<"alibaba" | "mic" | "direct">("alibaba")

  const templates = {
    alibaba: { label: "Alibaba Outreach", content: OUTREACH_ALIBABA_TEMPLATE },
    mic: { label: "Made-in-China Outreach", content: OUTREACH_MADE_IN_CHINA_TEMPLATE },
    direct: { label: "Direct / Trade Show Follow-up", content: OUTREACH_DIRECT_TEMPLATE },
  }

  return (
    <div className="space-y-6">
      {/* 3 Email Templates */}
      <div>
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#FF6B35]" /> Platform-Specific Email Templates
        </h4>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {(Object.keys(templates) as Array<keyof typeof templates>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTemplate(key)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all"
              style={{
                borderColor: activeTemplate === key ? "#FF6B35" : "#E8E8E4",
                backgroundColor: activeTemplate === key ? "#FFF0EB" : "white",
                color: activeTemplate === key ? "#FF6B35" : "#6B6B6B",
              }}
            >
              {templates[key].label}
            </button>
          ))}
        </div>
        <TemplateBlock content={templates[activeTemplate].content} label={templates[activeTemplate].label} />
      </div>

      {/* Best time to reach */}
      <div className="bg-gradient-to-r from-[#F0F9FF] to-[#EFF6FF] border border-[#3B82F6]/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#3B82F6]" /> Best Time to Reach Chinese Factories
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-lg p-3 border border-[#E8E8E4]">
            <p className="text-[10px] font-semibold text-[#3B82F6] uppercase tracking-wider mb-1">China Standard Time (CST/UTC+8)</p>
            <p className="text-lg font-black text-[#1A1A1A]">9:00 AM - 6:00 PM</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-[#E8E8E4]">
            <p className="text-[10px] font-semibold text-[#3B82F6] uppercase tracking-wider mb-1">US Eastern Time (EST)</p>
            <p className="text-lg font-black text-[#1A1A1A]">10:00 PM - 7:00 AM</p>
          </div>
        </div>
        <p className="text-xs text-[#6B6B6B]">
          <strong>Peak response window:</strong> Tuesday-Thursday, 10 AM - 4 PM CST. Avoid Chinese holidays: Chinese New Year (2-3 weeks shutdown), Golden Week (Oct 1-7), Mid-Autumn Festival. Response rates drop 40% on weekends and 90% during holiday shutdowns.
        </p>
      </div>

      {/* Response Time Expectations */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#FF6B35]" /> Response Time Expectations by Platform
        </h4>
        <div className="space-y-2">
          {RESPONSE_TIME_EXPECTATIONS.map((item, i) => (
            <div key={i} className="flex gap-3 bg-[#FAFAF8] rounded-lg px-4 py-3">
              <Globe className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-[#1A1A1A]">{item.platform}</span>
                  <span className="text-[10px] font-bold text-[#FF6B35] bg-[#FFF0EB] px-2 py-0.5 rounded-full">{item.responseTime}</span>
                </div>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Golden Questions */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Star className="w-4 h-4 text-[#F59E0B]" /> Golden Questions (Signal You Are a Serious Buyer)
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">These questions separate serious buyers from tire-kickers. Factories prioritize inquiries that include them.</p>
        <div className="space-y-3">
          {GOLDEN_QUESTIONS.map((q, i) => (
            <div key={i} className="bg-[#FAFAF8] rounded-xl p-4 border border-[#E8E8E4]">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                <span className="text-[#FF6B35] font-bold mr-2">{i + 1}.</span>
                &quot;{q.question}&quot;
              </p>
              <p className="text-xs text-[#6B6B6B] mb-1"><strong>Why it matters:</strong> {q.why}</p>
              <p className="text-xs text-[#22C55E]"><strong>Follow-up:</strong> &quot;{q.followUp}&quot;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
          <h4 className="text-sm font-bold text-[#22C55E] mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Do&apos;s
          </h4>
          <ul className="space-y-2">
            {OUTREACH_DOS.map((item, i) => (
              <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
                <span className="text-[#22C55E] shrink-0">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
          <h4 className="text-sm font-bold text-[#EF4444] mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Don&apos;ts
          </h4>
          <ul className="space-y-2">
            {OUTREACH_DONTS.map((item, i) => (
              <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
                <span className="text-[#EF4444] shrink-0">-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-white border border-[#EF4444]/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#EF4444] mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Red Flags in Responses
        </h4>
        <ul className="space-y-2">
          {OUTREACH_RED_FLAGS.map((item, i) => (
            <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
              <AlertTriangle className="w-3 h-3 text-[#EF4444] shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <InsiderTip>
        <strong>Pro tip:</strong> Send your outreach on Tuesday-Thursday during Chinese business hours (9 AM - 6 PM CST). Response rates are 40% higher compared to weekends or Chinese holidays. Also check the Chinese holiday calendar -- factories shut down completely for Chinese New Year (Jan/Feb, 2-3 weeks) and Golden Week (Oct 1-7). Plan your sourcing timeline accordingly.
      </InsiderTip>
    </div>
  )
}

function PhaseRFQ() {
  return (
    <div className="space-y-6">
      <TemplateBlock content={RFQ_TEMPLATE} label="Complete RFQ Template (26 Line Items)" />

      <ChecklistBlock items={RFQ_CHECKLIST} title="RFQ Checklist -- 20 Items to Include" />

      <SectionDivider />

      {/* FOB Price Guide */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[#FF6B35]" /> How to Calculate Your Target FOB Price
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">
          <strong>Formula:</strong> Target FOB = Retail Price / Markup Multiplier. This gives you a data-backed anchor for negotiations. The multiplier varies by category because each has different cost structures.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-[#6B6B6B]">Category</th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-[#6B6B6B]">Multiplier</th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-[#6B6B6B]">Example</th>
                <th className="text-left py-2.5 pl-4 text-xs font-semibold text-[#6B6B6B] hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {FOB_PRICE_GUIDE.map((row, i) => (
                <tr key={i} className="border-b border-[#E8E8E4]">
                  <td className="py-2.5 pr-4 text-[#1A1A1A] font-medium">{row.category}</td>
                  <td className="py-2.5 px-4 text-[#FF6B35] font-bold">{row.multiplier}</td>
                  <td className="py-2.5 px-4 text-[#1A1A1A] font-mono text-xs">{row.example}</td>
                  <td className="py-2.5 pl-4 text-[#6B6B6B] text-xs hidden sm:table-cell">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-[#9B9B9B] mt-3">
          These multipliers account for: FOB cost + shipping + customs + Amazon/platform fees + marketing + your profit margin. If your FOB target seems unrealistically low, you may need to adjust retail price or product specifications.
        </p>
      </div>

      <SectionDivider />

      {/* Quote Comparison */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#FF6B35]" /> How to Compare Quotes
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">
          Create a spreadsheet with these columns for each factory. Score each category 1-5 and calculate a weighted total.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUOTE_COMPARISON.map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-xs font-bold text-[#FF6B35] shrink-0 w-5">{i + 1}.</span>
              <span className="text-sm text-[#1A1A1A]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <InsiderTip>
        <strong>Pro tip:</strong> Always request quotes in USD, not RMB. This locks your cost and shifts currency risk to the factory. Also, the first quote is never the best quote -- it is the opening position for negotiation. Expect 10-20% room for improvement. Request quotes from at least 3-5 factories to understand the real market price.
      </InsiderTip>
    </div>
  )
}

function PhaseSample() {
  return (
    <div className="space-y-6">
      <TemplateBlock content={SAMPLE_TEMPLATE} label="Sample Request Template" />

      {/* Sample Cost Benchmarks */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#FF6B35]" /> Sample Cost Benchmarks by Category
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">Know what to expect before you order. If a factory charges significantly more, ask why.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-[#6B6B6B]">Category</th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-[#6B6B6B]">Sample Cost</th>
                <th className="text-left py-2.5 pl-4 text-xs font-semibold text-[#6B6B6B]">Shipping</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_COST_BENCHMARKS.map((row, i) => (
                <tr key={i} className="border-b border-[#E8E8E4]">
                  <td className="py-2.5 pr-4 text-[#1A1A1A] font-medium">{row.category}</td>
                  <td className="py-2.5 px-4 text-[#FF6B35] font-semibold">{row.range}</td>
                  <td className="py-2.5 pl-4 text-[#6B6B6B] text-xs">{row.shippingNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SectionDivider />

      {/* 15-Point Scoring Sheet */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#FF6B35]" /> 15-Point Sample Evaluation Scoring Sheet
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">Rate each criterion 1-5. A score below 60/75 (80%) means request revised samples before ordering.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-2.5 pr-2 text-xs font-semibold text-[#6B6B6B] w-6">#</th>
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-[#6B6B6B]">Criteria</th>
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-[#6B6B6B] hidden sm:table-cell">What to Check</th>
                <th className="text-center py-2.5 text-xs font-semibold text-[#6B6B6B] w-16">Score</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_SCORING_SHEET.map((item, i) => (
                <tr key={i} className="border-b border-[#E8E8E4]">
                  <td className="py-2.5 pr-2 text-[#FF6B35] font-bold text-xs">{i + 1}</td>
                  <td className="py-2.5 pr-4 text-[#1A1A1A] font-medium">{item.criteria}</td>
                  <td className="py-2.5 pr-4 text-[#6B6B6B] text-xs hidden sm:table-cell">{item.description}</td>
                  <td className="py-2.5 text-center text-[#9B9B9B] text-xs">_ / 5</td>
                </tr>
              ))}
              <tr className="border-t-2 border-[#1A1A1A]">
                <td colSpan={3} className="py-2.5 text-right text-sm font-bold text-[#1A1A1A] pr-4">TOTAL</td>
                <td className="py-2.5 text-center text-sm font-bold text-[#FF6B35]">_ / 75</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-[#F0FDF4] rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-[#22C55E] uppercase">Pass</p>
            <p className="text-sm font-bold text-[#1A1A1A]">60-75</p>
          </div>
          <div className="bg-[#FFFBEB] rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-[#F59E0B] uppercase">Revise</p>
            <p className="text-sm font-bold text-[#1A1A1A]">45-59</p>
          </div>
          <div className="bg-[#FEF2F2] rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-[#EF4444] uppercase">Reject</p>
            <p className="text-sm font-bold text-[#1A1A1A]">&lt; 45</p>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Tips */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#F59E0B]" /> Sample Evaluation Tips
        </h4>
        <ul className="space-y-2">
          {SAMPLE_TIPS.map((tip, i) => (
            <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
              <span className="text-[#FF6B35] font-bold shrink-0">{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <InsiderTip>
        <strong>Pro tip:</strong> Never approve a sample over photos alone. Physical samples reveal texture, weight, finish quality, and smell that photos cannot capture. Budget $50-150 for express shipping -- it is the cheapest insurance against a $10,000+ bad production run.
      </InsiderTip>
    </div>
  )
}

function PhasePrice() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[#6B6B6B] leading-relaxed">
        Eight proven negotiation tactics with ready-to-use scripts. Each includes success rates, risk levels, and real example dialogues. Read the &quot;When to Use&quot; guidance before deploying.
      </p>

      {NEGOTIATION_TACTICS.map((tactic, i) => (
        <TacticCard key={i} tactic={tactic} index={i} />
      ))}

      <SectionDivider />

      {/* Negotiation Simulator */}
      <NegotiationSimulator />

      <InsiderTip>
        <strong>Pro tip:</strong> Never negotiate over email alone. Schedule a video call for the final price discussion. Face-to-face (even virtual) builds trust, and real-time conversation allows you to read reactions and make concessions. Always follow up the call with a written summary of agreed terms. The best negotiations end with both parties feeling they got a fair deal -- a factory that feels squeezed will cut quality corners.
      </InsiderTip>
    </div>
  )
}

function TacticCard({ tactic, index }: { tactic: NegotiationTactic; index: number }) {
  const [expanded, setExpanded] = useState(false)

  const riskColors = {
    Low: { bg: "#F0FDF4", color: "#22C55E" },
    Medium: { bg: "#FFFBEB", color: "#F59E0B" },
    High: { bg: "#FEF2F2", color: "#EF4444" },
  }
  const rc = riskColors[tactic.riskLevel]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, ease: EASE, duration: 0.3 }}
      className="bg-white border border-[#E8E8E4] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="w-7 h-7 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <span className="text-sm font-bold text-[#1A1A1A]">{tactic.name}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: rc.bg, color: rc.color }}>
            {tactic.riskLevel} Risk
          </span>
          <span className="text-[10px] font-semibold text-[#6B6B6B] bg-[#F5F5F3] px-2 py-0.5 rounded-full">
            {tactic.successRate}
          </span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              <div className="bg-[#1A1A1A] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#999]">Script</span>
                  <CopyButton text={tactic.script.replace(/["\u201C\u201D]/g, '"')} label="Copy script" />
                </div>
                <p className="text-sm text-[#E8E8E4] italic leading-relaxed font-mono">{tactic.script}</p>
              </div>

              {tactic.exampleDialogue && (
                <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg p-4">
                  <p className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wide mb-2">Example Dialogue</p>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed whitespace-pre-line">{tactic.exampleDialogue}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#F0FDF4] border border-[#22C55E]/20 rounded-lg p-3">
                  <p className="text-[10px] font-semibold text-[#22C55E] uppercase tracking-wide mb-1">When to Use</p>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed">{tactic.whenToUse}</p>
                </div>
                <div className="bg-[#FFF0EB] border border-[#FF6B35]/20 rounded-lg p-3">
                  <p className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wide mb-1">Expected Outcome</p>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed">{tactic.expectedOutcome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PhaseContract() {
  return (
    <div className="space-y-6">
      {/* Contract Checklist */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#FF6B35]" /> Key Contract Terms Checklist (16 Items)
        </h4>
        <div className="space-y-2">
          {CONTRACT_CHECKLIST.map((item, i) => (
            <div key={i} className="flex gap-3 bg-[#FAFAF8] rounded-lg px-4 py-3">
              <span className="text-xs font-bold text-[#FF6B35] shrink-0 mt-0.5 w-5">{i + 1}.</span>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* CRITICAL: Tooling Ownership */}
      <div className="border-2 border-[#EF4444]/30 rounded-2xl overflow-hidden">
        <div className="bg-[#FEF2F2] px-5 py-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          <span className="text-sm font-bold text-[#EF4444]">CRITICAL: Tooling Ownership Clause</span>
          <span className="text-[10px] font-bold text-white bg-[#EF4444] px-2 py-0.5 rounded-full">Most Important Clause</span>
        </div>
        <div className="p-1">
          <TemplateBlock content={TOOLING_OWNERSHIP_TEMPLATE} label="Tooling Ownership Clause Template" />
        </div>
      </div>

      {/* Exclusivity */}
      <TemplateBlock content={EXCLUSIVITY_TEMPLATE} label="Exclusivity / Non-Compete Clause Template" />

      {/* IP Assignment */}
      <TemplateBlock content={IP_ASSIGNMENT_TEMPLATE} label="IP Assignment Clause Template" />

      <SectionDivider />

      {/* Payment Milestones */}
      <TemplateBlock content={PAYMENT_MILESTONE_TEMPLATE} label="Payment Milestone Structure" />

      <SectionDivider />

      {/* Escrow / Trade Assurance Guidance */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#3B82F6]" /> Payment Protection Options
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">Choose the right payment protection method based on your order size and factory relationship.</p>
        <div className="space-y-3">
          {ESCROW_GUIDANCE.map((method, i) => (
            <div key={i} className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-bold text-[#1A1A1A]">{method.method}</span>
                <span className="text-[10px] font-semibold text-[#FF6B35] bg-[#FFF0EB] px-2 py-0.5 rounded-full">{method.cost}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="font-semibold text-[#22C55E] mb-0.5">Pros</p>
                  <p className="text-[#6B6B6B]">{method.pros}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#EF4444] mb-0.5">Cons</p>
                  <p className="text-[#6B6B6B]">{method.cons}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#3B82F6] mb-0.5">Best For</p>
                  <p className="text-[#6B6B6B]">{method.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* NDA and Quality Agreement */}
      <TemplateBlock content={NDA_TEMPLATE} label="NDA / Confidentiality Clause Template" />

      <TemplateBlock content={QUALITY_AGREEMENT_TEMPLATE} label="Quality Agreement Clause Template" />

      <SectionDivider />

      {/* Red Flags */}
      <div className="bg-white border border-[#EF4444]/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#EF4444] mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Red Flags in Factory Contracts
        </h4>
        <ul className="space-y-2">
          {CONTRACT_RED_FLAGS.map((item, i) => (
            <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
              <AlertTriangle className="w-3 h-3 text-[#EF4444] shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <InsiderTip>
        <strong>Pro tip:</strong> Have your contract reviewed by a lawyer experienced in Chinese manufacturing law. It costs $500-1,500 and can save you from catastrophic IP theft or payment disputes. Hong Kong or Singapore arbitration clauses are enforceable in China under the New York Convention -- mainland Chinese courts are not always reliable for foreign companies.
      </InsiderTip>
    </div>
  )
}

function PhaseQA() {
  const [aqlLevel, setAqlLevel] = useState<"levelI" | "levelII" | "levelIII">("levelII")

  return (
    <div className="space-y-6">
      <ChecklistBlock items={PRE_PRODUCTION_CHECKLIST} title="Pre-Production Checklist" />

      <SectionDivider />

      {/* Golden Sample Protocol */}
      <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Star className="w-4 h-4 text-[#F59E0B]" /> Golden Sample Protocol
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-3">A golden sample is your quality reference standard. Every inspection and dispute refers back to it. Follow this protocol from day one.</p>
        <div className="space-y-2">
          {GOLDEN_SAMPLE_PROTOCOL.map((step, i) => (
            <div key={i} className="flex gap-3 bg-white/80 rounded-lg px-4 py-2.5">
              <span className="text-xs font-bold text-[#F59E0B] shrink-0 mt-0.5 w-5">{i + 1}.</span>
              <p className="text-sm text-[#1A1A1A]">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      <TemplateBlock content={DURING_PRODUCTION_TEMPLATE} label="During-Production Inspection Request" />

      <SectionDivider />

      <ChecklistBlock items={PRE_SHIPMENT_CHECKLIST} title="Pre-Shipment Inspection Checklist" />

      <SectionDivider />

      {/* Full AQL Table with Level Selector */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#FF6B35]" /> AQL Sampling Table (ISO 2859-1)
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">
          Select your inspection level. Level II is standard for most consumer products. Level I is reduced (fewer samples). Level III is tightened (more samples, stricter).
        </p>
        <div className="flex gap-2 mb-4">
          {([
            { key: "levelI" as const, label: "Level I (Reduced)" },
            { key: "levelII" as const, label: "Level II (Standard)" },
            { key: "levelIII" as const, label: "Level III (Tightened)" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setAqlLevel(key)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all"
              style={{
                borderColor: aqlLevel === key ? "#FF6B35" : "#E8E8E4",
                backgroundColor: aqlLevel === key ? "#FFF0EB" : "white",
                color: aqlLevel === key ? "#FF6B35" : "#6B6B6B",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-[#6B6B6B]">Lot Size</th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-[#6B6B6B]">Sample Size</th>
                <th className="text-right py-2.5 px-4 text-xs font-semibold text-[#22C55E]">Accept (2.5% AQL)</th>
                <th className="text-right py-2.5 pl-4 text-xs font-semibold text-[#EF4444]">Reject</th>
              </tr>
            </thead>
            <tbody>
              {AQL_TABLE_FULL.map((row, i) => {
                const data = row[aqlLevel]
                return (
                  <tr key={i} className="border-b border-[#E8E8E4]">
                    <td className="py-2.5 pr-4 text-[#1A1A1A] font-medium">{row.lot}</td>
                    <td className="py-2.5 px-4 text-right text-[#1A1A1A]">{data.sample}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-[#22C55E]">{data.accept}</td>
                    <td className="py-2.5 pl-4 text-right font-bold text-[#EF4444]">{data.reject}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-[#9B9B9B] mt-3">
          Accept = max defects to pass. Reject = number of defects that triggers lot rejection. For critical defects, ALWAYS use 0% AQL (accept 0, reject 1) regardless of inspection level.
        </p>
      </div>

      <SectionDivider />

      {/* Third-Party Inspector Guide */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#FF6B35]" /> Third-Party Inspection Agencies
        </h4>
        <p className="text-xs text-[#6B6B6B] mb-4">
          Typical cost: $250-$400 per man-day in China/Vietnam. Book at least 5 business days in advance. Peak season (Aug-Nov) requires 7-10 days notice.
        </p>
        <div className="space-y-3">
          {INSPECTION_AGENCIES.map((agency, i) => (
            <div key={i} className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-bold text-[#1A1A1A]">{agency.name}</span>
                <span className="text-[10px] font-semibold text-[#FF6B35] bg-[#FFF0EB] px-2 py-0.5 rounded-full">{agency.cost}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="font-semibold text-[#6B6B6B] mb-0.5">Coverage</p>
                  <p className="text-[#1A1A1A]">{agency.coverage}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#6B6B6B] mb-0.5">Best For</p>
                  <p className="text-[#1A1A1A]">{agency.bestFor}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#6B6B6B] mb-0.5">Website</p>
                  <p className="text-[#3B82F6]">{agency.website}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Defect Classification */}
      <div>
        <h4 className="text-sm font-bold text-[#1A1A1A] mb-3">Defect Classification Guide (with Category-Specific Examples)</h4>
        <div className="space-y-3">
          {DEFECT_CATEGORIES.map((cat) => (
            <div key={cat.level} className="bg-white border rounded-xl p-5" style={{ borderColor: `${cat.color}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.level}
                </span>
                <span className="text-sm text-[#1A1A1A]">{cat.description}</span>
              </div>
              <ul className="space-y-1 ml-1">
                {cat.examples.map((ex, i) => (
                  <li key={i} className="text-xs text-[#6B6B6B] flex gap-2">
                    <span style={{ color: cat.color }}>-</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      <TemplateBlock content={QUALITY_COMPLAINT_TEMPLATE} label="Quality Complaint Email Template" />

      <InsiderTip>
        <strong>Pro tip:</strong> Hire a third-party inspection company (QIMA, SGS, Bureau Veritas, or V-Trust) for your first 2-3 production runs. It costs $250-400 per inspection and catches issues before they ship. After you establish trust with a factory (3+ clean orders), you can reduce to spot-check inspections. The ROI is massive: one bad shipment can cost you $10,000+ in returns, refunds, and negative reviews.
      </InsiderTip>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const PHASE_RENDERERS: Record<string, () => React.ReactNode> = {
  outreach: PhaseOutreach,
  rfq: PhaseRFQ,
  sample: PhaseSample,
  price: PhasePrice,
  contract: PhaseContract,
  qa: PhaseQA,
}

const STORAGE_KEY = "bottlecap-playbook-progress"

export default function PlaybookContent() {
  const [activePhase, setActivePhase] = useState("outreach")
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set())
  const [viewedPhases, setViewedPhases] = useState<Set<string>>(new Set(["outreach"]))
  const [copyAllDone, setCopyAllDone] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [customValues, setCustomValues] = useState({ company: "", product: "", quantity: "", price: "" })

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.completed) setCompletedPhases(new Set(data.completed))
        if (data.viewed) setViewedPhases(new Set(data.viewed))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completedPhases),
        viewed: Array.from(viewedPhases),
      }))
    } catch {
      // Ignore localStorage errors
    }
  }, [completedPhases, viewedPhases])

  const handlePhaseChange = useCallback((phaseId: string) => {
    setActivePhase(phaseId)
    setViewedPhases((prev) => new Set(prev).add(phaseId))
    setMobileNavOpen(false)
  }, [])

  const handleToggleComplete = useCallback((phaseId: string) => {
    setCompletedPhases((prev) => {
      const next = new Set(prev)
      if (next.has(phaseId)) {
        next.delete(phaseId)
      } else {
        next.add(phaseId)
      }
      return next
    })
  }, [])

  const completionPercent = Math.round((completedPhases.size / PHASES.length) * 100)

  const handleCopyAll = useCallback(async () => {
    const allTemplates = [
      "=== FACTORY NEGOTIATION PLAYBOOK ===\n=== Generated from Bottlecap ===\n",
      "\n\n=== PHASE 1: INITIAL OUTREACH ===\n\n--- Alibaba Template ---\n" + OUTREACH_ALIBABA_TEMPLATE,
      "\n\n--- Made-in-China Template ---\n" + OUTREACH_MADE_IN_CHINA_TEMPLATE,
      "\n\n--- Direct/Trade Show Template ---\n" + OUTREACH_DIRECT_TEMPLATE,
      "\n\n=== PHASE 2: REQUEST FOR QUOTE ===\n" + RFQ_TEMPLATE,
      "\n\n=== PHASE 3: SAMPLE REQUEST ===\n" + SAMPLE_TEMPLATE,
      "\n\n=== PHASE 4: NEGOTIATION TACTICS ===\n" +
        NEGOTIATION_TACTICS.map((t, i) => `\nTactic ${i + 1}: ${t.name}\nSuccess Rate: ${t.successRate} | Risk: ${t.riskLevel}\n${t.script}`).join("\n"),
      "\n\n=== PHASE 5: CONTRACT TEMPLATES ===",
      "\n\n--- Tooling Ownership ---\n" + TOOLING_OWNERSHIP_TEMPLATE,
      "\n\n--- Exclusivity ---\n" + EXCLUSIVITY_TEMPLATE,
      "\n\n--- IP Assignment ---\n" + IP_ASSIGNMENT_TEMPLATE,
      "\n\n--- Payment Milestones ---\n" + PAYMENT_MILESTONE_TEMPLATE,
      "\n\n--- NDA ---\n" + NDA_TEMPLATE,
      "\n\n--- Quality Agreement ---\n" + QUALITY_AGREEMENT_TEMPLATE,
      "\n\n=== PHASE 6: QUALITY ASSURANCE ===\n\nDuring-Production Inspection:\n" + DURING_PRODUCTION_TEMPLATE + "\n\nQuality Complaint:\n" + QUALITY_COMPLAINT_TEMPLATE,
    ].join("")

    try {
      await navigator.clipboard.writeText(allTemplates)
      setCopyAllDone(true)
      setTimeout(() => setCopyAllDone(false), 2500)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = allTemplates
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopyAllDone(true)
      setTimeout(() => setCopyAllDone(false), 2500)
    }
  }, [])

  const activePhaseData = PHASES.find((p) => p.id === activePhase)!
  const PhaseRenderer = PHASE_RENDERERS[activePhase]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
          Factory Negotiation Playbook
        </h1>
        <p className="text-[#6B6B6B] max-w-2xl leading-relaxed mb-4">
          The definitive guide to communicating with manufacturers. 3 platform-specific outreach templates, a 26-line RFQ, 15-point sample scoring, 8 negotiation tactics with success rates, critical contract clauses, full AQL tables, and an interactive negotiation simulator -- all battle-tested by experienced sourcing professionals.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200"
            style={{
              borderColor: copyAllDone ? "#22C55E" : "#FF6B35",
              backgroundColor: copyAllDone ? "#F0FDF4" : "#FFF0EB",
              color: copyAllDone ? "#22C55E" : "#FF6B35",
            }}
          >
            {copyAllDone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copyAllDone ? "All templates copied!" : "Copy all templates"}
          </button>
        </div>
      </motion.div>

      {/* Progress Indicator with Completion % */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#6B6B6B]">
            {completedPhases.size} of {PHASES.length} phases completed
          </span>
          <span className="text-xs font-bold" style={{ color: completionPercent === 100 ? "#22C55E" : "#FF6B35" }}>
            {completionPercent}%
          </span>
        </div>
        <div className="flex gap-1">
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              className="h-2 flex-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: completedPhases.has(phase.id)
                  ? "#22C55E"
                  : viewedPhases.has(phase.id)
                  ? "#FF6B35"
                  : "#E8E8E4",
              }}
            />
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          <span className="flex items-center gap-1 text-[10px] text-[#6B6B6B]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Completed
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#6B6B6B]">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" /> Viewed
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#6B6B6B]">
            <span className="w-2 h-2 rounded-full bg-[#E8E8E4]" /> Not started
          </span>
        </div>
      </motion.div>

      {/* Template Customizer */}
      <TemplateCustomizer onApply={(values) => setCustomValues(values)} />

      {/* Mobile Phase Dropdown */}
      <div className="sm:hidden mb-6">
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-[#E8E8E4] rounded-xl text-sm font-semibold text-[#1A1A1A]"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center">
              {activePhaseData.number}
            </span>
            Phase {activePhaseData.number}: {activePhaseData.title}
          </div>
          <motion.div animate={{ rotate: mobileNavOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
          </motion.div>
        </button>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white border-2 border-[#E8E8E4] rounded-xl overflow-hidden">
                {PHASES.map((phase) => {
                  const isActive = phase.id === activePhase
                  const isCompleted = completedPhases.has(phase.id)
                  return (
                    <button
                      key={phase.id}
                      onClick={() => handlePhaseChange(phase.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-left border-b border-[#E8E8E4] last:border-0 transition-colors"
                      style={{
                        backgroundColor: isActive ? "#FFF0EB" : "transparent",
                        color: isActive ? "#FF6B35" : "#1A1A1A",
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{
                          backgroundColor: isCompleted ? "#22C55E" : isActive ? "#FF6B35" : "#E8E8E4",
                          color: isCompleted || isActive ? "white" : "#6B6B6B",
                        }}
                      >
                        {isCompleted ? <Check className="w-3 h-3" /> : phase.number}
                      </span>
                      <div>
                        <span>{phase.title}</span>
                        <span className="block text-[10px] text-[#6B6B6B] font-normal">{phase.readTime}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Phase Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
        className="mb-8 overflow-x-auto hidden sm:block"
      >
        <div className="flex gap-2 min-w-max pb-2">
          {PHASES.map((phase) => {
            const isActive = phase.id === activePhase
            const isCompleted = completedPhases.has(phase.id)
            const isViewed = viewedPhases.has(phase.id)
            return (
              <button
                key={phase.id}
                onClick={() => handlePhaseChange(phase.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap border-2"
                style={{
                  borderColor: isActive ? "#FF6B35" : isCompleted ? "#22C55E" : "#E8E8E4",
                  backgroundColor: isActive ? "#FFF0EB" : isCompleted ? "#F0FDF4" : "white",
                  color: isActive ? "#FF6B35" : isCompleted ? "#22C55E" : isViewed ? "#1A1A1A" : "#6B6B6B",
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: isCompleted ? "#22C55E" : isActive ? "#FF6B35" : isViewed ? "#FF6B35" : "#E8E8E4",
                    color: isCompleted || isActive || isViewed ? "white" : "#6B6B6B",
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    phase.number
                  )}
                </span>
                {phase.title}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Active Phase Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Phase Header */}
          <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 sm:p-6 mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center">
                  {activePhaseData.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wider">
                      Phase {activePhaseData.number} of 6
                    </span>
                    <DifficultyBadge level={activePhaseData.difficulty} />
                    <span className="text-[10px] font-semibold text-[#6B6B6B] bg-[#F5F5F3] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {activePhaseData.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-[#1A1A1A]">{activePhaseData.title}</h2>
                </div>
              </div>
              <button
                onClick={() => handleToggleComplete(activePhaseData.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all duration-200 shrink-0"
                style={{
                  borderColor: completedPhases.has(activePhaseData.id) ? "#22C55E" : "#E8E8E4",
                  backgroundColor: completedPhases.has(activePhaseData.id) ? "#F0FDF4" : "white",
                  color: completedPhases.has(activePhaseData.id) ? "#22C55E" : "#6B6B6B",
                }}
              >
                {completedPhases.has(activePhaseData.id) ? <Check className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                {completedPhases.has(activePhaseData.id) ? "Completed" : "Mark complete"}
              </button>
            </div>
            <p className="text-sm text-[#6B6B6B] ml-11">{activePhaseData.description}</p>
          </div>

          {/* Key Takeaway */}
          <KeyTakeawayCard text={activePhaseData.keyTakeaway} />

          {/* Phase Content */}
          <PhaseRenderer />

          {/* Phase Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E8E4]">
            {activePhaseData.number > 1 ? (
              <button
                onClick={() => handlePhaseChange(PHASES[activePhaseData.number - 2].id)}
                className="flex items-center gap-2 text-sm font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Phase {activePhaseData.number - 1}: {PHASES[activePhaseData.number - 2].title}</span>
                <span className="sm:hidden">Previous</span>
              </button>
            ) : (
              <div />
            )}
            {activePhaseData.number < 6 ? (
              <button
                onClick={() => handlePhaseChange(PHASES[activePhaseData.number].id)}
                className="flex items-center gap-2 text-sm font-semibold text-[#FF6B35] hover:text-[#e5612e] transition-colors"
              >
                <span className="hidden sm:inline">Phase {activePhaseData.number + 1}: {PHASES[activePhaseData.number].title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
        className="mt-12 p-6 sm:p-8 bg-[#FFF0EB] rounded-2xl text-center border border-[#FF6B35]/20"
      >
        <Package className="w-8 h-8 text-[#FF6B35] mx-auto mb-3" />
        <h3 className="text-lg font-black text-[#1A1A1A] mb-2">
          Get factory-ready specifications for YOUR product
        </h3>
        <p className="text-sm text-[#6B6B6B] mb-5 max-w-lg mx-auto leading-relaxed">
          A Bottlecap report includes 10 factory-matched specifications that make these
          conversations 10x easier. Stop guessing -- start negotiating with real data.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#e5612e] transition-colors"
        >
          Get a Full Analysis <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
