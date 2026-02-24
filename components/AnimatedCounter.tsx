"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sublabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counterObj = useRef({ value: 0 })

  useEffect(() => {
    if (!ref.current) return

    const tween = gsap.to(counterObj.current, {
      value: end,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        setCount(counterObj.current.value)
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    })

    return () => {
      tween.kill()
    }
  }, [end, duration])

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
