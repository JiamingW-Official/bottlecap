"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  Clock,
  BarChart2,
  FileText,
  Layers,
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import StaggerGrid from "@/components/animations/StaggerGrid"
import MagneticButton from "@/components/interactive/MagneticButton"
import TiltCard from "@/components/interactive/TiltCard"

// ─── Data ────────────────────────────────────────────────────────────────────

const workflows = [
  {
    title: "First-time importer",
    icon: "🧭",
    steps: [
      { label: "Manufacturing Quiz", href: "/tools/quiz" },
      { label: "Cost Calculator", href: "/tools/cost-calculator" },
      { label: "Country Compare", href: "/tools/country-compare" },
      { label: "Full Analysis", href: "/analyze" },
    ],
    description: "New to manufacturing? Start here. Takes 30 minutes.",
    tag: "Recommended for beginners",
    tagColor: "bg-[#DCFCE7] text-[#166534]",
    accent: "#22C55E",
  },
  {
    title: "Landed cost planning",
    icon: "📦",
    steps: [
      { label: "HS Lookup", href: "/tools/hs-lookup" },
      { label: "Tariff Calculator", href: "/tools/tariff-calculator" },
      { label: "Cost Calculator", href: "/tools/cost-calculator" },
      { label: "Margin Calculator", href: "/tools/margin-calculator" },
    ],
    description: "Calculate your true cost before placing an order.",
    tag: "Most popular",
    tagColor: "bg-[#FEF3C7] text-[#92400E]",
    accent: "#F59E0B",
  },
  {
    title: "Supplier evaluation",
    icon: "🌏",
    steps: [
      { label: "Country Compare", href: "/tools/country-compare" },
      { label: "Supplier Finder", href: "/tools/supplier-finder" },
      { label: "MOQ Planner", href: "/tools/moq-calculator" },
      { label: "ROI Calculator", href: "/tools/roi-calculator" },
    ],
    description: "Systematically evaluate sourcing options.",
    tag: "For experienced buyers",
    tagColor: "bg-[#EFF6FF] text-[#1D4ED8]",
    accent: "#3B82F6",
  },
]

// Tools used in multiple workflows — used to compute "Used in X workflows" badge
const WORKFLOW_TOOL_HREFS: string[] = workflows.flatMap((wf) =>
  wf.steps.map((s) => s.href)
)
function workflowCount(href: string): number {
  return workflows.filter((wf) => wf.steps.some((s) => s.href === href)).length
}

