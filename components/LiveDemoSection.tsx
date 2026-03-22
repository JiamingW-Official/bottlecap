"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"

const DEMO_PRODUCTS = [
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
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$11.20", rating: 84, best: true },
      { flag: "🇻🇳", name: "Vietnam", cost: "$13.50", rating: 76, best: false },
      { flag: "🇲🇽", name: "Mexico",  cost: "$17.80", rating: 68, best: false },
    ],
    steps: [
      { label: "Classifying product…",          detail: "Kitchen appliance · beverage equipment" },
      { label: "Looking up HS code…",           detail: "8516.71.0040 identified" },
      { label: "Estimating materials costs…",    detail: "Aluminum, BPA-free plastic, silicone" },
      { label: "Calculating labor by country…",  detail: "China · Vietnam · Mexico compared" },
      { label: "Computing tariff rates…",        detail: "US import duty: 3.4%" },
      { label: "Running compliance check…",      detail: "FDA food-contact, CE certification" },
      { label: "Assembling 12-section report…", detail: "Feasibility · cost · countries · specs" },
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
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$18.40", rating: 90, best: true },
      { flag: "🇹🇼", name: "Taiwan",  cost: "$24.10", rating: 82, best: false },
      { flag: "🇻🇳", name: "Vietnam", cost: "$21.80", rating: 74, best: false },
    ],
    steps: [
      { label: "Classifying product…",          detail: "Consumer electronics · audio device" },
      { label: "Looking up HS code…",           detail: "8518.21.0000 identified" },
      { label: "Estimating materials costs…",    detail: "PCB, speaker driver, battery, ABS" },
      { label: "Calculating labor by country…",  detail: "China · Taiwan · Vietnam compared" },
      { label: "Computing tariff rates…",        detail: "US import duty: 0%" },
      { label: "Running compliance check…",      detail: "FCC Part 15, CE RED required" },
      { label: "Assembling 12-section report…", detail: "Feasibility · cost · countries · specs" },
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
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$5.80", rating: 80, best: false },
      { flag: "🇻🇳", name: "Vietnam", cost: "$4.90", rating: 88, best: true },
      { flag: "🇮🇳", name: "India",   cost: "$4.20", rating: 72, best: false },
    ],
    steps: [
      { label: "Classifying product…",          detail: "Sports equipment · fitness accessory" },
      { label: "Looking up HS code…",           detail: "4016.99.3590 identified" },
      { label: "Estimating materials costs…",    detail: "Natural rubber, TPE, printed inks" },
      { label: "Calculating labor by country…",  detail: "Vietnam · India · China compared" },
      { label: "Computing tariff rates…",        detail: "US import duty: 2.5%" },
      { label: "Running compliance check…",      detail: "REACH, Prop 65 compliance checked" },
      { label: "Assembling 12-section report…", detail: "Feasibility · cost · countries · specs" },
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
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$14.60", rating: 88, best: true },
      { flag: "🇻🇳", name: "Vietnam", cost: "$17.20", rating: 74, best: false },
      { flag: "🇵🇭", name: "Philippines", cost: "$16.80", rating: 70, best: false },
    ],
    steps: [
      { label: "Classifying product…",          detail: "Pet products · automated device" },
      { label: "Looking up HS code…",           detail: "8479.89.9899 identified" },
      { label: "Estimating materials costs…",    detail: "ABS, PCB, motor, WiFi module, camera" },
      { label: "Calculating labor by country…",  detail: "China · Vietnam · Philippines compared" },
      { label: "Computing tariff rates…",        detail: "US import duty: 3.9%" },
      { label: "Running compliance check…",      detail: "FCC, FDA food-contact parts" },
      { label: "Assembling 12-section report…", detail: "Feasibility · cost · countries · specs" },
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
    countries: [
      { flag: "🇨🇳", name: "China",   cost: "$0.80", rating: 82, best: false },
      { flag: "🇰🇷", name: "Korea",   cost: "$1.10", rating: 90, best: true },
      { flag: "🇫🇷", name: "France",  cost: "$2.40", rating: 95, best: false },
    ],
    steps: [
      { label: "Classifying product…",          detail: "Beauty · cosmetics · lip care" },
      { label: "Looking up HS code…",           detail: "3304.10.0000 identified" },
      { label: "Estimating materials costs…",    detail: "Shea butter, coconut oil, SPF agent, tube" },
      { label: "Calculating labor by country…",  detail: "Korea · China · France compared" },
      { label: "Computing tariff rates…",        detail: "US import duty: 0%" },
      { label: "Running compliance check…",      detail: "FDA cosmetics, SPF OTC drug monograph" },
      { label: "Assembling 12-section report…", detail: "Feasibility · cost · countries · specs" },
    ],
  },
]

