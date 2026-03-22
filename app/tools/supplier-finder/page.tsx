"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Search,
  Star,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  { id: "cost", label: "Lowest Cost", icon: "💰" },
  { id: "quality", label: "Best Quality", icon: "⭐" },
  { id: "ip", label: "IP Safety", icon: "🔒" },
  { id: "speed", label: "Fastest Speed", icon: "⚡" },
  { id: "comm", label: "Communication", icon: "💬" },
] as const

type PriorityId = (typeof PRIORITIES)[number]["id"]

const MOQ_RANGES = [
  { id: "under500", label: "Under 500", floor: 0 },
  { id: "500-2000", label: "500 – 2,000", floor: 500 },
  { id: "2000-5000", label: "2,000 – 5,000", floor: 2000 },
  { id: "5000+", label: "5,000+", floor: 5000 },
] as const

type SortOption = "match" | "cost" | "quality" | "speed"

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "match", label: "Best Match" },
  { id: "cost", label: "Lowest Cost" },
  { id: "quality", label: "Best Quality" },
  { id: "speed", label: "Fastest Speed" },
]

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
    flag: "🇨🇳",
    categories: ["Electronics", "Plastics", "Metal / Hardware"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Massive electronics ecosystem", "Fast prototyping turnaround", "Wide range of component suppliers"],
    weaknesses: ["IP enforcement concerns", "Communication barriers", "Rising labor costs"],
    platforms: ["Alibaba", "Global Sources", "Made-in-China"],
  },
  {
    name: "Dongguan, China",
    flag: "🇨🇳",
    categories: ["Home Goods", "Plastics"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Strong plastics & injection molding", "Established furniture/home goods clusters", "Good domestic logistics"],
    weaknesses: ["IP risk similar to other China hubs", "Less English-fluent workforce", "High MOQs for custom tooling"],
    platforms: ["Alibaba", "Made-in-China", "1688 (via agent)"],
  },
  {
    name: "Ho Chi Minh, Vietnam",
    flag: "🇻🇳",
    categories: ["Apparel"],
    cost: 9, quality: 6, ip: 5, speed: 5, comm: 5,
    moqFloor: 500,
    strengths: ["Very competitive labor costs", "Growing apparel export hub", "Favorable trade agreements (CPTPP)"],
    weaknesses: ["Smaller supplier base than China", "Longer lead times for complex items", "Infrastructure still developing"],
    platforms: ["Alibaba", "Vietnam Trade", "Kompass"],
  },
  {
    name: "Dhaka, Bangladesh",
    flag: "🇧🇩",
    categories: ["Apparel"],
    cost: 10, quality: 5, ip: 4, speed: 4, comm: 4,
    moqFloor: 2000,
    strengths: ["Lowest labor costs globally", "World's #2 apparel exporter", "Duty-free access to many markets"],
    weaknesses: ["Quality control challenges", "Long lead times (50+ days)", "Infrastructure & port congestion"],
    platforms: ["Alibaba", "Bangladesh Yellow Pages", "Kompass"],
  },
  {
    name: "Gujarat, India",
    flag: "🇮🇳",
    categories: ["Apparel", "Metal / Hardware", "Beauty", "Food Packaging"],
    cost: 9, quality: 6, ip: 6, speed: 5, comm: 7,
    moqFloor: 500,
    strengths: ["English-speaking workforce", "Strong textiles & chemicals", "Diverse manufacturing capabilities"],
    weaknesses: ["Inconsistent quality between factories", "Bureaucratic delays", "Port infrastructure varies"],
    platforms: ["IndiaMART", "Alibaba", "TradeIndia"],
  },
  {
    name: "Monterrey, Mexico",
    flag: "🇲🇽",
    categories: ["Electronics", "Metal / Hardware", "Plastics"],
    cost: 5, quality: 7, ip: 7, speed: 9, comm: 8,
    moqFloor: 500,
    strengths: ["Near-shore speed (1–2 week shipping to US)", "USMCA = 0% tariff to US", "Strong IP protections"],
    weaknesses: ["Higher labor costs than Asia", "Smaller supplier base", "Limited capacity for textiles"],
    platforms: ["Alibaba", "Thomasnet", "Kompass"],
  },
  {
    name: "Istanbul, Turkey",
    flag: "🇹🇷",
    categories: ["Apparel", "Home Goods", "Beauty"],
    cost: 6, quality: 7, ip: 7, speed: 7, comm: 7,
    moqFloor: 500,
    strengths: ["Excellent quality for textiles & leather", "Bridge between Europe & Asia", "Low MOQs available"],
    weaknesses: ["Higher costs than SE Asia", "Currency volatility", "Limited electronics capacity"],
    platforms: ["Alibaba", "Turkishexporter", "Kompass"],
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    categories: ["Food Packaging", "Beauty", "Plastics", "Electronics"],
    cost: 7, quality: 7, ip: 6, speed: 6, comm: 6,
    moqFloor: 500,
    strengths: ["Strong food-grade manufacturing", "Good automotive & plastics", "Stable business environment"],
    weaknesses: ["Higher costs than Vietnam/Bangladesh", "Smaller electronics ecosystem", "Language barriers outside Bangkok"],
    platforms: ["Alibaba", "Thai Trade", "Global Sources"],
  },
  {
    name: "Guangzhou, China",
    flag: "🇨🇳",
    categories: ["Beauty"],
    cost: 8, quality: 7, ip: 4, speed: 7, comm: 6,
    moqFloor: 500,
    strengths: ["Dominant beauty & cosmetics cluster", "Fast iteration on packaging", "Competitive pricing at scale"],
    weaknesses: ["IP enforcement concerns", "Communication can be inconsistent", "Tariff exposure to US market"],
    platforms: ["Alibaba", "Global Sources", "Made-in-China"],
  },
  {
    name: "Seoul, South Korea",
    flag: "🇰🇷",
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
  return Math.round(raw * 10)
}

function scoreColor(score: number): string {
  if (score >= 8) return "#22C55E"
  if (score >= 6) return "#F59E0B"
  return "#EF4444"
}

function matchBadge(score: number): { text: string; bg: string; fg: string; border: string } {
  if (score >= 80) return { text: "Excellent Match", bg: "#F0FDF4", fg: "#15803D", border: "#BBF7D0" }
  if (score >= 65) return { text: "Good Match", bg: "#FFF7ED", fg: "#C2410C", border: "#FED7AA" }
  return { text: "Possible Match", bg: "#FEF2F2", fg: "#B91C1C", border: "#FECACA" }
}

const metrics: { key: keyof Region; label: string; shortLabel: string }[] = [
  { key: "cost", label: "Cost Competitiveness", shortLabel: "Cost" },
  { key: "quality", label: "Quality", shortLabel: "Quality" },
  { key: "ip", label: "IP Safety", shortLabel: "IP Safety" },
  { key: "speed", label: "Speed", shortLabel: "Speed" },
  { key: "comm", label: "Communication", shortLabel: "Comms" },
]

const CATEGORY_TOP: Record<Category, string> = {
  Electronics: "Tech Manufacturing",
  Apparel: "Garment Production",
  Plastics: "Injection Molding",
  "Metal / Hardware": "Metal Fabrication",
  "Home Goods": "Consumer Goods",
  Beauty: "Cosmetics & OEM",
  "Food Packaging": "Food-Grade Mfg",
}

export default function SupplierFinderPage() {
  const [category, setCategory] = useState<Category | "">("")
  const [priority, setPriority] = useState<PriorityId>("cost")
  const [moqRange, setMoqRange] = useState("under500")
  const [sortBy, setSortBy] = useState<SortOption>("match")
  const [filtersOpen, setFiltersOpen] = useState(true)

  const selectedMoq = MOQ_RANGES.find((m) => m.id === moqRange)!

  const hasFilters = category !== "" || priority !== "cost" || moqRange !== "under500"

  function resetFilters() {
    setCategory("")
    setPriority("cost")
    setMoqRange("under500")
    setSortBy("match")
  }

  const results = useMemo(() => {
    const filtered = REGIONS
      .filter((r) => !category || r.categories.includes(category as Category))
      .filter((r) => r.moqFloor <= selectedMoq.floor || selectedMoq.floor === 0)
      .map((r) => ({
        ...r,
        matchScore: computeMatchScore(r, priority),
      }))

    return filtered.sort((a, b) => {
      if (sortBy === "cost") return b.cost - a.cost
      if (sortBy === "quality") return b.quality - a.quality
      if (sortBy === "speed") return b.speed - a.speed
      return b.matchScore - a.matchScore
    })
  }, [category, priority, selectedMoq.floor, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps

  const showResults = results.length > 0
  const showEmpty = category !== "" && results.length === 0

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Top nav strip ── */}
      <div className="border-b border-[#E8E8E4] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-[#6B6B6B]">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-[#1A1A1A] transition-colors">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1A1A1A] font-medium">Supplier Finder</span>
        </div>
      </div>

      {/* ── Hero header ── */}
      <div className="bg-white border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFF0EB] rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-2">
                Find Your Manufacturing Region
              </h1>
              <p className="text-[#6B6B6B] max-w-2xl text-base leading-relaxed">
                Filter by product category, priorities, and MOQ to find your best-fit manufacturing
                region — then get a full analysis for $99.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[#E8E8E4]">
            {[
              { value: "12", label: "Regions scored" },
              { value: "7", label: "Product categories" },
              { value: "5", label: "Scoring dimensions" },
              { value: "Real", label: "Sourcing data" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-[#FF6B35]">{stat.value}</span>
                <span className="text-sm text-[#6B6B6B]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + results ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Filter sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              {/* Mobile toggle */}
              <button
                className="lg:hidden w-full flex items-center justify-between bg-white border border-[#E8E8E4] rounded-2xl px-5 py-3.5 mb-3 text-sm font-semibold text-[#1A1A1A]"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF6B35]" />
                  Filters
                  {category && (
                    <span className="bg-[#FF6B35] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">1</span>
                  )}
                </span>
                {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence initial={false}>
                {(filtersOpen || typeof window === "undefined") && (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden lg:overflow-visible"
                  >
                    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 space-y-7">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4 text-[#FF6B35]" />
                          Filters
                        </span>
                        {hasFilters && (
                          <button
                            onClick={resetFilters}
                            className="text-xs text-[#6B6B6B] hover:text-[#FF6B35] flex items-center gap-1 transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-3">
                          Product Category
                        </label>
                        <div className="space-y-1.5">
                          {CATEGORIES.map((c) => (
                            <button
                              key={c}
                              onClick={() => setCategory(category === c ? "" : c)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                                category === c
                                  ? "bg-[#FF6B35] text-white font-semibold"
                                  : "text-[#1A1A1A] hover:bg-[#F5F5F0]"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Priority — toggle chips */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-3">
                          Top Priority
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PRIORITIES.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setPriority(p.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                                priority === p.id
                                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                  : "bg-white text-[#6B6B6B] border-[#E8E8E4] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                              }`}
                            >
                              <span>{p.icon}</span>
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* MOQ — pills */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide mb-3">
                          Min. Order Qty
                        </label>
                        <div className="flex flex-col gap-1.5">
                          {MOQ_RANGES.map((m) => (
                            <button
                              key={m.id}
                              onClick={() => setMoqRange(m.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all border ${
                                moqRange === m.id
                                  ? "bg-[#FFF0EB] text-[#FF6B35] border-[#FF6B35] font-semibold"
                                  : "text-[#6B6B6B] border-transparent hover:bg-[#F5F5F0]"
                              }`}
                            >
                              {m.label} units
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          {/* ── Results panel ── */}
          <div className="flex-1 min-w-0">
            {/* Results toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="text-sm text-[#6B6B6B]">
                {category ? (
                  <>
                    <span className="font-semibold text-[#1A1A1A]">{results.length}</span>
                    {" "}region{results.length !== 1 ? "s" : ""} match{results.length === 1 ? "es" : ""}
                    {" "}for{" "}
                    <span className="font-semibold text-[#FF6B35]">{category}</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-[#1A1A1A]">{REGIONS.length}</span> regions available — select a category to filter
                  </>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B6B6B]">Sort:</span>
                <div className="flex gap-1 bg-white border border-[#E8E8E4] rounded-xl p-1">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        sortBy === s.id
                          ? "bg-[#1A1A1A] text-white"
                          : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* No category selected */}
            <AnimatePresence mode="wait">
              {!category && !showEmpty && (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-24 bg-white rounded-2xl border border-dashed border-[#E8E8E4]"
                >
                  <div className="w-16 h-16 bg-[#F5F5F0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#C8C8C4]" />
                  </div>
                  <p className="text-[#1A1A1A] font-semibold text-lg mb-1">
                    Select a product category
                  </p>
                  <p className="text-[#6B6B6B] text-sm max-w-xs mx-auto">
                    Choose a category from the filter panel to see scored manufacturing regions
                  </p>
                </motion.div>
              )}

              {/* Empty state */}
              {showEmpty && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-24 bg-white rounded-2xl border border-dashed border-[#E8E8E4]"
                >
                  <div className="w-16 h-16 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />
                  </div>
                  <p className="text-[#1A1A1A] font-semibold text-lg mb-1">
                    No regions match your filters
                  </p>
                  <p className="text-[#6B6B6B] text-sm max-w-xs mx-auto mb-5">
                    Try adjusting the MOQ range or selecting a different category
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F0] hover:bg-[#E8E8E4] rounded-xl text-sm font-medium text-[#1A1A1A] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset filters
                  </button>
                </motion.div>
              )}

              {/* Results list */}
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <AnimatePresence>
                    {results.map((region, idx) => {
                      const badge = matchBadge(region.matchScore)
                      const topCat = region.categories[0]

                      return (
                        <motion.div
                          key={region.name}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.25, delay: idx * 0.05 }}
                          className="bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-sm transition-all overflow-hidden"
                        >
                          {/* Card top bar with match score */}
                          <div className="h-1 w-full" style={{ backgroundColor: idx === 0 ? "#FF6B35" : "#E8E8E4" }} />

                          <div className="p-6">
                            {/* Header row */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">{region.flag}</span>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-[#1A1A1A]">{region.name}</h3>
                                    {idx === 0 && category && (
                                      <span className="inline-flex items-center gap-1 text-xs bg-[#FFF0EB] text-[#FF6B35] font-semibold px-2 py-0.5 rounded-full border border-[#FFD4C2]">
                                        <Star className="w-3 h-3" /> Top Pick
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {/* Best for chip */}
                                    {topCat && (
                                      <span className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full">
                                        Best for: {CATEGORY_TOP[topCat] ?? topCat}
                                      </span>
                                    )}
                                    <span className="text-xs text-[#9B9B9B]">
                                      MOQ from {region.moqFloor.toLocaleString()} units
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Match score badge */}
                              <div
                                className="flex flex-col items-center px-4 py-2 rounded-xl border"
                                style={{ backgroundColor: badge.bg, borderColor: badge.border }}
                              >
                                <span className="text-2xl font-black" style={{ color: badge.fg }}>
                                  {region.matchScore}%
                                </span>
                                <span className="text-xs font-semibold" style={{ color: badge.fg }}>
                                  {badge.text}
                                </span>
                              </div>
                            </div>

                            {/* Score bars — mini radar */}
                            <div className="bg-[#FAFAF8] rounded-xl p-4 mb-5 space-y-2.5">
                              {metrics.map((m) => {
                                const val = region[m.key] as number
                                const color = scoreColor(val)
                                const isSelected = m.key === priority
                                return (
                                  <div key={m.key} className="flex items-center gap-3">
                                    <span
                                      className={`text-xs w-16 flex-shrink-0 ${
                                        isSelected ? "font-semibold text-[#1A1A1A]" : "text-[#6B6B6B]"
                                      }`}
                                    >
                                      {m.shortLabel}
                                      {isSelected && (
                                        <span className="ml-1 text-[#FF6B35]">↑</span>
                                      )}
                                    </span>
                                    <div className="flex-1 h-2 bg-[#E8E8E4] rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${val * 10}%` }}
                                        transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                                      />
                                    </div>
                                    <span
                                      className="text-xs font-bold w-8 text-right"
                                      style={{ color }}
                                    >
                                      {val}/10
                                    </span>
                                  </div>
                                )
                              })}
                            </div>

                            {/* Strengths & Weaknesses */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                              <div>
                                <p className="text-xs font-semibold text-[#15803D] mb-2 flex items-center gap-1">
                                  <TrendingUp className="w-3.5 h-3.5" /> Strengths
                                </p>
                                <ul className="space-y-1.5">
                                  {region.strengths.slice(0, 3).map((s, i) => (
                                    <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2">
                                      <span className="text-[#22C55E] mt-0.5 flex-shrink-0 font-bold">✓</span>
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#B45309] mb-2 flex items-center gap-1">
                                  <TrendingDown className="w-3.5 h-3.5" /> Watch out for
                                </p>
                                <ul className="space-y-1.5">
                                  {region.weaknesses.slice(0, 2).map((w, i) => (
                                    <li key={i} className="text-xs text-[#1A1A1A] flex items-start gap-2">
                                      <span className="text-[#F59E0B] mt-0.5 flex-shrink-0 font-bold">⚠</span>
                                      {w}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Footer row: platforms + CTA */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E8E4]">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-[#9B9B9B]">Source on:</span>
                                {region.platforms.map((p) => (
                                  <span
                                    key={p}
                                    className="inline-flex items-center gap-1 text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2.5 py-1 rounded-full border border-[#E8E8E4] hover:border-[#1A1A1A] transition-colors cursor-default"
                                  >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                    {p}
                                  </span>
                                ))}
                              </div>

                              <Link
                                href="/analyze"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#e85c27] text-white text-xs font-semibold rounded-xl transition-colors"
                              >
                                <Zap className="w-3.5 h-3.5" />
                                Analyze for this region — $99
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-10 bg-[#1A1A1A] rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-black text-white mb-2">
                Want a full analysis for your specific product?
              </h2>
              <p className="text-[#9B9B9B] text-sm max-w-md mx-auto mb-6">
                Get a complete sourcing report in 2–5 minutes — supplier recommendations, tariff
                exposure, real MOQs, and a vetted shortlist tailored to your exact product.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#e85c27] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Get My Full Analysis — $99
                </Link>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Read the free guide
                </Link>
              </div>
              <p className="text-[#6B6B6B] text-xs mt-4">
                Money-back guarantee · Delivered in 2–5 minutes · Powered by Claude AI
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
