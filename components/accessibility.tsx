import React from 'react'
import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "transition-all duration-200 ease-in-out",
        "font-medium text-sm",
        className
      )}
    >
      {children}
    </a>
  )
}

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

export function ScreenReaderOnly({ children, className }: ScreenReaderOnlyProps) {
  return (
    <span className={cn("sr-only", className)} aria-live="polite">
      {children}
    </span>
  )
}

interface FocusTrapProps {
  children: React.ReactNode
  enabled?: boolean
}

export function FocusTrap({ children, enabled = true }: FocusTrapProps) {
  const trapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!enabled || !trapRef.current) return

    const trap = trapRef.current
    const focusableElements = trap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
      
      if (e.key === 'Escape') {
        firstElement?.focus()
      }
    }

    trap.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => trap.removeEventListener('keydown', handleKeyDown)
  }, [enabled])

  return (
    <div ref={trapRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}

// Enhanced color contrast utilities
export const accessibilityColors = {
  // WCAG AA compliant color combinations
  highContrast: {
    text: 'hsl(var(--foreground))',
    background: 'hsl(var(--background))',
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
  },
  // Focus indicators
  focusRing: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
} as const

// Touch target size utilities (minimum 44px for mobile)
export const touchTargets = {
  minimum: 'min-h-[44px] min-w-[44px]',
  comfortable: 'min-h-[48px] min-w-[48px]',
  large: 'min-h-[56px] min-w-[56px]',
} as const

// Alias for backward compatibility
export const AccessibleSkipLinks = SkipLink