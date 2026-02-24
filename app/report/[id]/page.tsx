"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ReportCard from "@/components/ReportCard"
import ShareButton from "@/components/ShareButton"
import RadarChart from "@/components/RadarChart"
import CostBreakdownChart from "@/components/CostBreakdownChart"
import { Copy, Check, ChevronDown, ChevronUp, Download, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react"
import TiltCard from "@/components/interactive/TiltCard"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"
import { toast } from "sonner"
import { AnalysisResult, Report } from "@/types"

const MAX_POLL_MS = 10 * 60 * 1000 // 10 minutes

function ReportContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["countries"])
  )
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Ref to track whether polling should continue (avoids stale closure)
  const shouldPollRef = useRef(true)
  const pollStartRef = useRef(Date.now())

  // Show success toast on payment redirect
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Payment confirmed! Your report is being generated.")
    }
  }, [searchParams])

  // Initialize checklist from localStorage
  useEffect(() => {
    if (!id) return
    try {
      const saved = localStorage.getItem(`bottlecap_checklist_${id}`)
      if (saved) {
        const parsed: number[] = JSON.parse(saved)
        setCheckedItems(new Set(parsed))
      }
    } catch {}
  }, [id])

  // -------------------------------------------------------------------------
  // Polling: fetch report on mount, then every 5s until complete/failed
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return

    pollStartRef.current = Date.now()
    shouldPollRef.current = true

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/report?id=${id}`)
        if (!res.ok) {
          setError("Report not found")
          setLoading(false)
          shouldPollRef.current = false
          return
        }
        const data = await res.json()
        setReport(data.report)
        setLoading(false)

        if (
          data.report.status === "complete" ||
          data.report.status === "failed"
        ) {
          shouldPollRef.current = false
        }
      } catch {
        setError("Failed to load report")
        setLoading(false)
        shouldPollRef.current = false
      }
    }

    fetchData()

    const interval = setInterval(async () => {
      // Stop polling if report is done, or max timeout exceeded
      if (!shouldPollRef.current) {
        clearInterval(interval)
        return
      }
      if (Date.now() - pollStartRef.current > MAX_POLL_MS) {
        shouldPollRef.current = false
        clearInterval(interval)
        setError("Report generation timed out. Please contact support.")
        return
      }

      try {
        const res = await fetch(`/api/report?id=${id}`)
        if (res.ok) {
          const data = await res.json()
          setReport(data.report)
          if (
            data.report.status === "complete" ||
            data.report.status === "failed"
          ) {
            shouldPollRef.current = false
            clearInterval(interval)
          }
        }
      } catch {
        // Silently retry on next interval
      }
    }, 5000)

    return () => {
      shouldPollRef.current = false
      clearInterval(interval)
    }
  }, [id])

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

  const toggleCheck = useCallback(
    (index: number) => {
      setCheckedItems((prev) => {
        const next = new Set(prev)
        if (next.has(index)) next.delete(index)
        else next.add(index)
        // Persist to localStorage
        try {
          localStorage.setItem(
            `bottlecap_checklist_${id}`,
            JSON.stringify(Array.from(next))
          )
        } catch {}
        return next
      })
    },
    [id]
  )

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
        <h2 className="text-2xl font-bold mt-6">Loading report...</h2>
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
          {error ||
            "This report may have been removed or the link is invalid."}
        </p>
        <a
          href="mailto:hello@bottlecap.io"
          className="mt-4 text-[#FF6B35] hover:underline text-sm"
        >
          Contact support
        </a>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Failed state (shows error instead of spinner forever)
  // -------------------------------------------------------------------------
  if (report.status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">!</span>
        </div>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-[#6B6B6B] mt-2 max-w-md">
          We hit an issue generating your report. Our team has been notified
          and will look into it.
        </p>
        <a
          href="mailto:hello@bottlecap.io"
          className="mt-4 bg-[#FF6B35] text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
        >
          Email support
        </a>
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
      <ScrollReveal className="text-center mb-12">
        <TextReveal as="h1" className="text-3xl font-bold">
          Your report is ready!
        </TextReveal>
        <p className="text-[#6B6B6B] mt-2">
          Generated on{" "}
          {new Date(report.completedAt!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </ScrollReveal>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left column - sticky on desktop */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start">
          <ReportCard
            analysis={analysis}
            productName={report.productName || "Product"}
            reportId={report.id}
            completedAt={report.completedAt}
          />
          <div className="mt-6">
            <ShareButton
              productName={report.productName || "Product"}
              analysis={analysis}
              reportId={report.id}
            />
          </div>
        </div>

        {/* Right column - scrollable details */}
        <div className="lg:w-[60%] space-y-6">
          {/* Section: Product Classification */}
          <ScrollReveal delay={0.1}>
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
                    ${analysis.annualSavingsOpportunity?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
          </ScrollReveal>

          {/* Section: Cost Visualization */}
          <ScrollReveal delay={0.15}>
          {renderSection(
            "cost-visual",
            "Cost Breakdown",
            <div className="space-y-6">
              <CostBreakdownChart
                segments={[
                  {
                    label: "Manufacturing",
                    value: analysis.costEstimate.min * 0.55,
                    color: "#FF6B35",
                  },
                  {
                    label: "Materials",
                    value: analysis.costEstimate.min * 0.25,
                    color: "#FF9F1C",
                  },
                  {
                    label: "Shipping & Logistics",
                    value: analysis.costEstimate.min * 0.12,
                    color: "#22C55E",
                  },
                  {
                    label: "Duties & Tariffs",
                    value: analysis.costEstimate.min * 0.08,
                    color: "#3B82F6",
                  },
                ]}
                total={analysis.costEstimate.min}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F5F5F0] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#6B6B6B]">Low Estimate</p>
                  <p className="text-2xl font-black text-[#22C55E]">
                    ${analysis.costEstimate.min.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#9B9B9B]">per unit</p>
                </div>
                <div className="bg-[#F5F5F0] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#6B6B6B]">High Estimate</p>
                  <p className="text-2xl font-black text-[#EF4444]">
                    ${analysis.costEstimate.max.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#9B9B9B]">per unit</p>
                </div>
              </div>
            </div>
          )}
          </ScrollReveal>

          {/* Section: Supplier Country Comparison (card-based, all countries) */}
          <ScrollReveal delay={0.2}>
          {renderSection(
            "countries",
            "Supplier Country Comparison",
            <div className="space-y-6">
              {/* Radar chart for top country */}
              {analysis.sourcingCountries.length > 0 && (
                <div className="flex flex-col items-center mb-4">
                  <p className="text-sm text-[#6B6B6B] mb-3">
                    Top pick: {analysis.sourcingCountries[0].country}
                  </p>
                  <RadarChart
                    data={[
                      {
                        label: "Score",
                        value: analysis.sourcingCountries[0].recommendationScore,
                      },
                      {
                        label: "Cost",
                        value: Math.max(0, 100 - analysis.sourcingCountries[0].tariffRate * 3),
                      },
                      {
                        label: "Speed",
                        value: Math.max(0, 100 - analysis.sourcingCountries[0].leadTimeDays * 2),
                      },
                      {
                        label: "MOQ",
                        value: Math.max(0, 100 - analysis.sourcingCountries[0].moq / 50),
                      },
                      {
                        label: "Quality",
                        value: Math.min(100, analysis.sourcingCountries[0].recommendationScore + 5),
                      },
                    ]}
                    size={260}
                  />
                </div>
              )}
              {/* Country cards */}
              <div className="space-y-4">
              {analysis.sourcingCountries.map((c, i) => (
                <TiltCard key={c.countryCode} maxTilt={5}>
                <div
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
                </TiltCard>
              ))}
              </div>
            </div>
          )}
          </ScrollReveal>

          {/* Section: Materials Analysis */}
          <ScrollReveal delay={0.1}>
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
          </ScrollReveal>

          {/* Section: Manufacturing Specs */}
          <ScrollReveal delay={0.1}>
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
          </ScrollReveal>

          {/* Section: Optimization Tips */}
          <ScrollReveal delay={0.1}>
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
          </ScrollReveal>

          {/* Section: Action Checklist */}
          <ScrollReveal delay={0.1}>
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
          </ScrollReveal>

          {/* Section: Red Flags */}
          {analysis.redFlags && analysis.redFlags.length > 0 &&
            <ScrollReveal delay={0.1}>
            {renderSection(
              "red-flags",
              "Red Flags & Risks",
              <div className="space-y-3">
                {analysis.redFlags.map((flag, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-[#FEF2F2] rounded-lg border-l-4 border-[#EF4444]"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#1A1A1A]">{flag}</p>
                  </div>
                ))}
              </div>
            )}
            </ScrollReveal>
          }

          {/* Encouraging Note */}
          {analysis.encouragingNote && (
            <ScrollReveal delay={0.1}>
            <div className="bg-[#F0FDF4] border border-[#22C55E]/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-[#22C55E] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#166534] mb-1">
                    Looking Good!
                  </h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {analysis.encouragingNote}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          )}

          {/* Summary Stats Bar */}
          <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
              Quick Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-[#FF6B35]">
                  {analysis.feasibilityScore}
                </p>
                <p className="text-xs text-[#6B6B6B]">Feasibility Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {analysis.sourcingCountries.length}
                </p>
                <p className="text-xs text-[#6B6B6B]">Countries Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#22C55E]">
                  ${analysis.costEstimate.min}
                </p>
                <p className="text-xs text-[#6B6B6B]">Min Unit Cost</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {analysis.optimizationTips.length}
                </p>
                <p className="text-xs text-[#6B6B6B]">Optimization Tips</p>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* PDF Export */}
          <ScrollReveal delay={0.1}>
          <div className="flex justify-center">
            <MagneticButton>
              <button
                onClick={() => {
                  toast.info("Preparing PDF... This may take a moment.")
                  window.print()
                }}
                className="flex items-center gap-2 bg-white border-2 border-[#E8E8E4] rounded-full px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:border-[#FF6B35] transition-colors"
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </button>
            </MagneticButton>
          </div>
          </ScrollReveal>

          {/* Upsell Card */}
          <ScrollReveal direction="scale" delay={0.15}>
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-8 text-white mt-8">
            <h3 className="text-2xl font-bold mb-3">
              Want contact info for 3 verified suppliers?
            </h3>
            <p className="text-white/80 mb-6">
              Get factory names, direct contact info, WhatsApp numbers, and past
              work examples — all manually verified.
            </p>
            <button
              onClick={() => {
                window.location.href = `mailto:hello@bottlecap.io?subject=Supplier List Request — ${report.productName || "Product"}&body=Hi, I'd like to purchase the verified supplier list for my report (ID: ${report.id}).`
              }}
              className="bg-white text-[#FF6B35] font-bold rounded-full px-8 py-3 hover:bg-white/90 transition-colors cursor-pointer"
            >
              Unlock Supplier List — $199
            </button>
            <p className="text-sm text-white/60 mt-3">
              Manually verified real suppliers, not Alibaba search results
            </p>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense>
      <ReportContent />
    </Suspense>
  )
}
