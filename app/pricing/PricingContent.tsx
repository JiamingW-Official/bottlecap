"use client"

import Link from "next/link"
import { Check, X, ArrowRight, ShieldCheck, ChevronDown, TrendingUp, Clock, Users, Star, DollarSign, Zap, BarChart3 } from "lucide-react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const singleFeatures = [
  "Full feasibility score (0–100)",
  "Per-unit cost breakdown",
  "3-country supplier comparison",
  "HS code + tariff classification",
  "Materials analysis + alternatives",
  "10 factory-ready manufacturing specs",
  "Optimization tips with $ savings",
  "7-step action checklist",
  "Shareable report card (PNG / link)",
  "Image upload for product reference",
  "FormInsightPanel AI preview",
  "PDF / PNG export",
  "72-hour money-back guarantee",
]

type FeatureRow = {
  label: string
  description: string
  category: "Analysis" | "Report" | "Platform"
  single: boolean
  monthly: boolean
}

const featureMatrix: FeatureRow[] = [
  // Analysis
  { label: "Full feasibility score (0–100)", description: "A weighted composite score across materials, logistics, tariffs, and margin.", category: "Analysis", single: true, monthly: true },
  { label: "Per-unit cost breakdown", description: "Materials, labour, freight, duties, and margin modelled at your target volume.", category: "Analysis", single: true, monthly: true },
  { label: "3-country supplier comparison", description: "Side-by-side comparison of China, Vietnam, and India (or best regional alternatives).", category: "Analysis", single: true, monthly: true },
  { label: "HS code + tariff classification", description: "Correct 6-digit HS code, applicable tariff rates, and any Section 301 flags.", category: "Analysis", single: true, monthly: true },
  { label: "Materials analysis + alternatives", description: "Current material choice evaluated against 2–3 cheaper or better-performing alternatives.", category: "Analysis", single: true, monthly: true },
  { label: "Image upload for product reference", description: "Attach a sketch, photo, or CAD screenshot so the AI can anchor its analysis visually.", category: "Analysis", single: true, monthly: true },
  // Report
  { label: "10 factory-ready manufacturing specs", description: "Tolerances, finishes, packaging requirements, and other specs you can hand to a factory.", category: "Report", single: true, monthly: true },
  { label: "Optimization tips with $ savings", description: "Specific, actionable tips each tagged with an estimated dollar saving per unit.", category: "Report", single: true, monthly: true },
  { label: "7-step action checklist", description: "A sequenced to-do list from prototype to first shipment.", category: "Report", single: true, monthly: true },
  { label: "FormInsightPanel AI preview", description: "See a live AI summary of your inputs before you pay, so you know what you're getting.", category: "Report", single: true, monthly: true },
  // Platform
  { label: "Shareable report card (PNG / link)", description: "One-click share link or downloadable PNG card — ready for pitch decks or investor updates.", category: "Platform", single: true, monthly: true },
  { label: "PDF / PNG export", description: "Full report downloadable as a formatted PDF or high-res PNG.", category: "Platform", single: true, monthly: true },
  { label: "72-hour money-back guarantee", description: "Not useful? Email us within 72 hours for a full refund, same day.", category: "Platform", single: true, monthly: true },
  { label: "Unlimited analyses", description: "Run as many reports as you need — no per-report charge.", category: "Platform", single: false, monthly: true },
  { label: "Priority support", description: "Jump the queue on email support and get same-day responses.", category: "Platform", single: false, monthly: true },
  { label: "Early access to new features", description: "Be the first to try new data sources, export formats, and integrations.", category: "Platform", single: false, monthly: true },
]

const CATEGORIES: Array<"Analysis" | "Report" | "Platform"> = ["Analysis", "Report", "Platform"]

