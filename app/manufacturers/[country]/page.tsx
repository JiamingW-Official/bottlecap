import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MANUFACTURING_COUNTRIES } from "@/lib/data/countries"
import CountryGuideTemplate from "@/components/templates/CountryGuideTemplate"

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export function generateStaticParams() {
  return MANUFACTURING_COUNTRIES.map((country) => ({
    country: toSlug(country.name),
  }))
}

export function generateMetadata({
  params,
}: {
  params: { country: string }
}): Metadata {
  const country = MANUFACTURING_COUNTRIES.find(
    (c) => toSlug(c.name) === params.country
  )

  if (!country) {
    return {
      title: "Country Not Found — Bottlecap",
    }
  }

  const title = `Manufacturing in ${country.name}: Costs, Quality & Lead Times — Bottlecap`
  const description = `Complete guide to manufacturing in ${country.name}. Labor cost $${country.laborCostPerHour}/hr, quality ${country.qualityRating}/10, avg lead time ${country.avgLeadTimeDays} days. Compare strengths, weaknesses, ports, and specializations.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://bottlecap.com/manufacturers/${toSlug(country.name)}`,
      siteName: "Bottlecap",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://bottlecap.com/manufacturers/${toSlug(country.name)}`,
    },
  }
}

export default function CountryPage({
  params,
}: {
  params: { country: string }
}) {
  const country = MANUFACTURING_COUNTRIES.find(
    (c) => toSlug(c.name) === params.country
  )

  if (!country) {
    notFound()
  }

  return <CountryGuideTemplate country={country} />
}
