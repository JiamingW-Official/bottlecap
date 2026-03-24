"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Shield,
  Ship,
  DollarSign,
  Globe,
  AlertTriangle,
  Activity,
  Filter,
  TrendingUp,
  Calculator,
  ChevronDown,
  Package,
  Copy,
  Check,
  Mail,
  Clock,
  Calendar,
  ArrowLeftRight,
  Truck,
  Users,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Severity = "critical" | "warning" | "opportunity"
type RiskLevel = "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "MEDIUM-LOW" | "LOW"
type Trend = "improving" | "worsening" | "stable"
type TimelineImpact = "high" | "medium" | "low"

interface SubScore {
  label: string
  value: number
  icon: React.ElementType
}

interface TradeAlert {
  id: number
  severity: Severity
  title: string
  date: string
  relativeDate: string
  impact: string
  details: string
  categories: string[]
  countries: string[]
  source: string
}

interface CountryRisk {
  code: string
  name: string
  flag: string
  risk: RiskLevel
  score: number
  topFactor: string
  trend: Trend
  sparkline: number[]
  subScores: {
    tradePolicy: number
    infrastructure: number
    laborMarket: number
  }
}

interface ProductCategory {
  label: string
  tariffs: Record<string, { rate: number; perUnit: number }>
}

interface TimelineEvent {
  date: string
  sortDate: string
  title: string
  impact: TimelineImpact
  countries: string[]
  description: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GLOBAL_RISK_SCORE = 64

const SUB_SCORES: SubScore[] = [
  { label: "Tariff Risk", value: 74, icon: Shield },
  { label: "Shipping", value: 61, icon: Ship },
  { label: "Currency", value: 48, icon: DollarSign },
  { label: "Geopolitical", value: 73, icon: Globe },
]

const TRADE_ALERTS: TradeAlert[] = [
  {
    id: 1,
    severity: "critical",
    title:
      "US Section 301 List 4A tariffs on Chinese goods at 25% — originally 7.5%, raised effective Feb 4, 2025",
    date: "Feb 4, 2025",
    relativeDate: "13 months ago",
    impact:
      "Affects electronics, machinery, chemicals, and plastics imported from China. Landed costs increased 18-25% for affected HS chapters vs pre-escalation rates.",
    details:
      "The tariff increase from 7.5% to 25% on List 4A items covers approximately $300B in Chinese imports. Combined with existing Section 301 Lists 1-3 (already at 25%), virtually all Chinese-origin manufactured goods now face 25% duties. No sunset clause; removal requires affirmative USTR action. Section 301 four-year review hearings scheduled for April 2026.",
    categories: ["Electronics", "Home Goods", "Toys", "Furniture"],
    countries: ["China"],
    source: "USTR Federal Register Notice",
  },
  {
    id: 2,
    severity: "warning",
    title:
      "Red Sea / Houthi attacks ongoing — Maersk, MSC rerouting via Cape of Good Hope, adding 10-14 days transit",
    date: "Mar 12, 2026",
    relativeDate: "11 days ago",
    impact:
      "Asia-to-US East Coast ocean freight rates up 35%. Container availability tightening. Suez Canal traffic down ~60% from pre-crisis levels.",
    details:
      "Major carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd) continue to avoid Bab al-Mandab strait. Cape of Good Hope rerouting adds 3,500-4,000 nautical miles. Fuel surcharges applied. Insurance premiums for Red Sea transit up 0.5-1.0% of cargo value. US Navy Operation Prosperity Guardian providing limited escort but not eliminating risk. No resolution timeline in sight.",
    categories: ["All Categories"],
    countries: ["China", "Vietnam", "India", "Bangladesh"],
    source: "Drewry Maritime Research",
  },
  {
    id: 3,
    severity: "warning",
    title:
      "Panama Canal drought restrictions — max 24 daily transits vs normal 36-40",
    date: "Mar 8, 2026",
    relativeDate: "15 days ago",
    impact:
      "Neopanamax vessel slots limited. Booking windows extended to 3-4 weeks. Auction fees for priority transit reaching $500K-$2M per vessel.",
    details:
      "Gatun Lake water levels remain below historical averages despite partial recovery. Panama Canal Authority (ACP) maintaining draft restrictions at 44 ft (vs 50 ft normal). Some carriers splitting loads or choosing all-water Suez routes for US East Coast. West Coast routing via trans-Pacific gaining market share. Container ships queuing 7-10 days for transit slots.",
    categories: ["All Categories"],
    countries: ["China", "Vietnam", "South Korea", "Taiwan"],
    source: "Panama Canal Authority",
  },
  {
    id: 4,
    severity: "critical",
    title:
      "US de minimis ($800) threshold under Congressional review — Section 321 reform could eliminate duty-free e-commerce from China",
    date: "Mar 15, 2026",
    relativeDate: "8 days ago",
    impact:
      "1.5 billion+ de minimis packages entered the US in 2025. Shein, Temu, and direct-from-China sellers face potential 25-100% cost increases if threshold is lowered or eliminated for China-origin goods.",
    details:
      "Bipartisan PACKAGE Act and Import Security and Fairness Act both advancing in Congress. Proposals range from lowering threshold to $0 for Section 301/321 countries to requiring formal entry for all shipments from specific origins. CBP piloting enhanced screening at international mail facilities. If passed, implementation expected within 180 days. Amazon, Shein, and Temu lobbying against; US manufacturers and unions lobbying for reform.",
    categories: ["Electronics", "Apparel", "Beauty", "Toys"],
    countries: ["China"],
    source: "Congressional Research Service",
  },
  {
    id: 5,
    severity: "opportunity",
    title:
      "EU Carbon Border Adjustment Mechanism (CBAM) Phase 2 started Jan 2026 — importers must report embedded emissions",
    date: "Jan 1, 2026",
    relativeDate: "2 months ago",
    impact:
      "EU importers of aluminum, steel, cement, hydrogen, fertilizers, and electricity must now report verified emissions data. Financial adjustment phase begins 2027.",
    details:
      "CBAM transitional reporting phase became mandatory Jan 2026. Importers filing quarterly CBAM reports to EU customs. From Jan 2027, importers must purchase CBAM certificates matching embedded emissions (priced at EU ETS carbon price, currently ~EUR 65/ton CO2). Opportunity: suppliers with low-carbon processes gain competitive advantage in EU market. Vietnamese and Thai manufacturers with renewable energy sourcing well-positioned vs Chinese coal-dependent factories.",
    categories: ["Auto Parts", "Home Goods", "Furniture"],
    countries: ["China", "India", "Vietnam", "Thailand"],
    source: "European Commission DG TAXUD",
  },
  {
    id: 6,
    severity: "opportunity",
    title:
      "India PLI Phase 2 for IT hardware — 4-6% production incentive on incremental sales for electronics manufacturers",
    date: "Mar 5, 2026",
    relativeDate: "18 days ago",
    impact:
      "Indian manufacturers receiving government subsidies can offer 4-6% more competitive pricing. Applications open through Q2 2026.",
    details:
      "Production-Linked Incentive scheme Phase 2 covers IT hardware (laptops, tablets, servers, PCs), electronic components, and telecom equipment. Incentive: 4% of incremental sales (Year 1-2), 5% (Year 3-4), 6% (Year 5). Minimum investment threshold: INR 10 crore ($1.2M). Apple supplier Foxconn, Pegatron, and Wistron already operating under PLI Phase 1 for smartphones. Phase 2 extends to broader electronics. Good time to negotiate India-sourced electronics contracts.",
    categories: ["Electronics"],
    countries: ["India"],
    source: "Ministry of Electronics & IT, India",
  },
  {
    id: 7,
    severity: "critical",
    title:
      "Bangladesh LDC graduation scheduled Nov 2026 — will lose EU GSP/EBA duty-free access by 2029",
    date: "Nov 24, 2026",
    relativeDate: "in 8 months",
    impact:
      "Bangladesh's graduation from UN Least Developed Country status triggers 3-year transition. EU Everything But Arms (EBA) duty-free access expires ~2029. Garment export competitiveness at risk.",
    details:
      "UN Committee for Development Policy confirmed Bangladesh meets graduation criteria (GNI per capita, Human Assets Index, Economic Vulnerability Index). After graduation in Nov 2026, a 3-year transition period applies for EU EBA preferences. Post-2029, Bangladesh garment exports to EU face standard GSP rates (9.6% avg for apparel vs 0% under EBA). This ~10% cost increase may shift orders to Vietnam, Cambodia, or Ethiopia. Bangladesh is negotiating bilateral FTAs with EU and UK to mitigate impact. Buyers should evaluate multi-year sourcing contracts.",
    categories: ["Apparel", "Home Goods"],
    countries: ["Bangladesh"],
    source: "UN DESA / CDP",
  },
  {
    id: 8,
    severity: "opportunity",
    title:
      "Mexico nearshoring momentum — IMMEX permits processed in 5 days vs 30, USMCA duty-free access intact",
    date: "Feb 20, 2026",
    relativeDate: "1 month ago",
    impact:
      "Streamlined customs processing and tax incentives for US-bound manufacturing. Transit times 3-5 days vs 30+ from Asia.",
    details:
      "Mexico's IMMEX (maquiladora) program provides duty-free import of raw materials/components for re-export. Combined with USMCA Rules of Origin compliance, finished goods enter US at 0% duty. FDI into Mexico manufacturing up 34% YoY. Major investments: Tesla Gigafactory Monterrey, BMW San Luis Potosi expansion, Samsung Queretaro electronics hub. Nearshoring reduces inventory carrying costs, improves demand responsiveness, and eliminates trans-Pacific shipping risk.",
    categories: ["Electronics", "Auto Parts", "Home Goods", "Furniture"],
    countries: ["Mexico"],
    source: "Mexican Ministry of Economy",
  },
  {
    id: 9,
    severity: "warning",
    title:
      "Mexico cargo theft up 22% in key logistics corridors — Queretaro-Mexico City and Laredo-Monterrey routes most affected",
    date: "Mar 1, 2026",
    relativeDate: "22 days ago",
    impact:
      "Insurance premiums for Mexico ground freight up 15-20%. Electronics and consumer goods most targeted. Armed escort costs increasing.",
    details:
      "CargoNet Mexico reports 2,847 cargo theft incidents in 2025, up 22% from 2024. Highest-risk corridors: Highway 57 (Laredo-Monterrey-Queretaro), Highway 45D (Chihuahua corridor), Highway 150D (Puebla-Veracruz). Electronics, auto parts, and consumer goods most targeted. Mitigation: GPS tracking mandatory, convoy scheduling, armed escort for high-value loads ($50K+), insurance riders. This does not negate nearshoring advantages but adds 2-4% to landed cost from security measures.",
    categories: ["Electronics", "Auto Parts", "Home Goods"],
    countries: ["Mexico"],
    source: "CargoNet / FreightWatch International",
  },
  {
    id: 10,
    severity: "critical",
    title:
      "Taiwan Strait naval exercises — shipping insurance premiums up 15% for Taiwan-origin cargo",
    date: "Mar 18, 2026",
    relativeDate: "5 days ago",
    impact:
      "War risk insurance surcharges applied to Taiwan shipments. Semiconductor and electronics component deliveries delayed 5-8 days.",
    details:
      "PLA Navy conducted 5-day live-fire exercises in Taiwan Strait and surrounding waters. Lloyd's of London Joint War Committee added Taiwan Strait to high-risk zone list. War risk premium now 0.15-0.25% of cargo value (was 0.05%). TSMC, MediaTek, and other semiconductor fabs unaffected operationally but logistics disrupted. Recommend: build 4-6 week safety stock for Taiwan-sourced components, evaluate Samsung (South Korea) or GlobalFoundries (US) as backup fab sources.",
    categories: ["Electronics", "Auto Parts"],
    countries: ["Taiwan"],
    source: "Lloyd's List / Reuters",
  },
  {
    id: 11,
    severity: "opportunity",
    title:
      "South Korea semiconductor mega-investment — $471B through 2047 via K-CHIPS Act, rivaling US CHIPS Act",
    date: "Feb 1, 2026",
    relativeDate: "7 weeks ago",
    impact:
      "Samsung, SK Hynix investing massively in domestic fabs. Tax credits of 15-25% for semiconductor equipment and R&D. KORUS FTA ensures 0% duty on most Korean electronics entering US.",
    details:
      "South Korea's K-CHIPS Act provides 15% tax credit for large firms (25% for SMEs) on semiconductor facility investment. Combined private-public investment of $471B planned through 2047. Samsung's Pyeongtaek mega-campus expanding to 6 fabs. SK Hynix Icheon HBM (High Bandwidth Memory) facility online 2026. For US importers, Korean-sourced semiconductors and electronics benefit from KORUS FTA (0% duty) while avoiding China Section 301 tariffs and Taiwan geopolitical risk.",
    categories: ["Electronics", "Auto Parts"],
    countries: ["South Korea"],
    source: "Korea Ministry of Trade, Industry and Energy",
  },
  {
    id: 12,
    severity: "warning",
    title:
      "Container freight rates surging — SCFI Shanghai to LA at $3,200/FEU in Q1 2026 vs $1,400 in early 2024",
    date: "Mar 20, 2026",
    relativeDate: "3 days ago",
    impact:
      "Trans-Pacific freight costs more than doubled from 2024 lows. Combined Red Sea rerouting and Panama Canal restrictions driving sustained rate increases.",
    details:
      "Shanghai Containerized Freight Index (SCFI) Shanghai-to-Los Angeles route: $3,200/FEU (March 2026) vs $1,400/FEU (March 2024). Shanghai-to-Rotterdam: $2,800/FEU (was $1,100). Key drivers: Red Sea diversions (adding fuel costs), Panama Canal restrictions (reducing capacity), carrier capacity discipline (blank sailings), and peak-season front-loading by importers hedging tariff risk. Carriers (Maersk, MSC, COSCO) signaling no rate reductions through H1 2026. Budget 2.5-3x 2024 freight rates for planning.",
    categories: ["All Categories"],
    countries: ["China", "Vietnam", "India", "Bangladesh", "Thailand"],
    source: "Shanghai Shipping Exchange / SCFI",
  },
  {
    id: 13,
    severity: "opportunity",
    title:
      "Thailand BOI incentives extended through 2032 — 5-8 year tax holidays for targeted industries including electronics, auto, EV, and medical devices",
    date: "Jan 15, 2026",
    relativeDate: "2 months ago",
    impact:
      "Thailand Board of Investment offering corporate income tax exemptions of 5-8 years, plus import duty exemptions on machinery and raw materials for qualifying investments.",
    details:
      "Thailand BOI extended investment promotion scheme through 2032. Tier A1+ activities (high-tech): 8-year CIT exemption + 50% CIT reduction for 5 more years. Tier A1: 8-year CIT exemption. Includes EV manufacturing, advanced electronics, medical devices, aerospace, and biotech. Additional benefits: 10-year land ownership for foreigners, unlimited foreign worker permits. Japanese anchor tenants (Toyota, Honda, Sony, Panasonic) provide established supply chain ecosystem. Eastern Economic Corridor (EEC) offers enhanced incentives including 15-year CIT exemption.",
    categories: ["Electronics", "Auto Parts", "Beauty"],
    countries: ["Thailand"],
    source: "Thailand Board of Investment",
  },
  {
    id: 14,
    severity: "warning",
    title:
      "Vietnam new labor law amendments effective July 2025 — overtime caps tightened, minimum wage increase schedule set through 2027",
    date: "Jul 1, 2025",
    relativeDate: "9 months ago",
    impact:
      "Overtime capped at 40 hours/month (was 60 for some sectors). Minimum wage increases of 6-8% annually through 2027. Manufacturing unit costs rising 4-6% per year.",
    details:
      "Vietnam's amended Labor Code (effective July 2025) reduces maximum overtime from 60 to 40 hours/month for most manufacturing, with 300 hours/year cap maintained. Regional minimum wages: Region I (Hanoi, HCMC): VND 4,960,000/month ($198); Region IV (rural): VND 3,640,000/month ($145). Annual increases of 6-8% scheduled through 2027. Social insurance contributions also increasing. Total labor cost inflation: ~10% annually when including benefits. Vietnam remains competitive vs China but gap narrowing. Labor-intensive industries (apparel, footwear) most affected; electronics (higher automation) less impacted.",
    categories: ["Apparel", "Electronics", "Toys"],
    countries: ["Vietnam"],
    source: "Vietnam Ministry of Labour",
  },
  {
    id: 15,
    severity: "opportunity",
    title:
      "South Korea KORUS FTA — K-beauty HS 3304 at 0% duty (was 4.5%), plus new cosmetic ingredient certifications streamlined",
    date: "Jan 1, 2026",
    relativeDate: "2 months ago",
    impact:
      "Korean cosmetics and skincare products enter US duty-free. K-beauty brands can undercut competitors sourcing from China (still at 6.5% duty).",
    details:
      "KORUS FTA final tariff phase-down completed for HS 3304 (beauty/skincare preparations). Korean cosmetics now enter US at 0% (was 4.5%). Combined with FDA-MFDS mutual recognition for GMP certification, Korean beauty product registration timeline shortened to 30 days. K-beauty market in US reached $2.1B in 2025 (+18% YoY). Key advantage vs China sourcing: 0% vs 6.5% duty, stronger IP protection, better brand perception, and no Section 301 risk.",
    categories: ["Beauty"],
    countries: ["South Korea"],
    source: "USTR / Korea Customs Service",
  },
]

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "Apr 2026",
    sortDate: "2026-04",
    title: "US Section 301 Four-Year Review Hearing",
    impact: "high",
    countries: ["China"],
    description:
      "USTR public hearing on continuation/modification of Section 301 tariffs on China. Industry comments period open. Possible tariff adjustments for specific HS codes.",
  },
  {
    date: "Jul 2026",
    sortDate: "2026-07",
    title: "USMCA Joint Review (Article 34.7)",
    impact: "high",
    countries: ["Mexico", "Canada"],
    description:
      "Mandatory six-year review of US-Mexico-Canada Agreement. Topics: Rules of Origin tightening for autos, digital trade provisions, labor/environmental enforcement. Agreement could be extended, modified, or terminated.",
  },
  {
    date: "Nov 2026",
    sortDate: "2026-11",
    title: "Bangladesh LDC Graduation",
    impact: "medium",
    countries: ["Bangladesh"],
    description:
      "Official graduation from UN Least Developed Country status. Triggers 3-year transition for EU EBA duty-free preferences. GSP eligibility changes globally.",
  },
  {
    date: "Jan 2027",
    sortDate: "2027-01",
    title: "EU CBAM Full Financial Implementation",
    impact: "high",
    countries: ["China", "India", "Vietnam"],
    description:
      "EU Carbon Border Adjustment Mechanism transitions from reporting to financial phase. Importers must purchase CBAM certificates for embedded emissions in aluminum, steel, cement, hydrogen, and fertilizers.",
  },
  {
    date: "Jul 2027",
    sortDate: "2027-07",
    title: "Vietnam Minimum Wage Phase 3",
    impact: "medium",
    countries: ["Vietnam"],
    description:
      "Third scheduled minimum wage increase under Vietnam's 2025-2027 labor cost roadmap. Projected 7-8% increase across all regions. Cumulative ~22% increase from 2025 baseline.",
  },
  {
    date: "Q3 2027",
    sortDate: "2027-07",
    title: "Panama Canal Expansion Phase 2 Study",
    impact: "low",
    countries: ["Panama"],
    description:
      "Panama Canal Authority to release feasibility study for fourth set of locks and water management system. If approved, would increase daily transits to 50+ by 2032.",
  },
  {
    date: "2029",
    sortDate: "2029-01",
    title: "Bangladesh EU EBA Preference Expiry",
    impact: "high",
    countries: ["Bangladesh"],
    description:
      "End of 3-year transition period. Bangladesh garment exports to EU face standard GSP rates (~9.6% avg for apparel vs 0% under EBA). Major sourcing shift expected.",
  },
]

