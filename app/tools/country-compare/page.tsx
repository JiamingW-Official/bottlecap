"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Globe,
  Trophy,
  Info,
  Lightbulb,
  Sliders,
  Calculator,
  Clock,
  Camera,
  Sparkles,
} from "lucide-react"
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

// ── Tariff calculator ─────────────────────────────────────────────────────────
// MFN base rates by first-2-digit HS chapter (illustrative estimates)
const HS_MFN_RATES: Record<string, number> = {
  "39": 5.3,  // Plastics
  "85": 1.7,  // Electrical / Electronics
  "84": 2.0,  // Machinery
  "61": 16.5, // Knit apparel
  "62": 16.5, // Woven apparel
  "63": 9.8,  // Other made-up textiles
  "64": 10.0, // Footwear
  "94": 0.0,  // Furniture
  "33": 4.9,  // Cosmetics / essential oils
  "90": 1.7,  // Medical / optical instruments
  "73": 4.9,  // Steel articles
  "76": 5.7,  // Aluminium articles
  "95": 0.0,  // Toys / games
  "42": 8.0,  // Leather goods
}
const DEFAULT_MFN = 6.0
const CHINA_301_EXTRA = 25.0 // Additional Section 301 tariff for China (most goods)

function getMfnRate(hsCode: string): number {
  const chapter = hsCode.slice(0, 2)
  return HS_MFN_RATES[chapter] ?? DEFAULT_MFN
}

function getTariffForCountry(country: CountryData, hsCode: string): number {
  if (!hsCode || hsCode.length < 2) return country.tariff
  const mfn = getMfnRate(hsCode)
  if (country.id === "china") return mfn + CHINA_301_EXTRA
  if (country.tariff === 0) return 0 // USMCA / FTA
  return mfn
}

// ── Timeline data ─────────────────────────────────────────────────────────────
interface TimelineData {
  sampleDays: number
  productionMin: number
  productionMax: number
  freightMin: number
  freightMax: number
}

const TIMELINE: Record<string, TimelineData> = {
  china:      { sampleDays: 10, productionMin: 20, productionMax: 35, freightMin: 18, freightMax: 22 },
  vietnam:    { sampleDays: 12, productionMin: 30, productionMax: 45, freightMin: 25, freightMax: 30 },
  india:      { sampleDays: 14, productionMin: 30, productionMax: 50, freightMin: 20, freightMax: 28 },
  mexico:     { sampleDays: 7,  productionMin: 15, productionMax: 25, freightMin: 5,  freightMax: 8  },
  thailand:   { sampleDays: 10, productionMin: 25, productionMax: 40, freightMin: 22, freightMax: 28 },
  turkey:     { sampleDays: 10, productionMin: 20, productionMax: 35, freightMin: 14, freightMax: 18 },
  indonesia:  { sampleDays: 12, productionMin: 30, productionMax: 45, freightMin: 22, freightMax: 28 },
  bangladesh: { sampleDays: 14, productionMin: 35, productionMax: 55, freightMin: 20, freightMax: 26 },
  southkorea: { sampleDays: 8,  productionMin: 20, productionMax: 30, freightMin: 16, freightMax: 20 },
  taiwan:     { sampleDays: 8,  productionMin: 20, productionMax: 32, freightMin: 16, freightMax: 20 },
  philippines:{ sampleDays: 12, productionMin: 30, productionMax: 45, freightMin: 22, freightMax: 28 },
  poland:     { sampleDays: 7,  productionMin: 18, productionMax: 30, freightMin: 18, freightMax: 25 },
}

function getTimeline(id: string): TimelineData {
  return TIMELINE[id] ?? { sampleDays: 10, productionMin: 25, productionMax: 40, freightMin: 20, freightMax: 28 }
}

function totalMaxDays(id: string): number {
  const t = getTimeline(id)
  return t.sampleDays + t.productionMax + t.freightMax
}

// ── Priority engine ───────────────────────────────────────────────────────────
type Priority = "cost" | "speed" | "risk" | "quality"

