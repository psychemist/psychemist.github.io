import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Subscriber validation schema
const subscribeSchema = z.object({
  email: z.email("Please enter a valid email address"),
  name: z.string().min(2, "Name is required").max(100, "Name must be less than 100 characters").optional()
})

// Simple in-memory storage (replace with database in production)
const subscribers = new Map<string, { email: string; name?: string; subscribedAt: Date; confirmed: boolean }>()

async function sendWelcomeEmail(email: string, name?: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV MODE] Welcome email would be sent to:", email)
    return { success: true, devMode: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'newsletter@yourdomain.com', // Replace with your verified domain
        to: [email],
        subject: 'Welcome to my newsletter! 🚀',
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
            <h2 style="color: #2563eb;">Thanks for subscribing${name ? `, ${name}` : ''}! 🎉</h2>
            
            <p>You're now subscribed to get updates about:</p>
            <ul style="color: #374151;">
              <li>New projects and coding adventures</li>
              <li>Insights on AI, web development, and technology</li>
              <li>Behind-the-scenes content and lessons learned</li>
            </ul>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>What's next?</strong></p>
              <p style="margin: 10px 0 0 0;">I'll send you an email whenever I publish something new. No spam, just quality content!</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <p>Want to unsubscribe? Reply to this email with "unsubscribe" and I'll remove you immediately.</p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Welcome email failed:", error)
    return { success: false, error: 'Failed to send welcome email' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = subscribeSchema.parse(body)

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Already subscribed', message: 'This email is already subscribed!' },
        { status: 400 }
      )
    }

    // Add subscriber
    subscribers.set(email, {
      email,
      name,
      subscribedAt: new Date(),
      confirmed: true // In production, you'd want email confirmation
    })

    // Send welcome email
    await sendWelcomeEmail(email, name)

    return NextResponse.json({
      success: true,
      message: `Thanks for subscribing${name ? `, ${name}` : ''}! Check your email for a welcome message.`
    })

  } catch (error) {
    console.error('Subscribe error:', error)

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
  // Return subscriber count (for your homepage)
  const confirmedSubscribers = Array.from(subscribers.values()).filter(sub => sub.confirmed)
  
  return NextResponse.json({
    count: confirmedSubscribers.length,
    subscribers: confirmedSubscribers.map(sub => ({ email: sub.email, name: sub.name, subscribedAt: sub.subscribedAt }))
  })
}

// Export subscribers for use in other API routes
export { subscribers }