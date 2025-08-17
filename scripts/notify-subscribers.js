#!/usr/bin/env node

/**
 * Script to notify subscribers about new blog posts
 * Usage: node scripts/notify-subscribers.js
 */

import { createInterface } from 'node:readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function main() {
  console.log('📧 Blog Post Notification Script')
  console.log('================================\n')

  try {
    // Get post details from user
    const title = await question('Post title: ')
    const slug = await question('Post slug (e.g., "my-new-post"): ')
    const excerpt = await question('Post excerpt/summary: ')
    
    // Confirm before sending
    console.log('\n📝 Preview:')
    console.log(`Title: ${title}`)
    console.log(`Slug: ${slug}`)
    console.log(`Excerpt: ${excerpt}`)
    console.log(`URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/blog/${slug}`)
    
    const confirm = await question('\nSend notification? (y/N): ')
    
    if (confirm.toLowerCase() !== 'y') {
      console.log('❌ Cancelled')
      process.exit(0)
    }

    // Send notification
    console.log('\n📤 Sending notifications...')
    
    const response = await fetch('http://localhost:3000/api/notify-subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        publishedAt: new Date().toISOString(),
        apiKey: process.env.BLOG_NOTIFY_API_KEY
      })
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log(`✅ ${result.message}`)
      if (result.sentTo > 0) {
        console.log(`📬 Notified ${result.sentTo} subscriber${result.sentTo !== 1 ? 's' : ''}`)
      }
    } else {
      console.error(`❌ Error: ${result.message}`)
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Failed to send notifications:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()