import type { Metadata } from "next"
import DemoReportClient from "./client"

export const metadata: Metadata = {
  title: "Demo Report — Bottlecap",
  description:
    "See what a Bottlecap manufacturing analysis report looks like with this demo Smart Thermos report.",
}

export default function DemoReportPage() {
  return <DemoReportClient />
}
