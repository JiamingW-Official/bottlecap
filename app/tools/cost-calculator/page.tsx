"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator } from "lucide-react"
import CostBreakdownChart from "@/components/CostBreakdownChart"

const PRODUCT_TYPES = [
  { id: "electronics_simple", label: "Simple Electronics", baseCost: 8, complexity: 1.3 },
  { id: "electronics_complex", label: "Complex Electronics", baseCost: 18, complexity: 1.8 },
  { id: "plastic_product", label: "Plastic Product", baseCost: 2.5, complexity: 1.0 },
  { id: "metal_product", label: "Metal Product", baseCost: 5, complexity: 1.2 },
  { id: "textile", label: "Textile / Apparel", baseCost: 3, complexity: 1.0 },
  { id: "wood_product", label: "Wood Product", baseCost: 4, complexity: 1.1 },
  { id: "glass_ceramic", label: "Glass / Ceramic", baseCost: 3.5, complexity: 1.15 },
  { id: "bag_luggage", label: "Bag / Luggage", baseCost: 5, complexity: 1.1 },
  { id: "furniture", label: "Furniture", baseCost: 25, complexity: 1.4 },
  { id: "toy", label: "Toy / Game", baseCost: 2, complexity: 1.0 },
  { id: "cosmetic_container", label: "Cosmetic Container", baseCost: 1.5, complexity: 0.9 },
  { id: "sports_equipment", label: "Sports Equipment", baseCost: 6, complexity: 1.2 },
]

const COUNTRIES = [
  { id: "china", label: "China", laborMult: 1.0, qualityMult: 1.0 },
  { id: "vietnam", label: "Vietnam", laborMult: 0.85, qualityMult: 1.02 },
  { id: "india", label: "India", laborMult: 0.75, qualityMult: 1.05 },
  { id: "mexico", label: "Mexico", laborMult: 1.15, qualityMult: 1.0 },
  { id: "thailand", label: "Thailand", laborMult: 0.9, qualityMult: 1.0 },
  { id: "indonesia", label: "Indonesia", laborMult: 0.7, qualityMult: 1.08 },
  { id: "turkey", label: "Turkey", laborMult: 1.05, qualityMult: 0.98 },
  { id: "bangladesh", label: "Bangladesh", laborMult: 0.6, qualityMult: 1.12 },
]

const MATERIALS = [
  { id: "standard", label: "Standard / Budget", mult: 1.0 },
  { id: "mid_range", label: "Mid-Range", mult: 1.25 },
  { id: "premium", label: "Premium / High-End", mult: 1.6 },
  { id: "eco_friendly", label: "Eco-Friendly / Sustainable", mult: 1.4 },
]

function getVolumeDiscount(qty: number): number {
  if (qty >= 10000) return 0.65
  if (qty >= 5000) return 0.72
  if (qty >= 2000) return 0.8
  if (qty >= 1000) return 0.85
  if (qty >= 500) return 0.92
  return 1.0
}

export default function CostCalculatorPage() {
  const [productType, setProductType] = useState("plastic_product")
  const [country, setCountry] = useState("china")
  const [material, setMaterial] = useState("standard")
  const [quantity, setQuantity] = useState(500)
  const [hasElectronics, setHasElectronics] = useState(false)
  const [needsCertification, setNeedsCertification] = useState(false)
  const [customPackaging, setCustomPackaging] = useState(false)

  const calc = useMemo(() => {
    const pt = PRODUCT_TYPES.find((p) => p.id === productType)!
    const ct = COUNTRIES.find((c) => c.id === country)!
    const mt = MATERIALS.find((m) => m.id === material)!

    const base = pt.baseCost * pt.complexity * ct.laborMult * ct.qualityMult * mt.mult
    const volDiscount = getVolumeDiscount(quantity)
    const unitCost = base * volDiscount

    const materialCost = unitCost * 0.45
    const laborCost = unitCost * 0.25
    const overheadCost = unitCost * 0.15
    const packagingCost = customPackaging ? unitCost * 0.12 : unitCost * 0.05
    const shippingCost = unitCost * 0.10

    let extras = 0
    if (hasElectronics && !productType.includes("electronics")) extras += 3.5
    if (needsCertification) extras += 0.8

    const total = materialCost + laborCost + overheadCost + packagingCost + shippingCost + extras
    const toolingEstimate = pt.baseCost * (pt.complexity > 1.2 ? 5000 : 2000)
    const totalOrder = total * quantity + toolingEstimate

    return {
      perUnit: total,
      materialCost,
      laborCost,
      overheadCost,
      packagingCost,
      shippingCost,
      extras,
      toolingEstimate,
      totalOrder,
      volumeDiscount: ((1 - volDiscount) * 100).toFixed(0),
    }
  }, [productType, country, material, quantity, hasElectronics, needsCertification, customPackaging])

  const chartSegments = [
    { label: "Materials", value: calc.materialCost, color: "#FF6B35" },
    { label: "Labor", value: calc.laborCost, color: "#3B82F6" },
    { label: "Overhead", value: calc.overheadCost, color: "#8B5CF6" },
    { label: "Packaging", value: calc.packagingCost, color: "#22C55E" },
    { label: "Shipping", value: calc.shippingCost, color: "#F59E0B" },
    ...(calc.extras > 0
      ? [{ label: "Extras", value: calc.extras, color: "#EF4444" }]
      : []),
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        Manufacturing Cost Calculator
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Estimate your per-unit manufacturing cost based on product type,
        materials, country, and volume. Adjust the parameters below to see how
        each factor affects your total cost.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {PRODUCT_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Manufacturing Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
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
              Material Quality
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Quantity: {quantity.toLocaleString()} units
              {Number(calc.volumeDiscount) > 0 && (
                <span className="text-[#22C55E] font-normal ml-2">
                  ({calc.volumeDiscount}% volume discount)
                </span>
              )}
            </label>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-[#FF6B35]"
            />
            <div className="flex justify-between text-xs text-[#9B9B9B] mt-1">
              <span>100</span>
              <span>10,000</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasElectronics}
                onChange={(e) => setHasElectronics(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Includes electronic components (PCB, sensors, BLE)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={needsCertification}
                onChange={(e) => setNeedsCertification(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Needs certification (FCC, CE, FDA)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={customPackaging}
                onChange={(e) => setCustomPackaging(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Custom branded packaging
              </span>
            </label>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Cost Estimate
              </h2>
            </div>

            <CostBreakdownChart
              segments={chartSegments}
              total={calc.perUnit}
            />

            <div className="h-px bg-[#E8E8E4] my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B6B6B]">
                  Tooling (one-time)
                </span>
                <span className="text-sm font-semibold">
                  ${calc.toolingEstimate.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B6B6B]">
                  Total Order ({quantity.toLocaleString()} units)
                </span>
                <span className="text-lg font-bold text-[#1A1A1A]">
                  ${calc.totalOrder.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9B9B9B] mt-4 text-center">
            Estimates based on industry averages. Actual costs vary by factory,
            specifications, and market conditions.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want a precise cost breakdown for your specific product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — tailored to your exact product description.
        </p>
      </div>
    </div>
  )
}
