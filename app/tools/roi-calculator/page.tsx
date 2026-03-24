"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Briefcase,
  ShoppingCart,
  Store,
  Globe,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Clock,
  ChevronRight,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type SalesChannel = "amazon" | "shopify" | "wholesale" | "retail"
type OptimizationLevel = "conservative" | "typical" | "optimistic"
type PresetKey = "first-time" | "serial" | "agency"

interface Preset {
  key: PresetKey
  label: string
  sublabel: string
  icon: React.ComponentType<{ className?: string }>
  unitCost: number
  retailPrice: number
  orderQty: number
  channel: SalesChannel
  color: string
  bgColor: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const PRESETS: Preset[] = [
  {
    key: "first-time",
    label: "First-time Founder",
    sublabel: "Exploring Amazon FBA",
    icon: Users,
    unitCost: 12,
    retailPrice: 45,
    orderQty: 500,
    channel: "amazon",
    color: "#FF6B35",
    bgColor: "#FFF0EB",
  },
  {
    key: "serial",
    label: "Serial Founder",
    sublabel: "Scaling Shopify DTC",
    icon: TrendingUp,
    unitCost: 8,
    retailPrice: 29,
    orderQty: 2000,
    channel: "shopify",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
  },
  {
    key: "agency",
    label: "Agency Client",
    sublabel: "Wholesale Distribution",
    icon: Briefcase,
    unitCost: 4,
    retailPrice: 18,
    orderQty: 5000,
    channel: "wholesale",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
  },
]

const CHANNELS: { id: SalesChannel; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "amazon", label: "Amazon FBA", icon: ShoppingCart },
  { id: "shopify", label: "Shopify DTC", icon: Store },
  { id: "wholesale", label: "Wholesale", icon: Package },
  { id: "retail", label: "Retail", icon: Globe },
]

const OPT_LEVELS: { id: OptimizationLevel; label: string; pct: number; desc: string }[] = [
  { id: "conservative", label: "Conservative", pct: 1.5, desc: "1.5% savings" },
  { id: "typical", label: "Typical", pct: 2.5, desc: "2.5% savings" },
  { id: "optimistic", label: "Optimistic", pct: 4.0, desc: "4.0% savings" },
]

const SENSITIVITY_ROWS = [
  { rate: 1.0, label: "1%" },
  { rate: 2.5, label: "2.5%" },
  { rate: 4.0, label: "4%" },
  { rate: 6.0, label: "6%" },
]

// ─── Animated Counter ─────────────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const startValueRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = performance.now()
    startValueRef.current = display

    const animate = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValueRef.current + (target - startValueRef.current) * eased
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return display
}

// ─── Formatters ───────────────────────────────────────────────────────────────

const fmt$ = (n: number, digits = 0) =>
  "$" + n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits })

