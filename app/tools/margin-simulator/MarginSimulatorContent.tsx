"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  Factory,
  Truck,
  ShieldAlert,
  Package,
  Store,
  Megaphone,
  CheckCircle2,
  Globe,
  Copy,
  Check,
  Target,
  Zap,
  Headphones,
  Shirt,
  Sparkles,
  Home,
  Dog,
  Mountain,
} from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────

interface SliderConfig {
  key: keyof InputValues
  label: string
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  icon: React.ReactNode
  hint: string
}

interface InputValues {
  manufacturingCost: number
  shippingCost: number
  tariffRate: number
  packagingCost: number
  platformFee: number
  marketingCost: number
  retailPrice: number
  monthlyVolume: number
  fixedMonthlyCost: number
}

interface ProductPreset {
  name: string
  category: string
  icon: React.ReactNode
  origin: string
  platform: string
  color: string
  values: Omit<InputValues, "fixedMonthlyCost">
}

interface Scenario {
  name: string
  tag: string
  icon: React.ReactNode
  values: Partial<InputValues>
  color: string
}

interface CostSegment {
  label: string
  value: number
  color: string
  percentage: number
}

interface SensitivityRow {
  variable: string
  key: keyof InputValues
  minusImpact: number
  plusImpact: number
  rating: "High" | "Medium" | "Low"
  currentValue: number
}

// ─── Constants ──────────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const DEFAULT_VALUES: InputValues = {
  manufacturingCost: 8.5,
  shippingCost: 2.8,
  tariffRate: 25,
  packagingCost: 1.2,
  platformFee: 15,
  marketingCost: 3,
  retailPrice: 49.99,
  monthlyVolume: 1000,
  fixedMonthlyCost: 2000,
}

const PRODUCT_PRESETS: ProductPreset[] = [
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    icon: <Headphones className="w-4 h-4" />,
    origin: "China",
    platform: "Amazon",
    color: "#3B82F6",
    values: {
      manufacturingCost: 8.5,
      shippingCost: 2.8,
      tariffRate: 25,
      packagingCost: 1.2,
      platformFee: 15,
      marketingCost: 4,
      retailPrice: 49.99,
      monthlyVolume: 1000,
    },
  },
  {
    name: "T-Shirt",
    category: "Apparel",
    icon: <Shirt className="w-4 h-4" />,
    origin: "Vietnam",
    platform: "Shopify",
    color: "#8B5CF6",
    values: {
      manufacturingCost: 3.2,
      shippingCost: 0.8,
      tariffRate: 12,
      packagingCost: 0.4,
      platformFee: 2.9,
      marketingCost: 3,
      retailPrice: 24.99,
      monthlyVolume: 2000,
    },
  },
  {
    name: "Lip Balm",
    category: "Beauty",
    icon: <Sparkles className="w-4 h-4" />,
    origin: "Korea",
    platform: "Amazon",
    color: "#EC4899",
    values: {
      manufacturingCost: 1.1,
      shippingCost: 0.3,
      tariffRate: 0,
      packagingCost: 0.5,
      platformFee: 15,
      marketingCost: 2,
      retailPrice: 18.0,
      monthlyVolume: 5000,
    },
  },
  {
    name: "Candle",
    category: "Home Goods",
    icon: <Home className="w-4 h-4" />,
    origin: "China",
    platform: "Etsy",
    color: "#F59E0B",
    values: {
      manufacturingCost: 2.4,
      shippingCost: 1.5,
      tariffRate: 3.2,
      packagingCost: 0.6,
      platformFee: 6.5,
      marketingCost: 2.5,
      retailPrice: 34.99,
      monthlyVolume: 1500,
    },
  },
  {
    name: "GPS Collar",
    category: "Pet Products",
    icon: <Dog className="w-4 h-4" />,
    origin: "China",
    platform: "Amazon",
    color: "#22C55E",
    values: {
      manufacturingCost: 12.0,
      shippingCost: 2.0,
      tariffRate: 3.9,
      packagingCost: 1.5,
      platformFee: 15,
      marketingCost: 5,
      retailPrice: 59.99,
      monthlyVolume: 800,
    },
  },
  {
    name: "Insulated Tumbler",
    category: "Outdoor",
    icon: <Mountain className="w-4 h-4" />,
    origin: "China",
    platform: "Amazon",
    color: "#06B6D4",
    values: {
      manufacturingCost: 4.8,
      shippingCost: 1.2,
      tariffRate: 7.5,
      packagingCost: 0.7,
      platformFee: 15,
      marketingCost: 3,
      retailPrice: 39.99,
      monthlyVolume: 1200,
    },
  },
]

const SCENARIOS: Scenario[] = [
  {
    name: "China Standard",
    tag: "Lowest unit cost, highest tariff risk",
    icon: <Globe className="w-4 h-4" />,
    color: "#EF4444",
    values: {
      manufacturingCost: 8,
      shippingCost: 3,
      tariffRate: 25,
      packagingCost: 0.6,
    },
  },
  {
    name: "Vietnam Optimized",
    tag: "Balanced cost and tariff exposure",
    icon: <Globe className="w-4 h-4" />,
    color: "#22C55E",
    values: {
      manufacturingCost: 10,
      shippingCost: 2.5,
      tariffRate: 5,
      packagingCost: 0.7,
    },
  },
  {
    name: "Mexico Nearshore",
    tag: "Zero tariff, fastest shipping, higher labor",
    icon: <Globe className="w-4 h-4" />,
    color: "#3B82F6",
    values: {
      manufacturingCost: 14,
      shippingCost: 1,
      tariffRate: 0,
      packagingCost: 0.8,
    },
  },
]

