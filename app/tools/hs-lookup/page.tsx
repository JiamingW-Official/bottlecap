"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowLeft, Copy, Check, ArrowRight, ChevronRight, ChevronDown, Info, AlertTriangle, TrendingDown, Globe2, BookOpen } from "lucide-react"

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

  // Additional Electronics
  { code: "8513", description: "Portable Lamps & Flashlights", chapter: "Chapter 84/85", category: "Electronics", mfnRate: 3.5, china301: true },
  { code: "8507", description: "Batteries & Battery Packs",    chapter: "Chapter 84/85", category: "Electronics", mfnRate: 3.4, china301: true },
  { code: "8504", description: "Power Adapters & Chargers",    chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true },
  { code: "9102", description: "Smart Watches & Wearables",    chapter: "Chapter 91",    category: "Electronics", mfnRate: 4.2, china301: true },
  { code: "8528", description: "Monitors & Displays",          chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0,   china301: true },
  { code: "8471.30", description: "Laptops & Portable Computers", chapter: "Chapter 84/85", category: "Electronics", mfnRate: 0, china301: true },

  // Additional Textiles
  { code: "6111", description: "Babies&apos; Garments",        chapter: "Chapter 61–63", category: "Textiles", mfnRate: 8.1,  china301: false },
  { code: "6217", description: "Clothing Accessories",         chapter: "Chapter 61–63", category: "Textiles", mfnRate: 14.6, china301: false },
  { code: "6301", description: "Blankets & Throws",            chapter: "Chapter 61–63", category: "Textiles", mfnRate: 8.4,  china301: false },
  { code: "6305", description: "Tote Bags & Shopping Bags",    chapter: "Chapter 61–63", category: "Textiles", mfnRate: 6.3,  china301: false },
  { code: "6115", description: "Socks & Hosiery",              chapter: "Chapter 61–63", category: "Textiles", mfnRate: 13.5, china301: false },

  // Additional Plastics
  { code: "3917", description: "Plastic Tubing & Hoses",       chapter: "Chapter 39", category: "Plastics", mfnRate: 3.8, china301: true },
  { code: "3921", description: "Foam & Insulation Panels",     chapter: "Chapter 39", category: "Plastics", mfnRate: 4.2, china301: true },
  { code: "3944", description: "Plastic Toys & Games",         chapter: "Chapter 39", category: "Plastics", mfnRate: 0,   china301: true },

  // Additional Furniture & Home
  { code: "9405.10", description: "Chandeliers & Ceiling Lamps", chapter: "Chapter 94", category: "Furniture", mfnRate: 3.7, china301: true },
  { code: "6306", description: "Tarpaulins & Outdoor Covers",    chapter: "Chapter 63", category: "Furniture", mfnRate: 9.4, china301: false },
  { code: "7013", description: "Glassware & Drinkware",          chapter: "Chapter 70", category: "Furniture", mfnRate: 9.8, china301: true },
  { code: "6911", description: "Ceramic Tableware & Cookware",   chapter: "Chapter 69", category: "Furniture", mfnRate: 6.0, china301: true },

  // Additional Beauty
  { code: "3307", description: "Shaving & Personal Care Products", chapter: "Chapter 33", category: "Beauty", mfnRate: 4.9, china301: true },
  { code: "9616", description: "Perfume Sprayers & Atomizers",    chapter: "Chapter 96", category: "Beauty", mfnRate: 4.6, china301: true },
  { code: "3305", description: "Hair Care Products",               chapter: "Chapter 33", category: "Beauty", mfnRate: 3.0, china301: true },
  { code: "3406", description: "Candles & Decorative Wax Items",  chapter: "Chapter 34", category: "Beauty", mfnRate: 0,   china301: true },

  // Metals
  { code: "8215", description: "Kitchen Cutlery & Utensils",  chapter: "Chapter 82", category: "Metals", mfnRate: 0,   china301: true },
  { code: "7323", description: "Steel Cookware & Pots",       chapter: "Chapter 73", category: "Metals", mfnRate: 5.3, china301: true },
  { code: "7612", description: "Aluminum Cans & Containers",  chapter: "Chapter 76", category: "Metals", mfnRate: 2.6, china301: true },
  { code: "8309", description: "Bottle Caps & Metal Closures", chapter: "Chapter 83", category: "Metals", mfnRate: 2.7, china301: true },

  // Toys
  { code: "9505", description: "Holiday & Seasonal Decorations", chapter: "Chapter 95", category: "Toys", mfnRate: 0,   china301: true },
  { code: "9508", description: "Amusement Rides & Equipment",    chapter: "Chapter 95", category: "Toys", mfnRate: 0,   china301: true },
  { code: "9502", description: "Action Figures & Collectibles",  chapter: "Chapter 95", category: "Toys", mfnRate: 0,   china301: true },
  { code: "9207", description: "Musical Instruments (Electric)", chapter: "Chapter 92", category: "Toys", mfnRate: 0,   china301: true },
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
            <p className="text-xs text-[#767676] mt-0.5">{entry.chapter}</p>
          </div>
        </div>

        {/* Right: rate pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {/* MFN rate */}
          <div
            className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
            style={{ background: rateBg(entry.mfnRate) }}
          >
            <span className="text-[10px] font-medium text-[#767676] uppercase tracking-wide">MFN</span>
            <span className="text-lg font-black leading-tight" style={{ color: rateColor(entry.mfnRate) }}>
              {entry.mfnRate}%
            </span>
          </div>

          {/* China 301 */}
          {entry.china301 && (
            <div className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
              style={{ background: "rgba(239,68,68,0.08)" }}>
              <span className="text-[10px] font-medium text-[#767676] uppercase tracking-wide">China</span>
              <span className="text-lg font-black leading-tight text-[#EF4444]">
                +{CHINA_301_RATE}%
              </span>
            </div>
          )}

          {/* Vietnam / Mexico */}
          <div className="flex flex-col items-center px-3 py-1.5 rounded-xl text-center min-w-[72px]"
            style={{ background: rateBg(entry.mfnRate) }}>
            <span className="text-[10px] font-medium text-[#767676] uppercase tracking-wide">VN/MX</span>
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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#767676] pointer-events-none" />
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
            <p className="text-[#767676] text-sm mb-6 max-w-sm mx-auto">
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

      {/* ── Educational: How to read an HS Code ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="mt-16 bg-white border border-[#E8E8E4] rounded-2xl p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#FF6B35]/10">
            <BookOpen className="w-4 h-4 text-[#FF6B35]" />
          </span>
          <h2 className="text-xl font-bold text-[#1A1A1A]">How to Read an HS Code</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
              HS codes are a globally standardized system of 6-digit numbers used to classify traded products. Every customs authority in 200+ countries uses the same first 6 digits — then adds country-specific digits (8-10 total) for more precision.
            </p>

            {/* Code anatomy */}
            <div className="bg-[#FAFAF8] rounded-xl p-4 font-mono">
              <div className="flex items-center gap-1 text-2xl font-black tracking-widest mb-3">
                <span className="text-[#3B82F6] bg-blue-50 rounded px-1">85</span>
                <span className="text-[#22C55E] bg-green-50 rounded px-1">18</span>
                <span className="text-[#F59E0B] bg-amber-50 rounded px-1">10</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <div className="font-bold text-[#3B82F6] mb-0.5">Chapter (2)</div>
                  <div className="text-[#6B6B6B]">Product family. 85 = Electrical equipment</div>
                </div>
                <div>
                  <div className="font-bold text-[#22C55E] mb-0.5">Heading (4)</div>
                  <div className="text-[#6B6B6B]">Sub-family. 8518 = Microphones, speakers</div>
                </div>
                <div>
                  <div className="font-bold text-[#F59E0B] mb-0.5">Subheading (6)</div>
                  <div className="text-[#6B6B6B]">Specific type. Used for customs filing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#FF6B35]" />
              Key things to know
            </h3>
            {[
              { title: "Wrong code = legal risk", body: "Misdeclaring an HS code is customs fraud. Use the correct code even if a higher tariff applies." },
              { title: "Codes change", body: "The WCO updates HS codes every 5 years. The most recent update was 2022. Always verify with your customs broker." },
              { title: "6 digits = international, 8-10 = country-specific", body: "US uses HTS (10 digits), EU uses CN (8 digits), China uses CIQ (13 digits)." },
              { title: "First-sale vs. transaction value", body: "Tariffs apply to the customs value (usually CIF price), not your retail price." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#1A1A1A]">{item.title}: </span>
                  <span className="text-[#6B6B6B]">{item.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Tariff rate context ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            icon: TrendingDown,
            title: "MFN Rate",
            color: "#22C55E",
            bg: "bg-green-50",
            body: "Most-Favored-Nation rate — the standard US tariff applied to most countries. 0% means duty-free. Applies to Vietnam, Mexico, India for most products.",
          },
          {
            icon: AlertTriangle,
            title: "Section 301 (China)",
            color: "#EF4444",
            bg: "bg-red-50",
            body: "Additional 25% tariff on thousands of Chinese products, imposed 2018–2019. Added on top of MFN. Check List 1, 2, 3, and 4A for your category.",
          },
          {
            icon: Globe2,
            title: "FTA Rates",
            color: "#3B82F6",
            bg: "bg-blue-50",
            body: "Free Trade Agreements (USMCA, CAFTA, FTA-Korea, etc.) can reduce tariffs to 0% if your product meets rules-of-origin requirements.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-[#E8E8E4] rounded-2xl p-5">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${item.bg} mb-3`}>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <h3 className="font-bold text-[#1A1A1A] mb-2 text-sm">{item.title}</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.body}</p>
          </div>
        ))}
      </motion.section>

      {/* ── Sourcing strategy guide ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="mt-6 bg-[#1A1A1A] rounded-2xl p-6 sm:p-8"
      >
        <h2 className="text-lg font-bold text-white mb-4">Tariff-Aware Sourcing Strategy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { step: "01", title: "Find your HS code", body: "Use this tool to identify your 4-digit heading. Note whether Section 301 applies." },
            { step: "02", title: "Calculate total landed cost", body: "MFN rate (+ 301 if from China) × customs value. Add freight, insurance, and brokerage fees." },
            { step: "03", title: "Compare sourcing countries", body: "If China total rate is 28%+, Vietnam or Mexico at MFN rate may save significant margin per unit." },
            { step: "04", title: "Verify with a customs broker", body: "For orders over $2,500, verify your classification with a licensed customs broker before committing to a supplier." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="text-2xl font-black text-[#FF6B35] leading-none shrink-0 font-mono">{s.step}</span>
              <div>
                <p className="font-semibold text-white text-sm mb-0.5">{s.title}</p>
                <p className="text-xs text-[#767676] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
