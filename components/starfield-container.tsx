"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import { useMediaQuery } from "@/lib/hooks/use-media-query"

// Lazy load the 3D scene to reduce initial bundle size
const StarfieldScene = lazy(() => 
  import("@/components/starfield-scene").then(module => ({
    default: module.StarfieldScene
  }))
)

// Static fallback for low-performance devices or reduced motion
function StaticStarfield() {
  return (
    <div className="starfield-canvas">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(2px 2px at 20px 30px, #fff, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 2px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 1px at 160px 30px, #fff, transparent),
            radial-gradient(1px 1px at 200px 90px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 240px 50px, #fff, transparent),
            radial-gradient(1px 1px at 280px 120px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 2px at 320px 40px, #fff, transparent),
            radial-gradient(2px 1px at 360px 100px, rgba(255,255,255,0.6), transparent)
          `,
          backgroundSize: "400px 200px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* Brain constellation static version */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          className="opacity-60"
        >
          {/* Simplified brain outline */}
          <circle cx="30" cy="25" r="2" fill="#60a5fa" opacity="0.8" />
          <circle cx="50" cy="20" r="2" fill="#60a5fa" opacity="0.9" />
          <circle cx="70" cy="22" r="2" fill="#60a5fa" opacity="0.7" />
          <circle cx="90" cy="28" r="2" fill="#60a5fa" opacity="0.8" />
          <circle cx="35" cy="40" r="2" fill="#60a5fa" opacity="0.6" />
          <circle cx="60" cy="35" r="2" fill="#60a5fa" opacity="0.9" />
          <circle cx="85" cy="42" r="2" fill="#60a5fa" opacity="0.7" />
          <circle cx="45" cy="55" r="2" fill="#60a5fa" opacity="0.8" />
          <circle cx="75" cy="58" r="2" fill="#60a5fa" opacity="0.6" />
          
          {/* Connection lines */}
          <line x1="30" y1="25" x2="50" y2="20" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          <line x1="50" y1="20" x2="70" y2="22" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          <line x1="35" y1="40" x2="60" y2="35" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          <line x1="60" y1="35" x2="85" y2="42" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          <line x1="45" y1="55" x2="75" y2="58" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    </div>
  )
}

// Loading placeholder
function StarfieldLoader() {
  return (
    <div className="starfield-canvas">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background animate-pulse" />
    </div>
  )
}

export function StarfieldContainer({ 
  konamiActivated = false, 
  className = "" 
}: { 
  konamiActivated?: boolean
  className?: string 
}) {
  const [shouldRender3D, setShouldRender3D] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isLowPerformance = useMediaQuery("(max-width: 768px)")

  // Track cursor position for enhanced star interactions
  useEffect(() => {
    if (!konamiActivated) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      setCursorPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [konamiActivated])

  useEffect(() => {
    // Device and preference checks
    const hasGoodPerformance = !isLowPerformance && 
      typeof window !== 'undefined' && 
      window.devicePixelRatio <= 2 &&
      navigator.hardwareConcurrency >= 4

    // Only render 3D if user doesn't prefer reduced motion and device can handle it
    if (!prefersReducedMotion && hasGoodPerformance) {
      // Add a small delay to avoid blocking initial render
      const timer = setTimeout(() => setShouldRender3D(true), 100)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion, isLowPerformance])

  // Show static fallback if reduced motion or low performance
  if (prefersReducedMotion || !shouldRender3D) {
    return <div className={className}><StaticStarfield /></div>
  }

  return (
    <div className={className}>
      <Suspense fallback={<StarfieldLoader />}>
        <StarfieldScene 
          konamiActivated={konamiActivated}
          cursorPosition={cursorPosition}
        />
      </Suspense>
    </div>
  )
}