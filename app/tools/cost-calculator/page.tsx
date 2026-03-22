"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CostBreakdownChart from "@/components/CostBreakdownChart"

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCT_TYPES = [
  { id: "electronics_simple",    label: "Simple Electronics",         baseCost: 8,   complexity: 1.3  },
  { id: "electronics_complex",   label: "Complex Electronics",        baseCost: 18,  complexity: 1.8  },
  { id: "plastic_product",       label: "Plastic Product",            baseCost: 2.5, complexity: 1.0  },
  { id: "metal_product",         label: "Metal Product",              baseCost: 5,   complexity: 1.2  },
  { id: "textile",               label: "Textile / Apparel",          baseCost: 3,   complexity: 1.0  },
  { id: "wood_product",          label: "Wood Product",               baseCost: 4,   complexity: 1.1  },
  { id: "glass_ceramic",         label: "Glass / Ceramic",            baseCost: 3.5, complexity: 1.15 },
  { id: "bag_luggage",           label: "Bag / Luggage",              baseCost: 5,   complexity: 1.1  },
  { id: "furniture",             label: "Furniture",                  baseCost: 25,  complexity: 1.4  },
  { id: "toy",                   label: "Toy / Game",                 baseCost: 2,   complexity: 1.0  },
  { id: "cosmetic_container",    label: "Cosmetic Container",         baseCost: 1.5, complexity: 0.9  },
  { id: "sports_equipment",      label: "Sports Equipment",           baseCost: 6,   complexity: 1.2  },
  // New product types
  { id: "wearable_device",       label: "Wearable Device",           baseCost: 22,  complexity: 1.9  },
  { id: "kitchen_gadget",        label: "Kitchen Gadget",            baseCost: 7,   complexity: 1.2  },
  { id: "pet_product",           label: "Pet Product",               baseCost: 4,   complexity: 1.1  },
  { id: "beauty_device",         label: "Beauty Device",             baseCost: 12,  complexity: 1.5  },
  { id: "smart_packaging",       label: "Smart Packaging",           baseCost: 3,   complexity: 1.3  },
  { id: "outdoor_gear",          label: "Outdoor Gear",              baseCost: 9,   complexity: 1.3  },
  { id: "medical_accessory",     label: "Medical Accessory",         baseCost: 15,  complexity: 1.6  },
  { id: "bicycle_scooter",       label: "Bicycle / Scooter Accessory", baseCost: 6, complexity: 1.15 },
] as const

const COUNTRIES = [
  { id: "china",       label: "China",        laborMult: 1.0,  qualityMult: 1.0  },
  { id: "vietnam",     label: "Vietnam",      laborMult: 0.85, qualityMult: 1.02 },
  { id: "india",       label: "India",        laborMult: 0.75, qualityMult: 1.05 },
  { id: "mexico",      label: "Mexico",       laborMult: 1.15, qualityMult: 1.0  },
  { id: "thailand",    label: "Thailand",     laborMult: 0.9,  qualityMult: 1.0  },
  { id: "indonesia",   label: "Indonesia",    laborMult: 0.7,  qualityMult: 1.08 },
  { id: "turkey",      label: "Turkey",       laborMult: 1.05, qualityMult: 0.98 },
  { id: "bangladesh",  label: "Bangladesh",   laborMult: 0.6,  qualityMult: 1.12 },
  // New countries
  { id: "south_korea", label: "South Korea",  laborMult: 1.3,  qualityMult: 0.95 },
  { id: "taiwan",      label: "Taiwan",       laborMult: 1.2,  qualityMult: 0.95 },
  { id: "philippines", label: "Philippines",  laborMult: 0.72, qualityMult: 1.07 },
] as const

const MATERIALS = [
  { id: "standard",    label: "Standard / Budget",         mult: 1.0  },
  { id: "mid_range",   label: "Mid-Range",                 mult: 1.25 },
  { id: "premium",     label: "Premium / High-End",        mult: 1.6  },
  { id: "eco_friendly",label: "Eco-Friendly / Sustainable",mult: 1.4  },
] as const

// Stepped quantity values for the slider
const QTY_STEPS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000] as const

// ─── Volume discount ──────────────────────────────────────────────────────────

function getVolumeDiscount(qty: number): number {
  if (qty >= 10000) return 1 - 0.35
  if (qty >= 5000)  return 1 - 0.28
  if (qty >= 2000)  return 1 - 0.20
  if (qty >= 1000)  return 1 - 0.15
  if (qty >= 500)   return 1 - 0.08
  return 1.0
}

