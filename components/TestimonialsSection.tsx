"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"

const testimonials = [
  {
    quote:
      "I was quoted $5,000 by a sourcing agent to do what Bottlecap did in 3 minutes. The report told me my product was feasible and pointed me to Vietnam — I had my first samples within a month.",
    name: "Sarah K.",
    role: "Founder, DrinkWell",
    product: "Insulated water bottle",
    score: 91,
  },
  {
    quote:
      "The HS code lookup alone saved me hours. But the full report — cost breakdown, country comparison, optimization tips — that's what gave me confidence to actually place my first order.",
    name: "Marcus T.",
    role: "Product Designer",
    product: "Modular desk organizer",
    score: 78,
  },
  {
    quote:
      "I've launched 3 products now. Each time I start with a Bottlecap report. It's like having a manufacturing consultant on speed dial — except it costs $99 instead of $5K.",
    name: "Priya M.",
    role: "Serial Founder",
    product: "Silicone kitchen set",
    score: 85,
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  // Auto-rotate every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollReveal className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
        >
          From idea to first order
        </TextReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
            What founders discovered after their first analysis.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="text-6xl font-black text-[#FF6B35]/15 leading-none mb-2 select-none">&ldquo;</div>
                  <p className="text-[#1A1A1A] leading-relaxed text-[1.05rem] mb-6 font-[450]">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">
                      {testimonials[active].name}
                    </p>
                    <p className="text-sm text-[#6B6B6B]">
                      {testimonials[active].role}
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 shrink-0">
                  <div className="text-center bg-white rounded-xl border border-[#E8E8E4] p-3 shadow-sm min-w-[64px]">
                    <p className="text-3xl font-black text-[#22C55E] leading-none">{testimonials[active].score}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] mt-1">Score</p>
                  </div>
                  <div className="bg-[#FAFAF8] rounded-full border border-[#E8E8E4] px-3 py-1 text-xs font-medium text-[#6B6B6B]">
                    {testimonials[active].product}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "bg-[#FF6B35] w-6"
                  : "bg-[#E8E8E4] w-2 hover:bg-[#D0D0C8]"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </ScrollReveal>
  )
}
