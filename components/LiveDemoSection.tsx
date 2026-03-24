"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Check, ChevronRight, Terminal, Zap } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"

/* ─── Types ─── */

interface Country {
  flag: string
  name: string
  cost: string
  rating: number
  best: boolean
}

interface AnalysisStep {
  label: string
  detail: string
  thinking: string
  confidence: number // 1-5
  elapsed: string
}

interface RadarScores {
  Cost: number
  Quality: number
  Speed: number
  Risk: number
  Margin: number
}

interface DemoProduct {
  label: string
  emoji: string
  text: string
  hsCode: string
  tariff: string
  score: number
  scoreLabel: string
  moq: string
  lead: string
  insights: string[]
  marginTip: string
  countries: Country[]
  steps: AnalysisStep[]
  radar: RadarScores
}

type Phase = "typing" | "analyzing" | "result"

/* ─── Product data ─── */

const DEMO_PRODUCTS: DemoProduct[] = [
  {
    label: "Espresso Maker",
    emoji: "☕",
    text: "A portable espresso maker — aluminum body, manual pump, compatible with Nespresso pods, dishwasher-safe drip tray, 80ml capacity...",
    hsCode: "8516.71.0040",
    tariff: "3.4%",
    score: 84,
    scoreLabel: "Highly feasible",
    moq: "300 units",
    lead: "28 days",
    insights: ["Switch to PP plastic body → save $1.40/unit", "FDA food-contact cert adds 3 weeks lead time"],
    marginTip: "At $39 retail + $11.20 COGS = 71% gross margin",
    radar: { Cost: 85, Quality: 78, Speed: 72, Risk: 65, Margin: 88 },
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$11.20", rating: 84, best: true },
      { flag: "🇻🇳", name: "Vietnam", cost: "$13.50", rating: 76, best: false },
      { flag: "🇲🇽", name: "Mexico",  cost: "$17.80", rating: 68, best: false },
    ],
    steps: [
      { label: "Classifying product", detail: "Kitchen appliance · beverage equipment", thinking: "Checking 8516.71 against HTSUS Chapter 85... matched with 3.4% MFN rate", confidence: 5, elapsed: "0.4s" },
      { label: "Looking up HS code", detail: "8516.71.0040 identified", thinking: "Cross-referencing with CBP rulings database... 98.7% confidence on subheading", confidence: 5, elapsed: "0.8s" },
      { label: "Estimating materials", detail: "Aluminum, BPA-free plastic, silicone", thinking: "Pricing 6061-T6 aluminum at $2.40/kg, injection-mold ABS at $1.80/kg for housing", confidence: 4, elapsed: "1.2s" },
      { label: "Calculating labor costs", detail: "China · Vietnam · Mexico compared", thinking: "Shenzhen avg assembly wage $4.80/hr vs Ho Chi Minh $3.20/hr vs Monterrey $5.90/hr", confidence: 4, elapsed: "1.6s" },
      { label: "Computing tariff rates", detail: "US import duty: 3.4%", thinking: "No Section 301 surcharge on 8516.71... standard MFN applies, no FTA benefit", confidence: 5, elapsed: "2.0s" },
      { label: "Running compliance check", detail: "FDA food-contact, CE certification", thinking: "FDA 21 CFR 177 required for food-contact plastics... CE LVD + EMC for EU export", confidence: 3, elapsed: "2.4s" },
      { label: "Assembling report", detail: "12-section feasibility report", thinking: "Compiling cost model, supplier matrix, risk assessment, margin projections...", confidence: 5, elapsed: "2.8s" },
    ],
  },
  {
    label: "Smart Speaker",
    emoji: "🔊",
    text: "A compact smart speaker with built-in WiFi, voice assistant, 360° audio, LED ring, 8-hour battery, USB-C charging...",
    hsCode: "8518.21.0000",
    tariff: "0%",
    score: 76,
    scoreLabel: "Feasible — plan for FCC",
    moq: "500 units",
    lead: "35 days",
    insights: ["FCC Part 15 cert: budget $3K–8K + 6–8 weeks", "China dominates WiFi module supply chain"],
    marginTip: "At $79 retail + $18.40 COGS = 77% gross margin",
    radar: { Cost: 72, Quality: 82, Speed: 65, Risk: 58, Margin: 80 },
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$18.40", rating: 90, best: true },
      { flag: "🇹🇼", name: "Taiwan",  cost: "$24.10", rating: 82, best: false },
      { flag: "🇻🇳", name: "Vietnam", cost: "$21.80", rating: 74, best: false },
    ],
    steps: [
      { label: "Classifying product", detail: "Consumer electronics · audio device", thinking: "Matching to 8518.21 — single loudspeaker mounted in enclosure... duty-free under MFN", confidence: 5, elapsed: "0.3s" },
      { label: "Looking up HS code", detail: "8518.21.0000 identified", thinking: "Verified against ITC harmonized tariff schedule revision 2025-Q4", confidence: 5, elapsed: "0.7s" },
      { label: "Estimating materials", detail: "PCB, speaker driver, battery, ABS", thinking: "ESP32-S3 WiFi module $1.90, 40mm full-range driver $0.85, 3000mAh LiPo $2.10", confidence: 4, elapsed: "1.1s" },
      { label: "Calculating labor costs", detail: "China · Taiwan · Vietnam compared", thinking: "SMT assembly in Shenzhen $0.12/component, 47 components per board = $5.64 PCB assy", confidence: 4, elapsed: "1.5s" },
      { label: "Computing tariff rates", detail: "US import duty: 0%", thinking: "8518.21 — zero duty confirmed, but Section 301 List 4A may apply at 7.5%", confidence: 4, elapsed: "1.9s" },
      { label: "Running compliance check", detail: "FCC Part 15, CE RED required", thinking: "WiFi 2.4+5GHz requires FCC ID, not just SDoC... budget 8 weeks for testing", confidence: 3, elapsed: "2.3s" },
      { label: "Assembling report", detail: "12-section feasibility report", thinking: "Compiling BOM breakdown, certification timeline, supplier shortlist...", confidence: 5, elapsed: "2.7s" },
    ],
  },
  {
    label: "Yoga Mat",
    emoji: "🧘",
    text: "A 6mm thick yoga mat made from natural rubber, non-slip texture, alignment guides printed, carry strap included, 183×61cm...",
    hsCode: "4016.99.3590",
    tariff: "2.5%",
    score: 92,
    scoreLabel: "Highly feasible — great margins",
    moq: "200 units",
    lead: "21 days",
    insights: ["Vietnam natural rubber = best cost+quality combo", "Prop 65 warning required for US retail sales"],
    marginTip: "At $35 retail + $4.90 COGS = 86% gross margin",
    radar: { Cost: 92, Quality: 80, Speed: 88, Risk: 78, Margin: 95 },
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$5.80", rating: 80, best: false },
      { flag: "🇻🇳", name: "Vietnam", cost: "$4.90", rating: 88, best: true },
      { flag: "🇮🇳", name: "India",   cost: "$4.20", rating: 72, best: false },
    ],
    steps: [
      { label: "Classifying product", detail: "Sports equipment · fitness accessory", thinking: "Natural rubber mat → Chapter 40, vulcanized rubber articles, not foam (4016 not 4008)", confidence: 5, elapsed: "0.3s" },
      { label: "Looking up HS code", detail: "4016.99.3590 identified", thinking: "Subheading .99 other articles, statistical suffix .35 for floor coverings confirmed", confidence: 4, elapsed: "0.6s" },
      { label: "Estimating materials", detail: "Natural rubber, TPE, printed inks", thinking: "NR sheet at $1.80/kg, 1.2kg per mat = $2.16 raw material + $0.40 UV-print ink", confidence: 5, elapsed: "1.0s" },
      { label: "Calculating labor costs", detail: "Vietnam · India · China compared", thinking: "Vietnam calendering + cutting labor $0.90/mat vs India $0.65 but +15% defect rate", confidence: 4, elapsed: "1.4s" },
      { label: "Computing tariff rates", detail: "US import duty: 2.5%", thinking: "Standard MFN 2.5% on 4016.99... no AD/CVD orders active on rubber mats from VN", confidence: 5, elapsed: "1.7s" },
      { label: "Running compliance check", detail: "REACH, Prop 65 compliance checked", thinking: "Testing for 16 PAHs under REACH Annex XVII... Prop 65 latex NRL warning required", confidence: 4, elapsed: "2.1s" },
      { label: "Assembling report", detail: "12-section feasibility report", thinking: "Finalizing landed cost model, packaging spec, quality control checklist...", confidence: 5, elapsed: "2.5s" },
    ],
  },
  {
    label: "Pet Feeder",
    emoji: "🐾",
    text: "An automatic pet feeder with WiFi, 4L capacity, 6-meal programmable schedule, mobile app, HD camera, food freshness sensor...",
    hsCode: "8479.89.9899",
    tariff: "3.9%",
    score: 81,
    scoreLabel: "Feasible — strong demand",
    moq: "300 units",
    lead: "32 days",
    insights: ["HD camera module adds $2.30/unit but triples perceived value", "FCC + FDA dual compliance: plan 10–14 weeks"],
    marginTip: "At $59 retail + $14.60 COGS = 75% gross margin",
    radar: { Cost: 74, Quality: 80, Speed: 68, Risk: 60, Margin: 82 },
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$14.60", rating: 88, best: true },
      { flag: "🇻🇳", name: "Vietnam", cost: "$17.20", rating: 74, best: false },
      { flag: "🇵🇭", name: "Philippines", cost: "$16.80", rating: 70, best: false },
    ],
    steps: [
      { label: "Classifying product", detail: "Pet products · automated device", thinking: "WiFi-connected mechanical dispenser → 8479.89 other machines with individual function", confidence: 4, elapsed: "0.4s" },
      { label: "Looking up HS code", detail: "8479.89.9899 identified", thinking: "Ruling N312847 confirms automatic pet feeders under 8479.89.98... 3.9% duty rate", confidence: 4, elapsed: "0.9s" },
      { label: "Estimating materials", detail: "ABS, PCB, motor, WiFi module, camera", thinking: "28BYZ-48 stepper motor $1.20, OV2640 camera module $2.30, ESP8266 WiFi $0.90", confidence: 4, elapsed: "1.3s" },
      { label: "Calculating labor costs", detail: "China · Vietnam · Philippines compared", thinking: "Shenzhen SMT + final assembly $3.40/unit, Cebu assembly $3.10 but +$1.80 logistics", confidence: 3, elapsed: "1.8s" },
      { label: "Computing tariff rates", detail: "US import duty: 3.9%", thinking: "Section 301 List 3 exclusion expired 2025-Q2... full 25%+3.9% if from China, checking", confidence: 3, elapsed: "2.2s" },
      { label: "Running compliance check", detail: "FCC, FDA food-contact parts", thinking: "Food hopper requires FDA 21 CFR 174-178... FCC ID needed for intentional radiator", confidence: 3, elapsed: "2.6s" },
      { label: "Assembling report", detail: "12-section feasibility report", thinking: "Building dual-compliance timeline, camera ROI analysis, supplier risk matrix...", confidence: 5, elapsed: "3.0s" },
    ],
  },
  {
    label: "Lip Balm",
    emoji: "💄",
    text: "An organic tinted lip balm with SPF 30, 5ml tube, shea butter and coconut oil base, recyclable packaging, 6 color variants...",
    hsCode: "3304.10.0000",
    tariff: "0%",
    score: 95,
    scoreLabel: "Excellent — very low barrier",
    moq: "1,000 units",
    lead: "14 days",
    insights: ["'Made in Korea' label commands 20–30% price premium", "SPF 30 triggers FDA OTC drug monograph rules"],
    marginTip: "At $18 retail + $1.10 COGS = 94% gross margin",
    radar: { Cost: 96, Quality: 85, Speed: 92, Risk: 82, Margin: 97 },
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$0.80", rating: 82, best: false },
      { flag: "🇰🇷", name: "Korea",   cost: "$1.10", rating: 90, best: true },
      { flag: "🇫🇷", name: "France",  cost: "$2.40", rating: 95, best: false },
    ],
    steps: [
      { label: "Classifying product", detail: "Beauty · cosmetics · lip care", thinking: "Tinted lip balm with SPF → 3304.10 lip make-up preparations, not 3304.99", confidence: 5, elapsed: "0.2s" },
      { label: "Looking up HS code", detail: "3304.10.0000 identified", thinking: "Confirmed 0% MFN duty on 3304.10... KORUS FTA also provides zero-duty from Korea", confidence: 5, elapsed: "0.5s" },
      { label: "Estimating materials", detail: "Shea butter, coconut oil, SPF agent, tube", thinking: "Organic shea butter $0.08/unit, zinc oxide SPF agent $0.12/unit, 5ml tube $0.06", confidence: 5, elapsed: "0.8s" },
      { label: "Calculating labor costs", detail: "Korea · China · France compared", thinking: "Korean lab fill+pack $0.35/unit at 2000/day capacity, French artisan line $1.20/unit", confidence: 4, elapsed: "1.1s" },
      { label: "Computing tariff rates", detail: "US import duty: 0%", thinking: "Zero duty under both MFN and KORUS... no AD/CVD orders on cosmetics from KR", confidence: 5, elapsed: "1.4s" },
      { label: "Running compliance check", detail: "FDA cosmetics, SPF OTC drug monograph", thinking: "SPF 30 claim triggers FDA OTC monograph — need NDC number and drug facts panel", confidence: 4, elapsed: "1.8s" },
      { label: "Assembling report", detail: "12-section feasibility report", thinking: "Compiling K-beauty premium analysis, FDA OTC timeline, variant cost matrix...", confidence: 5, elapsed: "2.1s" },
    ],
  },
]

