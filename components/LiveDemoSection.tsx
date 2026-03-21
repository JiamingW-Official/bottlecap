"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Check } from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"

const DEMO_TEXT = "A portable espresso maker — aluminum body, manual pump, compatible with Nespresso pods, dishwasher-safe drip tray, 80ml capacity..."

const ANALYSIS_STEPS = [
  { label: "Classifying product…",           detail: "Kitchen appliance · beverage equipment" },
  { label: "Looking up HS code…",            detail: "8516.71.0040 identified" },
  { label: "Estimating materials costs…",     detail: "Aluminum, BPA-free plastic, silicone" },
  { label: "Calculating labor by country…",   detail: "China · Vietnam · Mexico compared" },
  { label: "Computing tariff rates…",         detail: "US import duty: 3.4%" },
  { label: "Running compliance check…",       detail: "FDA food-contact, CE certification needed" },
  { label: "Assembling 12-section report…",  detail: "Feasibility · cost · countries · specs" },
]

type Phase = "typing" | "analyzing" | "result"

const COUNTRIES = [
  { flag: "🇨🇳", name: "China",   cost: "$11.20", rating: 84, recommended: true },
  { flag: "🇻🇳", name: "Vietnam", cost: "$13.50", rating: 76, recommended: false },
  { flag: "🇲🇽", name: "Mexico",  cost: "$17.80", rating: 68, recommended: false },
]

export default function LiveDemoSection() {
  const [phase, setPhase] = useState<Phase>("typing")
  const [charIndex, setCharIndex] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.3 })

  // Reset animation when entering view
  useEffect(() => {
    if (!inView) return
    setPhase("typing")
    setCharIndex(0)
    setAnalysisStep(0)
  }, [inView])

  // Typing phase
  useEffect(() => {
    if (phase !== "typing" || !inView) return
    if (charIndex >= DEMO_TEXT.length) {
      const timeout = setTimeout(() => setPhase("analyzing"), 800)
      return () => clearTimeout(timeout)
    }
    const speed = DEMO_TEXT[charIndex] === " " ? 25 : 35
    const timeout = setTimeout(() => setCharIndex((p) => p + 1), speed)
    return () => clearTimeout(timeout)
  }, [phase, charIndex, inView])

  // Analyzing phase
  useEffect(() => {
    if (phase !== "analyzing") return
    if (analysisStep >= ANALYSIS_STEPS.length) {
      const timeout = setTimeout(() => setPhase("result"), 600)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setAnalysisStep((p) => p + 1), 600)
    return () => clearTimeout(timeout)
  }, [phase, analysisStep])

  // Auto-restart loop
  useEffect(() => {
    if (phase !== "result") return
    const timeout = setTimeout(() => {
      setPhase("typing")
      setCharIndex(0)
      setAnalysisStep(0)
    }, 7000)
    return () => clearTimeout(timeout)
  }, [phase])

  return (
    <section ref={sectionRef} className="py-20 bg-[#F5F5F0]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <p className="text-[#6B6B6B] mb-8 leading-relaxed">
                Describe any physical product. Our AI classifies it, estimates
                costs across 3 countries, checks tariffs, and generates a
                12-section report — all in under 5 minutes.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Product description → HS code", sub: "Instant tariff classification" },
                  { label: "Materials + labor + overhead", sub: "Per-unit cost breakdown" },
                  { label: "3-country comparison", sub: "China · Vietnam · Mexico side-by-side" },
                  { label: "Compliance flags", sub: "FDA, CE, FCC — flagged automatically" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF6B35]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{item.label}</span>
                      <span className="text-xs text-[#9B9B9B] block">{item.sub}</span>
                    </div>
                  </div>
                ))}
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
              {phase === "analyzing" && (
                <span className="ml-auto text-[10px] text-[#FF6B35] font-semibold animate-pulse">
                  Analyzing…
                </span>
              )}
              {phase === "result" && (
                <span className="ml-auto text-[10px] text-[#22C55E] font-semibold">
                  ✓ Complete
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                {phase === "typing" && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <p className="text-[10px] text-[#9B9B9B] uppercase tracking-widest font-bold mb-3">
                      Describe your product
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-4 min-h-[90px] text-sm text-[#1A1A1A] leading-relaxed">
                      {DEMO_TEXT.slice(0, charIndex)}
                      <span className="inline-block w-0.5 h-[14px] bg-[#FF6B35] ml-0.5 animate-pulse align-middle" />
                    </div>
                    <p className="text-xs text-[#C8C8C4] mt-2">
                      {charIndex}/{DEMO_TEXT.length} characters
                    </p>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="py-4"
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
                    <div className="space-y-2.5">
                      {ANALYSIS_STEPS.map((step, i) => (
                        <div
                          key={step.label}
                          className={`flex items-start gap-2.5 transition-all duration-300 ${
                            i < analysisStep
                              ? "opacity-100"
                              : i === analysisStep
                                ? "opacity-100"
                                : "opacity-25"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            i < analysisStep
                              ? "bg-[#22C55E]"
                              : i === analysisStep
                                ? "bg-[#FF6B35] animate-pulse"
                                : "bg-[#E8E8E4]"
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

                {phase === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-[#9B9B9B]">Portable Espresso Maker</p>
                        <p className="text-[10px] text-[#9B9B9B]">HS 8516.71.0040 · Tariff 3.4%</p>
                      </div>
                      <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full font-semibold">
                        ✓ Complete
                      </span>
                    </div>

                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-5xl font-black text-[#22C55E]">84</span>
                      <span className="text-lg text-[#9B9B9B] mb-1">/100</span>
                    </div>
                    <p className="text-sm text-[#FF6B35] font-medium mb-4">
                      Highly feasible — China recommended
                    </p>

                    {/* Country comparison */}
                    <div className="space-y-2 mb-4">
                      {COUNTRIES.map(c => (
                        <div key={c.name} className={`flex items-center gap-3 rounded-lg p-2.5 ${c.recommended ? "bg-[#FFF8F5] border border-[#FF6B35]/20" : "bg-[#F5F5F0]"}`}>
                          <span className="text-base">{c.flag}</span>
                          <span className="text-xs font-medium text-[#1A1A1A] w-14">{c.name}</span>
                          <div className="flex-1 h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${c.rating}%`,
                                backgroundColor: c.recommended ? "#FF6B35" : "#D0D0C8"
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#1A1A1A] w-12 text-right">{c.cost}/unit</span>
                          {c.recommended && (
                            <span className="text-[9px] bg-[#FF6B35] text-white px-1.5 py-0.5 rounded-full font-bold shrink-0">
                              BEST
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#F5F5F0] rounded-lg p-2.5 text-center">
                        <p className="text-[10px] text-[#9B9B9B]">MOQ</p>
                        <p className="font-bold text-sm">300 units</p>
                      </div>
                      <div className="bg-[#F5F5F0] rounded-lg p-2.5 text-center">
                        <p className="text-[10px] text-[#9B9B9B]">Lead time</p>
                        <p className="font-bold text-sm">28 days</p>
                      </div>
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
