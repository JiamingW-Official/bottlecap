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
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import StaggerGrid from "@/components/animations/StaggerGrid"
import MagneticButton from "@/components/interactive/MagneticButton"
import TiltCard from "@/components/interactive/TiltCard"

const workflows = [
  {
    title: "First-time importer",
    steps: [
      { label: "Quiz", href: "/tools/quiz" },
      { label: "Cost Calc", href: "/tools/cost-calculator" },
      { label: "Country Compare", href: "/tools/country-compare" },
    ],
    description:
      "Not sure where to start? Take the quiz, estimate costs, then compare countries.",
  },
  {
    title: "Landed cost planning",
    steps: [
      { label: "Cost Calc", href: "/tools/cost-calculator" },
      { label: "Tariff Calc", href: "/tools/tariff-calculator" },
      { label: "Margin Calc", href: "/tools/margin-calculator" },
    ],
    description:
      "Calculate your true per-unit cost including tariffs, shipping, and margins.",
  },
  {
    title: "Sourcing strategy",
    steps: [
      { label: "Supplier Finder", href: "/tools/supplier-finder" },
      { label: "Country Compare", href: "/tools/country-compare" },
      { label: "MOQ Planner", href: "/tools/moq-calculator" },
    ],
    description:
      "Find the right region, compare options, then plan your order size.",
  },
]

const toolGroups = [
  {
    category: "Research",
    tools: [
      {
        icon: Search,
        title: "HS Code Lookup",
        description:
          "Search 80+ HS codes. Find the right classification and see US tariff rates.",
        href: "/tools/hs-lookup",
        badge: "Most Popular",
        gradient: "from-[#FF6B35] to-[#FF9F1C]",
      },
      {
        icon: Globe,
        title: "Country Compare",
        description:
          "Side-by-side comparison of 2-4 countries on cost, quality, lead time, and more.",
        href: "/tools/country-compare",
        badge: null,
        gradient: "from-[#F97316] to-[#DC2626]",
      },
      {
        icon: MapPin,
        title: "Supplier Finder",
        description:
          "Filter by product category, priority, and MOQ to discover the best manufacturing regions.",
        href: "/tools/supplier-finder",
        badge: null,
        gradient: "from-[#14B8A6] to-[#06B6D4]",
      },
    ],
  },
  {
    category: "Calculate",
    tools: [
      {
        icon: Calculator,
        title: "Cost Calculator",
        description:
          "Estimate per-unit manufacturing cost based on product type, materials, and volume.",
        href: "/tools/cost-calculator",
        badge: null,
        gradient: "from-[#3B82F6] to-[#8B5CF6]",
      },
      {
        icon: Globe,
        title: "Tariff Calculator",
        description:
          "Calculate import duties and tariff impact across different manufacturing countries.",
        href: "/tools/tariff-calculator",
        badge: null,
        gradient: "from-[#22C55E] to-[#10B981]",
      },
      {
        icon: Package,
        title: "MOQ Planner",
        description:
          "Plan minimum order quantity based on budget, storage, and cash flow.",
        href: "/tools/moq-calculator",
        badge: null,
        gradient: "from-[#F59E0B] to-[#EF4444]",
      },
      {
        icon: TrendingUp,
        title: "Margin Calculator",
        description:
          "Input costs, fees, and selling price to see true margins with a visual waterfall.",
        href: "/tools/margin-calculator",
        badge: "New",
        gradient: "from-[#6366F1] to-[#A855F7]",
      },
      {
        icon: DollarSign,
        title: "ROI Calculator",
        description:
          "Estimate savings from optimizing your manufacturing — country, volume, and sourcing.",
        href: "/tools/roi-calculator",
        badge: null,
        gradient: "from-[#84CC16] to-[#22C55E]",
      },
    ],
  },
  {
    category: "Discover",
    tools: [
      {
        icon: ClipboardList,
        title: "Manufacturing Quiz",
        description:
          "5 quick questions, personalized recommendation — country, method, cost, next steps.",
        href: "/tools/quiz",
        badge: "New",
        gradient: "from-[#EC4899] to-[#F43F5E]",
      },
    ],
  },
]

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <ScrollReveal className="text-center mb-16">
        <TextReveal
          as="h1"
          className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4"
        >
          Free Manufacturing Tools
        </TextReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Everything you need to plan your manufacturing journey — no account
            required.
          </p>
        </ScrollReveal>
      </ScrollReveal>

      {/* Popular Workflows */}
      <ScrollReveal className="mb-16">
        <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
          Popular Workflows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.map((wf) => (
            <div
              key={wf.title}
              className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:shadow-sm transition-shadow"
            >
              <p className="font-semibold text-sm text-[#1A1A1A] mb-2">
                {wf.title}
              </p>
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {wf.steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-1.5">
                    <Link
                      href={step.href}
                      className="text-xs bg-[#FFF0EB] text-[#FF6B35] rounded-full px-2.5 py-1 font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
                    >
                      {i + 1}. {step.label}
                    </Link>
                    {i < wf.steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-[#E8E8E4]" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B6B6B]">{wf.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Grouped Tools */}
      {toolGroups.map((group) => (
        <div key={group.category} className="mb-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest">
                {group.category}
              </h2>
              <div className="flex-1 h-px bg-[#E8E8E4]" />
              <span className="text-xs text-[#9B9B9B]">
                {group.tools.length} tool{group.tools.length !== 1 ? "s" : ""}
              </span>
            </div>
          </ScrollReveal>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.tools.map((tool) => (
              <TiltCard key={tool.title} maxTilt={4}>
                <Link
                  href={tool.href}
                  className="group block bg-white rounded-2xl border border-[#E8E8E4] p-8 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center`}
                    >
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    {tool.badge && (
                      <span className="text-xs font-semibold bg-[#FFF0EB] text-[#FF6B35] px-3 py-1 rounded-full">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    {tool.description}
                  </p>
                  <p className="text-[#FF6B35] font-semibold text-sm mt-4">
                    Use tool &rarr;
                  </p>
                </Link>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      ))}

      {/* CTA */}
      <ScrollReveal className="mt-8" direction="scale">
        <div className="text-center bg-[#F5F5F0] rounded-2xl p-10">
          <TextReveal
            as="h2"
            className="text-2xl font-bold text-[#1A1A1A] mb-3"
          >
            Want a complete analysis?
          </TextReveal>
          <p className="text-[#6B6B6B] mb-6 max-w-lg mx-auto">
            These tools give you quick estimates. For a comprehensive
            manufacturing feasibility report with 3-country comparison, get a
            full Bottlecap analysis.
          </p>
          <MagneticButton>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Get Full Report — $99
            </Link>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  )
}
