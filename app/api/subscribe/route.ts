import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { statements } from "@/lib/database"
import { WelcomeEmail } from "@/components/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

// Subscriber validation schema
const subscribeSchema = z.object({
  email: z.email("Please enter a valid email address"),
  name: z.string().min(2, "Name is required").max(100, "Name must be less than 100 characters").optional()
})

async function sendWelcomeEmail(email: string, name?: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV MODE] Welcome email would be sent to:", email)
    return { success: true, devMode: true }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'newsletter@psychemist.dev',
      to: [email],
      subject: 'Welcome to my newsletter! 🚀',
      react: WelcomeEmail({ firstName: name, email }),
    })

    if (error) {
      throw new Error(`Resend API error: ${JSON.stringify(error)}`)
    }

    return { success: true, data }
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
    const existingSubscriber = statements.getSubscriber.get(email)
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Already subscribed', message: 'This email is already subscribed!' },
        { status: 400 }
      )
    }

    // Add subscriber to database
    try {
      statements.addSubscriber.run(email, name)
    } catch (error: unknown) {
      if ((error as { code?: string }).code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return NextResponse.json(
          { error: 'Already subscribed', message: 'This email is already subscribed!' },
          { status: 400 }
        )
      }
      throw error
    }

    // Send welcome email
    const emailResult = await sendWelcomeEmail(email, name)
    
    if (!emailResult.success && !emailResult.devMode) {
      console.error('Welcome email failed, but user was subscribed')
    }

    return NextResponse.json({
      success: true,
      message: `Thanks for subscribing${name ? `, ${name}` : ''}! ${emailResult.devMode ? '(Dev mode - no email sent)' : 'Check your email for a welcome message.'}`
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
  // Return subscriber count
  const subscribers = statements.getActiveSubscribers.all()
  
  return NextResponse.json({
    count: subscribers.length,
    subscribers: (subscribers as Array<{ email: string; name: string; subscribed_at: string }>).map(sub => ({ 
      email: sub.email, 
      name: sub.name, 
      subscribedAt: sub.subscribed_at 
    }))
  })
}