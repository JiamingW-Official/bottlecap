"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowLeft, Copy, Check, ArrowRight, ChevronRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface HsEntry {
  code: string
  description: string
  chapter: string
  category: string
  mfnRate: number
  /** true = +25% Section 301 China tariff applies */
  china301: boolean
  /** Vietnam / Mexico rate = MFN (no 301) */
}

// ─── Database ─────────────────────────────────────────────────────────────────

const HS_DATABASE: HsEntry[] = [
  // Electronics – Chapter 84/85
  { code: "8471", description: "Computers & Laptops", chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true  },
  { code: "8517", description: "Mobile Phones",        chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true  },
  { code: "8518", description: "Audio / Speakers / Headphones", chapter: "Chapter 84/85", category: "Electronics", mfnRate: 4.9, china301: true  },
  { code: "8523", description: "USB Drives & Memory Cards",     chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true  },
  { code: "8543", description: "Electronic Gadgets & Smart Devices", chapter: "Chapter 84/85", category: "Electronics", mfnRate: 2.0, china301: true  },
  { code: "8516", description: "Kitchen Appliances",   chapter: "Chapter 84/85", category: "Electronics", mfnRate: 3.4, china301: true  },
  { code: "8525", description: "Cameras & Webcams",    chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true  },
  { code: "9405", description: "Lamps & Lighting Fixtures", chapter: "Chapter 94", category: "Electronics", mfnRate: 3.9, china301: true  },

  // Plastics – Chapter 39
  { code: "3926", description: "Plastic Articles NES",          chapter: "Chapter 39", category: "Plastics", mfnRate: 5.3, china301: true  },
  { code: "3923", description: "Plastic Containers & Bottles",  chapter: "Chapter 39", category: "Plastics", mfnRate: 3.0, china301: true  },
  { code: "3920", description: "Plastic Film & Sheeting",       chapter: "Chapter 39", category: "Plastics", mfnRate: 4.0, china301: true  },
  { code: "3924", description: "Plastic Tableware",             chapter: "Chapter 39", category: "Plastics", mfnRate: 3.4, china301: true  },

  // Textiles & Apparel – Chapters 61–63
  { code: "6109", description: "T-Shirts",                chapter: "Chapter 61–63", category: "Textiles", mfnRate: 16.5, china301: false },
  { code: "6203", description: "Men's Suits & Trousers",  chapter: "Chapter 61–63", category: "Textiles", mfnRate: 12.0, china301: false },
  { code: "6204", description: "Women's Dresses",         chapter: "Chapter 61–63", category: "Textiles", mfnRate: 16.0, china301: false },
  { code: "6404", description: "Athletic Footwear",       chapter: "Chapter 61–63", category: "Textiles", mfnRate: 20.0, china301: false },
  { code: "6403", description: "Leather Shoes",           chapter: "Chapter 61–63", category: "Textiles", mfnRate: 10.0, china301: false },
  { code: "6302", description: "Bed Linens",              chapter: "Chapter 61–63", category: "Textiles", mfnRate: 6.8,  china301: false },
  { code: "4202", description: "Backpacks & Luggage",     chapter: "Chapter 42",    category: "Textiles", mfnRate: 17.6, china301: false },

  // Metals – Chapter 73/76
  { code: "7326", description: "Steel Products NES",      chapter: "Chapter 73/76", category: "Metals", mfnRate: 3.0, china301: true  },
  { code: "7615", description: "Aluminum Kitchenware",    chapter: "Chapter 73/76", category: "Metals", mfnRate: 3.1, china301: true  },
  { code: "7304", description: "Steel Tubes & Pipes",     chapter: "Chapter 73/76", category: "Metals", mfnRate: 0,   china301: true  },

  // Furniture & Home – Chapter 94
  { code: "9401", description: "Chairs & Seating",        chapter: "Chapter 94", category: "Furniture", mfnRate: 0,   china301: true  },
  { code: "9403", description: "Other Furniture",         chapter: "Chapter 94", category: "Furniture", mfnRate: 0,   china301: true  },
  { code: "9404", description: "Mattresses & Bedding",    chapter: "Chapter 94", category: "Furniture", mfnRate: 3.0, china301: true  },

  // Toys & Sports – Chapter 95
  { code: "9503", description: "Dolls & Stuffed Animals", chapter: "Chapter 95", category: "Toys", mfnRate: 0,   china301: true  },
  { code: "9504", description: "Video Games & Puzzles",   chapter: "Chapter 95", category: "Toys", mfnRate: 0,   china301: true  },
  { code: "9506", description: "Sports Equipment",        chapter: "Chapter 95", category: "Toys", mfnRate: 4.6, china301: true  },

  // Beauty & Food – Chapter 33/21
  { code: "3304", description: "Cosmetics & Skincare",   chapter: "Chapter 33", category: "Beauty", mfnRate: 0,   china301: true  },
  { code: "3401", description: "Soap & Detergents",      chapter: "Chapter 33", category: "Beauty", mfnRate: 0,   china301: true  },
  { code: "2106", description: "Food Supplements",       chapter: "Chapter 21", category: "Beauty", mfnRate: 1.4, china301: true  },
  { code: "0902", description: "Tea & Herbal Drinks",    chapter: "Chapter 09", category: "Beauty", mfnRate: 0,   china301: true  },

  // Medical & Other
  { code: "9018", description: "Medical Instruments",    chapter: "Chapter 90", category: "Medical", mfnRate: 0,   china301: true  },
  { code: "8714", description: "Bicycle Parts",          chapter: "Chapter 87", category: "Medical", mfnRate: 3.7, china301: true  },
  { code: "8708", description: "Auto Accessories",       chapter: "Chapter 87", category: "Medical", mfnRate: 2.5, china301: true  },
  { code: "4911", description: "Printed Packaging",      chapter: "Chapter 49", category: "Medical", mfnRate: 0,   china301: true  },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Electronics", "Textiles", "Plastics", "Metals", "Furniture", "Toys", "Beauty", "Medical"] as const
type Category = typeof CATEGORIES[number]

const CHINA_301_RATE = 25

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rateColor(rate: number): string {
  if (rate === 0)   return "#22C55E"
  if (rate <= 5)    return "#F59E0B"
  if (rate <= 10)   return "#F97316"
  return "#EF4444"
}

function rateBg(rate: number): string {
  if (rate === 0)   return "rgba(34,197,94,0.1)"
  if (rate <= 5)    return "rgba(245,158,11,0.1)"
  if (rate <= 10)   return "rgba(249,115,22,0.1)"
  return "rgba(239,68,68,0.1)"
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200"
      style={{
        borderColor: copied ? "#22C55E" : "#E8E8E4",
        color: copied ? "#22C55E" : "#6B6B6B",
        background: copied ? "rgba(34,197,94,0.08)" : "white",
      }}
      aria-label={`Copy HS code ${text}`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy HS Code"}
    </button>
  )
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ entry }: { entry: HsEntry }) {
  const totalChina = entry.mfnRate + (entry.china301 ? CHINA_301_RATE : 0)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/40 hover:shadow-sm transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        {/* Left: badge + description */}
        <div className="flex items-start gap-3">
          <span
            className="font-mono font-black text-xl tracking-tight shrink-0 px-2.5 py-0.5 rounded-lg"
            style={{ color: "#FF6B35", background: "rgba(255,107,53,0.08)" }}
          >
            {entry.code}
          </span>
          <div>
            <p className="font-semibold text-[#1A1A1A] leading-snug">{entry.description}</p>
            <p className="text-xs text-[#9B9B9B] mt-0.5">{entry.chapter}</p>
          </div>
        </div>

        {/* Right: rate pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {/* MFN rate */}
          <div
            className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
            style={{ background: rateBg(entry.mfnRate) }}
          >
            <span className="text-[10px] font-medium text-[#9B9B9B] uppercase tracking-wide">MFN</span>
            <span className="text-lg font-black leading-tight" style={{ color: rateColor(entry.mfnRate) }}>
              {entry.mfnRate}%
            </span>
          </div>

          {/* China 301 */}
          {entry.china301 && (
            <div className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
              style={{ background: "rgba(239,68,68,0.08)" }}>
              <span className="text-[10px] font-medium text-[#9B9B9B] uppercase tracking-wide">China</span>
              <span className="text-lg font-black leading-tight text-[#EF4444]">
                +{CHINA_301_RATE}%
              </span>
            </div>
          )}

          {/* Vietnam / Mexico */}
          <div className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
            style={{ background: rateBg(entry.mfnRate) }}>
            <span className="text-[10px] font-medium text-[#9B9B9B] uppercase tracking-wide">VN/MX</span>
            <span className="text-lg font-black leading-tight" style={{ color: rateColor(entry.mfnRate) }}>
              {entry.mfnRate}%
            </span>
          </div>
        </div>
      </div>

      {/* China total callout */}
      {entry.china301 && (
        <div className="mb-3 flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(239,68,68,0.06)", color: "#EF4444" }}>
          <span className="font-semibold">Section 301 applies:</span>
          <span>Total China rate = <strong>{totalChina}%</strong> ({entry.mfnRate}% MFN + {CHINA_301_RATE}% tariff)</span>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <CopyButton text={entry.code} />
        <Link
          href={`/analyze?hs=${entry.code}`}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#FF6B35]/30 text-[#FF6B35] hover:bg-[#FF6B35]/5 transition-colors duration-150"
        >
          Analyze this product <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HsLookupPage() {
  const [inputValue, setInputValue] = useState("")
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 300 ms debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setQuery(inputValue), 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [inputValue])

  const results = useMemo(() => {
    let filtered = HS_DATABASE
    if (activeCategory !== "All") {
      filtered = filtered.filter((h) => h.category === activeCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (h) =>
          h.code.includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.chapter.toLowerCase().includes(q) ||
          h.category.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [query, activeCategory])

  // Stats
  const avgMfn = useMemo(() => {
    if (results.length === 0) return 0
    const sum = results.reduce((acc, r) => acc + r.mfnRate, 0)
    return Math.round((sum / results.length) * 10) / 10
  }, [results])

  const dutyFreeCount = useMemo(() => results.filter((r) => r.mfnRate === 0).length, [results])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Back */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      {/* Hero */}
      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3 tracking-tight">
        HS Code Lookup
      </h1>
      <p className="text-[#6B6B6B] mb-8 max-w-2xl text-base leading-relaxed">
        Search {HS_DATABASE.length} common HS codes across 8 product categories. See real US MFN tariff rates, China Section 301 surcharges, and Vietnam/Mexico sourcing alternatives — instantly.
      </p>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B] pointer-events-none" />
        <input
          type="text"
          placeholder="Search by product name or HS code…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-12 pr-5 py-3.5 outline-none text-base transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
            style={{
              background: activeCategory === cat ? "#FF6B35" : "white",
              color: activeCategory === cat ? "white" : "#6B6B6B",
              borderColor: activeCategory === cat ? "#FF6B35" : "#E8E8E4",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#6B6B6B] mb-5 px-1"
          >
            <span>
              <strong className="text-[#1A1A1A]">{results.length}</strong> result{results.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[#E8E8E4]">·</span>
            <span>
              Avg MFN rate: <strong className="text-[#1A1A1A]">{avgMfn}%</strong>
            </span>
            <span className="text-[#E8E8E4]">·</span>
            <span>
              <strong className="text-[#22C55E]">{dutyFreeCount}</strong> duty-free
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence mode="popLayout">
        {results.length > 0 ? (
          <motion.div className="space-y-3" key="results">
            {results.map((entry) => (
              <ResultCard key={entry.code} entry={entry} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-center py-20 px-6"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[#1A1A1A] font-semibold text-lg mb-2">No matching HS codes found</p>
            <p className="text-[#9B9B9B] text-sm mb-6 max-w-sm mx-auto">
              Try a broader search term, or use Bottlecap&rsquo;s AI classifier to get an exact HS code for any product.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "#FF6B35" }}
            >
              Classify with AI <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA footer */}
      <div
        className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)" }}
      >
        <div>
          <p className="font-semibold text-[#1A1A1A] mb-0.5">Need an exact HS code for your product?</p>
          <p className="text-sm text-[#6B6B6B]">
            Our AI provides precise 6–10 digit classification with a confidence score, full duty breakdown, and sourcing recommendations.
          </p>
        </div>
        <Link
          href="/analyze"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 whitespace-nowrap"
          style={{ background: "#FF6B35" }}
        >
          Get Full Analysis <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
