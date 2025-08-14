import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MDXComponents } from "@/components/mdx-components"

// This would normally come from CMS or MDX files
const PROJECTS_DATA = {
  "zk-medical-records": {
    slug: "zk-medical-records",
    title: "ZK Medical Records",
    summary: "Privacy-preserving medical record system using zero-knowledge proofs. Patients can prove health conditions without revealing sensitive data.",
    tags: ["solidity", "zk", "privacy", "healthcare"],
    category: "hackathons",
    role: "full-stack developer",
    date: "2024-09-15",
    links: {
      demo: "https://demo.example.com/zk-medical",
      repo: "https://github.com/example/zk-medical-records"
    } as { demo?: string; repo?: string },
    coverImage: "/images/projects/zk-medical-placeholder.png",
    gallery: [
      "/images/projects/zk-medical-1.png",
      "/images/projects/zk-medical-2.png",
      "/images/projects/zk-medical-3.png"
    ],
    readingTime: "12 min read",
    content: `
# Zero-Knowledge Medical Records: Privacy-First Healthcare

Building a healthcare data system that puts patient privacy first while enabling legitimate medical use cases.

## The Problem

Traditional medical record systems face a fundamental dilemma: they need to be accessible to authorized healthcare providers while protecting sensitive patient information. Current solutions often rely on access controls that can be bypassed or compromised.

## Our Approach

We developed a zero-knowledge proof system that allows patients to prove specific health conditions or medical history without revealing the underlying data.

### Key Features

- **Selective Disclosure**: Patients can prove they have condition X without revealing their full medical history
- **Cryptographic Verification**: All proofs are mathematically verifiable without trusted intermediaries
- **HIPAA Compliance**: Zero-knowledge proofs ensure compliance with privacy regulations
- **Interoperability**: Standards-based design works across different healthcare systems

## Technical Implementation

The system uses zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) implemented with Circom and the arkworks library.

\`\`\`solidity
contract MedicalRecordProof {
    mapping(address => bytes32) public commitments;
    
    function submitProof(
        bytes32 commitment,
        uint[8] calldata proof
    ) external {
        // Verify the zk-proof
        require(verifyProof(proof, commitment), "Invalid proof");
        commitments[msg.sender] = commitment;
    }
}
\`\`\`

## Impact & Results

- Built during ETHGlobal hackathon (48 hours)
- Won "Best Use of Privacy Technology" track
- Generated interest from 3 healthcare startups
- Patent application filed for the verification protocol

## What I Learned

This project taught me the practical challenges of implementing zero-knowledge systems in real-world applications. The biggest insight was that user experience is just as important as cryptographic security.

> "The best privacy technology is the one that people actually use." - This became our design principle.

## Future Directions

We're exploring partnerships with healthcare providers to pilot this system in controlled environments. The next phase focuses on:

1. Regulatory approval process
2. Integration with existing EMR systems
3. User-friendly mobile interface
4. Scalability optimizations
    `
  },
  "neural-trading-bot": {
    slug: "neural-trading-bot",
    title: "Neural Trading Bot",
    summary: "AI-powered cryptocurrency trading bot that uses neural networks to analyze market patterns and execute trades autonomously.",
    tags: ["python", "ai", "trading", "tensorflow"],
    category: "hackathons",
    role: "ml engineer",
    date: "2024-07-20",
    links: {
      repo: "https://github.com/example/neural-trading-bot"
    } as { demo?: string; repo?: string },
    coverImage: "/images/projects/neural-trading-placeholder.png",
    gallery: [
      "/images/projects/neural-trading-1.png",
      "/images/projects/neural-trading-2.png"
    ],
    readingTime: "8 min read",
    content: `
# Neural Trading Bot: AI-Powered Crypto Trading

An autonomous trading system that uses deep learning to identify profitable trading opportunities in cryptocurrency markets.

## Overview

This project explores the application of neural networks to cryptocurrency trading, focusing on pattern recognition and risk management.

## Architecture

The system consists of several key components:

1. **Data Pipeline**: Real-time market data ingestion
2. **Feature Engineering**: Technical indicators and sentiment analysis
3. **Neural Network**: LSTM-based prediction model
4. **Risk Management**: Position sizing and stop-loss mechanisms
5. **Execution Engine**: Order placement and portfolio management

## Results

- 15.7% returns over 3-month backtesting period
- Sharpe ratio of 1.24
- Maximum drawdown of 8.3%

*Note: Past performance does not guarantee future results.*
    `
  },
  "digital-minimalism-platform": {
    slug: "digital-minimalism-platform",
    title: "Digital Minimalism Platform",
    summary: "Web app helping users reduce digital clutter and build healthier technology habits through mindful usage tracking.",
    tags: ["react", "next.js", "postgresql", "wellness"],
    category: "personal",
    role: "creator",
    date: "2024-11-03",
    links: {
      demo: "https://demo.example.com/digital-minimalism",
      repo: "https://github.com/example/digital-minimalism"
    } as { demo?: string; repo?: string },
    coverImage: "/images/projects/digital-minimalism-placeholder.png",
    gallery: [
      "/images/projects/digital-minimalism-1.png",
      "/images/projects/digital-minimalism-2.png",
      "/images/projects/digital-minimalism-3.png"
    ],
    readingTime: "10 min read",
    content: `
# Digital Minimalism Platform: Mindful Technology Use

A comprehensive platform designed to help users develop healthier relationships with technology through awareness, intention, and community.

## The Problem

We live in an attention economy where our devices are designed to capture and hold our focus. Many people feel overwhelmed by digital distractions and struggle to use technology intentionally.

## Solution

The Digital Minimalism Platform provides tools and insights to help users:

- Track and understand their digital habits
- Set intentional boundaries with technology
- Find community support for mindful tech use
- Develop sustainable practices for long-term change

## Features

### Usage Tracking
Real-time monitoring of app usage, screen time, and digital interactions with privacy-first architecture.

### Mindful Interventions
Gentle prompts and friction moments to encourage intentional choices before engaging with distracting apps.

### Community Support
Connect with like-minded individuals on similar journeys toward mindful technology use.

### Progress Analytics
Beautiful visualizations showing your progress toward digital wellness goals.

## Technical Implementation

Built with Next.js and PostgreSQL, the platform prioritizes user privacy and data ownership.

\`\`\`typescript
// Example: Mindful pause component
const MindfulPause = ({ app }: { app: string }) => {
  return (
    <div className="pause-overlay">
      <h3>Take a moment</h3>
      <p>You're about to open {app}.</p>
      <p>What do you hope to accomplish?</p>
      <button onClick={continueToApp}>Continue</button>
      <button onClick={chooseAlternative}>Choose something else</button>
    </div>
  )
}
\`\`\`

## Impact

Since launching:
- 1,200+ active users
- Average 23% reduction in problematic screen time
- 89% user satisfaction rate
- Featured in Cal Newport's newsletter

## What's Next

Currently working on:
- Mobile app with deeper system integration
- AI-powered personalized recommendations
- Integration with popular productivity tools
- Research partnership with digital wellness lab
    `
  },
  "calm-focus-timer": {
    slug: "calm-focus-timer",
    title: "Calm Focus Timer",
    summary: "Beautiful Pomodoro timer with ambient sounds, progress tracking, and integration with productivity workflows.",
    tags: ["typescript", "react", "pwa", "productivity"],
    category: "personal",
    role: "designer & developer",
    date: "2024-05-12",
    links: {
      demo: "https://demo.example.com/calm-focus",
      repo: "https://github.com/example/calm-focus-timer"
    } as { demo?: string; repo?: string },
    coverImage: "/images/projects/calm-focus-placeholder.png",
    gallery: [
      "/images/projects/calm-focus-1.png",
      "/images/projects/calm-focus-2.png"
    ],
    readingTime: "6 min read",
    content: `
# Calm Focus Timer: Mindful Productivity

A beautiful, distraction-free Pomodoro timer designed to promote deep focus and mindful work sessions.

## Design Philosophy

The timer emphasizes calm, intention, and presence over aggressive productivity metrics. Every design decision prioritizes mental wellbeing alongside productivity.

## Key Features

- **Ambient Soundscapes**: Curated nature sounds and white noise
- **Breath-Paced Transitions**: Gentle breathing exercises between sessions
- **Progress Visualization**: Beautiful, non-anxiety-inducing progress tracking
- **Offline-First PWA**: Works without internet connection
- **Customizable Sessions**: Flexible timing for different types of work

## Technical Details

Built as a Progressive Web App using React and TypeScript, with a focus on performance and accessibility.

## User Feedback

> "Finally, a timer that doesn't make me feel guilty about taking breaks." - Sarah M.

> "The breathing exercises between sessions are a game-changer for my anxiety." - David L.

Currently used by 500+ daily active users with an average session completion rate of 78%.
    `
  }
} as const

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = PROJECTS_DATA[params.slug as keyof typeof PROJECTS_DATA]
  
  if (!project) {
    notFound()
  }

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
          <Image
            src={project.coverImage}
            alt={`${project.title} cover image`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="text-muted-foreground/60">•</span>
            <User className="w-4 h-4" />
            <span className="capitalize">{project.role}</span>
            <span className="text-muted-foreground/60">•</span>
            <span>{project.readingTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.links.demo && (
              <Button asChild>
                <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Demo
                </Link>
              </Button>
            )}
            {project.links.repo && (
              <Button variant="outline" asChild>
                <Link href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Project Content */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/40">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* This would normally be MDX content */}
            <div dangerouslySetInnerHTML={{ __html: project.content.split('\n').map(line => {
              if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`
              if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`
              if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`
              if (line.startsWith('> ')) return `<blockquote><p>${line.slice(2)}</p></blockquote>`
              if (line.startsWith('```')) return line.includes('```solidity') ? '<pre><code>' : '</code></pre>'
              if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`
              if (line.startsWith('1. ')) return `<li>${line.slice(3)}</li>`
              if (line.trim() === '') return '<br>'
              return `<p>${line}</p>`
            }).join('')}} />
          </div>
        </Card>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Project Gallery</h2>
            <MDXComponents.ProjectGallery images={project.gallery} />
          </div>
        )}

        {/* Related Projects CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Interested in similar work?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out my other projects or get in touch to discuss collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}