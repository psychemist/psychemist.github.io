"use client"

import { motion } from "framer-motion"
import { Download, Eye, MapPin, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { site } from "@/site.config"
import { SocialIcons } from "@/components/social-icons"

export default function ResumePage() {
  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Resume
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Software engineer with a medical background, building thoughtful solutions at the intersection of technology and human wellbeing.
          </p>
          
          {/* Download Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-8 border-b border-border/40">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{site.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">{site.headline}</p>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{site.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <Link 
                    href={`mailto:${site.author.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {site.author.email}
                  </Link>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-0">
                <SocialIcons />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {site.bioFormal}
              </p>
              <p>Passionate about creating technology that enhances human potential while
                maintaining ethical standards and accessibility. Experience spans full-stack development, 
                AI/ML applications, and privacy-preserving systems.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Core Technologies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Python", "PostgreSQL", "Redis"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Specialized</h4>
                  <div className="flex flex-wrap gap-2">
                    {["AI/ML", "Blockchain", "Privacy Tech", "Healthcare IT"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Notable Projects</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">ZK Medical Records System</h4>
                    <Badge variant="secondary">2024</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Privacy-preserving healthcare data management using zero-knowledge proofs. 
                    Built with Solidity, React, and cryptographic libraries.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Background */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Education & Background</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Computer Science Student</h4>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Currently pursuing computer science studies with focus on software engineering, 
                    embedded sytems, algorithms, and system design. Bridging theoretical foundations 
                    with practical development experience.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                  <h4 className="font-medium text-foreground">Medical Doctor (M.B.B.S, Nigeria)</h4>
                  <p className="text-sm text-muted-foreground">
                    Medical degree provides unique perspective on healthcare technology challenges 
                    and human-centered design principles.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* PDF Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-6 border border-border/40 rounded-xl bg-card/60 backdrop-blur-sm"
        >
          <Eye className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Complete Resume Available
          </h3>
          <p className="text-muted-foreground mb-4">
            Download the full PDF version for detailed work experience, projects, and references.
          </p>
          <Button asChild>
            <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Resume
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
