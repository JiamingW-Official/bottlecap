"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How long does it take to get my report?",
    answer:
      "Most reports are generated in 2-5 minutes. Our AI analyzes your product across 50+ dimensions in real-time. You'll receive an email notification when your report is ready, and you can also bookmark the report page to check back.",
  },
  {
    question: "How accurate are the cost estimates?",
    answer:
      "Our estimates are based on current market data for materials, labor, and logistics across multiple manufacturing regions. They're designed to give you a reliable ballpark for planning — typically within 15-25% of actual production quotes. For exact pricing, we recommend using your report to request formal quotes from suppliers.",
  },
  {
    question: "What kind of products can Bottlecap analyze?",
    answer:
      "Bottlecap works best for physical consumer products: electronics, home goods, kitchen items, fashion accessories, sporting goods, toys, pet products, beauty/cosmetics containers, bags, and more. We cover most product categories that are manufactured in factories across Asia, Mexico, and other hubs. Software, food products, and pharmaceuticals are outside our current scope.",
  },
  {
    question: "Is my product idea kept confidential?",
    answer:
      "Yes. Your product data is sent securely to our AI for analysis and is never shared with third parties, used for training, or visible to other users. Report pages are only accessible via their unique URL. We also strip sensitive information (email, payment details) from shared reports.",
  },
  {
    question: "What's included in the $99 report?",
    answer:
      "Your report includes: a feasibility score (0-100), HS code classification, per-unit cost breakdown, 3-country manufacturing comparison with tariff rates, materials analysis with alternatives, 10 factory-ready manufacturing specifications, optimization tips with savings estimates, a 7-step action checklist, red flag warnings, and a shareable report card you can download as an image.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Absolutely. We offer a full refund within 72 hours of purchase, no questions asked. Just email hello@bottlecap.io with your report ID and we'll process the refund immediately.",
  },
  {
    question: "What's the difference between Single Report and Monthly?",
    answer:
      "The Single Report ($99) gives you one comprehensive analysis. The Monthly plan ($199/month) gives you unlimited analyses — perfect if you're evaluating multiple product ideas, iterating on designs, or running a product development agency. Monthly subscribers also get priority support.",
  },
  {
    question: "What is the Verified Supplier List add-on?",
    answer:
      "For $199, we provide contact information for 3 manually verified factories that match your product requirements. This includes factory names, direct contact info, WhatsApp numbers, and examples of past work. Unlike Alibaba search results, these are factories we've vetted for quality, communication, and reliability.",
  },
  {
    question: "How does the HS code classification work?",
    answer:
      "HS (Harmonized System) codes are international product classification numbers used by customs worldwide. Our AI identifies the most likely HS code for your product and provides the applicable US tariff rate. This helps you estimate import duties before committing to production. We also show the confidence level of our classification.",
  },
  {
    question: "Can I share my report with my team?",
    answer:
      "Yes! Reports are shareable via their unique URL — anyone with the link can view the report. You can also share directly to Twitter or LinkedIn, copy the link, or download the report card as a PNG image. Sensitive information like your email and payment details are never shown in shared reports.",
  },
  {
    question: "What AI model powers the analysis?",
    answer:
      "Bottlecap uses Anthropic's Claude (claude-sonnet-4-6) — one of the most capable AI models available. Claude has been specifically prompted with deep manufacturing expertise covering global supply chains, tariff structures, material science, and manufacturing processes across multiple countries and product categories.",
  },
  {
    question: "Do you support products with electronics?",
    answer:
      "Yes. Our analysis covers electronic components, PCB assembly, firmware considerations, and certifications like FCC and CE. Products with Bluetooth, WiFi, sensors, displays, and battery modules are fully supported. We'll flag any special compliance requirements for your target market.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQ_DATA.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F5F5F0] transition-colors"
          >
            <span className="font-semibold text-[#1A1A1A] pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#6B6B6B] shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-[#6B6B6B] leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
