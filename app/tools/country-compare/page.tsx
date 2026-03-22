"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Globe, Trophy, Info, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

interface CountryData {
  id: string
  name: string
  flag: string
  labor: number
  quality: number
  leadDays: number
  ip: number
  infrastructure: number
  tariff: number
  specializations: string[]
}

const COUNTRIES: CountryData[] = [
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    labor: 6.50,
    quality: 7,
    leadDays: 35,
    ip: 4,
    infrastructure: 9,
    tariff: 19.3,
    specializations: ["Electronics", "Plastics", "Hardware", "Toys"],
  },
  {
    id: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    labor: 2.99,
    quality: 6,
    leadDays: 42,
    ip: 5,
    infrastructure: 6,
    tariff: 6.7,
    specializations: ["Apparel", "Footwear", "Furniture"],
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    labor: 2.18,
    quality: 6,
    leadDays: 45,
    ip: 6,
    infrastructure: 5,
    tariff: 5.4,
    specializations: ["Textiles", "Pharma", "Jewelry", "Leather"],
  },
  {
    id: "mexico",
    name: "Mexico",
    flag: "🇲🇽",
    labor: 4.82,
    quality: 7,
    leadDays: 14,
    ip: 7,
    infrastructure: 7,
    tariff: 0,
    specializations: ["Automotive", "Electronics", "Aerospace", "Medical"],
  },
  {
    id: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    labor: 3.50,
    quality: 7,
    leadDays: 38,
    ip: 6,
    infrastructure: 7,
    tariff: 4.2,
    specializations: ["Automotive", "Food", "Plastics", "Electronics"],
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    labor: 4.10,
    quality: 7,
    leadDays: 30,
    ip: 7,
    infrastructure: 6,
    tariff: 3.8,
    specializations: ["Textiles", "Furniture", "Marble", "Leather"],
  },
  {
    id: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    labor: 1.99,
    quality: 5,
    leadDays: 45,
    ip: 4,
    infrastructure: 5,
    tariff: 5.1,
    specializations: ["Palm Oil", "Textiles", "Footwear", "Rubber"],
  },
  {
    id: "bangladesh",
    name: "Bangladesh",
    flag: "🇧🇩",
    labor: 0.95,
    quality: 5,
    leadDays: 50,
    ip: 3,
    infrastructure: 4,
    tariff: 15.6,
    specializations: ["Garments", "Knitwear", "Denim"],
  },
  {
    id: "southkorea",
    name: "South Korea",
    flag: "🇰🇷",
    labor: 8.50,
    quality: 9,
    leadDays: 28,
    ip: 8,
    infrastructure: 9,
    tariff: 0,
    specializations: ["Electronics", "Cosmetics", "Automotive", "K-Beauty"],
  },
  {
    id: "taiwan",
    name: "Taiwan",
    flag: "🇹🇼",
    labor: 6.80,
    quality: 9,
    leadDays: 30,
    ip: 8,
    infrastructure: 8,
    tariff: 3.5,
    specializations: ["Electronics", "Semiconductors", "Bicycles", "Precision Parts"],
  },
  {
    id: "philippines",
    name: "Philippines",
    flag: "🇵🇭",
    labor: 2.40,
    quality: 6,
    leadDays: 42,
    ip: 5,
    infrastructure: 5,
    tariff: 4.8,
    specializations: ["Furniture", "Coconut Products", "BPO", "Garments"],
  },
  {
    id: "poland",
    name: "Poland (EU)",
    flag: "🇵🇱",
    labor: 7.20,
    quality: 8,
    leadDays: 21,
    ip: 9,
    infrastructure: 8,
    tariff: 0,
    specializations: ["Auto Parts", "Furniture", "Food", "Cosmetics"],
  },
]

const BAR_COLORS = ["#FF6B35", "#3B82F6", "#22C55E", "#8B5CF6"]

// Metrics with labels, keys, and formatting info
const METRICS = [
  { key: "labor", label: "Avg. Labor Cost", unit: "$/hr", higherIsBetter: false },
  { key: "quality", label: "Quality Rating", unit: "/10", higherIsBetter: true },
  { key: "leadDays", label: "Avg. Lead Time", unit: " days", higherIsBetter: false },
  { key: "ip", label: "IP Protection", unit: "/10", higherIsBetter: true },
  { key: "infrastructure", label: "Infrastructure", unit: "/10", higherIsBetter: true },
  { key: "tariff", label: "US Tariff Rate", unit: "%", higherIsBetter: false },
] as const

