"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useGlossaryTerm } from "@/lib/hooks/useGlossary"

interface GlossaryTooltipProps {
  term: string
  children: React.ReactNode
}

export default function GlossaryTooltip({
  term,
  children,
}: GlossaryTooltipProps) {
  const glossaryTerm = useGlossaryTerm(term)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  if (!glossaryTerm) {
    return <>{children}</>
  }

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <span
      ref={wrapperRef}
      className="relative inline"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="border-b border-dashed border-[#9B9B9B] cursor-help"
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white border border-[#E8E8E4] rounded-xl shadow-lg p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-2.5 h-2.5 bg-white border-r border-b border-[#E8E8E4] rotate-45 -translate-y-1.5" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm text-[#1A1A1A]">
                {glossaryTerm.term}
              </span>
              {glossaryTerm.acronym && (
                <span className="bg-[#FFF0EB] text-[#FF6B35] rounded-full px-2 py-0.5 text-xs font-medium">
                  {glossaryTerm.acronym}
                </span>
              )}
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-2">
              {glossaryTerm.definition.length > 150
                ? glossaryTerm.definition.slice(0, 150) + "..."
                : glossaryTerm.definition}
            </p>

            <div className="bg-[#F5F5F0] rounded-lg p-2.5 mb-2">
              <p className="text-xs text-[#1A1A1A] leading-relaxed">
                <span className="font-medium">Tip: </span>
                {glossaryTerm.practicalTip.length > 120
                  ? glossaryTerm.practicalTip.slice(0, 120) + "..."
                  : glossaryTerm.practicalTip}
              </p>
            </div>

            <Link
              href={`/glossary/${glossaryTerm.slug}`}
              className="text-xs text-[#FF6B35] font-medium hover:underline"
              onClick={() => setOpen(false)}
            >
              Learn more &rarr;
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
