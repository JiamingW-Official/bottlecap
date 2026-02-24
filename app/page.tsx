"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Check, ArrowRight } from "lucide-react"
import AnimatedCounter from "@/components/AnimatedCounter"
import ProcessDiagram from "@/components/ProcessDiagram"
import FeatureShowcase from "@/components/FeatureShowcase"
import IndustryComparison from "@/components/IndustryComparison"
import CategoryShowcase from "@/components/CategoryShowcase"
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

const monthlyFeatures = [
  "Full feasibility analysis",
  "Cost breakdown",
  "3-country comparison",
  "Optimization tips",
  "Shareable report card",
  "Unlimited analyses",
  "Priority support",
]

export default function Home() {
  const router = useRouter()
  const [heroText, setHeroText] = useState("")
  const { supported, tier } = useWebGLCapability()
  useGSAPScrollTrigger()

  const handleAnalyzeClick = () => {
    if (heroText.trim()) {
      sessionStorage.setItem("bottlecap_hero_text", heroText.trim())
    }
    router.push("/analyze")
  }

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
          <TextReveal
            as="h1"
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]"
          >
            Your product idea deserves to be made
          </TextReveal>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6">
            Tell me what you want to make. I&apos;ll tell you if it&apos;s
            feasible, how much it costs, and where to manufacture it — in
            under 5 minutes.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="bg-white border-2 border-[#E8E8E4] focus-within:border-[#FF6B35] rounded-2xl p-2 flex items-end transition-colors">
              <textarea
                className="border-none flex-1 resize-none outline-none p-3 text-[#1A1A1A] placeholder:text-[#9B9B9B] bg-transparent min-h-[60px]"
                placeholder="Try: A smart water bottle that reminds me to stay hydrated..."
                rows={2}
                value={heroText}
                onChange={(e) => setHeroText(e.target.value)}
              />
              <MagneticButton>
                <button
                  onClick={handleAnalyzeClick}
                  className="bg-[#FF6B35] text-white rounded-xl px-6 py-3 font-semibold whitespace-nowrap hover:bg-[#E85A25] transition-colors shrink-0"
                >
                  Analyze this idea &rarr;
                </button>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            <span className="text-sm text-[#6B6B6B]">Powered by Claude AI</span>
            <span className="text-sm text-[#6B6B6B]">Results in 2-5 min</span>
            <span className="text-sm text-[#6B6B6B]">
              Money-back guarantee
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/* ANIMATED STATS                                                   */}
      {/* ================================================================ */}
      <div className="py-16 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter
              end={50}
              suffix="+"
              label="Analysis Dimensions"
              sublabel="per report"
            />
            <AnimatedCounter
              end={12}
              label="Countries Covered"
              sublabel="manufacturing hubs"
            />
            <AnimatedCounter
              end={80}
              suffix="+"
              label="HS Codes"
              sublabel="in our free database"
            />
            <AnimatedCounter
              end={5}
              label="Minutes Average"
              sublabel="report delivery"
            />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20" id="how-it-works">
        <div className="max-w-4xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
          >
            How it works
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              From product idea to actionable manufacturing plan in 4 simple
              steps. No factory contacts needed.
            </p>
          </ScrollReveal>
          <ProcessDiagram />
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* FEATURES (12-grid)                                               */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20 bg-[#F5F5F0]" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
          >
            Everything in your report
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              Each Bottlecap report includes 12 sections of analysis across
              feasibility, cost, materials, countries, and next steps.
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
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
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
            <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-[#E8E8E4] transform rotate-1 hover:rotate-0 transition-transform">
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                    Cost/unit
                  </p>
                  <p className="font-semibold text-[#1A1A1A]">$6.2 - $8.4</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                    Sourcing
                  </p>
                  <p className="font-semibold text-[#1A1A1A]">Vietnam</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                    Min. Order
                  </p>
                  <p className="font-semibold text-[#1A1A1A]">500 units</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                    Lead Time
                  </p>
                  <p className="font-semibold text-[#1A1A1A]">32 days</p>
                </div>
              </div>
              <Link
                href="/report/demo"
                className="block text-center bg-[#FF6B35] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Explore full demo report &rarr;
              </Link>
            </div>
          </ParallaxLayer>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* INDUSTRY COMPARISON TABLE                                        */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
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
      {/* CATEGORIES WE COVER                                              */}
      {/* ================================================================ */}
      <ScrollReveal className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
          >
            20 product categories covered
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
              From consumer electronics to apparel, Bottlecap analyzes
              products across every major manufacturing category.
            </p>
          </ScrollReveal>
          <CategoryShowcase />
        </div>
      </ScrollReveal>

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
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35]" />
                </Link>
                <Link
                  href="/tools/cost-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    Cost Calculator
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35]" />
                </Link>
                <Link
                  href="/tools/tariff-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    Tariff Calculator
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35]" />
                </Link>
                <Link
                  href="/tools/moq-calculator"
                  className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-4 hover:border-[#FF6B35]/30 transition-colors group"
                >
                  <span className="font-medium text-[#1A1A1A]">
                    MOQ Planner
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9B9B9B] group-hover:text-[#FF6B35]" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-white rounded-2xl border border-[#E8E8E4] p-8 shadow-sm">
                <p className="text-6xl font-black text-[#FF6B35]">4</p>
                <p className="text-lg font-semibold text-[#1A1A1A] mt-2">
                  Free Tools
                </p>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  No signup required
                </p>
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
      <ScrollReveal className="py-20" id="pricing">
        <div className="max-w-4xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
          >
            Simple, transparent pricing
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12 max-w-lg mx-auto">
              Pay once and own your report forever. Not satisfied? Full refund
              within 72 hours.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Report */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm">
                <span className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full">
                  Most popular
                </span>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                  Single Report
                </h3>
                <div className="mb-1">
                  <span className="text-5xl font-black text-[#1A1A1A]">$99</span>
                </div>
                <p className="text-[#6B6B6B] mb-6">one-time</p>
                <ul className="space-y-3 mb-8">
                  {singleFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[#1A1A1A]"
                    >
                      <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton className="w-full">
                  <Link
                    href="/analyze"
                    className="block text-center bg-[#FF6B35] text-white w-full rounded-full py-3 font-semibold hover:bg-[#E85A25] transition-colors"
                  >
                    Get your report
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Monthly */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                  Monthly
                </h3>
                <div className="mb-1">
                  <span className="text-5xl font-black text-[#1A1A1A]">
                    $199
                  </span>
                </div>
                <p className="text-[#6B6B6B] mb-6">/month</p>
                <ul className="space-y-3 mb-8">
                  {monthlyFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[#1A1A1A]"
                    >
                      <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton className="w-full">
                  <Link
                    href="/analyze"
                    className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3 font-semibold hover:bg-[#FFF0EB] transition-colors"
                  >
                    Subscribe
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
          <p className="text-sm text-[#6B6B6B] text-center mt-8">
            Not satisfied? Full refund within 72 hours.
          </p>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* GUIDES CTA                                                       */}
      {/* ================================================================ */}
      <ScrollReveal className="py-16 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <TextReveal
            as="h2"
            className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4"
          >
            New to manufacturing?
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[#6B6B6B] mb-8 max-w-lg mx-auto">
              Read our free guides to learn the fundamentals before you start.
              Written for first-time founders.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { href: "/guide/manufacturing-101", label: "Manufacturing 101", icon: "📖" },
              { href: "/guide/country-comparison", label: "Country Comparison", icon: "🌏" },
              { href: "/guide/materials", label: "Materials Guide", icon: "🧪" },
              { href: "/guide/sourcing", label: "Sourcing Guide", icon: "🏭" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bg-white rounded-xl border border-[#E8E8E4] p-5 text-center hover:shadow-md hover:border-[#FF6B35]/30 transition-all"
              >
                <span className="text-3xl">{guide.icon}</span>
                <p className="font-semibold text-[#1A1A1A] text-sm mt-2">
                  {guide.label}
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
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1A1A1A]"
          >
            Frequently asked questions
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#6B6B6B] mb-12">
              Everything you need to know about Bottlecap reports.
            </p>
          </ScrollReveal>
          <FAQ />
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* TRUST / SECURITY                                                 */}
      {/* ================================================================ */}
      <ScrollReveal className="py-16 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl mb-2">🔒</p>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Stripe Secured
              </p>
              <p className="text-xs text-[#9B9B9B]">PCI compliant payments</p>
            </div>
            <div>
              <p className="text-3xl mb-2">🤫</p>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Confidential
              </p>
              <p className="text-xs text-[#9B9B9B]">Ideas never shared</p>
            </div>
            <div>
              <p className="text-3xl mb-2">💰</p>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Money Back
              </p>
              <p className="text-xs text-[#9B9B9B]">72-hour refund policy</p>
            </div>
            <div>
              <p className="text-3xl mb-2">🤖</p>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Claude AI
              </p>
              <p className="text-xs text-[#9B9B9B]">By Anthropic</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================ */}
      {/* FINAL CTA                                                        */}
      {/* ================================================================ */}
      <ScrollReveal className="py-24 text-center" direction="scale">
        <div className="max-w-4xl mx-auto px-6">
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4"
          >
            Your next product starts here
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[#6B6B6B] mb-10 max-w-xl mx-auto">
              Join founders who are turning ideas into real products. Get your
              manufacturing feasibility report in minutes.
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
