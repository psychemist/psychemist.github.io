"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useMemo, useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

// Generate random stars in a sphere
function generateStarField(count: number) {
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 25 + 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }
  
  return positions
}

function StarField({ count = 5000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => generateStarField(count), [count])
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

// Brain constellation coordinates (simplified brain shape)
const BRAIN_NODES = [
  [-2, 1.5, -5], [-1, 2, -5], [0, 2.2, -5], [1, 2, -5], [2, 1.5, -5],
  [-2.5, 0.5, -5], [-1.5, 1, -5], [0, 1.2, -5], [1.5, 1, -5], [2.5, 0.5, -5],
  [-2, -0.5, -5], [-1, 0, -5], [0, 0.2, -5], [1, 0, -5], [2, -0.5, -5],
  [-1.5, -1.2, -5], [0, -1, -5], [1.5, -1.2, -5],
]

function BrainConstellation() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(BRAIN_NODES.length * 3)
    const connections: [number, number][] = []
    
    BRAIN_NODES.forEach((node, i) => {
      positions[i * 3] = node[0]
      positions[i * 3 + 1] = node[1]  
      positions[i * 3 + 2] = node[2]
      
      // Connect to nearby nodes
      BRAIN_NODES.forEach((otherNode, j) => {
        if (i !== j) {
          const dist = Math.sqrt(
            Math.pow(node[0] - otherNode[0], 2) +
            Math.pow(node[1] - otherNode[1], 2) +
            Math.pow(node[2] - otherNode[2], 2)
          )
          if (dist < 2 && Math.random() > 0.3) {
            connections.push([i, j])
          }
        }
      })
    })
    
    return { positions, connections }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      // Subtle twinkling effect
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = 0.7 + Math.sin(time * 2) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Brain stars */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={3}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      {/* Connection lines */}
      {connections.map(([a, b], index) => {
        const start = new THREE.Vector3(...BRAIN_NODES[a])
        const end = new THREE.Vector3(...BRAIN_NODES[b])
        const positions = new Float32Array([
          start.x, start.y, start.z,
          end.x, end.y, end.z
        ])
        
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[positions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" transparent opacity={0.3} />
          </line>
        )
      })}
    </group>
  )
}

interface StarfieldSceneProps {
  className?: string
}

export function StarfieldScene({ className }: StarfieldSceneProps) {
  return (
    <div className={`starfield-canvas ${className || ''}`}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <StarField count={3000} />
          <BrainConstellation />
        </Suspense>
      </Canvas>
    </div>
  )
}