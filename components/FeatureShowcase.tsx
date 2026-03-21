"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Feasibility Score",
    description:
      "0–100 score across 50+ manufacturing dimensions. Know in seconds if your idea is worth pursuing.",
    featured: true,
    stat: "0–100",
    statLabel: "score range",
  },
  {
    icon: Globe,
    title: "3-Country Comparison",
    description:
      "China, Vietnam, India, Mexico — analyzed side by side with real tariff rates and lead times.",
    featured: true,
    stat: "12",
    statLabel: "factors per country",
  },
  {
    icon: DollarSign,
    title: "Per-Unit Cost Breakdown",
    description:
      "Materials, labor, tooling, shipping — all broken out so you know exactly where your margin goes.",
    featured: true,
    stat: "6",
    statLabel: "cost components",
  },
  {
    icon: Search,
    title: "HS Code Classification",
    description:
      "Your HS code, tariff rate, and any Section 301 duties — in plain English. Saves hours of customs research.",
  },
  {
    icon: Package,
    title: "Materials Analysis",
    description:
      "Spec the right materials and discover cheaper alternatives your factory won't suggest unless you ask.",
  },
  {
    icon: FileText,
    title: "10 Factory Specs",
    description:
      "The exact specifications your factory will ask for — answered in advance. Walk into your first RFQ prepared.",
  },
  {
    icon: TrendingDown,
    title: "Optimization Tips",
    description:
      '"Switch to X and save $2.40/unit at 1,000 MOQ" — specific dollar amounts, not vague advice.',
  },
  {
    icon: CheckCircle,
    title: "7-Step Action Checklist",
    description:
      "Prioritized next steps from idea to production. Check items off directly in your report.",
  },
  {
    icon: Shield,
    title: "Red Flag Warnings",
    description:
      "IP conflicts, compliance requirements, quality risks — flagged honestly, not buried in footnotes.",
  },
  {
    icon: Share2,
    title: "Shareable Report Card",
    description:
      "One-click PNG export or shareable link. Perfect for pitch decks and co-founder alignment.",
  },
  {
    icon: Zap,
    title: "2–5 Minute Delivery",
    description:
      "No queue, no delays. Report in your inbox before you finish your next tab.",
  },
  {
    icon: Clock,
    title: "$2K–$8K Cheaper Than Agents",
    description:
      "Same analysis a sourcing agent charges $3K–$10K for. For $99, no recurring fees.",
  },
]

const featured = features.filter((f) => f.featured)
const regular = features.filter((f) => !f.featured)

export default function FeatureShowcase() {
  const HeroIcon = featured[0].icon
  return (
    <div>
      {/* Featured 3 — asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Hero card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-[#FFF8F5] rounded-2xl border border-[#FF6B35]/15 p-7">
          <div className="w-11 h-11 rounded-xl bg-[#FF6B35] flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(255,107,53,0.35)]">
            <HeroIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              {featured[0].title}
            </h3>
            <span className="text-3xl font-black text-[#FF6B35]">
              {featured[0].stat}
            </span>
          </div>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mb-2">
            {featured[0].description}
          </p>
          <p className="text-xs text-[#FF6B35]/50 font-semibold uppercase tracking-wide">
            {featured[0].statLabel}
          </p>
        </div>

        {/* Two stacked featured cards */}
        <div className="space-y-4">
          {featured.slice(1).map((f) => (
            <div
              key={f.title}
              className="bg-gradient-to-br from-white to-[#FFF8F5] rounded-2xl border border-[#FF6B35]/12 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center shadow-[0_3px_8px_rgba(255,107,53,0.3)] shrink-0">
                  <f.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight text-[#1A1A1A] text-sm leading-tight">
                    {f.title}
                  </h3>
                  <span className="text-xs font-bold text-[#FF6B35]">
                    {f.stat}{" "}
                    <span className="font-normal text-[#9B9B9B]">
                      {f.statLabel}
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Regular features — clean grid, no click interaction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regular.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <f.icon className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <h3 className="font-semibold text-[#1A1A1A] mb-1.5 tracking-tight text-sm">
              {f.title}
            </h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
