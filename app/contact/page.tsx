import type { Metadata } from "next"
import ContactContent from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact — Bottlecap",
  description: "Get in touch with the Bottlecap team. We typically respond within 24 hours.",
}

export default function ContactPage() {
  return <ContactContent />
}
