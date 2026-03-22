"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  DollarSign,
  Clock,
  Star,
  Shield,
  Ship,
  Factory,
  CheckCircle,
  X,
  ArrowRight,
} from "lucide-react"
import type { ManufacturingCountry } from "@/lib/data/countries"
import { MANUFACTURING_COUNTRIES } from "@/lib/data/countries"
import { getIndustriesByCountry } from "@/lib/data/industries"

// ── Helpers ───────────────────────────────────────────────────────────────────

function ratingColor(score: number): string {
  if (score >= 8) return "text-emerald-600"
  if (score >= 6) return "text-amber-600"
  return "text-red-600"
}

function ratingBg(score: number): string {
  if (score >= 8) return "bg-emerald-50 border-emerald-200"
  if (score >= 6) return "bg-amber-50 border-amber-200"
  return "bg-red-50 border-red-200"
}

function industrySlug(name: string): string {
  return name.toLowerCase().replace(/[&]/g, "and").replace(/\s+/g, "-")
}

function countrySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

/** Returns green / amber / red chip color classes based on the design spec thresholds */
function chipColors(score: number): { bg: string; text: string; border: string } {
  if (score >= 7) return { bg: "bg-[#22C55E]/10", text: "text-[#16A34A]", border: "border-[#22C55E]/30" }
  if (score >= 5) return { bg: "bg-[#F59E0B]/10", text: "text-[#B45309]", border: "border-[#F59E0B]/30" }
  return { bg: "bg-[#EF4444]/10", text: "text-[#B91C1C]", border: "border-[#EF4444]/30" }
}

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const FIT_QUESTIONS = [
  "My product requires moderate to high labor content",
  "I need lead times under 45 days",
  "My MOQ fits within typical factory minimums",
  "I'm comfortable with 30–50% deposit payment terms",
  "I've budgeted for inspection costs (1–2% of order value)",
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CountryGuideTemplate({
  country,
}: {
  country: ManufacturingCountry
}) {
  const slug = countrySlug(country.name)
  const industries = getIndustriesByCountry(country.name)

  // Interactive checklist state
  const [checked, setChecked] = useState<boolean[]>(FIT_QUESTIONS.map(() => false))
  const matchCount = checked.filter(Boolean).length

  // Related countries — pick up to 3 from the same region, excluding current
  const relatedCountries = MANUFACTURING_COUNTRIES.filter(
    (c) => c.region === country.region && c.name !== country.name
  ).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Manufacturing in ${country.name}: Complete Guide`,
    description: country.description,
    author: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bottlecap.com/manufacturers/${slug}`,
    },
    about: {
      "@type": "Country",
      name: country.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* ── Breadcrumb ─────────────────────────────────────────── */}
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/manufacturers" className="hover:text-[#FF6B35] transition-colors">
              Manufacturing Countries
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{country.name}</span>
          </nav>

          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
              Manufacturing in {country.emoji} {country.name}: Complete Guide
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
              Everything you need to know about manufacturing products in{" "}
              {country.name} &mdash; costs, quality, lead times, trade
              agreements, and how to evaluate it as a production partner.
            </p>
          </header>

          {/* ── 1. Visual Hero Stat Bar ────────────────────────────── */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex flex-wrap gap-3">
              {/* Labor cost chip */}
              <div className="flex items-center gap-2 rounded-full border border-[#E8E8E4] bg-white px-4 py-2 shadow-sm">
                <DollarSign className="h-4 w-4 text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  ${country.laborCostPerHour.toFixed(2)}/hr
                </span>
                <span className="text-xs text-[#6B6B6B]">labor</span>
              </div>

              {/* Lead time chip */}
              <div className="flex items-center gap-2 rounded-full border border-[#E8E8E4] bg-white px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  {country.avgLeadTimeDays} days
                </span>
                <span className="text-xs text-[#6B6B6B]">avg lead time</span>
              </div>

              {/* Quality rating chip */}
              {(() => {
                const c = chipColors(country.qualityRating)
                return (
                  <div
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${c.bg} ${c.border}`}
                  >
                    <Star className={`h-4 w-4 ${c.text}`} />
                    <span className={`text-sm font-semibold ${c.text}`}>
                      {country.qualityRating}/10
                    </span>
                    <span className="text-xs text-[#6B6B6B]">quality</span>
                  </div>
                )
              })()}

              {/* IP protection chip */}
              {(() => {
                const c = chipColors(country.ipProtection)
                return (
                  <div
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${c.bg} ${c.border}`}
                  >
                    <Shield className={`h-4 w-4 ${c.text}`} />
                    <span className={`text-sm font-semibold ${c.text}`}>
                      {country.ipProtection}/10
                    </span>
                    <span className="text-xs text-[#6B6B6B]">IP protection</span>
                  </div>
                )
              })()}
            </div>
          </motion.section>

          {/* ── Quick Stats Grid (3x2) ─────────────────────────────── */}
          <section className="mb-14">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Quality Rating */}
              <div className={`rounded-2xl border p-5 ${ratingBg(country.qualityRating)}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Quality Rating
                </p>
                <p className={`text-2xl font-black ${ratingColor(country.qualityRating)}`}>
                  {country.qualityRating}
                  <span className="text-base font-medium text-[#6B6B6B]">/10</span>
                </p>
              </div>

              {/* Labor Cost */}
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Labor Cost / hr
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  ${country.laborCostPerHour.toFixed(2)}
                </p>
              </div>

              {/* Avg Lead Time */}
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Avg Lead Time
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {country.avgLeadTimeDays}{" "}
                  <span className="text-base font-medium text-[#6B6B6B]">days</span>
                </p>
              </div>

              {/* Avg MOQ */}
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Avg MOQ
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {country.avgMoq.toLocaleString()}{" "}
                  <span className="text-base font-medium text-[#6B6B6B]">units</span>
                </p>
              </div>

              {/* Tariff to US */}
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Tariff to US
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {country.avgTariffToUS}%
                </p>
              </div>

              {/* IP Protection */}
              <div className={`rounded-2xl border p-5 ${ratingBg(country.ipProtection)}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  IP Protection
                </p>
                <p className={`text-2xl font-black ${ratingColor(country.ipProtection)}`}>
                  {country.ipProtection}
                  <span className="text-base font-medium text-[#6B6B6B]">/10</span>
                </p>
              </div>
            </div>
          </section>

          {/* ── Country Description ────────────────────────────────── */}
          <section className="mb-14">
            <p className="text-[#1A1A1A] leading-relaxed text-lg">
              {country.description}
            </p>
          </section>

          {/* ── 2. Best For / Watch Out For ───────────────────────── */}
          {country.strengths.length > 0 && country.weaknesses.length > 0 && (
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                Fit at a Glance
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Best For */}
                <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-[#16A34A]" />
                    <h3 className="text-base font-bold text-[#16A34A]">Best For</h3>
                  </div>
                  <ul className="space-y-2">
                    {country.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#22C55E]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Watch Out For */}
                <div className="rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="h-5 w-5 text-[#B91C1C]" />
                    <h3 className="text-base font-bold text-[#B91C1C]">Watch Out For</h3>
                  </div>
                  <ul className="space-y-2">
                    {country.weaknesses.map((w) => (
                      <li key={w} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#EF4444]" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Key Strengths (original section, preserved) ────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Key Strengths
            </h2>
            <div className="grid gap-3">
              {country.strengths.map((strength) => (
                <div
                  key={strength}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <p className="text-[#1A1A1A] leading-relaxed">{strength}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Weaknesses to Consider (original section, preserved) ─ */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Weaknesses to Consider
            </h2>
            <div className="grid gap-3">
              {country.weaknesses.map((weakness) => (
                <div
                  key={weakness}
                  className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p className="text-[#1A1A1A] leading-relaxed">{weakness}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Industry Specializations Grid ──────────────────── */}
          {country.specializations.length > 0 && (
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Factory className="h-5 w-5 text-[#FF6B35]" />
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  Manufacturing Specializations
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {country.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center rounded-full bg-[#FF6B35]/10 px-4 py-2 text-sm font-medium text-[#FF6B35] border border-[#FF6B35]/20"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── 4. Key Ports & Logistics Strip ────────────────────── */}
          {country.keyPorts.length > 0 && (
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Ship className="h-5 w-5 text-[#FF6B35]" />
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  Key Ports &amp; Logistics
                </h2>
              </div>
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-6">
                {/* Ports pill strip */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {country.keyPorts.map((port) => (
                    <span
                      key={port}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E8E4] bg-[#FAFAF8] px-3 py-1.5 text-sm font-medium text-[#1A1A1A]"
                    >
                      <Ship className="h-3.5 w-3.5 text-[#FF6B35]" />
                      {port}
                    </span>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Timezone
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">{country.timezone}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Language
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">{country.language}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Currency
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">{country.currency}</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Trade Agreements ────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Trade Agreements
            </h2>
            <div className="flex flex-wrap gap-2">
              {country.tradingBlocs.map((bloc) => (
                <span
                  key={bloc}
                  className="inline-flex items-center rounded-full bg-[#F5F5F0] px-4 py-2 text-sm font-medium text-[#1A1A1A] border border-[#E8E8E4]"
                >
                  {bloc}
                </span>
              ))}
            </div>
          </section>

          {/* ── Industries Strong in [Country] ─────────────────────── */}
          {industries.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                Industries Strong in {country.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <Link
                    key={industry.name}
                    href={`/cost-to-manufacture/${industrySlug(industry.name)}`}
                    className="group rounded-2xl border border-[#E8E8E4] bg-white p-5 hover:border-[#FF6B35]/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl" role="img" aria-label={industry.name}>
                        {industry.icon}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                        {industry.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
                      {industry.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-[#FF6B35]">
                      View cost guide &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── 5. "Is this country right for your product?" checklist */}
          <motion.section
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              Is {country.name} right for your product?
            </h2>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Check the factors that apply to your situation.
            </p>
            <div className="bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 space-y-3">
              {FIT_QUESTIONS.map((question, i) => (
                <label
                  key={i}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() =>
                      setChecked((prev) => {
                        const next = [...prev]
                        next[i] = !next[i]
                        return next
                      })
                    }
                    className="mt-1 h-4 w-4 flex-shrink-0 accent-[#FF6B35] cursor-pointer"
                  />
                  <span
                    className={`text-sm leading-relaxed transition-colors ${
                      checked[i]
                        ? "text-[#1A1A1A] font-medium"
                        : "text-[#6B6B6B] group-hover:text-[#1A1A1A]"
                    }`}
                  >
                    {question}
                  </span>
                </label>
              ))}

              {/* Dynamic match counter */}
              <div className="pt-4 border-t border-[#E8E8E4] flex items-center gap-2">
                <span
                  className={`text-sm font-bold ${
                    matchCount >= 4
                      ? "text-[#16A34A]"
                      : matchCount >= 2
                      ? "text-[#B45309]"
                      : "text-[#6B6B6B]"
                  }`}
                >
                  {matchCount}/5 factors match
                </span>
                <span className="text-xs text-[#6B6B6B]">
                  {matchCount >= 4
                    ? "— strong fit"
                    : matchCount >= 2
                    ? "— moderate fit"
                    : "— review carefully"}
                </span>
              </div>
            </div>
          </motion.section>

          {/* ── 6. Related Countries ───────────────────────────────── */}
          {relatedCountries.length > 0 && (
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                Related Countries in {country.region}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedCountries.map((rc) => (
                  <Link
                    key={rc.name}
                    href={`/manufacturers/${countrySlug(rc.name)}`}
                    className="group rounded-2xl border border-[#E8E8E4] bg-white p-5 hover:border-[#FF6B35]/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{rc.emoji}</span>
                      <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                        {rc.name}
                      </h3>
                    </div>
                    <div className="space-y-1 text-xs text-[#6B6B6B]">
                      <p>${rc.laborCostPerHour.toFixed(2)}/hr &middot; {rc.avgLeadTimeDays} day lead time</p>
                      <p>Quality {rc.qualityRating}/10 &middot; IP {rc.ipProtection}/10</p>
                    </div>
                    <p className="mt-3 text-xs font-medium text-[#FF6B35] flex items-center gap-1">
                      View guide <ArrowRight className="h-3 w-3" />
                    </p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── 7. Bottom CTA ──────────────────────────────────────── */}
          <motion.section
            className="rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
              Ready to source from {country.name}?
            </h2>
            <p className="text-[#6B6B6B] mb-6 max-w-xl mx-auto">
              Get a detailed cost breakdown, supplier recommendations, and risk
              analysis for manufacturing your product in {country.name}&mdash;delivered in
              minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-8 py-3 text-base font-semibold text-white hover:bg-[#e55f2f] transition-colors"
            >
              Analyze my product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.section>

        </div>
      </main>
    </>
  )
}
