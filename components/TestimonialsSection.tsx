"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Bottlecap did in 3 minutes what a sourcing agent quoted me $5,000 for. Had samples from Vietnam within a month.",
    name: "Sarah Kim",
    title: "Founder",
    company: "DrinkWell",
    metric: "Saved $4,900",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "The full report \u2014 cost breakdown, country comparison, optimization tips \u2014 gave me confidence to place my first order.",
    name: "Marcus Torres",
    title: "Product Designer",
    company: "Layerform",
    metric: "Score: 78/100",
    metricColor: "#FF6B35" as const,
  },
  {
    quote: "I\u2019ve launched 3 products now. Each time I start with a Bottlecap report. It\u2019s like a manufacturing consultant for $99.",
    name: "Priya Mehta",
    title: "CEO",
    company: "Earthen Goods",
    metric: "3 launches",
    metricColor: "#FF6B35" as const,
  },
  {
    quote: "The country comparison showed Vietnam would be 22% cheaper for my MOQ with better certifications. Almost went with China.",
    name: "James Rowan",
    title: "Founder",
    company: "PeakOutdoor",
    metric: "22% cost cut",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "Had no idea what an HS code was two weeks ago. Now I have factory samples en route. Months of learning compressed into one report.",
    name: "Amara Osei",
    title: "Founder",
    company: "NuGlow Skincare",
    metric: "Score: 88/100",
    metricColor: "#FF6B35" as const,
  },
  {
    quote: "Optimization tips flagged I could switch to injection-molded plastic and save $3.20 per unit. No quality hit.",
    name: "David Liang",
    title: "CTO",
    company: "Rayden Hardware",
    metric: "$3.20/unit saved",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "Bottlecap is now part of our discovery phase for every client. We save 40+ hours per engagement.",
    name: "Chen Wei",
    title: "Founder",
    company: "Arcbridge Agency",
    metric: "40+ hrs saved",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "Compliance flags caught something I would have missed \u2014 my product needed FDA food-contact certification.",
    name: "Fatima Ali",
    title: "Founder",
    company: "ZestBites",
    metric: "Recall avoided",
    metricColor: "#F59E0B" as const,
  },
  {
    quote: "The report identified two alternative materials I hadn\u2019t considered \u2014 same performance, 28% cheaper. Paid for itself 10x.",
    name: "Noah Sandler",
    title: "Founder",
    company: "Helio D2C",
    metric: "28% cheaper",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "We\u2019ve done 6 analyses comparing product variations before committing to tooling. Basically replaces a part-time consultant.",
    name: "Yuki Tanaka",
    title: "Product Manager",
    company: "Omnicraft",
    metric: "6 analyses",
    metricColor: "#FF6B35" as const,
  },
  {
    quote: "Sent the supplier spec sheet directly to 3 factories on Alibaba. Got responses within 48 hours. No more ghosting.",
    name: "Lena Hartwell",
    title: "Founder",
    company: "Sunridge Store",
    metric: "3 suppliers found",
    metricColor: "#22C55E" as const,
  },
  {
    quote: "Predicted my landed cost at $4.20/unit. Actual: $4.35. That\u2019s 3.5% variance. Never had a consultant that accurate.",
    name: "Raj Patel",
    title: "Amazon FBA Seller",
    company: "BoldPack",
    metric: "3.5% variance",
    metricColor: "#22C55E" as const,
  },
]

type Testimonial = (typeof testimonials)[number]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="w-[340px] shrink-0 bg-white border border-[#E8E8E4] rounded-md p-5 flex flex-col justify-between h-[180px] hover:border-[#FF6B35]/30 transition-colors select-none">
      <p className="text-[13px] leading-[1.55] text-[#1A1A1A]/80">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E8E4]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35]/10 to-[#FF6B35]/25 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#FF6B35]">
              {getInitials(t.name)}
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#1A1A1A] leading-none">
              {t.name} <span className="text-[#1A1A1A]/30">&middot;</span> <span className="font-normal text-[#1A1A1A]/50">{t.title}, {t.company}</span>
            </p>
          </div>
        </div>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded"
          style={{
            color: t.metricColor,
            backgroundColor: `${t.metricColor}10`,
          }}
        >
          {t.metric}
        </span>
      </div>
    </div>
  )
}

function MobileCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white border border-[#E8E8E4] rounded-md p-5 flex flex-col justify-between h-[180px]">
      <p className="text-[13px] leading-[1.55] text-[#1A1A1A]/80">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E8E4]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35]/10 to-[#FF6B35]/25 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#FF6B35]">
              {getInitials(t.name)}
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#1A1A1A] leading-none">
              {t.name} <span className="text-[#1A1A1A]/30">&middot;</span> <span className="font-normal text-[#1A1A1A]/50">{t.title}, {t.company}</span>
            </p>
          </div>
        </div>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded"
          style={{
            color: t.metricColor,
            backgroundColor: `${t.metricColor}10`,
          }}
        >
          {t.metric}
        </span>
      </div>
    </div>
  )
}

const marqueeVariants: Variants = {
  animate: {
    x: [0, -3960],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 60,
        ease: "linear",
      },
    },
  },
}

const marqueeVariantsReverse: Variants = {
  animate: {
    x: [-3960, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 65,
        ease: "linear",
      },
    },
  },
}

const slideVariants: Variants = {
  enter: {
    opacity: 0,
    x: 60,
  },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

const row1 = testimonials.slice(0, 6)
const row2 = testimonials.slice(6, 12)

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Mobile auto-carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section className="py-20 relative z-0 overflow-hidden bg-[#FAFAF8]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-3 text-center">
          Trusted by product founders
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center text-[#1A1A1A]"
        >
          Founders don&apos;t guess anymore
        </motion.h2>
      </div>

      {/* Desktop: dual-row marquee */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <motion.div
            className="flex gap-5 mb-5"
            variants={marqueeVariants}
            animate={isPaused ? undefined : "animate"}
          >
            {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
              <Card key={`r1-${i}`} t={t} />
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div
            className="flex gap-5"
            variants={marqueeVariantsReverse}
            animate={isPaused ? undefined : "animate"}
          >
            {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
              <Card key={`r2-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: single card carousel */}
      <div className="md:hidden px-6">
        <div className="relative h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <MobileCard t={testimonials[active]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() =>
              setActive(
                (p) => (p - 1 + testimonials.length) % testimonials.length
              )
            }
            className="w-8 h-8 rounded-full border border-[#E8E8E4] flex items-center justify-center text-[#1A1A1A]/40 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "bg-[#FF6B35] w-5"
                    : "bg-[#E8E8E4] w-1.5 hover:bg-[#D0D0C8]"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setActive((p) => (p + 1) % testimonials.length)
            }
            className="w-8 h-8 rounded-full border border-[#E8E8E4] flex items-center justify-center text-[#1A1A1A]/40 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
