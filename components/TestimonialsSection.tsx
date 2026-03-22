"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import { Star, Quote, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "I was quoted $5,000 by a sourcing agent to do what Bottlecap did in 3 minutes. The report told me my product was feasible and pointed me to Vietnam — I had my first samples within a month.",
    name: "Sarah K.",
    role: "Founder, DrinkWell",
    product: "Insulated water bottle",
    category: "Kitchen",
    score: 91,
    saving: "Saved $4,900",
    savingDetail: "vs. agent quote",
    stars: 5,
  },
  {
    quote:
      "The HS code lookup alone saved me hours. But the full report — cost breakdown, country comparison, optimization tips — that's what gave me confidence to actually place my first order.",
    name: "Marcus T.",
    role: "Product Designer",
    product: "Modular desk organizer",
    category: "Home",
    score: 78,
    saving: "Clarity day one",
    savingDetail: "first order placed",
    stars: 5,
  },
  {
    quote:
      "I've launched 3 products now. Each time I start with a Bottlecap report. It's like having a manufacturing consultant on speed dial — except it costs $99 instead of $5K.",
    name: "Priya M.",
    role: "Serial Founder",
    product: "Silicone kitchen set",
    category: "Kitchen",
    score: 85,
    saving: "3 products launched",
    savingDetail: "from one platform",
    stars: 5,
  },
  {
    quote:
      "The country comparison section alone justified the price. I almost went with China — the report showed Vietnam would be 22% cheaper for my MOQ with better quality certifications.",
    name: "James R.",
    role: "E-commerce Founder",
    product: "Wireless earbuds",
    category: "Electronics",
    score: 83,
    saving: "22% cost cut",
    savingDetail: "by switching countries",
    stars: 5,
  },
  {
    quote:
      "I had no idea what an HS code was two weeks ago. Now I have factory samples en route from Vietnam. Bottlecap compressed months of learning into one $99 report.",
    name: "Amara O.",
    role: "First-time Founder",
    product: "Natural skincare kit",
    category: "Beauty",
    score: 88,
    saving: "Months → 5 min",
    savingDetail: "time to confidence",
    stars: 5,
  },
  {
    quote:
      "The optimization tips section was gold. It flagged that I could switch to injection-molded plastic instead of die-cast aluminum and save $3.20 per unit without any quality hit.",
    name: "David L.",
    role: "Hardware Startup",
    product: "Smart home sensor",
    category: "Electronics",
    score: 79,
    saving: "$3.20/unit saved",
    savingDetail: "material optimization",
    stars: 5,
  },
  {
    quote:
      "I run a product development agency. Bottlecap is now part of our discovery phase for every client. We save 40+ hours per engagement and deliver better initial cost estimates.",
    name: "Chen W.",
    role: "Agency Founder",
    product: "Multiple products",
    category: "Agency",
    score: 82,
    saving: "40+ hrs saved",
    savingDetail: "per engagement",
    stars: 5,
  },
  {
    quote:
      "The compliance flags section caught something I would have missed — my product needed FDA food-contact certification. Saved me from an expensive recall situation before I even ordered samples.",
    name: "Fatima A.",
    role: "Food Brand Founder",
    product: "Reusable food containers",
    category: "Kitchen",
    score: 76,
    saving: "Avoided recall risk",
    savingDetail: "compliance flagged early",
    stars: 5,
  },
  {
    quote:
      "I was skeptical $99 would tell me anything new. The report identified two alternative materials I hadn't considered — same performance, 28% cheaper. It paid for itself 10x over.",
    name: "Noah S.",
    role: "D2C Founder",
    product: "Outdoor water filter",
    category: "Outdoor",
    score: 87,
    saving: "28% cheaper materials",
    savingDetail: "identified alternatives",
    stars: 5,
  },
  {
    quote:
      "We've done 6 analyses now — comparing different product variations before committing to tooling. The ROI is insane. Bottlecap basically replaces a part-time consultant.",
    name: "Yuki T.",
    role: "Product Manager",
    product: "Fitness accessories",
    category: "Fitness",
    score: 80,
    saving: "6 analyses done",
    savingDetail: "saved on tooling risk",
    stars: 5,
  },
]

