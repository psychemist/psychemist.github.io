import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MDXComponents } from "@/components/mdx-components"

// This would normally come from CMS or MDX files
const BLOG_DATA = {
  "building-in-public-failures": {
    slug: "building-in-public-failures",
    title: "Building in Public: The Beautiful Failures",
    excerpt: "Why sharing your failures publicly might be the most valuable thing you do as a developer.",
    tags: ["career", "learning", "building-in-public"],
    publishedAt: "2024-12-10",
    readingTime: "8 min read",
    featured: true,
    coverImage: "/images/blog/building-in-public-placeholder.png",
    content: `
# Building in Public: The Beautiful Failures

Three months ago, I decided to build my side projects completely in the open. Here's what I learned from the spectacular failures along the way.

## The Vulnerability Tax

Building in public means paying what I call the "vulnerability tax" - the emotional cost of sharing your mistakes, half-finished ideas, and embarrassing bugs with the world.

Most developers optimize for appearing competent. We share polished demos, success stories, and carefully curated portfolios. But what if we inverted this?

## My Public Failures

### The AI Writing Assistant That Nobody Wanted

I spent 6 weeks building an AI writing assistant for technical documentation. The problem? I never talked to a single technical writer before building it.

**What I learned:**
- User research isn't optional
- Building for yourself ≠ building for others
- Sometimes the market simply doesn't exist

### The Productivity App That Made Me Less Productive

Ironically, building a productivity app consumed so much time that I became less productive. The app was meant to solve my own problems, but I got so caught up in feature creep that I forgot the original goal.

**What I learned:**
- Scope creep is real, even for personal projects
- Sometimes the best solution is no solution
- Building tools to avoid work is still work

### The Social Network for Developers (Yes, Really)

I thought I could build "a better alternative to Twitter for developers." Six weeks and 40,000 lines of code later, I had built something that looked impressive but had zero users.

**What I learned:**
- Network effects are incredibly hard to bootstrap
- "Better" features don't guarantee adoption
- Distribution is often harder than building

## The Unexpected Benefits

### 1. Learning in Public Creates Accountability

When your code is public and your progress is documented, you can't lie to yourself about what you're actually accomplishing.

### 2. Failure Stories Connect More Than Success Stories

My most viral tweets have been about things that didn't work. People relate to struggle more than success.

### 3. The Compound Effect of Feedback

Public building creates multiple feedback loops:
- Code reviews from strangers who find your repo
- Product feedback from followers
- Career opportunities from visibility

## The Framework I Use Now

After these failures, I developed a simple framework for public building:

### Week 1: Problem Validation
- Tweet about the problem you're solving
- Ask: "Does anyone else struggle with this?"
- Collect responses before writing code

### Week 2-3: MVP in Public
- Stream coding sessions
- Share daily progress screenshots
- Ask for feedback on approach, not just features

### Week 4+: Iterate Based on Real Usage
- Share metrics (even if they're bad)
- Document what's working and what isn't
- Pivot publicly when needed

## The Meta-Learning

The biggest insight came from building this blog itself. I built it in public, shared the struggles with design decisions, and asked for feedback on content.

The result? More engagement with the building process than any of the failed products themselves.

> Sometimes the journey is more valuable than the destination.

## What's Next

I'm applying this framework to my current project: a digital minimalism platform. You can follow along as I make mistakes, iterate publicly, and hopefully build something people actually want.

The difference this time? I started by asking 50 people about their relationship with technology before writing a single line of code.

---

*Building in public isn't about being perfect. It's about being real. And in a world of polished portfolios and success theater, authenticity is the ultimate competitive advantage.*
    `
  },
  "future-of-work-ai": {
    slug: "future-of-work-ai",
    title: "The Future of Work: Human + AI Collaboration",
    excerpt: "How AI will augment human capabilities rather than replace them, and what this means for developers.",
    tags: ["ai", "future-of-work", "career"],
    publishedAt: "2024-11-28",
    readingTime: "12 min read",
    featured: false,
    coverImage: "/images/blog/future-work-ai-placeholder.png",
    content: `
# The Future of Work: Human + AI Collaboration

The narrative around AI and jobs tends toward extremes: either AI will replace all human workers, or it changes nothing. The reality is more nuanced and more interesting.

## Beyond Replacement: The Augmentation Model

Instead of replacing humans, AI excels at augmenting human capabilities. This isn't just about making us more productive - it's about expanding what's possible for human creativity and problem-solving.

### The Developer's New Toolkit

As developers, we're seeing this firsthand:
- AI pair programming assistants help with boilerplate
- Code generation tools handle repetitive patterns
- AI debugging tools surface insights we might miss

But the most valuable skill remains the same: **knowing what to build and why**.

## The Three Pillars of Human+AI Collaboration

### 1. Creative Problem Definition
AI is excellent at solving well-defined problems. Humans excel at identifying which problems are worth solving in the first place.

### 2. Contextual Decision Making
AI can process vast amounts of data, but humans understand nuance, culture, and the subtle factors that don't show up in datasets.

### 3. Ethical Reasoning
The most important decisions involve trade-offs between competing values. These require human judgment.

## What This Means for Developers

The developers who thrive in an AI-augmented world will be those who:

1. **Master the fundamentals** - AI tools are most effective when you understand what good code looks like
2. **Develop product sense** - Understanding user needs becomes more valuable as implementation becomes easier
3. **Cultivate judgment** - Knowing when to use AI tools and when to think from first principles

## The Paradox of Automation

Here's what's counterintuitive: as AI handles more routine tasks, the value of uniquely human skills increases. Creativity, empathy, and strategic thinking become more valuable, not less.

This isn't the first time we've seen this pattern. When calculators became common, mathematicians didn't become obsolete - they started tackling more complex problems.

## Preparing for the Transition

The key is intentionality. Instead of fearing AI, we can shape how it integrates into our work:

- **Experiment actively** - Try AI tools in low-stakes projects
- **Identify augmentation opportunities** - Where does AI make you more creative vs. more efficient?
- **Maintain agency** - Use AI as a tool, not a crutch

The future of work isn't human vs. AI - it's human + AI. And that future is already here.
    `
  },
  "digital-minimalism-practice": {
    slug: "digital-minimalism-practice",
    title: "Digital Minimalism: A Developer's Practice",
    excerpt: "How I reduced digital overwhelm while staying effective in a technology-driven career.",
    tags: ["digital-minimalism", "productivity", "wellness"],
    publishedAt: "2024-10-15",
    readingTime: "10 min read",
    featured: false,
    coverImage: "/images/blog/digital-minimalism-placeholder.png",
    content: `
# Digital Minimalism: A Developer's Practice

As developers, we live in digital environments. But that doesn't mean we can't apply minimalist principles to our relationship with technology.

## The Problem with Digital Maximalism

Most of us operate under an implicit assumption: more digital tools = better productivity. But this leads to:

- Notification overwhelm
- Context-switching fatigue
- Tool maintenance overhead
- Decision paralysis

## My Digital Minimalism Framework

### 1. Intentional Tool Selection

Instead of trying every new productivity app, I ask three questions:
- Does this solve a real problem I have?
- Is this the simplest solution to that problem?
- What am I giving up to use this tool?

### 2. Attention Protection

I treat attention as my most valuable resource:
- Phone in another room during deep work
- Notification batching (check 3x daily)
- Single-tasking as a default

### 3. Regular Digital Decluttering

Monthly reviews of:
- Apps on devices
- Subscriptions and accounts
- Information sources
- Digital files and bookmarks

## The Paradox of Choice in Developer Tools

We have infinite options for every category:
- Text editors: VS Code, Vim, Sublime, Atom...
- Note-taking: Notion, Obsidian, Roam, Apple Notes...
- Task management: Todoist, Things, Asana, Linear...

The minimalist approach: **pick one and stick with it**. The tool matters less than consistency.

## Practical Implementation

### Morning Routine
- No phone for first 30 minutes
- Read news once daily (not continuously)
- Set intention before opening laptop

### Work Environment
- Single monitor (controversial but effective)
- Minimal desktop/taskbar
- Close browser tabs aggressively
- Use Reader Mode for articles

### Evening Wind-Down
- Devices off 1 hour before bed
- Physical books over e-readers
- Analog activities (walking, cooking, music)

## The Results

After 6 months of digital minimalism:
- 40% reduction in screen time
- Better sleep quality
- Increased deep work sessions
- Less decision fatigue
- More present in relationships

## It's Not About Rejecting Technology

Digital minimalism isn't anti-technology. It's about **intentional technology use**. We can build digital products while maintaining healthy boundaries with our devices.

The goal isn't to use less technology - it's to use technology in service of what matters most.

---

*What would change if you treated your attention as carefully as you treat your code?*
    `
  }
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = BLOG_DATA[slug as keyof typeof BLOG_DATA]
  
  if (!post) {
    notFound()
  }

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          {/* Featured Badge */}
          {post.featured && (
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              Featured Post
            </Badge>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <span className="text-muted-foreground/60">•</span>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
            
            <span className="text-muted-foreground/60">•</span>
            
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{post.tags.length} tags</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={`${post.title} cover image`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Article Content */}
        <Card className="p-8 lg:p-12 bg-card/80 backdrop-blur-sm border-border/40">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* This would normally be MDX content */}
            <div dangerouslySetInnerHTML={{ 
              __html: post.content
                .split('\n')
                .map(line => {
                  if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold mb-6 mt-8 first:mt-0">${line.slice(2)}</h1>`
                  if (line.startsWith('## ')) return `<h2 class="text-2xl font-semibold mb-4 mt-8">${line.slice(3)}</h2>`
                  if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold mb-3 mt-6">${line.slice(4)}</h3>`
                  if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-primary pl-6 italic mb-6">${line.slice(2)}</blockquote>`
                  if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-semibold mb-4">${line.slice(2, -2)}</p>`
                  if (line.startsWith('- ')) return `<li class="mb-2">${line.slice(2)}</li>`
                  if (line.startsWith('1. ')) return `<li class="mb-2">${line.slice(3)}</li>`
                  if (line.startsWith('*') && line.endsWith('*') && line.length < 100) return `<p class="italic text-center text-muted-foreground mb-6">${line.slice(1, -1)}</p>`
                  if (line.trim() === '') return '<br>'
                  if (line.trim() === '---') return '<hr class="my-8 border-border">'
                  return `<p class="mb-6 leading-relaxed">${line}</p>`
                })
                .join('') 
            }} />
          </div>
        </Card>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Enjoyed this post?
              </h3>
              <p className="text-muted-foreground">
                Follow me for more thoughts on technology, minimalism, and building things.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                More Posts
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}