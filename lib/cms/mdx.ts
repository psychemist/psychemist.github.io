import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'
import { site } from '@/site.config'

const contentDirectory = path.join(process.cwd(), 'content')

// Types for our content
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id?: string
  title: string
  slug: string
  category: 'hackathons' | 'personal'
  summary: string
  body?: unknown // Rich content from Sanity or HTML from MDX
  content?: string // HTML content for MDX fallback
  tags: string[]
  role?: string
  date: string
  links?: {
    demo?: string
    repo?: string
  }
  coverImage?: SanityImage | string
  gallery?: SanityImage[]
  readingTime?: string
}

export interface Post {
  _id?: string
  title: string
  slug: string
  excerpt: string
  body?: unknown // Rich content from Sanity or HTML from MDX
  content?: string // HTML content for MDX fallback
  tags: string[]
  publishedAt: string
  readingTime?: string
  featured?: boolean
  coverImage?: SanityImage | string
}

export interface Profile {
  _id?: string
  name: string
  headline: string
  location: string
  bio_formal: string
  email_public: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    substack?: string
  }
  resume_url: string
  avatar?: SanityImage | string
  skills?: string[]
  newsletter?: {
    provider: string
    embedUrl?: string
    description?: string
  }
}

// MDX content processing
async function processMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content)
  return result.toString()
}

// Calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Get all projects from MDX files
export async function getMDXProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDirectory, 'projects')
  
  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const filenames = fs.readdirSync(projectsDir)
  const projects = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(projectsDir, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const {data, content} = matter(fileContents)
        
        const htmlContent = await processMarkdown(content)
        const readingTime = calculateReadingTime(content)

        return {
          title: data.title || filename.replace('.md', ''),
          slug: data.slug || filename.replace('.md', ''),
          category: data.category || 'personal',
          summary: data.summary || data.description || '',
          content: htmlContent,
          tags: data.tags || [],
          role: data.role,
          date: data.date || new Date().toISOString(),
          links: {
            demo: data.demo || data.demoUrl,
            repo: data.repo || data.repoUrl || data.github,
          },
          readingTime,
        } as Project
      })
  )

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get project by slug from MDX
export async function getMDXProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getMDXProjects()
  return projects.find(project => project.slug === slug) || null
}

// Get all posts from MDX files
export async function getMDXPosts(): Promise<Post[]> {
  const postsDir = path.join(contentDirectory, 'posts')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const filenames = fs.readdirSync(postsDir)
  const posts = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(postsDir, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const {data, content} = matter(fileContents)
        
        const htmlContent = await processMarkdown(content)
        const readingTime = calculateReadingTime(content)

        return {
          title: data.title || filename.replace('.md', ''),
          slug: data.slug || filename.replace('.md', ''),
          excerpt: data.excerpt || data.description || content.slice(0, 200) + '...',
          content: htmlContent,
          tags: data.tags || [],
          publishedAt: data.publishedAt || data.date || new Date().toISOString(),
          readingTime,
          featured: data.featured || false,
        } as Post
      })
  )

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Get post by slug from MDX
export async function getMDXPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getMDXPosts()
  return posts.find(post => post.slug === slug) || null
}

// Get profile from site config as fallback
export function getMDXProfile(): Profile {
  return {
    name: site.name,
    headline: site.headline,
    location: site.location,
    bio_formal: site.bioFormal,
    email_public: site.author.email,
    socials: {
      github: site.socials.github,
      linkedin: site.socials.linkedin,
      twitter: site.socials.twitter,
      substack: site.socials.substack
    },
    resume_url: site.resumeUrl,
    newsletter: {
      provider: site.newsletterProvider,
      embedUrl: site.socials.substack,
      description: "thoughts on building, future tech, and staying human in the process"
    }
  }
}