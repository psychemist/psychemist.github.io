export interface Project {
  title: string
  slug: string
  category: 'hackathons' | 'personal'
  summary: string
  body: string
  tags: string[]
  role: string
  date: string
  links: {
    demo?: string
    repo?: string
  }
  coverImage?: string
  gallery?: string[]
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  body: string
  tags: string[]
  publishedAt: string
  readingTime?: number
}

export interface Profile {
  name: string
  headline: string
  location: string
  bioFormal: string
  emailPublic: string
  socials: {
    github: string
    linkedin: string
    twitter: string
    substack: string
  }
  resumeUrl: string
}