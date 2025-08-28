import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cms, type Post, urlFor } from "@/lib/cms"

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await cms.getPostBySlug(slug)
  
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
          {'featured' in post && post.featured && (
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
            
            {post.readingTime && (
              <>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime}</span>
                </div>
                <span className="text-muted-foreground/60">•</span>
              </>
            )}
            
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{post.tags.length} tags</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
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
          {'coverImage' in post && post.coverImage && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={typeof post.coverImage === 'string' ? post.coverImage : urlFor(post.coverImage).url()}
                alt={`${post.title} cover image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <Card className="p-8 lg:p-12 bg-card/80 backdrop-blur-sm border-border/40">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.body && typeof post.body === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            ) : (
              <p className="text-muted-foreground italic">
                Content coming soon...
              </p>
            )}
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

export async function generateStaticParams() {
  try {
    const posts = await cms.getPosts()
    return posts.map((post: Post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for posts:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await cms.getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: 'coverImage' in post && post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: 'coverImage' in post && post.coverImage ? [post.coverImage] : [],
    },
  }
}