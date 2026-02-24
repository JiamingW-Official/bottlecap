import type { Metadata } from "next"
import { getReport } from "@/lib/supabase"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  // Skip metadata generation for demo page
  if (id === "demo") {
    return {
      title: "Demo Report — Bottlecap",
      description:
        "See a sample Bottlecap manufacturing analysis report.",
    }
  }

  try {
    const report = await getReport(id)

    if (!report || !report.analysisResult) {
      return {
        title: "Report — Bottlecap",
        description: "Your manufacturing feasibility analysis report.",
      }
    }

    const analysis = report.analysisResult
    const title = `${report.productName || "Product"} — Bottlecap Report`
    const description = `Feasibility: ${analysis.feasibilityScore}/100. ${analysis.oneLinerSummary}. Cost: $${analysis.costEstimate.min}-$${analysis.costEstimate.max}/unit.`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        siteName: "Bottlecap",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    }
  } catch {
    return {
      title: "Report — Bottlecap",
      description: "Your manufacturing feasibility analysis report.",
    }
  }
}

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
