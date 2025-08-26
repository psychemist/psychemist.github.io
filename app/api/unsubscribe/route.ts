import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { statements } from "@/lib/database"

// Unsubscribe validation schema
const unsubscribeSchema = z.object({
  email: z.email("Please enter a valid email address"),
  reason: z.string().optional()
})

async function sendGoodbyeEmail(email: string, name?: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV MODE] Goodbye email would be sent to:", email)
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
        from: process.env.CONTACT_FROM_EMAIL || 'newsletter@psychemist.dev',
        to: [email],
        subject: "You've been unsubscribed",
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
            <h2 style="color: #6b7280;">Sorry to see you go${name ? `, ${name}` : ''}!</h2>
            
            <p>You've been successfully unsubscribed from my newsletter.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>What this means:</strong></p>
              <ul style="margin: 10px 0 0 0;">
                <li>You won't receive any more newsletter emails from me</li>
                <li>Your email has been removed from my subscriber list</li>
                <li>You can still contact me directly anytime</li>
              </ul>
            </div>
            
            <p>If you change your mind, you can always resubscribe on my website.</p>
            
            <p>Thanks for being part of the journey, even briefly! 🙏</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <p>This confirmation was sent to ensure you wanted to unsubscribe.</p>
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
    console.error("Goodbye email failed:", error)
    return { success: false, error: 'Failed to send goodbye email' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, reason } = unsubscribeSchema.parse(body)

    // Check if subscriber exists
    const subscriber = statements.getSubscriber.get(email) as { name?: string; email: string } | undefined
    if (!subscriber) {
      return NextResponse.json(
        { error: 'Not found', message: 'This email is not subscribed.' },
        { status: 404 }
      )
    }

    // Remove subscriber from database (soft delete)
    const result = statements.unsubscribeUser.run(email)
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Already unsubscribed', message: 'This email is already unsubscribed.' },
        { status: 400 }
      )
    }

    // Log the unsubscribe reason for analytics (optional)
    if (reason) {
      console.log(`Unsubscribe reason from ${email}: ${reason}`)
    }

    // Send goodbye email
    await sendGoodbyeEmail(email, subscriber.name)

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed. A confirmation email has been sent.'
    })

  } catch (error) {
    console.error('Unsubscribe error:', error)

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

// Handle GET requests for unsubscribe page
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email required', message: 'Email parameter is required for unsubscribe.' },
      { status: 400 }
    )
  }

  // Check if subscriber exists
  const subscriber = statements.getSubscriber.get(email) as { name?: string; email: string } | undefined
  if (!subscriber) {
    return NextResponse.json(
      { error: 'Not found', message: 'This email is not subscribed.' },
      { status: 404 }
    )
  }

  // Auto-unsubscribe for GET requests (one-click unsubscribe)
  statements.unsubscribeUser.run(email)
  await sendGoodbyeEmail(email, subscriber.name)

  return NextResponse.json({
    success: true,
    message: 'You have been successfully unsubscribed.',
    email: email
  })
}