import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { reportId } = await request.json()

    if (!reportId) {
      return NextResponse.json({ error: 'Missing reportId' }, { status: 400 })
    }

    const secret = process.env.FASTAPI_SECRET_KEY
    if (!secret) {
      return NextResponse.json(
        { error: 'SSE not configured' },
        { status: 503 }
      )
    }

    // Generate a short-lived JWT for SSE auth
    const token = jwt.sign(
      { report_id: reportId },
      secret,
      { expiresIn: '10m' }
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error('progress-token error:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}
