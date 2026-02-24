import { NextResponse } from 'next/server'
import { getReport, updateReport, updateAnalysisResult } from '@/lib/supabase'
import { analyzeProduct } from '@/lib/claude'
import { sendConfirmationEmail, sendReportReadyEmail } from '@/lib/resend'
import type { AnalyzeRequest, ProductInput } from '@/types'

export const maxDuration = 60

export async function POST(request: Request) {
  let reportId: string | undefined

  try {
    const body = (await request.json()) as AnalyzeRequest
    reportId = body.reportId

    if (!reportId) {
      return NextResponse.json(
        { error: 'Missing reportId' },
        { status: 400 }
      )
    }

    // 1. Fetch report
    const report = await getReport(reportId)
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // 2. Verify payment
    if (!report.isPaid) {
      return NextResponse.json(
        { error: 'Report has not been paid for' },
        { status: 403 }
      )
    }

    // 3. Prevent duplicate processing
    if (report.status !== 'pending') {
      return NextResponse.json(
        { error: `Report is already ${report.status}` },
        { status: 409 }
      )
    }

    // 4. Mark as processing
    await updateReport(reportId, { status: 'processing' })

    // 5. Send confirmation email
    await sendConfirmationEmail(
      report.userEmail,
      report.productName || 'Your Product',
      reportId
    )

    // 6. Run analysis
    const productInput: ProductInput = {
      productDescription: report.productDescription,
      imageUrl: report.imageUrl,
      targetPrice: report.targetPrice as ProductInput['targetPrice'],
      mainConcern: report.mainConcern as ProductInput['mainConcern'],
      quantity: report.quantity as ProductInput['quantity'],
      userEmail: report.userEmail,
    }

    const analysisResult = await analyzeProduct(productInput)

    // 7. Save results
    await updateAnalysisResult(reportId, analysisResult)

    // 8. Send report-ready email (isolated — failure must not mark report as failed)
    try {
      await sendReportReadyEmail(
        report.userEmail,
        report.productName || 'Your Product',
        analysisResult,
        reportId
      )
    } catch (emailError) {
      console.error('Failed to send report-ready email (report still complete):', emailError)
    }

    return NextResponse.json({ success: true, reportId })
  } catch (error) {
    console.error('analyze error:', error)

    // Mark as failed if we have a reportId
    if (reportId) {
      try {
        await updateReport(reportId, { status: 'failed' })
      } catch (updateError) {
        console.error('Failed to mark report as failed:', updateError)
      }
    }

    return NextResponse.json(
      {
        success: false,
        reportId: reportId || '',
        error: error instanceof Error ? error.message : 'Analysis failed',
      },
      { status: 500 }
    )
  }
}
