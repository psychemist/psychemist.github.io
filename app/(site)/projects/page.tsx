export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Projects
        </h1>
        
        {/* Filter tabs placeholder - will be implemented in Phase 4 */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-primary py-2 px-1 text-sm font-medium text-primary">
                All
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border">
                Hackathons
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border">
                Personal
              </button>
            </nav>
          </div>
        </div>
        
        {/* Project cards placeholder */}
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Project showcases coming in Phase 4 🚀
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Will feature filterable project cards with categories, tags, and detailed views
          </p>
        </div>
      </div>
    </div>
  )
}
