"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "left" | "right" | "scale"
  scrub?: boolean
  delay?: number
  duration?: number
  id?: string
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  scrub = false,
  delay = 0,
  duration = 0.6,
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1, duration, delay, ease: "power2.out" }

    switch (direction) {
      case "up":
        fromVars.y = 40
        toVars.y = 0
        break
      case "left":
        fromVars.x = 60
        toVars.x = 0
        break
      case "right":
        fromVars.x = -60
        toVars.x = 0
        break
      case "scale":
        fromVars.scale = 0.9
        toVars.scale = 1
        break
    }

    gsap.set(el, fromVars)

    if (scrub) {
      gsap.to(el, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 30%",
          scrub: 1,
        },
      })
    } else {
      gsap.to(el, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [direction, scrub, delay, duration])

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  )
}