function getVolumeDiscountPct(qty: number): number {
  if (qty >= 10000) return 35
  if (qty >= 5000)  return 28
  if (qty >= 2000)  return 20
  if (qty >= 1000)  return 15
  if (qty >= 500)   return 8
  return 0
}

// ─── Per-unit cost computation (shared) ──────────────────────────────────────

function computePerUnit(
  productType: string,
  countryId: string,
  material: string,
  quantity: number,
  hasElectronics: boolean,
  needsCertification: boolean,
  customPackaging: boolean,
): number {
  const pt = PRODUCT_TYPES.find((p) => p.id === productType)!
  const ct = COUNTRIES.find((c) => c.id === countryId)!
  const mt = MATERIALS.find((m) => m.id === material)!

  const base       = pt.baseCost * pt.complexity * ct.laborMult * ct.qualityMult * mt.mult
  const volDiscount = getVolumeDiscount(quantity)
  const unitCost   = base * volDiscount

  const materialCost  = unitCost * 0.45
  const laborCost     = unitCost * 0.25
  const overheadCost  = unitCost * 0.15
  const packagingCost = customPackaging ? unitCost * 0.12 : unitCost * 0.05
  const shippingCost  = unitCost * 0.10

  let extras = 0
  if (hasElectronics && !productType.includes("electronics")) extras += 3.5
  if (needsCertification) extras += 0.8

  return materialCost + laborCost + overheadCost + packagingCost + shippingCost + extras
}

// ─── Optimization tips data ──────────────────────────────────────────────────

const TIPS = [
  {
    id: "moq",
    title: "Optimize your MOQ",
    body: `Volume break points dramatically change your unit economics. The biggest jumps occur at 500 units (−8%), 1,000 units (−15%), 5,000 units (−28%), and 10,000 units (−35%). If you're sitting just below a threshold — say at 900 units — consider whether you can afford to order 100 more to unlock the 15% discount. On a $10 product that's often a net saving even after the extra inventory cost.`,
  },
  {
    id: "material",
    title: "Material substitution",
    body: `Switching from Premium to Mid-Range materials typically reduces unit cost by 20–22% while maintaining 80–90% of the perceived quality. For most consumer products, a Mid-Range material with a Premium finish (anodizing, coating, silkscreen) outperforms full-Premium in customer perception per dollar spent. Always request material samples before committing to a production run.`,
  },
  {
    id: "arbitrage",
    title: "Country arbitrage",
    body: `China remains the default for electronics and complex assemblies due to its deep supply chain. However, Vietnam and Indonesia beat China on cost for textiles, simple plastics, and light assembly — often by 15–30%. India excels for labor-intensive stitching, leather goods, and mid-complexity metal work. If your product doesn't need proximity to China's electronics ecosystem, run this calculator across countries before locking a factory.`,
  },
] as const

// ─── Component ───────────────────────────────────────────────────────────────

