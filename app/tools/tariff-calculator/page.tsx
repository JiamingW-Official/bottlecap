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
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  DollarSign,
  BarChart2,
  Package,
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
  const [usmcaEligible, setUsmcaEligible] = useState(true)
  const [shippingMode, setShippingMode] = useState<"sea" | "air">("sea")
  const [classifierOpen, setClassifierOpen] = useState(false)
  const [landedTableOpen, setLandedTableOpen] = useState(false)

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const productBarPct = (productValue / Math.max(calc.landedCost, 1)) * 100
  const dutyBarPct = (calc.dutyAmount / Math.max(calc.landedCost, 1)) * 100

  // Freight per unit
  const freightPerUnit = shippingMode === "sea" ? 1.20 : 4.50
  const freightTotal = freightPerUnit * quantity
  const brokerFeePerUnit = 0.25
  const brokerFeeTotal = brokerFeePerUnit * quantity

  // Sourcing scenario comparison (China, Vietnam, Mexico)
  const cnCountry = ORIGIN_COUNTRIES.find((c) => c.id === "CN")!
  const vnCountry = ORIGIN_COUNTRIES.find((c) => c.id === "VN")!
  const mxCountry = ORIGIN_COUNTRIES.find((c) => c.id === "MX")!
  const unitCost = quantity > 0 ? productValue / quantity : 0

  const cnScenario = useMemo(() => calcForCountry(cnCountry, cat, productValue, quantity), [cat, productValue, quantity])
  const vnScenario = useMemo(() => calcForCountry(vnCountry, cat, productValue, quantity), [cat, productValue, quantity])
  const mxScenario = useMemo(() => {
    const mxEffective = usmcaEligible
      ? { ...calcForCountry(mxCountry, cat, productValue, quantity) }
      : calcForCountry({ ...mxCountry, fta: false, baseTariff: cat.mfnRate }, cat, productValue, quantity)
    return mxEffective
  }, [cat, productValue, quantity, usmcaEligible])

  const scenarioLandedPerUnit = [
    cnScenario.landedPerUnit + freightPerUnit + brokerFeePerUnit,
    vnScenario.landedPerUnit + freightPerUnit + brokerFeePerUnit,
    mxScenario.landedPerUnit + freightPerUnit + brokerFeePerUnit,
  ]
  const bestScenarioIndex = scenarioLandedPerUnit.indexOf(Math.min(...scenarioLandedPerUnit))

  // Landed cost breakdown for current selection
  const mfnDutyTotal = (productValue * calc.mfnRate) / 100
  const s301DutyTotal = origin.section301 ? (productValue * calc.additionalRate) / 100 : 0
  const grandTotal = productValue + freightTotal + mfnDutyTotal + s301DutyTotal + brokerFeeTotal
  const pct = (n: number) => grandTotal > 0 ? ((n / grandTotal) * 100).toFixed(1) : "0.0"

  // China decision helper
  const chinaTotalRate = chinaCalc.totalRate
  let chinaDecision: { level: "red" | "amber" | "green"; message: string }
  if (chinaTotalRate > 30) {
    chinaDecision = {
      level: "red",
      message: `Consider Vietnam or Mexico. China's total duty rate for this product is high (${chinaTotalRate}%).`,
    }
  } else if (chinaTotalRate >= 15) {
    chinaDecision = {
      level: "amber",
      message: `Borderline. China's duty rate is ${chinaTotalRate}%. Compare landed cost carefully before committing to a supplier.`,
    }
  } else {
    chinaDecision = {
      level: "green",
      message: `China still competitive at ${chinaTotalRate}% total duty. Focus on supplier quality and lead times.`,
    }
  }

  const decisionStyles = {
    red: { bg: "bg-[#FEF2F2]", border: "border-[#FECACA]", text: "text-[#991B1B]", icon: "text-[#EF4444]" },
    amber: { bg: "bg-[#FFFBEB]", border: "border-[#FDE68A]", text: "text-[#92400E]", icon: "text-[#F59E0B]" },
    green: { bg: "bg-[#F0FDF4]", border: "border-[#BBF7D0]", text: "text-[#166534]", icon: "text-[#22C55E]" },
  }
  const ds = decisionStyles[chinaDecision.level]

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

            {/* Shipping mode */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Shipping Mode
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setShippingMode("sea")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                    shippingMode === "sea"
                      ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                      : "bg-white border-[#E8E8E4] text-[#6B6B6B]"
                  }`}
                >
                  Sea ($1.20/unit)
                </button>
                <button
                  onClick={() => setShippingMode("air")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                    shippingMode === "air"
                      ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                      : "bg-white border-[#E8E8E4] text-[#6B6B6B]"
                  }`}
                >
                  Air ($4.50/unit)
                </button>
              </div>
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
        {/* SOURCING SCENARIO COMPARISON                                       */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden mb-6"
        >
          <div className="px-6 py-5 border-b border-[#E8E8E4] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="font-bold text-[#1A1A1A]">Sourcing Scenario Comparison</h2>
              <span className="text-xs text-[#6B6B6B] ml-1">— same product, 3 countries</span>
            </div>
            {/* USMCA toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm text-[#6B6B6B]">USMCA eligible?</span>
              <button
                role="switch"
                aria-checked={usmcaEligible}
                onClick={() => setUsmcaEligible(!usmcaEligible)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  usmcaEligible ? "bg-[#22C55E]" : "bg-[#D1D5DB]"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    usmcaEligible ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E4]">
            {[
              {
                flag: "🇨🇳",
                label: "China",
                mfnRate: cnScenario.mfnRate,
                additionalRate: cnScenario.additionalRate,
                totalRate: cnScenario.totalRate,
                dutyPerUnit: cnScenario.perUnit,
                netLandedPerUnit: scenarioLandedPerUnit[0],
                isBest: bestScenarioIndex === 0,
                note: cnScenario.additionalRate > 0 ? `MFN ${cnScenario.mfnRate}% + Section 301 ${cnScenario.additionalRate}%` : `MFN only: ${cnScenario.mfnRate}%`,
              },
              {
                flag: "🇻🇳",
                label: "Vietnam",
                mfnRate: vnScenario.mfnRate,
                additionalRate: 0,
                totalRate: vnScenario.totalRate,
                dutyPerUnit: vnScenario.perUnit,
                netLandedPerUnit: scenarioLandedPerUnit[1],
                isBest: bestScenarioIndex === 1,
                note: `MFN only: ${vnScenario.mfnRate}%`,
              },
              {
                flag: "🇲🇽",
                label: "Mexico",
                mfnRate: usmcaEligible ? 0 : cat.mfnRate,
                additionalRate: 0,
                totalRate: mxScenario.totalRate,
                dutyPerUnit: mxScenario.perUnit,
                netLandedPerUnit: scenarioLandedPerUnit[2],
                isBest: bestScenarioIndex === 2,
                note: usmcaEligible ? "0% under USMCA" : `MFN only: ${cat.mfnRate}% (not USMCA eligible)`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`p-6 relative ${s.isBest ? "ring-2 ring-inset ring-[#22C55E] rounded-none" : ""}`}
              >
                {s.isBest && (
                  <span className="absolute top-3 right-3 bg-[#22C55E] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Best option
                  </span>
                )}
                <p className="text-2xl mb-1">{s.flag}</p>
                <p className="font-bold text-[#1A1A1A] text-lg mb-0.5">{s.label}</p>
                <p className="text-xs text-[#6B6B6B] mb-4">{s.note}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Total tariff</span>
                    <span className={`font-bold ${s.totalRate === 0 ? "text-[#22C55E]" : s.totalRate > 20 ? "text-[#EF4444]" : "text-[#F59E0B]"}`}>
                      {s.totalRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Duty per unit</span>
                    <span className="font-semibold text-[#1A1A1A]">${fmt(s.dutyPerUnit, 2)}</span>
                  </div>
                  <div className="h-px bg-[#E8E8E4]" />
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B] font-medium">Net landed / unit</span>
                    <span className={`font-black text-base ${s.isBest ? "text-[#22C55E]" : "text-[#1A1A1A]"}`}>
                      ${fmt(s.netLandedPerUnit, 2)}
                    </span>
                  </div>
                  <p className="text-xs text-[#9B9B9B]">Incl. FOB + duty + freight + broker</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* "SHOULD I SOURCE FROM CHINA?" DECISION HELPER                     */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          className={`${ds.bg} border ${ds.border} rounded-2xl p-5 mb-6 flex items-start gap-4`}
        >
          {chinaDecision.level === "red" && <AlertTriangle className={`w-5 h-5 ${ds.icon} mt-0.5 shrink-0`} />}
          {chinaDecision.level === "amber" && <Info className={`w-5 h-5 ${ds.icon} mt-0.5 shrink-0`} />}
          {chinaDecision.level === "green" && <CheckCircle className={`w-5 h-5 ${ds.icon} mt-0.5 shrink-0`} />}
          <div>
            <p className={`font-bold mb-1 ${ds.text}`}>Should I source from China?</p>
            <p className={`text-sm ${ds.text}`}>{chinaDecision.message}</p>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* LANDED COST BREAKDOWN TABLE (expandable)                          */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden mb-6"
        >
          <button
            onClick={() => setLandedTableOpen(!landedTableOpen)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAFAF8] transition-colors"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#FF6B35]" />
              <span className="font-bold text-[#1A1A1A]">Full Landed Cost Breakdown</span>
            </div>
            {landedTableOpen ? (
              <ChevronUp className="w-5 h-5 text-[#6B6B6B]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
            )}
          </button>

          <AnimatePresence>
            {landedTableOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto border-t border-[#E8E8E4]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Component</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Amount (total)</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Per unit</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">% of total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: "Unit cost (FOB)",
                          total: productValue,
                          per: unitCost,
                          note: "",
                        },
                        {
                          label: `Ocean/Air freight (${shippingMode})`,
                          total: freightTotal,
                          per: freightPerUnit,
                          note: `$${freightPerUnit.toFixed(2)}/unit est.`,
                        },
                        {
                          label: "Import duty (MFN)",
                          total: mfnDutyTotal,
                          per: quantity > 0 ? mfnDutyTotal / quantity : 0,
                          note: `${calc.mfnRate}% of FOB`,
                        },
                        ...(origin.section301
                          ? [
                              {
                                label: "Section 301 surcharge",
                                total: s301DutyTotal,
                                per: quantity > 0 ? s301DutyTotal / quantity : 0,
                                note: `${calc.additionalRate}% of FOB`,
                              },
                            ]
                          : []),
                        {
                          label: "Customs broker fee",
                          total: brokerFeeTotal,
                          per: brokerFeePerUnit,
                          note: "~est.",
                        },
                      ].map((row) => (
                        <tr key={row.label} className="border-b border-[#E8E8E4]">
                          <td className="px-6 py-3 text-[#1A1A1A]">
                            {row.label}
                            {row.note && (
                              <span className="ml-2 text-xs text-[#9B9B9B]">{row.note}</span>
                            )}
                          </td>
                          <td className="text-right px-4 py-3 font-medium text-[#1A1A1A]">${fmt(row.total, 2)}</td>
                          <td className="text-right px-4 py-3 text-[#6B6B6B]">${fmt(row.per, 2)}</td>
                          <td className="text-right px-6 py-3 text-[#6B6B6B]">{pct(row.total)}%</td>
                        </tr>
                      ))}
                      <tr className="bg-[#FAFAF8]">
                        <td className="px-6 py-3 font-bold text-[#1A1A1A]">Total landed cost</td>
                        <td className="text-right px-4 py-3 font-black text-[#1A1A1A]">${fmt(grandTotal, 2)}</td>
                        <td className="text-right px-4 py-3 font-bold text-[#1A1A1A]">${fmt(quantity > 0 ? grandTotal / quantity : 0, 2)}</td>
                        <td className="text-right px-6 py-3 font-bold text-[#1A1A1A]">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* TARIFF CLASSIFICATION HELPER (collapsible accordion)              */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden mb-10"
        >
          <button
            onClick={() => setClassifierOpen(!classifierOpen)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAFAF8] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#FF6B35]" />
              <span className="font-bold text-[#1A1A1A]">How was this tariff determined?</span>
            </div>
            {classifierOpen ? (
              <ChevronUp className="w-5 h-5 text-[#6B6B6B]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
            )}
          </button>

          <AnimatePresence>
            {classifierOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-[#E8E8E4] pt-5 space-y-5">
                  <div>
                    <p className="font-semibold text-[#1A1A1A] mb-1">What is MFN (Most-Favored-Nation) rate?</p>
                    <p className="text-sm text-[#6B6B6B]">
                      The MFN rate is the standard US import duty applied to all WTO member countries. It is the baseline tariff for any country without a special free trade agreement with the US. Rates vary by HS code and are updated annually by the US International Trade Commission.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] mb-1">What is Section 301?</p>
                    <p className="text-sm text-[#6B6B6B]">
                      Section 301 refers to additional tariffs imposed on Chinese goods under the Trade Act of 1974. The US Trade Representative (USTR) enacted four lists (List 1, List 2, List 3, List 4A) starting in 2018, adding 7.5%–25% on top of the MFN rate. These tariffs remain in effect as of 2026 and cover the majority of goods imported from China. Not all HS codes are affected — some exclusions exist.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] mb-1">When do tariffs change?</p>
                    <p className="text-sm text-[#6B6B6B]">
                      MFN rates are reviewed annually by the WCO (World Customs Organization) and the US ITC. Section 301 rates may change via USTR rulemaking or Presidential executive action. Always verify the current rate with CBP before filing an entry.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAFAF8] rounded-xl p-4">
                    <ExternalLink className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Check official CBP rulings</p>
                      <p className="text-xs text-[#6B6B6B] mb-1">Search binding rulings by HS code, product description, or ruling number.</p>
                      <a
                        href="https://rulings.cbp.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#FF6B35] font-semibold hover:underline"
                      >
                        rulings.cbp.gov →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
        {/* RELATED TOOLS QUICK LINKS                                         */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wide mb-4">Related Tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/cost-calculator",
                icon: <DollarSign className="w-5 h-5 text-[#FF6B35]" />,
                title: "Cost Calculator",
                desc: "Break down total COGS including manufacturing, packaging, and overhead.",
              },
              {
                href: "/tools/country-compare",
                icon: <Globe className="w-5 h-5 text-[#FF6B35]" />,
                title: "Country Compare",
                desc: "Compare sourcing risk, labor cost, and lead times across manufacturing countries.",
              },
              {
                href: "/tools/hs-lookup",
                icon: <Package className="w-5 h-5 text-[#FF6B35]" />,
                title: "HS Code Lookup",
                desc: "Find the right HS code for your product to ensure accurate tariff classification.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white border border-[#E8E8E4] rounded-2xl p-5 hover:border-[#FF6B35] hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  {tool.icon}
                  <span className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                    {tool.title}
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B]">{tool.desc}</p>
              </Link>
            ))}
          </div>
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
