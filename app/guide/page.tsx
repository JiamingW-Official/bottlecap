import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Manufacturing Guides — Bottlecap",
  description:
    "Free manufacturing guides for founders and product creators. Learn about manufacturing processes, country comparisons, materials, and supplier sourcing.",
}

const fundamentals = [
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

const byCategory = [
  {
    icon: "💡",
    title: "Electronics Manufacturing",
    description:
      "PCB assembly, enclosures, certifications, and more. Everything you need to manufacture electronic products from IoT to wearables.",
    href: "/guide/electronics-manufacturing",
  },
  {
    icon: "👕",
    title: "Apparel Manufacturing",
    description:
      "Cut & sew, tech packs, fabric sourcing, and sizing. The complete guide to manufacturing clothing and textile products.",
    href: "/guide/apparel-manufacturing",
  },
  {
    icon: "💄",
    title: "Cosmetics Manufacturing",
    description:
      "Formulations, FDA compliance, packaging, and private labeling. How to manufacture beauty and personal care products.",
    href: "/guide/cosmetics-manufacturing",
  },
  {
    icon: "🍽️",
    title: "Food & Beverage Packaging",
    description:
      "Materials, food safety compliance, labeling, and sustainability. Manufacturing packaging for food and beverage products.",
    href: "/guide/food-manufacturing",
  },
  {
    icon: "🪑",
    title: "Furniture Manufacturing",
    description:
      "Materials, flat-pack vs assembled, shipping challenges, and quality control for manufacturing furniture products.",
    href: "/guide/furniture-manufacturing",
  },
]

const deepDives = [
  {
    icon: "🚢",
    title: "Shipping & Logistics",
    description:
      "Ocean freight, air freight, customs clearance, and freight forwarders. Everything you need to get products from factory to warehouse.",
    href: "/guide/shipping-logistics",
  },
  {
    icon: "✅",
    title: "Quality Control",
    description:
      "AQL standards, pre-shipment inspections, factory audits, and building a quality system for manufacturing.",
    href: "/guide/quality-control",
  },
  {
    icon: "🔒",
    title: "IP Protection",
    description:
      "NNN agreements, trademark registration, patent strategy, and practical tactics to protect your designs from being copied.",
    href: "/guide/ip-protection",
  },
  {
    icon: "📦",
    title: "Packaging Design",
    description:
      "Packaging types, printing methods, sustainable materials, and working with packaging suppliers for your product.",
    href: "/guide/packaging-design",
  },
  {
    icon: "📋",
    title: "Certifications & Compliance",
    description:
      "FCC, CE, UL, FDA, CPSIA, and more. Navigate product certifications and compliance requirements for US and EU markets.",
    href: "/guide/certifications",
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

      {/* Fundamentals */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Fundamentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundamentals.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
              >
                <span className="text-4xl block mb-4">{guide.icon}</span>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {guide.title}
                </h3>
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

      {/* By Product Category */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            By Product Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {byCategory.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
              >
                <span className="text-4xl block mb-4">{guide.icon}</span>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {guide.title}
                </h3>
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

      {/* Deep Dives */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Deep Dives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deepDives.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
              >
                <span className="text-4xl block mb-4">{guide.icon}</span>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {guide.title}
                </h3>
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
