import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  try {
    const { data: rows, error } = await getSupabaseClient()
      .from('reports')
      .select('id, product_name, status, analysis_result, created_at')
      .eq('user_email', email)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ reports: [] })
    }

    const reports = (rows || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      productName: row.product_name,
      status: row.status,
      feasibilityScore: (row.analysis_result as Record<string, unknown> | null)?.feasibilityScore,
      createdAt: row.created_at,
    }))

    return NextResponse.json({ reports })
  } catch {
    return NextResponse.json({ reports: [] })
  }
}
