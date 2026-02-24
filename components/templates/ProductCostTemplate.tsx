import Link from "next/link"
import type { ProductCostEntry } from "@/lib/data/product-costs"

function formatCurrency(value: number): string {
  return value >= 1000
    ? `$${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
    : `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US")
}

export default function ProductCostTemplate({
  product,
}: {
  product: ProductCostEntry
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.avgUnitCost.min,
      highPrice: product.avgUnitCost.max,
      priceCurrency: "USD",
      offerCount: product.topCountries.length,
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
        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link
            href="/"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/cost-to-manufacture"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Cost Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        {/* ── H1 ──────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <p className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wide mb-3">
            {product.category} &middot; Cost Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-4">
            How Much Does It Cost to Manufacture {product.name}?
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            A complete breakdown of unit costs, tooling, materials, shipping,
            and lead times for manufacturing {product.name.toLowerCase()}.
          </p>
        </header>

        {/* ── Quick Stats Grid (2x2) ─────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-4 mb-16">
          {/* Unit Cost */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Unit Cost
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatCurrency(product.avgUnitCost.min)}&ndash;{formatCurrency(product.avgUnitCost.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">per unit</p>
          </div>

          {/* Lead Time */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Lead Time
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {product.avgLeadTimeDays} days
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">avg. production</p>
          </div>

          {/* MOQ Range */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              MOQ Range
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatNumber(product.moqRange.min)}&ndash;{formatNumber(product.moqRange.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">units minimum</p>
          </div>

          {/* Tooling Cost */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Tooling Cost
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatCurrency(product.toolingCost.min)}&ndash;{formatCurrency(product.toolingCost.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">one-time setup</p>
          </div>
        </section>

        {/* ── Description ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Overview
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed text-lg">
            {product.description}
          </p>
        </section>

        {/* ── Cost Breakdown Table ────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Cost Breakdown
          </h2>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F0]">
                  <th className="text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Cost Component
                  </th>
                  <th className="text-right text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Range
                  </th>
                  <th className="text-right text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Unit Manufacturing Cost
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.avgUnitCost.min)}&ndash;{formatCurrency(product.avgUnitCost.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Tooling / Mold Setup
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.toolingCost.min)}&ndash;{formatCurrency(product.toolingCost.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    One-time
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Shipping per Unit
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.shippingPerUnit.min)}&ndash;{formatCurrency(product.shippingPerUnit.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
                <tr className="bg-[#F5F5F0]">
                  <td className="px-6 py-4 text-[#1A1A1A] font-bold">
                    Total Landed Cost (est.)
                  </td>
                  <td className="px-6 py-4 text-right text-[#FF6B35] font-bold">
                    {formatCurrency(product.avgUnitCost.min + product.shippingPerUnit.min)}&ndash;{formatCurrency(product.avgUnitCost.max + product.shippingPerUnit.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#6B6B6B] mt-3">
            * Tooling costs are amortized across your order quantity. Actual
            costs vary based on supplier, materials, and order volume.
          </p>
        </section>

        {/* ── Best Countries ──────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Best Manufacturing Countries
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.topCountries.map((country, i) => (
              <div
                key={country}
                className="bg-white rounded-2xl border border-[#E8E8E4] p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF3ED] flex items-center justify-center text-[#FF6B35] font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">
                    {country}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {countryNote(country, product.category)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common Materials ────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Common Materials
          </h2>
          <div className="flex flex-wrap gap-3">
            {product.materials.map((material) => (
              <span
                key={material}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#E8E8E4] text-sm font-medium text-[#1A1A1A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                {material}
              </span>
            ))}
          </div>
        </section>

        {/* ── Margin Advice ───────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Margin Advice
          </h2>
          <div className="bg-[#FFF3ED] border border-[#FFD4BB] rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed text-lg">
                {product.marginAdvice}
              </p>
            </div>
          </div>
        </section>

        {/* ── Related Products ────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Related Cost Guides
          </h2>
          <p className="text-[#6B6B6B] mb-4">
            Explore similar products in the{" "}
            <span className="font-medium text-[#1A1A1A]">
              {product.relatedIndustry}
            </span>{" "}
            industry.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/cost-to-manufacture"
              className="group bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:border-[#FF6B35] transition-colors"
            >
              <p className="text-sm text-[#6B6B6B] mb-1">Browse all</p>
              <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                All Cost Guides &rarr;
              </p>
            </Link>
            <Link
              href="/guide/materials"
              className="group bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:border-[#FF6B35] transition-colors"
            >
              <p className="text-sm text-[#6B6B6B] mb-1">Materials</p>
              <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                Materials Guide &rarr;
              </p>
            </Link>
            <Link
              href="/guide/country-comparison"
              className="group bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:border-[#FF6B35] transition-colors"
            >
              <p className="text-sm text-[#6B6B6B] mb-1">Countries</p>
              <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                Country Comparison &rarr;
              </p>
            </Link>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="bg-[#1A1A1A] rounded-2xl p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Get a precise cost breakdown for {product.name}
          </h2>
          <p className="text-[#9B9B9B] mb-8 max-w-xl mx-auto">
            Our AI analyzes your exact specifications and delivers a
            comprehensive manufacturing feasibility report in minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-3 text-lg font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Start Analysis
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </section>
      </div>
    </main>
  )
}

/**
 * Returns a brief contextual note for a manufacturing country
 * based on its known strengths and the product category.
 */
function countryNote(country: string, category: string): string {
  const notes: Record<string, string> = {
    China:
      "World's largest manufacturing hub. Excellent for high-volume production with mature supply chains and competitive pricing across virtually all product categories.",
    Vietnam:
      "Rapidly growing alternative to China with lower labor costs. Especially strong in textiles, footwear, furniture, and electronics assembly.",
    India:
      "Cost-effective for labor-intensive products. Strong in textiles, leather goods, jewelry, and pharmaceuticals. Improving infrastructure and quality standards.",
    Bangladesh:
      "Among the lowest labor costs globally. Dominant in basic apparel and textiles. Growing capability in more complex garments.",
    Taiwan:
      "Specializes in precision electronics, semiconductors, and high-tech components. Premium quality with correspondingly higher costs.",
    "South Korea":
      "Leader in displays, memory chips, and advanced electronics. Known for innovation and quality in consumer tech and automotive.",
    Indonesia:
      "Competitive in footwear, textiles, and palm-oil-based products. Large workforce with growing manufacturing sophistication.",
    Turkey:
      "Strategic location bridging Europe and Asia. Strong in textiles, ceramics, furniture, and automotive parts with quick access to EU markets.",
    Mexico:
      "Nearshoring hub for North American companies. Strong in automotive, electronics, and medical devices with USMCA trade benefits.",
    Poland:
      "Central European manufacturing base. Competitive in furniture, automotive parts, and electronics with EU market access.",
    Italy:
      "Premium craftsmanship in leather, fashion, cosmetics, and food production. Higher costs offset by luxury brand positioning.",
    Thailand:
      "Well-established automotive and electronics manufacturing. Growing in food processing and medical devices.",
  }

  return (
    notes[country] ??
    `Known manufacturing hub for ${category.toLowerCase()} products with competitive pricing and established export infrastructure.`
  )
}
