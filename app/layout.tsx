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
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bottlecap — Your product idea deserves to be made",
  description:
    "AI-powered manufacturing analysis. Describe your product idea and get a complete feasibility report in minutes — can it be made, how much it costs, and where to manufacture it.",
  openGraph: {
    title: "Bottlecap — Your product idea deserves to be made",
    description:
      "AI-powered manufacturing feasibility analysis. Full report in 2-5 minutes for $99.",
    siteName: "Bottlecap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bottlecap — Your product idea deserves to be made",
    description:
      "AI-powered manufacturing feasibility analysis. Full report in 2-5 minutes for $99.",
  },
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
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
