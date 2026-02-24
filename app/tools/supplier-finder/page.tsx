"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Search, Star, AlertTriangle, ExternalLink } from "lucide-react"

const CATEGORIES = [
  "Electronics",
  "Apparel",
  "Plastics",
  "Metal / Hardware",
  "Home Goods",
  "Beauty",
  "Food Packaging",
] as const

type Category = (typeof CATEGORIES)[number]

const PRIORITIES = [
  { id: "cost", label: "Lowest Cost" },
  { id: "quality", label: "Best Quality" },
  { id: "ip", label: "IP Safety" },
  { id: "speed", label: "Fastest Speed" },
  { id: "comm", label: "Communication" },
] as const

type PriorityId = (typeof PRIORITIES)[number]["id"]

const MOQ_RANGES = [
  { id: "under500", label: "Under 500", floor: 0 },
  { id: "500-2000", label: "500 - 2,000", floor: 500 },
  { id: "2000-5000", label: "2,000 - 5,000", floor: 2000 },
  { id: "5000+", label: "5,000+", floor: 5000 },
] as const

interface Region {
  name: string
  flag: string
  categories: Category[]
  cost: number
  quality: number
  ip: number
  speed: number
  comm: number
  moqFloor: number
  strengths: string[]
  weaknesses: string[]
  platforms: string[]
}

const REGIONS: Region[] = [
  {
    name: "Shenzhen, China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    categories: ["Electronics", "Plastics", "Metal / Hardware"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Massive electronics ecosystem", "Fast prototyping turnaround", "Wide range of component suppliers"],
    weaknesses: ["IP enforcement concerns", "Communication barriers", "Rising labor costs"],
    platforms: ["Alibaba", "Global Sources", "Made-in-China"],
  },
  {
    name: "Dongguan, China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    categories: ["Home Goods", "Plastics"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Strong plastics & injection molding", "Established furniture/home goods clusters", "Good domestic logistics"],
    weaknesses: ["IP risk similar to other China hubs", "Less English-fluent workforce", "High MOQs for custom tooling"],
    platforms: ["Alibaba", "Made-in-China", "1688 (via agent)"],
  },
  {
    name: "Ho Chi Minh, Vietnam",
    flag: "\uD83C\uDDFB\uD83C\uDDF3",
    categories: ["Apparel"],
    cost: 9, quality: 6, ip: 5, speed: 5, comm: 5,
    moqFloor: 500,
    strengths: ["Very competitive labor costs", "Growing apparel export hub", "Favorable trade agreements (CPTPP)"],
    weaknesses: ["Smaller supplier base than China", "Longer lead times for complex items", "Infrastructure still developing"],
    platforms: ["Alibaba", "Vietnam Trade", "Kompass"],
  },
  {
    name: "Dhaka, Bangladesh",
    flag: "\uD83C\uDDE7\uD83C\uDDE9",
    categories: ["Apparel"],
    cost: 10, quality: 5, ip: 4, speed: 4, comm: 4,
    moqFloor: 2000,
    strengths: ["Lowest labor costs globally", "World\u2019s #2 apparel exporter", "Duty-free access to many markets"],
    weaknesses: ["Quality control challenges", "Long lead times (50+ days)", "Infrastructure & port congestion"],
    platforms: ["Alibaba", "Bangladesh Yellow Pages", "Kompass"],
  },
  {
    name: "Gujarat, India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    categories: ["Apparel", "Metal / Hardware", "Beauty", "Food Packaging"],
    cost: 9, quality: 6, ip: 6, speed: 5, comm: 7,
    moqFloor: 500,
    strengths: ["English-speaking workforce", "Strong textiles & chemicals", "Diverse manufacturing capabilities"],
    weaknesses: ["Inconsistent quality between factories", "Bureaucratic delays", "Port infrastructure varies"],
    platforms: ["IndiaMART", "Alibaba", "TradeIndia"],
  },
  {
    name: "Monterrey, Mexico",
    flag: "\uD83C\uDDF2\uD83C\uDDFD",
    categories: ["Electronics", "Metal / Hardware", "Plastics"],
    cost: 5, quality: 7, ip: 7, speed: 9, comm: 8,
    moqFloor: 500,
    strengths: ["Near-shore speed (1-2 week shipping to US)", "USMCA = 0% tariff to US", "Strong IP protections"],
    weaknesses: ["Higher labor costs than Asia", "Smaller supplier base", "Limited capacity for textiles"],
    platforms: ["Alibaba", "Thomasnet", "Kompass"],
  },
  {
    name: "Istanbul, Turkey",
    flag: "\uD83C\uDDF9\uD83C\uDDF7",
    categories: ["Apparel", "Home Goods", "Beauty"],
    cost: 6, quality: 7, ip: 7, speed: 7, comm: 7,
    moqFloor: 500,
    strengths: ["Excellent quality for textiles & leather", "Bridge between Europe & Asia", "Low MOQs available"],
    weaknesses: ["Higher costs than SE Asia", "Currency volatility", "Limited electronics capacity"],
    platforms: ["Alibaba", "Turkishexporter", "Kompass"],
  },
  {
    name: "Thailand",
    flag: "\uD83C\uDDF9\uD83C\uDDED",
    categories: ["Food Packaging", "Beauty", "Plastics", "Electronics"],
    cost: 7, quality: 7, ip: 6, speed: 6, comm: 6,
    moqFloor: 500,
    strengths: ["Strong food-grade manufacturing", "Good automotive & plastics", "Stable business environment"],
    weaknesses: ["Higher costs than Vietnam/Bangladesh", "Smaller electronics ecosystem", "Language barriers outside Bangkok"],
    platforms: ["Alibaba", "Thai Trade", "Global Sources"],
  },
  {
    name: "Guangzhou, China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    categories: ["Beauty"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Dominant beauty & cosmetics cluster", "Fast iteration on packaging", "Competitive pricing at scale"],
    weaknesses: ["IP enforcement concerns", "Communication can be inconsistent", "Tariff exposure to US market"],
    platforms: ["Alibaba", "Global Sources", "Made-in-China"],
  },
  {
    name: "Seoul, South Korea",
    flag: "\uD83C\uDDF0\uD83C\uDDF7",
    categories: ["Electronics", "Beauty"],
    cost: 4, quality: 9, ip: 9, speed: 7, comm: 8,
    moqFloor: 500,
    strengths: ["World-class quality standards", "Excellent IP protection", "Innovation leader in beauty & electronics"],
    weaknesses: ["Highest manufacturing costs in list", "Lower cost competitiveness", "Smaller factory base for bulk orders"],
    platforms: ["Alibaba", "Tradekorea", "Global Sources"],
  },
]

