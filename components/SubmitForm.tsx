"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react"
import { toast } from "sonner"
import type { ProductInput } from "@/types"
import FormInsightPanel from "@/components/FormInsightPanel"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

const PLACEHOLDER_IDEAS = [
  "A bamboo toothbrush with charcoal bristles and compostable packaging...",
  "A wireless phone charger shaped like a pebble, made from recycled ABS...",
  "A reusable silicone food wrap — replaces cling film, dishwasher safe...",
  "A smart pet collar with GPS tracking, silicone shell, 7-day battery...",
  "A portable espresso maker — aluminum body, manual pump, Nespresso pods...",
  "A modular desk organizer — Baltic birch plywood, magnetic connections...",
]

const QUICK_IDEAS = [
  "Smart water bottle",
  "Custom phone case",
  "Pet toy subscription box",
  "Bamboo sunglasses",
  "Fitness tracker band",
]

const PRICE_OPTIONS = [
  { value: "under_30", label: "Under $30", desc: "Impulse buy range" },
  { value: "30_100", label: "$30–$100", desc: "Mid-range consumer" },
  { value: "100_300", label: "$100–$300", desc: "Premium positioning" },
  { value: "unsure", label: "Not sure yet", desc: "We'll estimate for you" },
] as const

const CONCERN_OPTIONS = [
  { value: "cost", label: "Cost too high", desc: "Need competitive pricing" },
  { value: "factory", label: "Can't find a factory", desc: "Don't know where to start" },
  { value: "quality", label: "Quality worries", desc: "Afraid of bad batches" },
  { value: "start", label: "Don't know where to start", desc: "First-time founder" },
] as const

const QUANTITY_OPTIONS = [
  { value: "under_100", label: "Under 100", desc: "Prototype / test run" },
  { value: "100_1000", label: "100–1,000", desc: "First production run" },
  { value: "over_1000", label: "Over 1,000", desc: "Scale production" },
  { value: "unsure", label: "Not decided yet", desc: "Still exploring" },
] as const

