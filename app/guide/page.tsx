"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Factory,
  Search,
  Globe2,
  Layers,
  Ship,
  CheckCircle,
  Shield,
  Award,
  Shirt,
  Cpu,
  UtensilsCrossed,
  Sparkles,
  Armchair,
  Package,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Difficulty = "Beginner" | "Intermediate" | "Advanced"
type Category = "Manufacturing" | "Sourcing" | "Compliance"

interface GuideItem {
  Icon: LucideIcon
  title: string
  description: string
  href: string
  readTime: string
  difficulty: Difficulty
  category: Category
  slug: string
  featured?: boolean
  featuredGradient?: string
  featuredBadge?: string
}

// ─── Difficulty design tokens ─────────────────────────────────────────────────

const difficultyConfig: Record<
  Difficulty,
  { bg: string; text: string; dot: string; label: string }
> = {
  Beginner: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#166534]",
    dot: "#22C55E",
    label: "Beginner",
  },
  Intermediate: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    dot: "#F59E0B",
    label: "Intermediate",
  },
  Advanced: {
    bg: "bg-[#FEF2F2]",
    text: "text-[#991B1B]",
    dot: "#EF4444",
    label: "Advanced",
  },
}

// ─── All guides ───────────────────────────────────────────────────────────────

const ALL_GUIDES: GuideItem[] = [
  {
    slug: "manufacturing-101",
    Icon: Factory,
    title: "Manufacturing 101",
    description:
      "Everything you need to know about product manufacturing — from idea validation to mass production. The complete beginner's guide.",
    href: "/guide/manufacturing-101",
    readTime: "15 min",
    difficulty: "Beginner",
    category: "Manufacturing",
    featured: true,
    featuredGradient: "from-[#FF6B35] to-[#FF9A5C]",
    featuredBadge: "Start here →",
  },
  {
    slug: "sourcing",
    Icon: Search,
    title: "Supplier Sourcing",
    description:
      "How to find, evaluate, and negotiate with manufacturers. Includes RFQ templates, red flags to watch for, and IP protection strategies.",
    href: "/guide/sourcing",
    readTime: "12 min",
    difficulty: "Beginner",
    category: "Sourcing",
  },
  {
    slug: "country-comparison",
    Icon: Globe2,
    title: "Country Comparison",
    description:
      "China vs. Vietnam vs. India vs. Mexico and more. Compare 8 top manufacturing countries on cost, quality, lead time, and IP protection.",
    href: "/guide/country-comparison",
    readTime: "18 min",
    difficulty: "Intermediate",
    category: "Sourcing",
    featured: true,
    featuredGradient: "from-[#3B82F6] to-[#60A5FA]",
    featuredBadge: "Most popular",
  },
  {
    slug: "materials",
    Icon: Layers,
    title: "Materials Guide",
    description:
      "Metals, plastics, natural materials, and composites — understand your options, costs, and trade-offs for every material category.",
    href: "/guide/materials",
    readTime: "14 min",
    difficulty: "Intermediate",
    category: "Manufacturing",
  },
  {
    slug: "shipping-logistics",
    Icon: Ship,
    title: "Shipping & Logistics",
    description:
      "Ocean freight, air freight, customs clearance, and freight forwarders. Getting products from factory to warehouse.",
    href: "/guide/shipping-logistics",
    readTime: "10 min",
    difficulty: "Intermediate",
    category: "Sourcing",
  },
  {
    slug: "quality-control",
    Icon: CheckCircle,
    title: "Quality Control",
    description:
      "AQL standards, pre-shipment inspections, factory audits, and building a quality system.",
    href: "/guide/quality-control",
    readTime: "16 min",
    difficulty: "Advanced",
    category: "Manufacturing",
  },
  {
    slug: "ip-protection",
    Icon: Shield,
    title: "IP Protection",
    description:
      "NNN agreements, trademark registration, patent strategy, and practical tactics to protect your designs.",
    href: "/guide/ip-protection",
    readTime: "11 min",
    difficulty: "Advanced",
    category: "Compliance",
  },
  {
    slug: "certifications",
    Icon: Award,
    title: "Certifications & Compliance",
    description:
      "FCC, CE, UL, FDA, CPSIA, and more. Navigate product certifications for US and EU markets.",
    href: "/guide/certifications",
    readTime: "20 min",
    difficulty: "Advanced",
    category: "Compliance",
  },
  {
    slug: "apparel-manufacturing",
    Icon: Shirt,
    title: "Apparel Manufacturing",
    description:
      "Cut & sew, tech packs, fabric sourcing, and sizing. The complete guide to manufacturing clothing.",
    href: "/guide/apparel-manufacturing",
    readTime: "13 min",
    difficulty: "Intermediate",
    category: "Manufacturing",
  },
  {
    slug: "electronics-manufacturing",
    Icon: Cpu,
    title: "Electronics Manufacturing",
    description:
      "PCB assembly, enclosures, certifications, and more. Everything you need to manufacture electronic products.",
    href: "/guide/electronics-manufacturing",
    readTime: "17 min",
    difficulty: "Advanced",
    category: "Manufacturing",
  },
  {
    slug: "food-manufacturing",
    Icon: UtensilsCrossed,
    title: "Food & Beverage Packaging",
    description:
      "Materials, food safety compliance, labeling, and sustainability for food packaging.",
    href: "/guide/food-manufacturing",
    readTime: "11 min",
    difficulty: "Intermediate",
    category: "Compliance",
  },
  {
    slug: "cosmetics-manufacturing",
    Icon: Sparkles,
    title: "Cosmetics Manufacturing",
    description:
      "Formulations, FDA compliance, packaging, and private labeling. Manufacturing beauty products.",
    href: "/guide/cosmetics-manufacturing",
    readTime: "12 min",
    difficulty: "Intermediate",
    category: "Manufacturing",
  },
  {
    slug: "furniture-manufacturing",
    Icon: Armchair,
    title: "Furniture Manufacturing",
    description:
      "Materials, flat-pack vs assembled, shipping challenges, and quality control for furniture.",
    href: "/guide/furniture-manufacturing",
    readTime: "14 min",
    difficulty: "Intermediate",
    category: "Manufacturing",
  },
  {
    slug: "packaging-design",
    Icon: Package,
    title: "Packaging Design",
    description:
      "Packaging types, printing methods, sustainable materials, and working with packaging suppliers.",
    href: "/guide/packaging-design",
    readTime: "9 min",
    difficulty: "Beginner",
    category: "Manufacturing",
  },
]

