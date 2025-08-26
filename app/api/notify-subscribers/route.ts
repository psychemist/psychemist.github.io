import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { statements } from "@/lib/database"
import { siteConfig } from "@/site.config"

const notifySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  publishedAt: z.string().optional(),
  author: z.string().default("Chukwudike"),
  // Add an API key for security
  apiKey: z.string().min(1, "API key is required")
})

async function sendBlogNotification(
  subscriberEmails: string[],
  postData: {
    title: string
    slug: string
    excerpt: string
    publishedAt?: string
    author: string
  }
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV MODE] Blog notification would be sent to:", subscriberEmails.length, "subscribers")
    console.log("Post:", postData)
    return { success: true, devMode: true, sentTo: subscriberEmails.length }
  }

  const siteUrl = siteConfig.url
  const postUrl = `${siteUrl}/blog/${postData.slug}`
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'newsletter@psychemist.dev',
        to: subscriberEmails,
        subject: `New post: ${postData.title}`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">${postData.title}</h1>
            <p style="color: #6b7280; margin-bottom: 20px;">
              By ${postData.author} • ${postData.publishedAt ? new Date(postData.publishedAt).toLocaleDateString() : 'Just published'}
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6;">${postData.excerpt}</p>
            </div>
            
            <div style="margin: 30px 0; text-align: center;">
              <a href="${postUrl}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500;">
                Read the full post →
              </a>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <p>You're receiving this because you subscribed to updates from my portfolio.</p>
              <p>Want to unsubscribe? <a href="${siteUrl}/unsubscribe?email=EMAIL_PLACEHOLDER" style="color: #2563eb;">Click here</a> or reply with "unsubscribe".</p>
              <p><a href="${siteUrl}" style="color: #2563eb;">Visit my portfolio</a></p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Resend API error: ${response.status} - ${errorData}`)
    }

    const result = await response.json()
    return { success: true, sentTo: subscriberEmails.length, messageId: result.id }
    
  } catch (error) {
    console.error("Blog notification failed:", error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send notification' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const postData = notifySchema.parse(body)

    // Verify API key for security
    if (postData.apiKey !== process.env.BLOG_NOTIFY_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Get confirmed subscribers from database
    const confirmedSubscribers = statements.getActiveSubscribers.all() as Array<{ email: string }>
    const subscriberEmails = confirmedSubscribers.map(sub => sub.email)

    if (subscriberEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers to notify',
        sentTo: 0
      })
    }

    // Send notifications
    const result = await sendBlogNotification(subscriberEmails, {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      publishedAt: postData.publishedAt,
      author: postData.author
    })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send notifications', message: result.error },
        { status: 500 }
      )
    }

    const message = result.devMode 
      ? `Dev mode: Would notify ${result.sentTo} subscribers about "${postData.title}"` 
      : `Successfully notified ${result.sentTo} subscribers about "${postData.title}"`

    return NextResponse.json({
      success: true,
      message,
      sentTo: result.sentTo,
      messageId: result.messageId
    })

  } catch (error) {
    console.error('Blog notify error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', message: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'This endpoint only accepts POST requests.' },
    { status: 405 }
  )
}