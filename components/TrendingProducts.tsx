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
}

const PRODUCTS: Product[] = [
  {
    name: "Insulated Water Bottle",
    category: "Consumer Goods",
    categoryColor: "#3B82F6",
    categoryBg: "rgba(59,130,246,0.10)",
    costRange: "$4–8/unit",
    growth: "+34%",
    emoji: "💧",
  },
  {
    name: "LED Desk Lamp",
    category: "Electronics",
    categoryColor: "#F59E0B",
    categoryBg: "rgba(245,158,11,0.10)",
    costRange: "$6–12/unit",
    growth: "+28%",
    emoji: "💡",
  },
  {
    name: "Bamboo Toothbrush Set",
    category: "Beauty",
    categoryColor: "#EC4899",
    categoryBg: "rgba(236,72,153,0.10)",
    costRange: "$0.80–2/unit",
    growth: "+51%",
    emoji: "🌿",
  },
  {
    name: "Pet Collar with GPS",
    category: "Pet Products",
    categoryColor: "#8B5CF6",
    categoryBg: "rgba(139,92,246,0.10)",
    costRange: "$18–35/unit",
    growth: "+62%",
    emoji: "🐾",
  },
  {
    name: "Portable Phone Charger",
    category: "Electronics",
    categoryColor: "#F59E0B",
    categoryBg: "rgba(245,158,11,0.10)",
    costRange: "$8–15/unit",
    growth: "+19%",
    emoji: "🔋",
  },
  {
    name: "Yoga Mat",
    category: "Sports",
    categoryColor: "#22C55E",
    categoryBg: "rgba(34,197,94,0.10)",
    costRange: "$5–10/unit",
    growth: "+41%",
    emoji: "🧘",
  },
  {
    name: "Reusable Produce Bags",
    category: "Packaging",
    categoryColor: "#10B981",
    categoryBg: "rgba(16,185,129,0.10)",
    costRange: "$0.60–1.20/unit",
    growth: "+77%",
    emoji: "🛍️",
  },
  {
    name: "Silicone Kitchen Utensils Set",
    category: "Home & Kitchen",
    categoryColor: "#FF6B35",
    categoryBg: "rgba(255,107,53,0.10)",
    costRange: "$3–6/unit",
    growth: "+23%",
    emoji: "🍳",
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
      <p className="text-xs text-[#6B6B6B] mb-4">
        Est. unit cost:{" "}
        <span className="font-semibold text-[#1A1A1A]">{product.costRange}</span>
      </p>

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
              Updated monthly based on our analysis patterns
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
