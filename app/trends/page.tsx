import type { Metadata } from "next"
import Link from "next/link"
import { TREND_REPORTS } from "@/lib/data/trending-products"

export const metadata: Metadata = {
  title: "Manufacturing Trends — Bottlecap",
  description:
    "Monthly reports on trending products and manufacturing opportunities for DTC founders. Discover what products are gaining traction and where the best margins are.",
}

export default function TrendsPage() {
  const sortedReports = [...TREND_REPORTS].sort(
    (a, b) => new Date(b.month + "-01").getTime() - new Date(a.month + "-01").getTime()
  )

  const [featured, ...rest] = sortedReports

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Trends
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            Monthly reports on trending products and manufacturing opportunities
            for DTC founders.
          </p>
        </div>
      </section>

      {/* Featured (Latest) Report */}
      {featured && (
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <Link
              href={`/trends/${featured.slug}`}
              className="group block bg-white rounded-2xl border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-[#FF6B35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Latest
                  </span>
                  <span className="bg-[#F5F5F0] text-[#6B6B6B] text-xs font-medium px-3 py-1 rounded-full">
                    {featured.topCategory}
                  </span>
                  <span className="text-xs text-[#9B9B9B]">
                    {featured.products.length} products tracked
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[#6B6B6B] leading-relaxed max-w-2xl mb-6">
                  {featured.summary}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-[#FF6B35] font-semibold text-sm">
                    View full report &rarr;
                  </span>
                  <span className="text-xs text-[#9B9B9B]">
                    Top trending:{" "}
                    {featured.products
                      .sort((a, b) => b.trendScore - a.trendScore)
                      .slice(0, 3)
                      .map((p) => p.name)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Report Grid */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">
            Previous Reports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((report) => (
              <Link
                key={report.slug}
                href={`/trends/${report.slug}`}
                className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F5F5F0] text-[#6B6B6B] text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {report.topCategory}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3 mb-4">
                  {report.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9B9B9B]">
                    {report.products.length} products
                  </span>
                  <span className="text-[#FF6B35] font-semibold text-sm">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze a trending product?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Pick any trending product and get a complete manufacturing feasibility
            report with cost breakdowns, country comparisons, and optimization
            tips in minutes.
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
