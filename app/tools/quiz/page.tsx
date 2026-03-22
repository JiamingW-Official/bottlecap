"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  Factory,
  DollarSign,
  Clock,
  Zap,
  Timer,
  CalendarClock,
  Cpu,
  Shirt,
  Package,
  Wrench,
  Home,
  Sparkles,
  UtensilsCrossed,
  MoreHorizontal,
  Banknote,
  TrendingUp,
  Globe,
  AlertTriangle,
  ArrowRight,
  Star,
  ShieldAlert,
  BarChart2,
  Target,
  ArrowLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Option {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
}

interface Answers {
  productType?: string;
  budget?: string;
  timeline?: string;
  priority?: string;
  country?: string;
  moq?: string;
  market?: string;
}

interface Recommendation {
  method: string;
  country: string;
  cost: string;
  timeline: string;
  countryReason: string;
  nextSteps: string[];
  matchScore: number;
  riskFactors: string[];
  tariffAlert: string | null;
}

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: "productType",
    title: "What type of product are you manufacturing?",
    subtitle: "This helps us match you with the right factories and processes.",
    options: [
      { id: "electronics", label: "Electronics / Tech", icon: <Cpu className="w-4 h-4" /> },
      { id: "apparel", label: "Apparel / Clothing", icon: <Shirt className="w-4 h-4" /> },
      { id: "plastic", label: "Plastic / Injection Molded", icon: <Package className="w-4 h-4" /> },
      { id: "metal", label: "Metal / Hardware", icon: <Wrench className="w-4 h-4" /> },
      { id: "home", label: "Home &amp; Kitchen", icon: <Home className="w-4 h-4" /> },
      { id: "beauty", label: "Beauty / Cosmetics", icon: <Sparkles className="w-4 h-4" /> },
      { id: "food", label: "Food &amp; Beverage", icon: <UtensilsCrossed className="w-4 h-4" /> },
      { id: "other", label: "Other", icon: <MoreHorizontal className="w-4 h-4" /> },
    ],
  },
  {
    id: "budget",
    title: "What&apos;s your total manufacturing budget?",
    subtitle: "Include tooling, sampling, and first production run.",
    options: [
      { id: "under5k", label: "Under $5,000", icon: <Banknote className="w-4 h-4" /> },
      { id: "5k-15k", label: "$5,000 \u2013 $15,000", icon: <DollarSign className="w-4 h-4" /> },
      { id: "15k-50k", label: "$15,000 \u2013 $50,000", icon: <TrendingUp className="w-4 h-4" /> },
      { id: "over50k", label: "$50,000+", icon: <Star className="w-4 h-4" /> },
    ],
  },
  {
    id: "timeline",
    title: "When do you need your first units?",
    subtitle: "Timelines affect factory selection and shipping method.",
    options: [
      { id: "asap", label: "ASAP (under 60 days)", icon: <Zap className="w-4 h-4" /> },
      { id: "3months", label: "Within 3 months", icon: <Timer className="w-4 h-4" /> },
      { id: "6months", label: "Within 6 months", icon: <Clock className="w-4 h-4" /> },
      { id: "flexible", label: "Flexible / No rush", icon: <CalendarClock className="w-4 h-4" /> },
    ],
  },
  {
    id: "priority",
    title: "What&apos;s your #1 manufacturing priority?",
    subtitle: "Trade-offs exist between cost, quality, speed, and design.",
    options: [
      { id: "cost", label: "Lowest cost per unit", icon: <Banknote className="w-4 h-4" /> },
      { id: "quality", label: "Premium quality", icon: <Star className="w-4 h-4" /> },
      { id: "speed", label: "Fastest turnaround", icon: <Zap className="w-4 h-4" /> },
      { id: "design", label: "Custom design / branding", icon: <Sparkles className="w-4 h-4" /> },
    ],
  },
  {
    id: "country",
    title: "Do you have a preferred manufacturing country?",
    subtitle: "Each region has distinct cost, quality, and compliance profiles.",
    options: [
      { id: "china", label: "China", icon: <Globe className="w-4 h-4" /> },
      { id: "vietnam", label: "Vietnam / Southeast Asia", icon: <Globe className="w-4 h-4" /> },
      { id: "india", label: "India", icon: <Globe className="w-4 h-4" /> },
      { id: "domestic", label: "Domestic (US/EU)", icon: <Home className="w-4 h-4" /> },
    ],
  },
  {
    id: "moq",
    title: "What&apos;s your minimum order quantity (MOQ) target?",
    subtitle: "Your MOQ determines which factories will work with you.",
    options: [
      { id: "1-99", label: "1\u201399 units", icon: <Package className="w-4 h-4" /> },
      { id: "100-499", label: "100\u2013499 units", icon: <Package className="w-4 h-4" /> },
      { id: "500-2000", label: "500\u20132,000 units", icon: <Factory className="w-4 h-4" /> },
      { id: "2000+", label: "2,000+ units", icon: <Factory className="w-4 h-4" /> },
    ],
  },
  {
    id: "market",
    title: "Where is your primary target market?",
    subtitle: "Market destination affects compliance requirements and tariffs.",
    options: [
      { id: "us", label: "United States", icon: <Globe className="w-4 h-4" /> },
      { id: "eu", label: "European Union", icon: <Globe className="w-4 h-4" /> },
      { id: "apac", label: "Asia Pacific", icon: <Globe className="w-4 h-4" /> },
      { id: "global", label: "Global / Multi-region", icon: <Globe className="w-4 h-4" /> },
    ],
  },
];

