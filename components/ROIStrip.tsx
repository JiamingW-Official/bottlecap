"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const COLUMNS = [
  {
    stat: "$3,000–$10,000",
    label: "vs. Sourcing Agent",
    copy: "Get the same intelligence in 5 minutes that agents charge for over 2 weeks.",
    accentColor: "#FF6B35",
  },
  {
    stat: "$500+/hr",
    label: "vs. Trade Consultant",
    copy: "Bottlecap covers HS codes, tariff rates, and cost breakdowns consultants charge thousands to research.",
    accentColor: "#F59E0B",
  },
  {
    stat: "40+ hours",
    label: "vs. DIY Research",
    copy: "No more Alibaba rabbit holes, spreadsheet hell, or missed tariff changes.",
    accentColor: "#22C55E",
  },
]

function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1800,
  triggered,
}: {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  triggered: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [triggered, end, duration])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function ROIStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="bg-[#1A1A1A] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center text-[11px] font-bold tracking-[0.18em] uppercase text-[#5A5A5A] mb-3"
        >
          Why $99 is a no-brainer
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.07, ease: EASE }}
          className="text-center text-2xl sm:text-3xl font-bold text-white mb-12"
        >
          Compare what you would pay elsewhere
        </motion.h2>

        {/* 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.1, ease: EASE }}
              className="relative bg-[#242424] rounded-2xl p-6 overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: col.accentColor }}
              />

              {/* Stat */}
              <p
                className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-2"
                style={{ color: col.accentColor }}
              >
                Save {col.stat}
              </p>

              {/* Label */}
              <p className="text-base font-bold text-white mb-3">{col.label}</p>

              {/* Copy */}
              <p className="text-sm text-[#8B8B8B] leading-relaxed">{col.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#2E2E2E] mb-8" />

        {/* ROI math row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-12"
        >
          {/* $99 */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-[#FF6B35] tracking-tight leading-none">
              $99
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[120px] mx-auto">
              one-time report cost
            </p>
          </div>

          {/* arrow */}
          <div className="hidden sm:flex flex-col items-center gap-1 px-4">
            <div className="flex items-center gap-1">
              <div className="h-[1px] w-8 bg-[#FF6B35]/40" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#FF6B35]/60">
                avoided
              </span>
              <div className="h-[1px] w-8 bg-[#FF6B35]/40" />
            </div>
            <p className="text-[11px] text-[#5A5A5A] text-center max-w-[100px] leading-tight">
              one bad material choice
            </p>
          </div>

          {/* $2,000+ */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              $<CountUp end={2000} suffix="+" duration={1600} triggered={isInView} />
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[130px] mx-auto">
              saved on bad inventory / tooling
            </p>
          </div>

          {/* = */}
          <div className="hidden sm:flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#FF6B35]/40">=</span>
          </div>

          {/* 20x */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-[#22C55E] tracking-tight leading-none">
              <CountUp end={20} suffix="×" duration={1400} triggered={isInView} />
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[100px] mx-auto">
              return on investment
            </p>
          </div>
        </motion.div>

        {/* Bottom ROI banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          className="rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-6 py-5 text-center"
        >
          <p className="text-base sm:text-lg font-semibold text-white leading-snug">
            Net ROI if you save even 10 hours:{" "}
            <span className="text-[#FF6B35] font-black">over 50x your $99 investment.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
