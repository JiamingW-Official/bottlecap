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
      "Any physical product that can be manufactured in a factory. We cover 23 categories: electronics, home goods, kitchen, apparel, sporting goods, toys, pet products, beauty/cosmetics, bags, packaging, furniture, medical devices, automotive accessories, outdoor gear, and more. Our database spans 12 manufacturing countries and 50+ material types. The only products outside our scope are software, raw food commodities, and controlled pharmaceuticals.",
    relatedLink: { label: "See all 23 categories →", href: "/#categories" },
  },
  {
    category: "Product",
    question: "How accurate are the cost estimates?",
    answer:
      "Our per-unit cost estimates land within 10–20% of actual production quotes based on Q1 2026 benchmarks across China, Vietnam, India, and Mexico. We pull from real material commodity pricing (updated quarterly), regional labor rate indices, and current freight rates. For a 500-unit MOQ order, that means our estimate is typically within $0.50–$2.00/unit of what a factory will quote. For final pricing, use the factory-ready spec sheet in your report to request formal RFQs.",
    relatedLink: { label: "Free Cost Calculator →", href: "/tools/cost-calculator" },
  },
  {
    category: "Product",
    question: "Can Bottlecap analyze electronics with complex components?",
    answer:
      "Yes — and we go deep. Our analysis covers PCB assembly (single-layer through 6-layer boards), BOM cost breakdowns for components like MCUs, sensors, and displays, firmware considerations, and required certifications (FCC Part 15, CE/RED, UL, RoHS, WEEE). Products with Bluetooth 5.x, WiFi 6, LiPo/Li-ion batteries, and OLED displays are fully supported. We also flag Section 301 tariff exposure for China-sourced electronics, which currently adds 25% to landed cost.",
    relatedLink: { label: "Electronics Manufacturing Guide →", href: "/guide/electronics-manufacturing" },
  },
  {
    category: "Product",
    question: "Does it work for cosmetics and beauty products?",
    answer:
      "Yes — both the physical product (jars, tubes, pumps, compacts, applicators) and finished goods like serums, creams, and color cosmetics. We cover FDA cosmetic registration (MoCRA 2023 requirements, now enforced), EU Cosmetics Regulation (EC 1223/2009), REACH compliance, SPF drug monograph rules, and stability testing requirements. We identify which contract manufacturers specialize in your formulation type and flag common compliance gaps that delay launch by 2–4 months.",
    relatedLink: { label: "Cosmetics Manufacturing Guide →", href: "/guide/cosmetics-manufacturing" },
  },
  {
    category: "Product",
    question: "Do you support food-safe and FDA-regulated products?",
    answer:
      "Yes. Bottlecap covers all food contact materials (FCMs): plastic (PP, PE, Tritan), silicone, stainless steel (18/8 and 18/10), borosilicate glass, and bamboo fiber composites. We flag FDA food-contact requirements (21 CFR 170–199), LFGB certification for German/EU markets, EU food contact regulation (EU 10/2011), and California Prop 65 testing. The report identifies exactly which certifications your product needs, estimated testing costs ($500–$3,000 depending on material), and which labs perform the testing.",
    relatedLink: { label: "See sample report →", href: "/report/demo" },
  },
  // Report
  {
    category: "Report",
    question: "How long does it take to get my report?",
    answer:
      "2–5 minutes from payment to full report. Our AI (Claude claude-sonnet-4-6) analyzes your product across 50+ dimensions in real-time — no human bottleneck, no queue. You'll get an email the moment your report is ready, and the report page is bookmarkable. Compare that to 2–4 weeks waiting for a sourcing agent or consultant to deliver similar intelligence.",
  },
  {
    category: "Report",
    question: "What's included in the $99 report?",
    answer:
      "12 sections: feasibility score (0–100 with component breakdown), HS code classification with confidence level, per-unit cost breakdown across 5 categories (materials/labor/overhead/packaging/shipping), 3-country manufacturing comparison with MFN and Section 301 tariff rates, materials analysis with cost-saving alternatives, 10 factory-ready manufacturing specifications, optimization tips with dollar-amount savings (avg. $1.20–$3.50/unit), a 7-step action checklist, red flag warnings (compliance gaps, IP risks, quality pitfalls), and a shareable report card downloadable as PNG. Everything a trade consultant would charge $2K–$8K to research.",
    relatedLink: { label: "See sample report →", href: "/report/demo" },
  },
  {
    category: "Report",
    question: "Can I share my report with my team or investors?",
    answer:
      "Yes. Every report has a permanent, shareable URL — no login required to view. You can share directly to Twitter/X or LinkedIn, copy the link, or download the report card as a PNG for pitch decks. Sensitive information (email, payment details) is never exposed in shared reports. Reports are not indexed by search engines — only people with the direct link can access them.",
  },
  {
    category: "Report",
    question: "What does the feasibility score mean?",
    answer:
      "The feasibility score (0–100) is a weighted composite of 8 manufacturing factors: material availability, tooling complexity, MOQ accessibility, regulatory burden, supply chain maturity, labor skill requirements, quality control difficulty, and IP protectability. Scores above 80 mean your product is straightforward to manufacture at scale — think injection-molded consumer goods. Scores of 50–79 flag specific challenges like custom tooling ($5K–$30K) or complex assembly. Below 50 means significant redesign or material changes are needed before committing capital.",
  },
  {
    category: "Report",
    question: "Can I request a revision or follow-up question?",
    answer:
      "Yes — submit a new analysis with updated details anytime. Each submission generates a fresh, complete report. Monthly subscribers ($199/mo) get unlimited analyses, making it free to iterate: test different materials, adjust dimensions, or compare product variations. Single report buyers can purchase additional reports at $99 each. For specific follow-up questions, email hello@bottlecap.io and our team responds within 1 business day.",
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
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Absolutely. We offer a full refund within 72 hours of purchase, no questions asked. Just email hello@bottlecap.io with your report ID and we'll process the refund the same business day.",
  },
  {
    category: "Pricing",
    question: "What's the difference between Single Report and Monthly?",
    answer:
      "The Single Report ($99) gives you one comprehensive analysis. The Monthly plan ($199/month) gives you unlimited analyses — ideal if you're evaluating multiple product ideas, iterating on designs, or running a product development agency. Monthly subscribers also get priority support and early access to new features.",
    relatedLink: { label: "See full pricing comparison →", href: "/pricing" },
  },
  {
    category: "Pricing",
    question: "What is the Verified Supplier List add-on?",
    answer:
      "For $199, we provide contact information for 3 manually verified factories that match your product requirements. This includes factory names, direct contact info, WhatsApp numbers, and examples of past work. Unlike Alibaba search results, these are factories we've vetted for quality, communication, and reliability.",
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
      "Bottlecap uses Anthropic's Claude (claude-sonnet-4-6) — one of the most capable AI models available. Claude has been specifically prompted with deep manufacturing expertise covering global supply chains, tariff structures, material science, and manufacturing processes across multiple countries and product categories.",
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
    question: "What's the difference between MFN and Section 301 tariffs?",
    answer:
      "MFN (Most Favored Nation) is the standard US import tariff rate that applies to goods from most countries — typically 0–15% depending on the product category. Section 301 tariffs are additional duties imposed on Chinese goods during the US-China trade war, currently ranging from 7.5% to 25% on top of the MFN rate. This means a product that costs 5% to import from Vietnam might cost 30% or more to import from China. Bottlecap automatically factors both rates into your country comparison so you can see the true landed cost difference. For China-sourced products, this tariff gap is often the single biggest cost driver.",
    relatedLink: { label: "Free Tariff Calculator →", href: "/tools/tariff-calculator" },
  },
  // Getting Started
  {
    category: "Getting Started",
    question: "How do I write a good product description?",
    answer:
      "The more specific, the better. Include: materials (e.g., 'stainless steel body, BPA-free plastic lid'), key dimensions, main features, target price, and your primary concern (cost vs. quality vs. speed). A 50–200 word description typically produces the most accurate results. You can also upload reference images or sketches.",
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
    question: "What's the best way to compare two product ideas?",
    answer:
      "Run two separate analyses — one for each product idea — and compare the results side by side. Focus on the feasibility score (higher is easier to manufacture), the per-unit cost breakdown, and the country recommendation (some products manufacture better in Vietnam vs. China vs. Mexico). The optimization tips section will also surface specific tradeoffs unique to each product. Monthly subscribers can do this unlimited times at no extra cost, making it ideal for product discovery and validation.",
    relatedLink: { label: "See full pricing →", href: "/pricing" },
  },
  // Product & Sourcing
  {
    category: "Product & Sourcing",
    question: "What kinds of products can Bottlecap analyze?",
    answer:
      "We handle 23+ industries: electronics, apparel, home goods, beauty, outdoor gear, pet products, food supplements, furniture, medical devices, packaging, toys, and more. If it can be manufactured, we can analyze it. The only products we skip are those requiring export licenses or controlled-substance manufacturing.",
  },
  {
    category: "Product & Sourcing",
    question: "What if my product is still in the idea stage?",
    answer:
      "Perfect. Bottlecap is designed for early validation. You don't need a finished spec — just describe what you want to make. The report will help you understand whether it's feasible and what it would cost to produce.",
  },
  {
    category: "Product & Sourcing",
    question: "Can Bottlecap help me find manufacturers directly?",
    answer:
      "Yes, via our Supplier Add-on ($199). After your report, you can request a curated list of 3 manually verified factories with WhatsApp contacts, email, and past-work samples. See /suppliers for details.",
    relatedLink: { label: "Supplier Add-on →", href: "/tools/supplier-finder" },
  },
  {
    category: "Product & Sourcing",
    question: "How accurate are the cost estimates?",
    answer:
      "Our cost benchmarks are built from real manufacturing data and updated quarterly. We target ±15–20% accuracy for materials and labor. For precise quotes, use the report's factory spec sheet to get RFQs from 3 suppliers.",
    relatedLink: { label: "Free Cost Calculator →", href: "/tools/cost-calculator" },
  },
  // Technical & Data
  {
    category: "Technical & Data",
    question: "What data sources does Bottlecap use?",
    answer:
      "Five live sources: US CBP HTS tariff schedules, WCO harmonized system codes, manufacturing benchmark databases, freight rate indices, and material commodity pricing. Claude AI synthesizes these with general manufacturing knowledge.",
  },
  {
    category: "Technical & Data",
    question: "Does Bottlecap use my data to train AI models?",
    answer:
      "No. Your product descriptions and reports are not used for training. Reports are stored privately and only accessible via your unique link. See our Privacy Policy for details.",
  },
  {
    category: "Technical & Data",
    question: "How does the HS code classification work?",
    answer:
      "Claude AI classifies your product based on its materials, function, and manufacturing process, then cross-references with the 5,000+ entry HTS schedule. The report includes a confidence score and the specific chapter/heading rationale.",
    relatedLink: { label: "Free HS Code Lookup →", href: "/tools/hs-lookup" },
  },
  // Process
  {
    category: "Process",
    question: "What happens after I submit payment?",
    answer:
      "You're redirected to a processing page while Claude generates your report (2–5 minutes). You'll receive an email with your report link when it's ready. Reports don't expire.",
  },
  {
    category: "Process",
    question: "Can I share my report?",
    answer:
      "Yes — every report has a permanent, shareable URL. No login required to view. Pro subscribers also get PDF export.",
  },
  {
    category: "Process",
    question: "What if I need a report in a language other than English?",
    answer:
      "Reports are currently English-only. If you describe your product in another language, we'll do our best — but accuracy is highest in English.",
  },
]

