"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Check, Lock, RotateCcw, Zap, Shield } from "lucide-react"
import SubmitForm from "@/components/SubmitForm"
import ScrollReveal from "@/components/animations/ScrollReveal"

const reportIncludes = [
  "Feasibility score (0-100)",
  "Per-unit cost breakdown",
  "3-country supplier comparison",
  "HS code classification",
  "Materials analysis + alternatives",
  "10 manufacturing specifications",
  "Optimization tips with savings",
  "7-step action checklist",
  "Shareable report card",
]

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get("cancelled") === "true"

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {cancelled && (
        <div className="mb-6 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl text-sm text-[#92400E] max-w-2xl">
          Payment was cancelled. No worries — your progress is saved. Pick up
          where you left off whenever you&apos;re ready.
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left — form */}
        <div className="flex-1 max-w-2xl">
          <SubmitForm />
        </div>

        {/* Right — info panel (desktop) */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* What you get */}
            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
              <h3 className="font-semibold text-[#1A1A1A] mb-4 text-sm">
                Your report includes
              </h3>
              <div className="space-y-2.5">
                {reportIncludes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span className="text-sm text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-[#F5F5F0] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-[#6B6B6B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">Stripe secured</p>
                  <p className="text-xs text-[#9B9B9B]">PCI compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 text-[#6B6B6B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">72-hour refund</p>
                  <p className="text-xs text-[#9B9B9B]">No questions asked</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#6B6B6B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">Ready in 2-5 min</p>
                  <p className="text-xs text-[#9B9B9B]">Powered by Claude AI</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#6B6B6B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">Confidential</p>
                  <p className="text-xs text-[#9B9B9B]">Your ideas stay yours</p>
                </div>
              </div>
            </div>

            {/* Demo link */}
            <div className="text-center">
              <Link
                href="/report/demo"
                className="text-sm text-[#FF6B35] hover:underline font-medium"
              >
                See a sample report first &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile trust line */}
      <div className="lg:hidden mt-12 flex items-center justify-center gap-6 text-sm text-[#9B9B9B]">
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
