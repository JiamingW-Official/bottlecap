import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "Supplier Sourcing Guide: How to Find & Evaluate Manufacturers — Bottlecap",
  description:
    "Learn how to find, evaluate, and negotiate with manufacturers. Includes RFQ templates, negotiation strategies, IP protection tips, and red flags to watch for.",
}

export default function SourcingGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link
            href="/guide"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Supplier Sourcing</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Supplier Sourcing Guide
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Finding the right manufacturer can make or break your product
            business. This guide walks you through every step of the supplier
            sourcing process — from finding potential factories to negotiating
            terms and protecting your intellectual property.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            Table of Contents
          </h2>
          <nav className="space-y-2">
            <a
              href="#finding-suppliers"
              className="block text-[#FF6B35] hover:underline"
            >
              Finding the Right Manufacturer
            </a>
            <a
              href="#where-to-find"
              className="block text-[#FF6B35] hover:underline"
            >
              Where to Find Suppliers
            </a>
            <a
              href="#evaluating"
              className="block text-[#FF6B35] hover:underline"
            >
              Evaluating Suppliers: The 10-Point Checklist
            </a>
            <a
              href="#communication"
              className="block text-[#FF6B35] hover:underline"
            >
              Communication Best Practices
            </a>
            <a
              href="#negotiation"
              className="block text-[#FF6B35] hover:underline"
            >
              Negotiation Strategies
            </a>
            <a
              href="#ip-protection"
              className="block text-[#FF6B35] hover:underline"
            >
              Protecting Your IP
            </a>
            <a
              href="#red-flags"
              className="block text-[#FF6B35] hover:underline"
            >
              Red Flags to Watch For
            </a>
            <a
              href="#rfq-template"
              className="block text-[#FF6B35] hover:underline"
            >
              Sample RFQ Template
            </a>
          </nav>
        </div>

        {/* Content */}
        <article className="space-y-16">
          {/* Finding the Right Manufacturer */}
          <section id="finding-suppliers">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Finding the Right Manufacturer
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                The right manufacturer is not just the cheapest option. It is
                the supplier that consistently delivers quality products on
                time, communicates proactively, solves problems rather than
                creating them, and scales with your business as it grows. A
                great supplier relationship can last for years and become one
                of your most valuable competitive advantages.
              </p>
              <p>
                The sourcing process typically takes 4-8 weeks and involves
                identifying potential suppliers, sending RFQs (Requests for
                Quotation), evaluating responses, ordering samples, visiting
                factories (if possible), and negotiating final terms. Most
                founders contact 8-15 potential suppliers before narrowing
                down to 2-3 finalists and eventually selecting one primary
                manufacturer.
              </p>
              <p>
                Before you start searching, prepare your materials: a detailed
                spec sheet or technical drawing, a clear description of your
                product, target quantities (initial and projected annual
                volume), target pricing, quality requirements, and any
                certifications needed (CE, FCC, FDA, etc.). The more prepared
                you are, the better responses you will get from suppliers and
                the more seriously they will take your inquiry.
              </p>
            </div>
          </section>

          {/* Where to Find Suppliers */}
          <section id="where-to-find">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Where to Find Suppliers
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              There are multiple channels for finding manufacturers, each with
              distinct advantages and drawbacks. A multi-channel approach works
              best — cast a wide net, then narrow down based on quality of
              response and fit.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Alibaba
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The world&apos;s largest B2B marketplace with over 200,000
                  suppliers, primarily based in China. Alibaba offers enormous
                  breadth — you can find suppliers for virtually any product
                  type. The platform includes supplier verification (Gold
                  Supplier, Verified Supplier), Trade Assurance payment
                  protection, and built-in messaging. However, the sheer
                  volume of suppliers means quality varies enormously, and
                  many listings are from trading companies rather than actual
                  factories.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Largest supplier selection</li>
                      <li>Trade Assurance buyer protection</li>
                      <li>Easy to compare multiple suppliers</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Many trading companies, not factories</li>
                      <li>Quality varies wildly</li>
                      <li>Can be overwhelming for beginners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Global Sources
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  A Hong Kong-based B2B platform that caters to more
                  established buyers. Global Sources has stricter supplier
                  vetting than Alibaba and hosts major trade shows in Hong
                  Kong. The platform is particularly strong for electronics,
                  hardware, and gift products. Supplier quality tends to be
                  higher on average, though the selection is smaller.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Higher average supplier quality</li>
                      <li>Strong for electronics and hardware</li>
                      <li>Good trade show presence</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Smaller supplier base than Alibaba</li>
                      <li>Less user-friendly platform</li>
                      <li>Primarily China-focused</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Made-in-China
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Another major Chinese B2B marketplace, Made-in-China
                  positions itself between Alibaba and Global Sources. The
                  platform is known for its audit and verification programs,
                  and many suppliers are direct factories rather than trading
                  companies. It is particularly strong for industrial products,
                  machinery, and building materials.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Good supplier verification</li>
                      <li>More direct factories than Alibaba</li>
                      <li>Strong for industrial products</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Smaller than Alibaba</li>
                      <li>China-only suppliers</li>
                      <li>Less developed messaging system</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Trade Shows
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Trade shows remain one of the most effective ways to find
                  and evaluate suppliers in person. Major shows include Canton
                  Fair (Guangzhou, the world&apos;s largest trade show), CES
                  (Las Vegas, consumer electronics), Ambiente (Frankfurt,
                  consumer goods), and industry-specific events. Meeting
                  suppliers face-to-face, seeing samples, and visiting
                  factory booths gives you insights that no online platform
                  can match.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Face-to-face evaluation</li>
                      <li>See and touch actual samples</li>
                      <li>Build relationships quickly</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Expensive (travel, accommodation)</li>
                      <li>Time-consuming</li>
                      <li>Limited to show dates and locations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Referrals &amp; Industry Networks
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Personal referrals from other founders, industry contacts,
                  or sourcing communities are often the highest-quality leads.
                  Join manufacturing communities on Reddit (r/manufacturing,
                  r/entrepreneur), Facebook groups, Slack communities, and
                  founder networks. Ask specific questions about suppliers
                  others have used and their experiences. A warm introduction
                  to a factory often gets you better service and pricing than
                  a cold inquiry.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Pre-vetted through real experience</li>
                      <li>Honest feedback on quality and service</li>
                      <li>Better treatment via warm introductions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Limited selection</li>
                      <li>May not match your product category</li>
                      <li>Requires existing network</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  LinkedIn &amp; Direct Outreach
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  LinkedIn is an underused channel for finding manufacturers.
                  Search for factory owners, sales managers, and export
                  managers at manufacturing companies. Many factory
                  representatives actively post about their capabilities on
                  LinkedIn. Direct outreach via LinkedIn often gets a faster,
                  more personal response than platform inquiries and connects
                  you directly with decision-makers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Direct access to decision-makers</li>
                      <li>Can verify company and individual backgrounds</li>
                      <li>Professional communication channel</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Time-intensive search process</li>
                      <li>No buyer protection</li>
                      <li>Smaller pool than B2B platforms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Thomas Register (ThomasNet)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  ThomasNet is a US-focused industrial supplier directory with
                  over 500,000 North American manufacturers and distributors.
                  If you are looking for domestic manufacturing in the US,
                  Canada, or Mexico, Thomas is the go-to resource. The
                  platform allows you to search by product category, process
                  type, and certification, and includes detailed company
                  profiles with capabilities and certifications.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Pros:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Best resource for North American suppliers</li>
                      <li>Detailed capability profiles</li>
                      <li>Established, reputable directory</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                      Cons:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>US/North America only</li>
                      <li>Higher costs than Asian suppliers</li>
                      <li>Older platform interface</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Evaluating Suppliers */}
          <section id="evaluating">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Evaluating Suppliers: The 10-Point Checklist
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Once you have a shortlist of potential suppliers, evaluate each
              one against these ten criteria. Score each supplier from 1-10
              on every factor to create an objective comparison.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "1. Relevant experience",
                  description:
                    "Has the supplier manufactured products similar to yours? Ask for photos and case studies of comparable projects. A factory experienced in your product category will anticipate problems, suggest improvements, and deliver faster than one learning on the job.",
                },
                {
                  title: "2. Production capacity",
                  description:
                    "Can the factory handle your current order and future growth? Ask about monthly output, number of production lines, and current utilization. A factory running at 95% capacity may not be able to accommodate rush orders or scaling. Ideally, your order should represent 10-30% of their capacity.",
                },
                {
                  title: "3. Quality certifications",
                  description:
                    "Does the factory hold relevant certifications? ISO 9001 (quality management) is the baseline. Depending on your product, you may also need ISO 13485 (medical devices), ISO 14001 (environmental), IATF 16949 (automotive), or BSCI/SEDEX (social compliance). Ask for copies of certificates and verify they are current.",
                },
                {
                  title: "4. Communication quality",
                  description:
                    "How quickly and clearly does the supplier respond? Do they ask clarifying questions about your requirements? Do they communicate in your language competently? Communication quality during the quoting phase is a strong predictor of communication during production. If responses are slow or unclear now, they will be worse when issues arise.",
                },
                {
                  title: "5. Sample quality",
                  description:
                    "Never commit to a production order without evaluating physical samples. Order samples from your top 2-3 suppliers and compare them side by side. Check dimensions, material quality, finish, functionality, and packaging. The sample represents the best the factory can do — if it is not perfect, production quality will be worse.",
                },
                {
                  title: "6. Pricing transparency",
                  description:
                    "Does the supplier provide a detailed cost breakdown, or just a single unit price? A transparent supplier will itemize materials, labor, tooling, packaging, and overhead. This transparency helps you identify cost optimization opportunities and protects against hidden charges later.",
                },
                {
                  title: "7. MOQ flexibility",
                  description:
                    "What is the minimum order quantity, and is the supplier willing to negotiate? For a first order, flexibility on MOQ is important. Suppliers who insist on high MOQs for a new customer may not be a good fit for startups. A reasonable first-order MOQ is 200-1,000 units depending on product complexity.",
                },
                {
                  title: "8. Payment terms",
                  description:
                    "What payment terms does the supplier offer? Standard is 30% deposit (T/T) before production, 70% balance before shipment. Some suppliers accept 50/50, and established relationships may allow 30/70 with net-30 on the balance. Be cautious of suppliers demanding full payment upfront.",
                },
                {
                  title: "9. References and track record",
                  description:
                    "Ask for references from existing clients, especially in your market or product category. Contact those references and ask about delivery reliability, quality consistency, communication, and how the supplier handles problems. Check online reviews, trade show history, and any audit reports.",
                },
                {
                  title: "10. NDA willingness",
                  description:
                    "Is the supplier willing to sign a non-disclosure agreement? Reputable factories will sign NDAs without hesitation. Reluctance to sign an NDA is a red flag — it may indicate the supplier plans to share your design with other clients or manufacture copies. Have your NDA prepared before you share detailed specifications.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Communication Best Practices */}
          <section id="communication">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Communication Best Practices
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed mb-8">
              <p>
                Clear communication prevents most manufacturing problems.
                Misunderstandings about specifications, timelines, and quality
                expectations cause delays, defects, and disputes. Follow
                these practices to communicate effectively with suppliers
                across languages and cultures.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Use simple, direct language
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Avoid idioms, slang, and complex sentence structures. Write
                  in short, clear sentences. Use numbered lists for multiple
                  requirements. If English is not your supplier&apos;s first
                  language, simplicity reduces the chance of misinterpretation.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Always use visuals
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  A picture is worth a thousand words, especially across
                  language barriers. Include annotated photos, technical
                  drawings, 3D renderings, color swatches, and reference
                  product images with every specification. Mark up photos
                  with arrows and labels pointing to specific features,
                  dimensions, or quality requirements.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Confirm everything in writing
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  After every phone call or video meeting, send a follow-up
                  email summarizing what was discussed and agreed. Ask the
                  supplier to confirm they agree with your summary. Verbal
                  agreements are easy to misremember — written confirmation
                  creates an audit trail and prevents disputes.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Be responsive and respectful
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Manufacturing is a relationship business. Respond to supplier
                  messages within 24 hours. Acknowledge receipt of documents
                  and samples. Be polite but firm about quality and timeline
                  expectations. Suppliers who feel valued and respected will
                  prioritize your orders over demanding, unresponsive clients.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-10 mb-4">
              Sample Initial Contact Email
            </h3>
            <div className="bg-[#1A1A1A] text-white rounded-xl p-6 text-sm font-mono leading-relaxed">
              <p>Subject: RFQ — [Product Name] — [Your Company Name]</p>
              <br />
              <p>Dear [Supplier Name],</p>
              <br />
              <p>
                My name is [Your Name] and I am the founder of [Your Company],
                based in [City, Country]. We are developing a [brief product
                description] and are looking for a manufacturing partner.
              </p>
              <br />
              <p>Product details:</p>
              <p>- Product: [Name/type]</p>
              <p>- Materials: [Primary materials]</p>
              <p>- Size: [Dimensions]</p>
              <p>- Target quantity: [First order qty] / [Annual projected qty]</p>
              <p>- Target price: [Your target unit price, if known]</p>
              <p>- Certifications needed: [CE/FCC/FDA/etc.]</p>
              <br />
              <p>Please see attached spec sheet and product images.</p>
              <br />
              <p>Could you please provide:</p>
              <p>1. Unit price for quantities of [X], [Y], and [Z]</p>
              <p>2. Tooling/mold costs (if applicable)</p>
              <p>3. Sample cost and lead time</p>
              <p>4. Production lead time</p>
              <p>5. MOQ</p>
              <p>6. Payment terms</p>
              <br />
              <p>
                We are also happy to sign an NDA before sharing detailed
                technical drawings.
              </p>
              <br />
              <p>Thank you for your time. I look forward to your response.</p>
              <br />
              <p>Best regards,</p>
              <p>[Your Name]</p>
              <p>[Your Company]</p>
              <p>[Phone / WhatsApp / WeChat]</p>
            </div>
          </section>

          {/* Negotiation Strategies */}
          <section id="negotiation">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Negotiation Strategies
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Negotiating with manufacturers is not about squeezing the
              lowest possible price. It is about reaching fair terms that
              work for both parties and building a relationship that supports
              long-term success. Here are eight strategies that work.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "1. Get multiple quotes first",
                  description:
                    "Always collect quotes from at least 5-8 suppliers before negotiating. This gives you market knowledge — you will understand the realistic price range for your product and can identify outliers. Having competing quotes gives you genuine leverage without needing to bluff.",
                },
                {
                  title: "2. Negotiate total cost, not just unit price",
                  description:
                    "Unit price is just one variable. You can also negotiate tooling costs (can they be amortized across the first two orders?), sample fees (waived if you place an order?), packaging specifications, payment terms (70/30 instead of 50/50?), and shipping arrangements. Sometimes a supplier cannot budge on unit price but can offer value in other areas.",
                },
                {
                  title: "3. Share your growth plan",
                  description:
                    "Suppliers are more likely to offer competitive pricing if they see you as a long-term partner, not a one-time buyer. Share your projected annual volumes, product roadmap, and growth targets. A supplier who expects 10,000 units over the next year will quote differently than one expecting a single 500-unit order.",
                },
                {
                  title: "4. Ask for tiered pricing",
                  description:
                    "Request pricing at multiple quantity levels — for example, 500, 1,000, 2,500, and 5,000 units. This shows you the volume at which significant price breaks occur and helps you plan your order sizes strategically. Many suppliers offer 10-20% discounts at double the MOQ.",
                },
                {
                  title: "5. Negotiate mold ownership",
                  description:
                    "If you are paying for custom molds or tooling, explicitly agree that you own the molds. This should be stated in writing in your purchase agreement. Mold ownership gives you the freedom to move production to a different factory if needed. Some suppliers will resist this — stand firm.",
                },
                {
                  title: "6. Use timing strategically",
                  description:
                    "Manufacturing has seasonal patterns. Chinese factories are busiest September-November (pre-holiday production) and slowest February-April (after Chinese New Year). Placing orders during slow periods often gets you faster lead times and more flexibility. Avoid negotiating when factories are at peak capacity.",
                },
                {
                  title: "7. Be willing to compromise on non-essentials",
                  description:
                    "Identify which factors are most important to you (quality, price, lead time, MOQ) and where you have flexibility. If the supplier cannot match your target price, can they offer a lower MOQ or faster delivery? Successful negotiation requires give-and-take on both sides.",
                },
                {
                  title: "8. Build the relationship first",
                  description:
                    "In many manufacturing cultures, especially in Asia, the relationship matters as much as the contract. Take time to build rapport before diving into hard negotiations. Ask about their business, show interest in their capabilities, and be genuinely respectful. A supplier who likes and trusts you will go the extra mile when problems arise.",
                },
              ].map((strategy) => (
                <div
                  key={strategy.title}
                  className="bg-white rounded-xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">
                    {strategy.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Protecting Your IP */}
          <section id="ip-protection">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Protecting Your Intellectual Property
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed mb-8">
              <p>
                Intellectual property protection is a legitimate concern when
                working with overseas manufacturers. While the risks are often
                overstated (most reputable factories value long-term client
                relationships over short-term copying), you should still take
                proactive steps to protect your designs, technology, and brand.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Non-Disclosure Agreements (NDAs)
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Have every potential supplier sign an NDA before sharing
                  detailed product specifications. For Chinese suppliers, use
                  a bilingual NDA (English and Chinese) that specifies
                  jurisdiction in China — a Chinese court can enforce a Chinese
                  NDA against a Chinese company. Many law firms specializing
                  in China trade offer NDA templates for under $500.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Patents
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  If your product has a novel invention, file a provisional
                  patent application in your home country before contacting any
                  supplier. This establishes your priority date at low cost
                  ($2,000-$5,000 with an attorney). For strong protection in
                  China, also file a Chinese patent — Chinese courts will
                  enforce Chinese patents. Design patents protect unique
                  visual appearance, while utility patents protect functional
                  innovations.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Trademarks
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Register your brand name and logo as trademarks in every
                  country where you sell and manufacture. In China, trademark
                  rights go to the first to file, not the first to use — so
                  register your trademark in China early, even before you
                  start manufacturing. This prevents trademark squatting,
                  where someone registers your brand name before you do and
                  then blocks your products at customs.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Trade Secrets &amp; Information Control
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Not every piece of IP needs a patent. For proprietary
                  formulations, processes, or know-how, treat information on
                  a need-to-know basis. Share only the specifications
                  necessary for each supplier to do their part. If your
                  product has a proprietary formula or algorithm, keep that
                  in-house and only share the manufacturing specs.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Dual Sourcing
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  For complex products, consider splitting manufacturing across
                  two or more suppliers, so no single factory has the complete
                  design. Factory A makes component X, Factory B makes
                  component Y, and you (or a trusted assembly partner) combine
                  them. This makes it much harder for any single supplier to
                  replicate your product.
                </p>
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section id="red-flags">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Red Flags to Watch For
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              These warning signs indicate that a supplier may be unreliable,
              dishonest, or a poor fit for your needs. If you see multiple
              red flags, move on to another supplier.
            </p>

            <div className="space-y-4">
              {[
                {
                  flag: "1. Price is significantly below all other quotes",
                  detail:
                    "If one supplier is 30-50% cheaper than everyone else, something is wrong. They may be using inferior materials, planning to cut corners on quality, or quoting unrealistically low to win your order and then raising prices after you are committed.",
                },
                {
                  flag: "2. Reluctance to sign an NDA",
                  detail:
                    "A reputable factory has nothing to hide and will sign an NDA without hesitation. Reluctance suggests they may plan to share your designs or manufacture copies for other buyers.",
                },
                {
                  flag: "3. No factory audit or visit allowed",
                  detail:
                    "Legitimate factories welcome visits and audits — it demonstrates their capabilities. If a supplier refuses to allow an audit or factory visit, they may be a trading company misrepresenting themselves as a manufacturer, or their facilities may not match their claims.",
                },
                {
                  flag: "4. Demanding full payment upfront",
                  detail:
                    "The standard payment structure is 30% deposit and 70% balance. Any supplier demanding 100% upfront is either inexperienced with international trade or potentially fraudulent. Never send full payment before production.",
                },
                {
                  flag: "5. Vague or inconsistent answers",
                  detail:
                    "When you ask specific technical questions, responses should be clear and consistent. If a supplier gives vague answers about materials, processes, or capabilities — or contradicts earlier statements — they may lack the expertise or capacity to handle your product.",
                },
                {
                  flag: "6. No references available",
                  detail:
                    "An established supplier should be able to provide references from existing clients. If they claim to have extensive experience but cannot share a single reference, their claims are likely exaggerated.",
                },
                {
                  flag: "7. Pushes for WeChat-only communication",
                  detail:
                    "While WeChat is common for day-to-day communication with Chinese suppliers, business discussions and agreements should also be documented via email. A supplier who avoids email entirely is avoiding creating a paper trail.",
                },
                {
                  flag: "8. Claims to manufacture everything",
                  detail:
                    "No single factory is an expert in everything. If a supplier claims they can manufacture any product in any material, they are likely a trading company that outsources to various factories. Trading companies add a layer of cost and reduce your control over quality.",
                },
                {
                  flag: "9. No quality control process described",
                  detail:
                    "A professional factory should be able to describe their quality control processes in detail — incoming material inspection, in-process checks, final inspection, and outgoing quality standards. If they have no QC system, quality will be inconsistent.",
                },
                {
                  flag: "10. Pressure to rush your decision",
                  detail:
                    "High-pressure sales tactics (limited-time pricing, disappearing discounts, urgency to place orders immediately) are warning signs. Reputable suppliers understand that sourcing is a careful process and give you the time you need to evaluate.",
                },
              ].map((item) => (
                <div
                  key={item.flag}
                  className="bg-white border-l-4 border-red-400 p-6 rounded-r-xl"
                >
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">
                    {item.flag}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Sample RFQ Template */}
          <section id="rfq-template">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Sample RFQ Template
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Use this template as a starting point for your Request for
              Quotation. Customize it for your specific product and
              requirements. The more detail you provide, the more accurate
              and useful the quotes you receive will be.
            </p>

            <div className="bg-white rounded-2xl border-2 border-[#E8E8E4] p-8">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-6 text-center border-b border-[#E8E8E4] pb-4">
                REQUEST FOR QUOTATION (RFQ)
              </h3>

              <div className="space-y-6 text-sm text-[#6B6B6B]">
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    COMPANY INFORMATION
                  </p>
                  <p>Company Name: ____________________</p>
                  <p>Contact Person: ____________________</p>
                  <p>Email: ____________________</p>
                  <p>Phone/WhatsApp: ____________________</p>
                  <p>Country: ____________________</p>
                  <p>Website: ____________________</p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    PRODUCT DESCRIPTION
                  </p>
                  <p>Product Name: ____________________</p>
                  <p>Product Category: ____________________</p>
                  <p>
                    Brief Description: ____________________
                  </p>
                  <p>
                    Attachments: [ ] Spec Sheet &nbsp; [ ] Technical Drawing
                    &nbsp; [ ] 3D Model &nbsp; [ ] Reference Images
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    SPECIFICATIONS
                  </p>
                  <p>
                    Dimensions (L x W x H): ____________________
                  </p>
                  <p>Weight: ____________________</p>
                  <p>
                    Primary Material: ____________________
                  </p>
                  <p>
                    Secondary Materials: ____________________
                  </p>
                  <p>Color(s): ____________________</p>
                  <p>
                    Surface Finish: ____________________
                  </p>
                  <p>
                    Special Requirements: ____________________
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    QUANTITY &amp; PRICING
                  </p>
                  <p>
                    Please quote for the following quantities:
                  </p>
                  <p>Quantity 1: _______ units</p>
                  <p>Quantity 2: _______ units</p>
                  <p>Quantity 3: _______ units</p>
                  <p>
                    Target Unit Price (if known): $_______
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    PLEASE PROVIDE
                  </p>
                  <ul className="list-decimal pl-5 space-y-1">
                    <li>Unit price for each quantity level listed above</li>
                    <li>Tooling/mold costs (if applicable)</li>
                    <li>Sample cost and sample lead time</li>
                    <li>Production lead time</li>
                    <li>Minimum Order Quantity (MOQ)</li>
                    <li>Payment terms</li>
                    <li>Packaging options and costs</li>
                    <li>Shipping terms (FOB port of origin)</li>
                    <li>Quality certifications held</li>
                    <li>
                      Photos/references of similar products manufactured
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    CERTIFICATIONS REQUIRED
                  </p>
                  <p>
                    [ ] CE &nbsp; [ ] FCC &nbsp; [ ] UL &nbsp; [ ] FDA &nbsp;
                    [ ] RoHS &nbsp; [ ] REACH &nbsp; [ ] Other:
                    ____________________
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    TIMELINE
                  </p>
                  <p>
                    Target production start date: ____________________
                  </p>
                  <p>
                    Target delivery date: ____________________
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    ADDITIONAL NOTES
                  </p>
                  <p>
                    ________________________________________________________________________
                  </p>
                  <p>
                    ________________________________________________________________________
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
                Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Send your RFQ to 8-15 suppliers simultaneously and give them
                5-7 business days to respond. Suppliers who do not respond
                within a week are unlikely to be responsive during production
                either. Compare responses in a spreadsheet, scoring each
                supplier on price, lead time, MOQ, communication quality, and
                overall professionalism.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to find the right manufacturer?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Start with a Bottlecap feasibility report. Get cost estimates,
              country recommendations, and optimization tips tailored to your
              product — so you can approach suppliers with confidence.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Analyze my idea &rarr;
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
