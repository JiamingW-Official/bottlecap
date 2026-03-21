"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Calculator,
  Scale,
  Package,
  BarChart3,
  BookOpen,
  Globe2,
  FlaskConical,
  Factory,
  FileText,
  TrendingUp,
  List,
  MapPin,
  ArrowRight,
  Zap,
  Eye,
  FolderOpen,
  Command,
} from "lucide-react"

interface CommandItem {
  id: string
  label: string
  desc: string
  href: string
  category: "action" | "tool" | "guide" | "resource"
  Icon: React.ComponentType<{ className?: string }>
  keywords?: string[]
}

const ITEMS: CommandItem[] = [
  // Actions
  { id: "analyze", label: "Start Analysis", desc: "Analyze a new product idea", href: "/analyze", category: "action", Icon: Zap, keywords: ["start", "new", "create", "analyze"] },
  { id: "demo", label: "View Demo Report", desc: "See a sample analysis report", href: "/report/demo", category: "action", Icon: Eye, keywords: ["demo", "sample", "example", "preview"] },
  { id: "dashboard", label: "My Reports", desc: "View your past reports", href: "/dashboard", category: "action", Icon: FolderOpen, keywords: ["reports", "dashboard", "history", "my"] },
  { id: "pricing", label: "Pricing", desc: "Plans and pricing details", href: "/pricing", category: "action", Icon: BarChart3, keywords: ["price", "cost", "plan", "subscribe"] },
  // Tools
  { id: "hs", label: "HS Code Lookup", desc: "Find your product's tariff code", href: "/tools/hs-lookup", category: "tool", Icon: Search, keywords: ["hs", "tariff", "code", "classification", "harmonized"] },
  { id: "cost-calc", label: "Cost Calculator", desc: "Estimate manufacturing costs", href: "/tools/cost-calculator", category: "tool", Icon: Calculator, keywords: ["cost", "price", "estimate", "manufacturing"] },
  { id: "tariff-calc", label: "Tariff Calculator", desc: "Calculate import duties", href: "/tools/tariff-calculator", category: "tool", Icon: Scale, keywords: ["tariff", "duty", "import", "customs"] },
  { id: "moq", label: "MOQ Planner", desc: "Plan minimum order quantities", href: "/tools/moq-calculator", category: "tool", Icon: Package, keywords: ["moq", "minimum", "order", "quantity"] },
  { id: "roi", label: "ROI Calculator", desc: "Break-even & return analysis", href: "/tools/roi-calculator", category: "tool", Icon: BarChart3, keywords: ["roi", "return", "investment", "break-even"] },
  { id: "country-cmp", label: "Country Compare", desc: "Side-by-side country data", href: "/tools/country-compare", category: "tool", Icon: Globe2, keywords: ["country", "compare", "china", "vietnam", "india"] },
  { id: "margin", label: "Margin Calculator", desc: "Gross margin estimator", href: "/tools/margin-calculator", category: "tool", Icon: Calculator, keywords: ["margin", "profit", "gross"] },
  { id: "supplier", label: "Supplier Finder", desc: "Search & filter suppliers", href: "/tools/supplier-finder", category: "tool", Icon: Factory, keywords: ["supplier", "factory", "manufacturer", "find"] },
  { id: "quiz", label: "Product Quiz", desc: "Interactive classification quiz", href: "/tools/quiz", category: "tool", Icon: FileText, keywords: ["quiz", "classify", "category"] },
  // Guides
  { id: "mfg-101", label: "Manufacturing 101", desc: "Start here if you've never sourced", href: "/guide/manufacturing-101", category: "guide", Icon: BookOpen, keywords: ["manufacturing", "101", "beginner", "start"] },
  { id: "country-guide", label: "Country Comparison", desc: "China vs Vietnam vs India vs Mexico", href: "/guide/country-comparison", category: "guide", Icon: Globe2, keywords: ["country", "china", "vietnam", "india", "mexico"] },
  { id: "materials", label: "Materials Guide", desc: "What to specify, what to avoid", href: "/guide/materials", category: "guide", Icon: FlaskConical, keywords: ["material", "plastic", "metal", "wood", "fabric"] },
  { id: "sourcing", label: "Sourcing Guide", desc: "How to find and vet a factory", href: "/guide/sourcing", category: "guide", Icon: Factory, keywords: ["sourcing", "factory", "vet", "find"] },
  { id: "qc", label: "Quality Control", desc: "Testing & inspection standards", href: "/guide/quality-control", category: "guide", Icon: FileText, keywords: ["quality", "control", "inspection", "testing"] },
  { id: "shipping", label: "Shipping & Logistics", desc: "International shipping basics", href: "/guide/shipping-logistics", category: "guide", Icon: Package, keywords: ["shipping", "logistics", "freight", "container"] },
  { id: "certifications", label: "Certifications", desc: "ISO, FDA, CE and more", href: "/guide/certifications", category: "guide", Icon: FileText, keywords: ["certification", "iso", "fda", "ce", "compliance"] },
  { id: "packaging", label: "Packaging Design", desc: "Packaging and regulations", href: "/guide/packaging-design", category: "guide", Icon: Package, keywords: ["packaging", "box", "label", "design"] },
  { id: "ip", label: "IP Protection", desc: "Patents and trademarks", href: "/guide/ip-protection", category: "guide", Icon: FileText, keywords: ["ip", "patent", "trademark", "intellectual", "property"] },
  // Resources
  { id: "cost-guides", label: "Cost Guides", desc: "Per-product cost breakdowns", href: "/cost-to-manufacture", category: "resource", Icon: BarChart3, keywords: ["cost", "per unit", "guide"] },
  { id: "manufacturers", label: "Country Profiles", desc: "12 manufacturing hubs", href: "/manufacturers", category: "resource", Icon: MapPin, keywords: ["manufacturer", "country", "profile", "hub"] },
  { id: "comparisons", label: "Comparisons", desc: "Side-by-side analyses", href: "/compare", category: "resource", Icon: BarChart3, keywords: ["compare", "comparison", "vs"] },
  { id: "glossary", label: "Glossary", desc: "60+ manufacturing terms", href: "/glossary", category: "resource", Icon: List, keywords: ["glossary", "term", "definition", "fob", "cif", "moq"] },
  { id: "trends", label: "Trending Products", desc: "What founders are making now", href: "/trends", category: "resource", Icon: TrendingUp, keywords: ["trend", "trending", "popular", "hot"] },
]