// ─── Reading pathway data ─────────────────────────────────────────────────────

interface PathNode {
  slug: string
  title: string
  readTime: string
  href: string
}

interface PathLevel {
  level: string
  badge: string
  color: string
  bgLight: string
  borderColor: string
  dotBg: string
  nodes: PathNode[]
  description: string
}

const PATHWAY: PathLevel[] = [
  {
    level: "Level 1",
    badge: "Start Here",
    color: "#22C55E",
    bgLight: "#F0FDF4",
    borderColor: "#BBF7D0",
    dotBg: "#22C55E",
    description: "Learn the fundamentals before anything else",
    nodes: [
      { slug: "manufacturing-101", title: "Manufacturing 101", readTime: "15 min", href: "/guide/manufacturing-101" },
      { slug: "sourcing", title: "Sourcing Guide", readTime: "12 min", href: "/guide/sourcing" },
    ],
  },
  {
    level: "Level 2",
    badge: "Intermediate",
    color: "#F59E0B",
    bgLight: "#FFFBEB",
    borderColor: "#FDE68A",
    dotBg: "#F59E0B",
    description: "Understand where and how to source",
    nodes: [
      { slug: "country-comparison", title: "Country Comparison", readTime: "18 min", href: "/guide/country-comparison" },
      { slug: "materials", title: "Materials Guide", readTime: "14 min", href: "/guide/materials" },
      { slug: "shipping-logistics", title: "Shipping & Logistics", readTime: "10 min", href: "/guide/shipping-logistics" },
    ],
  },
  {
    level: "Level 3",
    badge: "Advanced",
    color: "#A855F7",
    bgLight: "#FAF5FF",
    borderColor: "#E9D5FF",
    dotBg: "#A855F7",
    description: "Protect and scale your product",
    nodes: [
      { slug: "quality-control", title: "Quality Control", readTime: "16 min", href: "/guide/quality-control" },
      { slug: "ip-protection", title: "IP Protection", readTime: "11 min", href: "/guide/ip-protection" },
      { slug: "certifications", title: "Certifications", readTime: "20 min", href: "/guide/certifications" },
    ],
  },
]

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterTab = "All" | Difficulty | Category

const FILTER_TABS: FilterTab[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Manufacturing",
  "Sourcing",
  "Compliance",
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function DifficultyPill({ difficulty }: { difficulty: Difficulty }) {
  const cfg = difficultyConfig[difficulty]
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  )
}

function ReadTimeBadge({ readTime }: { readTime: string }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-[#9B9B9B] font-medium">
      <Clock className="w-3 h-3" />
      {readTime} read
    </span>
  )
}

