"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, BookOpen, ChevronRight } from "lucide-react"
import { GLOSSARY_TERMS, getTermsByCategory } from "@/lib/data/glossary"

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Trade Terms",
  "Manufacturing",
  "Quality",
  "Logistics",
  "Finance",
  "Legal",
] as const

type Category = (typeof CATEGORIES)[number]

const ALPHABET: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    "Trade Terms": "bg-blue-50 text-blue-700",
    Manufacturing: "bg-purple-50 text-purple-700",
    Quality: "bg-green-50 text-green-700",
    Logistics: "bg-amber-50 text-amber-700",
    Finance: "bg-red-50 text-red-700",
    Legal: "bg-slate-100 text-slate-700",
  }
  return map[category] ?? "bg-gray-100 text-gray-700"
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TermCard({ term }: { term: (typeof GLOSSARY_TERMS)[number] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35]/40 transition-all"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug">
            {term.term}
          </h3>
          {"acronym" in term && (term as {acronym?: string}).acronym && (
            <span className="shrink-0 font-mono text-xs font-semibold bg-[#FFF0EB] text-[#FF6B35] rounded-lg px-2.5 py-1 border border-[#FF6B35]/20">
              {(term as {acronym?: string}).acronym}
            </span>
          )}
        </div>

        {/* Definition */}
        <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
          {term.definition}
        </p>

        {/* Expanded: practical tip */}
        <AnimatePresence>
          {expanded && term.practicalTip && (
            <motion.div
              key="tip"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="bg-[#FFF0EB] rounded-xl px-4 py-3 border border-[#FF6B35]/15">
                <p className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wide mb-1">
                  Practical tip
                </p>
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  {term.practicalTip}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-xs font-medium rounded-full px-2.5 py-1 ${getCategoryColor(term.category)}`}
          >
            {term.category}
          </span>
          <Link
            href={`/glossary/${term.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B35] hover:text-[#E85A25] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const letterRefs = useRef<Record<string, HTMLElement | null>>({})
  const alphabetRef = useRef<HTMLDivElement>(null)
  const [availableLetters, setAvailableLetters] = useState<Set<string>>(new Set())

  // ── Filtered terms ──────────────────────────────────────────────────────

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCategory =
        activeCategory === "All" || t.category === activeCategory
      const matchesQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        (("acronym" in t && (t as {acronym?: string}).acronym?.toLowerCase().includes(q)) ?? false) ||
        t.definition.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [query, activeCategory])

  // ── Available letters for current filter ───────────────────────────────

  useEffect(() => {
    const letters = new Set(
      filteredTerms.map((t) => t.term[0].toUpperCase())
    )
    setAvailableLetters(letters)
  }, [filteredTerms])

  // ── Stats ───────────────────────────────────────────────────────────────

  const totalTerms = GLOSSARY_TERMS.length
  const categoryCount = CATEGORIES.length - 1 // exclude "All"

  // ── A-Z scroll handler ──────────────────────────────────────────────────

  const scrollToLetter = useCallback((letter: string) => {
    const el = letterRefs.current[letter]
    if (el) {
      const offset = 120 // account for sticky bars
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }, [])

  // ── Group terms by first letter ─────────────────────────────────────────

  const termsByLetter = useMemo(() => {
    const groups: Record<string, (typeof GLOSSARY_TERMS)[number][]> = {}
    for (const term of filteredTerms) {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    }
    return groups
  }, [filteredTerms])

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-10 sm:pt-28 sm:pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF6B35]/10">
              <BookOpen className="w-5 h-5 text-[#FF6B35]" />
            </span>
            <span className="text-sm font-semibold text-[#FF6B35] uppercase tracking-widest">
              Reference
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Glossary
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-5 leading-relaxed">
            From MOQs to FOB, manufacturing has its own language. Master{" "}
            {totalTerms} essential terms every founder should know.
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span className="font-bold text-[#1A1A1A]">{totalTerms}</span>
              <span className="text-[#6B6B6B]">total terms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="font-bold text-[#1A1A1A]">{categoryCount}</span>
              <span className="text-[#6B6B6B]">categories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-bold text-[#1A1A1A]">847</span>
              <span className="text-[#6B6B6B]">reports reference this weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky search + filters + A-Z ────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#FAFAF8]/95 backdrop-blur border-b border-[#E8E8E4] shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-3 space-y-3">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, acronyms, definitions…"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8E8E4] bg-white text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              const count =
                cat === "All"
                  ? GLOSSARY_TERMS.length
                  : getTermsByCategory(cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isActive
                      ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-sm"
                      : "bg-white text-[#6B6B6B] border-[#E8E8E4] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  {cat}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F5F5F0] text-[#9B9B9B]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* A-Z strip */}
          <div
            ref={alphabetRef}
            className="flex flex-wrap gap-0.5"
            aria-label="Jump to letter"
          >
            {ALPHABET.map((letter) => {
              const available = availableLetters.has(letter)
              return (
                <button
                  key={letter}
                  onClick={() => available && scrollToLetter(letter)}
                  disabled={!available}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                    available
                      ? "text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white cursor-pointer"
                      : "text-[#CDCDC8] cursor-default"
                  }`}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Term grid ────────────────────────────────────────────────────── */}
      <section className="py-10 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {filteredTerms.length === 0 ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F0] flex items-center justify-center mb-5">
                  <Search className="w-7 h-7 text-[#CDCDC8]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  No terms found
                </h3>
                <p className="text-[#6B6B6B] max-w-sm text-sm leading-relaxed">
                  No results for &ldquo;{query}&rdquo;. Try a different search
                  term or clear the filter.
                </p>
                <button
                  onClick={() => {
                    setQuery("")
                    setActiveCategory("All")
                  }}
                  className="mt-6 px-5 py-2.5 rounded-full bg-[#FF6B35] text-white text-sm font-semibold hover:bg-[#E85A25] transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              /* Letter-grouped cards */
              Object.entries(termsByLetter)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, terms]) => (
                  <motion.div
                    key={letter}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-12"
                  >
                    {/* Letter anchor heading */}
                    <h2
                      ref={(el) => {
                        letterRefs.current[letter] = el
                      }}
                      className="text-3xl font-black text-[#E8E8E4] mb-4 select-none"
                    >
                      {letter}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AnimatePresence mode="popLayout">
                        {terms.map((term) => (
                          <TermCard key={term.slug} term={term} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your product idea?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto leading-relaxed">
            Now that you know the terminology, put it to work. Get a complete
            manufacturing feasibility report with cost breakdowns, supplier
            recommendations, and optimization tips in minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Analyze my idea
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