const pricingFaqs = [
  {
    q: "What if the report isn't useful?",
    a: "Full refund within 72 hours, no questions asked. Email hello@bottlecap.io and we'll process it same day.",
  },
  {
    q: "How long does a report take?",
    a: "Most reports are ready in 2–5 minutes. You'll get an email notification with a link, and the report page auto-refreshes.",
  },
  {
    q: "Can I upgrade from Single to Monthly later?",
    a: "Yes — we'll credit your $99 toward the first month of your subscription.",
  },
  {
    q: "What counts as a 'product' for analysis?",
    a: "Any physical manufactured product: electronics, apparel, home goods, accessories, packaging, etc. Digital products and services are not supported.",
  },
  {
    q: "Do you offer team pricing?",
    a: "Not yet, but email hello@bottlecap.io and we'll work something out.",
  },
  {
    q: "What if my product is really simple? Will I still get value?",
    a: "Yes — simpler products often have the best optimization opportunities. Even a basic plastic widget benefits from knowing which country to source from, what tariff rate applies, and whether a material swap saves $0.80/unit.",
  },
  {
    q: "Can I use this for a product I'm already manufacturing?",
    a: "Absolutely. Many repeat users run analyses to check if they could be manufacturing cheaper elsewhere, validate their current cost structure, or explore material alternatives they haven't considered.",
  },
  {
    q: "Does the $99 include the Supplier List add-on?",
    a: "No. The Supplier List ($199 add-on) provides contact information for 3 manually verified factories matched to your product. It's available as an upgrade after you receive your report.",
  },
]

const testimonials = [
  {
    name: "Sarah K.",
    role: "Founder, Wren Home",
    saving: "$4,900 saved",
    quote: "Got the same intel as a sourcing agent quote — in 5 minutes instead of 3 weeks.",
  },
  {
    name: "James R.",
    role: "Serial founder, 4 products",
    saving: "22% cost reduction",
    quote: "Switched to Vietnam based on the report. Margin went from thin to comfortable.",
  },
  {
    name: "David L.",
    role: "Product designer",
    saving: "$3.20/unit saved",
    quote: "The material tip alone paid for the report 200 times over on my first order.",
  },
]

