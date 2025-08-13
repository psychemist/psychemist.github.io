import Link from "next/link"
import React from "react"

export function AccessibleSkipLinks() {
  return (
    <nav aria-label="Skip links" className="sr-only focus-within:not-sr-only">
      <Link
        href="#main-content"
        className="absolute top-4 left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transform -translate-y-16 focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </Link>
      <Link
        href="#navigation"
        className="absolute top-4 left-36 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transform -translate-y-16 focus:translate-y-0 transition-transform"
      >
        Skip to navigation
      </Link>
    </nav>
  )
}

export function ScreenReaderOnly({ 
  children, 
  as = "span",
  ...props 
}: {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
} & React.HTMLAttributes<HTMLElement>) {
  const Component = as as React.ElementType
  return (
    <Component className="sr-only" {...props}>
      {children}
    </Component>
  )
}