"use client"

import { useRef, useState, useEffect } from "react"

interface LazyCanvasProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
}

export default function LazyCanvas({
  children,
  className,
  fallback,
}: LazyCanvasProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: "200px" }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback || null}
    </div>
  )
}
