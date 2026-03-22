import type { Metadata } from "next"
import SuppliersContent from "./SuppliersContent"

export const metadata: Metadata = {
  title: "Verified Supplier Network — Bottlecap",
  description:
    "Get direct contact info for 3 manually verified factories matched to your product. WhatsApp, email, and past-work samples included. Skip 200 Alibaba messages.",
}

export default function SuppliersPage() {
  return <SuppliersContent />
}