function GuideCard({ guide, index }: { guide: GuideItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.28,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
    >
      <Link
        href={guide.href}
        className="group h-full bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:shadow-lg hover:border-[#FF6B35]/30 transition-all flex flex-col gap-4 block"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="w-11 h-11 rounded-xl bg-[#FFF0EB] flex items-center justify-center shrink-0">
            <guide.Icon className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <DifficultyPill difficulty={guide.difficulty} />
            <ReadTimeBadge readTime={guide.readTime} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1">
          <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors leading-snug">
            {guide.title}
          </h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Footer */}
        <span className="flex items-center gap-1 text-[#FF6B35] font-semibold text-sm group-hover:gap-2 transition-all">
          Read guide
          <ChevronRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  )
}

function FeaturedGuideCard({ guide }: { guide: GuideItem }) {
  return (
    <Link
      href={guide.href}
      className="group relative overflow-hidden rounded-2xl flex flex-col min-h-[220px] border border-transparent hover:shadow-xl transition-all"
    >
      {/* Gradient header */}
      <div
        className={`bg-gradient-to-br ${guide.featuredGradient} px-6 pt-6 pb-10 flex-1 flex flex-col justify-between`}
      >
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/80 bg-white/20 rounded-full px-3 py-1">
            {guide.featuredBadge}
          </span>
          <DifficultyPill difficulty={guide.difficulty} />
        </div>

        {/* Icon + title */}
        <div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <guide.Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-white leading-tight mb-1">
            {guide.title}
          </h3>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-[#E8E8E4]">
        <ReadTimeBadge readTime={guide.readTime} />
        <span className="flex items-center gap-1 text-[#FF6B35] font-semibold text-sm group-hover:gap-2 transition-all">
          Read guide <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

// ─── Reading Pathway ──────────────────────────────────────────────────────────

function ReadingPathway() {
  return (
    <section className="py-16 border-b border-[#E8E8E4]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FF6B35]">
              Suggested Reading Path
            </p>
            <h2 className="text-xl font-black text-[#1A1A1A] leading-tight">
              Go from zero to launch-ready
            </h2>
          </div>
        </div>

        {/* Timeline — horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-0 min-w-[720px] sm:min-w-0">
            {PATHWAY.map((level, li) => (
              <div key={level.level} className="flex items-start flex-1">
                {/* Level block */}
                <div className="flex-1">
                  {/* Level badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: level.color }}
                    >
                      {level.badge}
                    </span>
                    <span className="text-[11px] text-[#9B9B9B] font-medium">
                      {level.level}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl border p-4 flex flex-col gap-3"
                    style={{
                      backgroundColor: level.bgLight,
                      borderColor: level.borderColor,
                    }}
                  >
                    <p className="text-[11px] text-[#6B6B6B] italic">
                      {level.description}
                    </p>

                    {/* Nodes */}
                    <div className="flex flex-col gap-2">
                      {level.nodes.map((node, ni) => (
                        <div key={node.slug} className="flex items-start gap-2">
                          {/* Vertical connector + dot */}
                          <div className="flex flex-col items-center pt-0.5 shrink-0">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0"
                              style={{ backgroundColor: level.color }}
                            >
                              {ni + 1}
                            </div>
                            {ni < level.nodes.length - 1 && (
                              <div
                                className="w-px flex-1 mt-1"
                                style={{
                                  minHeight: 12,
                                  backgroundColor: level.borderColor,
                                }}
                              />
                            )}
                          </div>
                          <Link
                            href={node.href}
                            className="group flex-1 bg-white rounded-xl px-3 py-2.5 border border-white/60 hover:border-current hover:shadow-sm transition-all"
                            style={{ borderColor: level.borderColor }}
                          >
                            <p
                              className="text-[12px] font-bold leading-tight group-hover:underline"
                              style={{ color: "#1A1A1A" }}
                            >
                              {node.title}
                            </p>
                            <p className="flex items-center gap-1 text-[10px] text-[#9B9B9B] mt-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              {node.readTime} read
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector arrow between levels */}
                {li < PATHWAY.length - 1 && (
                  <div className="flex items-center justify-center w-8 mt-10 shrink-0">
                    <ArrowRight className="w-4 h-4 text-[#D0D0C8]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Filter tabs component ────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
}: {
  active: FilterTab
  onChange: (t: FilterTab) => void
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTER_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
            active === tab
              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
              : "bg-white text-[#6B6B6B] border-[#E8E8E4] hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function GuidePage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All")

  const featuredGuides = ALL_GUIDES.filter((g) => g.featured)

  const filteredGuides = ALL_GUIDES.filter((g) => {
    if (activeFilter === "All") return true
    if (
      activeFilter === "Beginner" ||
      activeFilter === "Intermediate" ||
      activeFilter === "Advanced"
    ) {
      return g.difficulty === activeFilter
    }
    return g.category === activeFilter
  })

  const totalMinutes = ALL_GUIDES.reduce(
    (sum, g) => sum + parseInt(g.readTime),
    0
  )

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          {/* Eyebrow */}
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-4">
            Free Education
          </p>

          {/* Progress indicator concept */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E8E4] rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="text-[12px] font-semibold text-[#4B4B4B]">
              {ALL_GUIDES.length} guides covering everything from idea to first shipment
            </span>
          </div>

          <h1 className="text-4xl sm:text-[56px] font-black tracking-tight leading-[1.05] text-[#1A1A1A] mb-5">
            Manufacturing<br className="hidden sm:block" /> Guides
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl leading-relaxed mb-10">
            Free, practical guides for founders and product creators — whether
            you&apos;re exploring your first idea or scaling production to
            thousands of units.
          </p>

          {/* Stats bar */}
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { icon: BookOpen, value: `${ALL_GUIDES.length}`, label: "guides" },
              { icon: Clock, value: `${totalMinutes}+`, label: "min of content" },
              { icon: Layers, value: "3", label: "skill levels" },
              { icon: Factory, value: "7", label: "industries covered" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <div className="leading-tight">
                  <span className="font-black text-[#1A1A1A] text-xl">{stat.value}</span>
                  <span className="text-xs text-[#9B9B9B] ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reading Pathway ───────────────────────────────────────────────── */}
      <ReadingPathway />

      {/* ── Featured guides strip ─────────────────────────────────────────── */}
      <section className="py-14 border-b border-[#E8E8E4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-black text-[#1A1A1A]">
              Start with these
            </h2>
            <span className="text-[11px] bg-[#FFF0EB] text-[#FF6B35] px-2.5 py-1 rounded-full font-bold border border-[#FF6B35]/20">
              Featured
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredGuides.map((guide) => (
              <FeaturedGuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Full guide grid with filter ───────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section header + filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#1A1A1A]">All Guides</h2>
              <p className="text-sm text-[#9B9B9B] mt-0.5">
                {filteredGuides.length} of {ALL_GUIDES.length} guides
              </p>
            </div>
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          </div>

          {/* Guide grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredGuides.map((guide, i) => (
                <GuideCard key={guide.slug} guide={guide} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredGuides.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5F5F0] flex items-center justify-center mx-auto mb-4">
                <Search className="w-5 h-5 text-[#9B9B9B]" />
              </div>
              <p className="font-semibold text-[#1A1A1A] mb-1">No guides found</p>
              <p className="text-sm text-[#9B9B9B]">
                Try a different filter above.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Difficulty legend ─────────────────────────────────────────────── */}
      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#9B9B9B] shrink-0">
              Difficulty key
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((d) => {
                const cfg = difficultyConfig[d]
                return (
                  <div key={d} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cfg.dot }}
                    />
                    <span className="text-xs font-semibold text-[#4B4B4B]">{d}</span>
                    <span className="text-[11px] text-[#9B9B9B]">
                      {d === "Beginner"
                        ? "— No experience needed"
                        : d === "Intermediate"
                        ? "— Some context helpful"
                        : "— Deeper knowledge required"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1A1A1A] mt-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
                Ready to put this into practice?
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                Turn knowledge into a real manufacturing plan.
              </h2>
              <p className="text-[#9B9B9B] leading-relaxed text-[15px]">
                Get a complete manufacturing feasibility report with cost
                breakdowns, country comparisons, and optimization tips — in 2 to 5
                minutes.
              </p>
            </div>

            {/* Right: CTA cards */}
            <div className="flex flex-col gap-3">
              <Link
                href="/analyze"
                className="group flex items-center justify-between bg-[#FF6B35] hover:bg-[#E85A25] text-white rounded-2xl px-6 py-5 transition-all shadow-[0_4px_20px_rgba(255,107,53,0.35)]"
              >
                <div>
                  <p className="font-black text-lg leading-tight">Analyze my product idea</p>
                  <p className="text-white/70 text-sm mt-0.5">Full report in 2–5 min · $99</p>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/tools"
                className="group flex items-center justify-between bg-white/10 hover:bg-white/15 text-white rounded-2xl px-6 py-5 transition-all border border-white/10"
              >
                <div>
                  <p className="font-bold text-[15px] leading-tight">Browse free tools</p>
                  <p className="text-white/50 text-sm mt-0.5">MOQ calculator, supplier finder &amp; more</p>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="text-center text-xs text-[#6B6B6B] pt-1">
                72-hr money-back · 2–5 min delivery · Stripe secure
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
