import type { Metadata } from "next"
import Link from "next/link"
import {
  Search,
  Calculator,
  Globe,
  Package,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Free Manufacturing Tools — Bottlecap",
  description:
    "Free tools for product makers: HS Code Lookup, Manufacturing Cost Calculator, Tariff Calculator, and MOQ Planner.",
}

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
    badge: "New",
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
]

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4">
          Free Manufacturing Tools
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
          Everything you need to plan your manufacturing journey — no account
          required. Use these tools alongside your Bottlecap report for the
          best results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group bg-white rounded-2xl border border-[#E8E8E4] p-8 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all"
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
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-[#F5F5F0] rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">
          Want a complete analysis?
        </h2>
        <p className="text-[#6B6B6B] mb-6 max-w-lg mx-auto">
          These tools give you quick estimates. For a comprehensive
          manufacturing feasibility report with 3-country comparison, get a
          full Bottlecap analysis.
        </p>
        <Link
          href="/analyze"
          className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold hover:bg-[#E85A25] transition-colors"
        >
          Get Full Report — $99
        </Link>
      </div>
    </div>
  )
}
