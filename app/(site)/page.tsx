"use client"

import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useKonamiCode, useCursorTrail } from "@/lib/hooks/use-easter-eggs"
import { useState, useEffect } from "react"
import { site } from "@/site.config"
import { StarfieldContainer } from "@/components/starfield-container"
import { Typewriter } from "@/components/typewriter"

export default function HomePage() {
  const [konamiActivated, setKonamiActivated] = useState(false)
  const [showDevMessage, setShowDevMessage] = useState(false)
  const particles = useCursorTrail()

  // Konami code easter egg
  useKonamiCode({
    onSuccess: () => {
      setKonamiActivated(true)
      setShowDevMessage(true)
      // Hide message after 5 seconds
      setTimeout(() => setShowDevMessage(false), 5000)
      // Console message for developers
      console.log("🎮 Konami Code activated! You found the secret developer mode.")
      console.log("🧠 Brain constellation now pulsing with enhanced neural activity...")
    }
  })

  // Hidden developer console messages
  useEffect(() => {
    console.log("%c🌟 Welcome to the starfield! 🌟", "color: #60a5fa; font-size: 16px; font-weight: bold;")
    console.log("%cBuilt with React Three Fiber and lots of ☕", "color: #22c55e; font-size: 12px;")
    console.log("%cTry the Konami Code: ↑↑↓↓←→←→BA", "color: #f59e0b; font-size: 12px;")
  }, [])

  return (
    <div className="relative">
      {/* Animated starfield background */}
      <StarfieldContainer konamiActivated={konamiActivated} />
      
      {/* Cursor particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 w-2 h-2 bg-primary rounded-full"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: particle.opacity,
            transform: `scale(${particle.opacity})`,
            transition: "opacity 0.1s ease-out"
          }}
        />
      ))}
    
      {/* Konami code activation message */}
      {showDevMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-pulse">
          🎮 Developer mode activated! Brain constellation enhanced.
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center z-10">
          {/* Site name with dark mode border */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]">
            {site.name}
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 text-balance dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
            {site.headline}
          </p>
          
          {/* Terminal-style bio with typewriter effect */}
          <div className="text-lg sm:text-xl font-mono mb-12 max-w-2xl mx-auto bg-slate-900/90 dark:bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/30 shadow-lg">
            <div className="text-blue-500 dark:text-blue-400">
              <Typewriter 
                text={site.bioFormal}
                speed={80}
                prefix="$ "
                className="inline-block"
              />
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get notified about new projects, blog posts, and thoughts on the future of technology.
          </p>
          
          <div className="border border-border/40 rounded-lg p-6 bg-card/80 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              Newsletter integration coming soon • Subscribe at{" "}
              <Link
                href={site.socials.substack}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.socials.substack}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
