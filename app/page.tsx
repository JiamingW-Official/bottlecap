"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const sectionAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "DTC Founder",
    quote:
      "Found my manufacturer in Vietnam and saved $38,000 on my first production run.",
    stat: "$38K saved",
    gradient: "from-[#FF6B35] to-[#FF9F1C]",
  },
  {
    name: "Marcus Rivera",
    role: "Industrial Designer",
    quote:
      "The report was more detailed than what my sourcing agent gave me for $5,000.",
    stat: "10x more detail",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    name: "Priya Patel",
    role: "Kickstarter Creator",
    quote:
      "Went from idea to factory sample in 6 weeks instead of 6 months.",
    stat: "6 weeks",
    gradient: "from-[#22C55E] to-[#10B981]",
  },
]

const singleFeatures = [
  "Full feasibility analysis",
  "Cost breakdown",
  "3-country comparison",
  "Optimization tips",
  "Shareable report card",
]

const monthlyFeatures = [
  "Full feasibility analysis",
  "Cost breakdown",
  "3-country comparison",
  "Optimization tips",
  "Shareable report card",
  "Unlimited analyses",
  "Priority support",
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur z-50 border-b border-[#E8E8E4]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-[#1A1A1A]">
            Bottlecap
          </Link>
          <Link
            href="/analyze"
            className="bg-[#FF6B35] text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Start Analysis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.div
        {...sectionAnimation}
        className="min-h-screen flex items-center pt-20"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
            Your product idea
            <br />
            <span className="border-b-4 border-[#FF6B35]">
              deserves to be made
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mt-6">
            Tell me what you want to make. I&apos;ll tell you if it&apos;s
            feasible, how much it costs, and where to manufacture it.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="bg-white border-2 border-[#E8E8E4] focus-within:border-[#FF6B35] rounded-2xl p-2 flex items-end transition-colors">
              <textarea
                className="border-none flex-1 resize-none outline-none p-3 text-[#1A1A1A] placeholder:text-[#9B9B9B] bg-transparent min-h-[60px]"
                placeholder="Try: A smart water bottle that reminds me to stay hydrated..."
                rows={2}
              />
              <Link
                href="/analyze"
                className="bg-[#FF6B35] text-white rounded-xl px-6 py-3 font-semibold whitespace-nowrap hover:bg-[#E85A25] transition-colors shrink-0"
              >
                Analyze this idea &rarr;
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            <span className="text-sm text-[#6B6B6B]">Powered by AI</span>
            <span className="text-sm text-[#6B6B6B]">Results in minutes</span>
            <span className="text-sm text-[#6B6B6B]">
              Money-back guarantee
            </span>
          </div>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div {...sectionAnimation} className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
            What our users say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-[#E8E8E4] shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient}`}
                  />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-sm text-[#6B6B6B]">{t.role}</p>
                  </div>
                </div>
                <p className="italic text-[#6B6B6B] mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[#FF6B35] font-bold text-lg">{t.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Report Preview */}
      <motion.div {...sectionAnimation} className="py-20 bg-[#F5F5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
            This is what your report looks like
          </h2>
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-[#E8E8E4] transform rotate-1 hover:rotate-0 transition-transform">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-[#9B9B9B]">Bottlecap</span>
              <span className="text-sm text-[#9B9B9B]">Jan 15, 2025</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
              Smart Thermos
            </h3>
            <div className="mb-4">
              <span className="text-6xl font-black text-[#22C55E]">87</span>
              <span className="text-2xl text-[#9B9B9B] ml-1">/100</span>
            </div>
            <p className="text-sm text-[#FF6B35] font-medium mb-6">
              Highly feasible &mdash; Vietnam is your best bet
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                  Cost/unit
                </p>
                <p className="font-semibold text-[#1A1A1A]">$6.2 - $8.4</p>
              </div>
              <div>
                <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                  Sourcing
                </p>
                <p className="font-semibold text-[#1A1A1A]">Vietnam</p>
              </div>
              <div>
                <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                  Min. Order
                </p>
                <p className="font-semibold text-[#1A1A1A]">500 units</p>
              </div>
              <div>
                <p className="text-xs text-[#9B9B9B] uppercase tracking-wide">
                  Lead Time
                </p>
                <p className="font-semibold text-[#1A1A1A]">32 days</p>
              </div>
            </div>
            <p className="italic text-sm text-[#9B9B9B] border-t border-[#E8E8E4] pt-4">
              &ldquo;The hardest part is the first step &mdash; and you just
              took it.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div {...sectionAnimation} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
            Simple, transparent pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Report */}
            <div className="relative bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm">
              <span className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full">
                Most popular
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Single Report
              </h3>
              <div className="mb-1">
                <span className="text-5xl font-black text-[#1A1A1A]">$99</span>
              </div>
              <p className="text-[#6B6B6B] mb-6">one-time</p>
              <ul className="space-y-3 mb-8">
                {singleFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[#1A1A1A]"
                  >
                    <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/analyze"
                className="block text-center bg-[#FF6B35] text-white w-full rounded-full py-3 font-semibold hover:bg-[#E85A25] transition-colors"
              >
                Get your report
              </Link>
            </div>

            {/* Monthly */}
            <div className="relative bg-white rounded-2xl p-8 border border-[#E8E8E4] shadow-sm">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                Monthly
              </h3>
              <div className="mb-1">
                <span className="text-5xl font-black text-[#1A1A1A]">
                  $199
                </span>
              </div>
              <p className="text-[#6B6B6B] mb-6">/month</p>
              <ul className="space-y-3 mb-8">
                {monthlyFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[#1A1A1A]"
                  >
                    <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/analyze"
                className="block text-center border-2 border-[#FF6B35] text-[#FF6B35] w-full rounded-full py-3 font-semibold hover:bg-[#FFF0EB] transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
          <p className="text-sm text-[#6B6B6B] text-center mt-8">
            Not satisfied? Full refund within 72 hours.
          </p>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div {...sectionAnimation} className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black text-[#1A1A1A] mb-8">
            Your next product starts here
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/report/demo"
              className="border-2 border-[#FF6B35] text-[#FF6B35] rounded-full px-8 py-4 font-semibold hover:bg-[#FFF0EB] transition-colors"
            >
              See an example
            </Link>
            <Link
              href="/analyze"
              className="bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Analyze my idea
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-12 border-t border-[#E8E8E4] text-center text-sm text-[#9B9B9B]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4">
            Bottlecap &mdash; Bridging creativity and manufacturing
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-[#6B6B6B] transition-colors">
              Privacy
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-[#6B6B6B] transition-colors">
              Terms
            </Link>
            <span>&middot;</span>
            <a
              href="https://twitter.com/bottlecap_io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B6B6B] transition-colors"
            >
              @bottlecap_io
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
