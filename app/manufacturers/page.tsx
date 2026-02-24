import type { Metadata } from "next"
import Link from "next/link"
import { MANUFACTURING_COUNTRIES } from "@/lib/data/countries"

export const metadata: Metadata = {
  title: "Manufacturing Countries — Find the Best Country for Your Product | Bottlecap",
  description:
    "Compare 12+ manufacturing countries on cost, quality, lead time, IP protection, and specializations. Find the best country to manufacture your product.",
}

export default function ManufacturersPage() {
  const regions = Array.from(
    new Set(MANUFACTURING_COUNTRIES.map((c) => c.region))
  )

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Manufacturing Countries</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
            Manufacturing Countries
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6 leading-relaxed">
            In-depth guides to the world&apos;s top manufacturing countries.
            Compare labor costs, quality ratings, lead times, and
            specializations to find the right fit for your product.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {regions.map((region) => {
            const countries = MANUFACTURING_COUNTRIES.filter(
              (c) => c.region === region
            )
            return (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  {region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {countries.map((country) => (
                    <Link
                      key={country.code}
                      href={`/manufacturers/${country.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#FF6B35] hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{country.emoji}</span>
                        <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                          {country.name}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="text-xs">
                          <span className="text-[#9B9B9B]">Quality</span>
                          <div className="font-semibold text-[#1A1A1A]">
                            {country.qualityRating}/10
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-[#9B9B9B]">Labor/hr</span>
                          <div className="font-semibold text-[#1A1A1A]">
                            ${country.laborCostPerHour}
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-[#9B9B9B]">Lead Time</span>
                          <div className="font-semibold text-[#1A1A1A]">
                            {country.avgLeadTimeDays} days
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-[#9B9B9B]">US Tariff</span>
                          <div className="font-semibold text-[#1A1A1A]">
                            {country.avgTariffToUS}%
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {country.specializations.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-0.5 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
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
            Not sure which country is right?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a personalized country comparison based on your specific product,
            budget, and timeline. Our AI analyzes the best manufacturing fit.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Get Country Recommendation — $99
          </Link>
        </div>
      </section>
    </main>
  )
}
