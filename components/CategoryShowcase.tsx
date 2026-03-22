"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
} from "lucide-react"

const categories = [
  { Icon: Smartphone, name: "Consumer Electronics", examples: "Smart devices, IoT, gadgets",    avgCost: "$8–$45",   moq: "200–1,000",  trend: "hot",  tag: "tech" },
  { Icon: Home,       name: "Smart Home",           examples: "Sensors, controllers, hubs",    avgCost: "$12–$60",  moq: "300–2,000",  trend: null,   tag: "tech" },
  { Icon: Watch,      name: "Wearable Tech",         examples: "Fitness bands, smart rings",   avgCost: "$15–$80",  moq: "500–2,000",  trend: "hot",  tag: "tech" },
  { Icon: Headphones, name: "Audio Equipment",       examples: "Earbuds, speakers, mics",      avgCost: "$6–$35",   moq: "300–1,500",  trend: null,   tag: "tech" },
  { Icon: UtensilsCrossed, name: "Kitchen & Dining", examples: "Cookware, utensils, storage",  avgCost: "$2–$25",   moq: "100–500",    trend: null,   tag: "home" },
  { Icon: Lamp,       name: "Home Decor",            examples: "Vases, frames, lighting",      avgCost: "$3–$30",   moq: "100–1,000",  trend: null,   tag: "home" },
  { Icon: Armchair,   name: "Furniture",             examples: "Desks, shelving, seating",     avgCost: "$25–$200", moq: "50–200",     trend: null,   tag: "home" },
  { Icon: Dog,        name: "Pet Products",          examples: "Bowls, toys, accessories",     avgCost: "$2–$18",   moq: "200–1,000",  trend: "new",  tag: "lifestyle" },
  { Icon: Baby,       name: "Baby & Kids",           examples: "Safety gear, toys, feeding",   avgCost: "$4–$25",   moq: "300–1,500",  trend: null,   tag: "lifestyle" },
  { Icon: Tent,       name: "Outdoor & Camping",     examples: "Gear, tools, lighting",        avgCost: "$5–$45",   moq: "100–500",    trend: null,   tag: "lifestyle" },
  { Icon: Dumbbell,   name: "Fitness & Sports",      examples: "Equipment, accessories",       avgCost: "$4–$50",   moq: "100–500",    trend: "hot",  tag: "lifestyle" },
  { Icon: Sparkles,   name: "Beauty & Cosmetics",    examples: "Containers, tools, devices",   avgCost: "$1–$20",   moq: "500–5,000",  trend: null,   tag: "beauty" },
  { Icon: ShoppingBag,name: "Bags & Luggage",        examples: "Backpacks, cases, wallets",    avgCost: "$5–$40",   moq: "100–500",    trend: null,   tag: "fashion" },
  { Icon: Footprints, name: "Footwear",              examples: "Sneakers, sandals, boots",     avgCost: "$8–$35",   moq: "300–1,000",  trend: null,   tag: "fashion" },
  { Icon: Gamepad2,   name: "Toys & Games",          examples: "Action figures, puzzles",      avgCost: "$2–$15",   moq: "500–2,000",  trend: null,   tag: "lifestyle" },
  { Icon: Car,        name: "Auto Accessories",      examples: "Mounts, organizers, tools",    avgCost: "$3–$25",   moq: "200–1,000",  trend: null,   tag: "auto" },
  { Icon: Pencil,     name: "Office & Stationery",   examples: "Organizers, supplies",         avgCost: "$1–$12",   moq: "500–5,000",  trend: null,   tag: "other" },
  { Icon: Stethoscope,name: "Medical Devices",       examples: "Monitors, tools, PPE",         avgCost: "$10–$100", moq: "100–500",    trend: null,   tag: "other" },
  { Icon: Shirt,      name: "Apparel",               examples: "T-shirts, jackets, hats",      avgCost: "$3–$25",   moq: "100–500",    trend: null,   tag: "fashion" },
  { Icon: Package,    name: "Packaging",             examples: "Boxes, bottles, pouches",      avgCost: "$0.10–$2", moq: "1,000–10K",  trend: null,   tag: "other" },
]

const TAGS = [
  { key: "all",       label: "All" },
  { key: "tech",      label: "Tech" },
  { key: "home",      label: "Home" },
  { key: "fashion",   label: "Fashion" },
  { key: "beauty",    label: "Beauty" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "auto",      label: "Auto" },
  { key: "other",     label: "Other" },
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
        c.examples.toLowerCase().includes(query.toLowerCase())
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
        {activeTag !== "all" || query ? " found" : " · click any to start analysis"}
      </p>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((cat, i) => (
            <motion.button
              key={cat.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.02, duration: 0.18 }}
              whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-left hover:border-[#FF6B35]/25 transition-all cursor-pointer group relative"
            >
              {/* Badge */}
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

              <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center group-hover:bg-[#FF6B35]/10 transition-colors">
                <cat.Icon className="w-[18px] h-[18px] text-[#FF6B35]" />
              </div>
              <p className="font-semibold text-[#1A1A1A] text-sm mt-2.5 leading-snug">
                {cat.name}
              </p>
              <p className="text-xs text-[#9B9B9B] mt-1 leading-snug">{cat.examples}</p>
              <div className="mt-2.5 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#FF6B35]">{cat.avgCost}/unit</p>
                <ArrowRight className="w-3.5 h-3.5 text-[#D0D0C8] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
              </div>
              <p className="text-[10px] text-[#C0C0BC] mt-0.5">MOQ: {cat.moq}</p>
            </motion.button>
          ))}
        </div>
      </AnimatePresence>

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
    </div>
  )
}
