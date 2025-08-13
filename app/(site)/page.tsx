import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { site } from "@/site.config"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Starfield background will be added in Phase 3 */}
      <div className="starfield-canvas" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {site.name}
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 text-balance">
            {site.headline}
          </p>
          
          <p className="text-lg sm:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
            {site.bioFormal}
          </p>
          
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
              className="inline-flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
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
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get notified about new projects, blog posts, and thoughts on the future of technology.
          </p>
          
          {/* Newsletter signup placeholder - will be replaced with actual Substack embed */}
          <div className="border border-border/40 rounded-lg p-6 bg-card">
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

/* Easter egg: Home page that welcomes visitors like a digital front porch 🏠 */