const CATEGORY_LABELS: Record<string, string> = {
  action: "Actions",
  tool: "Tools",
  guide: "Guides",
  resource: "Resources",
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Listen for open event from navbar
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-command-palette", handler)
    return () => window.removeEventListener("open-command-palette", handler)
  }, [])

  // Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Filter items
  const filtered = useMemo(() => {
    if (!query.trim()) return ITEMS
    const q = query.toLowerCase()
    return ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.keywords?.some((kw) => kw.includes(q))
    )
  }, [query])

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    }
    return groups
  }, [filtered])

  // Flat list for keyboard nav
  const flatItems = useMemo(() => filtered, [filtered])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && flatItems[selectedIndex]) {
        e.preventDefault()
        router.push(flatItems[selectedIndex].href)
        setOpen(false)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    },
    [flatItems, selectedIndex, router]
  )

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    el?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  // Reset index on query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!open) return null

  let flatIndex = -1

  return (
    <AnimatePresence>
      <motion.div
        key="cmd-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
        onClick={() => setOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.18 }}
          className="bg-white rounded-2xl border border-[#E8E8E4] shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E8E4]">
            <Search className="w-5 h-5 text-[#9B9B9B] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools, guides, resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] outline-none bg-transparent"
            />
            <kbd className="hidden sm:inline-block text-[10px] text-[#9B9B9B] bg-[#F5F5F0] border border-[#E8E8E4] rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
            {flatItems.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-[#9B9B9B]">No results for &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-5 pt-3 pb-1 text-[10px] font-semibold text-[#9B9B9B] uppercase tracking-widest">
                  {CATEGORY_LABELS[category] || category}
                </p>
                {items.map((item) => {
                  flatIndex++
                  const idx = flatIndex
                  return (
                    <button
                      key={item.id}
                      data-index={idx}
                      onClick={() => {
                        router.push(item.href)
                        setOpen(false)
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                        idx === selectedIndex ? "bg-[#F5F5F0]" : "hover:bg-[#F5F5F0]/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center shrink-0">
                        <item.Icon className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                        <p className="text-xs text-[#9B9B9B] truncate">{item.desc}</p>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-opacity ${idx === selectedIndex ? "text-[#FF6B35] opacity-100" : "opacity-0"}`} />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#E8E8E4] flex items-center gap-4 text-[10px] text-[#9B9B9B]">
            <span className="flex items-center gap-1">
              <kbd className="bg-[#F5F5F0] border border-[#E8E8E4] rounded px-1 py-0.5">&uarr;</kbd>
              <kbd className="bg-[#F5F5F0] border border-[#E8E8E4] rounded px-1 py-0.5">&darr;</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-[#F5F5F0] border border-[#E8E8E4] rounded px-1 py-0.5">&crarr;</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-[#F5F5F0] border border-[#E8E8E4] rounded px-1 py-0.5">esc</kbd>
              close
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
