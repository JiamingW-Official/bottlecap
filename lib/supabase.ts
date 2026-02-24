import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Report, AnalysisResult } from '@/types'

// Lazy-initialized clients (avoid crashes during build when env vars are empty)
let _supabaseClient: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_supabaseClient) {
    _supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabaseClient
}

function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _supabaseAdmin
}

// ---------------------------------------------------------------------------
// Helpers: convert Supabase snake_case rows to camelCase Report
// ---------------------------------------------------------------------------

function toReport(row: Record<string, unknown>): Report {
  return {
    id: row.id as string,
    userEmail: row.user_email as string,
    productName: row.product_name as string | undefined,
    productDescription: row.product_description as string,
    imageUrl: row.image_url as string | undefined,
    targetPrice: row.target_price as string | undefined,
    mainConcern: row.main_concern as string | undefined,
    quantity: row.quantity as string | undefined,
    analysisResult: row.analysis_result as AnalysisResult | undefined,
    status: row.status as Report['status'],
    stripeSessionId: row.stripe_session_id as string | undefined,
    stripePaymentId: row.stripe_payment_id as string | undefined,
    isPaid: row.is_paid as boolean,
    plan: row.plan as Report['plan'],
    shareCount: row.share_count as number,
    createdAt: row.created_at as string,
    completedAt: row.completed_at as string | undefined,
  }
}

function toRow(data: Partial<Report>): Record<string, unknown> {
  const map: Record<string, unknown> = {}
  if (data.userEmail !== undefined) map.user_email = data.userEmail
  if (data.productName !== undefined) map.product_name = data.productName
  if (data.productDescription !== undefined) map.product_description = data.productDescription
  if (data.imageUrl !== undefined) map.image_url = data.imageUrl
  if (data.targetPrice !== undefined) map.target_price = data.targetPrice
  if (data.mainConcern !== undefined) map.main_concern = data.mainConcern
  if (data.quantity !== undefined) map.quantity = data.quantity
  if (data.analysisResult !== undefined) map.analysis_result = data.analysisResult
  if (data.status !== undefined) map.status = data.status
  if (data.stripeSessionId !== undefined) map.stripe_session_id = data.stripeSessionId
  if (data.stripePaymentId !== undefined) map.stripe_payment_id = data.stripePaymentId
  if (data.isPaid !== undefined) map.is_paid = data.isPaid
  if (data.plan !== undefined) map.plan = data.plan
  if (data.shareCount !== undefined) map.share_count = data.shareCount
  if (data.completedAt !== undefined) map.completed_at = data.completedAt
  return map
}

// ---------------------------------------------------------------------------
// CRUD Operations
// ---------------------------------------------------------------------------

export async function createReport(
  data: Omit<Report, 'id' | 'createdAt'>
): Promise<Report> {
  const { data: row, error } = await getSupabaseAdmin()
    .from('reports')
    .insert(toRow(data))
    .select()
    .single()

  if (error) {
    console.error('createReport error:', error)
    throw new Error(`Failed to create report: ${error.message}`)
  }
  return toReport(row)
}

export async function getReport(id: string): Promise<Report | null> {
  const { data: row, error } = await getSupabaseAdmin()
    .from('reports')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    console.error('getReport error:', error)
    throw new Error(`Failed to get report: ${error.message}`)
  }
  return toReport(row)
}

export async function updateReport(
  id: string,
  data: Partial<Report>
): Promise<Report> {
  const { data: row, error } = await getSupabaseAdmin()
    .from('reports')
    .update(toRow(data))
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateReport error:', error)
    throw new Error(`Failed to update report: ${error.message}`)
  }
  return toReport(row)
}

export async function markReportPaid(
  id: string,
  stripePaymentId: string
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('reports')
    .update({ is_paid: true, stripe_payment_id: stripePaymentId })
    .eq('id', id)

  if (error) {
    console.error('markReportPaid error:', error)
    throw new Error(`Failed to mark report as paid: ${error.message}`)
  }
}

export async function updateAnalysisResult(
  id: string,
  result: AnalysisResult
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('reports')
    .update({
      analysis_result: result,
      status: 'complete',
      completed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('updateAnalysisResult error:', error)
    throw new Error(`Failed to update analysis result: ${error.message}`)
  }
}

export async function incrementShareCount(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin().rpc('increment_share_count', {
    report_id: id,
  })

  if (error) {
    // Fallback: read then write
    const report = await getReport(id)
    if (report) {
      await getSupabaseAdmin()
        .from('reports')
        .update({ share_count: report.shareCount + 1 })
        .eq('id', id)
    }
  }
}
