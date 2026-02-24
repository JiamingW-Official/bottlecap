# BUSINESS.md — Business Model & Fundraising

> Reference this file when making business decisions, preparing pitches, or modeling pricing.

---

## Pricing Structure

```
Single Analysis      $99       One-time payment, full report
Monthly Plan         $199/mo   Unlimited analyses + real-time tariff alerts + supplier database
Supplier List        $199      One-time upsell, contact info for 3 vetted suppliers
Annual Plan          $999/yr   (future)
```

### Pricing Rationale

- $99 benchmarked against: a sourcing consultant's 4-hour engagement ($200/h = $800)
- $199/mo benchmarked against: the cheapest monthly supply-chain advisory services ($2,000+/mo)
- Perceived value far exceeds price point, driving high NPS and organic word-of-mouth

---

## Unit Economics

```
Single Report ($99):
  Claude API cost:          ~$0.04
  Stripe processing fee:    ~$3.17 (2.9% + $0.30)
  Email cost:               ~$0.01
  Server cost (amortized):  ~$0.50
  Total marginal cost:      ~$3.72

  Gross profit:             $95.28
  Gross margin:             96.2%

Monthly Subscription ($199/mo, assuming 5 analyses/month):
  Claude API cost:          ~$0.20
  Stripe processing fee:    ~$6.08
  Total marginal cost:      ~$6.50

  Gross profit:             $192.50
  Gross margin:             96.7%
```

---

## Revenue Projections

> Note: The figures below are forward-looking targets, not guarantees. Actual results will depend on execution, market conditions, and customer acquisition speed.

```
End of Week 2 (MVP launch):
  Target: 5 paying users
  Revenue: $495
  Validation: product can generate revenue

End of Month 1:
  Single-use customers: 20 x $99 = $1,980
  Monthly subscribers:  0
  MRR:                  $1,980

End of Month 2:
  Single-use customers: 50/mo x $99 = $4,950
  Monthly subscribers:  5 x $199 = $995
  MRR:                  $5,945

End of Month 3 (begin fundraising pitch):
  Single-use customers: 80/mo x $99 = $7,920
  Monthly subscribers:  20 x $199 = $3,980
  Upsell:               20 x $199 = $3,980
  MRR:                  ~$15,000

Target growth rate: 40% MoM
```

---

## Key Metrics

Track these numbers weekly:

```
Acquisition:
  Landing page visitors
  Analysis page conversion rate (visitor -> starts form)
  Form completion rate (starts form -> reaches payment page)
  Payment conversion rate (reaches payment page -> completes payment)

Retention:
  Report open rate (email)
  Report share rate (% of report recipients who share)
  30-day repeat purchase rate
  Monthly subscription conversion rate

Quality:
  NPS score (target >70)
  Refund rate (target <5%)
  Analysis accuracy (spot-check against real supplier quotes)

Virality:
  New visitors generated per report (K-factor)
  Twitter/X mentions
  Word-of-mouth referrals as % of new users
```

---

## Moat Analysis

### Layer 1: Unique Product Entry Point
We start from design files and raw creative ideas — not from manufacturing specs.
No one has built this entry point before because it requires fluency in both design language and manufacturing language.

### Layer 2: Data Flywheel
```
Process more reports
    |
    v
Accumulate "creative description -> manufacturing spec" mapping data (globally unique)
    |
    v
Accumulate supplier quality / response rate / quote data
    |
    v
More accurate analyses -> more users -> more data
    |
    v
Competitors entering 6+ months later face an ever-widening data gap
```

> Note: This moat strengthens over time but is weak at launch. Speed of execution and brand are the real early moats.

### Layer 3: Local Model Moat
Use accumulated data to fine-tune Qwen2.5-VL or a comparable model (feasible on an RTX 5090), creating a "manufacturing-specialized multimodal model." Trained on real supply-chain data, this model cannot be replicated by any generic open-source alternative.

### Layer 4: Community & Word-of-Mouth
The designer and indie-founder community relies heavily on tool recommendations. Once a reputation takes hold, the marginal cost of customer acquisition approaches zero.

---

## Investor Pitch — Core Talking Points

### Elevator Pitch (30 seconds)
"Bottlecap helps anyone with a product idea figure out — for the first time — whether it can be made, how much it costs, and where to manufacture it. What used to take 3 weeks and a $5,000 sourcing agent, we deliver in minutes for $99. We're the first bridge between the creator economy and manufacturing."

### Why Now
1. Multimodal AI reached production-grade quality in 2025-2026 — for the first time, models can genuinely interpret product descriptions, sketches, and photos and translate them into manufacturing parameters.
2. The tariff crisis has pushed supply-chain anxiety to historic highs; demand is real and urgent.
3. The creator economy is exploding — more people than ever want to make physical products.
4. These three windows are open simultaneously. Waiting 6 months risks missing the moment.

### Why Me
Design + Tech background: able to read a product concept and translate it into manufacturing language.
Supply-chain tooling has always been built by engineers for engineers — no one has approached it from the designer's perspective.
RTX 5090: within 6 months of data accumulation, a fine-tuned proprietary model becomes feasible, driving marginal cost toward zero.

### Market Size
- Over 5 million independent product projects launch globally each year (Kickstarter / Indiegogo / DTC brands)
- Global procurement software market: $9B/yr, growing at 15%/yr
- Our Serviceable Addressable Market (SAM): $5B (sourcing decision support for small and mid-size founders)
- 1% penetration over 5 years = $500M revenue opportunity

### Fundraising Target
```
Round:           Pre-seed
Amount:          $500K – $750K
Valuation cap:   $4M – $5M (SAFE)
Use of funds:
  60%  Engineering (strengthen AI pipeline, build supplier database)
  30%  GTM (YC community, hardware accelerators, content marketing)
  10%  Operations

Milestones (achievable with this raise):
  MRR of $15,000 within 5 months
  50 paying users, 10 monthly subscribers
  500+ reports processed (data flywheel begins turning)
  Position for a $2–3M seed round at $12–15M valuation
```

---

## Funding Timeline

```
Weeks 1–2:   MVP live, first paying customer
Weeks 3–4:   Product Hunt launch, breakout content, first 20 users
Weeks 5–6:   Data compilation, user story collection, deck preparation
Weeks 7–8:   Begin pitching — target YC alumni angels + DTC/hardware-focused seed funds
Weeks 9–12:  Close Pre-seed round

YC S26 application deadline: approximately end of March (monitor closely)
Prepare YC application in parallel with fundraising outreach.
```

---

## Competitor Analysis

```
Sourcify:             B2B, enterprise-focused, starts at $3,000/mo, cannot interpret design files
Alibaba:              Too much information noise, no analysis layer, poor UX
Sourcing agents:      Expensive ($200/h), slow (3–4 weeks), does not scale
Jungle Scout:         Amazon sellers only, not a manufacturing analysis tool
ThomasNet:            US domestic manufacturing only, no global coverage, outdated UI

Our white space:
- Start from a creative idea or design (every competitor starts from specs)
- Built for individuals and small teams, not enterprise procurement
- Reports designed well enough to share on social media (natural viral loop)
- Multimodal AI enables true "upload a photo and get an analysis" experience
```
