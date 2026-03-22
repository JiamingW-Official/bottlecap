"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  CheckCircle,
  X,
  ChevronDown,
  Share2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComparisonItem {
  name: string
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface ComparisonMetric {
  label: string
  valueA: string | number
  valueB: string | number
  winner: "A" | "B" | "tie"
  description?: string
}

export interface ComparisonEntry {
  slug: string
  type: "country" | "product" | "material" | "method"
  title: string
  itemA: ComparisonItem
  itemB: ComparisonItem
  metrics: ComparisonMetric[]
  verdict: string
  relatedSlugs: string[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const typeLabels: Record<ComparisonEntry["type"], string> = {
  country: "Country Comparison",
  product: "Product Comparison",
  material: "Material Comparison",
  method: "Method Comparison",
}

const checklistByType: Record<ComparisonEntry["type"], string[]> = {
  country: [
    "Do you need access to EU or CPTPP trade agreement benefits?",
    "Is your product subject to US Section 301 tariffs from China?",
    "Does your product require complex, multi-tier supply chains?",
    "Can you accept longer lead times (4–8 wks) for cost savings?",
    "Do you have existing supplier relationships in either country?",
    "Is IP protection a priority for your product design?",
  ],
  product: [
    "Have you validated market demand before committing to production?",
    "Do you have a finalized bill of materials (BOM)?",
    "Is your target retail price point clearly defined?",
    "Have you accounted for packaging and compliance costs?",
    "Do you need the product certified (CE, FCC, UL)?",
    "Is a minimum order quantity (MOQ) feasible for your cash flow?",
  ],
  material: [
    "Have you stress-tested this material under real-use conditions?",
    "Is the material RoHS / REACH compliant for your target market?",
    "Does the material choice affect your unit economics significantly?",
    "Have you sourced multiple backup suppliers for this material?",
    "Does your manufacturer have experience working with this material?",
    "Is the material recyclable or compostable if sustainability matters?",
  ],
  method: [
    "Do you have an existing, finalized product design?",
    "Is speed to market more important than unit cost?",
    "What is your expected annual production volume?",
    "Do you have budget for tooling and mold costs upfront?",
    "Does the method support your required surface finish and tolerances?",
    "Have you prototyped with this method before going to production?",
  ],
}

// ─── Helper: derive winner name ───────────────────────────────────────────────

function getWinnerName(
  metrics: ComparisonMetric[],
  itemAName: string,
  itemBName: string
): { name: string; side: "A" | "B" | "tie" } {
  let scoreA = 0
  let scoreB = 0
  for (const m of metrics) {
    if (m.winner === "A") scoreA++
    else if (m.winner === "B") scoreB++
  }
  if (scoreA > scoreB) return { name: itemAName, side: "A" }
  if (scoreB > scoreA) return { name: itemBName, side: "B" }
  return { name: "Tie", side: "tie" }
}

// ─── Helper: derive 3 verdict bullets ────────────────────────────────────────

function getVerdictBullets(verdict: string): string[] {
  // Split on period or semicolon, keep first 3 non-empty sentences
  const raw = verdict
    .split(/[.;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20)
  return raw.slice(0, 3)
}

// ─── Winner Banner ────────────────────────────────────────────────────────────

function WinnerBanner({
  comparison,
}: {
  comparison: ComparisonEntry
}) {
  const winner = getWinnerName(
    comparison.metrics,
    comparison.itemA.name,
    comparison.itemB.name
  )
  const bullets = getVerdictBullets(comparison.verdict)
  const bestFor =
    winner.side === "A"
      ? comparison.itemA.bestFor
      : winner.side === "B"
      ? comparison.itemB.bestFor
      : "Depends on your specific use case"

  if (winner.side === "tie") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-10 rounded-2xl border border-[#E8E8E4] bg-white p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Overall Result
            </p>
            <h2 className="text-2xl font-black text-[#1A1A1A]">It&apos;s a Tie</h2>
          </div>
        </div>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">{bestFor}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mb-10 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#E85A25] p-6 sm:p-8 text-white shadow-lg shadow-[#FF6B35]/20"
    >
      {/* Trophy + Winner label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Overall Winner
          </p>
          <h2 className="text-3xl font-black text-white leading-tight">
            {winner.name}
          </h2>
        </div>
      </div>

      {/* 3 key reasons */}
      {bullets.length > 0 && (
        <ul className="space-y-2 mb-5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/90">
              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-white" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Best for */}
      <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          Best for:
        </span>
        <span className="text-sm text-white font-medium">{bestFor}</span>
      </div>
    </motion.div>
  )
}

// ─── Quick Verdict Sidebar / Card ─────────────────────────────────────────────

function QuickVerdictCard({ comparison }: { comparison: ComparisonEntry }) {
  const winner = getWinnerName(
    comparison.metrics,
    comparison.itemA.name,
    comparison.itemB.name
  )
  const bullets = getVerdictBullets(comparison.verdict)
  const bestForTags =
    winner.side === "A"
      ? comparison.itemA.bestFor
      : winner.side === "B"
      ? comparison.itemB.bestFor
      : comparison.itemA.bestFor

  // Turn the bestFor string into simple comma-separated tags (split on comma)
  const tags = bestForTags
    .split(/[,.]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2 && t.length < 40)
    .slice(0, 4)

  return (
    <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-2xl p-6 sticky top-6">
      <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] mb-3">
        Our take in 10 seconds
      </p>
      <ul className="space-y-2 mb-5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#FF6B35]" />
            <span className="leading-snug">{b}</span>
          </li>
        ))}
      </ul>

      {tags.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">
            Best for:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-white border border-[#E8E8E4] text-[#1A1A1A] rounded-full px-2.5 py-1 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/analyze"
        className="flex items-center justify-center gap-2 w-full bg-[#FF6B35] text-white rounded-full px-4 py-3 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
      >
        Get a detailed analysis
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// ─── Metric Card (expandable) ─────────────────────────────────────────────────

function MetricCard({
  metric,
  itemAName,
  itemBName,
  index,
}: {
  metric: ComparisonMetric
  itemAName: string
  itemBName: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  // Compute visual bar widths (winner gets 80%, loser gets 45%, tie both 60%)
  const barA =
    metric.winner === "A" ? 80 : metric.winner === "tie" ? 60 : 40
  const barB =
    metric.winner === "B" ? 80 : metric.winner === "tie" ? 60 : 40

  const colorA =
    metric.winner === "A"
      ? "#22C55E"
      : metric.winner === "tie"
      ? "#FF6B35"
      : "#D1D5DB"
  const colorB =
    metric.winner === "B"
      ? "#22C55E"
      : metric.winner === "tie"
      ? "#FF6B35"
      : "#D1D5DB"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden"
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#1A1A1A]">
          {metric.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#6B6B6B] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Visual bars */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-4">
        {/* Option A */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6B6B6B] font-medium truncate">
              {itemAName}
            </span>
            {metric.winner === "A" && (
              <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0 ml-1" />
            )}
          </div>
          <div className="h-2 rounded-full bg-[#F5F5F0] overflow-hidden mb-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barA}%` }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 + 0.15 }}
              className="h-full rounded-full"
              style={{ backgroundColor: colorA }}
            />
          </div>
          <span
            className={`text-sm font-bold ${
              metric.winner === "A" ? "text-[#22C55E]" : "text-[#1A1A1A]"
            }`}
          >
            {metric.valueA}
          </span>
        </div>

        {/* Option B */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#6B6B6B] font-medium truncate">
              {itemBName}
            </span>
            {metric.winner === "B" && (
              <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0 ml-1" />
            )}
          </div>
          <div className="h-2 rounded-full bg-[#F5F5F0] overflow-hidden mb-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barB}%` }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 + 0.15 }}
              className="h-full rounded-full"
              style={{ backgroundColor: colorB }}
            />
          </div>
          <span
            className={`text-sm font-bold ${
              metric.winner === "B" ? "text-[#22C55E]" : "text-[#1A1A1A]"
            }`}
          >
            {metric.valueB}
          </span>
        </div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-[#E8E8E4]">
              {metric.description ? (
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {metric.description}
                </p>
              ) : (
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {metric.winner === "tie"
                    ? `${itemAName} and ${itemBName} perform comparably on ${metric.label}. The right choice depends on your specific product requirements.`
                    : `${metric.winner === "A" ? itemAName : itemBName} has a clear advantage on ${metric.label}. Consider how much this metric matters for your product category before making a final decision.`}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Item Card ────────────────────────────────────────────────────────────────

function ItemCard({
  item,
  label,
  isWinner,
}: {
  item: ComparisonItem
  label: string
  isWinner: boolean
}) {
  return (
    <div
      className={`bg-white rounded-2xl border flex flex-col p-6 sm:p-8 ${
        isWinner ? "border-[#22C55E] ring-1 ring-[#22C55E]/20" : "border-[#E8E8E4]"
      }`}
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-[#6B6B6B]">
            {label}
          </span>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1">{item.name}</h2>
        </div>
        {isWinner && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full shrink-0">
            <Trophy className="w-3 h-3" />
            Winner
          </span>
        )}
      </div>

      {/* Pros */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">
          Advantages
        </h3>
        <ul className="space-y-2">
          {item.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-[#1A1A1A]">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span className="text-sm leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">
          Disadvantages
        </h3>
        <ul className="space-y-2">
          {item.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-[#1A1A1A]">
              <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <span className="text-sm leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best For */}
      <div className="mt-auto pt-6 border-t border-[#E8E8E4]">
        <h3 className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Best For
        </h3>
        <p className="text-sm text-[#1A1A1A] leading-relaxed font-medium">
          {item.bestFor}
        </p>
      </div>
    </div>
  )
}

// ─── Before You Decide Checklist ──────────────────────────────────────────────

function BeforeYouDecide({ type }: { type: ComparisonEntry["type"] }) {
  const questions = checklistByType[type]
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }))

  const count = Object.values(checked).filter(Boolean).length

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
        Before You Decide
      </h2>
      <p className="text-[#6B6B6B] mb-6 text-sm">
        Check off the questions you can confidently answer. If you&apos;re missing more
        than two, you may need a deeper analysis first.
      </p>

      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 sm:p-8">
        <ul className="space-y-3">
          {questions.map((q, i) => (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex items-start gap-3 w-full text-left group"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checked[i]
                      ? "bg-[#22C55E] border-[#22C55E]"
                      : "border-[#D1D5DB] group-hover:border-[#FF6B35]"
                  }`}
                >
                  {checked[i] && <CheckCircle className="w-3 h-3 text-white fill-white" />}
                </div>
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    checked[i] ? "line-through text-[#6B6B6B]" : "text-[#1A1A1A]"
                  }`}
                >
                  {q}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-5 pt-5 border-t border-[#E8E8E4] flex items-center gap-2"
          >
            <div className="h-2 flex-1 bg-[#F5F5F0] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(count / questions.length) * 100}%` }}
                transition={{ duration: 0.3, ease: EASE }}
                className="h-full bg-[#22C55E] rounded-full"
              />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A] shrink-0">
              {count}/{questions.length} answered
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// ─── Related Comparisons ──────────────────────────────────────────────────────

function RelatedComparisons({
  related,
}: {
  related: ComparisonEntry[]
}) {
  if (related.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Also Compare</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.slice(0, 3).map((rel) => (
          <Link
            key={rel.slug}
            href={`/compare/${rel.slug}`}
            className="group bg-white rounded-2xl p-5 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all flex flex-col gap-2"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              {typeLabels[rel.type]}
            </span>
            <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors leading-snug">
              {rel.title}
            </h3>
            <p className="text-sm text-[#6B6B6B]">
              {rel.itemA.name} vs {rel.itemB.name}
            </p>
            <div className="mt-auto flex items-center gap-1 text-[#FF6B35] text-sm font-medium">
              <span>Compare</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── Share + CTA Strip ────────────────────────────────────────────────────────

function ShareCtaStrip({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <section className="mb-16">
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Share */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-[#FAFAF8] border border-[#E8E8E4] hover:border-[#FF6B35] text-[#1A1A1A] rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "Link copied!" : "Share this comparison"}
          </button>
          <p className="text-sm text-[#6B6B6B] hidden sm:block">
            Found this useful? Share it with your team.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/analyze"
          className="flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-[#E85A25] transition-colors shrink-0"
        >
          Get a report for your product
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComparisonTemplate({
  comparison,
  allComparisons,
}: {
  comparison: ComparisonEntry
  allComparisons: ComparisonEntry[]
}) {
  const related = allComparisons.filter(
    (c) =>
      comparison.relatedSlugs.includes(c.slug) && c.slug !== comparison.slug
  )

  const winner = getWinnerName(
    comparison.metrics,
    comparison.itemA.name,
    comparison.itemB.name
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.verdict,
    author: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.io",
    },
    publisher: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.io",
      logo: {
        "@type": "ImageObject",
        url: "https://bottlecap.io/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bottlecap.io/compare/${comparison.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/compare"
              className="hover:text-[#FF6B35] transition-colors"
            >
              Comparisons
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{comparison.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full mb-4">
              {typeLabels[comparison.type]}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-4">
              {comparison.title}
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
              A detailed side-by-side comparison of{" "}
              <strong className="text-[#1A1A1A]">{comparison.itemA.name}</strong>{" "}
              and{" "}
              <strong className="text-[#1A1A1A]">{comparison.itemB.name}</strong>{" "}
              to help you make a smarter manufacturing decision.
            </p>
          </header>

          {/* Winner Banner */}
          <WinnerBanner comparison={comparison} />

          {/* Two-column layout: main content + sticky sidebar */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main content column */}
            <div className="flex-1 min-w-0">

              {/* Side-by-Side Comparison */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  Side-by-Side Comparison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ItemCard
                    item={comparison.itemA}
                    label="Option A"
                    isWinner={winner.side === "A"}
                  />
                  <ItemCard
                    item={comparison.itemB}
                    label="Option B"
                    isWinner={winner.side === "B"}
                  />
                </div>
              </section>

              {/* Metric Cards */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  Key Metrics
                </h2>
                <p className="text-sm text-[#6B6B6B] mb-6">
                  Click any metric to see a detailed explanation.
                </p>
                <div className="space-y-3">
                  {comparison.metrics.map((metric, i) => (
                    <MetricCard
                      key={i}
                      metric={metric}
                      itemAName={comparison.itemA.name}
                      itemBName={comparison.itemB.name}
                      index={i}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#6B6B6B] mt-3">
                  Green bars indicate the winner for each metric. Ties indicate
                  roughly equivalent performance.
                </p>
              </section>

              {/* Before You Decide */}
              <BeforeYouDecide type={comparison.type} />

              {/* Share + CTA Strip */}
              <ShareCtaStrip title={comparison.title} />

              {/* Related Comparisons */}
              <RelatedComparisons related={related} />

              {/* Final CTA */}
              <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
                  Need a detailed analysis?
                </h2>
                <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto leading-relaxed">
                  Get a complete manufacturing feasibility report tailored to your
                  specific product idea, with cost breakdowns, supplier
                  recommendations, and optimization tips — delivered in 2&#8211;5 minutes.
                </p>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
                >
                  Get your Bottlecap report
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>
            </div>

            {/* Sticky sidebar — desktop only */}
            <aside className="hidden lg:block w-72 shrink-0">
              <QuickVerdictCard comparison={comparison} />
            </aside>
          </div>

          {/* Mobile Quick Verdict (shown above the two-col layout on small screens) */}
        </div>
      </main>
    </>
  )
}
