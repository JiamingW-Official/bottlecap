"""Claude API integration — port of lib/claude.ts with enriched prompt builder."""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone

import anthropic

from app.config import get_settings
from app.models.product import AnalysisResult, ProductInput
from app.models.scraping import ScrapedData


# ---------------------------------------------------------------------------
# Singleton client
# ---------------------------------------------------------------------------

_client: anthropic.Anthropic | None = None


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=get_settings().anthropic_api_key)
    return _client


# ---------------------------------------------------------------------------
# System prompt (from PROMPTS.md)
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """You are Kai, Bottlecap's expert manufacturing analyst.

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
6. When real market data is provided, USE IT to ground your analysis in facts.

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
}"""


# ---------------------------------------------------------------------------
# Label mappings
# ---------------------------------------------------------------------------

PRICE_LABELS = {
    "under_30": "Under $30",
    "30_100": "$30 - $100",
    "100_300": "$100 - $300",
    "unsure": "Not sure yet",
}

CONCERN_LABELS = {
    "cost": "Cost might be too high",
    "factory": "Can't find a factory",
    "quality": "Quality concerns",
    "start": "Don't know where to start",
}

QUANTITY_LABELS = {
    "under_100": "Under 100 units",
    "100_1000": "100 - 1,000 units",
    "over_1000": "Over 1,000 units",
    "unsure": "Not decided yet",
}


# ---------------------------------------------------------------------------
# Prompt builders
# ---------------------------------------------------------------------------

def build_user_prompt(inp: ProductInput) -> str:
    price = PRICE_LABELS.get(inp.target_price or "", inp.target_price or "Not specified")
    concern = CONCERN_LABELS.get(inp.main_concern or "", inp.main_concern or "Not specified")
    qty = QUANTITY_LABELS.get(inp.quantity or "", inp.quantity or "Not specified")

    image_line = "\nI've also attached a product image/sketch for reference." if inp.image_url else ""

    return f"""Please analyze this product idea:

Product Description: {inp.product_description}

Additional context:
- Target retail price: {price}
- Main concern: {concern}
- Initial quantity needed: {qty}
{image_line}

Please provide a thorough manufacturing feasibility analysis following the JSON format specified.

Remember: This person likely has no manufacturing background.
Be specific with numbers, explain technical terms, and be genuinely encouraging."""