const SLIDERS: SliderConfig[] = [
  {
    key: "manufacturingCost",
    label: "Manufacturing cost / unit",
    min: 0.5,
    max: 100,
    step: 0.1,
    prefix: "$",
    icon: <Factory className="w-4 h-4" />,
    hint: "Most products: $3\u2013$25",
  },
  {
    key: "shippingCost",
    label: "Shipping / unit",
    min: 0.1,
    max: 15,
    step: 0.1,
    prefix: "$",
    icon: <Truck className="w-4 h-4" />,
    hint: "Sea freight avg: $0.50\u2013$4",
  },
  {
    key: "tariffRate",
    label: "Tariff rate",
    min: 0,
    max: 50,
    step: 0.1,
    suffix: "%",
    icon: <ShieldAlert className="w-4 h-4" />,
    hint: "China 301: 7.5\u201325%",
  },
  {
    key: "packagingCost",
    label: "Packaging / unit",
    min: 0.1,
    max: 10,
    step: 0.1,
    prefix: "$",
    icon: <Package className="w-4 h-4" />,
    hint: "Simple poly bag to custom box",
  },
  {
    key: "platformFee",
    label: "Platform fee",
    min: 0,
    max: 40,
    step: 0.1,
    suffix: "%",
    icon: <Store className="w-4 h-4" />,
    hint: "Amazon 15%, Shopify ~3%, Etsy 6.5%",
  },
  {
    key: "marketingCost",
    label: "Marketing cost / unit",
    min: 0,
    max: 30,
    step: 0.25,
    prefix: "$",
    icon: <Megaphone className="w-4 h-4" />,
    hint: "PPC avg: $2\u2013$8 per acquisition",
  },
  {
    key: "retailPrice",
    label: "Retail price",
    min: 5,
    max: 300,
    step: 0.01,
    prefix: "$",
    icon: <DollarSign className="w-4 h-4" />,
    hint: "Amazon sweet spot: $15\u2013$50",
  },
  {
    key: "monthlyVolume",
    label: "Monthly volume",
    min: 50,
    max: 50000,
    step: 50,
    suffix: " units",
    icon: <BarChart3 className="w-4 h-4" />,
    hint: "New launch: 200\u20131,000/mo",
  },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function fmtCurrency(n: number): string {
  if (n < 0) return "-$" + fmt(Math.abs(n))
  return "$" + fmt(n)
}

function fmtLargeCurrency(n: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? "-" : ""
  if (abs >= 1_000_000) return sign + "$" + fmt(abs / 1_000_000, 1) + "M"
  if (abs >= 1_000) return sign + "$" + fmt(abs / 1_000, 1) + "K"
  return sign + "$" + fmt(abs)
}

function marginColor(margin: number): string {
  if (margin >= 30) return "#22C55E"
  if (margin >= 15) return "#F59E0B"
  return "#EF4444"
}

function calcMetrics(v: InputValues) {
  const tariffCost = v.manufacturingCost * (v.tariffRate / 100)
  const cogs = v.manufacturingCost + v.shippingCost + tariffCost + v.packagingCost
  const platformFeeDollar = v.retailPrice * (v.platformFee / 100)
  const totalCost = cogs + platformFeeDollar + v.marketingCost
  const grossMargin = v.retailPrice > 0 ? ((v.retailPrice - cogs) / v.retailPrice) * 100 : 0
  const netMargin = v.retailPrice > 0 ? ((v.retailPrice - totalCost) / v.retailPrice) * 100 : 0
  const profitPerUnit = v.retailPrice - totalCost
  const monthlyRevenue = v.retailPrice * v.monthlyVolume
  const monthlyProfit = profitPerUnit * v.monthlyVolume - v.fixedMonthlyCost
  const annualProfit = monthlyProfit * 12
  const breakEvenVolume =
    profitPerUnit > 0 ? Math.ceil(v.fixedMonthlyCost / profitPerUnit) : Infinity

  return {
    tariffCost,
    cogs,
    platformFeeDollar,
    totalCost,
    grossMargin,
    netMargin,
    profitPerUnit,
    monthlyRevenue,
    monthlyProfit,
    annualProfit,
    breakEvenVolume,
  }
}

// ─── Custom Slider Styles ───────────────────────────────────────────────────

const sliderStyles = `
  .custom-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    outline: none;
    transition: background 0.2s;
  }
  .custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FF6B35;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(255,107,53,0.15);
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .custom-slider::-webkit-slider-thumb:hover {
    box-shadow: 0 1px 6px rgba(0,0,0,0.25), 0 0 0 5px rgba(255,107,53,0.2);
    transform: scale(1.1);
  }
  .custom-slider::-webkit-slider-thumb:active {
    transform: scale(0.95);
  }
  .custom-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FF6B35;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(255,107,53,0.15);
  }
  .custom-slider::-moz-range-track {
    height: 6px;
    border-radius: 999px;
  }
`

// ─── Component ──────────────────────────────────────────────────────────────

export default function MarginSimulatorContent() {
  const [values, setValues] = useState<InputValues>(DEFAULT_VALUES)
  const [activePreset, setActivePreset] = useState<number>(0)
  const [activeScenario, setActiveScenario] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"sensitivity" | "scenarios">("sensitivity")
  const [copied, setCopied] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)

  const update = useCallback((key: keyof InputValues, val: number) => {
    setActiveScenario(null)
    setActivePreset(-1)
    setValues((prev) => ({ ...prev, [key]: val }))
  }, [])

  const applyPreset = useCallback((index: number) => {
    setActivePreset(index)
    setActiveScenario(null)
    const p = PRODUCT_PRESETS[index]
    setValues((prev) => ({ ...prev, ...p.values }))
  }, [])

  const applyScenario = useCallback(
    (index: number) => {
      setActiveScenario(index)
      setValues((prev) => ({ ...prev, ...SCENARIOS[index].values }))
    },
    []
  )

  const m = useMemo(() => calcMetrics(values), [values])

  // Cost segments for breakdown bar
  const segments: CostSegment[] = useMemo(() => {
    const total = values.retailPrice
    if (total <= 0) return []
    const raw: Omit<CostSegment, "percentage">[] = [
      { label: "Manufacturing", value: values.manufacturingCost, color: "#3B82F6" },
      { label: "Shipping", value: values.shippingCost, color: "#06B6D4" },
      { label: "Tariff", value: m.tariffCost, color: "#EF4444" },
      { label: "Packaging", value: values.packagingCost, color: "#9CA3AF" },
      { label: "Platform", value: m.platformFeeDollar, color: "#8B5CF6" },
      { label: "Marketing", value: values.marketingCost, color: "#F59E0B" },
      { label: "Profit", value: Math.max(m.profitPerUnit, 0), color: "#22C55E" },
    ]
    if (m.profitPerUnit < 0) {
      raw.push({ label: "Loss", value: Math.abs(m.profitPerUnit), color: "#EF4444" })
    }
    const sumAll = raw.reduce((a, s) => a + s.value, 0)
    return raw
      .filter((s) => s.value > 0)
      .map((s) => ({ ...s, percentage: sumAll > 0 ? (s.value / sumAll) * 100 : 0 }))
  }, [values, m])

  // Sensitivity analysis
  const sensitivity: SensitivityRow[] = useMemo(() => {
    const keys: { key: keyof InputValues; label: string }[] = [
      { key: "manufacturingCost", label: "Manufacturing Cost" },
      { key: "shippingCost", label: "Shipping Cost" },
      { key: "tariffRate", label: "Tariff Rate" },
      { key: "packagingCost", label: "Packaging Cost" },
      { key: "platformFee", label: "Platform Fee" },
      { key: "marketingCost", label: "Marketing Cost" },
      { key: "retailPrice", label: "Retail Price" },
    ]

    return keys.map(({ key, label }) => {
      const current = values[key]
      const minus10 = { ...values, [key]: current * 0.9 }
      const plus10 = { ...values, [key]: current * 1.1 }
      const baseProfit = m.profitPerUnit
      const minusProfit = calcMetrics(minus10).profitPerUnit
      const plusProfit = calcMetrics(plus10).profitPerUnit
      const minusImpact = minusProfit - baseProfit
      const plusImpact = plusProfit - baseProfit
      const maxSwing = Math.max(Math.abs(minusImpact), Math.abs(plusImpact))
      const rating: "High" | "Medium" | "Low" =
        maxSwing > 1.5 ? "High" : maxSwing > 0.5 ? "Medium" : "Low"

      return { variable: label, key, minusImpact, plusImpact, rating, currentValue: current }
    })
  }, [values, m])

  const mostSensitive = useMemo(() => {
    if (sensitivity.length === 0) return null
    return sensitivity.reduce((a, b) =>
      Math.max(Math.abs(a.minusImpact), Math.abs(a.plusImpact)) >=
      Math.max(Math.abs(b.minusImpact), Math.abs(b.plusImpact))
        ? a
        : b
    )
  }, [sensitivity])

  // Scenario comparison
  const scenarioMetrics = useMemo(() => {
    return SCENARIOS.map((s) => {
      const merged = { ...values, ...s.values }
      return { ...s, metrics: calcMetrics(merged), merged }
    })
  }, [values])

  // Break-even chart points
  const breakEvenPoints = useMemo(() => {
    const maxUnits = Math.max(values.monthlyVolume * 2, 200)
    const steps = 20
    const points: { units: number; profit: number }[] = []
    for (let i = 0; i <= steps; i++) {
      const units = Math.round((maxUnits / steps) * i)
      const profit = m.profitPerUnit * units - values.fixedMonthlyCost
      points.push({ units, profit })
    }
    return points
  }, [values, m])

  // Smart insights
  const insights = useMemo(() => {
    const list: { text: string; type: "warning" | "success" | "tip" }[] = []
    const cogsPercent = values.retailPrice > 0 ? (m.cogs / values.retailPrice) * 100 : 0

    if (cogsPercent > 40) {
      list.push({
        text: `Your COGS is ${fmt(cogsPercent, 1)}% of retail. Best-in-class D2C brands target 25\u201335%. Consider negotiating MOQ discounts or switching to a lower-cost origin country.`,
        type: "warning",
      })
    }

    if (values.platformFee > 10) {
      const d2cFee = 2.9
      const takeHome = values.retailPrice - m.totalCost
      const d2cSave = values.retailPrice * ((values.platformFee - d2cFee) / 100)
      list.push({
        text: `Amazon's referral + FBA fees average 30\u201335% of retail. Your effective take-home is ${fmtCurrency(takeHome)}/unit. Consider D2C to save ${fmtCurrency(d2cSave)}/unit.`,
        type: "tip",
      })
    }

    if (values.tariffRate > 0 && values.tariffRate >= 15) {
      const tariffPerUnit = values.manufacturingCost * (values.tariffRate / 100)
      const vietnamTariff = 5
      const savingsPerUnit = values.manufacturingCost * ((values.tariffRate - vietnamTariff) / 100)
      const annualSavings = savingsPerUnit * values.monthlyVolume * 12
      list.push({
        text: `Section 301 tariffs add ${fmtCurrency(tariffPerUnit)}/unit. Vietnam equivalent tariff is ${vietnamTariff}%. Annual savings on ${values.monthlyVolume.toLocaleString()} units: ${fmtLargeCurrency(annualSavings)}.`,
        type: "warning",
      })
    }

    if (m.netMargin > 50) {
      const monthlyGross = m.profitPerUnit * values.monthlyVolume
      const annualGross = monthlyGross * 12
      const adBudget = monthlyGross * 0.2
      list.push({
        text: `Strong margins. At ${values.monthlyVolume.toLocaleString()} units/month, you're generating ${fmtLargeCurrency(annualGross)}/year. Consider reinvesting ${fmtLargeCurrency(adBudget)}/month into ads at 3:1 ROAS.`,
        type: "success",
      })
    }

    if (m.netMargin <= 0) {
      list.push({
        text: "You are losing money on every unit sold. Raise price or cut costs immediately.",
        type: "warning",
      })
    } else if (m.netMargin < 20) {
      list.push({
        text: `Margins below 20% leave little room for returns and customer acquisition costs. Your net margin is ${fmt(m.netMargin, 1)}%.`,
        type: "warning",
      })
    }

    if (
      m.breakEvenVolume !== Infinity &&
      values.monthlyVolume < m.breakEvenVolume
    ) {
      const deficit = m.breakEvenVolume - values.monthlyVolume
      const priceIncrease =
        m.profitPerUnit > 0
          ? (values.fixedMonthlyCost / values.monthlyVolume - m.profitPerUnit + m.profitPerUnit).toFixed(2)
          : "N/A"
      const neededPricePerUnit =
        values.fixedMonthlyCost / values.monthlyVolume + m.totalCost
      const priceRaise = neededPricePerUnit - values.retailPrice
      list.push({
        text: `Warning: You need ${m.breakEvenVolume.toLocaleString()} units to break even but you're only planning ${values.monthlyVolume.toLocaleString()}. Increase volume by ${deficit.toLocaleString()} units or raise price by ${fmtCurrency(Math.max(priceRaise, 0))}.`,
        type: "warning",
      })
    }

    if (values.monthlyVolume > 5000 && m.netMargin > 40) {
      list.push({
        text: "Strong unit economics at scale \u2014 consider investing in custom tooling or molds to reduce per-unit manufacturing cost by 15\u201325%.",
        type: "success",
      })
    }

    return list.slice(0, 4)
  }, [values, m])

  // Copy P&L summary
  const copyPLSummary = useCallback(() => {
    const lines = [
      "=== Margin Simulator P&L Summary ===",
      "",
      `Retail Price:        ${fmtCurrency(values.retailPrice)}`,
      `Monthly Volume:      ${values.monthlyVolume.toLocaleString()} units`,
      "",
      "--- Unit Economics ---",
      `Manufacturing:       ${fmtCurrency(values.manufacturingCost)}`,
      `Shipping:            ${fmtCurrency(values.shippingCost)}`,
      `Tariff (${fmt(values.tariffRate, 1)}%):      ${fmtCurrency(m.tariffCost)}`,
      `Packaging:           ${fmtCurrency(values.packagingCost)}`,
      `COGS:                ${fmtCurrency(m.cogs)}`,
      `Platform Fee (${fmt(values.platformFee, 1)}%): ${fmtCurrency(m.platformFeeDollar)}`,
      `Marketing:           ${fmtCurrency(values.marketingCost)}`,
      `Total Cost / Unit:   ${fmtCurrency(m.totalCost)}`,
      "",
      "--- Margins ---",
      `Gross Margin:        ${fmt(m.grossMargin, 1)}%`,
      `Net Margin:          ${fmt(m.netMargin, 1)}%`,
      `Profit / Unit:       ${fmtCurrency(m.profitPerUnit)}`,
      "",
      "--- Monthly / Annual ---",
      `Fixed Costs:         ${fmtCurrency(values.fixedMonthlyCost)}/mo`,
      `Monthly Revenue:     ${fmtLargeCurrency(m.monthlyRevenue)}`,
      `Monthly Profit:      ${fmtLargeCurrency(m.monthlyProfit)}`,
      `Annual Profit:       ${fmtLargeCurrency(m.annualProfit)}`,
      `Break-even Volume:   ${m.breakEvenVolume === Infinity ? "N/A" : m.breakEvenVolume.toLocaleString() + " units"}`,
      "",
      "Generated by Bottlecap Margin Simulator",
      "https://bottlecap.com/tools/margin-simulator",
    ]
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [values, m])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />

      {/* Header */}
      <div className="border-b border-[#E8E8E4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="text-[#1A1A1A]/50 hover:text-[#FF6B35] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Margin Simulator
              </h1>
              <p className="text-sm text-[#1A1A1A]/50">
                Real-time P&L modeling for product businesses
              </p>
            </div>
          </div>
          <button
            onClick={copyPLSummary}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E8E4] bg-white hover:bg-[#FAFAF8] text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy P&L Summary
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Product Presets */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-8"
        >
          <h2 className="text-sm font-semibold text-[#1A1A1A]/60 uppercase tracking-wider mb-3">
            Product Presets
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {PRODUCT_PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => applyPreset(i)}
                className={`text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                  activePreset === i
                    ? "border-[#FF6B35] bg-[#FF6B35]/5 shadow-sm"
                    : "border-[#E8E8E4] bg-white hover:border-[#FF6B35]/40"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ color: p.color }}>{p.icon}</span>
                  <span className="font-semibold text-[#1A1A1A] text-xs sm:text-sm truncate">
                    {p.name}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-[#1A1A1A]/50 truncate">
                  {p.origin} &middot; {p.platform}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ─── Input Panel (Left - White) ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm sticky top-6">
              <h2 className="font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#FF6B35]" />
                Input Parameters
              </h2>
              <div className="space-y-4">
                {SLIDERS.map((s) => {
                  const val = values[s.key]
                  const pct = ((val - s.min) / (s.max - s.min)) * 100
                  return (
                    <div key={s.key}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm text-[#1A1A1A]/70 flex items-center gap-1.5">
                          <span className="text-[#1A1A1A]/40">{s.icon}</span>
                          {s.label}
                        </label>
                        <span className="text-sm font-semibold text-[#1A1A1A] tabular-nums bg-[#F5F5F3] px-2 py-0.5 rounded-md">
                          {s.prefix ?? ""}
                          {s.key === "monthlyVolume" || s.key === "fixedMonthlyCost"
                            ? val.toLocaleString()
                            : fmt(val)}
                          {s.suffix ?? ""}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={val}
                        onChange={(e) => update(s.key, parseFloat(e.target.value))}
                        className="custom-slider"
                        style={{
                          background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${pct}%, #E8E8E4 ${pct}%, #E8E8E4 100%)`,
                        }}
                      />
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-[10px] text-[#1A1A1A]/30">
                          {s.prefix ?? ""}
                          {s.min.toLocaleString()}
                          {s.suffix ?? ""}
                        </span>
                        <span className="text-[10px] text-[#FF6B35]/50 italic">
                          {s.hint}
                        </span>
                        <span className="text-[10px] text-[#1A1A1A]/30">
                          {s.prefix ?? ""}
                          {s.max.toLocaleString()}
                          {s.suffix ?? ""}
                        </span>
                      </div>
                    </div>
                  )
                })}

                {/* Fixed Monthly Cost (separate) */}
                <div className="pt-3 border-t border-[#E8E8E4]">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-[#1A1A1A]/70 flex items-center gap-1.5">
                      <span className="text-[#1A1A1A]/40">
                        <Target className="w-4 h-4" />
                      </span>
                      Fixed monthly costs
                    </label>
                    <span className="text-sm font-semibold text-[#1A1A1A] tabular-nums bg-[#F5F5F3] px-2 py-0.5 rounded-md">
                      ${values.fixedMonthlyCost.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20000}
                    step={100}
                    value={values.fixedMonthlyCost}
                    onChange={(e) => update("fixedMonthlyCost", parseFloat(e.target.value))}
                    className="custom-slider"
                    style={{
                      background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${(values.fixedMonthlyCost / 20000) * 100}%, #E8E8E4 ${(values.fixedMonthlyCost / 20000) * 100}%, #E8E8E4 100%)`,
                    }}
                  />
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-[10px] text-[#1A1A1A]/30">$0</span>
                    <span className="text-[10px] text-[#FF6B35]/50 italic">
                      Rent, software, insurance, etc.
                    </span>
                    <span className="text-[10px] text-[#1A1A1A]/30">$20,000</span>
                  </div>
                </div>
              </div>

              {/* Mobile Copy Button */}
              <button
                onClick={copyPLSummary}
                className="sm:hidden mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E8E8E4] bg-[#FAFAF8] text-sm font-medium text-[#1A1A1A]/70"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy P&L Summary
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ─── P&L Dashboard (Right - Dark) ─────────────────────── */}
          <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* ── Unit Economics Card (Dark) ───────────────────── */}
            <div className="bg-[#1A1A1A] rounded-2xl p-5 sm:p-6 shadow-lg">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF6B35]" />
                Unit Economics
              </h2>

              {/* Top metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <DarkMetricCard
                  label="Gross Margin"
                  value={`${fmt(m.grossMargin, 1)}%`}
                  color={marginColor(m.grossMargin)}
                />
                <DarkMetricCard
                  label="Net Margin"
                  value={`${fmt(m.netMargin, 1)}%`}
                  color={marginColor(m.netMargin)}
                />
                <DarkMetricCard
                  label="Profit / Unit"
                  value={fmtCurrency(m.profitPerUnit)}
                  color={marginColor(m.netMargin)}
                />
                <DarkMetricCard
                  label="Break-even"
                  value={
                    m.breakEvenVolume === Infinity
                      ? "N/A"
                      : m.breakEvenVolume.toLocaleString()
                  }
                  color={
                    m.breakEvenVolume <= values.monthlyVolume ? "#22C55E" : "#EF4444"
                  }
                  suffix=" units"
                />
              </div>

              {/* P&L Waterfall */}
              <div className="space-y-0">
                <WaterfallRow
                  label="Revenue"
                  value={values.retailPrice}
                  percent={100}
                  isPositive
                  isFirst
                />
                <WaterfallRow
                  label="COGS"
                  value={-m.cogs}
                  percent={values.retailPrice > 0 ? (m.cogs / values.retailPrice) * 100 : 0}
                  isPositive={false}
                />
                <WaterfallRow
                  label="Platform Fee"
                  value={-m.platformFeeDollar}
                  percent={
                    values.retailPrice > 0
                      ? (m.platformFeeDollar / values.retailPrice) * 100
                      : 0
                  }
                  isPositive={false}
                />
                <WaterfallRow
                  label="Marketing"
                  value={-values.marketingCost}
                  percent={
                    values.retailPrice > 0
                      ? (values.marketingCost / values.retailPrice) * 100
                      : 0
                  }
                  isPositive={false}
                />
                <div className="border-t border-white/10 mt-1 pt-1">
                  <WaterfallRow
                    label="Net Profit"
                    value={m.profitPerUnit}
                    percent={Math.abs(m.netMargin)}
                    isPositive={m.profitPerUnit >= 0}
                    isLast
                  />
                </div>
              </div>

              {/* Monthly / Annual */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[11px] text-white/40 mb-0.5">Monthly Revenue</p>
                  <p className="text-base font-bold text-white tabular-nums">
                    {fmtLargeCurrency(m.monthlyRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 mb-0.5">Monthly Profit</p>
                  <p
                    className="text-base font-bold tabular-nums"
                    style={{ color: m.monthlyProfit >= 0 ? "#22C55E" : "#EF4444" }}
                  >
                    {fmtLargeCurrency(m.monthlyProfit)}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-white/40 mb-0.5">Annual Profit</p>
                  <p
                    className="text-base font-bold tabular-nums"
                    style={{ color: m.annualProfit >= 0 ? "#22C55E" : "#EF4444" }}
                  >
                    {fmtLargeCurrency(m.annualProfit)}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Cost Breakdown Bar ──────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm">
              <h2 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FF6B35]" />
                Where Each Dollar Goes
              </h2>
              <div className="h-10 rounded-lg overflow-hidden flex mb-3">
                {segments.map((seg) => (
                  <motion.div
                    key={seg.label}
                    layout
                    className="h-full relative group cursor-default"
                    style={{ backgroundColor: seg.color, width: `${seg.percentage}%` }}
                    transition={{ duration: 0.35, ease: EASE }}
                    title={`${seg.label}: ${fmtCurrency(seg.value)} (${fmt(seg.percentage, 1)}%)`}
                  >
                    {seg.percentage > 6 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white drop-shadow-sm">
                        {fmt(seg.percentage, 0)}%
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {segments.map((seg) => (
                  <div
                    key={seg.label}
                    className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/60"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-sm inline-block"
                      style={{ backgroundColor: seg.color }}
                    />
                    {seg.label}{" "}
                    <span className="font-medium text-[#1A1A1A]">
                      {fmtCurrency(seg.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Break-Even Chart (CSS-only) ─────────────────── */}
            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm">
              <h2 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF6B35]" />
                Break-Even Analysis
              </h2>
              <BreakEvenChart
                points={breakEvenPoints}
                currentVolume={values.monthlyVolume}
                breakEvenVolume={m.breakEvenVolume}
                fixedCost={values.fixedMonthlyCost}
              />
            </div>

            {/* ── Smart Insights ──────────────────────────────── */}
            <AnimatePresence mode="wait">
              {insights.length > 0 && (
                <motion.div
                  key={insights.map((i) => i.text).join("|").slice(0, 100)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm"
                >
                  <h2 className="font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
                    Smart Insights
                  </h2>
                  <div className="space-y-2.5">
                    {insights.map((ins, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-2.5 text-sm p-3 rounded-lg border ${
                          ins.type === "warning"
                            ? "bg-red-50/60 border-red-200 text-red-800"
                            : ins.type === "success"
                            ? "bg-green-50/60 border-green-200 text-green-800"
                            : "bg-blue-50/60 border-blue-200 text-blue-800"
                        }`}
                      >
                        {ins.type === "warning" && (
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        {ins.type === "success" && (
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        {ins.type === "tip" && (
                          <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{ins.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── Tabbed Section: Sensitivity / Scenarios ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-8"
        >
          {/* Tab switcher */}
          <div className="flex gap-1 mb-4 bg-[#E8E8E4]/50 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("sensitivity")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "sensitivity"
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80"
              }`}
            >
              Sensitivity Analysis
            </button>
            <button
              onClick={() => setActiveTab("scenarios")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "scenarios"
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80"
              }`}
            >
              Scenario Comparison
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "sensitivity" ? (
              <motion.div
                key="sensitivity"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm">
                  <h2 className="font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#FF6B35]" />
                    Sensitivity Analysis
                  </h2>
                  <p className="text-sm text-[#1A1A1A]/50 mb-4">
                    How your profit per unit changes when each variable moves by &plusmn;10%
                  </p>

                  {mostSensitive && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Your margin is most sensitive to{" "}
                        <strong>{mostSensitive.variable.toLowerCase()}</strong>. A 10% change
                        swings profit by up to{" "}
                        {fmtCurrency(
                          Math.max(
                            Math.abs(mostSensitive.minusImpact),
                            Math.abs(mostSensitive.plusImpact)
                          )
                        )}
                        /unit.
                      </span>
                    </div>
                  )}

                  <div className="overflow-x-auto -mx-2 px-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E8E8E4]">
                          <th className="text-left py-2.5 pr-4 text-[#1A1A1A]/50 font-medium">
                            Variable
                          </th>
                          <th className="text-right py-2.5 px-3 text-[#1A1A1A]/50 font-medium">
                            Current
                          </th>
                          <th className="text-right py-2.5 px-3 text-[#1A1A1A]/50 font-medium">
                            -10% Impact
                          </th>
                          <th className="text-right py-2.5 px-3 text-[#1A1A1A]/50 font-medium">
                            +10% Impact
                          </th>
                          <th className="text-right py-2.5 pl-3 text-[#1A1A1A]/50 font-medium">
                            Sensitivity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8E4]/60">
                        {sensitivity.map((row) => {
                          const isTop = mostSensitive?.key === row.key
                          return (
                            <tr
                              key={row.key}
                              className={isTop ? "bg-red-50/40" : ""}
                            >
                              <td
                                className={`py-2.5 pr-4 ${
                                  isTop
                                    ? "font-semibold text-red-800"
                                    : "text-[#1A1A1A]/70"
                                }`}
                              >
                                {row.variable}
                              </td>
                              <td className="text-right py-2.5 px-3 tabular-nums text-[#1A1A1A]/60">
                                {row.key === "tariffRate" || row.key === "platformFee"
                                  ? `${fmt(row.currentValue, 1)}%`
                                  : fmtCurrency(row.currentValue)}
                              </td>
                              <td
                                className="text-right py-2.5 px-3 tabular-nums font-medium"
                                style={{
                                  color: row.minusImpact >= 0 ? "#22C55E" : "#EF4444",
                                }}
                              >
                                {row.minusImpact >= 0 ? "+" : ""}
                                {fmtCurrency(row.minusImpact)}
                              </td>
                              <td
                                className="text-right py-2.5 px-3 tabular-nums font-medium"
                                style={{
                                  color: row.plusImpact >= 0 ? "#22C55E" : "#EF4444",
                                }}
                              >
                                {row.plusImpact >= 0 ? "+" : ""}
                                {fmtCurrency(row.plusImpact)}
                              </td>
                              <td className="text-right py-2.5 pl-3">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    row.rating === "High"
                                      ? "bg-red-100 text-red-700"
                                      : row.rating === "Medium"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {row.rating}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scenarios"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 sm:p-6 shadow-sm">
                  <h2 className="font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#FF6B35]" />
                    Scenario Comparison
                  </h2>
                  <p className="text-sm text-[#1A1A1A]/50 mb-4">
                    All scenarios use your current retail price (
                    {fmtCurrency(values.retailPrice)}), platform fee (
                    {fmt(values.platformFee, 1)}%), and marketing cost (
                    {fmtCurrency(values.marketingCost)}).
                  </p>

                  {/* Scenario quick-apply buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {SCENARIOS.map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => applyScenario(i)}
                        className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                          activeScenario === i
                            ? "border-[#FF6B35] bg-[#FF6B35]/5 shadow-sm"
                            : "border-[#E8E8E4] bg-[#FAFAF8] hover:border-[#FF6B35]/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: s.color }}
                          />
                          <span className="font-semibold text-[#1A1A1A] text-sm">
                            {s.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1A1A1A]/50">{s.tag}</p>
                      </button>
                    ))}
                  </div>

                  <div className="overflow-x-auto -mx-2 px-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E8E8E4]">
                          <th className="text-left py-2 pr-4 text-[#1A1A1A]/50 font-medium">
                            Metric
                          </th>
                          {scenarioMetrics.map((s) => (
                            <th
                              key={s.name}
                              className="text-right py-2 px-3 font-semibold whitespace-nowrap"
                              style={{ color: s.color }}
                            >
                              {s.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8E4]/60">
                        <CompareRow
                          label="Manufacturing / unit"
                          values={scenarioMetrics.map((s) =>
                            fmtCurrency(s.merged.manufacturingCost)
                          )}
                        />
                        <CompareRow
                          label="Shipping / unit"
                          values={scenarioMetrics.map((s) =>
                            fmtCurrency(s.merged.shippingCost)
                          )}
                        />
                        <CompareRow
                          label="Tariff rate"
                          values={scenarioMetrics.map(
                            (s) => `${fmt(s.merged.tariffRate, 1)}%`
                          )}
                        />
                        <CompareRow
                          label="COGS / unit"
                          values={scenarioMetrics.map((s) =>
                            fmtCurrency(s.metrics.cogs)
                          )}
                        />
                        <CompareRow
                          label="Total cost / unit"
                          values={scenarioMetrics.map((s) =>
                            fmtCurrency(s.metrics.totalCost)
                          )}
                        />
                        <CompareRow
                          label="Net margin"
                          values={scenarioMetrics.map(
                            (s) => `${fmt(s.metrics.netMargin, 1)}%`
                          )}
                          highlight
                        />
                        <CompareRow
                          label="Profit / unit"
                          values={scenarioMetrics.map((s) =>
                            fmtCurrency(s.metrics.profitPerUnit)
                          )}
                          highlight
                        />
                        <CompareRow
                          label="Monthly profit"
                          values={scenarioMetrics.map((s) =>
                            fmtLargeCurrency(
                              s.metrics.profitPerUnit * values.monthlyVolume -
                                values.fixedMonthlyCost
                            )
                          )}
                        />
                        <CompareRow
                          label="Annual profit"
                          values={scenarioMetrics.map((s) =>
                            fmtLargeCurrency(s.metrics.annualProfit)
                          )}
                          highlight
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── CTA ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-10 mb-6"
        >
          <div className="bg-gradient-to-br from-[#FF6B35]/5 to-[#FF6B35]/10 rounded-2xl border border-[#FF6B35]/20 p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2">
              Want exact costs for YOUR product?
            </h3>
            <p className="text-sm text-[#1A1A1A]/60 mb-5 max-w-md mx-auto">
              Get a real manufacturing feasibility report with verified factory quotes,
              landed-cost breakdowns, and supplier shortlists -- delivered in minutes.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55a28] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Get My Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DarkMetricCard({
  label,
  value,
  color,
  suffix,
}: {
  label: string
  value: string
  color: string
  suffix?: string
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <p className="text-[11px] text-white/40 mb-0.5">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.6, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="text-lg font-bold tabular-nums"
        style={{ color }}
      >
        {value}
        {suffix && (
          <span className="text-xs font-normal text-white/30">{suffix}</span>
        )}
      </motion.p>
    </div>
  )
}

function WaterfallRow({
  label,
  value,
  percent,
  isPositive,
  isFirst,
  isLast,
}: {
  label: string
  value: number
  percent: number
  isPositive: boolean
  isFirst?: boolean
  isLast?: boolean
}) {
  const color = isFirst
    ? "text-white"
    : isLast
    ? value >= 0
      ? "text-[#22C55E]"
      : "text-[#EF4444]"
    : "text-white/70"

  const prefix = isFirst ? "" : isLast ? "= " : "\u2192 "

  return (
    <motion.div
      key={`${label}-${value.toFixed(2)}`}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-between py-1.5 ${
        isLast ? "font-bold" : ""
      }`}
    >
      <span className={`text-sm ${isLast ? "text-white font-bold" : "text-white/60"}`}>
        {prefix}
        {label}
      </span>
      <div className="flex items-center gap-3">
        <motion.span
          key={value.toFixed(2)}
          initial={{ opacity: 0.5, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`text-sm tabular-nums font-semibold ${color}`}
        >
          {value >= 0 && !isFirst ? "" : ""}
          {fmtCurrency(Math.abs(value))}
          {!isFirst && value < 0 ? "" : ""}
        </motion.span>
        <span className="text-xs text-white/30 w-12 text-right tabular-nums">
          {fmt(percent, 1)}%
        </span>
      </div>
    </motion.div>
  )
}

function BreakEvenChart({
  points,
  currentVolume,
  breakEvenVolume,
  fixedCost,
}: {
  points: { units: number; profit: number }[]
  currentVolume: number
  breakEvenVolume: number
  fixedCost: number
}) {
  if (points.length < 2) return null

  const maxUnits = points[points.length - 1].units
  const maxProfit = Math.max(...points.map((p) => p.profit))
  const minProfit = Math.min(...points.map((p) => p.profit))
  const range = maxProfit - minProfit || 1

  const chartW = 100 // percentage
  const chartH = 200 // px

  const padding = { top: 20, bottom: 30, left: 0, right: 0 }
  const innerH = chartH - padding.top - padding.bottom

  const toX = (units: number) => (maxUnits > 0 ? (units / maxUnits) * chartW : 0)
  const toY = (profit: number) =>
    padding.top + innerH - ((profit - minProfit) / range) * innerH

  const zeroY = toY(0)

  // SVG path
  const pathD = points
    .map((p, i) => {
      const x = toX(p.units)
      const y = toY(p.profit)
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  // Area fill path (down to zero line)
  const areaD =
    pathD +
    ` L ${toX(points[points.length - 1].units)} ${zeroY} L ${toX(points[0].units)} ${zeroY} Z`

  // Current volume marker
  const currentX = toX(currentVolume)
  const currentProfit =
    points.length > 0
      ? points.reduce((closest, p) =>
          Math.abs(p.units - currentVolume) < Math.abs(closest.units - currentVolume)
            ? p
            : closest
        ).profit
      : 0
  const currentY = toY(currentProfit)

  // Break-even marker
  const beX = breakEvenVolume !== Infinity && breakEvenVolume <= maxUnits ? toX(breakEvenVolume) : null

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full"
        style={{ height: chartH }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line
          x1="0"
          y1={zeroY}
          x2={chartW}
          y2={zeroY}
          stroke="#E8E8E4"
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />

        {/* Gradient fill */}
        <defs>
          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path d={areaD} fill="url(#profitGrad)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#22C55E"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Zero line label */}
        <line
          x1="0"
          y1={zeroY}
          x2={chartW}
          y2={zeroY}
          stroke="#9CA3AF"
          strokeWidth="0.2"
        />

        {/* Break-even vertical */}
        {beX !== null && (
          <>
            <line
              x1={beX}
              y1={padding.top}
              x2={beX}
              y2={chartH - padding.bottom}
              stroke="#F59E0B"
              strokeWidth="0.3"
              strokeDasharray="1,0.5"
            />
            <circle cx={beX} cy={zeroY} r="1.2" fill="#F59E0B" />
          </>
        )}

        {/* Current volume dot */}
        <circle cx={currentX} cy={currentY} r="1.5" fill="#FF6B35" />
        <circle cx={currentX} cy={currentY} r="3" fill="#FF6B35" fillOpacity="0.15" />
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-1 text-[10px] text-[#1A1A1A]/40 px-1">
        <span>0</span>
        {beX !== null && (
          <span
            className="text-amber-600 font-medium absolute"
            style={{
              left: `${(breakEvenVolume / maxUnits) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            BE: {breakEvenVolume.toLocaleString()}
          </span>
        )}
        <span
          className="text-[#FF6B35] font-medium absolute"
          style={{
            left: `${(currentVolume / maxUnits) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          You: {currentVolume.toLocaleString()}
        </span>
        <span>{maxUnits.toLocaleString()} units</span>
      </div>

      {/* Y-axis reference */}
      <div className="absolute top-0 right-2 text-[10px] text-[#1A1A1A]/30">
        {fmtLargeCurrency(maxProfit)}
      </div>
      <div
        className="absolute right-2 text-[10px] text-[#1A1A1A]/30"
        style={{ top: zeroY - 6 }}
      >
        $0
      </div>
      {minProfit < 0 && (
        <div className="absolute bottom-8 right-2 text-[10px] text-red-400">
          {fmtLargeCurrency(minProfit)}
        </div>
      )}

      {/* Summary below chart */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
          <span className="text-[#1A1A1A]/60">
            Current: {currentVolume.toLocaleString()} units ={" "}
            <span
              className="font-semibold"
              style={{ color: currentProfit >= 0 ? "#22C55E" : "#EF4444" }}
            >
              {fmtLargeCurrency(currentProfit)}/mo
            </span>
          </span>
        </div>
        {breakEvenVolume !== Infinity && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[#1A1A1A]/60">
              Break-even: {breakEvenVolume.toLocaleString()} units (covers $
              {fixedCost.toLocaleString()}/mo fixed)
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function CompareRow({
  label,
  values,
  highlight,
}: {
  label: string
  values: string[]
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? "bg-[#FAFAF8]" : ""}>
      <td
        className={`py-2 pr-4 ${
          highlight ? "font-semibold text-[#1A1A1A]" : "text-[#1A1A1A]/60"
        }`}
      >
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`text-right py-2 px-3 tabular-nums ${
            highlight ? "font-bold text-[#1A1A1A]" : "text-[#1A1A1A]/80"
          }`}
        >
          {v}
        </td>
      ))}
    </tr>
  )
}
