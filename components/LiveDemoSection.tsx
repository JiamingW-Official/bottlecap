"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"

const DEMO_TEXT = "A portable espresso maker — aluminum body, manual pump, compatible with Nespresso pods, dishwasher safe..."

const ANALYSIS_STEPS = [
  "Classifying product...",
  "Looking up HS code...",
  "Estimating costs...",
  "Comparing countries...",
  "Generating report...",
]

type Phase = "typing" | "analyzing" | "result"

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
    const speed = DEMO_TEXT[charIndex] === " " ? 30 : 40
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
    const timeout = setTimeout(() => setAnalysisStep((p) => p + 1), 700)
    return () => clearTimeout(timeout)
  }, [phase, analysisStep])

  // Auto-restart loop
  useEffect(() => {
    if (phase !== "result") return
    const timeout = setTimeout(() => {
      setPhase("typing")
      setCharIndex(0)
      setAnalysisStep(0)
    }, 6000)
    return () => clearTimeout(timeout)
  }, [phase])

  return (
    <section ref={sectionRef} className="py-20 bg-[#F5F5F0]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <TextReveal
              as="h2"
              className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4"
            >
              See how it works — live
            </TextReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">
                Describe any product idea. Our AI classifies it, estimates
                per-unit costs across 3 countries, and generates a full
                feasibility report — all in under 5 minutes.
              </p>
              <div className="space-y-3">
                {[
                  "No account needed to start",
                  "Works for any physical product",
                  "Results in 2-5 minutes, not days",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shrink-0" />
                    <span className="text-sm text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — animated demo */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] shadow-lg overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#E8E8E4] bg-[#FAFAF8]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E4]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E4]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E4]" />
              </div>
              <span className="text-xs text-[#9B9B9B] ml-2">bottlecap.io/analyze</span>
            </div>

            {/* Content */}
            <div className="p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                {phase === "typing" && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-xs text-[#9B9B9B] uppercase tracking-wide font-medium mb-3">
                      Describe your product
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-4 min-h-[80px] text-sm text-[#1A1A1A]">
                      {DEMO_TEXT.slice(0, charIndex)}
                      <span className="inline-block w-0.5 h-4 bg-[#FF6B35] ml-0.5 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <svg className="w-10 h-10 animate-spin mb-4" viewBox="0 0 50 50">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#E8E8E4" strokeWidth="4" />
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#FF6B35" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round" />
                    </svg>
                    <div className="space-y-2 text-center">
                      {ANALYSIS_STEPS.map((step, i) => (
                        <p
                          key={step}
                          className={`text-sm transition-all duration-300 ${
                            i < analysisStep
                              ? "text-[#22C55E]"
                              : i === analysisStep
                                ? "text-[#1A1A1A] font-medium"
                                : "text-[#E8E8E4]"
                          }`}
                        >
                          {i < analysisStep ? "\u2713 " : ""}{step}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs text-[#9B9B9B]">Portable Espresso Maker</p>
                      <span className="text-xs bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full">Complete</span>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-5xl font-black text-[#22C55E]">84</span>
                      <span className="text-xl text-[#9B9B9B] mb-1">/100</span>
                    </div>
                    <p className="text-sm text-[#FF6B35] font-medium mb-4">
                      Highly feasible — China recommended
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#F5F5F0] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#9B9B9B]">Cost/unit</p>
                        <p className="font-bold text-sm">$12.40</p>
                      </div>
                      <div className="bg-[#F5F5F0] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#9B9B9B]">MOQ</p>
                        <p className="font-bold text-sm">300</p>
                      </div>
                      <div className="bg-[#F5F5F0] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#9B9B9B]">Lead time</p>
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
