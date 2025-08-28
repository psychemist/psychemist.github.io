"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Post {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  publishedAt: string
  readingTime?: string
  featured?: boolean
}

interface BlogPostCardProps {
  post: Post
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
          <span>{post.readingTime || 'Quick read'}</span>
        </div>

        <Link href={`/blog/${post.slug}`} className="group/title">
          <h3 className={`font-bold text-foreground mb-3 group-hover/title:text-primary transition-colors ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  )
}

interface BlogPageProps {
  posts: Post[]
}

function BlogPageContent({ posts }: BlogPageProps) {
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

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

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              I&apos;m working on some thoughtful posts about technology, healthcare, and building meaningful software. 
              Check back soon for updates!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Notified
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-16"
              >
                <div className="text-center mb-8">
                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
                    Featured Post
                  </Badge>
                </div>
                <BlogPostCard post={featuredPost} featured />
              </motion.div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <BlogPostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16 pt-12 border-t border-border/40"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Get notified when I publish new posts about technology, healthcare innovation, and thoughtful software development.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe to Updates
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </main>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (response.ok) {
          const postsData = await response.json()
          setPosts(postsData)
        } else {
          console.error('Failed to fetch posts')
          setPosts([])
        }
      } catch (error) {
        console.error('Failed to load posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </main>
    )
  }

  return <BlogPageContent posts={posts} />
}
