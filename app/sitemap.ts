import type { MetadataRoute } from 'next'
import { PRODUCT_COSTS } from '@/lib/data/product-costs'
import { MANUFACTURING_COUNTRIES } from '@/lib/data/countries'
import { COMPARISONS } from '@/lib/data/comparisons'
import { GLOSSARY_TERMS } from '@/lib/data/glossary'
import { TREND_REPORTS } from '@/lib/data/trending-products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bottlecap.io'
  const now = new Date()

  // ─── Core pages ────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/analyze`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/report/demo`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/hs-lookup`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/tariff-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/moq-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/margin-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/supplier-finder`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/roi-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/country-compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/guide/manufacturing-101`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/country-comparison`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/materials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/sourcing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/electronics-manufacturing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/apparel-manufacturing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/cosmetics-manufacturing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/food-manufacturing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/furniture-manufacturing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/shipping-logistics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/quality-control`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/ip-protection`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/packaging-design`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide/certifications`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/dashboard`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // ─── Index pages ───────────────────────────────────────
  const indexPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/cost-to-manufacture`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/manufacturers`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/trends`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // ─── Product cost pages (~69) ──────────────────────────
  const productCostPages: MetadataRoute.Sitemap = PRODUCT_COSTS.map((p) => ({
    url: `${baseUrl}/cost-to-manufacture/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ─── Country pages (~14) ───────────────────────────────
  const countryPages: MetadataRoute.Sitemap = MANUFACTURING_COUNTRIES.map((c) => ({
    url: `${baseUrl}/manufacturers/${c.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ─── Comparison pages (~21) ────────────────────────────
  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ─── Glossary term pages (~60) ─────────────────────────
  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY_TERMS.map((t) => ({
    url: `${baseUrl}/glossary/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // ─── Trend report pages (~6) ──────────────────────────
  const trendPages: MetadataRoute.Sitemap = TREND_REPORTS.map((r) => ({
    url: `${baseUrl}/trends/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...corePages,
    ...indexPages,
    ...productCostPages,
    ...countryPages,
    ...comparisonPages,
    ...glossaryPages,
    ...trendPages,
  ]
}