const COUNTRY_RISKS: CountryRisk[] = [
  {
    code: "CN",
    name: "China",
    flag: "\u{1F1E8}\u{1F1F3}",
    risk: "HIGH",
    score: 78,
    topFactor: "Section 301 tariffs (25%) + IP risk",
    trend: "worsening",
    sparkline: [65, 68, 70, 72, 75, 78],
    subScores: { tradePolicy: 88, infrastructure: 25, laborMarket: 55 },
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}",
    risk: "LOW",
    score: 35,
    topFactor: "Growing trade agreements, rising labor costs",
    trend: "stable",
    sparkline: [28, 30, 31, 32, 33, 35],
    subScores: { tradePolicy: 20, infrastructure: 45, laborMarket: 42 },
  },
  {
    code: "IN",
    name: "India",
    flag: "\u{1F1EE}\u{1F1F3}",
    risk: "MEDIUM",
    score: 52,
    topFactor: "Infrastructure gaps + bureaucracy",
    trend: "improving",
    sparkline: [58, 56, 55, 54, 53, 52],
    subScores: { tradePolicy: 45, infrastructure: 68, laborMarket: 40 },
  },
  {
    code: "MX",
    name: "Mexico",
    flag: "\u{1F1F2}\u{1F1FD}",
    risk: "MEDIUM-LOW",
    score: 42,
    topFactor: "USMCA stable but security risk",
    trend: "stable",
    sparkline: [38, 39, 40, 41, 42, 42],
    subScores: { tradePolicy: 18, infrastructure: 40, laborMarket: 35 },
  },
  {
    code: "KR",
    name: "S. Korea",
    flag: "\u{1F1F0}\u{1F1F7}",
    risk: "LOW",
    score: 28,
    topFactor: "KORUS FTA + strong IP protection",
    trend: "stable",
    sparkline: [30, 29, 29, 28, 28, 28],
    subScores: { tradePolicy: 15, infrastructure: 18, laborMarket: 52 },
  },
  {
    code: "TW",
    name: "Taiwan",
    flag: "\u{1F1F9}\u{1F1FC}",
    risk: "MEDIUM-HIGH",
    score: 61,
    topFactor: "Geopolitical premium + strait risk",
    trend: "worsening",
    sparkline: [48, 50, 53, 56, 58, 61],
    subScores: { tradePolicy: 35, infrastructure: 15, laborMarket: 30 },
  },
  {
    code: "BD",
    name: "Bangladesh",
    flag: "\u{1F1E7}\u{1F1E9}",
    risk: "MEDIUM",
    score: 58,
    topFactor: "LDC graduation risk + infrastructure",
    trend: "worsening",
    sparkline: [42, 45, 48, 52, 55, 58],
    subScores: { tradePolicy: 55, infrastructure: 72, laborMarket: 48 },
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "\u{1F1F9}\u{1F1ED}",
    risk: "LOW",
    score: 33,
    topFactor: "BOI incentives + Japanese anchor tenants",
    trend: "improving",
    sparkline: [38, 37, 36, 35, 34, 33],
    subScores: { tradePolicy: 28, infrastructure: 32, laborMarket: 38 },
  },
]

