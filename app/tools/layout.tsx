import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Manufacturing Tools — Bottlecap",
  description:
    "Free tools for product makers: HS Code Lookup, Manufacturing Cost Calculator, Tariff Calculator, and MOQ Planner.",
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
