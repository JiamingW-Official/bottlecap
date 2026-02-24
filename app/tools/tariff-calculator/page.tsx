"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"

const ORIGIN_COUNTRIES = [
  { id: "CN", label: "China", baseTariff: 3.5, additionalTariff: 25, section301: true },
  { id: "VN", label: "Vietnam", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "IN", label: "India", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "MX", label: "Mexico (USMCA)", baseTariff: 0, additionalTariff: 0, section301: false },
  { id: "TW", label: "Taiwan", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "KR", label: "South Korea (KORUS)", baseTariff: 0, additionalTariff: 0, section301: false },
  { id: "TH", label: "Thailand", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "ID", label: "Indonesia", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "BD", label: "Bangladesh", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "TR", label: "Turkey", baseTariff: 3.5, additionalTariff: 0, section301: false },
  { id: "PL", label: "Poland (EU)", baseTariff: 0, additionalTariff: 0, section301: false },
  { id: "PH", label: "Philippines", baseTariff: 3.5, additionalTariff: 0, section301: false },
]

const PRODUCT_CATEGORIES = [
  { id: "electronics", label: "Consumer Electronics", mfnRate: 2.0 },
  { id: "plastics", label: "Plastic Products", mfnRate: 3.4 },
  { id: "metals", label: "Metal Products", mfnRate: 2.5 },
  { id: "textiles", label: "Textiles & Apparel", mfnRate: 16.5 },
  { id: "footwear", label: "Footwear", mfnRate: 20.0 },
  { id: "bags", label: "Bags & Luggage", mfnRate: 17.6 },
  { id: "furniture", label: "Furniture", mfnRate: 0 },
  { id: "toys", label: "Toys & Games", mfnRate: 0 },
  { id: "ceramics", label: "Ceramics & Glass", mfnRate: 8.0 },
  { id: "kitchen", label: "Kitchen Appliances", mfnRate: 3.4 },
  { id: "lighting", label: "Lighting", mfnRate: 3.9 },
  { id: "sports", label: "Sports Equipment", mfnRate: 4.6 },
  { id: "audio", label: "Audio Equipment", mfnRate: 4.9 },
  { id: "auto", label: "Automotive Accessories", mfnRate: 2.5 },
  { id: "medical", label: "Medical Devices", mfnRate: 0 },
  { id: "cosmetics", label: "Cosmetics/Beauty", mfnRate: 0 },
]

export default function TariffCalculatorPage() {
  const [originCountry, setOriginCountry] = useState("CN")
  const [productCategory, setProductCategory] = useState("electronics")
  const [productValue, setProductValue] = useState(10000)
  const [quantity, setQuantity] = useState(500)

  const calc = useMemo(() => {
    const origin = ORIGIN_COUNTRIES.find((c) => c.id === originCountry)!
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === productCategory)!

    const totalValue = productValue
    const mfnRate = origin.baseTariff > 0 ? cat.mfnRate : 0
    const additionalRate = origin.additionalTariff
    const totalRate = mfnRate + additionalRate
    const dutyAmount = (totalValue * totalRate) / 100
    const perUnit = dutyAmount / quantity
    const landedCost = totalValue + dutyAmount
    const landedPerUnit = landedCost / quantity

    return {
      mfnRate,
      additionalRate,
      totalRate,
      dutyAmount,
      perUnit,
      landedCost,
      landedPerUnit,
      hasFTA: origin.baseTariff === 0,
      section301: origin.section301,
      totalValue,
    }
  }, [originCountry, productCategory, productValue, quantity])

  // Compare with China
  const chinaComparison = useMemo(() => {
    if (originCountry === "CN") return null
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === productCategory)!
    const chinaRate = cat.mfnRate + 25
    const chinaDuty = (productValue * chinaRate) / 100
    const savings = chinaDuty - calc.dutyAmount
    return { chinaRate, chinaDuty, savings }
  }, [originCountry, productCategory, productValue, calc.dutyAmount])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        Tariff Calculator
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Calculate US import duties and tariff impact for your product. Compare
        manufacturing countries and see how Section 301 tariffs on China affect
        your bottom line.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Origin Country
            </label>
            <select
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {ORIGIN_COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                  {c.section301 ? " (+Section 301)" : ""}
                  {c.baseTariff === 0 ? " (FTA)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Product Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} (MFN: {c.mfnRate}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Total Shipment Value (USD)
            </label>
            <input
              type="number"
              value={productValue}
              onChange={(e) => setProductValue(Number(e.target.value) || 0)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Units in Shipment
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
              min={1}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Tariff Breakdown
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B6B6B]">MFN Tariff Rate</span>
                <span className="font-semibold">
                  {calc.mfnRate}%
                  {calc.hasFTA && (
                    <span className="text-xs text-[#22C55E] ml-2">
                      (FTA — 0%)
                    </span>
                  )}
                </span>
              </div>
              {calc.section301 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#EF4444]">
                    Section 301 Additional
                  </span>
                  <span className="font-semibold text-[#EF4444]">
                    +{calc.additionalRate}%
                  </span>
                </div>
              )}
              <div className="h-px bg-[#E8E8E4]" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  Effective Tariff Rate
                </span>
                <span className="text-xl font-bold text-[#FF6B35]">
                  {calc.totalRate}%
                </span>
              </div>
              <div className="h-px bg-[#E8E8E4]" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B6B6B]">Shipment value</span>
                <span className="font-semibold">
                  ${calc.totalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B6B6B]">
                  Estimated duty owed
                </span>
                <span className="font-semibold text-[#EF4444]">
                  ${calc.dutyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B6B6B]">
                  Duty per unit
                </span>
                <span className="font-semibold">
                  ${calc.perUnit.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-[#E8E8E4]" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  Total Landed Cost
                </span>
                <span className="text-lg font-bold text-[#1A1A1A]">
                  ${calc.landedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B6B6B]">
                  Landed cost per unit
                </span>
                <span className="font-semibold">
                  ${calc.landedPerUnit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* China comparison */}
          {chinaComparison && chinaComparison.savings > 0 && (
            <div className="bg-[#DCFCE7] rounded-xl p-5">
              <p className="text-sm font-semibold text-[#166534] mb-1">
                Savings vs. manufacturing in China
              </p>
              <p className="text-2xl font-bold text-[#166534]">
                ${chinaComparison.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-[#166534]/70 mt-1">
                China rate: {chinaComparison.chinaRate}% vs your rate:{" "}
                {calc.totalRate}%
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Need exact tariff classification for your product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — includes HS code lookup with confidence score.
        </p>
      </div>
    </div>
  )
}
