"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe2,
  Filter,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Clock,
  DollarSign,
  Shield,
  Zap,
  Star,
  HelpCircle,
} from "lucide-react"
import { MANUFACTURING_COUNTRIES, type ManufacturingCountry } from "@/lib/data/countries"

// ── Helpers ────────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

function laborColor(cost: number): string {
  if (cost < 3) return "#22C55E"
  if (cost <= 6) return "#F59E0B"
  return "#FF6B35"
}

function qualityColor(rating: number): string {
  if (rating > 7) return "#22C55E"
  if (rating >= 5) return "#F59E0B"
  return "#EF4444"
}

// ── Constants ──────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const ALL_REGIONS = [
  "All",
  "East Asia",
  "Southeast Asia",
  "South Asia",
  "Americas",
  "Europe",
] as const

function normaliseRegion(region: string): string {
  if (region === "North America") return "Americas"
  if (region.startsWith("Central Europe") || region.startsWith("Europe")) return "Europe"
  if (region === "Europe / Middle East") return "Europe"
  return region
}

// Tariff data for horizontal bar chart (US import duty, consumer goods)
const TARIFF_DATA = [
  { country: "Mexico", emoji: "🇲🇽", tariff: 0, color: "#22C55E" },
  { country: "Canada", emoji: "🇨🇦", tariff: 0, color: "#22C55E" },
  { country: "India", emoji: "🇮🇳", tariff: 3.5, color: "#84CC16" },
  { country: "Vietnam", emoji: "🇻🇳", tariff: 5.0, color: "#84CC16" },
  { country: "Bangladesh", emoji: "🇧🇩", tariff: 6.5, color: "#F59E0B" },
  { country: "Indonesia", emoji: "🇮🇩", tariff: 7.0, color: "#F59E0B" },
  { country: "Thailand", emoji: "🇹🇭", tariff: 8.5, color: "#F59E0B" },
  { country: "Poland", emoji: "🇵🇱", tariff: 12.0, color: "#EF4444" },
  { country: "South Korea", emoji: "🇰🇷", tariff: 14.5, color: "#EF4444" },
  { country: "Taiwan", emoji: "🇹🇼", tariff: 16.0, color: "#EF4444" },
  { country: "China", emoji: "🇨🇳", tariff: 22.5, color: "#DC2626" },
] as const

const MAX_TARIFF = 25

// Quiz config
type Priority = "Lowest cost" | "Fastest lead time" | "Highest quality"
type ProductType = "Electronics" | "Apparel" | "Consumer goods" | "Industrial"

interface QuizResult {
  country: string
  emoji: string
  reason: string
}

function getRecommendation(priority: Priority, productType: ProductType): QuizResult {
  if (priority === "Lowest cost" && productType === "Apparel")
    return { country: "Bangladesh", emoji: "🇧🇩", reason: "World-lowest labor costs ($0.95/hr) for garment manufacturing with established export infrastructure." }
  if (priority === "Lowest cost" && productType === "Electronics")
    return { country: "Vietnam", emoji: "🇻🇳", reason: "Fast-growing electronics hub with $3.20/hr labor and lower tariffs than China." }
  if (priority === "Lowest cost" && productType === "Consumer goods")
    return { country: "India", emoji: "🇮🇳", reason: "Large supplier base, $2.10/hr labor, and strong English-language communication." }
  if (priority === "Lowest cost" && productType === "Industrial")
    return { country: "China", emoji: "🇨🇳", reason: "Unmatched industrial supply chain depth despite higher tariffs. No other country matches tooling costs." }
  if (priority === "Fastest lead time")
    return { country: "Mexico", emoji: "🇲🇽", reason: "USMCA nearshore advantage — 14-18 day lead times with overland freight, no ocean shipping." }
  if (priority === "Highest quality" && productType === "Electronics")
    return { country: "Taiwan", emoji: "🇹🇼", reason: "9.2/10 quality rating, world-class semiconductor and precision electronics manufacturing." }
  if (priority === "Highest quality" && productType === "Industrial")
    return { country: "South Korea", emoji: "🇰🇷", reason: "9.0/10 quality rating with exceptional engineering precision for industrial components." }
  if (priority === "Highest quality" && productType === "Apparel")
    return { country: "Poland", emoji: "🇵🇱", reason: "European quality standards, 8.5/10 rating, strong for premium fashion manufacturing." }
  // Default highest quality consumer goods
  return { country: "South Korea", emoji: "🇰🇷", reason: "High quality rating and strong IP protection make it ideal for premium consumer goods." }
}

