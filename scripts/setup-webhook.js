#!/usr/bin/env node

/**
 * Script to set up Sanity webhooks for automatic email notifications
 * Usage: node scripts/setup-webhook.js
 */

import crypto from 'crypto'

function generateWebhookSecret() {
  return crypto.randomBytes(32).toString('hex')
}

function main() {
  console.log('🔗 Sanity Webhook Setup Guide')
  console.log('============================\n')

  // Generate a secure webhook secret
  const webhookSecret = generateWebhookSecret()

  console.log('1. 📝 Add these environment variables to your .env.local:')
  console.log('   --------------------------------------------------------')
  console.log(`   SANITY_WEBHOOK_SECRET=${webhookSecret}`)
  console.log('   BLOG_NOTIFY_API_KEY=your_secret_key_here  # (if not already set)')
  console.log('   RESEND_API_KEY=your_resend_key_here       # (if not already set)')
  console.log('')

  console.log('2. 🌐 Set up the webhook in Sanity Studio:')
  console.log('   ----------------------------------------')
  console.log('   a) Go to https://sanity.io/manage')
  console.log('   b) Select your project')
  console.log('   c) Go to API → Webhooks')
  console.log('   d) Click "Add Webhook"')
  console.log('')
  console.log('   Webhook Configuration:')
  console.log('   ----------------------')
  console.log('   Name: Blog Post Notifications')
  console.log('   URL: https://yourdomain.com/api/webhooks/sanity')
  console.log('   (For local testing: http://localhost:3000/api/webhooks/sanity)')
  console.log('')
  console.log('   Dataset: production (or your dataset name)')
  console.log(`   Secret: ${webhookSecret}`)
  console.log('')
  console.log('   Filter: _type == "post"')
  console.log('   HTTP method: POST')
  console.log('   API version: vX (latest)')
  console.log('   Include drafts: No')
  console.log('')

  console.log('3. 🧪 Test the webhook:')
  console.log('   ---------------------')
  console.log('   a) Start your development server: npm run dev')
  console.log('   b) Create or update a blog post in Sanity Studio')
  console.log('   c) Set a "Published At" date (current or past)')
  console.log('   d) Save the post')
  console.log('   e) Check your console for webhook logs')
  console.log('')

  console.log('4. 📧 How it works:')
  console.log('   ------------------')
  console.log('   • When you publish a post in Sanity (with publishedAt date)')
  console.log('   • Sanity sends a webhook to your API endpoint')
  console.log('   • The webhook extracts the post title, slug, and excerpt')
  console.log('   • It automatically sends emails to all subscribers')
  console.log('   • Scheduled posts (future publishedAt) are ignored until published')
  console.log('')

  console.log('5. 🔒 Security features:')
  console.log('   ----------------------')
  console.log('   • Webhook signature verification')
  console.log('   • Only processes "post" document types')
  console.log('   • Only sends emails for published posts')
  console.log('   • Ignores draft and scheduled posts')
  console.log('')

  console.log('✅ Setup complete! Your blog will now automatically notify subscribers.')
  console.log('')
  console.log('💡 Pro tip: Test with a few email addresses first before going live!')
}

main()