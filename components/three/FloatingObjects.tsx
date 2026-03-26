"use client"

import { useRef, useMemo } from "react"
import { useFrame, type ThreeElements } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"
import type { GPUTier } from "@/lib/hooks/useWebGLCapability"

type _R3F = ThreeElements

interface Props {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
  tier: GPUTier
}

// ─── Shared drift ─────────────────────────────────────────────
function useDrift(
  ref: React.RefObject<THREE.Object3D | null>,
  base: [number, number, number],
  speed: number,
  depth: number,
  phase: number,
  mouse: React.MutableRefObject<{ x: number; y: number }>,
  scrollY: React.MutableRefObject<number>,
) {
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.x = base[0] + Math.sin(t * speed * 0.25 + phase) * 0.6 + mouse.current.x * depth * 0.45
    ref.current.position.y = base[1] + Math.cos(t * speed * 0.2 + phase * 1.3) * 0.45 + mouse.current.y * depth * 0.3 - scrollY.current * 2 * depth
    ref.current.position.z = base[2] + Math.sin(t * speed * 0.1 + phase * 0.7) * 0.2
  })
}

// ─── 1. Glass Network Node (from original — translucent sphere with inner glow) ──
function GlassNode({
  pos, radius, color, glowColor, speed, depth, phase, mouse, scrollY,
}: {
  pos: [number, number, number]; radius: number; color: string; glowColor: string
  speed: number; depth: number; phase: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  useDrift(ref, pos, speed, depth, phase, mouse, scrollY)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.04 + phase
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + phase) * 0.12)
    }
  })

  return (
    <Float speed={0.6 + phase * 0.1} rotationIntensity={0.04} floatIntensity={0.15}>
      <group ref={ref}>
        {/* Outer glass shell */}
        <Sphere args={[radius, 64, 64]}>
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.15}
            metalness={0.1}
            roughness={0.02}
            transmission={0.92}
            thickness={radius * 3}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={1.5}
          />
        </Sphere>
        {/* Inner glow core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[radius * 0.3, 20, 20]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.4} />
        </mesh>
        {/* Tiny specular highlight */}
        <mesh position={[radius * 0.25, radius * 0.3, radius * 0.2]}>
          <sphereGeometry args={[radius * 0.06, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  )
}

// ─── 2. Morphing Chrome Blob ──────────────────────────────────
function ChromeBlob({
  pos, scale, color, speed, depth, phase, mouse, scrollY,
}: {
  pos: [number, number, number]; scale: number; color: string
  speed: number; depth: number; phase: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Mesh>(null)
  useDrift(ref, pos, speed, depth, phase, mouse, scrollY)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.06 + phase
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.12 + phase) * 0.08
  })

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <mesh ref={ref} scale={scale}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.85}
          roughness={0.12}
          distort={0.2}
          speed={1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

// ─── 3. Thin Chrome Ring ──────────────────────────────────────
function ChromeRing({
  pos, radius, tube, tiltX, color, speed, depth, phase, mouse, scrollY,
}: {
  pos: [number, number, number]; radius: number; tube: number; tiltX: number
  color: string; speed: number; depth: number; phase: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.x = pos[0] + mouse.current.x * depth * 0.3
    ref.current.position.y = pos[1] + Math.sin(t * speed * 0.15 + phase) * 0.25 - scrollY.current * 1.6 * depth
    ref.current.rotation.x = tiltX + t * 0.08 * speed
    ref.current.rotation.y = t * 0.1 * speed + phase
  })

  return (
    <mesh ref={ref} position={pos}>
      <torusGeometry args={[radius, tube, 24, 128]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.03}
        envMapIntensity={2}
      />
    </mesh>
  )
}

