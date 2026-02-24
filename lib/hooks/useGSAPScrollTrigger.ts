"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let initialized = false

export function useGSAPScrollTrigger() {
  useEffect(() => {
    if (initialized) return
    initialized = true

    gsap.registerPlugin(ScrollTrigger)

    // Bridge Lenis scroll events into GSAP's ticker
    const lenis = window.__lenis

    if (lenis) {
      lenis.on("scroll", () => {
        ScrollTrigger.update()
      })
    }
  }, [])
}
