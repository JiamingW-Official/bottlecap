import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Bottlecap",
  description: "How Bottlecap collects, uses, and protects your data.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-[#9B9B9B] mb-8">
        Last updated: February 2026
      </p>

      <div className="prose prose-neutral max-w-none space-y-8 text-[#1A1A1A]">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            When you use Bottlecap, we collect the following information:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-[#6B6B6B]">
            <li>
              <strong>Product information:</strong> Your product description,
              images, target price, quantity preferences, and manufacturing
              concerns.
            </li>
            <li>
              <strong>Contact information:</strong> Your email address, used to
              deliver reports and transactional communications.
            </li>
            <li>
              <strong>Payment information:</strong> Processed securely by Stripe.
              We never store your credit card details on our servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-1 text-[#6B6B6B]">
            <li>To generate your manufacturing feasibility report</li>
            <li>To send you transactional emails (confirmation, report ready)</li>
            <li>To process payments via Stripe</li>
            <li>To improve our analysis quality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Third-Party Services</h2>
          <p className="text-[#6B6B6B] leading-relaxed">We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-[#6B6B6B]">
            <li>
              <strong>Anthropic (Claude API):</strong> Processes your product
              description to generate the analysis. Data is sent securely and
              not used to train models.
            </li>
            <li>
              <strong>Stripe:</strong> Handles payment processing. Subject to
              Stripe&apos;s privacy policy.
            </li>
            <li>
              <strong>Supabase:</strong> Hosts our database. Your report data is
              stored securely with row-level security.
            </li>
            <li>
              <strong>Resend:</strong> Sends transactional emails. Your email
              address is shared only for delivery purposes.
            </li>
            <li>
              <strong>Vercel:</strong> Hosts our application. Subject to
              Vercel&apos;s privacy policy.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            We retain your report data for as long as your report URL remains
            active. You may request deletion of your data at any time by
            emailing{" "}
            <a
              href="mailto:hello@bottlecap.io"
              className="text-[#FF6B35] hover:underline"
            >
              hello@bottlecap.io
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Report Sharing</h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            Reports are accessible via their unique URL. Anyone with the link
            can view the report. Sensitive information (email, payment details)
            is never exposed in shared reports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            For privacy questions or data deletion requests, email us at{" "}
            <a
              href="mailto:hello@bottlecap.io"
              className="text-[#FF6B35] hover:underline"
            >
              hello@bottlecap.io
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
