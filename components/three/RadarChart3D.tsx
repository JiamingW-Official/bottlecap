"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface RadarData {
  label: string
  value: number
}

interface RadarMeshProps {
  data: RadarData[]
}

function RadarMesh({ data }: RadarMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)

  const { shape, outline } = useMemo(() => {
    const count = data.length
    const angleStep = (Math.PI * 2) / count
    const radius = 1.5

    // Radar polygon shape
    const shapeGeom = new THREE.BufferGeometry()
    const vertices: number[] = []
    const indices: number[] = []

    // Center vertex
    vertices.push(0, 0, 0)

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2
      const r = (data[i].value / 100) * radius
      vertices.push(Math.cos(angle) * r, Math.sin(angle) * r, 0)

      // Triangle fan from center
      const next = ((i + 1) % count) + 1
      indices.push(0, i + 1, next)
    }

    shapeGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    shapeGeom.setIndex(indices)
    shapeGeom.computeVertexNormals()

    // Outline geometry (grid lines)
    const outlineVertices: number[] = []
    // Outer polygon outline
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2
      const r = (data[i].value / 100) * radius
      const nextAngle = ((i + 1) % count) * angleStep - Math.PI / 2
      const nextR = (data[(i + 1) % count].value / 100) * radius
      outlineVertices.push(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        0.01,
        Math.cos(nextAngle) * nextR,
        Math.sin(nextAngle) * nextR,
        0.01
      )
    }
    // Spokes from center
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2
      outlineVertices.push(0, 0, 0.01)
      outlineVertices.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.01
      )
    }
    // Background rings
    for (let ring = 1; ring <= 3; ring++) {
      const ringR = (ring / 3) * radius
      for (let i = 0; i < count; i++) {
        const angle = i * angleStep - Math.PI / 2
        const nextAngle = ((i + 1) % count) * angleStep - Math.PI / 2
        outlineVertices.push(
          Math.cos(angle) * ringR,
          Math.sin(angle) * ringR,
          -0.01,
          Math.cos(nextAngle) * ringR,
          Math.sin(nextAngle) * ringR,
          -0.01
        )
      }
    }

    const outlineGeom = new THREE.BufferGeometry()
    outlineGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(outlineVertices, 3)
    )

    return { shape: shapeGeom, outline: outlineGeom }
  }, [data])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.08
    }
    if (lineRef.current) {
      lineRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      lineRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.08
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={shape}>
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={lineRef} geometry={outline}>
        <lineBasicMaterial color="#E8E8E4" transparent opacity={0.4} />
      </lineSegments>
    </group>
  )
}

interface RadarChart3DProps {
  data: RadarData[]
  size?: number
}

export default function RadarChart3D({ data, size = 260 }: RadarChart3DProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="mx-auto"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <RadarMesh data={data} />
      </Canvas>
    </div>
  )
}
