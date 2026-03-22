"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock, RotateCcw, Zap, Shield, CheckCircle, ChevronDown, ChevronUp,
  Clock, TrendingUp, DollarSign, Globe, Sparkles,
  ClipboardCheck, Globe2, FileText, Layers, Factory, TrendingDown,
  CheckSquare, Star, ChevronRight, Hash,
} from "lucide-react"
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

// Enhanced report sections for the sticky right panel
const reportPreviewSections = [
  {
    Icon: ClipboardCheck,
    label: "Feasibility Score (0–100)",
    desc: "Go / No-Go verdict with a clear numeric confidence rating",
  },
  {
    Icon: DollarSign,
    label: "Per-unit cost breakdown",
    desc: "Materials, labor, overhead, packaging, and shipping split",
  },
  {
    Icon: Globe2,
    label: "3-country comparison",
    desc: "China vs Vietnam vs India across cost, lead time, and risk",
  },
  {
    Icon: FileText,
    label: "HS code + tariff rate",
    desc: "Correct commodity code and applicable import duties",
  },
  {
    Icon: Layers,
    label: "Materials analysis + alternatives",
    desc: "Primary materials rated for cost, durability, and sourcing",
  },
  {
    Icon: Factory,
    label: "10 factory-ready specs",
    desc: "Exact spec sheet a manufacturer needs to quote your product",
  },
  {
    Icon: TrendingDown,
    label: "Optimization tips + $ savings",
    desc: "Design tweaks that can cut cost 10–30% without quality loss",
  },
  {
    Icon: CheckSquare,
    label: "7-step action checklist",
    desc: "Your next steps from sourcing through first shipment",
  },
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

// Social proof testimonials
const testimonials = [
  {
    name: "Sarah K.",
    role: "Founder, Homewares brand",
    quote: "Saved $4,900 vs hiring a sourcing agent — got the same intel in 3 minutes.",
    stars: 5,
  },
  {
    name: "James R.",
    role: "Amazon FBA seller",
    quote: "Found Vietnam was 22% cheaper than my current China supplier. Game changer.",
    stars: 5,
  },
  {
    name: "Priya M.",
    role: "Product entrepreneur",
    quote: "Launched 3 products using Bottlecap reports. Each one came in under budget.",
    stars: 5,
  },
]

// Trending product chips
const trendingChips = [
  {
    label: "Insulated tumbler",
    description: "Stainless steel insulated tumbler, 20oz, double-wall vacuum, powder coat finish, custom logo engraving, targeting US market, $25–35 price point",
  },
  {
    label: "Wireless earbuds",
    description: "Bluetooth wireless earbuds, TWS, 30hr total battery, IPX4 water resistant, touch controls, needs FCC and CE certification",
  },
  {
    label: "Bamboo cutting board",
    description: "Organic bamboo cutting board, 12x18 inches, juice groove, end-grain construction, food-safe finish, custom branding, targeting premium kitchen market",
  },
  {
    label: "Phone case",
    description: "MagSafe-compatible phone case for iPhone 15 series, TPU + polycarbonate, 6ft drop protection, custom color options, retail price $30–45",
  },
  {
    label: "Gym bag",
    description: "Duffle gym bag, 40L capacity, 600D polyester, wet/dry compartment, adjustable shoulder strap, custom embroidery patch, targeting fitness enthusiasts",
  },
  {
    label: "Silicone mat",
    description: "Non-slip silicone kitchen mat, 16x24 inches, heat resistant to 450°F, BPA-free, dishwasher safe, custom color and logo printing available",
  },
  {
    label: "LED lamp",
    description: "Rechargeable LED desk lamp, touch dimmer, 3 color temps, USB-C charging, 8hr battery, foldable arm, targeting home office market, retail $45–65",
  },
  {
    label: "Stainless bottle",
    description: "Triple-insulated stainless steel water bottle, 32oz, leak-proof lid, carabiner loop, 24hr cold / 12hr hot, custom engraving, retail $35–50",
  },
]

// Example product descriptions
const exampleDescriptions = [
  {
    title: "Insulated tumbler",
    text: "Stainless steel insulated tumbler, 20oz, double-wall vacuum, powder coat finish, custom logo engraving, targeting US market, $25–35 price point",
  },
  {
    title: "Wireless earbuds",
    text: "Bluetooth wireless earbuds, TWS, 30hr total battery, IPX4 water resistant, touch controls, needs FCC and CE certification",
  },
  {
    title: "Organic tote bag",
    text: "Organic cotton tote bag, 12oz canvas, reinforced handles, 15x16 inches, custom screen printing, minimum 200 units",
  },
]

// ── Helpers ─────────────────────────────────────────────────────────────────

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
      ))}
    </div>
  )
}

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

