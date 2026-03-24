"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight, TrendingUp, AlertTriangle } from "lucide-react"

// ─── Design tokens ───────────────────────────────────────────
const T = {
  orange: "#FF6B35",
  dark: "#1A1A1A",
  offWhite: "#FAFAF8",
  border: "#E8E8E4",
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  dimText: "#888888",
  mutedText: "#AAAAAA",
  barBg: "#2A2A2A",
} as const

// ─── Ease tuples ─────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1]

// ─── Interfaces ──────────────────────────────────────────────
interface RadarAxis {
  label: string
  value: number // 0–100
}

interface Metric {
  label: string
  value: string
  numeric: number // normalized 0–100 for bar width
  chinaBaseline: number // China's score for comparison
  unit: string
}

interface OutlookBullet {
  text: string
  sentiment: "positive" | "neutral" | "caution"
}

interface Country {
  flag: string
  name: string
  code: string
  tagline: string
  laborCost: string
  leadTime: string
  moq: string
  tariff: string
  specializations: string[]
  whyNow: string
  color: string
  href: string
  metrics: Metric[]
  radar: RadarAxis[]
  outlook2026: OutlookBullet[]
  sparkData: number[] // 7 points for sparkline
}

// ─── Country data ────────────────────────────────────────────
const COUNTRIES: Country[] = [
  {
    flag: "🇨🇳",
    name: "China",
    code: "CN",
    tagline: "Largest manufacturing ecosystem on earth",
    laborCost: "$3.50–$5/hr",
    leadTime: "25–40 days",
    moq: "300–1,000",
    tariff: "7.5–25%",
    specializations: ["Electronics", "Plastics", "Textiles", "Metals", "Tooling", "Injection Molding"],
    whyNow: "Section 301 tariffs (7.5–25%) are prompting brands to dual-source, but China remains essential for complex electronics and rapid prototyping. Vietnam+China splits are the dominant strategy in 2026.",
    color: "#EF4444",
    href: "/manufacturers/china",
    sparkData: [85, 88, 82, 78, 75, 73, 70],
    metrics: [
      { label: "Labor Cost", value: "$3.50–5/hr", numeric: 55, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "25–40 days", numeric: 60, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "300–1K", numeric: 45, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "7.5–25%", numeric: 75, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 82 },
      { label: "IP Safety", value: 55 },
      { label: "Infrastructure", value: 95 },
      { label: "Cost", value: 70 },
      { label: "Speed", value: 65 },
    ],
    outlook2026: [
      { text: "Section 301 tariffs locked at 25% on most goods — de minimis exemption under threat", sentiment: "caution" },
      { text: "CHIPS Act redirecting semiconductor investment to US, reducing China dependency", sentiment: "neutral" },
      { text: "Still #1 for complex assemblies, precision tooling, and rapid prototyping at scale", sentiment: "positive" },
    ],
  },
  {
    flag: "🇻🇳",
    name: "Vietnam",
    code: "VN",
    tagline: "Rising star for US-tariff-friendly sourcing",
    laborCost: "$2.50–$4/hr",
    leadTime: "30–45 days",
    moq: "300–500",
    tariff: "5–15%",
    specializations: ["Textiles", "Electronics Assembly", "Furniture", "Footwear", "Packaging"],
    whyNow: "Vietnam is the #1 China-alternative in 2025–26. Electronics assembly and textile brands are moving capacity here to avoid Section 301. Supplier quality is rapidly catching up.",
    color: "#F59E0B",
    href: "/manufacturers/vietnam",
    sparkData: [40, 48, 55, 62, 70, 78, 85],
    metrics: [
      { label: "Labor Cost", value: "$2.50–4/hr", numeric: 42, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "30–45 days", numeric: 68, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "300–500", numeric: 40, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "5–15%", numeric: 35, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 78 },
      { label: "IP Safety", value: 65 },
      { label: "Infrastructure", value: 75 },
      { label: "Cost", value: 82 },
      { label: "Speed", value: 55 },
    ],
    outlook2026: [
      { text: "Bilateral trade agreement expansion with US deepening duty preferences", sentiment: "positive" },
      { text: "FDI up 32% YoY — Samsung, Intel, and Apple suppliers expanding capacity", sentiment: "positive" },
      { text: "Electronics assembly capacity on track to double by 2027", sentiment: "positive" },
    ],
  },
  {
    flag: "🇮🇳",
    name: "India",
    code: "IN",
    tagline: "Cost leader for textiles, chemicals & pharma",
    laborCost: "$1.50–$3/hr",
    leadTime: "35–55 days",
    moq: "200–800",
    tariff: "0–15%",
    specializations: ["Textiles", "Pharmaceuticals", "Gems & Jewelry", "Software", "Chemicals"],
    whyNow: "India's PLI (Production Linked Incentive) scheme is drawing Apple, Samsung, and others. For textiles, chemicals, and pharma, India often beats Vietnam on price with better IP protection than China.",
    color: "#F97316",
    href: "/manufacturers/india",
    sparkData: [30, 35, 42, 50, 58, 68, 78],
    metrics: [
      { label: "Labor Cost", value: "$1.50–3/hr", numeric: 28, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "35–55 days", numeric: 78, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "200–800", numeric: 38, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0–15%", numeric: 30, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 72 },
      { label: "IP Safety", value: 62 },
      { label: "Infrastructure", value: 68 },
      { label: "Cost", value: 90 },
      { label: "Speed", value: 45 },
    ],
    outlook2026: [
      { text: "PLI scheme Phase 2 targets $500B manufacturing output by 2030", sentiment: "positive" },
      { text: "Apple shifting 25% of iPhone production to India — Foxconn expanding Chennai plant", sentiment: "positive" },
      { text: "Infrastructure gaps persist outside major corridors — plan for longer lead times", sentiment: "caution" },
    ],
  },
  {
    flag: "🇲🇽",
    name: "Mexico",
    code: "MX",
    tagline: "Nearshoring with zero US tariffs via USMCA",
    laborCost: "$3–$5.50/hr",
    leadTime: "15–25 days",
    moq: "200–500",
    tariff: "0% (USMCA)",
    specializations: ["Auto Parts", "Electronics Assembly", "Aerospace", "Medical Devices", "Wire Harnesses"],
    whyNow: "Nearshoring is surging post-2023. Auto, electronics, and aerospace brands are building Mexico capacity. For US founders who need fast iteration cycles, Mexico's 15-day lead time is a game-changer.",
    color: "#22C55E",
    href: "/manufacturers/mexico",
    sparkData: [50, 55, 60, 68, 75, 82, 90],
    metrics: [
      { label: "Labor Cost", value: "$3–5.50/hr", numeric: 52, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "15–25 days", numeric: 35, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "200–500", numeric: 35, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0%", numeric: 5, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 76 },
      { label: "IP Safety", value: 74 },
      { label: "Infrastructure", value: 78 },
      { label: "Cost", value: 60 },
      { label: "Speed", value: 90 },
    ],
    outlook2026: [
      { text: "USMCA joint review scheduled for 2026 — auto parts remain tariff-free under rules of origin", sentiment: "neutral" },
      { text: "Nearshoring FDI hit record $36B in 2024, with Tesla and BMW expanding Monterrey operations", sentiment: "positive" },
      { text: "Auto parts and wire harnesses tariff-free — fastest growing US import corridor", sentiment: "positive" },
    ],
  },
  {
    flag: "🇰🇷",
    name: "South Korea",
    code: "KR",
    tagline: "Premium quality for beauty & advanced electronics",
    laborCost: "$12–$20/hr",
    leadTime: "20–35 days",
    moq: "500–2,000",
    tariff: "0% (KORUS)",
    specializations: ["Beauty/Cosmetics", "Semiconductors", "Displays", "EV Batteries", "Packaging Design"],
    whyNow: "K-beauty's global surge has made Korean cosmetics OEM a premium signal. For beauty brands, 'Made in Korea' commands 20-30% higher retail prices.",
    color: "#3B82F6",
    href: "/manufacturers/south-korea",
    sparkData: [70, 72, 75, 78, 80, 84, 88],
    metrics: [
      { label: "Labor Cost", value: "$12–20/hr", numeric: 88, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "20–35 days", numeric: 50, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "500–2K", numeric: 60, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0%", numeric: 5, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 92 },
      { label: "IP Safety", value: 88 },
      { label: "Infrastructure", value: 95 },
      { label: "Cost", value: 30 },
      { label: "Speed", value: 72 },
    ],
    outlook2026: [
      { text: "KORUS FTA stable — zero tariffs on most manufactured goods to US", sentiment: "positive" },
      { text: "K-beauty exports to US up 47% in 2025, cementing Korea as the premium cosmetics OEM hub", sentiment: "positive" },
      { text: "Semiconductor investment roadmap: $471B committed through 2047 via Samsung and SK Hynix", sentiment: "positive" },
    ],
  },
  {
    flag: "🇹🇼",
    name: "Taiwan",
    code: "TW",
    tagline: "Global leader in precision electronics & semiconductors",
    laborCost: "$8–$14/hr",
    leadTime: "20–35 days",
    moq: "300–1,000",
    tariff: "0–5%",
    specializations: ["Semiconductors", "PCBs", "Precision Machinery", "Optical Devices", "IC Design"],
    whyNow: "Taiwan's TSMC, Foxconn, and Pegatron are the backbone of global tech. For products requiring advanced PCBs or custom silicon, Taiwan is often the only credible option despite geopolitical risk.",
    color: "#06B6D4",
    href: "/manufacturers/taiwan",
    sparkData: [82, 83, 80, 78, 76, 74, 75],
    metrics: [
      { label: "Labor Cost", value: "$8–14/hr", numeric: 72, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "20–35 days", numeric: 50, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "300–1K", numeric: 45, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0–5%", numeric: 15, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 90 },
      { label: "IP Safety", value: 85 },
      { label: "Infrastructure", value: 92 },
      { label: "Cost", value: 40 },
      { label: "Speed", value: 70 },
    ],
    outlook2026: [
      { text: "TSMC Arizona fab operational Q3 2025 — but Taiwan remains the advanced node hub", sentiment: "neutral" },
      { text: "Geopolitical risk premium rising — insurers increasing Taiwan Strait coverage costs 3x", sentiment: "caution" },
      { text: "PCB and IC design capabilities still unmatched globally — no viable alternative at scale", sentiment: "positive" },
    ],
  },
  {
    flag: "🇧🇩",
    name: "Bangladesh",
    code: "BD",
    tagline: "World's #2 apparel exporter — unbeatable textile costs",
    laborCost: "$0.80–$1.50/hr",
    leadTime: "40–60 days",
    moq: "500–2,000",
    tariff: "0–12%",
    specializations: ["Garments", "Woven Textiles", "Knitwear", "Home Textiles", "Denim"],
    whyNow: "Bangladesh is the default destination for high-volume apparel. For brands selling to EU, GSP+ status means zero tariffs. H&M, Zara, and Gap source heavily here — supplier vetting is mature.",
    color: "#10B981",
    href: "/manufacturers/bangladesh",
    sparkData: [60, 62, 58, 55, 58, 60, 63],
    metrics: [
      { label: "Labor Cost", value: "$0.80–1.50/hr", numeric: 15, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "40–60 days", numeric: 85, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "500–2K", numeric: 60, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0–12%", numeric: 25, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 68 },
      { label: "IP Safety", value: 48 },
      { label: "Infrastructure", value: 55 },
      { label: "Cost", value: 95 },
      { label: "Speed", value: 35 },
    ],
    outlook2026: [
      { text: "EU GSP+ eligibility under review in 2026 — compliance upgrades underway", sentiment: "caution" },
      { text: "Minimum wage increased 56% in late 2024, but still cheapest globally for woven garments", sentiment: "neutral" },
      { text: "Vertically integrated mills offer fabric-to-finished pipeline unmatched in cost efficiency", sentiment: "positive" },
    ],
  },
  {
    flag: "🇹🇭",
    name: "Thailand",
    code: "TH",
    tagline: "Southeast Asia's hub for auto parts, food & electronics",
    laborCost: "$3–$6/hr",
    leadTime: "25–40 days",
    moq: "300–800",
    tariff: "0–15%",
    specializations: ["Auto Parts", "Electronics", "Food Processing", "Medical Devices", "Rubber Products"],
    whyNow: "Thailand benefits from 'China+1' strategies across auto parts and electronics. Japanese manufacturers like Toyota and Sony have operated here for decades — quality infrastructure is proven.",
    color: "#8B5CF6",
    href: "/manufacturers/thailand",
    sparkData: [55, 58, 60, 63, 67, 72, 76],
    metrics: [
      { label: "Labor Cost", value: "$3–6/hr", numeric: 50, chinaBaseline: 55, unit: "/hr" },
      { label: "Lead Time", value: "25–40 days", numeric: 60, chinaBaseline: 60, unit: "days" },
      { label: "Typical MOQ", value: "300–800", numeric: 42, chinaBaseline: 45, unit: "units" },
      { label: "US Tariff", value: "0–15%", numeric: 30, chinaBaseline: 75, unit: "%" },
    ],
    radar: [
      { label: "Quality", value: 80 },
      { label: "IP Safety", value: 70 },
      { label: "Infrastructure", value: 82 },
      { label: "Cost", value: 65 },
      { label: "Speed", value: 60 },
    ],
    outlook2026: [
      { text: "BOI investment incentives extended through 2032 — 8-year corporate tax holidays for target industries", sentiment: "positive" },
      { text: "EV battery manufacturing hub emerging — BYD, CATL, and Great Wall Motor building Thai plants", sentiment: "positive" },
      { text: "Japanese anchor tenants (Toyota, Honda, Sony) provide deep tier-2 supplier networks", sentiment: "positive" },
    ],
  },
]

// ─── Sparkline component ─────────────────────────────────────
function Sparkline({ data, color, width = 48, height = 20 }: { data: number[]; color: string; width?: number; height?: number }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Metric bar comparing to China baseline ──────────────────
function MetricBar({
  metric,
  isActive,
}: {
  metric: Metric
  isActive: boolean
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-[#888]">{metric.label}</span>
        <span className="font-mono text-sm font-semibold text-[#FAFAF8]">{metric.value}</span>
      </div>
      <div className="relative h-2 rounded-sm overflow-hidden" style={{ backgroundColor: T.barBg }}>
        {/* China baseline marker */}
        <div
          className="absolute top-0 h-full w-px bg-[#555] z-10"
          style={{ left: `${metric.chinaBaseline}%` }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full rounded-sm"
          initial={{ width: 0 }}
          animate={{ width: isActive ? `${metric.numeric}%` : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          style={{
            backgroundColor: metric.numeric <= metric.chinaBaseline ? T.green : T.amber,
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[9px] text-[#555] font-mono">0</span>
        <span className="text-[9px] text-[#555] font-mono flex items-center gap-1">
          <span className="inline-block w-1.5 h-px bg-[#555]" /> CN baseline
        </span>
      </div>
    </div>
  )
}

// ─── CSS Pentagon radar chart ────────────────────────────────
function RadarChart({ axes, color, isActive }: { axes: RadarAxis[]; color: string; isActive: boolean }) {
  // Pentagon layout: 5 points equally spaced, top-center start
  const cx = 80
  const cy = 80
  const r = 65
  const labelR = 78

  const angleOffset = -Math.PI / 2 // start from top
  const positions = axes.map((_, i) => {
    const angle = angleOffset + (2 * Math.PI * i) / 5
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      lx: cx + labelR * Math.cos(angle),
      ly: cy + labelR * Math.sin(angle),
    }
  })

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1]

  const gridPolygons = rings.map((scale) => {
    const pts = positions.map((p) => {
      const dx = p.x - cx
      const dy = p.y - cy
      return `${cx + dx * scale},${cy + dy * scale}`
    })
    return pts.join(" ")
  })

  // Data polygon
  const dataPoints = axes.map((axis, i) => {
    const scale = axis.value / 100
    const dx = positions[i].x - cx
    const dy = positions[i].y - cy
    return `${cx + dx * scale},${cy + dy * scale}`
  })

  return (
    <div className="relative flex items-center justify-center">
      <svg width={160} height={160} viewBox="0 0 160 160">
        {/* Grid lines */}
        {gridPolygons.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="#333"
            strokeWidth={i === rings.length - 1 ? "1" : "0.5"}
          />
        ))}
        {/* Axis lines */}
        {positions.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#333" strokeWidth="0.5" />
        ))}
        {/* Data shape */}
        <motion.polygon
          points={dataPoints.join(" ")}
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_IN_OUT }}
        />
        {/* Data points */}
        {axes.map((axis, i) => {
          const scale = axis.value / 100
          const dx = positions[i].x - cx
          const dy = positions[i].y - cy
          return (
            <motion.circle
              key={i}
              cx={cx + dx * scale}
              cy={cy + dy * scale}
              r={3}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i, ease: EASE_OUT }}
            />
          )
        })}
      </svg>
      {/* Labels positioned around the chart */}
      {axes.map((axis, i) => {
        // Position labels outside the SVG
        const angle = angleOffset + (2 * Math.PI * i) / 5
        const lx = 50 + 50 * Math.cos(angle) // percentage
        const ly = 50 + 50 * Math.sin(angle)
        return (
          <div
            key={i}
            className="absolute text-center"
            style={{
              left: `${lx}%`,
              top: `${ly}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-[9px] uppercase tracking-wide text-[#888] block leading-none">
              {axis.label}
            </span>
            <span className="font-mono text-[10px] text-[#FAFAF8] font-semibold">{axis.value}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function CountrySpotlight() {
  const [activeIndex, setActiveIndex] = useState(0)
  const country = COUNTRIES[activeIndex]

  return (
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-2xl">
      {/* Terminal-style top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
        </div>
        <span className="font-mono text-[10px] text-[#555] uppercase tracking-widest">
          Bottlecap / Country Intelligence
        </span>
        <span className="font-mono text-[10px] text-[#555]">2026 Q1</span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ─── Left: Country selector (vertical pill list) ───── */}
        <div className="lg:w-[260px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#2A2A2A] p-3 lg:p-4 overflow-x-auto lg:overflow-x-visible">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#555] mb-3 px-1">
            Select country
          </p>
          <div className="flex lg:flex-col gap-1.5">
            {COUNTRIES.map((c, i) => (
              <button
                key={c.code}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 shrink-0 group ${
                  activeIndex === i
                    ? "bg-[#2A2A2A] ring-1 ring-[#3A3A3A]"
                    : "hover:bg-[#222]"
                }`}
              >
                <span className="text-lg leading-none">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-medium truncate transition-colors ${
                        activeIndex === i ? "text-[#FAFAF8]" : "text-[#888] group-hover:text-[#AAA]"
                      }`}
                    >
                      {c.name}
                    </span>
                    <Sparkline data={c.sparkData} color={activeIndex === i ? c.color : "#444"} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Right: Data panel ──────────────────────────── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="p-5 lg:p-6"
            >
              {/* ── Header ──────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="text-2xl font-black text-[#FAFAF8] tracking-tight">{country.name}</h3>
                    <p className="text-sm text-[#888] mt-0.5">{country.tagline}</p>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-sm font-semibold shrink-0"
                  style={{
                    backgroundColor: `${country.color}15`,
                    color: country.color,
                    border: `1px solid ${country.color}30`,
                  }}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-70">Tariff</span>
                  {country.tariff}
                </div>
              </div>

              {/* ── Metrics grid with horizontal bar comparison ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                {country.metrics.map((metric) => (
                  <MetricBar key={metric.label} metric={metric} isActive={true} />
                ))}
              </div>

              <div className="h-px bg-[#2A2A2A] my-6" />

              {/* ── Radar + Outlook side by side ──────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Radar chart */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#555] mb-3">
                    Capability Profile
                  </p>
                  <div className="bg-[#141414] rounded-lg border border-[#2A2A2A] p-4 flex items-center justify-center">
                    <RadarChart axes={country.radar} color={country.color} isActive={true} />
                  </div>
                </div>

                {/* 2026 Outlook */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#555] mb-3">
                    2026 Outlook
                  </p>
                  <div className="space-y-2.5">
                    {country.outlook2026.map((bullet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 * i, ease: EASE_OUT }}
                        className="flex gap-2.5 items-start bg-[#141414] rounded-lg border border-[#2A2A2A] p-3"
                      >
                        <div className="mt-0.5 shrink-0">
                          {bullet.sentiment === "positive" && (
                            <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                          )}
                          {bullet.sentiment === "caution" && (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
                          )}
                          {bullet.sentiment === "neutral" && (
                            <div className="w-3.5 h-3.5 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                            </div>
                          )}
                        </div>
                        <p className="text-[13px] text-[#CCC] leading-relaxed">{bullet.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Specializations ──────────────────────── */}
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#555] mb-2.5">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {country.specializations.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-[#AAA] bg-[#222] border border-[#333] px-2.5 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Why Now callout ──────────────────────── */}
              <div className="bg-[#1C1A14] border border-[#F59E0B]/20 rounded-lg p-4 mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F59E0B] mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" />
                  Why now
                </p>
                <p className="text-[13px] text-[#CCC] leading-relaxed">{country.whyNow}</p>
              </div>

              {/* ── CTA Footer ───────────────────────────── */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <Link
                  href={country.href}
                  className="text-xs text-[#888] hover:text-[#FAFAF8] transition-colors flex items-center gap-1 font-mono"
                >
                  View {country.name} profile <ChevronRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A25] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Get a full {country.name} analysis for your product
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
