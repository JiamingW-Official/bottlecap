"use client"

import Link from "next/link"
import {
  Cpu,
  Globe2,
  BarChart3,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  Mail,
  Factory,
  TrendingUp,
  Database,
  Lock,
  CheckCircle,
  AlertCircle,
  Package,
  Layers,
  FlaskConical,
  Clock,
  Star,
  ChevronRight,
  Globe,
  DollarSign,
  FileText,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

/* ───── data ───── */

const capabilities = [
  {
    Icon: Cpu,
    title: "AI-Powered Analysis",
    desc: "Claude AI (claude-sonnet-4-6) analyzes your product across 50+ manufacturing dimensions — feasibility, cost, materials, tariffs, sourcing regions, and optimization. It's the same model trusted by Fortune 500 companies.",
    badge: "Core",
    color: "#FF6B35",
  },
  {
    Icon: Globe2,
    title: "Global Sourcing Data",
    desc: "Live market data from Alibaba supplier listings, UN Comtrade trade flows, USITC tariff schedules, Google Trends, and Amazon pricing. Every recommendation is grounded in current market reality.",
    badge: "Data",
    color: "#3B82F6",
  },
  {
    Icon: BarChart3,
    title: "Actionable Reports",
    desc: "Not a wall of text — 12 structured sections with cost breakdowns, country comparisons, radar charts, and a prioritized action checklist. Designed to hand to a factory on day one.",
    badge: "Output",
    color: "#22C55E",
  },
  {
    Icon: Zap,
    title: "Minutes, Not Weeks",
    desc: "Traditional sourcing agents take 2-4 weeks and charge $2,000–$8,000. Bottlecap delivers the same depth in 2–5 minutes for $99. That's a 99.7% time reduction.",
    badge: "Speed",
    color: "#F59E0B",
  },
  {
    Icon: Shield,
    title: "Your Ideas Stay Yours",
    desc: "Your product descriptions are never shared, sold, or used to train models. Reports are only accessible via their unique URL. Stripe handles payments — we never see your card details.",
    badge: "Privacy",
    color: "#8B5CF6",
  },
  {
    Icon: BookOpen,
    title: "Free Education Layer",
    desc: "14 manufacturing guides, 9 interactive tools, a 60-term glossary, and country profiles — all free, no account required. We believe education shouldn't be paywalled.",
    badge: "Free",
    color: "#EC4899",
  },
]

const milestones = [
  { numericTarget: 20, label: "Product categories", suffix: "" },
  { numericTarget: 14, label: "Free guides", suffix: "" },
  { numericTarget: 9, label: "Interactive tools", suffix: "" },
  { numericTarget: 60, label: "Glossary terms", suffix: "+" },
  { numericTarget: 12, label: "Country profiles", suffix: "" },
  { numericTarget: 5, label: "Live data sources", suffix: "" },
  { numericTarget: 50, label: "Materials tracked", suffix: "+" },
  { numericTarget: 40, label: "Product cost datasets", suffix: "+" },
]

const timeline = [
  {
    period: "The Problem",
    title: "What we kept running into",
    desc: "We watched founders spend weeks and thousands of dollars trying to answer basic questions: 'Can this be made?' 'How much will it cost?' 'Where should I manufacture?' The data exists — it's just scattered across Alibaba, customs databases, trade journals, and LinkedIn contacts that most founders don't have.",
    icon: AlertCircle,
    color: "#EF4444",
  },
  {
    period: "The Insight",
    title: "AI can bridge the gap",
    desc: "When Claude (Anthropic's AI) launched with deep reasoning capabilities, we tested it on manufacturing analysis. The results were remarkable — not just as a search engine, but as a genuine analyst that could synthesize trade data, compare regions, calculate landed costs, and flag compliance risks in a single pass.",
    icon: Cpu,
    color: "#FF6B35",
  },
  {
    period: "The Build",
    title: "Structured knowledge, not just prompts",
    desc: "We spent months encoding manufacturing expertise — HS code classification rules, regional labor markets, tariff schedules, MOQ norms by category, quality certification requirements. The result isn't just an AI prompt — it's a knowledge system that produces consistent, accurate results across 20 product categories.",
    icon: Database,
    color: "#3B82F6",
  },
  {
    period: "The Platform",
    title: "Reports are just the beginning",
    desc: "The 12-section report is the core product. But we built around it: free tools (HS lookup, cost calculator, tariff calculator, MOQ planner, margin calculator), 14 guides, a glossary, country profiles, and a supplier finder. The platform helps founders from first idea to first order.",
    icon: Layers,
    color: "#22C55E",
  },
  {
    period: "Today",
    title: "For every founder with a product idea",
    desc: "Bottlecap is for the first-time founder who doesn't know what MOQ means, the serial entrepreneur iterating on their 4th product, and the agency that needs fast feasibility checks for clients. We built the tool we wished existed — and we're continuously improving it based on real usage.",
    icon: Star,
    color: "#8B5CF6",
  },
]

const dataSources = [
  {
    name: "Alibaba Supplier Data",
    desc: "Supplier listings, MOQ ranges, pricing benchmarks, and factory certifications across 20+ product categories. Updated continuously.",
    icon: Factory,
    scope: "50M+ listings",
  },
  {
    name: "UN Comtrade",
    desc: "Global trade flows by HS code — who exports what, to whom, at what volume. Used for country specialization signals and export quality indicators.",
    icon: Globe,
    scope: "200+ countries",
  },
  {
    name: "USITC Tariff Schedule",
    desc: "Official US import tariff rates by HS code, including Section 301 China tariffs, USMCA, KORUS FTA, and other trade agreement rates.",
    icon: FileText,
    scope: "12,000+ HS codes",
  },
  {
    name: "Google Trends",
    desc: "Market demand signals for product categories — helps flag whether you're entering a growing or declining market before you invest in tooling.",
    icon: TrendingUp,
    scope: "Real-time signal",
  },
  {
    name: "Amazon Market Data",
    desc: "Retail pricing benchmarks, review patterns, and competitor density — used to sanity-check your unit economics and positioning.",
    icon: DollarSign,
    scope: "Product pricing",
  },
]

const techStack = [
  {
    name: "Claude AI",
    sub: "by Anthropic",
    desc: "claude-sonnet-4-6 powers all analysis. Specifically prompted with 3,000+ tokens of manufacturing expertise covering 20 categories, 12 countries, HS classification rules, and compliance frameworks.",
    logo: "🤖",
    category: "AI",
  },
  {
    name: "Next.js 14",
    sub: "React Framework",
    desc: "App Router, server components, and TypeScript throughout. Optimized for Core Web Vitals — the report pages load in under 1 second.",
    logo: "▲",
    category: "Frontend",
  },
  {
    name: "Supabase",
    sub: "Database & Auth",
    desc: "PostgreSQL with Row Level Security. Reports are stored with UUID access — no account required to view your report or share it.",
    logo: "🗄️",
    category: "Backend",
  },
  {
    name: "Stripe",
    sub: "Payments",
    desc: "PCI-compliant checkout. We never store card details. Stripe handles all payment processing with 3D Secure and fraud protection built in.",
    logo: "💳",
    category: "Payments",
  },
  {
    name: "Vercel",
    sub: "Hosting & CDN",
    desc: "Edge network for global performance. Reports are served from the nearest CDN node — sub-100ms response times worldwide.",
    logo: "🌐",
    category: "Infrastructure",
  },
  {
    name: "Resend",
    sub: "Transactional Email",
    desc: "Report delivery emails, receipt confirmations, and refund notifications. SPF, DKIM, and DMARC configured for reliable inbox delivery.",
    logo: "📧",
    category: "Email",
  },
]

const values = [
  {
    title: "Honesty over hype",
    desc: "Our reports tell you if your product has problems — not just the good news. A low feasibility score with clear explanations is more valuable than false confidence.",
    icon: CheckCircle,
  },
  {
    title: "Depth over speed",
    desc: "We could make analysis faster with simpler prompts. We don't. We prioritize accuracy and depth — the report should be genuinely useful, not just fast.",
    icon: Layers,
  },
  {
    title: "Access over gatekeeping",
    desc: "Manufacturing knowledge has been locked behind expensive consultants and trade contacts. We believe every founder deserves the same information, regardless of their network.",
    icon: Globe2,
  },
  {
    title: "Tools over theory",
    desc: "Every guide, tool, and glossary term we publish is designed to help you take a specific action — not just to understand a concept abstractly.",
    icon: FlaskConical,
  },
]

const reportSections = [
  { number: "01", name: "Feasibility Score", desc: "0–100 overall viability score" },
  { number: "02", name: "HS Code Classification", desc: "Import classification + tariff rate" },
  { number: "03", name: "Cost Breakdown", desc: "Materials / labor / overhead / shipping" },
  { number: "04", name: "Country Comparison", desc: "Top 3 manufacturing regions" },
  { number: "05", name: "Materials Analysis", desc: "Alternatives with cost savings" },
  { number: "06", name: "Manufacturing Specs", desc: "10 factory-ready specifications" },
  { number: "07", name: "Optimization Tips", desc: "Dollar-amount savings identified" },
  { number: "08", name: "Action Checklist", desc: "7-step next steps plan" },
  { number: "09", name: "Red Flags", desc: "Compliance, IP, quality risks" },
  { number: "10", name: "Supplier Notes", desc: "What to look for in a factory" },
  { number: "11", name: "Market Context", desc: "Demand signals + competitor density" },
  { number: "12", name: "Report Card", desc: "Shareable PNG summary" },
]

/* ───── CountUp component ───── */

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1200
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ───── Report Section Card ───── */

function ReportSectionCard({ section, index }: { section: typeof reportSections[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-4 bg-white rounded-xl border border-[#E8E8E4] px-4 py-3 hover:border-[#FF6B35]/30 hover:shadow-sm transition-all"
    >
      <span className="text-xs font-black text-[#FF6B35]/30 w-6 shrink-0">{section.number}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1A1A1A] truncate">{section.name}</p>
        <p className="text-[10px] text-[#9B9B9B] truncate">{section.desc}</p>
      </div>
      <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
    </motion.div>
  )
}

/* ───── Main Component ───── */

export default function AboutContent() {
  const [openTimelineIdx, setOpenTimelineIdx] = useState<number | null>(null)
  const capabilitiesRef = useRef(null)
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: "-50px" })

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      {/* ── Hero ── */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/[0.03] blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-[#FFF0EB] text-[#FF6B35] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#FF6B35]/20">
          <Factory className="w-3 h-3" />
          Manufacturing intelligence for founders
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] mb-6 relative leading-[1.05]">
          Every product idea deserves
          <br />
          <span className="text-[#FF6B35]">honest analysis</span>
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed relative">
          Bottlecap is a manufacturing feasibility platform for founders who want to make something physical
          but don&apos;t know where to start. Describe your idea — we tell you if it can be made,
          how much it costs, and where to manufacture it. In under 5 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="text-center">
            <p className="text-3xl font-black text-[#FF6B35]">2–5</p>
            <p className="text-xs text-[#9B9B9B]">minutes to report</p>
          </div>
          <div className="w-px bg-[#E8E8E4]" />
          <div className="text-center">
            <p className="text-3xl font-black text-[#FF6B35]">$99</p>
            <p className="text-xs text-[#9B9B9B]">vs. $2K–$8K agents</p>
          </div>
          <div className="w-px bg-[#E8E8E4]" />
          <div className="text-center">
            <p className="text-3xl font-black text-[#FF6B35]">12</p>
            <p className="text-xs text-[#9B9B9B]">report sections</p>
          </div>
          <div className="w-px bg-[#E8E8E4]" />
          <div className="text-center">
            <p className="text-3xl font-black text-[#FF6B35]">20</p>
            <p className="text-xs text-[#9B9B9B]">product categories</p>
          </div>
        </div>
      </div>

      {/* ── Problem + Approach ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
        <div className="bg-[#FFF8F5] border border-[#FF6B35]/15 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <h2 className="text-lg font-bold text-[#1A1A1A]">The problem</h2>
          </div>
          <p className="text-[#6B6B6B] leading-relaxed mb-4 text-sm">
            Founders with product ideas face a frustrating gap. The information needed to evaluate manufacturing
            feasibility is scattered across Alibaba listings, trade databases, customs regulations, and
            industry contacts that most people don&apos;t have access to.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed text-sm">
            Hiring a sourcing agent costs $2,000–$8,000 and takes weeks. Most founders give up before getting
            an answer. That means good ideas die — not because they&apos;re bad, but because the research is too hard.
          </p>
          <div className="mt-6 space-y-2">
            {[
              "Sourcing agents: $2,000–$8,000, 2–4 weeks",
              "Trade consultants: $300/hr, minimum retainers",
              "Alibaba cold outreach: weeks of silence",
              "Customs brokers: won't quote without a product",
            ].map((pain) => (
              <div key={pain} className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-0.5 shrink-0">✕</span>
                <p className="text-sm text-[#6B6B6B]">{pain}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#F0FDF4] border border-[#22C55E]/15 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            <h2 className="text-lg font-bold text-[#1A1A1A]">Our approach</h2>
          </div>
          <p className="text-[#6B6B6B] leading-relaxed mb-4 text-sm">
            Bottlecap uses Claude AI to simulate the work of a manufacturing consultant. We combine AI analysis
            with real market data from 5 live sources — giving you the same depth as a human expert in a fraction
            of the time and cost.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed text-sm">
            The result is a 12-section feasibility report: cost estimates, country comparisons, material
            recommendations, tariff impacts, and a step-by-step action plan — delivered in under 5 minutes.
          </p>
          <div className="mt-6 space-y-2">
            {[
              "AI analysis: 2–5 minutes, $99 flat",
              "12 sections covering every key question",
              "5 live data sources for accuracy",
              "72-hour money-back guarantee",
            ].map((strength) => (
              <div key={strength} className="flex items-start gap-2">
                <span className="text-[#22C55E] mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-[#6B6B6B]">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Origin Story / Timeline ── */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Our story</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">How Bottlecap came to be</h2>
        </div>
        <div className="space-y-3">
          {timeline.map((item, i) => {
            const Icon = item.icon
            const isOpen = openTimelineIdx === i
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden"
              >
                <button
                  onClick={() => setOpenTimelineIdx(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#F5F5F0] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B9B9B] block mb-0.5">
                      {item.period}
                    </span>
                    <span className="font-semibold text-[#1A1A1A]">{item.title}</span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="w-4 h-4 text-[#9B9B9B] shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[#F0F0EC] pt-4">
                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── What makes Bottlecap different ── */}
      <div className="mb-24 relative" ref={capabilitiesRef}>
        <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Why it works</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">What makes Bottlecap different</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {capabilities.map((cap, i) => {
            const Icon = cap.Icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="bg-white rounded-xl border border-[#E8E8E4] p-6 hover:shadow-md hover:border-[#FF6B35]/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cap.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cap.color }} />
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                    style={{ color: cap.color, borderColor: `${cap.color}30`, backgroundColor: `${cap.color}10` }}
                  >
                    {cap.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{cap.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{cap.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-[#F5F5F0] rounded-2xl p-8 mb-24 border border-[#E8E8E4]">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-6 text-center">By the numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {milestones.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-black text-[#FF6B35]">
                <CountUp target={m.numericTarget} suffix={m.suffix} />
              </p>
              <p className="text-xs text-[#6B6B6B] mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 12-Section Report Breakdown ── */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">The report</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">What&apos;s in your $99 report</h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto text-sm">
            Every question a manufacturing consultant would answer — structured into 12 sections, delivered in minutes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {reportSections.map((section, i) => (
            <ReportSectionCard key={section.number} section={section} index={i} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/report/demo"
            className="inline-flex items-center gap-2 text-sm text-[#FF6B35] font-semibold hover:underline"
          >
            See a full demo report <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Data Sources ── */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Data sources</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">5 live sources power every analysis</h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto text-sm">
            We don&apos;t make numbers up. Every cost estimate, tariff rate, and market signal is grounded in real data.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataSources.map((source, i) => {
            const Icon = source.icon
            return (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:shadow-md hover:border-[#FF6B35]/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <span className="text-[9px] font-semibold bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full border border-[#E8E8E4]">
                    {source.scope}
                  </span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1.5 text-sm">{source.name}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{source.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="mb-24 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Technology</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">Built on trusted infrastructure</h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto text-sm">
            Best-in-class technology at every layer — AI, database, payments, and hosting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:shadow-md hover:border-[#FF6B35]/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{tech.logo}</span>
                <span className="text-[9px] font-semibold bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full border border-[#E8E8E4]">
                  {tech.category}
                </span>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] text-sm">{tech.name}</h3>
              <p className="text-[10px] text-[#9B9B9B] mb-2">{tech.sub}</p>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Values ── */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">What we believe</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Our values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 bg-white rounded-xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/20 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1.5 text-sm">{value.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Security & Privacy ── */}
      <div className="bg-[#F5F5F0] rounded-2xl border border-[#E8E8E4] p-8 mb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E4] flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Security & Privacy</h2>
            <p className="text-sm text-[#6B6B6B]">How we protect your product ideas</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "No model training", desc: "Your product descriptions are never used to train AI models, including Claude. Your ideas stay yours." },
            { title: "UUID-only access", desc: "Reports are only accessible via their unique UUID URL. They're not indexed, searchable, or linked from anywhere." },
            { title: "Stripe for payments", desc: "We never store card details. All payment processing is handled by Stripe with full PCI-DSS compliance." },
            { title: "HTTPS everywhere", desc: "All data in transit is encrypted. Supabase encrypts data at rest. Row Level Security enforces access control." },
            { title: "No email required", desc: "You can view your report and share it with anyone without creating an account. Email is optional." },
            { title: "72-hour refund", desc: "If you're not satisfied, email us within 72 hours for a full refund — no questions asked." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{item.title}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Free Resources ── */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Free resources</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">Before you buy — explore for free</h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto text-sm">
            Education shouldn&apos;t be paywalled. Everything below is free, no account required.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: BookOpen,
              title: "14 Manufacturing Guides",
              items: ["Manufacturing 101", "Sourcing & Suppliers", "Materials Guide", "Shipping & Logistics", "Quality Control", "IP Protection", "Certifications"],
              href: "/guide",
              cta: "Browse all guides",
            },
            {
              icon: Package,
              title: "9 Interactive Tools",
              items: ["HS Code Lookup", "Cost Calculator", "Tariff Calculator", "MOQ Planner", "Margin Calculator", "ROI Calculator", "Country Compare"],
              href: "/tools",
              cta: "Try the tools",
            },
            {
              icon: Globe2,
              title: "12 Country Profiles",
              items: ["China", "Vietnam", "India", "Mexico", "South Korea", "Bangladesh", "Taiwan", "Thailand", "Indonesia", "Turkey", "Portugal", "Poland"],
              href: "/tools",
              cta: "Compare countries",
            },
          ].map((resource) => {
            const Icon = resource.icon
            return (
              <div key={resource.title} className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:shadow-md hover:border-[#FF6B35]/20 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3 text-sm">{resource.title}</h3>
                <div className="space-y-1 mb-4">
                  {resource.items.slice(0, 5).map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FF6B35]/40 shrink-0" />
                      <p className="text-xs text-[#6B6B6B]">{item}</p>
                    </div>
                  ))}
                  {resource.items.length > 5 && (
                    <p className="text-xs text-[#9B9B9B] pl-2.5">+{resource.items.length - 5} more</p>
                  )}
                </div>
                <Link
                  href={resource.href}
                  className="inline-flex items-center gap-1 text-xs text-[#FF6B35] font-semibold hover:underline"
                >
                  {resource.cta} <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Contact ── */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 text-center relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] rounded-full bg-[#FF6B35]/[0.03] blur-3xl pointer-events-none" />
        <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] border border-[#FF6B35]/20 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-[#FF6B35]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 relative">Questions? We&apos;re here.</h2>
        <p className="text-[#6B6B6B] mb-1 max-w-md mx-auto relative text-sm">
          Whether you have a question about pricing, your report, or manufacturing in general —
          we respond within 24 hours.
        </p>
        <p className="text-sm text-[#22C55E] font-semibold mb-6 relative">
          Response time: &lt; 24 hours · Mon–Fri
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 relative">
          <a
            href="mailto:hello@bottlecap.io"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#E85A25] transition-colors group"
          >
            <Mail className="w-4 h-4" />
            hello@bottlecap.io
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] rounded-full px-6 py-3 font-semibold hover:bg-[#FFF0EB] transition-colors"
          >
            Start your analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
