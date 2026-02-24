"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import SubmitForm from "@/components/SubmitForm"

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get("cancelled") === "true"

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {cancelled && (
        <div className="mb-6 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl text-sm text-[#92400E]">
          Payment was cancelled. No worries — your progress is saved. Pick up
          where you left off whenever you&apos;re ready.
        </div>
      )}

      <div>
        <SubmitForm />
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 text-sm text-[#9B9B9B]">
        <span>Secured by Stripe</span>
        <span>Powered by Anthropic</span>
      </div>
    </div>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense>
      <AnalyzeContent />
    </Suspense>
  )
}
