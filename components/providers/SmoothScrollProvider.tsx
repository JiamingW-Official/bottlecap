"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"

// Global window extension for Lenis instance
declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    // Unified RAF loop: Lenis drives GSAP ticker
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync GSAP ticker with Lenis
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      window.__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
