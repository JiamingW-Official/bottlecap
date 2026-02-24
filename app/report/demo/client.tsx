"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ReportCard from "@/components/ReportCard"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import type { AnalysisResult } from "@/types"

const DEMO_ANALYSIS: AnalysisResult = {
  feasibilityScore: 87,
  feasibilityLabel: "Highly Feasible",
  oneLinerSummary: "Strong margins via Vietnam sourcing",

  hsCode: "9617.00",
  hsCodeConfidence: 92,
  hsCodeExplanation:
    "HS 9617.00 covers vacuum flasks and other vacuum vessels, which includes smart thermos products with insulated walls.",
  category: "Consumer Electronics / Drinkware",

  costEstimate: {
    min: 6.2,
    max: 8.4,
    currency: "USD",
    perUnit: true,
    assumptions:
      "Based on 500-unit MOQ, 304 stainless steel double-wall vacuum construction, basic temperature LCD display, BLE module, and standard packaging. Tooling amortized over first 2,000 units.",
  },

  annualSavingsOpportunity: 4200,

  sourcingCountries: [
    {
      country: "Vietnam",
      countryCode: "VN",
      countryEmoji: "\ud83c\uddfb\ud83c\uddf3",
      tariffRate: 3.4,
      leadTimeDays: 32,
      moq: 500,
      recommendationScore: 92,
      pros: [
        "Low tariffs for US importers (3.4%)",
        "Growing electronics manufacturing hub",
        "Competitive labor costs with good quality",
      ],
      cons: [
        "Smaller supplier base than China",
        "Slightly longer lead times",
      ],
      bestFor:
        "US-focused brands wanting low tariffs and growing quality standards",
    },
    {
      country: "China",
      countryCode: "CN",
      countryEmoji: "\ud83c\udde8\ud83c\uddf3",
      tariffRate: 25,
      leadTimeDays: 25,
      moq: 300,
      recommendationScore: 78,
      pros: [
        "Largest supplier base globally",
        "Fastest production times",
        "Most experienced with smart bottle tech",
      ],
      cons: ["High US tariffs (25%)", "IP protection concerns"],
      bestFor: "Non-US markets or when speed and supplier variety matter most",
    },
    {
      country: "India",
      countryCode: "IN",
      countryEmoji: "\ud83c\uddee\ud83c\uddf3",
      tariffRate: 5.5,
      leadTimeDays: 40,
      moq: 1000,
      recommendationScore: 65,
      pros: [
        "Very competitive pricing for stainless steel",
        "Government manufacturing incentives",
      ],
      cons: [
        "Higher MOQs typically required",
        "Less experience with smart electronics integration",
      ],
      bestFor: "Budget-focused products where electronics are simple",
    },
  ],

  manufacturingSpecs: [
    "What is the exact capacity (ml/oz) of the thermos?",
    "What grade of stainless steel? (304 vs 316)",
    "What type of temperature display? (LCD, LED, e-ink)",
    "Does the lid mechanism need to be one-hand operable?",
    "What Bluetooth protocol version? (BLE 4.0, 5.0)",
    "What is the target battery life for the temperature sensor?",
    "Is the product IP67 waterproof or splash-resistant only?",
    "What temperature range should the sensor detect?",
    "What type of charging port? (USB-C, micro-USB, wireless)",
    "What certifications are needed? (FCC, CE, FDA food-contact)",
  ],

  materialsAnalysis: {
    suggested: [
      "304 Stainless Steel (body)",
      "PP Plastic (lid)",
      "Silicone (seal ring)",
      "BLE 5.0 Module",
      "CR2032 Battery",
    ],
    alternatives: [
      {
        material: "316 Stainless Steel",
        costImpact: "+$0.80/unit",
        reason:
          "Better corrosion resistance for acidic beverages, premium positioning",
      },
      {
        material: "Tritan Plastic (body)",
        costImpact: "-15%",
        reason:
          "Lighter weight, lower cost, but loses vacuum insulation capability",
      },
      {
        material: "E-ink Temperature Display",
        costImpact: "+$1.20/unit",
        reason:
          "Always-on display without battery drain, more premium feel",
      },
    ],
  },

  optimizationTips: [
    {
      tip: "Start with a 500-unit pilot run to validate design before scaling to 2,000+",
      potentialSaving: "$2,800 risk reduction",
    },
    {
      tip: "Use standard CR2032 battery instead of rechargeable — simpler BOM, no charging circuit needed",
      potentialSaving: "$1.20/unit",
    },
    {
      tip: "Combine temperature sensor PCB with BLE module on a single board",
      potentialSaving: "$0.60/unit",
    },
    {
      tip: "Negotiate payment terms: 30% deposit, 70% before shipping — this is industry standard",
      potentialSaving: "Cash flow improvement",
    },
    {
      tip: "Get FDA food-contact certification during production — costs less than retroactive testing",
      potentialSaving: "$800 on compliance",
    },
  ],

  actionItems: [
    "Finalize exact capacity, display type, and Bluetooth version",
    "Request 3 factory quotes from Vietnam suppliers via Alibaba RFQ",
    "Order 2-3 competitor products for reverse-engineering insights",
    "Register your brand trademark before production begins",
    "Get a 3D CAD model made ($300-500 on Fiverr/Upwork)",
    "Request a pre-production sample and test for 2 weeks",
    "Set up an LLC or equivalent business entity for importing",
  ],

  redFlags: [],

  encouragingNote:
    "Smart drinkware is a $2.1B market — your timing is excellent.",
}

