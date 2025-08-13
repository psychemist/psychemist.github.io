"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  prefix?: string
}

export function Typewriter({ text, speed = 50, className = "", prefix = "" }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)
    
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span className={className}>
      {prefix}{displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}