const altComparison = [
  {
    row: "Time to answer",
    bottlecap: "5 min",
    agent: "2–4 weeks",
    alibaba: "Days of back-and-forth",
    consultant: "1–2 weeks",
  },
  {
    row: "Cost",
    bottlecap: "$99",
    agent: "$2K–$8K",
    alibaba: "Free (but your time)",
    consultant: "$500–$2K",
  },
  {
    row: "Depth",
    bottlecap: "12 structured sections",
    agent: "Variable",
    alibaba: "Surface level",
    consultant: "Variable",
  },
  {
    row: "Data sources",
    bottlecap: "5 live sources",
    agent: "Agent's network",
    alibaba: "Supplier self-reported",
    consultant: "Agent's network",
  },
  {
    row: "Money-back",
    bottlecap: "72-hour guarantee",
    agent: "Usually none",
    alibaba: "No",
    consultant: "Usually none",
  },
]

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function SocialProofTicker() {
  const stats = [
    { icon: BarChart3, label: "847 analyses run this month" },
    { icon: Star, label: "Avg satisfaction: 4.9 / 5" },
    { icon: ShieldCheck, label: "0 billing disputes" },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6">
      {stats.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
          <Icon className="w-4 h-4 text-[#22C55E]" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function ValueBar() {
  return (
    <div className="mt-10 max-w-lg mx-auto bg-white border border-[#E8E8E4] rounded-2xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-4 text-center">
        Cost comparison
      </p>
      <div className="space-y-3">
        {/* Sourcing agent */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#6B6B6B]">Avg sourcing agent</span>
            <span className="font-semibold text-[#1A1A1A]">$3,500</span>
          </div>
          <div className="h-3 rounded-full bg-[#F0F0EC] overflow-hidden">
            <div className="h-full bg-[#E8E8E4] rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
        {/* Bottlecap */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#FF6B35] font-semibold">Bottlecap</span>
            <span className="font-bold text-[#FF6B35]">$99</span>
          </div>
          <div className="h-3 rounded-full bg-[#FFF0EB] overflow-hidden">
            <motion.div
              className="h-full bg-[#FF6B35] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "2.83%" }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-[#9B9B9B] mt-4">
        Bottlecap is <span className="font-bold text-[#1A1A1A]">35× cheaper</span> and delivers in minutes, not weeks.
      </p>
    </div>
  )
}

function ROICalculator() {
  const [units, setUnits] = useState(500)

  const optimizationSavings = Math.round(units * 2.5)
  const badChoiceCost = Math.round(units * 4)
  const roi = Math.round((optimizationSavings / 99) * 10) / 10

  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 text-white">
      <div className="text-center mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[#FF6B35] mb-2">ROI Calculator</p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          What does $99 actually return?
        </h2>
        <p className="text-white/50 text-sm mt-2">Based on avg savings across 800+ analyses</p>
      </div>

      {/* Slider */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">First order size</span>
          <span className="font-bold text-white">{units.toLocaleString()} units</span>
        </div>
        <input
          type="range"
          min={100}
          max={10000}
          step={50}
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className="w-full accent-[#FF6B35] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-white/30 mt-1">
          <span>100</span>
          <span>10,000</span>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="bg-white/8 rounded-xl p-5 text-center border border-white/10">
          <DollarSign className="w-5 h-5 text-[#22C55E] mx-auto mb-2" />
          <p className="text-2xl font-black text-[#22C55E]">${optimizationSavings.toLocaleString()}</p>
          <p className="text-xs text-white/50 mt-1 leading-snug">Potential savings from optimization</p>
        </div>
        <div className="bg-white/8 rounded-xl p-5 text-center border border-white/10">
          <TrendingUp className="w-5 h-5 text-[#FF6B35] mx-auto mb-2" />
          <p className="text-2xl font-black text-[#FF6B35]">${badChoiceCost.toLocaleString()}</p>
          <p className="text-xs text-white/50 mt-1 leading-snug">Cost of a bad material choice at this volume</p>
        </div>
        <div className="bg-[#FF6B35]/15 rounded-xl p-5 text-center border border-[#FF6B35]/30">
          <Zap className="w-5 h-5 text-[#FF6B35] mx-auto mb-2" />
          <p className="text-2xl font-black text-white">{roi}×</p>
          <p className="text-xs text-white/50 mt-1 leading-snug">Bottlecap ROI at this volume</p>
        </div>
      </div>

      <p className="text-center text-xs text-white/30 mt-6">
        Estimates based on $2.50/unit avg optimization savings and $4/unit avg material saving opportunity across historical analyses.
      </p>
    </div>
  )
}

function TestimonialStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {testimonials.map((t) => (
        <div key={t.name} className="bg-white border border-[#E8E8E4] rounded-2xl p-6">
          <p className="text-2xl font-black text-[#22C55E] mb-1">{t.saving}</p>
          <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
            <p className="text-xs text-[#9B9B9B]">{t.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AltComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#E8E8E4]">
            <th className="text-left p-4 text-xs font-bold uppercase tracking-wide text-[#9B9B9B] w-36"></th>
            <th className="p-4 text-center">
              <span className="inline-block bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full">
                Bottlecap $99
              </span>
            </th>
            <th className="p-4 text-xs font-semibold text-[#9B9B9B] text-center whitespace-nowrap">Sourcing Agent $3K+</th>
            <th className="p-4 text-xs font-semibold text-[#9B9B9B] text-center whitespace-nowrap">Alibaba Search</th>
            <th className="p-4 text-xs font-semibold text-[#9B9B9B] text-center whitespace-nowrap">Trade Consultant $500/hr</th>
          </tr>
        </thead>
        <tbody>
          {altComparison.map((row, i) => (
            <tr
              key={row.row}
              className={`border-b border-[#F0F0EC] last:border-0 ${i % 2 === 1 ? "bg-[#FAFAF8]" : ""}`}
            >
              <td className="p-4 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">{row.row}</td>
              <td className="p-4 text-center font-semibold text-[#FF6B35]">{row.bottlecap}</td>
              <td className="p-4 text-center text-[#9B9B9B]">{row.agent}</td>
              <td className="p-4 text-center text-[#9B9B9B]">{row.alibaba}</td>
              <td className="p-4 text-center text-[#9B9B9B]">{row.consultant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeatureMatrixTable() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-[#E8E8E4] bg-[#FAFAF8]">
        <div className="p-4 text-xs font-bold uppercase tracking-wide text-[#9B9B9B]">Feature</div>
        <div className="p-4 text-xs font-bold text-center text-[#FF6B35] uppercase tracking-wide">Single $99</div>
        <div className="p-4 text-xs font-bold text-center text-[#1A1A1A] uppercase tracking-wide">Monthly $199</div>
      </div>

      {CATEGORIES.map((category) => (
        <div key={category}>
          {/* Category divider */}
          <div className="px-4 py-2 bg-[#F5F5F0] border-b border-[#E8E8E4]">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#9B9B9B]">{category}</span>
          </div>
          {featureMatrix.filter((f) => f.category === category).map((feat, i, arr) => (
            <div
              key={feat.label}
              className={`grid grid-cols-3 transition-colors hover:bg-[#FAFAF8] cursor-default ${
                i < arr.length - 1 ? "border-b border-[#F0F0EC]" : ""
              }`}
              onMouseEnter={() => setHoveredFeature(feat.label)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`p-4 ${feat.single ? "text-[#1A1A1A]" : "text-[#9B9B9B]"}`}>
                <p className="text-sm font-medium">{feat.label}</p>
                <AnimatePresence>
                  {hoveredFeature === feat.label && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs text-[#9B9B9B] mt-1 leading-snug overflow-hidden"
                    >
                      {feat.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-4 flex justify-center items-start pt-4">
                {feat.single ? (
                  <Check className="w-4 h-4 text-[#22C55E]" />
                ) : (
                  <X className="w-4 h-4 text-[#D8D8D4]" />
                )}
              </div>
              <div className="p-4 flex justify-center items-start pt-4">
                <Check className="w-4 h-4 text-[#22C55E]" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#F0F0EC] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#1A1A1A] pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#9B9B9B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#6B6B6B] leading-relaxed pb-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function PricingContent() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[#FF6B35] mb-4">
          Pricing
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-[#1A1A1A] mb-5">
          One price.<br className="hidden sm:block" /> Everything included.
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          No upsells buried inside the report. No credit packs. Not useful? Full refund within 72 hours — same day, no questions.
        </p>
        <SocialProofTicker />
        <ValueBar />
      </section>

      {/* ── 2. PRICING CARDS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Single Report */}
          <div className="relative bg-[#FF6B35] rounded-2xl p-8 text-white shadow-[0_8px_40px_rgba(255,107,53,0.28)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
              Most Popular
            </span>

            <p className="text-xs font-bold text-white/60 mb-1 uppercase tracking-[0.14em]">Single Report</p>
            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="text-6xl font-black leading-none">$99</span>
            </div>
            <p className="text-white/55 text-sm mb-6">one-time · no subscription</p>

            {/* ROI callout */}
            <div className="bg-white/10 rounded-xl px-4 py-3 mb-6 border border-white/15">
              <p className="text-xs font-semibold text-white/80 mb-0.5">The math</p>
              <p className="text-sm text-white leading-snug">
                Avoid one wrong material choice on a 500-unit order and you save <span className="font-bold">$2,000+</span>. That&apos;s a 20&times; return before you&apos;ve even shipped.
              </p>
            </div>

            {/* Full feature list */}
            <ul className="space-y-2.5 mb-6">
              {singleFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Mini timeline */}
            <div className="bg-white/10 rounded-xl px-4 py-4 mb-6 border border-white/15">
              <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">What you get in 5 minutes</p>
              {[
                { t: "0:00", label: "Submit product details" },
                { t: "0:30", label: "AI starts live analysis" },
                { t: "2–5 min", label: "Full 12-section report ready" },
                { t: "Instantly", label: "Email + share link delivered" },
              ].map(({ t, label }) => (
                <div key={t} className="flex items-center gap-3 mb-2 last:mb-0">
                  <span className="text-[10px] font-mono font-bold text-white/40 w-14 shrink-0">{t}</span>
                  <span className="text-xs text-white/80">{label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/analyze"
              className="block text-center bg-white text-[#FF6B35] w-full rounded-full py-3.5 font-bold hover:bg-white/90 transition-colors text-sm"
            >
              Analyze my product — $99
            </Link>
            <p className="text-center text-xs text-white/40 mt-2">Stripe secure · results in 2–5 min</p>
          </div>

          {/* Monthly */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#E8E8E4] flex flex-col">
            <p className="text-xs font-bold text-[#9B9B9B] mb-1 uppercase tracking-[0.14em]">Monthly</p>
            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="text-6xl font-black text-[#1A1A1A] leading-none">$199</span>
            </div>
            <p className="text-[#9B9B9B] text-sm mb-5">/month · cancel anytime</p>

            {/* Unit economics callout */}
            <div className="bg-[#F5F5F0] rounded-xl px-4 py-3 mb-6 border border-[#E8E8E4]">
              <p className="text-xs font-semibold text-[#6B6B6B] mb-0.5">The math</p>
              <p className="text-sm text-[#1A1A1A] leading-snug">
                Run 100 analyses in a month and you&apos;re paying <span className="font-bold text-[#FF6B35]">$2 per analysis</span> &mdash; vs $99 each on single.
              </p>
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-[#9B9B9B] mb-3">
              Everything in Single, plus:
            </p>
            <ul className="space-y-2.5 mb-6">
              {["Unlimited analyses", "Priority support", "Early access to new features"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Perfect for */}
            <div className="border border-[#E8E8E4] rounded-xl px-4 py-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9B9B9B] mb-3">Perfect for</p>
              {[
                "Agencies managing 5+ product lines at once",
                "Serial founders evaluating multiple ideas per month",
                "Operators auditing existing supplier costs quarterly",
              ].map((use) => (
                <div key={use} className="flex items-start gap-2 mb-2 last:mb-0">
                  <Users className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4A4A4A] leading-snug">{use}</span>
                </div>
              ))}
            </div>

            <Link
              href="/analyze"
              className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3.5 font-semibold hover:bg-[#FFF0EB] transition-colors mt-auto text-sm"
            >
              Subscribe monthly — $199/mo
            </Link>
            <p className="text-center text-xs text-[#C8C8C4] mt-2">No lock-in. Cancel from settings anytime.</p>
          </div>
        </div>
      </section>

      {/* ── 3. ROI CALCULATOR ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <ROICalculator />
      </section>

      {/* ── 4. TESTIMONIAL STRIP ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-[#9B9B9B] mb-2">Real results</p>
          <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Founders do the math on day one</h2>
        </div>
        <TestimonialStrip />
      </section>

      {/* ── 5. FEATURE COMPARISON MATRIX ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-[#9B9B9B] mb-2">What&apos;s included</p>
          <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Every feature, grouped by type</h2>
          <p className="text-sm text-[#9B9B9B] mt-2">Hover any row to see what it actually does</p>
        </div>
        <FeatureMatrixTable />
      </section>

      {/* ── 6. VS ALTERNATIVES TABLE ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-[#9B9B9B] mb-2">How it compares</p>
          <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Bottlecap vs. the alternatives</h2>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
          <AltComparisonTable />
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-black tracking-tight text-[#1A1A1A] mb-6">Quick answers</h2>
        <div className="bg-white rounded-2xl border border-[#E8E8E4] px-6">
          {pricingFaqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </section>

      {/* ── 8. FINAL CTA ── */}
      <section className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-[#FF6B35] mb-4">Get started</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            Ready to find out<br />in 5 minutes?
          </h2>
          <p className="text-white/50 mb-8 max-w-sm mx-auto">
            Describe your product. Our AI pulls live data from 5 sources and delivers a 12-section report while you grab a coffee.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-bold hover:bg-[#E85A25] shadow-[0_4px_24px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_32px_rgba(255,107,53,0.45)] transition-all text-sm"
            >
              Analyze my product — $99
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/report/demo"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-8 py-4 font-semibold hover:bg-white/5 transition-colors text-sm"
            >
              See a demo report
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/30">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 72-hr money-back</span>
            <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Stripe secure</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 2–5 min delivery</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Powered by Claude AI</span>
          </div>
        </div>
      </section>

    </div>
  )
}