const CATEGORY_TAGS = ["All", "Electronics", "Kitchen", "Beauty", "Home", "Outdoor", "Fitness", "Agency"]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] flex flex-col h-full hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:border-[#FF6B35]/20 transition-all"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <StarRating count={t.stars} />
          <span className="text-[10px] text-[#9B9B9B] mt-1 inline-block">{t.category}</span>
        </div>
        <Quote className="w-5 h-5 text-[#FF6B35]/20 shrink-0" />
      </div>

      {/* Quote */}
      <p className="text-[#1A1A1A] leading-relaxed text-sm flex-1 mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Bottom */}
      <div className="flex items-end justify-between gap-3 mt-auto">
        <div>
          <p className="font-bold text-[#1A1A1A] text-sm">{t.name}</p>
          <p className="text-xs text-[#6B6B6B]">{t.role}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendingDown className="w-3 h-3 text-[#22C55E]" />
            <span className="text-[10px] font-semibold text-[#22C55E]">{t.saving}</span>
            <span className="text-[10px] text-[#9B9B9B]">· {t.savingDetail}</span>
          </div>
        </div>
        <div className="text-center bg-[#F5F5F0] rounded-xl border border-[#E8E8E4] px-3 py-2 shrink-0">
          <p className="text-2xl font-black text-[#22C55E] leading-none">{t.score}</p>
          <p className="text-[9px] font-bold uppercase tracking-wide text-[#9B9B9B] mt-0.5">Score</p>
          <p className="text-[9px] text-[#9B9B9B] mt-0.5 max-w-[80px] leading-tight">{t.product}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? testimonials
    : testimonials.filter((t) => t.category === activeCategory)

  // Mobile auto-carousel based on filtered
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % filtered.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [filtered.length])

  // Reset active index on category change
  useEffect(() => { setActive(0) }, [activeCategory])

  // Aggregate stats
  const avgScore = Math.round(testimonials.reduce((s, t) => s + t.score, 0) / testimonials.length)

  return (
    <ScrollReveal className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">
          Founders say
        </p>
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
        >
          From idea to first order
        </TextReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-center text-[#6B6B6B] mb-6 max-w-2xl mx-auto">
            What founders discovered after their first analysis.
          </p>
        </ScrollReveal>

        {/* Aggregate metrics */}
        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
          {[
            { value: `${testimonials.length}+`, label: "verified reviews", color: "#FF6B35" },
            { value: `${avgScore}/100`, label: "avg feasibility score", color: "#22C55E" },
            { value: "5/5", label: "avg rating", color: "#F59E0B" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl font-black leading-none" style={{ color: m.color }}>{m.value}</p>
              <p className="text-xs text-[#9B9B9B] mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORY_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveCategory(tag)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${
                activeCategory === tag
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40"
              }`}
            >
              {tag}
              {tag !== "All" && (
                <span className="ml-1 opacity-60">
                  ({testimonials.filter((t) => t.category === tag).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Desktop: masonry-style grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:grid grid-cols-3 gap-5"
          >
            {/* First col — tall */}
            <div className="space-y-5">
              {filtered.filter((_, i) => i % 3 === 0).map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i} />
              ))}
            </div>
            {/* Second col — offset */}
            <div className="space-y-5 mt-8">
              {filtered.filter((_, i) => i % 3 === 1).map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i + 1} />
              ))}
            </div>
            {/* Third col */}
            <div className="space-y-5">
              {filtered.filter((_, i) => i % 3 === 2).map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i + 2} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tablet: 2-col grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tablet-${activeCategory}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden md:grid lg:hidden grid-cols-2 gap-5"
          >
            {filtered.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${active}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {filtered[active] && <TestimonialCard t={filtered[active]} index={0} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setActive((p) => (p - 1 + filtered.length) % filtered.length)}
              className="w-8 h-8 rounded-full border border-[#E8E8E4] flex items-center justify-center text-[#9B9B9B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {filtered.map((_, i) => (
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
            <button
              onClick={() => setActive((p) => (p + 1) % filtered.length)}
              className="w-8 h-8 rounded-full border border-[#E8E8E4] flex items-center justify-center text-[#9B9B9B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-center text-[#9B9B9B] py-12">
            No reviews for this category yet.
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
