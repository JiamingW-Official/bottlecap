"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"

export default function MoqCalculatorPage() {
  const [unitCost, setUnitCost] = useState(8)
  const [sellingPrice, setSellingPrice] = useState(29.99)
  const [toolingCost, setToolingCost] = useState(3000)
  const [shippingPerUnit, setShippingPerUnit] = useState(1.5)
  const [monthlyDemand, setMonthDemand] = useState(100)
  const [budget, setBudget] = useState(10000)
  const [storageCapacity, setStorageCapacity] = useState(500)

  const calc = useMemo(() => {
    const totalPerUnit = unitCost + shippingPerUnit
    const maxFromBudget = Math.floor((budget - toolingCost) / totalPerUnit)
    const maxFromStorage = storageCapacity

    // Volume tiers
    const tiers = [100, 250, 500, 1000, 2000, 5000]
    const tierAnalysis = tiers.map((qty) => {
      const discount =
        qty >= 5000 ? 0.35 : qty >= 2000 ? 0.2 : qty >= 1000 ? 0.15 : qty >= 500 ? 0.08 : qty >= 250 ? 0.04 : 0
      const discountedUnit = unitCost * (1 - discount)
      const totalCostPerUnit = discountedUnit + shippingPerUnit
      const totalOrderCost = totalCostPerUnit * qty + toolingCost
      const margin = sellingPrice - totalCostPerUnit
      const marginPercent = (margin / sellingPrice) * 100
      const monthsOfInventory = monthlyDemand > 0 ? qty / monthlyDemand : 0
      const breakEvenUnits =
        margin > 0 ? Math.ceil(toolingCost / margin) : Infinity
      const withinBudget = totalOrderCost <= budget
      const withinStorage = qty <= storageCapacity

      return {
        qty,
        discount: (discount * 100).toFixed(0),
        discountedUnit,
        totalCostPerUnit,
        totalOrderCost,
        margin,
        marginPercent,
        monthsOfInventory,
        breakEvenUnits,
        withinBudget,
        withinStorage,
        feasible: withinBudget && withinStorage,
      }
    })

    const recommendedTier =
      tierAnalysis.find((t) => t.feasible && t.marginPercent >= 40) ||
      tierAnalysis.find((t) => t.feasible) ||
      tierAnalysis[0]

    return {
      maxFromBudget: Math.max(0, maxFromBudget),
      maxFromStorage,
      tierAnalysis,
      recommendedTier,
    }
  }, [unitCost, sellingPrice, toolingCost, shippingPerUnit, monthlyDemand, budget, storageCapacity])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        MOQ Planner
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Plan your minimum order quantity based on budget, storage, and cash
        flow. See how quantity affects per-unit cost, margin, and inventory
        months.
      </p>

      {/* Input grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Unit Cost ($/unit)
          </label>
          <input
            type="number"
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
            step={0.5}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Selling Price ($/unit)
          </label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
            step={0.5}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Tooling Cost ($)
          </label>
          <input
            type="number"
            value={toolingCost}
            onChange={(e) => setToolingCost(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
            step={100}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Shipping ($/unit)
          </label>
          <input
            type="number"
            value={shippingPerUnit}
            onChange={(e) => setShippingPerUnit(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
            step={0.1}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Monthly Demand (units)
          </label>
          <input
            type="number"
            value={monthlyDemand}
            onChange={(e) => setMonthDemand(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Total Budget ($)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
            step={500}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
            Storage Capacity (units)
          </label>
          <input
            type="number"
            value={storageCapacity}
            onChange={(e) => setStorageCapacity(Number(e.target.value) || 0)}
            className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm"
            min={0}
          />
        </div>
      </div>

      {/* Constraints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <p className="text-xs text-[#6B6B6B] mb-1">Max from Budget</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {calc.maxFromBudget.toLocaleString()} units
          </p>
          <p className="text-xs text-[#9B9B9B] mt-1">
            After ${toolingCost.toLocaleString()} tooling
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <p className="text-xs text-[#6B6B6B] mb-1">Max from Storage</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {calc.maxFromStorage.toLocaleString()} units
          </p>
          <p className="text-xs text-[#9B9B9B] mt-1">
            {monthlyDemand > 0
              ? `${(calc.maxFromStorage / monthlyDemand).toFixed(1)} months of inventory`
              : "Set monthly demand to calculate"}
          </p>
        </div>
      </div>

      {/* Recommendation */}
      {calc.recommendedTier && (
        <div className="bg-[#FFF0EB] border border-[#FF6B35] rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-[#FF6B35]" />
            <p className="font-bold text-[#1A1A1A]">Recommended Order</p>
          </div>
          <p className="text-3xl font-black text-[#FF6B35]">
            {calc.recommendedTier.qty.toLocaleString()} units
          </p>
          <p className="text-sm text-[#6B6B6B] mt-2">
            ${calc.recommendedTier.totalCostPerUnit.toFixed(2)}/unit &middot;{" "}
            {calc.recommendedTier.marginPercent.toFixed(0)}% margin &middot;{" "}
            {calc.recommendedTier.monthsOfInventory.toFixed(1)} months inventory
            &middot; Break even at {calc.recommendedTier.breakEvenUnits} units
          </p>
        </div>
      )}

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#E8E8E4]">
              <th className="text-left py-3">Quantity</th>
              <th className="text-right py-3">Discount</th>
              <th className="text-right py-3">Unit Cost</th>
              <th className="text-right py-3">Total Cost</th>
              <th className="text-right py-3">Margin</th>
              <th className="text-right py-3">Months Inv.</th>
              <th className="text-right py-3">Break Even</th>
              <th className="text-center py-3">Feasible</th>
            </tr>
          </thead>
          <tbody>
            {calc.tierAnalysis.map((tier) => (
              <tr
                key={tier.qty}
                className={`border-b border-[#E8E8E4] ${
                  tier.qty === calc.recommendedTier?.qty
                    ? "bg-[#FFF0EB]"
                    : tier.feasible
                      ? ""
                      : "opacity-50"
                }`}
              >
                <td className="py-3 font-semibold">
                  {tier.qty.toLocaleString()}
                  {tier.qty === calc.recommendedTier?.qty && (
                    <span className="text-xs text-[#FF6B35] ml-2">
                      Recommended
                    </span>
                  )}
                </td>
                <td className="py-3 text-right text-[#22C55E]">
                  {Number(tier.discount) > 0 ? `-${tier.discount}%` : "—"}
                </td>
                <td className="py-3 text-right">
                  ${tier.totalCostPerUnit.toFixed(2)}
                </td>
                <td className="py-3 text-right">
                  ${tier.totalOrderCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td
                  className={`py-3 text-right font-semibold ${tier.marginPercent >= 50 ? "text-[#22C55E]" : tier.marginPercent >= 30 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}
                >
                  {tier.marginPercent.toFixed(0)}%
                </td>
                <td className="py-3 text-right">
                  {tier.monthsOfInventory.toFixed(1)}
                </td>
                <td className="py-3 text-right">
                  {tier.breakEvenUnits === Infinity
                    ? "N/A"
                    : tier.breakEvenUnits.toLocaleString()}
                </td>
                <td className="py-3 text-center">
                  {tier.feasible ? (
                    <span className="text-[#22C55E]">Yes</span>
                  ) : (
                    <span className="text-[#EF4444]">
                      {!tier.withinBudget ? "Over budget" : "Over storage"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want supplier-specific MOQ data for your product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — includes real MOQs from top manufacturing countries.
        </p>
      </div>
    </div>
  )
}