const fmt$2 = (n: number) => fmt$(n, 2)

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RoiCalculatorPage() {
  const [activePreset, setActivePreset] = useState<PresetKey | null>(null)
  const [unitCost, setUnitCost] = useState(12)
  const [retailPrice, setRetailPrice] = useState(45)
  const [orderQty, setOrderQty] = useState(500)
  const [channel, setChannel] = useState<SalesChannel>("amazon")
  const [optLevel, setOptLevel] = useState<OptimizationLevel>("typical")

  // Apply preset
  function applyPreset(preset: Preset) {
    setActivePreset(preset.key)
    setUnitCost(preset.unitCost)
    setRetailPrice(preset.retailPrice)
    setOrderQty(preset.orderQty)
    setChannel(preset.channel)
  }

  // Clear preset highlight if user manually edits
  function handleManualChange<T>(setter: (v: T) => void, value: T) {
    setActivePreset(null)
    setter(value)
  }

  const optPct = OPT_LEVELS.find((o) => o.id === optLevel)!.pct / 100

  const calc = useMemo(() => {
    const totalOrderValue = unitCost * orderQty
    const grossRevenue = retailPrice * orderQty
    const grossProfit = (retailPrice - unitCost) * orderQty
    const grossMarginPct = retailPrice > 0 ? ((retailPrice - unitCost) / retailPrice) * 100 : 0

    const perUnitSaving = unitCost * optPct
    const totalSaving = perUnitSaving * orderQty
    const bottlecapCost = 99
    const netRoi = totalSaving - bottlecapCost
    const roiMultiple = bottlecapCost > 0 ? totalSaving / bottlecapCost : 0

    // Break-even: how many extra units to cover $99
    // Profit per unit = retailPrice - unitCost
    const profitPerUnit = retailPrice - unitCost
    const breakEvenUnits =
      profitPerUnit > 0 ? Math.ceil(bottlecapCost / profitPerUnit) : null

    return {
      totalOrderValue,
      grossRevenue,
      grossProfit,
      grossMarginPct,
      perUnitSaving,
      totalSaving,
      bottlecapCost,
      netRoi,
      roiMultiple,
      breakEvenUnits,
    }
  }, [unitCost, retailPrice, orderQty, optPct])

  const animatedRoi = useAnimatedCounter(calc.roiMultiple)
  const animatedNetRoi = useAnimatedCounter(calc.netRoi)
  const animatedTotalSaving = useAnimatedCounter(calc.totalSaving)

  // Sensitivity rows with computed values
  const sensitivityRows = useMemo(() => {
    return SENSITIVITY_ROWS.map(({ rate, label }) => {
      const pct = rate / 100
      const perUnit = unitCost * pct
      const total = perUnit * orderQty
      const roi = 99 > 0 ? total / 99 : 0
      return { rate, label, perUnit, total, roi }
    })
  }, [unitCost, orderQty])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B6B] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-[#1A1A1A] transition-colors">Tools</Link>
        <span>/</span>
        <span className="text-[#1A1A1A]">ROI Calculator</span>
      </nav>

      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
          Is Bottlecap Worth $99?
        </h1>
        <p className="text-[#6B6B6B] mb-10 max-w-2xl text-base">
          Run the numbers for your specific product. See exactly how much a Bottlecap analysis pays for itself — on your first order.
        </p>
      </motion.div>

      {/* ─── Scenario Presets ─────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest mb-4">
          Quick-fill a scenario
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRESETS.map((preset) => {
            const Icon = preset.icon
            const isActive = activePreset === preset.key
            return (
              <motion.button
                key={preset.key}
                onClick={() => applyPreset(preset)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className={`text-left rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                  isActive
                    ? "border-[#FF6B35] bg-[#FFF0EB]"
                    : "border-[#E8E8E4] bg-white hover:border-[#FF6B35]/40"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: isActive ? "#FF6B35" : preset.bgColor }}
                >
                  <span style={isActive ? {} : { color: preset.color }}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                  </span>
                </div>
                <p className="font-bold text-[#1A1A1A] text-sm">{preset.label}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{preset.sublabel}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="bg-[#F5F5F0] rounded-md px-2 py-0.5 text-[#6B6B6B]">{fmt$2(preset.unitCost)} cost</span>
                  <span className="bg-[#F5F5F0] rounded-md px-2 py-0.5 text-[#6B6B6B]">{fmt$2(preset.retailPrice)} retail</span>
                  <span className="bg-[#F5F5F0] rounded-md px-2 py-0.5 text-[#6B6B6B]">{preset.orderQty.toLocaleString()} units</span>
                </div>
                {isActive && (
                  <p className="text-xs font-semibold text-[#FF6B35] mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Applied
                  </p>
                )}
              </motion.button>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ─── Left: Inputs (2/5) ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Your Numbers</h2>

          {/* Unit cost */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
              Per-unit manufacturing cost
            </label>
            <p className="text-xs text-[#6B6B6B] mb-2">What you pay the factory per unit (ex-works)</p>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="number"
                value={unitCost}
                onChange={(e) => handleManualChange(setUnitCost, Number(e.target.value) || 0)}
                className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl pl-9 pr-4 py-3 outline-none text-sm focus:border-[#FF6B35] transition-colors"
                min={0}
                step={0.5}
              />
            </div>
          </div>

          {/* Retail price */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
              Retail / selling price
            </label>
            <p className="text-xs text-[#6B6B6B] mb-2">What customers pay (your listed price)</p>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="number"
                value={retailPrice}
                onChange={(e) => handleManualChange(setRetailPrice, Number(e.target.value) || 0)}
                className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl pl-9 pr-4 py-3 outline-none text-sm focus:border-[#FF6B35] transition-colors"
                min={0}
                step={0.5}
              />
            </div>
          </div>

          {/* Order quantity */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
              First order quantity
            </label>
            <p className="text-xs text-[#6B6B6B] mb-2">
              Units: <span className="font-semibold text-[#1A1A1A]">{orderQty.toLocaleString()}</span>
            </p>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={orderQty}
              onChange={(e) => handleManualChange(setOrderQty, Number(e.target.value))}
              className="w-full accent-[#FF6B35]"
            />
            <div className="flex justify-between text-xs text-[#767676] mt-1">
              <span>100</span>
              <span>5,000</span>
              <span>10,000</span>
            </div>
          </div>

          {/* Sales channel */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Sales channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CHANNELS.map((ch) => {
                const Icon = ch.icon
                const isActive = channel === ch.id
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleManualChange(setChannel, ch.id)}
                    className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]"
                        : "border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {ch.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Optimization savings level */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Expected optimization savings
            </label>
            <p className="text-xs text-[#6B6B6B] mb-3">
              Based on cost reduction typically uncovered in Bottlecap reports
            </p>
            <div className="space-y-2">
              {OPT_LEVELS.map((opt) => {
                const isActive = optLevel === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setOptLevel(opt.id)}
                    className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm transition-all ${
                      isActive
                        ? "border-[#FF6B35] bg-[#FFF0EB]"
                        : "border-[#E8E8E4] bg-white hover:border-[#FF6B35]/40"
                    }`}
                  >
                    <span className={`font-semibold ${isActive ? "text-[#FF6B35]" : "text-[#1A1A1A]"}`}>
                      {opt.label}
                    </span>
                    <span className={`text-xs ${isActive ? "text-[#FF6B35]" : "text-[#767676]"}`}>
                      {opt.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── Right: Results (3/5) ────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">
          <h2 className="text-lg font-bold text-[#1A1A1A]">ROI Results</h2>

          {/* Big ROI banner */}
          <motion.div
            key={calc.roiMultiple}
            initial={{ scale: 0.97, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="bg-[#1A1A1A] rounded-2xl p-8 text-center text-white"
          >
            <p className="text-sm font-semibold text-white/60 mb-1 uppercase tracking-widest">
              Net ROI on $99
            </p>
            <p className="text-6xl sm:text-7xl font-black text-[#22C55E] leading-none">
              {animatedRoi.toFixed(1)}x
            </p>
            <p className="text-white/60 text-sm mt-3">
              Every $1 spent returns{" "}
              <span className="text-white font-semibold">{fmt$2(calc.roiMultiple)}</span> in savings
            </p>
            {calc.breakEvenUnits !== null && (
              <div className="mt-4 inline-block bg-white/10 rounded-xl px-4 py-2 text-sm">
                Break-even: sell just{" "}
                <span className="font-bold text-white">{calc.breakEvenUnits} more units</span> to cover the $99
              </div>
            )}
          </motion.div>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total order value", value: fmt$(calc.totalOrderValue), sub: `${orderQty.toLocaleString()} units × ${fmt$2(unitCost)}`, color: "#6B6B6B" },
              { label: "Gross revenue", value: fmt$(calc.grossRevenue), sub: `at full sell-through`, color: "#6B6B6B" },
              { label: "Gross profit", value: fmt$(calc.grossProfit), sub: `${calc.grossMarginPct.toFixed(1)}% margin`, color: calc.grossProfit >= 0 ? "#22C55E" : "#EF4444" },
              { label: "Per-unit saving", value: fmt$2(calc.perUnitSaving), sub: `at ${OPT_LEVELS.find((o) => o.id === optLevel)!.pct}% optimization`, color: "#FF6B35" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#E8E8E4] rounded-2xl p-4">
                <p className="text-xs text-[#6B6B6B] mb-1">{item.label}</p>
                <p className="text-xl font-black" style={{ color: item.color === "#6B6B6B" ? "#1A1A1A" : item.color }}>
                  {item.value}
                </p>
                <p className="text-xs text-[#767676] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Total saving & net ROI */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F0FDF4] border border-[#22C55E]/30 rounded-2xl p-5 text-center">
              <p className="text-xs text-[#6B6B6B] mb-1">Total saving on first order</p>
              <p className="text-3xl font-black text-[#22C55E]">
                {fmt$(Math.round(animatedTotalSaving))}
              </p>
            </div>
            <div className="bg-[#FFF0EB] border border-[#FF6B35]/30 rounded-2xl p-5 text-center">
              <p className="text-xs text-[#6B6B6B] mb-1">Net gain after $99</p>
              <p className="text-3xl font-black text-[#FF6B35]">
                {fmt$(Math.round(animatedNetRoi))}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#767676] text-center">
            Savings are estimates based on industry averages. Actual results vary by product and supplier.
          </p>
        </div>
      </div>

      {/* ─── What the $99 Replaces ─────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">What $99 replaces</h2>
        <p className="text-[#6B6B6B] mb-8 max-w-2xl">
          Founders typically spend 10x-100x more to get the same information — or never get it at all.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: Users,
              title: "Sourcing Agent",
              range: "$3,000 – $10,000",
              color: "#EF4444",
              bgColor: "#FEF2F2",
              borderColor: "#EF4444",
              math: `At ${fmt$(calc.grossProfit > 0 ? Math.ceil(3000 / (retailPrice - unitCost)) : 0)} min. order value, you'd need to sell 30–100 units just to cover the agent fee.`,
              vs: "You vs. agent",
              saving: "$2,901–$9,901 saved",
            },
            {
              icon: Briefcase,
              title: "Trade Consultant",
              range: "$500 – $2,000/hr",
              color: "#F59E0B",
              bgColor: "#FFFBEB",
              borderColor: "#F59E0B",
              math: "2 hours of consulting buys you 20+ Bottlecap reports. A single call costs 5× our annual subscription.",
              vs: "You vs. consultant",
              saving: "$401–$1,901/hr saved",
            },
            {
              icon: Clock,
              title: "DIY Research",
              range: "40+ hours of your time",
              color: "#8B5CF6",
              bgColor: "#F5F3FF",
              borderColor: "#8B5CF6",
              math: "At $50/hr opportunity cost, that's $2,000 in time — for less thorough results. Bottlecap delivers in 2–5 minutes.",
              vs: "You vs. DIY",
              saving: "$1,901 in time recovered",
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl border-2 p-6"
                style={{ backgroundColor: item.bgColor, borderColor: item.borderColor + "40" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-[#1A1A1A] mb-1">{item.title}</p>
                <p className="text-lg font-black mb-3" style={{ color: item.color }}>{item.range}</p>
                <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">{item.math}</p>
                <div className="border-t border-black/5 pt-3">
                  <p className="text-xs text-[#6B6B6B] mb-0.5">{item.vs}</p>
                  <p className="text-sm font-bold text-[#22C55E]">{item.saving}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── Sensitivity Table ─────────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">Sensitivity analysis</h2>
        <p className="text-[#6B6B6B] mb-8 max-w-2xl">
          How your ROI changes at different optimization rates — based on your inputs above.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F5F0] border-b border-[#E8E8E4]">
                <th className="text-left px-5 py-4 font-semibold text-[#6B6B6B]">Saving rate</th>
                <th className="text-right px-5 py-4 font-semibold text-[#6B6B6B]">Per-unit saving</th>
                <th className="text-right px-5 py-4 font-semibold text-[#6B6B6B]">Total saving</th>
                <th className="text-right px-5 py-4 font-semibold text-[#6B6B6B]">ROI on $99</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityRows.map((row) => {
                const selectedPct = OPT_LEVELS.find((o) => o.id === optLevel)!.pct
                const isSelected = Math.abs(row.rate - selectedPct) < 0.01
                return (
                  <tr
                    key={row.rate}
                    className={`border-b border-[#E8E8E4] transition-colors ${
                      isSelected ? "bg-[#FFF0EB]" : "bg-white hover:bg-[#FAFAF8]"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`font-semibold ${isSelected ? "text-[#FF6B35]" : "text-[#1A1A1A]"}`}
                      >
                        {row.label}
                      </span>
                      {isSelected && (
                        <span className="ml-2 text-xs bg-[#FF6B35] text-white rounded-full px-2 py-0.5">
                          selected
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-[#1A1A1A]">
                      {fmt$2(row.perUnit)}/unit
                    </td>
                    <td className="px-5 py-4 text-right font-mono">
                      <span className={`font-semibold ${isSelected ? "text-[#FF6B35]" : "text-[#22C55E]"}`}>
                        {fmt$(row.total)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`font-black text-base ${
                          row.roi >= 10 ? "text-[#22C55E]" : row.roi >= 3 ? "text-[#F59E0B]" : "text-[#EF4444]"
                        } ${isSelected ? "text-[#FF6B35]" : ""}`}
                      >
                        {row.roi.toFixed(1)}x
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#767676] mt-3 text-center">
          Based on {orderQty.toLocaleString()} units at {fmt$2(unitCost)}/unit manufacturing cost.
        </p>
      </section>

      {/* ─── How it Works ─────────────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">Where the savings come from</h2>
        <p className="text-[#6B6B6B] mb-8 max-w-2xl">
          Bottlecap identifies optimization opportunities across four levers — any one of which typically exceeds the $99 cost.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Globe,
              color: "#3B82F6",
              title: "Country & region shifts",
              desc: "Moving manufacturing from one country to another often yields 15–40% unit cost reductions. We flag when the numbers support a move.",
            },
            {
              icon: BarChart3,
              color: "#22C55E",
              title: "Volume-based discounts",
              desc: "Most factories offer tiered pricing. We calculate your break-even MOQ for the next discount tier and model the uplift.",
            },
            {
              icon: Zap,
              color: "#F59E0B",
              title: "Multi-supplier negotiation",
              desc: "Getting quotes from 3–5 vetted suppliers creates competitive tension. On average, this yields 8–12% savings without changing factories.",
            },
            {
              icon: Package,
              color: "#8B5CF6",
              title: "Spec & material optimizations",
              desc: "Subtle spec changes — material grade, packaging, labeling — can cut cost without impacting quality or customer perception.",
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex gap-4 bg-white border border-[#E8E8E4] rounded-2xl p-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color + "18" }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] mb-1">{item.title}</p>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── Bottom CTA ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-16 bg-[#FF6B35] rounded-3xl p-10 text-center text-white"
      >
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          <Zap className="w-4 h-4" />
          2–5 minute delivery
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          Convinced? Run your analysis.
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">
          Based on your numbers, a Bottlecap report could return{" "}
          <span className="text-white font-bold">{fmt$(Math.round(calc.totalSaving))}</span> in savings on your first order — for a one-time $99 fee.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-white text-[#FF6B35] font-bold rounded-2xl px-8 py-4 text-base hover:bg-[#FFF0EB] transition-colors"
          >
            Get my analysis — $99
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/tools"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            Explore more free tools
          </Link>
        </div>
        <p className="text-white/50 text-xs mt-6">
          Money-back guarantee if you are not satisfied. No subscriptions required.
        </p>
      </motion.section>
    </div>
  )
}
