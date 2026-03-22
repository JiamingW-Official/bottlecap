"use client"

import Link from "next/link"
import { Twitter, Github, ArrowRight, Shield, Zap, Clock } from "lucide-react"

const stats = [
  { value: "14", label: "free guides" },
  { value: "9",  label: "free tools" },
  { value: "12", label: "countries" },
  { value: "60+", label: "glossary terms" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-[#E8E8E4] bg-[#FAFAF8]">

      {/* Stats strip */}
      <div className="border-b border-[#E8E8E4] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-[#1A1A1A]">{s.value}</span>
                  <span className="text-xs text-[#9B9B9B]">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-[#9B9B9B]">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 72-hr money-back</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 2–5 min delivery</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Stripe secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Newsletter signup */}
        <div className="mb-12 pb-12 border-b border-[#E8E8E4]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-md">
              <p className="font-bold text-[#1A1A1A] mb-1">Stay updated</p>
              <p className="text-sm text-[#6B6B6B] mb-4">
                Manufacturing tips, product updates, and new guides. No spam — unsubscribe any time.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B35] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors shrink-0 flex items-center gap-1.5"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <div className="bg-[#F5F5F0] rounded-xl p-4 inline-block">
                <p className="text-xs text-[#9B9B9B] mb-2 font-medium">Recent topics</p>
                {[
                  "How to choose between China and Vietnam",
                  "HS code changes for 2025",
                  "MOQ negotiation tactics that work",
                ].map((t) => (
                  <p key={t} className="text-xs text-[#4B4B4B] py-1.5 border-b border-[#E8E8E4] last:border-0">
                    → {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand — wider */}
          <div className="lg:col-span-2">
            <p className="font-black text-xl text-[#1A1A1A] mb-2">Bottlecap</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
              Manufacturing feasibility analysis for founders who are serious
              about making their product real. $99. 2–5 minutes. No guessing.
            </p>
            <p className="text-xs text-[#9B9B9B] mb-4">Powered by Claude AI · Made in San Francisco</p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/bottlecap_io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E8E8E4] text-[#9B9B9B] hover:text-[#1A1A1A] hover:border-[#D0D0D0] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/bottlecap-io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E8E8E4] text-[#9B9B9B] hover:text-[#1A1A1A] hover:border-[#D0D0D0] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/analyze",     label: "Start Analysis",   highlight: true },
                { href: "/report/demo", label: "Demo Report" },
                { href: "/dashboard",   label: "My Reports" },
                { href: "/pricing",     label: "Pricing" },
                { href: "/about",       label: "About" },
                { href: "/#faq",        label: "FAQ" },
              ].map(({ href, label, highlight }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm transition-colors ${
                      highlight
                        ? "text-[#FF6B35] font-semibold hover:text-[#E85A25]"
                        : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <p className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Free Tools
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/tools/hs-lookup",       label: "HS Code Lookup" },
                { href: "/tools/cost-calculator",  label: "Cost Calculator" },
                { href: "/tools/tariff-calculator",label: "Tariff Calculator" },
                { href: "/tools/moq-calculator",   label: "MOQ Planner" },
                { href: "/tools/country-compare",  label: "Country Compare" },
                { href: "/tools",                  label: "All Tools →" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Learn
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/guide/manufacturing-101",  label: "Manufacturing 101" },
                { href: "/guide/country-comparison", label: "Country Comparison" },
                { href: "/guide/materials",          label: "Materials Guide" },
                { href: "/guide/sourcing",           label: "Sourcing Guide" },
                { href: "/glossary",                 label: "Glossary" },
                { href: "/guide",                    label: "All Guides →" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-[#E8E8E4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9B9B9B]">
            &copy; {new Date().getFullYear()} Bottlecap. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link href="/privacy"          className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors">Privacy Policy</Link>
            <Link href="/terms"            className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors">Terms of Service</Link>
            <a href="mailto:hello@bottlecap.io" className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors">hello@bottlecap.io</a>
            <button onClick={scrollToTop}  className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
