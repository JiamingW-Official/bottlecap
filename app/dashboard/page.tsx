"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, FileText, FileSearch, ArrowRight, Loader2, BarChart3, Zap,
  Filter, Plus, Trophy, ChevronRight, Clock,
  TrendingUp, Share2, Home, Sparkles, DollarSign, HelpCircle, X,
  SortAsc, FlaskConical, RefreshCw,
} from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)

  if (diffSec < 60) return "just now"
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`
  if (diffWeek < 5) return `${diffWeek} week${diffWeek !== 1 ? "s" : ""} ago`
  return `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ago`
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 65) return "Good"
  if (score >= 50) return "Fair"
  return "At Risk"
}

// ─── useCountUp ──────────────────────────────────────────────────────────────

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
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startValue + (target - startValue) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return target === null ? null : value
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReportSummary {
  id: string
  productName: string
  status: string
  feasibilityScore?: number
  createdAt: string
}

type StatusFilter = "all" | "complete" | "processing" | "failed"
type SortOption = "newest" | "oldest" | "highest"
type ScoreFilter = "all" | "high" | "medium" | "low"

// ─── Skeleton card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 overflow-hidden relative">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#F0F0EC] animate-pulse shrink-0" />
        <div className="flex-1 space-y-2.5 pt-1">
          <div className="h-4 bg-[#F0F0EC] rounded-full animate-pulse w-3/5" />
          <div className="h-3 bg-[#F0F0EC] rounded-full animate-pulse w-2/5" />
          <div className="h-3 bg-[#F0F0EC] rounded-full animate-pulse w-1/3" />
        </div>
        <div className="w-8 h-8 rounded-full bg-[#F0F0EC] animate-pulse shrink-0" />
      </div>
    </div>
  )
}

// ─── Score border color ───────────────────────────────────────────────────────

function getScoreBorderColor(score?: number, status?: string): string {
  if (status === "processing") return "border-l-[#F59E0B]"
  if (status === "failed") return "border-l-[#EF4444]"
  if (score === undefined) return "border-l-[#D1D5DB]"
  if (score >= 80) return "border-l-[#22C55E]"
  if (score >= 50) return "border-l-[#F59E0B]"
  return "border-l-[#EF4444]"
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-[#22C55E]"
  if (score >= 50) return "text-[#F59E0B]"
  return "text-[#EF4444]"
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-[#22C55E]"
  if (score >= 50) return "bg-[#F59E0B]"
  return "bg-[#EF4444]"
}

function getAvgScoreColor(score: number | null): string {
  if (score === null) return "text-[#767676]"
  if (score >= 80) return "text-[#22C55E]"
  if (score >= 50) return "text-[#F59E0B]"
  return "text-[#EF4444]"
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [email, setEmail] = useState("")
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all")
  const [nameSearch, setNameSearch] = useState("")
  const [dismissedUpsell, setDismissedUpsell] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissedUpsell(localStorage.getItem("dismissed_upsell") === "true")
    }
  }, [])

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

  const getStatusBadge = (status: string): string => {
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

  const filteredReports = reports
    .filter((r) => {
      if (statusFilter !== "all" && !(r.status === statusFilter || (statusFilter === "complete" && r.status === "completed"))) return false
      if (scoreFilter === "high" && (r.feasibilityScore === undefined || r.feasibilityScore < 80)) return false
      if (scoreFilter === "medium" && (r.feasibilityScore === undefined || r.feasibilityScore < 50 || r.feasibilityScore >= 80)) return false
      if (scoreFilter === "low" && (r.feasibilityScore === undefined || r.feasibilityScore >= 50)) return false
      if (nameSearch.trim() && !r.productName.toLowerCase().includes(nameSearch.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortOption === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortOption === "highest") return (b.feasibilityScore ?? 0) - (a.feasibilityScore ?? 0)
      return 0
    })

  const completedReports = reports.filter(
    (r) => r.status === "complete" || r.status === "completed"
  )
  const avgScore =
    completedReports.length > 0
      ? Math.round(
          completedReports.reduce((sum, r) => sum + (r.feasibilityScore || 0), 0) /
            completedReports.length
        )
      : null

  const bestScore =
    completedReports.length > 0
      ? Math.max(...completedReports.map((r) => r.feasibilityScore || 0))
      : null

  const totalSavings = completedReports.length * 2500

  const animatedTotal = useCountUp(reports.length > 0 ? reports.length : null, 600)
  const animatedAvgScore = useCountUp(avgScore, 800)
  const animatedBest = useCountUp(bestScore, 900)
  const animatedSavings = useCountUp(completedReports.length > 0 ? totalSavings : null, 1000)

  const hasReports = reports.length > 0
  const noResults = searched && !loading && reports.length === 0 && !error

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Breadcrumb ── */}
        <ScrollReveal>
          <nav className="flex items-center gap-1.5 text-sm text-[#767676] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF6B35] transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1A1A1A] font-medium">Your Reports</span>
          </nav>
        </ScrollReveal>

        {/* ── Page header ── */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <TextReveal
                as="h1"
                className="text-3xl sm:text-4xl font-black text-[#1A1A1A] leading-tight"
              >
                Your Reports
              </TextReveal>
              <AnimatePresence>
                {hasReports && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="mt-1 inline-flex items-center justify-center bg-[#FF6B35] text-white text-xs font-bold rounded-full px-2.5 py-0.5 min-w-[1.6rem]"
                  >
                    {reports.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/report/demo"
                className="inline-flex items-center gap-1.5 border border-[#E8E8E4] text-[#6B6B6B] rounded-full px-4 py-2 text-sm font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                View Demo
              </Link>
              <MagneticButton>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-1.5 bg-[#FF6B35] text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-[#E85A25] transition-colors shadow-sm shadow-[#FF6B35]/20"
                >
                  <Plus className="w-4 h-4" />
                  New Analysis
                </Link>
              </MagneticButton>
            </div>
          </div>
          <p className="text-[#6B6B6B] mb-8 text-[15px]">
            All your analyses — click any to view the full 12-section report.
          </p>
        </ScrollReveal>

        {/* ── Email lookup ── */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-3 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#767676]" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-12 pr-4 py-3.5 outline-none text-[#1A1A1A] placeholder:text-[#C0C0BC] transition-colors text-[15px]"
              />
            </div>
            <MagneticButton>
              <button
                onClick={handleLookup}
                disabled={loading || !email.trim()}
                className="bg-[#FF6B35] text-white rounded-xl px-6 py-3.5 font-semibold hover:bg-[#E85A25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-2 shadow-sm shadow-[#FF6B35]/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Look up
                  </>
                )}
              </button>
            </MagneticButton>
          </div>
          <p className="text-xs text-[#767676] pl-1 mb-8">
            Use the email from your Stripe receipt.
          </p>
        </ScrollReveal>

        {/* ── Error ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 p-4 bg-[#FEE2E2] rounded-xl text-sm text-[#991B1B]"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Skeleton cards while loading ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 mb-8"
            >
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats bar (5 stats) ── */}
        <AnimatePresence>
          {hasReports && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {/* Total analyses */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center mb-2">
                    <FileText className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">
                    {animatedTotal ?? 0}
                  </p>
                  <p className="text-[11px] text-[#767676] font-medium">Analyses Run</p>
                </div>

                {/* Avg score */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-2">
                    <BarChart3 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className={`text-2xl font-black leading-none mb-1 ${getAvgScoreColor(avgScore)}`}>
                    {animatedAvgScore ?? "—"}
                  </p>
                  <p className="text-[11px] text-[#767676] font-medium">Avg Score</p>
                </div>

                {/* Highest this month */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] flex items-center justify-center mb-2">
                    <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <p className="text-2xl font-black text-[#F59E0B] leading-none mb-1">
                    {animatedBest ?? "—"}
                  </p>
                  <p className="text-[11px] text-[#767676] font-medium">Highest This Month</p>
                </div>

                {/* Total savings */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-2">
                    <DollarSign className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className="text-2xl font-black text-[#22C55E] leading-none mb-1">
                    {animatedSavings !== null ? `$${(animatedSavings / 1000).toFixed(1)}k` : "—"}
                  </p>
                  <p className="text-[11px] text-[#767676] font-medium">Potential Savings</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Filter / sort bar ── */}
        {hasReports && !loading && (
          <div className="mb-5 space-y-3">
            {/* Row 1: search + sort */}
            <div className="flex gap-2 flex-wrap items-center">
              <div className="relative flex-1 min-w-[160px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                  className="w-full bg-white border border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-9 pr-3 py-2 text-sm text-[#1A1A1A] placeholder:text-[#C0C0BC] outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <SortAsc className="w-4 h-4 text-[#767676]" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-white border border-[#E8E8E4] rounded-xl px-3 py-2 text-sm text-[#1A1A1A] outline-none cursor-pointer hover:border-[#FF6B35]/40 transition-colors"
                >
                  <option value="newest">Newest</option>
                  <option value="highest">Highest Score</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
            {/* Row 2: score filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#767676] shrink-0" />
              {(["all", "high", "medium", "low"] as ScoreFilter[]).map((f) => {
                const labels: Record<ScoreFilter, string> = { all: "All", high: "High (80+)", medium: "Medium (50–79)", low: "Low (<50)" }
                return (
                  <button
                    key={f}
                    onClick={() => setScoreFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${
                      scoreFilter === f
                        ? "bg-[#FF6B35] text-white shadow-sm shadow-[#FF6B35]/20"
                        : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/30 hover:text-[#FF6B35]"
                    }`}
                  >
                    {labels[f]}
                  </button>
                )
              })}
              <span className="ml-auto text-xs text-[#767676]">
                {filteredReports.length} report{filteredReports.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}

        {/* ── Report cards ── */}
        {filteredReports.length > 0 && !loading && (
          <div className="space-y-3">
            {filteredReports.map((report, i) => {
              const isComplete = report.status === "complete" || report.status === "completed"
              const isProcessing = report.status === "processing"
              const isFailed = report.status === "failed"
              const score = report.feasibilityScore

              // Score badge color
              const scoreBadgeCls =
                score === undefined ? "bg-[#F5F5F0] text-[#767676]"
                : score >= 80 ? "bg-[#DCFCE7] text-[#166534]"
                : score >= 50 ? "bg-[#FEF3C7] text-[#92400E]"
                : "bg-[#FEE2E2] text-[#991B1B]"

              return (
                <ScrollReveal key={report.id} delay={i * 0.05}>
                  <div
                    className={`group bg-white rounded-2xl border border-[#E8E8E4] border-l-4 ${getScoreBorderColor(score, report.status)} overflow-hidden hover:shadow-lg hover:border-[#FF6B35]/40 transition-all duration-200`}
                  >
                    <Link
                      href={`/report/${report.id}`}
                      className="flex items-stretch"
                    >
                      {/* Score column (complete only) */}
                      {isComplete && score !== undefined ? (
                        <div className="flex flex-col items-center justify-center px-5 py-5 shrink-0 border-r border-[#F0F0EC] min-w-[80px]">
                          <span className={`text-3xl font-black leading-none ${getScoreColor(score)}`}>
                            {score}
                          </span>
                          <span className={`text-[10px] font-semibold mt-1 uppercase tracking-wide ${getScoreColor(score)}`}>
                            {getScoreLabel(score)}
                          </span>
                        </div>
                      ) : isProcessing ? (
                        <div className="flex flex-col items-center justify-center px-5 py-5 shrink-0 border-r border-[#F0F0EC] min-w-[80px]">
                          <div className="relative w-10 h-10">
                            <div className="absolute inset-0 rounded-full border-2 border-[#F59E0B]/20" />
                            <div className="absolute inset-0 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin" />
                          </div>
                        </div>
                      ) : isFailed ? (
                        <div className="flex flex-col items-center justify-center px-5 py-5 shrink-0 border-r border-[#F0F0EC] min-w-[80px]">
                          <span className="text-2xl font-black text-[#EF4444] leading-none">!</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center px-5 py-5 shrink-0 border-r border-[#F0F0EC] min-w-[80px]">
                          <FileText className="w-7 h-7 text-[#D1D5DB]" />
                        </div>
                      )}

                      {/* Main content */}
                      <div className="flex-1 min-w-0 p-5">
                        {/* Top row */}
                        <div className="flex items-start gap-2 mb-1.5">
                          <h3 className="font-bold text-[#1A1A1A] text-[15px] truncate flex-1 leading-tight">
                            {report.productName || "Untitled Product"}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isComplete && score !== undefined && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${scoreBadgeCls}`}>
                                Score {score}
                              </span>
                            )}
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 font-medium capitalize ${getStatusBadge(report.status)}`}
                            >
                              {isComplete ? "Complete" : report.status}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <p className="text-xs text-[#767676] mb-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Analyzed {timeAgo(report.createdAt)}
                        </p>

                        {/* Score bar (complete) */}
                        {isComplete && score !== undefined && (
                          <div className="w-full h-1.5 bg-[#F0F0EC] rounded-full overflow-hidden mb-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                              className={`h-full rounded-full ${getScoreBarColor(score)}`}
                            />
                          </div>
                        )}

                        {/* Processing animation */}
                        {isProcessing && (
                          <div className="w-full h-1.5 bg-[#F0F0EC] rounded-full overflow-hidden mb-3">
                            <div
                              className="h-full w-1/3 bg-[#F59E0B] rounded-full animate-pulse"
                              style={{ animation: "shimmer 1.5s infinite" }}
                            />
                          </div>
                        )}

                        {/* Failed CTA */}
                        {isFailed && (
                          <p className="text-xs text-[#EF4444] mb-1">
                            Analysis failed.{" "}
                            <a
                              href="mailto:hello@bottlecap.io"
                              onClick={(e) => e.stopPropagation()}
                              className="underline hover:no-underline"
                            >
                              Contact support
                            </a>
                          </p>
                        )}

                        {/* Processing note */}
                        {isProcessing && (
                          <p className="text-xs text-[#F59E0B] font-medium flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Analyzing your product — check back in a minute
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center pr-5 shrink-0">
                        <ArrowRight className="w-5 h-5 text-[#D1D5DB] group-hover:text-[#FF6B35] transition-colors" />
                      </div>
                    </Link>

                    {/* Quick action buttons */}
                    {isComplete && (
                      <div
                        className="flex items-center gap-2 px-5 pb-3 border-t border-[#F5F5F0] pt-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            const url = `${window.location.origin}/report/${report.id}`
                            navigator.clipboard.writeText(url).catch(() => {})
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#FF6B35] transition-colors font-medium py-1 px-2 rounded-lg hover:bg-[#FFF0EB]"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>
                        <Link
                          href="/analyze"
                          className="inline-flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#FF6B35] transition-colors font-medium py-1 px-2 rounded-lg hover:bg-[#FFF0EB]"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Re-analyze similar
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Subscription upsell banner — after first card, single-report users */}
                  {i === 0 && reports.length === 1 && !dismissedUpsell && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex items-center gap-3 bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-2xl px-5 py-3.5 mt-3"
                    >
                      <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <p className="text-sm text-[#92400E] flex-1">
                        Running multiple analyses? Monthly plan is $199 &mdash; unlimited reports.
                      </p>
                      <Link
                        href="/pricing"
                        className="text-xs font-semibold text-[#F59E0B] hover:underline shrink-0"
                      >
                        Learn more &rarr;
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.setItem("dismissed_upsell", "true")
                          setDismissedUpsell(true)
                        }}
                        className="text-[#B45309] hover:text-[#92400E] transition-colors shrink-0"
                        aria-label="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </ScrollReveal>
              )
            })}
          </div>
        )}

        {/* ── Empty state (after search) ── */}
        <AnimatePresence>
          {noResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E8E4]">
                {/* Icon area */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#FFF0EB] to-[#F5F5F0] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FileSearch className="w-12 h-12 text-[#FF6B35]/50" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                  No reports for this email
                </h3>
                <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto mb-2 leading-relaxed">
                  Double-check you&apos;re using the same email as your Stripe receipt.
                  Reports can take 2–5 minutes to appear after purchase.
                </p>
                <p className="text-xs text-[#767676] mb-8 max-w-xs mx-auto">
                  Recently purchased? New reports may take a minute to show up — try again shortly.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <MagneticButton>
                    <Link
                      href="/analyze"
                      className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-7 py-3 text-sm font-semibold hover:bg-[#E85A25] transition-colors shadow-sm shadow-[#FF6B35]/20"
                    >
                      <Plus className="w-4 h-4" />
                      Create Your First Analysis — $99
                    </Link>
                  </MagneticButton>
                  <Link
                    href="/report/demo"
                    className="inline-flex items-center gap-1.5 border border-[#E8E8E4] text-[#6B6B6B] rounded-full px-5 py-2.5 text-sm font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                  >
                    See Demo Report
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pre-search / Quick Start state ── */}
        <AnimatePresence>
          {!searched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {/* Quick Start hero */}
              <div className="text-center py-10 mb-8">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="absolute w-24 h-24 rounded-full bg-[#FF6B35]/10"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                    className="absolute w-16 h-16 rounded-full bg-[#FF6B35]/20"
                  />
                  <div className="relative w-14 h-14 rounded-full bg-[#FF6B35] flex items-center justify-center shadow-lg shadow-[#FF6B35]/30">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">No reports yet</h2>
                <p className="text-sm text-[#767676] max-w-sm mx-auto">
                  Enter your email above to retrieve existing reports, or get started below.
                </p>
              </div>

              {/* Quick Start cards */}
              <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest mb-4">
                Quick Start
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {/* Card 1: Try demo product */}
                <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35]/40 hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-3">
                    <FlaskConical className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <p className="font-bold text-[#1A1A1A] text-sm mb-1">Try a demo product</p>
                  <p className="text-xs text-[#767676] leading-relaxed mb-4 flex-1">
                    See how a report looks — pre-filled with an insulated water bottle.
                  </p>
                  <Link
                    href="/analyze?demo=bottle"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:underline"
                  >
                    Try it now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Card 2: Quiz */}
                <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35]/40 hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-3">
                    <HelpCircle className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <p className="font-bold text-[#1A1A1A] text-sm mb-1">Take the quiz first</p>
                  <p className="text-xs text-[#767676] leading-relaxed mb-4 flex-1">
                    Not sure what to manufacture? Start here and we will guide you.
                  </p>
                  <Link
                    href="/tools/quiz"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:underline"
                  >
                    Start quiz
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Card 3: Sample report */}
                <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35]/40 hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <p className="font-bold text-[#1A1A1A] text-sm mb-1">See a sample report</p>
                  <p className="text-xs text-[#767676] leading-relaxed mb-4 flex-1">
                    Browse a full 12-section feasibility report before you commit.
                  </p>
                  <Link
                    href="/report/demo"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:underline"
                  >
                    View sample
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-1.5 text-sm text-[#FF6B35] font-semibold hover:underline"
                >
                  Ready to analyze your product? Start here
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <div className="mt-16 pt-6 border-t border-[#E8E8E4] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#C0C0BC]">
          <p>Reports persist permanently. Bookmark this page to return any time.</p>
          <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] hover:underline">
            hello@bottlecap.io
          </a>
        </div>

      </div>
    </div>
  )
}
