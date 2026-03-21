"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { useScrollProgress } from "@/lib/hooks/useScrollProgress"
import { motion, AnimatePresence } from "framer-motion"

const toolsLinks = [
  { href: "/tools/hs-lookup", label: "HS Code Lookup" },
  { href: "/tools/cost-calculator", label: "Cost Calculator" },
  { href: "/tools/tariff-calculator", label: "Tariff Calculator" },
  { href: "/tools/moq-calculator", label: "MOQ Planner" },
]

const guideLinks = [
  { href: "/guide/manufacturing-101", label: "Manufacturing 101" },
  { href: "/guide/country-comparison", label: "Country Comparison" },
  { href: "/guide/materials", label: "Materials Guide" },
  { href: "/guide/sourcing", label: "Sourcing Guide" },
]

const resourceLinks = [
  { href: "/cost-to-manufacture", label: "Cost Guides" },
  { href: "/manufacturers", label: "Country Profiles" },
  { href: "/compare", label: "Comparisons" },
  { href: "/glossary", label: "Glossary" },
  { href: "/trends", label: "Trending Products" },
]

const resourcePrefixes = ["/glossary", "/manufacturers", "/compare", "/cost-to-manufacture", "/trends"]

function DropdownMenu({
  label,
  links,
  allHref,
  isActive,
}: {
  label: string
  links: { href: string; label: string }[]
  allHref: string
  isActive: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on outside click (accessibility fallback)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, 150)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-[13px] font-medium transition-colors ${
          isActive
            ? "text-[#FF6B35]"
            : "text-[#6B6B6B] hover:text-[#1A1A1A]"
        }`}
      >
        {label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="absolute top-full left-0 mt-2.5 w-52 bg-white rounded-2xl border border-[#E8E8E4] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1.5 z-50 overflow-hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#4B4B4B] hover:text-[#1A1A1A] hover:bg-[#F5F5F0] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-[#F0F0EC] mx-3 my-1" />
            <Link
              href={allHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[#FF6B35] font-semibold hover:bg-[#FFF8F5] transition-colors"
            >
              <span>View all</span>
              <span className="text-[10px]">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { progress } = useScrollProgress()
  const pathname = usePathname()

  const isToolsActive = pathname.startsWith("/tools")
  const isGuidesActive = pathname.startsWith("/guide")
  const isResourcesActive = resourcePrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-[#E8E8E4] shadow-sm"
          : "bg-white/60 backdrop-blur border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-bold text-[15px] tracking-tight text-[#1A1A1A] hover:text-[#FF6B35] transition-colors"
          >
            Bottlecap
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu
              label="Tools"
              links={toolsLinks}
              allHref="/tools"
              isActive={isToolsActive}
            />
            <DropdownMenu
              label="Guides"
              links={guideLinks}
              allHref="/guide"
              isActive={isGuidesActive}
            />
            <DropdownMenu
              label="Resources"
              links={resourceLinks}
              allHref="/glossary"
              isActive={isResourcesActive}
            />
            <Link
              href="/report/demo"
              className="text-[13px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/pricing"
              className={`text-[13px] font-medium transition-colors ${pathname === "/pricing" ? "text-[#FF6B35]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"}`}
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden md:inline-flex text-[13px] font-medium text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
          >
            My Reports
          </Link>
          <Link
            href="/analyze"
            className="bg-[#FF6B35] text-white rounded-full px-5 py-2 text-[13px] font-semibold hover:bg-[#E85A25] shadow-[0_2px_8px_rgba(255,107,53,0.3)] hover:shadow-[0_4px_14px_rgba(255,107,53,0.4)] transition-all"
          >
            Start for $99
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#1A1A1A]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div
              data-lenis-prevent
              className="bg-white border-t border-[#E8E8E4] px-6 py-5"
            >
              {/* Primary actions */}
              <div className="space-y-1 mb-4">
                <Link
                  href="/analyze"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between bg-[#FF6B35] text-white rounded-xl px-4 py-3 font-semibold text-sm"
                >
                  Analyze my product
                  <span className="text-white/80">$99 →</span>
                </Link>
                <Link
                  href="/report/demo"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between bg-[#F5F5F0] text-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-medium"
                >
                  See sample report
                  <span className="text-[#9B9B9B]">→</span>
                </Link>
              </div>

              <div className="h-px bg-[#F0F0EC] mb-4" />

              {/* Tools — top 4 */}
              <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest mb-2">Tools</p>
              <div className="grid grid-cols-2 gap-1 mb-4">
                {toolsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 text-sm text-[#4B4B4B] rounded-lg hover:bg-[#F5F5F0] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/tools"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 px-3 text-sm text-[#FF6B35] font-medium rounded-lg"
                >
                  All tools →
                </Link>
              </div>

              <div className="h-px bg-[#F0F0EC] mb-4" />

              {/* Secondary */}
              <div className="grid grid-cols-2 gap-1">
                {[
                  { href: "/guide", label: "Guides" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/dashboard", label: "My Reports" },
                  { href: "/about", label: "About" },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 text-sm text-[#6B6B6B] rounded-lg hover:bg-[#F5F5F0] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF6B35] transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </nav>
  )
}
