import { NextRequest, NextResponse } from "next/server"
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET!

// Sanity block content structure types
interface SanitySpan {
  _type: 'span'
  text: string
  marks?: string[]
}

interface SanityBlock {
  _type: 'block'
  children: SanitySpan[]
  style?: string
  markDefs?: unknown[]
}

interface SanityContent {
  _type: string
  [key: string]: unknown
}

type SanityBodyContent = (SanityBlock | SanityContent)[]

// Sanity webhook payload structure
interface SanityWebhookPayload {
  _type: string
  _id: string
  _rev?: string
  title?: string
  slug?: {
    current: string
  }
  excerpt?: string
  publishedAt?: string
  body?: SanityBodyContent
  author?: {
    name: string
  }
}

function extractExcerpt(body: SanityBodyContent | undefined, customExcerpt?: string): string {
  // Use custom excerpt if provided
  if (customExcerpt && customExcerpt.trim()) {
    return customExcerpt.trim()
  }
  
  // Otherwise extract from body content
  if (!body || !Array.isArray(body)) return 'New blog post published!'
  
  // Find the first text block and extract first ~150 characters
  for (const block of body) {
    if (block._type === 'block' && 'children' in block) {
      const sanityBlock = block as SanityBlock
      const text = sanityBlock.children
        .filter((child): child is SanitySpan => child._type === 'span' && Boolean(child.text))
        .map((child) => child.text)
        .join(' ')
      
      if (text.length > 10) {
        return text.length > 150 ? text.substring(0, 150) + '...' : text
      }
    }
  }
  
  return 'New blog post published!'
}

async function notifySubscribers(postData: {
  title: string
  slug: string
  excerpt: string
  publishedAt?: string
  author?: string
}) {
  const notificationUrl = process.env.NODE_ENV === 'production' 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/notify-subscribers`
    : 'http://localhost:3000/api/notify-subscribers'

  try {
    const response = await fetch(notificationUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...postData,
        apiKey: process.env.BLOG_NOTIFY_API_KEY
      })
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(`Notification API error: ${result.message}`)
    }
    
    return result
  } catch (error) {
    console.error('Failed to notify subscribers:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get(SIGNATURE_HEADER_NAME)

    if (!signature) {
      console.log('No signature header found')
      return NextResponse.json(
        { error: 'No signature header' }, 
        { status: 401 }
      )
    }

    if (!secret) {
      console.error('SANITY_WEBHOOK_SECRET is not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' }, 
        { status: 500 }
      )
    }

    // Verify the webhook signature
    const isValid = isValidSignature(body, signature, secret)
    
    if (!isValid) {
      console.log('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' }, 
        { status: 401 }
      )
    }

    const payload: SanityWebhookPayload = JSON.parse(body)
    
    console.log('📝 Sanity webhook received:', {
      type: payload._type,
      id: payload._id,
      title: payload.title,
      hasPublishedAt: !!payload.publishedAt,
      hasExcerpt: !!payload.excerpt
    })

    // Only process published blog posts
    if (payload._type !== 'post') {
      return NextResponse.json({ 
        message: 'Not a post, ignoring',
        received: payload._type 
      })
    }

    // Check if post is published (has publishedAt date)
    if (!payload.publishedAt) {
      return NextResponse.json({ 
        message: 'Post not published yet, ignoring' 
      })
    }

    // Check if publishedAt is in the future
    const publishDate = new Date(payload.publishedAt)
    const now = new Date()
    
    if (publishDate > now) {
      return NextResponse.json({ 
        message: 'Post scheduled for future, ignoring',
        publishedAt: payload.publishedAt
      })
    }

    // Validate required fields
    if (!payload.title || !payload.slug?.current) {
      return NextResponse.json({ 
        error: 'Missing required fields (title or slug)' 
      }, { status: 400 })
    }

    // Extract excerpt (prefer custom excerpt, fallback to auto-generated)
    const excerpt = extractExcerpt(payload.body, payload.excerpt)
    
    // Prepare notification data
    const notificationData = {
      title: payload.title,
      slug: payload.slug.current,
      excerpt,
      publishedAt: payload.publishedAt,
      author: payload.author?.name || 'Chukwudike'
    }

    console.log('📧 Sending subscriber notifications for:', notificationData.title)

    // Send notifications
    const result = await notifySubscribers(notificationData)
    
    return NextResponse.json({
      success: true,
      message: `Webhook processed successfully`,
      post: {
        title: payload.title,
        slug: payload.slug.current,
        publishedAt: payload.publishedAt,
        excerpt: excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '')
      },
      notification: {
        sentTo: result.sentTo || 0,
        messageId: result.messageId
      }
    })

  } catch (error) {
    console.error('Sanity webhook error:', error)
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed', 
      message: 'This webhook endpoint only accepts POST requests from Sanity.' 
    },
    { status: 405 }
  )
}