type MetricKey = (typeof METRICS)[number]["key"]

// Product type definitions
type ProductType =
  | "general"
  | "electronics"
  | "textiles"
  | "furniture"
  | "cosmetics"
  | "medical"

interface ProductTypeConfig {
  label: string
  weights: {
    quality: number
    cost: number
    ip: number
    speed: number
    infrastructure: number
  }
  description: string
}

const PRODUCT_TYPES: Record<ProductType, ProductTypeConfig> = {
  general: {
    label: "General Products",
    weights: { quality: 0.25, cost: 0.20, ip: 0.20, speed: 0.20, infrastructure: 0.15 },
    description: "Quality 25% · Cost 20% · IP 20% · Speed 20% · Infrastructure 15%",
  },
  electronics: {
    label: "Electronics",
    weights: { quality: 0.20, cost: 0.25, ip: 0.30, speed: 0.00, infrastructure: 0.25 },
    description: "IP 30% · Infrastructure 25% · Cost 25% · Quality 20%",
  },
  textiles: {
    label: "Textiles / Apparel",
    weights: { quality: 0.25, cost: 0.35, ip: 0.10, speed: 0.15, infrastructure: 0.15 },
    description: "Cost 35% · Quality 25% · Speed 15% · Infrastructure 15% · IP 10%",
  },
  furniture: {
    label: "Furniture",
    weights: { quality: 0.15, cost: 0.30, ip: 0.15, speed: 0.20, infrastructure: 0.20 },
    description: "Cost 30% · Speed 20% · Infrastructure 20% · Quality 15% · IP 15%",
  },
  cosmetics: {
    label: "Cosmetics / Beauty",
    weights: { quality: 0.35, cost: 0.15, ip: 0.25, speed: 0.15, infrastructure: 0.10 },
    description: "Quality 35% · IP 25% · Cost 15% · Speed 15% · Infrastructure 10%",
  },
  medical: {
    label: "Medical Devices",
    weights: { quality: 0.30, cost: 0.05, ip: 0.35, speed: 0.10, infrastructure: 0.20 },
    description: "IP 35% · Quality 30% · Infrastructure 20% · Speed 10% · Cost 5%",
  },
}

function getMetricValue(country: CountryData, key: MetricKey): number {
  return country[key] as number
}

function formatMetricValue(key: MetricKey, value: number): string {
  const metric = METRICS.find((m) => m.key === key)!
  if (key === "labor") return `$${value.toFixed(2)}`
  if (key === "tariff") return `${value}%`
  if (key === "leadDays") return `${value} days`
  return `${value}${metric.unit}`
}

// Normalize metric to 0-100 for bar width
function normalizeForBar(key: MetricKey, value: number): number {
  const ranges: Record<MetricKey, { min: number; max: number }> = {
    labor: { min: 0, max: 10 },
    quality: { min: 0, max: 10 },
    leadDays: { min: 0, max: 60 },
    ip: { min: 0, max: 10 },
    infrastructure: { min: 0, max: 10 },
    tariff: { min: 0, max: 25 },
  }
  const range = ranges[key]
  return Math.min(100, Math.max(5, ((value - range.min) / (range.max - range.min)) * 100))
}

