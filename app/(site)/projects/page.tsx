"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"

interface Project {
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

interface ProjectsPageProps {
  projects: Project[]
}

function ProjectsPageContent({ projects }: ProjectsPageProps) {
  const hackathonProjects = projects.filter(p => p.category === "hackathons")
  const personalProjects = projects.filter(p => p.category === "personal")

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of hackathon experiments and personal projects exploring the intersection of technology, healthcare, and human potential.
          </p>
        </motion.div>

        {/* Project Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                All ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="hackathons" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                Hackathons ({hackathonProjects.length})
              </TabsTrigger>
              <TabsTrigger value="personal" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                Personal ({personalProjects.length})
              </TabsTrigger>
            </TabsList>

            {/* All Projects */}
            <TabsContent value="all">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      No projects available yet.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check back soon for updates on my latest work!
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Hackathon Projects */}
            <TabsContent value="hackathons">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {hackathonProjects.length > 0 ? (
                  hackathonProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      No hackathon projects available yet.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I&apos;ll be sharing my hackathon experiments soon!
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Personal Projects */}
            <TabsContent value="personal">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {personalProjects.length > 0 ? (
                  personalProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      No personal projects available yet.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I&apos;m working on some exciting personal projects to share!
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 pt-12 border-t border-border/40"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            I&apos;m always open to discussing interesting projects, hackathons, or opportunities to build something meaningful together.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}

// Server Component wrapper
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const projectsData = await response.json()
          // Ensure projects have required fields with defaults
          const processedProjects = projectsData.map((project: Partial<Project>) => ({
            slug: project.slug || '',
            title: project.title || '',
            summary: project.summary || '',
            tags: project.tags || [],
            category: project.category || 'personal' as const,
            role: project.role || 'developer',
            date: project.date || new Date().toISOString(),
            links: project.links || {},
            coverImage: project.coverImage
          }))
          setProjects(processedProjects)
        } else {
          console.error('Failed to fetch projects')
          setProjects([])
        }
      } catch (error) {
        console.error('Failed to load projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </main>
    )
  }

  return <ProjectsPageContent projects={projects} />
}
