"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const USE_CASES = [
  {
    emoji: "🚀",
    title: "First-time founders",
    subtitle: "Validating your first physical product",
    desc: "You have an idea but no manufacturing experience. Bottlecap tells you if it's viable, what it costs, and which country to source from — before you spend a dollar on samples.",
    stats: ["61% of users are first-time founders", "Avg time from report to first factory contact: 4 days"],
    color: "#FF6B35",
    cta: "Start your analysis",
    ctaHref: "/analyze",
  },
  {
    emoji: "🔁",
    title: "Serial entrepreneurs",
    subtitle: "Launching your 2nd, 3rd, or 4th product",
    desc: "You know manufacturing but want to move faster and cheaper. Use the Monthly plan for unlimited analyses — and run country comparisons before committing to tooling.",
    stats: ["Run analyses for every design iteration", "$199/month for unlimited reports"],
    color: "#3B82F6",
    cta: "See Monthly plan",
    ctaHref: "/pricing",
  },
  {
    emoji: "🏢",
    title: "Product agencies",
    subtitle: "Discovery phase for every client project",
    desc: "Bottlecap replaces the initial feasibility phase that used to take your team 2–3 days. Deliver better initial estimates, faster — and pass the savings to your clients.",
    stats: ["40+ hours saved per client engagement", "Agencies use Monthly for unlimited access"],
    color: "#22C55E",
    cta: "Learn about Monthly",
    ctaHref: "/pricing",
  },
  {
    emoji: "💰",
    title: "Existing brands",
    subtitle: "Cutting costs on products you already make",
    desc: "Already manufacturing somewhere? Run a report on your existing product to find material alternatives, cheaper countries, and optimization tips your current factory won't suggest.",
    stats: ["Avg $2.80/unit savings identified", "22% is the record cost reduction (Vietnam switch)"],
    color: "#8B5CF6",
    cta: "Find cost savings",
    ctaHref: "/analyze",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function UseCaseSection() {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
            Built for founders at every stage
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            Whether you&apos;re validating idea #1 or optimizing a product you&apos;ve manufactured for years, Bottlecap gives you an unfair advantage.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {USE_CASES.map((uc) => (
            <motion.div
              key={uc.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden group
                         hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-[#D0D0C8] transition-all duration-300"
            >
              {/* Left color accent */}
              <div
                className="absolute left-0 inset-y-0 w-[4px] rounded-l-2xl transition-all duration-300"
                style={{ backgroundColor: uc.color }}
              />

              <div className="pl-7 pr-6 py-6">
                {/* Emoji + titles */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: `${uc.color}26` }}
                  >
                    {uc.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight">{uc.title}</h3>
                    <p className="text-sm text-[#6B6B6B] mt-0.5">{uc.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">{uc.desc}</p>

                {/* Stats badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {uc.stats.map((stat) => (
                    <span
                      key={stat}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                      {stat}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={uc.ctaHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/cta"
                  style={{ color: uc.color }}
                >
                  {uc.cta}
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
