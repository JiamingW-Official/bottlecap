"use client"

import Link from "next/link"
import { Check, X, ArrowRight, ShieldCheck, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

/* ───── data ───── */

const features = [
  { label: "Full feasibility score (0-100)", single: true, monthly: true },
  { label: "Per-unit cost breakdown", single: true, monthly: true },
  { label: "3-country supplier comparison", single: true, monthly: true },
  { label: "HS code classification", single: true, monthly: true },
  { label: "Materials analysis + alternatives", single: true, monthly: true },
  { label: "10 manufacturing specs", single: true, monthly: true },
  { label: "Optimization tips with savings", single: true, monthly: true },
  { label: "7-step action checklist", single: true, monthly: true },
  { label: "Shareable report card", single: true, monthly: true },
  { label: "72-hour money-back guarantee", single: true, monthly: true },
  { label: "Unlimited analyses", single: false, monthly: true },
  { label: "Priority support", single: false, monthly: true },
  { label: "Early access to new features", single: false, monthly: true },
]

const pricingFaqs = [
  {
    q: "What if the report isn't useful?",
    a: "Full refund within 72 hours, no questions asked. If you're not satisfied, email us and we'll process the refund same day.",
  },
  {
    q: "How long does a report take?",
    a: "Most reports are ready in 2-5 minutes. You'll get an email when it's done, and the page auto-refreshes.",
  },
  {
    q: "Can I upgrade from Single to Monthly later?",
    a: "Yes. If you buy a single report and want to upgrade, we'll credit your $99 toward the first month of your subscription.",
  },
  {
    q: "What counts as a 'product' for analysis?",
    a: "Any physical product that can be manufactured — from consumer electronics to apparel to packaging. Digital products and services are not supported.",
  },
  {
    q: "Do you offer team pricing?",
    a: "Not yet, but it's on our roadmap. Email hello@bottlecap.io and we'll work something out for your team.",
  },
]

/* ───── CountUp component ───── */

function CountUp({ target, prefix = "$" }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1000
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count}
    </span>
  )
}

/* ───── FAQ Accordion Item ───── */

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F5F5F0] transition-colors"
      >
        <h4 className="font-semibold text-[#1A1A1A]">{faq.q}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#9B9B9B] flex-shrink-0 ml-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#6B6B6B] leading-relaxed px-6 pb-6">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───── Staggered includes list (used inside pricing cards) ───── */

function IncludesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const highlights = [
    "Full feasibility score (0-100)",
    "Per-unit cost breakdown",
    "3-country supplier comparison",
    "Materials analysis + alternatives",
    "Optimization tips with savings",
    "7-step action checklist",
  ]

  return (
    <div ref={ref} className="mb-20">
      <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
        Every report includes
      </h2>
      <ul className="max-w-md mx-auto space-y-3">
        {highlights.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-3 text-[#1A1A1A]"
          >
            <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
            <span className="text-sm">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ───── Main Component ───── */

export default function PricingContent() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4">
          One price. Everything included.
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto">
          No upsells inside the report. No credits. No tiered access.
          Every report includes every section.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Single Report */}
        <div className="relative bg-[#FF6B35] rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm font-medium text-white/70 mb-1 uppercase tracking-wide">
            Most common starting point
          </p>
          <h2 className="text-2xl font-bold mb-4">Single Report</h2>
          <div className="mb-1">
            <span className="text-5xl font-black">
              <CountUp target={99} />
            </span>
          </div>
          <p className="text-white/70 mb-8">one-time &middot; no subscription</p>
          <Link
            href="/analyze"
            className="block text-center bg-white text-[#FF6B35] w-full rounded-full py-3.5 font-bold hover:bg-white/90 transition-colors shadow-brand hover:shadow-brand-lg transition-shadow"
          >
            Analyze my idea &mdash; $99
          </Link>
        </div>

        {/* Monthly */}
        <div className="relative bg-white rounded-2xl p-8 border-2 border-[#E8E8E4]">
          <p className="text-sm font-medium text-[#9B9B9B] mb-1 uppercase tracking-wide">
            For repeat founders
          </p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Monthly</h2>
          <div className="mb-1">
            <span className="text-5xl font-black text-[#1A1A1A]">
              <CountUp target={199} />
            </span>
          </div>
          <p className="text-[#6B6B6B] mb-8">/month &middot; cancel anytime</p>
          <Link
            href="/analyze"
            className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3.5 font-semibold hover:bg-[#FFF0EB] transition-colors"
          >
            Subscribe monthly
          </Link>
        </div>
      </div>

      {/* Price comparison callout */}
      <p className="text-center text-sm text-[#9B9B9B] mt-8 mb-20">
        Typical sourcing agent: $2,000–$8,000 · Bottlecap: $99
      </p>

      {/* Staggered "Includes" list */}
      <IncludesSection />

      {/* Feature comparison matrix */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
          Feature comparison
        </h2>
        <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-[#E8E8E4] bg-[#F5F5F0]">
            <div className="p-4 text-sm font-semibold text-[#1A1A1A]">Feature</div>
            <div className="p-4 text-sm font-semibold text-center text-[#FF6B35]">Single ($99)</div>
            <div className="p-4 text-sm font-semibold text-center text-[#1A1A1A]">Monthly ($199)</div>
          </div>
          {/* Feature rows */}
          {features.map((feat, i) => (
            <div
              key={feat.label}
              className={`grid grid-cols-3 hover:bg-[#F5F5F0] transition-colors ${
                i < features.length - 1 ? "border-b border-[#E8E8E4]" : ""
              }`}
            >
              <div className="p-4 text-sm text-[#1A1A1A]">{feat.label}</div>
              <div className="p-4 flex justify-center">
                {feat.single ? (
                  <Check className="w-5 h-5 text-[#22C55E]" />
                ) : (
                  <X className="w-5 h-5 text-[#E8E8E4]" />
                )}
              </div>
              <div className="p-4 flex justify-center">
                {feat.monthly ? (
                  <Check className="w-5 h-5 text-[#22C55E]" />
                ) : (
                  <X className="w-5 h-5 text-[#E8E8E4]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="bg-[#F0FDF4] border border-[#22C55E]/30 rounded-2xl p-8 text-center mb-20">
        <div className="flex justify-center mb-3">
          <ShieldCheck className="w-8 h-8 text-[#22C55E]" />
        </div>
        <h3 className="text-xl font-bold text-[#166534] mb-2">
          72-hour money-back guarantee
        </h3>
        <p className="text-sm text-[#4A4A4A] max-w-lg mx-auto">
          If your report isn&apos;t useful, email us within 72 hours for a
          full refund. No hoops, no questions. We want you to feel confident
          paying for this.
        </p>
      </div>

      {/* Pricing FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">
          Pricing FAQ
        </h2>
        <div className="space-y-4">
          {pricingFaqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-[#6B6B6B] mb-4">Ready to find out if your idea is feasible?</p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[#E85A25] shadow-brand hover:shadow-brand-lg transition-all"
        >
          Start your analysis
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
