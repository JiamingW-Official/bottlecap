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
      <div className="flex justify-between text-xs text-[#9B9B9B] mb-1">
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
            <div className="text-[10px] text-[#9B9B9B] leading-none mb-0.5">Min Cost</div>
            <div className="text-xs font-bold text-[#1A1A1A]">${product.avgUnitCost.min}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <DollarSign size={13} className="text-[#FF6B35] shrink-0" />
          <div>
            <div className="text-[10px] text-[#9B9B9B] leading-none mb-0.5">Max Cost</div>
            <div className="text-xs font-bold text-[#1A1A1A]">${product.avgUnitCost.max}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <Clock size={13} className="text-[#6B6B6B] shrink-0" />
          <div>
            <div className="text-[10px] text-[#9B9B9B] leading-none mb-0.5">Lead Time</div>
            <div className="text-xs font-bold text-[#1A1A1A]">{product.avgLeadTimeDays}d</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAFAF8] rounded-xl px-3 py-2">
          <Package size={13} className="text-[#6B6B6B] shrink-0" />
          <div>
            <div className="text-[10px] text-[#9B9B9B] leading-none mb-0.5">MOQ</div>
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

      {/* ── Search + Filter + Sort ───────────────────────────────────────── */}
      <section className="pb-8 sticky top-0 z-20 bg-[#FAFAF8] border-b border-[#E8E8E4] shadow-sm">
        <div className="max-w-5xl mx-auto px-6 pt-4 pb-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B9B9B] pointer-events-none"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category pills + Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} className="text-[#9B9B9B] shrink-0" />
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
              <span className="text-xs text-[#9B9B9B] whitespace-nowrap">Sort:</span>
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
          <p className="text-xs text-[#9B9B9B]">
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
                <p className="text-[#9B9B9B] text-lg">
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
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
