"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TickerMessage {
  text: string
  icon: string
  color: string
}

const MESSAGES: TickerMessage[] = [
  { text: "Founder in Austin just analyzed a smart water bottle — feasibility 91/100", icon: "✅", color: "#22C55E" },
  { text: "Vietnam flagged as best region for 68% of this week's analyses", icon: "🇻🇳", color: "#F59E0B" },
  { text: "Average report delivery: 3 min 12 sec this week", icon: "⚡", color: "#FF6B35" },
  { text: "Top category this week: Smart Home devices (14 analyses)", icon: "🏠", color: "#3B82F6" },
  { text: "Material optimization tips saved founders avg $2.80/unit this month", icon: "💰", color: "#22C55E" },
  { text: "Founder in London just placed their first factory order from a Bottlecap report", icon: "🎉", color: "#8B5CF6" },
  { text: "HS code classification accuracy rated 4.9/5 by verified users", icon: "📋", color: "#FF6B35" },
  { text: "Mexico sourcing up 40% — USMCA tariff savings driving interest", icon: "🇲🇽", color: "#22C55E" },
  { text: "72-hour refund guarantee — 0 disputes this month", icon: "🛡️", color: "#3B82F6" },
  { text: "Product agency in Singapore uses Bottlecap for every client discovery", icon: "🏢", color: "#F59E0B" },
  { text: "Electronics category: avg feasibility score 78/100 across 120 analyses", icon: "💡", color: "#8B5CF6" },
  { text: "Founder avoided $12K recall risk — compliance flagged by report before samples ordered", icon: "⚠️", color: "#EF4444" },
  { text: "Beauty & Cosmetics analyses up 55% — South Korea frequently recommended", icon: "🇰🇷", color: "#FF6B35" },
  { text: "Powered by Claude (claude-sonnet-4-6) — the same AI trusted by enterprises", icon: "🤖", color: "#6366F1" },
  { text: "23 industries covered — from electronics to food packaging to furniture", icon: "🏭", color: "#22C55E" },
  { text: "First-time founders make up 61% of Bottlecap users", icon: "🚀", color: "#FF6B35" },
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
      {/* Live dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]" />
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
