import type { Metadata } from "next"
import Link from "next/link"
import { PRODUCT_COSTS } from "@/lib/data/product-costs"

export const metadata: Metadata = {
  title: "Cost to Manufacture — Product Cost Guides | Bottlecap",
  description:
    "How much does it cost to manufacture your product? Browse 50+ detailed cost breakdowns for popular DTC products including unit costs, tooling, MOQ, and shipping.",
}

export default function CostToManufacturePage() {
  const categories = Array.from(new Set(PRODUCT_COSTS.map((p) => p.category)))

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Cost Guides</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Cost to Manufacture
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            Detailed cost breakdowns for 50+ popular products. See real unit
            costs, tooling estimates, MOQ ranges, and margin advice for each
            product category.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {categories.map((category) => {
            const products = PRODUCT_COSTS.filter(
              (p) => p.category === category
            )
            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/cost-to-manufacture/${product.slug}`}
                      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#FF6B35]">
                          ${product.avgUnitCost.min} - ${product.avgUnitCost.max}
                          /unit
                        </span>
                        <span className="text-xs text-[#9B9B9B]">
                          {product.avgLeadTimeDays} days
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
            Need a precise cost breakdown?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            These are industry averages. Get a cost analysis tailored to your
            exact product specifications, materials, and target markets.
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
