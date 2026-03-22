"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Globe,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  ArrowRight,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ORIGIN_COUNTRIES = [
  { id: "CN", label: "China", flag: "🇨🇳", shortLabel: "China", baseTariff: 3.5, additionalTariff: 25, section301: true, fta: false, ftaName: null },
  { id: "VN", label: "Vietnam", flag: "🇻🇳", shortLabel: "Vietnam", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "IN", label: "India", flag: "🇮🇳", shortLabel: "India", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "MX", label: "Mexico (USMCA)", flag: "🇲🇽", shortLabel: "Mexico", baseTariff: 0, additionalTariff: 0, section301: false, fta: true, ftaName: "USMCA" },
  { id: "TW", label: "Taiwan", flag: "🇹🇼", shortLabel: "Taiwan", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "KR", label: "South Korea (KORUS)", flag: "🇰🇷", shortLabel: "S. Korea", baseTariff: 0, additionalTariff: 0, section301: false, fta: true, ftaName: "KORUS" },
  { id: "TH", label: "Thailand", flag: "🇹🇭", shortLabel: "Thailand", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "ID", label: "Indonesia", flag: "🇮🇩", shortLabel: "Indonesia", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "BD", label: "Bangladesh", flag: "🇧🇩", shortLabel: "Bangladesh", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "TR", label: "Turkey", flag: "🇹🇷", shortLabel: "Turkey", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
  { id: "PL", label: "Poland (EU)", flag: "🇵🇱", shortLabel: "Poland", baseTariff: 0, additionalTariff: 0, section301: false, fta: true, ftaName: "EU FTA" },
  { id: "PH", label: "Philippines", flag: "🇵🇭", shortLabel: "Philippines", baseTariff: 3.5, additionalTariff: 0, section301: false, fta: false, ftaName: null },
]

const PRODUCT_CATEGORIES = [
  { id: "8471", label: "Laptops & Computers", mfnRate: 0, hsCode: "8471", chapter: "Electronics" },
  { id: "8517", label: "Smartphones & Mobile Devices", mfnRate: 0, hsCode: "8517", chapter: "Electronics" },
  { id: "8518", label: "Audio Equipment (Speakers, Headphones)", mfnRate: 4.9, hsCode: "8518", chapter: "Electronics" },
  { id: "8543", label: "LED Products & Smart Devices", mfnRate: 2.0, hsCode: "8543", chapter: "Electronics" },
  { id: "8523", label: "USB Drives & Storage Devices", mfnRate: 0, hsCode: "8523", chapter: "Electronics" },
  { id: "9405", label: "Lighting Fixtures", mfnRate: 3.9, hsCode: "9405", chapter: "Lighting" },
  { id: "3926", label: "Plastic Products & Parts", mfnRate: 5.3, hsCode: "3926", chapter: "Plastics" },
  { id: "3923", label: "Plastic Containers & Bottles", mfnRate: 3.0, hsCode: "3923", chapter: "Plastics" },
  { id: "7326", label: "Metal Products & Hardware", mfnRate: 3.0, hsCode: "7326", chapter: "Metals" },
  { id: "7615", label: "Aluminum Kitchenware", mfnRate: 3.1, hsCode: "7615", chapter: "Metals" },
  { id: "6109", label: "T-Shirts & Knit Apparel", mfnRate: 16.5, hsCode: "6109", chapter: "Textiles" },
  { id: "6204", label: "Women's Clothing", mfnRate: 16.0, hsCode: "6204", chapter: "Textiles" },
  { id: "6203", label: "Men's Clothing", mfnRate: 12.0, hsCode: "6203", chapter: "Textiles" },
  { id: "6302", label: "Bed Linens & Towels", mfnRate: 6.8, hsCode: "6302", chapter: "Textiles" },
  { id: "6404", label: "Athletic Footwear", mfnRate: 20.0, hsCode: "6404", chapter: "Footwear" },
  { id: "6403", label: "Leather Footwear", mfnRate: 10.0, hsCode: "6403", chapter: "Footwear" },
  { id: "4202", label: "Bags, Backpacks & Luggage", mfnRate: 17.6, hsCode: "4202", chapter: "Bags" },
  { id: "9401", label: "Chairs & Seating", mfnRate: 0, hsCode: "9401", chapter: "Furniture" },
  { id: "9403", label: "Other Furniture", mfnRate: 0, hsCode: "9403", chapter: "Furniture" },
  { id: "9504", label: "Toys & Games", mfnRate: 0, hsCode: "9504", chapter: "Toys" },
  { id: "9503", label: "Stuffed Animals & Dolls", mfnRate: 0, hsCode: "9503", chapter: "Toys" },
  { id: "6911", label: "Ceramic Tableware", mfnRate: 9.0, hsCode: "6911", chapter: "Ceramics" },
  { id: "7013", label: "Glass Drinkware", mfnRate: 15.0, hsCode: "7013", chapter: "Glass" },
  { id: "8516", label: "Kitchen Appliances (Blenders, etc.)", mfnRate: 3.4, hsCode: "8516", chapter: "Appliances" },
  { id: "8509", label: "Floor Care & Vacuum Cleaners", mfnRate: 4.0, hsCode: "8509", chapter: "Appliances" },
  { id: "9506", label: "Sports & Fitness Equipment", mfnRate: 4.6, hsCode: "9506", chapter: "Sports" },
  { id: "9015", label: "Optical & Navigation Instruments", mfnRate: 0, hsCode: "9015", chapter: "Medical" },
  { id: "3304", label: "Cosmetics & Skincare", mfnRate: 0, hsCode: "3304", chapter: "Beauty" },
  { id: "3401", label: "Soap & Cleaning Products", mfnRate: 0, hsCode: "3401", chapter: "Cleaning" },
  { id: "8714", label: "Bicycle Parts & Accessories", mfnRate: 3.7, hsCode: "8714", chapter: "Auto/Cycle" },
  { id: "8708", label: "Auto Parts & Accessories", mfnRate: 2.5, hsCode: "8708", chapter: "Auto" },
  { id: "9018", label: "Medical Devices", mfnRate: 0, hsCode: "9018", chapter: "Medical" },
  { id: "0902", label: "Tea & Herbal Products", mfnRate: 0, hsCode: "0902", chapter: "Food" },
  { id: "2106", label: "Nutritional Supplements", mfnRate: 1.4, hsCode: "2106", chapter: "Food" },
  { id: "4911", label: "Printed Packaging & Labels", mfnRate: 0, hsCode: "4911", chapter: "Packaging" },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
}

