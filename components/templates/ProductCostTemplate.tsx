"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Package,
  Wrench,
  BarChart3,
  Truck,
  ArrowRight,
} from "lucide-react"
import { type ProductCostEntry, PRODUCT_COSTS } from "@/lib/data/product-costs"

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return value >= 1000
    ? `$${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
    : `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US")
}

// ── Cost-breakdown chart data ─────────────────────────────────────────────────

const COST_SEGMENTS = [
  { label: "Materials", pct: 40, color: "#3B82F6" },
  { label: "Labor", pct: 20, color: "#FF6B35" },
  { label: "Overhead", pct: 13, color: "#8B5CF6" },
  { label: "Shipping", pct: 17, color: "#22C55E" },
  { label: "Packaging", pct: 10, color: "#F59E0B" },
]

// ── Country comparison data ───────────────────────────────────────────────────

const COUNTRY_MULTIPLIERS: Record<string, { cost: number; moq: number; lead: number; tooling: number }> = {
  China:       { cost: 1.00, moq: 1.00, lead: 1.00, tooling: 1.00 },
  Vietnam:     { cost: 1.08, moq: 1.10, lead: 1.15, tooling: 1.20 },
  India:       { cost: 1.05, moq: 1.05, lead: 1.20, tooling: 1.10 },
  Bangladesh:  { cost: 0.92, moq: 1.20, lead: 1.25, tooling: 1.30 },
  Taiwan:      { cost: 1.40, moq: 0.80, lead: 0.90, tooling: 1.50 },
  "South Korea": { cost: 1.50, moq: 0.75, lead: 0.85, tooling: 1.60 },
  Indonesia:   { cost: 1.03, moq: 1.10, lead: 1.18, tooling: 1.15 },
  Turkey:      { cost: 1.15, moq: 0.90, lead: 1.10, tooling: 1.20 },
  Mexico:      { cost: 1.20, moq: 0.85, lead: 0.95, tooling: 1.25 },
  Poland:      { cost: 1.35, moq: 0.80, lead: 0.90, tooling: 1.40 },
  Italy:       { cost: 1.80, moq: 0.60, lead: 1.05, tooling: 1.70 },
  Thailand:    { cost: 1.10, moq: 1.00, lead: 1.10, tooling: 1.15 },
}

