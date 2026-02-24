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

  const reportUrl = `https://bottlecap.io/report/${reportId}`

  const handleShareTwitter = useCallback(() => {
    const text = `Just used @bottlecap_io to analyze my product idea "${productName}"\n\nFeasibility: ${analysis.feasibilityScore}/100\nRecommended: ${analysis.sourcingCountries[0]?.country || "TBD"}\nCost: $${analysis.costEstimate.min}-$${analysis.costEstimate.max}/unit\n\nEvery aspiring product maker should check their numbers\nbottlecap.io`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    )
  }, [productName, analysis])

  const handleShareLinkedIn = useCallback(() => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`,
      "_blank"
    )
  }, [reportUrl])

  const handleCopyLink = useCallback(async () => {
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
  }, [reportUrl])

  return (
    <div className="flex gap-3">
      <button
        onClick={handleShareTwitter}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Twitter className="w-4 h-4" />
        Share on Twitter
      </button>
      <button
        onClick={handleShareLinkedIn}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        Share on LinkedIn
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] text-sm font-medium hover:bg-[#F5F5F0] transition-colors"
      >
        <Link className="w-4 h-4" />
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  )
}
