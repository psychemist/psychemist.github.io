"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Beaker, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Alchemist Icon with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Beaker className="h-24 w-24 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-4xl mb-4">🧪</div>
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Page Still Cooking</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto text-balance">
          This page hasn&apos;t been brewed yet. My digital laboratory is always experimenting with new formulas.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Additional Navigation */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Or explore these sections:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link 
              href="/projects" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Projects
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link 
              href="/blog" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link 
              href="/contact" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}