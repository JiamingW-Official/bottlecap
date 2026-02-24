"use client"

import { useState, useEffect } from "react"

interface ScrollProgress {
  progress: number
  velocity: number
}

export function useScrollProgress(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    velocity: 0,
  })

  useEffect(() => {
    const lenis = window.__lenis

    if (lenis) {
      const handler = (e: { progress: number; velocity: number }) => {
        setScrollData({ progress: e.progress, velocity: e.velocity })
      }
      lenis.on("scroll", handler)
      return () => lenis.off("scroll", handler)
    }

    // Fallback: native scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollData((prev) => ({
        progress,
        velocity: progress - prev.progress,
      }))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollData
}
