"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Smartphone,
  Home,
  Watch,
  Headphones,
  UtensilsCrossed,
  Lamp,
  Armchair,
  Dog,
  Baby,
  Tent,
  Dumbbell,
  Sparkles,
  ShoppingBag,
  Footprints,
  Gamepad2,
  Car,
  Pencil,
  Stethoscope,
  Shirt,
  Package,
  ArrowRight,
  Search,
  X,
  Pill,
  Leaf,
} from "lucide-react"

const categories = [
  {
    Icon: Smartphone,
    name: "Electronics",
    description: "Consumer gadgets, IoT devices, and smart tech",
    examples: "Smart devices, IoT, gadgets",
    avgCost: "$8–$45",
    moq: "200–1,000",
    miniStat: "24 factories compared",
    trend: "hot",
    tag: "tech",
  },
  {
    Icon: Shirt,
    name: "Apparel & Textiles",
    description: "Clothing, fabrics, and fashion accessories",
    examples: "T-shirts, jackets, hats",
    avgCost: "$3–$25",
    moq: "100–500",
    miniStat: "Avg $4.20/unit",
    trend: "hot",
    tag: "fashion",
  },
  {
    Icon: UtensilsCrossed,
    name: "Home & Kitchen",
    description: "Cookware, storage, and everyday household items",
    examples: "Cookware, utensils, storage",
    avgCost: "$2–$25",
    moq: "100–500",
    miniStat: "Avg $3.80/unit",
    trend: null,
    tag: "home",
  },
  {
    Icon: Sparkles,
    name: "Beauty & Personal Care",
    description: "Skincare, cosmetics containers, and grooming tools",
    examples: "Containers, tools, devices",
    avgCost: "$1–$20",
    moq: "500–5,000",
    miniStat: "18 factories compared",
    trend: null,
    tag: "beauty",
  },
  {
    Icon: Tent,
    name: "Outdoor & Sports",
    description: "Camping gear, tools, and outdoor lifestyle products",
    examples: "Gear, tools, lighting",
    avgCost: "$5–$45",
    moq: "100–500",
    miniStat: "Avg $7.60/unit",
    trend: null,
    tag: "lifestyle",
  },
  {
    Icon: Gamepad2,
    name: "Toys & Games",
    description: "Action figures, puzzles, and children&apos;s play items",
    examples: "Action figures, puzzles",
    avgCost: "$2–$15",
    moq: "500–2,000",
    miniStat: "12 factories compared",
    trend: null,
    tag: "lifestyle",
  },
  {
    Icon: Dog,
    name: "Pet Products",
    description: "Bowls, toys, beds, and accessories for pets",
    examples: "Bowls, toys, accessories",
    avgCost: "$2–$18",
    moq: "200–1,000",
    miniStat: "Avg $2.40/unit",
    trend: "new",
    tag: "lifestyle",
  },
  {
    Icon: Package,
    name: "Packaging",
    description: "Boxes, bottles, pouches, and custom branded packaging",
    examples: "Boxes, bottles, pouches",
    avgCost: "$0.10–$2",
    moq: "1,000–10K",
    miniStat: "Avg $0.55/unit",
    trend: null,
    tag: "other",
  },
  {
    Icon: Pill,
    name: "Food & Supplements",
    description: "Nutraceuticals, functional foods, and supplement packaging",
    examples: "Capsules, powders, bars",
    avgCost: "$0.80–$8",
    moq: "500–5,000",
    miniStat: "15 factories compared",
    trend: null,
    tag: "other",
  },
  {
    Icon: Armchair,
    name: "Furniture",
    description: "Desks, shelving, seating, and flat-pack furniture",
    examples: "Desks, shelving, seating",
    avgCost: "$25–$200",
    moq: "50–200",
    miniStat: "Avg $62/unit",
    trend: null,
    tag: "home",
  },
  {
    Icon: Stethoscope,
    name: "Medical Devices",
    description: "Diagnostic monitors, tools, and personal health equipment",
    examples: "Monitors, tools, PPE",
    avgCost: "$10–$100",
    moq: "100–500",
    miniStat: "10 factories compared",
    trend: null,
    tag: "other",
  },
  {
    Icon: Car,
    name: "Automotive",
    description: "Mounts, organizers, and vehicle accessories",
    examples: "Mounts, organizers, tools",
    avgCost: "$3–$25",
    moq: "200–1,000",
    miniStat: "Avg $5.10/unit",
    trend: null,
    tag: "auto",
  },
  {
    Icon: Home,
    name: "Smart Home",
    description: "Sensors, controllers, hubs, and connected home devices",
    examples: "Sensors, controllers, hubs",
    avgCost: "$12–$60",
    moq: "300–2,000",
    miniStat: "20 factories compared",
    trend: null,
    tag: "tech",
  },
  {
    Icon: Watch,
    name: "Wearable Tech",
    description: "Fitness bands, smart rings, and health wearables",
    examples: "Fitness bands, smart rings",
    avgCost: "$15–$80",
    moq: "500–2,000",
    miniStat: "Avg $22/unit",
    trend: "hot",
    tag: "tech",
  },
  {
    Icon: Headphones,
    name: "Audio Equipment",
    description: "Earbuds, speakers, and microphone accessories",
    examples: "Earbuds, speakers, mics",
    avgCost: "$6–$35",
    moq: "300–1,500",
    miniStat: "16 factories compared",
    trend: null,
    tag: "tech",
  },
  {
    Icon: Lamp,
    name: "Home Decor",
    description: "Vases, frames, lighting, and decorative accents",
    examples: "Vases, frames, lighting",
    avgCost: "$3–$30",
    moq: "100–1,000",
    miniStat: "Avg $4.90/unit",
    trend: null,
    tag: "home",
  },
  {
    Icon: Baby,
    name: "Baby & Kids",
    description: "Safety gear, feeding products, and children&apos;s accessories",
    examples: "Safety gear, toys, feeding",
    avgCost: "$4–$25",
    moq: "300–1,500",
    miniStat: "13 factories compared",
    trend: null,
    tag: "lifestyle",
  },
  {
    Icon: Dumbbell,
    name: "Fitness & Sports",
    description: "Exercise equipment, training accessories, and activewear",
    examples: "Equipment, accessories",
    avgCost: "$4–$50",
    moq: "100–500",
    miniStat: "Avg $9.30/unit",
    trend: "hot",
    tag: "lifestyle",
  },
  {
    Icon: ShoppingBag,
    name: "Bags & Luggage",
    description: "Backpacks, travel cases, and everyday carry accessories",
    examples: "Backpacks, cases, wallets",
    avgCost: "$5–$40",
    moq: "100–500",
    miniStat: "11 factories compared",
    trend: null,
    tag: "fashion",
  },
  {
    Icon: Footprints,
    name: "Footwear",
    description: "Sneakers, sandals, boots, and specialty footwear",
    examples: "Sneakers, sandals, boots",
    avgCost: "$8–$35",
    moq: "300–1,000",
    miniStat: "Avg $14/unit",
    trend: null,
    tag: "fashion",
  },
  {
    Icon: Pencil,
    name: "Office & Stationery",
    description: "Desk organizers, writing supplies, and workspace essentials",
    examples: "Organizers, supplies",
    avgCost: "$1–$12",
    moq: "500–5,000",
    miniStat: "Avg $1.80/unit",
    trend: null,
    tag: "other",
  },
  {
    Icon: Leaf,
    name: "Eco & Sustainable",
    description: "Biodegradable, recycled, and zero-waste product alternatives",
    examples: "Bamboo goods, compostables",
    avgCost: "$2–$20",
    moq: "200–1,000",
    miniStat: "9 factories compared",
    trend: "new",
    tag: "other",
  },
  {
    Icon: Dumbbell,
    name: "Supplements & Wellness",
    description: "Vitamins, protein products, and wellness supplements",
    examples: "Capsules, gummies, powders",
    avgCost: "$1–$10",
    moq: "500–5,000",
    miniStat: "14 factories compared",
    trend: null,
    tag: "other",
  },
]

