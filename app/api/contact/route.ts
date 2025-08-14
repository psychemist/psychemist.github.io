import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
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
  if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
    console.log("[DEV MODE] Email would be sent:", {
      to: "hello@example.com", // This would come from site.config.ts
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
    if (process.env.RESEND_API_KEY) {
      // Use Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'portfolio@yourdomain.com', // This should be your verified domain
          to: ['hello@example.com'], // This would come from site.config.ts
          subject: `New contact form message from ${name}`,
          html: `
            <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2563eb;">New Contact Form Submission</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #374151;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
                <p>This message was sent from your portfolio contact form.</p>
                <p>Timestamp: ${new Date().toISOString()}</p>
              </div>
            </div>
          `,
        }),
      })

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.status}`)
      }

      return { success: true }
    }

    if (process.env.SMTP_HOST) {
      // Use nodemailer for custom SMTP
      const nodemailer = await import('nodemailer')
      
      const transporter = nodemailer.default.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'portfolio@yourdomain.com',
        to: 'hello@example.com', // This would come from site.config.ts
        subject: `New contact form message from ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #374151;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
            </div>
          </div>
        `,
      })

      return { success: true }
    }

    return { success: false, error: 'No email provider configured' }
  } catch (error) {
    console.error('Email sending failed:', error)
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
          message: error.errors[0].message,
          fields: error.errors.reduce((acc, err) => {
            if (err.path[0]) {
              acc[err.path[0]] = err.message
            }
            return acc
          }, {} as Record<string, string>)
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
