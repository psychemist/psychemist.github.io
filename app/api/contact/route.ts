import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/site.config"
import { statements } from "@/lib/database"
import { ContactFormEmail } from "@/components/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
})

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `ratelimit:${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // 5 requests per 15 minutes

  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    // New window or expired window
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true }
}

async function sendEmail(data: { name: string; email: string; message: string }) {
  const { name, email, message } = data

  // Check if email provider is configured
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV MODE] Email would be sent:", {
      to: siteConfig.author.email,
      from: email,
      subject: `New contact form message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `.trim()
    })
    return { success: true, devMode: true }
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'portfolio@psychemist.dev',
      to: [siteConfig.author.email],
      subject: `New contact form message from ${name}`,
      react: ContactFormEmail({ name, email, message }),
    })

    if (error) {
      throw new Error(`Resend API error: ${JSON.stringify(error)}`)
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime ? Math.ceil((rateLimit.resetTime - Date.now()) / 1000 / 60) : 15
      return NextResponse.json(
        { 
          error: 'Too many requests', 
          message: `Please wait ${resetTime} minutes before sending another message.` 
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Store contact submission in database
    try {
      statements.addContact.run(validatedData.name, validatedData.email, validatedData.message)
    } catch (error) {
      console.error('Failed to store contact submission:', error)
      // Continue even if database storage fails
    }

    // Send email
    const emailResult = await sendEmail(validatedData)

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send message', message: 'Please try again later or contact me directly.' },
        { status: 500 }
      )
    }

    // Success response
    const response = {
      success: true,
      message: emailResult.devMode 
        ? 'Message received! (Dev mode - no email sent)' 
        : 'Message sent successfully! I\'ll get back to you soon.',
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          message: error.issues[0].message,
          fields: error.issues.reduce((acc: Record<string, string>, issue) => {
            if (issue.path[0]) {
              acc[issue.path[0] as string] = issue.message
            }
            return acc
          }, {})
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'This endpoint only accepts POST requests.' },
    { status: 405 }
  )
}
