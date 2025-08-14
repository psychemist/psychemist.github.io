import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  project: {
    slug: string
    title: string
    summary: string
    tags: string[]
    category: "hackathons" | "personal"
    role: string
    date: string
    links: {
      demo?: string
      repo?: string
    }
    coverImage?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/80 backdrop-blur-sm">
      {/* Project Image */}
      <div className="aspect-video overflow-hidden bg-muted relative">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} preview`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-primary/60" />
            </div>
          </div>
        )}
        
        {/* Quick Links Overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-background transition-colors"
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          {project.links.repo && (
            <Link
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-background transition-colors"
              aria-label={`View ${project.title} repository`}
            >
              <Github className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={project.date}>{new Date(project.date).toLocaleDateString()}</time>
          <span className="text-muted-foreground/60">•</span>
          <span className="capitalize">{project.role}</span>
        </div>

        <Link href={`/projects/${project.slug}`} className="group/title">
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover/title:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}