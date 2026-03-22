"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, FileText, FileSearch, ArrowRight, Loader2, BarChart3, Zap,
  Filter, Plus, CheckCircle, Trophy, Calendar, ChevronRight, Clock,
  TrendingUp, Share2, Home,
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
  if (score === null) return "text-[#9B9B9B]"
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

  const filteredReports =
    statusFilter === "all"
      ? reports
      : reports.filter((r) => r.status === statusFilter || (statusFilter === "complete" && r.status === "completed"))

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

  const thisMonthCount = reports.filter((r) => {
    const d = new Date(r.createdAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const animatedTotal = useCountUp(reports.length > 0 ? reports.length : null, 600)
  const animatedAvgScore = useCountUp(avgScore, 800)
  const animatedCompleted = useCountUp(reports.length > 0 ? completedReports.length : null, 700)
  const animatedBest = useCountUp(bestScore, 900)
  const animatedThisMonth = useCountUp(reports.length > 0 ? thisMonthCount : null, 650)

  const hasReports = reports.length > 0
  const noResults = searched && !loading && reports.length === 0 && !error

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Breadcrumb ── */}
        <ScrollReveal>
          <nav className="flex items-center gap-1.5 text-sm text-[#9B9B9B] mb-6">
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
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
          <p className="text-xs text-[#9B9B9B] pl-1 mb-8">
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
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {/* Total */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center mb-2">
                    <FileText className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">
                    {animatedTotal ?? 0}
                  </p>
                  <p className="text-[11px] text-[#9B9B9B] font-medium">Total</p>
                </div>

                {/* Avg score */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-2">
                    <BarChart3 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className={`text-2xl font-black leading-none mb-1 ${getAvgScoreColor(avgScore)}`}>
                    {animatedAvgScore ?? "—"}
                  </p>
                  <p className="text-[11px] text-[#9B9B9B] font-medium">Avg Score</p>
                </div>

                {/* Completed */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-2">
                    <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className="text-2xl font-black text-[#22C55E] leading-none mb-1">
                    {animatedCompleted ?? 0}
                  </p>
                  <p className="text-[11px] text-[#9B9B9B] font-medium">Completed</p>
                </div>

                {/* Best score */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] flex items-center justify-center mb-2">
                    <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <p className="text-2xl font-black text-[#F59E0B] leading-none mb-1">
                    {animatedBest ?? "—"}
                  </p>
                  <p className="text-[11px] text-[#9B9B9B] font-medium">Best Score</p>
                </div>

                {/* This month */}
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 flex flex-col items-center text-center col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-2">
                    <Calendar className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <p className="text-2xl font-black text-[#3B82F6] leading-none mb-1">
                    {animatedThisMonth ?? 0}
                  </p>
                  <p className="text-[11px] text-[#9B9B9B] font-medium">This Month</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Filter tabs ── */}
        {hasReports && !loading && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <Filter className="w-4 h-4 text-[#9B9B9B] shrink-0" />
            {(["all", "complete", "processing", "failed"] as StatusFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize font-medium ${
                  statusFilter === filter
                    ? "bg-[#FF6B35] text-white shadow-sm shadow-[#FF6B35]/20"
                    : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/30 hover:text-[#FF6B35]"
                }`}
              >
                {filter}
                {filter !== "all" && (
                  <span className="ml-1 opacity-75">
                    (
                    {reports.filter((r) =>
                      filter === "complete"
                        ? r.status === "complete" || r.status === "completed"
                        : r.status === filter
                    ).length}
                    )
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#9B9B9B]">
              {filteredReports.length} report{filteredReports.length !== 1 ? "s" : ""}
              {statusFilter !== "all" ? ` (${statusFilter})` : ""}
            </span>
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

              return (
                <ScrollReveal key={report.id} delay={i * 0.05}>
                  <Link
                    href={`/report/${report.id}`}
                    className={`group flex items-stretch bg-white rounded-2xl border border-[#E8E8E4] border-l-4 ${getScoreBorderColor(score, report.status)} overflow-hidden hover:shadow-lg hover:border-[#FF6B35]/40 hover:border-l-4 transition-all duration-200`}
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
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="font-bold text-[#1A1A1A] text-[15px] truncate flex-1 leading-tight">
                          {report.productName || "Untitled Product"}
                        </h3>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 font-medium capitalize ${getStatusBadge(report.status)}`}
                        >
                          {isComplete ? "Complete" : report.status}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-[#9B9B9B] mb-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(report.createdAt)}
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
                <p className="text-xs text-[#9B9B9B] mb-8 max-w-xs mx-auto">
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

        {/* ── Pre-search state ── */}
        <AnimatePresence>
          {!searched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="mt-2">
                <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest mb-4">
                  What you&apos;ll find here
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {[
                    {
                      icon: "📊",
                      title: "All your analyses",
                      desc: "View every product report you've purchased, in one place.",
                    },
                    {
                      icon: "🔗",
                      title: "Shareable links",
                      desc: "Share any report directly with co-founders or investors.",
                    },
                    {
                      icon: "✅",
                      title: "Progress tracking",
                      desc: "Check off action items and monitor next steps across reports.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35]/30 transition-colors"
                    >
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-[#9B9B9B] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    href="/analyze"
                    className="inline-flex items-center gap-1.5 text-sm text-[#FF6B35] font-semibold hover:underline"
                  >
                    Never analyzed a product? Start here
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
