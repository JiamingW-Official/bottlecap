"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  Globe,
  ArrowRight,
  BarChart3,
  Zap,
  Package,
  AlertTriangle,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const TICKER_STATS = [
  { label: "Vietnam demand", value: "+34% YoY", icon: TrendingUp, positive: true },
  { label: "Mexico sourcing", value: "+41% (USMCA)", icon: TrendingUp, positive: true },
  { label: "China electronics", value: "68% market share", icon: Globe, positive: null },
  { label: "Section 301 burden", value: "$2,847 / $10K", icon: AlertTriangle, positive: false },
] as const

const CATEGORIES = [
  {
    name: "Smart Home Devices",
    pct: 28,
    note: "Fastest growing. Most analyzed on Bottlecap this quarter.",
    up: true,
  },
  {
    name: "Sustainable Packaging",
    pct: 41,
    note: "ESG mandates from retailers driving DTC brand demand.",
    up: true,
  },
  {
    name: "Beauty & Skincare",
    pct: 22,
    note: "South Korea dominating. Low MOQ, high margin.",
    up: true,
  },
  {
    name: "Fitness Equipment",
    pct: 19,
    note: "Post-pandemic normalization stabilizing. Vietnam gaining share.",
    up: true,
  },
  {
    name: "Pet Products",
    pct: 35,
    note: "Recession-resistant. High loyalty. China still dominates.",
    up: true,
  },
  {
    name: "Food Supplements",
    pct: 17,
    note: "FDA compliance complexity filtering to professional buyers.",
    up: true,
  },
  {
    name: "Outdoor Furniture",
    pct: 12,
    note: "Vietnam and Indonesia gaining at China's expense.",
    up: true,
  },
  {
    name: "Electronics Accessories",
    pct: 9,
    note: "Commoditized. Margin pressure forcing spec differentiation.",
    up: true,
  },
] as const

const COUNTRIES = [
  {
    name: "Vietnam",
    flag: "🇻🇳",
    pct: 34,
    label: "+34% demand increase",
    note: "Electronics, furniture, textiles. 30-day lead times.",
    color: "#FF6B35",
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    pct: 41,
    label: "+41% increase",
    note: "USMCA duty savings. Electronics assembly, auto parts, food.",
    color: "#22C55E",
  },
  {
    name: "India",
    flag: "🇮🇳",
    pct: 18,
    label: "+18% increase",
    note: "Textiles, supplements, software accessories.",
    color: "#FF6B35",
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    pct: 22,
    label: "+22% increase",
    note: "Beauty, electronics components, K-pop branded goods.",
    color: "#22C55E",
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    pct: 15,
    label: "+15% increase",
    note: "Furniture, textiles, palm-based materials.",
    color: "#FF6B35",
  },
] as const

const CASE_STUDIES = [
  {
    product: "Water Bottle Brand",
    action: "Switched to Vietnam",
    saving: "$4,800",
    direction: "saved",
    positive: true,
  },
  {
    product: "Yoga Mat Brand",
    action: "Sourced via Mexico",
    saving: "$3,200",
    direction: "saved",
    positive: true,
  },
  {
    product: "Electronics Brand",
    action: "Absorbed 301 tariffs (tooling lock-in)",
    saving: "$8,900",
    direction: "absorbed",
    positive: false,
  },
] as const

