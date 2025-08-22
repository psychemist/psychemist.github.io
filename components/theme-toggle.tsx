"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { touchTargets, accessibilityColors } from "./accessibility"

export function ThemeToggle({ 
  showLabel = false, 
  className 
}: { 
  showLabel?: boolean
  className?: string 
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          touchTargets.minimum,
          "h-8 px-2",
          showLabel ? "w-auto" : "w-8 px-0",
          accessibilityColors.focusVisible,
          className
        )}
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        {showLabel && <span className="ml-2">Theme</span>}
        <span className="sr-only">Loading theme preference</span>
      </Button>
    )
  }

  const isDark = theme === "dark"
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        touchTargets.minimum,
        "h-8 px-2 hover:bg-accent hover:text-accent-foreground transition-colors",
        showLabel ? "w-auto justify-start" : "w-8 px-0 justify-center",
        accessibilityColors.focusVisible,
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      role="switch"
      aria-checked={isDark}
    >
      <div className="relative flex items-center">
        <Sun 
          className={cn(
            "h-4 w-4 transition-all duration-300",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
        <Moon 
          className={cn(
            "absolute h-4 w-4 transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
      <span className="sr-only">
        {isDark ? "Currently in dark mode" : "Currently in light mode"}
      </span>
    </Button>
  )
}