export default function CostCalculatorPage() {
  const [productType,        setProductType]        = useState("plastic_product")
  const [country,            setCountry]            = useState("china")
  const [material,           setMaterial]           = useState("standard")
  // slider index into QTY_STEPS
  const [qtyIndex,           setQtyIndex]           = useState(2) // default 500
  const [hasElectronics,     setHasElectronics]     = useState(false)
  const [needsCertification, setNeedsCertification] = useState(false)
  const [customPackaging,    setCustomPackaging]     = useState(false)
  const [openTip,            setOpenTip]            = useState<string | null>(null)

  const quantity = QTY_STEPS[qtyIndex]

  // ── Main calc ──────────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const pt = PRODUCT_TYPES.find((p) => p.id === productType)!
    const ct = COUNTRIES.find((c) => c.id === country)!
    const mt = MATERIALS.find((m) => m.id === material)!

    const base        = pt.baseCost * pt.complexity * ct.laborMult * ct.qualityMult * mt.mult
    const volDiscount = getVolumeDiscount(quantity)
    const unitCost    = base * volDiscount

    const materialCost  = unitCost * 0.45
    const laborCost     = unitCost * 0.25
    const overheadCost  = unitCost * 0.15
    const packagingCost = customPackaging ? unitCost * 0.12 : unitCost * 0.05
    const shippingCost  = unitCost * 0.10

    let extras = 0
    if (hasElectronics && !productType.includes("electronics")) extras += 3.5
    if (needsCertification) extras += 0.8

    const total           = materialCost + laborCost + overheadCost + packagingCost + shippingCost + extras
    const toolingEstimate = pt.baseCost * (pt.complexity > 1.2 ? 5000 : 2000)
    const totalOrder      = total * quantity + toolingEstimate

    return {
      perUnit: total,
      materialCost,
      laborCost,
      overheadCost,
      packagingCost,
      shippingCost,
      extras,
      toolingEstimate,
      totalOrder,
      volumeDiscountPct: getVolumeDiscountPct(quantity),
    }
  }, [productType, country, material, quantity, hasElectronics, needsCertification, customPackaging])

  // ── Comparison table ───────────────────────────────────────────────────────
  const comparisonRows = useMemo(() => {
    const chinaPerUnit = computePerUnit(
      productType, "china", material, quantity,
      hasElectronics, needsCertification, customPackaging,
    )

    const pt = PRODUCT_TYPES.find((p) => p.id === productType)!
    const toolingEstimate = pt.baseCost * (pt.complexity > 1.2 ? 5000 : 2000)

    return [...COUNTRIES]
      .map((c) => {
        const perUnit   = computePerUnit(
          productType, c.id, material, quantity,
          hasElectronics, needsCertification, customPackaging,
        )
        const discPct   = getVolumeDiscountPct(quantity)
        const totalOrder = perUnit * quantity + toolingEstimate
        const vsChina   = c.id === "china" ? null : chinaPerUnit - perUnit
        return { ...c, perUnit, discPct, totalOrder, vsChina }
      })
      .sort((a, b) => a.perUnit - b.perUnit)
  }, [productType, material, quantity, hasElectronics, needsCertification, customPackaging])

  const chartSegments = [
    { label: "Materials", value: calc.materialCost,  color: "#FF6B35" },
    { label: "Labor",     value: calc.laborCost,     color: "#3B82F6" },
    { label: "Overhead",  value: calc.overheadCost,  color: "#8B5CF6" },
    { label: "Packaging", value: calc.packagingCost, color: "#22C55E" },
    { label: "Shipping",  value: calc.shippingCost,  color: "#F59E0B" },
    ...(calc.extras > 0
      ? [{ label: "Extras", value: calc.extras, color: "#EF4444" }]
      : []),
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        Manufacturing Cost Calculator
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Estimate your per-unit manufacturing cost based on product type,
        materials, country, and volume. Adjust the parameters below to see how
        each factor affects your total cost.
      </p>

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left: Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {PRODUCT_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Manufacturing Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Material Quality
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none"
            >
              {MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity slider (stepped) */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Quantity: {quantity.toLocaleString()} units
              {calc.volumeDiscountPct > 0 && (
                <span className="text-[#22C55E] font-normal ml-2">
                  ({calc.volumeDiscountPct}% volume discount)
                </span>
              )}
            </label>
            <input
              type="range"
              min={0}
              max={QTY_STEPS.length - 1}
              step={1}
              value={qtyIndex}
              onChange={(e) => setQtyIndex(Number(e.target.value))}
              className="w-full accent-[#FF6B35]"
            />
            {/* Tick labels */}
            <div className="flex justify-between text-xs text-[#9B9B9B] mt-1 px-0.5">
              {QTY_STEPS.map((v) => (
                <span key={v}>{v >= 1000 ? `${v / 1000}k` : v}</span>
              ))}
            </div>
            {/* Volume discount tier guide */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              {[
                { label: "< 500",   pct: "0%" },
                { label: "500",     pct: "−8%" },
                { label: "1,000",   pct: "−15%" },
                { label: "2,000",   pct: "−20%" },
                { label: "5,000",   pct: "−28%" },
                { label: "10,000+", pct: "−35%" },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="flex justify-between bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg px-2 py-1"
                >
                  <span className="text-[#6B6B6B]">{tier.label}</span>
                  <span className="font-semibold text-[#22C55E]">{tier.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasElectronics}
                onChange={(e) => setHasElectronics(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Includes electronic components (PCB, sensors, BLE)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={needsCertification}
                onChange={(e) => setNeedsCertification(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Needs certification (FCC, CE, FDA)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={customPackaging}
                onChange={(e) => setCustomPackaging(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B35]"
              />
              <span className="text-sm text-[#1A1A1A]">
                Custom branded packaging
              </span>
            </label>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">Cost Estimate</h2>
            </div>

            {/* Animated per-unit cost */}
            <div className="mb-6 text-center">
              <p className="text-xs text-[#9B9B9B] uppercase tracking-widest mb-1">
                Per Unit Cost
              </p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={calc.perUnit.toFixed(4)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                  className="text-4xl font-black text-[#FF6B35] block"
                >
                  ${calc.perUnit.toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </div>

            <CostBreakdownChart
              segments={chartSegments}
              total={calc.perUnit}
            />

            <div className="h-px bg-[#E8E8E4] my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B6B6B]">Tooling (one-time)</span>
                <span className="text-sm font-semibold">
                  ${calc.toolingEstimate.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B6B6B]">
                  Total Order ({quantity.toLocaleString()} units)
                </span>
                <span className="text-lg font-bold text-[#1A1A1A]">
                  ${calc.totalOrder.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9B9B9B] mt-4 text-center">
            Estimates based on industry averages. Actual costs vary by factory,
            specifications, and market conditions.
          </p>
        </div>
      </div>

      {/* ── All-countries comparison table ─────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">
          All-Country Comparison
        </h2>
        <p className="text-sm text-[#6B6B6B] mb-6">
          Same product, material, and quantity across every manufacturing country —
          sorted cheapest first.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAFAF8] border-b border-[#E8E8E4]">
                <th className="text-left px-5 py-3 font-semibold text-[#1A1A1A]">Country</th>
                <th className="text-right px-5 py-3 font-semibold text-[#1A1A1A]">Per Unit</th>
                <th className="text-right px-5 py-3 font-semibold text-[#1A1A1A]">Vol. Disc.</th>
                <th className="text-right px-5 py-3 font-semibold text-[#1A1A1A]">Total Order</th>
                <th className="text-right px-5 py-3 font-semibold text-[#1A1A1A]">vs China</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => {
                const isSelected = row.id === country
                return (
                  <tr
                    key={row.id}
                    onClick={() => setCountry(row.id)}
                    className={[
                      "border-b border-[#E8E8E4] last:border-0 cursor-pointer transition-colors",
                      isSelected
                        ? "bg-[#FFF0EB]"
                        : i % 2 === 0 ? "bg-white hover:bg-[#FAFAF8]" : "bg-[#FAFAF8] hover:bg-[#F3F3F0]",
                    ].join(" ")}
                    style={isSelected ? { outline: "2px solid #FF6B35", outlineOffset: "-2px" } : undefined}
                  >
                    <td className="px-5 py-3 font-medium text-[#1A1A1A]">
                      {isSelected && (
                        <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B35] mr-2" />
                      )}
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-[#1A1A1A]">
                      ${row.perUnit.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right text-[#22C55E] font-medium">
                      {row.discPct > 0 ? `−${row.discPct}%` : "—"}
                    </td>
                    <td className="px-5 py-3 text-right text-[#1A1A1A]">
                      ${row.totalOrder.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {row.vsChina === null ? (
                        <span className="text-[#9B9B9B]">—</span>
                      ) : row.vsChina > 0 ? (
                        <span className="text-[#22C55E] font-semibold">
                          −${row.vsChina.toFixed(2)}/unit
                        </span>
                      ) : (
                        <span className="text-[#EF4444] font-semibold">
                          +${Math.abs(row.vsChina).toFixed(2)}/unit
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#9B9B9B] mt-3">
          Click a row to switch the main calculator to that country. &ldquo;vs China&rdquo; shows savings (green) or premium (red) per unit.
        </p>
      </section>

      {/* ── Cost optimization tips ──────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">
          Cost Optimization Tips
        </h2>
        <p className="text-sm text-[#6B6B6B] mb-6">
          Practical strategies sourced from thousands of sourcing engagements.
        </p>

        <div className="space-y-4">
          {TIPS.map((tip) => {
            const isOpen = openTip === tip.id
            return (
              <div
                key={tip.id}
                className="bg-white border border-[#E8E8E4] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenTip(isOpen ? null : tip.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-[#1A1A1A]">{tip.title}</span>
                  {isOpen
                    ? <ChevronUp   className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                  }
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E8E8E4] pt-4">
                        {tip.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want a precise cost breakdown for your specific product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — tailored to your exact product description.
        </p>
      </div>
    </div>
  )
}
