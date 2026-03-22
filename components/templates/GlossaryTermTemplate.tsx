"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Lightbulb, BookOpen, ArrowRight } from "lucide-react"
import { GLOSSARY_TERMS, getTermBySlug } from "@/lib/data/glossary"

interface GlossaryTerm {
  slug: string
  term: string
  acronym?: string
  definition: string
  longDescription: string
  category: "Trade Terms" | "Manufacturing" | "Quality" | "Logistics" | "Finance" | "Legal"
  relatedTerms: string[]
  practicalTip: string
}

interface GlossaryTermTemplateProps {
  term: GlossaryTerm
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "Trade Terms":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "Manufacturing":
      return "bg-purple-50 text-purple-700 border-purple-200"
    case "Quality":
      return "bg-green-50 text-green-700 border-green-200"
    case "Logistics":
      return "bg-amber-50 text-amber-700 border-amber-200"
    case "Finance":
      return "bg-rose-50 text-rose-700 border-rose-200"
    case "Legal":
      return "bg-slate-50 text-slate-700 border-slate-200"
    default:
      return "bg-[#F5F5F0] text-[#6B6B6B] border-[#E8E8E4]"
  }
}

function getUsageExamples(term: GlossaryTerm): string[] {
  const t = term.term
  const acr = term.acronym ? ` (${term.acronym})` : ""

  switch (term.category) {
    case "Trade Terms":
      return [
        `When requesting quotes: "Please provide your best ${acr ? term.acronym || t : t} price for 500 units shipped to Los Angeles."`,
        `When reviewing shipping documents: "The bill of lading shows the goods were transferred under ${t}${acr} terms at the port of Shenzhen."`,
        `When negotiating payment: "We'd like to confirm whether your quoted price is on ${t}${acr} basis before finalizing the purchase order."`,
      ]
    case "Manufacturing":
      return [
        `When briefing a factory: "We need the ${t}${acr} process clearly documented in your quality control plan."`,
        `When reviewing samples: "Can you confirm which ${t}${acr} standard was applied during production of these samples?"`,
        `When placing an order: "The purchase order includes a clause requiring ${t}${acr} compliance for all production runs."`,
      ]
    case "Quality":
      return [
        `When setting requirements: "Our spec sheet references the ${t}${acr} threshold — all units must meet or exceed this before shipment."`,
        `When reviewing an inspection report: "The third-party inspector flagged two units that failed the ${t}${acr} check."`,
        `When negotiating with a supplier: "What is your factory's standard ${t}${acr} rejection rate, and how do you handle non-conforming units?"`,
      ]
    case "Logistics":
      return [
        `When booking freight: "Our freight forwarder asked which ${t}${acr} option we prefer for this LCL shipment."`,
        `When tracking a shipment: "The ${t}${acr} status shows the container departed the origin port on schedule."`,
        `When managing delivery: "We use ${t}${acr} for all inbound shipments to keep lead times predictable."`,
      ]
    case "Finance":
      return [
        `When arranging payment: "The factory requires a ${t}${acr} before they'll book production time on their line."`,
        `When reviewing an invoice: "Our accountant flagged the ${t}${acr} terms on this supplier invoice — make sure they match the contract."`,
        `When negotiating terms: "We proposed net-30 but the supplier countered with ${t}${acr} — standard for first-time buyers."`,
      ]
    case "Legal":
      return [
        `When drafting a contract: "Section 4 of the supplier agreement covers ${t}${acr} obligations for both parties."`,
        `When a dispute arises: "Our legal team referenced the ${t}${acr} clause when the shipment arrived non-compliant."`,
        `When onboarding a supplier: "All new vendors must sign an NDA acknowledging ${t}${acr} requirements before receiving design files."`,
      ]
    default:
      return [
        `When working with suppliers: "Make sure the ${t}${acr} terms are clearly stated in your purchase order."`,
        `When reviewing documents: "The contract's ${t}${acr} clause determines your liability in case of a dispute."`,
        `When negotiating: "Understanding ${t}${acr} gives you leverage when finalizing supplier agreements."`,
      ]
  }
}

