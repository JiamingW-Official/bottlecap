"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Check, ArrowRight } from "lucide-react"
import AgenticHero from "@/components/AgenticHero"
import CountrySpotlight from "@/components/CountrySpotlight"
import FeatureShowcase from "@/components/FeatureShowcase"
import LiveDemoSection from "@/components/LiveDemoSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import FAQ from "@/components/FAQ"
import ROIStrip from "@/components/ROIStrip"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"
import HeroFallback from "@/components/three/HeroFallback"
import { useWebGLCapability } from "@/lib/hooks/useWebGLCapability"
import { useGSAPScrollTrigger } from "@/lib/hooks/useGSAPScrollTrigger"

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
})

const singleFeatures = [
  "12-section feasibility report",
  "Per-unit cost breakdown (materials, labor, overhead)",
  "3-country manufacturing comparison",
  "HS code + tariff classification",
  "Factory-ready specifications",
  "Optimization tips with dollar savings",
  "72-hour money-back guarantee",
]

export default function Home() {
  const { supported, tier } = useWebGLCapability()
  useGSAPScrollTrigger()

  return (
    <main className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
        {supported && tier !== "none" ? <HeroScene tier={tier} /> : <HeroFallback />}
        <ScrollReveal className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <AgenticHero />
        </ScrollReveal>
      </div>

      {/* ─── SOCIAL PROOF BAR ────────────────────────────────────────── */}
      <div className="border-y border-[#E8E8E4] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="text-[13px] text-[#6B6B6B]">
            <span className="font-bold text-[#1A1A1A]">2,400+</span> reports generated
          </span>
          <span className="text-[#E8E8E4]">|</span>
          <span className="text-[13px] text-[#6B6B6B]">
            Avg delivery: <span className="font-bold text-[#1A1A1A]">3 min 12 sec</span>
          </span>
          <span className="text-[#E8E8E4]">|</span>
          <span className="text-[13px] text-[#6B6B6B]">
            Rated <span className="font-bold text-[#1A1A1A]">4.9/5</span> by users
          </span>
          <span className="text-[#E8E8E4]">|</span>
          <Link href="/report/demo" className="text-[13px] text-[#FF6B35] font-semibold hover:underline">
            See a sample report &rarr;
          </Link>
        </div>
      </div>

      {/* ─── LIVE DEMO ────────────────────────────────────────────────── */}
      <LiveDemoSection />

      {/* ─── WHAT YOU GET ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAF8]" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF6B35] mb-3">
              What you get
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
              12 sections. Every question a consultant would answer.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Feasibility score, cost breakdown, country comparison, HS codes, materials analysis,
              factory specs, optimization tips, compliance flags, and more — generated in minutes,
              not weeks.
            </p>
          </div>
          <FeatureShowcase />
        </div>
      </section>

      {/* ─── ROI ──────────────────────────────────────────────────────── */}
      <ROIStrip />

      {/* ─── COUNTRY INTELLIGENCE ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF6B35] mb-3">
              Manufacturing intelligence
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
              8 countries. Real trade data. Updated for 2026.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Section 301 tariffs, USMCA rules, PLI incentives, GSP+ status — we track it so you
              don&#39;t have to. Compare cost, quality, lead time, and IP risk side by side.
            </p>
          </div>
          <CountrySpotlight />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-24" id="pricing">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF6B35] mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
              One report. One price. No surprises.
            </h2>
            <p className="text-[#6B6B6B] max-w-lg mx-auto">
              No subscription required. Not useful? Full refund within 72 hours.
            </p>
          </div>

          {/* Single card — the only thing that matters */}
          <div className="relative bg-[#1A1A1A] rounded-2xl p-10 sm:p-12 text-white overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Left: price + CTA */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
                  Manufacturing feasibility report
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black tracking-tight">$99</span>
                  <span className="text-white/40 text-lg">one-time</span>
                </div>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  Pay once, keep forever. No credits, no hidden fees.
                  <br />
                  Need unlimited? <Link href="/pricing" className="text-[#FF6B35] hover:underline">See Pro at $199/mo</Link>
                </p>
                <MagneticButton className="w-full">
                  <Link
                    href="/analyze"
                    className="flex items-center justify-center gap-2 w-full bg-[#FF6B35] text-white rounded-xl py-4 font-semibold hover:bg-[#E85A25] transition-colors text-[15px]"
                  >
                    Analyze my product
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
                <p className="text-center text-white/30 text-xs mt-3">
                  2-5 min delivery · 72-hr money back
                </p>
              </div>

              {/* Right: what's included */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
                  Everything included
                </p>
                <ul className="space-y-3">
                  {singleFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] text-white/80">
                      <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAF8]" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF6B35] mb-3">
              Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A]">
              Frequently asked
            </h2>
          </div>
          <FAQ />
          <p className="text-center text-sm text-[#767676] mt-10">
            Still have questions?{" "}
            <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] font-medium hover:underline">
              Email us
            </a>
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B35]/[0.04] blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] text-[#1A1A1A] mb-5">
            Your product idea.<br />Real numbers.<br />5 minutes.
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-xl mx-auto leading-relaxed">
            Most founders are surprised — cost is different than expected, or a country
            they hadn&#39;t considered looks better. Either way, you leave with a plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/report/demo"
                className="border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-xl px-8 py-4 font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all inline-block"
              >
                See an example report
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/analyze"
                className="bg-[#FF6B35] text-white rounded-xl px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors inline-flex items-center gap-2"
              >
                Analyze my idea — $99
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  )
}