// ─── Comparable products map ──────────────────────────────────────────────────

const COMPARABLE_PRODUCTS: Record<string, string[]> = {
  electronics: [
    "Smart scale ($12\u2013$18/unit, MOQ 500)",
    "Wireless earbuds ($8\u2013$22/unit, MOQ 1,000)",
    "USB hub ($3\u2013$7/unit, MOQ 200)",
  ],
  apparel: [
    "Custom t-shirt ($3\u2013$6/unit, MOQ 200)",
    "Hoodie ($8\u2013$15/unit, MOQ 100)",
    "Gym shorts ($4\u2013$9/unit, MOQ 300)",
  ],
  plastic: [
    "Water bottle ($2\u2013$5/unit, MOQ 500)",
    "Phone case ($1.50\u2013$3/unit, MOQ 1,000)",
    "Storage container ($3\u2013$8/unit, MOQ 200)",
  ],
  metal: [
    "Stainless tumbler ($5\u2013$12/unit, MOQ 300)",
    "Carabiner ($1\u2013$3/unit, MOQ 500)",
    "Metal bracket ($2\u2013$6/unit, MOQ 200)",
  ],
  home: [
    "Bamboo cutting board ($4\u2013$9/unit, MOQ 200)",
    "Silicone mat ($2\u2013$5/unit, MOQ 300)",
    "Ceramic mug ($2\u2013$6/unit, MOQ 200)",
  ],
  beauty: [
    "Lip gloss ($1.50\u2013$4/unit, MOQ 500)",
    "Face serum ($3\u2013$8/unit, MOQ 300)",
    "Makeup brush set ($4\u2013$10/unit, MOQ 200)",
  ],
  food: [
    "Glass jar ($0.80\u2013$2/unit, MOQ 1,000)",
    "Mylar bag ($0.20\u2013$0.60/unit, MOQ 2,000)",
    "Kraft box ($0.30\u2013$0.80/unit, MOQ 500)",
  ],
  other: [
    "Custom packaging ($0.50\u2013$2/unit, MOQ 1,000)",
    "Promotional item ($1\u2013$5/unit, MOQ 500)",
  ],
};

// ─── Recommendation engine ────────────────────────────────────────────────────

