"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  DollarSign,
  Globe,
  TrendingUp,
  ArrowRight,
  Factory,
  BarChart3,
  Zap,
} from "lucide-react"

const COUNTRIES = [
  { id: "usa", label: "USA", costMult: 1.0 },
  { id: "china", label: "China", costMult: 0.45 },
  { id: "vietnam", label: "Vietnam", costMult: 0.40 },
  { id: "india", label: "India", costMult: 0.35 },
  { id: "mexico", label: "Mexico", costMult: 0.65 },
  { id: "other", label: "Other", costMult: 0.55 },
]

function useAnimatedCounter(target: number, duration = 1500) {
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
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current =
        startValueRef.current + (target - startValueRef.current) * eased
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

export default function RoiCalculatorPage() {
  const [unitCost, setUnitCost] = useState(15)
  const [volume, setVolume] = useState(500)
  const [country, setCountry] = useState("usa")
  const [sellingPrice, setSellingPrice] = useState(49.99)
  const [shippingCost, setShippingCost] = useState(3)
  const [dutyRate, setDutyRate] = useState(10)

  const calc = useMemo(() => {
    const currentCountry = COUNTRIES.find((c) => c.id === country)!

    // Current state
    const landedCost = unitCost + shippingCost + unitCost * (dutyRate / 100)
    const monthlyRevenue = sellingPrice * volume
    const monthlyProfit = (sellingPrice - landedCost) * volume
    const currentMargin =
      sellingPrice > 0
        ? ((sellingPrice - landedCost) / sellingPrice) * 100
        : 0

    // Optimization 1: Country move
    // Find best-value country that's different from current
    let bestCountry = COUNTRIES.find((c) => c.id === "vietnam")!
    if (country === "vietnam") bestCountry = COUNTRIES.find((c) => c.id === "india")!
    if (country === "india") bestCountry = COUNTRIES.find((c) => c.id === "vietnam")!
    if (country === "china") bestCountry = COUNTRIES.find((c) => c.id === "vietnam")!

    const countryReduction =
      currentCountry.costMult > bestCountry.costMult
        ? (1 - bestCountry.costMult / currentCountry.costMult)
        : 0
    const countryReductionPct = Math.round(countryReduction * 100)
    const countrySavingsPerUnit = unitCost * countryReduction
    const countrySavingsAnnual = countrySavingsPerUnit * volume * 12

    // Optimization 2: Volume scaling
    const volume2x = volume * 2
    const volume5x = volume * 5
    const discount2x = 0.10
    const discount5x = 0.25
    const savingsPerUnit2x = unitCost * discount2x
    const savingsPerUnit5x = unitCost * discount5x
    const volumeSavingsAnnual =
      (savingsPerUnit2x * volume2x * 12 + savingsPerUnit5x * volume5x * 12) / 2
    // Use the 2x scenario as the primary savings
    const volumeSavingsPrimary = savingsPerUnit2x * volume2x * 12

    // Optimization 3: Sourcing (multi-quote negotiation)
    const sourcingSavingsPct = 0.10
    const sourcingSavingsPerUnit = unitCost * sourcingSavingsPct
    const sourcingSavingsAnnual = sourcingSavingsPerUnit * volume * 12

    // Total annual savings (conservative - don't stack all multipliers)
    const totalAnnualSavings =
      countrySavingsAnnual + volumeSavingsPrimary * 0.5 + sourcingSavingsAnnual

    // Optimized state
    const optimizedUnitCost =
      unitCost - countrySavingsPerUnit - sourcingSavingsPerUnit
    const optimizedLanded =
      optimizedUnitCost +
      shippingCost * 0.85 +
      optimizedUnitCost * (dutyRate / 100)
    const optimizedMonthlyProfit = (sellingPrice - optimizedLanded) * volume
    const optimizedMargin =
      sellingPrice > 0
        ? ((sellingPrice - optimizedLanded) / sellingPrice) * 100
        : 0

    return {
      currentCountry,
      landedCost,
      monthlyRevenue,
      monthlyProfit,
      currentMargin,
      bestCountry,
      countryReductionPct,
      countrySavingsPerUnit,
      countrySavingsAnnual,
      volume2x,
      volume5x,
      discount2x: discount2x * 100,
      discount5x: discount5x * 100,
      volumeSavingsPrimary,
      sourcingSavingsPct: sourcingSavingsPct * 100,
      sourcingSavingsPerUnit,
      sourcingSavingsAnnual,
      totalAnnualSavings,
      optimizedUnitCost,
      optimizedLanded,
      optimizedMonthlyProfit,
      optimizedMargin,
    }
  }, [unitCost, volume, country, sellingPrice, shippingCost, dutyRate])

  const animatedSavings = useAnimatedCounter(calc.totalAnnualSavings)

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
        <span className="text-[#1A1A1A]">ROI Calculator</span>
      </nav>

      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        ROI Calculator
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Estimate how much you could save by optimizing your manufacturing.
        Adjust your current costs to see potential savings from country
        relocation, volume scaling, and sourcing improvements.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Unit Cost ($)
            </label>
            <input
              type="number"
              value={unitCost}
              onChange={(e) => setUnitCost(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm focus:border-[#FF6B35]"
              min={0}
              step={0.5}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Monthly Volume (units)
            </label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm focus:border-[#FF6B35]"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Country of Manufacturing
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Selling Price ($)
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm focus:border-[#FF6B35]"
              min={0}
              step={0.5}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Shipping Cost per Unit ($)
            </label>
            <input
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm focus:border-[#FF6B35]"
              min={0}
              step={0.25}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Duty Rate (%)
            </label>
            <input
              type="number"
              value={dutyRate}
              onChange={(e) => setDutyRate(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm focus:border-[#FF6B35]"
              min={0}
              max={100}
              step={0.5}
            />
          </div>

          {/* Current State Summary */}
          <div className="bg-[#F5F5F0] rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">
              Current State
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B6B]">Landed Cost</span>
                <span className="font-semibold">
                  ${calc.landedCost.toFixed(2)}/unit
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B6B]">Monthly Profit</span>
                <span
                  className="font-semibold"
                  style={{
                    color: calc.monthlyProfit >= 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ${calc.monthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B6B]">Margin</span>
                <span
                  className="font-semibold"
                  style={{
                    color: calc.currentMargin >= 30 ? "#22C55E" : calc.currentMargin >= 15 ? "#F59E0B" : "#EF4444",
                  }}
                >
                  {calc.currentMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Optimizations & Results */}
        <div className="space-y-6">
          {/* Big animated savings */}
          <div className="bg-[#FF6B35] rounded-2xl p-8 text-center text-white">
            <p className="text-sm font-semibold opacity-80 mb-1">
              Total Estimated Annual Savings
            </p>
            <p className="text-4xl sm:text-5xl font-black">
              ${Math.round(animatedSavings).toLocaleString()}
            </p>
            <p className="text-sm opacity-80 mt-2">
              across all optimization strategies
            </p>
          </div>

          {/* Optimization 1: Country */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="font-bold text-[#1A1A1A]">
                Country Optimization
              </h3>
            </div>
            {calc.countryReductionPct > 0 ? (
              <>
                <p className="text-sm text-[#6B6B6B] mb-3">
                  Move from {calc.currentCountry.label} to{" "}
                  {calc.bestCountry.label} for an estimated{" "}
                  <span className="font-semibold text-[#22C55E]">
                    {calc.countryReductionPct}% cost reduction
                  </span>
                  .
                </p>
                <div className="flex items-center gap-3 bg-[#F5F5F0] rounded-lg p-3">
                  <div className="text-center flex-1">
                    <p className="text-xs text-[#6B6B6B]">Current</p>
                    <p className="font-bold text-[#1A1A1A]">
                      ${unitCost.toFixed(2)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                  <div className="text-center flex-1">
                    <p className="text-xs text-[#6B6B6B]">Optimized</p>
                    <p className="font-bold text-[#22C55E]">
                      ${(unitCost - calc.countrySavingsPerUnit).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center flex-1 border-l border-[#E8E8E4] pl-3">
                    <p className="text-xs text-[#6B6B6B]">Annual Savings</p>
                    <p className="font-bold text-[#22C55E]">
                      ${calc.countrySavingsAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-[#6B6B6B]">
                You are already manufacturing in one of the most cost-effective
                regions. Consider volume or sourcing optimizations instead.
              </p>
            )}
          </div>

          {/* Optimization 2: Volume */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Factory className="w-5 h-5 text-[#8B5CF6]" />
              <h3 className="font-bold text-[#1A1A1A]">Volume Scaling</h3>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-3">
              Increasing volume unlocks supplier discounts through economies of
              scale.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#F5F5F0] rounded-lg p-3">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    2x Volume ({calc.volume2x.toLocaleString()}/mo)
                  </p>
                  <p className="text-xs text-[#6B6B6B]">
                    ~{calc.discount2x}% unit cost discount
                  </p>
                </div>
                <p className="font-bold text-[#22C55E]">
                  ${calc.volumeSavingsPrimary.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                </p>
              </div>
              <div className="flex items-center justify-between bg-[#F5F5F0] rounded-lg p-3">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    5x Volume ({calc.volume5x.toLocaleString()}/mo)
                  </p>
                  <p className="text-xs text-[#6B6B6B]">
                    ~{calc.discount5x}% unit cost discount
                  </p>
                </div>
                <p className="font-bold text-[#22C55E]">
                  ${(unitCost * 0.25 * calc.volume5x * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                </p>
              </div>
            </div>
          </div>

          {/* Optimization 3: Sourcing */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-bold text-[#1A1A1A]">
                Sourcing Optimization
              </h3>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-3">
              Multi-quote negotiation across 3-5 suppliers typically yields{" "}
              <span className="font-semibold">8-12% savings</span> (estimated
              at {calc.sourcingSavingsPct}%).
            </p>
            <div className="flex items-center justify-between bg-[#F5F5F0] rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Savings per Unit
                </p>
                <p className="text-xs text-[#6B6B6B]">
                  Based on {calc.sourcingSavingsPct}% negotiation discount
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#22C55E]">
                  ${calc.sourcingSavingsPerUnit.toFixed(2)}/unit
                </p>
                <p className="text-xs text-[#22C55E]">
                  ${calc.sourcingSavingsAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                </p>
              </div>
            </div>
          </div>

          {/* Before / After comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F5F5F0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-[#6B6B6B]" />
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                  Before
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-[#6B6B6B]">Unit Cost</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    ${unitCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Landed Cost</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    ${calc.landedCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Margin</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    {calc.currentMargin.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Monthly Profit</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    ${calc.monthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-[#22C55E] p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                <p className="text-xs font-semibold text-[#22C55E] uppercase tracking-wide">
                  After
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-[#6B6B6B]">Unit Cost</p>
                  <p className="text-lg font-bold text-[#22C55E]">
                    ${calc.optimizedUnitCost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Landed Cost</p>
                  <p className="text-lg font-bold text-[#22C55E]">
                    ${calc.optimizedLanded.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Margin</p>
                  <p className="text-lg font-bold text-[#22C55E]">
                    {calc.optimizedMargin.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6B6B]">Monthly Profit</p>
                  <p className="text-lg font-bold text-[#22C55E]">
                    ${calc.optimizedMonthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9B9B9B] text-center">
            Savings are estimates based on industry averages. Actual results
            depend on product, volume, and supplier negotiations.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Ready to find real savings for your product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — with supplier-specific pricing and optimization recommendations.
        </p>
      </div>
    </div>
  )
}
