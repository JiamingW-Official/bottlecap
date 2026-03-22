"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { BarChart3, Globe, Zap, Shield, FileText, TrendingDown, Package, CheckCircle, Share2, Search, DollarSign, Clock, ChevronDown, ChevronRight } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Feasibility Score",
    shortDesc: "0–100 score across 50+ manufacturing dimensions.",
    expandedDesc: "Our feasibility score synthesizes complexity, material availability, tooling requirements, regulatory compliance burden, supply chain depth, and unit economics into a single actionable number. Scores above 80 mean you're ready to request factory quotes. Scores of 50–79 flag specific solvable challenges. Below 50 means significant rework is needed before investing further.",
    realWorldExample: "A founder's Bluetooth pet collar scored 73 — moderate complexity due to FCC certification. The report told her exactly what certification path to take, dropping her risk from unknown to manageable.",
    stat: "50+",
    statLabel: "dimensions analyzed",
    learnMoreHref: "/guide/manufacturing-101",
    featured: true,
  },
  {
    icon: Globe,
    title: "3-Country Manufacturing Comparison",
    shortDesc: "China, Vietnam, India, Mexico — side by side with real tariff rates.",
    expandedDesc: "We compare your specific product across the top 3 manufacturing regions for your category — factoring in labor costs, tooling costs, MOQ norms, lead times, tariff rates (including Section 301 duties), quality certifications, and IP protection. Each region gets a radar chart score across 5 dimensions so you can make an informed decision, not a guess.",
    realWorldExample: "A modular desk organizer founder was set on China until the report showed Vietnam was 18% cheaper after tariffs for his volume. He switched and saved $3.20/unit.",
    stat: "12",
    statLabel: "countries in our database",
    learnMoreHref: "/guide/country-comparison",
    featured: true,
  },
  {
    icon: DollarSign,
    title: "Per-Unit Cost Breakdown",
    shortDesc: "Materials, labor, tooling, overhead, packaging, shipping — all broken out.",
    expandedDesc: "We break down your unit cost into 6 components: materials (with specific material costs), labor (by region), tooling amortization, overhead (factory margin, QC, waste), packaging, and shipping. Each component shows a low and high estimate so you understand your cost range before committing to tooling. This is the number sourcing agents charge $500+ just to estimate.",
    realWorldExample: "A silicone kitchen set founder discovered her packaging cost ($1.80/unit) was higher than her labor cost ($1.40). The report flagged a simpler packaging option that saved $0.90/unit at scale.",
    stat: "6",
    statLabel: "cost components",
    learnMoreHref: "/tools/cost-calculator",
    featured: true,
  },
  {
    icon: Search,
    title: "HS Code Classification",
    shortDesc: "Your exact import classification + tariff rate, in plain English.",
    expandedDesc: "We identify your product's Harmonized System (HS) code — the 10-digit number used by US Customs to determine your tariff rate. We show the applicable rate, any Section 301 additional duties (for China-made goods), and whether any trade agreement rates apply (USMCA, KORUS FTA, etc.). We include a confidence score and explain the classification in plain English.",
    realWorldExample: "A smart thermos founder was shocked to learn her product was classified under 8516.79 (not kitchenware as she assumed), making it subject to a 25% Section 301 tariff — a $4.20/unit surprise caught before she placed her order.",
    stat: "90+",
    statLabel: "HS codes in database",
    learnMoreHref: "/tools/hs-lookup",
    featured: false,
  },
  {
    icon: Package,
    title: "Materials Analysis",
    shortDesc: "Spec the right materials and discover cheaper alternatives.",
    expandedDesc: "We analyze the materials your product requires, flag potential supply chain issues, and identify alternatives that achieve the same performance at lower cost. Unlike a factory, we have no incentive to upsell you on premium materials — so we'll tell you when a $0.40/kg material swap saves you $1.20/unit without any quality impact. We also flag sustainability options for brands targeting eco-conscious markets.",
    realWorldExample: "A water bottle founder was quoted for 304 stainless steel. The report suggested 201 SS for the inner body and 304 only for contact surfaces — saving $1.10/unit with identical food-safety compliance.",
    stat: "50+",
    statLabel: "materials tracked",
    learnMoreHref: "/guide/materials",
    featured: false,
  },
  {
    icon: FileText,
    title: "10 Factory-Ready Specs",
    shortDesc: "The exact manufacturing specifications your factory will ask for.",
    expandedDesc: "Factories won't give you a real quote without a tech pack or specification sheet. We generate 10 factory-ready manufacturing specifications — dimensions, tolerances, material grades, surface finishes, assembly methods, packaging requirements, and QC test criteria — specific to your product. Copy them directly into your RFQ email and walk into supplier negotiations prepared.",
    realWorldExample: "A first-time founder used his 10 specs in his Alibaba RFQ. Three factories responded within 24 hours — where his previous vague inquiry had generated zero replies.",
    stat: "10",
    statLabel: "specifications generated",
    learnMoreHref: "/guide/sourcing",
    featured: false,
  },
  {
    icon: TrendingDown,
    title: "Optimization Tips",
    shortDesc: "Specific dollar-amount savings — not vague advice.",
    expandedDesc: "We identify specific optimizations ranked by dollar impact at your target order quantity. Each tip shows the change, the reason it works, and the estimated savings per unit and total at your MOQ. Tips cover material substitutions, manufacturing process changes, packaging simplifications, order quantity adjustments, and regional sourcing switches. The average Bottlecap report identifies $2–$5/unit in actionable savings.",
    realWorldExample: "A smart home sensor founder implemented 3 of 5 optimization tips — switching to injection-molded ABS housing, simplifying the PCB layout, and using stock antenna designs — saving $3.40/unit without any functional compromise.",
    stat: "$2–$5",
    statLabel: "avg savings per unit identified",
    learnMoreHref: "/guide/manufacturing-101",
    featured: false,
  },
  {
    icon: CheckCircle,
    title: "7-Step Action Checklist",
    shortDesc: "Prioritized next steps from idea to production — checkable in your report.",
    expandedDesc: "The action checklist translates your report findings into a specific, ordered to-do list. Steps are sequenced by dependency — you won't be told to contact factories before you've confirmed your HS code, or request samples before you've resolved a red flag. Check items off directly in your report and they persist across sessions via localStorage.",
    realWorldExample: "An outdoor gear founder completed all 7 steps in 3 weeks — from report to having her first 50-unit sample order in transit. She credited the checklist with keeping her from wasting time on steps she wasn't ready for.",
    stat: "7",
    statLabel: "ordered action steps",
    learnMoreHref: "/guide/sourcing",
    featured: false,
  },
  {
    icon: Shield,
    title: "Red Flag Warnings",
    shortDesc: "IP conflicts, compliance requirements, quality risks — flagged honestly.",
    expandedDesc: "We surface risks that could derail your product after you've already invested in tooling or samples. Common flags include: products requiring FDA approval you weren't aware of, IP-adjacent designs that could invite litigation, certifications (CE, FCC, UL) that add 3–6 months to your timeline, materials banned in key markets, and quality risks inherent to your chosen manufacturing region for your product type.",
    realWorldExample: "A kitchen product founder was flagged that her silicone food container required FDA food-contact certification — a 4-month process she had zero budget or timeline for. She caught it before spending $8,000 on tooling.",
    stat: "15+",
    statLabel: "risk categories checked",
    learnMoreHref: "/guide/certifications",
    featured: false,
  },
  {
    icon: Share2,
    title: "Shareable Report Card",
    shortDesc: "One-click PNG export or shareable link. Perfect for pitch decks.",
    expandedDesc: "Your full report has a permanent, shareable URL — anyone with the link can view it, no login required. For pitches and co-founder alignment, we generate a single-page report card as a downloadable PNG: feasibility score, product name, top country recommendation, key cost estimate, and your main optimization opportunity. Clean enough for a slide deck, detailed enough to be useful.",
    realWorldExample: "A hardware founder shared her report card in her YC application to show manufacturing feasibility. The reviewer noted it was the most prepared manufacturing section they'd seen from a pre-product company.",
    stat: "PNG + link",
    statLabel: "export formats",
    learnMoreHref: "/report/demo",
    featured: false,
  },
  {
    icon: Zap,
    title: "2–5 Minute Delivery",
    shortDesc: "No queue, no delays. Report in your inbox before you finish your coffee.",
    expandedDesc: "Our AI pipeline runs in parallel — HS code classification, cost modeling, country scoring, materials analysis, and optimization identification all happen simultaneously. The report page auto-refreshes as each section completes. You'll have your full 12-section report emailed within 5 minutes of payment — not the 2–4 weeks a sourcing agent takes.",
    realWorldExample: "A founder submitted his product at 9:47am during a coffee break. By 9:52am he had a complete report and had already shared it with his co-founder. He placed his first factory inquiry before noon the same day.",
    stat: "2–5 min",
    statLabel: "avg delivery time",
    learnMoreHref: "/report/demo",
    featured: false,
  },
  {
    icon: Clock,
    title: "$2K–$8K Cheaper Than Agents",
    shortDesc: "Same depth as a sourcing agent, for $99. No retainer, no recurring fees.",
    expandedDesc: "Traditional sourcing agents charge $2,000–$8,000 for initial feasibility analysis and sourcing recommendations — and they take 2–4 weeks. Manufacturing consultants charge $200–$500/hour. Bottlecap delivers comparable analysis (often broader, since we cover 12 countries vs. an agent's 2–3 preferred regions) for $99, in under 5 minutes, with a 72-hour money-back guarantee if it's not useful.",
    realWorldExample: "A hardware founder was quoted $4,500 by a sourcing agent for an initial feasibility study and country comparison. He ran a Bottlecap report for $99 before the call — and ended up not needing the agent at all.",
    stat: "$2K–$8K",
    statLabel: "avg agent cost (vs. $99)",
    learnMoreHref: "/pricing",
    featured: false,
  },
]

