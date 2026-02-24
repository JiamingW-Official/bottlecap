"use client"

import { useRef, useMemo } from "react"
import { useFrame, type ThreeElements } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import type { GPUTier } from "@/lib/hooks/useWebGLCapability"

// Ensure R3F JSX types are available
type _R3F = ThreeElements

interface FloatingObjectsProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
  tier: GPUTier
}

interface ObjectConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  color: string
  type: "box" | "torus" | "octahedron"
  depthFactor: number
}

export default function FloatingObjects({
  mouse,
  scrollY,
  tier,
}: FloatingObjectsProps) {
  const groupRef = useRef<THREE.Group>(null)

  const objects = useMemo<ObjectConfig[]>(() => {
    const count = tier === "high" ? 10 : tier === "medium" ? 6 : 3
    const configs: ObjectConfig[] = []
    const colors = ["#FF6B35", "#FF9F1C", "#FFD166", "#FF8C61", "#E85A25"]
    const types: ("box" | "torus" | "octahedron")[] = [
      "box",
      "torus",
      "octahedron",
    ]

    for (let i = 0; i < count; i++) {
      configs.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 1,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.2 + Math.random() * 0.4,
        speed: 0.2 + Math.random() * 0.5,
        color: colors[i % colors.length],
        type: types[i % types.length],
        depthFactor: 0.3 + Math.random() * 0.7,
      })
    }

    return configs
  }, [tier])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const config = objects[i]
      if (!config) return

      // Base floating animation
      child.position.y =
        config.position[1] + Math.sin(time * config.speed + i) * 0.3

      child.position.x =
        config.position[0] + Math.sin(time * config.speed * 0.7 + i * 2) * 0.15

      // Scroll reactivity - shift Y based on scroll
      child.position.y -= scrollY.current * 2 * config.depthFactor

      // Mouse reactivity - lerp toward cursor with depth-based parallax
      const targetX =
        config.position[0] + mouse.current.x * config.depthFactor * 0.5
      const targetY =
        config.position[1] + mouse.current.y * config.depthFactor * 0.3

      child.position.x += (targetX - child.position.x) * 0.02
      child.position.y += (targetY - child.position.y) * 0.02

      // Rotation
      child.rotation.x += 0.003 * config.speed
      child.rotation.y += 0.005 * config.speed
    })
  })

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh key={i} position={obj.position} rotation={obj.rotation}>
          {obj.type === "box" && (
            <RoundedBox args={[1, 1, 1]} radius={0.1} scale={obj.scale}>
              <meshPhysicalMaterial
                color={obj.color}
                transparent
                opacity={0.6}
                roughness={0.2}
                metalness={0.1}
                transmission={0.3}
              />
            </RoundedBox>
          )}
          {obj.type === "torus" && (
            <>
              <torusKnotGeometry args={[0.3 * obj.scale, 0.1 * obj.scale, 64, 16]} />
              <meshPhysicalMaterial
                color={obj.color}
                transparent
                opacity={0.5}
                roughness={0.3}
                metalness={0.1}
                transmission={0.2}
              />
            </>
          )}
          {obj.type === "octahedron" && (
            <>
              <octahedronGeometry args={[0.4 * obj.scale]} />
              <meshPhysicalMaterial
                color={obj.color}
                transparent
                opacity={0.55}
                roughness={0.15}
                metalness={0.2}
                transmission={0.25}
              />
            </>
          )}
        </mesh>
      ))}
    </group>
  )
}
