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
  ArrowRight,
  Zap,
  FileText,
} from "lucide-react"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"
import LiveActivityTicker from "@/components/LiveActivityTicker"
import { classifyProduct, type ClassificationResult } from "@/lib/classifyProduct"

const PLACEHOLDERS = [
  "A smart water bottle that reminds me to stay hydrated...",
  "Wireless earbuds with active noise cancellation, 30hr battery...",
  "A collapsible silicone food container for meal prep...",
  "Bluetooth fitness tracker with heart rate and sleep monitoring...",
  "A portable UV-C sterilizer wand for travel...",
  "Minimalist leather wallet with RFID blocking, 4-card slots...",
  "Modular desk organizer with bamboo and steel accents...",
  "A foldable solar panel charger for camping and hiking...",
]

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

// Estimated cost ranges per category keyword
const COST_HINTS: Record<string, { range: string; countries: string[] }> = {
  "Consumer Electronics": { range: "$8–$45", countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Wearable Tech":        { range: "$15–$80", countries: ["🇨🇳 China", "🇹🇼 Taiwan"] },
  "Audio Equipment":      { range: "$6–$35",  countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Kitchen & Dining":     { range: "$2–$25",  countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Fitness & Sports":     { range: "$4–$50",  countries: ["🇨🇳 China", "🇮🇳 India"] },
  "Beauty & Cosmetics":   { range: "$1–$20",  countries: ["🇨🇳 China", "🇰🇷 Korea"] },
  "Smart Home":           { range: "$12–$60", countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Bags & Luggage":       { range: "$5–$40",  countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Apparel":              { range: "$3–$25",  countries: ["🇨🇳 China", "🇧🇩 Bangladesh"] },
  "Pet Products":         { range: "$2–$18",  countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
  "Outdoor & Camping":    { range: "$5–$45",  countries: ["🇨🇳 China", "🇻🇳 Vietnam"] },
}

export default function AgenticHero() {
  const router = useRouter()
  const [heroText, setHeroText] = useState("")
  const [classification, setClassification] = useState<ClassificationResult | null>(null)
  const [statusText, setStatusText] = useState("")
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [showPlaceholderAnim, setShowPlaceholderAnim] = useState(true)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Rotate placeholder every 3s when input is empty
  useEffect(() => {
    if (heroText) return
    const interval = setInterval(() => {
      setShowPlaceholderAnim(false)
      setTimeout(() => {
        setPlaceholderIdx((p) => (p + 1) % PLACEHOLDERS.length)
        setShowPlaceholderAnim(true)
      }, 200)
    }, 3500)
    return () => clearInterval(interval)
  }, [heroText])

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
    if (val.trim().length >= 3 && val.trim().length < 5) setStatusText("Listening...")
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => classify(val), 300)
  }

  useEffect(() => { return () => clearTimeout(debounceRef.current) }, [])

  const handleAnalyzeClick = () => {
    if (heroText.trim()) sessionStorage.setItem("bottlecap_hero_text", heroText.trim())
    router.push("/analyze")
  }

  const hasChips =
    classification &&
    (classification.category || classification.materials.length > 0 || classification.complexity)

  // Cost hint for detected category
  const costHint = classification?.category?.name
    ? COST_HINTS[classification.category.name] ?? null
    : null

  return (
    <>
      <TextReveal
        as="h1"
        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A] leading-[1.05]"
      >
        Your product idea deserves to be made
      </TextReveal>
      <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
        Tell me what you want to make. I&apos;ll tell you if it&apos;s feasible,
        how much it costs, and where to manufacture it — in under 5 minutes.
      </p>

      <div className="mt-10 max-w-2xl">
        {/* Input */}
        <div className="bg-white border-2 border-[#E8E8E4] focus-within:border-[#FF6B35] rounded-2xl p-2 flex items-end transition-colors shadow-sm">
          <label htmlFor="product-input" className="sr-only">
            Describe your product idea
          </label>
          <textarea
            id="product-input"
            className="border-none flex-1 resize-none outline-none p-3 text-[#1A1A1A] bg-transparent min-h-[60px]"
            placeholder={showPlaceholderAnim ? PLACEHOLDERS[placeholderIdx] : ""}
            rows={2}
            value={heroText}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
              }
            }}
          />
          <MagneticButton>
            <button
              onClick={handleAnalyzeClick}
              className="bg-[#FF6B35] text-white rounded-xl px-6 py-3 font-semibold whitespace-nowrap hover:bg-[#E85A25] transition-all shadow-[0_2px_8px_rgba(255,107,53,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,53,0.35)] shrink-0 flex items-center gap-2"
            >
              Analyze my product <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>
        <div className="flex flex-col items-start gap-2 mt-3 ml-1">
          <p className="text-xs text-[#767676]">One report · $99 · 2-5 min delivery · 72-hr money back</p>
          <a
            href="/report/demo"
            className="inline-flex items-center gap-1.5 border border-[#E8E8E4] rounded-xl px-5 py-2.5 text-sm font-medium text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            See example report
          </a>
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
                    className="inline-flex items-center gap-1.5 bg-[#FFF0EB] text-[#FF6B35] rounded-full px-3 py-1 text-xs font-semibold border border-[#FF6B35]/20"
                  >
                    <Tag className="w-3 h-3" />
                    {classification.category.name}
                    {classification.category.confidence === "high" && (
                      <span className="text-[9px] opacity-60">· high confidence</span>
                    )}
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
                    {classification.complexity.charAt(0).toUpperCase() + classification.complexity.slice(1)} complexity
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
              className="text-xs text-[#767676] mt-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#FF6B35]" />
              {statusText}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Cost hint — appears when category detected */}
        <AnimatePresence>
          {costHint && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ delay: 0.1 }}
              className="mt-3 flex items-center gap-3 bg-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[#E8E8E4]"
            >
              <DollarSign className="w-4 h-4 text-[#FF6B35] shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-[#1A1A1A]">Typical cost: </span>
                <span className="text-xs font-black text-[#FF6B35]">{costHint.range}/unit</span>
                <span className="text-xs text-[#767676] ml-2">
                  · from {costHint.countries.join(", ")}
                </span>
              </div>
              <Zap className="w-3 h-3 text-[#767676] shrink-0" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Insight cards */}
        <AnimatePresence>
          {classification?.category && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {INSIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="bg-white/90 backdrop-blur border border-[#E8E8E4] rounded-xl p-3 hover:border-[#FF6B35]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
                      <card.icon className="w-3.5 h-3.5 text-[#FF6B35]" />
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A]">{card.title}</span>
                  </div>
                  <p className="text-[10px] text-[#767676] leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related products preview */}
        <AnimatePresence>
          {classification && classification.relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.45 }}
              className="mt-3 flex flex-wrap gap-2 items-center"
            >
              <span className="text-[10px] text-[#767676] font-medium">Similar products:</span>
              {classification.relatedProducts.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-1 bg-[#F5F5F0] border border-[#E8E8E4] rounded-full px-2.5 py-1 text-[10px] text-[#6B6B6B]"
                >
                  <BarChart3 className="w-2.5 h-2.5" />
                  {p.name}
                  <span className="text-[#FF6B35] font-semibold">${p.costRange.min}–${p.costRange.max}/unit</span>
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live activity ticker */}
      <div className="mt-4 max-w-2xl">
        <LiveActivityTicker />
      </div>
    </>
  )
}
