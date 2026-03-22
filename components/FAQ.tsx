"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, X, TrendingUp } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
  category: string
  relatedLink?: { label: string; href: string }
}

const FAQ_DATA: FAQItem[] = [
  // Product & Analysis
  {
    category: "Product",
    question: "What kind of products can Bottlecap analyze?",
    answer:
      "Bottlecap works best for physical consumer products: electronics, home goods, kitchen items, fashion accessories, sporting goods, toys, pet products, beauty/cosmetics containers, bags, packaging, and more. We cover most product categories manufactured in factories across Asia, Mexico, and Europe. Software, pure food products, and pharmaceuticals are outside our current scope.",
    relatedLink: { label: "See all 20 categories →", href: "/#categories" },
  },
  {
    category: "Product",
    question: "How accurate are the cost estimates?",
    answer:
      "Our estimates are based on current market data for materials, labor, and logistics across multiple manufacturing regions. They&apos;re designed to give you a reliable ballpark for planning — typically within 15–25% of actual production quotes. For exact pricing, use your report to request formal RFQ quotes from suppliers.",
    relatedLink: { label: "Free Cost Calculator →", href: "/tools/cost-calculator" },
  },
  {
    category: "Product",
    question: "Can Bottlecap analyze electronics with complex components?",
    answer:
      "Yes. Our analysis covers electronic components, PCB assembly, firmware considerations, and certifications like FCC and CE. Products with Bluetooth, WiFi, sensors, displays, and battery modules are fully supported. We&apos;ll flag special compliance requirements for your target market automatically.",
    relatedLink: { label: "Electronics Manufacturing Guide →", href: "/guide/electronics-manufacturing" },
  },
  {
    category: "Product",
    question: "Does it work for cosmetics and beauty products?",
    answer:
      "Yes — for the physical product (containers, packaging, applicators) and finished goods like skincare or makeup. We cover FDA cosmetic regulations, SPF drug monograph requirements, REACH compliance, and standard beauty industry certifications. We do not formulate recipes or test efficacy claims.",
    relatedLink: { label: "Cosmetics Manufacturing Guide →", href: "/guide/cosmetics-manufacturing" },
  },
  {
    category: "Product",
    question: "Do you support food-safe and FDA-regulated products?",
    answer:
      "Yes — Bottlecap covers food contact materials (FCMs) including plastic, silicone, stainless steel, and glass containers. We flag FDA food-contact requirements (21 CFR), LFGB (Germany), and EU food contact regulations (EU 10/2011) for European markets. The report will identify which certifications your product likely needs, which materials are food-safe approved, and common compliance pitfalls. We do not cover raw food products or dietary supplements — only the physical product and packaging.",
    relatedLink: { label: "See sample report →", href: "/report/demo" },
  },
  // Report
  {
    category: "Report",
    question: "How long does it take to get my report?",
    answer:
      "Most reports are generated in 2–5 minutes. Our AI analyzes your product across 50+ dimensions in real-time. You&apos;ll receive an email notification when your report is ready, and you can bookmark the report page to check back.",
  },
  {
    category: "Report",
    question: "What&apos;s included in the $99 report?",
    answer:
      "Your report includes: a feasibility score (0–100), HS code classification, per-unit cost breakdown (materials/labor/overhead/packaging/shipping), 3-country manufacturing comparison with tariff rates, materials analysis with cheaper alternatives, 10 factory-ready manufacturing specifications, optimization tips with dollar-amount savings, a 7-step action checklist, red flag warnings (compliance, IP, quality risks), and a shareable report card downloadable as PNG.",
    relatedLink: { label: "See sample report →", href: "/report/demo" },
  },
  {
    category: "Report",
    question: "Can I share my report with my team or investors?",
    answer:
      "Yes. Reports are shareable via their unique URL — anyone with the link can view the full report. You can also share directly to Twitter or LinkedIn, copy the link, or download the report card as a PNG image. Sensitive information like your email and payment details are never shown in shared reports.",
  },
  {
    category: "Report",
    question: "What does the feasibility score mean?",
    answer:
      "The feasibility score (0–100) reflects how viable your product idea is from a manufacturing standpoint. Scores above 80 indicate excellent feasibility — your product is well-defined, manufacturable at scale, and cost-effective. Scores of 50–79 suggest moderate feasibility with specific challenges (e.g., complex assembly, high tooling costs). Below 50 flags significant risks you should address before investing further.",
  },
  {
    category: "Report",
    question: "Can I request a revision or follow-up question?",
    answer:
      "You can submit a new analysis at any time with updated or more specific product details — each submission generates a fresh, comprehensive report. Monthly subscribers ($199/mo) get unlimited analyses, so iterating on your product description or testing variations costs nothing extra. You can also email hello@bottlecap.io with follow-up questions and our team will respond within 1 business day.",
    relatedLink: { label: "See pricing options →", href: "/pricing" },
  },
  {
    category: "Report",
    question: "Does the report include supplier names?",
    answer:
      "No — the standard report does not include specific factory names or contact details. Instead it gives you the manufacturing specifications, material requirements, certifications, and criteria you need to find and evaluate the right factory yourself. It also includes tips on what to look for and red flags to avoid. If you want verified factory contacts, the $199 Verified Supplier List add-on provides 3 manually vetted factories matched to your product.",
    relatedLink: { label: "Learn about the Supplier List add-on →", href: "/pricing" },
  },
  // Pricing & Refunds
  {
    category: "Pricing",
    question: "Can I get a refund if I&apos;m not satisfied?",
    answer:
      "Absolutely. We offer a full refund within 72 hours of purchase, no questions asked. Just email hello@bottlecap.io with your report ID and we&apos;ll process the refund the same business day.",
  },
  {
    category: "Pricing",
    question: "What&apos;s the difference between Single Report and Monthly?",
    answer:
      "The Single Report ($99) gives you one comprehensive analysis. The Monthly plan ($199/month) gives you unlimited analyses — ideal if you&apos;re evaluating multiple product ideas, iterating on designs, or running a product development agency. Monthly subscribers also get priority support and early access to new features.",
    relatedLink: { label: "See full pricing comparison →", href: "/pricing" },
  },
  {
    category: "Pricing",
    question: "What is the Verified Supplier List add-on?",
    answer:
      "For $199, we provide contact information for 3 manually verified factories that match your product requirements. This includes factory names, direct contact info, WhatsApp numbers, and examples of past work. Unlike Alibaba search results, these are factories we&apos;ve vetted for quality, communication, and reliability.",
  },
  {
    category: "Pricing",
    question: "Is there a free trial or demo?",
    answer:
      "Yes — you can view a free demo report at /report/demo with no signup required, so you can see exactly what a full analysis looks like before purchasing. We also offer 9 free tools (HS Code Lookup, Cost Calculator, Tariff Calculator, and more) that you can use without an account. Monthly subscribers can cancel anytime — there are no long-term contracts.",
    relatedLink: { label: "View free demo report →", href: "/report/demo" },
  },
  // Technical
  {
    category: "Technical",
    question: "What AI model powers the analysis?",
    answer:
      "Bottlecap uses Anthropic&apos;s Claude (claude-sonnet-4-6) — one of the most capable AI models available. Claude has been specifically prompted with deep manufacturing expertise covering global supply chains, tariff structures, material science, and manufacturing processes across multiple countries and product categories.",
  },
  {
    category: "Technical",
    question: "How does the HS code classification work?",
    answer:
      "HS (Harmonized System) codes are international product classification numbers used by customs worldwide. Our AI identifies the most likely HS code for your product and provides the applicable US tariff rate. We also show confidence level for the classification. For final customs filings, always verify with a licensed customs broker.",
    relatedLink: { label: "Free HS Code Lookup Tool →", href: "/tools/hs-lookup" },
  },
  {
    category: "Technical",
    question: "Is my product idea kept confidential?",
    answer:
      "Yes. Your product data is sent securely to our AI for analysis and is never shared with third parties, used for model training, or visible to other users. Report pages are only accessible via their unique URL — not indexed or searchable. We also strip sensitive information from shared reports.",
  },
  {
    category: "Technical",
    question: "What&apos;s the difference between MFN and Section 301 tariffs?",
    answer:
      "MFN (Most Favored Nation) is the standard US import tariff rate that applies to goods from most countries — typically 0–15% depending on the product category. Section 301 tariffs are additional duties imposed on Chinese goods during the US-China trade war, currently ranging from 7.5% to 25% on top of the MFN rate. This means a product that costs 5% to import from Vietnam might cost 30% or more to import from China. Bottlecap automatically factors both rates into your country comparison so you can see the true landed cost difference. For China-sourced products, this tariff gap is often the single biggest cost driver.",
    relatedLink: { label: "Free Tariff Calculator →", href: "/tools/tariff-calculator" },
  },
  // Getting Started
  {
    category: "Getting Started",
    question: "How do I write a good product description?",
    answer:
      "The more specific, the better. Include: materials (e.g., &apos;stainless steel body, BPA-free plastic lid&apos;), key dimensions, main features, target price, and your primary concern (cost vs. quality vs. speed). A 50–200 word description typically produces the most accurate results. You can also upload reference images or sketches.",
    relatedLink: { label: "See examples in demo →", href: "/report/demo" },
  },
  {
    category: "Getting Started",
    question: "I have no manufacturing experience. Is this right for me?",
    answer:
      "Absolutely — this is exactly who Bottlecap is designed for. The report translates manufacturing complexity into plain English. It tells you what you need to know, what questions to ask factories, and what to watch out for — without requiring any prior experience. We also have free guides covering Manufacturing 101, supplier sourcing, materials, and more.",
    relatedLink: { label: "Start with Manufacturing 101 →", href: "/guide/manufacturing-101" },
  },
  {
    category: "Getting Started",
    question: "What free tools do you offer before I commit to a paid report?",
    answer:
      "We offer 9 free tools — no signup required: HS Code Lookup, Cost Calculator, Tariff Calculator, MOQ Planner, Margin Calculator, ROI Calculator, Country Compare, Supplier Finder, and a Manufacturing Quiz. These give you quick estimates to validate your direction before investing in a full analysis.",
    relatedLink: { label: "Explore free tools →", href: "/tools" },
  },
  {
    category: "Getting Started",
    question: "Can I analyze multiple product variations?",
    answer:
      "Yes — you can run separate analyses for different variations (e.g., different materials, sizes, or feature sets) and compare results. Monthly subscribers can do this without limit. Single report buyers can purchase additional reports at $99 each, or upgrade to Monthly for unlimited analyses.",
  },
  {
    category: "Getting Started",
    question: "What&apos;s the best way to compare two product ideas?",
    answer:
      "Run two separate analyses — one for each product idea — and compare the results side by side. Focus on the feasibility score (higher is easier to manufacture), the per-unit cost breakdown, and the country recommendation (some products manufacture better in Vietnam vs. China vs. Mexico). The optimization tips section will also surface specific tradeoffs unique to each product. Monthly subscribers can do this unlimited times at no extra cost, making it ideal for product discovery and validation.",
    relatedLink: { label: "See full pricing →", href: "/pricing" },
  },
]

