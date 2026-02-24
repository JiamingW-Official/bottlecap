"use client"

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
import StaggerGrid from "@/components/animations/StaggerGrid"

const features = [
  {
    icon: BarChart3,
    title: "Feasibility Score",
    description:
      "Get a 0-100 score for your product's manufacturing viability with a clear label and confidence level.",
  },
  {
    icon: Globe,
    title: "3-Country Comparison",
    description:
      "Side-by-side analysis of the best manufacturing countries with tariffs, MOQ, lead times, and pros/cons.",
  },
  {
    icon: DollarSign,
    title: "Per-Unit Cost Breakdown",
    description:
      "Detailed cost estimates including materials, labor, tooling, and shipping with key assumptions explained.",
  },
  {
    icon: Search,
    title: "HS Code Classification",
    description:
      "Automatic product classification with HS code, tariff rate, and plain-English explanation of what it means.",
  },
  {
    icon: Package,
    title: "Materials Analysis",
    description:
      "Suggested materials with cost-saving alternatives. Know exactly what to ask factories for.",
  },
  {
    icon: FileText,
    title: "10 Factory Specs",
    description:
      "Pre-written manufacturing specifications — the exact questions your factory will ask, answered in advance.",
  },
  {
    icon: TrendingDown,
    title: "Optimization Tips",
    description:
      "Actionable cost and time savings with specific dollar amounts. Typically $2-8K in identified savings.",
  },
  {
    icon: CheckCircle,
    title: "Action Checklist",
    description:
      "A prioritized 7-step plan from idea to production, with progress tracking built into your report.",
  },
  {
    icon: Shield,
    title: "Red Flag Warnings",
    description:
      "Honest assessment of potential risks — IP concerns, quality issues, regulatory requirements, and more.",
  },
  {
    icon: Share2,
    title: "Shareable Report Card",
    description:
      "Beautiful visual summary you can download as PNG or share on Twitter and LinkedIn with one click.",
  },
  {
    icon: Zap,
    title: "2-5 Minute Delivery",
    description:
      "No waiting days or weeks. Your full analysis is ready in minutes, delivered to your email and web dashboard.",
  },
  {
    icon: Clock,
    title: "Annual Savings Estimate",
    description:
      "See how much you'd save compared to hiring a traditional sourcing agent or consultant.",
  },
]

export default function FeatureShowcase() {
  return (
    <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 bg-[#FFF0EB] rounded-xl flex items-center justify-center mb-4">
            <feature.icon className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <h3 className="font-semibold text-[#1A1A1A] mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </StaggerGrid>
  )
}