// ── Sub-components ─────────────────────────────────────────────────────

function StatChip({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
      {label}
    </div>
  )
}

function RegionPill({
  region,
  active,
  onClick,
}: {
  region: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
        active
          ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-sm"
          : "bg-white border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
      }`}
    >
      {region}
    </button>
  )
}

function CountryCard({ country }: { country: ManufacturingCountry }) {
  const slug = toSlug(country.name)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, ease: EASE }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] transition-colors duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      <Link href={`/manufacturers/${slug}`} className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none">{country.emoji}</span>
            <div>
              <h3 className="font-black text-[#1A1A1A] text-lg leading-tight">{country.name}</h3>
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF3EE] text-[#FF6B35] border border-[#FFD8C8]">
                {normaliseRegion(country.region)}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#C8C8C4] flex-shrink-0 mt-1" />
        </div>

        {/* Best-for tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {country.specializations.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2.5 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Quality rating dots */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-wide">Quality Rating</span>
            <span className="text-xs font-bold text-[#1A1A1A]">{country.qualityRating}/10</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full"
                style={{
                  background: i < country.qualityRating ? "#22C55E" : "#E8E8E4",
                }}
              />
            ))}
          </div>
        </div>

        {/* Stat blocks */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* Labor */}
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-[#767676]" />
              <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-wide">
                Labor/hr
              </span>
            </div>
            <span
              className="text-base font-black"
              style={{ color: laborColor(country.laborCostPerHour) }}
            >
              ${country.laborCostPerHour.toFixed(2)}
            </span>
          </div>

          {/* Lead Time */}
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#767676]" />
              <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-wide">
                Lead Time
              </span>
            </div>
            <span className="text-base font-black text-[#1A1A1A]">
              {country.avgLeadTimeDays}d
            </span>
          </div>

          {/* Tariff */}
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5 text-[#767676]" />
              <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-wide">
                Tariff
              </span>
            </div>
            <span className="text-base font-black text-[#1A1A1A]">
              {country.avgTariffToUS}%
            </span>
          </div>

          {/* Quality */}
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-[#767676]" />
              <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-wide">
                Quality
              </span>
            </div>
            <span
              className="text-base font-black"
              style={{ color: qualityColor(country.qualityRating) }}
            >
              {country.qualityRating}/10
            </span>
          </div>
        </div>

        {/* Footer link */}
        <div className="mt-4 pt-4 border-t border-[#F0F0EC]">
          <span className="text-sm font-semibold text-[#FF6B35] flex items-center gap-1 group-hover:gap-2 transition-all">
            View Full Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function TableView({ countries }: { countries: readonly ManufacturingCountry[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4] bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A] whitespace-nowrap">Country</th>
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A] whitespace-nowrap">Labor/hr</th>
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A] whitespace-nowrap">Quality</th>
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A] whitespace-nowrap">Lead Time</th>
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A] whitespace-nowrap">Tariff</th>
            <th className="text-left px-5 py-4 font-bold text-[#1A1A1A]">Specializations</th>
            <th className="px-5 py-4" />
          </tr>
        </thead>
        <tbody>
          {countries.map((country, i) => (
            <tr
              key={country.code}
              className={`border-b border-[#F0F0EC] hover:bg-[#FFF8F5] transition-colors ${
                i === countries.length - 1 ? "border-b-0" : ""
              }`}
            >
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{country.emoji}</span>
                  <span className="font-bold text-[#1A1A1A]">{country.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="font-bold" style={{ color: laborColor(country.laborCostPerHour) }}>
                  ${country.laborCostPerHour.toFixed(2)}
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="font-bold" style={{ color: qualityColor(country.qualityRating) }}>
                  {country.qualityRating}/10
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-[#1A1A1A] font-semibold">
                {country.avgLeadTimeDays} days
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-[#1A1A1A] font-semibold">
                {country.avgTariffToUS}%
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-1">
                  {country.specializations.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <Link
                  href={`/manufacturers/${toSlug(country.name)}`}
                  className="text-[#FF6B35] font-semibold hover:underline flex items-center gap-1 text-xs"
                >
                  Guide <ArrowRight className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Quiz Strip ─────────────────────────────────────────────────────────

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
              value === opt
                ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-sm"
                : "bg-white border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuizStrip() {
  const [priority, setPriority] = useState<Priority>("Lowest cost")
  const [productType, setProductType] = useState<ProductType>("Consumer goods")

  const result = getRecommendation(priority, productType)

  return (
    <section className="py-16 border-t border-[#E8E8E4] bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">Which country is right for you?</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-xl">
          Answer two quick questions and get an instant recommendation.
        </p>

        <div className="bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 md:p-8 space-y-6">
          <SegmentedControl
            label="Your priority:"
            options={["Lowest cost", "Fastest lead time", "Highest quality"] as Priority[]}
            value={priority}
            onChange={setPriority}
          />
          <SegmentedControl
            label="Your product type:"
            options={["Electronics", "Apparel", "Consumer goods", "Industrial"] as ProductType[]}
            value={productType}
            onChange={setProductType}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${priority}-${productType}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="bg-white rounded-xl border-2 border-[#FF6B35] p-5 flex items-start gap-4"
            >
              <span className="text-4xl leading-none flex-shrink-0">{result.emoji}</span>
              <div>
                <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-1">Recommended</p>
                <p className="text-xl font-black text-[#1A1A1A] mb-2">{result.country}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{result.reason}</p>
                <Link
                  href={`/manufacturers/${toSlug(result.country)}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B35] hover:underline"
                >
                  View full {result.country} guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ── Tariff Chart ───────────────────────────────────────────────────────

