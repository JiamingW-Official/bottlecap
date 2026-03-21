"use client"

import { Check, X } from "lucide-react"

const ROWS = [
  { label: "Time to analysis",          bottlecap: "2–5 minutes",   agent: "2–4 weeks",      diy: "40+ hours" },
  { label: "Cost",                        bottlecap: "$99",           agent: "$3K–$10K",       diy: "Free (your time)" },
  { label: "Feasibility score",           bottlecap: true,            agent: false,            diy: false },
  { label: "HS code + tariff rates",      bottlecap: true,            agent: true,             diy: false },
  { label: "Multi-country comparison",    bottlecap: "3 countries",   agent: "1–2 countries",  diy: "1 country" },
  { label: "Per-unit cost breakdown",     bottlecap: true,            agent: true,             diy: false },
  { label: "Optimization tips",           bottlecap: "5–8 specific",  agent: "Varies",         diy: false },
  { label: "Factory-ready specs",         bottlecap: "10 specs",      agent: "5–10 specs",     diy: false },
  { label: "72-hr money-back guarantee",  bottlecap: true,            agent: false,            diy: false },
  { label: "Available 24/7",              bottlecap: true,            agent: false,            diy: true },
]

function Cell({
  value,
  isBottlecap = false,
}: {
  value: string | boolean
  isBottlecap?: boolean
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={`w-4 h-4 mx-auto ${isBottlecap ? "text-[#FF6B35]" : "text-[#22C55E]"}`}
      />
    ) : (
      <X className="w-4 h-4 mx-auto text-[#D8D8D4]" />
    )
  }
  return (
    <span
      className={`text-xs ${
        isBottlecap
          ? "font-semibold text-[#FF6B35]"
          : "text-[#6B6B6B] font-medium"
      }`}
    >
      {value}
    </span>
  )
}

export default function IndustryComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px]">
        <thead>
          <tr>
            <th className="text-left pb-4 pr-6 w-[38%]" />
            {/* Bottlecap — highlighted */}
            <th className="pb-4 px-3 text-center w-[20%]">
              <div className="inline-flex flex-col items-center gap-1 bg-[#FF6B35] text-white rounded-2xl px-4 py-2.5 shadow-[0_4px_14px_rgba(255,107,53,0.3)]">
                <span className="font-bold text-sm leading-none">Bottlecap</span>
                <span className="text-white/70 text-[11px] leading-none">$99 · 5 min</span>
              </div>
            </th>
            <th className="pb-4 px-3 text-center w-[20%]">
              <div className="inline-flex flex-col items-center gap-0.5">
                <span className="font-semibold text-[#1A1A1A] text-sm">Sourcing Agent</span>
                <span className="text-[#9B9B9B] text-[11px]">$3K–$10K</span>
              </div>
            </th>
            <th className="pb-4 pl-3 text-center w-[20%]">
              <div className="inline-flex flex-col items-center gap-0.5">
                <span className="font-semibold text-[#1A1A1A] text-sm">DIY Research</span>
                <span className="text-[#9B9B9B] text-[11px]">40+ hours</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr
              key={row.label}
              className={`border-t ${
                i === 0 ? "border-[#E8E8E4]" : "border-[#F0F0EC]"
              }`}
            >
              <td className="py-3 pr-6 text-xs font-medium text-[#4B4B4B]">
                {row.label}
              </td>
              <td className="py-3 px-3 text-center bg-[#FFF8F5]">
                <Cell value={row.bottlecap} isBottlecap />
              </td>
              <td className="py-3 px-3 text-center">
                <Cell value={row.agent} />
              </td>
              <td className="py-3 pl-3 text-center">
                <Cell value={row.diy} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
