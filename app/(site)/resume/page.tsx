import Link from "next/link"
import { Download, ExternalLink } from "lucide-react"
import { site } from "@/site.config"

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-0">
            Resume
          </h1>
          
          <Link
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        </div>
        
        {/* Resume content placeholder */}
        <div className="border border-border/40 rounded-lg bg-card p-8">
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Resume content coming in Phase 5 📄
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Will feature an embedded PDF viewer and downloadable resume
            </p>
            
            <div className="border border-border/40 rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                PDF will be served from {site.resumeUrl}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
