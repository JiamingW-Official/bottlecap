import type { Metadata } from "next"
import PricingContent from "./PricingContent"

export const metadata: Metadata = {
  title: "Pricing — Bottlecap",
  description:
    "One price, everything included. Get a full manufacturing feasibility report for $99 or unlimited analyses for $199/month.",
}

export default function PricingPage() {
  return <PricingContent />
}
