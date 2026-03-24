"use client"

import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Globe,
  FlaskConical,
  Package,
  Search,
  ChevronDown,
  Recycle,
  Leaf,
} from "lucide-react"
import { MANUFACTURING_COUNTRIES } from "@/lib/data/countries"
import { MATERIALS_DATABASE } from "@/lib/data/materials"
import { PRODUCT_COSTS } from "@/lib/data/product-costs"

type Tab = "countries" | "materials" | "products"

const TABS: { key: Tab; label: string; icon: typeof Globe; count: number }[] = [
  { key: "countries", label: "Countries", icon: Globe, count: MANUFACTURING_COUNTRIES.length },
  { key: "materials", label: "Materials", icon: FlaskConical, count: MATERIALS_DATABASE.length },
  { key: "products", label: "Products", icon: Package, count: PRODUCT_COSTS.length },
]

const MATERIAL_CATEGORIES = [
  "All",
  "Metals",
  "Plastics",
  "Textiles",
  "Composites",
  "Natural",
  "Ceramics",
] as const

function RatingBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-[#6B6B6B] w-4 text-right">{value}</span>
    </div>
  )
}

export default function DataExplorer() {
  const [activeTab, setActiveTab] = useState<Tab>("countries")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [materialCategory, setMaterialCategory] = useState<string>("All")

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id))
  }

  // Filtered data
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase()
    if (!q) return [...MANUFACTURING_COUNTRIES]
    return MANUFACTURING_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.specializations.some((s) => s.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const filteredMaterials = useMemo(() => {
    const q = searchQuery.toLowerCase()
    let results = [...MATERIALS_DATABASE]
    if (materialCategory !== "All") {
      results = results.filter((m) => m.category === materialCategory)
    }
    if (q) {
      results = results.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.properties.some((p) => p.toLowerCase().includes(q)) ||
          m.commonUses.some((u) => u.toLowerCase().includes(q))
      )
    }
    return results
  }, [searchQuery, materialCategory])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase()
    if (!q) return [...PRODUCT_COSTS]
    return PRODUCT_COSTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    )
  }, [searchQuery])

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key)
              setSearchQuery("")
              setExpandedItem(null)
              setMaterialCategory("All")
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-[#1A1A1A] shadow-sm"
                : "text-[#6B6B6B] hover:text-[#1A1A1A]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className="text-xs text-[#767676]">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
        <input
          type="text"
          placeholder={
            activeTab === "countries"
              ? "Search countries, regions, specializations..."
              : activeTab === "materials"
                ? "Search materials, properties, uses..."
                : "Search products, categories, materials..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#E8E8E4] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      {/* Material category filter */}
      {activeTab === "materials" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {MATERIAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setMaterialCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                materialCategory === cat
                  ? "bg-[#FF6B35] text-white"
                  : "bg-[#F5F5F0] text-[#6B6B6B] hover:bg-[#E8E8E4]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* COUNTRIES TAB */}
          {activeTab === "countries" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                    expandedItem === country.code
                      ? "border-[#FF6B35]/30 ring-1 ring-[#FF6B35]/10"
                      : "border-[#E8E8E4]"
                  }`}
                  onClick={() => toggleExpand(country.code)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.emoji}</span>
                      <span className="font-semibold text-[#1A1A1A]">
                        {country.name}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItem === country.code ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#767676]" />
                    </motion.div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#767676] mb-0.5">
                        <span>Quality</span>
                      </div>
                      <RatingBar value={country.qualityRating} color="#22C55E" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#767676] mb-0.5">
                        <span>IP Protection</span>
                      </div>
                      <RatingBar value={country.ipProtection} color="#3B82F6" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#767676] mb-0.5">
                        <span>Infrastructure</span>
                      </div>
                      <RatingBar value={country.infrastructure} color="#F59E0B" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2 py-0.5">
                      ${country.laborCostPerHour}/hr
                    </span>
                    <span className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2 py-0.5">
                      {country.avgLeadTimeDays}d lead
                    </span>
                    <span className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2 py-0.5">
                      {country.avgTariffToUS}% tariff
                    </span>
                  </div>

                  <AnimatePresence>
                    {expandedItem === country.code && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[#E8E8E4] space-y-3">
                          <p className="text-xs text-[#6B6B6B] leading-relaxed">
                            {country.description}
                          </p>
                          <div>
                            <p className="text-[10px] font-semibold text-[#1A1A1A] mb-1">
                              Strengths
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {country.strengths.map((s) => (
                                <span
                                  key={s}
                                  className="text-[10px] bg-[#DCFCE7] text-[#166534] rounded-full px-2 py-0.5"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#1A1A1A] mb-1">
                              Weaknesses
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {country.weaknesses.map((w) => (
                                <span
                                  key={w}
                                  className="text-[10px] bg-[#FEF2F2] text-[#991B1B] rounded-full px-2 py-0.5"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-[#767676]">Ports:</span>{" "}
                              <span className="text-[#6B6B6B]">
                                {country.keyPorts.join(", ")}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Currency:</span>{" "}
                              <span className="text-[#6B6B6B]">{country.currency}</span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Language:</span>{" "}
                              <span className="text-[#6B6B6B]">{country.language}</span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Timezone:</span>{" "}
                              <span className="text-[#6B6B6B]">{country.timezone}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* MATERIALS TAB */}
          {activeTab === "materials" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.slice(0, 18).map((mat) => (
                <div
                  key={mat.name}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                    expandedItem === mat.name
                      ? "border-[#FF6B35]/30 ring-1 ring-[#FF6B35]/10"
                      : "border-[#E8E8E4]"
                  }`}
                  onClick={() => toggleExpand(mat.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-[#1A1A1A]">
                      {mat.name}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedItem === mat.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#767676]" />
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[10px] bg-[#EEF2FF] text-[#4F46E5] rounded-full px-2 py-0.5">
                      {mat.category}
                    </span>
                    <span className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2 py-0.5">
                      ${mat.costPerKg.min}–${mat.costPerKg.max}/kg
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] rounded-full px-2 py-0.5 ${
                        mat.sustainability === "High"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : mat.sustainability === "Medium"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#FEF2F2] text-[#991B1B]"
                      }`}
                    >
                      <Leaf className="w-2.5 h-2.5" />
                      {mat.sustainability}
                    </span>
                    {mat.recyclable && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[#DCFCE7] text-[#166534] rounded-full px-2 py-0.5">
                        <Recycle className="w-2.5 h-2.5" />
                        Recyclable
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedItem === mat.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#E8E8E4] space-y-2">
                          <div>
                            <p className="text-[10px] font-semibold text-[#1A1A1A] mb-1">
                              Properties
                            </p>
                            <p className="text-xs text-[#6B6B6B]">
                              {mat.properties.join(" · ")}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#1A1A1A] mb-1">
                              Common Uses
                            </p>
                            <p className="text-xs text-[#6B6B6B]">
                              {mat.commonUses.join(" · ")}
                            </p>
                          </div>
                          <p className="text-[10px] text-[#767676]">
                            Min. order: {mat.minOrderKg.toLocaleString()} kg
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {filteredMaterials.length > 18 && (
                <div className="sm:col-span-2 lg:col-span-3 text-center text-xs text-[#767676] py-2">
                  Showing 18 of {filteredMaterials.length} materials. Use search to narrow results.
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.slice(0, 16).map((product) => (
                <div
                  key={product.slug}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                    expandedItem === product.slug
                      ? "border-[#FF6B35]/30 ring-1 ring-[#FF6B35]/10"
                      : "border-[#E8E8E4]"
                  }`}
                  onClick={() => toggleExpand(product.slug)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-[#1A1A1A]">
                      {product.name}
                    </span>
                    <motion.div
                      animate={{
                        rotate: expandedItem === product.slug ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#767676]" />
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] bg-[#FFF0EB] text-[#FF6B35] rounded-full px-2 py-0.5">
                      {product.category}
                    </span>
                    <span className="text-[10px] bg-[#F5F5F0] text-[#6B6B6B] rounded-full px-2 py-0.5">
                      MOQ {product.moqRange.min.toLocaleString()}–
                      {product.moqRange.max.toLocaleString()}
                    </span>
                  </div>

                  {/* Cost range bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-[#767676] mb-1">
                      <span>Unit cost</span>
                      <span>
                        ${product.avgUnitCost.min} – ${product.avgUnitCost.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B35] rounded-full"
                        style={{
                          marginLeft: `${Math.min(product.avgUnitCost.min / 50, 1) * 100}%`,
                          width: `${Math.min((product.avgUnitCost.max - product.avgUnitCost.min) / 50, 1) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.topCountries.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="text-[10px] text-[#6B6B6B] bg-[#F5F5F0] rounded-full px-2 py-0.5"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {expandedItem === product.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#E8E8E4] space-y-2">
                          <p className="text-xs text-[#6B6B6B] leading-relaxed">
                            {product.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-[#767676]">Lead time:</span>{" "}
                              <span className="text-[#6B6B6B]">
                                {product.avgLeadTimeDays} days
                              </span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Tooling:</span>{" "}
                              <span className="text-[#6B6B6B]">
                                ${product.toolingCost.min.toLocaleString()}–$
                                {product.toolingCost.max.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Shipping:</span>{" "}
                              <span className="text-[#6B6B6B]">
                                ${product.shippingPerUnit.min}–$
                                {product.shippingPerUnit.max}/unit
                              </span>
                            </div>
                            <div>
                              <span className="text-[#767676]">Materials:</span>{" "}
                              <span className="text-[#6B6B6B]">
                                {product.materials.slice(0, 3).join(", ")}
                              </span>
                            </div>
                          </div>
                          <div className="bg-[#F5F5F0] rounded-lg p-2">
                            <p className="text-[10px] text-[#1A1A1A]">
                              <span className="font-medium">Margin tip: </span>
                              {product.marginAdvice.length > 150
                                ? product.marginAdvice.slice(0, 150) + "..."
                                : product.marginAdvice}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {filteredProducts.length > 16 && (
                <div className="sm:col-span-2 text-center text-xs text-[#767676] py-2">
                  Showing 16 of {filteredProducts.length} products. Use search to narrow results.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
