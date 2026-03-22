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
  BookOpen,
  Clock,
  ChevronRight,
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
  Beginner:     { bg: "bg-[#DCFCE7]", text: "text-[#166534]", bar: "#22C55E" },
  Intermediate: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", bar: "#F59E0B" },
  Advanced:     { bg: "bg-[#FEF2F2]", text: "text-[#991B1B]", bar: "#EF4444" },
}

const pathway = [
  {
    level: "Start Here",
    color: "#22C55E",
    bg: "bg-[#F0FDF4]",
    border: "border-[#22C55E]/20",
    guides: ["Manufacturing 101", "Supplier Sourcing"],
    description: "Learn the fundamentals before anything else",
  },
  {
    level: "Intermediate",
    color: "#F59E0B",
    bg: "bg-[#FFFBEB]",
    border: "border-[#F59E0B]/20",
    guides: ["Country Comparison", "Materials Guide", "Shipping & Logistics"],
    description: "Understand where and how to source",
  },
  {
    level: "Advanced",
    color: "#EF4444",
    bg: "bg-[#FEF2F2]",
    border: "border-[#EF4444]/20",
    guides: ["Quality Control", "IP Protection", "Certifications"],
    description: "Protect and scale your product",
  },
]

function GuideCard({ guide }: { guide: GuideItem }) {
  const diff = guide.difficulty ? difficultyColors[guide.difficulty] : null
  return (
    <Link
      href={guide.href}
      className="group bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:shadow-md hover:border-[#FF6B35]/30 transition-all flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-[#FFF0EB] flex items-center justify-center shrink-0">
          <guide.Icon className="w-5 h-5 text-[#FF6B35]" />
        </div>
        <div className="flex items-center gap-2">
          {guide.difficulty && diff && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${diff.bg} ${diff.text}`}>
              {guide.difficulty}
            </span>
          )}
          {guide.readTime && (
            <span className="flex items-center gap-1 text-[10px] text-[#9B9B9B]">
              <Clock className="w-3 h-3" />
              {guide.readTime}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors leading-snug">
          {guide.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          {guide.description}
        </p>
      </div>

      <span className="flex items-center gap-1 text-[#FF6B35] font-semibold text-sm group-hover:gap-2 transition-all">
        Read guide
        <ChevronRight className="w-4 h-4" />
      </span>
    </Link>
  )
}

export default function GuidePage() {
  const allGuides = [...fundamentals, ...byCategory, ...deepDives]
  const totalMinutes = allGuides.reduce((sum, g) => sum + parseInt(g.readTime || "0"), 0)

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Hero */}
      <section className="py-20 sm:py-28 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-4">
            Free Education
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#1A1A1A] mb-5">
            Manufacturing Guides
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl leading-relaxed mb-10">
            Free, practical guides for founders and product creators — whether
            you&apos;re exploring your first idea or scaling production.
          </p>

          {/* Stats bar */}
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { icon: BookOpen, value: `${allGuides.length}`, label: "guides" },
              { icon: Clock, value: `${totalMinutes}+`, label: "min reading" },
              { icon: Layers, value: "3", label: "skill levels" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <div>
                  <span className="font-black text-[#1A1A1A] text-lg leading-none">{stat.value}</span>
                  <span className="text-xs text-[#9B9B9B] ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading Pathway */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest mb-6">
            Suggested Reading Path
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pathway.map((p, i) => (
              <div
                key={p.level}
                className={`relative rounded-2xl border p-5 ${p.bg} ${p.border}`}
              >
                {/* Step number badge */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mb-3"
                  style={{ backgroundColor: p.color }}
                >
                  {i + 1}
                </div>
                <p className="font-bold text-[#1A1A1A] mb-1">{p.level}</p>
                <p className="text-xs text-[#6B6B6B] mb-3">{p.description}</p>
                <ul className="space-y-1">
                  {p.guides.map((g) => (
                    <li key={g} className="flex items-center gap-1.5 text-xs text-[#4B4B4B]">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      {g}
                    </li>
                  ))}
                </ul>
                {/* Connector arrow for desktop */}
                {i < pathway.length - 1 && (
                  <div className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#D0D0C8]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundamentals */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Fundamentals</h2>
            <span className="text-xs bg-[#F5F5F0] text-[#9B9B9B] px-2.5 py-1 rounded-full font-medium">
              {fundamentals.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fundamentals.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* By Product Category */}
      <section className="pb-16 bg-white border-y border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6 pt-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">By Product Category</h2>
            <span className="text-xs bg-[#F5F5F0] text-[#9B9B9B] px-2.5 py-1 rounded-full font-medium">
              {byCategory.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {byCategory.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Deep Dives</h2>
            <span className="text-xs bg-[#F5F5F0] text-[#9B9B9B] px-2.5 py-1 rounded-full font-medium">
              {deepDives.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deepDives.map((guide) => (
              <GuideCard key={guide.href} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
            Skip the research
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Ready to analyze your product idea?
          </h2>
          <p className="text-[#9B9B9B] mb-8 max-w-xl mx-auto leading-relaxed">
            Get a complete manufacturing feasibility report with cost breakdowns,
            country comparisons, and optimization tips in 2–5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] shadow-[0_4px_14px_rgba(255,107,53,0.4)] transition-all"
            >
              Analyze my idea — $99
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/report/demo"
              className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-8 py-4 font-semibold hover:bg-white/20 transition-all border border-white/10"
            >
              See sample report
            </Link>
          </div>
          <p className="text-xs text-[#6B6B6B] mt-4">72-hr money-back · 2–5 min delivery · Stripe secure</p>
        </div>
      </section>
    </main>
  )
}
