import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { COMPARISONS } from "@/lib/data/comparisons"
import ComparisonTemplate from "@/components/templates/ComparisonTemplate"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({
    slug: comparison.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = COMPARISONS.find((c) => c.slug === slug)

  if (!comparison) {
    return {
      title: "Comparison Not Found — Bottlecap",
    }
  }

  const description = `${comparison.itemA.name} vs ${comparison.itemB.name}: Compare pros, cons, costs, and key metrics to decide which is better for your manufacturing needs.`

  return {
    title: `${comparison.title} — Bottlecap`,
    description,
    openGraph: {
      title: `${comparison.title} — Bottlecap`,
      description,
      type: "article",
      url: `https://bottlecap.io/compare/${comparison.slug}`,
      siteName: "Bottlecap",
    },
    twitter: {
      card: "summary_large_image",
      title: `${comparison.title} — Bottlecap`,
      description,
    },
    alternates: {
      canonical: `https://bottlecap.io/compare/${comparison.slug}`,
    },
  }
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params
  const comparison = COMPARISONS.find((c) => c.slug === slug)

  if (!comparison) {
    notFound()
  }

  return (
    <ComparisonTemplate
      comparison={comparison as any}
      allComparisons={[...COMPARISONS] as any}
    />
  )
}
