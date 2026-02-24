import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Product Certifications & Compliance Guide — Bottlecap",
  description:
    "Complete guide to product certifications and regulatory compliance. Covers FCC, UL, CE, RoHS, CPSIA, FDA requirements, costs, timelines, and how to work with testing labs for US and EU markets.",
}

export default function CertificationsGuidePage() {
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
          <span className="text-[#1A1A1A]">Certifications &amp; Compliance</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Product Certifications &amp; Compliance Guide
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Selling a product without the required certifications is not just
            risky — it is illegal. Customs can seize your shipment, Amazon can
            suspend your listing, and you can face fines of thousands of
            dollars per violation. This guide walks you through every
            certification you might need for the US and EU markets, what they
            cost, how long they take, and how to work with testing labs to get
            them done efficiently.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: "#why-certifications", label: "Why Certifications Matter" },
              { href: "#us-requirements", label: "US Certification Requirements" },
              { href: "#eu-requirements", label: "EU Certification Requirements" },
              { href: "#process", label: "The Certification Process" },
              { href: "#cost-timeline", label: "Cost & Timeline Table" },
              { href: "#product-specific", label: "Product-Specific Requirements" },
              { href: "#self-vs-third", label: "Self-Declaration vs. Third-Party" },
              { href: "#amazon", label: "Amazon Compliance Requirements" },
              { href: "#testing-labs", label: "Working with Testing Labs" },
              { href: "#checklist", label: "Compliance Checklist" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#6B6B6B] hover:text-[#FF6B35] transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content */}
        <article className="space-y-16">
          {/* Why Certifications Matter */}
          <section id="why-certifications">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Why Certifications Matter
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Product certifications verify that your product meets safety,
                electromagnetic compatibility, environmental, and performance
                standards required by law or by the market. They protect
                consumers from unsafe products, protect the environment from
                hazardous materials, and level the playing field for
                manufacturers.
              </p>
              <p>
                The consequences of non-compliance are severe. In the US,
                selling non-compliant electronics can result in FCC fines of up
                to $100,000 per violation. The Consumer Product Safety
                Commission (CPSC) can issue mandatory recalls, and the legal
                liability for injuries caused by non-compliant products can be
                company-ending. On Amazon, compliance violations result in
                listing suspension, account warnings, or permanent bans.
              </p>
              <p>
                Beyond legal requirements, certifications also serve as trust
                signals. UL listing, CE marking, and FCC certification tell
                retailers, distributors, and consumers that your product has
                been independently tested and verified. Many retailers will not
                even consider products without proper certifications, and B2B
                customers often require them as a procurement condition.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                The Cost of Non-Compliance
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">$100K+</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">FCC fine per violation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">$15M+</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Max CPSC civil penalty</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">Permanent</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Amazon account suspension</p>
                </div>
              </div>
            </div>
          </section>

          {/* US Requirements */}
          <section id="us-requirements">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              US Certification Requirements
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                US product safety and compliance is governed by multiple federal
                agencies, each responsible for different product categories.
                Here are the most common certifications you will encounter.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    FCC (Federal Communications Commission)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $3,000–$15,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Required for all electronic devices that can emit radio
                  frequency energy — which includes virtually every product with
                  a circuit board, processor, clock oscillator, or digital
                  display. FCC tests for electromagnetic emissions (does your
                  product interfere with other devices?) and electromagnetic
                  susceptibility (is your product affected by external signals?).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Applies to</p>
                    <p className="text-[#6B6B6B]">All digital electronics, WiFi/Bluetooth devices, LED products, any product with a clock &gt;9kHz</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Timeline</p>
                    <p className="text-[#6B6B6B]">2-6 weeks for testing. Intentional radiators (WiFi/BT) require FCC ID, which adds 4-8 weeks.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    UL (Underwriters Laboratories)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $15,000–$40,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  UL is a safety certification that tests for electrical safety,
                  fire hazard, mechanical hazard, and other safety risks. While
                  technically voluntary in many cases, UL listing is effectively
                  required by major retailers (Walmart, Target, Home Depot),
                  insurance companies, and many building codes. Products
                  without UL listing face severely limited distribution channels.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Applies to</p>
                    <p className="text-[#6B6B6B]">Electrical/electronic products, appliances, lighting, batteries, chargers, power supplies</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Timeline</p>
                    <p className="text-[#6B6B6B]">8-16 weeks. Includes factory inspection and follow-up audits.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    CPSIA (Consumer Product Safety Improvement Act)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $500–$5,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Mandatory for all products intended for children 12 and under.
                  Tests for lead content (under 100 ppm in accessible parts),
                  phthalate content (under 0.1% for certain phthalates), and
                  compliance with applicable ASTM F963 toy safety standard.
                  Requires third-party testing by a CPSC-accepted lab and a
                  Children&apos;s Product Certificate (CPC) that must accompany
                  every shipment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Applies to</p>
                    <p className="text-[#6B6B6B]">All children&apos;s products (toys, clothing, accessories, furniture, feeding products)</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Timeline</p>
                    <p className="text-[#6B6B6B]">2-4 weeks for testing. Must be retested with each material or design change.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    FDA (Food and Drug Administration)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $2,000–$20,000+
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Required for food, beverages, dietary supplements, cosmetics,
                  medical devices, and food-contact materials (cutting boards,
                  water bottles, food storage). FDA requirements range from
                  simple facility registration ($0) to full 510(k) medical
                  device clearance ($20,000+). Food-contact products need
                  migration testing to prove materials do not leach harmful
                  substances into food.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Applies to</p>
                    <p className="text-[#6B6B6B]">Food, supplements, cosmetics, medical devices, food-contact products</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                    <p className="font-medium text-[#1A1A1A]">Timeline</p>
                    <p className="text-[#6B6B6B]">2-4 weeks (food contact testing) to 6-12 months (510(k) medical device)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    ASTM / CPSC Standards
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $500–$3,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  ASTM International publishes voluntary consensus standards
                  that are often referenced by federal regulations. ASTM F963
                  is the mandatory toy safety standard. ASTM F2413 covers
                  safety footwear. ASTM D3951 covers commercial packaging. The
                  CPSC enforces mandatory standards and can recall products that
                  pose unreasonable safety risks. The EPA regulates products
                  containing pesticides or that make antimicrobial claims.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Note</p>
                  <p className="text-[#6B6B6B]">Even for product categories without explicit certification requirements, general product liability law applies. If your product injures someone, you are liable regardless of certifications.</p>
                </div>
              </div>
            </div>
          </section>

          {/* EU Requirements */}
          <section id="eu-requirements">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              EU Certification Requirements
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                The European Union has a harmonized system of product safety
                regulations that apply across all 27 member states. The CE
                marking is the gateway — without it, your product cannot
                legally be sold in the EU. Behind the CE mark are specific
                directives that define what testing your product must pass.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    CE Marking
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $5,000–$12,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  CE is not a single test — it is a declaration that your
                  product complies with all applicable EU directives. The
                  specific directives depend on your product type. Common
                  directives include the Low Voltage Directive (LVD) for
                  electrical safety, the EMC Directive for electromagnetic
                  compatibility, the Radio Equipment Directive (RED) for
                  wireless devices, and the Machinery Directive for mechanical
                  equipment. The cost includes testing against all applicable
                  directives plus preparing the technical file and Declaration
                  of Conformity.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Requirements</p>
                  <p className="text-[#6B6B6B]">Technical file, Declaration of Conformity, CE mark on product and packaging, EU authorized representative (required for non-EU manufacturers since 2021)</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    RoHS (Restriction of Hazardous Substances)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $500–$2,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  RoHS restricts the use of six hazardous substances in
                  electrical and electronic equipment: lead, mercury, cadmium,
                  hexavalent chromium, PBB, and PBDE. Each substance has a
                  maximum concentration limit (typically 0.1% by weight, 0.01%
                  for cadmium). Testing involves XRF screening and, if needed,
                  chemical analysis of individual materials. RoHS compliance is
                  mandatory for CE marking of electronics.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Applies to</p>
                  <p className="text-[#6B6B6B]">All electrical and electronic equipment sold in the EU. Also adopted by many other countries including China, South Korea, and Turkey.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    REACH (Registration, Evaluation, Authorization of Chemicals)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $1,000–$5,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  REACH regulates chemicals in products sold in the EU.
                  Products must not contain Substances of Very High Concern
                  (SVHCs) above 0.1% by weight. The SVHC candidate list is
                  updated twice per year and currently contains over 200
                  substances. REACH applies to all physical products, not just
                  electronics. Testing involves screening for the full SVHC
                  list, which is why costs scale with material complexity.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Applies to</p>
                  <p className="text-[#6B6B6B]">All physical products sold in the EU. Particularly relevant for textiles, plastics, coatings, and products with direct skin contact.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    EN71 (Toy Safety)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $1,500–$5,000
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The EU toy safety standard consisting of 13 parts. EN71-1
                  covers mechanical and physical properties (choking hazards,
                  sharp edges). EN71-2 covers flammability. EN71-3 covers
                  migration of certain elements (heavy metals). Parts 4-13
                  cover specific hazards like chemistry sets, activity toys,
                  and finger paints. Testing must be performed by an accredited
                  Notified Body for CE marking of toys.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Applies to</p>
                  <p className="text-[#6B6B6B]">All toys and products designed or intended for use by children under 14 in the EU.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    WEEE (Waste Electrical and Electronic Equipment)
                  </h3>
                  <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                    $500–$2,000/year
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  WEEE requires producers of electrical and electronic equipment
                  to register with national authorities and contribute to the
                  collection, recycling, and recovery of e-waste. You must
                  register in each EU country where you sell, display the
                  crossed-out wheelie bin symbol on your product, and pay
                  recycling fees based on the weight of products sold. Annual
                  costs include registration fees and per-kg recycling
                  contributions.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <p className="font-medium text-[#1A1A1A]">Applies to</p>
                  <p className="text-[#6B6B6B]">All electrical and electronic products sold in the EU. Compliance services like Comply Market or Take-e-way can handle multi-country registration.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Certification Process */}
          <section id="process">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              The Certification Process
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Certification follows a consistent process regardless of the
                specific standard. Understanding this flow helps you plan your
                timeline and budget accurately.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <ol className="space-y-4 text-sm">
                {[
                  {
                    step: "Identify applicable standards",
                    detail:
                      "Determine which certifications are required for your product type and target markets. Use this guide, consult with a testing lab, or hire a compliance consultant. Getting this wrong means wasted time and money testing against the wrong standards.",
                  },
                  {
                    step: "Select an accredited testing lab",
                    detail:
                      "Choose a lab accredited to test against your required standards. NVLAP (US) and ILAC (international) accreditation ensures the lab's results are recognized. Get quotes from 2-3 labs — prices vary significantly for the same tests.",
                  },
                  {
                    step: "Submit samples for testing",
                    detail:
                      "Labs typically need 3-8 samples of your final production unit. Samples must be production-representative — prototypes or pre-production samples may not be accepted. Some tests are destructive, so factor in the sample cost.",
                  },
                  {
                    step: "Pre-compliance testing (optional but recommended)",
                    detail:
                      "Many labs offer pre-compliance screening at 30-50% of the cost of formal testing. This identifies potential failures before you commit to full testing, saving time and money. Highly recommended for first-time products.",
                  },
                  {
                    step: "Formal testing",
                    detail:
                      "The lab performs all required tests according to the standard. Testing timelines range from 1-2 weeks for simple tests (RoHS screening) to 8-16 weeks for complex certifications (UL listing). You will receive a test report detailing pass/fail results for each requirement.",
                  },
                  {
                    step: "Address failures (if any)",
                    detail:
                      "If your product fails any test, the lab will identify the specific failure. Common fixes include adding shielding (EMC), improving insulation (electrical safety), or changing materials (chemical compliance). Retesting the modified product typically costs 50-75% of the original test fee.",
                  },
                  {
                    step: "Receive certification",
                    detail:
                      "Upon passing, you receive a test report and, where applicable, a certificate or listing number. Prepare your Declaration of Conformity (for CE), apply the required marks to your product and packaging, and maintain your certification file for customs and marketplace compliance.",
                  },
                ].map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">
                        {item.step}
                      </p>
                      <p className="text-[#6B6B6B] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Cost & Timeline Table */}
          <section id="cost-timeline">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Certification Cost &amp; Timeline Summary
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Here is a comprehensive reference table for the most common
                certifications. Costs include testing lab fees but not
                consultant fees or product modifications.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Certification</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Cost Range</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Timeline</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Mandatory?</th>
                  </tr>
                </thead>
                <tbody className="text-[#6B6B6B]">
                  {[
                    { cert: "FCC (Part 15B, unintentional)", cost: "$3,000–$6,000", timeline: "2–4 weeks", mandatory: "Yes (US electronics)" },
                    { cert: "FCC ID (Part 15C, intentional)", cost: "$8,000–$15,000", timeline: "6–12 weeks", mandatory: "Yes (WiFi/BT devices)" },
                    { cert: "UL Listing", cost: "$15,000–$40,000", timeline: "8–16 weeks", mandatory: "Effectively yes for retail" },
                    { cert: "ETL (UL alternative)", cost: "$8,000–$25,000", timeline: "6–12 weeks", mandatory: "Accepted by most retailers" },
                    { cert: "CPSIA/ASTM F963", cost: "$500–$5,000", timeline: "2–4 weeks", mandatory: "Yes (children's products)" },
                    { cert: "FDA Registration", cost: "$0–$5,000", timeline: "1–4 weeks", mandatory: "Yes (food/cosmetics/medical)" },
                    { cert: "CE Marking (electronics)", cost: "$5,000–$12,000", timeline: "4–10 weeks", mandatory: "Yes (EU)" },
                    { cert: "CE Marking (toys/EN71)", cost: "$1,500–$5,000", timeline: "4–8 weeks", mandatory: "Yes (EU toys)" },
                    { cert: "RoHS Testing", cost: "$500–$2,000", timeline: "1–3 weeks", mandatory: "Yes (EU electronics)" },
                    { cert: "REACH Testing", cost: "$1,000–$5,000", timeline: "2–4 weeks", mandatory: "Yes (EU all products)" },
                    { cert: "WEEE Registration", cost: "$500–$2,000/year", timeline: "2–6 weeks", mandatory: "Yes (EU electronics)" },
                    { cert: "California Prop 65", cost: "$500–$3,000", timeline: "2–3 weeks", mandatory: "Yes (products sold in CA)" },
                  ].map((row) => (
                    <tr key={row.cert} className="border-b border-[#E8E8E4] last:border-0">
                      <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{row.cert}</td>
                      <td className="py-3 pr-4 text-[#FF6B35] font-semibold">{row.cost}</td>
                      <td className="py-3 pr-4">{row.timeline}</td>
                      <td className="py-3">{row.mandatory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Budget Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                For a typical consumer electronics product sold in the US and
                EU, budget $15,000-$35,000 total for certifications (FCC + UL +
                CE + RoHS). For a simple non-electronic consumer product, budget
                $2,000-$8,000. These costs are one-time per product design —
                you do not need to retest for each production batch unless you
                change materials or design.
              </p>
            </div>
          </section>

          {/* Product-Specific Requirements */}
          <section id="product-specific">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Product-Specific Requirements
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Different product categories have different certification
                requirements. Here is a quick reference for the most common
                product types.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  category: "Consumer Electronics (no wireless)",
                  usReqs: "FCC Part 15B, UL/ETL listing",
                  euReqs: "CE (EMC + LVD directives), RoHS, REACH, WEEE",
                  totalBudget: "$20,000–$55,000",
                },
                {
                  category: "Wireless Electronics (WiFi/Bluetooth)",
                  usReqs: "FCC Part 15C (FCC ID), UL/ETL listing, SAR testing if worn on body",
                  euReqs: "CE (RED directive), RoHS, REACH, WEEE",
                  totalBudget: "$25,000–$65,000",
                },
                {
                  category: "Toys & Children's Products",
                  usReqs: "CPSIA, ASTM F963, lead/phthalate testing, CPC certificate",
                  euReqs: "CE (Toy Safety Directive), EN71, REACH, packaging directive",
                  totalBudget: "$3,000–$12,000",
                },
                {
                  category: "Food Contact Products",
                  usReqs: "FDA compliance (21 CFR), migration testing, facility registration",
                  euReqs: "CE (EU 1935/2004), REACH, specific material regulations",
                  totalBudget: "$3,000–$10,000",
                },
                {
                  category: "Cosmetics & Personal Care",
                  usReqs: "FDA registration, ingredient compliance, labeling requirements",
                  euReqs: "EU Cosmetics Regulation (EC 1223/2009), safety assessment, CPNP notification",
                  totalBudget: "$5,000–$20,000",
                },
                {
                  category: "Outdoor/Sporting Equipment",
                  usReqs: "CPSC general conformity, applicable ASTM standards, state regulations",
                  euReqs: "CE (PPE Regulation if applicable), EN standards, REACH",
                  totalBudget: "$3,000–$15,000",
                },
              ].map((item) => (
                <div
                  key={item.category}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {item.category}
                    </h3>
                    <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                      {item.totalBudget}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-[#F5F5F0] rounded-xl p-3">
                      <p className="font-medium text-[#1A1A1A] mb-1">US Requirements</p>
                      <p className="text-[#6B6B6B]">{item.usReqs}</p>
                    </div>
                    <div className="bg-[#F5F5F0] rounded-xl p-3">
                      <p className="font-medium text-[#1A1A1A] mb-1">EU Requirements</p>
                      <p className="text-[#6B6B6B]">{item.euReqs}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Self-Declaration vs Third-Party */}
          <section id="self-vs-third">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Self-Declaration vs. Third-Party Testing
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Some certifications allow self-declaration (you test and certify
                your own product), while others require third-party testing by
                an accredited lab. Understanding the difference affects your
                cost, timeline, and liability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                  Self-Declaration (SDoC)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  You perform or commission testing and declare compliance
                  yourself. You bear full liability for the accuracy of the
                  declaration. If your product is found non-compliant, you face
                  penalties and product liability.
                </p>
                <div className="text-sm">
                  <p className="font-medium text-[#1A1A1A] mb-1">Where allowed:</p>
                  <ul className="text-[#6B6B6B] space-y-1 list-disc pl-4">
                    <li>FCC Part 15B (unintentional radiators)</li>
                    <li>CE marking (most product categories)</li>
                    <li>General Product Safety (adult products)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                  Third-Party Required
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  An accredited, independent lab must perform the testing and
                  issue the certificate. Required when safety risks are higher
                  and liability is greater. Provides stronger legal protection
                  and marketplace credibility.
                </p>
                <div className="text-sm">
                  <p className="font-medium text-[#1A1A1A] mb-1">Where required:</p>
                  <ul className="text-[#6B6B6B] space-y-1 list-disc pl-4">
                    <li>FCC ID (intentional radiators)</li>
                    <li>UL/ETL listing</li>
                    <li>CPSIA (children&apos;s products)</li>
                    <li>CE toys (EN71, Notified Body)</li>
                    <li>Medical devices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Our Recommendation
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Even when self-declaration is allowed, we recommend using a
                third-party lab for testing. The cost difference is modest
                compared to the legal protection it provides. A third-party
                test report is much stronger evidence of due diligence in a
                product liability case, and many retailers and marketplaces
                specifically require third-party reports.
              </p>
            </div>
          </section>

          {/* Amazon Compliance */}
          <section id="amazon">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Amazon Compliance Requirements
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Amazon has become increasingly aggressive about product
                compliance. They can and do request certification documents at
                any time, suspend listings without warning, and require you to
                prove compliance before reinstating your products. Being
                prepared is essential.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                What Amazon May Request
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { doc: "Children's Product Certificate (CPC)", when: "Required for all children's products. Must cite CPSIA/ASTM F963 test reports." },
                  { doc: "General Certificate of Conformity (GCC)", when: "Required for non-children's products subject to consumer product safety rules." },
                  { doc: "FCC test reports or Supplier Declaration of Conformity", when: "Required for electronics. Amazon may request the actual test report, not just the FCC ID." },
                  { doc: "Safety Data Sheets (SDS)", when: "Required for products classified as hazardous materials (batteries, cleaning products, etc.)." },
                  { doc: "Third-party test reports from ISO 17025 accredited labs", when: "May be required for any product category at Amazon's discretion." },
                  { doc: "Product photos showing compliance marks", when: "FCC logo, CE mark, safety warnings, required labeling." },
                ].map((item) => (
                  <div
                    key={item.doc}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <p className="font-medium text-[#1A1A1A]">{item.doc}</p>
                    <p className="text-[#6B6B6B] mt-1">{item.when}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Create a &quot;compliance folder&quot; for each product
                containing all test reports, certificates, declarations of
                conformity, and product photos showing compliance marks. When
                Amazon sends a compliance request, you need to respond within
                a few days. Having everything organized and ready means you can
                respond immediately instead of scrambling.
              </p>
            </div>
          </section>

          {/* Working with Testing Labs */}
          <section id="testing-labs">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Working with Testing Labs
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Your testing lab is a critical partner in the certification
                process. The right lab can save you time and money by catching
                potential issues early, guiding you through the process, and
                providing efficient turnaround. Here is how to select and work
                with testing labs effectively.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Major Testing Labs
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { lab: "UL (Underwriters Laboratories)", strength: "The gold standard for safety certification. Strongest brand recognition. Most expensive. Best for products going into major retail.", location: "Global" },
                  { lab: "Intertek (ETL)", strength: "Full-service alternative to UL. ETL mark is accepted everywhere UL is. Often 20-30% less expensive. Faster turnaround.", location: "Global" },
                  { lab: "TUV (Rheinland/SUD)", strength: "Preferred for EU markets. Strong in CE marking, machinery directive, and automotive. German thoroughness.", location: "Global, EU focus" },
                  { lab: "SGS", strength: "Largest testing company globally. Strong in chemical testing (RoHS, REACH), textiles, and consumer goods. Competitive pricing.", location: "Global" },
                  { lab: "Bureau Veritas", strength: "Strong in industrial products, food safety, and building materials. Good for niche certifications.", location: "Global" },
                  { lab: "MET Laboratories", strength: "US-focused, smaller lab with competitive pricing and faster turnaround. NRTL recognized. Good for startups.", location: "US" },
                ].map((item) => (
                  <div
                    key={item.lab}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-[#1A1A1A]">{item.lab}</p>
                      <span className="text-xs text-[#6B6B6B] bg-[#F5F5F0] px-2 py-1 rounded-full ml-3 whitespace-nowrap">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] mt-1">{item.strength}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                How to Save on Testing Costs
              </p>
              <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc pl-5">
                <li>Get quotes from at least 3 labs — prices can vary 30-50% for identical tests</li>
                <li>Ask about pre-compliance screening to catch failures early ($500-$2,000)</li>
                <li>Bundle multiple tests with one lab for volume discounts (10-20% savings)</li>
                <li>Test in China or Asia where lab rates are lower (30-50% less for same accredited tests)</li>
                <li>Use your factory&apos;s existing test reports as a starting point — some tests may already be done</li>
                <li>Design for compliance from the start — retrofitting a non-compliant product costs 3-5x more than designing it right</li>
              </ul>
            </div>
          </section>

          {/* Compliance Checklist */}
          <section id="checklist">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Compliance Checklist
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Use this checklist to ensure your product is fully compliant
                before you start selling. The specific items that apply depend
                on your product type and target markets.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <div className="space-y-4 text-sm">
                {[
                  {
                    phase: "Before Product Design",
                    items: [
                      "Identify all applicable certifications for your product type and target markets",
                      "Budget for certification costs (typically $5,000-$40,000 for electronics)",
                      "Include certification timeline in your project plan (4-16 weeks)",
                      "Choose a testing lab or compliance consultant",
                      "Research product-specific labeling requirements",
                    ],
                  },
                  {
                    phase: "During Product Design",
                    items: [
                      "Design for compliance (EMC shielding, safety isolation, material selection)",
                      "Select compliant components (UL-recognized, RoHS-compliant)",
                      "Plan PCB layout for EMC compliance (ground planes, trace routing)",
                      "Specify compliant materials and request supplier declarations",
                      "Include space for required marks on product and packaging",
                    ],
                  },
                  {
                    phase: "Before Production",
                    items: [
                      "Complete pre-compliance testing on final prototypes",
                      "Submit production samples for formal certification testing",
                      "Resolve any test failures and retest as needed",
                      "Receive test reports and certificates",
                      "Prepare Declarations of Conformity (for CE and other self-declared marks)",
                    ],
                  },
                  {
                    phase: "Before Selling",
                    items: [
                      "Apply required marks to product (FCC, CE, UL, recycling symbols)",
                      "Include required warnings and labeling on packaging",
                      "Create compliance folder (all reports, certificates, DoCs)",
                      "Register with required authorities (FDA, WEEE, FCC ID database)",
                      "File CPC or GCC for Amazon and retail compliance",
                      "Record trademarks and patents with customs if applicable",
                    ],
                  },
                ].map((phase) => (
                  <div key={phase.phase}>
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">
                      {phase.phase}
                    </h3>
                    <ul className="space-y-1 text-[#6B6B6B]">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#E8E8E4] mt-0.5">&#9744;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to navigate certifications for your product?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Get a Bottlecap feasibility report with certification
              requirements, cost estimates, and timeline projections specific
              to your product type and target markets — so you know exactly
              what you need before you start spending.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Analyze my product &rarr;
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
