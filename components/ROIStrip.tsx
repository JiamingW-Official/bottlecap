"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const SECONDARY_STATS = [
  "$2.80/unit avg savings from optimization tips",
  "22% avg cost reduction by switching manufacturing country",
  "$4,900 saved vs sourcing agent (real user)",
  "3 min avg report delivery time",
  "72-hour money-back guarantee",
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
      {prefix}{count}{suffix}
    </span>
  )
}

export default function ROIStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-16 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Primary ROI math */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-12">

          {/* Stat 1: $99 */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-[#FF6B35] tracking-tight leading-none">
              $99
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[120px] mx-auto">
              one-time report cost
            </p>
          </div>

          {/* Arrow / operator */}
          <div className="hidden sm:flex flex-col items-center gap-1 px-4">
            <div className="flex items-center gap-1 text-[#FF6B35]">
              <div className="h-[1px] w-8 bg-[#FF6B35]/40" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#FF6B35]/60">avoided</span>
              <div className="h-[1px] w-8 bg-[#FF6B35]/40" />
            </div>
            <p className="text-[11px] text-[#5A5A5A] text-center max-w-[100px] leading-tight">
              one bad material choice
            </p>
          </div>

          {/* Stat 2: $2,000+ */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              $<CountUp end={2000} suffix="+" duration={1600} triggered={isInView} />
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[130px] mx-auto">
              saved on bad inventory / tooling
            </p>
          </div>

          {/* = operator */}
          <div className="hidden sm:flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#FF6B35]/40">=</span>
          </div>

          {/* Stat 3: 20× ROI */}
          <div className="text-center sm:flex-1">
            <p className="text-5xl sm:text-6xl font-black text-[#22C55E] tracking-tight leading-none">
              <CountUp end={20} suffix="×" duration={1400} triggered={isInView} />
            </p>
            <p className="text-sm text-[#8B8B8B] mt-2 leading-snug max-w-[100px] mx-auto">
              return on investment
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#2E2E2E] mb-8" />

        {/* Secondary stats row */}
        <div className="flex flex-wrap justify-center gap-3">
          {SECONDARY_STATS.map((stat) => (
            <span
              key={stat}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2A2A2A] border border-[#3A3A3A] text-[#B0B0B0] text-xs font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
