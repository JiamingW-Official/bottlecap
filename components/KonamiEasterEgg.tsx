"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  angle: number
  velocity: number
  spin: number
}

export default function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  const triggerConfetti = useCallback(() => {
    const colors = ["#FF6B35", "#FF8F66", "#FFB399", "#E55E2E", "#CC4A1A"]
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      velocity: 2 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 720,
    }))

    setParticles(newParticles)
    setShowConfetti(true)
    toast.success("You found a secret!")

    setTimeout(() => {
      setShowConfetti(false)
      setParticles([])
    }, 3000)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const updated = [...prev, e.code]
        if (updated.length > KONAMI_CODE.length) {
          updated.shift()
        }

        if (
          updated.length === KONAMI_CODE.length &&
          updated.every((key, i) => key === KONAMI_CODE[i])
        ) {
          setTimeout(() => triggerConfetti(), 0)
          return []
        }

        return updated
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [triggerConfetti])

  if (!showConfetti) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(var(--spin));
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            ["--spin" as string]: `${p.spin}deg`,
            animation: `confetti-fall ${1.5 + p.velocity * 0.3}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
