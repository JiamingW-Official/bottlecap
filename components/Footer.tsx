"use client"

import { useState } from "react"
import Link from "next/link"
import { Twitter, Github, ArrowRight, Shield, Zap, Cpu, Lock } from "lucide-react"

const stats = [
  { value: "14", label: "free guides" },
  { value: "9",  label: "free tools" },
  { value: "12", label: "countries" },
  { value: "60+", label: "glossary terms" },
]

const trustBadges = [
  { icon: Shield, label: "72-hour money-back guarantee" },
  { icon: Zap,    label: "2-5 min delivery" },
  { icon: Cpu,    label: "Powered by Claude AI" },
  { icon: Lock,   label: "Secure checkout via Stripe" },
]

const productLinks = [
  { href: "/analyze",     label: "Analyze My Product", highlight: true },
  { href: "/report/demo", label: "Sample Report" },
  { href: "/dashboard",   label: "Dashboard" },
  { href: "/pricing",     label: "Pricing" },
]

const toolLinks = [
  { href: "/tools/hs-lookup",          label: "HS Code Lookup" },
  { href: "/tools/cost-calculator",        label: "Cost Calculator" },
  { href: "/tools/tariff-calculator",      label: "Tariff Calculator" },
  { href: "/tools/country-compare",        label: "Country Compare" },
  { href: "/tools/moq-calculator",         label: "MOQ Planner" },
  { href: "/tools/margin-simulator",       label: "Margin Simulator" },
  { href: "/tools/risk-monitor",           label: "Risk Monitor" },
  { href: "/tools/negotiation-playbook",   label: "Negotiation Playbook" },
  { href: "/tools/quiz",                   label: "Sourcing Quiz" },
]

const learnLinks = [
  { href: "/guide/manufacturing-101",  label: "Manufacturing 101" },
  { href: "/guide/sourcing",           label: "Sourcing Guide" },
  { href: "/guide/country-comparison", label: "Country Comparison" },
  { href: "/guide/materials",          label: "Materials Guide" },
  { href: "/guide/shipping-logistics", label: "Shipping & Logistics" },
  { href: "/guide/quality-control",    label: "Quality Control" },
  { href: "/guide/ip-protection",      label: "IP Protection" },
  { href: "/guide/certifications",     label: "Certifications" },
]

const resourceLinks = [
  { href: "/glossary",            label: "Glossary" },
  { href: "/comparisons",         label: "Comparisons" },
  { href: "/manufacturers",       label: "Manufacturer Profiles" },
  { href: "/trends",              label: "Trending Products" },
  { href: "/suppliers",           label: "Verified Suppliers" },
  { href: "/cost-to-manufacture", label: "Cost Guides" },
  { href: "/about",               label: "About" },
  { href: "/blog",                label: "Blog" },
  { href: "/contact",             label: "Contact" },
  { href: "/changelog",           label: "Changelog" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSubscribed(true)
      } else {
        setError(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
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
                  <span className="text-xs text-[#767676]">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-[#767676]">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 72-hr money-back</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 2-5 min delivery</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Stripe secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Newsletter strip */}
        <div className="bg-[#F5F5F0] rounded-2xl p-5 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-[#1A1A1A] text-sm mb-0.5">Get sourcing trend updates</p>
              <p className="text-xs text-[#6B6B6B]">Manufacturing tips and new guides. No spam.</p>
            </div>
            {subscribed ? (
              <p className="text-sm font-semibold text-[#FF6B35] shrink-0">
                Thanks — we&apos;ll be in touch
              </p>
            ) : (
              <div className="w-full sm:w-auto">
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    className="flex-1 sm:w-52 bg-white border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#FF6B35] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Subscribe"}
                    {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </form>
                {error && (
                  <p className="text-xs text-red-500 mt-1.5">{error}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4-column nav grid + brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand — spans 1 col on lg */}
          <div className="lg:col-span-1">
            <p className="font-black text-xl text-[#1A1A1A] mb-2">Bottlecap</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
              Manufacturing feasibility analysis for founders. $99. 2-5 minutes. No guessing.
            </p>
            <p className="text-xs text-[#767676] mb-4">Powered by Claude AI · Made in San Francisco</p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/bottlecap_io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E8E8E4] text-[#767676] hover:text-[#1A1A1A] hover:border-[#D0D0D0] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/bottlecap-io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E8E8E4] text-[#767676] hover:text-[#1A1A1A] hover:border-[#D0D0D0] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {productLinks.map(({ href, label, highlight }) => (
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

          {/* Tools */}
          <div>
            <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-4">
              Tools
            </p>
            <ul className="space-y-2.5">
              {toolLinks.map(({ href, label }) => (
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
            <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-4">
              Learn
            </p>
            <ul className="space-y-2.5">
              {learnLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-bold text-[#767676] uppercase tracking-widest mb-4">
              Resources
            </p>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 pb-8 border-b border-[#E8E8E4]">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 bg-white border border-[#E8E8E4] rounded-full px-3.5 py-1.5 text-xs text-[#6B6B6B] font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-[#FF6B35]" />
              {label}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#767676]">
              &copy; {new Date().getFullYear()} Bottlecap. All rights reserved.
            </p>
            <p className="text-xs text-[#C0C0C0] mt-1">
              Manufacturing intelligence for founders, by founders. Not affiliated with any supplier or factory.
            </p>
          </div>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link href="/privacy"           className="text-xs text-[#767676] hover:text-[#6B6B6B] transition-colors">Privacy Policy</Link>
            <Link href="/terms"             className="text-xs text-[#767676] hover:text-[#6B6B6B] transition-colors">Terms of Service</Link>
            <a href="mailto:hello@bottlecap.io" className="text-xs text-[#767676] hover:text-[#6B6B6B] transition-colors">hello@bottlecap.io</a>
            <button onClick={scrollToTop}   className="text-xs text-[#767676] hover:text-[#6B6B6B] transition-colors">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
