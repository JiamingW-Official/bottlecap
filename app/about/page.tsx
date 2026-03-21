import type { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About — Bottlecap",
  description:
    "Bottlecap helps founders turn product ideas into real products with AI-powered manufacturing feasibility analysis.",
}

export default function AboutPage() {
  return <AboutContent />
}
