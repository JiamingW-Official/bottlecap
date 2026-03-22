"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const PERSONAS = [
  {
    initials: "SK",
    avatarBg: "#FF6B35",
    name: "Sarah K.",
    role: "First-time Founder",
    roleBg: "#FFF0EB",
    roleColor: "#FF6B35",
    quote:
      "I had a bamboo toothbrush idea but no idea if it was manufacturable at scale. Bottlecap told me the tooling cost ($4,200) and that Vietnam was 40% cheaper than China for bamboo products. I ordered samples the next week.",
    outcomeStat: "3 weeks",
    outcomeLabel: "of research saved",
  },
  {
    initials: "MT",
    avatarBg: "#3B82F6",
    name: "Marcus T.",
    role: "Serial Entrepreneur",
    roleBg: "#EFF6FF",
    roleColor: "#2563EB",
    quote:
      "I run 4 Amazon brands. I use Bottlecap Pro for every new product — 5+ reports a month. It&apos;s the fastest way to kill bad ideas before they cost me $10K in tooling.",
    outcomeStat: "$180K",
    outcomeLabel: "tooling cost avoided",
  },
  {
    initials: "PM",
    avatarBg: "#22C55E",
    name: "Priya M.",
    role: "Product Manager at CPG Agency",
    roleBg: "#F0FDF4",
    roleColor: "#16A34A",
    quote:
      "Our clients come to us with vague ideas. Bottlecap reports give us a credible starting point for every sourcing conversation. We run 10+ per month.",
    outcomeStat: "40+",
    outcomeLabel: "client projects powered",
  },
]

const tabVariants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}

export default function UseCaseSection() {
  const [active, setActive] = useState(0)
  const persona = PERSONAS[active]

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-[#1A1A1A] mb-4">
            Real founders, real results
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            Whether you&apos;re validating idea #1 or running a portfolio of brands, Bottlecap gives you an unfair advantage.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {PERSONAS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/25"
                  : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40 hover:text-[#1A1A1A]"
              }`}
            >
              {/* Mini avatar in pill */}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                style={{ backgroundColor: active === i ? "rgba(255,255,255,0.35)" : p.avatarBg }}
              >
                {p.initials}
              </span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Persona card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-10 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                style={{ backgroundColor: persona.avatarBg }}
              >
                {persona.initials}
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + role */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-[#1A1A1A]">{persona.name}</span>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: persona.roleBg, color: persona.roleColor }}
                  >
                    {persona.role}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-[#E8E8E4] pl-4 mb-6">
                  <p className="text-[#4A4A4A] italic leading-relaxed text-[15px]">
                    &ldquo;{persona.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Outcome stat */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: "#FF6B35" }}
                  >
                    {persona.outcomeStat}
                  </span>
                  <span className="text-sm text-[#6B6B6B] font-medium">{persona.outcomeLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {PERSONAS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-200 ${
                active === i ? "w-6 h-2 bg-[#FF6B35]" : "w-2 h-2 bg-[#E8E8E4] hover:bg-[#D0D0C8]"
              }`}
              aria-label={`View persona ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
