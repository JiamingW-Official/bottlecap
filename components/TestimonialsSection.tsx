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
    saving: "Saved $4,900 vs. agent quote",
  },
  {
    quote:
      "The HS code lookup alone saved me hours. But the full report — cost breakdown, country comparison, optimization tips — that's what gave me confidence to actually place my first order.",
    name: "Marcus T.",
    role: "Product Designer",
    product: "Modular desk organizer",
    score: 78,
    saving: "Clarity from day one",
  },
  {
    quote:
      "I've launched 3 products now. Each time I start with a Bottlecap report. It's like having a manufacturing consultant on speed dial — except it costs $99 instead of $5K.",
    name: "Priya M.",
    role: "Serial Founder",
    product: "Silicone kitchen set",
    score: 85,
    saving: "3 products launched",
  },
  {
    quote:
      "The country comparison section alone justified the price. I almost went with China — the report showed Vietnam would be 22% cheaper for my MOQ with better quality certifications.",
    name: "James R.",
    role: "E-commerce Founder",
    product: "Wireless earbuds",
    score: 83,
    saving: "22% cost reduction",
  },
  {
    quote:
      "I had no idea what an HS code was two weeks ago. Now I have factory samples en route from Vietnam. Bottlecap compressed months of learning into one $99 report.",
    name: "Amara O.",
    role: "First-time Founder",
    product: "Natural skincare kit",
    score: 88,
    saving: "Months of learning → 5 minutes",
  },
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] h-full flex flex-col">
      <div className="text-5xl font-black text-[#FF6B35]/12 leading-none mb-2 select-none">&ldquo;</div>
      <p className="text-[#1A1A1A] leading-relaxed text-sm flex-1 mb-5 font-[450]">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-end justify-between gap-3 mt-auto">
        <div>
          <p className="font-semibold text-[#1A1A1A] text-sm">{t.name}</p>
          <p className="text-xs text-[#6B6B6B]">{t.role}</p>
          <p className="text-[10px] text-[#FF6B35] font-medium mt-1 bg-[#FFF0EB] rounded-full px-2 py-0.5 inline-block">
            {t.saving}
          </p>
        </div>
        <div className="text-center bg-[#F5F5F0] rounded-xl border border-[#E8E8E4] px-3 py-2 shrink-0">
          <p className="text-2xl font-black text-[#22C55E] leading-none">{t.score}</p>
          <p className="text-[9px] font-bold uppercase tracking-wide text-[#9B9B9B] mt-0.5">Score</p>
          <p className="text-[10px] text-[#9B9B9B] mt-0.5">{t.product}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  // Auto-rotate carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollReveal className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
        >
          From idea to first order
        </TextReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
            What founders discovered after their first analysis.
          </p>
        </ScrollReveal>

        {/* Desktop: 3-column grid showing first 3 */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mb-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
        {/* Desktop: remaining 2 centered */}
        <div className="hidden lg:grid grid-cols-2 gap-5 max-w-[calc(66.67%-10px)] mx-auto">
          {testimonials.slice(3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <TestimonialCard t={testimonials[active]} />
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
                  i === active ? "bg-[#FF6B35] w-6" : "bg-[#E8E8E4] w-2 hover:bg-[#D0D0C8]"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
