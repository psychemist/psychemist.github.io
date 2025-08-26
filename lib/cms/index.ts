import {client, queries, isSanityConfigured} from './sanity'
import {
  getMDXProjects,
  getMDXProjectBySlug,
  getMDXPosts,
  getMDXPostBySlug,
  type Project,
  type Post,
  type Profile,
} from './mdx'
import {site} from '../../site.config'

// Unified CMS interface - automatically chooses between Sanity and MDX
export class CMS {
  private useSanity: boolean

  constructor() {
    this.useSanity = isSanityConfigured()
  }

  async getProjects(): Promise<Project[]> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.projects)
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        return await getMDXProjects()
      }
    }
    return await getMDXProjects()
  }

  async getProjectsByCategory(category: 'hackathons' | 'personal'): Promise<Project[]> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.projectsByCategory, {category})
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        const projects = await getMDXProjects()
        return projects.filter(project => project.category === category)
      }
    }
    const projects = await getMDXProjects()
    return projects.filter(project => project.category === category)
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.projectBySlug, {slug})
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        return await getMDXProjectBySlug(slug)
      }
    }
    return await getMDXProjectBySlug(slug)
  }

  async getPosts(): Promise<Post[]> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.posts)
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        return await getMDXPosts()
      }
    }
    return await getMDXPosts()
  }

  async getFeaturedPosts(): Promise<Post[]> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.featuredPosts)
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        const posts = await getMDXPosts()
        return posts.filter(post => post.featured)
      }
    }
    const posts = await getMDXPosts()
    return posts.filter(post => post.featured)
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    if (this.useSanity) {
      try {
        return await client.fetch(queries.postBySlug, {slug})
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to MDX:', error)
        return await getMDXPostBySlug(slug)
      }
    }
    return await getMDXPostBySlug(slug)
  }

  async getProfile(): Promise<Profile> {
    if (this.useSanity) {
      try {
        const profile = await client.fetch(queries.profile)
        if (profile) return profile
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to site config:', error)
      }
    }
    
    // Fallback to site config
    return {
      name: site.name,
      headline: site.headline,
      location: site.location,
      bio_formal: site.bioFormal,
      email_public: site.author.email,
      socials: site.socials,
      resume_url: site.resumeUrl,
      newsletter: {
        provider: site.newsletterProvider || 'substack',
        embedUrl: site.socials.substack,
        description: "thoughts on building, future tech, and staying human in the process"
      }
    }
  }

  // Helper method to check which CMS is being used
  getProvider(): 'sanity' | 'mdx' {
    return this.useSanity ? 'sanity' : 'mdx'
  }
}

// Export singleton instance
export const cms = new CMS()

// Re-export types for convenience
export type {Project, Post, Profile}

// Re-export Sanity utilities for when needed
export {urlFor} from './sanity'