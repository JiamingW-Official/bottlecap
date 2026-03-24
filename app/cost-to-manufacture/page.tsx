"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  X,
  TrendingUp,
  ArrowRight,
  Filter,
  DollarSign,
  Clock,
  Package,
  Layers,
  Calculator,
  ChevronDown,
} from "lucide-react"
import { PRODUCT_COSTS } from "@/lib/data/product-costs"

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey = "name-az" | "cost-low" | "cost-high" | "lead-time" | "moq"

// ─── Constants ───────────────────────────────────────────────────────────────

const STAT_CHIPS = [
  "50+ products",
  "Updated Q1 2026",
  "Industry averages",
  "Factory-verified data",
] as const

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Name A–Z", value: "name-az" },
  { label: "Unit Cost (low)", value: "cost-low" },
  { label: "Unit Cost (high)", value: "cost-high" },
  { label: "Lead Time", value: "lead-time" },
  { label: "MOQ", value: "moq" },
]

const CARD_EASE = [0.25, 0.46, 0.45, 0.94] as const

const FEATURED_SLUGS = ["smart-watches", "bamboo-water-bottle", "wireless-earbuds"]

// ─── Category Cost Explorer data ─────────────────────────────────────────────

interface CategoryExplorerEntry {
  category: string
  emoji: string
  costMin: number
  costMax: number
  moq: string
  costDrivers: string[]
  bestCountry: string
  bestCountryEmoji: string
}

const CATEGORY_EXPLORER: CategoryExplorerEntry[] = [
  {
    category: "Consumer Electronics",
    emoji: "📱",
    costMin: 3,
    costMax: 55,
    moq: "300–3,000 units",
    costDrivers: ["Chipset & PCB selection", "Display & battery quality", "Certification (FCC, CE, UN38.3)"],
    bestCountry: "China (Shenzhen)",
    bestCountryEmoji: "🇨🇳",
  },
  {
    category: "Apparel & Textiles",
    emoji: "👕",
    costMin: 1.5,
    costMax: 22,
    moq: "200–1,000 units",
    costDrivers: ["Fabric weight & composition", "Cut & sew complexity", "MOQ penalties on custom prints"],
    bestCountry: "Bangladesh",
    bestCountryEmoji: "🇧🇩",
  },
  {
    category: "Home & Garden",
    emoji: "🏡",
    costMin: 2,
    costMax: 40,
    moq: "500–2,000 units",
    costDrivers: ["Raw material costs (wood, metal, plastic)", "Surface finish & packaging", "Shipping volume/weight ratio"],
    bestCountry: "Vietnam",
    bestCountryEmoji: "🇻🇳",
  },
  {
    category: "Sports & Outdoors",
    emoji: "🏋️",
    costMin: 3,
    costMax: 60,
    moq: "300–1,500 units",
    costDrivers: ["Material durability specs", "Safety certifications", "Overmolding & ergonomics"],
    bestCountry: "China",
    bestCountryEmoji: "🇨🇳",
  },
  {
    category: "Beauty & Personal Care",
    emoji: "💄",
    costMin: 0.8,
    costMax: 18,
    moq: "1,000–5,000 units",
    costDrivers: ["Formula development / licensing", "Compliance & safety testing (FDA, EU)", "Packaging design & MOQ"],
    bestCountry: "South Korea",
    bestCountryEmoji: "🇰🇷",
  },
  {
    category: "Pet Products",
    emoji: "🐾",
    costMin: 1.5,
    costMax: 30,
    moq: "300–1,000 units",
    costDrivers: ["Pet-safe material certification", "Bite/chew durability testing", "Packaging & compliance labeling"],
    bestCountry: "China",
    bestCountryEmoji: "🇨🇳",
  },
]

// ─── Benchmark table data ─────────────────────────────────────────────────────

interface BenchmarkRow {
  category: string
  china: string
  vietnam: string
  india: string
  cheapest: "china" | "vietnam" | "india"
}

