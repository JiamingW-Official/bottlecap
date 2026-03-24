import type { Metadata } from "next"
import RiskMonitorContent from "./RiskMonitorContent"

export const metadata: Metadata = {
  title: "Supply Chain Risk Monitor — Bottlecap",
  description:
    "Real-time tariff and trade risk monitoring for product sourcing. Track tariff volatility, shipping disruptions, currency fluctuations, and geopolitical events affecting your supply chain.",
}

export default function RiskMonitorPage() {
  return <RiskMonitorContent />
}