function getMultiplier(country: string) {
  return COUNTRY_MULTIPLIERS[country] ?? { cost: 1.00, moq: 1.00, lead: 1.00, tooling: 1.00 }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CostBreakdownChart() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        Cost Breakdown Visual
      </h2>
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
        {/* Stacked bar */}
        <div className="flex w-full h-10 rounded-xl overflow-hidden mb-6">
          {COST_SEGMENTS.map((seg, i) => (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              animate={{ width: `${seg.pct}%` }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: seg.color }}
              className="h-full"
              title={`${seg.label}: ${seg.pct}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {COST_SEGMENTS.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-[#1A1A1A] font-medium">{seg.label}</span>
              <span className="text-sm text-[#6B6B6B]">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Country comparison mini-table ─────────────────────────────────────────────

function CountryComparisonTable({ product }: { product: ProductCostEntry }) {
  const countries = product.topCountries.slice(0, 3)

  // Compute raw values per row per country
  const rows: {
    label: string
    values: { display: string; raw: number }[]
    lowerIsBetter: boolean
  }[] = [
    {
      label: "Unit Cost",
      lowerIsBetter: true,
      values: countries.map((c) => {
        const mult = getMultiplier(c).cost
        const mid = (product.avgUnitCost.min + product.avgUnitCost.max) / 2
        const lo = +(mid * mult * 0.85).toFixed(2)
        const hi = +(mid * mult * 1.15).toFixed(2)
        return { display: `${formatCurrency(lo)}–${formatCurrency(hi)}`, raw: mid * mult }
      }),
    },
    {
      label: "Typical MOQ",
      lowerIsBetter: true,
      values: countries.map((c) => {
        const mult = getMultiplier(c).moq
        const mid = Math.round(((product.moqRange.min + product.moqRange.max) / 2) * mult)
        return { display: formatNumber(mid), raw: mid }
      }),
    },
    {
      label: "Lead Time",
      lowerIsBetter: true,
      values: countries.map((c) => {
        const mult = getMultiplier(c).lead
        const days = Math.round(product.avgLeadTimeDays * mult)
        return { display: `${days} days`, raw: days }
      }),
    },
    {
      label: "Tooling Cost",
      lowerIsBetter: true,
      values: countries.map((c) => {
        const mult = getMultiplier(c).tooling
        const mid = (product.toolingCost.min + product.toolingCost.max) / 2
        const lo = +(mid * mult * 0.85).toFixed(0)
        const hi = +(mid * mult * 1.15).toFixed(0)
        return { display: `${formatCurrency(+lo)}–${formatCurrency(+hi)}`, raw: mid * mult }
      }),
    },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        Country Comparison
      </h2>
      <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F0]">
              <th className="text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4 w-40">
                Metric
              </th>
              {countries.map((c) => (
                <th
                  key={c}
                  className="text-center text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-4 py-4"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E4]">
            {rows.map((row) => {
              const raws = row.values.map((v) => v.raw)
              const bestRaw = row.lowerIsBetter ? Math.min(...raws) : Math.max(...raws)
              return (
                <tr key={row.label}>
                  <td className="px-6 py-4 text-sm font-medium text-[#1A1A1A]">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-4 py-4 text-center text-sm ${
                        v.raw === bestRaw
                          ? "bg-[#DCFCE7] text-[#166534] font-semibold"
                          : "text-[#1A1A1A]"
                      }`}
                    >
                      {v.display}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-xs text-[#6B6B6B] px-6 py-3 border-t border-[#E8E8E4] bg-[#F5F5F0]">
          Green = lowest cost per row. Estimates include ±15% variance.
        </p>
      </div>
    </section>
  )
}

// ── Margin calculator ─────────────────────────────────────────────────────────

function MarginCalculator({ product }: { product: ProductCostEntry }) {
  const landedCostMid =
    (product.avgUnitCost.min + product.avgUnitCost.max) / 2 +
    (product.shippingPerUnit.min + product.shippingPerUnit.max) / 2

  const defaultRetail = +(landedCostMid * 3).toFixed(2)

  const [retailPrice, setRetailPrice] = useState<string>(String(defaultRetail))

  const retail = parseFloat(retailPrice) || 0
  const grossMarginPct = retail > 0 ? ((retail - landedCostMid) / retail) * 100 : 0
  const breakEven = retail > landedCostMid ? Math.ceil(1000 / (retail - landedCostMid)) : null

  const marginColor =
    grossMarginPct >= 50
      ? "#22C55E"
      : grossMarginPct >= 30
      ? "#F59E0B"
      : "#EF4444"

  const marginLabel =
    grossMarginPct >= 50
      ? "Excellent"
      : grossMarginPct >= 30
      ? "Acceptable"
      : "Tight"

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        Margin Calculator
      </h2>
      <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8">
        <div className="mb-6">
          <label
            htmlFor="retail-price"
            className="block text-sm font-semibold text-[#1A1A1A] mb-2"
          >
            Your target retail price (USD)
          </label>
          <div className="relative w-full max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] font-medium">
              $
            </span>
            <input
              id="retail-price"
              type="number"
              min="0"
              step="0.01"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-[#E8E8E4] rounded-xl text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gross Margin */}
          <div className="bg-[#F5F5F0] rounded-xl p-5 text-center">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Gross Margin
            </p>
            <p
              className="text-3xl font-black mb-1 transition-colors"
              style={{ color: marginColor }}
            >
              {grossMarginPct > 0 ? `${grossMarginPct.toFixed(1)}%` : "—"}
            </p>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: marginColor }}
            >
              {retail > 0 ? marginLabel : "Enter a price"}
            </p>
          </div>

          {/* Landed Cost */}
          <div className="bg-[#F5F5F0] rounded-xl p-5 text-center">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Landed Cost (est.)
            </p>
            <p className="text-3xl font-black text-[#1A1A1A] mb-1">
              {formatCurrency(landedCostMid)}
            </p>
            <p className="text-xs text-[#6B6B6B]">per unit, mid-range</p>
          </div>

          {/* Break-even */}
          <div className="bg-[#F5F5F0] rounded-xl p-5 text-center">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Break-even (est.)
            </p>
            <p className="text-3xl font-black text-[#1A1A1A] mb-1">
              {breakEven !== null ? formatNumber(breakEven) : "—"}
            </p>
            <p className="text-xs text-[#6B6B6B]">units to cover $1k</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── "What drives the cost" accordion ─────────────────────────────────────────

const ACCORDION_ITEMS = [
  {
    icon: <Package className="w-5 h-5" />,
    title: "Material Selection",
    subtitle: "Biggest lever — 35–45% of cost",
    body: "Raw material choice is the single largest cost driver. Switching from stainless steel to aluminum can cut 30%, while premium polymers vs commodity ABS can swing cost by 20%. Material changes also affect tooling requirements, minimum order quantities, and supplier geography. Always get quotes for 2–3 material options.",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Manufacturing Complexity",
    subtitle: "Assembly steps & tooling requirements",
    body: "Each additional assembly step adds labor time and potential defect points. Products requiring over-molding, insert molding, or multi-axis CNC machining carry 2–4× the tooling cost of simple injection-molded parts. Reducing part count through design for manufacturability (DFM) is one of the fastest ways to lower unit cost.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Order Volume",
    subtitle: "MOQ and economies of scale",
    body: "Unit cost typically drops 15–30% between MOQ and 5× MOQ due to machine setup amortization and bulk material buying. Most Chinese suppliers operate on tiered pricing: 500 units, 1,000 units, 5,000 units, 10,000+ units. Committing to annual volume contracts — even without prepayment — can unlock lower tiers.",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Shipping Method",
    subtitle: "Sea vs air, weight/cubic ratio",
    body: "Sea freight costs 6–10× less per kg than air freight but takes 25–35 days vs 3–5 days. Products with high cubic-weight (pillows, furniture) are penalized under air rates. Heavy dense goods (tools, electronics) are better candidates for air when speed matters. Consider DDP (Delivered Duty Paid) terms to simplify customs and avoid surprise import fees.",
  },
]

function CostDriverAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        What Drives the Cost?
      </h2>
      <div className="space-y-3">
        {ACCORDION_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-[#F5F5F0] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-[#FF6B35] shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A1A]">{item.title}</p>
                  <p className="text-sm text-[#6B6B6B]">{item.subtitle}</p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="shrink-0 text-[#6B6B6B]"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pt-1 text-[#6B6B6B] leading-relaxed text-sm">
                      {item.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Related products ──────────────────────────────────────────────────────────

function RelatedProducts({ product }: { product: ProductCostEntry }) {
  const related = PRODUCT_COSTS.filter(
    (p) => p.relatedIndustry === product.relatedIndustry && p.slug !== product.slug
  ).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
        Related Cost Guides
      </h2>
      <p className="text-[#6B6B6B] mb-6">
        More products from the{" "}
        <span className="font-medium text-[#1A1A1A]">{product.relatedIndustry}</span>{" "}
        industry.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/cost-to-manufacture/${p.slug}`}
            className="group bg-white rounded-2xl border border-[#E8E8E4] p-6 hover:border-[#FF6B35] transition-colors"
          >
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              {p.category}
            </p>
            <p className="font-semibold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors mb-3">
              {p.name}
            </p>
            <p className="text-sm text-[#FF6B35] font-medium">
              {formatCurrency(p.avgUnitCost.min)}–{formatCurrency(p.avgUnitCost.max)}{" "}
              <span className="text-[#6B6B6B] font-normal">/ unit</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ── Main template ─────────────────────────────────────────────────────────────

export default function ProductCostTemplate({
  product,
}: {
  product: ProductCostEntry
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.avgUnitCost.min,
      highPrice: product.avgUnitCost.max,
      priceCurrency: "USD",
      offerCount: product.topCountries.length,
    },
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/cost-to-manufacture"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Cost Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        {/* ── H1 ──────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <p className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wide mb-3">
            {product.category} &middot; Cost Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-4">
            How Much Does It Cost to Manufacture {product.name}?
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            A complete breakdown of unit costs, tooling, materials, shipping,
            and lead times for manufacturing {product.name.toLowerCase()}.
          </p>
        </header>

        {/* ── Quick Stats Grid (2x2) ─────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-4 mb-16">
          {/* Unit Cost */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Unit Cost
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatCurrency(product.avgUnitCost.min)}&ndash;
              {formatCurrency(product.avgUnitCost.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">per unit</p>
          </div>

          {/* Lead Time */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Lead Time
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {product.avgLeadTimeDays} days
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">avg. production</p>
          </div>

          {/* MOQ Range */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              MOQ Range
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatNumber(product.moqRange.min)}&ndash;
              {formatNumber(product.moqRange.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">units minimum</p>
          </div>

          {/* Tooling Cost */}
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
            <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
              Tooling Cost
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {formatCurrency(product.toolingCost.min)}&ndash;
              {formatCurrency(product.toolingCost.max)}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-1">one-time setup</p>
          </div>
        </section>

        {/* ── Description ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Overview</h2>
          <p className="text-[#6B6B6B] leading-relaxed text-lg">
            {product.description}
          </p>
        </section>

        {/* ── Cost Breakdown Table ────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Cost Breakdown
          </h2>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F0]">
                  <th className="text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Cost Component
                  </th>
                  <th className="text-right text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Range
                  </th>
                  <th className="text-right text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide px-6 py-4">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Unit Manufacturing Cost
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.avgUnitCost.min)}&ndash;
                    {formatCurrency(product.avgUnitCost.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Tooling / Mold Setup
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.toolingCost.min)}&ndash;
                    {formatCurrency(product.toolingCost.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    One-time
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#1A1A1A] font-medium">
                    Shipping per Unit
                  </td>
                  <td className="px-6 py-4 text-right text-[#1A1A1A]">
                    {formatCurrency(product.shippingPerUnit.min)}&ndash;
                    {formatCurrency(product.shippingPerUnit.max)}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
                <tr className="bg-[#F5F5F0]">
                  <td className="px-6 py-4 text-[#1A1A1A] font-bold">
                    Total Landed Cost (est.)
                  </td>
                  <td className="px-6 py-4 text-right text-[#FF6B35] font-bold">
                    {formatCurrency(
                      product.avgUnitCost.min + product.shippingPerUnit.min
                    )}
                    &ndash;
                    {formatCurrency(
                      product.avgUnitCost.max + product.shippingPerUnit.max
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-[#6B6B6B] text-sm">
                    Per unit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#6B6B6B] mt-3">
            * Tooling costs are amortized across your order quantity. Actual
            costs vary based on supplier, materials, and order volume.
          </p>
        </section>

        {/* ── NEW: Cost Breakdown Visual Chart ───────────────────────── */}
        <CostBreakdownChart />

        {/* ── NEW: Country Comparison Mini-Table ─────────────────────── */}
        <CountryComparisonTable product={product} />

        {/* ── NEW: Margin Calculator ──────────────────────────────────── */}
        <MarginCalculator product={product} />

        {/* ── NEW: What Drives the Cost Accordion ─────────────────────── */}
        <CostDriverAccordion />

        {/* ── Best Countries ──────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Best Manufacturing Countries
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.topCountries.map((country, i) => (
              <div
                key={country}
                className="bg-white rounded-2xl border border-[#E8E8E4] p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF3ED] flex items-center justify-center text-[#FF6B35] font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">
                    {country}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {countryNote(country, product.category)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common Materials ────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Common Materials
          </h2>
          <div className="flex flex-wrap gap-3">
            {product.materials.map((material) => (
              <span
                key={material}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#E8E8E4] text-sm font-medium text-[#1A1A1A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                {material}
              </span>
            ))}
          </div>
        </section>

        {/* ── Margin Advice ───────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Margin Advice
          </h2>
          <div className="bg-[#FFF3ED] border border-[#FFD4BB] rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed text-lg">
                {product.marginAdvice}
              </p>
            </div>
          </div>
        </section>

        {/* ── NEW: Related Products ────────────────────────────────────── */}
        <RelatedProducts product={product} />

        {/* ── NEW: CTA ─────────────────────────────────────────────────── */}
        <section className="bg-[#1A1A1A] rounded-2xl p-10 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Get the full breakdown for your product
          </h2>
          <p className="text-[#767676] mb-8 max-w-xl mx-auto">
            Our AI analyzes your exact specifications and delivers a
            comprehensive manufacturing feasibility report in 2–5 minutes.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-8 py-3 text-lg font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Start Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </main>
  )
}

// ── Country notes ─────────────────────────────────────────────────────────────

function countryNote(country: string, category: string): string {
  const notes: Record<string, string> = {
    China:
      "World's largest manufacturing hub. Excellent for high-volume production with mature supply chains and competitive pricing across virtually all product categories.",
    Vietnam:
      "Rapidly growing alternative to China with lower labor costs. Especially strong in textiles, footwear, furniture, and electronics assembly.",
    India:
      "Cost-effective for labor-intensive products. Strong in textiles, leather goods, jewelry, and pharmaceuticals. Improving infrastructure and quality standards.",
    Bangladesh:
      "Among the lowest labor costs globally. Dominant in basic apparel and textiles. Growing capability in more complex garments.",
    Taiwan:
      "Specializes in precision electronics, semiconductors, and high-tech components. Premium quality with correspondingly higher costs.",
    "South Korea":
      "Leader in displays, memory chips, and advanced electronics. Known for innovation and quality in consumer tech and automotive.",
    Indonesia:
      "Competitive in footwear, textiles, and palm-oil-based products. Large workforce with growing manufacturing sophistication.",
    Turkey:
      "Strategic location bridging Europe and Asia. Strong in textiles, ceramics, furniture, and automotive parts with quick access to EU markets.",
    Mexico:
      "Nearshoring hub for North American companies. Strong in automotive, electronics, and medical devices with USMCA trade benefits.",
    Poland:
      "Central European manufacturing base. Competitive in furniture, automotive parts, and electronics with EU market access.",
    Italy:
      "Premium craftsmanship in leather, fashion, cosmetics, and food production. Higher costs offset by luxury brand positioning.",
    Thailand:
      "Well-established automotive and electronics manufacturing. Growing in food processing and medical devices.",
  }

  return (
    notes[country] ??
    `Known manufacturing hub for ${category.toLowerCase()} products with competitive pricing and established export infrastructure.`
  )
}
