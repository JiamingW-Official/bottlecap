"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ReportCard from "@/components/ReportCard"
import ShareButton from "@/components/ShareButton"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { AnalysisResult, Report } from "@/types"

export default function ReportPage() {
  const params = useParams()
  const id = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["countries"])
  )
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // -------------------------------------------------------------------------
  // Polling: fetch report on mount, then every 5s until status === "complete"
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/report?id=${id}`)
        if (!res.ok) {
          setError("Report not found")
          setLoading(false)
          return
        }
        const data = await res.json()
        setReport(data.report)
        setLoading(false)
      } catch {
        setError("Failed to load report")
        setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(async () => {
      if (report?.status === "complete") return
      try {
        const res = await fetch(`/api/report?id=${id}`)
        if (res.ok) {
          const data = await res.json()
          setReport(data.report)
        }
      } catch {
        // Silently retry on next interval
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [id, report?.status])

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
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
      {expandedSections.has(sectionId) && (
        <div className="px-6 pb-6">{content}</div>
      )}
    </div>
  )

  // -------------------------------------------------------------------------
  // Loading state
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg className="w-16 h-16 animate-spin" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#E8E8E4"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="4"
            strokeDasharray="80"
            strokeDashoffset="60"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="text-2xl font-bold mt-6">
          Your report is being generated...
        </h2>
        <p className="text-[#6B6B6B] mt-2">Usually takes 2-5 minutes</p>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Error / 404 state
  // -------------------------------------------------------------------------
  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Report not found</h2>
        <p className="text-[#6B6B6B] mt-2">
          This report may have been removed or the link is invalid.
        </p>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Processing / pending state (report exists but not yet complete)
  // -------------------------------------------------------------------------
  if (report.status !== "complete" || !report.analysisResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg className="w-16 h-16 animate-spin" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#E8E8E4"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="4"
            strokeDasharray="80"
            strokeDashoffset="60"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="text-2xl font-bold mt-6">
          Your report is being generated...
        </h2>
        <p className="text-[#6B6B6B] mt-2">Usually takes 2-5 minutes</p>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Report complete
  // -------------------------------------------------------------------------
  const analysis: AnalysisResult = report.analysisResult

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Top */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Your report is ready!</h1>
        <p className="text-[#6B6B6B] mt-2">
          Generated on{" "}
          {new Date(report.completedAt!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left column - sticky on desktop */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start">
          <ReportCard
            analysis={analysis}
            productName={report.productName || "Product"}
            reportId={report.id}
          />
          <div className="mt-6 flex justify-center">
            <ShareButton
              productName={report.productName || "Product"}
              analysis={analysis}
              reportId={report.id}
            />
          </div>
        </div>

        {/* Right column - scrollable details */}
        <div className="lg:w-[60%] space-y-6">
          {/* Section 1: Supplier Country Comparison */}
          {renderSection(
            "countries",
            "Supplier Country Comparison",
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8E8E4]">
                    <th className="text-left py-3 font-semibold">Country</th>
                    <th className="text-left py-3 font-semibold">Tariff</th>
                    <th className="text-left py-3 font-semibold">Lead Time</th>
                    <th className="text-left py-3 font-semibold">MOQ</th>
                    <th className="text-left py-3 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.sourcingCountries.map((c, i) => (
                    <tr
                      key={c.countryCode}
                      className={`border-b border-[#E8E8E4] ${i === 0 ? "bg-[#FFF0EB]" : ""}`}
                    >
                      <td className="py-3">
                        {c.countryEmoji} {c.country}
                      </td>
                      <td className="py-3">{c.tariffRate}%</td>
                      <td className="py-3">{c.leadTimeDays} days</td>
                      <td className="py-3">{c.moq.toLocaleString()}</td>
                      <td className="py-3 font-semibold">
                        {c.recommendationScore}/100
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Show pros/cons for top country */}
              {analysis.sourcingCountries.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#22C55E] mb-2">
                      Pros
                    </p>
                    <ul className="space-y-1">
                      {analysis.sourcingCountries[0]?.pros.map((p, i) => (
                        <li key={i} className="text-sm text-[#6B6B6B]">
                          + {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#EF4444] mb-2">
                      Cons
                    </p>
                    <ul className="space-y-1">
                      {analysis.sourcingCountries[0]?.cons.map((c, i) => (
                        <li key={i} className="text-sm text-[#6B6B6B]">
                          - {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 2: Materials Analysis */}
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

          {/* Section 3: Manufacturing Specs */}
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
                    <span className="w-6 h-6 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm">{spec}</span>
                  </div>
                  <button
                    onClick={() => handleCopySpec(spec, i)}
                    className="text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
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

          {/* Section 4: Optimization Tips */}
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

          {/* Section 5: Action Checklist */}
          {renderSection(
            "actions",
            "Action Checklist",
            <div>
              <p className="text-sm text-[#6B6B6B] mb-4">
                Completed {checkedItems.size}/{analysis.actionItems.length}
              </p>
              <div className="space-y-3">
                {analysis.actionItems.map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(i)}
                      onChange={() => toggleCheck(i)}
                      className="w-5 h-5 rounded accent-[#FF6B35]"
                    />
                    <span
                      className={`text-sm ${checkedItems.has(i) ? "line-through text-[#9B9B9B]" : "text-[#1A1A1A]"}`}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Upsell Card */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-8 text-white mt-8">
            <h3 className="text-2xl font-bold mb-3">
              Want contact info for 3 verified suppliers?
            </h3>
            <p className="text-white/80 mb-6">
              Get factory names, direct contact info, WhatsApp numbers, and past
              work examples — all manually verified.
            </p>
            <button className="bg-white text-[#FF6B35] font-bold rounded-full px-8 py-3 hover:bg-white/90 transition-colors">
              Unlock Supplier List — $199
            </button>
            <p className="text-sm text-white/60 mt-3">
              Manually verified real suppliers, not Alibaba search results
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
