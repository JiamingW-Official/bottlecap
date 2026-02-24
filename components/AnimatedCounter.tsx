"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sublabel?: string
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sublabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(eased * end)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-black text-[#1A1A1A]">
        {prefix}
        {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        {suffix}
      </p>
      <p className="text-base font-semibold text-[#FF6B35] mt-2">{label}</p>
      {sublabel && (
        <p className="text-sm text-[#9B9B9B] mt-1">{sublabel}</p>
      )}
    </div>
  )
}
