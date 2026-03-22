import type { Metadata } from "next"
import DemoContent from "./DemoContent"

export const metadata: Metadata = {
  title: "Demo Report — Bottlecap",
  description:
    "See what a Bottlecap manufacturing analysis report looks like with this full sample report for an insulated stainless steel water bottle.",
}

export default function DemoReportPage() {
  return <DemoContent />
}
