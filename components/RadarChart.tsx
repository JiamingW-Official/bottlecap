"use client"

import { useMemo } from "react"

interface RadarDataPoint {
  label: string
  value: number // 0-100
}

interface RadarChartProps {
  data: RadarDataPoint[]
  size?: number
  color?: string
  showLabels?: boolean
}

export default function RadarChart({
  data,
  size = 280,
  color = "#FF6B35",
  showLabels = true,
}: RadarChartProps) {
  const center = size / 2
  const radius = size * 0.35
  const levels = 5

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length
    return data.map((d, i) => {
      const angle = angleStep * i - Math.PI / 2
      const r = (d.value / 100) * radius
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        labelX: center + (radius + 24) * Math.cos(angle),
        labelY: center + (radius + 24) * Math.sin(angle),
        ...d,
      }
    })
  }, [data, center, radius])

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ")

  const gridLines = useMemo(() => {
    const lines = []
    const angleStep = (2 * Math.PI) / data.length
    for (let level = 1; level <= levels; level++) {
      const r = (level / levels) * radius
      const levelPoints = data.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
      })
      lines.push(levelPoints.join(" "))
    }
    return lines
  }, [data, center, radius])

  const axisLines = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length
    return data.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2
      return {
        x2: center + radius * Math.cos(angle),
        y2: center + radius * Math.sin(angle),
      }
    })
  }, [data, center, radius])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLines.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#E8E8E4"
          strokeWidth="1"
          opacity={0.6}
        />
      ))}

      {/* Axes */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={center}
          y1={center}
          x2={line.x2}
          y2={line.y2}
          stroke="#E8E8E4"
          strokeWidth="1"
          opacity={0.4}
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth="2"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
      ))}

      {/* Labels */}
      {showLabels &&
        points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="#6B6B6B"
            fontWeight="500"
          >
            {p.label}
          </text>
        ))}
    </svg>
  )
}
