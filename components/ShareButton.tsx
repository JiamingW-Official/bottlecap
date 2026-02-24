"use client"

import { useState, useCallback } from "react"
import { Twitter, Linkedin, Link } from "lucide-react"
import { AnalysisResult } from "@/types"

interface ShareButtonProps {
  productName: string
  analysis: AnalysisResult
  reportId: string
}

export default function ShareButton({
  productName,
  analysis,
  reportId,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/report/${reportId}`
      : `/report/${reportId}`

  const trackShare = useCallback(() => {
    fetch("/api/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    }).catch(() => {})
  }, [reportId])

  const handleShareTwitter = useCallback(() => {
    trackShare()
    const text = `Just used @bottlecap_io to analyze my product idea "${productName}"\n\nFeasibility: ${analysis.feasibilityScore}/100\nRecommended: ${analysis.sourcingCountries[0]?.country || "TBD"}\nCost: $${analysis.costEstimate.min}-$${analysis.costEstimate.max}/unit\n\nEvery aspiring product maker should check their numbers\nbottlecap.io`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    )
  }, [productName, analysis, trackShare])

  const handleShareLinkedIn = useCallback(() => {
    trackShare()
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`,
      "_blank"
    )
  }, [reportUrl, trackShare])

  const handleCopyLink = useCallback(async () => {
    trackShare()
    try {
      await navigator.clipboard.writeText(reportUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = reportUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [reportUrl, trackShare])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button
        onClick={handleShareTwitter}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </button>
      <button
        onClick={handleShareLinkedIn}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Link className="w-4 h-4" />
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  )
}