function computeMatchScore(region: Region, priority: PriorityId): number {
  const weights: Record<PriorityId, number> = {
    cost: 0.15,
    quality: 0.15,
    ip: 0.15,
    speed: 0.15,
    comm: 0.15,
  }
  // Boost the selected priority to 40%, divide remaining 60% across other 4
  weights[priority] = 0.40
  const remaining = (1 - 0.40) / 4
  for (const key of Object.keys(weights) as PriorityId[]) {
    if (key !== priority) weights[key] = remaining
  }

  const raw =
    region.cost * weights.cost +
    region.quality * weights.quality +
    region.ip * weights.ip +
    region.speed * weights.speed +
    region.comm * weights.comm

  // Normalize from 0-10 scale to 0-100
  return Math.round(raw * 10)
}

function scoreColor(score: number): string {
  if (score >= 8) return "#22C55E"
  if (score >= 6) return "#F59E0B"
  return "#EF4444"
}

function matchLabel(score: number): { text: string; bg: string; fg: string } {
  if (score >= 90) return { text: "Excellent", bg: "bg-green-100", fg: "text-green-700" }
  if (score >= 70) return { text: "Good", bg: "bg-orange-100", fg: "text-orange-700" }
  return { text: "Possible", bg: "bg-red-100", fg: "text-red-700" }
}

