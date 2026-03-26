"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"
import FloatingObjects from "./FloatingObjects"
import type { GPUTier } from "@/lib/hooks/useWebGLCapability"

export default function HeroScene({ tier }: { tier: GPUTier }) {
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollY.current = h > 0 ? window.scrollY / h : 0
    }
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const dpr: [number, number] | number =
    tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : 1

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: tier !== "low" }}
        style={{ background: "transparent" }}
      >
        {/* Warm lighting setup — key light + orange accent + blue fill */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.5} color="#FF6B35" distance={12} />
        <pointLight position={[3, -3, 2]} intensity={0.3} color="#3B82F6" distance={10} />

        <FloatingObjects mouse={mouse} scrollY={scrollY} tier={tier} />

        {tier === "high" && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.85} intensity={0.35} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.1} darkness={0.3} />
          </EffectComposer>
        )}

        {tier === "medium" && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.2} />
            <Vignette eskil={false} offset={0.1} darkness={0.2} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
