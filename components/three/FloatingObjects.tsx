"use client"

import { useRef, useMemo } from "react"
import { useFrame, type ThreeElements } from "@react-three/fiber"
import { RoundedBox, Sphere, Torus } from "@react-three/drei"
import * as THREE from "three"
import type { GPUTier } from "@/lib/hooks/useWebGLCapability"

type _R3F = ThreeElements

interface FloatingObjectsProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
  tier: GPUTier
}

// ─── Network node (glass sphere with inner glow) ─────────────
function NetworkNode({
  position,
  scale,
  color,
  speed,
  depthFactor,
  mouse,
  scrollY,
}: {
  position: THREE.Vector3
  scale: number
  color: string
  speed: number
  depthFactor: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Group>(null)
  const basePos = useMemo(() => position.clone(), [position])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime

    ref.current.position.x =
      basePos.x +
      Math.sin(t * speed + depthFactor * 10) * 0.4 +
      mouse.current.x * depthFactor * 0.3
    ref.current.position.y =
      basePos.y +
      Math.cos(t * speed * 0.8 + depthFactor * 5) * 0.3 +
      mouse.current.y * depthFactor * 0.2 -
      scrollY.current * 1.5 * depthFactor
    ref.current.position.z =
      basePos.z + Math.sin(t * speed * 0.5) * 0.2

    ref.current.rotation.y += 0.004 * speed
    ref.current.rotation.x += 0.002 * speed
  })

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.18 * scale, 24, 24]}>
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0.1}
          transmission={0.85}
          thickness={0.5}
          ior={1.5}
        />
      </Sphere>
      <Sphere args={[0.08 * scale, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </Sphere>
      <Torus args={[0.25 * scale, 0.008 * scale, 8, 48]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Torus>
    </group>
  )
}

// ─── Data particle stream ─────────────────────────────────────
function DataStream({
  start,
  end,
  color,
  speed,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed: number
}) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 12

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      arr[i * 3] = start[0] + (end[0] - start[0]) * t
      arr[i * 3 + 1] = start[1] + (end[1] - start[1]) * t
      arr[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
    }
    return arr
  }, [start, end])

  useFrame((state) => {
    if (!particlesRef.current) return
    const time = state.clock.elapsedTime
    const posAttr = particlesRef.current.geometry.getAttribute("position")

    for (let i = 0; i < count; i++) {
      const t = ((i / count + time * speed * 0.3) % 1)
      posAttr.setXYZ(
        i,
        start[0] + (end[0] - start[0]) * t + Math.sin(time * 2 + i) * 0.03,
        start[1] + (end[1] - start[1]) * t + Math.cos(time * 2 + i) * 0.03,
        start[2] + (end[2] - start[2]) * t
      )
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.025}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Product form (abstract container silhouette) ─────────────
function ProductForm({
  position,
  scale,
  speed,
  mouse,
  scrollY,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.2 - scrollY.current * 1.2
    ref.current.position.x = position[0] + mouse.current.x * 0.15
    ref.current.rotation.y = t * 0.3 * speed
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.1
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <RoundedBox args={[0.35, 0.6, 0.35]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color="#FF6B35"
          transparent
          opacity={0.08}
          roughness={0.05}
          metalness={0.3}
          transmission={0.9}
          thickness={0.8}
          ior={1.45}
        />
      </RoundedBox>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.12, 16]} />
        <meshPhysicalMaterial
          color="#FFD166"
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.4}
          transmission={0.8}
        />
      </mesh>
      <RoundedBox args={[0.36, 0.61, 0.36]} radius={0.08} smoothness={4}>
        <meshBasicMaterial color="#FF6B35" wireframe transparent opacity={0.06} />
      </RoundedBox>
    </group>
  )
}

