import type { Metadata } from "next"
import Link from "next/link"
import { GLOSSARY_TERMS, getTermsByCategory } from "@/lib/data/glossary"

export const metadata: Metadata = {
  title: "Manufacturing Glossary — Bottlecap",
  description:
    "A comprehensive glossary of manufacturing terms, trade terminology, quality standards, and logistics jargon. Learn the language of product manufacturing.",
}

const CATEGORIES = [
  "Trade Terms",
  "Manufacturing",
  "Quality",
  "Logistics",
  "Finance",
  "Legal",
] as const

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Glossary
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            From MOQs to FOB, manufacturing has its own language. This glossary
            covers {GLOSSARY_TERMS.length} essential terms every founder and
            product creator should know.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const count = getTermsByCategory(category).length
              return (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8E8E4] text-sm font-medium text-[#1A1A1A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  {category}
                  <span className="text-xs text-[#6B6B6B] bg-[#F5F5F0] rounded-full px-2 py-0.5">
                    {count}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Terms by Category */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {CATEGORIES.map((category) => {
            const terms = getTermsByCategory(category)
            if (terms.length === 0) return null
            return (
              <div
                key={category}
                id={category.toLowerCase().replace(/\s+/g, "-")}
                className="mb-16 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 pb-3 border-b border-[#E8E8E4]">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                          {term.term}
                        </h3>
                        {term.acronym && (
                          <span className="shrink-0 text-xs font-mono font-semibold bg-[#F5F5F0] text-[#6B6B6B] rounded-lg px-2 py-1">
                            {term.acronym}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
                        {term.definition}
                      </p>
                      <span className="inline-block mt-3 text-[#FF6B35] font-semibold text-sm">
                        Learn more &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your product idea?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Now that you know the terminology, put it to work. Get a complete
            manufacturing feasibility report with cost breakdowns, supplier
            recommendations, and optimization tips in minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Analyze my idea &rarr;
          </Link>
        </div>
      </section>
    </main>
  )
}
