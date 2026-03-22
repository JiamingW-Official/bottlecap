"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Store,
  Package,
  Layers,
  ChevronDown,
} from "lucide-react"

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const VOLUME_MULTIPLIERS: Record<number, number> = {
  100: 1.0,
  500: 0.92,
  1000: 0.82,
  5000: 0.72,
}
const VOLUME_TIERS = [100, 500, 1000, 5000]

const CATEGORY_BENCHMARKS = [
  { name: "Beauty & Skincare", min: 65, max: 80, color: "#EC4899" },
  { name: "Apparel & Fashion", min: 55, max: 70, color: "#8B5CF6" },
  { name: "Accessories", min: 60, max: 75, color: "#F59E0B" },
  { name: "Home Goods", min: 50, max: 65, color: "#14B8A6" },
  { name: "Electronics", min: 35, max: 50, color: "#3B82F6" },
]

const SHIPPING_OPTIONS = [
  { key: "sea", label: "Sea Freight", cost: 1.2, note: "3–5 weeks" },
  { key: "air", label: "Air Freight", cost: 4.5, note: "5–10 days" },
  { key: "express", label: "Express / DHL", cost: 8.0, note: "2–4 days" },
] as const
type ShippingKey = "sea" | "air" | "express"

const MARGIN_THRESHOLDS = [
  { pct: 30, label: "Survival", color: "#EF4444", bg: "#FEF2F2" },
  { pct: 50, label: "Healthy", color: "#F59E0B", bg: "#FFFBEB" },
  { pct: 65, label: "Strong", color: "#22C55E", bg: "#F0FDF4" },
  { pct: 70, label: "Premium", color: "#6366F1", bg: "#EEF2FF" },
]

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-[#1A1A1A]">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-xs text-[#6B6B6B]">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
            }}
            className="w-20 text-right bg-white border border-[#E8E8E4] rounded-lg px-2 py-1 text-sm outline-none focus:border-[#FF6B35] transition-colors"
            min={min}
            max={max}
            step={step}
          />
          {suffix && <span className="text-xs text-[#6B6B6B]">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#FF6B35]"
      />
    </div>
  )
}

function ChannelCard({
  icon,
  label,
  margin,
  netProfit,
  details,
  color,
  delay,
}: {
  icon: React.ReactNode
  label: string
  margin: number
  netProfit: number
  details: string
  color: string
  delay: number
}) {
  const marginColor =
    margin >= 50 ? "#22C55E" : margin >= 30 ? "#F59E0B" : "#EF4444"
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: EASE, duration: 0.35 }}
      className="bg-white rounded-xl border-2 p-5 flex flex-col gap-3"
      style={{ borderColor: color + "40" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + "20" }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <span className="text-sm font-bold text-[#1A1A1A]">{label}</span>
      </div>
      <div>
        <p className="text-3xl font-black" style={{ color: marginColor }}>
          {margin.toFixed(1)}%
        </p>
        <p className="text-xs text-[#6B6B6B] mt-0.5">Net margin</p>
      </div>
      <div className="h-px bg-[#E8E8E4]" />
      <div className="flex justify-between text-sm">
        <span className="text-[#6B6B6B]">Profit/unit</span>
        <span
          className="font-semibold"
          style={{ color: netProfit >= 0 ? "#22C55E" : "#EF4444" }}
        >
          ${netProfit.toFixed(2)}
        </span>
      </div>
      <p className="text-[10px] text-[#9B9B9B] leading-relaxed">{details}</p>
    </motion.div>
  )
}