// The "most asked" featured question — always shown, pinned above the list
const FEATURED_QUESTION: FAQItem = {
  category: "Report",
  question: "What&apos;s included in the $99 report?",
  answer:
    "Your report includes: a feasibility score (0–100), HS code classification, per-unit cost breakdown (materials/labor/overhead/packaging/shipping), 3-country manufacturing comparison with tariff rates, materials analysis with cheaper alternatives, 10 factory-ready manufacturing specifications, optimization tips with dollar-amount savings, a 7-step action checklist, red flag warnings (compliance, IP, quality risks), and a shareable report card downloadable as PNG.",
  relatedLink: { label: "See sample report →", href: "/report/demo" },
}

const CATEGORIES = ["All", "Getting Started", "Product", "Report", "Pricing", "Technical"]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [featuredOpen, setFeaturedOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set())

  const filtered = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory
      const matchQ =
        !query.trim() ||
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQ
    })
  }, [activeCategory, query])

  function handleOpen(globalIndex: number) {
    const next = openIndex === globalIndex ? null : globalIndex
    setOpenIndex(next)
    if (next !== null) {
      setOpenedSet((prev) => {
        const s = new Set(prev)
        s.add(globalIndex)
        return s
      })
    }
  }

  const totalQuestions = FAQ_DATA.length
  // +1 for the featured card (index = -1)
  const exploredCount = openedSet.size + (featuredOpen ? 1 : 0)
  const totalWithFeatured = totalQuestions + 1
  const progressPct = Math.min(100, Math.round((exploredCount / totalWithFeatured) * 100))

  return (
    <div>
      {/* Most Asked Featured Card */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
        <button
          onClick={() => setFeaturedOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-100/60 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 pr-4">
            <div className="flex items-center gap-1.5 shrink-0">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Most asked</span>
            </div>
            <span className="font-semibold text-[#1A1A1A]">{FEATURED_QUESTION.question}</span>
          </div>
          <motion.div animate={{ rotate: featuredOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-amber-500 shrink-0" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {featuredOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-amber-200 pt-4">
                <p className="text-[#6B6B6B] leading-relaxed text-sm">{FEATURED_QUESTION.answer}</p>
                {FEATURED_QUESTION.relatedLink && (
                  <Link
                    href={FEATURED_QUESTION.relatedLink.href}
                    className="inline-flex items-center gap-1 mt-3 text-xs text-[#FF6B35] font-semibold hover:underline"
                  >
                    {FEATURED_QUESTION.relatedLink.label}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9B9B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpenIndex(null) }}
            placeholder="Search questions..."
            className="w-full bg-white border border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-9 pr-9 py-2 text-sm outline-none transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9B9B] hover:text-[#6B6B6B]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${
                activeCategory === cat
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "bg-white border border-[#E8E8E4] text-[#6B6B6B] hover:border-[#FF6B35]/40"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1 opacity-60">({FAQ_DATA.filter((f) => f.category === cat).length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#9B9B9B] mb-4">
        {filtered.length} question{filtered.length !== 1 ? "s" : ""}
        {query || activeCategory !== "All" ? " found" : ""}
      </p>

      {/* FAQ items */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {filtered.map((item, i) => {
            const globalIndex = FAQ_DATA.indexOf(item)
            return (
              <motion.div
                key={globalIndex}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden"
              >
                <button
                  onClick={() => handleOpen(globalIndex)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F5F5F0] transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6B35]/70 block mb-1">
                      {item.category}
                    </span>
                    <span className="font-semibold text-[#1A1A1A]">{item.question}</span>
                  </div>
                  <motion.div animate={{ rotate: openIndex === globalIndex ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-[#6B6B6B] shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === globalIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[#F0F0EC] pt-4">
                        <p className="text-[#6B6B6B] leading-relaxed text-sm">{item.answer}</p>
                        {item.relatedLink && (
                          <Link
                            href={item.relatedLink.href}
                            className="inline-flex items-center gap-1 mt-3 text-xs text-[#FF6B35] font-semibold hover:underline"
                          >
                            {item.relatedLink.label}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#9B9B9B]">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No questions match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("All") }}
            className="mt-2 text-xs text-[#FF6B35] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="mt-8 mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-[#9B9B9B]">
            You&apos;ve explored{" "}
            <span className="font-semibold text-[#6B6B6B]">{exploredCount}/{totalWithFeatured}</span>{" "}
            questions
          </p>
          <span className="text-xs text-[#9B9B9B]">{progressPct}%</span>
        </div>
        <div className="h-1.5 bg-[#E8E8E4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FF6B35] rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />
        </div>
      </div>

      {/* CTA */}
      <p className="text-sm text-center text-[#9B9B9B] mt-6">
        Still have questions?{" "}
        <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] hover:underline font-medium">
          Email hello@bottlecap.io
        </a>
        {" "}— we reply within 1 business day.
      </p>
    </div>
  )
}
