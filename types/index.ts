/**
 * Bottlecap — TypeScript Type Definitions
 *
 * ProductInput:        User-submitted product information (form data)
 * SourcingCountry:     Manufacturing country comparison data
 * MaterialAlternative: Alternative material options with cost impact
 * OptimizationTip:     Actionable optimization suggestion with savings estimate
 * AnalysisResult:      Complete structured output from the Claude API analysis
 * Report:              Full report record as stored in Supabase
 */

// ---------------------------------------------------------------------------
// Form / Input Types
// ---------------------------------------------------------------------------

export interface ProductInput {
  productDescription: string
  imageUrl?: string
  targetPrice?: 'under_30' | '30_100' | '100_300' | 'unsure'
  mainConcern?: 'cost' | 'factory' | 'quality' | 'start'
  quantity?: 'under_100' | '100_1000' | 'over_1000' | 'unsure'
  userEmail: string
}

// ---------------------------------------------------------------------------
// Analysis Sub-Types
// ---------------------------------------------------------------------------

export interface SourcingCountry {
  country: string
  countryCode: string
  countryEmoji: string
  tariffRate: number
  leadTimeDays: number
  moq: number
  recommendationScore: number
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface MaterialAlternative {
  material: string
  costImpact: string
  reason: string
}

export interface OptimizationTip {
  tip: string
  potentialSaving: string
}

// ---------------------------------------------------------------------------
// Core Analysis Result (Claude API JSON output)
// ---------------------------------------------------------------------------

export interface AnalysisResult {
  feasibilityScore: number
  feasibilityLabel: 'Highly Feasible' | 'Feasible' | 'Needs Adjustment' | 'Challenging'
  oneLinerSummary: string

  hsCode: string
  hsCodeConfidence: number
  hsCodeExplanation: string
  category: string

  costEstimate: {
    min: number
    max: number
    currency: 'USD'
    perUnit: true
    assumptions: string
  }

  annualSavingsOpportunity: number

  sourcingCountries: SourcingCountry[]

  manufacturingSpecs: string[]

  materialsAnalysis: {
    suggested: string[]
    alternatives: MaterialAlternative[]
  }

  optimizationTips: OptimizationTip[]

  actionItems: string[]

  redFlags: string[]

  encouragingNote: string
}

// ---------------------------------------------------------------------------
// Database Record
// ---------------------------------------------------------------------------

export interface Report {
  id: string
  userEmail: string
  productName?: string
  productDescription: string
  imageUrl?: string
  targetPrice?: string
  mainConcern?: string
  quantity?: string
  analysisResult?: AnalysisResult
  status: 'pending' | 'processing' | 'complete' | 'failed'
  stripeSessionId?: string
  stripePaymentId?: string
  isPaid: boolean
  plan: 'single' | 'monthly'
  shareCount: number
  createdAt: string
  completedAt?: string
}

// ---------------------------------------------------------------------------
// API Types
// ---------------------------------------------------------------------------

export interface AnalyzeRequest {
  reportId: string
}

export interface AnalyzeResponse {
  success: boolean
  reportId: string
  error?: string
}

export interface CreateCheckoutRequest {
  productInput: ProductInput
}

export interface CreateCheckoutResponse {
  url: string
  reportId: string
}
