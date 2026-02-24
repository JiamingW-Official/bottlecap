import Anthropic from '@anthropic-ai/sdk'
import type { ProductInput, AnalysisResult } from '@/types'

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  }
  return _client
}

// ---------------------------------------------------------------------------
// System Prompt (from PROMPTS.md)
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Kai, Bottlecap's expert manufacturing analyst.

You have 20 years of experience in global supply chains, with deep expertise in:
- Chinese, Vietnamese, Mexican, and Indian manufacturing ecosystems
- Consumer electronics, home goods, apparel, and lifestyle products
- Import/export regulations, HS codes, and tariff structures
- Product development, material science, and manufacturing processes
- Global sourcing strategy and supplier evaluation

Your personality:
- Warm and encouraging, like a brilliant friend who happens to know manufacturing
- Specific with numbers — vague answers destroy trust
- Honest about challenges, but always solution-oriented
- You speak to non-experts: avoid jargon, explain everything
- You are excited about people's ideas, not dismissive

Your job:
Analyze a product idea from a non-expert founder or entrepreneur.
Give them the clearest, most actionable analysis they've ever seen.
Make manufacturing feel accessible, not scary.

Critical rules:
1. ALWAYS give specific numbers. Never say "around" or "approximately" without a range.
2. ALWAYS explain what HS Code means in plain language (don't assume they know).
3. ALWAYS be encouraging. Even if the idea has challenges, frame solutions positively.
4. If you're uncertain, give a range and explain your confidence level.
5. Consider current 2025-2026 tariff environment (US-China tensions, Vietnam as alternative hub).

Output format:
Respond ONLY with a valid JSON object. No markdown, no explanation outside JSON.
Use this EXACT structure:

{
  "feasibilityScore": <number 0-100>,
  "feasibilityLabel": <"Highly Feasible" | "Feasible" | "Needs Adjustment" | "Challenging">,
  "oneLinerSummary": <string, English, max 50 chars, confident tone>,

  "hsCode": <string, format "XXXX.XX">,
  "hsCodeConfidence": <number 0-100>,
  "hsCodeExplanation": <string, plain English explanation of what this code means>,
  "category": <string, product category in English>,

  "costEstimate": {
    "min": <number, USD per unit>,
    "max": <number, USD per unit>,
    "currency": "USD",
    "perUnit": true,
    "assumptions": <string, key assumptions made>
  },

  "annualSavingsOpportunity": <number, estimated $ saved vs hiring sourcing agent>,

  "sourcingCountries": [
    {
      "country": <string, English>,
      "countryCode": <string, ISO 2-letter, for flag emoji>,
      "countryEmoji": <string, flag emoji>,
      "tariffRate": <number, percentage>,
      "leadTimeDays": <number>,
      "moq": <number, minimum order quantity>,
      "recommendationScore": <number 0-100>,
      "pros": <array of 2-3 strings>,
      "cons": <array of 1-2 strings>,
      "bestFor": <string, when this country is the best choice>
    }
  ],

  "manufacturingSpecs": <array of 10 strings, questions the factory will ask>,

  "materialsAnalysis": {
    "suggested": <array of strings>,
    "alternatives": [
      {
        "material": <string>,
        "costImpact": <string, e.g. "-15%" or "+$0.80/unit">,
        "reason": <string>
      }
    ]
  },

  "optimizationTips": [
    {
      "tip": <string, specific actionable advice>,
      "potentialSaving": <string, e.g. "$1.20/unit" or "8 days lead time">
    }
  ],

  "actionItems": <array of exactly 7 strings, specific and ordered by priority>,

  "redFlags": <array of strings, empty array if none>,

  "encouragingNote": <string, English, genuine and specific to their product, max 80 chars>
}`

// ---------------------------------------------------------------------------
// Label mappings
// ---------------------------------------------------------------------------

const PRICE_LABELS: Record<string, string> = {
  under_30: 'Under $30',
  '30_100': '$30 - $100',
  '100_300': '$100 - $300',
  unsure: 'Not sure yet',
}

const CONCERN_LABELS: Record<string, string> = {
  cost: 'Cost might be too high',
  factory: "Can't find a factory",
  quality: 'Quality concerns',
  start: "Don't know where to start",
}

const QUANTITY_LABELS: Record<string, string> = {
  under_100: 'Under 100 units',
  '100_1000': '100 - 1,000 units',
  over_1000: 'Over 1,000 units',
  unsure: 'Not decided yet',
}

// ---------------------------------------------------------------------------
// Build user prompt
// ---------------------------------------------------------------------------

export function buildUserPrompt(input: ProductInput): string {
  const price = input.targetPrice ? PRICE_LABELS[input.targetPrice] || input.targetPrice : 'Not specified'
  const concern = input.mainConcern ? CONCERN_LABELS[input.mainConcern] || input.mainConcern : 'Not specified'
  const qty = input.quantity ? QUANTITY_LABELS[input.quantity] || input.quantity : 'Not specified'

  return `Please analyze this product idea:

Product Description: ${input.productDescription}

Additional context:
- Target retail price: ${price}
- Main concern: ${concern}
- Initial quantity needed: ${qty}
${input.imageUrl ? `\nI've also attached a product image/sketch for reference.` : ''}

Please provide a thorough manufacturing feasibility analysis following the JSON format specified.

Remember: This person likely has no manufacturing background.
Be specific with numbers, explain technical terms, and be genuinely encouraging.`
}

// ---------------------------------------------------------------------------
// Analyze product
// ---------------------------------------------------------------------------

export async function analyzeProduct(
  input: ProductInput
): Promise<AnalysisResult> {
  const userPrompt = buildUserPrompt(input)

  // Build message content — multimodal if image present
  let content: Anthropic.MessageCreateParams['messages'][0]['content']

  if (input.imageUrl) {
    // Detect base64 data URI vs remote URL
    if (input.imageUrl.startsWith('data:')) {
      // Extract media type and base64 data from data URI
      const matches = input.imageUrl.match(/^data:(image\/[^;]+);base64,(.+)$/)
      if (matches) {
        content = [
          {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: matches[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: matches[2],
            },
          },
          { type: 'text' as const, text: userPrompt },
        ]
      } else {
        // Fallback to text-only if data URI is malformed
        content = userPrompt
      }
    } else {
      // Remote URL
      content = [
        {
          type: 'image' as const,
          source: { type: 'url' as const, url: input.imageUrl },
        },
        { type: 'text' as const, text: userPrompt },
      ]
    }
  } else {
    content = userPrompt
  }

  const response = await getClient().messages.create({
    model: 'claude-sonnet-4-6-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content }],
  })

  const block = response.content[0]
  if (block.type !== 'text') {
    throw new Error(`Unexpected response type: ${block.type}`)
  }

  // Strip markdown JSON fences if present
  let jsonText = block.text.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7)
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.slice(3)
  }
  if (jsonText.endsWith('```')) {
    jsonText = jsonText.slice(0, -3)
  }
  jsonText = jsonText.trim()

  try {
    return JSON.parse(jsonText) as AnalysisResult
  } catch {
    console.error('Failed to parse Claude response as JSON:', block.text)
    throw new Error('Analysis returned invalid JSON. Please try again.')
  }
}

// ---------------------------------------------------------------------------
// Extract short product name
// ---------------------------------------------------------------------------

export async function extractProductName(
  description: string
): Promise<string> {
  const response = await getClient().messages.create({
    model: 'claude-sonnet-4-6-20250514',
    max_tokens: 30,
    messages: [
      {
        role: 'user',
        content: `Extract a short product name (max 6 words) from this description. Return ONLY the name, nothing else.\n\n${description}`,
      },
    ],
  })

  const block = response.content[0]
  if (block.type !== 'text') return 'Product Analysis'
  return block.text.trim() || 'Product Analysis'
}
