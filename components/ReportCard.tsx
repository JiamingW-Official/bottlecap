"use client"

import { useRef, useCallback } from "react"
import { toPng } from "html-to-image"
import { Download, Share2 } from "lucide-react"
import { AnalysisResult } from "@/types"

interface ReportCardProps {
  analysis: AnalysisResult
  productName: string
  reportId: string
  showActions?: boolean
  completedAt?: string
}

export default function ReportCard({
  analysis,
  productName,
  reportId,
  showActions = true,
  completedAt,
}: ReportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
    const link = document.createElement("a")
    link.download = `bottlecap-${productName.toLowerCase().replace(/\s+/g, "-")}-report.png`
    link.href = dataUrl
    link.click()
  }, [productName])

  const handleShareTwitter = useCallback(() => {
    const text = `Just used @bottlecap_io to analyze my product idea "${productName}"\n\nFeasibility: ${analysis.feasibilityScore}/100\nRecommended: ${analysis.sourcingCountries[0]?.country || "TBD"}\nCost: $${analysis.costEstimate.min}-$${analysis.costEstimate.max}/unit\n\nEvery aspiring product maker should check their numbers\nbottlecap.io`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    )
  }, [productName, analysis])

  const score = analysis.feasibilityScore
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference

  const scoreColor =
    score >= 80 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444"

  const getBadgeStyles = (label: AnalysisResult["feasibilityLabel"]) => {
    switch (label) {
      case "Highly Feasible":
        return "bg-[#DCFCE7] text-[#166534]"
      case "Feasible":
        return "bg-[#DBEAFE] text-[#1E40AF]"
      case "Needs Adjustment":
        return "bg-[#FEF3C7] text-[#92400E]"
      case "Challenging":
        return "bg-[#FEE2E2] text-[#991B1B]"
      default:
        return "bg-[#DBEAFE] text-[#1E40AF]"
    }
  }

  const formattedDate = new Date(completedAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <div className="flex flex-col items-center">
      <div
        ref={cardRef}
        className="bg-white rounded-3xl border border-[#E8E8E4] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full max-w-[480px]"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center text-sm text-[#9B9B9B]">
          <span>Bottlecap</span>
          <span>{formattedDate}</span>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#E8E8E4] my-4" />

        {/* Product name + badge */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-[#1A1A1A] truncate pr-4">
            {productName}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeStyles(analysis.feasibilityLabel)}`}
          >
            {analysis.feasibilityLabel}
          </span>
        </div>

        {/* Score circle */}
        <div className="flex flex-col items-center my-6">
          <div className="relative w-[120px] h-[120px]">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="transform"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="#E8E8E4"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke={scoreColor}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#1A1A1A]">
                {score}
              </span>
              <span className="text-lg text-[#6B6B6B]">/100</span>
            </div>
          </div>
          <p className="text-sm text-[#FF6B35] font-medium text-center mt-2">
            {analysis.oneLinerSummary}
          </p>
        </div>

        {/* Four-cell data grid */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-[#F5F5F0] rounded-xl p-4">
            <p className="text-xs text-[#6B6B6B]">💰 Cost/unit</p>
            <p className="text-lg font-bold text-[#1A1A1A] mt-1">
              ${analysis.costEstimate.min} - ${analysis.costEstimate.max}
            </p>
          </div>
          <div className="bg-[#F5F5F0] rounded-xl p-4">
            <p className="text-xs text-[#6B6B6B]">🌍 Sourcing</p>
            <p className="text-lg font-bold text-[#1A1A1A] mt-1">
              {analysis.sourcingCountries[0]?.country || "N/A"}{" "}
              {analysis.sourcingCountries[0]?.countryEmoji || ""}
            </p>
          </div>
          <div className="bg-[#F5F5F0] rounded-xl p-4">
            <p className="text-xs text-[#6B6B6B]">📦 Min. Order</p>
            <p className="text-lg font-bold text-[#1A1A1A] mt-1">
              {analysis.sourcingCountries[0]?.moq?.toLocaleString() || "N/A"}{" "}
              units
            </p>
          </div>
          <div className="bg-[#F5F5F0] rounded-xl p-4">
            <p className="text-xs text-[#6B6B6B]">⚡ Lead Time</p>
            <p className="text-lg font-bold text-[#1A1A1A] mt-1">
              {analysis.sourcingCountries[0]?.leadTimeDays || "N/A"} days
            </p>
          </div>
        </div>

        {/* Red flag warning */}
        {analysis.redFlags.length > 0 && (
          <div className="mt-4 p-3 bg-[#FEF2F2] rounded-lg text-sm text-[#991B1B]">
            ⚠️ {analysis.redFlags[0]}
          </div>
        )}

        {/* Encouraging note */}
        <p className="mt-4 text-sm text-[#9B9B9B] italic text-center">
          &ldquo;{analysis.encouragingNote}&rdquo;
        </p>

        {/* Actions area */}
        {showActions && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 border border-[#E8E8E4] rounded-full py-2.5 text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleShareTwitter}
              className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B35] text-white border border-[#FF6B35] rounded-full py-2.5 text-sm font-medium hover:bg-[#e55e2e] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
