"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Package,
  ChevronDown,
  TrendingDown,
  DollarSign,
  Clock,
  MapPin,
  Lightbulb,
  BarChart2,
} from "lucide-react"

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const TIER_QTYS = [100, 250, 500, 1000, 2500, 5000]
const TIER_MULTIPLIERS = [1.0, 0.92, 0.82, 0.72, 0.65, 0.58]

const COUNTRY_BENCHMARKS = [
  { country: "China", min: 500, max: 1000, color: "#FF6B35" },
  { country: "Vietnam", min: 500, max: 2000, color: "#F59E0B" },
  { country: "India", min: 1000, max: 5000, color: "#3B82F6" },
  { country: "Mexico", min: 250, max: 1000, color: "#22C55E" },
  { country: "Turkey", min: 200, max: 500, color: "#8B5CF6" },
]

const NEGOTIATION_TIPS = [
  {
    title: "Start with the higher MOQ quote, then negotiate down",
    body: "Factories quote high expecting negotiation. Accept their first MOQ and you leave money on the table. Counter with 60% of their stated minimum and meet somewhere in between.",
  },
  {
    title: "Offer to pay 50% upfront for a lower MOQ",
    body: "Suppliers worry about cash flow risk on small orders. Offering 50% upfront (vs. the standard 30%) signals commitment and de-risks the run for them — making a lower MOQ far more palatable.",
  },
  {
    title: "Ask about &apos;trial order&apos; programs (usually 100–200 units)",
    body: "Most mid-size factories have an informal trial order tier they don&apos;t advertise. Ask explicitly: &ldquo;Do you offer a sample production run for new customers?&rdquo; Expect a small premium of 10–20% per unit.",
  },
  {
    title: "Small factories are more flexible on MOQ than Tier-1",
    body: "A factory with 50 workers is hungry for business. A factory with 500 workers has capacity locked by large brands. Target smaller suppliers when you need flexibility — you&apos;ll get better attention too.",
  },
  {
    title: "Combining product variants into one order often meets MOQ",
    body: "If you need two colorways at 250 units each, order them together as 500 units of the same SKU base. Many factories count total production run, not per-variant, toward their MOQ threshold.",
  },
]

