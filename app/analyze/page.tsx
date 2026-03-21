"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Lock, RotateCcw, Zap, Shield } from "lucide-react"
import SubmitForm from "@/components/SubmitForm"

const trustBadges = [
  { Icon: Zap, label: "2–5 min delivery", sub: "Powered by Claude AI" },
  { Icon: Lock, label: "Stripe secured", sub: "PCI compliant" },
  { Icon: RotateCcw, label: "72-hr refund", sub: "No questions asked" },
  { Icon: Shield, label: "Confidential", sub: "Your ideas stay yours" },
]

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const cancelled = searchParams.get("cancelled") === "true"

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Cancelled banner */}
      {cancelled && (
        <div className="mb-8 px-5 py-4 bg-[#FEF3C7] border border-[#F59E0B]/40 rounded-xl text-sm text-[#92400E] max-w-2xl">
          Payment cancelled — your progress is saved. Pick up where you left off.
        </div>
      )}

      {/* Page header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-2">Manufacturing feasibility report</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1A1A] mb-3">
          Describe your product.
          <br />
          <span className="text-[#9B9B9B] font-normal">We handle the rest.</span>
        </h1>
        <p className="text-[#6B6B6B] text-base">
          AI analyzes your idea across 50+ dimensions — cost, countries, materials, tariffs — and delivers a 12-section report in minutes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left — form */}
        <div className="flex-1 max-w-2xl">
          <SubmitForm />
        </div>

        {/* Right — sidebar (desktop) */}
        <div className="hidden lg:flex flex-col gap-5 w-64 shrink-0">
          <div className="sticky top-24 space-y-5">
            {/* Trust badges */}
            <div className="space-y-3">
              {trustBadges.map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F0] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#6B6B6B]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A] leading-none">{label}</p>
                    <p className="text-xs text-[#9B9B9B] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E8E8E4]" />

            {/* Demo link */}
            <div>
              <p className="text-xs text-[#9B9B9B] mb-2">Not sure what you&apos;ll get?</p>
              <Link
                href="/report/demo"
                className="text-sm text-[#FF6B35] font-semibold hover:underline flex items-center gap-1"
              >
                See a sample report →
              </Link>
            </div>

            {/* Sample score preview */}
            <div className="bg-[#F5F5F0] rounded-2xl p-4 border border-[#E8E8E4]">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9B9B9B] mb-3">Sample output</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-[#22C55E] leading-none">87</span>
                <span className="text-base text-[#9B9B9B] mb-0.5">/100</span>
              </div>
              <p className="text-xs font-medium text-[#FF6B35] mb-3">Highly feasible — Vietnam recommended</p>
              <div className="space-y-1.5 text-xs text-[#6B6B6B]">
                <div className="flex justify-between">
                  <span>Cost/unit</span>
                  <span className="font-medium text-[#1A1A1A]">$6.20–$8.40</span>
                </div>
                <div className="flex justify-between">
                  <span>MOQ</span>
                  <span className="font-medium text-[#1A1A1A]">500 units</span>
                </div>
                <div className="flex justify-between">
                  <span>Lead time</span>
                  <span className="font-medium text-[#1A1A1A]">32 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile trust strip */}
      <div className="lg:hidden mt-10 pt-8 border-t border-[#E8E8E4] flex flex-wrap gap-4 text-xs text-[#9B9B9B]">
        <span>⚡ 2–5 min delivery</span>
        <span>🔒 Stripe secured</span>
        <span>↩ 72-hr refund</span>
        <span>🔒 Confidential</span>
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
