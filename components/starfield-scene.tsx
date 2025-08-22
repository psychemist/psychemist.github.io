"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useMemo, useRef } from "react"
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

function StarField({ count = 5000, konamiActivated = false, cursorPosition }: { count?: number, konamiActivated?: boolean, cursorPosition?: { x: number; y: number } | null }) {
  const pointsRef = useRef<THREE.Points>(null)
  const originalPositions = useRef<Float32Array>(new Float32Array())
  
  const positions = useMemo(() => {
    const pos = generateStarField(count)
    originalPositions.current = pos.slice() // Store original positions
    return pos
  }, [count])
  
  useFrame((state, delta) => {
    if (pointsRef.current && originalPositions.current) {
      // Base rotation
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
      
      // Enhanced cursor interaction when Konami activated
      if (konamiActivated && cursorPosition) {
        const positionAttribute = pointsRef.current.geometry.getAttribute('position')
        const positions = positionAttribute.array as Float32Array
        
        // Convert cursor position to world space
        const cursorWorld = new THREE.Vector3(
          cursorPosition.x * 8, // Scale to match camera view
          cursorPosition.y * 6,
          0
        )
        
        // Apply repulsion force to nearby stars
        for (let i = 0; i < positions.length; i += 3) {
          const starPos = new THREE.Vector3(
            originalPositions.current[i],
            originalPositions.current[i + 1],
            originalPositions.current[i + 2]
          )
          
          // Calculate distance from cursor
          const distance = starPos.distanceTo(cursorWorld)
          const repulsionRadius = 8
          
          if (distance < repulsionRadius) {
            // Calculate repulsion force (inverse square law)
            const force = Math.max(0, (repulsionRadius - distance) / repulsionRadius)
            const direction = starPos.clone().sub(cursorWorld).normalize()
            
            // Apply displacement
            const displacement = direction.multiplyScalar(force * 2)
            positions[i] = originalPositions.current[i] + displacement.x
            positions[i + 1] = originalPositions.current[i + 1] + displacement.y
            positions[i + 2] = originalPositions.current[i + 2] + displacement.z
          } else {
            // Smoothly return to original position
            const returnForce = 0.02
            positions[i] = THREE.MathUtils.lerp(positions[i], originalPositions.current[i], returnForce)
            positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], originalPositions.current[i + 1], returnForce)
            positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], originalPositions.current[i + 2], returnForce)
          }
        }
        
        positionAttribute.needsUpdate = true
      }
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={konamiActivated ? "#fbbf24" : "#ffffff"}
        size={konamiActivated ? 0.4 : 0.3}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={konamiActivated ? 0.8 : 0.6}
      />
    </Points>
  )
}

// Anatomically accurate brain constellation coordinates
const BRAIN_NODES = [
  [-2, 4, -5], [-1, 4.5, -5], [0, 4.7, -5], [1, 4.5, -5], [2, 4, -5],
  [-2.5, 3, -5], [-1.25, 3.5, -5], [0, 3.7, -5], [1.25, 3.5, -5], [2.5, 3, -5],
  [-1.75, 2.25, -5], [-1, 2.5, -5], [0, 2.7, -5], [1, 2.5, -5], [1.8, 2.1, -5],
  [0, 1.75, -5], [1, 1.5, -5],
]

function BrainConstellation({ konamiActivated = false }: { konamiActivated?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(BRAIN_NODES.length * 3)
    const connections: [number, number][] = []
    
    BRAIN_NODES.forEach((node, i) => {
      positions[i * 3] = node[0]
      positions[i * 3 + 1] = node[1]  
      positions[i * 3 + 2] = node[2]
      
      // Connect to nearby nodes with more sophisticated logic
      BRAIN_NODES.forEach((otherNode, j) => {
        if (i !== j) {
          const dist = Math.sqrt(
            Math.pow(node[0] - otherNode[0], 2) +
            Math.pow(node[1] - otherNode[1], 2) +
            Math.pow(node[2] - otherNode[2], 2)
          )
          
          // Create neural pathways with weighted probability
          const shouldConnect = dist < 1.8 && Math.random() > 0.4
          const isLongRange = dist < 3.0 && Math.random() > 0.8 // Long-range connections
          
          if (shouldConnect || isLongRange) {
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
      // Enhanced twinkling effect when Konami activated
      const material = pointsRef.current.material as THREE.PointsMaterial
      const baseIntensity = konamiActivated ? 0.8 : 0.7
      const twinkleIntensity = konamiActivated ? 0.4 : 0.3
      material.opacity = baseIntensity + Math.sin(time * (konamiActivated ? 3 : 2)) * twinkleIntensity
    }
  })

  return (
    <group ref={groupRef}>
      {/* Brain stars */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={konamiActivated ? "#3b82f6" : "#60a5fa"}
          size={konamiActivated ? 2.5 : 1.8}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      {/* Connection lines - neural pathways */}
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
            <lineBasicMaterial 
              color={konamiActivated ? "#3b82f6" : "#60a5fa"} 
              transparent 
              opacity={konamiActivated ? 0.5 : 0.3} 
            />
          </line>
        )
      })}
    </group>
  )
}

interface StarfieldSceneProps {
  className?: string
  konamiActivated?: boolean
  cursorPosition?: { x: number; y: number } | null
}

export function StarfieldScene({ className, konamiActivated = false, cursorPosition }: StarfieldSceneProps) {
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
          <StarField count={3000} konamiActivated={konamiActivated} cursorPosition={cursorPosition} />
          <BrainConstellation konamiActivated={konamiActivated} />
        </Suspense>
      </Canvas>
    </div>
  )
}