"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tag, Globe, Cpu, Package } from "lucide-react"
import { classifyProduct, type ClassificationResult } from "@/lib/classifyProduct"

interface FormInsightPanelProps {
  productDescription: string
  isVisible: boolean
}

export default function FormInsightPanel({
  productDescription,
  isVisible,
}: FormInsightPanelProps) {
  const [classification, setClassification] =
    useState<ClassificationResult | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!isVisible || !productDescription || productDescription.length < 20) {
      setClassification(null)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setClassification(classifyProduct(productDescription))
    }, 500)

    return () => clearTimeout(debounceRef.current)
  }, [productDescription, isVisible])

  const hasResults =
    classification &&
    (classification.category ||
      classification.relatedProducts.length > 0 ||
      classification.complexity)

  if (!isVisible || !hasResults) return null

  const cards = [
    classification.category && {
      key: "category",
      icon: Tag,
      title: "Detected Category",
      content: classification.category.name,
      badge:
        classification.category.confidence === "high"
          ? "High match"
          : classification.category.confidence === "medium"
            ? "Likely match"
            : "Possible",
      badgeColor:
        classification.category.confidence === "high"
          ? "bg-[#DCFCE7] text-[#166534]"
          : classification.category.confidence === "medium"
            ? "bg-[#FEF3C7] text-[#92400E]"
            : "bg-[#F5F5F0] text-[#6B6B6B]",
    },
    classification.relatedProducts.length > 0 && {
      key: "products",
      icon: Package,
      title: "Related Products",
      content: classification.relatedProducts
        .map((p) => `${p.name} ($${p.costRange.min}–$${p.costRange.max}/unit)`)
        .join(" · "),
    },
    classification.suggestedCountries.length > 0 && {
      key: "countries",
      icon: Globe,
      title: "Suggested Regions",
      content: classification.suggestedCountries.join(", "),
    },
    classification.complexity && {
      key: "complexity",
      icon: Cpu,
      title: "Complexity",
      content:
        classification.complexity.charAt(0).toUpperCase() +
        classification.complexity.slice(1),
      badge:
        classification.complexity === "complex"
          ? "Multiple components"
          : classification.complexity === "moderate"
            ? "Some electronics"
            : "Straightforward",
      badgeColor:
        classification.complexity === "complex"
          ? "bg-[#FEF2F2] text-[#991B1B]"
          : classification.complexity === "moderate"
            ? "bg-[#FEF3C7] text-[#92400E]"
            : "bg-[#DCFCE7] text-[#166534]",
    },
  ].filter(Boolean) as Array<{
    key: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    content: string
    badge?: string
    badgeColor?: string
  }>

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-4 mb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]" />
          </span>
          <span className="text-xs font-semibold text-[#767676] uppercase tracking-wider">
            AI Preview
          </span>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {cards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 bg-[#F5F5F0] rounded-lg p-3"
              >
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 mt-0.5">
                  <card.icon className="w-3.5 h-3.5 text-[#FF6B35]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      {card.title}
                    </span>
                    {card.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${card.badgeColor}`}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 truncate">
                    {card.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
