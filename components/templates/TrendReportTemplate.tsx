import Link from "next/link"
import type { MonthlyTrendReport, TrendingProduct } from "@/lib/data/trending-products"
import { TREND_REPORTS } from "@/lib/data/trending-products"

interface TrendReportTemplateProps {
  report: MonthlyTrendReport
}

function getTrendScoreColor(score: number): string {
  if (score >= 80) return "bg-[#FF6B35] text-white"
  if (score >= 60) return "bg-[#FF6B35]/80 text-white"
  if (score >= 40) return "bg-[#FF6B35]/50 text-[#1A1A1A]"
  return "bg-[#FF6B35]/25 text-[#1A1A1A]"
}

function getTrendBarWidth(score: number): string {
  return `${score}%`
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function calculateMarginPercent(product: TrendingProduct): number {
  const avgRetail = (product.avgRetailPrice.min + product.avgRetailPrice.max) / 2
  const avgCost = (product.avgManufacturingCost.min + product.avgManufacturingCost.max) / 2
  if (avgCost === 0) return 0
  return Math.round(((avgRetail - avgCost) / avgRetail) * 100)
}

function getNavigation(currentSlug: string) {
  const sorted = [...TREND_REPORTS].sort(
    (a, b) => new Date(a.month + "-01").getTime() - new Date(b.month + "-01").getTime()
  )
  const currentIndex = sorted.findIndex((r) => r.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  }
}

function ProductCard({ product, isBestMargin }: { product: TrendingProduct; isBestMargin: boolean }) {
  const margin = calculateMarginPercent(product)

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 shadow-sm hover:shadow-md transition-shadow relative">
      {isBestMargin && (
        <div className="absolute -top-3 right-4 bg-[#22C55E] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Best Margin Opportunity
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#1A1A1A] truncate">{product.name}</h3>
          <span className="inline-block bg-[#F5F5F0] text-[#6B6B6B] text-xs font-medium px-2.5 py-0.5 rounded-full mt-1">
            {product.category}
          </span>
        </div>
        <div className={`shrink-0 rounded-xl px-3 py-1.5 text-sm font-bold ${getTrendScoreColor(product.trendScore)}`}>
          {product.trendScore}
        </div>
      </div>

      {/* Trend Score Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#9B9B9B] mb-1">
          <span>Trend Score</span>
          <span>{product.trendScore}/100</span>
        </div>
        <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6B35] rounded-full transition-all"
            style={{ width: getTrendBarWidth(product.trendScore) }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Search Volume</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {product.searchVolume}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">YoY Growth</p>
          <p className={`font-semibold text-sm ${product.yoyGrowth.startsWith("-") ? "text-[#EF4444]" : "text-[#22C55E]"}`}>
            {product.yoyGrowth}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Retail Price</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {formatCurrency(product.avgRetailPrice.min)} &ndash; {formatCurrency(product.avgRetailPrice.max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">Mfg. Cost</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">
            {formatCurrency(product.avgManufacturingCost.min)} &ndash; {formatCurrency(product.avgManufacturingCost.max)}
          </p>
        </div>
      </div>

      {/* Margin */}
      <div className="bg-[#F5F5F0] rounded-xl px-3 py-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#6B6B6B]">Est. Gross Margin</span>
          <span className={`text-sm font-bold ${margin >= 60 ? "text-[#22C55E]" : margin >= 40 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
            {margin}%
          </span>
        </div>
      </div>

      {/* Platforms */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.topPlatforms.map((platform) => (
          <span
            key={platform}
            className="bg-white border border-[#E8E8E4] text-[#6B6B6B] text-xs px-2 py-0.5 rounded-md"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Why Trending */}
      <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.whyTrending}</p>
    </div>
  )
}

export default function TrendReportTemplate({ report }: TrendReportTemplateProps) {
  const { prev, next } = getNavigation(report.slug)
  const sortedProducts = [...report.products].sort((a, b) => b.trendScore - a.trendScore)

  // Find the product with the best margin opportunity
  const bestMarginProduct = [...report.products].sort(
    (a, b) => calculateMarginPercent(b) - calculateMarginPercent(a)
  )[0]

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bottlecap.io"

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: report.title,
    description: report.summary,
    url: `${baseUrl}/trends/${report.slug}`,
    datePublished: `${report.month}-01`,
    publisher: {
      "@type": "Organization",
      name: "Bottlecap",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/trends/${report.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/trends" className="hover:text-[#FF6B35] transition-colors">
            Trends
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{report.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            {report.title}
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            {report.summary}
          </p>
        </header>

        {/* Top Category + Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs text-[#9B9B9B] uppercase tracking-wide mb-2">
              Top Category This Month
            </p>
            <span className="inline-block bg-[#FF6B35] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {report.topCategory}
            </span>
            <p className="text-sm text-[#6B6B6B] mt-3">
              {sortedProducts.filter((p) => p.category === report.topCategory).length} of{" "}
              {sortedProducts.length} trending products are in this category.
            </p>
          </div>
          <div className="bg-[#FFF0EB] rounded-2xl border border-[#FF6B35]/20 p-6">
            <p className="text-xs text-[#FF6B35] uppercase tracking-wide font-semibold mb-2">
              Key Insight
            </p>
            <p className="text-[#1A1A1A] leading-relaxed font-medium">
              {report.insight}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#1A1A1A]">{sortedProducts.length}</p>
            <p className="text-xs text-[#6B6B6B] mt-1">Products Tracked</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#22C55E]">
              {sortedProducts.filter((p) => !p.yoyGrowth.startsWith("-")).length}
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Growing YoY</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#FF6B35]">
              {sortedProducts[0]?.trendScore || 0}
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Top Trend Score</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 text-center">
            <p className="text-2xl font-black text-[#1A1A1A]">
              {bestMarginProduct ? calculateMarginPercent(bestMarginProduct) : 0}%
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">Best Margin</p>
          </div>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Trending Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                isBestMargin={bestMarginProduct?.slug === product.slug}
              />
            ))}
          </div>
        </section>

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between border-t border-[#E8E8E4] pt-8 mb-16">
          {prev ? (
            <Link
              href={`/trends/${prev.slug}`}
              className="group flex items-center gap-2 text-sm"
            >
              <span className="text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors">
                &larr;
              </span>
              <div>
                <p className="text-xs text-[#9B9B9B]">Previous</p>
                <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/trends/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-right"
            >
              <div>
                <p className="text-xs text-[#9B9B9B]">Next</p>
                <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                  {next.title}
                </p>
              </div>
              <span className="text-[#9B9B9B] group-hover:text-[#FF6B35] transition-colors">
                &rarr;
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
            Analyze any of these products
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a full manufacturing feasibility report for any trending product
            — cost breakdowns, country comparisons, supplier recommendations, and
            optimization tips. Delivered in under 5 minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Analyze my idea &rarr;
          </Link>
        </section>
      </div>
    </main>
  )
}
