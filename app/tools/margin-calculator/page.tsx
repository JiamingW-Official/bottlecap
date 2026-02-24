"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, DollarSign, BarChart3 } from "lucide-react"

const FIXED_COSTS_ANNUAL = 5000

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
          {prefix && (
            <span className="text-xs text-[#6B6B6B]">{prefix}</span>
          )}
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
            }}
            className="w-20 text-right bg-white border border-[#E8E8E4] rounded-lg px-2 py-1 text-sm outline-none focus:border-[#FF6B35]"
            min={min}
            max={max}
            step={step}
          />
          {suffix && (
            <span className="text-xs text-[#6B6B6B]">{suffix}</span>
          )}
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

export default function MarginCalculatorPage() {
  const [cogs, setCogs] = useState(8)
  const [shipping, setShipping] = useState(2)
  const [dutyPct, setDutyPct] = useState(7.5)
  const [marketplacePct, setMarketplacePct] = useState(15)
  const [processingPct, setProcessingPct] = useState(3)
  const [marketingCac, setMarketingCac] = useState(8)
  const [returnsPct, setReturnsPct] = useState(5)
  const [retailPrice, setRetailPrice] = useState(29.99)

  const calc = useMemo(() => {
    const landedCost = cogs + shipping + cogs * (dutyPct / 100)
    const marketplaceFees = retailPrice * (marketplacePct / 100)
    const processingFees = retailPrice * (processingPct / 100)
    const returnsCost = retailPrice * (returnsPct / 100)
    const totalCost =
      landedCost + marketplaceFees + processingFees + returnsCost + marketingCac
    const grossProfit = retailPrice - totalCost
    const grossMargin = retailPrice > 0 ? (grossProfit / retailPrice) * 100 : 0

    // Break-even units at $5K fixed costs
    const breakEvenUnits =
      grossProfit > 0 ? Math.ceil(FIXED_COSTS_ANNUAL / grossProfit) : Infinity

    // Annual profit at 500/mo
    const annualProfit = grossProfit * 500 * 12 - FIXED_COSTS_ANNUAL

    // Margin health
    let health = "Unprofitable"
    let healthColor = "#EF4444"
    if (grossMargin >= 50) {
      health = "Excellent"
      healthColor = "#22C55E"
    } else if (grossMargin >= 30) {
      health = "Good"
      healthColor = "#F59E0B"
    } else if (grossMargin >= 15) {
      health = "Tight"
      healthColor = "#FF6B35"
    }

    // Margin display color
    let marginColor = "#EF4444"
    if (grossMargin >= 50) marginColor = "#22C55E"
    else if (grossMargin >= 30) marginColor = "#F59E0B"
    else if (grossMargin >= 15) marginColor = "#FF6B35"

    // Stacked bar segments
    const dutyAmount = cogs * (dutyPct / 100)
    const segments = [
      { label: "COGS", value: cogs, color: "#3B82F6" },
      { label: "Shipping", value: shipping, color: "#14B8A6" },
      { label: "Duties", value: dutyAmount, color: "#F59E0B" },
      { label: "Marketplace", value: marketplaceFees, color: "#8B5CF6" },
      { label: "Marketing", value: marketingCac, color: "#EC4899" },
      { label: "Returns", value: returnsCost, color: "#EF4444" },
      { label: "Profit", value: Math.max(0, grossProfit), color: "#22C55E" },
    ]

    // Volume projections
    const volumes = [100, 500, 1000, 5000]
    const projections = volumes.map((qty) => {
      const revenue = retailPrice * qty
      const gp = grossProfit * qty
      const np = gp - FIXED_COSTS_ANNUAL / 12
      return {
        qty,
        revenue,
        grossProfit: gp,
        netProfit: np,
      }
    })

    return {
      landedCost,
      marketplaceFees,
      processingFees,
      returnsCost,
      totalCost,
      grossProfit,
      grossMargin,
      breakEvenUnits,
      annualProfit,
      health,
      healthColor,
      marginColor,
      segments,
      projections,
    }
  }, [cogs, shipping, dutyPct, marketplacePct, processingPct, marketingCac, returnsPct, retailPrice])

  const barTotal = calc.segments.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B6B] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1A1A1A]">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-[#1A1A1A]">
          Tools
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A]">Margin Calculator</span>
      </nav>

      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        Margin Calculator
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Input your costs, fees, and selling price to see your true margins.
        Adjust the sliders to understand how each factor impacts profitability.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Inputs */}
        <div className="space-y-5">
          <SliderInput
            label="COGS (Cost of Goods)"
            value={cogs}
            onChange={setCogs}
            min={0}
            max={200}
            step={0.5}
            prefix="$"
          />
          <SliderInput
            label="Shipping per Unit"
            value={shipping}
            onChange={setShipping}
            min={0}
            max={20}
            step={0.25}
            prefix="$"
          />
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
            label="Marketplace Fee"
            value={marketplacePct}
            onChange={setMarketplacePct}
            min={0}
            max={30}
            step={0.5}
            suffix="%"
          />
          <SliderInput
            label="Payment Processing"
            value={processingPct}
            onChange={setProcessingPct}
            min={0}
            max={10}
            step={0.1}
            suffix="%"
          />
          <SliderInput
            label="Marketing / CAC"
            value={marketingCac}
            onChange={setMarketingCac}
            min={0}
            max={50}
            step={0.5}
            prefix="$"
          />
          <SliderInput
            label="Return Rate"
            value={returnsPct}
            onChange={setReturnsPct}
            min={0}
            max={30}
            step={0.5}
            suffix="%"
          />
          <div className="h-px bg-[#E8E8E4]" />
          <SliderInput
            label="Retail Price"
            value={retailPrice}
            onChange={setRetailPrice}
            min={0}
            max={500}
            step={0.99}
            prefix="$"
          />
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8">
            {/* Big margin display */}
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">
                Gross Margin
              </p>
              <p
                className="text-5xl font-black"
                style={{ color: calc.marginColor }}
              >
                {calc.grossMargin.toFixed(1)}%
              </p>
              <p
                className="text-sm font-semibold mt-1"
                style={{ color: calc.healthColor }}
              >
                {calc.health}
              </p>
            </div>

            {/* Stacked bar */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#6B6B6B] mb-2">
                Cost Breakdown per Unit
              </p>
              <div className="w-full h-8 rounded-lg overflow-hidden flex">
                {calc.segments.map((seg) => {
                  const pct = barTotal > 0 ? (seg.value / barTotal) * 100 : 0
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
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {calc.segments.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-xs text-[#6B6B6B]">
                      {seg.label} ${seg.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E8E8E4] my-6" />

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-[#FF6B35]" />
                  <p className="text-xs text-[#6B6B6B]">Profit / Unit</p>
                </div>
                <p
                  className="text-lg font-bold"
                  style={{
                    color: calc.grossProfit >= 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ${calc.grossProfit.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
                  <p className="text-xs text-[#6B6B6B]">Break-even</p>
                </div>
                <p className="text-lg font-bold text-[#1A1A1A]">
                  {calc.breakEvenUnits === Infinity
                    ? "N/A"
                    : `${calc.breakEvenUnits.toLocaleString()} units`}
                </p>
                <p className="text-[10px] text-[#9B9B9B]">at $5K fixed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                  <p className="text-xs text-[#6B6B6B]">Annual (500/mo)</p>
                </div>
                <p
                  className="text-lg font-bold"
                  style={{
                    color: calc.annualProfit >= 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ${calc.annualProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Volume projections */}
          <div className="mt-6 bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">
              Monthly Volume Projections
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-2 text-xs text-[#6B6B6B]">
                      Units/mo
                    </th>
                    <th className="text-right py-2 text-xs text-[#6B6B6B]">
                      Revenue
                    </th>
                    <th className="text-right py-2 text-xs text-[#6B6B6B]">
                      Gross Profit
                    </th>
                    <th className="text-right py-2 text-xs text-[#6B6B6B]">
                      Net Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calc.projections.map((row) => (
                    <tr
                      key={row.qty}
                      className="border-b border-[#E8E8E4]"
                    >
                      <td className="py-2.5 font-semibold">
                        {row.qty.toLocaleString()}
                      </td>
                      <td className="py-2.5 text-right">
                        ${row.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-2.5 text-right">
                        <span
                          style={{
                            color:
                              row.grossProfit >= 0 ? "#22C55E" : "#EF4444",
                          }}
                        >
                          ${row.grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-semibold">
                        <span
                          style={{
                            color:
                              row.netProfit >= 0 ? "#22C55E" : "#EF4444",
                          }}
                        >
                          ${row.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-[#9B9B9B] mt-2">
              Net profit subtracts ${(FIXED_COSTS_ANNUAL / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo overhead ($5K/yr)
            </p>
          </div>

          <p className="text-xs text-[#9B9B9B] mt-4 text-center">
            Estimates based on typical e-commerce cost structures. Your actual
            margins may vary.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want to optimize your margins with real supplier data?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — includes landed cost comparison across 3 countries.
        </p>
      </div>
    </div>
  )
}
