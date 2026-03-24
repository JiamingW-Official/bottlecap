import type { Metadata } from "next"
import MarginSimulatorContent from "./MarginSimulatorContent"

export const metadata: Metadata = {
  title: "Margin Simulator — Bottlecap",
  description:
    "Interactive P&L modeling for product businesses. Calculate margins, compare sourcing scenarios, and optimize your unit economics in real time.",
}

export default function MarginSimulatorPage() {
  return <MarginSimulatorContent />
}
