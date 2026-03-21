"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PenTool, Cpu, BarChart3, Rocket } from "lucide-react"
import GlossaryTooltip from "@/components/GlossaryTooltip"

interface ProcessStep {
  number: number
  title: string
  description: string
  duration: string
  Icon: React.ComponentType<{ className?: string }>
  details: React.ReactNode[]
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Describe Your Product",
    description:
      "Tell us about your product idea. Include materials, features, target price, and any images or sketches.",
    duration: "2 min",
    Icon: PenTool,
    details: [
      "Write a detailed product description",
      "Upload reference images or sketches",
      "Set your target price range",
      "Tell us your main concern",
      "Specify initial quantity needed",
    ],
  },
  {
    number: 2,
    title: "AI Analysis",
    description:
      "Our AI analyzes your product across 50+ manufacturing dimensions including cost, materials, suppliers, and tariffs.",
    duration: "2-5 min",
    Icon: Cpu,
    details: [
      <>
        <GlossaryTooltip term="hs-code">HS code</GlossaryTooltip>{" "}
        classification &{" "}
        <GlossaryTooltip term="tariff">tariff</GlossaryTooltip> lookup
      </>,
      "Cost estimation across 3+ countries",
      "Material selection & alternatives",
      "Manufacturing process identification",
      "Quality & compliance assessment",
      "Supplier country comparison",
    ],
  },
  {
    number: 3,
    title: "Get Your Report",
    description:
      "Receive a comprehensive manufacturing feasibility report with actionable next steps and supplier recommendations.",
    duration: "Instant",
    Icon: BarChart3,
    details: [
      "Feasibility score (0-100)",
      "Per-unit cost breakdown",
      "3-country comparison with pros/cons",
      "10 manufacturing specifications",
      "Optimization tips with savings estimates",
      "7-step action checklist",
      "Shareable report card",
    ],
  },
  {
    number: 4,
    title: "Take Action",
    description:
      "Use your report to contact suppliers, refine your product, and start your manufacturing journey with confidence.",
    duration: "Your pace",
    Icon: Rocket,
    details: [
      "Follow the prioritized action checklist",
      "Contact verified suppliers (optional add-on)",
      "Download and share your report card",
      "Iterate on your design based on insights",
      "Start your factory sample process",
    ],
  },
]

const AUTO_ADVANCE_DELAY = 5000 // 5 seconds

export default function ProcessDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const lastInteractionRef = useRef<number>(Date.now())
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined)

  // Reset last interaction timestamp whenever user manually navigates
  const handleManualStep = useCallback((step: number) => {
    lastInteractionRef.current = Date.now()
    setActiveStep(step)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - lastInteractionRef.current
      if (elapsed >= AUTO_ADVANCE_DELAY) {
        setActiveStep((prev) => (prev + 1) % STEPS.length)
        lastInteractionRef.current = Date.now()
      }
    }, AUTO_ADVANCE_DELAY)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Keyboard navigation (left/right arrow keys)
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

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-0 mb-4">
        {STEPS.map((step, i) => (
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
              <step.Icon className={`w-6 h-6 ${i <= activeStep || i < activeStep ? "text-white" : "text-[#9B9B9B]"}`} />
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-1 rounded-full transition-colors duration-300 ${
                  i < activeStep ? "bg-[#22C55E]" : "bg-[#E8E8E4]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar showing time until auto-advance */}
      <div className="w-full h-0.5 bg-[#E8E8E4] rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-[#FF6B35]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={activeStep}
        />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-[#E8E8E4] p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold text-[#FF6B35]">
              Step {STEPS[activeStep].number}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#FFF0EB] text-[#FF6B35] shadow-[0_0_8px_rgba(255,107,53,0.3)] transition-all duration-300">
              {STEPS[activeStep].duration}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
            {STEPS[activeStep].title}
          </h3>
          <p className="text-[#6B6B6B] mb-6">
            {STEPS[activeStep].description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STEPS[activeStep].details.map((detail, i) => (
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
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="flex justify-center gap-3 mt-6">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManualStep(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === activeStep
                ? "bg-[#FF6B35] w-8"
                : "bg-[#E8E8E4] hover:bg-[#D0D0C8]"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
