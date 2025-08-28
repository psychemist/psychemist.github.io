import { NextResponse } from 'next/server'
import { cms } from '@/lib/cms'

export async function GET() {
  try {
    const projects = await cms.getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array on error
  }
}