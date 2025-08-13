export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Blog
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12">
          Thoughts on software engineering, medicine, and the intersection of technology and human experience.
        </p>
        
        {/* Blog posts placeholder */}
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Blog posts coming in Phase 4 📝
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Will feature MDX-powered posts with tags, search, and rich content
          </p>
        </div>
      </div>
    </div>
  )
}