function TariffChart() {
  return (
    <section className="py-16 border-t border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">Tariff Exposure Comparison</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-2xl">
          Total US import duty for a typical consumer goods product (blended Section 301 + MFN rates, Q1 2026).
          Lower tariff = lower landed cost.
        </p>

        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 md:p-8 space-y-4">
          {TARIFF_DATA.map((item, i) => (
            <motion.div
              key={item.country}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
              className="flex items-center gap-4"
            >
              <div className="w-32 flex-shrink-0 flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-semibold text-[#1A1A1A] truncate">{item.country}</span>
              </div>
              <div className="flex-1 h-7 bg-[#F5F5F0] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.tariff / MAX_TARIFF) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 + 0.1, ease: EASE }}
                  style={{ background: item.color, minWidth: item.tariff === 0 ? "2.5rem" : undefined }}
                >
                  {item.tariff > 0 && (
                    <span className="text-white text-xs font-bold">{item.tariff}%</span>
                  )}
                </motion.div>
                {item.tariff === 0 && (
                  <div className="absolute">
                  </div>
                )}
              </div>
              <div className="w-16 text-right">
                {item.tariff === 0 ? (
                  <span className="text-xs font-bold text-[#22C55E]">0% — Free</span>
                ) : (
                  <span className="text-xs font-bold text-[#1A1A1A]">{item.tariff}%</span>
                )}
              </div>
            </motion.div>
          ))}
          <p className="text-xs text-[#767676] pt-2 border-t border-[#F0F0EC]">
            * Rates are estimates for illustrative purposes. Actual duties vary by HS code. Verify with a licensed customs broker.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────

export default function ManufacturersPage() {
  const [activeRegion, setActiveRegion] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const filteredCountries =
    activeRegion === "All"
      ? MANUFACTURING_COUNTRIES
      : MANUFACTURING_COUNTRIES.filter(
          (c) => normaliseRegion(c.region) === activeRegion
        )

  // Sort by quality rating descending for the grid display
  const sortedCountries = [...filteredCountries].sort(
    (a, b) => b.qualityRating - a.qualityRating
  )

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] pt-20 pb-24 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-2 mb-5"
          >
            <Globe2 className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-[#FF6B35] text-sm font-bold uppercase tracking-widest">
              Manufacturing Regions
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] max-w-3xl"
          >
            Find Your Perfect Manufacturing Country
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
            className="mt-6 text-lg sm:text-xl text-[#A8A8A4] max-w-2xl leading-relaxed"
          >
            Compare 12 countries across 20+ dimensions. Real data on labor costs, quality ratings,
            IP protection, and lead times.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
            className="flex flex-wrap gap-3 mt-10"
          >
            <StatChip label="12 Countries" />
            <StatChip label="$0.95–$8.50/hr Labor" />
            <StatChip label="14–55 Day Lead Times" />
            <StatChip label="0–25% Tariff Range" />
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Toggle ─────────────────────────────────────────── */}
      <section className="sticky top-0 z-20 bg-[#FAFAF8] border-b border-[#E8E8E4] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Region pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-[#767676] flex-shrink-0" />
            {ALL_REGIONS.map((region) => (
              <RegionPill
                key={region}
                region={region}
                active={activeRegion === region}
                onClick={() => setActiveRegion(region)}
              />
            ))}
          </div>

          {/* View toggle */}
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] bg-white text-sm font-semibold text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {viewMode === "grid" ? "Switch to Table" : "Switch to Grid"}
          </button>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          {/* Result count */}
          <p className="text-sm text-[#767676] mb-6 font-medium">
            Showing{" "}
            <span className="text-[#1A1A1A] font-bold">{filteredCountries.length}</span>{" "}
            {filteredCountries.length === 1 ? "country" : "countries"}
            {activeRegion !== "All" && (
              <>
                {" "}in <span className="text-[#FF6B35] font-bold">{activeRegion}</span>
              </>
            )}
            {viewMode === "grid" && (
              <span className="ml-2 text-[#767676]">· sorted by quality rating</span>
            )}
          </p>

          {viewMode === "grid" ? (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeRegion}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {sortedCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <TableView countries={filteredCountries} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Quiz Strip ───────────────────────────────────────────────── */}
      <QuizStrip />

      {/* ── Tariff Chart ─────────────────────────────────────────────── */}
      <TariffChart />

      {/* ── How to Choose ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#E8E8E4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Globe2 className="w-5 h-5 text-[#FF6B35]" />
            <h2 className="text-2xl font-black text-[#1A1A1A]">How to Choose</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Lowest Cost */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5 text-[#22C55E]" />
              </div>
              <h3 className="font-black text-[#1A1A1A] text-lg mb-2">Lowest Cost</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                Bangladesh, India, and Vietnam offer the lowest labor costs for high-volume,
                labor-intensive products like apparel, footwear, and home textiles.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["🇧🇩 Bangladesh", "🇮🇳 India", "🇻🇳 Vietnam"].map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2.5 py-1 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Best Quality */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF3EE] flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="font-black text-[#1A1A1A] text-lg mb-2">Best Quality</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                South Korea, Taiwan, and Poland lead on quality ratings, IP protection, and
                engineering precision — ideal for technical or premium products.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["🇰🇷 South Korea", "🇹🇼 Taiwan", "🇵🇱 Poland"].map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2.5 py-1 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Fastest to US */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="font-black text-[#1A1A1A] text-lg mb-2">Fastest to US</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                Mexico wins on speed — USMCA enables duty-free overland shipping to US buyers in
                as little as 2 weeks, no ocean freight required.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["🇲🇽 Mexico (USMCA)", "~14–18 day lead time"].map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2.5 py-1 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FFF3EE] border-t border-[#FFD8C8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-widest mb-3">Country Selection Tool</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4 leading-tight">
              Find the best country for your product
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Our AI analyzes your product category, target price, and volume to recommend the
              optimal manufacturing country with a full cost breakdown — in under 5 minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A25] text-white font-bold rounded-full px-8 py-4 text-base transition-colors duration-200 shadow-lg shadow-[#FF6B35]/25"
            >
              Get Country Recommendation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#FF6B35] rounded-full px-4 py-2 text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />
              AI-Powered Analysis
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Not sure which country is right for your product?
            </h2>
            <p className="text-[#A8A8A4] text-lg mb-8 leading-relaxed">
              Our AI analyzes your product category, target price, and volume to recommend the
              optimal manufacturing country — with a full cost breakdown.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A25] text-white font-bold rounded-full px-8 py-4 text-base transition-colors duration-200 shadow-lg shadow-[#FF6B35]/25"
            >
              Get Country Recommendation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
