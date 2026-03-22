import type { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About Bottlecap — Built for Founders Who Build",
  description: "Bottlecap gives product founders the same manufacturing intelligence that sourcing agents charge $5K for — delivered in 5 minutes for $99.",
}

export default function AboutPage() {
  return <AboutContent />
}
