"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import {
  Factory,
  CheckCircle,
  Shield,
  Clock,
  MessageCircle,
  Mail,
  Globe,
  ArrowRight,
  ChevronDown,
  Star,
  Users,
  Package,
  Cpu,
  Zap,
  Lock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS & DATA
───────────────────────────────────────────────────────────────────────────── */

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const TRUST_STATS = [
  { label: "200+ factories vetted", icon: Factory },
  { label: "48hr avg response", icon: Clock },
  { label: "Direct contact info", icon: MessageCircle },
  { label: "Past work samples", icon: Package },
]

const HOW_IT_WORKS = [
  {
    number: "01",
    icon: Cpu,
    title: "Submit your report",
    description:
      "Start with a Bottlecap manufacturing analysis. We use your product specs to find the right factory match — not a generic keyword search.",
  },
  {
    number: "02",
    icon: Users,
    title: "We match 3 factories",
    description:
      "Our team manually reviews our verified network and selects three factories that match your product category, MOQ, and quality requirements.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Receive direct contacts",
    description:
      "You get the factory name, WhatsApp number, business email, WeChat (if applicable), and an English-speaking rep — all verified by us.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Open conversation — no markup",
    description:
      "Talk directly to the factory. No middleman. No broker fee. No sourcing agent taking 5–15% of your order value.",
  },
]

const WHAT_YOU_GET = [
  {
    icon: Factory,
    title: "Factory name + verified badge",
    description:
      "Legal entity name, years in operation, and our internal verification stamp so you know it&apos;s not a trading company.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp number",
    description:
      "The actual factory rep&apos;s WhatsApp — not a generic sales line. Response times average under 48 hours.",
  },
  {
    icon: Mail,
    title: "Business email address",
    description:
      "A verified @company.com email tied to the English-speaking sales contact we confirmed during vetting.",
  },
  {
    icon: Package,
    title: "Past work photos (3 examples)",
    description:
      "Real product photos from previous orders in your category. Inspect quality before you commit.",
  },
  {
    icon: Star,
    title: "MOQ + pricing tier",
    description:
      "Minimum order quantity and rough unit pricing at 500 / 1,000 / 5,000 units so you can model your margin immediately.",
  },
  {
    icon: Globe,
    title: "English-speaking contact",
    description:
      "We confirm every contact handles English communication fluently — no Google Translate ping-pong on your first deal.",
  },
]

const VETTING_CRITERIA = [
  {
    number: "01",
    title: "3+ years operating history",
    description:
      "Fly-by-night factories fail fast. We only list manufacturers that have been operating for at least three years.",
    color: "#FF6B35",
  },
  {
    number: "02",
    title: "<10% negative review rate",
    description:
      "Cross-referenced against Alibaba, Global Sources, and Made-in-China review data. Above 10% negative = excluded.",
    color: "#22C55E",
  },
  {
    number: "03",
    title: "Direct factory (not trading co.)",
    description:
      "We physically verify factory registration documents. Trading companies masquerading as factories are blacklisted.",
    color: "#3B82F6",
  },
  {
    number: "04",
    title: "English-speaking rep confirmed",
    description:
      "A team member has a live conversation with the contact in English before they join the network.",
    color: "#A855F7",
  },
  {
    number: "05",
    title: "Sample shipment within 2 weeks",
    description:
      "Factory must be able to ship a product sample within 14 days. Slow-sample factories are a red flag.",
    color: "#F59E0B",
  },
  {
    number: "06",
    title: "Past work in your category",
    description:
      "We match factories that have produced something in your product category — not factories that claim they can.",
    color: "#EC4899",
  },
]

const PRODUCT_CATEGORIES = [
  { name: "Electronics", count: "45+" },
  { name: "Apparel", count: "38+" },
  { name: "Home Goods", count: "52+" },
  { name: "Plastics", count: "41+" },
  { name: "Metal", count: "33+" },
  { name: "Beauty", count: "29+" },
  { name: "Toys", count: "24+" },
  { name: "Bags", count: "31+" },
  { name: "Food Packaging", count: "27+" },
  { name: "Electronics Accessories", count: "48+" },
  { name: "Fitness", count: "22+" },
  { name: "Pet Products", count: "19+" },
]

