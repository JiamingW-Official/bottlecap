"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap,
  Globe2,
  Package,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const easing = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

/* ─── data ─── */

const powers = [
  {
    Icon: Zap,
    title: "Claude AI",
    subtitle: "by Anthropic",
    desc: "Trained on manufacturing, trade, and supply chain knowledge — the same model trusted by leading enterprises, now pointed at your product idea.",
  },
  {
    Icon: Globe2,
    title: "Live Trade Data",
    subtitle: "Always current",
    desc: "HS codes, tariff schedules, and manufacturing benchmarks updated regularly so every number you see reflects today&apos;s market, not last year&apos;s.",
  },
  {
    Icon: Package,
    title: "Industry Expertise",
    subtitle: "Distilled, not diluted",
    desc: "Built on real sourcing agent workflows — the same checklists, cost models, and factory specs that $5K consultants use, packaged into structured intelligence.",
  },
]

const stats = [
  { value: "23", label: "Industry verticals" },
  { value: "12", label: "Countries compared" },
  { value: "50+", label: "Materials in database" },
  { value: "98%", label: "Actionability rate" },
  { value: "2–5 min", label: "Average delivery" },
  { value: "$99", label: "vs $5K+ alternative" },
  { value: "Weekly", label: "Updated with live trade data" },
]

const principles = [
  {
    Icon: BarChart3,
    title: "No vague advice",
    desc: "Every insight has a number attached. Feasibility scores, cost ranges, tariff percentages — nothing hand-wavy.",
  },
  {
    Icon: Shield,
    title: "No fake reviews",
    desc: "We show real product examples, not testimonials we wrote ourselves. You can verify everything we say.",
  },
  {
    Icon: CheckCircle,
    title: "No upsell traps",
    desc: "$99 flat. No hidden fees, no drip reveals. 72-hour money-back guarantee, no questions asked.",
  },
  {
    Icon: Users,
    title: "No gatekeeping",
    desc: "The same intel sourcing agents charge $5K for — available to any founder with a product idea and $99.",
  },
]

const personas = [
  {
    title: "First-time founders",
    desc: "Validating a product idea before spending $10K on tooling. One report can save months of wrong turns.",
    tag: "Most common",
    tagColor: "#FF6B35",
  },
  {
    title: "Serial entrepreneurs",
    desc: "Running 5+ analyses a month across a portfolio of products. The Pro plan pays for itself on the first report.",
    tag: "Pro plan",
    tagColor: "#3B82F6",
  },
  {
    title: "Agencies + consultants",
    desc: "White-label option and bulk reports for clients. Add a professional sourcing layer without hiring a sourcing team.",
    tag: "White-label",
    tagColor: "#22C55E",
  },
]

/* ─── component ─── */

export default function AboutContent() {
  return (
    <main className="bg-[#FAFAF8] text-[#1A1A1A] min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, ease: easing }}
          className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
        >
          Built for people who make things.
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: easing }}
          className="mt-6 text-lg md:text-xl text-[#555] max-w-2xl mx-auto leading-relaxed"
        >
          Manufacturing research used to require either $5,000 and a sourcing agent or 40+ hours of
          spreadsheets. We think that&apos;s broken.
        </motion.p>
      </section>

      {/* ── 2. The problem we&apos;re solving ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="text-3xl font-bold mb-10 text-center"
        >
          The problem we&apos;re solving
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05, ease: easing }}
            className="bg-[#F2F2EF] border border-[#E8E8E4] rounded-2xl p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
              Before Bottlecap
            </p>
            <p className="text-[#333] leading-relaxed">
              You guess Vietnam is cheapest. Design around $6/unit. Get to production: actual cost
              $8.50. Funding plan breaks. You&apos;ve lost 6 weeks and $3K in samples that don&apos;t
              match your margin model.
            </p>
          </motion.div>

          {/* After */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.12, ease: easing }}
            className="bg-[#FFF4EF] border border-[#FFCFB8] rounded-2xl p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6B35] mb-4">
              After Bottlecap
            </p>
            <p className="text-[#333] leading-relaxed">
              You learn Vietnam is $6.20/unit but Mexico is $5.80 with zero tariffs via USMCA. You
              pivot 4 weeks before tooling. Save $1,200 and 30 days. Every number is sourced,
              every alternative is costed — in 5 minutes, not 5 weeks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. What powers Bottlecap ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="text-3xl font-bold mb-10 text-center"
        >
          What powers Bottlecap
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {powers.map(({ Icon, title, subtitle, desc }, i) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08, ease: easing }}
              className="bg-white border border-[#E8E8E4] rounded-2xl p-7 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4EF] flex items-center justify-center">
                <Icon size={20} color="#FF6B35" />
              </div>
              <div>
                <p className="font-semibold text-lg leading-snug">{title}</p>
                <p className="text-sm text-[#888] mt-0.5">{subtitle}</p>
              </div>
              <p
                className="text-sm text-[#555] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. The numbers ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="text-3xl font-bold mb-10 text-center"
        >
          The numbers
        </motion.h2>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.08, ease: easing }}
          className="bg-white border border-[#E8E8E4] rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#FF6B35]">{value}</p>
              <p className="text-sm text-[#666] mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 5. Our principles ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Our principles
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.07, ease: easing }}
              className="bg-white border border-[#E8E8E4] rounded-2xl p-7 flex gap-5"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#FFF4EF] flex items-center justify-center">
                <Icon size={18} color="#FF6B35" />
              </div>
              <div>
                <p className="font-semibold mb-1">{title}</p>
                <p className="text-sm text-[#555] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5b. Founder note ── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="bg-[#1A1A1A] text-white rounded-2xl p-10 sm:p-12"
        >
          <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
            From the team
          </p>
          <p className="text-lg sm:text-xl leading-relaxed text-white/90">
            &ldquo;Built by a team that has personally dealt with tariff surprises, wrong HS codes,
            and factory miscommunication. Bottlecap exists because we spent $15K learning lessons
            that should have cost $99.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* ── 6. Who builds with Bottlecap ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Who builds with Bottlecap
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map(({ title, desc, tag, tagColor }, i) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08, ease: easing }}
              className="bg-white border border-[#E8E8E4] rounded-2xl p-7 flex flex-col gap-4"
            >
              <span
                className="self-start text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: tagColor }}
              >
                {tag}
              </span>
              <p className="font-semibold text-lg leading-snug">{title}</p>
              <p className="text-sm text-[#555] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="max-w-3xl mx-auto px-6 pb-28 text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: easing }}
          className="bg-white border border-[#E8E8E4] rounded-2xl p-12 flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl font-bold">Ready to analyze your idea?</h2>
          <p className="text-[#555] max-w-md leading-relaxed">
            Get the same manufacturing intelligence that sourcing agents charge $5K for — in 5
            minutes, for $99.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e85e2a] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
          >
            Start for $99 <ArrowRight size={18} />
          </Link>
          <p className="text-sm text-[#888]">72-hour money-back guarantee</p>
        </motion.div>
      </section>

    </main>
  )
}
