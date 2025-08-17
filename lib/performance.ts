import React, { Suspense, useState, useEffect } from 'react'

// Performance API type definitions
interface LayoutShift extends PerformanceEntry {
  value: number
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
}

// Performance monitoring utilities
export const performance = {
  // Web Vitals tracking
  getCLS: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1] as LayoutShift
        resolve(lastEntry.value)
      }).observe({ entryTypes: ['layout-shift'] })
    })
  },

  getFID: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0] as PerformanceEventTiming
        resolve(firstInput.processingStart - firstInput.startTime)
      }).observe({ entryTypes: ['first-input'] })
    })
  },

  getLCP: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        resolve(lastEntry.startTime)
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    })
  },

  // Resource loading optimization
  preloadResource: (href: string, as: 'script' | 'style' | 'font' | 'image') => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (as === 'font') {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  },

  // Critical resource hints
  prefetchResource: (href: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  },
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
} = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<Element | null>(null)
  
  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    if (!node || frozen) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => setEntry(entry), observerParams)
    
    observer.observe(node)

    return () => observer.disconnect()
  }, [node, frozen, threshold, root, rootMargin])

  return [setNode, entry] as const
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image sizes
  generateSrcSet: (src: string, sizes: number[] = [640, 768, 1024, 1280, 1536]) => {
    return sizes
      .map(size => `${src}?w=${size}&q=75 ${size}w`)
      .join(', ')
  },

  // Optimal sizes attribute for responsive images
  getOptimalSizes: (breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    'default': '33vw'
  }) => {
    const entries = Object.entries(breakpoints)
    const mediaQueries = entries.slice(0, -1).map(([query, size]) => `${query} ${size}`)
    const defaultSize = entries[entries.length - 1][1]
    return [...mediaQueries, defaultSize].join(', ')
  },
}

// Bundle splitting utilities
export const bundleOptimization = {
  // Dynamic import with loading state
  dynamicImport: async <T>(importFn: () => Promise<{ default: T }>) => {
    const mod = await importFn()
    return mod.default
  },

  // Lazy load component with suspense
  lazyLoadComponent: <P extends Record<string, unknown>>(
    importFn: () => Promise<{ default: React.ComponentType<P> }>,
    fallback?: React.ReactNode
  ) => {
    const LazyComponent = React.lazy(importFn) as React.LazyExoticComponent<React.ComponentType<P>>
    
    return (props: P) =>
      React.createElement(
        Suspense,
        { fallback: fallback || React.createElement('div', null, 'Loading...') },
        React.createElement(LazyComponent, props)
      )
  },
}

// Memory optimization
export const memoryOptimization = {
  // Debounce hook to prevent excessive re-renders
  useDebounce: <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay)
      return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
  },

  // Throttle function for scroll/resize events
  throttle: <T extends (...args: unknown[]) => unknown>(func: T, limit: number) => {
    let inThrottle: boolean
    return function(this: unknown, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  // Cleanup function for event listeners
  useEventListener: (
    eventName: string,
    handler: (event: Event) => void,
    element: EventTarget = window
  ) => {
    useEffect(() => {
      element.addEventListener(eventName, handler)
      return () => element.removeEventListener(eventName, handler)
    }, [eventName, handler, element])
  },
}

// Font loading optimization
export const fontOptimization = {
  // Preload critical fonts
  preloadFonts: (fonts: string[]) => {
    fonts.forEach(font => {
      performance.preloadResource(font, 'font')
    })
  },

  // Font display optimization
  fontDisplay: {
    swap: 'font-display: swap;',
    optional: 'font-display: optional;',
    fallback: 'font-display: fallback;',
  },
}

export default performance