export default function GlossaryTermTemplate({ term }: GlossaryTermTemplateProps) {
  const relatedTermData = term.relatedTerms
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean) as GlossaryTerm[]

  // Same-category terms (sidebar)
  const sameCategoryTerms = GLOSSARY_TERMS
    .filter((t) => t.category === term.category && t.slug !== term.slug)
    .slice(0, 4)

  // Prev/next navigation using alphabetical sort
  const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) =>
    a.term.localeCompare(b.term)
  )
  const currentIndex = sortedTerms.findIndex((t) => t.slug === term.slug)
  const prevTerm = currentIndex > 0 ? sortedTerms[currentIndex - 1] : null
  const nextTerm = currentIndex < sortedTerms.length - 1 ? sortedTerms[currentIndex + 1] : null

  // First sentence of definition for quick reference
  const firstSentence = term.definition.split(". ")[0] + "."

  const usageExamples = getUsageExamples(term)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Manufacturing Glossary",
    },
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Back to Glossary breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B] hover:text-[#FF6B35] transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Glossary
          </Link>
        </motion.div>

        {/* Full breadcrumb trail */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10"
        >
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-[#FF6B35] transition-colors">
            Glossary
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{term.term}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

          {/* ── Main column ── */}
          <div>

            {/* Header */}
            <motion.header
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(term.category)}`}
                >
                  {term.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
                {term.term}
                {term.acronym && (
                  <span className="text-[#6B6B6B] font-bold"> ({term.acronym})</span>
                )}
              </h1>
            </motion.header>

            {/* Short Definition — highlighted box */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-10"
            >
              <p className="text-lg text-[#1A1A1A] leading-relaxed font-medium">
                {term.definition}
              </p>
            </motion.div>

            {/* Long Description */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mb-10"
            >
              {term.longDescription.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="text-[#1A1A1A] leading-relaxed mb-5 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* "Why it matters" callout */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#FFF0EB] border border-[#FF6B35]/20 rounded-2xl p-5 mb-10 flex items-start gap-4"
            >
              <div className="shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1A1A1A] mb-1">Why it matters</h2>
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  {term.practicalTip
                    ? term.practicalTip
                    : "Understanding this term helps you negotiate better supplier contracts and avoid costly mistakes."}
                </p>
              </div>
            </motion.div>

            {/* Practical Tip callout (legacy — shown only when distinct from practicalTip) */}
            {term.practicalTip && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-[#FFF4EE] rounded-2xl border border-[#FFD4BC] p-8 mb-10"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0" aria-hidden="true">
                    💡
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">
                      Practical Tip
                    </h2>
                    <p className="text-[#1A1A1A] leading-relaxed">
                      {term.practicalTip}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Usage Examples — "You'll hear this when..." */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FF6B35]" />
                You&apos;ll hear this when&hellip;
              </h2>
              <div className="space-y-3">
                {usageExamples.map((example, idx) => {
                  const [label, ...rest] = example.split(": ")
                  const body = rest.join(": ")
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#E8E8E4] p-5"
                    >
                      <p className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wide mb-1">
                        {label}
                      </p>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed italic">
                        &ldquo;{body}&rdquo;
                      </p>
                    </div>
                  )
                })}
              </div>
            </motion.section>

            {/* Related Terms */}
            {relatedTermData.length > 0 && (
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  Related Terms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTermData.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/glossary/${related.slug}`}
                      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                          {related.term}
                        </h3>
                        {related.acronym && (
                          <span className="shrink-0 text-xs font-mono font-semibold bg-[#F5F5F0] text-[#6B6B6B] rounded-lg px-2 py-1">
                            {related.acronym}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
                        {related.definition}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA strip */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#FF6B35] rounded-2xl p-8 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
            >
              <div>
                <p className="text-white font-bold text-lg leading-snug">
                  This term appears in every Bottlecap report.
                </p>
                <p className="text-white/80 text-sm mt-1">
                  See it in action — explore a full sample analysis.
                </p>
              </div>
              <Link
                href="/report/demo"
                className="shrink-0 inline-flex items-center gap-2 bg-white text-[#FF6B35] font-semibold px-6 py-3 rounded-full hover:bg-[#FFF0EB] transition-colors whitespace-nowrap"
              >
                View sample report
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-8 text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                Ready to put this knowledge to work?
              </h2>
              <p className="text-[#6B6B6B] mb-6 max-w-lg mx-auto">
                Get a complete manufacturing feasibility report for your product
                idea — with cost breakdowns, supplier recommendations, and
                optimization tips.
              </p>
              <Link
                href="/analyze"
                className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Analyze my idea &rarr;
              </Link>
            </motion.div>

            {/* Prev / Next navigation */}
            <motion.nav
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-4"
              aria-label="Glossary term navigation"
            >
              {prevTerm ? (
                <Link
                  href={`/glossary/${prevTerm.slug}`}
                  className="group flex flex-col gap-1 bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-md transition-all"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </span>
                  <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                    {prevTerm.term}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextTerm ? (
                <Link
                  href={`/glossary/${nextTerm.slug}`}
                  className="group flex flex-col gap-1 bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-md transition-all text-right"
                >
                  <span className="inline-flex items-center justify-end gap-1 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                    {nextTerm.term}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </motion.nav>
          </div>

          {/* ── Sidebar column ── */}
          <aside className="space-y-6">

            {/* Quick Reference card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#F5F5F0] rounded-2xl p-4 sticky top-6"
            >
              <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-4">
                Quick Reference
              </h3>

              <div className="space-y-3">
                {/* Category */}
                <div>
                  <p className="text-xs text-[#6B6B6B] mb-1">Category</p>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(term.category)}`}
                  >
                    {term.category}
                  </span>
                </div>

                {/* Acronym */}
                {term.acronym && (
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Acronym</p>
                    <span className="font-mono font-bold text-[#1A1A1A] text-sm">
                      {term.acronym}
                    </span>
                  </div>
                )}

                {/* One-line definition */}
                <div>
                  <p className="text-xs text-[#6B6B6B] mb-1">In one sentence</p>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed">
                    {firstSentence}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Same-category terms */}
            {sameCategoryTerms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-3">
                  More {term.category}
                </h3>
                <div className="space-y-2">
                  {sameCategoryTerms.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/glossary/${t.slug}`}
                      className="group flex items-center justify-between gap-2 bg-white rounded-xl p-3 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-sm transition-all"
                    >
                      <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                        {t.term}
                      </span>
                      {("acronym" in t) && (t as { acronym?: string }).acronym && (
                        <span className="shrink-0 text-xs font-mono font-semibold bg-[#F5F5F0] text-[#6B6B6B] rounded px-1.5 py-0.5">
                          {(t as { acronym?: string }).acronym}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/glossary"
                  className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#FF6B35] hover:underline"
                >
                  View all terms
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}
          </aside>

        </div>
      </div>
    </main>
  )
}
