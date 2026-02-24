import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Quality Control Guide for Manufacturing — Bottlecap",
  description:
    "Learn how to implement quality control for manufactured products. Covers inspection types, AQL standards, third-party QC companies, factory audits, and building a long-term quality system.",
}

export default function QualityControlGuidePage() {
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
          <span className="text-[#1A1A1A]">Quality Control</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Quality Control Guide for Manufacturing
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Quality problems are the number one reason product businesses fail
            after launch. A single batch of defective products can destroy your
            brand reputation, trigger costly returns, and burn through your cash
            reserves. This guide teaches you how to build a quality control
            system that catches defects before they reach your customers.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: "#why-qc", label: "Why QC Matters" },
              { href: "#inspection-types", label: "Types of Inspections" },
              { href: "#aql", label: "Understanding AQL" },
              { href: "#pre-shipment", label: "Pre-Shipment Inspection" },
              { href: "#third-party", label: "Third-Party QC Companies" },
              { href: "#factory-audits", label: "Factory Audits" },
              { href: "#quality-standards", label: "Creating Quality Standards" },
              { href: "#golden-samples", label: "Golden Samples" },
              { href: "#common-issues", label: "Common Issues by Product Type" },
              { href: "#long-term", label: "Building a Long-Term QC System" },
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
          {/* Why QC Matters */}
          <section id="why-qc">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Why Quality Control Matters
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Quality control is not a nice-to-have. It is the difference
                between a sustainable product business and an expensive lesson.
                When you are manufacturing overseas, you are separated from your
                production line by thousands of miles, a language barrier, and a
                different business culture. Without a structured QC process, you
                are relying entirely on your supplier&apos;s own quality
                standards — which may not match yours.
              </p>
              <p>
                The cost of catching a defect increases roughly 10x at each
                stage. A defect caught on the production line costs pennies to
                fix. Caught at pre-shipment inspection, it costs dollars. Caught
                at your warehouse, it costs tens of dollars in sorting, rework,
                and re-shipping. Caught by your customer, it costs hundreds in
                returns, refunds, negative reviews, and lost lifetime value.
              </p>
              <p>
                Industry data shows that products without third-party QC
                inspection have a 40-60% chance of having quality issues.
                Products with pre-shipment inspection reduce that to under 10%.
                At $200-$400 per inspection, QC is one of the highest-ROI
                investments you can make in your supply chain.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                The Cost of Poor Quality
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">$0.01–$0.10</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Fix on production line</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">$1–$10</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Fix at pre-shipment</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF6B35]">$50–$500</p>
                  <p className="text-sm text-[#6B6B6B] mt-1">Fix after customer receives</p>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Inspections */}
          <section id="inspection-types">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Types of Inspections
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                A comprehensive QC program uses multiple inspection types at
                different stages of production. Each catches different types of
                problems. Think of them as layers of defense — no single
                inspection catches everything, but together they dramatically
                reduce your risk.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center font-bold text-[#FF6B35]">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      Incoming Material Inspection (IQC)
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                      Performed when raw materials and components arrive at the
                      factory. Checks that materials match specifications before
                      production begins. This prevents the entire batch from
                      being ruined by substandard inputs. Common checks include
                      material composition, color matching, dimensional
                      accuracy, and surface quality.
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">When:</span>{" "}
                      <span className="text-[#6B6B6B]">
                        Before production starts. Cost: Usually included in factory QC process.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center font-bold text-[#FF6B35]">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      During Production Inspection (DUPRO)
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                      Conducted when 10-15% of production is complete. This is
                      your earliest opportunity to catch systematic defects. If
                      the factory is using the wrong material, the wrong color,
                      or misinterpreting your specifications, a DUPRO inspection
                      catches it before the entire order is affected. This is
                      the most underused inspection type and often the most
                      valuable.
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">When:</span>{" "}
                      <span className="text-[#6B6B6B]">
                        At 10-20% production completion. Cost: $200–$350 per man-day.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center font-bold text-[#FF6B35]">
                    3
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      Pre-Shipment Inspection (PSI)
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                      The most common and most important inspection. Performed
                      when 100% of goods are produced and at least 80% are
                      packed. The inspector randomly selects samples according
                      to AQL tables, checks them against your specifications,
                      and issues a pass/fail report. This is your last chance to
                      catch defects before the goods leave the factory.
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">When:</span>{" "}
                      <span className="text-[#6B6B6B]">
                        100% produced, 80%+ packed. Cost: $200–$400 per man-day.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center font-bold text-[#FF6B35]">
                    4
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      Container Loading Inspection (CLI)
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                      Monitors the loading of goods into the shipping container.
                      Verifies that the correct quantity is loaded, cartons are
                      properly stacked and secured, the container is clean and
                      free of damage or odors, and desiccants are placed for
                      moisture protection. This prevents damage during transit
                      and quantity discrepancies.
                    </p>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">When:</span>{" "}
                      <span className="text-[#6B6B6B]">
                        During container loading at factory. Cost: $200–$350 per man-day.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding AQL */}
          <section id="aql">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Understanding AQL
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                AQL stands for Acceptable Quality Limit (sometimes called
                Acceptable Quality Level). It is a statistical sampling method
                defined by ISO 2859-1 that determines how many units to inspect
                from a batch and how many defects are acceptable before the
                batch is rejected. AQL is the global standard for quality
                inspection in manufacturing.
              </p>
              <p>
                AQL does not mean you accept a certain percentage of defective
                products. Rather, it defines the maximum defect rate at which a
                batch is considered acceptable. An AQL of 2.5 means that if the
                true defect rate is 2.5%, the batch has approximately a 95%
                chance of being accepted. If the true defect rate is higher, the
                probability of acceptance drops rapidly.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Common AQL Levels by Defect Severity
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  {
                    level: "Critical Defects — AQL 0",
                    desc: "Safety hazards, regulatory non-compliance, or defects that make the product completely unusable. Zero tolerance. Any critical defect means the batch fails.",
                    examples: "Sharp edges on children's toys, electrical safety failures, toxic materials",
                  },
                  {
                    level: "Major Defects — AQL 2.5",
                    desc: "Defects that affect the product's functionality, appearance significantly, or would likely cause a customer to return the product. This is the industry standard for most consumer products.",
                    examples: "Non-functional features, wrong color, significant cosmetic damage, missing components",
                  },
                  {
                    level: "Minor Defects — AQL 4.0",
                    desc: "Small imperfections that most customers would not notice or would not affect their purchase decision. These defects do not impact function or safety.",
                    examples: "Slight color variation, minor scratches in non-visible areas, small packaging dents",
                  },
                ].map((item) => (
                  <div
                    key={item.level}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <p className="font-semibold text-[#1A1A1A]">{item.level}</p>
                    <p className="text-[#6B6B6B] mt-1">{item.desc}</p>
                    <p className="text-[#6B6B6B] mt-1">
                      <span className="font-medium text-[#1A1A1A]">Examples: </span>
                      {item.examples}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-4">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                AQL Sample Size Table (General Inspection Level II)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#E8E8E4]">
                      <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Order Size</th>
                      <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Sample Size</th>
                      <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Accept (AQL 2.5)</th>
                      <th className="text-left py-3 font-semibold text-[#1A1A1A]">Reject (AQL 2.5)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#6B6B6B]">
                    {[
                      { order: "2–8", sample: "2", accept: "0", reject: "1" },
                      { order: "9–15", sample: "3", accept: "0", reject: "1" },
                      { order: "16–25", sample: "5", accept: "0", reject: "1" },
                      { order: "26–50", sample: "8", accept: "0", reject: "1" },
                      { order: "51–90", sample: "13", accept: "1", reject: "2" },
                      { order: "91–150", sample: "20", accept: "1", reject: "2" },
                      { order: "151–280", sample: "32", accept: "2", reject: "3" },
                      { order: "281–500", sample: "50", accept: "3", reject: "4" },
                      { order: "501–1,200", sample: "80", accept: "5", reject: "6" },
                      { order: "1,201–3,200", sample: "125", accept: "7", reject: "8" },
                      { order: "3,201–10,000", sample: "200", accept: "10", reject: "11" },
                      { order: "10,001–35,000", sample: "315", accept: "14", reject: "15" },
                    ].map((row) => (
                      <tr key={row.order} className="border-b border-[#E8E8E4] last:border-0">
                        <td className="py-2 pr-4 font-medium text-[#1A1A1A]">{row.order}</td>
                        <td className="py-2 pr-4">{row.sample}</td>
                        <td className="py-2 pr-4">{row.accept}</td>
                        <td className="py-2">{row.reject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                For your first few orders with a new supplier, use tighter AQL
                levels (e.g., AQL 1.0 for major defects instead of 2.5). This
                sets high expectations early and gives you leverage to demand
                corrections. As the supplier proves their quality consistently,
                you can relax to standard levels.
              </p>
            </div>
          </section>

          {/* Pre-Shipment Inspection */}
          <section id="pre-shipment">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Pre-Shipment Inspection in Detail
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                The pre-shipment inspection (PSI) is the single most important
                QC step for most importers. It is performed at the factory when
                production is complete and goods are substantially packed. A
                trained inspector visits the factory, randomly selects samples
                per AQL tables, and evaluates them against your checklist.
              </p>
              <p>
                A standard PSI costs $200-$400 for one man-day (approximately 8
                hours). One man-day is typically sufficient for orders up to
                5,000 units of simple products. Complex products, larger orders,
                or products requiring functional testing may need additional
                time. The inspection results in a detailed report with photos,
                measurements, test results, and a pass/fail/pending
                recommendation.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                What a PSI Typically Covers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { check: "Quantity verification", desc: "Count cartons and spot-check unit counts per carton" },
                  { check: "Visual appearance", desc: "Color, finish, surface quality, assembly correctness" },
                  { check: "Dimensional check", desc: "Measure key dimensions against spec using calipers" },
                  { check: "Weight check", desc: "Verify product and carton weights match specs" },
                  { check: "Functionality test", desc: "Operate product features, switches, mechanisms" },
                  { check: "Packaging review", desc: "Artwork, barcodes, labels, insert quality" },
                  { check: "Drop test", desc: "Drop packed carton from 76cm to check protection" },
                  { check: "Barcode scan", desc: "Verify UPC/EAN codes scan correctly" },
                ].map((item) => (
                  <div key={item.check} className="bg-[#F5F5F0] rounded-xl p-4">
                    <p className="font-medium text-[#1A1A1A] mb-1">{item.check}</p>
                    <p className="text-[#6B6B6B]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Third-Party Companies */}
          <section id="third-party">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Third-Party QC Companies
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Third-party inspection companies provide independent, unbiased
                quality verification. They have inspectors based in
                manufacturing regions worldwide, trained to evaluate products
                across categories. Using a third party eliminates the conflict
                of interest inherent in relying on your supplier&apos;s own QC
                team.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  name: "SGS",
                  details: "The world's largest inspection company. Swiss-headquartered with offices in every major manufacturing region. Highest brand recognition but also the most expensive. Best for large brands and regulated products.",
                  cost: "$350–$600/man-day",
                  coverage: "Global, 2,600+ offices",
                },
                {
                  name: "Intertek",
                  details: "UK-based global inspection and testing company. Strong in electronics, textiles, and consumer goods. Offers combined inspection and lab testing services, which can streamline your certification process.",
                  cost: "$300–$500/man-day",
                  coverage: "Global, 1,000+ labs",
                },
                {
                  name: "QIMA (formerly AsiaInspection)",
                  details: "Purpose-built for SMBs and e-commerce brands. Online booking platform with transparent pricing and fast scheduling (48-hour notice). Dashboard with historical data and trend analysis. The best option for startups and small brands.",
                  cost: "$300+/man-day",
                  coverage: "Asia, Africa, Latin America",
                },
                {
                  name: "Bureau Veritas",
                  details: "French multinational with strong presence in industrial and technical inspection. Excellent for products requiring certification testing alongside inspection. Good for complex or regulated products.",
                  cost: "$350–$550/man-day",
                  coverage: "Global, 1,500+ offices",
                },
                {
                  name: "TUV (Rheinland/SUD)",
                  details: "German technical inspection company with very strong reputation in Europe. If you are selling into the EU market and need CE marking or other European certifications, TUV inspection carries significant credibility.",
                  cost: "$400–$600/man-day",
                  coverage: "Global, EU-focused",
                },
              ].map((company) => (
                <div
                  key={company.name}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {company.name}
                    </h3>
                    <span className="text-sm font-semibold text-[#FF6B35]">
                      {company.cost}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-2">
                    {company.details}
                  </p>
                  <p className="text-xs text-[#6B6B6B]">
                    Coverage: {company.coverage}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Factory Audits */}
          <section id="factory-audits">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Factory Audits
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                A factory audit is a comprehensive evaluation of a
                supplier&apos;s manufacturing capability, quality management
                system, working conditions, and business practices. Unlike a
                product inspection that checks the output, an audit evaluates
                the process. A well-run factory with good systems is far more
                likely to produce consistent quality over time.
              </p>
              <p>
                Factory audits typically cost $1,000-$3,000 and take 1-2 days
                on-site. They are most valuable before placing your first order
                with a new supplier, or when you are considering a supplier for
                a large or long-term commitment. The ROI comes from avoiding
                suppliers who look good on paper but lack the systems to deliver
                consistently.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                What a Factory Audit Covers
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { area: "Quality Management System", checks: "ISO certifications, documented procedures, quality records, corrective action process, training programs" },
                  { area: "Production Capability", checks: "Equipment condition and age, production capacity, process controls, maintenance schedules, technology level" },
                  { area: "Incoming Material Control", checks: "Supplier qualification, incoming inspection, material traceability, storage conditions" },
                  { area: "In-Process Quality Control", checks: "Inspection stations, work instructions, statistical process control, calibrated measurement tools" },
                  { area: "Final Quality Control", checks: "AQL implementation, testing equipment, defect classification, rework procedures" },
                  { area: "Social Compliance", checks: "Working hours, wages, safety conditions, no child labor, environmental practices (BSCI/SEDEX/SA8000)" },
                ].map((item) => (
                  <div
                    key={item.area}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <p className="font-medium text-[#1A1A1A]">{item.area}</p>
                    <p className="text-[#6B6B6B] mt-1">{item.checks}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Creating Quality Standards */}
          <section id="quality-standards">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Creating Quality Standards &amp; Specifications
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Your quality specification document is the single most important
                document in your QC system. It defines exactly what
                &quot;acceptable&quot; means for your product. Without a clear
                spec, inspections become subjective, and disputes with suppliers
                are unresolvable. A good spec leaves no room for
                interpretation.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                What to Include in Your Quality Spec
              </h3>
              <ol className="space-y-3 text-sm list-decimal pl-5">
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Dimensional specifications</span> — Every
                  critical dimension with tolerances (e.g., length: 150mm +/- 0.5mm)
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Material specifications</span> — Exact
                  material grade, composition, and source requirements
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Color specifications</span> — Pantone
                  numbers or RAL codes, acceptable Delta E variation (typically under 1.5)
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Surface finish requirements</span> —
                  Texture, gloss level, allowable imperfections with sizes and zones
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Functional requirements</span> — Performance
                  criteria, load ratings, operational tests, battery life, etc.
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Packaging requirements</span> — Inner
                  packaging, carton specs, labeling, barcodes, insert placement
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">Defect classification</span> — Photos
                  showing examples of acceptable vs. unacceptable for each defect type
                </li>
                <li className="text-[#6B6B6B]">
                  <span className="font-medium text-[#1A1A1A]">AQL levels</span> — Specified for
                  critical, major, and minor defects
                </li>
              </ol>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Include photos for everything. A picture of an acceptable
                scratch versus an unacceptable scratch eliminates ambiguity.
                Create a visual defect guide with clear &quot;pass&quot; and
                &quot;fail&quot; examples for every common defect type.
                Translate this into your supplier&apos;s language.
              </p>
            </div>
          </section>

          {/* Golden Samples */}
          <section id="golden-samples">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Golden Samples
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                A golden sample (also called a reference sample or sealed
                sample) is an approved production sample that serves as the
                physical standard for quality. It represents exactly what you
                expect from the production run. Both you and the factory keep
                identical golden samples, and every production unit is compared
                against it.
              </p>
              <p>
                Before production begins, request 3-5 pre-production samples.
                Evaluate them thoroughly — test every function, measure every
                dimension, check every detail. When you find a sample that meets
                your standards, approve it as the golden sample. Sign and date
                it, and have the factory do the same. Keep one sample at your
                location and leave one at the factory for the production line to
                reference.
              </p>
              <p>
                Golden samples are especially important for products with
                subjective quality elements like color, texture, or fit. They
                give inspectors a physical reference point that photographs and
                written specs cannot fully capture.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Important
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Golden samples degrade over time. Colors fade, materials age,
                and finishes change. Replace your golden samples every 6-12
                months or at the start of each new production run. Mark each
                sample with the date it was approved and the production order
                it corresponds to.
              </p>
            </div>
          </section>

          {/* Common Issues by Product Type */}
          <section id="common-issues">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Common QC Issues by Product Type
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Different product categories have different failure modes. Knowing
                what to look for in your specific category helps you create a more
                targeted and effective QC checklist.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  type: "Electronics",
                  issues: "Dead pixels, non-functional buttons, poor soldering, battery issues, firmware bugs, incorrect charging behavior, EMI/RFI failures, overheating",
                  focus: "100% functional testing recommended. Burn-in testing (running units for 24-48 hours) catches early failures.",
                },
                {
                  type: "Textiles & Apparel",
                  issues: "Color variation between rolls, shrinkage after washing, weak seams, pilling, fabric weight inconsistency, wrong thread color, sizing inconsistency",
                  focus: "Wash testing is essential. Check colorfastness (rubbing, washing, light). Measure after washing, not just before.",
                },
                {
                  type: "Injection Molded Plastics",
                  issues: "Flash (excess material at seam lines), sink marks, warping, short shots, color inconsistency between batches, weak weld lines, surface scratches",
                  focus: "First article inspection is critical. Check dimensional accuracy as molds wear over time.",
                },
                {
                  type: "Metal Products",
                  issues: "Rust/corrosion, burrs, dimensional inaccuracy, poor welding, plating adhesion failure, surface scratches, incorrect hardness",
                  focus: "Salt spray testing for corrosion resistance. Hardness testing. Check plating thickness with a coating gauge.",
                },
                {
                  type: "Food Contact Products",
                  issues: "Material safety (BPA, heavy metals), odor transfer, staining, cracking, incorrect labeling, packaging integrity failure",
                  focus: "FDA/EU food contact compliance testing is mandatory. Migration testing for chemicals leaching into food.",
                },
                {
                  type: "Toys & Children's Products",
                  issues: "Small parts (choking hazard), sharp edges, lead/phthalate content, weak joints (breakage risk), noise level, age-inappropriate features",
                  focus: "CPSIA/ASTM F963 (US) or EN71 (EU) compliance is legally required. Third-party lab testing is mandatory, not optional.",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {item.type}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-2">
                    <span className="font-medium text-[#1A1A1A]">Common issues: </span>
                    {item.issues}
                  </p>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="text-sm text-[#6B6B6B]">
                      <span className="font-medium text-[#1A1A1A]">Focus area: </span>
                      {item.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Building Long-Term QC System */}
          <section id="long-term">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Building a Long-Term QC System
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Individual inspections catch individual problems. A QC system
                prevents problems from occurring in the first place. As your
                business grows, your QC approach should evolve from reactive
                (catching defects) to proactive (preventing them).
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <ol className="space-y-4 text-sm">
                {[
                  {
                    title: "Track defect data over time",
                    detail:
                      "Record every defect found in every inspection. Categorize by type, severity, and root cause. After 3-5 orders, patterns will emerge. These patterns tell you exactly where to focus improvement efforts.",
                  },
                  {
                    title: "Implement corrective action requests (CARs)",
                    detail:
                      "When a defect pattern is identified, issue a formal CAR to your supplier. Require them to identify the root cause, implement a corrective action, and provide evidence that the fix works. Follow up on the next order to verify.",
                  },
                  {
                    title: "Conduct periodic factory audits",
                    detail:
                      "Even with a trusted supplier, audit annually to ensure their quality systems are maintained. Factories change — key personnel leave, equipment ages, sub-suppliers change. Regular audits catch drift before it becomes a quality problem.",
                  },
                  {
                    title: "Invest in your supplier relationship",
                    detail:
                      "Suppliers who feel valued and see a long-term partnership invest more in your quality. Share your sales data, forecasts, and growth plans. Visit the factory annually. Pay on time. These relationship investments pay dividends in quality.",
                  },
                  {
                    title: "Gradually shift inspection upstream",
                    detail:
                      "As your supplier demonstrates consistent quality, shift from pre-shipment inspection to during-production and incoming material inspection. Catching problems earlier is cheaper and less disruptive.",
                  },
                  {
                    title: "Consider a dedicated QC person for high volume",
                    detail:
                      "Once you are ordering monthly or spending over $50,000/month with a supplier, hiring a full-time QC representative in the region ($1,500-$3,000/month in China) can be more cost-effective than third-party inspections and provides daily oversight.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">
                        {step.title}
                      </p>
                      <p className="text-[#6B6B6B] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to manufacture with confidence?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Start with a Bottlecap feasibility report. Get manufacturing cost
              estimates, supplier recommendations, and quality considerations
              tailored to your specific product — before you spend a dollar on
              production.
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