function getRecommendation(answers: Answers): Recommendation {
  const { productType, budget, timeline, priority, country, moq, market } = answers;

  // Method
  let method = "Contract Manufacturing";
  if (budget === "under5k") method = "White-Label / Print-on-Demand";
  else if (budget === "5k-15k" && priority === "cost") method = "OEM Manufacturing";
  else if (priority === "design") method = "ODM (Original Design Manufacturer)";
  else if (budget === "over50k") method = "Custom Contract Manufacturing";

  // Country + reason
  const chosenCountry = country || "china";
  let countryReason = "";

  if (chosenCountry === "china") {
    countryReason =
      "China offers the broadest supplier base and lowest tooling costs. Lead times are typically 45\u201390 days for sea freight.";
    if (market === "eu") {
      countryReason +=
        " Note: EU-bound goods from China require CE certification and may be subject to anti-dumping duties on certain categories.";
    }
    if (market === "us") {
      countryReason +=
        " Be aware of Section 301 tariffs (up to 25%) on goods imported from China into the US.";
    }
  } else if (chosenCountry === "vietnam") {
    countryReason =
      "Vietnam is ideal for apparel, footwear, and electronics assembly. Favorable trade terms and lower tariff exposure vs. China.";
    if (market === "eu") {
      countryReason +=
        " The EU-Vietnam Free Trade Agreement (EVFTA) provides preferential duty rates for many product categories.";
    }
  } else if (chosenCountry === "india") {
    countryReason =
      "India excels in textiles, pharmaceuticals, and metal fabrication. GSP benefits may apply for US imports depending on product category.";
    if (market === "eu") {
      countryReason +=
        " EU-India FTA negotiations are ongoing \u2014 check current duty rates via the EU Trade Helpdesk.";
    }
  } else {
    countryReason =
      "Domestic manufacturing eliminates tariff risk and shortens supply chains significantly. Expect 2\u20134x higher per-unit costs vs. Asia.";
    if (market === "eu") {
      countryReason +=
        " EU manufacturers must comply with CE marking, REACH, and RoHS directives where applicable.";
    }
  }

  if (moq === "1-99") {
    countryReason +=
      " With a sub-100 MOQ, focus on small-batch suppliers or US/EU local manufacturers willing to do prototyping runs.";
  } else if (moq === "2000+") {
    countryReason +=
      " At 2,000+ units you unlock factory-direct pricing and dedicated production lines.";
  }

  // Cost estimate
  let cost = "$8\u2013$15/unit (estimated)";
  if (budget === "under5k") cost = "$10\u2013$25/unit (small batch premium)";
  else if (budget === "over50k") cost = "$3\u2013$8/unit (volume pricing)";
  else if (priority === "cost") cost = "$4\u2013$10/unit (cost-optimized)";

  // Timeline
  let timelineStr = "90\u2013120 days";
  if (timeline === "asap") timelineStr = "30\u201360 days (air freight required)";
  else if (timeline === "3months") timelineStr = "60\u201390 days";
  else if (timeline === "flexible") timelineStr = "120\u2013180 days (sea freight, lowest cost)";

  // Next steps (5)
  const countryLabel =
    chosenCountry === "domestic"
      ? "domestic"
      : chosenCountry.charAt(0).toUpperCase() + chosenCountry.slice(1);

  const nextSteps = [
    "Validate your concept with a rapid prototype or 3D print before committing to tooling.",
    `Request quotes from 3\u20135 verified ${countryLabel} suppliers via Alibaba, Faire, or ThomasNet.`,
    "Order a paid sample ($50\u2013$300) to assess quality before placing your production order.",
    "Run a landed cost calculation including tariffs, freight, and duties \u2014 use our Cost Calculator tool.",
    "Secure a manufacturing agreement (NDA + PO terms) before wiring any deposit.",
  ];

  // Match score
  let score = 70;
  if (budget !== "under5k") score += 5;
  if (priority === "cost" && chosenCountry === "china") score += 7;
  if (priority === "quality" && (chosenCountry === "domestic" || chosenCountry === "vietnam")) score += 7;
  if (timeline !== "asap") score += 5;
  if (moq === "500-2000" || moq === "2000+") score += 6;
  score = Math.min(score, 97);

  // Risk factors
  const riskFactors: string[] = [];
  if (budget === "under5k" && priority === "design") {
    riskFactors.push(
      "Low budget + custom design is high-risk. Consider starting with a white-label product and adding branding later."
    );
  }
  if (timeline === "asap" && chosenCountry === "china") {
    riskFactors.push(
      "ASAP timeline + China sourcing is difficult. Air freight adds $3\u2013$8/kg; factor this into your unit economics."
    );
  }
  if (moq === "1-99" && (productType === "electronics" || productType === "plastic")) {
    riskFactors.push(
      "Sub-100 MOQ for electronics or injection-molded plastic is very difficult to source at competitive prices. Explore on-demand manufacturers."
    );
  }
  if (riskFactors.length === 0) {
    riskFactors.push(
      "Your answers look well-aligned. Biggest remaining risk is supplier due diligence \u2014 always verify factory credentials independently."
    );
  }

  // Tariff alert
  let tariffAlert: string | null = null;
  if (chosenCountry === "china" && market === "us") {
    tariffAlert =
      "Section 301 tariffs of up to 25% apply to most Chinese-origin goods imported into the US. This can significantly impact your landed cost.";
  }

  return {
    method,
    country: chosenCountry,
    cost,
    timeline: timelineStr,
    countryReason,
    nextSteps,
    matchScore: score,
    riskFactors,
    tariffAlert,
  };
}