const PRIORITY_LABELS: Record<Priority, string> = {
  cost: "Lowest Cost",
  speed: "Fastest Lead Time",
  risk: "Least Risk",
  quality: "Best Quality",
}

const PRIORITY_WEIGHTS: Record<Priority, { quality: number; cost: number; ip: number; speed: number; infrastructure: number; tariff: number }> = {
  cost:    { quality: 0.05, cost: 0.55, ip: 0.05, speed: 0.15, infrastructure: 0.10, tariff: 0.10 },
  speed:   { quality: 0.10, cost: 0.10, ip: 0.05, speed: 0.60, infrastructure: 0.10, tariff: 0.05 },
  risk:    { quality: 0.15, cost: 0.05, ip: 0.40, speed: 0.05, infrastructure: 0.20, tariff: 0.15 },
  quality: { quality: 0.60, cost: 0.05, ip: 0.15, speed: 0.05, infrastructure: 0.15, tariff: 0.00 },
}

function computePriorityScore(
  country: CountryData,
  priority: Priority,
  maxLabor: number,
  maxLead: number,
  maxTariff: number
): number {
  const w = PRIORITY_WEIGHTS[priority]
  const costScore = maxLabor > 0 ? ((maxLabor - country.labor) / maxLabor) * 10 : 5
  const speedScore = maxLead > 0 ? ((maxLead - country.leadDays) / maxLead) * 10 : 5
  const tariffScore = maxTariff > 0 ? ((maxTariff - country.tariff) / maxTariff) * 10 : 5
  return (
    country.quality * w.quality +
    costScore * w.cost +
    country.ip * w.ip +
    speedScore * w.speed +
    country.infrastructure * w.infrastructure +
    tariffScore * w.tariff
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────
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

  const sorted = [...countries].sort((a, b) => a.labor - b.labor)
  const cheapest = sorted[0]
  const priciest = sorted[sorted.length - 1]
  if (cheapest.id !== priciest.id) {
    const pct = Math.round(((priciest.labor - cheapest.labor) / priciest.labor) * 100)
    insights.push(
      `${cheapest.name} has ${pct}% lower labor cost than ${priciest.name} ($${cheapest.labor.toFixed(2)}/hr vs $${priciest.labor.toFixed(2)}/hr).`
    )
  }

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

  const fastestLead = [...countries].sort((a, b) => a.leadDays - b.leadDays)[0]
  const slowestLead = [...countries].sort((a, b) => b.leadDays - a.leadDays)[0]
  if (fastestLead.id !== slowestLead.id) {
    const diff = slowestLead.leadDays - fastestLead.leadDays
    insights.push(
      `${fastestLead.name} delivers ${diff} days faster than ${slowestLead.name} (${fastestLead.leadDays} vs ${slowestLead.leadDays} days avg lead time).`
    )
  }

  const bestIP = [...countries].sort((a, b) => b.ip - a.ip)[0]
  const worstIP = [...countries].sort((a, b) => a.ip - b.ip)[0]
  if (bestIP.id !== worstIP.id && bestIP.ip !== worstIP.ip) {
    insights.push(
      `${bestIP.name} offers significantly stronger IP protection (${bestIP.ip}/10) than ${worstIP.name} (${worstIP.ip}/10) — critical for proprietary designs.`
    )
  }

  return insights.slice(0, 4)
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CountryComparePage() {
  const [selected, setSelected] = useState<string[]>(["china", "mexico"])
  const [productType, setProductType] = useState<ProductType>("general")

  // Priority engine state
  const [priority, setPriority] = useState<Priority>("cost")

  // Tariff calculator state
  const [hsCode, setHsCode] = useState("")
  const [orderValue, setOrderValue] = useState("")

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

  // Priority-engine rankings
  const priorityRankings = useMemo(() => {
    if (selectedCountries.length < 2) return []
    const maxLabor = Math.max(...selectedCountries.map((c) => c.labor))
    const maxLead = Math.max(...selectedCountries.map((c) => c.leadDays))
    const maxTariff = Math.max(...selectedCountries.map((c) => c.tariff))
    return selectedCountries
      .map((c) => ({
        ...c,
        priorityScore: Math.round(computePriorityScore(c, priority, maxLabor, maxLead, maxTariff) * 10) / 10,
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore)
  }, [selectedCountries, priority])

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

  // Tariff calculator derived values
  const tariffResults = useMemo(() => {
    if (!orderValue || isNaN(Number(orderValue)) || selectedCountries.length === 0) return []
    const val = Number(orderValue)
    return selectedCountries.map((c) => {
      const rate = getTariffForCountry(c, hsCode)
      const duty = (rate / 100) * val
      const retailMargin = val * 3
      const marginImpact = retailMargin > 0 ? (duty / retailMargin) * 100 : 0
      return { ...c, rate, duty, marginImpact }
    })
  }, [selectedCountries, hsCode, orderValue])

  // Timeline max for scaling bars
  const timelineMax = useMemo(() => {
    if (selectedCountries.length === 0) return 120
    return Math.max(...selectedCountries.map((c) => totalMaxDays(c.id)), 60)
  }, [selectedCountries])

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

          {/* ── 1. "Right country for you?" priority engine ──────────────────── */}
          <div className="mb-10 bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Right Country for You?
              </h2>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-5">
              Tell us what matters most and we will re-rank your selected countries accordingly.
            </p>

            {/* Priority radio buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPriority(key)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all text-center ${
                    priority === key
                      ? "border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]"
                      : "border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Ranked recommendation list */}
            <p className="text-xs text-[#9B9B9B] mb-3 uppercase tracking-wide font-semibold">
              Based on your priority: {PRIORITY_LABELS[priority]}
            </p>
            <div className="space-y-3">
              {priorityRankings.map((c, i) => {
                const maxScore = priorityRankings[0]?.priorityScore ?? 10
                const barPct = maxScore > 0 ? (c.priorityScore / maxScore) * 100 : 0
                return (
                  <div key={c.id} className="flex items-center gap-4">
                    <span
                      className={`text-sm font-black w-6 text-center ${
                        i === 0 ? "text-[#FF6B35]" : "text-[#9B9B9B]"
                      }`}
                    >
                      #{i + 1}
                    </span>
                    <span className="text-base">{c.flag}</span>
                    <span className="text-sm font-semibold text-[#1A1A1A] w-28 shrink-0">
                      {c.name}
                    </span>
                    <div className="flex-1 h-5 bg-[#F5F5F0] rounded-full overflow-hidden">
                      <motion.div
                        key={`${c.id}-${priority}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${barPct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: i === 0 ? "#FF6B35" : "#CBD5E1" }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] w-10 text-right shrink-0">
                      {c.priorityScore.toFixed(1)}
                    </span>
                  </div>
                )
              })}
            </div>
            {priorityRankings.length > 0 && (
              <p className="mt-4 text-sm font-semibold text-[#FF6B35]">
                Based on your priorities: {priorityRankings[0].name} ranks #1 for your product.
              </p>
            )}
          </div>

          {/* ── Mid-page "Ask Bottlecap AI" CTA ────────────────────────────── */}
          <div className="mb-10 rounded-2xl border-2 border-[#FF6B35] bg-[#FFF0EB] p-8 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2">
              Not sure which country fits your specific product?
            </h3>
            <p className="text-sm text-[#6B6B6B] mb-5 max-w-md mx-auto">
              Our AI report compares countries based on your exact product description — including MOQs, factory recommendations, and real supplier leads.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#e55a25] transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Get Your AI Sourcing Report
            </Link>
            <p className="text-xs text-[#9B9B9B] mt-3">
              2-5 min delivery &middot; $99 one-time &middot; Money-back guarantee
            </p>
          </div>

          {/* ── 2. Tariff exposure calculator ───────────────────────────────── */}
          <div className="mb-10 bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Tariff Exposure Calculator
              </h2>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-5">
              Estimate total import duties for each compared country. China includes Section 301 surcharges; USMCA/FTA countries show $0.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  HS Code (first 4 digits)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 3926"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
                <p className="text-[10px] text-[#9B9B9B] mt-1">
                  Leave blank to use country default tariff rates
                </p>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Order Value (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 15000"
                  value={orderValue}
                  onChange={(e) => setOrderValue(e.target.value)}
                  className="w-full border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>
            </div>

            {tariffResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#E8E8E4]">
                      <th className="text-left py-2 pr-4 text-[#6B6B6B] font-semibold">Country</th>
                      <th className="text-right py-2 px-3 text-[#6B6B6B] font-semibold">Duty Rate</th>
                      <th className="text-right py-2 px-3 text-[#6B6B6B] font-semibold">Total Duty</th>
                      <th className="text-right py-2 px-3 text-[#6B6B6B] font-semibold">Margin Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tariffResults
                      .slice()
                      .sort((a, b) => a.duty - b.duty)
                      .map((r) => (
                        <tr key={r.id} className="border-b border-[#E8E8E4]">
                          <td className="py-2.5 pr-4 font-medium text-[#1A1A1A]">
                            {r.flag} {r.name}
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-[#1A1A1A]">
                            {r.rate.toFixed(1)}%
                            {r.id === "china" && (
                              <span className="ml-1 text-[10px] text-red-500 font-normal">(+301)</span>
                            )}
                          </td>
                          <td
                            className={`py-2.5 px-3 text-right font-bold ${
                              r.duty === 0 ? "text-green-600" : "text-[#1A1A1A]"
                            }`}
                          >
                            {r.duty === 0 ? "$0" : `$${Math.round(r.duty).toLocaleString()}`}
                          </td>
                          <td
                            className={`py-2.5 px-3 text-right font-semibold text-sm ${
                              r.marginImpact > 10
                                ? "text-red-600"
                                : r.marginImpact > 5
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {r.marginImpact.toFixed(1)}% of margin
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-[#9B9B9B] mt-3">
                  Margin impact assumes 3x retail markup on order value. Rates are illustrative MFN estimates — verify with a customs broker before importing.
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-[#9B9B9B] text-sm">
                Enter an order value above to calculate duty exposure
              </div>
            )}
          </div>

          {/* ── 3. Timeline comparison (Gantt-style) ────────────────────────── */}
          <div className="mb-10 bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Timeline to First Delivery
              </h2>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Estimated days from placing order to product on shelf in the US. Includes sample approval, production, and sea freight.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-5 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#CBD5E1]" />
                <span className="text-[#6B6B6B]">Sample (1-2 wks)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#FF6B35]" />
                <span className="text-[#6B6B6B]">Production</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#3B82F6]" />
                <span className="text-[#6B6B6B]">Sea Freight to US</span>
              </div>
            </div>

            <div className="space-y-5">
              {selectedCountries.map((c, ci) => {
                const t = getTimeline(c.id)
                const scale = (days: number) =>
                  Math.round((days / timelineMax) * 100)
                const totalMin = t.sampleDays + t.productionMin + t.freightMin
                const totalMax = t.sampleDays + t.productionMax + t.freightMax
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-[#1A1A1A]">
                        {c.flag} {c.name}
                      </span>
                      <span className="text-xs text-[#6B6B6B]">
                        {totalMin}–{totalMax} days total
                      </span>
                    </div>
                    <div className="flex h-6 rounded-lg overflow-hidden bg-[#F5F5F0] gap-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scale(t.sampleDays)}%` }}
                        transition={{ duration: 0.5, delay: ci * 0.06 }}
                        className="h-full bg-[#CBD5E1] flex items-center justify-center"
                        title={`Sample: ${t.sampleDays} days`}
                      >
                        {scale(t.sampleDays) > 6 && (
                          <span className="text-[9px] text-white font-bold px-1 truncate">
                            {t.sampleDays}d
                          </span>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scale(t.productionMax)}%` }}
                        transition={{ duration: 0.5, delay: ci * 0.06 + 0.1 }}
                        className="h-full bg-[#FF6B35] flex items-center justify-center"
                        title={`Production: ${t.productionMin}–${t.productionMax} days`}
                      >
                        {scale(t.productionMax) > 8 && (
                          <span className="text-[9px] text-white font-bold px-1 truncate">
                            {t.productionMin}–{t.productionMax}d
                          </span>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scale(t.freightMax)}%` }}
                        transition={{ duration: 0.5, delay: ci * 0.06 + 0.2 }}
                        className="h-full bg-[#3B82F6] flex items-center justify-center"
                        title={`Sea freight: ${t.freightMin}–${t.freightMax} days`}
                      >
                        {scale(t.freightMax) > 6 && (
                          <span className="text-[9px] text-white font-bold px-1 truncate">
                            {t.freightMin}–{t.freightMax}d
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-[10px] text-[#9B9B9B] mt-4">
              Estimates assume sea freight to US West Coast. Air freight reduces transit by ~80%. Production times vary by factory and order size.
            </p>
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

          {/* ── 4. Decision matrix screenshot card ──────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Decision Matrix
              </h2>
            </div>
            <p className="text-xs text-[#9B9B9B] mb-4 flex items-center gap-1">
              <Camera className="w-3 h-3" />
              Screenshot this summary to share with your team
            </p>

            <div className="bg-white border-2 border-[#E8E8E4] rounded-2xl overflow-hidden">
              {/* Card header */}
              <div className="bg-[#1A1A1A] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-white text-sm font-bold">Bottlecap Country Matrix</span>
                </div>
                <span className="text-[#9B9B9B] text-xs">bottlecap.ai</span>
              </div>

              {/* Matrix table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F5F5F0] border-b border-[#E8E8E4]">
                      <th className="text-left py-3 px-4 font-bold text-[#1A1A1A]">Metric</th>
                      {rankings.map((c, i) => (
                        <th key={c.id} className="text-center py-3 px-3 font-bold text-[#1A1A1A]">
                          <span>{c.flag}</span>{" "}
                          {c.name}
                          {i === 0 && (
                            <span className="ml-1 text-[#FF6B35] text-[9px] font-black uppercase tracking-wide">
                              #1
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {METRICS.map((metric) => {
                      const bw = bestWorst[metric.key]
                      return (
                        <tr key={metric.key} className="border-b border-[#E8E8E4]">
                          <td className="py-2.5 px-4 text-[#6B6B6B] font-medium">
                            {metric.label}
                          </td>
                          {rankings.map((c) => {
                            const val = getMetricValue(c, metric.key)
                            const isBest = bw?.bestId === c.id
                            return (
                              <td
                                key={c.id}
                                className={`py-2.5 px-3 text-center ${
                                  isBest
                                    ? "font-black text-[#22C55E]"
                                    : "font-semibold text-[#1A1A1A]"
                                }`}
                              >
                                {isBest && "★ "}
                                {formatMetricValue(metric.key, val)}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                    {/* Weighted score row */}
                    <tr className="bg-[#FFF0EB]">
                      <td className="py-3 px-4 font-black text-[#1A1A1A]">
                        Weighted Score
                      </td>
                      {rankings.map((c, i) => (
                        <td
                          key={c.id}
                          className={`py-3 px-3 text-center font-black ${
                            i === 0 ? "text-[#FF6B35]" : "text-[#1A1A1A]"
                          }`}
                        >
                          {c.score.toFixed(1)}
                          {i === 0 && " 🏆"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 bg-[#F5F5F0] border-t border-[#E8E8E4]">
                <p className="text-[10px] text-[#9B9B9B]">
                  Generated by Bottlecap AI &middot; Product type: {PRODUCT_TYPES[productType].label} &middot; Green cells = winner in that metric
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom CTA */}
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
