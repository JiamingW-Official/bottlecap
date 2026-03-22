"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Clock, DollarSign, Shield, Star } from "lucide-react"

const COUNTRIES = [
  {
    flag: "🇨🇳",
    name: "China",
    code: "CN",
    tagline: "Largest manufacturing ecosystem on earth",
    laborCost: "$3.50–$5/hr",
    leadTime: "25–40 days",
    moq: "300–1,000",
    quality: 82,
    ip: 55,
    infrastructure: 95,
    tariff: "7.5–25%",
    specializations: ["Electronics", "Plastics", "Textiles", "Metals"],
    strengths: ["Lowest tooling costs", "Fastest prototyping", "Huge supplier ecosystem"],
    watch: ["IP risk if not protected", "Higher tariffs post-2019"],
    color: "#EF4444",
    href: "/manufacturers/china",
  },
  {
    flag: "🇻🇳",
    name: "Vietnam",
    code: "VN",
    tagline: "Rising star for US-tariff-friendly sourcing",
    laborCost: "$2.50–$4/hr",
    leadTime: "30–45 days",
    moq: "300–500",
    quality: 78,
    ip: 65,
    infrastructure: 75,
    tariff: "5–15%",
    specializations: ["Textiles", "Electronics assembly", "Furniture", "Footwear"],
    strengths: ["Lower tariffs than China", "Growing supplier base", "Strong US trade relations"],
    watch: ["Higher MOQ than China in some sectors", "Less specialized than China"],
    color: "#F59E0B",
    href: "/manufacturers/vietnam",
  },
  {
    flag: "🇮🇳",
    name: "India",
    code: "IN",
    tagline: "Cost leader for textiles, chemicals & more",
    laborCost: "$1.50–$3/hr",
    leadTime: "35–55 days",
    moq: "200–800",
    quality: 72,
    ip: 62,
    infrastructure: 68,
    tariff: "0–15%",
    specializations: ["Textiles", "Pharmaceuticals", "Gems", "Software"],
    strengths: ["Lowest labor costs", "English-speaking workforce", "Large domestic market"],
    watch: ["Infrastructure gaps outside major cities", "Longer lead times"],
    color: "#F97316",
    href: "/manufacturers/india",
  },
  {
    flag: "🇲🇽",
    name: "Mexico",
    code: "MX",
    tagline: "Nearshoring with zero US tariffs via USMCA",
    laborCost: "$3–$5.50/hr",
    leadTime: "15–25 days",
    moq: "200–500",
    quality: 76,
    ip: 74,
    infrastructure: 78,
    tariff: "0% (USMCA)",
    specializations: ["Auto parts", "Electronics assembly", "Aerospace", "Medical devices"],
    strengths: ["Zero tariffs (USMCA)", "Shortest lead times", "Same time zone as US"],
    watch: ["Smaller supplier ecosystem", "Higher labor cost than Asia"],
    color: "#22C55E",
    href: "/manufacturers/mexico",
  },
  {
    flag: "🇰🇷",
    name: "South Korea",
    code: "KR",
    tagline: "Premium quality for beauty & advanced electronics",
    laborCost: "$12–$20/hr",
    leadTime: "20–35 days",
    moq: "500–2,000",
    quality: 92,
    ip: 88,
    infrastructure: 95,
    tariff: "0% (KORUS FTA)",
    specializations: ["Beauty/Cosmetics", "Semiconductors", "Displays", "EV batteries"],
    strengths: ["Highest quality standards", "Strong IP protection", "Premium brand value"],
    watch: ["Higher labor costs", "Smaller scale capacity"],
    color: "#3B82F6",
    href: "/manufacturers/south-korea",
  },
]

const TABS = [
  { key: "overview", label: "Overview", icon: Star },
  { key: "cost",     label: "Cost",     icon: DollarSign },
  { key: "speed",    label: "Speed",    icon: Clock },
  { key: "quality",  label: "Quality",  icon: Shield },
]

