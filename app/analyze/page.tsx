"use client"

import Link from "next/link"
import SubmitForm from "@/components/SubmitForm"

export default function AnalyzePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors text-sm"
      >
        ← Back to home
      </Link>

      <div className="mt-8">
        <SubmitForm />
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 text-sm text-[#9B9B9B]">
        <span>Secured by Stripe</span>
        <span>Powered by Anthropic</span>
      </div>
    </div>
  )
}
