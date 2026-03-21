import { GLOSSARY_TERMS, type GlossaryTerm } from "@/lib/data/glossary"

export function useGlossaryTerm(
  slugOrAcronym: string
): GlossaryTerm | undefined {
  const q = slugOrAcronym.toLowerCase()
  return (GLOSSARY_TERMS as readonly GlossaryTerm[]).find(
    (t) => t.slug === q || t.acronym?.toLowerCase() === q
  )
}