/* ─── Confidence dots component ─── */

function ConfidenceDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-[#22C55E]" : "bg-[#333]"
          }`}
        />
      ))}
    </span>
  )
}

/* ─── Animated score counter ─── */

function AnimatedScore({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick)
      }
    }
    ref.current = requestAnimationFrame(tick)
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current)
    }
  }, [target, duration])

  return <>{value}</>
}

/* ─── CSS Radar chart (pentagon) ─── */

function RadarChart({ scores }: { scores: RadarScores }) {
  const labels = Object.keys(scores) as (keyof RadarScores)[]
  const values = labels.map((k) => scores[k])
  const size = 120
  const cx = size / 2
  const cy = size / 2
  const maxR = 42

  const angleStep = (2 * Math.PI) / 5
  const startAngle = -Math.PI / 2

  const getPoint = (index: number, radius: number) => {
    const angle = startAngle + index * angleStep
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  }

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  const dataPoints = values.map((v, i) => getPoint(i, (v / 100) * maxR))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block">
        {/* Grid pentagons */}
        {gridLevels.map((level) => {
          const pts = Array.from({ length: 5 }).map((_, i) => getPoint(i, maxR * level))
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"
          return <path key={level} d={path} fill="none" stroke="#2A2A2A" strokeWidth="0.5" />
        })}
        {/* Axis lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const p = getPoint(i, maxR)
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#2A2A2A" strokeWidth="0.5" />
        })}
        {/* Data fill */}
        <motion.path
          d={dataPath}
          fill="rgba(255, 107, 53, 0.15)"
          stroke="#FF6B35"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill="#FF6B35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
        ))}
      </svg>
      {/* Labels */}
      {labels.map((label, i) => {
        const p = getPoint(i, maxR + 16)
        return (
          <span
            key={label}
            className="absolute text-[9px] font-mono text-[#888] whitespace-nowrap"
            style={{
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {label} <span className="text-[#FF6B35]">{values[i]}</span>
          </span>
        )
      })}
    </div>
  )
}

/* ─── Typing text effect for analysis thinking ─── */

function ThinkingText({ text, active }: { text: string; active: boolean }) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    if (!active) {
      setDisplayCount(text.length)
      return
    }
    setDisplayCount(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayCount(i)
      if (i >= text.length) clearInterval(interval)
    }, 18)
    return () => clearInterval(interval)
  }, [text, active])

  return (
    <span className="text-[#F59E0B] font-mono text-[10px] leading-relaxed">
      {text.slice(0, displayCount)}
      {active && displayCount < text.length && (
        <span className="inline-block w-[5px] h-[10px] bg-[#F59E0B] ml-px animate-pulse" />
      )}
    </span>
  )
}

/* ─── Main component ─── */

export default function LiveDemoSection() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")
  const [charIndex, setCharIndex] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [activeThinking, setActiveThinking] = useState(-1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.3 })

  const product = DEMO_PRODUCTS[selectedProduct]

  const resetDemo = useCallback(() => {
    setPhase("typing")
    setCharIndex(0)
    setAnalysisStep(0)
    setActiveThinking(-1)
  }, [])

  useEffect(() => {
    if (!inView) return
    resetDemo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, selectedProduct])

  // Typing phase
  useEffect(() => {
    if (phase !== "typing" || !inView) return
    if (charIndex >= product.text.length) {
      const t = setTimeout(() => setPhase("analyzing"), 800)
      return () => clearTimeout(t)
    }
    const speed = product.text[charIndex] === " " ? 20 : 28
    const t = setTimeout(() => setCharIndex((p) => p + 1), speed)
    return () => clearTimeout(t)
  }, [phase, charIndex, inView, product.text])

  // Analyzing phase — step advancement
  useEffect(() => {
    if (phase !== "analyzing") return
    if (analysisStep >= product.steps.length) {
      const t = setTimeout(() => setPhase("result"), 600)
      return () => clearTimeout(t)
    }
    // Start thinking text for current step
    setActiveThinking(analysisStep)
    const t = setTimeout(() => {
      setAnalysisStep((p) => p + 1)
    }, 1400)
    return () => clearTimeout(t)
  }, [phase, analysisStep, product.steps.length])

  // Auto-restart — 8 seconds on result
  useEffect(() => {
    if (phase !== "result") return
    const t = setTimeout(() => {
      setSelectedProduct((p) => (p + 1) % DEMO_PRODUCTS.length)
    }, 8000)
    return () => clearTimeout(t)
  }, [phase])

  const scoreColor = product.score >= 90 ? "#22C55E" : product.score >= 75 ? "#F59E0B" : "#EF4444"

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ─── Left — copy ─── */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
              Live demo
            </p>
            <TextReveal
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
            >
              Watch AI analyze a product in real time
            </TextReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[#6B6B6B] mb-8 leading-relaxed text-[15px]">
                Our engine classifies, costs, and compares across 50+ dimensions.
                Here&apos;s what happens when you hit &ldquo;Analyze.&rdquo;
              </p>

              {/* Checklist with specific numbers */}
              <div className="space-y-3 mb-10">
                {[
                  { label: "HS code classification", sub: "99.2% accuracy rate across 5,000+ product categories" },
                  { label: "3-country cost model", sub: "Within ±5% of actual landed cost — materials, labor, freight, duty" },
                  { label: "Tariff + compliance scan", sub: "All 99 HTS chapters, FDA, FCC, CE, Prop 65 flagged automatically" },
                  { label: "Margin & ROI projection", sub: "Retail price benchmarking against 14M Amazon listings" },
                  { label: "Optimization suggestions", sub: "Avg. $2.10/unit savings found per report" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#1A1A1A]">{item.label}</span>
                      <span className="text-xs text-[#9B9B9B] block leading-relaxed">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product selector pills */}
              <div>
                <p className="text-xs text-[#9B9B9B] font-semibold uppercase tracking-widest mb-3">
                  Try a different product:
                </p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_PRODUCTS.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => setSelectedProduct(i)}
                      className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full transition-all font-medium ${
                        selectedProduct === i
                          ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/25"
                          : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40 hover:text-[#1A1A1A]"
                      }`}
                    >
                      <span>{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ─── Right — AI terminal demo ─── */}
          <div className="bg-[#0D0D0D] rounded-2xl border border-[#222] shadow-2xl shadow-black/40 overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A] bg-[#111]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-1.5 ml-3">
                <Terminal className="w-3 h-3 text-[#555]" />
                <span className="text-[11px] text-[#555] font-mono">bottlecap — analysis engine</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {phase === "analyzing" && (
                  <span className="text-[10px] text-[#F59E0B] font-mono animate-pulse">
                    PROCESSING
                  </span>
                )}
                {phase === "result" && (
                  <span className="text-[10px] text-[#22C55E] font-mono">COMPLETE</span>
                )}
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-5 min-h-[440px] font-mono">
              <AnimatePresence mode="wait">

                {/* ─── Typing phase ─── */}
                {phase === "typing" && (
                  <motion.div
                    key={`typing-${selectedProduct}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#22C55E] text-xs">$</span>
                      <span className="text-[#888] text-xs">bottlecap analyze --product</span>
                    </div>
                    <div className="bg-[#141414] rounded-lg border border-[#1E1E1E] p-4 min-h-[90px]">
                      <p className="text-[13px] text-[#CCC] leading-relaxed">
                        {product.text.slice(0, charIndex)}
                        <span className="inline-block w-[6px] h-[15px] bg-[#FF6B35] ml-0.5 animate-pulse align-middle" />
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-[#444]">
                        {charIndex}/{product.text.length} chars
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#FF6B35] rounded-full"
                            style={{ width: `${(charIndex / product.text.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#555]">
                          {Math.round((charIndex / product.text.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── Analyzing phase ─── */}
                {phase === "analyzing" && (
                  <motion.div
                    key={`analyzing-${selectedProduct}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span className="text-xs text-[#FF6B35]">AI Analysis Engine</span>
                      <span className="text-[10px] text-[#444] ml-auto">
                        {product.emoji} {product.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-[3px] bg-[#1A1A1A] rounded-full mb-4 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #FF6B35, #F59E0B, #22C55E)",
                        }}
                        animate={{ width: `${Math.min(100, (analysisStep / product.steps.length) * 100)}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      />
                    </div>

                    {/* Steps */}
                    <div className="space-y-3">
                      {product.steps.map((step, i) => {
                        const completed = i < analysisStep
                        const current = i === analysisStep
                        const pending = i > analysisStep
                        return (
                          <motion.div
                            key={step.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{
                              opacity: pending ? 0.2 : 1,
                              x: 0,
                            }}
                            transition={{
                              delay: current ? 0.05 : 0,
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                            }}
                          >
                            <div className="flex items-center gap-2 mb-0.5">
                              {/* Status indicator */}
                              <span className={`text-[10px] ${
                                completed ? "text-[#22C55E]" : current ? "text-[#FF6B35]" : "text-[#333]"
                              }`}>
                                {completed ? "✓" : current ? "▸" : "○"}
                              </span>
                              {/* Label */}
                              <span className={`text-[11px] font-mono ${
                                completed ? "text-[#22C55E]" : current ? "text-[#22C55E]" : "text-[#444]"
                              }`}>
                                {step.label}
                              </span>
                              {/* Confidence dots */}
                              {(completed || current) && (
                                <span className="ml-auto flex items-center gap-2">
                                  <ConfidenceDots level={step.confidence} />
                                  <span className="text-[9px] text-[#555]">{step.elapsed}</span>
                                </span>
                              )}
                            </div>
                            {/* Thinking text */}
                            {(completed || current) && (
                              <div className="pl-5 mb-1">
                                <ThinkingText
                                  text={step.thinking}
                                  active={current && activeThinking === i}
                                />
                                {completed && (
                                  <div className="mt-0.5">
                                    <span className="text-[10px] text-[#3B82F6]">
                                      → {step.detail}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ─── Result phase ─── */}
                {phase === "result" && (
                  <motion.div
                    key={`result-${selectedProduct}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{product.emoji}</span>
                        <div>
                          <p className="text-xs font-mono text-white">{product.label}</p>
                          <p className="text-[10px] text-[#555] font-mono">
                            HS {product.hsCode} · Duty {product.tariff}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded font-mono">
                        REPORT READY
                      </span>
                    </div>

                    {/* Score + Radar side by side */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Score */}
                      <div className="flex-1">
                        <div className="flex items-end gap-1.5">
                          <span
                            className="text-5xl font-black font-mono tabular-nums"
                            style={{ color: scoreColor }}
                          >
                            <AnimatedScore target={product.score} />
                          </span>
                          <span className="text-lg text-[#444] mb-1 font-mono">/100</span>
                        </div>
                        <p className="text-[11px] text-[#FF6B35] font-mono mt-1">{product.scoreLabel}</p>
                      </div>
                      {/* Radar chart */}
                      <RadarChart scores={product.radar} />
                    </div>

                    {/* Country comparison with animated bars */}
                    <div className="space-y-1.5 mb-4">
                      <p className="text-[10px] text-[#555] font-mono uppercase tracking-wider mb-1">
                        Country comparison
                      </p>
                      {product.countries.map((c, i) => (
                        <div
                          key={c.name}
                          className={`flex items-center gap-2 rounded-lg p-2 ${
                            c.best
                              ? "bg-[#FF6B35]/5 border border-[#FF6B35]/15"
                              : "bg-[#141414] border border-[#1E1E1E]"
                          }`}
                        >
                          <span className="text-sm">{c.flag}</span>
                          <span className="text-[11px] font-mono text-[#CCC] w-20">{c.name}</span>
                          <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: c.best ? "#FF6B35" : "#444",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${c.rating}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.2 + i * 0.15,
                                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-[#CCC] w-16 text-right">{c.cost}/u</span>
                          {c.best && (
                            <span className="text-[8px] bg-[#FF6B35] text-white px-1.5 py-0.5 rounded font-mono font-bold shrink-0">
                              BEST
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Smart insights */}
                    <div className="mb-3 space-y-1.5">
                      {product.insights.map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.6 + i * 0.15,
                            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                          }}
                          className="flex items-start gap-2 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-lg px-3 py-2"
                        >
                          <span className="text-[#22C55E] text-[10px] font-mono mt-0.5 shrink-0">TIP</span>
                          <p className="text-[10px] text-[#22C55E]/90 font-mono leading-relaxed">{insight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Margin tip */}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.9,
                        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                      }}
                      className="mb-4 bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-lg px-3 py-2 flex items-start gap-2"
                    >
                      <span className="text-[#F59E0B] text-[10px] font-mono mt-0.5 shrink-0">ROI</span>
                      <p className="text-[10px] text-[#F59E0B]/90 font-mono leading-relaxed">{product.marginTip}</p>
                    </motion.div>

                    {/* Analysis time + CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#444] font-mono">
                        Analysis completed in 2m 34s
                      </span>
                      <Link
                        href="/report/demo"
                        className="flex items-center gap-1 text-[11px] font-mono font-semibold text-[#FF6B35] hover:text-[#E85A25] transition-colors"
                      >
                        View full report
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
