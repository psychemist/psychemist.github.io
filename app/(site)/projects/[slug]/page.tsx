import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cms, type Project, urlFor } from "@/lib/cms"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await cms.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm hover:text-foreground/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </nav>

      {/* Project Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Project Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {project.role}
              </div>
            </div>

            {/* Project Links */}
            {(project.links?.demo || project.links?.repo) && (
              <div className="flex gap-4">
                {project.links.demo && (
                  <Button asChild>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </a>
                  </Button>
                )}
                {project.links.repo && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Cover Image */}
          {project.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <Image
                src={typeof project.coverImage === 'string' ? project.coverImage : urlFor(project.coverImage).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Project Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {project.body && typeof project.body === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: project.body }} />
            ) : (
              <p className="text-muted-foreground italic">
                Project details coming soon...
              </p>
            )}
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image: string | { asset: { _ref: string } }, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
                  >
                    <Image
                      src={typeof image === 'string' ? image : urlFor(image).url()}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const projects = await cms.getProjects()
    return projects.map((project: Project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for projects:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await cms.getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [{ url: project.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [project.coverImage] : [],
    },
  }
}