"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  Layers,
  Globe,
  FlaskConical,
  Tag,
  Cpu,
  Sparkles,
  BarChart3,
  DollarSign,
  Search,
} from "lucide-react"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"
import LiveActivityTicker from "@/components/LiveActivityTicker"
import { classifyProduct, type ClassificationResult } from "@/lib/classifyProduct"

const INSIGHT_CARDS = [
  {
    icon: Globe,
    title: "3-country comparison",
    desc: "Cost, quality & lead time across top manufacturing regions",
  },
  {
    icon: FlaskConical,
    title: "Material alternatives",
    desc: "Cost-saving material swaps your factory won't suggest",
  },
  {
    icon: Search,
    title: "HS code & tariff rate",
    desc: "Your exact import classification in plain English",
  },
]

export default function AgenticHero() {
  const router = useRouter()
  const [heroText, setHeroText] = useState("")
  const [classification, setClassification] =
    useState<ClassificationResult | null>(null)
  const [statusText, setStatusText] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const classify = useCallback((text: string) => {
    if (text.trim().length < 5) {
      setClassification(null)
      setStatusText("")
      return
    }

    setStatusText("Detecting category...")

    const result = classifyProduct(text)
    setClassification(result)

    if (result.category) {
      setStatusText(
        result.category.confidence === "high"
          ? `Detected: ${result.category.name}`
          : `Likely: ${result.category.name}`
      )
    } else {
      setStatusText("Analyzing...")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setHeroText(val)

    if (val.trim().length >= 3 && val.trim().length < 5) {
      setStatusText("Listening...")
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => classify(val), 300)
  }

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const handleAnalyzeClick = () => {
    if (heroText.trim()) {
      sessionStorage.setItem("bottlecap_hero_text", heroText.trim())
    }
    router.push("/analyze")
  }

  const hasChips =
    classification &&
    (classification.category ||
      classification.materials.length > 0 ||
      classification.complexity)

  return (
    <>
      <TextReveal
        as="h1"
        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]"
      >
        Your product idea deserves to be made
      </TextReveal>
      <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6">
        Tell me what you want to make. I&apos;ll tell you if it&apos;s feasible,
        how much it costs, and where to manufacture it — in under 5 minutes.
      </p>

      <div className="mt-10 max-w-2xl">
        {/* Input */}
        <div className="bg-white border-2 border-[#E8E8E4] focus-within:border-[#FF6B35] rounded-2xl p-2 flex items-end transition-colors">
          <textarea
            className="border-none flex-1 resize-none outline-none p-3 text-[#1A1A1A] placeholder:text-[#9B9B9B] bg-transparent min-h-[60px]"
            placeholder="Try: A smart water bottle that reminds me to stay hydrated..."
            rows={2}
            value={heroText}
            onChange={handleChange}
          />
          <MagneticButton>
            <button
              onClick={handleAnalyzeClick}
              className="bg-[#FF6B35] text-white rounded-xl px-6 py-3 font-semibold whitespace-nowrap hover:bg-[#E85A25] transition-all shadow-[0_2px_8px_rgba(255,107,53,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,53,0.35)] shrink-0"
            >
              {heroText.trim().length > 10 ? "Analyze this →" : "Start for $99 →"}
            </button>
          </MagneticButton>
        </div>

        {/* Classification chips */}
        <div className="mt-3 min-h-[32px]">
          <AnimatePresence mode="popLayout">
            {hasChips && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2"
              >
                {classification.category && (
                  <motion.span
                    key={`cat-${classification.category.name}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 bg-[#FFF0EB] text-[#FF6B35] rounded-full px-3 py-1 text-xs font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {classification.category.name}
                  </motion.span>
                )}
                {classification.materials.map((mat) => (
                  <motion.span
                    key={`mat-${mat}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#4F46E5] rounded-full px-3 py-1 text-xs font-medium"
                  >
                    <Layers className="w-3 h-3" />
                    {mat}
                  </motion.span>
                ))}
                {classification.complexity && (
                  <motion.span
                    key={`cplx-${classification.complexity}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      classification.complexity === "complex"
                        ? "bg-[#FEF2F2] text-[#DC2626]"
                        : classification.complexity === "moderate"
                          ? "bg-[#FFFBEB] text-[#D97706]"
                          : "bg-[#F0FDF4] text-[#16A34A]"
                    }`}
                  >
                    <Cpu className="w-3 h-3" />
                    {classification.complexity.charAt(0).toUpperCase() +
                      classification.complexity.slice(1)}{" "}
                    complexity
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status text */}
        <AnimatePresence mode="wait">
          {statusText && (
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-[#9B9B9B] mt-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#FF6B35]" />
              {statusText}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Insight cards — appear when classification has results */}
        <AnimatePresence>
          {classification?.category && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {INSIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="bg-white/80 backdrop-blur border border-[#E8E8E4] rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
                      <card.icon className="w-3.5 h-3.5 text-[#FF6B35]" />
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9B9B9B] leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related products preview */}
        <AnimatePresence>
          {classification &&
            classification.relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.4 }}
                className="mt-3 flex flex-wrap gap-2"
              >
                <span className="text-[10px] text-[#9B9B9B] self-center">
                  Similar products:
                </span>
                {classification.relatedProducts.map((p) => (
                  <span
                    key={p.name}
                    className="inline-flex items-center gap-1 bg-[#F5F5F0] rounded-full px-2.5 py-1 text-[10px] text-[#6B6B6B]"
                  >
                    <DollarSign className="w-2.5 h-2.5" />
                    {p.name} (${p.costRange.min}–${p.costRange.max}/unit)
                  </span>
                ))}
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
        {[
          { dot: "#22C55E", text: "Ready in 2–5 minutes" },
          { dot: "#9B9B9B", text: "Powered by Claude AI" },
          { dot: "#9B9B9B", text: "72-hour money-back guarantee" },
        ].map(item => (
          <span key={item.text} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.dot }} />
            {item.text}
          </span>
        ))}
      </div>

      {/* Live activity ticker */}
      <div className="mt-4 max-w-2xl">
        <LiveActivityTicker />
      </div>
    </>
  )
}
