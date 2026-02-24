"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { useScrollProgress } from "@/lib/hooks/useScrollProgress"

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

function DropdownMenu({
  label,
  links,
  allHref,
}: {
  label: string
  links: { href: string; label: string }[]
  allHref: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          data-lenis-prevent
          className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-[#E8E8E4] shadow-lg py-2 z-50"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F5F5F0] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-[#E8E8E4] my-1" />
          <Link
            href={allHref}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-[#FF6B35] font-medium hover:bg-[#F5F5F0] transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { progress } = useScrollProgress()

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
          <Link href="/" className="font-bold text-lg text-[#1A1A1A]">
            Bottlecap
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu
              label="Tools"
              links={toolsLinks}
              allHref="/tools"
            />
            <DropdownMenu
              label="Guides"
              links={guideLinks}
              allHref="/guide"
            />
            <DropdownMenu
              label="Resources"
              links={resourceLinks}
              allHref="/glossary"
            />
            <Link
              href="/report/demo"
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              My Reports
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/analyze"
            className="bg-[#FF6B35] text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Start Analysis
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-lenis-prevent
          className="md:hidden bg-white border-t border-[#E8E8E4] px-6 py-4 space-y-1"
        >
          <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-wide mb-2">
            Tools
          </p>
          {toolsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-[#1A1A1A]"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-[#E8E8E4] my-3" />
          <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-wide mb-2">
            Guides
          </p>
          {guideLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-[#1A1A1A]"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-[#E8E8E4] my-3" />
          <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-wide mb-2">
            Resources
          </p>
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-[#1A1A1A]"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-[#E8E8E4] my-3" />
          <Link
            href="/report/demo"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-[#1A1A1A]"
          >
            Demo Report
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-[#1A1A1A]"
          >
            My Reports
          </Link>
        </div>
      )}
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF6B35] transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </nav>
  )
}
