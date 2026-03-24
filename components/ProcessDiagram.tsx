"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PenTool, Cpu, BarChart3, Rocket, Check } from "lucide-react"
import GlossaryTooltip from "@/components/GlossaryTooltip"

interface ProcessStep {
  number: number
  title: string
  description: React.ReactNode
  duration: string
  durationColor: string
  Icon: React.ComponentType<{ className?: string }>
  details: React.ReactNode[]
  visual: React.ReactNode
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Describe Your Product",
    description:
      "Describe your product in detail — materials, dimensions, features, target cost. The more specific you are, the more precise your report. Typical input: 3–8 sentences.",
    duration: "60 seconds",
    durationColor: "#22C55E",
    Icon: PenTool,
    details: [
      "Describe materials, dimensions, and key features",
      "Upload a reference image or sketch (optional)",
      "Set your target retail price range",
      "Tell us your biggest concern (cost, quality, speed)",
      "Specify your initial order quantity",
    ],
    visual: (
      <div className="bg-[#F5F5F0] rounded-xl p-4 space-y-2">
        <div className="text-[10px] font-bold text-[#767676] uppercase tracking-wider mb-3">Your product description</div>
        <div className="bg-white rounded-lg p-3 border border-[#E8E8E4]">
          <p className="text-xs text-[#4B4B4B] leading-relaxed">
            &ldquo;A stainless steel insulated water bottle with a
            built-in UV sterilizer and temperature display...&rdquo;
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            { label: "Target price", value: "$25–$35" },
            { label: "Quantity",     value: "500 units" },
            { label: "Priority",     value: "Low cost" },
            { label: "Images",       value: "2 uploaded" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg px-3 py-2 border border-[#E8E8E4]">
              <p className="text-[9px] text-[#767676] uppercase tracking-wide">{item.label}</p>
              <p className="text-xs font-semibold text-[#1A1A1A]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: "AI Analysis (50+ Dimensions)",
    description:
      <>Claude AI — the same model used by enterprises — analyzes your product in parallel across cost, materials, <GlossaryTooltip term="Tariff">tariffs</GlossaryTooltip>, countries, compliance, and optimization opportunities. <span className="block mt-2 text-xs text-[#767676] leading-relaxed">Dimensions analyzed: Cost modeling (materials, labor, overhead, packaging, freight, duties) · Tariff classification (HTS 10-digit) · 3-country comparison · Quality metrics · Lead time modeling · Regulatory screening (FDA, FCC, CE, Prop 65) · IP risk assessment · Optimization potential</span></>,
    duration: "2–5 min",
    durationColor: "#3B82F6",
    Icon: Cpu,
    details: [
      <>
        <GlossaryTooltip term="hs-code">HS code</GlossaryTooltip>{" "}
        classification &{" "}
        <GlossaryTooltip term="tariff">tariff</GlossaryTooltip> rate lookup
      </>,
      "Per-unit cost breakdown across 3+ countries",
      "Materials analysis + cheaper alternatives",
      "Manufacturing process & tooling assessment",
      "Compliance & certification requirements",
      "5 live data sources: Alibaba, UN Comtrade, USITC, Trends, Amazon",
    ],
    visual: (
      <div className="bg-[#F5F5F0] rounded-xl p-4">
        <div className="text-[10px] font-bold text-[#767676] uppercase tracking-wider mb-3">Processing</div>
        <div className="space-y-2">
          {[
            { label: "HS Code lookup",       done: true },
            { label: "China cost estimate",  done: true },
            { label: "Vietnam cost estimate",done: true },
            { label: "Material analysis",    done: false, active: true },
            { label: "Compliance check",     done: false, active: false },
            { label: "Optimization tips",    done: false, active: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                item.done ? "bg-[#22C55E]" : item.active ? "bg-[#FF6B35] animate-pulse" : "bg-[#E8E8E4]"
              }`}>
                {item.done && <Check className="w-2.5 h-2.5 text-white" />}
                {item.active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className={`text-xs ${
                item.done ? "text-[#6B6B6B] line-through" : item.active ? "text-[#1A1A1A] font-medium" : "text-[#767676]"
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FF6B35] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-[#767676] mt-1.5">65% complete</p>
      </div>
    ),
  },
  {
    number: 3,
    title: "Get Your 12-Section Report",
    description:
      <>Your full <GlossaryTooltip term="Feasibility">feasibility</GlossaryTooltip> report arrives in your inbox and appears on-screen — 12 structured sections covering every question a manufacturing consultant would answer.</>,
    duration: "Instant delivery",
    durationColor: "#FF6B35",
    Icon: BarChart3,
    details: [
      <><GlossaryTooltip term="Feasibility">Feasibility</GlossaryTooltip> score (0&ndash;100) with explanation</>,
      <><GlossaryTooltip term="hs-code">HS code</GlossaryTooltip> + applicable <GlossaryTooltip term="Tariff">tariff</GlossaryTooltip> rate</>,
      "Per-unit cost breakdown (6 components)",
      "3-country supplier comparison with radar chart",
      "Materials analysis + cheaper alternatives",
      "10 factory-ready manufacturing specifications",
      "Optimization tips with dollar savings amounts",
      "7-step prioritized action checklist",
      "Red flag warnings (IP, compliance, quality)",
      "Shareable PNG report card for pitch decks",
    ],
    visual: (
      <div className="bg-[#F5F5F0] rounded-xl p-4">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-black text-[#22C55E]">87</span>
          <span className="text-sm text-[#767676]">/100</span>
          <span className="text-xs px-2 py-0.5 bg-[#DCFCE7] text-[#166534] rounded-full font-medium ml-auto">Highly Feasible</span>
        </div>
        <div className="space-y-1.5 mb-3">
          {[
            { label: "Materials", pct: 38, color: "#FF6B35" },
            { label: "Labor",     pct: 32, color: "#3B82F6" },
            { label: "Overhead",  pct: 15, color: "#8B5CF6" },
            { label: "Packaging", pct: 10, color: "#22C55E" },
            { label: "Shipping",  pct: 5,  color: "#F59E0B" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="text-[9px] text-[#767676] w-14 text-right shrink-0">{row.label}</span>
              <div className="flex-1 h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
              </div>
              <span className="text-[9px] font-medium text-[#6B6B6B] w-5 shrink-0">{row.pct}%</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Vietnam 🇻🇳", sub: "$6.20/unit", best: true },
            { label: "China 🇨🇳",   sub: "$8.40/unit", best: false },
            { label: "India 🇮🇳",   sub: "$9.10/unit", best: false },
          ].map((c) => (
            <div key={c.label} className={`rounded-lg p-2 text-center border ${c.best ? "border-[#22C55E] bg-[#F0FDF4]" : "border-[#E8E8E4] bg-white"}`}>
              <p className="text-[10px] font-semibold text-[#1A1A1A]">{c.label}</p>
              <p className={`text-[9px] font-bold ${c.best ? "text-[#22C55E]" : "text-[#767676]"}`}>{c.sub}</p>
              {c.best && <p className="text-[8px] text-[#22C55E] font-bold">BEST</p>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: "Take Action & Manufacture",
    description:
      "Your report gives you everything needed to approach factories, negotiate quotes, and move from idea to first sample with confidence — not guesswork.",
    duration: "Your pace",
    durationColor: "#8B5CF6",
    Icon: Rocket,
    details: [
      "Factory-ready specs formatted for RFQ emails",
      "Pre-classified HS code with tariff rate",
      "Dollar-amount optimization tips",
      "7-step action plan with timeline",
      "Unlock Verified Supplier List add-on ($199)",
      "Share your report card with co-founders or investors",
    ],
    visual: (
      <div className="bg-[#F5F5F0] rounded-xl p-4">
        <div className="text-[10px] font-bold text-[#767676] uppercase tracking-wider mb-3">7-Step Action Checklist</div>
        <div className="space-y-2">
          {(
            [
              { label: "Contact 3 Vietnam factories for RFQ", done: true,  active: false },
              { label: "Request material samples",            done: true,  active: false },
              { label: "Review tooling cost estimates",       done: false, active: true  },
              { label: "Finalize material spec",              done: false, active: false },
              { label: <>Negotiate <GlossaryTooltip term="MOQ">MOQ</GlossaryTooltip> terms</>, done: false, active: false },
              { label: "Order production sample",             done: false, active: false },
              { label: "QC inspection before shipment",       done: false, active: false },
            ] as { label: React.ReactNode; done: boolean; active: boolean }[]
          ).map((item, i) => (
            <div key={i} className={`flex items-center gap-2 ${item.done ? "opacity-50" : ""}`}>
              <div className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border ${
                item.done   ? "bg-[#22C55E] border-[#22C55E]" :
                item.active ? "border-[#FF6B35] bg-[#FFF0EB]" :
                "border-[#E8E8E4] bg-white"
              }`}>
                {item.done   && <Check className="w-2.5 h-2.5 text-white" />}
                {item.active && <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />}
              </div>
              <span className={`text-xs ${item.done ? "line-through text-[#767676]" : item.active ? "text-[#1A1A1A] font-medium" : "text-[#6B6B6B]"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const AUTO_ADVANCE_DELAY = 5000

export default function ProcessDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const lastInteractionRef = useRef<number>(Date.now())
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const handleManualStep = useCallback((step: number) => {
    lastInteractionRef.current = Date.now()
    setActiveStep(step)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - lastInteractionRef.current
      if (elapsed >= AUTO_ADVANCE_DELAY) {
        setActiveStep((prev) => (prev + 1) % STEPS.length)
        lastInteractionRef.current = Date.now()
      }
    }, AUTO_ADVANCE_DELAY)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        lastInteractionRef.current = Date.now()
        setActiveStep((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        lastInteractionRef.current = Date.now()
        setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const step = STEPS[activeStep]

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-0 mb-4">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => handleManualStep(i)}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                i === activeStep
                  ? "bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/30 scale-110"
                  : i < activeStep
                    ? "bg-[#22C55E]"
                    : "bg-[#E8E8E4]"
              }`}
            >
              {i < activeStep ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <s.Icon className={`w-6 h-6 ${i <= activeStep ? "text-white" : "text-[#767676]"}`} />
              )}
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-1 rounded-full transition-colors duration-500 ${
                  i < activeStep ? "bg-[#22C55E]" : "bg-[#E8E8E4]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-[#E8E8E4] rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-[#FF6B35]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={activeStep}
        />
      </div>

      {/* Step content — 2-col on desktop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: text */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold text-[#FF6B35]">Step {step.number}</span>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${step.durationColor}18`, color: step.durationColor }}
                  >
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-[#6B6B6B] mb-6 leading-relaxed">{step.description}</p>
                <div className="space-y-2">
                  {step.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-[#1A1A1A]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shrink-0" />
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: visual */}
            <div className="p-8 bg-[#FAFAF8] border-l border-[#E8E8E4] flex items-center">
              <div className="w-full">{step.visual}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav dots */}
      <div className="flex justify-center gap-3 mt-6">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManualStep(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === activeStep ? "bg-[#FF6B35] w-8" : "w-2.5 bg-[#E8E8E4] hover:bg-[#D0D0C8]"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
