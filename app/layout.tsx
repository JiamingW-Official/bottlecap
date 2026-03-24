import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CommandPalette from "@/components/CommandPalette"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Toaster } from "@/components/ui/sonner"
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider"
import CustomCursorWrapper from "@/components/interactive/CustomCursorWrapper"
import BackToTop from "@/components/BackToTop"
import ScrollProgress from "@/components/ScrollProgress"
import KonamiEasterEgg from "@/components/KonamiEasterEgg"
import EasterEggs from "@/components/EasterEggs"
import AccessibilityEnhancements from "@/components/AccessibilityEnhancements"
import StickyAnalyzeCTA from "@/components/StickyAnalyzeCTA"
import CookieConsent from "@/components/CookieConsent"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bottlecap — Manufacturing Feasibility Analysis in 5 Minutes",
  description:
    "Describe your product idea and get a full 12-section manufacturing feasibility report in 2–5 minutes. Costs, countries, materials, HS codes, tariffs — all for $99. Powered by Claude AI.",
  keywords: [
    "manufacturing feasibility",
    "product analysis",
    "sourcing report",
    "manufacturing cost calculator",
    "HS code lookup",
    "MOQ planning",
    "product startup",
    "factory sourcing",
    "China manufacturing",
    "Vietnam manufacturing",
    "product development",
    "supply chain analysis",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bottlecap — Manufacturing Feasibility in 5 Minutes",
    description:
      "AI-powered manufacturing feasibility analysis. Full 12-section report — costs, countries, materials, tariffs — in 2–5 minutes for $99.",
    siteName: "Bottlecap",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bottlecap — Manufacturing Feasibility in 5 Minutes",
    description:
      "AI-powered manufacturing feasibility analysis. Full 12-section report in 2–5 minutes for $99.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  category: "business",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Bottlecap",
      url: "https://bottlecap.io",
      description:
        "AI-powered manufacturing feasibility analysis for founders",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@bottlecap.io",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebApplication",
      name: "Bottlecap",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "99",
        priceCurrency: "USD",
        description: "Single manufacturing feasibility report",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#FF6B35" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          <div id="main-content" className="pt-16">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
          <Footer />
          <CommandPalette />
          <Toaster position="top-center" richColors />
          <CustomCursorWrapper />
          <BackToTop />
          <KonamiEasterEgg />
          <EasterEggs />
          <AccessibilityEnhancements />
          <CookieConsent />
          <StickyAnalyzeCTA />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
