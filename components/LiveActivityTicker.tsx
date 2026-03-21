"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MESSAGES = [
  "42 analyses completed this week",
  "Top category: smart home devices",
  "Average feasibility score: 79/100",
  "Most recommended region: Vietnam",
  "$2,400 avg saved vs. sourcing agents",
  "37 founders moved to production stage",
]

export default function LiveActivityTicker() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % MESSAGES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="inline-flex items-center gap-2.5 text-xs text-[#6B6B6B]">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]" />
      </span>
      <div className="overflow-hidden h-[16px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="inline-block leading-none whitespace-nowrap"
          >
            {MESSAGES[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