const BENCHMARK_ROWS: BenchmarkRow[] = [
  { category: "Wireless Earbuds", china: "$4.50–$18", vietnam: "$6–$22", india: "$7–$25", cheapest: "china" },
  { category: "Cotton T-Shirt", china: "$2.50–$6", vietnam: "$2.80–$7", india: "$1.80–$5", cheapest: "india" },
  { category: "Phone Case (TPU)", china: "$0.35–$3.50", vietnam: "$0.50–$4", india: "$0.55–$4.50", cheapest: "china" },
  { category: "Yoga Mat", china: "$3–$12", vietnam: "$3.50–$13", india: "$2.50–$10", cheapest: "india" },
  { category: "Stainless Water Bottle", china: "$2.80–$8", vietnam: "$3.20–$9", india: "$3–$9", cheapest: "china" },
  { category: "Wooden Furniture (chair)", china: "$18–$60", vietnam: "$15–$50", india: "$12–$45", cheapest: "india" },
  { category: "Ceramic Cookware", china: "$6–$28", vietnam: "$7–$32", india: "$5–$26", cheapest: "india" },
  { category: "LED Strip Lights", china: "$1.20–$4", vietnam: "$1.50–$5", india: "$1.80–$5.50", cheapest: "china" },
  { category: "Backpack (nylon)", china: "$5–$22", vietnam: "$5.50–$24", india: "$4.50–$20", cheapest: "india" },
  { category: "Smart Watch", china: "$12–$55", vietnam: "$15–$65", india: "$N/A", cheapest: "china" },
]

// ─── Unit cost components ─────────────────────────────────────────────────────