const TAGS = [
  { key: "all", label: "All" },
  { key: "tech", label: "Tech" },
  { key: "home", label: "Home" },
  { key: "fashion", label: "Fashion" },
  { key: "beauty", label: "Beauty" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "auto", label: "Auto" },
  { key: "other", label: "Other" },
]

export default function CategoryShowcase() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState("all")

  const handleCategoryClick = (name: string) => {
    sessionStorage.setItem("bottlecap_hero_text", name)
    router.push("/analyze")
  }

  const filtered = useMemo(() => {
    return categories.filter((c) => {
      const matchTag = activeTag === "all" || c.tag === activeTag
      const matchQuery =
        !query.trim() ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.examples.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      return matchTag && matchQuery
    })
  }, [query, activeTag])

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9B9B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white border border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-9 pr-9 py-2 text-sm outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9B9B] hover:text-[#6B6B6B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {TAGS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTag(t.key)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${
                activeTag === t.key
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40 hover:text-[#1A1A1A]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#9B9B9B] mb-4">
        {filtered.length} categor{filtered.length !== 1 ? "ies" : "y"}
        {activeTag !== "all" || query ? " found" : " \u00b7 click any to start analysis"}
      </p>

      {/* Grid — 4-column desktop */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((cat, i) => (
            <motion.button
              key={cat.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.02, duration: 0.18 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              }}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-left
                         hover:border-[#FF6B35] transition-all duration-200 cursor-pointer group relative"
            >
              {/* Trend badge */}
              {cat.trend === "hot" && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  HOT
                </span>
              )}
              {cat.trend === "new" && (
                <span className="absolute -top-2 -right-2 bg-[#22C55E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  NEW
                </span>
              )}

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center group-hover:bg-[#FF6B35]/15 transition-colors">
                <cat.Icon className="w-[18px] h-[18px] text-[#FF6B35]" />
              </div>

              {/* Name */}
              <p className="font-semibold text-[#1A1A1A] text-sm mt-2.5 leading-snug">
                {cat.name}
              </p>

              {/* One-liner description */}
              <p className="text-xs text-[#9B9B9B] mt-1 leading-snug line-clamp-2">
                {cat.description}
              </p>

              {/* Mini stat */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#FF6B35] bg-[#FFF0EB] px-2 py-0.5 rounded-full">
                  {cat.miniStat}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D0D0C8] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
              </div>

              {/* Cost + MOQ */}
              <div className="mt-2 flex items-center gap-1.5">
                <p className="text-[10px] font-semibold text-[#4A4A4A]">{cat.avgCost}/unit</p>
                <span className="text-[#D0D0C8] text-[10px]">&middot;</span>
                <p className="text-[10px] text-[#C0C0BC]">MOQ {cat.moq}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#9B9B9B]">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No categories match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => { setQuery(""); setActiveTag("all") }}
            className="mt-2 text-xs text-[#FF6B35] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Browse all link */}
      <div className="mt-8 text-center">
        <Link
          href="/analyze"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B35] hover:text-[#E55A25] transition-colors group"
        >
          Browse all 23 categories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  )
}