const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
  electronics: {
    label: "Electronics",
    tariffs: {
      CN: { rate: 25, perUnit: 2.5 },
      VN: { rate: 0, perUnit: 0 },
      IN: { rate: 3.5, perUnit: 0.35 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 0, perUnit: 0 },
      TW: { rate: 3.9, perUnit: 0.39 },
      TH: { rate: 2.1, perUnit: 0.21 },
      BD: { rate: 4.2, perUnit: 0.42 },
    },
  },
  apparel: {
    label: "Apparel",
    tariffs: {
      CN: { rate: 27.5, perUnit: 2.75 },
      VN: { rate: 0, perUnit: 0 },
      IN: { rate: 5.8, perUnit: 0.58 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 8.5, perUnit: 0.85 },
      TW: { rate: 8.2, perUnit: 0.82 },
      TH: { rate: 6.5, perUnit: 0.65 },
      BD: { rate: 0, perUnit: 0 },
    },
  },
  beauty: {
    label: "Beauty",
    tariffs: {
      CN: { rate: 6.5, perUnit: 0.65 },
      VN: { rate: 2.1, perUnit: 0.21 },
      IN: { rate: 4.8, perUnit: 0.48 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 0, perUnit: 0 },
      TW: { rate: 4.5, perUnit: 0.45 },
      TH: { rate: 3.2, perUnit: 0.32 },
      BD: { rate: 5.0, perUnit: 0.5 },
    },
  },
  homegoods: {
    label: "Home Goods",
    tariffs: {
      CN: { rate: 25, perUnit: 2.5 },
      VN: { rate: 3.2, perUnit: 0.32 },
      IN: { rate: 4.1, perUnit: 0.41 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 2.8, perUnit: 0.28 },
      TW: { rate: 3.8, perUnit: 0.38 },
      TH: { rate: 3.5, perUnit: 0.35 },
      BD: { rate: 4.8, perUnit: 0.48 },
    },
  },
  food: {
    label: "Food",
    tariffs: {
      CN: { rate: 12.5, perUnit: 1.25 },
      VN: { rate: 5.0, perUnit: 0.5 },
      IN: { rate: 8.3, perUnit: 0.83 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 3.5, perUnit: 0.35 },
      TW: { rate: 6.1, perUnit: 0.61 },
      TH: { rate: 4.8, perUnit: 0.48 },
      BD: { rate: 7.2, perUnit: 0.72 },
    },
  },
  autoparts: {
    label: "Auto Parts",
    tariffs: {
      CN: { rate: 27.5, perUnit: 2.75 },
      VN: { rate: 2.5, perUnit: 0.25 },
      IN: { rate: 3.5, perUnit: 0.35 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 0, perUnit: 0 },
      TW: { rate: 2.5, perUnit: 0.25 },
      TH: { rate: 2.0, perUnit: 0.2 },
      BD: { rate: 5.5, perUnit: 0.55 },
    },
  },
  toys: {
    label: "Toys",
    tariffs: {
      CN: { rate: 25, perUnit: 2.5 },
      VN: { rate: 0, perUnit: 0 },
      IN: { rate: 4.0, perUnit: 0.4 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 3.2, perUnit: 0.32 },
      TW: { rate: 3.5, perUnit: 0.35 },
      TH: { rate: 2.8, perUnit: 0.28 },
      BD: { rate: 3.0, perUnit: 0.3 },
    },
  },
  furniture: {
    label: "Furniture",
    tariffs: {
      CN: { rate: 25, perUnit: 5.0 },
      VN: { rate: 0, perUnit: 0 },
      IN: { rate: 3.5, perUnit: 0.7 },
      MX: { rate: 0, perUnit: 0 },
      KR: { rate: 2.5, perUnit: 0.5 },
      TW: { rate: 3.8, perUnit: 0.76 },
      TH: { rate: 3.0, perUnit: 0.6 },
      BD: { rate: 4.5, perUnit: 0.9 },
    },
  },
}

