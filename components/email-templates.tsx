import * as React from 'react'
import { Html, Head, Body, Container, Section, Text, Link, Heading, Hr, Button } from '@react-email/components'

interface WelcomeEmailProps {
  firstName?: string
  email: string
}

interface GoodbyeEmailProps {
  firstName?: string
  email: string
}

interface BlogNotificationEmailProps {
  title: string
  excerpt: string
  slug: string
  author?: string
  publishedAt?: string
  siteUrl: string
}

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
  timestamp?: string
}

export function WelcomeEmail({ firstName }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6, color: '#333', maxWidth: '600px' }}>
      <h2 style={{ color: '#2563eb' }}>
        Thanks for subscribing{firstName ? `, ${firstName}` : ''}! 🎉
      </h2>
      
      <p>You&apos;re now subscribed to get updates about:</p>
      <ul style={{ color: '#374151' }}>
        <li>New projects and coding adventures</li>
        <li>Insights on AI, web development, and technology</li>
        <li>Behind-the-scenes content and lessons learned</li>
      </ul>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <p style={{ margin: 0 }}><strong>What&apos;s next?</strong></p>
        <p style={{ margin: '10px 0 0 0' }}>
          I&apos;ll send you an email whenever I publish something new. No spam, just quality content!
        </p>
      </div>
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', fontSize: '14px', color: '#6b7280' }}>
        <p>
          Want to unsubscribe? 
          <a href={`https://psychemist.dev/blog#unsubscribe`} style={{ color: '#2563eb' }}>
            Visit the blog page
          </a> or reply to this email with &ldquo;unsubscribe&rdquo;.
        </p>
      </div>
    </div>
  )
}

export function GoodbyeEmail({ firstName }: GoodbyeEmailProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6, color: '#333', maxWidth: '600px' }}>
      <h2 style={{ color: '#6b7280' }}>
        Sorry to see you go{firstName ? `, ${firstName}` : ''}!
      </h2>
      
      <p>You&apos;ve been successfully unsubscribed from my newsletter.</p>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <p style={{ margin: 0 }}><strong>What this means:</strong></p>
        <ul style={{ margin: '10px 0 0 0' }}>
          <li>You won&apos;t receive any more newsletter emails from me</li>
          <li>Your email has been removed from my subscriber list</li>
          <li>You can still contact me directly anytime</li>
        </ul>
      </div>
      
      <p>If you change your mind, you can always resubscribe on my website.</p>
      
      <p>Thanks for being part of the journey, even briefly! 🙏</p>
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', fontSize: '14px', color: '#6b7280' }}>
        <p>This confirmation was sent to ensure you wanted to unsubscribe.</p>
      </div>
    </div>
  )
}

export function BlogNotificationEmail({ 
  title, 
  excerpt, 
  slug, 
  author = 'Chukwudike',
  publishedAt,
  siteUrl 
}: BlogNotificationEmailProps) {
  const postUrl = `${siteUrl}/blog/${slug}`
  const publishDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Just published'

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>{title}</Heading>
            <Text style={byline}>
              By {author} • {publishDate}
            </Text>
          </Section>

          {/* Excerpt */}
          <Section style={excerptSection}>
            <Text style={excerptText}>{excerpt}</Text>
          </Section>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Button href={postUrl} style={button}>
              Read the full post →
            </Button>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you subscribed to updates from my portfolio.
            </Text>
            <Text style={footerText}>
              Want to unsubscribe?{' '}
              <Link href={`${siteUrl}/blog#unsubscribe`} style={link}>
                Visit the blog page
              </Link>{' '}
              or reply with &ldquo;unsubscribe&rdquo;.
            </Text>
            <Text style={footerText}>
              <Link href={siteUrl} style={link}>
                Visit my portfolio
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export function ContactFormEmail({ 
  name, 
  email, 
  message, 
  timestamp = new Date().toISOString() 
}: ContactFormEmailProps) {
  const formattedDate = new Date(timestamp).toLocaleString()

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>New Contact Form Message</Heading>
            <Text style={byline}>
              Received on {formattedDate}
            </Text>
          </Section>

          {/* Contact Details */}
          <Section style={contactSection}>
            <Heading style={h2}>From:</Heading>
            <Text style={contactDetail}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={contactDetail}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>
            </Text>
          </Section>

          {/* Message */}
          <Section style={messageSection}>
            <Heading style={h2}>Message:</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Quick Actions */}
          <Section style={buttonContainer}>
            <Button href={`mailto:${email}?subject=Re: Your message from my portfolio`} style={button}>
              Reply to {name}
            </Button>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              This message was sent from your portfolio contact form at psychemist.dev
            </Text>
            <Text style={footerText}>
              Sender IP and other details are logged for security purposes.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 20px 48px',
  maxWidth: '600px',
}

const header = {
  marginBottom: '32px',
}

const h1 = {
  color: '#2563eb',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 10px',
}

const byline = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0 0 20px',
}

const excerptSection = {
  backgroundColor: '#f8fafc',
  borderLeft: '4px solid #2563eb',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
}

const excerptText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const footer = {
  color: '#6b7280',
  fontSize: '14px',
}

const footerText = {
  margin: '8px 0',
}

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
}

const contactSection = {
  marginBottom: '20px',
}

const h2 = {
  color: '#2563eb',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 10px',
}

const contactDetail = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 10px',
}

const emailLink = {
  color: '#2563eb',
  textDecoration: 'underline',
}

const messageSection = {
  marginBottom: '20px',
}

const messageText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
}