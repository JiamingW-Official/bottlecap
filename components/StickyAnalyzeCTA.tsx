"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function StickyAnalyzeCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()

  // Only show on pages where it makes sense
  const hideOn = ["/analyze", "/report", "/dashboard"]
  const shouldHide = hideOn.some((p) => pathname.startsWith(p))

  useEffect(() => {
    if (shouldHide || dismissed) return
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [shouldHide, dismissed])

  if (shouldHide || dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
        >
          <div className="relative bg-[#1A1A1A] text-white rounded-2xl px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/10">
            {/* Pulse dot */}
            <div className="shrink-0 relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B35]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">
                Get your HS code, landed cost, and best country in 5 minutes
              </p>
              <p className="text-[11px] text-white/50 leading-none mt-0.5">
                AI-powered &middot; $99 &middot; 72-hr money-back guarantee
              </p>
            </div>

            <Link
              href="/analyze"
              className="shrink-0 flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#E85A25] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              <Zap className="w-3 h-3" />
              Analyze now
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
