"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Seed blog post data - TODO: Replace with CMS/MDX content in Phase 5
const SEED_POSTS = [
  {
    slug: "building-in-public-failures",
    title: "Building in Public: Learning from Failures",
    excerpt: "Why I started documenting my project failures publicly and what it taught me about resilience in tech.",
    tags: ["reflection", "startups", "learning"],
    publishedAt: "2024-12-01",
    readingTime: "5 min read",
    featured: true
  },
  {
    slug: "zk-privacy-healthcare",
    title: "Zero-Knowledge Proofs in Healthcare",
    excerpt: "Exploring how cryptographic privacy could revolutionize medical data sharing while protecting patient confidentiality.",
    tags: ["privacy", "healthcare", "cryptography"],
    publishedAt: "2024-11-15",
    readingTime: "8 min read",
    featured: false
  },
  {
    slug: "digital-minimalism-developer",
    title: "Digital Minimalism for Developers",
    excerpt: "How reducing digital noise improved my focus and productivity as a software engineer.",
    tags: ["productivity", "wellness", "focus"],
    publishedAt: "2024-10-22",
    readingTime: "6 min read",
    featured: false
  }
]

interface BlogPostCardProps {
  post: typeof SEED_POSTS[0]
  featured?: boolean
}

function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Card className={`group overflow-hidden border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/80 backdrop-blur-sm ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="text-muted-foreground/60">•</span>
          <Clock className="w-4 h-4" />
          <span>{post.readingTime}</span>
        </div>

        <Link href={`/blog/${post.slug}`} className="group/title">
          <h2 className={`font-bold text-foreground mb-3 group-hover/title:text-primary transition-colors ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
        </Link>

        <p className={`text-muted-foreground mb-4 ${featured ? 'text-lg line-clamp-3' : 'line-clamp-2'}`}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium group/link"
          >
            Read more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default function BlogPage() {
  const featuredPost = SEED_POSTS.find(post => post.featured)
  const regularPosts = SEED_POSTS.filter(post => !post.featured)

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
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on technology, healthcare innovation, and building the future we want to see.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h2 className="text-lg font-semibold text-foreground">Featured</h2>
            </div>
            <BlogPostCard post={featuredPost} featured />
          </motion.div>
        )}

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-muted-foreground/50 rounded-full"></div>
            <h2 className="text-lg font-semibold text-foreground">Recent Posts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 p-8 border border-border/40 rounded-xl bg-card/80 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Never miss a post
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get notified when I publish new articles about technology, healthcare innovation, and future thinking.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Subscribe for Updates
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}
