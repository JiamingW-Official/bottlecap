"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(
  () => import("@/components/interactive/CustomCursor"),
  { ssr: false }
)

export default function CustomCursorWrapper() {
  return <CustomCursor />
}
