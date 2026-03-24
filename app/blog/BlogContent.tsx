"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"

const placeholderArticles = [
  {
    title: "Understanding Section 301 Tariffs in 2026",
    tag: "Trade Policy",
  },
  {
    title: "Vietnam vs China: A Founder's Decision Framework",
    tag: "Sourcing",
  },
  {
    title: "How to Read an HS Code (and Why It Matters)",
    tag: "Education",
  },
]

export default function BlogContent() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            The Bottlecap Blog
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto mb-8">
            Insights on manufacturing, sourcing, and product development. Launching soon.
          </p>

          {/* Newsletter signup */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-medium"
            >
              <Bell className="w-4 h-4" />
              You&apos;ll be notified when we launch.
            </motion.div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full sm:flex-1 px-4 py-2.5 rounded-lg border border-[#E8E8E4] bg-white text-[#1A1A1A] text-sm placeholder:text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#e55a25] text-white text-sm font-medium transition-colors shrink-0"
              >
                Notify me
              </button>
            </form>
          )}
        </motion.div>

        {/* Placeholder articles */}
        <div className="grid gap-6">
          {placeholderArticles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
              className="relative bg-white rounded-xl border border-[#E8E8E4] p-6 sm:p-8 overflow-hidden"
            >
              {/* Gray overlay */}
              <div className="absolute inset-0 bg-[#FAFAF8]/60 z-10 pointer-events-none" />

              <div className="relative z-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35]">
                    {article.tag}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#E8E8E4] text-[#6B6B6B]">
                    Coming soon
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
                  {article.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