const SOURCE_COUNTRIES = [
  { code: "CN", label: "China", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "VN", label: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}" },
  { code: "IN", label: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "MX", label: "Mexico", flag: "\u{1F1F2}\u{1F1FD}" },
  { code: "KR", label: "South Korea", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "TW", label: "Taiwan", flag: "\u{1F1F9}\u{1F1FC}" },
  { code: "TH", label: "Thailand", flag: "\u{1F1F9}\u{1F1ED}" },
  { code: "BD", label: "Bangladesh", flag: "\u{1F1E7}\u{1F1E9}" },
]

const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  critical: {
    label: "CRITICAL",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "\u{1F534}",
  },
  warning: {
    label: "WARNING",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "\u{1F7E1}",
  },
  opportunity: {
    label: "OPPORTUNITY",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: "\u{1F7E2}",
  },
}

const RISK_LEVEL_CONFIG: Record<
  RiskLevel,
  { color: string; bg: string; border: string }
> = {
  HIGH: {
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  "MEDIUM-HIGH": {
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
  },
  MEDIUM: {
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  "MEDIUM-LOW": {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  LOW: {
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
  },
}

const TIMELINE_IMPACT_CONFIG: Record<
  TimelineImpact,
  { color: string; bg: string; border: string; dot: string }
> = {
  high: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  medium: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
}

const EMAIL_CATEGORIES = [
  "Electronics",
  "Apparel",
  "Beauty",
  "Home Goods",
  "Food",
  "Auto Parts",
  "Toys",
  "Furniture",
  "All Categories",
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function scoreColor(v: number): string {
  if (v < 40) return "#22C55E"
  if (v <= 70) return "#F59E0B"
  return "#EF4444"
}

function scoreLabel(v: number): string {
  if (v < 40) return "Low"
  if (v <= 70) return "Medium"
  return "High"
}

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "improving")
    return <ArrowDownRight className="w-4 h-4 text-green-500" />
  if (trend === "worsening")
    return <ArrowUpRight className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-gray-400" />
}

function trendLabel(t: Trend): string {
  if (t === "improving") return "Improving"
  if (t === "worsening") return "Worsening"
  return "Stable"
}

function Sparkline({
  data,
  color,
  width = 80,
  height = 28,
}: {
  data: number[]
  color: string
  width?: number
  height?: number
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {data.length > 0 && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * width}
          cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
          r="3"
          fill={color}
        />
      )}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const alertEntrance = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RiskMonitorContent() {
  const [severityFilter, setSeverityFilter] = useState<"all" | Severity>("all")
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set())
  const [copiedAlertId, setCopiedAlertId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("electronics")
  const [selectedCountry, setSelectedCountry] = useState("CN")
  const [compareMode, setCompareMode] = useState(false)
  const [compareCountry, setCompareCountry] = useState("VN")
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
    new Set()
  )
  const [emailInput, setEmailInput] = useState("")
  const [emailCategory, setEmailCategory] = useState("All Categories")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  const filteredAlerts = useMemo(
    () =>
      severityFilter === "all"
        ? TRADE_ALERTS
        : TRADE_ALERTS.filter((a) => a.severity === severityFilter),
    [severityFilter]
  )

  const tariffData = useMemo(() => {
    const cat = PRODUCT_CATEGORIES[selectedCategory]
    const data = cat?.tariffs[selectedCountry]
    if (!data) return { rate: 0, perUnit: 0, annual: 0 }
    return {
      rate: data.rate,
      perUnit: data.perUnit,
      annual: data.perUnit * 10000,
    }
  }, [selectedCategory, selectedCountry])

  const compareTariffData = useMemo(() => {
    const cat = PRODUCT_CATEGORIES[selectedCategory]
    const data = cat?.tariffs[compareCountry]
    if (!data) return { rate: 0, perUnit: 0, annual: 0 }
    return {
      rate: data.rate,
      perUnit: data.perUnit,
      annual: data.perUnit * 10000,
    }
  }, [selectedCategory, compareCountry])

  const annualSavings = useMemo(() => {
    return Math.abs(tariffData.annual - compareTariffData.annual)
  }, [tariffData.annual, compareTariffData.annual])

  const cheaperCountry = useMemo(() => {
    if (tariffData.annual < compareTariffData.annual) return selectedCountry
    if (compareTariffData.annual < tariffData.annual) return compareCountry
    return null
  }, [tariffData.annual, compareTariffData.annual, selectedCountry, compareCountry])

  function toggleAlert(id: number) {
    setExpandedAlerts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function copyAlert(alert: TradeAlert) {
    const text = `[${SEVERITY_CONFIG[alert.severity].label}] ${alert.title}\n\nImpact: ${alert.impact}\n\nDetails: ${alert.details}\n\nSource: ${alert.source}\n\nCountries: ${alert.countries.join(", ")}\nCategories: ${alert.categories.join(", ")}`
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAlertId(alert.id)
      setTimeout(() => setCopiedAlertId(null), 2000)
    })
  }

  function toggleCountry(code: string) {
    setExpandedCountries((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
      setTimeout(() => setEmailSubmitted(false), 4000)
      setEmailInput("")
    }
  }

  const countryLabel = (code: string) =>
    SOURCE_COUNTRIES.find((c) => c.code === code)?.label ?? code

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ----------------------------------------------------------------- */}
      {/* Nav */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Tools
          </Link>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Hero -- Global Risk Score */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-[#1A1A1A] text-white pb-16 pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm text-gray-300 border border-white/10">
                <Activity className="w-3.5 h-3.5 text-[#FF6B35]" />
                Live data -- Q1 2026
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Supply Chain Risk Monitor
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-400 max-w-2xl mx-auto mb-10 text-base sm:text-lg"
            >
              Track tariff volatility, shipping disruptions, currency
              fluctuations, and geopolitical events affecting global
              manufacturing. 15 active alerts across 8 source countries.
            </motion.p>

            {/* Big score */}
            <motion.div variants={fadeUp} custom={3} className="mb-4">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                Global Manufacturing Risk Index
              </p>
              <div className="flex items-end justify-center gap-2">
                <motion.span
                  className="text-7xl sm:text-8xl font-extrabold tabular-nums"
                  style={{ color: scoreColor(GLOBAL_RISK_SCORE) }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                    delay: 0.3,
                  }}
                >
                  {GLOBAL_RISK_SCORE}
                </motion.span>
                <span className="text-2xl text-gray-500 mb-3">/100</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {scoreLabel(GLOBAL_RISK_SCORE)} Risk -- Elevated by Section
                301 tariffs, Red Sea disruptions, and Taiwan Strait tensions
              </p>
            </motion.div>

            {/* Sub-scores */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-10"
            >
              {SUB_SCORES.map((s) => {
                const Icon = s.icon
                const color = scoreColor(s.value)
                return (
                  <div
                    key={s.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                  >
                    <Icon
                      className="w-5 h-5 mx-auto mb-2"
                      style={{ color }}
                    />
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {s.label}
                    </p>
                    <p
                      className="text-2xl font-bold tabular-nums"
                      style={{ color }}
                    >
                      {s.value}
                    </p>
                    {/* Bar */}
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.value}%` }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94] as const,
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Active Trade Alerts */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  Active Trade Alerts
                </h2>
                <p className="text-gray-500 mt-1">
                  {TRADE_ALERTS.length} alerts -- Click to expand full impact
                  details
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                {(
                  ["all", "critical", "warning", "opportunity"] as const
                ).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSeverityFilter(f)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      severityFilter === f
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-gray-600 border-[#E8E8E4] hover:border-gray-400"
                    }`}
                  >
                    {f === "all"
                      ? `All (${TRADE_ALERTS.length})`
                      : `${f.charAt(0).toUpperCase() + f.slice(1)} (${TRADE_ALERTS.filter((a) => a.severity === f).length})`}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Alert list */}
            <div className="space-y-3 max-h-[900px] overflow-y-auto pr-1 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredAlerts.map((alert, i) => {
                  const cfg = SEVERITY_CONFIG[alert.severity]
                  const isExpanded = expandedAlerts.has(alert.id)
                  const isCopied = copiedAlertId === alert.id
                  return (
                    <motion.div
                      key={alert.id}
                      layout
                      variants={alertEntrance}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={i}
                      className={`bg-white border ${cfg.border} rounded-xl hover:shadow-md transition-shadow cursor-pointer`}
                      onClick={() => toggleAlert(alert.id)}
                    >
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                          {/* Severity badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${cfg.bg} ${cfg.color} shrink-0`}
                          >
                            <span>{cfg.icon}</span>
                            {cfg.label}
                          </span>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base leading-snug">
                                {alert.title}
                              </h3>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {alert.relativeDate}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyAlert(alert)
                                  }}
                                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                                  title="Copy alert to clipboard"
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                                  )}
                                </button>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                </motion.div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                              {alert.impact}
                            </p>

                            {/* Expanded details */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 pt-4 border-t border-[#E8E8E4]">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {alert.details}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                      <span className="text-xs text-gray-400">
                                        Source:
                                      </span>
                                      <span className="text-xs font-medium text-[#FF6B35]">
                                        {alert.source}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                      Published: {alert.date}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {alert.countries.map((c) => (
                                <span
                                  key={c}
                                  className="px-2 py-0.5 text-xs rounded bg-[#F5F5F3] text-gray-600 border border-[#E8E8E4]"
                                >
                                  {c}
                                </span>
                              ))}
                              {alert.categories.map((c) => (
                                <span
                                  key={c}
                                  className="px-2 py-0.5 text-xs rounded bg-orange-50 text-[#FF6B35] border border-orange-200"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {filteredAlerts.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No alerts matching this filter.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Risk Timeline */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  Risk Timeline
                </h2>
              </div>
              <p className="text-gray-500">
                Upcoming trade events and policy deadlines that may impact your
                supply chain
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <div
                ref={timelineRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
                style={{ scrollbarColor: "#D1D5DB transparent" }}
              >
                {TIMELINE_EVENTS.map((event, i) => {
                  const cfg = TIMELINE_IMPACT_CONFIG[event.impact]
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
                      className={`snap-start shrink-0 w-[280px] sm:w-[320px] bg-white border ${cfg.border} rounded-xl p-5 hover:shadow-md transition-shadow`}
                    >
                      {/* Date + impact dot */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-[#1A1A1A]">
                          {event.date}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-full ${cfg.bg} ${cfg.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                          />
                          {event.impact.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug mb-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {event.countries.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-xs rounded bg-[#F5F5F3] text-gray-600 border border-[#E8E8E4]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              {/* Scroll hint */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <ArrowLeft className="w-3 h-3" />
                Scroll to see all {TIMELINE_EVENTS.length} events
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Country Risk Heatmap */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Country Risk Heatmap
              </h2>
              <p className="text-gray-500 mt-1">
                Sourcing risk by country with 6-month trend -- click any card
                for sub-score breakdown
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COUNTRY_RISKS.map((c, i) => {
                const rCfg = RISK_LEVEL_CONFIG[c.risk]
                const isExpanded = expandedCountries.has(c.code)
                return (
                  <motion.div
                    key={c.code}
                    variants={fadeUp}
                    custom={i + 1}
                    className={`bg-white border ${rCfg.border} rounded-xl hover:shadow-md transition-shadow cursor-pointer`}
                    onClick={() => toggleCountry(c.code)}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{c.flag}</span>
                          <span className="font-semibold text-[#1A1A1A]">
                            {c.name}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${rCfg.bg} ${rCfg.color}`}
                        >
                          {c.risk}
                        </span>
                      </div>

                      {/* Score bar + sparkline */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Risk Score</span>
                          <div className="flex items-center gap-2">
                            <Sparkline
                              data={c.sparkline}
                              color={scoreColor(c.score)}
                              width={60}
                              height={20}
                            />
                            <span
                              className="font-semibold tabular-nums"
                              style={{ color: scoreColor(c.score) }}
                            >
                              {c.score}/100
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#E8E8E4] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: scoreColor(c.score),
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${c.score}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              ease: [0.25, 0.46, 0.45, 0.94] as const,
                              delay: 0.2 + i * 0.05,
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mb-2">
                        {c.topFactor}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs">
                          <TrendIcon trend={c.trend} />
                          <span
                            className={
                              c.trend === "improving"
                                ? "text-green-600"
                                : c.trend === "worsening"
                                ? "text-red-500"
                                : "text-gray-400"
                            }
                          >
                            {trendLabel(c.trend)}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-300" />
                        </motion.div>
                      </div>

                      {/* Sub-scores expanded */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-[#E8E8E4] space-y-3">
                              {/* Trade Policy */}
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="flex items-center gap-1.5 text-gray-600">
                                    <Shield className="w-3 h-3" />
                                    Trade Policy
                                  </span>
                                  <span
                                    className="font-semibold tabular-nums"
                                    style={{
                                      color: scoreColor(
                                        c.subScores.tradePolicy
                                      ),
                                    }}
                                  >
                                    {c.subScores.tradePolicy}/100
                                  </span>
                                </div>
                                <div className="h-1 rounded-full bg-[#E8E8E4] overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: scoreColor(
                                        c.subScores.tradePolicy
                                      ),
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${c.subScores.tradePolicy}%`,
                                    }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                  />
                                </div>
                              </div>

                              {/* Infrastructure */}
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="flex items-center gap-1.5 text-gray-600">
                                    <Truck className="w-3 h-3" />
                                    Infrastructure
                                  </span>
                                  <span
                                    className="font-semibold tabular-nums"
                                    style={{
                                      color: scoreColor(
                                        c.subScores.infrastructure
                                      ),
                                    }}
                                  >
                                    {c.subScores.infrastructure}/100
                                  </span>
                                </div>
                                <div className="h-1 rounded-full bg-[#E8E8E4] overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: scoreColor(
                                        c.subScores.infrastructure
                                      ),
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${c.subScores.infrastructure}%`,
                                    }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                  />
                                </div>
                              </div>

                              {/* Labor Market */}
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="flex items-center gap-1.5 text-gray-600">
                                    <Users className="w-3 h-3" />
                                    Labor Market
                                  </span>
                                  <span
                                    className="font-semibold tabular-nums"
                                    style={{
                                      color: scoreColor(
                                        c.subScores.laborMarket
                                      ),
                                    }}
                                  >
                                    {c.subScores.laborMarket}/100
                                  </span>
                                </div>
                                <div className="h-1 rounded-full bg-[#E8E8E4] overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: scoreColor(
                                        c.subScores.laborMarket
                                      ),
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${c.subScores.laborMarket}%`,
                                    }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Tariff Impact Calculator */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-[#FF6B35]" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  Tariff Impact Calculator
                </h2>
              </div>
              <p className="text-gray-500">
                Estimate landed cost impact across 8 product categories and 8
                source countries
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-white border border-[#E8E8E4] rounded-2xl p-6 sm:p-8"
            >
              {/* Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Category
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                    >
                      {Object.entries(PRODUCT_CATEGORIES).map(
                        ([key, cat]) => (
                          <option key={key} value={key}>
                            {cat.label}
                          </option>
                        )
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Country A */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {compareMode ? "Country A" : "Source Country"}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full appearance-none bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                    >
                      {SOURCE_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Country B or compare toggle */}
                <div>
                  {compareMode ? (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Country B
                      </label>
                      <div className="relative">
                        <select
                          value={compareCountry}
                          onChange={(e) => setCompareCountry(e.target.value)}
                          className="w-full appearance-none bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                        >
                          {SOURCE_COUNTRIES.filter(
                            (c) => c.code !== selectedCountry
                          ).map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-end h-full">
                      <button
                        onClick={() => setCompareMode(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/5 transition-colors"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                        Compare Countries
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {compareMode && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setCompareMode(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Exit compare mode
                  </button>
                </div>
              )}

              {/* Results */}
              {!compareMode ? (
                /* Single country mode */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Current Tariff Rate
                    </p>
                    <motion.p
                      key={`rate-${selectedCategory}-${selectedCountry}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold tabular-nums"
                      style={{ color: scoreColor(tariffData.rate * 2.5) }}
                    >
                      {tariffData.rate}%
                    </motion.p>
                  </div>

                  <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Extra Cost / $10 Unit
                    </p>
                    <motion.p
                      key={`unit-${selectedCategory}-${selectedCountry}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold tabular-nums text-[#1A1A1A]"
                    >
                      ${tariffData.perUnit.toFixed(2)}
                    </motion.p>
                  </div>

                  <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Annual Cost (10K units)
                    </p>
                    <motion.p
                      key={`annual-${selectedCategory}-${selectedCountry}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold tabular-nums"
                      style={{
                        color:
                          tariffData.annual > 10000
                            ? "#EF4444"
                            : tariffData.annual > 3000
                            ? "#F59E0B"
                            : "#22C55E",
                      }}
                    >
                      ${tariffData.annual.toLocaleString()}
                    </motion.p>
                  </div>
                </div>
              ) : (
                /* Compare mode */
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Country A */}
                    <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-5">
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-4 text-center">
                        {SOURCE_COUNTRIES.find((c) => c.code === selectedCountry)?.flag}{" "}
                        {countryLabel(selectedCountry)}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Tariff Rate</span>
                          <span
                            className="text-lg font-bold tabular-nums"
                            style={{ color: scoreColor(tariffData.rate * 2.5) }}
                          >
                            {tariffData.rate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Cost / $10 Unit</span>
                          <span className="text-lg font-bold tabular-nums text-[#1A1A1A]">
                            ${tariffData.perUnit.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Annual (10K units)</span>
                          <span
                            className="text-lg font-bold tabular-nums"
                            style={{
                              color:
                                tariffData.annual > 10000
                                  ? "#EF4444"
                                  : tariffData.annual > 3000
                                  ? "#F59E0B"
                                  : "#22C55E",
                            }}
                          >
                            ${tariffData.annual.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Country B */}
                    <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-5">
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-4 text-center">
                        {SOURCE_COUNTRIES.find((c) => c.code === compareCountry)?.flag}{" "}
                        {countryLabel(compareCountry)}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Tariff Rate</span>
                          <span
                            className="text-lg font-bold tabular-nums"
                            style={{
                              color: scoreColor(compareTariffData.rate * 2.5),
                            }}
                          >
                            {compareTariffData.rate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Cost / $10 Unit</span>
                          <span className="text-lg font-bold tabular-nums text-[#1A1A1A]">
                            ${compareTariffData.perUnit.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Annual (10K units)</span>
                          <span
                            className="text-lg font-bold tabular-nums"
                            style={{
                              color:
                                compareTariffData.annual > 10000
                                  ? "#EF4444"
                                  : compareTariffData.annual > 3000
                                  ? "#F59E0B"
                                  : "#22C55E",
                            }}
                          >
                            ${compareTariffData.annual.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings callout */}
                  {annualSavings > 0 && cheaperCountry && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
                    >
                      <p className="text-sm text-green-800">
                        <span className="font-bold">
                          Switch to {countryLabel(cheaperCountry)}
                        </span>{" "}
                        for{" "}
                        <span className="font-bold text-green-600">
                          {PRODUCT_CATEGORIES[selectedCategory].label}
                        </span>{" "}
                        to save{" "}
                        <span className="text-xl font-extrabold text-green-600">
                          ${annualSavings.toLocaleString()}
                        </span>{" "}
                        /year on 10,000 units
                      </p>
                    </motion.div>
                  )}

                  {annualSavings === 0 && (
                    <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-500">
                        Both countries have the same tariff cost for this category.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!compareMode && tariffData.rate === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-600 mt-4 flex items-center gap-1.5"
                >
                  <TrendingUp className="w-4 h-4" />
                  This country-category combination currently has 0% tariff --
                  optimal for cost savings.
                </motion.p>
              )}

              {!compareMode && tariffData.rate >= 25 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 mt-4 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4" />
                  High tariff exposure. Click &quot;Compare Countries&quot; to
                  find lower-cost alternatives.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Email Alert Signup */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B35]/10 text-sm text-[#FF6B35] border border-[#FF6B35]/20 mb-4">
                <Mail className="w-3.5 h-3.5" />
                Weekly Briefings
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Get Weekly Risk Briefings
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Tariff changes, shipping disruptions, and trade policy updates
                for your product category -- delivered every Monday.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <form
                onSubmit={handleEmailSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={emailCategory}
                        onChange={(e) => setEmailCategory(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                      >
                        {EMAIL_CATEGORIES.map((cat) => (
                          <option
                            key={cat}
                            value={cat}
                            className="bg-[#1A1A1A]"
                          >
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full px-6 py-2.5 bg-[#FF6B35] hover:bg-[#e55a25] text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      {emailSubmitted ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4" />
                          Subscribed
                        </span>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-3 text-center">
                  Free weekly digest. Unsubscribe anytime. No spam.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* CTA -- Personalized Risk Assessment */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B35]/10 text-sm text-[#FF6B35] border border-[#FF6B35]/20 mb-6"
            >
              <Package className="w-3.5 h-3.5" />
              Personalized Analysis
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
            >
              How This Affects{" "}
              <span className="text-[#FF6B35]">Your</span> Product
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-4"
            >
              These {TRADE_ALERTS.length} alerts are general market
              intelligence. Get a personalized risk assessment for YOUR specific
              product with actionable mitigation strategies.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-gray-400 text-sm max-w-lg mx-auto mb-8"
            >
              Your $99 report includes product-specific tariff exposure, country
              recommendations adjusted for current Q1 2026 conditions, and a
              risk mitigation checklist.
            </motion.p>

            <motion.div variants={fadeUp} custom={4}>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF6B35] hover:bg-[#e55a25] text-white font-semibold rounded-full transition-colors text-base"
              >
                Get Your Personalized Report
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={5}
              className="text-xs text-gray-400 mt-4"
            >
              Delivered in 2-5 minutes via AI analysis. Money-back guarantee.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
