"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

interface Product {
  name: string
  category: string
  categoryColor: string
  categoryBg: string
  costRange: string
  growth: string
  emoji: string
  feasibility: number
  bestCountry: string
}

const PRODUCTS: Product[] = [
  {
    name: "40oz Stanley-style Tumbler",
    category: "Consumer Goods",
    categoryColor: "#3B82F6",
    categoryBg: "rgba(59,130,246,0.10)",
    costRange: "$3.80–6.50/unit",
    growth: "+47%",
    emoji: "💧",
    feasibility: 91,
    bestCountry: "China",
  },
  {
    name: "USB-C Magnetic Desk Lamp",
    category: "Electronics",
    categoryColor: "#F59E0B",
    categoryBg: "rgba(245,158,11,0.10)",
    costRange: "$7–14/unit",
    growth: "+33%",
    emoji: "💡",
    feasibility: 84,
    bestCountry: "China",
  },
  {
    name: "Biodegradable Bamboo Toothbrush (4-pack)",
    category: "Beauty",
    categoryColor: "#EC4899",
    categoryBg: "rgba(236,72,153,0.10)",
    costRange: "$0.70–1.60/unit",
    growth: "+58%",
    emoji: "🌿",
    feasibility: 94,
    bestCountry: "Vietnam",
  },
  {
    name: "AirTag-compatible Pet GPS Collar",
    category: "Pet Products",
    categoryColor: "#8B5CF6",
    categoryBg: "rgba(139,92,246,0.10)",
    costRange: "$14–28/unit",
    growth: "+71%",
    emoji: "🐾",
    feasibility: 76,
    bestCountry: "China",
  },
  {
    name: "MagSafe 3-in-1 Charging Station",
    category: "Electronics",
    categoryColor: "#F59E0B",
    categoryBg: "rgba(245,158,11,0.10)",
    costRange: "$9–18/unit",
    growth: "+39%",
    emoji: "🔋",
    feasibility: 82,
    bestCountry: "China",
  },
  {
    name: "6mm Cork-TPE Hybrid Yoga Mat",
    category: "Sports",
    categoryColor: "#22C55E",
    categoryBg: "rgba(34,197,94,0.10)",
    costRange: "$5.50–11/unit",
    growth: "+44%",
    emoji: "🧘",
    feasibility: 89,
    bestCountry: "India",
  },
  {
    name: "Compostable Mailer Bags (100-pack)",
    category: "Packaging",
    categoryColor: "#10B981",
    categoryBg: "rgba(16,185,129,0.10)",
    costRange: "$0.08–0.18/bag",
    growth: "+82%",
    emoji: "🛍️",
    feasibility: 93,
    bestCountry: "Vietnam",
  },
  {
    name: "Modular Silicone Kitchen Utensil Set (8-piece)",
    category: "Home & Kitchen",
    categoryColor: "#FF6B35",
    categoryBg: "rgba(255,107,53,0.10)",
    costRange: "$3.20–5.80/unit",
    growth: "+26%",
    emoji: "🍳",
    feasibility: 90,
    bestCountry: "China",
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const router = useRouter()

  function handleAnalyze() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bottlecap_hero_text", product.name)
    }
    router.push("/analyze")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07, ease: EASE }}
      className="flex flex-col bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-md transition-all duration-200 group"
    >
      {/* Top row: emoji + growth badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{product.emoji}</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22C55E] bg-[rgba(34,197,94,0.10)] px-2 py-0.5 rounded-full">
          ↑ {product.growth}
        </span>
      </div>

      {/* Category pill */}
      <span
        className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 tracking-wide"
        style={{ color: product.categoryColor, backgroundColor: product.categoryBg }}
      >
        {product.category}
      </span>

      {/* Product name */}
      <p className="text-sm font-bold text-[#1A1A1A] leading-snug mb-1">
        {product.name}
      </p>

      {/* Cost range */}
      <p className="text-xs text-[#6B6B6B] mb-1.5">
        Est. unit cost:{" "}
        <span className="font-semibold text-[#1A1A1A]">{product.costRange}</span>
      </p>

      {/* Feasibility + Country */}
      <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mb-4">
        <span>
          Feasibility:{" "}
          <span className={`font-semibold ${product.feasibility >= 85 ? "text-[#22C55E]" : product.feasibility >= 70 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
            {product.feasibility}/100
          </span>
        </span>
        <span className="text-[#E8E8E4]">|</span>
        <span className="font-medium text-[#1A1A1A]">{product.bestCountry}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleAnalyze}
        className="mt-auto text-xs font-semibold text-[#FF6B35] group-hover:underline text-left transition-colors duration-150"
      >
        Analyze this →
      </button>
    </motion.div>
  )
}

export default function TrendingProducts() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="py-20 bg-[#FAFAF8] border-t border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10"
        >
          {/* Subtitle badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#6B6B6B] bg-[#F0F0EC] border border-[#E8E8E4] px-3 py-1 rounded-full">
              Q1 2026 search trends &middot; Updated monthly
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            What founders are analyzing right now
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2 max-w-xl">
            Click any product to pre-fill the analyzer and get your report in under 5 minutes.
          </p>
        </motion.div>

        {/* Grid */}
        {isInView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.name} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