// ── Social proof strip (auto-rotating) ──────────────────────────────────────

function TestimonialStrip() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const t = testimonials[active]

  return (
    <motion.div
      className="mb-8 bg-white border border-[#E8E8E4] rounded-2xl px-5 py-4 relative overflow-hidden"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
    >
      {/* Subtle orange accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B35] rounded-l-2xl" />

      <div className="flex items-start gap-4 pl-2">
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <StarRow count={t.stars} />
              <p className="text-sm text-[#1A1A1A] font-medium leading-snug mt-1.5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[11px] text-[#9B9B9B] mt-1.5">
                <span className="font-semibold text-[#4B4B4B]">{t.name}</span>
                {" · "}
                {t.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex flex-col gap-1.5 items-center pt-0.5 shrink-0">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === active ? "h-4 bg-[#FF6B35]" : "h-1.5 bg-[#E8E8E4] hover:bg-[#D0D0C8]"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Trending product chips ───────────────────────────────────────────────────

function TrendingChips({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9B9B9B]">
          Most analyzed products
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingChips.map((chip) => (
          <motion.button
            key={chip.label}
            onClick={() => onSelect(chip.description)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="text-xs bg-[#F5F5F0] border border-[#E8E8E4] rounded-full px-3 py-1.5 text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FFF5F0] transition-colors font-medium"
          >
            {chip.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ── Character count indicator ────────────────────────────────────────────────

function CharCount({ count, max = 500 }: { count: number; max?: number }) {
  const colorClass =
    count === 0
      ? "text-[#9B9B9B]"
      : count < 50
      ? "text-[#9B9B9B]"
      : count < 100
      ? "text-[#F59E0B]"
      : "text-[#22C55E]"

  const barWidth = Math.min(100, (count / max) * 100)
  const barColor =
    count < 50 ? "#E8E8E4" : count < 100 ? "#F59E0B" : "#22C55E"

  return (
    <div className="mt-2 mb-1">
      {/* Progress bar */}
      <div className="h-0.5 bg-[#F0F0EC] rounded-full overflow-hidden mb-1.5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className={`text-[11px] font-medium transition-colors ${colorClass}`}>
        {count} / {max} characters
        {count >= 100 && (
          <span className="text-[#22C55E] ml-1">— great detail, better results</span>
        )}
        {count >= 50 && count < 100 && (
          <span className="text-[#F59E0B] ml-1">— add a bit more for best accuracy</span>
        )}
        {count > 0 && count < 50 && (
          <span className="text-[#9B9B9B] ml-1">— more detail = better results</span>
        )}
      </p>
    </div>
  )
}

// ── Example descriptions expander ────────────────────────────────────────────

