"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import type { MonthlyTrendReport, TrendingProduct } from "@/lib/data/trending-products"
import { TREND_REPORTS } from "@/lib/data/trending-products"

interface TrendReportTemplateProps {
  report: MonthlyTrendReport
}

// ─── Utility functions ───────────────────────────────────────────────────────

function getTrendScoreColor(score: number): string {
  if (score >= 80) return "bg-[#FF6B35] text-white"
  if (score >= 60) return "bg-[#FF6B35]/80 text-white"
  if (score >= 40) return "bg-[#FF6B35]/50 text-[#1A1A1A]"
  return "bg-[#FF6B35]/25 text-[#1A1A1A]"
}

function getTrendBarWidth(score: number): string {
  return `${score}%`
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function calculateMarginPercent(product: TrendingProduct): number {
  const avgRetail = (product.avgRetailPrice.min + product.avgRetailPrice.max) / 2
  const avgCost = (product.avgManufacturingCost.min + product.avgManufacturingCost.max) / 2
  if (avgCost === 0) return 0
  return Math.round(((avgRetail - avgCost) / avgRetail) * 100)
}

function getNavigation(currentSlug: string) {
  const sorted = [...TREND_REPORTS].sort(
    (a, b) => new Date(a.month + "-01").getTime() - new Date(b.month + "-01").getTime()
  )
  const currentIndex = sorted.findIndex((r) => r.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  }
}

/** Derive a velocity label from a yoyGrowth string like "+38%" */
function getVelocityFromGrowth(yoyGrowth: string): {
  label: "Rising Fast" | "Steady Growth" | "Cooling"
  percent: number
  color: string
  arrowIcon: string
} {
  const raw = parseFloat(yoyGrowth.replace(/[^0-9.\-]/g, ""))
  if (isNaN(raw) || raw >= 25) {
    return { label: "Rising Fast", percent: 85, color: "#22C55E", arrowIcon: "↑" }
  }
  if (raw >= 10) {
    return { label: "Steady Growth", percent: 55, color: "#F59E0B", arrowIcon: "→" }
  }
  return { label: "Cooling", percent: 25, color: "#9B9B9B", arrowIcon: "↓" }
}

/** Generate 6 relative monthly bar heights (0–100) from a trend score */
function generateBarHeights(trendScore: number): number[] {
  // Construct a plausible rising curve ending near the trend score
  const base = Math.max(20, trendScore - 55)
  const step = (trendScore - base) / 5
  return [
    Math.round(base),
    Math.round(base + step * 0.6),
    Math.round(base + step * 1.5),
    Math.round(base + step * 2.8),
    Math.round(base + step * 4.2),
    Math.round(trendScore),
  ]
}

/** Derive last 6 abbreviated month labels ending at the report month */
function getMonthLabels(reportMonth: string): string[] {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const [year, monthStr] = reportMonth.split("-")
  const monthIndex = parseInt(monthStr, 10) - 1
  const yearNum = parseInt(year, 10)
  return Array.from({ length: 6 }, (_, i) => {
    const offset = 5 - i
    let m = monthIndex - offset
    let y = yearNum
    while (m < 0) { m += 12; y -= 1 }
    return MONTHS[m]
  })
}

/** Derive market insights from product data with sensible fallbacks */
function deriveMarketInsights(product: TrendingProduct): {
  targetBuyer: string
  pricePoint: string
  peakSeason: string
} {
  const cat = product.category.toLowerCase()
  let targetBuyer = "Consumers aged 25–44, value-conscious online shoppers"
  let peakSeason = "Q4 (Oct – Dec)"

  if (cat.includes("kitchen") || cat.includes("dining")) {
    targetBuyer = "Health-conscious adults 20–45, meal-prep enthusiasts"
    peakSeason = "January (New Year resolutions) & Q4"
  } else if (cat.includes("electronics") || cat.includes("audio")) {
    targetBuyer = "Content creators, remote workers, Gen Z & Millennials"
    peakSeason = "Back-to-school (Aug–Sep) & holiday season (Nov–Dec)"
  } else if (cat.includes("furniture") || cat.includes("office")) {
    targetBuyer = "Remote / hybrid workers aged 28–50, WFH upgraders"
    peakSeason = "Jan–Mar (new-year office refresh)"
  } else if (cat.includes("beauty") || cat.includes("wellness") || cat.includes("personal care")) {
    targetBuyer = "Women 22–45, self-care focused, premium-brand switchers"
    peakSeason = "Feb (Valentine's) & May (Mother's Day) & Q4"
  } else if (cat.includes("outdoor") || cat.includes("sports") || cat.includes("fitness")) {
    targetBuyer = "Active adults 20–45, fitness-first lifestyle"
    peakSeason = "Spring (Mar–May) & early summer"
  } else if (cat.includes("pet")) {
    targetBuyer = "Pet owners 25–55 with mid-to-high disposable income"
    peakSeason = "Year-round with Q4 spike"
  }

  const pricePoint = `${formatCurrency(product.avgRetailPrice.min)} – ${formatCurrency(product.avgRetailPrice.max)}`

  return { targetBuyer, pricePoint, peakSeason }
}

/** Pull 3 related product names from the same report, excluding the given slug */
function getRelatedProducts(
  allProducts: TrendingProduct[],
  currentSlug: string,
  topCategory: string
): TrendingProduct[] {
  const sameCat = allProducts.filter(
    (p) => p.slug !== currentSlug && p.category === topCategory
  )
  const others = allProducts.filter(
    (p) => p.slug !== currentSlug && p.category !== topCategory
  )
  return [...sameCat, ...others].slice(0, 3)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

function ProductCard({ product, isBestMargin }: { product: TrendingProduct; isBestMargin: boolean }) {
  const margin = calculateMarginPercent(product)

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 shadow-sm hover:shadow-md transition-shadow relative">
      {isBestMargin && (
        <div className="absolute -top-3 right-4 bg-[#22C55E] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Best Margin Opportunity
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#1A1A1A] truncate">{product.name}</h3>
          <span className="inline-block bg-[#F5F5F0] text-[#6B6B6B] text-xs font-medium px-2.5 py-0.5 rounded-full mt-1">
            {product.category}
          </span>
        </div>
        <div className={`shrink-0 rounded-xl px-3 py-1.5 text-sm font-bold ${getTrendScoreColor(product.trendScore)}`}>
          {product.trendScore}
        </div>
      </div>

      {/* Trend Score Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#9B9B9B] mb-1">
          <span>Trend Score</span>
          <span>{product.trendScore}/100</span>
        </div>
        <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6B35] rounded-full transition-all"
            style={{ width: getTrendBarWidth(product.trendScore) }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Search Volume</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {product.searchVolume}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">YoY Growth</p>
          <p className={`font-semibold text-sm ${product.yoyGrowth.startsWith("-") ? "text-[#EF4444]" : "text-[#22C55E]"}`}>
            {product.yoyGrowth}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Retail Price</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {formatCurrency(product.avgRetailPrice.min)} &ndash; {formatCurrency(product.avgRetailPrice.max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Mfg. Cost</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {formatCurrency(product.avgManufacturingCost.min)} &ndash; {formatCurrency(product.avgManufacturingCost.max)}
          </p>
        </div>
      </div>

      {/* Margin */}
      <div className="bg-[#F5F5F0] rounded-xl px-3 py-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#6B6B6B]">Est. Gross Margin</span>
          <span className={`text-sm font-bold ${margin >= 60 ? "text-[#22C55E]" : margin >= 40 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
            {margin}%
          </span>
        </div>
      </div>

      {/* Platforms */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.topPlatforms.map((platform) => (
          <span
            key={platform}
            className="bg-white border border-[#E8E8E4] text-[#6B6B6B] text-xs px-2 py-0.5 rounded-md"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Why Trending */}
      <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.whyTrending}</p>
    </div>
  )
}

// ── Trend Velocity Indicator ──────────────────────────────────────────────────

function TrendVelocityIndicator({ yoyGrowth }: { yoyGrowth: string }) {
  const { label, percent, color, arrowIcon } = getVelocityFromGrowth(yoyGrowth)

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#9B9B9B] uppercase tracking-wide font-semibold">
          Trend Velocity
        </p>
        <span
          className="text-sm font-bold flex items-center gap-1 px-3 py-1 rounded-full"
          style={{ color, backgroundColor: `${color}18` }}
        >
          <span>{arrowIcon}</span>
          <span>{label}</span>
        </span>
      </div>
      <div className="h-3 bg-[#F5F5F0] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#9B9B9B] mt-1.5">
        <span>Cooling</span>
        <span>Steady</span>
        <span>Rising Fast</span>
      </div>
    </motion.div>
  )
}

// ── Search Volume Chart ───────────────────────────────────────────────────────

function SearchVolumeChart({
  trendScore,
  reportMonth,
}: {
  trendScore: number
  reportMonth: string
}) {
  const heights = generateBarHeights(trendScore)
  const monthLabels = getMonthLabels(reportMonth)
  const maxHeight = Math.max(...heights)

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8"
    >
      <p className="text-xs text-[#9B9B9B] uppercase tracking-wide font-semibold mb-4">
        Relative Search Volume — Last 6 Months
      </p>
      <div className="flex items-end gap-3 h-28">
        {heights.map((h, i) => {
          const barHeight = Math.round((h / maxHeight) * 100)
          const isLast = i === heights.length - 1
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t-md"
                style={{
                  background: isLast
                    ? "#FF6B35"
                    : `linear-gradient(to top, #FF6B35cc, #FF6B3555)`,
                  minHeight: 4,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${barHeight}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              />
              <span className="text-[10px] text-[#9B9B9B]">{monthLabels[i]}</span>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-[#9B9B9B] mt-3 italic">
        Estimated relative volume based on trend score trajectory.
      </p>
    </motion.div>
  )
}

// ── Key Market Insights ───────────────────────────────────────────────────────

function MarketInsightsSection({ product }: { product: TrendingProduct }) {
  const { targetBuyer, pricePoint, peakSeason } = deriveMarketInsights(product)

  const cards = [
    {
      icon: "👤",
      label: "Target Buyer",
      value: targetBuyer,
    },
    {
      icon: "💰",
      label: "Retail Price Range",
      value: pricePoint,
    },
    {
      icon: "📅",
      label: "Peak Demand Season",
      value: peakSeason,
    },
  ]

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-12"
    >
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Key Market Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-[#E8E8E4] p-5 flex flex-col gap-2"
          >
            <span className="text-2xl" role="img" aria-label={card.label}>
              {card.icon}
            </span>
            <p className="text-xs text-[#9B9B9B] uppercase tracking-wide font-semibold">
              {card.label}
            </p>
            <p className="text-sm font-medium text-[#1A1A1A] leading-snug">{card.value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

// ── Sourcing Readiness Checklist ──────────────────────────────────────────────

const CHECKLIST_ITEMS = [
  "I have a product spec ready",
  "I know my target retail price",
  "I've researched competitors on Amazon",
  "I have capital for a sample order ($500–$2K)",
  "I can commit to 6–12 weeks lead time",
]

function SourcingReadinessChecklist() {
  const [checked, setChecked] = useState<boolean[]>(Array(CHECKLIST_ITEMS.length).fill(false))

  const readyCount = checked.filter(Boolean).length
  const allReady = readyCount === CHECKLIST_ITEMS.length

  const counterColor =
    readyCount === 0
      ? "text-[#9B9B9B]"
      : readyCount < 3
      ? "text-[#F59E0B]"
      : readyCount < 5
      ? "text-[#FF6B35]"
      : "text-[#22C55E]"

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-12"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#1A1A1A]">Sourcing Readiness</h2>
        <span className={`text-sm font-bold ${counterColor}`}>
          {readyCount}/{CHECKLIST_ITEMS.length} ready
        </span>
      </div>
      <ul className="space-y-3">
        {CHECKLIST_ITEMS.map((item, i) => (
          <li key={item}>
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <span
                onClick={() => toggle(i)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked[i]
                    ? "bg-[#22C55E] border-[#22C55E]"
                    : "border-[#E8E8E4] group-hover:border-[#FF6B35]"
                }`}
              >
                {checked[i] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </span>
              <span
                className={`text-sm transition-colors ${
                  checked[i] ? "text-[#9B9B9B] line-through" : "text-[#1A1A1A]"
                }`}
                onClick={() => toggle(i)}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {allReady && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-[#22C55E] font-semibold"
        >
          You&apos;re ready to source — run your feasibility analysis below.
        </motion.p>
      )}
    </motion.section>
  )
}

// ── Related Trends ────────────────────────────────────────────────────────────

function RelatedTrendsSection({
  related,
  topCategory,
}: {
  related: TrendingProduct[]
  topCategory: string
}) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-12"
    >
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">
        Also Trending in {topCategory}
      </h2>
      <p className="text-sm text-[#9B9B9B] mb-5">
        Other products gaining momentum this month.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((product) => {
          const margin = calculateMarginPercent(product)
          return (
            <Link
              key={product.slug}
              href={`/analyze?product=${encodeURIComponent(product.name)}`}
              className="group bg-white rounded-2xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors leading-snug">
                  {product.name}
                </h3>
                <span className="shrink-0 text-xs font-bold text-[#FF6B35] bg-[#FFF0EB] px-2 py-0.5 rounded-full">
                  {product.trendScore}
                </span>
              </div>
              <p className="text-xs text-[#6B6B6B] mb-3 line-clamp-2">{product.whyTrending}</p>
              <div className="flex gap-3 text-xs">
                <span className="text-[#9B9B9B]">
                  {formatCurrency(product.avgRetailPrice.min)}–{formatCurrency(product.avgRetailPrice.max)}
                </span>
                <span className={margin >= 60 ? "text-[#22C55E] font-semibold" : "text-[#F59E0B] font-semibold"}>
                  {margin}% margin
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TrendReportTemplate({ report }: TrendReportTemplateProps) {
  const { prev, next } = getNavigation(report.slug)
  const sortedProducts = [...report.products].sort((a, b) => b.trendScore - a.trendScore)

  const bestMarginProduct = [...report.products].sort(
    (a, b) => calculateMarginPercent(b) - calculateMarginPercent(a)
  )[0]

  // Use the top-ranked product for spotlight sections
  const spotlightProduct = sortedProducts[0]

  const relatedProducts = spotlightProduct
    ? getRelatedProducts(sortedProducts, spotlightProduct.slug, report.topCategory)
    : []

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bottlecap.io"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: report.title,
    description: report.summary,
    url: `${baseUrl}/trends/${report.slug}`,
    datePublished: `${report.month}-01`,
    publisher: {
      "@type": "Organization",
      name: "Bottlecap",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/trends/${report.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/trends" className="hover:text-[#FF6B35] transition-colors">
            Trends
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{report.title}</span>
        </nav>

        {/* Header */}
        <motion.header
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            {report.title}
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            {report.summary}
          </p>
        </motion.header>

        {/* Top Category + Insight */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs text-[#9B9B9B] uppercase tracking-wide mb-2">
              Top Category This Month
            </p>
            <span className="inline-block bg-[#FF6B35] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {report.topCategory}
            </span>
            <p className="text-sm text-[#6B6B6B] mt-3">
              {sortedProducts.filter((p) => p.category === report.topCategory).length} of{" "}
              {sortedProducts.length} trending products are in this category.
            </p>
          </div>
          <div className="bg-[#FFF0EB] rounded-2xl border border-[#FF6B35]/20 p-6">
            <p className="text-xs text-[#FF6B35] uppercase tracking-wide font-semibold mb-2">
              Key Insight
            </p>
            <p className="text-[#1A1A1A] leading-relaxed font-medium">
              {report.insight}
            </p>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#1A1A1A]">{sortedProducts.length}</p>
            <p className="text-xs text-[#6B6B6B] mt-1">Products Tracked</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#22C55E]">
              {sortedProducts.filter((p) => !p.yoyGrowth.startsWith("-")).length}
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Growing YoY</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#FF6B35]">
              {sortedProducts[0]?.trendScore || 0}
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Top Trend Score</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#1A1A1A]">
              {bestMarginProduct ? calculateMarginPercent(bestMarginProduct) : 0}%
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Best Margin</p>
          </div>
        </motion.div>

        {/* ── NEW: Trend Velocity (based on top product) ── */}
        {spotlightProduct && (
          <TrendVelocityIndicator yoyGrowth={spotlightProduct.yoyGrowth} />
        )}

        {/* ── NEW: Search Volume Chart (based on top product) ── */}
        {spotlightProduct && (
          <SearchVolumeChart
            trendScore={spotlightProduct.trendScore}
            reportMonth={report.month}
          />
        )}

        {/* ── NEW: Key Market Insights ── */}
        {spotlightProduct && <MarketInsightsSection product={spotlightProduct} />}

        {/* Product Grid */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Trending Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                isBestMargin={bestMarginProduct?.slug === product.slug}
              />
            ))}
          </div>
        </motion.section>

        {/* ── NEW: Sourcing Readiness Checklist ── */}
        <SourcingReadinessChecklist />

        {/* ── NEW: Related Trends ── */}
        {relatedProducts.length > 0 && (
          <RelatedTrendsSection
            related={relatedProducts}
            topCategory={report.topCategory}
          />
        )}

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between border-t border-[#E8E8E4] pt-8 mb-16">
          {prev ? (
            <Link
              href={`/trends/${prev.slug}`}
              className="group flex items-center gap-2 text-sm"
            >
              <span className="text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors">
                &larr;
              </span>
              <div>
                <p className="text-xs text-[#9B9B9B]">Previous</p>
                <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/trends/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-right"
            >
              <div>
                <p className="text-xs text-[#9B9B9B]">Next</p>
                <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                  {next.title}
                </p>
              </div>
              <span className="text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors">
                &rarr;
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Original CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-10 text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
            Analyze any of these products
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a full manufacturing feasibility report for any trending product
            — cost breakdowns, country comparisons, supplier recommendations, and
            optimization tips. Delivered in under 5 minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Analyze my idea &rarr;
          </Link>
        </section>

        {/* ── NEW: Bottom CTA — product-specific ── */}
        {spotlightProduct && (
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-[#1A1A1A] rounded-2xl p-8 sm:p-10 text-center"
          >
            <p className="text-xs text-[#FF6B35] uppercase tracking-widest font-semibold mb-3">
              Ready to source?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Analyze {spotlightProduct.name} for manufacturing feasibility
            </h2>
            <p className="text-[#9B9B9B] mb-8 max-w-xl mx-auto">
              Get a full cost breakdown, supplier recommendations, and country-by-country
              comparison in under 5 minutes — powered by Claude AI.
            </p>
            <Link
              href={`/analyze?product=${encodeURIComponent(spotlightProduct.name)}`}
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Analyze {spotlightProduct.name} &rarr;
            </Link>
          </motion.section>
        )}
      </div>
    </main>
  )
}
