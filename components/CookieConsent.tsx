"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const preference = localStorage.getItem("bottlecap_cookies")
    if (!preference) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem("bottlecap_cookies", "accepted")
    setVisible(false)
  }

  function decline() {
    localStorage.setItem("bottlecap_cookies", "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E8E4] shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 max-h-auto sm:max-h-16">
            <p className="text-sm text-[#1A1A1A] text-center sm:text-left">
              We use cookies to improve your experience. By continuing, you agree to our{" "}
              <Link href="/privacy" className="text-[#FF6B35] underline underline-offset-2 hover:text-[#e55a25]">
                privacy policy
              </Link>
              .
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors px-3 py-1.5"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#e55a25] transition-colors px-4 py-1.5 rounded-md"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
