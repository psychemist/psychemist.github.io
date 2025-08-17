"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { touchTargets, accessibilityColors } from "./accessibility"

export function ThemeToggle() {
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
          "h-8 w-8 px-0",
          accessibilityColors.focusVisible
        )}
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
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
        "h-8 w-8 px-0 hover:bg-accent hover:text-accent-foreground",
        accessibilityColors.focusVisible
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      role="switch"
      aria-checked={isDark}
    >
      <Sun 
        className={cn(
          "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
          isDark && "sr-only"
        )} 
        aria-hidden={isDark}
      />
      <Moon 
        className={cn(
          "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
          !isDark && "sr-only"
        )}
        aria-hidden={!isDark}
      />
      <span className="sr-only">
        {isDark ? "Currently in dark mode" : "Currently in light mode"}
      </span>
    </Button>
  )
}