function calcForCountry(
  country: typeof ORIGIN_COUNTRIES[number],
  cat: typeof PRODUCT_CATEGORIES[number],
  productValue: number,
  quantity: number
) {
  const mfnRate = country.fta ? 0 : cat.mfnRate
  const additionalRate = country.additionalTariff
  const totalRate = mfnRate + additionalRate
  const dutyAmount = (productValue * totalRate) / 100
  const landedCost = productValue + dutyAmount
  const perUnit = dutyAmount / quantity
  const landedPerUnit = landedCost / quantity
  return { mfnRate, additionalRate, totalRate, dutyAmount, landedCost, perUnit, landedPerUnit }
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: string
  sub?: string
  color?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl border border-[#E8E8E4] p-5"
    >
      <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-black ${color ?? "text-[#1A1A1A]"}`}>{value}</p>
      {sub && <p className="text-xs text-[#6B6B6B] mt-1">{sub}</p>}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function TariffCalculatorPage() {
  const [originCountry, setOriginCountry] = useState("CN")
  const [productCategory, setProductCategory] = useState("8471")
  const [productValue, setProductValue] = useState(10000)
  const [quantity, setQuantity] = useState(500)
  const [categorySearch, setCategorySearch] = useState("")

  const origin = useMemo(
    () => ORIGIN_COUNTRIES.find((c) => c.id === originCountry)!,
    [originCountry]
  )

  const cat = useMemo(
    () => PRODUCT_CATEGORIES.find((c) => c.id === productCategory)!,
    [productCategory]
  )

  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase()
    if (!q) return PRODUCT_CATEGORIES
    return PRODUCT_CATEGORIES.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hsCode.includes(q) ||
        c.chapter.toLowerCase().includes(q)
    )
  }, [categorySearch])

  const calc = useMemo(
    () => calcForCountry(origin, cat, productValue, quantity),
    [origin, cat, productValue, quantity]
  )

  // China baseline for comparison
  const chinaCountry = ORIGIN_COUNTRIES.find((c) => c.id === "CN")!
  const chinaCalc = useMemo(
    () => calcForCountry(chinaCountry, cat, productValue, quantity),
    [cat, productValue, quantity]
  )

  // Multi-country comparison table, sorted by total rate ascending
  const comparisonRows = useMemo(() => {
    return ORIGIN_COUNTRIES.map((country) => {
      const r = calcForCountry(country, cat, productValue, quantity)
      const savingsVsChina = chinaCalc.dutyAmount - r.dutyAmount
      return { country, ...r, savingsVsChina }
    }).sort((a, b) => a.totalRate - b.totalRate)
  }, [cat, productValue, quantity, chinaCalc.dutyAmount])

  // Stacked bar widths
  const maxLanded = Math.max(...comparisonRows.map((r) => r.landedCost), 1)
  const productBarPct = (productValue / Math.max(calc.landedCost, 1)) * 100
  const dutyBarPct = (calc.dutyAmount / Math.max(calc.landedCost, 1)) * 100

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/tools"
          className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8 w-fit transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">Tariff Calculator</h1>
          </div>
          <p className="text-[#6B6B6B] max-w-2xl">
            Calculate US import duties for your product, compare all manufacturing countries side by side, and see exactly how much you can save by shifting production.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* INPUT + RESULT GRID                                               */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">

          {/* Inputs — 2 cols */}
          <div className="lg:col-span-2 space-y-5">

            {/* Origin country */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Origin Country
              </label>
              <select
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1A] outline-none focus:border-[#FF6B35] transition-colors"
              >
                {ORIGIN_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                    {c.section301 ? " ⚠ +Section 301" : ""}
                    {c.fta ? " ✓ FTA" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Category search */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Product Category
              </label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Search by name, HS code, or chapter..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A1A1A] placeholder-[#9B9B9B] outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
              <select
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value)
                  setCategorySearch("")
                }}
                size={6}
                className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#FF6B35] transition-colors"
              >
                {filteredCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} — {c.mfnRate}% MFN
                  </option>
                ))}
              </select>
              {filteredCategories.length === 0 && (
                <p className="text-xs text-[#6B6B6B] mt-2 pl-1">No categories match your search.</p>
              )}
            </div>

            {/* Shipment value */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Total Shipment Value (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] font-semibold">$</span>
                <input
                  type="number"
                  value={productValue}
                  onChange={(e) => setProductValue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl pl-8 pr-4 py-3 text-[#1A1A1A] outline-none focus:border-[#FF6B35] transition-colors"
                  min={0}
                />
              </div>
            </div>

            {/* Units */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Units in Shipment
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1A] outline-none focus:border-[#FF6B35] transition-colors"
                min={1}
              />
            </div>
          </div>

          {/* Results — 3 cols */}
          <div className="lg:col-span-3 space-y-5">

            {/* Section 301 warning */}
            <AnimatePresence>
              {origin.section301 && (
                <motion.div
                  key="s301"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#991B1B] mb-1">Section 301 Tariffs Apply</p>
                      <p className="text-sm text-[#B91C1C]">
                        China-origin goods face an additional <strong>25% Section 301 tariff</strong> on top of standard MFN rates. This tariff was enacted in 2018 and remains in effect across most product categories. Your effective rate includes this surcharge.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FTA callout */}
            <AnimatePresence>
              {origin.fta && (
                <motion.div
                  key="fta"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#166534] mb-1">
                        {origin.ftaName} Free Trade Agreement
                      </p>
                      <p className="text-sm text-[#15803D]">
                        {origin.id === "MX" && "Under USMCA (formerly NAFTA), qualifying goods manufactured in Mexico enter the US duty-free. Rules of origin apply — confirm your product meets regional content requirements."}
                        {origin.id === "KR" && "Under the KORUS FTA, most Korean-manufactured goods enter the US at 0% duty. Electronics, apparel, and machinery are broadly covered. Rules of origin apply."}
                        {origin.id === "PL" && "Poland is an EU member state. While the US–EU FTA framework provides preferential access for many goods, verify your specific HS code for eligibility. Rules of origin apply."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main breakdown card */}
            <motion.div
              key={`${originCountry}-${productCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
            >
              {/* HS code badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm font-semibold text-[#1A1A1A]">Tariff Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B6B6B]">HS Code</span>
                  <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold px-3 py-1 rounded-full">
                    {cat.hsCode}
                  </span>
                  <span className="bg-[#E8E8E4] text-[#6B6B6B] text-xs font-medium px-3 py-1 rounded-full">
                    {cat.chapter}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6B6B]">MFN Tariff Rate</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {calc.mfnRate}%
                    {origin.fta && (
                      <span className="text-[#22C55E] text-xs ml-2">(FTA — 0%)</span>
                    )}
                  </span>
                </div>

                {origin.section301 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#EF4444]">Section 301 Additional</span>
                    <span className="font-semibold text-[#EF4444]">+{calc.additionalRate}%</span>
                  </div>
                )}

                <div className="h-px bg-[#E8E8E4]" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1A1A1A]">Effective Tariff Rate</span>
                  <span className="text-2xl font-black text-[#FF6B35]">{calc.totalRate}%</span>
                </div>

                <div className="h-px bg-[#E8E8E4]" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6B6B]">Shipment value</span>
                  <span className="font-semibold">${fmt(productValue)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6B6B]">Estimated duty owed</span>
                  <span className="font-semibold text-[#EF4444]">${fmt(calc.dutyAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6B6B]">Duty per unit</span>
                  <span className="font-semibold">${fmt(calc.perUnit, 2)}</span>
                </div>

                <div className="h-px bg-[#E8E8E4]" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1A1A1A]">Total Landed Cost</span>
                  <span className="text-xl font-black text-[#1A1A1A]">${fmt(calc.landedCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6B6B]">Landed cost per unit</span>
                  <span className="font-semibold">${fmt(calc.landedPerUnit, 2)}</span>
                </div>
              </div>

              {/* Stacked bar visualization */}
              <div className="mt-6">
                <p className="text-xs font-medium text-[#6B6B6B] mb-2">Cost composition</p>
                <div className="flex h-5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-[#E8E8E4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${productBarPct}%` }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                  />
                  <motion.div
                    className="bg-[#EF4444]"
                    initial={{ width: 0 }}
                    animate={{ width: `${dutyBarPct}%` }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
                  />
                </div>
                <div className="flex gap-5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#E8E8E4]" />
                    <span className="text-xs text-[#6B6B6B]">Product value</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
                    <span className="text-xs text-[#6B6B6B]">Duty amount</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
            >
              <StatCard
                label="Effective Rate"
                value={`${calc.totalRate}%`}
                sub={`MFN ${calc.mfnRate}% + Additional ${calc.additionalRate}%`}
                color={calc.totalRate > 15 ? "text-[#EF4444]" : calc.totalRate > 5 ? "text-[#F59E0B]" : "text-[#22C55E]"}
              />
              <StatCard
                label="Duty Owed"
                value={`$${fmt(calc.dutyAmount)}`}
                sub={`$${fmt(calc.perUnit, 2)} per unit`}
                color="text-[#EF4444]"
              />
              <StatCard
                label="Landed Cost"
                value={`$${fmt(calc.landedCost)}`}
                sub={`$${fmt(calc.landedPerUnit, 2)} per unit`}
              />
              {originCountry !== "CN" ? (
                <StatCard
                  label="Savings vs China"
                  value={`$${fmt(Math.max(0, chinaCalc.dutyAmount - calc.dutyAmount))}`}
                  sub={`China rate: ${chinaCalc.totalRate}% vs yours: ${calc.totalRate}%`}
                  color="text-[#22C55E]"
                />
              ) : (
                <StatCard
                  label="China Total Rate"
                  value={`${calc.totalRate}%`}
                  sub="Incl. 25% Section 301"
                  color="text-[#EF4444]"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* MULTI-COUNTRY COMPARISON TABLE                                    */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden mb-10"
        >
          <div className="px-6 py-5 border-b border-[#E8E8E4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="font-bold text-[#1A1A1A]">Country Comparison</h2>
              <span className="text-xs text-[#6B6B6B] ml-1">— sorted by lowest total rate</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
              <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span>Selected country</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E4]">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Country</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">FTA?</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">MFN Rate</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Add&apos;l Tariff</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Total Rate</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Est. Duty</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Landed Cost</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Savings vs China</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => {
                  const isSelected = row.country.id === originCountry
                  const isCN = row.country.id === "CN"
                  const hasSavings = !isCN && row.savingsVsChina > 0
                  const isLoss = !isCN && row.savingsVsChina < 0

                  return (
                    <motion.tr
                      key={row.country.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] as const }}
                      onClick={() => setOriginCountry(row.country.id)}
                      className={`border-b border-[#E8E8E4] cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#FFF0EB]"
                          : "hover:bg-[#FAFAF8]"
                      }`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span>{row.country.flag}</span>
                          <span className={`font-medium ${isSelected ? "text-[#FF6B35]" : "text-[#1A1A1A]"}`}>
                            {row.country.shortLabel}
                          </span>
                          {isSelected && (
                            <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">Selected</span>
                          )}
                          {row.country.section301 && (
                            <span className="text-xs bg-[#FEE2E2] text-[#EF4444] px-2 py-0.5 rounded-full">S.301</span>
                          )}
                        </div>
                      </td>
                      <td className="text-center px-4 py-3">
                        {row.country.fta ? (
                          <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-xs">
                            <CheckCircle className="w-3.5 h-3.5" /> {row.country.ftaName}
                          </span>
                        ) : (
                          <span className="text-[#9B9B9B] text-xs">—</span>
                        )}
                      </td>
                      <td className="text-right px-4 py-3 text-[#6B6B6B]">{row.mfnRate}%</td>
                      <td className="text-right px-4 py-3">
                        {row.additionalRate > 0 ? (
                          <span className="text-[#EF4444] font-semibold">+{row.additionalRate}%</span>
                        ) : (
                          <span className="text-[#9B9B9B]">—</span>
                        )}
                      </td>
                      <td className="text-right px-4 py-3">
                        <span
                          className={`font-bold ${
                            row.totalRate === 0
                              ? "text-[#22C55E]"
                              : row.totalRate > 15
                              ? "text-[#EF4444]"
                              : row.totalRate > 5
                              ? "text-[#F59E0B]"
                              : "text-[#1A1A1A]"
                          }`}
                        >
                          {row.totalRate}%
                        </span>
                      </td>
                      <td className="text-right px-4 py-3 font-medium text-[#1A1A1A]">
                        ${fmt(row.dutyAmount)}
                      </td>
                      <td className="text-right px-4 py-3 font-medium text-[#1A1A1A]">
                        ${fmt(row.landedCost)}
                      </td>
                      <td className="text-right px-6 py-3">
                        {isCN ? (
                          <span className="text-xs text-[#6B6B6B]">baseline</span>
                        ) : hasSavings ? (
                          <span className="text-[#22C55E] font-semibold flex items-center justify-end gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            ${fmt(row.savingsVsChina)}
                          </span>
                        ) : isLoss ? (
                          <span className="text-[#EF4444] font-semibold flex items-center justify-end gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            -${fmt(Math.abs(row.savingsVsChina))}
                          </span>
                        ) : (
                          <span className="text-[#9B9B9B] text-xs">same</span>
                        )}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Best alternative callout */}
          {(() => {
            const bestNonChina = comparisonRows.find((r) => !r.country.section301 && r.savingsVsChina > 0)
            if (!bestNonChina) return null
            return (
              <div className="px-6 py-4 bg-[#F0FDF4] border-t border-[#BBF7D0]">
                <p className="text-sm text-[#166534]">
                  <strong>Best alternative to China:</strong> {bestNonChina.country.flag} {bestNonChina.country.label} at{" "}
                  <strong>{bestNonChina.totalRate}%</strong> effective rate — saves{" "}
                  <strong>${fmt(bestNonChina.savingsVsChina)}</strong> in duty on this shipment.
                </p>
              </div>
            )
          })()}
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* CTA BANNER                                                        */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-black text-white text-xl mb-1">Need exact tariff classification?</p>
            <p className="text-[#9B9B9B] text-sm max-w-md">
              Get a full Bottlecap analysis — includes HS code lookup with confidence score, supplier-country risk breakdown, and a sourcing action plan. Delivered in 2–5 minutes.
            </p>
          </div>
          <Link
            href="/analyze"
            className="shrink-0 bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
          >
            Get Full Analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
