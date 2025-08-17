import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2023-12-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Check if Sanity is configured
export const isSanityConfigured = () => {
  return !!(
    process.env.SANITY_STUDIO_PROJECT_ID &&
    process.env.SANITY_STUDIO_DATASET
  )
}

// GROQ queries
export const queries = {
  // Get all projects
  projects: `*[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    category,
    summary,
    body,
    tags,
    role,
    date,
    links,
    coverImage,
    gallery,
    readingTime
  }`,

  // Get project by slug
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    summary,
    body,
    tags,
    role,
    date,
    links,
    coverImage,
    gallery,
    readingTime
  }`,

  // Get all posts
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    tags,
    publishedAt,
    readingTime,
    featured,
    coverImage
  }`,

  // Get post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    tags,
    publishedAt,
    readingTime,
    featured,
    coverImage
  }`,

  // Get profile
  profile: `*[_type == "profile"][0] {
    _id,
    name,
    headline,
    location,
    bio_formal,
    email_public,
    socials,
    resume_url,
    avatar,
    skills,
    newsletter
  }`,

  // Get projects by category
  projectsByCategory: `*[_type == "project" && category == $category] | order(date desc) {
    _id,
    title,
    slug,
    category,
    summary,
    tags,
    role,
    date,
    links,
    coverImage,
    readingTime
  }`,

  // Get featured posts
  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    tags,
    publishedAt,
    readingTime,
    coverImage
  }`,
}