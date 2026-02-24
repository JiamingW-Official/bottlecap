import Link from "next/link"
import { getTermBySlug } from "@/lib/data/glossary"

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

export default function GlossaryTermTemplate({ term }: GlossaryTermTemplateProps) {
  const relatedTermData = term.relatedTerms
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean) as GlossaryTerm[]

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

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-[#FF6B35] transition-colors">
            Glossary
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{term.term}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-[#F5F5F0] text-[#6B6B6B] text-xs font-semibold rounded-full border border-[#E8E8E4]">
              {term.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            {term.term}
            {term.acronym && (
              <span className="text-[#6B6B6B] font-bold"> ({term.acronym})</span>
            )}
          </h1>
        </header>

        {/* Short Definition - Highlighted Box */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-10">
          <p className="text-lg text-[#1A1A1A] leading-relaxed font-medium">
            {term.definition}
          </p>
        </div>

        {/* Long Description */}
        <div className="mb-10">
          {term.longDescription.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1A1A1A] leading-relaxed mb-5 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Practical Tip Callout */}
        <div className="bg-[#FFF4EE] rounded-2xl border border-[#FFD4BC] p-8 mb-10">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0" aria-hidden="true">
              Tip:
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
        </div>

        {/* Related Terms */}
        {relatedTermData.length > 0 && (
          <div className="mb-12">
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
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 text-center">
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
        </div>
      </div>
    </main>
  )
}