def build_market_intelligence_section(scraped: ScrapedData) -> str:
    """Build the ## Real Market Data section from scraped data."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    sections: list[str] = [f"\n## Real Market Data (scraped {now})\n"]

    # Alibaba suppliers
    if scraped.suppliers:
        sections.append(f"### Alibaba Suppliers Found: {len(scraped.suppliers)}")
        for s in scraped.suppliers[:10]:
            price_str = ""
            if s.price_min and s.price_max:
                price_str = f"${s.price_min:.2f}-${s.price_max:.2f}/unit"
            elif s.price_min:
                price_str = f"from ${s.price_min:.2f}/unit"
            moq_str = f", MOQ {s.moq}" if s.moq else ""
            loc_str = f", {s.location}" if s.location else ""
            rating_str = f", {s.rating}\u2605" if s.rating else ""
            sections.append(f"- {s.supplier_name}: {price_str}{moq_str}{loc_str}{rating_str}")
        sections.append("")

    # Google Trends
    if scraped.trends:
        t = scraped.trends
        sections.append("### Google Trends Interest")
        if t.average_interest is not None:
            sections.append(f"- Search interest (0-100): {t.average_interest}")
        if t.yoy_growth_pct is not None:
            sections.append(f"- YoY growth: {t.yoy_growth_pct:+.1f}%")
        if t.related_queries:
            sections.append(f"- Related queries: {', '.join(t.related_queries[:8])}")
        sections.append("")

    # USITC Tariffs
    if scraped.tariff:
        tf = scraped.tariff
        sections.append(f"### Current Tariff Rates (USITC)")
        sections.append(f"- HS {tf.hs_code}: General {tf.general_rate or 'N/A'}, China {tf.china_rate or 'N/A'}")
        if tf.special_rates:
            for prog, rate in tf.special_rates.items():
                sections.append(f"- {prog}: {rate}")
        sections.append("")

    # UN Comtrade
    if scraped.trade_volume:
        tv = scraped.trade_volume
        sections.append(f"### Trade Volume (UN Comtrade)")
        if tv.import_value_usd is not None:
            sections.append(f"- US imports of HS {tv.hs_code}: ${tv.import_value_usd / 1e6:.1f}M/year")
        if tv.top_partners:
            partners_str = ", ".join(
                f"{p.get('country', '?')} ({p.get('pct', '?')}%)"
                for p in tv.top_partners[:5]
            )
            sections.append(f"- Top exporters: {partners_str}")
        sections.append("")

    # Amazon
    if scraped.amazon_products:
        products = scraped.amazon_products
        avg_price = sum(p.price for p in products if p.price) / max(1, sum(1 for p in products if p.price))
        avg_rating = sum(p.rating for p in products if p.rating) / max(1, sum(1 for p in products if p.rating))
        avg_reviews = sum(p.review_count for p in products if p.review_count) / max(1, sum(1 for p in products if p.review_count))
        sections.append(f"### Amazon Market Analysis")
        sections.append(
            f"- Top {len(products)} competing products: avg ${avg_price:.2f}, "
            f"avg {avg_rating:.1f}\u2605, avg {int(avg_reviews)} reviews"
        )
        bsr_values = [p.bsr for p in products if p.bsr]
        if bsr_values:
            cat = products[0].bsr_category or "category"
            sections.append(f"- BSR range: {min(bsr_values):,}-{max(bsr_values):,} in {cat}")
        sections.append("")

    # Errors (transparency)
    if scraped.errors:
        sections.append("### Data Gaps")
        for source, err in scraped.errors.items():
            sections.append(f"- {source}: {err}")
        sections.append("")

    return "\n".join(sections)


def build_enriched_prompt(inp: ProductInput, scraped: ScrapedData) -> str:
    """Combine user prompt + market intelligence."""
    base = build_user_prompt(inp)
    market = build_market_intelligence_section(scraped)
    return base + "\n" + market


# ---------------------------------------------------------------------------
# Main analysis function
# ---------------------------------------------------------------------------

def analyze_product(
    inp: ProductInput,
    scraped_data: ScrapedData | None = None,
) -> AnalysisResult:
    """Run Claude analysis with optional enriched market data."""
    if scraped_data and _has_any_data(scraped_data):
        user_prompt = build_enriched_prompt(inp, scraped_data)
    else:
        user_prompt = build_user_prompt(inp)

    # Build message content — multimodal if image present
    content: list[dict] | str
    if inp.image_url:
        if inp.image_url.startswith("data:"):
            match = re.match(r"^data:(image/[^;]+);base64,(.+)$", inp.image_url, re.DOTALL)
            if match:
                content = [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": match.group(1),
                            "data": match.group(2),
                        },
                    },
                    {"type": "text", "text": user_prompt},
                ]
            else:
                content = user_prompt
        else:
            content = [
                {"type": "image", "source": {"type": "url", "url": inp.image_url}},
                {"type": "text", "text": user_prompt},
            ]
    else:
        content = user_prompt

    response = _get_client().messages.create(
        model="claude-sonnet-4-6-20250514",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": content}],
    )

    block = response.content[0]
    if block.type != "text":
        raise ValueError(f"Unexpected response type: {block.type}")

    json_text = _strip_markdown_fences(block.text)

    try:
        raw = json.loads(json_text)
    except json.JSONDecodeError:
        raise ValueError("Analysis returned invalid JSON. Please try again.")

    return AnalysisResult.model_validate(raw)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _strip_markdown_fences(text: str) -> str:
    t = text.strip()
    if t.startswith("```json"):
        t = t[7:]
    elif t.startswith("```"):
        t = t[3:]
    if t.endswith("```"):
        t = t[:-3]
    return t.strip()


def _has_any_data(sd: ScrapedData) -> bool:
    return bool(
        sd.suppliers
        or sd.tariff
        or sd.trade_volume
        or sd.trends
        or sd.amazon_products
    )


def extract_product_name(description: str) -> str:
    """Quick extraction for product title."""
    response = _get_client().messages.create(
        model="claude-sonnet-4-6-20250514",
        max_tokens=30,
        messages=[
            {
                "role": "user",
                "content": (
                    "Extract a short product name (max 6 words) from this description. "
                    f"Return ONLY the name, nothing else.\n\n{description}"
                ),
            }
        ],
    )
    block = response.content[0]
    if block.type != "text":
        return "Product Analysis"
    return block.text.strip() or "Product Analysis"
