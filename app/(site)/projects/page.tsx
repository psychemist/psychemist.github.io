"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"

// Seed project data - TODO: Replace with CMS/MDX content in Phase 5
const SEED_PROJECTS = [
  // Hackathon Projects
  {
    slug: "zk-medical-records",
    title: "ZK Medical Records",
    summary: "Privacy-preserving medical record system using zero-knowledge proofs. Patients can prove health conditions without revealing sensitive data.",
    tags: ["solidity", "zk", "privacy", "healthcare"],
    category: "hackathons" as const,
    role: "full-stack developer",
    date: "2024-09-15",
    links: {
      demo: "https://demo.example.com/zk-medical",
      repo: "https://github.com/example/zk-medical-records"
    },
    coverImage: "/images/projects/zk-medical-placeholder.png"
  },
  {
    slug: "neural-trading-bot",
    title: "Neural Trading Bot",
    summary: "AI-powered cryptocurrency trading bot that uses neural networks to analyze market patterns and execute trades autonomously.",
    tags: ["python", "ai", "trading", "tensorflow"],
    category: "hackathons" as const,
    role: "ml engineer",
    date: "2024-07-20",
    links: {
      repo: "https://github.com/example/neural-trading-bot"
    }
  },
  
  // Personal Projects  
  {
    slug: "digital-minimalism-platform",
    title: "Digital Minimalism Platform",
    summary: "Web app helping users reduce digital clutter and build healthier technology habits through mindful usage tracking.",
    tags: ["react", "next.js", "postgresql", "wellness"],
    category: "personal" as const,
    role: "creator",
    date: "2024-11-03",
    links: {
      demo: "https://demo.example.com/digital-minimalism",
      repo: "https://github.com/example/digital-minimalism"
    },
    coverImage: "/images/projects/digital-minimalism-placeholder.png"
  },
  {
    slug: "calm-focus-timer",
    title: "Calm Focus Timer",
    summary: "Beautiful Pomodoro timer with ambient sounds, progress tracking, and integration with productivity workflows.",
    tags: ["typescript", "react", "pwa", "productivity"],
    category: "personal" as const,
    role: "designer & developer",
    date: "2024-05-12",
    links: {
      demo: "https://demo.example.com/calm-focus",
      repo: "https://github.com/example/calm-focus-timer"
    }
  }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "hackathons" | "personal">("all")
  
  const hackathonProjects = SEED_PROJECTS.filter(p => p.category === "hackathons")
  const personalProjects = SEED_PROJECTS.filter(p => p.category === "personal")

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
                All ({SEED_PROJECTS.length})
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
                {SEED_PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
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
                {hackathonProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
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
                {personalProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 border border-border/40 rounded-xl bg-card/80 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-muted-foreground mb-6">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}
