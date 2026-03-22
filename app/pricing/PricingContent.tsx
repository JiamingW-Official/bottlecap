"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X, ChevronDown, ArrowRight, Shield, Users, Zap } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string
  answer: string
}

interface ComparisonFeature {
  name: string
  single: boolean | string
  pro: boolean | string
  agency: boolean | string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const singleFeatures: string[] = [
  "Feasibility score (0–100)",
  "HS code + tariff rates",
  "3-country cost comparison",
  "Per-unit cost breakdown",
  "Material alternatives analysis",
  "Factory specifications",
  "Optimization tips",
  "Action checklist",
  "Red flag alerts",
  "Compliance flags",
  "Shareable report link",
  "72-hr money-back guarantee",
]

const proFeatures: string[] = [
  "Everything in Single Report",
  "Unlimited reports",
  "Priority generation queue",
  "PDF export",
  "Shareable links",
  "Supplier list add-on at $99/report",
  "Report history dashboard",
  "Early access to new features",
]

const agencyFeatures: string[] = [
  "Everything in Pro",
  "White-label option",
  "API access",
  "Custom volume pricing",
  "Dedicated account support",
  "Custom integrations",
  "Team seats management",
  "SLA & priority support",
]

const comparisonFeatures: ComparisonFeature[] = [
  { name: "Feasibility score", single: true, pro: true, agency: true },
  { name: "HS code + tariff rates", single: true, pro: true, agency: true },
  { name: "Country cost comparison", single: "3 countries", pro: "All countries", agency: "All countries" },
  { name: "Per-unit cost breakdown", single: true, pro: true, agency: true },
  { name: "Material alternatives", single: true, pro: true, agency: true },
  { name: "Factory specifications", single: true, pro: true, agency: true },
  { name: "Optimization tips", single: true, pro: true, agency: true },
  { name: "Action checklist", single: true, pro: true, agency: true },
  { name: "Red flag + compliance alerts", single: true, pro: true, agency: true },
  { name: "Shareable link", single: true, pro: true, agency: true },
  { name: "PDF export", single: false, pro: true, agency: true },
  { name: "Unlimited reports", single: false, pro: true, agency: true },
  { name: "Priority generation", single: false, pro: true, agency: true },
  { name: "Supplier list add-on", single: "$199", pro: "$99/report", agency: "Included" },
  { name: "White-label option", single: false, pro: false, agency: true },
  { name: "API access", single: false, pro: false, agency: true },
  { name: "Dedicated support", single: false, pro: false, agency: true },
  { name: "72-hr money-back guarantee", single: true, pro: true, agency: true },
]

const faqItems: FAQItem[] = [
  {
    question: "What\u2019s in the report?",
    answer:
      "8 sections: feasibility score, HS code + tariff breakdown, per-unit cost estimate, 3-country manufacturing comparison, material alternatives, factory specifications, optimization tips, and a step-by-step action checklist.",
  },
  {
    question: "How long does it take?",
    answer:
      "2\u20135 minutes. Bottlecap is powered by Claude AI with live trade data \u2014 not a human analyst waiting on emails. You submit, we generate, you decide.",
  },
  {
    question: "What\u2019s the money-back guarantee?",
    answer:
      "If you\u2019re not satisfied within 72 hours of purchase, email us for a full refund. No questions asked. We\u2019re confident in the quality of our reports.",
  },
  {
    question: "Can I share my report?",
    answer:
      "Yes \u2014 every report gets a unique shareable link so you can send it to co-founders, investors, or factory partners. Pro plans also get PDF export for offline use.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No. The Single Report is $99 one-time \u2014 pay once, keep the report forever. Pro is $199/mo if you run multiple analyses or need unlimited access.",
  },
  {
    question: "What if I have a unique product?",
    answer:
      "Our AI handles 23+ industries from electronics to food packaging to apparel. If it can be manufactured, we can analyze it. We\u2019ve covered everything from bamboo toothbrushes to industrial sensors.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCheck({ value }: { value: boolean | string }) {
  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-[#C4C4BA]" />
  }
  if (value === true) {
    return <CheckCircle className="mx-auto h-5 w-5 text-[#22C55E]" />
  }
  return <span className="text-sm font-medium text-[#1A1A1A]">{value}</span>
}

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#E8E8E4] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 text-base font-semibold text-[#1A1A1A]">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-[#8A8A80]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-relaxed text-[#5A5A52]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PricingContent() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] font-sans">

      {/* ── 1. Hero ────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-8 pt-20 text-center sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="mb-4 inline-block rounded-full bg-[#FF6B35]/10 px-4 py-1.5 text-sm font-semibold text-[#FF6B35]">
            Pricing
          </span>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#5A5A52]">
            One report. Real intelligence. No subscription required.
          </p>
        </motion.div>
      </section>

      {/* ── 2. Pricing cards ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Single Report */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
            className="relative flex flex-col rounded-2xl border-2 border-[#FF6B35] bg-white shadow-sm"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-[#FF6B35] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Most popular
              </span>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Single Report</h2>
              <p className="mt-1 text-sm text-[#8A8A80]">Perfect for validating one product idea</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-bold text-[#1A1A1A]">$99</span>
                <span className="mb-2 text-[#8A8A80]">one-time</span>
              </div>
              <Link
                href="/analyze"
                className="mt-8 block w-full rounded-full bg-[#FF6B35] px-6 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Get your report
              </Link>
              <ul className="mt-8 space-y-3">
                {singleFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#3A3A32]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pro Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
            className="relative flex flex-col rounded-2xl bg-[#1A1A1A] shadow-sm"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Most value
              </span>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <h2 className="text-lg font-semibold text-white">Pro Monthly</h2>
              <p className="mt-1 text-sm text-[#8A8A80]">Unlimited analyses, every month</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-bold text-white">$199</span>
                <span className="mb-2 text-[#8A8A80]">/month</span>
              </div>
              <Link
                href="/analyze"
                className="mt-8 block w-full rounded-full bg-[#FF6B35] px-6 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Start Pro
              </Link>
              <ul className="mt-8 space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#D4D4CC]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Agency */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
            className="relative flex flex-col rounded-2xl border border-[#E8E8E4] bg-[#F5F5F0] shadow-sm"
          >
            <div className="flex flex-1 flex-col p-8">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Agency / Teams</h2>
              <p className="mt-1 text-sm text-[#8A8A80]">White-label, API access, custom volume</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-bold text-[#1A1A1A]">Custom</span>
              </div>
              <a
                href="mailto:hello@bottlecap.so"
                className="mt-8 block w-full rounded-full border-2 border-[#1A1A1A] bg-transparent px-6 py-3.5 text-center text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
              >
                Contact sales
              </a>
              <ul className="mt-8 space-y-3">
                {agencyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#3A3A32]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 3. Feature comparison table ────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#1A1A1A]">Full feature comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4] bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E8E4]">
                <th className="w-1/2 px-6 py-4 text-left font-semibold text-[#1A1A1A]">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-[#1A1A1A]">Single</th>
                <th className="px-4 py-4 text-center font-semibold text-[#1A1A1A]">Pro</th>
                <th className="px-4 py-4 text-center font-semibold text-[#1A1A1A]">Agency</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}>
                  <td className="px-6 py-3.5 font-medium text-[#3A3A32]">{row.name}</td>
                  <td className="px-4 py-3.5 text-center">
                    <FeatureCheck value={row.single} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <FeatureCheck value={row.pro} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <FeatureCheck value={row.agency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. ROI justification strip ─────────────────────────────────────── */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[#1A1A1A]">
            Why $99 is an easy decision
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl border border-[#E8E8E4] bg-[#FAFAF8] p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35]/10">
                <Users className="h-5 w-5 text-[#FF6B35]" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">vs. Sourcing Agent</h3>
              <p className="mt-2 text-3xl font-bold text-[#22C55E]">Save $3K&ndash;$10K</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5A5A52]">
                Sourcing agents charge thousands in fees and take 2 weeks to respond.
                Bottlecap gives you the same intelligence in 5 minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl border border-[#E8E8E4] bg-[#FAFAF8] p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35]/10">
                <Shield className="h-5 w-5 text-[#FF6B35]" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">vs. Trade Consultant</h3>
              <p className="mt-2 text-3xl font-bold text-[#22C55E]">Save $500+/hr</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5A5A52]">
                Trade consultants bill by the hour and often miss nuance. Our AI delivers
                3x more data points at a fraction of the cost.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl border border-[#E8E8E4] bg-[#FAFAF8] p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35]/10">
                <Zap className="h-5 w-5 text-[#FF6B35]" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">vs. DIY Research</h3>
              <p className="mt-2 text-3xl font-bold text-[#22C55E]">Save 40+ hours</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5A5A52]">
                Tariff databases, supplier directories, cost models &mdash; it takes weeks to
                piece together. We never miss a tariff change.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. FAQ accordion ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-2xl px-4 py-20">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#1A1A1A]">
          Frequently asked questions
        </h2>
        <div className="rounded-2xl border border-[#E8E8E4] bg-white px-6 shadow-sm">
          {faqItems.map((item, i) => (
            <FAQRow key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ── 6. CTA strip ───────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to validate your idea?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#8A8A80]">
            Get a complete manufacturing feasibility report in under 5 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start for $99
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="flex items-center gap-2 text-sm text-[#5A5A52]">
              <Shield className="h-4 w-4 text-[#22C55E]" />
              72-hour money-back guarantee
            </p>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
