"use client"

import { motion } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

type RowValue = string | boolean

interface DataRow {
  label: string
  bottlecap: RowValue
  agent: RowValue
  alibaba: RowValue
  consultant: RowValue
  diy: RowValue
}

interface SectionGroup {
  section: string
  rows: DataRow[]
}

const SECTIONS: SectionGroup[] = [
  {
    section: "Speed & Cost",
    rows: [
      { label: "Time to insight",       bottlecap: "2–5 min",    agent: "2–4 weeks",      alibaba: "Days–weeks",    consultant: "1–2 weeks",    diy: "40+ hours" },
      { label: "Cost",                   bottlecap: "$99",         agent: "$3K–$10K",       alibaba: "Free",          consultant: "$500–$2K/hr",  diy: "$1,200–$5,000 (opportunity cost)" },
      { label: "Money-back guarantee",   bottlecap: "72 hours",   agent: "None",           alibaba: "N/A",           consultant: "None",         diy: "N/A" },
      { label: "Available 24/7",         bottlecap: true,          agent: false,            alibaba: true,            consultant: false,          diy: true },
    ],
  },
  {
    section: "Report Content",
    rows: [
      { label: "Feasibility score 0–100",  bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
      { label: "HS code + tariff rate",    bottlecap: true,         agent: true,            alibaba: false,           consultant: true,           diy: false },
      { label: "Countries compared",       bottlecap: "Top 3",      agent: "1–2",           alibaba: "Varies",        consultant: "1–2",          diy: "Usually 1" },
      { label: "Per-unit cost breakdown",  bottlecap: true,         agent: true,            alibaba: false,           consultant: true,           diy: false },
      { label: "Optimization tips + $",   bottlecap: "5–8 tips",   agent: "Varies",        alibaba: false,           consultant: "Varies",       diy: false },
      { label: "7-step action checklist",  bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
    ],
  },
  {
    section: "Sourcing Intelligence",
    rows: [
      { label: "Material alternatives",    bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
      { label: "10 factory-ready specs",   bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
      { label: "Red flag warnings",        bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
      { label: "Compliance flags",         bottlecap: true,         agent: true,            alibaba: false,           consultant: true,           diy: false },
    ],
  },
  {
    section: "Platform",
    rows: [
      { label: "Tariff accuracy",           bottlecap: "Cross-checked against USITC live data", agent: "Network knowledge", alibaba: "None", consultant: "Manual lookup", diy: "Self-research" },
      { label: "Data freshness",           bottlecap: "Updated weekly", agent: "Network (months stale)", alibaba: "Supplier self-reported", consultant: "Engagement-based", diy: "At time of research" },
      { label: "Data sources",             bottlecap: "5 live",     agent: "Their network", alibaba: "Supplier data", consultant: "Their network", diy: "Public data" },
      { label: "Shareable report",         bottlecap: true,         agent: false,           alibaba: false,           consultant: false,          diy: false },
    ],
  },
]

const ALL_ROWS = SECTIONS.flatMap((s) => s.rows)

function Cell({ value, isBottlecap = false }: { value: RowValue; isBottlecap?: boolean }) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span className="flex justify-center">
          <CheckCircle
            className={`w-5 h-5 ${isBottlecap ? "text-[#FF6B35]" : "text-[#22C55E]"}`}
            strokeWidth={2}
          />
        </span>
      )
    }
    return (
      <span className="flex justify-center">
        <X className="w-5 h-5 text-[#D4D4CE]" strokeWidth={2} />
      </span>
    )
  }

  // "None", "N/A" in competitor columns get muted styling
  const isMuted = !isBottlecap && (value === "None" || value === "N/A")

  return (
    <span
      className={`text-xs leading-snug ${
        isBottlecap
          ? "font-semibold text-[#FF6B35]"
          : isMuted
          ? "text-[#BDBDB8] font-medium"
          : "text-[#6B6B6B] font-medium"
      }`}
    >
      {value}
    </span>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={6}
        className="pt-6 pb-2 px-0"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#767676] whitespace-nowrap">
            {label}
          </span>
          <div className="flex-1 h-px bg-[#E8E8E4]" />
        </div>
      </td>
    </tr>
  )
}

// Compute a flat list of rows with their global index for stagger purposes
function buildFlatRows() {
  const result: Array<{ type: "divider"; label: string } | { type: "row"; row: DataRow; globalIndex: number }> = []
  let idx = 0
  for (const section of SECTIONS) {
    result.push({ type: "divider", label: section.section })
    for (const row of section.rows) {
      result.push({ type: "row", row, globalIndex: idx })
      idx++
    }
  }
  return result
}

const FLAT = buildFlatRows()

export default function IndustryComparison() {
  return (
    <div className="w-full">
      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[700px] border-separate border-spacing-0">
          <thead>
            <tr>
              {/* Feature label column */}
              <th className="text-left pb-5 pr-4 w-[26%] align-bottom">
                <span className="text-xs font-semibold text-[#767676] tracking-wide uppercase">
                  Feature
                </span>
              </th>

              {/* Bottlecap — highlighted pill header */}
              <th className="pb-5 px-2 text-center w-[15%] align-bottom">
                <div className="inline-flex flex-col items-center gap-1 bg-[#FF6B35] text-white rounded-2xl px-4 py-3 shadow-[0_6px_20px_rgba(255,107,53,0.35)] w-full">
                  <span className="font-bold text-sm leading-none">Bottlecap</span>
                  <span className="text-white/75 text-[11px] leading-none mt-0.5">$99 · 5 min</span>
                </div>
              </th>

              {/* Sourcing Agent */}
              <th className="pb-5 px-2 text-center w-[15%] align-bottom">
                <div className="inline-flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-[#1A1A1A] text-sm">Sourcing Agent</span>
                  <span className="text-[#BDBDB8] text-[11px]">$3K–$10K</span>
                </div>
              </th>

              {/* Alibaba */}
              <th className="pb-5 px-2 text-center w-[15%] align-bottom">
                <div className="inline-flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-[#1A1A1A] text-sm">Alibaba</span>
                  <span className="text-[#BDBDB8] text-[11px]">Search only</span>
                </div>
              </th>

              {/* Trade Consultant */}
              <th className="pb-5 px-2 text-center w-[15%] align-bottom">
                <div className="inline-flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-[#1A1A1A] text-sm">Consultant</span>
                  <span className="text-[#BDBDB8] text-[11px]">$500+/hr</span>
                </div>
              </th>

              {/* DIY */}
              <th className="pb-5 pl-2 pr-0 text-center w-[14%] align-bottom">
                <div className="inline-flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-[#1A1A1A] text-sm">DIY Research</span>
                  <span className="text-[#BDBDB8] text-[11px]">40+ hours</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {FLAT.map((item, i) => {
              if (item.type === "divider") {
                return <SectionDivider key={`divider-${item.label}`} label={item.label} />
              }

              const { row, globalIndex } = item
              const isEven = globalIndex % 2 === 0

              return (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: globalIndex * 0.03 }}
                  className={isEven ? "bg-white" : "bg-[#FAFAF8]"}
                >
                  {/* Feature label */}
                  <td className="py-3.5 pr-4 text-xs font-medium text-[#4B4B4B] rounded-l-lg pl-3">
                    {row.label}
                  </td>

                  {/* Bottlecap — orange tinted background */}
                  <td className="py-3.5 px-2 text-center bg-[#FFF8F5]">
                    <Cell value={row.bottlecap} isBottlecap />
                  </td>

                  {/* Agent */}
                  <td className="py-3.5 px-2 text-center">
                    <Cell value={row.agent} />
                  </td>

                  {/* Alibaba */}
                  <td className="py-3.5 px-2 text-center">
                    <Cell value={row.alibaba} />
                  </td>

                  {/* Consultant */}
                  <td className="py-3.5 px-2 text-center">
                    <Cell value={row.consultant} />
                  </td>

                  {/* DIY */}
                  <td className="py-3.5 pl-2 pr-3 text-center rounded-r-lg">
                    <Cell value={row.diy} />
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom callout strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 rounded-2xl bg-[#FF6B35] px-6 py-5 shadow-[0_8px_28px_rgba(255,107,53,0.25)]"
      >
        <p className="text-white text-sm sm:text-base font-semibold leading-snug text-center">
          <span className="font-extrabold">Bottom line:</span> Bottlecap delivers more specific, actionable
          intelligence in 5 minutes than most sourcing agents provide in 2 weeks — at{" "}
          <span className="underline decoration-white/60 underline-offset-2">1/30th the cost.</span>
        </p>
      </motion.div>
    </div>
  )
}
