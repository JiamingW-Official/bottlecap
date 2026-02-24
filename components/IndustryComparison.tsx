"use client"

import { Check, X } from "lucide-react"

interface ComparisonRow {
  feature: string
  bottlecap: string | boolean
  sourcingAgent: string | boolean
  diyResearch: string | boolean
}

const comparisons: ComparisonRow[] = [
  {
    feature: "Time to get analysis",
    bottlecap: "2-5 minutes",
    sourcingAgent: "2-4 weeks",
    diyResearch: "40+ hours",
  },
  {
    feature: "Cost",
    bottlecap: "$99",
    sourcingAgent: "$3,000-$10,000",
    diyResearch: "Free (your time)",
  },
  {
    feature: "Feasibility score",
    bottlecap: true,
    sourcingAgent: false,
    diyResearch: false,
  },
  {
    feature: "HS code & tariff rates",
    bottlecap: true,
    sourcingAgent: true,
    diyResearch: false,
  },
  {
    feature: "Multi-country comparison",
    bottlecap: "3 countries",
    sourcingAgent: "1-2 countries",
    diyResearch: "1 country",
  },
  {
    feature: "Per-unit cost estimate",
    bottlecap: true,
    sourcingAgent: true,
    diyResearch: false,
  },
  {
    feature: "Materials analysis",
    bottlecap: true,
    sourcingAgent: true,
    diyResearch: false,
  },
  {
    feature: "Optimization tips",
    bottlecap: "5-8 tips",
    sourcingAgent: "Varies",
    diyResearch: false,
  },
  {
    feature: "Factory-ready specs",
    bottlecap: "10 specs",
    sourcingAgent: "5-10 specs",
    diyResearch: false,
  },
  {
    feature: "Shareable report",
    bottlecap: true,
    sourcingAgent: false,
    diyResearch: false,
  },
  {
    feature: "Money-back guarantee",
    bottlecap: "72 hours",
    sourcingAgent: false,
    diyResearch: "N/A",
  },
  {
    feature: "Available 24/7",
    bottlecap: true,
    sourcingAgent: false,
    diyResearch: true,
  },
]

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-[#22C55E] mx-auto" />
    ) : (
      <X className="w-5 h-5 text-[#EF4444] mx-auto" />
    )
  }
  return <span>{value}</span>
}

export default function IndustryComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[#E8E8E4]">
            <th className="text-left py-4 pr-4 font-semibold text-[#1A1A1A]">
              Feature
            </th>
            <th className="py-4 px-4 text-center">
              <div className="inline-flex flex-col items-center">
                <span className="font-bold text-[#FF6B35] text-base">
                  Bottlecap
                </span>
                <span className="text-xs text-[#9B9B9B]">$99</span>
              </div>
            </th>
            <th className="py-4 px-4 text-center">
              <div className="inline-flex flex-col items-center">
                <span className="font-semibold text-[#1A1A1A]">
                  Sourcing Agent
                </span>
                <span className="text-xs text-[#9B9B9B]">$3K-$10K</span>
              </div>
            </th>
            <th className="py-4 pl-4 text-center">
              <div className="inline-flex flex-col items-center">
                <span className="font-semibold text-[#1A1A1A]">
                  DIY Research
                </span>
                <span className="text-xs text-[#9B9B9B]">40+ hrs</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, i) => (
            <tr
              key={row.feature}
              className={`border-b border-[#E8E8E4] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}
            >
              <td className="py-3 pr-4 text-[#1A1A1A] font-medium">
                {row.feature}
              </td>
              <td className="py-3 px-4 text-center bg-[#FFF0EB]/40 font-semibold text-[#1A1A1A]">
                <CellValue value={row.bottlecap} />
              </td>
              <td className="py-3 px-4 text-center text-[#6B6B6B]">
                <CellValue value={row.sourcingAgent} />
              </td>
              <td className="py-3 pl-4 text-center text-[#6B6B6B]">
                <CellValue value={row.diyResearch} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