// Generate a one-sentence verdict for a ranked country
function generateVerdict(
  country: CountryData & { score: number },
  rank: number,
  productType: ProductType,
  allRanked: Array<CountryData & { score: number }>
): string {
  const productLabel = PRODUCT_TYPES[productType].label

  if (rank === 0) {
    // Find the country's strongest attribute among the weighted priorities
    const config = PRODUCT_TYPES[productType]
    const { weights } = config
    const topWeight = Object.entries(weights).sort((a, b) => b[1] - a[1])[0][0]
    const advantageMap: Record<string, string> = {
      ip: `strong IP protection score of ${country.ip}/10`,
      quality: `high quality rating of ${country.quality}/10`,
      cost: `competitive labor cost of $${country.labor.toFixed(2)}/hr`,
      speed: `fast ${country.leadDays}-day lead time`,
      infrastructure: `excellent infrastructure score of ${country.infrastructure}/10`,
    }
    const advantage = advantageMap[topWeight] ?? `balanced performance`
    return `${country.name} is your best option for ${productLabel}, with ${advantage}.`
  }

  // For non-winners, note a meaningful trade-off vs #1
  const winner = allRanked[0]
  if (country.labor < winner.labor) {
    const pct = Math.round(((winner.labor - country.labor) / winner.labor) * 100)
    return `${country.name} offers ${pct}% lower labor cost than ${winner.name} but scores lower overall.`
  }
  if (country.tariff === 0 && winner.tariff > 0) {
    return `${country.name} has zero US tariffs, which may offset its lower weighted score.`
  }
  if (country.leadDays < winner.leadDays) {
    const days = winner.leadDays - country.leadDays
    return `${country.name} ships ${days} days faster than ${winner.name} — ideal if speed is critical.`
  }
  if (country.quality > winner.quality) {
    return `${country.name} has higher quality ratings, worth considering for premium products.`
  }
  return `${country.name} ranks #${rank + 1} overall — a solid alternative with different trade-offs.`
}

// Generate dynamic key insights comparing selected countries
function generateInsights(countries: CountryData[]): string[] {
  if (countries.length < 2) return []
  const insights: string[] = []

  // Cheapest vs most expensive labor
  const sorted = [...countries].sort((a, b) => a.labor - b.labor)
  const cheapest = sorted[0]
  const priciest = sorted[sorted.length - 1]
  if (cheapest.id !== priciest.id) {
    const pct = Math.round(((priciest.labor - cheapest.labor) / priciest.labor) * 100)
    insights.push(
      `${cheapest.name} has ${pct}% lower labor cost than ${priciest.name} ($${cheapest.labor.toFixed(2)}/hr vs $${priciest.labor.toFixed(2)}/hr).`
    )
  }

  // Zero-tariff countries
  const zeroTariff = countries.filter((c) => c.tariff === 0)
  const withTariff = countries.filter((c) => c.tariff > 0)
  if (zeroTariff.length > 0 && withTariff.length > 0) {
    const shipmentSize = 10000
    const highestTariff = withTariff.sort((a, b) => b.tariff - a.tariff)[0]
    const saving = Math.round((highestTariff.tariff / 100) * shipmentSize)
    const zeroNames = zeroTariff.map((c) => c.name).join(" and ")
    insights.push(
      `${zeroNames} has no US import duties — saving ~$${saving.toLocaleString()} on a $${shipmentSize.toLocaleString()} shipment vs ${highestTariff.name} (${highestTariff.tariff}% tariff).`
    )
  }

  // Fastest vs slowest lead time
  const fastestLead = [...countries].sort((a, b) => a.leadDays - b.leadDays)[0]
  const slowestLead = [...countries].sort((a, b) => b.leadDays - a.leadDays)[0]
  if (fastestLead.id !== slowestLead.id) {
    const diff = slowestLead.leadDays - fastestLead.leadDays
    insights.push(
      `${fastestLead.name} delivers ${diff} days faster than ${slowestLead.name} (${fastestLead.leadDays} vs ${slowestLead.leadDays} days avg lead time).`
    )
  }

  // Best vs worst IP protection
  const bestIP = [...countries].sort((a, b) => b.ip - a.ip)[0]
  const worstIP = [...countries].sort((a, b) => a.ip - b.ip)[0]
  if (bestIP.id !== worstIP.id && bestIP.ip !== worstIP.ip) {
    insights.push(
      `${bestIP.name} offers significantly stronger IP protection (${bestIP.ip}/10) than ${worstIP.name} (${worstIP.ip}/10) — critical for proprietary designs.`
    )
  }

  return insights.slice(0, 4)
}