// The "most asked" featured question — always shown, pinned above the list
const FEATURED_QUESTION: FAQItem = {
  category: "Report",
  question: "What's included in the $99 report?",
  answer:
    "12 sections: feasibility score (0–100 with component breakdown), HS code classification with confidence level, per-unit cost breakdown across 5 categories (materials/labor/overhead/packaging/shipping), 3-country manufacturing comparison with MFN and Section 301 tariff rates, materials analysis with cost-saving alternatives, 10 factory-ready manufacturing specifications, optimization tips with dollar-amount savings (avg. $1.20–$3.50/unit), a 7-step action checklist, red flag warnings (compliance gaps, IP risks, quality pitfalls), and a shareable report card downloadable as PNG. Everything a trade consultant would charge $2K–$8K to research.",
  relatedLink: { label: "See sample report →", href: "/report/demo" },
}

const CATEGORIES = ["All", "Getting Started", "Product", "Product & Sourcing", "Report", "Pricing", "Technical", "Technical & Data", "Process"]

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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpenIndex(null) }}
            placeholder="Search questions..."
            className="w-full bg-white border border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-9 pr-9 py-2 text-sm outline-none transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] hover:text-[#6B6B6B]">
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
              className={`text-xs px-4 py-2.5 rounded-full transition-colors font-medium ${
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
      <p className="text-xs text-[#767676] mb-4">
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
        <div className="text-center py-12 text-[#767676]">
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
          <p className="text-xs text-[#767676]">
            You&apos;ve explored{" "}
            <span className="font-semibold text-[#6B6B6B]">{exploredCount}/{totalWithFeatured}</span>{" "}
            questions
          </p>
          <span className="text-xs text-[#767676]">{progressPct}%</span>
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
      <p className="text-sm text-center text-[#767676] mt-6">
        Still have questions?{" "}
        <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] hover:underline font-medium">
          Email hello@bottlecap.io
        </a>
        {" "}— we reply within 1 business day.
      </p>
    </div>
  )
}