export default function DemoReportClient() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["countries"])
  )
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  const handleCopySpec = (spec: string, index: number) => {
    navigator.clipboard.writeText(spec)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const renderSection = (
    sectionId: string,
    title: string,
    content: React.ReactNode
  ) => (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
      <button
        onClick={() => toggleSection(sectionId)}
        className="w-full flex items-center justify-between p-6 hover:bg-[#F5F5F0] transition-colors"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {expandedSections.has(sectionId) ? (
          <ChevronUp className="w-5 h-5 text-[#6B6B6B]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {expandedSections.has(sectionId) && (
          <motion.div
            key={sectionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const analysis = DEMO_ANALYSIS

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Demo banner */}
      <div className="mb-8 p-4 bg-[#FFF0EB] border border-[#FF6B35] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          This is a <strong>demo report</strong> showing a sample analysis.{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Analyze your own product idea &rarr;
          </Link>
        </p>
      </div>

      {/* Top */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Sample Report: Smart Thermos</h1>
        <p className="text-[#6B6B6B] mt-2">
          See what you get with a Bottlecap analysis
        </p>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left column */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start">
          <ReportCard
            analysis={analysis}
            productName="Smart Thermos"
            reportId="demo"
            showActions={false}
          />
        </div>

        {/* Right column */}
        <div className="lg:w-[60%] space-y-6">
          {/* Product Classification */}
          {renderSection(
            "classification",
            "Product Classification",
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F5F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#6B6B6B] mb-1">HS Code</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    {analysis.hsCode}
                  </p>
                  <p className="text-xs text-[#9B9B9B] mt-1">
                    Confidence: {analysis.hsCodeConfidence}%
                  </p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#6B6B6B] mb-1">Category</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">
                    {analysis.category}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#6B6B6B]">
                {analysis.hsCodeExplanation}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F5F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#6B6B6B] mb-1">
                    Cost Assumptions
                  </p>
                  <p className="text-sm text-[#1A1A1A]">
                    {analysis.costEstimate.assumptions}
                  </p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#6B6B6B] mb-1">
                    Annual Savings vs Sourcing Agent
                  </p>
                  <p className="text-lg font-bold text-[#22C55E]">
                    ${analysis.annualSavingsOpportunity.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Country Comparison */}
          {renderSection(
            "countries",
            "Supplier Country Comparison",
            <div className="space-y-4">
              {analysis.sourcingCountries.map((c, i) => (
                <div
                  key={c.countryCode}
                  className={`rounded-xl border p-5 ${
                    i === 0
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.countryEmoji}</span>
                      <h4 className="font-semibold text-[#1A1A1A]">
                        {c.country}
                      </h4>
                      {i === 0 && (
                        <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">
                          Top pick
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-bold text-[#1A1A1A]">
                      {c.recommendationScore}/100
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                    <div>
                      <p className="text-[#9B9B9B] text-xs">Tariff</p>
                      <p className="font-semibold">{c.tariffRate}%</p>
                    </div>
                    <div>
                      <p className="text-[#9B9B9B] text-xs">Lead Time</p>
                      <p className="font-semibold">{c.leadTimeDays} days</p>
                    </div>
                    <div>
                      <p className="text-[#9B9B9B] text-xs">MOQ</p>
                      <p className="font-semibold">
                        {c.moq.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold text-[#22C55E] mb-1">
                        Pros
                      </p>
                      <ul className="space-y-0.5">
                        {c.pros.map((p, j) => (
                          <li key={j} className="text-xs text-[#6B6B6B]">
                            + {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#EF4444] mb-1">
                        Cons
                      </p>
                      <ul className="space-y-0.5">
                        {c.cons.map((con, j) => (
                          <li key={j} className="text-xs text-[#6B6B6B]">
                            - {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-[#FF6B35] font-medium">
                    Best for: {c.bestFor}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Materials */}
          {renderSection(
            "materials",
            "Materials Analysis",
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {analysis.materialsAnalysis.suggested.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1 bg-[#F5F5F0] rounded-full text-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold text-sm mb-3">Alternatives</h4>
              <div className="space-y-3">
                {analysis.materialsAnalysis.alternatives.map((alt) => (
                  <div
                    key={alt.material}
                    className="flex justify-between items-center p-3 bg-[#F5F5F0] rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{alt.material}</p>
                      <p className="text-sm text-[#6B6B6B]">{alt.reason}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${alt.costImpact.startsWith("-") ? "text-[#22C55E]" : "text-[#EF4444]"}`}
                    >
                      {alt.costImpact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {renderSection(
            "specs",
            "Manufacturing Specs",
            <div className="space-y-3">
              {analysis.manufacturingSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[#F5F5F0] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm">{spec}</span>
                  </div>
                  <button
                    onClick={() => handleCopySpec(spec, i)}
                    className="text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
                    aria-label={`Copy spec ${i + 1}`}
                  >
                    {copiedIndex === i ? (
                      <Check className="w-4 h-4 text-[#22C55E]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          {renderSection(
            "tips",
            "Optimization Tips",
            <div className="space-y-3">
              {analysis.optimizationTips.map((tip, i) => (
                <div
                  key={i}
                  className="bg-white border-l-4 border-[#FF6B35] p-4 rounded-r-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{tip.tip}</p>
                    <span className="text-sm font-semibold text-[#22C55E] whitespace-nowrap ml-4">
                      {tip.potentialSaving}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Items (read-only for demo) */}
          {renderSection(
            "actions",
            "Action Checklist",
            <div className="space-y-3">
              {analysis.actionItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-[#E8E8E4] shrink-0" />
                  <span className="text-sm text-[#1A1A1A]">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA instead of upsell */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-8 text-white mt-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Ready to analyze your product?
            </h3>
            <p className="text-white/80 mb-6">
              Get your own personalized manufacturing feasibility report in
              under 5 minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-white text-[#FF6B35] font-bold rounded-full px-8 py-3 hover:bg-white/90 transition-colors"
            >
              Start Analysis — $99
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
