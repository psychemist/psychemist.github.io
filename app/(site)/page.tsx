"use client"

import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useKonamiCode, useCursorTrail } from "@/lib/hooks/use-easter-eggs"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { site } from "@/site.config"
import { StarfieldContainer } from "@/components/starfield-container"
import { Typewriter } from "@/components/typewriter"
import { SocialIcons } from "@/components/social-icons"

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
        <div className="max-w-4xl mx-auto text-center z-10 pt-16">
          {/* Site name with scroll animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_12px_rgba(0,0,0,0.8)] mt-20"
          >
            {site.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 text-balance dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]"
          >
            {site.headline}
          </motion.p>
          
          {/* Terminal-style bio with typewriter effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl font-mono mb-12 max-w-2xl mx-auto bg-background/80 dark:bg-background/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50 shadow-lg"
          >
            <div className="text-foreground/90">
              <Typewriter 
                text={site.bioFormal}
                speed={80}
                prefix="$ "
                className="inline-block"
              />
            </div>
          </motion.div>
          
          {/* CTA Buttons with stagger animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors group"
            >
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          </motion.div>
          
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SocialIcons />
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter Section with parallax */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-border/40 backdrop-blur-sm bg-background/80"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-foreground mb-4"
          >
            Stay Updated
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-8"
          >
            Get notified about new projects, blog posts, and thoughts on the future of technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border/40 rounded-lg p-6 bg-card/80 backdrop-blur-sm"
          >
            <p className="text-sm text-muted-foreground">
              Newsletter integration coming soon • Subscribe at{" "}
              <Link
                href={site.socials.substack}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.socials.substack.replace('https://', '')}
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
