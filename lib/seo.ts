import { Metadata } from 'next'
import { siteConfig } from '@/site.config'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}

export function generateSEOMetadata({
  title,
  description = siteConfig.description,
  image = `${siteConfig.url}/og-default.png`,
  url = siteConfig.url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  tags = [],
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const canonicalUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`

  return {
    title: fullTitle,
    description,
    keywords: tags.length > 0 ? tags.join(', ') : siteConfig.keywords.join(', '),
    authors: authors.map(name => ({ name })),
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'en_US',
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.socials.twitter,
      images: [image],
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Additional metadata
    category: type === 'article' ? 'Technology' : undefined,
    
    // JSON-LD structured data will be handled separately
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  }
}

// JSON-LD structured data generators
export const structuredData = {
  // Website schema
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
      jobTitle: 'Full-Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Independent',
      },
      sameAs: [
        siteConfig.socials.twitter,
        siteConfig.socials.github,
        siteConfig.socials.linkedin,
      ].filter(Boolean),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }),

  // Person schema (for about/resume pages)
  person: () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: 'Full-Stack Developer',
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/profile.jpg`,
    sameAs: [
      siteConfig.socials.twitter,
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
    ].filter(Boolean),
    knowsAbout: [
      'JavaScript',
      'TypeScript', 
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Machine Learning',
      'Web Development',
      'Software Engineering',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Independent',
    },
  }),

  // Article schema (for blog posts)
  article: (post: {
    title: string
    description: string
    slug: string
    publishedAt: string
    modifiedAt?: string
    image?: string
    tags?: string[]
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || `${siteConfig.url}/og-default.png`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags?.join(', ') || '',
    articleSection: 'Technology',
  }),

  // Creative work schema (for projects)
  creativeWork: (project: {
    title: string
    description: string
    slug: string
    date: string
    tags?: string[]
    demo?: string
    repo?: string
    image?: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: project.image || `${siteConfig.url}/og-default.png`,
    dateCreated: project.date,
    creator: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: project.tags?.join(', ') || '',
    ...(project.demo && {
      sameAs: [project.demo, project.repo].filter(Boolean),
    }),
  }),

  // Breadcrumb schema
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
}

// SEO utilities
export const seoUtils = {
  // Generate reading time estimate
  calculateReadingTime: (content: string): string => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  },

  // Generate excerpt from content
  generateExcerpt: (content: string, maxLength: number = 160): string => {
    const cleaned = content.replace(/[#*`]/g, '').trim()
    return cleaned.length > maxLength 
      ? cleaned.substring(0, maxLength).trim() + '...'
      : cleaned
  },

  // Validate and format URLs
  formatUrl: (path: string): string => {
    return path.startsWith('/') ? `${siteConfig.url}${path}` : path
  },

  // Generate social sharing URLs
  socialSharing: {
    twitter: (text: string, url: string) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    
    linkedin: (title: string, url: string, summary?: string) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    
    facebook: (url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    
    reddit: (title: string, url: string) => 
      `https://reddit.com/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
}