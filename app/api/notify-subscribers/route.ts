import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { statements } from "@/lib/database"
import { siteConfig } from "@/site.config"
import { BlogNotificationEmail } from "@/components/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

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
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'newsletter@psychemist.dev',
      to: subscriberEmails,
      subject: `New post: ${postData.title}`,
      react: BlogNotificationEmail({
        ...postData,
        siteUrl
      }),
    })

    if (error) {
      throw new Error(`Resend API error: ${JSON.stringify(error)}`)
    }

    return { success: true, sentTo: subscriberEmails.length, data }
    
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
      data: result.data
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