const featuredCards = features.filter((f) => f.featured)
const regularCards = features.filter((f) => !f.featured)

export default function FeatureShowcase() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const HeroCard = featuredCards[0]
  const HeroIcon = HeroCard.icon

  return (
    <div>
      {/* Featured 3 — asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Hero card — 2-col wide */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-[#FFF8F5] rounded-2xl border border-[#FF6B35]/15 p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center mb-6 shadow-[0_4px_14px_rgba(255,107,53,0.35)]">
              <HeroIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1A1A1A] mb-2">
              {HeroCard.title}
            </h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6 max-w-sm">
              {HeroCard.shortDesc}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-5xl font-black text-[#FF6B35] leading-none">
                {HeroCard.stat}
              </span>
              <p className="text-xs text-[#FF6B35]/60 font-semibold uppercase tracking-widest mt-1">
                {HeroCard.statLabel}
              </p>
            </div>
            <Link
              href={HeroCard.learnMoreHref}
              className="text-xs font-semibold text-[#FF6B35] hover:text-[#E85D2A] flex items-center gap-1 transition-colors"
            >
              Read guide <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Two stacked featured cards */}
        <div className="space-y-4">
          {featuredCards.slice(1).map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="bg-gradient-to-br from-white to-[#FFF8F5] rounded-2xl border border-[#FF6B35]/12 p-5 flex flex-col justify-between h-[calc(50%-8px)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center shadow-[0_3px_8px_rgba(255,107,53,0.3)] shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold tracking-tight text-[#1A1A1A] text-sm leading-tight">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4">
                    {f.shortDesc}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#FF6B35] leading-none">
                      {f.stat}
                    </span>
                    <p className="text-[10px] text-[#FF6B35]/60 font-semibold uppercase tracking-widest mt-0.5">
                      {f.statLabel}
                    </p>
                  </div>
                  <Link
                    href={f.learnMoreHref}
                    className="text-xs font-semibold text-[#FF6B35] hover:text-[#E85D2A] flex items-center gap-1 transition-colors"
                  >
                    Read guide <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Regular 9 — expandable accordion cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regularCards.map((f, i) => {
          const Icon = f.icon
          const isOpen = expandedIndex === i

          return (
            <motion.div
              key={f.title}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, layout: { duration: 0.3, ease: "easeInOut" } }}
              className={`bg-white rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? "border-[#FF6B35]/30 shadow-[0_4px_20px_rgba(255,107,53,0.1)]"
                  : "border-[#E8E8E4] hover:border-[#FF6B35]/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
              }`}
            >
              {/* Card header — always visible, clickable */}
              <button
                onClick={() => handleToggle(i)}
                className="w-full text-left p-5 flex items-start justify-between gap-3 group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-[#FF6B35]" : "bg-[#FFF0EB]"
                  }`}>
                    <Icon className={`w-4 h-4 transition-colors ${isOpen ? "text-white" : "text-[#FF6B35]"}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1A1A1A] mb-1 tracking-tight text-sm">
                      {f.title}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      {f.shortDesc}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 mt-0.5">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? "text-[#FF6B35]" : "text-[#9B9B9B] group-hover:text-[#6B6B6B]"}`} />
                  </motion.div>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5 space-y-4">
                      {/* Divider */}
                      <div className="w-full h-px bg-[#E8E8E4]" />

                      {/* Stat pill */}
                      <div className="inline-flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#FF6B35]">{f.stat}</span>
                        <span className="text-xs text-[#9B9B9B] font-medium">{f.statLabel}</span>
                      </div>

                      {/* Expanded description */}
                      <p className="text-xs text-[#4A4A4A] leading-relaxed">
                        {f.expandedDesc}
                      </p>

                      {/* Real-world example callout */}
                      <div className="bg-[#FFF0EB] border border-[#FF6B35]/20 rounded-lg p-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B35] mb-1.5">
                          In practice:
                        </p>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">
                          {f.realWorldExample}
                        </p>
                      </div>

                      {/* Learn more link */}
                      <Link
                        href={f.learnMoreHref}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B35] hover:text-[#E85D2A] transition-colors"
                      >
                        Read guide <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
