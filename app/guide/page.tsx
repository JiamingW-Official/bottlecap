import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Manufacturing Guides — Bottlecap",
  description:
    "Free manufacturing guides for founders and product creators. Learn about manufacturing processes, country comparisons, materials, and supplier sourcing.",
}

const guides = [
  {
    icon: "🏭",
    title: "Manufacturing 101",
    description:
      "Everything you need to know about product manufacturing — from idea validation to mass production. The complete beginner's guide.",
    href: "/guide/manufacturing-101",
  },
  {
    icon: "🌍",
    title: "Country Comparison",
    description:
      "China vs. Vietnam vs. India vs. Mexico and more. Compare 8 top manufacturing countries on cost, quality, lead time, and IP protection.",
    href: "/guide/country-comparison",
  },
  {
    icon: "🧱",
    title: "Materials Guide",
    description:
      "Metals, plastics, natural materials, and composites — understand your options, costs, and trade-offs for every material category.",
    href: "/guide/materials",
  },
  {
    icon: "🤝",
    title: "Supplier Sourcing",
    description:
      "How to find, evaluate, and negotiate with manufacturers. Includes RFQ templates, red flags to watch for, and IP protection strategies.",
    href: "/guide/sourcing",
  },
]

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Guides
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            Free, practical guides for founders and product creators. Whether
            you&apos;re exploring your first product idea or scaling production,
            these resources will help you make smarter manufacturing decisions.
          </p>
        </div>
      </section>

      {/* Guide Grid */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
              >
                <span className="text-4xl block mb-4">{guide.icon}</span>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {guide.title}
                </h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-4">
                  {guide.description}
                </p>
                <span className="text-[#FF6B35] font-semibold text-sm">
                  Read guide &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your product idea?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Skip the research. Get a complete manufacturing feasibility report
            with cost breakdowns, country comparisons, and optimization tips in
            minutes.
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
