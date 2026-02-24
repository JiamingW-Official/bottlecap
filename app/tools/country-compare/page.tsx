"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Globe, Trophy, Info } from "lucide-react"

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
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
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
    flag: "\uD83C\uDDFB\uD83C\uDDF3",
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
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
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
    flag: "\uD83C\uDDF2\uD83C\uDDFD",
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
    flag: "\uD83C\uDDF9\uD83C\uDDED",
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
    flag: "\uD83C\uDDF9\uD83C\uDDF7",
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
    flag: "\uD83C\uDDEE\uD83C\uDDE9",
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
    flag: "\uD83C\uDDE7\uD83C\uDDE9",
    labor: 0.95,
    quality: 5,
    leadDays: 50,
    ip: 3,
    infrastructure: 4,
    tariff: 15.6,
    specializations: ["Garments", "Knitwear", "Denim"],
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

export default function CountryComparePage() {
  const [selected, setSelected] = useState<string[]>(["china", "mexico"])

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

  // Overall ranking: quality 25%, cost 20%, IP 20%, speed 20%, infrastructure 15%
  const rankings = useMemo(() => {
    if (selectedCountries.length < 2) return []

    // Normalize each metric to 0-10 score (higher is better)
    const maxLabor = Math.max(...selectedCountries.map((c) => c.labor))
    const maxLead = Math.max(...selectedCountries.map((c) => c.leadDays))
    const maxTariff = Math.max(...selectedCountries.map((c) => c.tariff))

    return selectedCountries
      .map((c) => {
        const costScore = maxLabor > 0 ? ((maxLabor - c.labor) / maxLabor) * 10 : 5
        const speedScore = maxLead > 0 ? ((maxLead - c.leadDays) / maxLead) * 10 : 5
        const tariffPenalty = maxTariff > 0 ? ((maxTariff - c.tariff) / maxTariff) * 2 : 0

        const weighted =
          c.quality * 0.25 +
          costScore * 0.20 +
          c.ip * 0.20 +
          speedScore * 0.20 +
          c.infrastructure * 0.15 +
          tariffPenalty * 0.00 // tariff factored into cost implicitly

        // Alternative: include tariff directly
        const score =
          c.quality * 0.25 +
          costScore * 0.20 +
          c.ip * 0.20 +
          speedScore * 0.20 +
          c.infrastructure * 0.15

        return { ...c, score: Math.round(score * 10) / 10 }
      })
      .sort((a, b) => b.score - a.score)
  }, [selectedCountries])

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
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: BAR_COLORS[i],
                              }}
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
              Weighted score: Quality 25% + Cost 20% + IP Protection 20% + Speed 20% + Infrastructure 15%
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
                </div>
              ))}
            </div>
          </div>
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