// ─── Hex grid backdrop ────────────────────────────────────────
function HexGrid({
  position,
  mouse,
  scrollY,
}: {
  position: [number, number, number]
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] - scrollY.current * 0.8
    ref.current.position.x = position[0] + mouse.current.x * 0.1
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.05
    ref.current.rotation.x = -0.3 + mouse.current.y * 0.05
  })

  const hexPositions = useMemo(() => {
    const pts: [number, number][] = []
    const size = 0.4
    for (let q = -2; q <= 2; q++) {
      for (let r = -2; r <= 2; r++) {
        if (Math.abs(q + r) > 2) continue
        const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r)
        const y = size * (1.5 * r)
        pts.push([x, y])
      }
    }
    return pts
  }, [])

  return (
    <group ref={ref} position={position}>
      {hexPositions.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <circleGeometry args={[0.18, 6]} />
          <meshBasicMaterial color="#FF6B35" transparent opacity={0.03 + (i % 3) * 0.015} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {hexPositions.slice(0, 7).map(([x, y], i) => (
        <mesh key={`ring-${i}`} position={[x, y, 0.01]}>
          <ringGeometry args={[0.16, 0.18, 6]} />
          <meshBasicMaterial color="#FF9F1C" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Ambient particles ────────────────────────────────────────
function AmbientParticles({
  count,
  mouse,
  scrollY,
}: {
  count: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
    }
    return arr
  }, [count])

  const seeds = useMemo(
    () => Array.from({ length: count }, () => Math.random() * 100),
    [count]
  )

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posAttr = ref.current.geometry.getAttribute("position")

    for (let i = 0; i < count; i++) {
      const seed = seeds[i]
      const baseX = (seed * 1234.5) % 10 - 5
      const baseY = (seed * 5678.9) % 8 - 4
      posAttr.setXYZ(
        i,
        baseX + Math.sin(t * 0.3 + seed) * 0.5 + mouse.current.x * 0.15,
        baseY + Math.cos(t * 0.25 + seed) * 0.4 - scrollY.current * 1.5,
        -1 + Math.sin(t * 0.2 + seed * 2) * 0.3
      )
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FF6B35" size={0.015} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

// ─── Main export ──────────────────────────────────────────────
export default function FloatingObjects({ mouse, scrollY, tier }: FloatingObjectsProps) {
  const timeRef = useRef(0)
  useFrame((state) => { timeRef.current = state.clock.elapsedTime })

  const nodes = useMemo(() => {
    const count = tier === "high" ? 8 : tier === "medium" ? 5 : 3
    const configs = []
    const colors = ["#FF6B35", "#FF9F1C", "#FFD166", "#FF8C61", "#3B82F6", "#22C55E", "#8B5CF6", "#06B6D4"]

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.8 + Math.random() * 1.5
      configs.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 2 - 1
        ),
        scale: 0.8 + Math.random() * 1.2,
        color: colors[i % colors.length],
        speed: 0.3 + Math.random() * 0.4,
        depthFactor: 0.3 + Math.random() * 0.7,
      })
    }
    return configs
  }, [tier])

  const streams = useMemo(() => {
    if (tier === "low") return []
    const connections: { start: [number, number, number]; end: [number, number, number]; color: string; speed: number }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position)
        if (dist < 3.5 && connections.length < (tier === "high" ? 8 : 4)) {
          connections.push({
            start: nodes[i].position.toArray() as [number, number, number],
            end: nodes[j].position.toArray() as [number, number, number],
            color: nodes[i].color,
            speed: 0.5 + Math.random() * 0.5,
          })
        }
      }
    }
    return connections
  }, [nodes, tier])

  return (
    <group>
      {nodes.map((node, i) => (
        <NetworkNode
          key={`node-${i}`}
          position={node.position}
          scale={node.scale}
          color={node.color}
          speed={node.speed}
          depthFactor={node.depthFactor}
          mouse={mouse}
          scrollY={scrollY}
        />
      ))}

      {streams.map((stream, i) => (
        <DataStream
          key={`stream-${i}`}
          start={stream.start}
          end={stream.end}
          color={stream.color}
          speed={stream.speed}
        />
      ))}

      {tier !== "low" && (
        <>
          <ProductForm position={[-2.5, 0.5, -1]} scale={0.8} speed={0.35} mouse={mouse} scrollY={scrollY} />
          <ProductForm position={[2.8, -0.3, -0.5]} scale={0.6} speed={0.25} mouse={mouse} scrollY={scrollY} />
        </>
      )}

      {tier === "high" && (
        <HexGrid position={[0, -0.5, -2.5]} mouse={mouse} scrollY={scrollY} />
      )}

      <AmbientParticles count={tier === "high" ? 60 : tier === "medium" ? 30 : 15} mouse={mouse} scrollY={scrollY} />
    </group>
  )
}
