import type { Metadata } from "next"

export function generateStaticParams() {
  return [{ id: "demo" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  if (id === "demo") {
    return {
      title: "Demo Report — Bottlecap",
      description:
        "See a sample Bottlecap manufacturing analysis report.",
    }
  }

  // For non-demo reports, return generic metadata
  // (Supabase may not be available in static builds)
  try {
    const { getReport } = await import("@/lib/supabase")
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
