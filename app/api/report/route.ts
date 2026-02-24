import { NextResponse } from 'next/server'
import { getReport } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const report = await getReport(id)

  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  // Strip sensitive fields before returning
  const { userEmail: _email, stripePaymentId: _pid, stripeSessionId: _sid, ...safeReport } = report

  return NextResponse.json({ report: safeReport })
}
