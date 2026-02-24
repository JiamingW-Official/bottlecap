"""Core product and report types — mirrors types/index.ts."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Literal, Optional

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class TargetPrice(str, Enum):
    under_30 = "under_30"
    range_30_100 = "30_100"
    range_100_300 = "100_300"
    unsure = "unsure"


class MainConcern(str, Enum):
    cost = "cost"
    factory = "factory"
    quality = "quality"
    start = "start"


class Quantity(str, Enum):
    under_100 = "under_100"
    range_100_1000 = "100_1000"
    over_1000 = "over_1000"
    unsure = "unsure"


# ---------------------------------------------------------------------------
# Input
# ---------------------------------------------------------------------------

class ProductInput(BaseModel):
    product_description: str
    image_url: Optional[str] = None
    target_price: Optional[TargetPrice] = None
    main_concern: Optional[MainConcern] = None
    quantity: Optional[Quantity] = None
    user_email: str


# ---------------------------------------------------------------------------
# Analysis sub-types
# ---------------------------------------------------------------------------

class SourcingCountry(BaseModel):
    country: str
    country_code: str
    country_emoji: str
    tariff_rate: float
    lead_time_days: int
    moq: int
    recommendation_score: int
    pros: list[str]
    cons: list[str]
    best_for: str


class MaterialAlternative(BaseModel):
    material: str
    cost_impact: str
    reason: str


class OptimizationTip(BaseModel):
    tip: str
    potential_saving: str


class CostEstimate(BaseModel):
    min: float
    max: float
    currency: Literal["USD"] = "USD"
    per_unit: bool = Field(True, alias="perUnit")
    assumptions: str

    model_config = {"populate_by_name": True}


class MaterialsAnalysis(BaseModel):
    suggested: list[str]
    alternatives: list[MaterialAlternative]


# ---------------------------------------------------------------------------
# Full analysis result (Claude API JSON output)
# ---------------------------------------------------------------------------

class AnalysisResult(BaseModel):
    feasibility_score: int = Field(alias="feasibilityScore")
    feasibility_label: str = Field(alias="feasibilityLabel")
    one_liner_summary: str = Field(alias="oneLinerSummary")

    hs_code: str = Field(alias="hsCode")
    hs_code_confidence: int = Field(alias="hsCodeConfidence")
    hs_code_explanation: str = Field(alias="hsCodeExplanation")
    category: str

    cost_estimate: CostEstimate = Field(alias="costEstimate")
    annual_savings_opportunity: float = Field(alias="annualSavingsOpportunity")

    sourcing_countries: list[SourcingCountry] = Field(alias="sourcingCountries")
    manufacturing_specs: list[str] = Field(alias="manufacturingSpecs")
    materials_analysis: MaterialsAnalysis = Field(alias="materialsAnalysis")
    optimization_tips: list[OptimizationTip] = Field(alias="optimizationTips")
    action_items: list[str] = Field(alias="actionItems")
    red_flags: list[str] = Field(alias="redFlags")
    encouraging_note: str = Field(alias="encouragingNote")

    model_config = {"populate_by_name": True}


# ---------------------------------------------------------------------------
# Database record
# ---------------------------------------------------------------------------

class Report(BaseModel):
    id: str
    user_email: str
    product_name: Optional[str] = None
    product_description: str
    image_url: Optional[str] = None
    target_price: Optional[str] = None
    main_concern: Optional[str] = None
    quantity: Optional[str] = None
    analysis_result: Optional[AnalysisResult] = None
    status: Literal["pending", "processing", "complete", "failed"] = "pending"
    stripe_session_id: Optional[str] = None
    stripe_payment_id: Optional[str] = None
    is_paid: bool = False
    plan: Literal["single", "monthly"] = "single"
    share_count: int = 0
    created_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
