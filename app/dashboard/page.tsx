"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, FileText, ArrowRight, Loader2 } from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import MagneticButton from "@/components/interactive/MagneticButton"

interface ReportSummary {
  id: string
  productName: string
  status: string
  feasibilityScore?: number
  createdAt: string
}

export default function DashboardPage() {
  const [email, setEmail] = useState("")
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        return "bg-[#DCFCE7] text-[#166534]"
      case "processing":
        return "bg-[#FEF3C7] text-[#92400E]"
      case "failed":
        return "bg-[#FEE2E2] text-[#991B1B]"
      default:
        return "bg-[#F5F5F0] text-[#6B6B6B]"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#22C55E]"
    if (score >= 50) return "text-[#F59E0B]"
    return "text-[#EF4444]"
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <ScrollReveal>
        <TextReveal
          as="h1"
          className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3"
        >
          Your Reports
        </TextReveal>
        <p className="text-[#6B6B6B] mb-10">
          Enter your email to find all reports associated with your account. No
          sign-up required.
        </p>
      </ScrollReveal>

      {/* Email lookup */}
      <ScrollReveal delay={0.1}>
        <div className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
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

      {/* Results */}
      {searched && !loading && reports.length === 0 && !error && (
        <ScrollReveal direction="scale">
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-[#E8E8E4] mx-auto mb-4" />
            <p className="text-[#6B6B6B] mb-2">No reports found for this email.</p>
            <p className="text-sm text-[#9B9B9B] mb-6">
              Reports are linked to the email you used at checkout.
            </p>
            <MagneticButton>
              <Link
                href="/analyze"
                className="inline-block bg-[#FF6B35] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Create your first report
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      )}

      {reports.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[#9B9B9B] mb-2">
            {reports.length} report{reports.length !== 1 ? "s" : ""} found
          </p>
          {reports.map((report, i) => (
            <ScrollReveal key={report.id} delay={i * 0.05}>
              <Link
                href={`/report/${report.id}`}
                className="flex items-center justify-between bg-white rounded-xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/30 hover:shadow-sm transition-all group"
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
                  {report.feasibilityScore !== undefined && (
                    <span
                      className={`text-2xl font-black ${getScoreColor(report.feasibilityScore)}`}
                    >
                      {report.feasibilityScore}
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5 text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Info */}
      <ScrollReveal delay={0.2}>
        <div className="mt-16 bg-[#F5F5F0] rounded-xl p-6">
          <h3 className="font-semibold text-[#1A1A1A] mb-2">How it works</h3>
          <ul className="space-y-2 text-sm text-[#6B6B6B]">
            <li>
              Reports are linked to the email address you provided during
              checkout.
            </li>
            <li>
              Each report has a unique URL — you can bookmark it for easy access.
            </li>
            <li>
              Completed reports are available indefinitely. Processing reports
              refresh automatically.
            </li>
            <li>
              Need help?{" "}
              <a
                href="mailto:hello@bottlecap.io"
                className="text-[#FF6B35] hover:underline"
              >
                Contact support
              </a>
            </li>
          </ul>
        </div>
      </ScrollReveal>
    </div>
  )
}