// ─── 4. Warm Dust Particles ───────────────────────────────────
function Dust({ count, mouse, scrollY }: {
  count: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollY: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Points>(null)
  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3)
    const s: number[] = []
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      p[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
      s.push(Math.random() * 100)
    }
    return { positions: p, seeds: s }
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const attr = ref.current.geometry.getAttribute("position")
    for (let i = 0; i < count; i++) {
      const sd = seeds[i]
      attr.setXYZ(i,
        ((sd * 1234.5) % 14 - 7) + Math.sin(t * 0.08 + sd) * 0.5 + mouse.current.x * 0.06,
        ((sd * 5678.9) % 10 - 5) + Math.cos(t * 0.06 + sd) * 0.4 - scrollY.current * 1.2,
        -1.5 + Math.sin(t * 0.04 + sd * 2) * 0.3
      )
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FF6B35" size={0.015} transparent opacity={0.2} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

// ─── 5. Faint Connection Lines ────────────────────────────────
function ConnectionLines({ positions, mouse }: {
  positions: [number, number, number][]
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const ref = useRef<THREE.LineSegments>(null)
  const linePositions = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 4) {
          pts.push(...positions[i], ...positions[j])
        }
      }
    }
    return new Float32Array(pts)
  }, [positions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.02) * 0.03
    ref.current.position.x = mouse.current.x * 0.1
    ref.current.position.y = mouse.current.y * 0.05
  })

  if (linePositions.length === 0) return null

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={linePositions} count={linePositions.length / 3} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#FF6B35" transparent opacity={0.06} />
    </lineSegments>
  )
}

// ═══════════════════════════════════════════════════════════════
// SCENE COMPOSITION
// ═══════════════════════════════════════════════════════════════
export default function FloatingObjects({ mouse, scrollY, tier }: Props) {
  const hi = tier === "high"
  const md = tier === "medium"

  // Node positions for connection lines
  const nodePositions: [number, number, number][] = useMemo(() => [
    [-2, 1.2, 0.5],
    [2.5, 0.8, 0],
    [0.5, -0.5, 0.3],
    [-1.5, -1.2, -0.3],
    [3, -1, -0.5],
    [-3, 0.2, -0.8],
    [1, 2, -0.5],
  ], [])

  return (
    <group>
      {/* ── Glass nodes — the network feel ─────────────────── */}
      <GlassNode pos={[-2, 1.2, 0.5]} radius={0.55} color="#ffe8d6" glowColor="#FF6B35" speed={0.2} depth={0.5} phase={0} mouse={mouse} scrollY={scrollY} />
      <GlassNode pos={[2.5, 0.8, 0]} radius={0.4} color="#e0e8ff" glowColor="#3B82F6" speed={0.18} depth={0.45} phase={1.8} mouse={mouse} scrollY={scrollY} />
      <GlassNode pos={[0.5, -0.5, 0.3]} radius={0.65} color="#ffe0cc" glowColor="#F97316" speed={0.15} depth={0.55} phase={3.2} mouse={mouse} scrollY={scrollY} />
      {(hi || md) && <GlassNode pos={[-1.5, -1.2, -0.3]} radius={0.3} color="#f0e0ff" glowColor="#8B5CF6" speed={0.22} depth={0.4} phase={4.5} mouse={mouse} scrollY={scrollY} />}
      {hi && <GlassNode pos={[3, -1, -0.5]} radius={0.25} color="#ffe0cc" glowColor="#FF6B35" speed={0.25} depth={0.6} phase={5.8} mouse={mouse} scrollY={scrollY} />}

      {/* ── Chrome blobs — organic, glossy ──────────────────── */}
      <ChromeBlob pos={[-3, 0.2, -0.8]} scale={0.5} color="#e8d0ff" speed={0.12} depth={0.55} phase={0.5} mouse={mouse} scrollY={scrollY} />
      {(hi || md) && <ChromeBlob pos={[1, 2, -0.5]} scale={0.35} color="#ffd6e0" speed={0.15} depth={0.7} phase={2.3} mouse={mouse} scrollY={scrollY} />}
      {hi && <ChromeBlob pos={[3.5, 1.5, -1.2]} scale={0.25} color="#d6e8ff" speed={0.18} depth={0.8} phase={4.1} mouse={mouse} scrollY={scrollY} />}

      {/* ── Chrome rings — slow, elegant ────────────────────── */}
      <ChromeRing pos={[-0.5, 0.5, -0.3]} radius={1.2} tube={0.025} tiltX={-0.4} color="#ffe0cc" speed={0.1} depth={0.5} phase={0} mouse={mouse} scrollY={scrollY} />
      {(hi || md) && <ChromeRing pos={[2, -0.8, -0.8]} radius={0.7} tube={0.02} tiltX={0.5} color="#e0d0ff" speed={0.08} depth={0.45} phase={2.5} mouse={mouse} scrollY={scrollY} />}

      {/* ── Connection lines between nodes ──────────────────── */}
      {hi && <ConnectionLines positions={nodePositions} mouse={mouse} />}

      {/* ── Dust particles ─────────────────────────────────── */}
      <Dust count={hi ? 40 : md ? 20 : 8} mouse={mouse} scrollY={scrollY} />
    </group>
  )
}