// ─── Slide animation variants ─────────────────────────────────────────────────

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

const slideTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const TOTAL = 7;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);

  const isQuizDone = step >= TOTAL;
  const currentQuestion = step < TOTAL ? QUESTIONS[step] : null;
  const progressPct = Math.round((Math.min(step, TOTAL) / TOTAL) * 100);

  function handleSelect(optionId: string) {
    setSelected(optionId);
  }

  function handleNext() {
    if (!selected || !currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
    setSelected(null);
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setSelected(null);
  }

  const recommendation = isQuizDone ? getRecommendation(answers) : null;
  const comparables = answers.productType
    ? (COMPARABLE_PRODUCTS[answers.productType] ?? COMPARABLE_PRODUCTS.other)
    : [];

  // Recommended next tool
  let nextToolLabel = "Tariff Calculator";
  let nextToolHref = "/tools/tariff-calculator";
  if (answers.budget === "15k-50k" || answers.budget === "over50k") {
    nextToolLabel = "Cost Calculator";
    nextToolHref = "/tools/cost-calculator";
  } else if (answers.priority === "cost") {
    nextToolLabel = "Country Comparison";
    nextToolHref = "/tools/country-compare";
  } else if (answers.productType === "electronics") {
    nextToolLabel = "HS Code Lookup";
    nextToolHref = "/tools/hs-lookup";
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
              <Factory className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Manufacturing Readiness Quiz</h1>
          </div>
          <p className="text-sm text-gray-500 ml-12">
            Answer 7 questions to get a personalized manufacturing recommendation.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-gray-900">Tools</Link>
          <span>/</span>
          <span className="text-gray-900">Manufacturing Quiz</span>
        </nav>

        {/* Progress bar + dots */}
        {!isQuizDone && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Question {step + 1} of {TOTAL}
              </span>
              <span className="text-sm font-medium text-[#FF6B35]">{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="h-2 rounded-full bg-[#FF6B35]"
                animate={{ width: `${progressPct}%` }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
              />
            </div>
            {/* Progress dots */}
            <div className="flex gap-2 justify-center">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 rounded-full ${
                    i < step
                      ? "w-2.5 h-2.5 bg-[#FF6B35]"
                      : i === step
                      ? "w-2.5 h-2.5 bg-white border-2 border-[#FF6B35] scale-125"
                      : "w-2.5 h-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quiz questions */}
        {!isQuizDone && currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2
                  className="text-2xl font-semibold text-gray-900 mb-2 leading-snug"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.title }}
                />
                <p className="text-gray-500 mb-7 text-sm">{currentQuestion.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-colors duration-150 ${
                        selected === option.id
                          ? "border-[#FF6B35] bg-[#FF6B35]/5 text-gray-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 ${
                          selected === option.id ? "text-[#FF6B35]" : "text-gray-400"
                        }`}
                      >
                        {option.icon}
                      </span>
                      <span className="text-sm font-medium">{option.label}</span>
                      {selected === option.id && (
                        <CheckCircle className="w-4 h-4 text-[#FF6B35] ml-auto flex-shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                  ) : (
                    <div />
                  )}
                  <motion.button
                    onClick={handleNext}
                    disabled={!selected}
                    whileHover={selected ? { scale: 1.02 } : {}}
                    whileTap={selected ? { scale: 0.98 } : {}}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                      selected
                        ? "bg-[#FF6B35] text-white hover:bg-[#e85d2a] shadow-sm"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {step === TOTAL - 1 ? "See my results" : "Next question"}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Results */}
        {isQuizDone && recommendation && (
          <AnimatePresence mode="wait">
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              }}
            >
              {/* Results banner */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#FF6B35]/5 to-[#FF6B35]/10 border border-[#FF6B35]/20 p-8 mb-6 overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF6B35]/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-[#FF6B35]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      Your Manufacturing Recommendation
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Based on your answers, here&apos;s what we recommend for your product.
                    </p>
                  </div>
                  {/* Match score badge */}
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-green-100 border border-green-200 rounded-xl px-4 py-2">
                      <div className="text-2xl font-bold text-green-700">
                        {recommendation.matchScore}%
                      </div>
                      <div className="text-xs text-green-600 font-medium">Match Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tariff alert */}
              {recommendation.tariffAlert && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800 mb-1">Tariff Alert</p>
                    <p className="text-sm text-red-700">{recommendation.tariffAlert}</p>
                    <Link
                      href="/tools/tariff-calculator"
                      className="inline-flex items-center gap-1 text-sm text-red-700 font-medium underline mt-2 hover:text-red-900"
                    >
                      Calculate your tariff exposure
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Core result cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-[#FF6B35] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Recommended Method
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{recommendation.method}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-blue-400 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Sourcing Region
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 capitalize">{recommendation.country}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-green-400 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Cost Estimate
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{recommendation.cost}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-purple-400 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Timeline
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{recommendation.timeline}</p>
                </div>
              </div>

              {/* Country reason */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">Why this region?</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{recommendation.countryReason}</p>
              </div>

              {/* Risk factors */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800">Risk Factors</span>
                </div>
                <ul className="space-y-3">
                  {recommendation.riskFactors.map((rf, i) => (
                    <li key={i} className="flex gap-2 text-sm text-amber-800">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {rf}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comparable products */}
              {comparables.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Comparable Products</span>
                  </div>
                  <ul className="space-y-2">
                    {comparables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5"
                      >
                        <Package className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    Prices are indicative ranges based on standard market conditions. Request supplier quotes for accurate pricing.
                  </p>
                </div>
              )}

              {/* Next steps */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm font-semibold text-gray-700">Your 5-Step Action Plan</span>
                </div>
                <ol className="space-y-3">
                  {recommendation.nextSteps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recommended next tool */}
              <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-[#FF6B35]" />
                      <span className="text-sm font-semibold text-[#FF6B35]">
                        Recommended Next Tool
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Based on your profile, the{" "}
                      <span className="font-semibold">{nextToolLabel}</span> will give you the most
                      actionable next data point.
                    </p>
                  </div>
                  <Link
                    href={nextToolHref}
                    className="flex-shrink-0 flex items-center gap-1.5 bg-[#FF6B35] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#e85d2a] transition-colors"
                  >
                    Open tool
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* CTA + restart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/analyze"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B35] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#e85d2a] transition-colors shadow-sm text-sm"
                >
                  Get a full AI manufacturing report
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 font-medium py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Retake quiz
                </button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-gray-400 text-center mt-6">
                This recommendation is generated algorithmically based on your inputs. For a detailed,
                AI-powered analysis with supplier lists and cost breakdowns, use the full report tool above.
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
