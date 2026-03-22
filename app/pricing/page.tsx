import type { Metadata } from "next"
import PricingContent from "./PricingContent"

export const metadata: Metadata = {
  title: "Pricing — Bottlecap",
  description:
    "Get a complete manufacturing feasibility report for $99. HS codes, cost breakdown, country comparison, and supplier specs. 72-hour money-back guarantee.",
}

export default function PricingPage() {
  return <PricingContent />
}
