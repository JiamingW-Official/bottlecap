"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useGlossary } from "@/lib/hooks/useGlossary"

interface GlossaryTooltipProps {
  term: string
  children: React.ReactNode
}

export default function GlossaryTooltip({
  term,
  children,
}: GlossaryTooltipProps) {
  const { findTerm } = useGlossary()
  const glossaryTerm = findTerm(term)
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
    return <span>{children}</span>
  }

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  const shortDefinition =
    glossaryTerm.definition.length > 160
      ? glossaryTerm.definition.slice(0, 160) + "..."
      : glossaryTerm.definition

  const shortTip =
    glossaryTerm.practicalTip.length > 120
      ? glossaryTerm.practicalTip.slice(0, 120) + "..."
      : glossaryTerm.practicalTip

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
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
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{
              duration: 0.15,
              ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }}
            className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-white rounded-2xl border border-[#E8E8E4] shadow-lg p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm text-[#1A1A1A]">
                {glossaryTerm.term}
              </span>
              {glossaryTerm.acronym && (
                <span className="bg-[#FF6B35] text-white rounded-full px-2 py-0.5 text-xs font-medium">
                  {glossaryTerm.acronym}
                </span>
              )}
            </div>

            {/* Definition */}
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-2">
              {shortDefinition}
            </p>

            {/* Practical tip */}
            {glossaryTerm.practicalTip && (
              <div className="bg-[#FFF0EB] rounded-lg p-2.5 mb-2">
                <p className="text-xs text-[#1A1A1A] leading-relaxed">
                  <span className="font-medium">Tip: </span>
                  {shortTip}
                </p>
              </div>
            )}

            {/* Learn more */}
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
