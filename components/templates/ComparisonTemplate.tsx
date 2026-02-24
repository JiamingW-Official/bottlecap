import Link from "next/link"

export interface ComparisonItem {
  name: string
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface ComparisonMetric {
  label: string
  valueA: string | number
  valueB: string | number
  winner: "A" | "B" | "tie"
}

export interface ComparisonEntry {
  slug: string
  type: "country" | "product" | "material" | "method"
  title: string
  itemA: ComparisonItem
  itemB: ComparisonItem
  metrics: ComparisonMetric[]
  verdict: string
  relatedSlugs: string[]
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

function ItemCard({ item, label }: { item: ComparisonItem; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 sm:p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-medium uppercase tracking-wider text-[#6B6B6B]">
          {label}
        </span>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1">{item.name}</h2>
      </div>

      {/* Pros */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">
          Advantages
        </h3>
        <ul className="space-y-2">
          {item.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-[#1A1A1A]">
              <CheckIcon />
              <span className="text-sm leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">
          Disadvantages
        </h3>
        <ul className="space-y-2">
          {item.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-[#1A1A1A]">
              <XIcon />
              <span className="text-sm leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best For */}
      <div className="mt-auto pt-6 border-t border-[#E8E8E4]">
        <h3 className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Best For
        </h3>
        <p className="text-sm text-[#1A1A1A] leading-relaxed font-medium">
          {item.bestFor}
        </p>
      </div>
    </div>
  )
}

function MetricsTable({ metrics }: { metrics: ComparisonMetric[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-[#F5F5F0] border-b border-[#E8E8E4]">
        <div className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider">
          Metric
        </div>
        <div className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider text-center">
          Option A
        </div>
        <div className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider text-center">
          Option B
        </div>
      </div>

      {/* Rows */}
      {metrics.map((metric, i) => (
        <div
          key={i}
          className={`grid grid-cols-3 gap-4 px-6 py-4 ${
            i !== metrics.length - 1 ? "border-b border-[#E8E8E4]" : ""
          }`}
        >
          <div className="text-sm font-medium text-[#1A1A1A]">
            {metric.label}
          </div>
          <div
            className={`text-sm text-center ${
              metric.winner === "A"
                ? "font-bold text-[#1A1A1A]"
                : metric.winner === "tie"
                  ? "font-semibold text-[#1A1A1A]"
                  : "text-[#6B6B6B]"
            }`}
          >
            <span
              className={
                metric.winner === "A"
                  ? "bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-md font-bold"
                  : ""
              }
            >
              {metric.valueA}
            </span>
          </div>
          <div
            className={`text-sm text-center ${
              metric.winner === "B"
                ? "font-bold text-[#1A1A1A]"
                : metric.winner === "tie"
                  ? "font-semibold text-[#1A1A1A]"
                  : "text-[#6B6B6B]"
            }`}
          >
            <span
              className={
                metric.winner === "B"
                  ? "bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-md font-bold"
                  : ""
              }
            >
              {metric.valueB}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ComparisonTemplate({
  comparison,
  allComparisons,
}: {
  comparison: ComparisonEntry
  allComparisons: ComparisonEntry[]
}) {
  const related = allComparisons.filter((c) =>
    comparison.relatedSlugs.includes(c.slug)
  )

  const typeLabels: Record<ComparisonEntry["type"], string> = {
    country: "Country Comparison",
    product: "Product Comparison",
    material: "Material Comparison",
    method: "Method Comparison",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.verdict,
    author: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.io",
    },
    publisher: {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.io",
      logo: {
        "@type": "ImageObject",
        url: "https://bottlecap.io/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bottlecap.io/compare/${comparison.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link
              href="/"
              className="hover:text-[#FF6B35] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/compare"
              className="hover:text-[#FF6B35] transition-colors"
            >
              Comparisons
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{comparison.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full mb-4">
              {typeLabels[comparison.type]}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-4">
              {comparison.title}
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
              A detailed side-by-side comparison of{" "}
              <strong className="text-[#1A1A1A]">{comparison.itemA.name}</strong>{" "}
              and{" "}
              <strong className="text-[#1A1A1A]">{comparison.itemB.name}</strong>{" "}
              to help you make a smarter manufacturing decision.
            </p>
          </header>

          {/* Side-by-Side Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Side-by-Side Comparison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ItemCard item={comparison.itemA} label="Option A" />
              <ItemCard item={comparison.itemB} label="Option B" />
            </div>
          </section>

          {/* Metrics Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Key Metrics
            </h2>
            <MetricsTable metrics={comparison.metrics} />
            <p className="text-xs text-[#6B6B6B] mt-3">
              Winners are highlighted in orange. Ties indicate roughly equivalent
              performance.
            </p>
          </section>

          {/* Verdict */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              Verdict
            </h2>
            <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                    Our Take
                  </h3>
                  <p className="text-[#1A1A1A] leading-relaxed">
                    {comparison.verdict}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Comparisons */}
          {related.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                Related Comparisons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/compare/${rel.slug}`}
                    className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      {typeLabels[rel.type]}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-1 group-hover:text-[#FF6B35] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] mt-2">
                      {rel.itemA.name} vs {rel.itemB.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Need a detailed analysis?
            </h2>
            <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto leading-relaxed">
              Get a complete manufacturing feasibility report tailored to your
              specific product idea, with cost breakdowns, supplier
              recommendations, and optimization tips.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Get your Bottlecap report &rarr;
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
