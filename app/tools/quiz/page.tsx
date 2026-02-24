"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ClipboardList,
  Globe,
  DollarSign,
  Clock,
  Shield,
  Mail,
  CheckCircle,
} from "lucide-react"

const QUESTIONS = [
  {
    id: "productType",
    title: "What type of product are you manufacturing?",
    options: [
      { value: "electronics", label: "Electronics" },
      { value: "apparel", label: "Apparel / Textiles" },
      { value: "plastic", label: "Plastic / Rubber" },
      { value: "metal", label: "Metal / Hardware" },
      { value: "home", label: "Home / Kitchen" },
      { value: "beauty", label: "Beauty / Cosmetics" },
      { value: "food", label: "Food / Beverage Packaging" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "budget",
    title: "What is your initial production budget?",
    options: [
      { value: "under5k", label: "Under $5,000" },
      { value: "5k-15k", label: "$5,000 - $15,000" },
      { value: "15k-50k", label: "$15,000 - $50,000" },
      { value: "50k+", label: "$50,000+" },
    ],
  },
  {
    id: "speed",
    title: "How fast do you need your first production run?",
    options: [
      { value: "critical", label: "Critical - 4 to 6 weeks" },
      { value: "important", label: "Important - 2 to 3 months" },
      { value: "flexible", label: "Flexible - 3 to 6 months" },
      { value: "norush", label: "No rush" },
    ],
  },
  {
    id: "design",
    title: "How ready is your product design?",
    options: [
      { value: "cad", label: "CAD files ready" },
      { value: "partial", label: "Partial sketches / prototypes" },
      { value: "needhelp", label: "Need design help" },
      { value: "idea", label: "Just an idea" },
    ],
  },
  {
    id: "priority",
    title: "What is your top manufacturing priority?",
    options: [
      { value: "cost", label: "Lowest cost" },
      { value: "quality", label: "Highest quality" },
      { value: "ip", label: "IP protection" },
      { value: "speed", label: "Speed / proximity" },
    ],
  },
] as const

type AnswerKey = (typeof QUESTIONS)[number]["id"]
type Answers = Partial<Record<AnswerKey, string>>

function getRecommendation(answers: Answers) {
  const { productType, budget, speed, design, priority } = answers

  // Method based on budget
  let method = "OEM"
  let methodDetail = "Custom manufacturing with your own design and branding"
  if (budget === "under5k") {
    method = "ODM / White-Label"
    methodDetail = "Purchase existing products and add your branding — lowest upfront cost"
  } else if (budget === "5k-15k") {
    method = "ODM with Customization"
    methodDetail = "Modify an existing design with your colors, logo, and minor tweaks"
  } else if (budget === "15k-50k") {
    method = "OEM"
    methodDetail = "Custom manufacturing with your own design and branding"
  } else if (budget === "50k+") {
    method = "Full OEM / Custom Tooling"
    methodDetail = "Fully custom production with dedicated tooling and molds"
  }

  // Country based on product type
  let country = "China (Guangdong)"
  let countryReason = "Largest manufacturing hub with the broadest supplier base"
  const countryMap: Record<string, [string, string]> = {
    electronics: ["China (Shenzhen)", "World capital of electronics manufacturing"],
    apparel: ["Vietnam / Bangladesh", "Leading low-cost textile manufacturing regions"],
    plastic: ["China (Ningbo)", "Strong plastics and injection molding cluster"],
    metal: ["China (Dongguan)", "Deep metal fabrication and CNC machining supply chain"],
    home: ["China (Yiwu / Guangzhou)", "Massive home goods production ecosystem"],
    beauty: ["China (Shanghai) / South Korea", "Cosmetics OEM/ODM hubs with fast turnaround"],
    food: ["China / Thailand", "Food-grade packaging specialists with certifications"],
    other: ["China (Guangdong)", "Most versatile manufacturing region globally"],
  }
  if (productType && countryMap[productType]) {
    ;[country, countryReason] = countryMap[productType]
  }

  // Priority overrides country
  if (priority === "speed") {
    country = "Mexico (Monterrey / Tijuana)"
    countryReason = "Nearshore manufacturing with 1-2 week shipping to US"
  } else if (priority === "ip") {
    country = "USA / Germany / Japan"
    countryReason = "Strongest IP enforcement and legal protections"
  } else if (priority === "cost" && productType !== "electronics") {
    country = "Vietnam / India"
    countryReason = "Lower labor costs than China with growing manufacturing capacity"
  }

  // Cost range based on budget tier
  const costRanges: Record<string, string> = {
    under5k: "$1,500 - $5,000",
    "5k-15k": "$5,000 - $15,000",
    "15k-50k": "$15,000 - $50,000",
    "50k+": "$50,000 - $150,000+",
  }
  const costRange = budget ? costRanges[budget] || "$5,000 - $25,000" : "$5,000 - $25,000"

  // Timeline
  let timeline = "3 - 6 months"
  if (speed === "critical") timeline = "4 - 8 weeks"
  else if (speed === "important") timeline = "2 - 3 months"
  else if (speed === "flexible") timeline = "3 - 6 months"
  else if (speed === "norush") timeline = "4 - 8 months"

  // Adjust timeline if design not ready
  if (design === "idea" || design === "needhelp") {
    timeline += " (add 4-8 weeks for design)"
  }

  // Next steps
  const nextSteps = [
    method.includes("ODM")
      ? "Browse Alibaba or Global Sources for existing products matching your concept"
      : "Prepare detailed product specifications and technical drawings",
    `Research 3-5 verified suppliers in ${country.split(" (")[0]}`,
    "Request samples before committing to a full production order",
  ]

  return { method, methodDetail, country, countryReason, costRange, timeline, nextSteps }
}

export default function ManufacturingQuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [transitioning, setTransitioning] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const recommendation = useMemo(() => getRecommendation(answers), [answers])

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
      setTransitioning(true)
      setTimeout(() => {
        setStep((s) => s + 1)
        setTransitioning(false)
      }, 300)
    },
    []
  )

  const handleBack = useCallback(() => {
    if (step === 0) return
    setTransitioning(true)
    setTimeout(() => {
      setStep((s) => s - 1)
      setTransitioning(false)
    }, 300)
  }, [step])

  const handleRestart = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setStep(0)
      setAnswers({})
      setEmail("")
      setEmailSubmitted(false)
      setTransitioning(false)
    }, 300)
  }, [])

  const handleEmailSubmit = useCallback(() => {
    if (email.includes("@")) {
      setEmailSubmitted(true)
    }
  }, [email])

  const currentQuestion = step < 5 ? QUESTIONS[step] : null

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B6B6B] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1A1A1A]">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-[#1A1A1A]">
          Tools
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A]">Manufacturing Quiz</span>
      </nav>

      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        Manufacturing Quiz
      </h1>
      <p className="text-[#6B6B6B] mb-10 max-w-2xl">
        Answer 5 quick questions and get a personalized manufacturing
        recommendation — including the best country, method, cost estimate, and
        next steps.
      </p>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-2">
          <span>
            {step < 5 ? `Question ${step + 1} of 5` : "Results"}
          </span>
          <span>{Math.min(step, 5) * 20}% complete</span>
        </div>
        <div className="w-full h-2 bg-[#E8E8E4] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6B35] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(step, 5) * 20}%` }}
          />
        </div>
      </div>

      {/* Question or Results */}
      <div
        className="transition-all duration-300 ease-out"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(12px)" : "translateY(0)",
        }}
      >
        {step < 5 && currentQuestion ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-6">
              {currentQuestion.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(currentQuestion.id, option.value)}
                  className={`text-left px-5 py-4 rounded-xl border-2 transition-all ${
                    answers[currentQuestion.id as AnswerKey] === option.value
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#FF6B35]/40 hover:bg-[#FAFAF8]"
                  }`}
                >
                  <span className="font-semibold text-[#1A1A1A]">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Previous question
              </button>
            )}
          </div>
        ) : (
          /* Results */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                Your Manufacturing Recommendation
              </h2>
              <button
                onClick={handleRestart}
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" /> Retake quiz
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Method */}
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="w-5 h-5 text-[#FF6B35]" />
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    Recommended Method
                  </p>
                </div>
                <p className="text-2xl font-black text-[#FF6B35] mb-1">
                  {recommendation.method}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  {recommendation.methodDetail}
                </p>
              </div>

              {/* Country */}
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[#3B82F6]" />
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    Recommended Country
                  </p>
                </div>
                <p className="text-2xl font-black text-[#3B82F6] mb-1">
                  {recommendation.country}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  {recommendation.countryReason}
                </p>
              </div>

              {/* Cost */}
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-[#22C55E]" />
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    Estimated Cost Range
                  </p>
                </div>
                <p className="text-2xl font-black text-[#22C55E] mb-1">
                  {recommendation.costRange}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  First production run including tooling
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-[#8B5CF6]" />
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">
                    Estimated Timeline
                  </p>
                </div>
                <p className="text-2xl font-black text-[#8B5CF6] mb-1">
                  {recommendation.timeline}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  From supplier selection to delivery
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#F5F5F0] rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ArrowRight className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="font-bold text-[#1A1A1A]">Your Next Steps</h3>
              </div>
              <ol className="space-y-3">
                {recommendation.nextSteps.map((stepText, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[#1A1A1A]">{stepText}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Email capture */}
            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="font-bold text-[#1A1A1A]">
                  Get your results by email
                </h3>
              </div>
              {emailSubmitted ? (
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle className="w-5 h-5" />
                  <p className="text-sm font-semibold">
                    Check your inbox! We sent your personalized results.
                  </p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    className="flex-1 bg-[#FAFAF8] border-2 border-[#E8E8E4] rounded-xl px-4 py-2.5 outline-none text-sm focus:border-[#FF6B35] transition-colors"
                  />
                  <button
                    onClick={handleEmailSubmit}
                    className="bg-[#FF6B35] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
                  >
                    Send results
                  </button>
                </div>
              )}
            </div>

            {/* Back / Restart */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleBack}
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to last question
              </button>
              <button
                onClick={handleRestart}
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" /> Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Want a comprehensive analysis tailored to your exact product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap report
          </Link>{" "}
          — detailed cost breakdown, supplier matches, and 3-country comparison.
        </p>
      </div>
    </div>
  )
}
