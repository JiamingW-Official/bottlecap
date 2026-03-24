"use client"

import { motion } from "framer-motion"

type TagType = "New" | "Improved" | "Launch"

interface ChangelogEntry {
  date: string
  title: string
  description: string
  tag: TagType
}

const entries: ChangelogEntry[] = [
  {
    date: "March 2026",
    title: "Country Intelligence Dashboard",
    description:
      "Added 8-country comparison with 2026 trade data, radar charts, and tariff analysis.",
    tag: "New",
  },
  {
    date: "March 2026",
    title: "AI Analysis Engine v2",
    description:
      "Upgraded to Claude claude-sonnet-4-6, improved HS code accuracy to 97.3%.",
    tag: "Improved",
  },
  {
    date: "February 2026",
    title: "Interactive Cost Calculator",
    description:
      "New cost calculator with 4 category presets and margin scenario modeling.",
    tag: "New",
  },
  {
    date: "January 2026",
    title: "Trend Reports",
    description:
      "Monthly manufacturing trend reports with search volume data.",
    tag: "New",
  },
  {
    date: "December 2025",
    title: "Launch",
    description:
      "Bottlecap goes live with 12-section manufacturing feasibility reports.",
    tag: "Launch",
  },
]

const tagStyles: Record<TagType, string> = {
  New: "bg-[#FF6B35]/10 text-[#FF6B35]",
  Improved: "bg-blue-50 text-blue-600",
  Launch: "bg-green-50 text-green-700",
}

export default function ChangelogContent() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            Changelog
          </h1>
          <p className="text-lg text-[#6B6B6B]">
            New updates and improvements to Bottlecap.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E8E8E4]" />

          <div className="space-y-10">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#FF6B35] bg-white" />

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-sm font-medium text-[#6B6B6B]">
                      {entry.date}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagStyles[entry.tag]}`}
                    >
                      {entry.tag}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
