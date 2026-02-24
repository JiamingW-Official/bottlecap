import type { Metadata } from "next"
import Link from "next/link"
import { COMPARISONS } from "@/lib/data/comparisons"

export const metadata: Metadata = {
  title: "Manufacturing Comparisons — Country, Material & Method Comparisons | Bottlecap",
  description:
    "Side-by-side comparisons for manufacturing decisions. Compare countries, materials, shipping methods, and sourcing strategies to make smarter choices.",
}

export default function ComparePage() {
  const types = [
    { key: "country", label: "Country vs Country", icon: "🌍" },
    { key: "method", label: "Method & Strategy", icon: "⚙️" },
    { key: "material", label: "Material vs Material", icon: "🧱" },
  ] as const

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Comparisons</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Comparisons
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            Side-by-side comparisons to help you make better manufacturing
            decisions. Compare countries, materials, methods, and strategies
            with real data and actionable verdicts.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {types.map(({ key, label, icon }) => {
            const items = COMPARISONS.filter((c) => c.type === key)
            if (items.length === 0) return null
            return (
              <div key={key} className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <span>{icon}</span> {label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((comparison) => (
                    <Link
                      key={comparison.slug}
                      href={`/compare/${comparison.slug}`}
                      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                        {comparison.title}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">
                        {comparison.verdict}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#9B9B9B]">
                        <span>{comparison.metrics.length} metrics compared</span>
                        <span className="text-[#FF6B35] font-semibold">
                          Read comparison &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Need a custom comparison?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a detailed comparison tailored to your specific product,
            including country rankings, cost analysis, and personalized
            recommendations.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Get Custom Analysis — $99
          </Link>
        </div>
      </section>
    </main>
  )
}
