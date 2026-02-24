import Link from "next/link"
import type { ManufacturingCountry } from "@/lib/data/countries"
import { getIndustriesByCountry } from "@/lib/data/industries"

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

export default function CountryGuideTemplate({
  country,
}: {
  country: ManufacturingCountry
}) {
  const slug = country.name.toLowerCase().replace(/\s+/g, "-")
  const industries = getIndustriesByCountry(country.name)

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
            <Link
              href="/"
              className="hover:text-[#FF6B35] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/manufacturers"
              className="hover:text-[#FF6B35] transition-colors"
            >
              Manufacturing Countries
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{country.name}</span>
          </nav>

          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
              Manufacturing in {country.emoji} {country.name}: Complete Guide
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
              Everything you need to know about manufacturing products in{" "}
              {country.name} &mdash; costs, quality, lead times, trade
              agreements, and how to evaluate it as a production partner.
            </p>
          </header>

          {/* ── Quick Stats Grid (3x2) ─────────────────────────────── */}
          <section className="mb-14">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Quality Rating */}
              <div
                className={`rounded-2xl border p-5 ${ratingBg(country.qualityRating)}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Quality Rating
                </p>
                <p
                  className={`text-2xl font-black ${ratingColor(country.qualityRating)}`}
                >
                  {country.qualityRating}
                  <span className="text-base font-medium text-[#6B6B6B]">
                    /10
                  </span>
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
                  <span className="text-base font-medium text-[#6B6B6B]">
                    days
                  </span>
                </p>
              </div>

              {/* Avg MOQ */}
              <div className="rounded-2xl border border-[#E8E8E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  Avg MOQ
                </p>
                <p className="text-2xl font-black text-[#1A1A1A]">
                  {country.avgMoq.toLocaleString()}{" "}
                  <span className="text-base font-medium text-[#6B6B6B]">
                    units
                  </span>
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
              <div
                className={`rounded-2xl border p-5 ${ratingBg(country.ipProtection)}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  IP Protection
                </p>
                <p
                  className={`text-2xl font-black ${ratingColor(country.ipProtection)}`}
                >
                  {country.ipProtection}
                  <span className="text-base font-medium text-[#6B6B6B]">
                    /10
                  </span>
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

          {/* ── Key Strengths ──────────────────────────────────────── */}
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

          {/* ── Weaknesses to Consider ─────────────────────────────── */}
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

          {/* ── Manufacturing Specializations ──────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Manufacturing Specializations
            </h2>
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
          </section>

          {/* ── Key Ports & Logistics ──────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Key Ports &amp; Logistics
            </h2>
            <div className="rounded-2xl border border-[#E8E8E4] bg-white p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] mb-3">
                    Major Ports
                  </h3>
                  <ul className="space-y-2">
                    {country.keyPorts.map((port) => (
                      <li key={port} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0 text-[#FF6B35]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <span className="text-[#1A1A1A]">{port}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Timezone
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">
                      {country.timezone}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Language
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">
                      {country.language}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1">
                      Currency
                    </h3>
                    <p className="text-[#1A1A1A] font-medium">
                      {country.currency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

          {/* ── CTA ────────────────────────────────────────────────── */}
          <section className="rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
              Get a Manufacturing Analysis for {country.name}
            </h2>
            <p className="text-[#6B6B6B] mb-6 max-w-xl mx-auto">
              Receive a detailed cost breakdown, supplier recommendations, and
              risk analysis for manufacturing your product in {country.name}
              &mdash; delivered in minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-8 py-3 text-base font-semibold text-white hover:bg-[#e55f2f] transition-colors"
            >
              Start Your Analysis
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