export default function CountryComparePage() {
  const [selected, setSelected] = useState<string[]>(["china", "mexico"])
  const [productType, setProductType] = useState<ProductType>("general")

  const toggleCountry = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const selectedCountries = useMemo(
    () => COUNTRIES.filter((c) => selected.includes(c.id)),
    [selected]
  )

  const weights = PRODUCT_TYPES[productType].weights

  // Overall ranking with product-type weights
  const rankings = useMemo(() => {
    if (selectedCountries.length < 2) return []

    const maxLabor = Math.max(...selectedCountries.map((c) => c.labor))
    const maxLead = Math.max(...selectedCountries.map((c) => c.leadDays))

    return selectedCountries
      .map((c) => {
        const costScore = maxLabor > 0 ? ((maxLabor - c.labor) / maxLabor) * 10 : 5
        const speedScore = maxLead > 0 ? ((maxLead - c.leadDays) / maxLead) * 10 : 5

        const score =
          c.quality * weights.quality +
          costScore * weights.cost +
          c.ip * weights.ip +
          speedScore * weights.speed +
          c.infrastructure * weights.infrastructure

        return { ...c, score: Math.round(score * 10) / 10 }
      })
      .sort((a, b) => b.score - a.score)
  }, [selectedCountries, weights])

  // Determine best/worst for each metric
  const bestWorst = useMemo((): Partial<Record<MetricKey, { bestId: string; worstId: string }>> => {
    if (selectedCountries.length < 2) return {}
    const result: Record<MetricKey, { bestId: string; worstId: string }> = {} as Record<MetricKey, { bestId: string; worstId: string }>
    for (const metric of METRICS) {
      const sorted = [...selectedCountries].sort((a, b) => {
        const aVal = getMetricValue(a, metric.key)
        const bVal = getMetricValue(b, metric.key)
        return metric.higherIsBetter ? bVal - aVal : aVal - bVal
      })
      result[metric.key] = {
        bestId: sorted[0].id,
        worstId: sorted[sorted.length - 1].id,
      }
    }
    return result
  }, [selectedCountries])

  const insights = useMemo(() => generateInsights(selectedCountries), [selectedCountries])

  const showComparison = selectedCountries.length >= 2

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[#FFF0EB] rounded-xl flex items-center justify-center">
          <Globe className="w-5 h-5 text-[#FF6B35]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
          Country Compare
        </h1>
      </div>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Select 2-4 manufacturing countries to compare side by side. See how they
        stack up on labor costs, quality, lead times, IP protection, and more.
      </p>

      {/* Product-type filter */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-4">
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
          What are you manufacturing?
        </label>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value as ProductType)}
          className="w-full sm:w-auto border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] cursor-pointer"
        >
          {(Object.entries(PRODUCT_TYPES) as [ProductType, ProductTypeConfig][]).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-[#9B9B9B] mt-2">
          Scoring weights: {PRODUCT_TYPES[productType].description}
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-10">
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
          Select Countries{" "}
          <span className="text-[#6B6B6B] font-normal">
            ({selected.length}/4 selected)
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => {
            const isSelected = selected.includes(c.id)
            const isDisabled = !isSelected && selected.length >= 4
            return (
              <button
                key={c.id}
                onClick={() => toggleCountry(c.id)}
                disabled={isDisabled}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#FF6B35] text-white"
                    : isDisabled
                      ? "bg-[#F5F5F0] text-[#C4C4C0] cursor-not-allowed"
                      : "bg-[#F5F5F0] text-[#6B6B6B] hover:bg-[#E8E8E4]"
                }`}
              >
                <span>{c.flag}</span> {c.name}
              </button>
            )
          })}
        </div>
        {selected.length < 2 && (
          <p className="text-xs text-[#F59E0B] mt-3 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Select at least 2 countries to see the comparison
          </p>
        )}
      </div>

      {!showComparison ? (
        <div className="text-center py-20">
          <BarChart3 className="w-12 h-12 text-[#E8E8E4] mx-auto mb-4" />
          <p className="text-[#6B6B6B] text-lg font-medium">
            Select at least 2 countries to compare
          </p>
          <p className="text-[#9B9B9B] text-sm mt-2">
            Click the country pills above to add them to the comparison
          </p>
        </div>
      ) : (
        <>
          {/* Visual bar charts */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Visual Comparison
              </h2>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              {selectedCountries.map((c, i) => (
                <div key={c.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: BAR_COLORS[i] }}
                  />
                  <span className="text-sm text-[#1A1A1A]">
                    {c.flag} {c.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {METRICS.map((metric) => (
                <div key={metric.key} className="bg-white rounded-xl border border-[#E8E8E4] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[#1A1A1A]">
                      {metric.label}
                    </p>
                    <p className="text-xs text-[#9B9B9B]">
                      {metric.higherIsBetter ? "Higher is better" : "Lower is better"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {selectedCountries.map((c, i) => {
                      const val = getMetricValue(c, metric.key)
                      const barWidth = normalizeForBar(metric.key, val)
                      return (
                        <div key={c.id} className="flex items-center gap-3">
                          <span className="text-xs text-[#6B6B6B] w-20 shrink-0 text-right">
                            {c.name}
                          </span>
                          <div className="flex-1 h-6 bg-[#F5F5F0] rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${barWidth}%` }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: BAR_COLORS[i] }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#1A1A1A] w-20 shrink-0">
                            {formatMetricValue(metric.key, val)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed comparison table */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
              Detailed Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-3 pr-4 text-[#6B6B6B] font-semibold">
                      Metric
                    </th>
                    {selectedCountries.map((c) => (
                      <th key={c.id} className="text-center py-3 px-3 font-semibold text-[#1A1A1A]">
                        <span className="mr-1">{c.flag}</span> {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map((metric) => {
                    const bw = bestWorst[metric.key]
                    return (
                      <tr key={metric.key} className="border-b border-[#E8E8E4]">
                        <td className="py-3 pr-4 text-[#6B6B6B] font-medium">
                          {metric.label}
                        </td>
                        {selectedCountries.map((c) => {
                          const val = getMetricValue(c, metric.key)
                          const isBest = bw?.bestId === c.id
                          const isWorst = bw?.worstId === c.id && selectedCountries.length > 2
                          return (
                            <td
                              key={c.id}
                              className={`py-3 px-3 text-center font-semibold ${
                                isBest
                                  ? "bg-green-50 text-green-700"
                                  : isWorst
                                    ? "bg-red-50 text-red-600"
                                    : "text-[#1A1A1A]"
                              }`}
                            >
                              {formatMetricValue(metric.key, val)}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}

                  {/* Specializations row */}
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="py-3 pr-4 text-[#6B6B6B] font-medium">
                      Specializations
                    </td>
                    {selectedCountries.map((c) => (
                      <td key={c.id} className="py-3 px-3 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {c.specializations.map((s) => (
                            <span
                              key={s}
                              className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall ranking */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Overall Ranking
              </h2>
            </div>
            <p className="text-xs text-[#6B6B6B] mb-4">
              Weighted score: {PRODUCT_TYPES[productType].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rankings.map((c, i) => (
                <div
                  key={c.id}
                  className={`rounded-xl border p-5 text-center ${
                    i === 0
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white"
                  }`}
                >
                  <div
                    className={`text-3xl font-black mb-2 ${
                      i === 0 ? "text-[#FF6B35]" : "text-[#6B6B6B]"
                    }`}
                  >
                    #{i + 1}
                  </div>
                  <div className="text-2xl mb-1">{c.flag}</div>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1">
                    {c.name}
                  </p>
                  <p
                    className={`text-lg font-black ${
                      i === 0 ? "text-[#FF6B35]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {c.score.toFixed(1)}
                  </p>
                  <p className="text-xs text-[#9B9B9B] mt-1">weighted score</p>

                  {/* Mini specialization tags */}
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {c.specializations.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Verdict */}
                  <p className="text-xs text-[#6B6B6B] mt-3 leading-relaxed text-left">
                    {generateVerdict(c, i, productType, rankings)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          {insights.length > 0 && (
            <div className="mb-10 bg-white rounded-2xl border border-[#E8E8E4] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
                <h2 className="text-xl font-bold text-[#1A1A1A]">Key Insights</h2>
              </div>
              <ul className="space-y-3">
                {insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FFF0EB] text-[#FF6B35] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* CTA */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Ready to source from the best country for your product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          &mdash; personalized country recommendations for your exact product.
        </p>
      </div>
    </div>
  )
}