const toolGroups = [
  {
    category: "Research & Discovery",
    description:
      "Understand your market, classification, and best-fit countries before committing to manufacturing.",
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
        time: "~5 min",
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
        time: "~3 min",
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
        time: "~5 min",
      },
    ],
  },
  {
    category: "Calculate Costs",
    description:
      "Run the numbers on cost, tariffs, margin, and ROI before placing any order.",
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
        time: "~5 min",
      },
      {
        icon: BarChart2,
        title: "Tariff Calculator",
        description:
          "Calculate import duties and tariff impact across different manufacturing countries.",
        href: "/tools/tariff-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#22C55E] to-[#10B981]",
        time: "~3 min",
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
        time: "~4 min",
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
        time: "~4 min",
      },
    ],
  },
  {
    category: "Business Planning",
    description:
      "Model ROI, classify products, and plan your business case before committing capital.",
    tools: [
      {
        icon: DollarSign,
        title: "ROI Calculator",
        description:
          "Estimate savings from optimizing your manufacturing — country, volume, and sourcing.",
        href: "/tools/roi-calculator",
        badge: null,
        badgeColor: null,
        gradient: "from-[#84CC16] to-[#22C55E]",
        time: "~5 min",
      },
      {
        icon: Search,
        title: "HS Code Lookup",
        description:
          "Search 80+ HS codes. Find the right classification and see US tariff rates instantly.",
        href: "/tools/hs-lookup",
        badge: "Most Popular",
        badgeColor: "bg-[#FFF0EB] text-[#FF6B35]",
        gradient: "from-[#FF6B35] to-[#FF9F1C]",
        time: "~2 min",
      },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const [query, setQuery] = useState("")

  const totalTools = toolGroups.reduce((sum, g) => sum + g.tools.length, 0)

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return toolGroups
    return toolGroups
      .map((group) => ({
        ...group,
        tools: group.tools.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            group.category.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.tools.length > 0)
  }, [query])

  const totalFiltered = filteredGroups.reduce((sum, g) => sum + g.tools.length, 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ScrollReveal className="mb-14">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-4">
          Free Tools
        </p>
        <TextReveal
          as="h1"
          className="text-4xl sm:text-5xl font-black text-[#1A1A1A] mb-4 tracking-tight leading-[1.1]"
        >
          9 Free Manufacturing Tools
        </TextReveal>
        <p className="text-lg text-[#6B6B6B] max-w-2xl leading-relaxed mb-7">
          From HS code lookup to landed cost calculation — everything you need
          before placing your first order.
        </p>

        {/* Search + badge row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9B9B]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E8E4] rounded-xl text-sm text-[#1A1A1A] placeholder-[#9B9B9B] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 transition-all"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 bg-[#F5F5F0] text-[#6B6B6B] text-xs font-medium px-3 py-2 rounded-full border border-[#E8E8E4] whitespace-nowrap">
            <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
            {totalTools} tools · no signup required
          </span>
        </div>
      </ScrollReveal>

      {/* ── Popular Workflows ─────────────────────────────────────────────── */}
      {!query && (
        <ScrollReveal className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-4 h-4 text-[#FF6B35]" />
            <h2 className="text-lg font-bold text-[#1A1A1A]">Popular Workflows</h2>
            <div className="flex-1 h-px bg-[#E8E8E4]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflows.map((wf, wfIdx) => (
              <motion.div
                key={wf.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: wfIdx * 0.08,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
                className="bg-white rounded-2xl border border-[#E8E8E4] p-5 hover:shadow-md hover:border-[#FF6B35]/20 transition-all group relative overflow-hidden"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ backgroundColor: wf.accent }}
                />

                <div className="flex items-start justify-between mb-3 pt-1">
                  <span className="text-2xl">{wf.icon}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${wf.tagColor}`}
                  >
                    {wf.tag}
                  </span>
                </div>

                <p className="font-bold text-sm text-[#1A1A1A] mb-3">{wf.title}</p>

                {/* Step pills */}
                <div className="flex items-center gap-1 mb-4 flex-wrap">
                  {wf.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1">
                      <span className="text-xs bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2.5 py-1 font-medium whitespace-nowrap">
                        {i + 1}. {step.label}
                      </span>
                      {i < wf.steps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-[#D8D8D4] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4">
                  {wf.description}
                </p>

                <Link
                  href={wf.steps[0].href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B35] hover:gap-2 transition-all"
                >
                  Start workflow <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* ── Tool Grid ─────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {query && totalFiltered === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-24 bg-white rounded-2xl border border-dashed border-[#E8E8E4]"
          >
            <div className="w-14 h-14 bg-[#F5F5F0] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-[#C8C8C4]" />
            </div>
            <p className="font-semibold text-[#1A1A1A] mb-1">No tools found for &ldquo;{query}&rdquo;</p>
            <p className="text-sm text-[#9B9B9B]">Try a different keyword</p>
          </motion.div>
        ) : (
          <motion.div key="groups" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {filteredGroups.map((group) => (
              <div key={group.category} className="mb-14">
                <ScrollReveal>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-full">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h2 className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest">
                          {group.category}
                        </h2>
                        <div className="flex-1 h-px bg-[#E8E8E4]" />
                        <span className="text-xs text-[#9B9B9B] flex-shrink-0">
                          {group.tools.length} tool{group.tools.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-sm text-[#9B9B9B]">{group.description}</p>
                    </div>
                  </div>
                </ScrollReveal>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.tools.map((tool) => {
                    const wfCount = workflowCount(tool.href)
                    return (
                      <TiltCard key={tool.title} maxTilt={4}>
                        <Link
                          href={tool.href}
                          className="group block bg-white rounded-2xl border border-[#E8E8E4] p-7 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all h-full"
                        >
                          {/* Icon row */}
                          <div className="flex items-start justify-between mb-5">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-sm`}
                            >
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              {tool.badge && tool.badgeColor && (
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${tool.badgeColor}`}
                                >
                                  {tool.badge}
                                </span>
                              )}
                              <span className="text-xs text-[#9B9B9B] bg-[#F5F5F0] px-2.5 py-1 rounded-full">
                                Free
                              </span>
                            </div>
                          </div>

                          {/* Title + description */}
                          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-[#6B6B6B] leading-relaxed text-sm line-clamp-2">
                            {tool.description}
                          </p>

                          {/* Meta row */}
                          <div className="flex items-center gap-3 mt-4 mb-1">
                            <span className="flex items-center gap-1 text-xs text-[#9B9B9B]">
                              <Clock className="w-3 h-3" />
                              {tool.time}
                            </span>
                            {wfCount > 0 && (
                              <span className="flex items-center gap-1 text-xs text-[#9B9B9B]">
                                <FileText className="w-3 h-3" />
                                Used in {wfCount} workflow{wfCount !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>

                          {/* CTA */}
                          <p className="flex items-center gap-1 text-[#FF6B35] font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                            Open tool
                            <ChevronRight className="w-4 h-4" />
                          </p>
                        </Link>
                      </TiltCard>
                    )
                  })}
                </StaggerGrid>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <ScrollReveal direction="scale">
        <div className="bg-[#1A1A1A] rounded-2xl p-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
            Need more depth?
          </p>
          <TextReveal
            as="h2"
            className="text-2xl font-bold text-white mb-3"
          >
            Want a complete analysis?
          </TextReveal>
          <p className="text-[#9B9B9B] mb-7 max-w-lg mx-auto text-sm leading-relaxed">
            These tools give quick estimates. For a full manufacturing
            feasibility report — 3-country comparison, cost breakdown, HS
            codes, and optimization tips — get a Bottlecap analysis in 2–5 min.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[#E85A25] shadow-[0_4px_14px_rgba(255,107,53,0.4)] transition-all text-sm"
              >
                Get Full Report — $99
                <ChevronRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <Link
              href="/tools/supplier-finder"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-3.5 font-semibold transition-all text-sm"
            >
              Get verified supplier contacts
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-[#6B6B6B] mt-4">
            72-hr money-back · 2–5 min delivery · Powered by Claude AI
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