export default function MarginCalculatorPage() {
  // Landed cost builder inputs
  const [factoryPrice, setFactoryPrice] = useState(8)
  const [shippingKey, setShippingKey] = useState<ShippingKey>("sea")
  const [dutyPct, setDutyPct] = useState(5)
  const [fbaFee, setFbaFee] = useState(3.22)
  const [platformFeePct, setPlatformFeePct] = useState(15)
  const [returnsPct, setReturnsPct] = useState(8)
  const [retailPrice, setRetailPrice] = useState(29.99)

  // DTC-specific inputs
  const [cac, setCac] = useState(15)

  // Accordion state for landed cost breakdown
  const [costOpen, setCostOpen] = useState(true)

  const shippingCost = SHIPPING_OPTIONS.find((o) => o.key === shippingKey)?.cost ?? 1.2

  const calc = useMemo(() => {
    // Landed cost breakdown
    const dutyAmount = factoryPrice * (dutyPct / 100)
    const landedCost = factoryPrice + shippingCost + dutyAmount

    // Returns cost per unit (expected loss)
    const returnsLoss = retailPrice * (returnsPct / 100) * 0.5 // assume 50% of returned units unresellable

    // ── Amazon FBA ──
    const amazonReferral = retailPrice * 0.15
    const amazonFBATotal = amazonReferral + fbaFee + returnsLoss
    const amazonProfit = retailPrice - landedCost - amazonFBATotal
    const amazonMargin = (amazonProfit / retailPrice) * 100

    // ── Shopify DTC ──
    const stripeFee = retailPrice * 0.029 + 0.3
    const dtcTotal = stripeFee + cac + returnsLoss
    const dtcProfit = retailPrice - landedCost - dtcTotal
    const dtcMargin = (dtcProfit / retailPrice) * 100

    // ── Wholesale (50% of retail to retailer) ──
    const wholesalePrice = retailPrice * 0.5
    const wholesaleProfit = wholesalePrice - landedCost - returnsLoss * 0.3
    const wholesaleMargin = (wholesaleProfit / wholesalePrice) * 100

    // ── Retail (60% of retail to retailer) ──
    const retailerPrice = retailPrice * 0.4 // you receive 40%
    const retailerProfit = retailerPrice - landedCost - returnsLoss * 0.2
    const retailerMargin = (retailerProfit / retailerPrice) * 100

    // Stacked cost bar for landed cost builder
    const platformFeeAmt = retailPrice * (platformFeePct / 100)
    const grossProfit = retailPrice - landedCost - platformFeeAmt - returnsLoss
    const grossMarginPct = (grossProfit / retailPrice) * 100

    const segments = [
      { label: "Factory Cost", value: factoryPrice, color: "#3B82F6" },
      { label: "Shipping", value: shippingCost, color: "#14B8A6" },
      { label: "Import Duty", value: dutyAmount, color: "#F59E0B" },
      { label: "Platform Fee", value: platformFeeAmt, color: "#8B5CF6" },
      { label: "Returns Loss", value: returnsLoss, color: "#EF4444" },
      { label: "Gross Profit", value: Math.max(0, grossProfit), color: "#22C55E" },
    ]
    const barTotal = segments.reduce((s, x) => s + x.value, 0)

    // Minimum viable price thresholds
    const mvpPrices = MARGIN_THRESHOLDS.map((t) => {
      // margin = (price - landedCost - price * feePct/100) / price
      // price * (1 - feePct/100) - landedCost = price * margin/100
      // price * (1 - feePct/100 - margin/100) = landedCost
      const feeFraction = platformFeePct / 100
      const denominator = 1 - feeFraction - t.pct / 100
      const price = denominator > 0 ? landedCost / denominator : Infinity
      return { ...t, price }
    })

    // Volume sensitivity
    const volumeSensitivity = VOLUME_TIERS.map((qty) => {
      const mult = VOLUME_MULTIPLIERS[qty] ?? 1.0
      const adjFactory = factoryPrice * mult
      const adjDuty = adjFactory * (dutyPct / 100)
      const adjLanded = adjFactory + shippingCost + adjDuty
      const adjFee = retailPrice * (platformFeePct / 100)
      const adjProfit = retailPrice - adjLanded - adjFee - returnsLoss
      const adjMargin = (adjProfit / retailPrice) * 100
      return { qty, mult, adjLanded, adjProfit, adjMargin }
    })

    return {
      landedCost,
      dutyAmount,
      returnsLoss,
      amazonProfit,
      amazonMargin,
      dtcProfit,
      dtcMargin,
      wholesaleProfit,
      wholesaleMargin,
      retailerProfit,
      retailerMargin,
      grossProfit,
      grossMarginPct,
      platformFeeAmt,
      segments,
      barTotal,
      mvpPrices,
      volumeSensitivity,
    }
  }, [factoryPrice, shippingCost, dutyPct, fbaFee, platformFeePct, returnsPct, retailPrice, cac])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
          Margin Calculator
        </h1>
        <p className="text-[#6B6B6B] mb-10 max-w-2xl leading-relaxed">
          Build your full landed cost, compare margins across every sales
          channel, and find the minimum retail price to hit your profitability
          target.
        </p>
      </motion.div>

      {/* ── SECTION 1: LANDED COST BUILDER ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <button
          onClick={() => setCostOpen((v) => !v)}
          className="w-full flex items-center justify-between"
        >
          <h2 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF6B35]" /> Full Landed Cost Builder
          </h2>
          <motion.div
            animate={{ rotate: costOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {costOpen && (
            <motion.div
              key="cost-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Inputs */}
                <div className="space-y-5">
                  <SliderInput
                    label="Factory Price (per unit)"
                    value={factoryPrice}
                    onChange={setFactoryPrice}
                    min={0.5}
                    max={200}
                    step={0.5}
                    prefix="$"
                  />

                  {/* Shipping method */}
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                      Shipping Method
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {SHIPPING_OPTIONS.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => setShippingKey(opt.key)}
                          className={`rounded-xl border-2 p-3 text-left transition-colors ${
                            shippingKey === opt.key
                              ? "border-[#FF6B35] bg-[#FFF0EB]"
                              : "border-[#E8E8E4] hover:border-[#FF6B35]/40"
                          }`}
                        >
                          <p className="text-xs font-bold text-[#1A1A1A]">
                            {opt.label}
                          </p>
                          <p className="text-[10px] text-[#6B6B6B] mt-0.5">
                            ${opt.cost}/unit · {opt.note}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <SliderInput
                    label="Import Duty Rate"
                    value={dutyPct}
                    onChange={setDutyPct}
                    min={0}
                    max={50}
                    step={0.5}
                    suffix="%"
                  />
                  <SliderInput
                    label="Amazon FBA Fee / Fulfillment Cost"
                    value={fbaFee}
                    onChange={setFbaFee}
                    min={0}
                    max={30}
                    step={0.01}
                    prefix="$"
                  />
                  <SliderInput
                    label="Platform / Referral Fee"
                    value={platformFeePct}
                    onChange={setPlatformFeePct}
                    min={0}
                    max={30}
                    step={0.5}
                    suffix="%"
                  />
                  <SliderInput
                    label="Returns Rate"
                    value={returnsPct}
                    onChange={setReturnsPct}
                    min={0}
                    max={40}
                    step={0.5}
                    suffix="%"
                  />
                  <div className="h-px bg-[#E8E8E4]" />
                  <SliderInput
                    label="Retail / Selling Price"
                    value={retailPrice}
                    onChange={setRetailPrice}
                    min={1}
                    max={500}
                    step={0.99}
                    prefix="$"
                  />
                </div>

                {/* Right: Running total */}
                <div className="space-y-4">
                  <div className="bg-[#FAFAF8] rounded-xl p-5">
                    <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-3">
                      Cost Breakdown per Unit
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { label: "Factory Price", value: factoryPrice, color: "#3B82F6" },
                        { label: `Shipping (${SHIPPING_OPTIONS.find(o => o.key === shippingKey)?.label})`, value: shippingCost, color: "#14B8A6" },
                        { label: `Import Duty (${dutyPct}%)`, value: calc.dutyAmount, color: "#F59E0B" },
                        { label: "Landed Cost", value: calc.landedCost, color: "#1A1A1A", bold: true, divider: true },
                        { label: `Platform Fee (${platformFeePct}%)`, value: calc.platformFeeAmt, color: "#8B5CF6" },
                        { label: `Returns Loss (${returnsPct}% rate)`, value: calc.returnsLoss, color: "#EF4444" },
                      ].map((row) => (
                        <div key={row.label}>
                          {row.divider && <div className="h-px bg-[#E8E8E4] my-2" />}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: row.color }}
                              />
                              <span
                                className={`text-sm ${row.bold ? "font-bold text-[#1A1A1A]" : "text-[#6B6B6B]"}`}
                              >
                                {row.label}
                              </span>
                            </div>
                            <span
                              className={`text-sm ${row.bold ? "font-bold text-[#1A1A1A]" : "text-[#6B6B6B]"}`}
                            >
                              ${row.value.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="h-px bg-[#E8E8E4]" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1A1A1A]">Gross Profit</span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: calc.grossProfit >= 0 ? "#22C55E" : "#EF4444" }}
                        >
                          ${calc.grossProfit.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stacked bar */}
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-2">Revenue allocation</p>
                    <div className="w-full h-6 rounded-lg overflow-hidden flex">
                      {calc.segments.map((seg) => {
                        const pct =
                          calc.barTotal > 0 ? (seg.value / calc.barTotal) * 100 : 0
                        if (pct < 0.5) return null
                        return (
                          <div
                            key={seg.label}
                            className="h-full relative group"
                            style={{ width: `${pct}%`, backgroundColor: seg.color }}
                            title={`${seg.label}: $${seg.value.toFixed(2)} (${pct.toFixed(1)}%)`}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {seg.label}: ${seg.value.toFixed(2)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                      {calc.segments.map((seg) => (
                        <div key={seg.label} className="flex items-center gap-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: seg.color }}
                          />
                          <span className="text-[10px] text-[#6B6B6B]">
                            {seg.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gross margin highlight */}
                  <div
                    className="rounded-xl p-4 text-center"
                    style={{
                      backgroundColor:
                        calc.grossMarginPct >= 50
                          ? "#F0FDF4"
                          : calc.grossMarginPct >= 30
                          ? "#FFFBEB"
                          : "#FEF2F2",
                    }}
                  >
                    <p className="text-xs text-[#6B6B6B] mb-1">Overall Gross Margin</p>
                    <p
                      className="text-4xl font-black"
                      style={{
                        color:
                          calc.grossMarginPct >= 50
                            ? "#22C55E"
                            : calc.grossMarginPct >= 30
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    >
                      {calc.grossMarginPct.toFixed(1)}%
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {calc.grossMarginPct >= 65
                        ? "Strong — well positioned"
                        : calc.grossMarginPct >= 50
                        ? "Healthy — solid unit economics"
                        : calc.grossMarginPct >= 30
                        ? "Tight — watch for cost creep"
                        : "Unprofitable — restructure costs"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ── SECTION 2: MULTI-CHANNEL COMPARISON ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
        className="mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#FF6B35]" /> Multi-Channel Margin Comparison
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-4">
          Same product, same landed cost — different channels create very
          different margins.
        </p>

        {/* DTC CAC input */}
        <div className="mb-5 flex items-center gap-4 bg-[#FAFAF8] rounded-xl p-4 border border-[#E8E8E4]">
          <div className="shrink-0">
            <p className="text-xs font-semibold text-[#1A1A1A]">Shopify DTC Customer Acquisition Cost (CAC)</p>
            <p className="text-[10px] text-[#6B6B6B]">Used for DTC channel calculation only</p>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-sm text-[#6B6B6B]">$</span>
            <input
              type="number"
              value={cac}
              onChange={(e) => setCac(Number(e.target.value) || 0)}
              className="w-20 text-right bg-white border border-[#E8E8E4] rounded-lg px-2 py-1 text-sm outline-none focus:border-[#FF6B35]"
              min={0}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ChannelCard
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Amazon FBA"
            margin={calc.amazonMargin}
            netProfit={calc.amazonProfit}
            details={`15% referral + $${fbaFee.toFixed(2)} FBA fee. High volume potential but fees erode margin fast.`}
            color="#FF9900"
            delay={0.12}
          />
          <ChannelCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Shopify DTC"
            margin={calc.dtcMargin}
            netProfit={calc.dtcProfit}
            details={`2.9% + $0.30 Stripe processing + $${cac} CAC. Best long-term margin if you can drive traffic.`}
            color="#96BF48"
            delay={0.16}
          />
          <ChannelCard
            icon={<Package className="w-4 h-4" />}
            label="Wholesale"
            margin={calc.wholesaleMargin}
            netProfit={calc.wholesaleProfit}
            details="You sell at 50% of retail to the retailer. Lower margin but no marketing cost, predictable volume."
            color="#3B82F6"
            delay={0.2}
          />
          <ChannelCard
            icon={<Store className="w-4 h-4" />}
            label="Retail"
            margin={calc.retailerMargin}
            netProfit={calc.retailerProfit}
            details="Brick-and-mortar typically keeps 60–70% of retail. You receive ~40%. Best for brand awareness."
            color="#8B5CF6"
            delay={0.24}
          />
        </div>
      </motion.section>

      {/* ── SECTION 3: MINIMUM VIABLE PRICE ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#FF6B35]" /> Minimum Viable Price Calculator
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-6">
          Based on your landed cost of{" "}
          <strong>${calc.landedCost.toFixed(2)}</strong>, here&apos;s the minimum
          retail price needed to hit each margin tier.
        </p>
        <div className="space-y-4">
          {calc.mvpPrices.map((t, i) => {
            const isMet = retailPrice >= t.price && t.price !== Infinity
            const isExceeded = isMet && retailPrice > t.price * 1.15
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.07, ease: EASE, duration: 0.35 }}
                className="rounded-xl border-2 p-4 transition-colors"
                style={{
                  borderColor: isMet ? t.color + "60" : "#E8E8E4",
                  backgroundColor: isMet ? t.bg : "#FAFAF8",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: t.color }}
                    />
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: t.color }}
                      >
                        {t.pct}% — {t.label}
                      </p>
                      <p className="text-[10px] text-[#9B9B9B] mt-0.5">
                        {t.label === "Survival" && "Minimum to stay viable"}
                        {t.label === "Healthy" && "Good unit economics"}
                        {t.label === "Strong" && "Ready for paid acquisition"}
                        {t.label === "Premium" && "Category-leading margin"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {t.price === Infinity
                        ? "N/A"
                        : `$${t.price.toFixed(2)}`}
                    </p>
                    {isMet && (
                      <p
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: t.color }}
                      >
                        {isExceeded ? "Exceeded" : "Met"} at your ${retailPrice.toFixed(2)}
                      </p>
                    )}
                    {!isMet && t.price !== Infinity && (
                      <p className="text-[10px] text-[#EF4444] mt-0.5">
                        Need +${(t.price - retailPrice).toFixed(2)} more
                      </p>
                    )}
                  </div>
                </div>
                {/* Progress bar */}
                {t.price !== Infinity && (
                  <div className="mt-3 w-full bg-[#E8E8E4] rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (retailPrice / t.price) * 100)}%`,
                        backgroundColor: t.color,
                      }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ── SECTION 4: VOLUME SENSITIVITY TABLE ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FF6B35]" /> Volume Sensitivity
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-5">
          Margin improves as factory cost drops with larger order quantities.
          Cost multipliers: 100% → 92% → 82% → 72%.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-3 text-xs font-semibold text-[#6B6B6B]">
                  Order Qty
                </th>
                <th className="text-right py-3 text-xs font-semibold text-[#6B6B6B]">
                  Cost Reduction
                </th>
                <th className="text-right py-3 text-xs font-semibold text-[#6B6B6B]">
                  Landed Cost
                </th>
                <th className="text-right py-3 text-xs font-semibold text-[#6B6B6B]">
                  Profit/Unit
                </th>
                <th className="text-right py-3 text-xs font-semibold text-[#6B6B6B]">
                  Gross Margin
                </th>
                <th className="text-right py-3 text-xs font-semibold text-[#6B6B6B]">
                  Margin Bar
                </th>
              </tr>
            </thead>
            <tbody>
              {calc.volumeSensitivity.map((row, i) => {
                const marginColor =
                  row.adjMargin >= 50
                    ? "#22C55E"
                    : row.adjMargin >= 30
                    ? "#F59E0B"
                    : "#EF4444"
                return (
                  <motion.tr
                    key={row.qty}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.06, ease: EASE, duration: 0.3 }}
                    className="border-b border-[#E8E8E4] hover:bg-[#FAFAF8] transition-colors"
                  >
                    <td className="py-3.5 font-bold text-[#1A1A1A]">
                      {row.qty.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right text-[#22C55E] font-semibold">
                      -{Math.round((1 - row.mult) * 100)}%
                    </td>
                    <td className="py-3.5 text-right text-[#6B6B6B]">
                      ${row.adjLanded.toFixed(2)}
                    </td>
                    <td
                      className="py-3.5 text-right font-semibold"
                      style={{ color: row.adjProfit >= 0 ? "#22C55E" : "#EF4444" }}
                    >
                      ${row.adjProfit.toFixed(2)}
                    </td>
                    <td
                      className="py-3.5 text-right font-bold"
                      style={{ color: marginColor }}
                    >
                      {row.adjMargin.toFixed(1)}%
                    </td>
                    <td className="py-3.5 text-right pl-4">
                      <div className="flex justify-end">
                        <div className="w-24 bg-[#E8E8E4] rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.max(0, Math.min(100, row.adjMargin))}%`,
                              backgroundColor: marginColor,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* ── SECTION 5: CATEGORY BENCHMARKS SIDEBAR ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-10"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#FF6B35]" /> Typical Margins by Category
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-6">
          Industry benchmarks for gross margin (after COGS and direct costs,
          before overhead). Your margin is marked with a line.
        </p>
        <div className="space-y-5">
          {CATEGORY_BENCHMARKS.map((cat, i) => {
            const leftPct = cat.min
            const widthPct = cat.max - cat.min
            const yourMarginPct = Math.max(0, Math.min(100, calc.grossMarginPct))
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.27 + i * 0.07, ease: EASE, duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1A1A1A]">
                    {cat.name}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">
                    {cat.min}%–{cat.max}%
                  </span>
                </div>
                <div className="w-full bg-[#F0F0EC] rounded-full h-5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ delay: 0.32 + i * 0.07, duration: 0.5, ease: EASE }}
                    className="absolute h-full rounded-full opacity-80"
                    style={{ left: `${leftPct}%`, backgroundColor: cat.color }}
                  />
                  {/* Your margin marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#1A1A1A]"
                    style={{ left: `${yourMarginPct}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {yourMarginPct >= cat.min && yourMarginPct <= cat.max ? (
                    <span className="text-[10px] text-[#22C55E] font-semibold">
                      Your {yourMarginPct.toFixed(1)}% is within this category&apos;s typical range
                    </span>
                  ) : yourMarginPct < cat.min ? (
                    <span className="text-[10px] text-[#EF4444]">
                      Below typical for {cat.name} — consider price optimization
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#22C55E] font-semibold">
                      Above typical range — strong competitive position
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-[#9B9B9B]">
          <div className="w-0.5 h-4 bg-[#1A1A1A]" />
          <span>Vertical line = your current gross margin ({calc.grossMarginPct.toFixed(1)}%)</span>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
        className="p-6 bg-[#FFF0EB] rounded-xl text-center border border-[#FF6B35]/20"
      >
        <TrendingUp className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
          Want to optimize your margins with real supplier data?
        </p>
        <p className="text-xs text-[#6B6B6B] mb-3">
          A Bottlecap analysis includes verified landed costs, duty rates, and
          factory pricing from three manufacturing countries — so your margin
          calc is grounded in reality.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#e5612e] transition-colors"
        >
          Get a Full Analysis →
        </Link>
      </motion.div>
    </div>
  )
}
