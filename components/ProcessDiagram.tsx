"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ProcessStep {
  number: number
  title: string
  description: string
  duration: string
  icon: string
  details: string[]
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Describe Your Product",
    description:
      "Tell us about your product idea. Include materials, features, target price, and any images or sketches.",
    duration: "2 min",
    icon: "💡",
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
    icon: "🤖",
    details: [
      "HS code classification & tariff lookup",
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
    icon: "📊",
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
    icon: "🚀",
    details: [
      "Follow the prioritized action checklist",
      "Contact verified suppliers (optional add-on)",
      "Download and share your report card",
      "Iterate on your design based on insights",
      "Start your factory sample process",
    ],
  },
]

export default function ProcessDiagram() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => setActiveStep(i)}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                i === activeStep
                  ? "bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/30 scale-110"
                  : i < activeStep
                    ? "bg-[#22C55E]"
                    : "bg-[#E8E8E4]"
              }`}
            >
              {step.icon}
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
            <span className="text-xs bg-[#F5F5F0] px-3 py-1 rounded-full text-[#6B6B6B]">
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
            onClick={() => setActiveStep(i)}
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
