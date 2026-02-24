import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Food & Beverage Packaging Manufacturing Guide — Bottlecap",
  description:
    "The complete guide to manufacturing food and beverage packaging. Materials, food safety compliance, labeling requirements, sustainable packaging, cost breakdowns, and top manufacturing countries.",
}

export default function FoodManufacturingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Food &amp; Beverage Packaging</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Food &amp; Beverage Packaging Manufacturing Guide
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Packaging is the silent salesperson for every food and beverage
            product. It protects the product, communicates the brand, meets
            safety regulations, and increasingly must satisfy sustainability
            demands. This guide covers every decision you&apos;ll face as a
            founder — from choosing materials to navigating FDA compliance — with
            real cost data and sourcing strategies.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <ol className="space-y-2 text-[#6B6B6B]">
            <li>
              <a href="#packaging-types" className="hover:text-[#FF6B35] transition-colors">
                1. Types of Food Packaging
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-[#FF6B35] transition-colors">
                2. Packaging Materials
              </a>
            </li>
            <li>
              <a href="#food-safety" className="hover:text-[#FF6B35] transition-colors">
                3. Food Safety Compliance
              </a>
            </li>
            <li>
              <a href="#labeling" className="hover:text-[#FF6B35] transition-colors">
                4. Labeling Requirements
              </a>
            </li>
            <li>
              <a href="#sustainable" className="hover:text-[#FF6B35] transition-colors">
                5. Sustainable Packaging
              </a>
            </li>
            <li>
              <a href="#cost-breakdown" className="hover:text-[#FF6B35] transition-colors">
                6. Cost Breakdown
              </a>
            </li>
            <li>
              <a href="#top-countries" className="hover:text-[#FF6B35] transition-colors">
                7. Top Manufacturing Countries
              </a>
            </li>
            <li>
              <a href="#mistakes" className="hover:text-[#FF6B35] transition-colors">
                8. Common Mistakes &amp; Tips
              </a>
            </li>
          </ol>
        </div>

        {/* Section 1 */}
        <section id="packaging-types" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            1. Types of Food Packaging
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Food packaging is categorized by its proximity to the product and
              its function in the supply chain. Understanding these layers helps
              you communicate clearly with packaging suppliers and co-packers.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Packaging Layers</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Primary Packaging</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Directly contacts the food. The bag inside a cereal box, the can
                  holding the soup, the bottle holding the juice. Must be food-safe
                  (FDA-compliant materials) and is the most regulated layer. This is
                  where barrier properties matter — oxygen, moisture, and light
                  protection determine shelf life.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Secondary Packaging</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Groups primary packages together and carries branding. The cereal
                  box, the six-pack carton, the sleeve around a jar. This is your
                  primary marketing surface on the shelf. Must include all required
                  labeling (Nutrition Facts, ingredients, allergens).
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Tertiary Packaging</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Shipping and warehouse packaging. Corrugated cases, pallets,
                  stretch wrap. Designed for logistics efficiency, not consumer eyes.
                  Must meet retailer specs (Walmart, Amazon, etc. each have specific
                  case pack and pallet requirements).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For most CPG (consumer packaged goods) startups, the primary and
              secondary packaging are combined into a single unit — the pouch
              holds the food and carries the branding, or the bottle serves both
              functions. This simplifies your supply chain and reduces cost.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="materials" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            2. Packaging Materials
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Your material choice drives cost, shelf life, sustainability
              profile, and consumer perception. Each material family has distinct
              trade-offs that depend on your specific product requirements.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Material Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Material</th>
                  <th className="pb-3 font-semibold">Cost/Unit</th>
                  <th className="pb-3 font-semibold">Barrier</th>
                  <th className="pb-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Flexible film/pouches</td>
                  <td className="py-3">$0.05 - $0.50</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Snacks, coffee, pet food, powders</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Rigid plastic (PET, HDPE)</td>
                  <td className="py-3">$0.10 - $1.50</td>
                  <td className="py-3">Good</td>
                  <td className="py-3 text-[#6B6B6B]">Beverages, sauces, condiments</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Glass</td>
                  <td className="py-3">$0.30 - $3.00</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Premium beverages, sauces, baby food</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Aluminum cans</td>
                  <td className="py-3">$0.08 - $0.30</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Beverages, RTD cocktails, sparkling water</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Steel cans</td>
                  <td className="py-3">$0.15 - $0.60</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Shelf-stable foods, soups, vegetables</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Paperboard/carton</td>
                  <td className="py-3">$0.10 - $0.80</td>
                  <td className="py-3">Low-Medium</td>
                  <td className="py-3 text-[#6B6B6B]">Dry goods, cereal, frozen foods</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Aseptic carton (Tetra Pak)</td>
                  <td className="py-3">$0.10 - $0.40</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Shelf-stable liquids, broth, juice</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              Flexible pouches (stand-up pouches, flat pouches) are the fastest-growing
              format in food packaging because they&apos;re lightweight, cost-effective,
              and offer excellent barrier properties. But most multi-layer pouches
              are not recyclable because they laminate different plastics together
              (PET + PE + aluminum). If sustainability is core to your brand, look
              into mono-material pouches (all-PE or all-PP) which are recyclable
              but offer slightly lower barrier performance.
            </p>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For beverages, the can vs. bottle decision is often category-defining.
              Aluminum cans are lighter (lower shipping cost), have infinite
              recyclability, chill faster, and are increasingly preferred by
              consumers for RTD (ready-to-drink) products. Glass commands a premium
              perception and is standard for wine, craft spirits, and premium
              juices. PET bottles dominate for water and large-format beverages
              due to cost and weight advantages.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="food-safety" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            3. Food Safety Compliance
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Food packaging regulations exist to protect consumers from chemical
              migration (substances leaching from packaging into food), contamination,
              and deceptive labeling. Non-compliance can result in FDA warning letters,
              product seizures, and retailer de-listing.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Key Certifications &amp; Standards</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">FDA Food Contact Notification (FCN)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  All materials that contact food must be FDA-approved for food
                  contact. Your packaging supplier should provide a Letter of
                  Guarantee confirming their materials are FDA-compliant for your
                  specific food type (acidic, fatty, aqueous, dry). Always request
                  this document before ordering.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">FSMA (Food Safety Modernization Act)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Requires food facilities to have a Food Safety Plan based on
                  Hazard Analysis and Risk-Based Preventive Controls (HARPC).
                  Your co-packer must be FSMA-compliant. If you&apos;re packing
                  in-house, you need your own food safety plan — budget $2,000-$5,000
                  for a consultant to develop it.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">SQF (Safe Quality Food) Certification</h4>
                <p className="text-sm text-[#6B6B6B]">
                  A GFSI-recognized certification that many major retailers require.
                  Level 2 covers food safety fundamentals; Level 3 adds quality
                  management. Certification costs $5,000-$15,000 for your facility,
                  but most co-packers already hold SQF or BRC certification.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">BRC Global Standard for Packaging</h4>
                <p className="text-sm text-[#6B6B6B]">
                  The gold standard for packaging manufacturing. Required by many
                  European retailers and increasingly by US buyers. If you&apos;re
                  sourcing packaging from overseas, prioritize BRC-certified suppliers.
                  Certification audit costs $3,000-$8,000.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Proposition 65 (California)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  If you sell in California, packaging materials must not contain
                  listed chemicals above safe harbor levels, or you must add a
                  Prop 65 warning. This affects inks, adhesives, and certain
                  plastics. Test costs: $500-$2,000 per material.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              When evaluating co-packers, ask for their most recent SQF or BRC
              audit score. A score above 90% is good; above 95% is excellent.
              Also ask for their recall history — any co-packer with more than
              one recall in the past 3 years deserves extra scrutiny.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="labeling" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            4. Labeling Requirements
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              FDA labeling regulations are detailed and specific. Getting them
              wrong can result in seizure of your product, retailer rejection,
              or consumer lawsuits. Most founders hire a food labeling consultant
              ($500-$2,000 per SKU) for their first products.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Required Label Elements (US Market)</h3>
            <ul className="space-y-3 text-[#6B6B6B] text-sm">
              <li><strong className="text-[#1A1A1A]">Statement of identity</strong> — What the product is (e.g., &quot;Organic Granola&quot;). Must be on the principal display panel (PDP).</li>
              <li><strong className="text-[#1A1A1A]">Net quantity</strong> — Weight or volume in both metric and US customary units. Must be on the lower 30% of the PDP.</li>
              <li><strong className="text-[#1A1A1A]">Nutrition Facts panel</strong> — Must follow FDA&apos;s updated 2020 format with calories prominent, added sugars line, and updated Daily Values. Lab testing for a Nutrition Facts panel costs $500-$1,500 per SKU.</li>
              <li><strong className="text-[#1A1A1A]">Ingredient list</strong> — All ingredients in descending order by weight. Must use common names (not scientific or proprietary names).</li>
              <li><strong className="text-[#1A1A1A]">Allergen declaration</strong> — Must declare the presence of the 9 major allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy, sesame) using &quot;Contains:&quot; statement.</li>
              <li><strong className="text-[#1A1A1A]">Name and address</strong> — Manufacturer, packer, or distributor name and address.</li>
              <li><strong className="text-[#1A1A1A]">Country of origin</strong> — Required for imported products.</li>
              <li><strong className="text-[#1A1A1A]">UPC barcode</strong> — Required by all retailers. GS1 company prefix costs $250/year (for up to 10 barcodes) or $1,050/year (for up to 1,000).</li>
            </ul>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              Claims like &quot;natural,&quot; &quot;healthy,&quot; or
              &quot;superfood&quot; are regulated or under FDA scrutiny. The FDA
              finalized its updated definition of &quot;healthy&quot; in 2024 with
              specific nutrient thresholds. &quot;Organic&quot; requires USDA
              certification ($750-$3,000/year). Using these terms incorrectly can
              trigger FDA enforcement action or consumer lawsuits under state
              consumer protection laws.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="sustainable" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            5. Sustainable Packaging
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Sustainability is no longer optional in food packaging — it&apos;s
              a consumer expectation and, increasingly, a regulatory requirement.
              The EU&apos;s Packaging and Packaging Waste Regulation (PPWR) mandates
              recyclability and recycled content targets through 2030. Several US
              states have passed Extended Producer Responsibility (EPR) laws for
              packaging.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Sustainable Packaging Options</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Option</th>
                  <th className="pb-3 font-semibold">Cost Premium</th>
                  <th className="pb-3 font-semibold">Trade-offs</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">PCR (post-consumer recycled) plastic</td>
                  <td className="py-3">10-30% more</td>
                  <td className="py-3 text-[#6B6B6B]">Slight color variation, same performance</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Mono-material pouches (all-PE)</td>
                  <td className="py-3">5-20% more</td>
                  <td className="py-3 text-[#6B6B6B]">Lower barrier, shorter shelf life</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Compostable film (PLA, PBAT)</td>
                  <td className="py-3">50-100% more</td>
                  <td className="py-3 text-[#6B6B6B]">Requires industrial composting, limited barrier</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Paper-based flexible packaging</td>
                  <td className="py-3">30-60% more</td>
                  <td className="py-3 text-[#6B6B6B]">Limited moisture barrier, newer technology</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Aluminum (infinitely recyclable)</td>
                  <td className="py-3">0-10% more</td>
                  <td className="py-3 text-[#6B6B6B]">Already widely recycled, great sustainability story</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              The most impactful sustainability move is often the simplest:
              reduce material. A pouch that uses 80% less plastic than a rigid
              container achieves more environmental benefit than switching to a
              compostable material that may never reach a composting facility.
              Right-sizing your packaging (eliminating excess air space and
              unnecessary layers) cuts both cost and environmental impact.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="cost-breakdown" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            6. Cost Breakdown
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Packaging typically represents 10-40% of a food product&apos;s COGS,
              depending on the format. A bag of chips spends proportionally more
              on packaging than a jar of sauce. Understanding your packaging cost
              drivers helps you optimize without compromising product quality.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Cost Breakdown: Stand-Up Pouch Snack Product (5,000 units)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Component</th>
                  <th className="pb-3 font-semibold">Cost/Unit</th>
                  <th className="pb-3 font-semibold">% of Packaging Cost</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Printed stand-up pouch (8oz)</td>
                  <td className="py-3">$0.18</td>
                  <td className="py-3">42%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Zipper closure</td>
                  <td className="py-3">$0.03</td>
                  <td className="py-3">7%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Corrugated shipper case (holds 12)</td>
                  <td className="py-3">$0.08</td>
                  <td className="py-3">19%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Case label</td>
                  <td className="py-3">$0.02</td>
                  <td className="py-3">5%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Plate/die setup (amortized)</td>
                  <td className="py-3">$0.06</td>
                  <td className="py-3">14%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Pallet &amp; stretch wrap (allocated)</td>
                  <td className="py-3">$0.05</td>
                  <td className="py-3">12%</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total Packaging Cost</td>
                  <td className="py-3 font-semibold">$0.42</td>
                  <td className="py-3 font-semibold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">NRE / Setup Costs (One-Time)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Item</th>
                  <th className="pb-3 font-semibold">Cost Range</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Print plates / cylinders (flexographic)</td>
                  <td className="py-3">$300 - $1,500 per color</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Die cutting tool (for cartons)</td>
                  <td className="py-3">$500 - $2,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Bottle/container mold (custom shape)</td>
                  <td className="py-3">$5,000 - $25,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Nutrition Facts testing (lab analysis)</td>
                  <td className="py-3">$500 - $1,500 per SKU</td>
                </tr>
                <tr>
                  <td className="py-3">Label/packaging design</td>
                  <td className="py-3">$1,000 - $5,000 per SKU</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Scaling insight</p>
            <p className="text-[#6B6B6B]">
              Packaging cost drops significantly with volume. That $0.18 pouch at
              5,000 units becomes $0.08-$0.12 at 50,000 units and $0.04-$0.07 at
              250,000 units. Print plate costs amortize to nearly zero at high
              volumes. Digital printing eliminates plate costs entirely but costs
              more per unit — it&apos;s economical up to about 10,000-20,000 units,
              after which flexographic printing wins.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="top-countries" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            7. Top Manufacturing Countries
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Food packaging manufacturing is typically done domestically or
              regionally due to the bulky nature of packaging materials and the
              need for tight coordination with co-packers. However, some
              components (especially specialty packaging) are sourced globally.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Country Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Strengths</th>
                  <th className="pb-3 font-semibold">Typical Products</th>
                  <th className="pb-3 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">USA</td>
                  <td className="py-3 text-[#6B6B6B]">Quality, speed, regulatory compliance</td>
                  <td className="py-3 text-[#6B6B6B]">All formats</td>
                  <td className="py-3">$$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">China</td>
                  <td className="py-3 text-[#6B6B6B]">Lowest cost, huge capacity, custom shapes</td>
                  <td className="py-3 text-[#6B6B6B]">Pouches, bottles, tins</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">India</td>
                  <td className="py-3 text-[#6B6B6B]">Flexible packaging hub, competitive pricing</td>
                  <td className="py-3 text-[#6B6B6B]">Pouches, wrappers, labels</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Germany</td>
                  <td className="py-3 text-[#6B6B6B]">Precision engineering, sustainable packaging</td>
                  <td className="py-3 text-[#6B6B6B]">Cartons, aseptic, machinery</td>
                  <td className="py-3">$$$</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Mexico</td>
                  <td className="py-3 text-[#6B6B6B]">Nearshoring, USMCA benefits, fast turnaround</td>
                  <td className="py-3 text-[#6B6B6B]">Corrugated, flexible, labels</td>
                  <td className="py-3">$$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For most US-based food startups, domestic packaging suppliers are the
              default choice. The logistics cost of shipping bulky, lightweight
              packaging from Asia can erase the unit cost savings. A container of
              empty pouches from China costs $3,000-$5,000 in freight for what
              might be $2,000-$3,000 in packaging value.
            </p>
            <p>
              The exception is custom-shaped packaging (unique bottles, tins,
              specialty containers) where domestic options are limited or
              prohibitively expensive. Chinese manufacturers excel at custom molds
              and can produce unique shapes for 50-70% less than US suppliers.
              Import the packaging, fill domestically.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="mistakes" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            8. Common Mistakes &amp; Tips
          </h2>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Top mistakes food packaging founders make</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Designing packaging before finalizing the product.</strong>{" "}
                Your packaging dimensions, barrier requirements, and fill weight
                depend on the final product. Ordering 10,000 pouches before your
                formula is finalized means reprinting when net weight or ingredients
                change.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Ignoring shelf life testing.</strong>{" "}
                Your product might last 6 months in one packaging format and 6 weeks
                in another. Run accelerated shelf life testing ($1,000-$3,000) to
                validate that your packaging delivers the shelf life retailers
                require (typically 6-12 months).
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Underestimating label compliance.</strong>{" "}
                Incorrect Nutrition Facts, missing allergen declarations, or
                unsubstantiated claims can get your product pulled from shelves.
                Hire a regulatory consultant for your first labels.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Not testing on the filling line.</strong>{" "}
                Packaging that looks great in a sample might jam the co-packer&apos;s
                filling equipment. Always send packaging samples to your co-packer
                for a test run before committing to a full order.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Over-designing the secondary packaging.</strong>{" "}
                A gorgeous rigid box with embossing adds $2-$4 per unit and only
                matters if your product sits on a retail shelf. For DTC/e-commerce,
                the primary pouch or bottle IS the branding — invest there instead.
              </li>
            </ul>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Pro tips for food packaging</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Start with digital printing.</strong>{" "}
                No plate costs, 1,000-unit minimums, and you can change artwork
                between runs. Switch to flexographic printing when you consistently
                order 20,000+ units per SKU.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Order packaging in line with co-packer schedule.</strong>{" "}
                Coordinate delivery timing so packaging arrives 1-2 weeks before
                your production date. Storing 50,000 pouches at your house or
                paying warehouse fees erodes margins.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Get retailer packaging specs early.</strong>{" "}
                Whole Foods, Target, Costco, and Amazon each have specific packaging
                requirements (case dimensions, pallet patterns, labeling). Design
                your tertiary packaging to meet these specs from day one.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Always request a pre-production proof.</strong>{" "}
                A printed proof (not a digital mockup) shows the actual colors,
                registration, and finish on your chosen substrate. A $100 press proof
                prevents a $5,000 reprint when colors don&apos;t match your screen.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-10 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your food product packaging?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a complete packaging feasibility report with cost breakdowns,
            material recommendations, and compliance guidance — delivered in
            minutes, not weeks.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
          >
            Analyze my product idea &rarr;
          </Link>
        </section>
      </div>
    </main>
  )
}