#!/usr/bin/env node

/**
 * Script to test Sanity webhook functionality
 * Usage: node scripts/test-webhook.js
 */

import crypto from 'crypto'


async function testWebhook() {
  console.log('🧪 Sanity Webhook Test')
  console.log('=====================\n')

  const webhookUrl = 'http://localhost:3000/api/webhooks/sanity'
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (!secret) {
    console.error('❌ SANITY_WEBHOOK_SECRET is not set in your environment')
    console.log('💡 Run: node scripts/setup-webhook.js to get setup instructions')
    process.exit(1)
  }

  // Sample webhook payload from Sanity
  const samplePayload = {
    _type: 'post',
    _id: 'test-post-123',
    _rev: 'test-rev',
    title: 'Test Blog Post from Webhook',
    slug: {
      current: 'test-blog-post-webhook'
    },
    excerpt: 'This is a test email notification triggered by a Sanity webhook. If you receive this, everything is working perfectly!',
    publishedAt: new Date().toISOString(),
    author: {
      name: 'Test Author'
    },
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This is the body content of the test post. The webhook should extract this as an excerpt if no custom excerpt is provided.'
          }
        ]
      }
    ]
  }

  const body = JSON.stringify(samplePayload)
  
  // Generate valid signature
  const signature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  console.log('📤 Sending test webhook...')
  console.log(`URL: ${webhookUrl}`)
  console.log(`Payload: ${samplePayload.title}`)
  console.log('')

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sanity-webhook-signature': `sha256=${signature}`
      },
      body: body
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ Webhook processed successfully!')
      console.log('📧 Email notification details:')
      console.log(`   Post: ${result.post.title}`)
      console.log(`   Slug: ${result.post.slug}`)
      console.log(`   Excerpt: ${result.post.excerpt}`)
      console.log(`   Published: ${result.post.publishedAt}`)
      console.log(`   Subscribers notified: ${result.notification.sentTo}`)
      if (result.notification.messageId) {
        console.log(`   Message ID: ${result.notification.messageId}`)
      }
      console.log('')
      console.log('🎉 Your webhook is working correctly!')
    } else {
      console.error('❌ Webhook failed:')
      console.error(`   Status: ${response.status}`)
      console.error(`   Error: ${result.error}`)
      console.error(`   Message: ${result.message}`)
    }

  } catch (error) {
    console.error('❌ Network error:', error.message)
    console.log('')
    console.log('💡 Make sure your development server is running:')
    console.log('   npm run dev')
  }
}

async function testInvalidSignature() {
  console.log('\n🔐 Testing invalid signature (should fail)...')
  
  const webhookUrl = 'http://localhost:3000/api/webhooks/sanity'
  const body = JSON.stringify({ test: 'invalid' })

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sanity-webhook-signature': 'sha256=invalid-signature'
      },
      body: body
    })

    const result = await response.json()

    if (response.status === 401 && result.error === 'Invalid signature') {
      console.log('✅ Security test passed - invalid signatures are rejected')
    } else {
      console.log('⚠️  Security test failed - invalid signatures should be rejected')
    }
  } catch (error) {
    console.error('❌ Security test error:', error.message)
  }
}

async function main() {
  await testWebhook()
  await testInvalidSignature()
  
  console.log('\n📋 Next steps:')
  console.log('1. If the test passed, set up the webhook in Sanity Studio')
  console.log('2. Use the setup guide: node scripts/setup-webhook.js')
  console.log('3. Test with a real blog post in Sanity Studio')
  console.log('')
}

main().catch(console.error)