export default function SubmitForm() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<Partial<ProductInput>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const descriptionLength = formData.productDescription?.length || 0
  const descriptionValid = descriptionLength >= 20

  // Pre-fill from hero textarea via sessionStorage
  useEffect(() => {
    const heroText = sessionStorage.getItem("bottlecap_hero_text")
    if (heroText) {
      setFormData((prev) => ({ ...prev, productDescription: heroText }))
      sessionStorage.removeItem("bottlecap_hero_text")
    }
  }, [])

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((p) => (p + 1) % PLACEHOLDER_IDEAS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be under 5MB")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setFormData((prev) => ({ ...prev, imageUrl: base64 }))
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!formData.userEmail || !emailRegex.test(formData.userEmail)) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productInput: {
            ...formData,
            userEmail: formData.userEmail,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.url) {
        toast.error(data.error || "Failed to create checkout. Please try again.")
        setIsSubmitting(false)
        return
      }

      window.location.href = data.url
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Progress bar */}
      <div
        className="flex items-center gap-3 mb-10"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={3}
        aria-label={`Step ${currentStep} of 3`}
      >
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2 flex-1">
            <motion.div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors duration-300 ${
                currentStep > step
                  ? "bg-[#FF6B35] text-white"
                  : currentStep === step
                    ? "bg-[#FF6B35] text-white"
                    : "bg-[#E8E8E4] text-[#9B9B9B]"
              }`}
              layout
            >
              {currentStep > step ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                step
              )}
            </motion.div>
            <div
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                currentStep > step ? "bg-[#FF6B35]" : currentStep === step ? "bg-[#FF6B35]/40" : "bg-[#E8E8E4]"
              }`}
            />
          </div>
        ))}
        <span className="text-xs text-[#9B9B9B] ml-1 shrink-0">
          Step {currentStep}/3
        </span>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {/* Step 1 — Tell me your idea */}
        {currentStep === 1 && (
          <motion.div
            key={1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              What product do you want to make?
            </h2>
            <p className="text-sm text-[#9B9B9B] mb-6">
              The more detail you add, the better your report will be.
            </p>

            <textarea
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-2xl p-5 text-base resize-none outline-none min-h-[160px]"
              placeholder={PLACEHOLDER_IDEAS[placeholderIndex]}
              value={formData.productDescription || ""}
              onChange={(e) =>
                setFormData({ ...formData, productDescription: e.target.value })
              }
            />

            {/* Character counter */}
            <div className="flex justify-between items-center mt-1 px-1">
              <p
                className={`text-xs ${
                  descriptionLength > 0 && !descriptionValid
                    ? "text-[#FF6B35]"
                    : "text-[#9B9B9B]"
                }`}
              >
                {descriptionLength > 0 && !descriptionValid
                  ? `${20 - descriptionLength} more characters needed`
                  : "Minimum 20 characters"}
              </p>
              <p className={`text-xs text-right mt-1 ${descriptionLength > 0 && descriptionLength < 20 ? "text-[#FF6B35]" : "text-[#9B9B9B]"}`}>
                {descriptionLength}/2000
              </p>
            </div>

            {/* Quick idea chips */}
            {!formData.productDescription && (
              <motion.div
                className="mt-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
              >
                <p className="text-xs text-[#9B9B9B] mb-2">Popular ideas to try:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_IDEAS.map((idea) => (
                    <motion.button
                      key={idea}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.25 }}
                      onClick={() =>
                        setFormData({ ...formData, productDescription: idea })
                      }
                      className="text-xs bg-[#F5F5F0] border border-[#E8E8E4] rounded-full px-3 py-1.5 text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                    >
                      {idea}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Image upload area */}
            <div className="mt-4">
              <label className="block border-2 border-dashed border-[#E8E8E4] rounded-xl p-6 text-center cursor-pointer hover:border-[#FF6B35] transition-colors">
                {!imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-[#9B9B9B]" />
                    <span className="text-[#9B9B9B] text-sm">
                      Upload a product image or sketch (optional)
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative inline-block">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        width={200}
                        height={160}
                        className="object-cover rounded-lg max-h-40"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setImagePreview(null)
                          setFormData((prev) => ({ ...prev, imageUrl: undefined }))
                          if (fileInputRef.current) fileInputRef.current.value = ""
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#1A1A1A] hover:bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-[#22C55E] text-sm">
                      <Check className="w-4 h-4" />
                      <span>Image selected</span>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* AI Preview Panel */}
            <FormInsightPanel
              productDescription={formData.productDescription || ""}
              isVisible={descriptionValid}
            />

            {/* Next button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!descriptionValid}
                onClick={() => setCurrentStep(2)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Help me understand more */}
        {currentStep === 2 && (
          <motion.div
            key={2}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Q1: Target Price */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-1">
                How much do you plan to sell it for?
              </h3>
              <p className="text-sm text-[#9B9B9B] mb-4">Helps us estimate margins and sourcing strategy.</p>
              <div className="grid grid-cols-2 gap-3">
                {PRICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.targetPrice === opt.value
                        ? "border-[#FF6B35] bg-[#FFF0EB]"
                        : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, targetPrice: opt.value })
                    }
                  >
                    <span className="font-medium text-[#1A1A1A]">{opt.label}</span>
                    <p className="text-xs text-[#9B9B9B] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Main Concern */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-1">
                What&apos;s your biggest concern?
              </h3>
              <p className="text-sm text-[#9B9B9B] mb-4">We&apos;ll focus the report on what matters to you.</p>
              <div className="grid grid-cols-2 gap-3">
                {CONCERN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.mainConcern === opt.value
                        ? "border-[#FF6B35] bg-[#FFF0EB]"
                        : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, mainConcern: opt.value })
                    }
                  >
                    <span className="font-medium text-[#1A1A1A]">{opt.label}</span>
                    <p className="text-xs text-[#9B9B9B] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Quantity */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-1">How many units?</h3>
              <p className="text-sm text-[#9B9B9B] mb-4">Affects MOQ requirements and per-unit pricing.</p>
              <div className="grid grid-cols-2 gap-3">
                {QUANTITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.quantity === opt.value
                        ? "border-[#FF6B35] bg-[#FFF0EB]"
                        : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, quantity: opt.value })
                    }
                  >
                    <span className="font-medium text-[#1A1A1A]">{opt.label}</span>
                    <p className="text-xs text-[#9B9B9B] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nav buttons */}
            <div className="mt-6 flex justify-between">
              <button
                className="text-[#6B6B6B] hover:text-[#1A1A1A] rounded-full px-6 py-3 font-semibold flex items-center gap-2 transition-colors"
                onClick={() => setCurrentStep(1)}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                className="bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold flex items-center gap-2"
                onClick={() => setCurrentStep(3)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Email + order summary */}
        {currentStep === 3 && (
          <motion.div
            key={3}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              Your report will be sent to your email
            </h2>
            <p className="text-sm text-[#9B9B9B] mb-6">
              You&apos;ll also get a permanent link to view it anytime.
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl px-5 py-3 outline-none text-base"
              value={formData.userEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, userEmail: e.target.value })
              }
            />

            {/* Order summary */}
            <div className="mt-6 bg-[#F5F5F0] rounded-xl p-5">
              <p className="text-xs text-[#9B9B9B] uppercase tracking-wide font-semibold mb-3">
                Order summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Product</span>
                  <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">
                    {formData.productDescription?.slice(0, 40) || "—"}
                    {(formData.productDescription?.length || 0) > 40 ? "..." : ""}
                  </span>
                </div>
                {formData.targetPrice && (
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Target price</span>
                    <span className="text-[#1A1A1A]">
                      {PRICE_OPTIONS.find((o) => o.value === formData.targetPrice)?.label || "—"}
                    </span>
                  </div>
                )}
                {formData.quantity && (
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Quantity</span>
                    <span className="text-[#1A1A1A]">
                      {QUANTITY_OPTIONS.find((o) => o.value === formData.quantity)?.label || "—"}
                    </span>
                  </div>
                )}
                <div className="h-px bg-[#E8E8E4] my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-[#1A1A1A]">Total</span>
                  <span className="text-[#FF6B35]">$99</span>
                </div>
              </div>
            </div>

            {/* Report contents checklist */}
            <div className="mt-6 space-y-2.5">
              {[
                "Manufacturing feasibility score (0-100)",
                "Per-unit cost breakdown",
                "3-country supplier comparison",
                "Tariff impact calculation",
                "10 manufacturing optimization tips",
                "Shareable report card",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  <span className="text-sm text-[#1A1A1A]">{item}</span>
                </div>
              ))}
            </div>

            {/* Nav + Submit */}
            <div className="mt-8 flex flex-col gap-4">
              <button
                className="w-full bg-[#FF6B35] hover:bg-[#E85A25] text-white rounded-full py-4 font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isSubmitting ||
                  !formData.userEmail ||
                  !emailRegex.test(formData.userEmail)
                }
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating your order...
                  </span>
                ) : (
                  "Pay $99 — Start Analysis"
                )}
              </button>

              <button
                className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                onClick={() => setCurrentStep(2)}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            {/* Trust line */}
            <p className="text-sm text-[#9B9B9B] text-center mt-4">
              Stripe secure payment · 72-hour refund guarantee
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