const ARCHIVE = [
  {
    quarter: "Q4 2025",
    title: "Holiday Season Sourcing Surge",
    date: "January 2026",
    desc: "How brands navigated record lead-time crunches and port congestion during peak season.",
    slug: "q4-2025-holiday-sourcing-surge",
  },
  {
    quarter: "Q3 2025",
    title: "Post-301 Tariff Landscape",
    date: "October 2025",
    desc: "A full breakdown of which categories absorbed tariffs vs. reshored — and what the margin data shows.",
    slug: "q3-2025-post-301-tariff-landscape",
  },
  {
    quarter: "Q2 2025",
    title: "Vietnam's Manufacturing Moment",
    date: "July 2025",
    desc: "Why Vietnam captured 11 new electronics contracts from Chinese factories in a single quarter.",
    slug: "q2-2025-vietnam-manufacturing-moment",
  },
  {
    quarter: "Q1 2025",
    title: "USMCA Effect on Consumer Goods",
    date: "April 2025",
    desc: "Quantifying the real duty savings for DTC brands manufacturing in Mexico vs. Asia.",
    slug: "q1-2025-usmca-consumer-goods",
  },
  {
    quarter: "Q4 2024",
    title: "China+1 Strategy Goes Mainstream",
    date: "January 2025",
    desc: "The tipping point: why mid-market brands stopped talking about diversification and started doing it.",
    slug: "q4-2024-china-plus-one-mainstream",
  },
  {
    quarter: "Q3 2024",
    title: "Sustainable Materials Inflection Point",
    date: "October 2024",
    desc: "Recycled PET, hemp composites, and bio-resins crossed the cost-parity threshold for packaging.",
    slug: "q3-2024-sustainable-materials-inflection",
  },
] as const

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TickerCard({
  stat,
  index,
}: {
  stat: (typeof TICKER_STATS)[number]
  index: number
}) {
  const Icon = stat.icon
  const valueColor =
    stat.positive === true
      ? "#22C55E"
      : stat.positive === false
      ? "#EF4444"
      : "#FF6B35"

  return (
    <motion.div
      variants={fadeUp}
      className="flex-1 min-w-[200px] bg-white border border-[#E8E8E4] rounded-2xl p-5 flex items-center gap-4"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${valueColor}18` }}
      >
        <Icon size={18} style={{ color: valueColor }} />
      </div>
      <div>
        <div className="text-xs text-[#6B6B6B] font-medium mb-0.5">{stat.label}</div>
        <div className="text-lg font-black" style={{ color: valueColor }}>
          {stat.value}
        </div>
      </div>
    </motion.div>
  )
}

function CategoryCard({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {cat.up ? (
            <TrendingUp size={16} className="text-[#22C55E]" />
          ) : (
            <TrendingDown size={16} className="text-[#EF4444]" />
          )}
          <span
            className="text-sm font-bold"
            style={{ color: cat.up ? "#22C55E" : "#EF4444" }}
          >
            {cat.up ? "+" : ""}
            {cat.pct}%
          </span>
        </div>
        <Package size={15} className="text-[#C8C8C4] group-hover:text-[#FF6B35] transition-colors" />
      </div>
      <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">{cat.name}</h3>
      <p className="text-xs text-[#6B6B6B] leading-relaxed">{cat.note}</p>
    </motion.div>
  )
}

function CountryBar({ country, index }: { country: (typeof COUNTRIES)[number]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-[#E8E8E4] rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <div>
            <div className="font-bold text-[#1A1A1A]">{country.name}</div>
            <div className="text-xs text-[#6B6B6B]">{country.note}</div>
          </div>
        </div>
        <span className="text-sm font-bold" style={{ color: country.color }}>
          {country.label}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-[#E8E8E4] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: country.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${country.pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: index * 0.1 }}
        />
      </div>
      <div className="mt-1.5 text-right text-xs text-[#9B9B9B]">{country.pct}% of max range</div>
    </motion.div>
  )
}

function CaseStudyCard({ cs }: { cs: (typeof CASE_STUDIES)[number] }) {
  return (
    <div className="bg-[#262626] border border-[#333] rounded-2xl p-5">
      <div className="text-xs text-[#888] mb-2 uppercase tracking-wider font-semibold">
        {cs.product}
      </div>
      <div className="text-sm text-[#CCC] mb-3">{cs.action}</div>
      <div className="flex items-baseline gap-2">
        <span
          className="text-2xl font-black"
          style={{ color: cs.positive ? "#22C55E" : "#EF4444" }}
        >
          {cs.saving}
        </span>
        <span className="text-sm" style={{ color: cs.positive ? "#22C55E" : "#EF4444" }}>
          {cs.direction}
        </span>
      </div>
    </div>
  )
}

function ArchiveCard({ report }: { report: (typeof ARCHIVE)[number] }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/trends/${report.slug}`}
        className="group block bg-white border border-[#E8E8E4] rounded-2xl p-6 hover:border-[#FF6B35] hover:shadow-md transition-all h-full"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-[#FF6B35] bg-[#FF6B3518] px-2.5 py-0.5 rounded-full">
            {report.quarter}
          </span>
          <span className="text-xs text-[#9B9B9B]">{report.date}</span>
        </div>
        <h3 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
          {report.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{report.desc}</p>
        <div className="flex items-center gap-1 text-[#FF6B35] text-sm font-semibold">
          Read report
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TrendsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger(0.1)}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <BarChart3 size={18} className="text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider">
                Market Intelligence
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A1A1A] mb-6"
            >
              Manufacturing Trends
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl leading-relaxed"
            >
              Real sourcing data, updated quarterly. Understand what&apos;s moving where, why
              costs are shifting, and where smart founders are manufacturing in 2025–2026.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Trend Summary Ticker ── */}
      <section className="py-10 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.1)}
          >
            {TICKER_STATS.map((stat, i) => (
              <TickerCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trending Categories ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.07)}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-2">
                Trending Categories This Quarter
              </h2>
              <p className="text-[#6B6B6B]">
                Based on Bottlecap analysis requests and global trade data, Q1 2026.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.name} cat={cat} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Country Momentum ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.1)}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={18} className="text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider">
                  Country Intelligence
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-2">
                Country Momentum
              </h2>
              <p className="text-[#6B6B6B]">
                Year-over-year demand increase for sourcing inquiries by manufacturing country.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 gap-4">
              {COUNTRIES.map((country, i) => (
                <CountryBar key={country.name} country={country} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tariff Impact Report ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.1)}
          >
            <motion.div
              variants={fadeUp}
              className="bg-[#1A1A1A] rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-[#333] px-8 py-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                  <AlertTriangle size={15} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Tariff Impact Report — Q1 2026</div>
                  <div className="text-[#666] text-xs">Section 301 tariffs &amp; USMCA savings analysis</div>
                </div>
              </div>

              {/* Key numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#333] border-b border-[#333]">
                <div className="bg-[#1A1A1A] px-8 py-6">
                  <div className="text-xs text-[#888] uppercase tracking-wider mb-2 font-semibold">
                    Section 301 avg. burden
                  </div>
                  <div className="text-3xl font-black text-[#EF4444] mb-1">$2,847</div>
                  <div className="text-sm text-[#888]">per $10,000 China shipment</div>
                </div>
                <div className="bg-[#1A1A1A] px-8 py-6">
                  <div className="text-xs text-[#888] uppercase tracking-wider mb-2 font-semibold">
                    USMCA avg. savings vs. China
                  </div>
                  <div className="text-3xl font-black text-[#22C55E] mb-1">$1,240</div>
                  <div className="text-sm text-[#888]">per $10,000 shipment</div>
                </div>
              </div>

              {/* Case studies */}
              <div className="px-8 py-6">
                <div className="text-xs text-[#888] uppercase tracking-wider mb-5 font-semibold">
                  Real brand case studies
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {CASE_STUDIES.map((cs) => (
                    <CaseStudyCard key={cs.product} cs={cs} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Archive ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.08)}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider">
                  Quarterly Archive
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-2">
                Trend Reports Archive
              </h2>
              <p className="text-[#6B6B6B]">
                Every quarter we publish a deep-dive on sourcing shifts. Free to read.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ARCHIVE.map((report) => (
                <ArchiveCard key={report.slug} report={report} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What to source in Q1 2026 ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.08)}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-[#22C55E]" />
                <span className="text-sm font-semibold text-[#22C55E] uppercase tracking-wider">
                  Q1 2026 Playbook
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-2">
                What smart founders are sourcing right now
              </h2>
              <p className="text-[#6B6B6B]">
                Based on analysis patterns and trade data from January–March 2026.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  signal: "BUY",
                  color: "#22C55E",
                  bg: "bg-green-50",
                  border: "border-green-200",
                  category: "Outdoor & Camping Gear",
                  rationale: "Summer demand spike 8–10 weeks out. Vietnam factories have capacity now. Sea freight from HCMC is 22 days to US West Coast.",
                  action: "Place sample orders by end of March for July shelf dates.",
                },
                {
                  signal: "BUY",
                  color: "#22C55E",
                  bg: "bg-green-50",
                  border: "border-green-200",
                  category: "Silicone Kitchen Products",
                  rationale: "FDA-compliant silicone MOQs dropped 40% as Chinese factories cleared inventory. Landed cost under $3/unit for basic products.",
                  action: "Negotiate hard on tooling. Factories are hungry for orders.",
                },
                {
                  signal: "WATCH",
                  color: "#F59E0B",
                  bg: "bg-amber-50",
                  border: "border-amber-200",
                  category: "Electronics Accessories",
                  rationale: "Section 301 pressure ongoing. Vietnam alternatives exist but tooling lead times 6–8 weeks longer than China.",
                  action: "Get quotes from both countries before committing tooling.",
                },
                {
                  signal: "AVOID",
                  color: "#EF4444",
                  bg: "bg-red-50",
                  border: "border-red-200",
                  category: "Woven Textiles from China",
                  rationale: "Anti-dumping investigations active on synthetic fabrics. Customs holds adding 3–5 weeks to clearance times. India and Bangladesh offer better risk profile.",
                  action: "Redirect to Bangladesh or Turkey if lead time allows.",
                },
              ].map((item) => (
                <motion.div
                  key={item.category}
                  variants={fadeUp}
                  className={`${item.bg} border ${item.border} rounded-2xl p-5`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.signal}
                    </span>
                    <span className="font-bold text-[#1A1A1A] text-sm">{item.category}</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed mb-3">{item.rationale}</p>
                  <p className="text-xs font-semibold" style={{ color: item.color }}>
                    → {item.action}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hot Products This Month ── */}
      <section className="py-16 sm:py-20 border-b border-[#E8E8E4] bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.06)}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wider">
                  Most Analyzed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                Top products founders analyzed this month
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Insulated Tumbler", cost: "$4–8", rank: 1 },
                { name: "LED Desk Lamp", cost: "$6–12", rank: 2 },
                { name: "Bamboo Toothbrush", cost: "$0.80–2", rank: 3 },
                { name: "Pet GPS Collar", cost: "$18–35", rank: 4 },
                { name: "Silicone Baking Mat", cost: "$2–4", rank: 5 },
                { name: "Portable Charger", cost: "$8–15", rank: 6 },
                { name: "Reusable Straw Set", cost: "$0.50–1", rank: 7 },
                { name: "Yoga Block Set", cost: "$5–9", rank: 8 },
              ].map((item) => (
                <motion.div key={item.name} variants={fadeUp}>
                  <Link
                    href="/analyze"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("bottlecap_hero_text", item.name)
                      }
                    }}
                    className="group flex flex-col bg-[#FAFAF8] border border-[#E8E8E4] rounded-2xl p-4 hover:border-[#FF6B35] hover:bg-white hover:shadow-md transition-all"
                  >
                    <span className="text-[10px] font-black text-[#FF6B35] mb-2">#{item.rank}</span>
                    <span className="text-sm font-bold text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#FF6B35] transition-colors">{item.name}</span>
                    <span className="text-xs text-[#9B9B9B]">{item.cost}/unit</span>
                    <span className="text-[10px] font-semibold text-[#FF6B35] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Analyze this →</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.1)}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-[#FF6B3518] rounded-2xl flex items-center justify-center">
                <BarChart3 size={24} className="text-[#FF6B35]" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4"
            >
              Get a personalized sourcing trend analysis for your product
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            >
              Macro trends matter — but your specific product, MOQ, and margin targets are what
              drive the best sourcing decision. We&apos;ll analyze both in under 5 minutes.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-bold text-lg hover:bg-[#E85A25] transition-colors shadow-lg shadow-[#FF6B3540]"
              >
                Analyze my product
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
