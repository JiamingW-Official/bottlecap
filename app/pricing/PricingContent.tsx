"use client"

import Link from "next/link"
import { Check, X, ArrowRight, ShieldCheck, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── data ─── */

const features = [
  { label: "Full feasibility score (0–100)",    single: true,  monthly: true },
  { label: "Per-unit cost breakdown",            single: true,  monthly: true },
  { label: "3-country supplier comparison",      single: true,  monthly: true },
  { label: "HS code + tariff classification",    single: true,  monthly: true },
  { label: "Materials analysis + alternatives",  single: true,  monthly: true },
  { label: "10 factory-ready manufacturing specs",single: true,  monthly: true },
  { label: "Optimization tips with savings",     single: true,  monthly: true },
  { label: "7-step action checklist",            single: true,  monthly: true },
  { label: "Shareable report card (PNG / link)", single: true,  monthly: true },
  { label: "72-hour money-back guarantee",       single: true,  monthly: true },
  { label: "Unlimited analyses",                 single: false, monthly: true },
  { label: "Priority support",                   single: false, monthly: true },
  { label: "Early access to new features",       single: false, monthly: true },
]

const pricingFaqs = [
  {
    q: "What if the report isn't useful?",
    a: "Full refund within 72 hours, no questions asked. Email hello@bottlecap.io and we'll process it same day.",
  },
  {
    q: "How long does a report take?",
    a: "Most reports are ready in 2–5 minutes. You'll get an email notification with a link, and the report page auto-refreshes.",
  },
  {
    q: "Can I upgrade from Single to Monthly later?",
    a: "Yes — we'll credit your $99 toward the first month of your subscription.",
  },
  {
    q: "What counts as a 'product' for analysis?",
    a: "Any physical manufactured product: electronics, apparel, home goods, accessories, packaging, etc. Digital products and services are not supported.",
  },
  {
    q: "Do you offer team pricing?",
    a: "Not yet, but email hello@bottlecap.io and we'll work something out.",
  },
]

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#F0F0EC] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#1A1A1A] pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#9B9B9B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#6B6B6B] leading-relaxed pb-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Component ─── */

export default function PricingContent() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
          Pricing
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
          One price. Everything included.
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-md mx-auto">
          No upsells inside the report. No credits. Not useful? Full refund in 72 hours.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        {/* Single Report */}
        <div className="relative bg-[#FF6B35] rounded-2xl p-8 text-white shadow-[0_8px_32px_rgba(255,107,53,0.25)]">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
          <p className="text-xs font-semibold text-white/60 mb-1 uppercase tracking-[0.12em]">
            Single Report
          </p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-6xl font-black leading-none">$99</span>
          </div>
          <p className="text-white/60 text-sm mb-8">one-time · no subscription</p>
          <ul className="space-y-2.5 mb-8">
            {["Full feasibility analysis", "Cost breakdown", "3-country comparison", "HS code + tariffs", "Shareable report card"].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-white/70 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/analyze"
            className="block text-center bg-white text-[#FF6B35] w-full rounded-full py-3.5 font-bold hover:bg-white/90 transition-colors"
          >
            Analyze my idea — $99
          </Link>
        </div>

        {/* Monthly */}
        <div className="relative bg-white rounded-2xl p-8 border-2 border-[#E8E8E4] flex flex-col">
          <p className="text-xs font-semibold text-[#9B9B9B] mb-1 uppercase tracking-[0.12em]">
            Monthly
          </p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-6xl font-black text-[#1A1A1A] leading-none">$199</span>
          </div>
          <p className="text-[#9B9B9B] text-sm mb-6">/month · cancel anytime</p>
          <p className="text-xs font-bold uppercase tracking-wide text-[#9B9B9B] mb-3">
            Everything in Single, plus:
          </p>
          <ul className="space-y-2.5 mb-8 flex-1">
            {["Unlimited analyses", "Priority support", "Early access to new features"].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/analyze"
            className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3.5 font-semibold hover:bg-[#FFF0EB] transition-colors mt-auto"
          >
            Subscribe monthly
          </Link>
        </div>
      </div>

      {/* Comparison callout */}
      <p className="text-center text-xs text-[#9B9B9B] mb-20">
        Typical sourcing agent: <span className="font-semibold text-[#1A1A1A]">$2,000–$8,000</span> ·
        Bottlecap: <span className="font-semibold text-[#FF6B35]">$99</span>
      </p>

      {/* Feature comparison matrix */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] text-center mb-8">
          What&apos;s included
        </h2>
        <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[#E8E8E4] bg-[#FAFAF8]">
            <div className="p-4 text-xs font-bold uppercase tracking-wide text-[#9B9B9B]">Feature</div>
            <div className="p-4 text-xs font-bold text-center text-[#FF6B35] uppercase tracking-wide">Single $99</div>
            <div className="p-4 text-xs font-bold text-center text-[#1A1A1A] uppercase tracking-wide">Monthly $199</div>
          </div>
          {features.map((feat, i) => (
            <div
              key={feat.label}
              className={`grid grid-cols-3 transition-colors hover:bg-[#FAFAF8] ${
                i < features.length - 1 ? "border-b border-[#F0F0EC]" : ""
              } ${!feat.single ? "bg-[#F5F5F0]/40" : ""}`}
            >
              <div className={`p-4 text-sm ${feat.single ? "text-[#1A1A1A]" : "text-[#9B9B9B]"}`}>
                {feat.label}
              </div>
              <div className="p-4 flex justify-center items-center">
                {feat.single ? (
                  <Check className="w-4 h-4 text-[#22C55E]" />
                ) : (
                  <X className="w-4 h-4 text-[#D8D8D4]" />
                )}
              </div>
              <div className="p-4 flex justify-center items-center">
                <Check className="w-4 h-4 text-[#22C55E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="bg-[#F0FDF4] border border-[#22C55E]/25 rounded-2xl p-8 text-center mb-20">
        <ShieldCheck className="w-8 h-8 text-[#22C55E] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#166534] mb-2">72-hour money-back guarantee</h3>
        <p className="text-sm text-[#4A4A4A] max-w-md mx-auto">
          If your report isn&apos;t useful, email us within 72 hours for a full refund. No hoops, no questions.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mb-20">
        <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A] mb-6">Quick answers</h2>
        <div className="bg-white rounded-2xl border border-[#E8E8E4] px-6">
          {pricingFaqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-[#6B6B6B] mb-5 text-sm">
          Ready to find out if your idea is feasible?
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)] transition-all"
        >
          Start your analysis — $99
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-[#9B9B9B] mt-3">72-hr money-back · Stripe secure · 2–5 min delivery</p>
      </div>
    </div>
  )
}
