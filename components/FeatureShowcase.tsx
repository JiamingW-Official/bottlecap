"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BarChart3,
  Globe,
  Zap,
  Shield,
  FileText,
  TrendingDown,
  Package,
  CheckCircle,
  Share2,
  Search,
  DollarSign,
  Clock,
  ChevronDown,
} from "lucide-react"
import StaggerGrid from "@/components/animations/StaggerGrid"

const features = [
  {
    icon: BarChart3,
    title: "Feasibility Score",
    description:
      "A single number \u2014 0 to 100 \u2014 so you know in seconds if your idea is worth pursuing. No ambiguity.",
    detail:
      "Our AI evaluates your product across 50+ manufacturing dimensions including material availability, tooling complexity, certification requirements, and supply chain maturity. The score weights factors differently based on your product category \u2014 electronics are scored differently from apparel.",
    featured: true,
  },
  {
    icon: Globe,
    title: "3-Country Comparison",
    description:
      "China, Vietnam, India, Mexico \u2014 whoever is right for your product, analyzed side by side with real tariff rates.",
    detail:
      "Each country is evaluated on 12 factors: unit cost, tooling cost, lead time, MOQ, quality rating, IP protection, labor cost, shipping time, tariff rate, infrastructure score, language barriers, and timezone overlap. You get a recommendation, not just data.",
    featured: true,
  },
  {
    icon: DollarSign,
    title: "Per-Unit Cost Breakdown",
    description:
      "Materials, labor, tooling, shipping \u2014 all broken out so you know exactly where your margin goes.",
    detail:
      "The cost breakdown shows raw materials, manufacturing labor, tooling (amortized across your first order), quality inspection, packaging, and shipping \u2014 all as separate line items. You\u2019ll see exactly where to negotiate and where costs are fixed.",
    featured: true,
  },
  {
    icon: Search,
    title: "HS Code Classification",
    description:
      "Your HS code, your tariff rate, in plain English. This alone saves hours of customs research.",
    detail:
      "We identify the correct Harmonized System code for your product, the current US tariff rate, any Section 301 or anti-dumping duties, and whether preferential trade agreements apply. Includes plain-English explanation of your classification.",
  },
  {
    icon: Package,
    title: "Materials Analysis",
    description:
      "What to spec, and what to swap. Cost-saving alternatives your factory won't suggest unless you ask.",
    detail:
      "For each material in your product, we suggest 2-3 alternatives with cost/performance trade-offs. Example: switching from Stainless Steel 316 to 304 saves $1.50/unit with minimal impact on corrosion resistance for indoor products.",
  },
  {
    icon: FileText,
    title: "10 Factory Specs",
    description:
      "The exact questions your factory will ask \u2014 answered in advance. Walk into your first RFQ prepared.",
    detail:
      "Covers dimensions, tolerances, surface finish, color matching (Pantone), packaging requirements, labeling, compliance markings, testing standards, quality acceptance criteria, and assembly instructions. Ready to paste into an RFQ email.",
  },
  {
    icon: TrendingDown,
    title: "Optimization Tips",
    description:
      "Specific dollar amounts. Not vague advice \u2014 \u201Cswitch to X and save $2.40/unit at 1,000 MOQ\u201D specifics.",
    detail:
      "Each optimization tip includes the exact change, the estimated savings per unit, the volume at which it makes sense, and any trade-offs. Typically 5-8 actionable optimizations per report, sorted by impact.",
  },
  {
    icon: CheckCircle,
    title: "Action Checklist",
    description:
      "7 prioritized next steps from idea to production. Track progress directly in your report.",
    detail:
      "Steps are ordered by dependency and urgency: design finalization, material sourcing, prototype, testing, certifications, production tooling, and first production run. Each step includes estimated timeline and cost.",
  },
  {
    icon: Shield,
    title: "Red Flag Warnings",
    description:
      "IP risks, quality issues, regulatory requirements \u2014 flagged honestly, not buried in footnotes.",
    detail:
      "We flag issues that could derail your project: patents that might conflict, certifications you\u2019ll need (FCC, CE, UL, FDA), materials with supply chain risks, and manufacturing processes with high defect rates. Better to know now than after you\u2019ve placed an order.",
  },
  {
    icon: Share2,
    title: "Shareable Report Card",
    description:
      "One-click PNG or shareable link for investors, co-founders, or just to document your due diligence.",
    detail:
      "The report card shows your feasibility score, key costs, and manufacturing recommendation in a single visual. Export as PNG for pitch decks, or share via unique URL. Great for co-founder alignment and investor updates.",
  },
  {
    icon: Zap,
    title: "2-5 Minute Delivery",
    description:
      "No waiting. Results in your inbox and on your dashboard before you finish your next tab.",
    detail:
      "Our AI generates your full report in real-time. No queue, no batch processing, no human review delays. You\u2019ll receive an email notification with a link to your report, plus it\u2019s always accessible from your dashboard.",
  },
  {
    icon: Clock,
    title: "Savings vs. Consultants",
    description:
      "See how much this report costs compared to hiring a sourcing agent. Usually $2,000\u2013$8,000 cheaper.",
    detail:
      "A sourcing agent or manufacturing consultant typically charges $3,000\u2013$10,000 for a feasibility study, plus $150\u2013$300/hour for ongoing support. A Bottlecap report covers the same ground in minutes for $99 \u2014 ideal for early-stage validation before committing to expensive consulting.",
  },
]

export default function FeatureShowcase() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  const featuredItems = features.filter((f) => f.featured)
  const regularItems = features.filter((f) => !f.featured)

  const toggleExpand = (title: string) => {
    setExpandedFeature((prev) => (prev === title ? null : title))
  }

  const renderCard = (feature: (typeof features)[0]) => (
    <div
      key={feature.title}
      className={`rounded-2xl border p-6 transition-all cursor-pointer ${
        feature.featured
          ? "bg-gradient-to-br from-white to-[#FFF8F5] border-[#FF6B35]/15 hover:shadow-lg hover:shadow-[#FF6B35]/5"
          : "bg-white border-[#E8E8E4] hover:border-[#FF6B35]/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      } ${expandedFeature === feature.title ? "ring-1 ring-[#FF6B35]/25 shadow-[0_4px_20px_rgba(255,107,53,0.06)]" : ""}`}
      onClick={() => toggleExpand(feature.title)}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
            feature.featured ? "bg-[#FF6B35] shadow-[0_4px_12px_rgba(255,107,53,0.35)]" : "bg-[#FFF0EB]"
          }`}
        >
          <feature.icon
            className={`w-5 h-5 ${
              feature.featured ? "text-white" : "text-[#FF6B35]"
            }`}
          />
        </div>
        <motion.div
          animate={{ rotate: expandedFeature === feature.title ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#9B9B9B]" />
        </motion.div>
      </div>
      <h3 className="font-semibold text-[#1A1A1A] mb-1.5 tracking-tight">{feature.title}</h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed">
        {feature.description}
      </p>

      <AnimatePresence>
        {expandedFeature === feature.title && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[#E8E8E4]">
              <p className="text-sm text-[#4B4B4B] leading-relaxed">
                {feature.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div>
      {/* Featured — asymmetric 2+1 layout on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">{renderCard(featuredItems[0])}</div>
        <div className="space-y-5">
          {featuredItems.slice(1).map(renderCard)}
        </div>
      </div>

      {/* Regular features */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {regularItems.map(renderCard)}
      </StaggerGrid>
    </div>
  )
}
