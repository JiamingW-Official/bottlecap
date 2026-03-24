"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"
import FloatingObjects from "./FloatingObjects"
import type { GPUTier } from "@/lib/hooks/useWebGLCapability"

interface HeroSceneProps {
  tier: GPUTier
}

export default function HeroScene({ tier }: HeroSceneProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      scrollY.current = docHeight > 0 ? window.scrollY / docHeight : 0
    }

    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const dpr: [number, number] | number =
    tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : 1

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: tier !== "low" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={0.7} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.5} color="#FF6B35" distance={12} />
        <pointLight position={[3, -3, 2]} intensity={0.25} color="#3B82F6" distance={10} />
        <pointLight position={[0, 0, -3]} intensity={0.15} color="#FFD166" distance={8} />

        <FloatingObjects mouse={mouse} scrollY={scrollY} tier={tier} />

        {tier === "high" && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.8} intensity={0.4} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.1} darkness={0.35} />
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
