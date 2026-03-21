import type { Metadata } from "next"
import Link from "next/link"
import {
  Factory,
  Globe2,
  Layers,
  Handshake,
  Lightbulb,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Armchair,
  Ship,
  CheckCircle,
  Lock,
  Package,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Manufacturing Guides — Bottlecap",
  description:
    "Free manufacturing guides for founders and product creators. Learn about manufacturing processes, country comparisons, materials, and supplier sourcing.",
}

interface GuideItem {
  Icon: LucideIcon
  title: string
  description: string
  href: string
  readTime?: string
  difficulty?: "Beginner" | "Intermediate" | "Advanced"
}

const fundamentals: GuideItem[] = [
  {
    Icon: Factory,
    title: "Manufacturing 101",
    description:
      "Everything you need to know about product manufacturing — from idea validation to mass production. The complete beginner's guide.",
    href: "/guide/manufacturing-101",
    readTime: "15 min",
    difficulty: "Beginner",
  },
  {
    Icon: Globe2,
    title: "Country Comparison",
    description:
      "China vs. Vietnam vs. India vs. Mexico and more. Compare 8 top manufacturing countries on cost, quality, lead time, and IP protection.",
    href: "/guide/country-comparison",
    readTime: "12 min",
    difficulty: "Beginner",
  },
  {
    Icon: Layers,
    title: "Materials Guide",
    description:
      "Metals, plastics, natural materials, and composites — understand your options, costs, and trade-offs for every material category.",
    href: "/guide/materials",
    readTime: "10 min",
    difficulty: "Intermediate",
  },
  {
    Icon: Handshake,
    title: "Supplier Sourcing",
    description:
      "How to find, evaluate, and negotiate with manufacturers. Includes RFQ templates, red flags to watch for, and IP protection strategies.",
    href: "/guide/sourcing",
    readTime: "12 min",
    difficulty: "Beginner",
  },
]

const byCategory: GuideItem[] = [
  {
    Icon: Lightbulb,
    title: "Electronics Manufacturing",
    description:
      "PCB assembly, enclosures, certifications, and more. Everything you need to manufacture electronic products.",
    href: "/guide/electronics-manufacturing",
    readTime: "10 min",
    difficulty: "Intermediate",
  },
  {
    Icon: Shirt,
    title: "Apparel Manufacturing",
    description:
      "Cut & sew, tech packs, fabric sourcing, and sizing. The complete guide to manufacturing clothing.",
    href: "/guide/apparel-manufacturing",
    readTime: "10 min",
    difficulty: "Intermediate",
  },
  {
    Icon: Sparkles,
    title: "Cosmetics Manufacturing",
    description:
      "Formulations, FDA compliance, packaging, and private labeling. Manufacturing beauty products.",
    href: "/guide/cosmetics-manufacturing",
    readTime: "8 min",
    difficulty: "Intermediate",
  },
  {
    Icon: UtensilsCrossed,
    title: "Food & Beverage Packaging",
    description:
      "Materials, food safety compliance, labeling, and sustainability for food packaging.",
    href: "/guide/food-manufacturing",
    readTime: "8 min",
    difficulty: "Intermediate",
  },
  {
    Icon: Armchair,
    title: "Furniture Manufacturing",
    description:
      "Materials, flat-pack vs assembled, shipping challenges, and quality control for furniture.",
    href: "/guide/furniture-manufacturing",
    readTime: "8 min",
    difficulty: "Intermediate",
  },
]

const deepDives: GuideItem[] = [
  {
    Icon: Ship,
    title: "Shipping & Logistics",
    description:
      "Ocean freight, air freight, customs clearance, and freight forwarders. Getting products from factory to warehouse.",
    href: "/guide/shipping-logistics",
    readTime: "12 min",
    difficulty: "Intermediate",
  },
  {
    Icon: CheckCircle,
    title: "Quality Control",
    description:
      "AQL standards, pre-shipment inspections, factory audits, and building a quality system.",
    href: "/guide/quality-control",
    readTime: "10 min",
    difficulty: "Advanced",
  },
  {
    Icon: Lock,
    title: "IP Protection",
    description:
      "NNN agreements, trademark registration, patent strategy, and practical tactics to protect your designs.",
    href: "/guide/ip-protection",
    readTime: "10 min",
    difficulty: "Advanced",
  },
  {
    Icon: Package,
    title: "Packaging Design",
    description:
      "Packaging types, printing methods, sustainable materials, and working with packaging suppliers.",
    href: "/guide/packaging-design",
    readTime: "8 min",
    difficulty: "Intermediate",
  },
  {
    Icon: ClipboardCheck,
    title: "Certifications & Compliance",
    description:
      "FCC, CE, UL, FDA, CPSIA, and more. Navigate product certifications for US and EU markets.",
    href: "/guide/certifications",
    readTime: "12 min",
    difficulty: "Advanced",
  },
]

const difficultyColors = {
  Beginner: "bg-[#DCFCE7] text-[#166534]",
  Intermediate: "bg-[#FEF3C7] text-[#92400E]",
  Advanced: "bg-[#FEF2F2] text-[#991B1B]",
}

const pathway = [
  {
    level: "Start Here",
    color: "#22C55E",
    guides: ["Manufacturing 101", "Supplier Sourcing"],
  },
  {
    level: "Intermediate",
    color: "#F59E0B",
    guides: ["Country Comparison", "Materials Guide", "Shipping & Logistics"],
  },
  {
    level: "Advanced",
    color: "#EF4444",
    guides: ["Quality Control", "IP Protection", "Certifications"],
  },
]

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <Link
      href={guide.href}
      className="group bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm hover:shadow-md hover:border-[#FF6B35] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] flex items-center justify-center">
          <guide.Icon className="w-6 h-6 text-[#FF6B35]" />
        </div>
        <div className="flex items-center gap-2">
          {guide.difficulty && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColors[guide.difficulty]}`}
            >
              {guide.difficulty}
            </span>
          )}
          {guide.readTime && (
            <span className="text-[10px] text-[#9B9B9B]">
              {guide.readTime}
            </span>
          )}
        </div>
      </div>
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
  )
}

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
            you&apos;re exploring your first product idea or scaling production.
          </p>
        </div>
      </section>

      {/* Reading Pathway */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-semibold text-[#9B9B9B] uppercase tracking-widest mb-6">
            Suggested Reading Path
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {pathway.map((p, i) => (
              <div key={p.level} className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: p.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="font-semibold text-sm text-[#1A1A1A]">
                    {p.level}
                  </span>
                  {i < pathway.length - 1 && (
                    <div className="hidden sm:block flex-1 h-px bg-[#E8E8E4]" />
                  )}
                </div>
                <div className="ml-11 sm:ml-0 space-y-1">
                  {p.guides.map((g) => (
                    <p key={g} className="text-xs text-[#6B6B6B]">
                      {g}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
              <GuideCard key={guide.href} guide={guide} />
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
              <GuideCard key={guide.href} guide={guide} />
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
              <GuideCard key={guide.href} guide={guide} />
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