const FAQS = [
  {
    question: "How is this different from Alibaba?",
    answer:
      "Alibaba is an algorithm-ranked marketplace where trading companies pay for placement. We manually vet every factory on our list — confirming they&apos;re a direct manufacturer, checking their review history, and speaking to an English-speaking rep. You get 3 curated contacts, not 200 unvetted results.",
  },
  {
    question: "What if I don&apos;t have a Bottlecap report?",
    answer:
      "You&apos;ll need one first. Our supplier matching is based on your product specs — materials, category, target MOQ, and quality tier. Without a report, we can&apos;t match accurately. A single report is $99 and takes 2–5 minutes.",
  },
  {
    question: "How long does it take?",
    answer:
      "24–48 hours after purchase. Our team reviews your report, selects the three best matches from our network, and sends you a formatted card with all contact details and past work photos.",
  },
  {
    question: "What if the factories don&apos;t respond?",
    answer:
      "We follow up directly and replace any non-responsive match within 72 hours — at no extra cost. Our network contacts are regularly re-verified to keep response rates high.",
  },
  {
    question: "Is this a recurring charge?",
    answer:
      "No. It&apos;s a one-time $199 per product type or search. If you launch a second product line and need a fresh match, that&apos;s a new $199 purchase.",
  },
  {
    question: "Can I see factories before paying?",
    answer:
      "The sample card on this page shows you the exact format. All identifying details — factory name, WhatsApp, email — are unlocked after purchase. This protects our network from being scraped.",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   REUSABLE: FADE-UP SCROLL ANIMATION WRAPPER
───────────────────────────────────────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION ITEM
───────────────────────────────────────────────────────────────────────────── */

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <FadeUp delay={index * 0.05}>
      <div className="border border-[#E8E8E4] rounded-xl overflow-hidden bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#FAFAF8] transition-colors"
          aria-expanded={open}
        >
          <span className="font-semibold text-[#1A1A1A] text-[15px] leading-snug">{question}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="shrink-0"
          >
            <ChevronDown size={18} className="text-[#888]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <p
                className="px-6 pb-5 text-[14px] text-[#555] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function SuppliersContent() {
  const howRef = useRef<HTMLDivElement>(null)

  function scrollToHow(e: React.MouseEvent) {
    e.preventDefault()
    howRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="bg-[#FAFAF8] min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#1A1A1A] text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Ambient orange glow blob at top */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.18]"
          style={{ background: "radial-gradient(ellipse at center, #FF6B35 0%, transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto px-5 pt-28 pb-20 text-center">

          {/* Eyebrow badge */}
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-medium text-white/80 mb-8 tracking-wide uppercase">
              <Shield size={12} className="text-[#FF6B35]" />
              Manually verified &middot; Not algorithmic
            </div>
          </FadeUp>

          {/* H1 with orange gradient on "Verified" */}
          <FadeUp delay={0.08}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF9A6C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Verified
              </span>{" "}
              Manufacturing
              <br className="hidden sm:block" />
              {" "}Partners
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.14}>
            <p className="max-w-xl mx-auto text-[17px] text-white/70 leading-relaxed mb-10">
              3 manually verified factories matched to your product — with direct WhatsApp, email,
              and past-work samples. Skip 200 Alibaba messages.
            </p>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55a26] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-[15px] shadow-[0_4px_24px_rgba(255,107,53,0.32)]"
              >
                Get Matched &mdash; $199
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={scrollToHow}
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white/80 font-medium px-6 py-3.5 rounded-xl transition-colors text-[15px]"
              >
                See how it works
              </button>
            </div>
          </FadeUp>

          {/* Trust stat chips */}
          <FadeUp delay={0.28}>
            <div className="flex flex-wrap justify-center gap-3 mt-12 pt-12 border-t border-white/[0.08]">
              {TRUST_STATS.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] rounded-full px-4 py-2 text-[13px] text-white/65"
                >
                  <Icon size={13} className="text-[#FF6B35]" />
                  {label}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="how" ref={howRef} className="max-w-5xl mx-auto px-5 py-24">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-[12px] uppercase tracking-widest font-semibold text-[#FF6B35] mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">How it works</h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-md mx-auto leading-relaxed">
              Four steps from product idea to direct factory conversation — in under 48 hours.
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-6">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon
            return (
              <FadeUp key={step.number} delay={i * 0.08}>
                <div className="relative bg-white border border-[#E8E8E4] rounded-2xl p-7 h-full hover:shadow-md hover:border-[#FF6B35]/20 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Numbered circle */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
                      style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FF9A6C 100%)" }}
                    >
                      {step.number}
                    </div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#FF6B35]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[17px] mb-2">{step.title}</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — WHAT YOU GET
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-5 py-24">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[12px] uppercase tracking-widest font-semibold text-[#22C55E] mb-3">Deliverables</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                What&apos;s in the $199
              </h2>
              <p className="mt-4 text-[15px] text-[#666] max-w-md mx-auto leading-relaxed">
                Six data points per factory — everything you need to open a real conversation and place a first order.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHAT_YOU_GET.map((item, i) => {
              const Icon = item.icon
              return (
                <FadeUp key={item.title} delay={i * 0.07}>
                  <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center">
                        <Icon size={16} className="text-[#22C55E]" />
                      </div>
                      <CheckCircle size={15} className="text-[#22C55E]" />
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A] text-[15px] mb-1.5">{item.title}</h3>
                    <p
                      className="text-[13px] text-[#666] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — SAMPLE CARD (REDACTED)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-5 py-24">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-[12px] uppercase tracking-widest font-semibold text-[#FF6B35] mb-3">Preview</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              What a factory card looks like
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-md mx-auto leading-relaxed">
              You receive 3 cards like this — private details unlocked after purchase.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-lg mx-auto">

            {/* ── Factory card ── */}
            <div className="bg-white border-2 border-[#E8E8E4] rounded-2xl overflow-hidden shadow-lg">

              {/* Card header */}
              <div className="bg-[#1A1A1A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 border border-[#FF6B35]/30 flex items-center justify-center">
                    <Factory size={14} className="text-[#FF6B35]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50 uppercase tracking-wider mb-0.5">Factory Name</div>
                    <div
                      className="text-white font-semibold text-[14px] select-none"
                      style={{ filter: "blur(4px)" }}
                    >
                      Shenzhen Precision Mfg. Co.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#22C55E]/20 border border-[#22C55E]/30 rounded-full px-3 py-1">
                  <CheckCircle size={11} className="text-[#22C55E]" />
                  <span className="text-[11px] font-semibold text-[#22C55E]">Verified</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 space-y-4">

                {/* Location — visible */}
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-[#888] shrink-0" />
                  <span className="text-[14px] text-[#444]">Guangdong Province, China</span>
                </div>

                {/* WhatsApp — blurred */}
                <div className="flex items-center gap-3">
                  <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#999] mb-0.5">WhatsApp</div>
                    <div
                      className="text-[14px] font-mono text-[#1A1A1A] select-none"
                      style={{ filter: "blur(4px)" }}
                    >
                      +86 138 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;
                    </div>
                  </div>
                </div>

                {/* Email — blurred */}
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#3B82F6] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#999] mb-0.5">Business Email</div>
                    <div
                      className="text-[14px] font-mono text-[#1A1A1A] select-none"
                      style={{ filter: "blur(4px)" }}
                    >
                      sales@&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;.com
                    </div>
                  </div>
                </div>

                {/* Product category tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Electronics", "Injection Moulding", "OEM / ODM"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-full px-3 py-1 text-[12px] text-[#555] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* MOQ + verified date */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E4]">
                  <div>
                    <div className="text-[11px] text-[#999]">Min. Order</div>
                    <div className="text-[13px] font-semibold text-[#1A1A1A]">500 units</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#999]">Verified</div>
                    <div className="text-[13px] font-semibold text-[#22C55E]">March 2026</div>
                  </div>
                </div>
              </div>

              {/* Locked footer row */}
              <div className="px-6 pb-6">
                <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 flex items-center gap-2 text-[13px] text-[#888]">
                  <Lock size={13} className="shrink-0 text-[#BBBBB5]" />
                  Past work photos &middot; English contact confirmed &middot; Pricing tier
                </div>
              </div>
            </div>

            {/* CTA below card */}
            <div className="mt-8 text-center">
              <p className="text-[14px] text-[#666] mb-4">
                Unlock 3 cards like this, matched to your product &mdash; one-time $199
              </p>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55a26] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-[15px] shadow-[0_4px_20px_rgba(255,107,53,0.28)]"
              >
                Unlock my 3 factories
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — MATCH CRITERIA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-5 py-24">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[12px] uppercase tracking-widest font-semibold text-[#FF6B35] mb-3">
                Vetting Standard
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                6 criteria to get listed
              </h2>
              <p className="mt-4 text-[15px] text-[#666] max-w-md mx-auto leading-relaxed">
                Every factory on our network passes all six checks — or they don&apos;t get in.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VETTING_CRITERIA.map((crit, i) => (
              <FadeUp key={crit.number} delay={i * 0.07}>
                <div
                  className="bg-[#FAFAF8] rounded-2xl p-6 h-full"
                  style={{
                    borderLeft: `4px solid ${crit.color}`,
                    borderTop: "1px solid #E8E8E4",
                    borderRight: "1px solid #E8E8E4",
                    borderBottom: "1px solid #E8E8E4",
                  }}
                >
                  <div
                    className="text-[11px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: crit.color }}
                  >
                    Criterion {crit.number}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[15px] mb-2">{crit.title}</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">{crit.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — PRODUCT CATEGORIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-5 py-24">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-[12px] uppercase tracking-widest font-semibold text-[#FF6B35] mb-3">Coverage</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Categories we cover
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-md mx-auto leading-relaxed">
              Factory counts updated quarterly. New categories added as our network grows.
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-wrap justify-center gap-3">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
              className="flex items-center gap-2 bg-white border border-[#E8E8E4] rounded-full px-5 py-2.5 shadow-sm hover:border-[#FF6B35]/30 hover:bg-[#FFF6F2] transition-all cursor-default"
            >
              <span className="font-semibold text-[#1A1A1A] text-[14px]">{cat.name}</span>
              <span className="bg-[#FF6B35]/10 text-[#FF6B35] font-bold text-[12px] rounded-full px-2.5 py-0.5">
                {cat.count}
              </span>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <p className="text-center text-[13px] text-[#999] mt-8">
            Don&apos;t see your category?{" "}
            <a
              href="mailto:hello@bottlecap.so"
              className="text-[#FF6B35] underline underline-offset-2 hover:text-[#e55a26] transition-colors"
            >
              Email us
            </a>{" "}
            &mdash; we&apos;ll tell you if we have coverage.
          </p>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E8E8E4]">
        <div className="max-w-2xl mx-auto px-5 py-24">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-[12px] uppercase tracking-widest font-semibold text-[#FF6B35] mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                Common questions
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center text-[13px] text-[#999] mt-8">
              More questions?{" "}
              <a
                href="mailto:hello@bottlecap.so"
                className="text-[#FF6B35] hover:text-[#e55a26] underline underline-offset-2 font-medium transition-colors"
              >
                Email hello@bottlecap.so
              </a>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — FINAL CTA (dark)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#1A1A1A] text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Orange glow from bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.22]"
          style={{ background: "radial-gradient(ellipse at center, #FF6B35 0%, transparent 70%)" }}
        />

        <div className="relative max-w-3xl mx-auto px-5 py-24 text-center">

          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-medium text-white/70 mb-8 tracking-wide uppercase">
              <Zap size={11} className="text-[#FF6B35]" />
              Skip the inbox grind
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
              Ready to skip the
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF9A6C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                inbox grind?
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="text-white/60 text-[16px] mb-2 font-medium">
              $199 &nbsp;&middot;&nbsp; One time &nbsp;&middot;&nbsp; 3 verified contacts &nbsp;&middot;&nbsp; 48 hour delivery
            </p>
            <p className="text-white/38 text-[13px] mb-10">
              You need a Bottlecap report first &mdash; takes 2&ndash;5 minutes.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55a26] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-[16px] shadow-[0_4px_24px_rgba(255,107,53,0.35)]"
              >
                Get my report first &mdash; $99
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white/80 font-medium px-6 py-4 rounded-xl transition-colors text-[15px]"
              >
                See all pricing
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="flex flex-wrap justify-center gap-5 mt-10 text-[13px] text-white/40">
              <span className="flex items-center gap-1.5">
                <Shield size={12} className="text-[#22C55E]" />
                72-hour money-back guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#22C55E]" />
                Manually verified contacts
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-[#22C55E]" />
                Delivered within 48 hours
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  )
}
