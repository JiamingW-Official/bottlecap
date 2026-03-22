"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, RotateCcw, Zap, Shield, CheckCircle, ChevronDown, ChevronUp, Clock, TrendingUp, DollarSign, Globe, Sparkles } from "lucide-react"
import SubmitForm from "@/components/SubmitForm"

// ── Static data ────────────────────────────────────────────────────────────────

const reportSections = [
  { num: "01", label: "Feasibility Score (0–100)" },
  { num: "02", label: "HS Code + Tariff Rate" },
  { num: "03", label: "Per-Unit Cost Breakdown" },
  { num: "04", label: "3-Country Comparison" },
  { num: "05", label: "Materials Analysis" },
  { num: "06", label: "10 Factory-Ready Specs" },
  { num: "07", label: "Optimization Tips + Savings" },
  { num: "08", label: "7-Step Action Checklist" },
  { num: "09", label: "Red Flag Warnings" },
  { num: "10", label: "Market Context" },
  { num: "11", label: "Supplier Guidance" },
  { num: "12", label: "Shareable Report Card" },
]

const trustBadges = [
  { Icon: Zap, label: "2–5 min delivery", sub: "Powered by Claude AI" },
  { Icon: Lock, label: "Stripe secured", sub: "PCI compliant" },
  { Icon: RotateCcw, label: "72-hr refund", sub: "No questions asked" },
  { Icon: Shield, label: "Confidential", sub: "Your ideas stay yours" },
]

const costBreakdown = [
  { label: "Materials", pct: 38, color: "#FF6B35" },
  { label: "Labor",     pct: 32, color: "#F59E0B" },
  { label: "Overhead",  pct: 15, color: "#10B981" },
  { label: "Packaging", pct: 10, color: "#6366F1" },
  { label: "Shipping",  pct: 5,  color: "#9B9B9B" },
]

const recentAnalyses = [
  { emoji: "🧴", name: "Natural skincare kit",   score: 88, ago: "4 min ago" },
  { emoji: "📱", name: "Smart home sensor",       score: 79, ago: "12 min ago" },
  { emoji: "🎒", name: "Backpack with USB port",  score: 82, ago: "31 min ago" },
]

const tips = [
  'Include materials (e.g. "stainless steel body, silicone lid")',
  "Mention key features (waterproof, battery-powered, foldable)",
  "Note your target price range",
  "Add approximate dimensions if you know them",
]

// ── Tip card ───────────────────────────────────────────────────────────────────

function TipCard() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("tipcard-dismissed")
      if (saved === "true") setDismissed(true)
    }
  }, [])

  function dismiss() {
    setDismissed(true)
    sessionStorage.setItem("tipcard-dismissed", "true")
  }

  if (dismissed) return null

  return (
    <div className="rounded-xl border border-[#E8E8E4] bg-[#FAFAF8] overflow-hidden mb-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#FF6B35] hover:bg-[#F5F5F0] transition-colors"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Tips for best results
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="tips"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-[#E8E8E4]">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#6B6B6B] leading-snug">{tip}</p>
                </div>
              ))}
              <button
                onClick={dismiss}
                className="mt-1 text-[10px] text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
              >
                Got it, don&apos;t show again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Sidebar sections ───────────────────────────────────────────────────────────

