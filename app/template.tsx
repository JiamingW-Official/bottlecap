"use client"

import PageTransitionProvider from "@/components/providers/PageTransitionProvider"

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionProvider>{children}</PageTransitionProvider>
}
