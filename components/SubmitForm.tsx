"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Upload, Check, ChevronRight } from "lucide-react"
import type { ProductInput } from "@/types"

export default function SubmitForm() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<Partial<ProductInput>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
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
      window.location.href = data.url
    } catch (error) {
      console.error("Checkout error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentStep >= 1 ? "bg-[#FF6B35] w-16" : "bg-[#E8E8E4] w-8"
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentStep >= 2 ? "bg-[#FF6B35] w-16" : "bg-[#E8E8E4] w-8"
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentStep >= 3 ? "bg-[#FF6B35] w-16" : "bg-[#E8E8E4] w-8"
          }`}
        />
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              What product do you want to make?
            </h2>

            <textarea
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-2xl p-5 text-base resize-none outline-none min-h-[160px]"
              placeholder={`For example:\nA smart pet collar that tracks location,\nsilicone shell, built-in GPS module,\nwaterproof, 7-day battery life...`}
              value={formData.productDescription || ""}
              onChange={(e) =>
                setFormData({ ...formData, productDescription: e.target.value })
              }
            />

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
                    <Image
                      src={imagePreview}
                      alt="Product preview"
                      width={200}
                      height={160}
                      className="object-cover rounded-lg max-h-40"
                      unoptimized
                    />
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

            {/* Next button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold flex items-center gap-2 disabled:opacity-50"
                disabled={!formData.productDescription}
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
              <h3 className="text-xl font-semibold mb-4">
                How much do you plan to sell it for?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.targetPrice === "under_30"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, targetPrice: "under_30" })
                  }
                >
                  Under $30
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.targetPrice === "30_100"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, targetPrice: "30_100" })
                  }
                >
                  $30–$100
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.targetPrice === "100_300"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, targetPrice: "100_300" })
                  }
                >
                  $100–$300
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.targetPrice === "unsure"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, targetPrice: "unsure" })
                  }
                >
                  Not sure yet
                </button>
              </div>
            </div>

            {/* Q2: Main Concern */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                What&apos;s your biggest concern?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.mainConcern === "cost"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, mainConcern: "cost" })
                  }
                >
                  💸 Cost too high
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.mainConcern === "factory"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, mainConcern: "factory" })
                  }
                >
                  🏭 Can&apos;t find a factory
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.mainConcern === "quality"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, mainConcern: "quality" })
                  }
                >
                  ⭐ Quality worries
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.mainConcern === "start"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, mainConcern: "start" })
                  }
                >
                  🤷 Don&apos;t know where to start
                </button>
              </div>
            </div>

            {/* Q3: Quantity */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">How many units?</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.quantity === "under_100"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, quantity: "under_100" })
                  }
                >
                  Under 100
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.quantity === "100_1000"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, quantity: "100_1000" })
                  }
                >
                  100–1,000
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.quantity === "over_1000"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, quantity: "over_1000" })
                  }
                >
                  Over 1,000
                </button>
                <button
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.quantity === "unsure"
                      ? "border-[#FF6B35] bg-[#FFF0EB]"
                      : "border-[#E8E8E4] bg-white hover:border-[#D0D0C8]"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, quantity: "unsure" })
                  }
                >
                  Not decided yet
                </button>
              </div>
            </div>

            {/* Next button */}
            <div className="mt-6 flex justify-end">
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

        {/* Step 3 — One last thing */}
        {currentStep === 3 && (
          <motion.div
            key={3}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Your report will be sent to your email
            </h2>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl px-5 py-3 outline-none text-base"
              value={formData.userEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, userEmail: e.target.value })
              }
            />

            {/* Report contents checklist */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">
                  Manufacturing feasibility score (0-100)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">Per-unit cost breakdown</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">
                  3-country supplier comparison
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">
                  Tariff impact calculation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">
                  10 manufacturing optimization tips
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-base">Shareable report card</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              className="w-full bg-[#FF6B35] hover:bg-[#E85A25] text-white rounded-full py-4 font-semibold text-lg transition-colors disabled:opacity-50 mt-8"
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

            {/* Trust line */}
            <p className="text-sm text-[#9B9B9B] text-center mt-4">
              🔒 Stripe secure payment · 72-hour refund guarantee
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
