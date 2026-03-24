import type { Metadata } from "next"
import BlogContent from "./BlogContent"

export const metadata: Metadata = {
  title: "Blog — Bottlecap",
  description: "Insights on manufacturing, sourcing, and product development from the Bottlecap team.",
}

export default function BlogPage() {
  return <BlogContent />
}
