export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <a
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Projects
          </a>
        </div>
        
        {/* Project detail placeholder */}
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Project: {params.slug}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Detailed project view coming in Phase 4 🎨
          </p>
          <p className="text-sm text-muted-foreground">
            Will feature MDX content, image galleries, tags, and links
          </p>
        </div>
      </div>
    </div>
  )
}