export default function SupplierFinderPage() {
  const [category, setCategory] = useState<Category | "">("")
  const [priority, setPriority] = useState<PriorityId>("cost")
  const [moqRange, setMoqRange] = useState("under500")

  const selectedMoq = MOQ_RANGES.find((m) => m.id === moqRange)!

  const results = useMemo(() => {
    if (!category) return []

    return REGIONS
      .filter((r) => r.categories.includes(category as Category))
      .filter((r) => r.moqFloor <= selectedMoq.floor || selectedMoq.floor === 0)
      .map((r) => ({
        ...r,
        matchScore: computeMatchScore(r, priority),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [category, priority, moqRange, selectedMoq.floor])

  const metrics: { key: keyof Region; label: string }[] = [
    { key: "cost", label: "Cost Competitiveness" },
    { key: "quality", label: "Quality" },
    { key: "ip", label: "IP Safety" },
    { key: "speed", label: "Speed" },
    { key: "comm", label: "Communication" },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
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
          <MapPin className="w-5 h-5 text-[#FF6B35]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
          Supplier Finder
        </h1>
      </div>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Find the best manufacturing regions for your product. Filter by category
        and priorities to see scored recommendations based on cost, quality, IP
        safety, speed, and communication.
      </p>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-10 space-y-6">
        {/* Product Category */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Product Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "")}
            className="w-full bg-[#FAFAF8] border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm"
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Top Priority */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Top Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priority === p.id
                    ? "bg-[#FF6B35] text-white"
                    : "bg-[#F5F5F0] text-[#6B6B6B] hover:bg-[#E8E8E4]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* MOQ Range */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            MOQ Range
          </label>
          <select
            value={moqRange}
            onChange={(e) => setMoqRange(e.target.value)}
            className="w-full bg-[#FAFAF8] border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm"
          >
            {MOQ_RANGES.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {!category ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-[#E8E8E4] mx-auto mb-4" />
          <p className="text-[#6B6B6B] text-lg font-medium">
            Select a product category to find matching regions
          </p>
          <p className="text-[#9B9B9B] text-sm mt-2">
            We&apos;ll score manufacturing regions based on your priorities
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <AlertTriangle className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
          <p className="text-[#6B6B6B] text-lg font-medium">
            No regions match your filters
          </p>
          <p className="text-[#9B9B9B] text-sm mt-2">
            Try adjusting the MOQ range or selecting a different category
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#6B6B6B] mb-4">
            {results.length} region{results.length !== 1 ? "s" : ""} found for{" "}
            <span className="font-semibold text-[#1A1A1A]">{category}</span>
          </p>

          <div className="space-y-6">
            {results.map((region) => {
              const label = matchLabel(region.matchScore)
              return (
                <div
                  key={region.name}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:border-[#FF6B35] transition-colors"
                >
                  {/* Card header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{region.flag}</span>
                      <div>
                        <h3 className="text-lg font-bold text-[#1A1A1A]">
                          {region.name}
                        </h3>
                        <p className="text-xs text-[#6B6B6B]">
                          {region.categories.join(" \u00B7 ")}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${label.bg} ${label.fg}`}>
                      {region.matchScore}% \u2014 {label.text}
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-5">
                    {metrics.map((m) => {
                      const val = region[m.key] as number
                      const color = scoreColor(val)
                      return (
                        <div key={m.key}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-[#6B6B6B]">{m.label}</span>
                            <span className="text-xs font-bold" style={{ color }}>
                              {val}/10
                            </span>
                          </div>
                          <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${val * 10}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-xs font-semibold text-[#22C55E] mb-2 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Strengths
                      </p>
                      <ul className="space-y-1">
                        {region.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2">
                            <span className="text-[#22C55E] mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#EF4444] mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Weaknesses
                      </p>
                      <ul className="space-y-1">
                        {region.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2">
                            <span className="text-[#EF4444] mt-0.5">-</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Platform tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[#6B6B6B]">Find suppliers on:</span>
                    {region.platforms.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1 text-xs bg-[#F5F5F0] text-[#6B6B6B] px-3 py-1 rounded-full"
                      >
                        <ExternalLink className="w-3 h-3" /> {p}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want a vetted list of verified suppliers for your exact product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          &mdash; includes real supplier recommendations tailored to your needs.
        </p>
      </div>
    </div>
  )
}
