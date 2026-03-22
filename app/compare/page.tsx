"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { COMPARISONS } from "@/lib/data/comparisons"

// ── Static metadata is not compatible with "use client", so we skip it here.
// The parent layout provides a reasonable fallback title.

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_CONFIG = [
  {
    key: "country" as const,
    label: "Country vs Country",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    badgeColor: "bg-blue-50 text-blue-700 ring-blue-200/60",
    cardAccent: "group-hover:border-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    key: "method" as const,
    label: "Method & Strategy",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    badgeColor: "bg-purple-50 text-purple-700 ring-purple-200/60",
    cardAccent: "group-hover:border-purple-400",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    key: "material" as const,
    label: "Material vs Material",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    badgeColor: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
    cardAccent: "group-hover:border-emerald-400",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
]

// The 6 comparisons pinned to the "popular" strip (most broadly searched topics)
const POPULAR_SLUGS = [
  "china-vs-vietnam",
  "china-vs-mexico",
  "oem-vs-odm",
  "air-freight-vs-sea-freight",
  "abs-vs-polycarbonate",
  "alibaba-vs-direct-sourcing",
]

// The top 3 featured comparisons shown in the hero
const FEATURED_SLUGS = [
  "china-vs-vietnam",
  "china-vs-mexico",
  "oem-vs-odm",
]

// Approximate read time per comparison (all are similar length)
function readTime(metricCount: number): string {
  const minutes = Math.max(3, Math.round(metricCount * 0.6 + 2))
  return `${minutes} min read`
}

// Determine which side "won" overall (most metric wins)
function overallWinner(comparison: (typeof COMPARISONS)[number]): "A" | "B" | "tie" {
  let a = 0, b = 0
  for (const m of comparison.metrics) {
    if (m.winner === "A") a++
    else if (m.winner === "B") b++
  }
  if (a > b) return "A"
  if (b > a) return "B"
  return "tie"
}

// ── Card animations ──────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}

// ── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ type }: { type: "country" | "method" | "material" | "product" }) {
  const cfg = CATEGORY_CONFIG.find((c) => c.key === type)
  if (!cfg) return null
  const label =
    type === "country" ? "Country" : type === "method" ? "Method" : "Material"
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${cfg.badgeColor}`}
    >
      {label}
    </span>
  )
}

function WinnerBadge({
  winner,
  nameA,
  nameB,
}: {
  winner: "A" | "B" | "tie"
  nameA: string
  nameB: string
}) {
  if (winner === "tie")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FFF4EE] text-[#FF6B35] ring-1 ring-[#FFD4C0] px-2.5 py-1 rounded-full">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
        Tie
      </span>
    )

  const name = winner === "A" ? nameA : nameB
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FFF4EE] text-[#FF6B35] ring-1 ring-[#FFD4C0] px-2.5 py-1 rounded-full">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
      {name} wins
    </span>
  )
}

// ── Featured card (large, full-row or 2-col) ─────────────────────────────────

function FeaturedCard({
  comparison,
  index,
}: {
  comparison: (typeof COMPARISONS)[number]
  index: number
}) {
  const cfg = CATEGORY_CONFIG.find((c) => c.key === comparison.type)
  const winner = overallWinner(comparison)
  const winnerName =
    winner === "A"
      ? comparison.itemA.name
      : winner === "B"
      ? comparison.itemB.name
      : null

  // Pick 2 highlight metrics (first winner-decided ones)
  const highlights = comparison.metrics
    .filter((m) => m.winner !== "tie")
    .slice(0, 2)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Link
        href={`/compare/${comparison.slug}`}
        className="group flex flex-col bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF9A6C]" />

        <div className="p-7 flex flex-col gap-5 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <CategoryBadge type={comparison.type} />
            {winner !== "tie" && winnerName && (
              <WinnerBadge
                winner={winner}
                nameA={comparison.itemA.name}
                nameB={comparison.itemB.name}
              />
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#1A1A1A] leading-snug group-hover:text-[#FF6B35] transition-colors">
            {comparison.title}
          </h3>

          {/* Verdict preview */}
          <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
            {comparison.verdict}
          </p>

          {/* Metric highlights */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((m) => (
                <div
                  key={m.label}
                  className="bg-[#FAFAF8] rounded-xl p-3 border border-[#E8E8E4]"
                >
                  <p className="text-[11px] text-[#9B9B9B] font-medium uppercase tracking-wide mb-1">
                    {m.label}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                    <span
                      className={
                        m.winner === "A"
                          ? "text-[#FF6B35]"
                          : "text-[#9B9B9B] line-through decoration-1"
                      }
                    >
                      {m.valueA}
                    </span>
                    <span className="text-[#D0D0C8]">vs</span>
                    <span
                      className={
                        m.winner === "B"
                          ? "text-[#FF6B35]"
                          : "text-[#9B9B9B] line-through decoration-1"
                      }
                    >
                      {m.valueB}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-xs text-[#9B9B9B]">
              {comparison.metrics.length} metrics compared &middot;{" "}
              {readTime(comparison.metrics.length)}
            </span>
            <span className="text-sm font-semibold text-[#FF6B35] group-hover:translate-x-1 transition-transform inline-block">
              Read comparison &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Compact grid card ─────────────────────────────────────────────────────────

function CompactCard({
  comparison,
  index,
  cfg,
}: {
  comparison: (typeof COMPARISONS)[number]
  index: number
  cfg: (typeof CATEGORY_CONFIG)[number]
}) {
  const winner = overallWinner(comparison)

  return (
    <motion.div
      key={comparison.slug}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Link
        href={`/compare/${comparison.slug}`}
        className={`group flex flex-col bg-white rounded-2xl border border-[#E8E8E4] ${cfg.cardAccent} hover:shadow-md transition-all duration-200 p-5 h-full`}
      >
        <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
          <CategoryBadge type={comparison.type} />
          <WinnerBadge
            winner={winner}
            nameA={comparison.itemA.name}
            nameB={comparison.itemB.name}
          />
        </div>

        <h3 className="font-bold text-[#1A1A1A] mb-2 text-[15px] leading-snug group-hover:text-[#FF6B35] transition-colors">
          {comparison.title}
        </h3>

        <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed flex-1">
          {comparison.verdict}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0F0EC]">
          <span className="text-[11px] text-[#9B9B9B]">
            {comparison.metrics.length} metrics &middot; {readTime(comparison.metrics.length)}
          </span>
          <span className="text-xs font-semibold text-[#FF6B35] group-hover:translate-x-0.5 transition-transform inline-block">
            View &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const [query, setQuery] = useState("")

  const featured = useMemo(
    () => FEATURED_SLUGS.map((s) => COMPARISONS.find((c) => c.slug === s)).filter(Boolean) as (typeof COMPARISONS)[number][],
    []
  )

  const popular = useMemo(
    () => POPULAR_SLUGS.map((s) => COMPARISONS.find((c) => c.slug === s)).filter(Boolean) as (typeof COMPARISONS)[number][],
    []
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return COMPARISONS as unknown as (typeof COMPARISONS)[number][]
    const q = query.toLowerCase()
    return (COMPARISONS as unknown as (typeof COMPARISONS)[number][]).filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.verdict.toLowerCase().includes(q) ||
        c.itemA.name.toLowerCase().includes(q) ||
        c.itemB.name.toLowerCase().includes(q)
    )
  }, [query])

  const isSearching = query.trim().length > 0

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#9B9B9B] mb-8">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5 text-[#D0D0C8]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[#1A1A1A] font-medium">Comparisons</span>
          </nav>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
              Manufacturing Comparisons
            </h1>
            <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-5 leading-relaxed">
              Side-by-side breakdowns to help you make smarter sourcing decisions.
              Real data, clear verdicts.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            {[
              { label: `${COMPARISONS.length} comparisons`, icon: "📊" },
              { label: "3 categories", icon: "🗂️" },
              { label: "Updated monthly", icon: "🔄" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#E8E8E4] text-sm text-[#6B6B6B] font-medium shadow-sm"
              >
                <span>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Search bar ───────────────────────────────────────────────────── */}
      <section className="py-8 border-b border-[#E8E8E4] bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#9B9B9B]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search comparisons — e.g. China, injection molding, cotton…"
              className="w-full pl-11 pr-10 py-3.5 text-sm bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] transition-all placeholder:text-[#C0C0BC] text-[#1A1A1A]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-2.5 text-xs text-[#9B9B9B]">
              {filtered.length === 0
                ? "No comparisons match that search."
                : `${filtered.length} comparison${filtered.length === 1 ? "" : "s"} found`}
            </p>
          )}
        </div>
      </section>

      {/* ── Search results (shown only while searching) ───────────────────── */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.section
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="py-12"
          >
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-sm font-semibold text-[#9B9B9B] uppercase tracking-wider mb-6">
                Search results
              </h2>
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-[#6B6B6B] font-medium">No comparisons found for &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-[#9B9B9B] mt-2">Try a country name, material, or method.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map((comparison, i) => {
                    const cfg = CATEGORY_CONFIG.find((c) => c.key === comparison.type) ?? CATEGORY_CONFIG[0]
                    return (
                      <CompactCard
                        key={comparison.slug}
                        comparison={comparison}
                        index={i}
                        cfg={cfg}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Default content (hidden while searching) ──────────────────────── */}
      <AnimatePresence>
        {!isSearching && (
          <motion.div
            key="default-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── Featured comparisons ────────────────────────────────────── */}
            <section className="pt-14 pb-10">
              <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-1.5 bg-[#FFF4EE] text-[#FF6B35] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-[#FFD4C0]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.453 1.405 1.02L10 15.591l4.069 2.485c.713.434 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                    </svg>
                    Featured
                  </div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Top comparisons</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featured.map((comparison, i) => (
                    <FeaturedCard key={comparison.slug} comparison={comparison} index={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── Popular strip ────────────────────────────────────────────── */}
            <section className="py-8 bg-white border-y border-[#E8E8E4]">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-wider mb-4">
                  Most searched
                </p>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                  {popular.map((comparison, i) => (
                    <motion.div
                      key={comparison.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={`/compare/${comparison.slug}`}
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-[#FAFAF8] hover:bg-[#FFF4EE] border border-[#E8E8E4] hover:border-[#FF6B35] rounded-full px-4 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#FF6B35] transition-all whitespace-nowrap"
                      >
                        {comparison.type === "country" && (
                          <span className="text-base">🌍</span>
                        )}
                        {comparison.type === "method" && (
                          <span className="text-base">⚙️</span>
                        )}
                        {comparison.type === "material" && (
                          <span className="text-base">🧱</span>
                        )}
                        {comparison.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Quick decision strip ────────────────────────────────────── */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-4">Quick decisions</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      question: "Lowest cost with acceptable quality?",
                      answer: "China",
                      detail: "Still the default for most consumer goods under 20kg. Add 25% tariff buffer if selling to US.",
                      href: "/compare/china-vs-vietnam",
                      color: "#3B82F6",
                    },
                    {
                      question: "Avoid US tariffs on electronics?",
                      answer: "Vietnam",
                      detail: "MFN rates apply, no Section 301. Lead times 2-4 weeks longer than China. Growing fast.",
                      href: "/compare/china-vs-vietnam",
                      color: "#22C55E",
                    },
                    {
                      question: "OEM vs ODM — first-time founder?",
                      answer: "OEM",
                      detail: "ODM is faster but you lose IP control. Start OEM if your product has unique features worth protecting.",
                      href: "/compare/oem-vs-odm",
                      color: "#F59E0B",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                    >
                      <Link
                        href={item.href}
                        className="group flex flex-col h-full bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-md transition-all"
                      >
                        <p className="text-xs text-[#9B9B9B] mb-2 leading-snug">{item.question}</p>
                        <p className="text-2xl font-black mb-2" style={{ color: item.color }}>{item.answer}</p>
                        <p className="text-xs text-[#6B6B6B] leading-relaxed flex-1">{item.detail}</p>
                        <p className="text-xs font-semibold text-[#FF6B35] mt-3 group-hover:underline">Read comparison →</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Grouped sections ─────────────────────────────────────────── */}
            <section className="py-14">
              <div className="max-w-5xl mx-auto px-6 space-y-16">
                {CATEGORY_CONFIG.map(({ key, label, icon, badgeColor, iconBg, cardAccent }) => {
                  const items = (COMPARISONS as unknown as (typeof COMPARISONS)[number][]).filter(
                    (c) => c.type === key
                  )
                  if (items.length === 0) return null
                  const cfg = { key, label, icon, badgeColor, iconBg, cardAccent }

                  return (
                    <div key={key}>
                      {/* Section header */}
                      <div className="flex items-center gap-3 mb-7">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
                          {icon}
                        </div>
                        <h2 className="text-2xl font-bold text-[#1A1A1A]">{label}</h2>
                        <span className="ml-1 inline-flex items-center justify-center h-6 min-w-[1.5rem] px-1.5 rounded-full bg-[#F0F0EC] text-xs font-bold text-[#6B6B6B]">
                          {items.length}
                        </span>
                      </div>

                      {/* Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {items.map((comparison, i) => (
                          <CompactCard
                            key={comparison.slug}
                            comparison={comparison}
                            index={i}
                            cfg={cfg as (typeof CATEGORY_CONFIG)[number]}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ── Can't find what you need? ────────────────────────────────── */}
            <section className="py-16 bg-white border-t border-[#E8E8E4]">
              <div className="max-w-4xl mx-auto px-6">
                <div className="bg-[#FAFAF8] rounded-3xl border border-[#E8E8E4] p-10">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] mb-3">
                    Can&apos;t find what you need?
                  </p>
                  <h2 className="text-3xl font-black text-[#1A1A1A] mb-4 leading-tight">
                    Build your own comparison
                  </h2>
                  <p className="text-[#6B6B6B] mb-8 max-w-xl leading-relaxed">
                    These guides cover the most common decisions. For custom analysis
                    tailored to your product, volume, and budget — use our tools or get
                    a full AI report in under 5 minutes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      href="/tools/country-compare"
                      className="group flex flex-col gap-2 bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all p-5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                        </svg>
                      </div>
                      <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#FF6B35] transition-colors">
                        Country Compare Tool
                      </p>
                      <p className="text-xs text-[#9B9B9B] leading-relaxed">
                        Compare any two countries side-by-side across cost, speed, and risk.
                      </p>
                    </Link>

                    <Link
                      href="/tools/cost-calculator"
                      className="group flex flex-col gap-2 bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all p-5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.613 4.5 4.718V19.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V4.718c0-1.105-.807-2.019-1.907-2.147A48.507 48.507 0 0 0 12 2.25Z" />
                        </svg>
                      </div>
                      <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#FF6B35] transition-colors">
                        Landed Cost Calculator
                      </p>
                      <p className="text-xs text-[#9B9B9B] leading-relaxed">
                        Factor in tariffs, freight, and duties to find your true unit cost.
                      </p>
                    </Link>

                    <Link
                      href="/analyze"
                      className="group flex flex-col gap-2 bg-white rounded-2xl border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all p-5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#FFF4EE] flex items-center justify-center text-[#FF6B35] mb-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                        </svg>
                      </div>
                      <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#FF6B35] transition-colors">
                        AI Analysis Report
                      </p>
                      <p className="text-xs text-[#9B9B9B] leading-relaxed">
                        Custom sourcing report for your product in under 5 minutes. $99.
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
