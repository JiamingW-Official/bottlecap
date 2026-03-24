import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export const alt = "Bottlecap — Manufacturing Feasibility Analysis"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
          }}
        >
          Bottlecap
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#FF6B35",
            fontWeight: 600,
          }}
        >
          Manufacturing feasibility reports in 5 minutes
        </div>
      </div>
    ),
    { ...size }
  )
}
