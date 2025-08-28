import { NextResponse } from 'next/server'
import { cms } from '@/lib/cms'

export async function GET() {
  try {
    const posts = await cms.getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array on error
  }
}