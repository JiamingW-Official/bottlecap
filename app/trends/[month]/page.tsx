import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TREND_REPORTS, getTrendReportBySlug } from "@/lib/data/trending-products"
import TrendReportTemplate from "@/components/templates/TrendReportTemplate"

interface TrendMonthPageProps {
  params: { month: string }
}

export function generateStaticParams() {
  return TREND_REPORTS.map((report) => ({
    month: report.slug,
  }))
}

export function generateMetadata({ params }: TrendMonthPageProps): Metadata {
  const report = getTrendReportBySlug(params.month)

  if (!report) {
    return {
      title: "Report Not Found — Bottlecap",
    }
  }

  return {
    title: `${report.title} — Bottlecap`,
    description: report.summary,
    openGraph: {
      title: `${report.title} — Bottlecap`,
      description: report.summary,
      type: "article",
    },
  }
}

export default function TrendMonthPage({ params }: TrendMonthPageProps) {
  const report = getTrendReportBySlug(params.month)

  if (!report) {
    notFound()
  }

  return <TrendReportTemplate report={report} />
}
