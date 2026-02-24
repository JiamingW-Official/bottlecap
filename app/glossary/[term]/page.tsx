import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GLOSSARY_TERMS, getTermBySlug } from "@/lib/data/glossary"
import GlossaryTermTemplate from "@/components/templates/GlossaryTermTemplate"

interface PageProps {
  params: Promise<{ term: string }>
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({
    term: term.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term: slug } = await params
  const term = getTermBySlug(slug)

  if (!term) {
    return {
      title: "Term Not Found — Bottlecap",
    }
  }

  const title = term.acronym
    ? `${term.term} (${term.acronym}) — Manufacturing Glossary — Bottlecap`
    : `${term.term} — Manufacturing Glossary — Bottlecap`

  return {
    title,
    description: term.definition,
  }
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term: slug } = await params
  const term = getTermBySlug(slug)

  if (!term) {
    notFound()
  }

  return <GlossaryTermTemplate term={term} />
}
