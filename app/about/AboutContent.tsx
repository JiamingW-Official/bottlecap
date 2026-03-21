"use client"

import Link from "next/link"
import {
  Cpu,
  Globe2,
  BarChart3,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  Mail,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

/* ───── data ───── */

const capabilities = [
  {
    Icon: Cpu,
    title: "AI-Powered Analysis",
    desc: "Claude AI analyzes your product across 50+ manufacturing dimensions — feasibility, cost, materials, tariffs, sourcing countries, and optimization opportunities.",
  },
  {
    Icon: Globe2,
    title: "Global Sourcing Data",
    desc: "Real-time data from Alibaba, UN Comtrade, USITC, Google Trends, and Amazon to ground every recommendation in market reality.",
  },
  {
    Icon: BarChart3,
    title: "Actionable Reports",
    desc: "Not a wall of text — structured, visual reports with cost breakdowns, country comparisons, radar charts, and a prioritized action checklist.",
  },
  {
    Icon: Zap,
    title: "Minutes, Not Weeks",
    desc: "Traditional sourcing agents take 2-4 weeks and charge $2,000-$8,000. Bottlecap delivers the same depth in 2-5 minutes for $99.",
  },
  {
    Icon: Shield,
    title: "Your Ideas Stay Yours",
    desc: "Your product descriptions are never shared, sold, or used to train models. Stripe handles payments. We never see your card details.",
  },
  {
    Icon: BookOpen,
    title: "Free Education",
    desc: "14 manufacturing guides, 9 interactive tools, a 60-term glossary, and country profiles — all free, no account required.",
  },
]

const milestones = [
  { num: "20", numericTarget: 20, label: "Product categories supported" },
  { num: "14", numericTarget: 14, label: "Free manufacturing guides" },
  { num: "9", numericTarget: 9, label: "Interactive tools" },
  { num: "60+", numericTarget: 60, label: "Glossary terms", suffix: "+" },
  { num: "12", numericTarget: 12, label: "Country profiles" },
  { num: "5", numericTarget: 5, label: "Live data sources" },
]

const approachSteps = [
  {
    number: "01",
    title: "Describe your product",
    desc: "Tell us what you want to make — materials, target price, volume. Takes about 60 seconds.",
  },
  {
    number: "02",
    title: "AI meets real data",
    desc: "Claude AI analyzes your idea against live market data from 5 sources to build your report.",
  },
  {
    number: "03",
    title: "Get your answer",
    desc: "In 2-5 minutes, receive a 12-section feasibility report with costs, suppliers, and next steps.",
  },
]

/* ───── CountUp component ───── */

function CountUp({
  target,
  suffix = "",
}: {
  target: number
  suffix?: string
}) {
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
      {count}
      {suffix}
    </span>
  )
}

/* ───── Main Component ───── */

export default function AboutContent() {
  const capabilitiesRef = useRef(null)
  const capabilitiesInView = useInView(capabilitiesRef, {
    once: true,
    margin: "-50px",
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20 relative">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-6 relative">
          Every product idea deserves
          <br />
          honest analysis
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed relative">
          Bottlecap is a manufacturing feasibility tool for founders who want
          to make a physical product but don&apos;t know where to start.
          Describe your idea, and our AI tells you whether it can be made, how
          much it costs, and where to manufacture it.
        </p>
      </div>

      {/* The problem + Our approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 relative">
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#FF6B35]/[0.015] blur-3xl pointer-events-none" />
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            The problem
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-4">
            Founders with product ideas face a frustrating gap: the
            information needed to evaluate manufacturing feasibility is
            scattered across Alibaba listings, trade databases, customs
            regulations, and industry contacts that most people don&apos;t have.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            Hiring a sourcing agent costs $2,000&ndash;$8,000 and takes weeks.
            Most founders give up before getting an answer. That means good
            ideas die not because they&apos;re bad — but because the research
            is too hard.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Our approach
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-4">
            Bottlecap uses Claude AI (by Anthropic) to simulate the work of a
            manufacturing consultant. We combine AI analysis with real market
            data from 5 live sources — Alibaba supplier listings, UN Comtrade
            trade flows, USITC tariff schedules, Google Trends, and Amazon
            pricing.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            The result is a 12-section feasibility report: cost estimates,
            country comparisons, material recommendations, tariff impacts,
            and a step-by-step action plan — delivered in under 5 minutes.
          </p>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-20 relative" ref={capabilitiesRef}>
        <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-10 relative">
          What makes Bottlecap different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              animate={
                capabilitiesInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="bg-white rounded-xl border border-[#E8E8E4] p-6 hover:shadow-md hover:border-[#FF6B35]/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-4">
                <cap.Icon className="w-5 h-5 text-[#FF6B35] group-hover:text-[#FF6B35] transition-colors" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Built by founders, for founders */}
      <section className="py-16 relative">
        <div className="absolute -top-10 -left-20 w-[350px] h-[350px] rounded-full bg-[#FF6B35]/[0.015] blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
            Built by founders, for founders
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed max-w-2xl">
            We built Bottlecap because we needed it ourselves. After spending
            weeks researching manufacturing options for our own products, we
            realized AI could do in minutes what took us weeks. Now we&apos;re
            making that available to every founder with a product idea.
          </p>
        </div>
      </section>

      {/* How it works — numbered values */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-10">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approachSteps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-4xl font-black text-[#FF6B35]/10">
                {step.number}
              </span>
              <h3 className="font-semibold text-[#1A1A1A] mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats with count-up animation */}
      <div className="bg-[#F5F5F0] rounded-2xl p-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {milestones.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-black text-[#FF6B35]">
                <CountUp target={m.numericTarget} suffix={m.suffix || ""} />
              </p>
              <p className="text-xs text-[#6B6B6B] mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology */}
      <div className="mb-20 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-4 relative">
          Built on trusted technology
        </h2>
        <p className="text-center text-[#6B6B6B] mb-10 max-w-lg mx-auto relative">
          We use best-in-class infrastructure so you can trust the output.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {[
            { name: "Claude AI", sub: "by Anthropic" },
            { name: "Stripe", sub: "Payments" },
            { name: "Supabase", sub: "Database" },
            { name: "Vercel", sub: "Hosting" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-xl border border-[#E8E8E4] p-5 text-center hover:shadow-md hover:border-[#FF6B35]/20 transition-all"
            >
              <p className="font-semibold text-[#1A1A1A]">{tech.name}</p>
              <p className="text-xs text-[#9B9B9B] mt-0.5">{tech.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 text-center relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3 relative">
          Questions? We&apos;re here.
        </h2>
        <p className="text-[#6B6B6B] mb-2 max-w-md mx-auto relative">
          Whether you have a question about pricing, your report, or
          manufacturing in general — we respond within 24 hours.
        </p>
        <p className="text-sm text-[#FF6B35] font-medium mb-6 relative">
          Response time: &lt; 24 hours
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 relative">
          <a
            href="mailto:hello@bottlecap.io"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#E85A25] transition-colors group"
          >
            <Mail className="w-4 h-4" />
            hello@bottlecap.io
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] rounded-full px-6 py-3 font-semibold hover:bg-[#FFF0EB] transition-colors"
          >
            Start analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