function ExampleDescriptions({ onUse }: { onUse: (text: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 mb-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs text-[#9B9B9B] hover:text-[#FF6B35] transition-colors font-medium"
      >
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
        See example descriptions
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="examples"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-3 space-y-3">
              {exampleDescriptions.map((ex) => (
                <div
                  key={ex.title}
                  className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9B9B9B] mb-1.5">
                        {ex.title}
                      </p>
                      <p className="text-xs text-[#4B4B4B] leading-relaxed">{ex.text}</p>
                    </div>
                    <button
                      onClick={() => {
                        onUse(ex.text)
                        setOpen(false)
                      }}
                      className="shrink-0 text-[11px] font-semibold text-[#FF6B35] border border-[#FF6B35]/30 rounded-full px-3 py-1 hover:bg-[#FFF0EB] transition-colors whitespace-nowrap"
                    >
                      Use this
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Enhanced form wrapper ────────────────────────────────────────────────────
// Sits above SubmitForm, writes to sessionStorage so SubmitForm picks it up

function FormEnhancements() {
  const [desc, setDesc] = useState("")
  const injectedRef = useRef(false)

  // Sync desc from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("bottlecap_hero_text")
    if (saved) setDesc(saved)
  }, [])

  // Write to sessionStorage whenever desc changes so SubmitForm reacts
  function injectDescription(text: string) {
    sessionStorage.setItem("bottlecap_hero_text", text)
    setDesc(text)
    // Force SubmitForm to re-read by dispatching a custom event
    window.dispatchEvent(new StorageEvent("storage", {
      key: "bottlecap_hero_text",
      newValue: text,
      storageArea: sessionStorage,
    }))
    injectedRef.current = true
    // Scroll to textarea smoothly
    const ta = document.querySelector("textarea")
    if (ta) {
      ta.scrollIntoView({ behavior: "smooth", block: "center" })
      ta.focus()
    }
  }

  return (
    <>
      <TrendingChips onSelect={injectDescription} />
      <div className="mb-2">
        <CharCount count={desc.length} max={500} />
        <ExampleDescriptions onUse={injectDescription} />
      </div>
    </>
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

// ── NEW: Enhanced sticky "What you'll get" panel ─────────────────────────────

function ReportPreviewPanel() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E8E8E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
          </span>
          <p className="text-xs font-bold text-[#1A1A1A]">Your report will include:</p>
        </div>
        <p className="text-[11px] text-[#9B9B9B] pl-4">8 detailed sections, AI-generated</p>
      </div>

      {/* Sections list */}
      <div className="px-4 py-3 space-y-3">
        {reportPreviewSections.map(({ Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-3.5 h-3.5 text-[#FF6B35]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#1A1A1A] leading-snug">{label}</p>
              <p className="text-[10px] text-[#9B9B9B] leading-snug mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer badges */}
      <div className="px-5 pb-5 pt-2 border-t border-[#E8E8E4] space-y-2.5">
        {/* Timer badge */}
        <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#22C55E]/20 rounded-xl px-3.5 py-2.5">
          <Clock className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#15803D]">Generated in 2–5 minutes</p>
            <p className="text-[10px] text-[#86EFAC]">Powered by Claude AI</p>
          </div>
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="text-xs font-bold text-[#1A1A1A]">$99 one-time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3 text-[#9B9B9B]" />
            <span className="text-[11px] text-[#9B9B9B]">72-hr money-back</span>
          </div>
        </div>

        {/* Demo link */}
        <Link
          href="/report/demo"
          className="flex items-center justify-center gap-1.5 w-full text-xs text-[#FF6B35] font-semibold border border-[#FF6B35]/25 rounded-xl py-2.5 hover:bg-[#FFF5F0] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Preview a sample report
        </Link>
      </div>
    </div>
  )
}

// ── Main content ───────────────────────────────────────────────────────────────

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get("cancelled") === "true"

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Cancelled banner */}
      {cancelled && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 px-5 py-4 bg-[#FEF3C7] border border-[#F59E0B]/40 rounded-xl text-sm text-[#92400E] max-w-2xl"
        >
          Payment cancelled — your progress is saved. Pick up where you left off.
        </motion.div>
      )}

      {/* Page header */}
      <motion.div
        className="mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      >
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">
          Manufacturing feasibility report
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1A1A] mb-3">
          What do you want to make?
        </h1>
        <p className="text-[#6B6B6B] text-base leading-relaxed mb-5">
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
      </motion.div>

      {/* Testimonial strip — between header and form */}
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      >
        <TestimonialStrip />
      </motion.div>

      {/* Main layout: left form + right panel */}
      <div className="lg:grid lg:grid-cols-5 gap-10 xl:gap-14">

        {/* Left — form col (3/5) */}
        <div className="lg:col-span-3 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            <FormEnhancements />
            <TipCard />
            <SubmitForm />
          </motion.div>
        </div>

        {/* Right — sticky panel (2/5) */}
        <div className="hidden lg:block lg:col-span-2">
          <motion.div
            className="sticky top-24 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            {/* Primary: What you'll get */}
            <ReportPreviewPanel />

            {/* Trust badges */}
            <SectionB />

            {/* Sample output */}
            <SectionC />

            {/* Live activity */}
            <SectionD />
          </motion.div>
        </div>
      </div>

      {/* Mobile-only: what you'll get (collapsed accordion) */}
      <MobileReportPreview />

      {/* Mobile trust strip */}
      <div className="lg:hidden mt-8 pt-6 border-t border-[#E8E8E4]">
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

// ── Mobile report preview accordion ──────────────────────────────────────────

function MobileReportPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden mt-8 border border-[#E8E8E4] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#FAFAF8] hover:bg-[#F5F5F0] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-sm font-semibold text-[#1A1A1A]">What your report includes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9B9B9B]">8 sections</span>
          {open ? <ChevronUp className="w-4 h-4 text-[#9B9B9B]" /> : <ChevronDown className="w-4 h-4 text-[#9B9B9B]" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-preview"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 py-4 space-y-3 border-t border-[#E8E8E4] bg-white">
              {reportPreviewSections.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{label}</p>
                    <p className="text-[10px] text-[#9B9B9B] mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Timer + trust */}
              <div className="pt-3 border-t border-[#E8E8E4] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-xs font-semibold text-[#15803D]">2–5 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3 h-3 text-[#9B9B9B]" />
                  <span className="text-[11px] text-[#9B9B9B]">72-hr money-back</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
