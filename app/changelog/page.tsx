import type { Metadata } from "next"
import ChangelogContent from "./ChangelogContent"

export const metadata: Metadata = {
  title: "Changelog — Bottlecap",
  description: "See what's new in Bottlecap. Product updates, improvements, and new features.",
}

export default function ChangelogPage() {
  return <ChangelogContent />
}
