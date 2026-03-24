"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  BarChart2,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Cpu,
  DollarSign,
  Flag,
  Globe,
  Layers,
  Lightbulb,
  Package,
  Settings,
  Shield,
  Square,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Animated feasibility score circle
// ---------------------------------------------------------------------------
function FeasibilityCircle({ score }: { score: number }) {
  const ref = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })
  const [displayed, setDisplayed] = useState(0)

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference - (score / 100) * circumference

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setDisplayed(Math.round(progress * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, score])

  return (
    <div ref={containerRef} className="relative inline-flex items-center justify-center">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#E8E8E4" strokeWidth="10" />
        <motion.circle
          ref={ref}
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: targetOffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          transform="rotate(-90 64 64)"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-3xl font-black text-[#1A1A1A]">{displayed}</span>
        <span className="block text-xs text-[#6B6B6B] font-semibold -mt-1">/100</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mini score bar
// ---------------------------------------------------------------------------
function ScoreBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="w-full h-2 bg-[#E8E8E4] rounded-full overflow-hidden mt-1.5">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stacked cost bar
// ---------------------------------------------------------------------------
const COST_SEGMENTS = [
  { label: "Materials", value: 4.20, color: "#3B82F6" },
  { label: "Labor", value: 1.40, color: "#8B5CF6" },
  { label: "Overhead", value: 0.80, color: "#F59E0B" },
  { label: "Packaging", value: 0.60, color: "#EC4899" },
  { label: "Shipping", value: 1.20, color: "#14B8A6" },
  { label: "Duties", value: 0.28, color: "#EF4444" },
]
const TOTAL_COST = 8.48

function CostStackedBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div className="flex h-8 rounded-xl overflow-hidden w-full">
        {COST_SEGMENTS.map((seg) => {
          const pct = (seg.value / TOTAL_COST) * 100
          return (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              style={{ backgroundColor: seg.color }}
              className="h-full"
              title={`${seg.label}: $${seg.value.toFixed(2)}`}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
        {COST_SEGMENTS.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[#6B6B6B]">{seg.label}</span>
            <span className="font-semibold text-[#1A1A1A]">${seg.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section wrapper with scroll reveal
// ---------------------------------------------------------------------------
function Section({
  icon,
  title,
  iconBg,
  children,
}: {
  icon: React.ReactNode
  title: string
  iconBg: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden shadow-sm"
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E8E8E4]">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg + "22" }}
        >
          <span style={{ color: iconBg }}>{icon}</span>
        </div>
        <h2 className="text-base font-bold text-[#1A1A1A]">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function DemoContent() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Demo watermark banner */}
      <div className="bg-[#F59E0B] text-white text-sm font-semibold text-center py-2.5 px-4">
        <span className="mr-2">SAMPLE REPORT</span>
        &mdash; This is a demo. Real data for your product &rarr;{" "}
        <Link href="/analyze" className="underline underline-offset-2 hover:opacity-80">
          Analyze my product
        </Link>
      </div>

      {/* Sticky side CTA */}
      <div className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <Link
          href="/analyze"
          className="flex flex-col items-center gap-2 bg-[#FF6B35] text-white rounded-2xl px-4 py-5 shadow-lg hover:bg-[#e55a24] transition-colors text-center"
        >
          <Zap className="w-5 h-5" />
          <span className="text-xs font-bold leading-tight" style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}>
            Analyze my product
          </span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ------------------------------------------------------------------ */}
        {/* 1. Header banner */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold bg-[#FF6B35] px-2.5 py-1 rounded-full uppercase tracking-wide">
                  AI Analysis
                </span>
                <span className="text-xs text-white/50">Generated in 2m 47s</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black leading-snug mb-1">
                Insulated Stainless Steel Water Bottle
              </h1>
              <p className="text-sm text-white/60">
                500ml &middot; Double-wall vacuum &middot; BPA-free &middot; Bamboo lid &middot; Custom engraving
              </p>
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span className="text-sm text-[#22C55E] font-semibold">Highly Feasible</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FeasibilityCircle score={83} />
              <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Feasibility Score</span>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. Score breakdown */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<BarChart2 className="w-5 h-5" />} title="Score Breakdown" iconBg="#3B82F6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { label: "Manufacturing Complexity", score: 72, color: "#F59E0B" },
              { label: "Material Availability", score: 91, color: "#22C55E" },
              { label: "Cost Competitiveness", score: 85, color: "#22C55E" },
              { label: "Market Demand", score: 88, color: "#22C55E" },
              { label: "Regulatory Risk", score: 76, color: "#F59E0B" },
              { label: "Supply Chain Depth", score: 82, color: "#22C55E" },
            ].map((item) => (
              <div key={item.label} className="bg-[#F9F9F7] rounded-xl p-4">
                <p className="text-xs text-[#6B6B6B] leading-tight mb-1">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black" style={{ color: item.color }}>{item.score}</span>
                  <span className="text-xs text-[#767676]">/100</span>
                </div>
                <ScoreBar value={item.score} color={item.color} />
              </div>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. Cost breakdown */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<DollarSign className="w-5 h-5" />} title="Cost Breakdown — 500 Units, FOB China" iconBg="#22C55E">
          <div className="space-y-5">
            {/* Stacked bar */}
            <CostStackedBar />

            {/* Line items */}
            <div className="space-y-2 mt-2">
              <div className="text-xs font-semibold text-[#767676] uppercase tracking-wide mb-2">Materials Breakdown</div>
              {[
                { label: "Stainless steel body (18/8)", value: "$2.80" },
                { label: "Bamboo lid", value: "$0.90" },
                { label: "Rubber seal ring", value: "$0.50" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm pl-4 text-[#6B6B6B]">
                  <span>{item.label}</span>
                  <span className="font-medium text-[#1A1A1A]">{item.value}</span>
                </div>
              ))}
              <div className="h-px bg-[#E8E8E4] my-2" />
              {[
                { label: "Labor", value: "$1.40" },
                { label: "Manufacturing overhead", value: "$0.80" },
                { label: "Packaging (individual box)", value: "$0.60" },
                { label: "Shipping — sea freight, FOB", value: "$1.20" },
                { label: "Import duties — US (HS 7323.93, MFN 3.4%)", value: "$0.28" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm text-[#6B6B6B]">
                  <span>{item.label}</span>
                  <span className="font-medium text-[#1A1A1A]">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="rounded-xl bg-[#F5F5F0] p-4 space-y-2">
              <div className="flex justify-between font-bold text-[#1A1A1A] text-base">
                <span>Total landed cost</span>
                <span>$8.48 / unit</span>
              </div>
              <div className="flex justify-between text-sm text-[#6B6B6B]">
                <span>Suggested retail (Amazon/DTC)</span>
                <span className="font-semibold text-[#1A1A1A]">$34.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B6B]">Gross margin</span>
                <span className="font-bold text-[#22C55E] text-base">75.8%</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 4. 3-Country comparison */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<Globe className="w-5 h-5" />} title="3-Country Supplier Comparison" iconBg="#8B5CF6">
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-[#767676] uppercase tracking-wide py-2 pr-4 w-36"></th>
                  <th className="text-center py-2 px-3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg">🇨🇳</span>
                      <span className="text-xs font-bold text-[#1A1A1A]">China</span>
                      <span className="text-xs text-[#767676]">Zhejiang</span>
                    </div>
                  </th>
                  <th className="text-center py-2 px-3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg">🇻🇳</span>
                      <span className="text-xs font-bold text-[#1A1A1A]">Vietnam</span>
                      <span className="text-xs text-[#767676]">Ho Chi Minh</span>
                    </div>
                  </th>
                  <th className="text-center py-2 px-3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-xs font-bold text-[#1A1A1A]">India</span>
                      <span className="text-xs text-[#767676]">Mumbai</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0EC]">
                {[
                  { label: "Per unit (500 MOQ)", china: "$8.48", vietnam: "$9.12", india: "$10.20" },
                  { label: "MOQ", china: "300", vietnam: "500", india: "1,000" },
                  { label: "Lead time", china: "45 days", vietnam: "52 days", india: "60 days" },
                  { label: "Quality rating", china: "9/10", vietnam: "8/10", india: "7/10" },
                  { label: "IP protection", china: "6/10", vietnam: "7/10", india: "8/10" },
                  { label: "US tariff", china: "3.4% + 7.5%", vietnam: "3.4%", india: "3.4%" },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 pr-4 text-xs text-[#6B6B6B] font-medium">{row.label}</td>
                    <td className="py-3 px-3 text-center font-semibold text-[#1A1A1A] bg-[#FFF5F0] rounded">{row.china}</td>
                    <td className="py-3 px-3 text-center text-[#6B6B6B]">{row.vietnam}</td>
                    <td className="py-3 px-3 text-center text-[#6B6B6B]">{row.india}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 pr-4 text-xs text-[#6B6B6B] font-medium">Recommendation</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Recommended
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs text-[#F59E0B] font-semibold">Alternative</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs text-[#767676]">Higher cost</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-[#767676] bg-[#FFF5F0] border border-[#FF6B35]/20 rounded-lg px-3 py-2">
            China (Zhejiang) is highlighted as the recommended source due to lowest landed cost and deepest supplier base for vacuum insulated drinkware. Section 301 tariff of 7.5% is budgeted into the $8.48 figure.
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 5. HS Code */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<Shield className="w-5 h-5" />} title="HS Code &amp; Tariff Classification" iconBg="#F59E0B">
          <div className="space-y-4">
            <div className="bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-xl p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <p className="text-2xl font-black text-[#1A1A1A] tracking-tight">HS 7323.93.00.90</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Stainless steel vacuum flasks and insulated containers</p>
                </div>
                <span className="text-xs bg-[#F59E0B] text-white px-2.5 py-1 rounded-full font-bold">Confidence 94%</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#F5F5F0] rounded-xl p-4">
                <p className="text-xs text-[#767676] mb-1">MFN Base Rate</p>
                <p className="text-xl font-black text-[#1A1A1A]">3.4%</p>
                <p className="text-xs text-[#6B6B6B] mt-1">All countries</p>
              </div>
              <div className="bg-[#FFF0EB] rounded-xl p-4 border border-[#FF6B35]/20">
                <p className="text-xs text-[#767676] mb-1">China (Section 301)</p>
                <p className="text-xl font-black text-[#EF4444]">+7.5%</p>
                <p className="text-xs text-[#6B6B6B] mt-1">Total: 10.9%</p>
              </div>
              <div className="bg-[#F0FFF4] rounded-xl p-4 border border-[#22C55E]/20">
                <p className="text-xs text-[#767676] mb-1">Vietnam / Mexico</p>
                <p className="text-xl font-black text-[#22C55E]">3.4%</p>
                <p className="text-xs text-[#6B6B6B] mt-1">No Section 301</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 6. Materials Analysis */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<Layers className="w-5 h-5" />} title="Materials Analysis" iconBg="#14B8A6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: "Current",
                tagColor: "#3B82F6",
                name: "18/8 Stainless Steel",
                status: "Good",
                statusColor: "#22C55E",
                cost: "$2.80 / unit",
                note: "Food-safe, corrosion-resistant, ideal for premium drinkware. Industry standard for this segment.",
                recommended: false,
              },
              {
                tag: "Alternative 1",
                tagColor: "#22C55E",
                name: "304 SS (domestic China grade)",
                status: "Recommended Switch",
                statusColor: "#22C55E",
                cost: "$2.46 / unit",
                note: "12% cheaper than import-grade 18/8. Same food safety certification. Negligible quality difference at 0.35mm wall thickness.",
                recommended: true,
              },
              {
                tag: "Alternative 2",
                tagColor: "#F59E0B",
                name: "Aluminum body",
                status: "Not Recommended",
                statusColor: "#EF4444",
                cost: "$2.02 / unit",
                note: "28% cheaper but reduces insulation performance and perceived quality. Incompatible with premium positioning.",
                recommended: false,
              },
            ].map((mat) => (
              <div
                key={mat.name}
                className={`rounded-xl border p-4 flex flex-col gap-3 ${mat.recommended ? "border-[#22C55E] bg-[#F0FFF4]" : "border-[#E8E8E4] bg-[#F9F9F7]"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: mat.tagColor + "22", color: mat.tagColor }}
                  >
                    {mat.tag}
                  </span>
                  {mat.recommended && <Star className="w-4 h-4 text-[#22C55E]" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">{mat.name}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: mat.statusColor }}>{mat.status}</p>
                </div>
                <p className="text-lg font-black text-[#1A1A1A]">{mat.cost}</p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{mat.note}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 7. 10 Factory Specs */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<Settings className="w-5 h-5" />} title="Factory Specification Sheet" iconBg="#6366F1">
          <ol className="space-y-3">
            {[
              { icon: <Cpu className="w-4 h-4" />, text: "Wall thickness: 0.35mm double-wall vacuum insulation" },
              { icon: <Package className="w-4 h-4" />, text: "Neck diameter: 53mm standard wide-mouth opening" },
              { icon: <Settings className="w-4 h-4" />, text: "Lid thread: 53mm screw-top (industry standard fit)" },
              { icon: <Layers className="w-4 h-4" />, text: "Surface finish: Powder coat or brushed stainless steel" },
              { icon: <Star className="w-4 h-4" />, text: "Logo method: Laser engraving — 300 DPI minimum resolution" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "Bamboo sourcing: FSC-certified preferred; certificate required" },
              { icon: <Shield className="w-4 h-4" />, text: "Testing: BPA-free certification (FDA 21 CFR) required pre-shipment" },
              { icon: <TrendingUp className="w-4 h-4" />, text: "Pressure test: 24-hour vacuum retention test at factory level" },
              { icon: <Package className="w-4 h-4" />, text: "Packaging: Individual gift box + outer carton; gift bag option available" },
              { icon: <Flag className="w-4 h-4" />, text: "MOQ labeling: 1-color minimum; 2-color available at 1,000 unit MOQ" },
            ].map((spec, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-[#F9F9F7] rounded-lg px-4 py-3 border border-[#E8E8E4]"
              >
                <span className="w-6 h-6 bg-[#6366F1] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[#6366F1] shrink-0 mt-0.5">{spec.icon}</span>
                <span className="text-sm text-[#1A1A1A]">{spec.text}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 8. Optimization Tips */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<Lightbulb className="w-5 h-5" />} title="Optimization Tips" iconBg="#FF6B35">
          <div className="space-y-3">
            {[
              {
                tip: "Switch to 304 SS domestic China grade instead of import-grade 18/8",
                saving: "Save $0.34 / unit",
                savingColor: "#22C55E",
              },
              {
                tip: "Order 1,000 units instead of 500 — unlocks volume pricing tier",
                saving: "Save $1.20 / unit",
                savingColor: "#22C55E",
              },
              {
                tip: "Source bamboo lids from a separate lid supplier; assemble locally to reduce factory markup",
                saving: "Save $0.22 / unit",
                savingColor: "#22C55E",
              },
              {
                tip: "Sea freight vs. air freight — at 500g per unit, sea freight is always the right call",
                saving: "Save $2.10 / unit",
                savingColor: "#22C55E",
              },
              {
                tip: "Remove gift box for DTC / e-commerce SKU; keep for wholesale/retail channel",
                saving: "Save $0.35 / unit",
                savingColor: "#22C55E",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 bg-white border-l-4 border-[#FF6B35] rounded-r-xl px-5 py-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#1A1A1A]">{item.tip}</p>
                </div>
                <span className="text-sm font-bold whitespace-nowrap shrink-0" style={{ color: item.savingColor }}>
                  {item.saving}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 9. Action Checklist */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<CheckSquare className="w-5 h-5" />} title="7-Step Action Checklist" iconBg="#22C55E">
          <ol className="space-y-3">
            {[
              "Finalize logo artwork in AI / EPS vector format (300 DPI minimum for engraving)",
              "Request 3 sample quotes from Zhejiang suppliers (search: Yongkang, Wenzhou vacuum bottle factories)",
              "Order 5 physical samples — budget $200–$400 including international shipping",
              "Obtain BPA-free test certificate (FDA 21 CFR) from factory; insist it covers the lid separately",
              "Set up Amazon listing draft and product photography brief while samples are in transit",
              "Place first production order: 300–500 units with 30% deposit, 70% before shipment",
              "Arrange sea freight forwarder — get 3 quotes; typical transit time China&rarr;US West Coast is 18–22 days",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Square className="w-5 h-5 text-[#E8E8E4] shrink-0 mt-0.5" />
                <span className="text-sm text-[#1A1A1A]" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ol>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 10. Red Flags / Warnings */}
        {/* ------------------------------------------------------------------ */}
        <Section icon={<AlertTriangle className="w-5 h-5" />} title="Red Flags &amp; Risk Factors" iconBg="#F59E0B">
          <div className="space-y-3">
            {[
              {
                headline: "Section 301 Tariffs on China-origin goods",
                detail: "An additional 7.5% is applied on top of the 3.4% MFN rate for Chinese-origin drinkware under HS 7323.93. This has been budgeted into the $8.48 landed cost above. If tariffs increase further, consider shifting to Vietnam sourcing where only the 3.4% MFN rate applies.",
              },
              {
                headline: "Bamboo lid FSC certification required for EU markets",
                detail: "The EU Deforestation Regulation (EUDR) effective 2025 requires FSC or equivalent certification for bamboo products. Verify the factory can supply documentation. Non-certified bamboo may create customs holds or rejection in EU markets.",
              },
            ].map((flag, i) => (
              <div key={i} className="flex gap-3 bg-[#FFFBEB] border border-[#F59E0B]/40 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#92400E]">{flag.headline}</p>
                  <p className="text-sm text-[#78350F] mt-1 leading-relaxed">{flag.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* 11. What's real in your report */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-2xl p-6"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#767676] mb-4">Demo vs Real Report</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">This sample report</p>
              <ul className="space-y-2 text-xs text-amber-800">
                {[
                  "Fixed product: insulated water bottle",
                  "Illustrative cost figures (not live data)",
                  "HS code accuracy unverified",
                  "Country selection is pre-selected",
                  "Optimization savings are approximate",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">○</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3">Your real report</p>
              <ul className="space-y-2 text-xs text-green-800">
                {[
                  "Your specific product description",
                  "Live tariff data and current benchmarks",
                  "AI-verified HS code with confidence score",
                  "Best countries selected for your product",
                  "Savings calculated from your actual inputs",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 12. Founder quote */}
        {/* ------------------------------------------------------------------ */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="border-l-4 border-[#FF6B35] pl-5 py-2"
        >
          <p className="text-base text-[#1A1A1A] font-medium leading-relaxed italic">
            &ldquo;I got a Bottlecap report for my bamboo cutting board idea on a Tuesday. By Friday I had 3 factory quotes and a sample order in. The HS code it gave me saved me from a 20% tariff I didn&apos;t know existed.&rdquo;
          </p>
          <footer className="mt-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-xs font-black text-[#FF6B35]">JL</span>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Jordan L.</p>
              <p className="text-xs text-[#767676]">DTC founder, kitchen products</p>
            </div>
          </footer>
        </motion.blockquote>

        {/* ------------------------------------------------------------------ */}
        {/* 13. Bottom CTA */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-8 sm:p-10 text-white text-center shadow-xl"
        >
          <p className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">This is sample data</p>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight">
            Get a real report for your product
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto mb-7">
            Your analysis is generated by Claude AI in 2&ndash;5 minutes. Includes real HS codes, factory specs, cost estimates, and country comparison tailored to your exact product.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-white text-[#FF6B35] font-black rounded-full px-8 py-3.5 text-base hover:bg-white/90 transition-colors shadow-md"
          >
            Analyze my product
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-white/50 mt-4">$99 one-time &middot; 2&ndash;5 min delivery &middot; Money-back guarantee</p>
        </motion.div>

      </div>
    </div>
  )
}
