import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bottlecap — Your product idea deserves to be made",
  description:
    "AI-powered manufacturing analysis. Describe your product idea and get a complete feasibility report in minutes — can it be made, how much it costs, and where to manufacture it.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
