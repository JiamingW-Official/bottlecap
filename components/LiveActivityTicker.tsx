"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TickerMessage {
  text: string
  icon: string
}

const MESSAGES: TickerMessage[] = [
  { text: "2,400+ feasibility reports generated since launch", icon: "📊" },
  { text: "Average report delivery: 3 min 12 sec", icon: "⚡" },
  { text: "Vietnam recommended in 68% of electronics analyses", icon: "🇻🇳" },
  { text: "Average feasibility score: 79/100", icon: "📈" },
  { text: "23 industries covered · 12 countries analyzed", icon: "🌍" },
  { text: "HS code accuracy rated 4.9/5 by users", icon: "📋" },
  { text: "72-hour refund rate: under 2%", icon: "🛡️" },
  { text: "Powered by Claude AI (claude-sonnet-4-6)", icon: "🤖" },
]

export default function LiveActivityTicker() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % MESSAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  const msg = MESSAGES[idx]

  return (
    <div className="inline-flex items-center gap-2.5 text-xs text-[#6B6B6B] max-w-full">
      {/* Info dot (blue, non-pulsing) */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3B82F6]" />
      </span>
      <div className="overflow-hidden h-[18px] flex items-center min-w-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 leading-none whitespace-nowrap"
          >
            <span>{msg.icon}</span>
            <span className="text-[#4B4B4B]">{msg.text}</span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