function RatingBar({ value, color = "#FF6B35" }: { value: number; color?: string }) {
  return (
    <div className="flex-1 h-2 bg-[#F0F0EC] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export default function CountrySpotlight() {
  const [activeCountry, setActiveCountry] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const country = COUNTRIES[activeCountry]

  return (
    <div>
      {/* Country selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {COUNTRIES.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActiveCountry(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCountry === i
                ? "bg-[#1A1A1A] text-white shadow-md"
                : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40"
            }`}
          >
            <span className="text-base">{c.flag}</span>
            {c.name}
          </button>
        ))}
      </div>

      {/* Country detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCountry}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden"
        >
          {/* Header */}
          <div
            className="px-6 py-5 border-b border-[#E8E8E4] flex items-start justify-between"
            style={{ borderLeft: `4px solid ${country.color}` }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h3 className="text-xl font-black text-[#1A1A1A]">{country.name}</h3>
                  <p className="text-sm text-[#6B6B6B]">{country.tagline}</p>
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F5F5F0] text-[#6B6B6B]">
              Tariff: {country.tariff}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E8E8E4]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#FF6B35] border-b-2 border-[#FF6B35]"
                    : "text-[#9B9B9B] hover:text-[#6B6B6B]"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-3">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {country.specializations.map((s) => (
                        <span key={s} className="text-xs bg-[#F5F5F0] text-[#4B4B4B] px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-3">Ratings</p>
                    <div className="space-y-2">
                      {[
                        { label: "Quality", value: country.quality, color: "#22C55E" },
                        { label: "IP Protection", value: country.ip, color: "#3B82F6" },
                        { label: "Infrastructure", value: country.infrastructure, color: "#8B5CF6" },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center gap-3">
                          <span className="text-xs text-[#6B6B6B] w-24 shrink-0">{r.label}</span>
                          <RatingBar value={r.value} color={r.color} />
                          <span className="text-xs font-bold text-[#1A1A1A] w-8 text-right">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "cost" && (
                <motion.div
                  key="cost"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Labor cost/hr", value: country.laborCost, icon: "💰" },
                    { label: "US tariff rate", value: country.tariff, icon: "📋" },
                    { label: "Typical MOQ", value: country.moq + " units", icon: "📦" },
                    { label: "Lead time", value: country.leadTime, icon: "⏱️" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#F5F5F0] rounded-xl p-4 text-center">
                      <span className="text-2xl mb-2 block">{stat.icon}</span>
                      <p className="font-black text-[#1A1A1A] text-sm leading-tight">{stat.value}</p>
                      <p className="text-[10px] text-[#9B9B9B] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "speed" && (
                <motion.div
                  key="speed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center bg-[#F5F5F0] rounded-xl p-4 flex-1">
                      <p className="text-2xl font-black text-[#1A1A1A]">{country.leadTime}</p>
                      <p className="text-xs text-[#9B9B9B] mt-1">Typical lead time</p>
                    </div>
                    <div className="text-center bg-[#F5F5F0] rounded-xl p-4 flex-1">
                      <p className="text-2xl font-black text-[#1A1A1A]">{country.moq}</p>
                      <p className="text-xs text-[#9B9B9B] mt-1">Typical MOQ (units)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-3">Lead time vs other regions</p>
                    <div className="space-y-2">
                      {COUNTRIES.map((c) => {
                        const minDays = parseInt(c.leadTime.split("–")[0])
                        return (
                          <div key={c.name} className={`flex items-center gap-3 ${c.name === country.name ? "font-semibold" : ""}`}>
                            <span className="text-sm w-6">{c.flag}</span>
                            <span className="text-xs text-[#4B4B4B] w-20">{c.name}</span>
                            <RatingBar value={100 - minDays} color={c.name === country.name ? "#FF6B35" : "#D0D0C8"} />
                            <span className="text-xs text-[#9B9B9B] w-24 text-right shrink-0">{c.leadTime}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "quality" && (
                <motion.div
                  key="quality"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-3">Strengths</p>
                    <div className="space-y-2">
                      {country.strengths.map((s) => (
                        <div key={s} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                          <span className="text-[#22C55E]">✓</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B9B9B] mb-3">Watch out for</p>
                    <div className="space-y-2">
                      {country.watch.map((w) => (
                        <div key={w} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                          <span className="text-[#F59E0B]">⚠</span>
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 flex items-center justify-between">
            <p className="text-xs text-[#9B9B9B]">
              Want a full {country.name} analysis for your product?
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={country.href}
                className="text-xs text-[#FF6B35] font-semibold hover:underline flex items-center gap-1"
              >
                Country profile <ChevronRight className="w-3 h-3" />
              </Link>
              <Link
                href="/analyze"
                className="text-xs bg-[#FF6B35] text-white px-3 py-1.5 rounded-full font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Analyze now — $99
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
