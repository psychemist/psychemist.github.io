import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { statements } from "@/lib/database"
import { GoodbyeEmail } from "@/components/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'newsletter@psychemist.dev',
      to: [email],
      subject: "You've been unsubscribed",
      react: GoodbyeEmail({ firstName: name, email }),
    })

    if (error) {
      throw new Error(`Resend API error: ${JSON.stringify(error)}`)
    }

    return { success: true, data }
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
    const emailResult = await sendGoodbyeEmail(email, subscriber.name)
    
    if (!emailResult.success && !emailResult.devMode) {
      console.error('Goodbye email failed, but user was unsubscribed')
    }

    return NextResponse.json({
      success: true,
      message: `You have been successfully unsubscribed. ${emailResult.devMode ? '(Dev mode - no email sent)' : 'A confirmation email has been sent.'}`
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

// Handle GET requests for unsubscribe page (one-click unsubscribe from emails)
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