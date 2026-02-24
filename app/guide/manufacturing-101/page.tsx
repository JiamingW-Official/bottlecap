import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Manufacturing 101: The Complete Guide for Founders — Bottlecap",
  description:
    "Everything you need to know about product manufacturing. From idea validation to mass production — the complete beginner's guide for founders and product creators.",
}

export default function Manufacturing101Page() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Manufacturing 101</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Manufacturing 101: The Complete Guide for Founders
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            You have a product idea. Maybe it&apos;s a sketch on a napkin, a
            3D model on your screen, or just a clear picture in your head.
            This guide walks you through everything you need to know to turn
            that idea into a physical product — from validating the concept
            to shipping your first batch.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            Table of Contents
          </h2>
          <nav className="space-y-2">
            <a href="#what-is-manufacturing" className="block text-[#FF6B35] hover:underline">
              1. What is Product Manufacturing?
            </a>
            <a href="#eight-steps" className="block text-[#FF6B35] hover:underline">
              2. The Manufacturing Process: 8 Key Steps
            </a>
            <a href="#types" className="block text-[#FF6B35] hover:underline">
              3. Types of Manufacturing
            </a>
            <a href="#costs" className="block text-[#FF6B35] hover:underline">
              4. Understanding Manufacturing Costs
            </a>
            <a href="#glossary" className="block text-[#FF6B35] hover:underline">
              5. Key Terms Every Founder Should Know
            </a>
            <a href="#mistakes" className="block text-[#FF6B35] hover:underline">
              6. Common Mistakes to Avoid
            </a>
            <a href="#next-steps" className="block text-[#FF6B35] hover:underline">
              7. Your Next Steps
            </a>
          </nav>
        </div>

        {/* Content */}
        <article className="space-y-16">
          {/* Section 1 */}
          <section id="what-is-manufacturing">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              1. What is Product Manufacturing?
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Product manufacturing is the process of transforming raw materials into finished
                goods at scale. It encompasses everything from designing and prototyping a product
                to sourcing materials, setting up production lines, quality control, and logistics.
                For founders and product creators, manufacturing is the bridge between an idea and
                a tangible product that customers can buy.
              </p>
              <p>
                Unlike crafting individual items by hand, manufacturing focuses on repeatability
                and consistency. When you manufacture a product, you create systems and tooling
                that allow hundreds, thousands, or millions of identical units to be produced
                efficiently. This is what makes it possible to sell a product at a price point
                that customers are willing to pay while still maintaining healthy margins.
              </p>
              <p>
                The modern manufacturing landscape is global and interconnected. A single product
                might use steel from South Korea, electronic components from Taiwan, plastic
                injection molding in China, and final assembly in Vietnam — before being shipped
                to a warehouse in the United States. Understanding this ecosystem is critical
                for any founder who wants to bring a physical product to market.
              </p>
              <p>
                Manufacturing has become significantly more accessible in the past decade. Where
                launching a physical product once required millions in capital and deep industry
                connections, today&apos;s founders can start with minimum order quantities (MOQs)
                as low as 100-500 units, access global supplier networks online, and leverage
                rapid prototyping technologies like 3D printing and CNC machining. The barriers
                to entry have dropped dramatically, but the complexity of doing it well remains.
              </p>
              <p>
                This guide is designed for founders who are new to manufacturing. Whether you
                are building a consumer electronics device, a kitchen gadget, a piece of fitness
                equipment, or a fashion accessory, the fundamental principles are the same. By
                the end of this guide, you will understand the full manufacturing lifecycle, know
                how to evaluate different manufacturing models, and be equipped to make informed
                decisions about cost, quality, and sourcing.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="eight-steps">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              2. The Manufacturing Process: 8 Key Steps
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Every manufactured product follows a similar journey from concept to customer.
              Here are the eight essential steps, in order.
            </p>

            {/* Step 1 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 1: Idea Validation
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Before you spend a single dollar on manufacturing, you need to confirm
                  that your product idea is worth pursuing. Idea validation means testing
                  whether real customers want your product and are willing to pay for it.
                  This is the most important step in the entire process, because no amount
                  of manufacturing optimization can save a product that nobody wants.
                </p>
                <p>
                  Start by defining the problem your product solves. Talk to potential
                  customers — not friends and family who will tell you what you want to hear,
                  but actual target users. Conduct surveys, run pre-order campaigns, or create
                  landing pages to gauge interest. Tools like Google Trends, Amazon Best Sellers,
                  and Kickstarter can help you understand market demand and competitive landscape.
                </p>
                <p>
                  At this stage, you should also conduct a preliminary feasibility check. Can
                  your product actually be made? What materials and processes would it require?
                  Is the target price point realistic given likely manufacturing costs? A quick
                  analysis at this stage can save you months of wasted effort. This is exactly
                  the kind of analysis that Bottlecap provides — a fast, AI-powered feasibility
                  report that tells you whether your idea is manufacturable, what it will cost,
                  and where to make it.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 2: Prototyping
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Prototyping is the process of creating physical representations of your
                  product to test form, function, and manufacturability. You will typically
                  go through multiple prototype iterations, starting with rough proof-of-concept
                  models and progressing to production-ready samples.
                </p>
                <p>
                  Early-stage prototypes can be as simple as cardboard mockups, 3D-printed
                  models, or hand-assembled units. The goal is to test the core concept quickly
                  and cheaply. A 3D-printed prototype might cost $50-$500 depending on complexity,
                  while a full engineering prototype with production-grade materials could cost
                  $2,000-$20,000+. The key is to iterate fast and fail cheap — each prototype
                  should answer specific questions and inform the next version.
                </p>
                <p>
                  As you refine your prototype, you will need to create detailed technical
                  drawings and specifications (spec sheets). These documents define every
                  dimension, material, finish, tolerance, and performance requirement for your
                  product. They become the blueprint that manufacturers use to quote and produce
                  your product. Investing in clear, comprehensive spec sheets upfront will save
                  you enormous headaches down the road.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 3: Sourcing
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Sourcing is the process of finding and selecting the right manufacturer
                  for your product. This involves identifying potential suppliers, requesting
                  quotes (RFQs), evaluating capabilities, and negotiating terms. Most founders
                  contact 5-15 potential suppliers before selecting one, and the process
                  typically takes 2-6 weeks.
                </p>
                <p>
                  The main channels for finding suppliers include online marketplaces like
                  Alibaba, Global Sources, and Made-in-China; trade shows like Canton Fair,
                  CES, and industry-specific expos; sourcing agents who have established
                  relationships with verified factories; and direct referrals from other
                  founders or industry contacts. Each channel has different advantages — online
                  platforms offer breadth, trade shows offer depth, and agents offer expertise.
                </p>
                <p>
                  When evaluating suppliers, look beyond price. Consider their experience with
                  similar products, production capacity, quality certifications (ISO 9001, etc.),
                  communication responsiveness, willingness to sign NDAs, and references from
                  other clients. A slightly more expensive supplier who delivers consistent
                  quality and communicates well is almost always better than the cheapest option.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 4: Sampling
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Before committing to a full production run, you need to receive and approve
                  samples from your chosen manufacturer. Sampling is your last checkpoint before
                  mass production. Most suppliers will produce 2-5 samples for review, and this
                  stage typically costs $200-$2,000 plus shipping, depending on product complexity.
                </p>
                <p>
                  Evaluate samples rigorously. Check dimensions against your spec sheet, test
                  functionality under real-world conditions, assess material quality and finish,
                  and compare against your approved prototype. Document everything — take photos,
                  measure precisely, and create a detailed feedback report. If the sample does not
                  meet your standards, do not approve it. Request revisions and new samples until
                  you are satisfied. Approving a substandard sample is one of the most costly
                  mistakes a founder can make.
                </p>
                <p>
                  Once you approve a sample, it becomes the &quot;golden sample&quot; — the
                  reference standard against which all production units will be measured. Keep
                  this sample stored safely and send a duplicate to your manufacturer so both
                  parties have an agreed-upon benchmark.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 5: Production
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Production is where your product is manufactured at scale. Depending on your
                  order quantity and product complexity, production runs typically take 15-60
                  days. Before production begins, you will receive a production timeline and
                  usually need to pay a deposit — typically 30-50% of the total order value,
                  with the balance due before shipment.
                </p>
                <p>
                  During production, stay in regular communication with your manufacturer.
                  Request progress photos and updates at key milestones: when raw materials
                  arrive, when production begins, at the midpoint, and when production is
                  complete. Many founders also arrange for in-line inspections through
                  third-party quality control firms (like QIMA, SGS, or Asia Inspection) to
                  catch issues before the full run is complete.
                </p>
                <p>
                  For your first production run, it is often wise to order a smaller quantity
                  than your ideal batch size. Starting with 500-1,000 units instead of 5,000
                  lets you test the production process, identify any issues, and validate
                  market demand before committing to a large order. The per-unit cost will
                  be higher, but the risk is significantly lower.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 6: Quality Control
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Quality control (QC) is the systematic process of verifying that your
                  manufactured products meet your specifications and quality standards. QC
                  happens at multiple stages — during production (in-line inspection), after
                  production is complete (pre-shipment inspection), and sometimes at the
                  container loading stage (loading inspection).
                </p>
                <p>
                  The industry standard for QC is based on the AQL (Acceptable Quality Level)
                  system, which uses statistical sampling to determine whether a batch meets
                  quality standards. Common AQL levels are 1.0 for critical defects (safety
                  issues), 2.5 for major defects (functional problems), and 4.0 for minor
                  defects (cosmetic issues). A third-party inspection company will randomly
                  select a sample from your finished batch and check it against your spec
                  sheet and golden sample.
                </p>
                <p>
                  Never skip quality control, especially with a new supplier. The cost of a
                  pre-shipment inspection ($200-$400) is negligible compared to the cost of
                  receiving thousands of defective units. Even established, trusted suppliers
                  should be inspected regularly — quality can drift over time as factories
                  cut corners or substitute materials.
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 7: Shipping &amp; Logistics
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Once production is complete and quality is verified, your products need to
                  get from the factory to your warehouse or fulfillment center. International
                  shipping involves choosing between sea freight (cheapest, 25-40 days), air
                  freight (fastest, 5-10 days, 4-6x the cost), and courier services like DHL
                  or FedEx (fastest for small shipments, most expensive per unit).
                </p>
                <p>
                  Understanding Incoterms is essential for shipping. The most common are FOB
                  (Free on Board), where the supplier delivers goods to the port and you handle
                  shipping from there; CIF (Cost, Insurance, Freight), where the supplier
                  arranges shipping to your destination port; and DDP (Delivered Duty Paid),
                  where the supplier handles everything including customs and duties. Most
                  first-time importers start with FOB and work with a freight forwarder to
                  handle the logistics.
                </p>
                <p>
                  Do not forget about customs duties and import taxes. Every product has an
                  HS (Harmonized System) code that determines the duty rate. For goods imported
                  to the US from China, duties can range from 0% to 25%+ depending on the
                  product category and current trade policies. Factor these costs into your
                  pricing from the start — they can significantly impact your margins.
                </p>
              </div>
            </div>

            {/* Step 8 */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Step 8: Iteration &amp; Scaling
              </h3>
              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>
                  Your first production run is just the beginning. Once products reach
                  customers, you will receive feedback that informs the next iteration of
                  your product. Collect customer reviews, track return rates and reasons,
                  and identify opportunities for improvement. The best product companies
                  treat manufacturing as a continuous improvement process, not a one-time event.
                </p>
                <p>
                  As you scale, you will negotiate better pricing (higher volumes mean lower
                  per-unit costs), optimize your supply chain (dual sourcing, better shipping
                  routes), and potentially invest in custom tooling that improves product
                  quality and reduces production time. Many successful products go through
                  3-5 major revisions in their first two years on the market.
                </p>
                <p>
                  Scaling also means diversifying your risk. Relying on a single supplier in
                  a single country is fragile. Experienced founders develop relationships with
                  backup suppliers, maintain safety stock, and consider nearshoring options
                  as their volumes grow. The goal is a resilient supply chain that can handle
                  demand spikes, supplier issues, and geopolitical disruptions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="types">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              3. Types of Manufacturing
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Not all manufacturing relationships are the same. Understanding the different
              models will help you choose the right approach for your product and stage of growth.
            </p>

            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  OEM (Original Equipment Manufacturer)
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-4">
                  An OEM manufactures products based on your design and specifications. You own
                  the product design, and the factory produces it exclusively for you. This is
                  the most common model for founders with a unique product design.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Pros:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Full control over product design and IP</li>
                      <li>Product differentiation from competitors</li>
                      <li>Ability to patent unique features</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Cons:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Higher upfront costs (tooling, molds)</li>
                      <li>Longer development timeline</li>
                      <li>More technical expertise required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  ODM (Original Design Manufacturer)
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-4">
                  An ODM designs and manufactures products that you can brand and sell as your
                  own. The factory has existing product designs that you can customize with your
                  logo, colors, packaging, and minor modifications. This is common for accessories,
                  consumer electronics peripherals, and simple consumer goods.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Pros:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Lower upfront costs (no tooling needed)</li>
                      <li>Faster time to market</li>
                      <li>Proven, tested designs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Cons:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Limited product differentiation</li>
                      <li>Competitors can sell similar products</li>
                      <li>Less control over design changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  OBM (Original Brand Manufacturer)
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-4">
                  An OBM handles everything — design, manufacturing, and sometimes even
                  branding and marketing. You essentially become a reseller. This model is
                  common in white-label products and is the simplest way to enter a market,
                  but offers the least differentiation and the lowest margins.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Pros:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Minimal upfront investment</li>
                      <li>Fastest time to market</li>
                      <li>No technical expertise needed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Cons:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>No product differentiation</li>
                      <li>Lowest margins</li>
                      <li>No IP ownership</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  Contract Manufacturing
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-4">
                  Contract manufacturing is a broad term for outsourcing production to a
                  third-party factory. Unlike OEM, the relationship is often project-based
                  rather than ongoing. Contract manufacturers may handle specific processes
                  (e.g., PCB assembly, injection molding) rather than the entire product.
                  This model offers flexibility and is useful when your product requires
                  multiple specialized manufacturing processes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Pros:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>Flexibility to switch suppliers</li>
                      <li>Access to specialized capabilities</li>
                      <li>Scalable capacity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Cons:</p>
                    <ul className="list-disc pl-5 text-sm text-[#6B6B6B] space-y-1">
                      <li>More complex supply chain management</li>
                      <li>Potential quality inconsistency</li>
                      <li>Higher coordination overhead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="costs">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              4. Understanding Manufacturing Costs
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed mb-8">
              <p>
                Manufacturing costs are often more complex than founders expect. The per-unit
                price you get from a factory is just one piece of the puzzle. Understanding
                the full cost structure is essential for setting realistic retail prices and
                ensuring healthy margins.
              </p>
              <p>
                Total landed cost — the true cost of getting one unit of your product into a
                customer&apos;s hands — includes raw materials, labor, tooling, packaging,
                shipping, customs duties, warehousing, and fulfillment. For many products,
                the factory price represents only 40-60% of the total landed cost.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A]">
                Cost Component Breakdown
              </h3>
              <ul className="space-y-3 text-[#6B6B6B]">
                <li>
                  <strong className="text-[#1A1A1A]">Bill of Materials (BOM):</strong>{" "}
                  The cost of all raw materials and components that go into your product.
                  This is typically the largest cost component, representing 30-50% of the
                  factory price. Includes metals, plastics, electronics, fasteners, adhesives,
                  and any other physical inputs.
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">Labor:</strong>{" "}
                  The cost of human labor required for assembly, finishing, and quality checks.
                  Varies dramatically by country — from $2-4/hour in Vietnam to $25-40/hour in
                  the United States. Labor typically represents 15-30% of the factory price.
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">Tooling &amp; Molds:</strong>{" "}
                  One-time costs for creating the molds, dies, jigs, and fixtures needed
                  to produce your product. A simple injection mold might cost $3,000-$8,000,
                  while complex multi-cavity molds for high-volume production can cost
                  $50,000-$200,000+. These costs are amortized over the production quantity.
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">Packaging:</strong>{" "}
                  Includes inner packaging (product box, inserts, protective wrapping) and
                  outer packaging (shipping cartons). Custom packaging with printed graphics
                  typically costs $0.50-$5.00 per unit depending on complexity. Premium
                  unboxing experiences with rigid boxes, magnetic closures, and custom inserts
                  can cost $5-$15+ per unit.
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">Shipping:</strong>{" "}
                  Sea freight typically costs $3,000-$8,000 for a 20-foot container (FCL) or
                  $100-$300 per cubic meter for less-than-container (LCL) shipments. Air freight
                  costs $4-$8 per kilogram. Transit times range from 5-10 days (air) to 25-40
                  days (sea).
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">Customs Duties &amp; Taxes:</strong>{" "}
                  Import duties vary by product category (HS code) and country of origin.
                  US import duties range from 0% to 25%+. You may also owe customs processing
                  fees, harbor maintenance fees, and state/local taxes.
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
              Example: Cost Breakdown for a Simple Consumer Product
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Here is a realistic cost breakdown for a stainless steel water bottle
              manufactured in China with an order quantity of 2,000 units:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="text-left p-3 font-semibold">Cost Component</th>
                    <th className="text-right p-3 font-semibold">Per Unit</th>
                    <th className="text-right p-3 font-semibold">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Raw Materials (BOM)</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$3.20</td>
                    <td className="p-3 text-right text-[#6B6B6B]">26%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 text-[#1A1A1A]">Labor &amp; Assembly</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$1.80</td>
                    <td className="p-3 text-right text-[#6B6B6B]">15%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Tooling (amortized)</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$1.50</td>
                    <td className="p-3 text-right text-[#6B6B6B]">12%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 text-[#1A1A1A]">Packaging</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$1.00</td>
                    <td className="p-3 text-right text-[#6B6B6B]">8%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Factory Overhead &amp; Margin</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$0.70</td>
                    <td className="p-3 text-right text-[#6B6B6B]">6%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 text-[#1A1A1A] font-semibold">Factory Price (FOB)</td>
                    <td className="p-3 text-right text-[#1A1A1A] font-semibold">$8.20</td>
                    <td className="p-3 text-right text-[#1A1A1A] font-semibold">67%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Sea Freight</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$1.20</td>
                    <td className="p-3 text-right text-[#6B6B6B]">10%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 text-[#1A1A1A]">Customs Duties (7.5%)</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$0.62</td>
                    <td className="p-3 text-right text-[#6B6B6B]">5%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Inland Freight &amp; Handling</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$0.80</td>
                    <td className="p-3 text-right text-[#6B6B6B]">6%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 text-[#1A1A1A]">QC Inspection</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$0.15</td>
                    <td className="p-3 text-right text-[#6B6B6B]">1%</td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 text-[#1A1A1A]">Insurance</td>
                    <td className="p-3 text-right text-[#6B6B6B]">$0.10</td>
                    <td className="p-3 text-right text-[#6B6B6B]">1%</td>
                  </tr>
                  <tr className="bg-[#FF6B35] text-white">
                    <td className="p-3 font-bold">Total Landed Cost</td>
                    <td className="p-3 text-right font-bold">$12.27</td>
                    <td className="p-3 text-right font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Key Takeaway</p>
              <p className="text-sm text-[#6B6B6B]">
                The factory price ($8.20) is only 67% of the total landed cost ($12.27).
                If you price your product based on the factory price alone, you will
                significantly underestimate your true costs and erode your margins. Always
                calculate the full landed cost before setting your retail price.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="glossary">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              5. Key Terms Every Founder Should Know
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Manufacturing has its own language. Here are 25+ essential terms you need
              to understand before your first conversation with a supplier.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  term: "MOQ (Minimum Order Quantity)",
                  definition:
                    "The smallest number of units a factory will produce in a single order. Typical MOQs range from 100-5,000 units depending on the product and factory.",
                },
                {
                  term: "FOB (Free on Board)",
                  definition:
                    "An Incoterm meaning the supplier delivers goods to the port of origin. The buyer assumes responsibility for shipping, insurance, and customs from that point forward.",
                },
                {
                  term: "CIF (Cost, Insurance, Freight)",
                  definition:
                    "An Incoterm where the supplier arranges and pays for shipping and insurance to the destination port. The buyer handles customs clearance and inland delivery.",
                },
                {
                  term: "DDP (Delivered Duty Paid)",
                  definition:
                    "An Incoterm where the supplier handles everything — shipping, insurance, customs, and duties — delivering the goods to your specified destination.",
                },
                {
                  term: "RFQ (Request for Quotation)",
                  definition:
                    "A formal document sent to potential suppliers requesting pricing, lead times, and terms for manufacturing your product.",
                },
                {
                  term: "BOM (Bill of Materials)",
                  definition:
                    "A complete list of all raw materials, components, and sub-assemblies required to manufacture one unit of your product, with quantities and specifications.",
                },
                {
                  term: "NDA (Non-Disclosure Agreement)",
                  definition:
                    "A legal contract requiring the supplier to keep your product design, specifications, and business information confidential.",
                },
                {
                  term: "OEM (Original Equipment Manufacturer)",
                  definition:
                    "A manufacturer that produces goods based on your proprietary design and specifications.",
                },
                {
                  term: "QC (Quality Control)",
                  definition:
                    "The process of inspecting products to ensure they meet specified quality standards. Includes in-line, pre-shipment, and loading inspections.",
                },
                {
                  term: "AQL (Acceptable Quality Level)",
                  definition:
                    "A statistical sampling standard used in quality inspections. Common levels: 1.0 (critical), 2.5 (major), 4.0 (minor defects).",
                },
                {
                  term: "HS Code (Harmonized System Code)",
                  definition:
                    "An internationally standardized system of numbers used to classify traded products and determine applicable customs duties.",
                },
                {
                  term: "Tariff",
                  definition:
                    "A tax imposed by a government on imported goods. Rates vary by product category (HS code) and country of origin.",
                },
                {
                  term: "Duty",
                  definition:
                    "The actual amount of tax paid on imported goods, calculated by applying the tariff rate to the declared value of the goods.",
                },
                {
                  term: "Mold / Tooling",
                  definition:
                    "Custom-made tools (molds, dies, jigs) used to shape raw materials into your product. A one-time investment that is owned by you.",
                },
                {
                  term: "Lead Time",
                  definition:
                    "The total time from placing an order to receiving finished goods. Includes production time plus shipping time. Typical range: 30-90 days.",
                },
                {
                  term: "Sample",
                  definition:
                    "A pre-production unit made by the factory for your approval. Used to verify quality, dimensions, and functionality before mass production.",
                },
                {
                  term: "Prototype",
                  definition:
                    "An early model of your product used to test design concepts, functionality, and user experience. Usually made with different processes than mass production.",
                },
                {
                  term: "Spec Sheet",
                  definition:
                    "A detailed technical document defining every aspect of your product — dimensions, materials, tolerances, finishes, colors, performance requirements.",
                },
                {
                  term: "PO (Purchase Order)",
                  definition:
                    "A formal, legally binding document you send to a supplier to confirm an order, specifying quantity, price, delivery date, and payment terms.",
                },
                {
                  term: "LC (Letter of Credit)",
                  definition:
                    "A payment method where your bank guarantees payment to the supplier upon presentation of specified shipping documents. Common for large orders.",
                },
                {
                  term: "T/T (Telegraphic Transfer)",
                  definition:
                    "A wire transfer payment method. The most common payment structure is 30% T/T deposit before production, 70% balance before shipment.",
                },
                {
                  term: "Incoterms",
                  definition:
                    "A set of international trade rules published by the ICC that define the responsibilities of buyers and sellers in the delivery of goods.",
                },
                {
                  term: "COO (Country of Origin)",
                  definition:
                    "The country where a product was manufactured or substantially transformed. Required for customs declarations and affects duty rates.",
                },
                {
                  term: "CE Marking",
                  definition:
                    "A certification mark indicating that a product meets EU safety, health, and environmental requirements. Required for selling in the European Economic Area.",
                },
                {
                  term: "FCC Certification",
                  definition:
                    "A certification required for electronic devices sold in the United States, confirming the product does not emit harmful levels of electromagnetic interference.",
                },
                {
                  term: "Landed Cost",
                  definition:
                    "The total cost of getting a product from the factory to your warehouse, including factory price, shipping, duties, insurance, and handling fees.",
                },
                {
                  term: "Golden Sample",
                  definition:
                    "The approved reference sample against which all production units are measured. Both you and your factory should have a copy.",
                },
              ].map((item) => (
                <div
                  key={item.term}
                  className="bg-white rounded-xl border border-[#E8E8E4] p-4"
                >
                  <p className="font-semibold text-[#1A1A1A] text-sm mb-1">
                    {item.term}
                  </p>
                  <p className="text-sm text-[#6B6B6B]">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              6. Common Mistakes to Avoid
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              These are the ten most common mistakes we see founders make when manufacturing
              their first product. Avoiding them can save you thousands of dollars and months
              of delays.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "1. Skipping idea validation",
                  description:
                    "Jumping straight into manufacturing without confirming market demand is the most expensive mistake you can make. Build and test demand before you build the product. Pre-sell, run landing page tests, or at minimum, interview 50+ potential customers.",
                },
                {
                  title: "2. Choosing the cheapest supplier",
                  description:
                    "The lowest price quote almost always comes with hidden costs — poor quality, missed deadlines, communication issues, and surprise charges. A supplier that is 10-15% more expensive but reliable, responsive, and quality-focused will save you money in the long run.",
                },
                {
                  title: "3. Not getting multiple quotes",
                  description:
                    "Founders often go with the first supplier they find. Always get quotes from at least 5-8 suppliers. This gives you pricing leverage, lets you compare capabilities, and helps you identify outliers (both too cheap and too expensive).",
                },
                {
                  title: "4. Unclear specifications",
                  description:
                    "Vague or incomplete spec sheets lead to products that do not match your expectations. Every dimension, material, finish, tolerance, and performance requirement must be documented precisely. If it is not in the spec sheet, the factory will make their own decision — and it may not be the one you wanted.",
                },
                {
                  title: "5. Ordering too many units on the first run",
                  description:
                    "Ordering 10,000 units to get a better per-unit price is tempting, but dangerous for a first production run. Start with the minimum viable quantity (500-1,000 units) to test the manufacturing process and validate market demand before scaling up.",
                },
                {
                  title: "6. Skipping quality control inspections",
                  description:
                    "Never rely on the factory to inspect their own work. Always use a third-party inspection company for pre-shipment QC. The $200-$400 cost of an inspection is nothing compared to the cost of receiving 2,000 defective units.",
                },
                {
                  title: "7. Ignoring total landed cost",
                  description:
                    "Founders frequently set retail prices based on the factory price alone, forgetting to account for shipping, duties, packaging, warehousing, and fulfillment. Calculate the full landed cost before finalizing your pricing strategy.",
                },
                {
                  title: "8. Not protecting intellectual property",
                  description:
                    "Failing to sign NDAs, register patents, or file trademarks before sharing designs with suppliers puts your IP at risk. At minimum, have every supplier sign an NDA. For unique products, file provisional patents before contacting manufacturers.",
                },
                {
                  title: "9. Poor communication with suppliers",
                  description:
                    "Communication breakdowns cause most manufacturing problems. Use clear, simple language. Confirm everything in writing. Send visual references (photos, drawings, diagrams) alongside written specs. Follow up regularly and document all agreements.",
                },
                {
                  title: "10. Not planning for the unexpected",
                  description:
                    "Manufacturing timelines almost always run longer than quoted. Raw material prices fluctuate. Shipping rates spike during peak seasons. Build 2-4 weeks of buffer into your timeline, add 10-15% to your cost estimates, and always have a Plan B for critical components.",
                },
              ].map((mistake) => (
                <div
                  key={mistake.title}
                  className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl"
                >
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">
                    {mistake.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">
                    {mistake.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 */}
          <section id="next-steps">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              7. Your Next Steps
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed mb-8">
              <p>
                You now have a solid foundation in product manufacturing. You understand the
                eight key steps, the different manufacturing models, how costs work, and the
                most common pitfalls to avoid. The next step is to take action.
              </p>
              <p>
                If you have a product idea, the fastest way to get started is to run a
                feasibility analysis. Bottlecap generates a comprehensive manufacturing
                report in minutes — covering whether your product can be made, estimated
                costs, the best countries to manufacture in, and specific recommendations
                for your product category.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Get your manufacturing feasibility report
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Describe your product idea and get a complete analysis in minutes —
              costs, country comparisons, optimization tips, and more.
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
