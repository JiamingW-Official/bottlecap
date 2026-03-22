"use client"

import Link from "next/link"
import {
  Search,
  Calculator,
  Globe,
  Package,
  ClipboardList,
  TrendingUp,
  MapPin,
  DollarSign,
  ArrowRight,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import StaggerGrid from "@/components/animations/StaggerGrid"
import MagneticButton from "@/components/interactive/MagneticButton"
import TiltCard from "@/components/interactive/TiltCard"

const workflows = [
  {
    title: "First-time importer",
    emoji: "🧭",
    steps: [
      { label: "Quiz", href: "/tools/quiz" },
      { label: "Cost Calc", href: "/tools/cost-calculator" },
      { label: "Country Compare", href: "/tools/country-compare" },
    ],
    description:
      "Not sure where to start? Take the quiz, estimate costs, then compare countries.",
    tag: "Start here",
    tagColor: "bg-[#DCFCE7] text-[#166534]",
  },
  {
    title: "Landed cost planning",
    emoji: "📦",
    steps: [
      { label: "Cost Calc", href: "/tools/cost-calculator" },
      { label: "Tariff Calc", href: "/tools/tariff-calculator" },
      { label: "Margin Calc", href: "/tools/margin-calculator" },
    ],
    description:
      "Calculate your true per-unit cost including tariffs, shipping, and margins.",
    tag: "Most used",
    tagColor: "bg-[#FEF3C7] text-[#92400E]",
  },
  {
    title: "Sourcing strategy",
    emoji: "🌏",
    steps: [
      { label: "Supplier Finder", href: "/tools/supplier-finder" },
      { label: "Country Compare", href: "/tools/country-compare" },
      { label: "MOQ Planner", href: "/tools/moq-calculator" },
    ],
    description:
      "Find the right region, compare options, then plan your order size.",
    tag: "Intermediate",
    tagColor: "bg-[#EFF6FF] text-[#1D4ED8]",
  },
]

const toolGroups = [
  {
    category: "Research",
    description: "Understand your market and classification before committing to manufacturing.",
    tools: [
      {
        icon: Search,
        title: "HS Code Lookup",
        description:
          "Search 80+ HS codes. Find the right classification and see US tariff rates instantly.",
        href: "/tools/hs-lookup",
        badge: "Most Popular",
        badgeColor: "bg-[#FFF0EB] text-[#FF6B35]",
        gradient: "from-[#FF6B35] to-[#FF9F1C]",
        stat: "80+ codes",
      },
      {
        icon: Globe,
        title: "Country Compare",
        description:
          "Side-by-side comparison of 2–4 countries on cost, quality, lead time, and more.",
        href: "/tools/country-compare",
        badge: null,
        badgeColor: null,
        gradient: "from-[#F97316] to-[#DC2626]",
        stat: "12 countries",
      },
      {
        icon: MapPin,
        title: "Supplier Finder",
        description:
          "Filter by product category, priority, and MOQ to discover the best manufacturing regions.",
        href: "/tools/supplier-finder",
        badge: null,
        badgeColor: null,
        gradient: "from-[#14B8A6] to-[#06B6D4]",
        stat: "20 categories",
      },
    ],
  },
  {
    category: "Calculate",
    description: "Run the numbers on cost, tariffs, margin, and ROI before placing any order.",
    tools: [
      {
        icon: Calculator,
        title: "Cost Calculator",
        description:
          "Estimate per-unit manufacturing cost based on product type, materials, and volume.",
        href: "/tools/cost-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#3B82F6] to-[#8B5CF6]",
        stat: "6 cost types",
      },
      {
        icon: Globe,
        title: "Tariff Calculator",
        description:
          "Calculate import duties and tariff impact across different manufacturing countries.",
        href: "/tools/tariff-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#22C55E] to-[#10B981]",
        stat: "90+ HS codes",
      },
      {
        icon: Package,
        title: "MOQ Planner",
        description:
          "Plan minimum order quantity based on budget, storage, and cash flow requirements.",
        href: "/tools/moq-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#F59E0B] to-[#EF4444]",
        stat: "Cash flow model",
      },
      {
        icon: TrendingUp,
        title: "Margin Calculator",
        description:
          "Input costs, fees, and selling price to see true margins with a visual waterfall.",
        href: "/tools/margin-calculator",
        badge: "New",
        badgeColor: "bg-[#DCFCE7] text-[#166534]",
        gradient: "from-[#6366F1] to-[#A855F7]",
        stat: "Waterfall chart",
      },
      {
        icon: DollarSign,
        title: "ROI Calculator",
        description:
          "Estimate savings from optimizing your manufacturing — country, volume, and sourcing.",
        href: "/tools/roi-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#84CC16] to-[#22C55E]",
        stat: "ROI breakdown",
      },
    ],
  },
  {
    category: "Discover",
    description: "Get personalized recommendations based on your product and situation.",
    tools: [
      {
        icon: ClipboardList,
        title: "Manufacturing Quiz",
        description:
          "5 quick questions — get a personalized recommendation for country, method, cost, and next steps.",
        href: "/tools/quiz",
        badge: "New",
        badgeColor: "bg-[#DCFCE7] text-[#166534]",
        gradient: "from-[#EC4899] to-[#F43F5E]",
        stat: "5 questions",
      },
    ],
  },
]

export default function ToolsPage() {
  const totalTools = toolGroups.reduce((sum, g) => sum + g.tools.length, 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Hero */}
      <ScrollReveal className="mb-16">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-4">
          Free Tools
        </p>
        <TextReveal
          as="h1"
          className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4 tracking-tight leading-[1.1]"
        >
          Free Manufacturing Tools
        </TextReveal>
        <p className="text-lg text-[#6B6B6B] max-w-2xl leading-relaxed mb-6">
          Everything you need to plan your manufacturing journey — no account
          required.
        </p>
        {/* Stats row */}
        <div className="flex items-center gap-5 flex-wrap">
          {[
            { icon: Zap, value: `${totalTools}`, label: "free tools" },
            { icon: Star, value: "No signup", label: "required" },
            { icon: Globe, value: "12", label: "countries" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
                <s.icon className="w-3.5 h-3.5 text-[#FF6B35]" />
              </div>
              <span className="font-bold text-[#1A1A1A] text-sm">{s.value}</span>
              <span className="text-xs text-[#9B9B9B]">{s.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Popular Workflows */}
      <ScrollReveal className="mb-16">
        <h2 className="text-lg font-bold text-[#1A1A1A] mb-5">
          Popular Workflows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.map((wf) => (
            <div
              key={wf.title}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-5 hover:shadow-sm hover:border-[#FF6B35]/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{wf.emoji}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${wf.tagColor}`}>
                  {wf.tag}
                </span>
              </div>
              <p className="font-bold text-sm text-[#1A1A1A] mb-2">
                {wf.title}
              </p>
              <div className="flex items-center gap-1 mb-3 flex-wrap">
                {wf.steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-1">
                    <Link
                      href={step.href}
                      className="text-xs bg-[#FFF0EB] text-[#FF6B35] rounded-full px-2.5 py-1 font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
                    >
                      {i + 1}. {step.label}
                    </Link>
                    {i < wf.steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-[#D8D8D4]" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{wf.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Grouped Tools */}
      {toolGroups.map((group) => (
        <div key={group.category} className="mb-14">
          <ScrollReveal>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest">
                    {group.category}
                  </h2>
                  <div className="flex-1 h-px bg-[#E8E8E4] w-8" />
                  <span className="text-xs text-[#9B9B9B]">
                    {group.tools.length} tool{group.tools.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm text-[#9B9B9B]">{group.description}</p>
              </div>
            </div>
          </ScrollReveal>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {group.tools.map((tool) => (
              <TiltCard key={tool.title} maxTilt={4}>
                <Link
                  href={tool.href}
                  className="group block bg-white rounded-2xl border border-[#E8E8E4] p-7 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-sm`}
                    >
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      {tool.badge && tool.badgeColor && (
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      )}
                      <span className="text-xs text-[#9B9B9B] bg-[#F5F5F0] px-2.5 py-1 rounded-full">
                        {tool.stat}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed text-sm">
                    {tool.description}
                  </p>
                  <p className="flex items-center gap-1 text-[#FF6B35] font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                    Use tool
                    <ChevronRight className="w-4 h-4" />
                  </p>
                </Link>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      ))}

      {/* CTA */}
      <ScrollReveal direction="scale">
        <div className="bg-[#1A1A1A] rounded-2xl p-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
            More depth
          </p>
          <TextReveal
            as="h2"
            className="text-2xl font-bold text-white mb-3"
          >
            Want a complete analysis?
          </TextReveal>
          <p className="text-[#9B9B9B] mb-7 max-w-lg mx-auto text-sm leading-relaxed">
            These tools give quick estimates. For a full manufacturing feasibility
            report — 3-country comparison, cost breakdown, HS codes, and
            optimization tips — get a Bottlecap analysis.
          </p>
          <MagneticButton>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[#E85A25] shadow-[0_4px_14px_rgba(255,107,53,0.4)] transition-all"
            >
              Get Full Report — $99
              <ChevronRight className="w-4 h-4" />
            </Link>
          </MagneticButton>
          <p className="text-xs text-[#6B6B6B] mt-3">72-hr money-back · 2–5 min delivery</p>
        </div>
      </ScrollReveal>
    </div>
  )
}
