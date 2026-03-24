import type { Metadata } from "next"
import PlaybookContent from "./PlaybookContent"

export const metadata: Metadata = {
  title: "Factory Negotiation Playbook — Bottlecap",
  description:
    "AI-generated negotiation scripts, communication templates, and tactical playbooks for manufacturing sourcing. Master every phase from initial outreach to quality assurance.",
}

export default function NegotiationPlaybookPage() {
  return <PlaybookContent />
}
