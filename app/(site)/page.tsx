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
  const [subscriberCount, setSubscriberCount] = useState(0)
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState('')
  const particles = useCursorTrail()

  // Fetch subscriber count
  useEffect(() => {
    fetch('/api/subscribe')
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setSubscriberCount(data.count)
        }
      })
      .catch(err => console.error('Failed to fetch subscriber count:', err))
  }, [])

  // Handle subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscribeMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setSubscribeMessage(data.message)
        setEmail('')
        setSubscriberCount(prev => prev + 1) // Optimistically update count
      } else {
        setSubscribeMessage(data.message || 'Failed to subscribe')
      }
    } catch (error) {
      setSubscribeMessage('Network error. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

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
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

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
          aria-hidden="true"
        />
      ))}
    
      {/* Konami code activation message */}
      {showDevMessage && (
        <div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-pulse"
          role="alert"
          aria-live="polite"
        >
          🎮 Developer mode activated! Brain constellation enhanced.
        </div>
      )}
      
      {/* Hero Section */}
      <main id="main-content" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center z-10 pt-16">
          {/* Site name with scroll animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_12px_rgba(0,0,0,0.8)] mt-20"
            id="site-title"
          >
            {site.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 text-balance dark:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000] dark:drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]"
            aria-describedby="site-title"
          >
            {site.headline}
          </motion.p>
          
          {/* Terminal-style bio with typewriter effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl font-mono mb-12 max-w-2xl mx-auto bg-background/80 dark:bg-background/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50 shadow-lg"
            role="region"
            aria-label="Bio with typewriter effect"
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
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            aria-label="Main actions"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors group cursor-pointer"
              aria-describedby="view-projects-desc"
            >
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <span id="view-projects-desc" className="sr-only">
              Explore my portfolio of web applications and projects
            </span>
            
            <Link
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              aria-describedby="resume-desc"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </Link>
            <span id="resume-desc" className="sr-only">
              Download PDF resume - opens in new window
            </span>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              aria-describedby="contact-desc"
            >
              Get in Touch
            </Link>
            <span id="contact-desc" className="sr-only">
              Contact me via the contact form
            </span>
          </motion.nav>
          
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex justify-center"
            role="complementary"
            aria-label="Social media links"
          >
            <SocialIcons />
          </motion.div>
        </div>
      </main>
      
      {/* Newsletter Section with parallax */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40 backdrop-blur-sm bg-background/80"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold text-foreground mb-3"
            id="newsletter-heading"
          >
            Stay Updated
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted-foreground mb-6"
          >
            Get notified about new projects and insights on technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border/40 rounded-lg p-4 bg-card/80 backdrop-blur-sm"
            role="complementary"
          >
            {/* <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-2xl font-bold text-foreground">{subscriberCount}</div>
              <div className="text-sm text-muted-foreground">
                subscriber{subscriberCount !== 1 ? 's' : ''}
              </div>
            </div> */}
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                disabled={isSubscribing}
                className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubscribing || !email.trim()}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubscribing ? 'Joining...' : 'Join'}
              </button>
            </form>
            
            {subscribeMessage && (
              <p className={`mt-3 text-sm ${subscribeMessage.includes('Thanks') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {subscribeMessage}
              </p>
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