function SectionA() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9B9B9B] mb-3">
        What you&apos;ll receive
      </p>
      <div className="space-y-1.5">
        {reportSections.map(({ num, label }) => (
          <div key={num} className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono font-bold text-[#9B9B9B] w-5 shrink-0">{num}</span>
            <CheckCircle className="w-3 h-3 text-[#22C55E] shrink-0" />
            <span className="text-xs text-[#4B4B4B] leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionB() {
  return (
    <div className="bg-[#F5F5F0] rounded-2xl border border-[#E8E8E4] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9B9B9B] mb-3">
        Why trust us
      </p>
      <div className="space-y-3">
        {trustBadges.map(({ Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A] leading-none">{label}</p>
              <p className="text-[10px] text-[#9B9B9B] mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionC() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9B9B9B] mb-3">
        Sample output — Smart Thermos
      </p>

      {/* Score */}
      <div className="flex items-end gap-2 mb-1">
        <span className="text-4xl font-black text-[#22C55E] leading-none">87</span>
        <span className="text-sm text-[#9B9B9B] mb-0.5">/100</span>
      </div>
      <p className="text-xs font-semibold text-[#FF6B35] mb-3">
        Highly feasible — Vietnam recommended
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Cost/unit",  value: "$6.20–$8.40" },
          { label: "MOQ",        value: "500 units" },
          { label: "Lead time",  value: "32 days" },
          { label: "Tariff",     value: "5–15%" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#F5F5F0] rounded-lg px-2.5 py-2">
            <p className="text-[9px] text-[#9B9B9B] uppercase tracking-wide font-bold">{label}</p>
            <p className="text-xs font-semibold text-[#1A1A1A] mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Cost breakdown bar */}
      <div className="mb-2">
        <p className="text-[9px] text-[#9B9B9B] uppercase tracking-wide font-bold mb-1.5">Cost breakdown</p>
        <div className="flex rounded-full overflow-hidden h-2">
          {costBreakdown.map(({ label, pct, color }) => (
            <div
              key={label}
              style={{ width: `${pct}%`, backgroundColor: color }}
              title={`${label} ${pct}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
          {costBreakdown.map(({ label, pct, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-[#9B9B9B]">{label} {pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/report/demo"
        className="inline-flex items-center gap-1 text-xs text-[#FF6B35] font-semibold hover:underline mt-2"
      >
        See full demo →
      </Link>
    </div>
  )
}

function SectionD() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
        </span>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9B9B9B]">
          Recent analyses
        </p>
      </div>
      <div className="space-y-2.5">
        {recentAnalyses.map(({ emoji, name, score, ago }) => (
          <div key={name} className="flex items-center gap-2.5">
            <span className="text-base leading-none">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#1A1A1A] font-medium truncate leading-snug">{name}</p>
              <p className="text-[10px] text-[#9B9B9B]">{ago}</p>
            </div>
            <span className="text-xs font-bold text-[#22C55E] shrink-0">{score}/100</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main content ───────────────────────────────────────────────────────────────

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get("cancelled") === "true"

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Cancelled banner */}
      {cancelled && (
        <div className="mb-8 px-5 py-4 bg-[#FEF3C7] border border-[#F59E0B]/40 rounded-xl text-sm text-[#92400E] max-w-2xl">
          Payment cancelled — your progress is saved. Pick up where you left off.
        </div>
      )}

      {/* Page header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">
          Manufacturing feasibility report
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1A1A] mb-3">
          What do you want to make?
        </h1>
        <p className="text-[#6B6B6B] text-base leading-relaxed mb-4">
          Tell us. We&apos;ll analyze it across 50+ dimensions — cost, countries, materials, tariffs — and deliver a 12-section report in 2–5 minutes.
        </p>

        {/* Live social proof row */}
        <div className="inline-flex items-center gap-2.5 bg-[#F5F5F0] border border-[#E8E8E4] rounded-full px-4 py-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-xs text-[#4B4B4B]">
            <span className="font-semibold text-[#1A1A1A]">847</span> analyses run this month
            <span className="text-[#D1D1CC] mx-2">·</span>
            Avg score: <span className="font-semibold text-[#1A1A1A]">79/100</span>
            <span className="text-[#D1D1CC] mx-2">·</span>
            <span className="font-semibold text-[#1A1A1A]">4.9/5</span> rating
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        {/* Left — form */}
        <div className="flex-1 min-w-0">
          <TipCard />
          <SubmitForm />
        </div>

        {/* Right — sidebar (desktop) */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-4">
            <SectionA />
            <SectionB />
            <SectionC />
            <SectionD />
          </div>
        </div>
      </div>

      {/* Mobile trust strip */}
      <div className="lg:hidden mt-10 pt-8 border-t border-[#E8E8E4]">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {trustBadges.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-[#9B9B9B]">
              <Icon className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Page export ────────────────────────────────────────────────────────────────

export default function AnalyzePage() {
  return (
    <Suspense>
      <AnalyzeContent />
    </Suspense>
  )
}