type Phase = "typing" | "analyzing" | "result"

export default function LiveDemoSection() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")
  const [charIndex, setCharIndex] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.3 })

  const product = DEMO_PRODUCTS[selectedProduct]

  const resetDemo = () => {
    setPhase("typing")
    setCharIndex(0)
    setAnalysisStep(0)
  }

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
    const speed = product.text[charIndex] === " " ? 25 : 32
    const t = setTimeout(() => setCharIndex((p) => p + 1), speed)
    return () => clearTimeout(t)
  }, [phase, charIndex, inView, product.text])

  // Analyzing phase
  useEffect(() => {
    if (phase !== "analyzing") return
    if (analysisStep >= product.steps.length) {
      const t = setTimeout(() => setPhase("result"), 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setAnalysisStep((p) => p + 1), 580)
    return () => clearTimeout(t)
  }, [phase, analysisStep, product.steps.length])

  // Auto-restart
  useEffect(() => {
    if (phase !== "result") return
    const t = setTimeout(() => {
      setSelectedProduct((p) => (p + 1) % DEMO_PRODUCTS.length)
    }, 6000)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <section ref={sectionRef} className="py-20 bg-[#F5F5F0]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
              See it in action
            </p>
            <TextReveal
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
            >
              From description to full report — live
            </TextReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">
                Describe any physical product. Our AI classifies it, estimates
                costs across 3 countries, checks tariffs, and generates a
                12-section report — all in under 5 minutes.
              </p>

              {/* What's analyzed */}
              <div className="space-y-2.5 mb-8">
                {[
                  { label: "Product description → HS code", sub: "Instant tariff classification" },
                  { label: "Materials + labor + overhead",  sub: "Per-unit cost breakdown" },
                  { label: "3-country comparison",          sub: "Side-by-side cost & quality" },
                  { label: "Compliance flags",              sub: "FDA, CE, FCC — flagged automatically" },
                  { label: "Optimization tips",             sub: "Dollar-amount savings per suggestion" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#1A1A1A]">{item.label}</span>
                      <span className="text-xs text-[#9B9B9B] block">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product selector */}
              <div>
                <p className="text-xs text-[#9B9B9B] font-semibold uppercase tracking-widest mb-3">
                  Try a different product:
                </p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_PRODUCTS.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => setSelectedProduct(i)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all font-medium ${
                        selectedProduct === i
                          ? "bg-[#FF6B35] text-white shadow-sm"
                          : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40"
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

          {/* Right — animated demo */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] shadow-lg overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E8E8E4] bg-[#FAFAF8]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FECACA]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEF08A]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#BBF7D0]" />
              </div>
              <span className="text-xs text-[#9B9B9B] ml-2 font-mono">bottlecap.io/analyze</span>
              <div className="ml-auto flex items-center gap-2">
                {phase === "analyzing" && (
                  <span className="text-[10px] text-[#FF6B35] font-semibold animate-pulse">
                    Analyzing…
                  </span>
                )}
                {phase === "result" && (
                  <span className="text-[10px] text-[#22C55E] font-semibold">✓ Complete</span>
                )}
                <span className="text-[10px] text-[#9B9B9B]">{product.emoji}</span>
              </div>
            </div>

            {/* Demo content */}
            <div className="p-5 min-h-[360px]">
              <AnimatePresence mode="wait">

                {/* Typing phase */}
                {phase === "typing" && (
                  <motion.div
                    key={`typing-${selectedProduct}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <p className="text-[10px] text-[#9B9B9B] uppercase tracking-widest font-bold mb-3">
                      Describe your product
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-4 min-h-[90px] text-sm text-[#1A1A1A] leading-relaxed">
                      {product.text.slice(0, charIndex)}
                      <span className="inline-block w-0.5 h-[14px] bg-[#FF6B35] ml-0.5 animate-pulse align-middle" />
                    </div>
                    <p className="text-xs text-[#C8C8C4] mt-2">
                      {charIndex}/{product.text.length} characters
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1 flex-1 bg-[#F0F0EC] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#FF6B35] rounded-full"
                          style={{ width: `${(charIndex / product.text.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#9B9B9B]">
                        {Math.round((charIndex / product.text.length) * 100)}%
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Analyzing phase */}
                {phase === "analyzing" && (
                  <motion.div
                    key={`analyzing-${selectedProduct}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="py-2"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-7 h-7 animate-spin shrink-0" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="#E8E8E4" strokeWidth="4" />
                        <circle cx="25" cy="25" r="20" fill="none" stroke="#FF6B35" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">AI analyzing your product</p>
                        <p className="text-xs text-[#9B9B9B]">50+ dimensions in parallel</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-[#F0F0EC] rounded-full mb-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#FF6B35] rounded-full"
                        animate={{ width: `${Math.min(100, (analysisStep / product.steps.length) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="space-y-2">
                      {product.steps.map((step, i) => (
                        <div
                          key={step.label}
                          className={`flex items-start gap-2.5 transition-all duration-300 ${
                            i < analysisStep ? "opacity-100" : i === analysisStep ? "opacity-100" : "opacity-20"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            i < analysisStep ? "bg-[#22C55E]" : i === analysisStep ? "bg-[#FF6B35] animate-pulse" : "bg-[#E8E8E4]"
                          }`}>
                            {i < analysisStep && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <p className={`text-xs font-medium ${i <= analysisStep ? "text-[#1A1A1A]" : "text-[#9B9B9B]"}`}>
                              {step.label}
                            </p>
                            {i < analysisStep && (
                              <p className="text-[10px] text-[#22C55E]">{step.detail}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Result phase */}
                {phase === "result" && (
                  <motion.div
                    key={`result-${selectedProduct}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs font-semibold text-[#1A1A1A]">{product.emoji} {product.label}</p>
                        <p className="text-[10px] text-[#9B9B9B]">HS {product.hsCode} · Tariff {product.tariff}</p>
                      </div>
                      <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full font-semibold">
                        ✓ Complete
                      </span>
                    </div>

                    {/* Score */}
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-4xl font-black text-[#22C55E]">{product.score}</span>
                      <span className="text-base text-[#9B9B9B] mb-0.5">/100</span>
                    </div>
                    <p className="text-xs text-[#FF6B35] font-medium mb-4">{product.scoreLabel}</p>

                    {/* Countries */}
                    <div className="space-y-1.5 mb-4">
                      {product.countries.map((c) => (
                        <div key={c.name} className={`flex items-center gap-2.5 rounded-lg p-2 ${c.best ? "bg-[#FFF8F5] border border-[#FF6B35]/20" : "bg-[#F5F5F0]"}`}>
                          <span className="text-sm">{c.flag}</span>
                          <span className="text-xs font-medium text-[#1A1A1A] w-16">{c.name}</span>
                          <div className="flex-1 h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${c.rating}%`, backgroundColor: c.best ? "#FF6B35" : "#D0D0C8" }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#1A1A1A] w-14 text-right">{c.cost}/unit</span>
                          {c.best && (
                            <span className="text-[9px] bg-[#FF6B35] text-white px-1.5 py-0.5 rounded-full font-bold shrink-0">BEST</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-[#F5F5F0] rounded-lg p-2.5 text-center">
                        <p className="text-[10px] text-[#9B9B9B]">MOQ</p>
                        <p className="font-bold text-sm">{product.moq}</p>
                      </div>
                      <div className="bg-[#F5F5F0] rounded-lg p-2.5 text-center">
                        <p className="text-[10px] text-[#9B9B9B]">Lead time</p>
                        <p className="font-bold text-sm">{product.lead}</p>
                      </div>
                    </div>

                    <Link
                      href="/report/demo"
                      className="flex items-center justify-center gap-1.5 w-full text-center bg-[#FF6B35] text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-[#E85A25] transition-colors"
                    >
                      See the full 12-section report
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
