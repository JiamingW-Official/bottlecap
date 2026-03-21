"use client"

import { useEffect, useState } from "react"

export default function EasterEggs() {
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    // Secret: typing "bottlecap" anywhere on the page
    let buffer = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      buffer += e.key.toLowerCase()
      if (buffer.length > 20) buffer = buffer.slice(-20)
      if (buffer.includes("bottlecap")) {
        buffer = ""
        document.documentElement.style.setProperty("--brand-primary", "#6366F1")
        document.documentElement.style.setProperty("color-scheme", "light")
        setTimeout(() => {
          document.documentElement.style.setProperty("--brand-primary", "#FF6B35")
        }, 3000)
      }
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  return null // Pure side-effect component
}
