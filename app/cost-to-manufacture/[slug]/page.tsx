import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PRODUCT_COSTS } from "@/lib/data/product-costs"
import ProductCostTemplate from "@/components/templates/ProductCostTemplate"

// ── Static generation ────────────────────────────────────────────────────

export function generateStaticParams() {
  return PRODUCT_COSTS.map((p) => ({ slug: p.slug }))
}

// ── SEO metadata ─────────────────────────────────────────────────────────

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const product = PRODUCT_COSTS.find((p) => p.slug === params.slug)
  if (!product) return {}

  const title = `Cost to Manufacture ${product.name} — Bottlecap`
  const description = `How much does it cost to manufacture ${product.name}? Unit costs from $${product.avgUnitCost.min}-$${product.avgUnitCost.max}, MOQ ${product.moqRange.min.toLocaleString()}-${product.moqRange.max.toLocaleString()} units. Complete cost breakdown with tooling, shipping, lead times, and margin advice.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/cost-to-manufacture/${product.slug}`,
      siteName: "Bottlecap",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/cost-to-manufacture/${product.slug}`,
    },
  }
}

// ── Page component ───────────────────────────────────────────────────────

export default function ProductCostPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = PRODUCT_COSTS.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductCostTemplate product={product} />
}
