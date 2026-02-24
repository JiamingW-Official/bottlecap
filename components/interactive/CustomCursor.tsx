"use client"

import { useRef, useEffect, useState } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    // Skip on mobile or reduced motion
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (isMobile || prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      isHovering.current = !!(
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-cursor]") ||
        el.closest("input") ||
        el.closest("textarea")
      )
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    let animId: number

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursorRef.current) {
        const size = isHovering.current ? 60 : 40
        cursorRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
        cursorRef.current.style.width = `${size}px`
        cursorRef.current.style.height = `${size}px`
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height] duration-200 ease-out"
      style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
        mixBlendMode: "normal",
      }}
      aria-hidden="true"
    />
  )
}
