"use client"

import { useEffect } from "react"

export default function AccessibilityEnhancements() {
  useEffect(() => {
    // Add skip-to-content link if not present
    if (!document.querySelector(".skip-to-content")) {
      const skip = document.createElement("a")
      skip.href = "#main-content"
      skip.className = "skip-to-content"
      skip.textContent = "Skip to content"
      document.body.prepend(skip)
    }

    // Add keyboard focus visibility class
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav")
      }
    }
    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-nav")
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return null
}
