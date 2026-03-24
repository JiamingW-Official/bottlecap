"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Upload, Check, X, ArrowRight, Sparkles } from "lucide-react"
import { toast } from "sonner"
import type { ProductInput } from "@/types"
import FormInsightPanel from "@/components/FormInsightPanel"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

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
  "Bamboo sunglasses",
  "Fitness tracker band",
  "Pet accessory",
]

const PRICE_OPTIONS = [
  { value: "under_30", label: "Under $30" },
  { value: "30_100", label: "$30–$100" },
  { value: "100_300", label: "$100–$300" },
  { value: "unsure", label: "Not sure" },
] as const

const CONCERN_OPTIONS = [
  { value: "cost", label: "Cost too high" },
  { value: "factory", label: "Finding a factory" },
  { value: "quality", label: "Quality worries" },
  { value: "start", label: "Where to start" },
] as const

const QUANTITY_OPTIONS = [
  { value: "under_100", label: "Under 100" },
  { value: "100_1000", label: "100–1,000" },
  { value: "over_1000", label: "1,000+" },
  { value: "unsure", label: "Not sure" },
] as const

export default function SubmitForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<Partial<ProductInput>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const descriptionLength = formData.productDescription?.length || 0
  const descriptionValid = descriptionLength >= 20
  const emailValid = !!formData.userEmail && emailRegex.test(formData.userEmail)

  useEffect(() => {
    const heroText = sessionStorage.getItem("bottlecap_hero_text")
    if (heroText) {
      setFormData(prev => ({ ...prev, productDescription: heroText }))
      sessionStorage.removeItem("bottlecap_hero_text")
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(p => (p + 1) % PLACEHOLDER_IDEAS.length)
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
      setFormData(prev => ({ ...prev, imageUrl: base64 }))
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!emailValid) return
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productInput: { ...formData, userEmail: formData.userEmail } }),
      })
      const data = await response.json()
      if (!response.ok || !data.url) {
        toast.error(data.error || "Failed to create checkout. Please try again.")
        setIsSubmitting(false)
        return
      }
      window.location.href = data.url
    } catch {
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Step indicator — minimal, labeled */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${step > 1 ? "bg-[#22C55E]" : "bg-[#FF6B35]"}`}>
            {step > 1
              ? <Check className="w-3 h-3 text-white" />
              : <span className="text-[9px] font-bold text-white">1</span>
            }
          </div>
          <span className={`text-sm font-medium transition-colors ${step === 1 ? "text-[#1A1A1A]" : "text-[#767676]"}`}>
            Your product
          </span>
        </div>
        <div className={`flex-1 h-px transition-colors ${step > 1 ? "bg-[#22C55E]" : "bg-[#E8E8E4]"}`} />
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${step === 2 ? "bg-[#FF6B35]" : "bg-[#E8E8E4]"}`}>
            <span className={`text-[9px] font-bold ${step === 2 ? "text-white" : "text-[#767676]"}`}>2</span>
          </div>
          <span className={`text-sm font-medium transition-colors ${step === 2 ? "text-[#1A1A1A]" : "text-[#767676]"}`}>
            Get report
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ──────────────── STEP 1 ──────────────── */}
        {step === 1 && (
          <motion.div
            key={1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              What do you want to make?
            </h2>
            <p className="text-sm text-[#767676] mb-5">
              2–3 sentences is enough. Materials, size, features — whatever you know.
            </p>

            {/* Textarea */}
            <textarea
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-2xl p-5 text-base resize-none outline-none min-h-[140px] transition-colors leading-relaxed"
              placeholder={PLACEHOLDER_IDEAS[placeholderIndex]}
              value={formData.productDescription || ""}
              onChange={e => setFormData({ ...formData, productDescription: e.target.value })}
            />

            {/* Char feedback */}
            <div className="flex justify-between items-center mt-1.5 mb-4 px-0.5">
              <span className={`text-xs transition-colors ${!descriptionValid && descriptionLength > 0 ? "text-[#FF6B35]" : "text-[#767676]"}`}>
                {descriptionLength === 0
                  ? "Start typing…"
                  : !descriptionValid
                    ? `${20 - descriptionLength} more to unlock`
                    : "✓  Ready to continue"
                }
              </span>
              <span className="text-xs text-[#C8C8C4]">{descriptionLength}/2000</span>
            </div>

            {/* Quick chips — only when empty */}
            {!formData.productDescription && (
              <div className="flex flex-wrap gap-2 mb-5">
                {QUICK_IDEAS.map(idea => (
                  <button
                    key={idea}
                    onClick={() => setFormData({ ...formData, productDescription: idea })}
                    className="text-xs bg-[#F5F5F0] border border-[#E8E8E4] rounded-full px-3 py-1.5 text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            )}

            {/* AI insight — inline, appears when valid */}
            <FormInsightPanel
              productDescription={formData.productDescription || ""}
              isVisible={descriptionValid}
            />

            {/* Image upload — collapsed link by default */}
            <div className="mt-4">
              {!showImageUpload && !imagePreview ? (
                <button
                  type="button"
                  onClick={() => setShowImageUpload(true)}
                  className="text-sm text-[#767676] hover:text-[#6B6B6B] transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Add reference image (optional)
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <label className="block border-2 border-dashed border-[#E8E8E4] rounded-xl p-5 text-center cursor-pointer hover:border-[#FF6B35] transition-colors">
                    {!imagePreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-5 h-5 text-[#767676]" />
                        <span className="text-sm text-[#767676]">Upload image or sketch</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative inline-block">
                          <Image src={imagePreview} alt="Preview" width={180} height={140} className="object-cover rounded-lg max-h-36" unoptimized />
                          <button
                            type="button"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              setImagePreview(null)
                              setFormData(p => ({ ...p, imageUrl: undefined }))
                              if (fileInputRef.current) fileInputRef.current.value = ""
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#1A1A1A] hover:bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[#22C55E] text-sm">
                          <Check className="w-4 h-4" />
                          Image added
                        </div>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </motion.div>
              )}
            </div>

            {/* Quick setup — appears after valid description */}
            <AnimatePresence>
              {descriptionValid && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="mt-8 pt-6 border-t border-[#E8E8E4]"
                >
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#FF6B35] mb-5">
                    Tailor your report — 3 quick picks
                  </p>

                  {/* Selling price */}
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2.5">Target selling price</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setFormData({ ...formData, targetPrice: opt.value })}
                          className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                            formData.targetPrice === opt.value
                              ? "border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]"
                              : "border-[#E8E8E4] bg-white text-[#6B6B6B] hover:border-[#D0D0C8] hover:text-[#1A1A1A]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main concern */}
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2.5">Biggest concern</p>
                    <div className="flex flex-wrap gap-2">
                      {CONCERN_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setFormData({ ...formData, mainConcern: opt.value })}
                          className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                            formData.mainConcern === opt.value
                              ? "border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]"
                              : "border-[#E8E8E4] bg-white text-[#6B6B6B] hover:border-[#D0D0C8] hover:text-[#1A1A1A]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2.5">First order quantity</p>
                    <div className="flex flex-wrap gap-2">
                      {QUANTITY_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setFormData({ ...formData, quantity: opt.value })}
                          className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                            formData.quantity === opt.value
                              ? "border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]"
                              : "border-[#E8E8E4] bg-white text-[#6B6B6B] hover:border-[#D0D0C8] hover:text-[#1A1A1A]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue */}
            <div className="mt-7 flex justify-end">
              <button
                className="bg-[#FF6B35] text-white rounded-full px-8 py-3.5 font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(255,107,53,0.3)] hover:shadow-[0_4px_14px_rgba(255,107,53,0.4)] hover:bg-[#E85A25] transition-all"
                disabled={!descriptionValid}
                onClick={() => setStep(2)}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ──────────────── STEP 2 ──────────────── */}
        {step === 2 && (
          <motion.div
            key={2}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#22C55E] mb-2">Almost there</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Where should we send it?
            </h2>
            <p className="text-sm text-[#767676] mb-6">
              Report ready in 2–5 minutes. Permanent link in your inbox.
            </p>

            {/* Email */}
            <input
              type="email"
              placeholder="your@email.com"
              autoFocus
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl px-5 py-3.5 outline-none text-base transition-colors"
              value={formData.userEmail || ""}
              onChange={e => setFormData({ ...formData, userEmail: e.target.value })}
            />

            {/* Order summary — compact */}
            <div className="mt-5 bg-[#FAFAF8] rounded-xl border border-[#E8E8E4] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#767676] mb-1">Analyzing</p>
                  <p className="text-sm text-[#1A1A1A] font-medium leading-snug line-clamp-2">
                    {formData.productDescription?.slice(0, 90)}
                    {(formData.productDescription?.length || 0) > 90 ? "…" : ""}
                  </p>
                  {(formData.targetPrice || formData.quantity) && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {formData.targetPrice && (
                        <span className="text-[10px] bg-[#FFF0EB] text-[#FF6B35] rounded-full px-2 py-0.5 font-semibold">
                          {PRICE_OPTIONS.find(o => o.value === formData.targetPrice)?.label}
                        </span>
                      )}
                      {formData.quantity && (
                        <span className="text-[10px] bg-[#F0F0EC] text-[#6B6B6B] rounded-full px-2 py-0.5 font-semibold">
                          {QUANTITY_OPTIONS.find(o => o.value === formData.quantity)?.label} units
                        </span>
                      )}
                      {formData.mainConcern && (
                        <span className="text-[10px] bg-[#F0F0EC] text-[#6B6B6B] rounded-full px-2 py-0.5 font-semibold capitalize">
                          {CONCERN_OPTIONS.find(o => o.value === formData.mainConcern)?.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-black text-[#1A1A1A] leading-none">$99</p>
                  <p className="text-xs text-[#767676] mt-0.5">one-time</p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
              {[
                { n: "01", label: "AI analyzes", sub: "2–5 min" },
                { n: "02", label: "Report ready", sub: "Emailed instantly" },
                { n: "03", label: "You decide", sub: "Build or iterate" },
              ].map(item => (
                <div key={item.n} className="p-3 bg-[#F5F5F0] rounded-xl">
                  <p className="text-[10px] font-black text-[#FF6B35]/30 leading-none mb-0.5">{item.n}</p>
                  <p className="text-xs font-semibold text-[#1A1A1A]">{item.label}</p>
                  <p className="text-[10px] text-[#767676]">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Pay button */}
            <div className="mt-6">
              <button
                className="w-full bg-[#FF6B35] hover:bg-[#E85A25] text-white rounded-full py-4 font-bold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] flex items-center justify-center gap-2"
                disabled={isSubmitting || !emailValid}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Preparing checkout…
                  </>
                ) : (
                  <>
                    Get my report — $99
                    <Sparkles className="w-4 h-4 opacity-80" />
                  </>
                )}
              </button>

              {/* Trust strip */}
              <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
                {/* Stripe badge */}
                <span className="inline-flex items-center gap-1 text-[10px] text-[#767676] bg-[#F5F5F0] rounded-full px-2.5 py-1 font-medium">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#635BFF">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C4.502 22.914 7.232 24 10.734 24c2.654 0 4.88-.61 6.417-1.76 1.695-1.254 2.554-3.082 2.554-5.528 0-4.208-2.497-5.941-5.729-7.562z"/>
                  </svg>
                  Stripe secure
                </span>
                <span className="text-[#D0D0C8]">·</span>
                <span className="text-[10px] text-[#767676]">72-hour money-back</span>
                <span className="text-[#D0D0C8]">·</span>
                <span className="text-[10px] text-[#767676]">Report in 2–5 min</span>
              </div>

              {/* Card icons */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-[9px] text-[#C0C0BC]">Accepts:</span>
                {/* Visa */}
                <svg className="h-4 opacity-40" viewBox="0 0 48 16" fill="none">
                  <rect width="48" height="16" rx="2" fill="#1A1F71"/>
                  <text x="6" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">VISA</text>
                </svg>
                {/* Mastercard */}
                <svg className="h-4 opacity-40" viewBox="0 0 36 24" fill="none">
                  <circle cx="13" cy="12" r="10" fill="#EB001B"/>
                  <circle cx="23" cy="12" r="10" fill="#F79E1B"/>
                  <path d="M18 4.8a10 10 0 0 1 0 14.4A10 10 0 0 1 18 4.8z" fill="#FF5F00"/>
                </svg>
                {/* Amex */}
                <svg className="h-4 opacity-40" viewBox="0 0 48 16" fill="none">
                  <rect width="48" height="16" rx="2" fill="#2E77BC"/>
                  <text x="4" y="12" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">AMEX</text>
                </svg>
              </div>
            </div>

            {/* Edit back */}
            <button
              onClick={() => setStep(1)}
              className="mt-5 text-sm text-[#767676] hover:text-[#6B6B6B] transition-colors flex items-center gap-1.5"
            >
              ← Edit product description
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
