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
  BarChart3,
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import StaggerGrid from "@/components/animations/StaggerGrid"
import MagneticButton from "@/components/interactive/MagneticButton"
import TiltCard from "@/components/interactive/TiltCard"

const tools = [
  {
    icon: Search,
    title: "HS Code Lookup",
    description:
      "Search our database of 80+ common HS codes. Find the right classification for your product and see applicable US tariff rates.",
    href: "/tools/hs-lookup",
    badge: "Most Popular",
    gradient: "from-[#FF6B35] to-[#FF9F1C]",
  },
  {
    icon: Calculator,
    title: "Cost Calculator",
    description:
      "Estimate your per-unit manufacturing cost based on product type, materials, complexity, and production volume.",
    href: "/tools/cost-calculator",
    badge: null,
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    icon: Globe,
    title: "Tariff Calculator",
    description:
      "Calculate import duties and tariff impact for your product across different manufacturing countries.",
    href: "/tools/tariff-calculator",
    badge: null,
    gradient: "from-[#22C55E] to-[#10B981]",
  },
  {
    icon: Package,
    title: "MOQ Planner",
    description:
      "Plan your minimum order quantity based on budget, storage, and cash flow. See how MOQ affects per-unit cost.",
    href: "/tools/moq-calculator",
    badge: null,
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
  {
    icon: ClipboardList,
    title: "Manufacturing Quiz",
    description:
      "Answer 5 quick questions and get a personalized manufacturing recommendation — country, method, cost estimate, and next steps.",
    href: "/tools/quiz",
    badge: "New",
    gradient: "from-[#EC4899] to-[#F43F5E]",
  },
  {
    icon: TrendingUp,
    title: "Margin Calculator",
    description:
      "Input your costs, fees, and selling price to see your true margins. Includes a visual cost waterfall breakdown.",
    href: "/tools/margin-calculator",
    badge: "New",
    gradient: "from-[#6366F1] to-[#A855F7]",
  },
  {
    icon: MapPin,
    title: "Supplier Finder",
    description:
      "Filter by product category, priority, and MOQ to discover the best manufacturing regions for your product.",
    href: "/tools/supplier-finder",
    badge: null,
    gradient: "from-[#14B8A6] to-[#06B6D4]",
  },
  {
    icon: DollarSign,
    title: "ROI Calculator",
    description:
      "Estimate how much you could save by optimizing your manufacturing — country, volume, and sourcing improvements.",
    href: "/tools/roi-calculator",
    badge: null,
    gradient: "from-[#84CC16] to-[#22C55E]",
  },
  {
    icon: BarChart3,
    title: "Country Compare",
    description:
      "Select 2-4 countries and see a side-by-side comparison on cost, quality, lead time, IP protection, and more.",
    href: "/tools/country-compare",
    badge: null,
    gradient: "from-[#F97316] to-[#DC2626]",
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
            required. Use these tools alongside your Bottlecap report for the
            best results.
          </p>
        </ScrollReveal>
      </ScrollReveal>

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
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
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                {tool.title}
              </h2>
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

      {/* CTA */}
      <ScrollReveal className="mt-16" direction="scale">
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
