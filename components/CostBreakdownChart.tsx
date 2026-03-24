"use client"

import { useState } from "react"

interface CostSegment {
  label: string
  value: number
  color: string
}

interface CostBreakdownChartProps {
  segments: CostSegment[]
  total: number
  currency?: string
}

export default function CostBreakdownChart({
  segments,
  total,
  currency = "$",
}: CostBreakdownChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const size = 200
  const center = size / 2
  const outerRadius = 90
  const innerRadius = 55

  let cumulativeAngle = -Math.PI / 2

  const arcs = segments.map((seg, i) => {
    const fraction = seg.value / total
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + fraction * 2 * Math.PI
    cumulativeAngle = endAngle

    const largeArc = fraction > 0.5 ? 1 : 0
    const r = hoveredIndex === i ? outerRadius + 4 : outerRadius

    const x1 = center + r * Math.cos(startAngle)
    const y1 = center + r * Math.sin(startAngle)
    const x2 = center + r * Math.cos(endAngle)
    const y2 = center + r * Math.sin(endAngle)
    const ix1 = center + innerRadius * Math.cos(startAngle)
    const iy1 = center + innerRadius * Math.sin(startAngle)
    const ix2 = center + innerRadius * Math.cos(endAngle)
    const iy2 = center + innerRadius * Math.sin(endAngle)

    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      `Z`,
    ].join(" ")

    return { ...seg, path, fraction, index: i }
  })

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
      >
        {arcs.map((arc) => (
          <path
            key={arc.index}
            d={arc.path}
            fill={arc.color}
            opacity={hoveredIndex === null || hoveredIndex === arc.index ? 1 : 0.4}
            onMouseEnter={() => setHoveredIndex(arc.index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="transition-opacity duration-200 cursor-pointer"
          />
        ))}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill="#1A1A1A"
        >
          {currency}
          {total.toFixed(2)}
        </text>
        <text
          x={center}
          y={center + 12}
          textAnchor="middle"
          fontSize="11"
          fill="#9B9B9B"
        >
          per unit
        </text>
      </svg>

      <div className="space-y-2 w-full">
        {arcs.map((arc) => (
          <div
            key={arc.index}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${hoveredIndex === arc.index ? "bg-[#F5F5F0]" : ""}`}
            onMouseEnter={() => setHoveredIndex(arc.index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: arc.color }}
              />
              <span className="text-sm text-[#1A1A1A]">{arc.label}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-[#1A1A1A]">
                {currency}
                {arc.value.toFixed(2)}
              </span>
              <span className="text-xs text-[#767676] ml-2">
                {(arc.fraction * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