function InputField({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  prefix,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  step?: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6B6B6B] mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-[#6B6B6B] pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={`w-full bg-white border-2 border-[#E8E8E4] rounded-xl py-2.5 outline-none text-sm focus:border-[#FF6B35] transition-colors ${prefix ? "pl-7 pr-4" : suffix ? "pl-4 pr-8" : "px-4"}`}
          min={min}
          step={step}
        />
        {suffix && (
          <span className="absolute right-3 text-sm text-[#6B6B6B] pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function AccordionTip({
  tip,
  index,
}: {
  tip: (typeof NEGOTIATION_TIPS)[0]
  index: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: EASE, duration: 0.35 }}
      className="border border-[#E8E8E4] rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
      >
        <span className="text-sm font-semibold text-[#1A1A1A] leading-snug">
          <span className="text-[#FF6B35] mr-2">{index + 1}.</span>
          <span dangerouslySetInnerHTML={{ __html: tip.title }} />
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-4 text-sm text-[#6B6B6B] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: tip.body }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MoqCalculatorPage() {
  const [unitCost, setUnitCost] = useState(8)
  const [retailPrice, setRetailPrice] = useState(29.99)
  const [shippingPerUnit, setShippingPerUnit] = useState(1.5)
  const [platformFeePct, setPlatformFeePct] = useState(15)
  const [monthlyOverhead, setMonthlyOverhead] = useState(500)
  const [weeklyUnitsSold, setWeeklyUnitsSold] = useState(50)
  const [selectedQty, setSelectedQty] = useState(500)

  const calc = useMemo(() => {
    // Volume tier table
    const tiers = TIER_QTYS.map((qty, i) => {
      const mult = TIER_MULTIPLIERS[i]
      const perUnitCost = unitCost * mult
      const totalOrderValue = perUnitCost * qty
      const suggestedRetail = perUnitCost * 3
      const platformFee = retailPrice * (platformFeePct / 100)
      const revenue = retailPrice - platformFee - shippingPerUnit
      const grossMarginPct =
        retailPrice > 0
          ? ((revenue - perUnitCost) / retailPrice) * 100
          : 0
      const profitPerUnit = revenue - perUnitCost
      const breakEvenUnits =
        profitPerUnit > 0 ? Math.ceil(totalOrderValue / profitPerUnit) : Infinity

      return {
        qty,
        mult,
        perUnitCost,
        totalOrderValue,
        suggestedRetail,
        grossMarginPct,
        profitPerUnit,
        breakEvenUnits,
      }
    })

    // Break-even calculator
    const selectedTierIndex = TIER_QTYS.indexOf(selectedQty)
    const selectedMult =
      selectedTierIndex >= 0 ? TIER_MULTIPLIERS[selectedTierIndex] : 1.0
    const selectedUnitCost = unitCost * selectedMult
    const platformFeeAmt = retailPrice * (platformFeePct / 100)
    const netRevenuePerUnit = retailPrice - platformFeeAmt - shippingPerUnit
    const profitPerUnit = netRevenuePerUnit - selectedUnitCost
    const totalInventoryCost = selectedUnitCost * selectedQty

    // Monthly units at weekly rate
    const monthlyUnitsSold = weeklyUnitsSold * 4.33

    // Break-even units per month (to cover overhead)
    const breakEvenUnitsPerMonth =
      profitPerUnit > 0
        ? Math.ceil(monthlyOverhead / profitPerUnit)
        : Infinity

    // Months to recoup inventory investment
    const monthlyProfit =
      profitPerUnit > 0 ? profitPerUnit * monthlyUnitsSold - monthlyOverhead : -monthlyOverhead
    const monthsToRecoup =
      monthlyProfit > 0 ? Math.ceil(totalInventoryCost / monthlyProfit) : Infinity

    // Weeks to sell through inventory
    const weeksToSellThrough =
      weeklyUnitsSold > 0 ? (selectedQty / weeklyUnitsSold).toFixed(1) : "∞"

    return {
      tiers,
      selectedUnitCost,
      totalInventoryCost,
      profitPerUnit,
      breakEvenUnitsPerMonth,
      monthsToRecoup,
      weeksToSellThrough,
      monthlyUnitsSold,
    }
  }, [unitCost, retailPrice, shippingPerUnit, platformFeePct, monthlyOverhead, weeklyUnitsSold, selectedQty])

  const maxBenchmark = 5000

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
          MOQ Planner
        </h1>
        <p className="text-[#6B6B6B] mb-10 max-w-2xl leading-relaxed">
          Model your minimum order quantity across six volume tiers, calculate
          your break-even, and see how cash gets tied up in inventory — before
          you commit to a supplier.
        </p>
      </motion.div>

      {/* ── SECTION 1: INPUTS ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#FF6B35]" /> Product &amp; Cost Inputs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Factory Unit Cost (at base quantity)"
            value={unitCost}
            onChange={setUnitCost}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Your Retail Price"
            value={retailPrice}
            onChange={setRetailPrice}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Shipping / Fulfillment per Unit"
            value={shippingPerUnit}
            onChange={setShippingPerUnit}
            step={0.25}
            prefix="$"
          />
          <InputField
            label="Platform / Referral Fee"
            value={platformFeePct}
            onChange={setPlatformFeePct}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Monthly Overhead"
            value={monthlyOverhead}
            onChange={setMonthlyOverhead}
            step={50}
            prefix="$"
          />
          <InputField
            label="Weekly Units Sold (projected)"
            value={weeklyUnitsSold}
            onChange={setWeeklyUnitsSold}
            step={5}
            suffix="units"
          />
        </div>
      </motion.section>

      {/* ── SECTION 2: VOLUME TIER TABLE ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[#FF6B35]" /> Volume Tier Comparison
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-5">
          Click a row to select that quantity for break-even calculations below.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#E8E8E4]">
                <th className="text-left py-3 pr-4 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Quantity
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Unit Cost
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Order Value
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Suggested Retail (3×)
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Gross Margin
                </th>
                <th className="text-right py-3 pl-2 text-xs font-semibold text-[#6B6B6B] whitespace-nowrap">
                  Break-even Units
                </th>
              </tr>
            </thead>
            <tbody>
              {calc.tiers.map((tier, i) => {
                const isSelected = tier.qty === selectedQty
                const marginColor =
                  tier.grossMarginPct >= 50
                    ? "#22C55E"
                    : tier.grossMarginPct >= 30
                    ? "#F59E0B"
                    : "#EF4444"
                return (
                  <motion.tr
                    key={tier.qty}
                    onClick={() => setSelectedQty(tier.qty)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, ease: EASE, duration: 0.3 }}
                    className={`border-b border-[#E8E8E4] cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#FFF0EB]"
                        : "hover:bg-[#FAFAF8]"
                    }`}
                  >
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1A1A1A]">
                          {tier.qty.toLocaleString()}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-semibold bg-[#FF6B35] text-white rounded-full px-2 py-0.5">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#9B9B9B] mt-0.5">
                        {Math.round((1 - tier.mult) * 100)}% cost reduction
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-right font-semibold text-[#1A1A1A]">
                      ${tier.perUnitCost.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-2 text-right text-[#1A1A1A]">
                      ${tier.totalOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3.5 px-2 text-right text-[#6B6B6B]">
                      ${tier.suggestedRetail.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <span
                        className="font-bold"
                        style={{ color: marginColor }}
                      >
                        {tier.grossMarginPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3.5 pl-2 text-right text-[#6B6B6B]">
                      {tier.breakEvenUnits === Infinity
                        ? <span className="text-[#EF4444]">N/A</span>
                        : tier.breakEvenUnits.toLocaleString()}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-[#9B9B9B] mt-3">
          Cost multipliers: 100% → 92% → 82% → 72% → 65% → 58% of base cost. Gross margin uses your retail price minus platform fee and shipping.
        </p>
      </motion.section>

      {/* ── SECTION 3: BREAK-EVEN + CASH FLOW ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease: EASE }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {/* Break-even */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
          <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#FF6B35]" /> Break-even Analysis
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-[#6B6B6B] mb-0.5">Selected Quantity</p>
                <p className="text-xl font-black text-[#1A1A1A]">
                  {selectedQty.toLocaleString()} units
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B6B6B] mb-0.5">Unit Cost at Tier</p>
                <p className="text-xl font-black text-[#FF6B35]">
                  ${calc.selectedUnitCost.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="h-px bg-[#E8E8E4]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">
                  Profit / Unit
                </p>
                <p
                  className="text-2xl font-black"
                  style={{ color: calc.profitPerUnit >= 0 ? "#22C55E" : "#EF4444" }}
                >
                  ${calc.profitPerUnit.toFixed(2)}
                </p>
                <p className="text-[10px] text-[#9B9B9B] mt-1">after fees &amp; shipping</p>
              </div>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">
                  Break-even / Month
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {calc.breakEvenUnitsPerMonth === Infinity
                    ? "N/A"
                    : `${calc.breakEvenUnitsPerMonth.toLocaleString()} units`}
                </p>
                <p className="text-[10px] text-[#9B9B9B] mt-1">to cover ${monthlyOverhead}/mo overhead</p>
              </div>
            </div>

            <div className="bg-[#FAFAF8] rounded-xl p-4">
              <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
                Weekly Sales vs. Break-even
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B6B6B]">Your projected</span>
                <span className="font-bold text-[#1A1A1A]">{weeklyUnitsSold} units/week</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-[#6B6B6B]">Needed to cover overhead</span>
                <span className="font-bold text-[#1A1A1A]">
                  {calc.breakEvenUnitsPerMonth === Infinity
                    ? "N/A"
                    : `${Math.ceil(calc.breakEvenUnitsPerMonth / 4.33)} units/week`}
                </span>
              </div>
              {calc.breakEvenUnitsPerMonth !== Infinity && (
                <div className="mt-3">
                  <div className="w-full bg-[#E8E8E4] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (weeklyUnitsSold / Math.max(1, calc.breakEvenUnitsPerMonth / 4.33)) * 100)}%`,
                        backgroundColor:
                          weeklyUnitsSold >= calc.breakEvenUnitsPerMonth / 4.33
                            ? "#22C55E"
                            : "#FF6B35",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cash flow projection */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
          <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF6B35]" /> Cash Flow Projection
          </h2>
          <div className="space-y-4">
            <div className="bg-[#FFF0EB] border border-[#FF6B35]/30 rounded-xl p-4">
              <p className="text-xs text-[#6B6B6B] mb-1">Capital Tied Up in Inventory</p>
              <p className="text-3xl font-black text-[#FF6B35]">
                ${calc.totalInventoryCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-[#6B6B6B] mt-1">
                {selectedQty.toLocaleString()} units × ${calc.selectedUnitCost.toFixed(2)} each
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">
                  Weeks to Sell Through
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {calc.weeksToSellThrough}
                </p>
                <p className="text-[10px] text-[#9B9B9B] mt-1">at {weeklyUnitsSold} units/week</p>
              </div>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">
                  Months to Recoup
                </p>
                <p
                  className="text-2xl font-black"
                  style={{
                    color:
                      calc.monthsToRecoup === Infinity
                        ? "#EF4444"
                        : calc.monthsToRecoup <= 3
                        ? "#22C55E"
                        : calc.monthsToRecoup <= 6
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                >
                  {calc.monthsToRecoup === Infinity ? "Never" : `${calc.monthsToRecoup} mo`}
                </p>
                <p className="text-[10px] text-[#9B9B9B] mt-1">full investment recovery</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Monthly units (projected)</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {Math.round(calc.monthlyUnitsSold).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Monthly revenue</span>
                <span className="font-semibold text-[#1A1A1A]">
                  ${(retailPrice * calc.monthlyUnitsSold).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Monthly gross profit</span>
                <span
                  className="font-semibold"
                  style={{
                    color: calc.profitPerUnit * calc.monthlyUnitsSold >= 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ${(calc.profitPerUnit * calc.monthlyUnitsSold).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E8E8E4] pt-2">
                <span className="text-[#6B6B6B]">Monthly net (after overhead)</span>
                <span
                  className="font-bold"
                  style={{
                    color:
                      calc.profitPerUnit * calc.monthlyUnitsSold - monthlyOverhead >= 0
                        ? "#22C55E"
                        : "#EF4444",
                  }}
                >
                  ${(calc.profitPerUnit * calc.monthlyUnitsSold - monthlyOverhead).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 4: COUNTRY MOQ BENCHMARKS ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
        className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF6B35]" /> Country MOQ Benchmarks
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-6">
          Typical minimum order quantities by manufacturing region. Bars show
          the min–max range.
        </p>
        <div className="space-y-4">
          {COUNTRY_BENCHMARKS.map((c, i) => {
            const leftPct = (c.min / maxBenchmark) * 100
            const widthPct = ((c.max - c.min) / maxBenchmark) * 100
            return (
              <motion.div
                key={c.country}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 + i * 0.07, ease: EASE, duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1A1A1A] w-20">
                    {c.country}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">
                    {c.min.toLocaleString()}–{c.max.toLocaleString()} units
                  </span>
                </div>
                <div className="w-full bg-[#F0F0EC] rounded-full h-5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASE }}
                    className="absolute h-full rounded-full"
                    style={{ left: `${leftPct}%`, backgroundColor: c.color }}
                  />
                  {/* Selected qty marker */}
                  {selectedQty <= maxBenchmark && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#1A1A1A]/40"
                      style={{ left: `${(selectedQty / maxBenchmark) * 100}%` }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {selectedQty >= c.min && selectedQty <= c.max ? (
                    <span className="text-[10px] text-[#22C55E] font-semibold">
                      Your {selectedQty.toLocaleString()} units meets this country&apos;s typical MOQ
                    </span>
                  ) : selectedQty < c.min ? (
                    <span className="text-[10px] text-[#EF4444]">
                      Below typical MOQ for {c.country} — expect premium pricing
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#22C55E] font-semibold">
                      Above typical MOQ — strong negotiating position
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-[#9B9B9B]">
          <div className="w-0.5 h-4 bg-[#1A1A1A]/40" />
          <span>Vertical line = your selected quantity ({selectedQty.toLocaleString()} units)</span>
        </div>
      </motion.section>

      {/* ── SECTION 5: NEGOTIATION TIPS ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
        className="mb-10"
      >
        <h2 className="text-base font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#FF6B35]" /> MOQ Negotiation Playbook
        </h2>
        <p className="text-xs text-[#6B6B6B] mb-5">
          Expand each tip to see the tactic in full detail.
        </p>
        <div className="space-y-2">
          {NEGOTIATION_TIPS.map((tip, i) => (
            <AccordionTip key={i} tip={tip} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
        className="p-6 bg-[#FFF0EB] rounded-xl text-center border border-[#FF6B35]/20"
      >
        <DollarSign className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
          Want supplier-specific MOQ data for your product?
        </p>
        <p className="text-xs text-[#6B6B6B] mb-3">
          A Bottlecap analysis includes real MOQs from verified suppliers in the
          best manufacturing countries for your category.
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
