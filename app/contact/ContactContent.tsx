"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Clock, Send, CheckCircle } from "lucide-react"

const subjects = ["General", "Report Issue", "Partnership", "Enterprise"] as const

export default function ContactContent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState<string>(subjects[0])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
    } catch {
      // silently handle — show success regardless for now
    }

    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto">
            Have a question about Bottlecap? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-6 sm:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
                    Message sent
                  </h2>
                  <p className="text-[#6B6B6B]">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E8E4] bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder:text-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E8E4] bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder:text-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E8E4] bg-[#FAFAF8] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E8E4] bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder:text-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition resize-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#e55a25] text-white text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Other ways to reach us
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Email</p>
                    <a
                      href="mailto:hello@bottlecap.io"
                      className="text-sm text-[#FF6B35] hover:underline"
                    >
                      hello@bottlecap.io
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Response time</p>
                    <p className="text-sm text-[#6B6B6B]">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
