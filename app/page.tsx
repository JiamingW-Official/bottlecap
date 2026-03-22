"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Check, ArrowRight, Lock, EyeOff, RotateCcw, Cpu, BookOpen, Globe2, FlaskConical, Factory, Zap, DollarSign, BarChart3 } from "lucide-react"
import AgenticHero from "@/components/AgenticHero"
import AnimatedCounter from "@/components/AnimatedCounter"
import DataExplorer from "@/components/DataExplorer"
import CountrySpotlight from "@/components/CountrySpotlight"
import ProcessDiagram from "@/components/ProcessDiagram"
import FeatureShowcase from "@/components/FeatureShowcase"
import IndustryComparison from "@/components/IndustryComparison"
import CategoryShowcase from "@/components/CategoryShowcase"
import LiveDemoSection from "@/components/LiveDemoSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import FAQ from "@/components/FAQ"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import ParallaxLayer from "@/components/animations/ParallaxLayer"
import MagneticButton from "@/components/interactive/MagneticButton"
import HeroFallback from "@/components/three/HeroFallback"
import { useWebGLCapability } from "@/lib/hooks/useWebGLCapability"
import { useGSAPScrollTrigger } from "@/lib/hooks/useGSAPScrollTrigger"

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
})

const singleFeatures = [
  "Full feasibility analysis",
  "Cost breakdown",
  "3-country comparison",
  "Optimization tips",
  "Shareable report card",
]

const monthlyExtras = [
  "Unlimited analyses",
  "Priority support",
  "Early access to new features",
]

