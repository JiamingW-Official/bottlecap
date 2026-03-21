import { INDUSTRY_CATEGORIES } from "@/lib/data/industries"
import { MATERIALS_DATABASE } from "@/lib/data/materials"
import { PRODUCT_COSTS } from "@/lib/data/product-costs"

export interface ClassificationResult {
  category: { name: string; confidence: "high" | "medium" | "low" } | null
  materials: string[]
  complexity: "simple" | "moderate" | "complex" | null
  relatedProducts: Array<{
    name: string
    costRange: { min: number; max: number }
  }>
  suggestedCountries: string[]
}

const ELECTRONIC_KEYWORDS = [
  "pcb",
  "sensor",
  "bluetooth",
  "firmware",
  "battery",
  "wireless",
  "app",
  "gps",
  "chip",
  "microcontroller",
  "circuit",
  "led",
  "motor",
  "antenna",
  "charger",
  "usb",
  "iot",
  "smart",
  "digital",
  "electronic",
]

export function classifyProduct(text: string): ClassificationResult {
  if (!text || text.trim().length < 5) {
    return {
      category: null,
      materials: [],
      complexity: null,
      relatedProducts: [],
      suggestedCountries: [],
    }
  }

  const tokens = text.toLowerCase().split(/\s+/)
  const fullText = text.toLowerCase()

  // Score each industry category
  const categoryScores = INDUSTRY_CATEGORIES.map((cat) => {
    let score = 0
    const nameLower = cat.name.toLowerCase()
    const descLower = cat.description.toLowerCase()

    // Direct name match (strong signal)
    if (fullText.includes(nameLower)) score += 3

    // Subcategory match
    for (const sub of cat.subcategories) {
      const subLower = sub.toLowerCase()
      if (fullText.includes(subLower)) score += 3
      // Partial token match against subcategory words
      const subWords = subLower.split(/\s+/)
      for (const token of tokens) {
        if (token.length >= 3 && subWords.some((w) => w.includes(token))) {
          score += 1
        }
      }
    }

    // Material match
    for (const mat of cat.commonMaterials) {
      if (fullText.includes(mat.toLowerCase())) score += 2
    }

    // Description keyword overlap
    for (const token of tokens) {
      if (token.length >= 4 && descLower.includes(token)) {
        score += 0.5
      }
    }

    return { category: cat, score }
  })

  categoryScores.sort((a, b) => b.score - a.score)
  const topCategory = categoryScores[0]

  const category =
    topCategory.score >= 4
      ? { name: topCategory.category.name, confidence: "high" as const }
      : topCategory.score >= 2
        ? { name: topCategory.category.name, confidence: "medium" as const }
        : topCategory.score >= 1
          ? { name: topCategory.category.name, confidence: "low" as const }
          : null

  // Find matching materials
  const materialMatches = MATERIALS_DATABASE.filter((mat) => {
    const matName = mat.name.toLowerCase()
    if (fullText.includes(matName)) return true
    // Check if any material use matches the input
    return mat.commonUses.some((use) => {
      const useLower = use.toLowerCase()
      return tokens.some(
        (t) => t.length >= 4 && useLower.includes(t)
      )
    })
  }).slice(0, 3)

  // Assess complexity
  const electronicCount = ELECTRONIC_KEYWORDS.filter((kw) =>
    fullText.includes(kw)
  ).length
  const complexity =
    electronicCount >= 3
      ? ("complex" as const)
      : electronicCount >= 1
        ? ("moderate" as const)
        : tokens.length >= 3
          ? ("simple" as const)
          : null

  // Find related products
  const productScores = PRODUCT_COSTS.map((p) => {
    let score = 0
    const pName = p.name.toLowerCase()
    const pDesc = p.description.toLowerCase()

    if (fullText.includes(pName)) score += 5
    for (const token of tokens) {
      if (token.length >= 3 && pName.includes(token)) score += 2
      if (token.length >= 4 && pDesc.includes(token)) score += 0.5
    }
    // Bonus if category matches
    if (category && p.relatedIndustry === category.name) score += 1

    return { product: p, score }
  })

  productScores.sort((a, b) => b.score - a.score)
  const relatedProducts = productScores
    .filter((p) => p.score >= 2)
    .slice(0, 2)
    .map((p) => ({
      name: p.product.name,
      costRange: p.product.avgUnitCost,
    }))

  // Suggested countries from matched category
  const suggestedCountries = category
    ? (
        INDUSTRY_CATEGORIES.find((c) => c.name === category.name)
          ?.topCountries || []
      ).slice(0, 3)
    : []

  return {
    category,
    materials: materialMatches.map((m) => m.name),
    complexity,
    relatedProducts,
    suggestedCountries,
  }
}
