import { GLOSSARY_TERMS, type GlossaryTerm } from "@/lib/data/glossary"

export function useGlossaryTerm(
  slugOrAcronym: string
): GlossaryTerm | undefined {
  const q = slugOrAcronym.toLowerCase()
  return (GLOSSARY_TERMS as readonly GlossaryTerm[]).find(
    (t) => t.slug === q || t.acronym?.toLowerCase() === q
  )
}

export function useGlossary() {
  const findTerm = (termText: string): GlossaryTerm | null => {
    const lower = termText.toLowerCase()
    return (
      (GLOSSARY_TERMS as readonly GlossaryTerm[]).find(
        (t) =>
          t.term.toLowerCase() === lower ||
          t.slug === lower ||
          t.acronym?.toLowerCase() === lower
      ) ?? null
    )
  }
  return { findTerm }
}
