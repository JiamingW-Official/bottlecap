"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Search,
  FileText,
  FileSearch,
  ArrowRight,
  Loader2,
  BarChart3,
  Zap,
  Filter,
  ExternalLink,
  Plus,
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"

function useCountUp(target: number | null, duration: number = 800) {
  const [value, setValue] = useState(0)
  const prevTarget = useRef<number | null>(null)

  useEffect(() => {
    if (target === null || target === prevTarget.current) return
    prevTarget.current = target

    const startTime = performance.now()
    const startValue = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startValue + (target - startValue) * eased))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return target === null ? null : value
}

interface ReportSummary {
  id: string
  productName: string
  status: string
  feasibilityScore?: number
  createdAt: string
}

type StatusFilter = "all" | "complete" | "processing" | "failed"

export default function DashboardPage() {
  const [email, setEmail] = useState("")
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const handleLookup = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const res = await fetch(
        `/api/reports-by-email?email=${encodeURIComponent(email)}`
      )
      if (!res.ok) {
        setReports([])
        return
      }
      const data = await res.json()
      setReports(data.reports || [])
    } catch {
      setError("Failed to look up reports. Please try again.")
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
      case "completed":
        return "bg-[#DCFCE7] text-[#166534]"
      case "processing":
        return "bg-[#FEF3C7] text-[#92400E] animate-pulse"
      case "failed":
        return "bg-[#FEF2F2] text-[#991B1B]"
      default:
        return "bg-[#F5F5F0] text-[#6B6B6B]"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#22C55E]"
    if (score >= 50) return "text-[#F59E0B]"
    return "text-[#EF4444]"
  }

  const filteredReports =
    statusFilter === "all"
      ? reports
      : reports.filter((r) => r.status === statusFilter)

  const completedReports = reports.filter((r) => r.status === "complete")
  const avgScore =
    completedReports.length > 0
      ? Math.round(
          completedReports.reduce(
            (sum, r) => sum + (r.feasibilityScore || 0),
            0
          ) / completedReports.length
        )
      : null

  const animatedTotal = useCountUp(reports.length > 0 ? reports.length : null, 600)
  const animatedAvgScore = useCountUp(avgScore, 800)
  const animatedCompleted = useCountUp(reports.length > 0 ? completedReports.length : null, 700)

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="flex items-center justify-between mb-3">
          <TextReveal
            as="h1"
            className="text-3xl sm:text-4xl font-black text-[#1A1A1A]"
          >
            Your Reports
          </TextReveal>
          <MagneticButton>
            <Link
              href="/analyze"
              className="hidden sm:inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Analysis
            </Link>
          </MagneticButton>
        </div>
        <p className="text-[#6B6B6B] mb-8">
          Enter the email you used at checkout to see all your reports.
        </p>
      </ScrollReveal>

      {/* Email lookup */}
      <ScrollReveal delay={0.1}>
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-12 pr-4 py-3 outline-none"
            />
          </div>
          <MagneticButton>
            <button
              onClick={handleLookup}
              disabled={loading || !email.trim()}
              className="bg-[#FF6B35] text-white rounded-xl px-6 py-3 font-semibold hover:bg-[#E85A25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Look up"
              )}
            </button>
          </MagneticButton>
        </div>
      </ScrollReveal>

      {error && (
        <div className="mb-6 p-4 bg-[#FEE2E2] rounded-xl text-sm text-[#991B1B]">
          {error}
        </div>
      )}

      {/* Stats bar — only shown when there are reports */}
      {reports.length > 0 && (
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center mx-auto mb-2">
                <FileText className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <p className="text-2xl font-black text-[#1A1A1A]">{animatedTotal ?? 0}</p>
              <p className="text-xs text-[#9B9B9B]">Total reports</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <p className={`text-2xl font-black ${avgScore ? getScoreColor(avgScore) : "text-[#9B9B9B]"}`}>
                {animatedAvgScore ?? "—"}
              </p>
              <p className="text-xs text-[#9B9B9B]">Avg. score</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <p className="text-2xl font-black text-[#22C55E]">
                {animatedCompleted ?? 0}
              </p>
              <p className="text-xs text-[#9B9B9B]">Completed</p>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Filter tabs */}
      {reports.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-[#9B9B9B]" />
          {(["all", "complete", "processing", "failed"] as StatusFilter[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize ${
                  statusFilter === filter
                    ? "bg-[#FF6B35] text-white"
                    : "bg-[#F5F5F0] text-[#6B6B6B] hover:bg-[#E8E8E4]"
                }`}
              >
                {filter}
                {filter !== "all" && (
                  <span className="ml-1">
                    ({reports.filter((r) => r.status === filter).length})
                  </span>
                )}
              </button>
            )
          )}
        </div>
      )}

      {/* Results — empty state */}
      {searched && !loading && reports.length === 0 && !error && (
        <ScrollReveal direction="scale">
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E8E4]">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFF0EB] to-[#F5F5F0] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FileSearch className="w-10 h-10 text-[#FF6B35]/60" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
              No reports found for this email
            </h3>
            <p className="text-sm text-[#6B6B6B] mb-1 max-w-md mx-auto">
              We couldn&apos;t find any reports linked to this address.
              Make sure you&apos;re using the same email from checkout, or start a new analysis below.
            </p>
            <div className="flex flex-col items-center gap-3 mt-6">
              <MagneticButton>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create your first report
                </Link>
              </MagneticButton>
              <Link
                href="/report/demo"
                className="text-sm text-[#FF6B35] hover:underline"
              >
                Or see a demo report &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Report list */}
      {filteredReports.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[#9B9B9B]">
            {filteredReports.length} report
            {filteredReports.length !== 1 ? "s" : ""}
            {statusFilter !== "all" ? ` (${statusFilter})` : ""}
          </p>
          {filteredReports.map((report, i) => (
            <ScrollReveal key={report.id} delay={i * 0.05}>
              <Link
                href={`/report/${report.id}`}
                className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/30 hover:shadow-lg transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-[#1A1A1A] truncate">
                      {report.productName || "Untitled Product"}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${getStatusBadge(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#9B9B9B]">
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Score bar */}
                  {report.feasibilityScore !== undefined && (
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-2 bg-[#E8E8E4] rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            report.feasibilityScore >= 80
                              ? "bg-[#22C55E]"
                              : report.feasibilityScore >= 50
                                ? "bg-[#F59E0B]"
                                : "bg-[#EF4444]"
                          }`}
                          style={{ width: `${report.feasibilityScore}%` }}
                        />
                      </div>
                      <span
                        className={`text-2xl font-black ${getScoreColor(report.feasibilityScore)}`}
                      >
                        {report.feasibilityScore}
                      </span>
                    </div>
                  )}
                  <ArrowRight className="w-5 h-5 text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Footer help hint — minimal */}
      <p className="mt-12 text-xs text-center text-[#C0C0BC]">
        Reports are linked to your checkout email.{" "}
        <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] hover:underline">
          Need help?
        </a>
      </p>
    </div>
  )
}