const COST_COMPONENTS = [
  { label: "Raw Materials", pct: 42, color: "#FF6B35" },
  { label: "Labor", pct: 22, color: "#F59E0B" },
  { label: "Factory Overhead", pct: 14, color: "#3B82F6" },
  { label: "Tooling Amortized", pct: 12, color: "#8B5CF6" },
  { label: "QC & Packaging", pct: 10, color: "#22C55E" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

type ProductEntry = typeof PRODUCT_COSTS[number]

function sortProducts(
  products: readonly ProductEntry[],
  sort: SortKey
): ProductEntry[] {
  const sorted = [...products]
  switch (sort) {
    case "name-az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "cost-low":
      return sorted.sort((a, b) => a.avgUnitCost.min - b.avgUnitCost.min)
    case "cost-high":
      return sorted.sort((a, b) => b.avgUnitCost.max - a.avgUnitCost.max)
    case "lead-time":
      return sorted.sort((a, b) => a.avgLeadTimeDays - b.avgLeadTimeDays)
    case "moq":
      return sorted.sort((a, b) => a.moqRange.min - b.moqRange.min)
    default:
      return sorted
  }
}

function isWideRange(min: number, max: number): boolean {
  return max > 0 && (max - min) / max > 0.5
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface CostBarProps {
  min: number
  max: number
}

function CostBar({ min, max }: CostBarProps) {
  const wide = isWideRange(min, max)
  return (
    <div className="mt-3 mb-4">
      <div className="flex justify-between text-xs text-[#767676] mb-1">
        <span>${min}</span>
        <span>${max}</span>
      </div>
      <div className="h-2 rounded-full bg-[#E8E8E4] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: wide
              ? "linear-gradient(90deg, #FF6B35 0%, #FFB347 100%)"
              : "linear-gradient(90deg, #22C55E 0%, #86EFAC 100%)",
            width: "100%",
          }}
        />
      </div>
      <div className="flex items-center gap-1 mt-1.5">
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            wide
              ? "bg-orange-50 text-orange-500"
              : "bg-green-50 text-green-600"
          }`}
        >
          {wide ? "Wide range" : "Stable pricing"}
        </span>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: (typeof PRODUCT_COSTS)[number]
  featured?: boolean
}

function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.28, ease: CARD_EASE }}
      className={`group relative bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-lg transition-all duration-200 flex flex-col ${
        featured ? "p-7" : "p-5"
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 text-xs font-bold bg-[#FF6B35] text-white px-2.5 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={11} />
          Popular
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3
          className={`font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors leading-snug ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {product.name}
        </h3>
      </div>
      <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[#FF6B35] bg-orange-50 px-2 py-0.5 rounded-full mb-2 self-start">
        {product.category}
      </span>

      {/* Description */}
      <p className="text-sm text-[#6B6B6B] line-clamp-2 leading-relaxed mb-1">
        {product.description}
      </p>

      {/* Cost bar */}
      <CostBar min={product.avgUnitCost.min} max={product.avgUnitCost.max} />

      {/* Stat chips */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <DollarSign size={13} className="text-[#FF6B35] shrink-0" />
          <div>
            <div className="text-[10px] text-[#767676] leading-none mb-0.5">Min Cost</div>
            <div className="text-xs font-bold text-[#1A1A1A]">${product.avgUnitCost.min}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <DollarSign size={13} className="text-[#FF6B35] shrink-0" />
          <div>
            <div className="text-[10px] text-[#767676] leading-none mb-0.5">Max Cost</div>
            <div className="text-xs font-bold text-[#1A1A1A]">${product.avgUnitCost.max}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <Clock size={13} className="text-[#6B6B6B] shrink-0" />
          <div>
            <div className="text-[10px] text-[#767676] leading-none mb-0.5">Lead Time</div>
            <div className="text-xs font-bold text-[#1A1A1A]">{product.avgLeadTimeDays}d</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <Package size={13} className="text-[#6B6B6B] shrink-0" />
          <div>
            <div className="text-[10px] text-[#767676] leading-none mb-0.5">MOQ</div>
            <div className="text-xs font-bold text-[#1A1A1A]">
              {product.moqRange.min.toLocaleString()}–{product.moqRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-auto flex items-center justify-between">
        <Link
          href={`/cost-to-manufacture/${product.slug}`}
          className="text-sm font-semibold text-[#1A1A1A] hover:text-[#FF6B35] transition-colors"
        >
          View breakdown →
        </Link>
        <Link
          href="/analyze"
          className="flex items-center gap-1 text-sm font-semibold text-[#FF6B35] hover:text-[#E85A25] transition-colors"
        >
          Get Custom Quote
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Category Cost Explorer ───────────────────────────────────────────────────

function CategoryExplorer() {
  const [activeIdx, setActiveIdx] = useState(0)
  const entry = CATEGORY_EXPLORER[activeIdx]
  const rangeWidth = entry.costMax - entry.costMin
  const maxPossible = 60

  return (
    <section className="py-16 border-t border-[#E8E8E4] bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">Category Cost Explorer</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-xl">
          Select a product category to see typical cost ranges, MOQs, and cost drivers.
        </p>

        {/* Tab row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_EXPLORER.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
                activeIdx === i
                  ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-sm"
                  : "bg-[#FAFAF8] border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.category}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: CARD_EASE }}
            className="bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 md:p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{entry.emoji}</span>
                  <h3 className="text-xl font-black text-[#1A1A1A]">{entry.category}</h3>
                </div>

                {/* Cost range visual */}
                <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-2">Average Unit Cost Range</p>
                <div className="flex justify-between text-sm font-bold text-[#1A1A1A] mb-2">
                  <span>${entry.costMin}</span>
                  <span>${entry.costMax}</span>
                </div>
                <div className="relative h-4 bg-[#E8E8E4] rounded-full mb-1 overflow-hidden">
                  <motion.div
                    className="absolute h-full rounded-full"
                    style={{
                      left: `${(entry.costMin / maxPossible) * 100}%`,
                      background: "linear-gradient(90deg, #FF6B35, #FFB347)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(rangeWidth / maxPossible) * 100}%` }}
                    transition={{ duration: 0.5, ease: CARD_EASE }}
                  />
                </div>
                <p className="text-xs text-[#767676] mb-6">
                  Range: ${entry.costMin} – ${entry.costMax} per unit (ex-works)
                </p>

                {/* MOQ */}
                <div className="flex items-center gap-3 bg-white rounded-xl border border-[#E8E8E4] px-4 py-3">
                  <Package className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-[#767676] uppercase tracking-wide">Typical MOQ</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{entry.moq}</p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-3">Main Cost Drivers</p>
                <ul className="space-y-3 mb-6">
                  {entry.costDrivers.map((driver, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-[#1A1A1A] leading-relaxed">{driver}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 bg-white rounded-xl border border-[#E8E8E4] px-4 py-3">
                  <span className="text-2xl">{entry.bestCountryEmoji}</span>
                  <div>
                    <p className="text-[10px] font-bold text-[#767676] uppercase tracking-wide">Best Country to Manufacture</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{entry.bestCountry}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Benchmark Table ──────────────────────────────────────────────────────────

function BenchmarkTable() {
  return (
    <section className="py-16 border-t border-[#E8E8E4]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">Cost Benchmark by Country</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-xl">
          Typical ex-works unit costs (USD) by country. Green cell = cheapest option for that category.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1A1A1A] text-white">
                <th className="text-left px-5 py-4 font-bold">Product Category</th>
                <th className="text-center px-5 py-4 font-bold">🇨🇳 China</th>
                <th className="text-center px-5 py-4 font-bold">🇻🇳 Vietnam</th>
                <th className="text-center px-5 py-4 font-bold">🇮🇳 India</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {BENCHMARK_ROWS.map((row, i) => (
                <tr
                  key={row.category}
                  className={`border-b border-[#F0F0EC] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}
                >
                  <td className="px-5 py-3.5 font-semibold text-[#1A1A1A]">{row.category}</td>
                  <td
                    className={`px-5 py-3.5 text-center font-medium ${
                      row.cheapest === "china"
                        ? "bg-green-50 text-green-700 font-bold"
                        : "text-[#6B6B6B]"
                    }`}
                  >
                    {row.china}
                    {row.cheapest === "china" && (
                      <span className="ml-1.5 text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        Cheapest
                      </span>
                    )}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-center font-medium ${
                      row.cheapest === "vietnam"
                        ? "bg-green-50 text-green-700 font-bold"
                        : "text-[#6B6B6B]"
                    }`}
                  >
                    {row.vietnam}
                    {row.cheapest === "vietnam" && (
                      <span className="ml-1.5 text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        Cheapest
                      </span>
                    )}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-center font-medium ${
                      row.cheapest === "india"
                        ? "bg-green-50 text-green-700 font-bold"
                        : "text-[#6B6B6B]"
                    }`}
                  >
                    {row.india}
                    {row.cheapest === "india" && (
                      <span className="ml-1.5 text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        Cheapest
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#767676] mt-3">
          * Ex-works (EXW) pricing. Does not include tooling, shipping, duties, or QC costs. Ranges reflect MOQ variance.
        </p>
      </div>
    </section>
  )
}

// ─── Cost Components Breakdown ────────────────────────────────────────────────

function CostComponentsSection() {
  return (
    <section className="py-16 border-t border-[#E8E8E4] bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">What&apos;s Included in Your Unit Cost?</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-xl">
          A typical manufactured unit cost breaks down across five components. Understanding each
          helps you identify where to negotiate and where to invest.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Stacked bar */}
          <div>
            <div className="flex h-10 rounded-xl overflow-hidden mb-4">
              {COST_COMPONENTS.map((c) => (
                <motion.div
                  key={c.label}
                  className="h-full"
                  style={{ background: c.color, width: `${c.pct}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: CARD_EASE, delay: 0.1 }}
                />
              ))}
            </div>
            <div className="space-y-3">
              {COST_COMPONENTS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: i * 0.07, ease: CARD_EASE }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-sm font-semibold text-[#1A1A1A]">{c.label}</span>
                  </div>
                  <span className="text-sm font-black text-[#1A1A1A]">{c.pct}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            {[
              {
                label: "Raw Materials",
                color: "#FF6B35",
                desc: "The largest cost driver. Includes all inputs: plastics, metals, textiles, electronic components. Material selection is your #1 lever for cost reduction.",
              },
              {
                label: "Labor",
                color: "#F59E0B",
                desc: "Varies heavily by country ($0.95–$8.50/hr). Complex products with more assembly steps have higher labor share.",
              },
              {
                label: "Factory Overhead",
                color: "#3B82F6",
                desc: "Factory rent, machinery depreciation, utilities, and management. Usually 10–18% of total cost depending on factory size.",
              },
              {
                label: "Tooling Amortized",
                color: "#8B5CF6",
                desc: "Mold and tooling costs spread across the production run. Higher MOQs reduce the per-unit tooling burden.",
              },
              {
                label: "QC & Packaging",
                color: "#22C55E",
                desc: "Incoming material inspection, in-process checks, final QC, and retail packaging. Often negotiable but critical to protect brand reputation.",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-0.5">{item.label}</p>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Landed Cost Estimator ────────────────────────────────────────────────────

type ShippingMethod = "sea" | "air" | "express"

const SHIPPING_RATES: Record<ShippingMethod, { label: string; perUnit: number; days: string }> = {
  sea: { label: "Sea Freight (FCL/LCL)", perUnit: 0.35, days: "25–40 days" },
  air: { label: "Air Freight", perUnit: 2.80, days: "5–10 days" },
  express: { label: "Express Courier (DHL/FedEx)", perUnit: 6.50, days: "2–5 days" },
}

function LandedCostEstimator() {
  const [unitCost, setUnitCost] = useState(12)
  const [qty, setQty] = useState(500)
  const [shipping, setShipping] = useState<ShippingMethod>("sea")
  const [tariffPct, setTariffPct] = useState(7.5)

  const shippingPerUnit = SHIPPING_RATES[shipping].perUnit
  const dutyPerUnit = (unitCost * tariffPct) / 100
  const landedPerUnit = unitCost + shippingPerUnit + dutyPerUnit
  const totalLanded = landedPerUnit * qty

  return (
    <section className="py-16 border-t border-[#E8E8E4]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="text-2xl font-black text-[#1A1A1A]">Interactive Landed Cost Estimator</h2>
        </div>
        <p className="text-[#6B6B6B] text-sm mb-8 max-w-xl">
          Estimate your total landed cost including unit cost, shipping, and import duties.
        </p>

        <div className="bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-5">
              {/* Unit cost */}
              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">
                  Unit Cost (Ex-Works, USD)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={unitCost}
                    onChange={(e) => setUnitCost(Number(e.target.value))}
                    className="flex-1 accent-[#FF6B35]"
                  />
                  <div className="w-20 bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm font-bold text-[#1A1A1A] text-center">
                    ${unitCost}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">
                  Order Quantity (units)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="flex-1 accent-[#FF6B35]"
                  />
                  <div className="w-20 bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm font-bold text-[#1A1A1A] text-center">
                    {qty.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Tariff */}
              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">
                  Import Duty Rate (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={0.5}
                    value={tariffPct}
                    onChange={(e) => setTariffPct(Number(e.target.value))}
                    className="flex-1 accent-[#FF6B35]"
                  />
                  <div className="w-20 bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm font-bold text-[#1A1A1A] text-center">
                    {tariffPct}%
                  </div>
                </div>
              </div>

              {/* Shipping method */}
              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">
                  Shipping Method
                </label>
                <div className="relative">
                  <select
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value as ShippingMethod)}
                    className="w-full appearance-none bg-white border border-[#E8E8E4] rounded-xl px-4 py-3 text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35] cursor-pointer pr-10"
                  >
                    {(Object.entries(SHIPPING_RATES) as [ShippingMethod, typeof SHIPPING_RATES[ShippingMethod]][]).map(
                      ([key, val]) => (
                        <option key={key} value={key}>
                          {val.label} — ${val.perUnit}/unit ({val.days})
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${unitCost}-${qty}-${shipping}-${tariffPct}`}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18, ease: CARD_EASE }}
                className="bg-white rounded-2xl border-2 border-[#FF6B35] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-4">
                    Your Landed Cost Breakdown
                  </p>

                  {[
                    { label: "Unit cost (EXW)", value: unitCost, color: "#FF6B35" },
                    { label: "Shipping per unit", value: shippingPerUnit, color: "#3B82F6" },
                    { label: "Import duty per unit", value: dutyPerUnit, color: "#F59E0B" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-[#F0F0EC] last:border-b-0">
                      <span className="text-sm text-[#6B6B6B]">{row.label}</span>
                      <span className="text-sm font-bold" style={{ color: row.color }}>
                        ${row.value.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center py-3 mt-2 bg-[#FAFAF8] rounded-xl px-4">
                    <span className="text-sm font-bold text-[#1A1A1A]">Total landed / unit</span>
                    <span className="text-lg font-black text-[#1A1A1A]">
                      ${landedPerUnit.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-[#1A1A1A] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#A8A8A4] mb-1">Total order landed cost</p>
                  <p className="text-3xl font-black text-white">
                    ${totalLanded.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-[#A8A8A4] mt-1">
                    {qty.toLocaleString()} units via {SHIPPING_RATES[shipping].label.split("(")[0].trim()}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CostToManufacturePage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>("name-az")

  const categories = useMemo(
    () => Array.from(new Set(PRODUCT_COSTS.map((p) => p.category))),
    []
  )

  const featuredProducts = useMemo(() => {
    const bySlug = FEATURED_SLUGS.map((slug) =>
      PRODUCT_COSTS.find((p) => p.slug === slug)
    ).filter((p): p is ProductEntry => p !== undefined)
    // Fall back to first 3 if slugs not found
    return bySlug.length >= 3 ? bySlug : PRODUCT_COSTS.slice(0, 3)
  }, [])

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim()
    const filtered = PRODUCT_COSTS.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      const matchesCategory =
        !activeCategory || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
    return sortProducts(filtered, sort)
  }, [search, activeCategory, sort])

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Cost Guides</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: CARD_EASE }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]"
          >
            Cost to Manufacture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: CARD_EASE }}
            className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed"
          >
            Detailed cost breakdowns for 50+ popular products. See real unit
            costs, tooling estimates, MOQ ranges, and margin advice for each
            product category.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: CARD_EASE }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {STAT_CHIPS.map((chip) => (
              <span
                key={chip}
                className="text-sm font-medium bg-white border border-[#E8E8E4] text-[#6B6B6B] px-4 py-1.5 rounded-full shadow-sm"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured / Top Picks ─────────────────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-[#FF6B35]" />
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Top picks this month
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Cost Explorer ─────────────────────────────────────── */}
      <CategoryExplorer />

      {/* ── Cost Benchmark Table ──────────────────────────────────────── */}
      <BenchmarkTable />

      {/* ── Cost Components Explainer ─────────────────────────────────── */}
      <CostComponentsSection />

      {/* ── Landed Cost Estimator ─────────────────────────────────────── */}
      <LandedCostEstimator />

      {/* ── Search + Filter + Sort ───────────────────────────────────────── */}
      <section className="pb-8 sticky top-0 z-20 bg-[#FAFAF8] border-b border-[#E8E8E4] shadow-sm">
        <div className="max-w-5xl mx-auto px-6 pt-4 pb-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767676] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#E8E8E4] rounded-xl pl-10 pr-10 py-3 text-sm text-[#1A1A1A] placeholder-[#9B9B9B] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767676] hover:text-[#1A1A1A] transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category pills + Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} className="text-[#767676] shrink-0" />
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                !activeCategory
                  ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                  : "bg-white text-[#6B6B6B] border-[#E8E8E4] hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                    : "bg-white text-[#6B6B6B] border-[#E8E8E4] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-[#767676] whitespace-nowrap">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-xs bg-white border border-[#E8E8E4] rounded-lg px-3 py-1.5 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-[#767676]">
            Showing{" "}
            <span className="font-semibold text-[#1A1A1A]">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#1A1A1A]">
              {PRODUCT_COSTS.length}
            </span>{" "}
            products
          </p>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-[#767676] text-lg">
                  No products match your search.
                </p>
                <button
                  onClick={() => {
                    setSearch("")
                    setActiveCategory(null)
                  }}
                  className="mt-4 text-sm text-[#FF6B35] hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA strip ─────────────────────────────────────────────── */}
      <section className="py-14 bg-[#FFF3EE] border-t border-[#FFD8C8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: CARD_EASE }}
          >
            <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-widest mb-3">AI Cost Analysis</p>
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4 leading-tight">
              Need a precise cost breakdown for your product?
            </h2>
            <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto text-lg leading-relaxed">
              These are industry averages. Get a cost analysis tailored to your
              exact product specifications, materials, and target markets —
              delivered in 2–5 minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-bold hover:bg-[#E85A25] transition-colors shadow-lg shadow-[#FF6B35]/25"
            >
              Get Custom Analysis — $99
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Dark CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Need a precise cost breakdown?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            These are industry averages. Get a cost analysis tailored to your
            exact product specifications, materials, and target markets —
            delivered in 2–5 minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Get Custom Analysis — $99
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
