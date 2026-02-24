import { NextResponse } from 'next/server'
import { incrementShareCount } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { reportId } = await request.json()

    if (!reportId || typeof reportId !== 'string') {
      return NextResponse.json({ error: 'Missing reportId' }, { status: 400 })
    }

    await incrementShareCount(reportId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('share tracking error:', error)
    return NextResponse.json({ error: 'Failed to track share' }, { status: 500 })
  }
}
