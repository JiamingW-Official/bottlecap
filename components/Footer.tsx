"use client"

import Link from "next/link"
import { Twitter, Github } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-[#E8E8E4] bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Newsletter signup */}
        <div className="mb-12 pb-12 border-b border-[#E8E8E4]">
          <div className="max-w-md">
            <p className="font-semibold text-[#1A1A1A] mb-2">Stay updated</p>
            <p className="text-sm text-[#6B6B6B] mb-4">Manufacturing tips and product updates. No spam.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white border border-[#E8E8E4] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#FF6B35] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#E85A25] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg text-[#1A1A1A] mb-3">Bottlecap</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
              Manufacturing feasibility analysis for founders who are serious
              about making their product real.
            </p>
            <p className="text-sm text-[#9B9B9B] mb-4">Powered by Claude AI</p>
            {/* Social links */}
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
            <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/analyze", label: "Start Analysis" },
                { href: "/report/demo", label: "Demo Report" },
                { href: "/dashboard", label: "My Reports" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About" },
                { href: "/#faq", label: "FAQ" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Free Tools
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/tools/hs-lookup", label: "HS Code Lookup" },
                { href: "/tools/cost-calculator", label: "Cost Calculator" },
                { href: "/tools/tariff-calculator", label: "Tariff Calculator" },
                { href: "/tools/moq-calculator", label: "MOQ Planner" },
                { href: "/tools", label: "All Tools \u2192" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest mb-4">
              Learn
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/guide/manufacturing-101", label: "Manufacturing 101" },
                { href: "/guide/country-comparison", label: "Country Comparison" },
                { href: "/guide/materials", label: "Materials Guide" },
                { href: "/glossary", label: "Glossary" },
                { href: "/guide", label: "All Guides \u2192" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-[#E8E8E4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#9B9B9B]">
              &copy; {new Date().getFullYear()} Bottlecap. All rights reserved.
            </p>
            <span className="text-xs text-[#9B9B9B]">Made in San Francisco</span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:hello@bottlecap.io"
              className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
            >
              hello@bottlecap.io
            </a>
            <button
              onClick={scrollToTop}
              className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
