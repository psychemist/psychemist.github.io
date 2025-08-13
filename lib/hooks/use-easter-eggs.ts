"use client"

import { useEffect, useState, useCallback } from "react"

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

interface UseKonamiCodeOptions {
  onSuccess: () => void
  resetTimeout?: number
}

export function useKonamiCode({ onSuccess, resetTimeout = 5000 }: UseKonamiCodeOptions) {
  const [keySequence, setKeySequence] = useState<string[]>([])

  const resetSequence = useCallback(() => {
    setKeySequence([])
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = [...prev, event.code]
        
        // Check if current sequence matches konami code so far
        const isValidSequence = KONAMI_CODE.slice(0, newSequence.length)
          .every((key, index) => key === newSequence[index])
        
        if (!isValidSequence) {
          return []
        }
        
        // Check if complete sequence is entered
        if (newSequence.length === KONAMI_CODE.length) {
          onSuccess()
          return []
        }
        
        return newSequence
      })
    }

    document.addEventListener('keydown', handleKeyDown)
    
    // Reset sequence after timeout
    const timer = setTimeout(resetSequence, resetTimeout)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [onSuccess, resetTimeout, resetSequence])

  return { resetSequence }
}

export function useCursorTrail() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    opacity: number
  }>>([])

  useEffect(() => {
    let particleId = 0
    
    const handleMouseMove = (event: MouseEvent) => {
      const newParticle = {
        id: particleId++,
        x: event.clientX,
        y: event.clientY,
        opacity: 0.8
      }
      
      setParticles(prev => [...prev.slice(-10), newParticle])
    }
    
    // Fade out particles
    const fadeInterval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          opacity: particle.opacity * 0.9
        })).filter(particle => particle.opacity > 0.1)
      )
    }, 50)
    
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(fadeInterval)
    }
  }, [])

  return particles
}