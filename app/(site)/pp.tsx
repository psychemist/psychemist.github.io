import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { StarfieldContainer } from "@/components/starfield-container"
import { SocialIcons } from "@/components/social-icons"
import { generateSEOMetadata, structuredData } from "@/lib/seo"
import { siteConfig } from "@/site.config"

// Enhanced SEO metadata for homepage
export const metadata: Metadata = generateSEOMetadata({
  title: "Full-Stack Developer & AI Engineer",
  description: "Full-stack developer specializing in React, Next.js, Python, and AI/ML. Building innovative web applications and exploring the intersection of technology and human experience.",
  url: "/",
  type: "website",
})

export default function HomePage() {
  // JSON-LD structured data for homepage
  const websiteSchema = structuredData.website()
  const personSchema = structuredData.person()

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, personSchema])
        }}
      />

      <main id="main-content" className="relative min-h-screen overflow-hidden">
        {/* Starfield Background */}
        <StarfieldContainer className="absolute inset-0 -z-10" />
        
        {/* Hero Section */}
        <section 
          className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto max-w-4xl text-center">
            {/* Location Badge */}
            <Badge 
              variant="secondary" 
              className="mb-6 bg-background/80 backdrop-blur-sm border-border/40"
              aria-label="Current location"
            >
              <MapPin className="w-3 h-3 mr-1" aria-hidden="true" />
              {siteConfig.location}
            </Badge>

            {/* Main Heading */}
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Full-Stack Blockchain Developer &{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI Engineer
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Building innovative web applications and exploring the intersection of{" "}
              <span className="text-foreground font-medium">technology</span> and{" "}
              <span className="text-foreground font-medium">human experience</span>
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-2 mb-12" role="list" aria-label="Technology stack">
              {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'AI/ML'].map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="bg-background/40 backdrop-blur-sm border-border/40 text-muted-foreground"
                  role="listitem"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="font-medium">
                <Link href="/projects" aria-describedby="projects-description">
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link href="/resume" aria-describedby="resume-description">
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download Resume
                </Link>
              </Button>
            </div>

            {/* Hidden descriptions for screen readers */}
            <div className="sr-only">
              <p id="projects-description">
                Explore my portfolio of web applications, AI projects, and open-source contributions
              </p>
              <p id="resume-description">
                Download my resume to see my professional experience and technical skills
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center" aria-label="Social media links">
              <SocialIcons />
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section 
          className="py-16 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm border-t border-border/40"
          aria-labelledby="featured-work"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 id="featured-work" className="text-3xl font-bold text-foreground mb-4">
                Featured Work
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A selection of recent projects showcasing full-stack development and AI integration
              </p>
            </div>

            {/* Featured Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Project 1 */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/40">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/zk-medical-records.svg"
                    alt="ZK Medical Records project screenshot"
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    ZK Medical Records
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Privacy-preserving medical records using zero-knowledge proofs
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {['Solidity', 'ZK-SNARKs', 'React'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/projects/zk-medical-records">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Project 2 */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/40">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/digital-minimalism-platform.svg"
                    alt="Digital Minimalism Platform project screenshot"
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Digital Minimalism Platform
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Web app helping users build healthier technology habits
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {['Next.js', 'PostgreSQL', 'TypeScript'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/projects/digital-minimalism-platform">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Project 3 */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/40">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/neural-trading-bot.svg"
                    alt="Neural Trading Bot project screenshot"
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Neural Trading Bot
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    AI-powered cryptocurrency trading with neural networks
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {['Python', 'TensorFlow', 'AI/ML'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/projects/neural-trading-bot">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          aria-labelledby="contact-cta"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 id="contact-cta" className="text-3xl font-bold text-foreground mb-4">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and collaborations. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
            <Button asChild size="lg" className="font-medium">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