export default function Home() {
  const { supported, tier } = useWebGLCapability()
  useGSAPScrollTrigger()

  return (
    <main className="min-h-screen">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
        {/* 3D Background */}
        {supported && tier !== "none" ? (
          <HeroScene tier={tier} />
        ) : (
          <HeroFallback />
        )}

        {/* Hero Content */}
        <ScrollReveal className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <AgenticHero />
        </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/* VALUE CONTRAST STRIP                                             */}
      {/* ================================================================ */}
      <div className="py-14 bg-white border-y border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Time to report",
                value: "2–5",
                unit: "min",
                sub: "vs. weeks of research",
                color: "#22C55E",
                Icon: Zap,
              },
              {
                label: "One-time cost",
                value: "$99",
                unit: "",
                sub: "vs. $2K–$8K sourcing agents",
                color: "#FF6B35",
                Icon: DollarSign,
              },
              {
                label: "Report sections",
                value: "12",
                unit: "sections",
                sub: "cost · countries · materials · tariffs",
                color: "#3B82F6",
                Icon: BarChart3,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="relative bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[#D0D0C8] transition-all group"
              >
                {/* Left color bar */}
                <div
                  className="absolute left-0 inset-y-0 w-[3px] rounded-l-2xl"
                  style={{ backgroundColor: item.color }}
                />
                <div className="pl-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <item.Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B9B9B]">
                      {item.label}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-4xl font-black tracking-tight text-[#1A1A1A]">{item.value}</p>
                    {item.unit && (
                      <p className="text-base font-medium text-[#9B9B9B]">{item.unit}</p>
                    )}
                  </div>
                  <p className="text-sm text-[#9B9B9B]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <div className="relative py-20" id="how-it-works">
        {/* Background depth element */}
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/[0.03] blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="max-w-5xl mx-auto px-6 relative">
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">How it works</p>
            <TextReveal
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4 text-[#1A1A1A]"
            >
              No factory contacts. No sourcing agents. No guessing.
            </TextReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[#6B6B6B] mb-12 max-w-2xl">
                Describe your product. We analyze it across 50+ dimensions. You get a 12-section report in minutes &mdash; not weeks.
              </p>
            </ScrollReveal>
            <ProcessDiagram />
          </div>
        </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/* FEATURES (12-grid)                                               */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20 bg-[#F5F5F0]" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">What you get</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            Built for founders who have never done this before
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              12 sections. Every question you&apos;d ask a consultant &mdash; answered in advance.
            </p>
          </ScrollReveal>
          <FeatureShowcase />
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* REPORT PREVIEW                                                   */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20" direction="scale">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Sample report</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            See what you get
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              Here&apos;s a preview of a real report. Explore the full demo to
              see every section.
            </p>
          </ScrollReveal>

          <ParallaxLayer speed={0.95}>
            <div className="relative max-w-md mx-auto">
              {/* Stacked cards behind */}
              <div className="absolute inset-0 bg-white rounded-3xl border border-[#E8E8E4] transform rotate-3 translate-x-3 translate-y-3 opacity-20" />
              <div className="absolute inset-0 bg-white rounded-3xl border border-[#E8E8E4] transform -rotate-1 translate-x-1.5 translate-y-1.5 opacity-40" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-[#E8E8E4] transform rotate-1 hover:rotate-0 transition-transform">
              <div className="absolute -top-2 -left-2 flex items-center gap-1 bg-white border border-[#E8E8E4] rounded-full px-2.5 py-1 shadow-sm"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span></span><span className="text-[10px] font-semibold text-[#6B6B6B]">LIVE</span></div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-[#9B9B9B]">Bottlecap</span>
                <span className="text-sm text-[#9B9B9B]">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                Smart Thermos
              </h3>
              <div className="mb-4">
                <span className="text-6xl font-black text-[#22C55E]">87</span>
                <span className="text-2xl text-[#9B9B9B] ml-1">/100</span>
              </div>
              <p className="text-sm text-[#FF6B35] font-medium mb-6">
                Highly feasible &mdash; Vietnam is your best bet
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[#F5F5F0] rounded-xl p-3">
                  <p className="text-[10px] text-[#9B9B9B] uppercase tracking-wide mb-0.5">
                    Cost/unit
                  </p>
                  <p className="font-bold text-[#1A1A1A]">$6.20–$8.40</p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-3">
                  <p className="text-[10px] text-[#9B9B9B] uppercase tracking-wide mb-0.5">
                    Best country
                  </p>
                  <p className="font-bold text-[#1A1A1A]">Vietnam 🇻🇳</p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-3">
                  <p className="text-[10px] text-[#9B9B9B] uppercase tracking-wide mb-0.5">
                    Min. order
                  </p>
                  <p className="font-bold text-[#1A1A1A]">500 units</p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-3">
                  <p className="text-[10px] text-[#9B9B9B] uppercase tracking-wide mb-0.5">
                    Lead time
                  </p>
                  <p className="font-bold text-[#1A1A1A]">32 days</p>
                </div>
              </div>

              {/* Cost breakdown mini chart */}
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9B9B9B] mb-2">
                  Cost breakdown
                </p>
                {[
                  { label: "Materials", pct: 38, color: "#FF6B35" },
                  { label: "Labor",     pct: 32, color: "#3B82F6" },
                  { label: "Overhead",  pct: 15, color: "#8B5CF6" },
                  { label: "Packaging", pct: 10, color: "#22C55E" },
                  { label: "Shipping",  pct: 5,  color: "#F59E0B" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] text-[#9B9B9B] w-14 shrink-0 text-right">{row.label}</span>
                    <div className="flex-1 h-1.5 bg-[#F0F0EC] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                      />
                    </div>
                    <span className="text-[9px] font-medium text-[#6B6B6B] w-5 shrink-0">{row.pct}%</span>
                  </div>
                ))}
              </div>
              <Link
                href="/report/demo"
                className="block text-center bg-[#FF6B35] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Explore full demo report &rarr;
              </Link>
            </div>
            </div>
          </ParallaxLayer>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* LIVE DEMO ANIMATION                                              */}
      {/* ================================================================ */}
      <LiveDemoSection />

      {/* ================================================================ */}
      {/* INDUSTRY COMPARISON TABLE                                        */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Why Bottlecap</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            How Bottlecap compares
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              Traditional manufacturing research takes weeks and costs thousands.
              Bottlecap delivers more detail in minutes.
            </p>
          </ScrollReveal>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 sm:p-8">
            <IndustryComparison />
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* TESTIMONIALS                                                     */}
      {/* ================================================================ */}
      <div>
        <div className="max-w-6xl mx-auto px-6 pt-20">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Founders say</p>
        </div>
        <TestimonialsSection />
      </div>

      {/* ================================================================ */}
      {/* CATEGORIES WE COVER                                              */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Coverage</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            20 product categories covered
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-8 max-w-2xl mx-auto">
              From consumer electronics to apparel — filter by category or search to find yours. Click any to start your analysis.
            </p>
          </ScrollReveal>
          <CategoryShowcase />
          <div className="text-center mt-8">
            <Link href="/tools" className="text-sm text-[#FF6B35] font-medium hover:underline">
              Explore all product categories &rarr;
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* DATA EXPLORER                                                    */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">Our database</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4 text-[#1A1A1A]"
          >
            Explore our manufacturing database
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[#6B6B6B] mb-8 max-w-2xl">
              12 countries, 50+ materials, 40+ products &mdash; searchable
              and filterable. All the data that powers your report.
            </p>
          </ScrollReveal>
          <DataExplorer />
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* COUNTRY SPOTLIGHT                                                */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">Manufacturing regions</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4 text-[#1A1A1A]"
          >
            Where should you manufacture?
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[#6B6B6B] mb-8 max-w-2xl">
              Compare top manufacturing countries across cost, quality, lead time, and IP protection — side by side.
            </p>
          </ScrollReveal>
          <CountrySpotlight />
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* BY THE NUMBERS                                                   */}
      {/* ================================================================ */}
      <div className="py-16 bg-[#F5F5F0] border-t border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            <AnimatedCounter end={23} label="Industries" sublabel="analyzed" />
            <AnimatedCounter end={12} label="Countries" sublabel="compared" />
            <AnimatedCounter end={50} suffix="+" label="Materials" sublabel="in database" />
            <AnimatedCounter end={40} suffix="+" label="Products" sublabel="cost data" />
            <AnimatedCounter end={90} suffix="+" label="HS Codes" sublabel="tariff rates" />
            <AnimatedCounter end={60} suffix="+" label="Terms" sublabel="in glossary" />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FREE TOOLS CTA                                                   */}
      {/* ================================================================ */}
      <ScrollReveal className="py-16 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <TextReveal
                as="h2"
                className="text-3xl font-bold text-[#1A1A1A] mb-4"
              >
                Free manufacturing tools
              </TextReveal>
              <p className="text-[#6B6B6B] mb-6">
                Use our free tools to start your research before committing
                to a full analysis. No account needed.
              </p>
              <div className="space-y-3">
                <Link
                  href="/tools/hs-lookup"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    HS Code Lookup
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/tools/cost-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    Cost Calculator
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/tools/tariff-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    Tariff Calculator
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/tools/moq-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    MOQ Planner
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-white rounded-2xl border border-[#E8E8E4] p-8 shadow-sm">
                <p className="text-6xl font-black text-[#FF6B35]">9</p>
                <p className="text-lg font-semibold text-[#1A1A1A] mt-2">
                  Free Tools
                </p>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  No signup required
                </p>
                <div className="mt-4 space-y-1.5">
                  {[
                    "HS Code Lookup",
                    "Cost Calculator",
                    "Tariff Calculator",
                    "+ 6 more",
                  ].map(t => (
                    <p key={t} className="text-xs text-[#9B9B9B]">{t}</p>
                  ))}
                </div>
                <Link
                  href="/tools"
                  className="inline-block mt-4 text-[#FF6B35] font-semibold text-sm hover:underline"
                >
                  View all tools &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* PRICING                                                          */}
      {/* ================================================================ */}
      <div className="relative" id="pricing">
        {/* Background mesh gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6B35]/[0.02] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/[0.03] blur-3xl" />
        </div>
      <ScrollReveal className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Pricing</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            One price. Everything included.
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-lg mx-auto">
              No upsells inside the report. No credits. Not useful? Full refund
              within 72 hours &mdash; no questions asked.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Report — hero card */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative bg-[#FF6B35] rounded-2xl p-8 text-white shadow-xl">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                <p className="text-sm font-medium text-white/70 mb-1 uppercase tracking-wide">
                  Most common starting point
                </p>
                <h3 className="text-xl font-bold mb-4">Single Report</h3>
                <div className="mb-1">
                  <span className="text-5xl font-black">$99</span>
                </div>
                <p className="text-white/70 mb-6">
                  one-time &middot; no subscription
                </p>
                <ul className="space-y-3 mb-8">
                  {singleFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-white/80 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton className="w-full">
                  <Link
                    href="/analyze"
                    className="block text-center bg-white text-[#FF6B35] w-full rounded-full py-3 font-bold hover:bg-white/90 transition-colors"
                  >
                    Analyze my idea &mdash; $99
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Monthly */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative bg-white rounded-2xl p-8 border-2 border-[#E8E8E4]">
                <p className="text-sm font-medium text-[#9B9B9B] mb-1 uppercase tracking-wide">
                  For repeat founders
                </p>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                  Monthly
                </h3>
                <div className="mb-1">
                  <span className="text-5xl font-black text-[#1A1A1A]">
                    $199
                  </span>
                </div>
                <p className="text-[#6B6B6B] mb-6">
                  /month &middot; cancel anytime
                </p>
                <p className="text-xs text-[#9B9B9B] uppercase tracking-wide mb-3 font-semibold">
                  Everything in Single, plus:
                </p>
                <ul className="space-y-3 mb-8">
                  {monthlyExtras.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[#1A1A1A]"
                    >
                      <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton className="w-full">
                  <Link
                    href="/analyze"
                    className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3 font-semibold hover:bg-[#FFF0EB] transition-colors"
                  >
                    Subscribe monthly
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/* GUIDES CTA                                                       */}
      {/* ================================================================ */}
      <ScrollReveal className="py-16 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">Learn</p>
          <TextReveal
            as="h2"
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          >
            Read before you buy
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[#6B6B6B] mb-8 max-w-lg">
              Free guides written for first-time founders. No manufacturing background required.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/guide/manufacturing-101", label: "Manufacturing 101", desc: "Start here if you\u2019ve never sourced before", Icon: BookOpen },
              { href: "/guide/country-comparison", label: "Country Comparison", desc: "China vs. Vietnam vs. India vs. Mexico", Icon: Globe2 },
              { href: "/guide/materials", label: "Materials Guide", desc: "What to specify, what to avoid", Icon: FlaskConical },
              { href: "/guide/sourcing", label: "Sourcing Guide", desc: "How to find and vet a real factory", Icon: Factory },
            ].map((guide, i) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="relative bg-white rounded-xl border border-[#E8E8E4] p-5 text-left hover:shadow-md hover:border-[#FF6B35]/40 transition-all group"
              >
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="w-9 h-9 bg-[#FFF0EB] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#FF6B35]/10 transition-colors">
                  <guide.Icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <p className="font-semibold text-[#1A1A1A] text-sm">
                  {guide.label}
                </p>
                <p className="text-xs text-[#9B9B9B] mt-1 leading-snug">
                  {guide.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 text-center">Questions</p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-center mb-4 text-[#1A1A1A]"
          >
            Frequently asked questions
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12">
              Everything you need to know about Bottlecap reports.
            </p>
          </ScrollReveal>
          <FAQ />
          <div className="text-center mt-8">
            <p className="text-sm text-[#6B6B6B]">
              Still have questions?{" "}
              <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] font-medium hover:underline">
                Email us
              </a>
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* TRUST / SECURITY                                                 */}
      {/* ================================================================ */}
      <ScrollReveal className="py-14 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-6 text-center">Built on trust</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { Icon: Lock, title: "Stripe Secured", sub: "PCI compliant payments", color: "#3B82F6" },
              { Icon: EyeOff, title: "Confidential", sub: "Your ideas stay yours", color: "#8B5CF6" },
              { Icon: RotateCcw, title: "72-hr Refund", sub: "No questions asked", color: "#22C55E" },
              { Icon: Cpu, title: "Claude AI", sub: "Powered by Anthropic", color: "#FF6B35" },
            ].map((item) => (
              <div key={item.title} className="group flex items-center gap-3 bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#D0D0C8] hover:shadow-sm transition-all">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A] leading-tight">{item.title}</p>
                  <p className="text-xs text-[#9B9B9B] mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* FINAL CTA                                                        */}
      {/* ================================================================ */}
      <ScrollReveal className="py-24 text-center relative" direction="scale">
        <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#FF6B35]/[0.03] blur-3xl" /></div>
        <div className="max-w-4xl mx-auto px-6 relative">
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          >
            Your product idea. Real numbers. 5 minutes.
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[#6B6B6B] mb-10 max-w-xl mx-auto">
              Most founders are surprised by the result &mdash; cost is different than expected, or a country they hadn&apos;t considered looks better. Either way, you leave with a plan.
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/report/demo"
                className="border-2 border-[#FF6B35] text-[#FF6B35] rounded-full px-8 py-4 font-semibold hover:bg-[#FFF0EB] transition-colors inline-block"
              >
                See an example
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/analyze"
                className="bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors inline-block"
              >
                Analyze my idea — $99
              </Link>
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>
    </main>
  )
}
