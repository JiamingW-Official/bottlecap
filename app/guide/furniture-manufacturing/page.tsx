import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Furniture Manufacturing Guide for Founders — Bottlecap",
  description:
    "The complete guide to manufacturing furniture products. Materials, flat-pack vs assembled, prototyping, shipping logistics, cost breakdowns, and top manufacturing countries for furniture startups.",
}

export default function FurnitureManufacturingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Furniture Manufacturing</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Furniture Manufacturing Guide for Founders
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Furniture is one of the most rewarding — and logistically complex —
            product categories to manufacture. Between material selection,
            structural engineering, and the brutal economics of shipping oversized
            goods, there&apos;s a lot that can go wrong. This guide covers
            everything from prototyping your first piece to navigating
            international freight, with real costs and practical advice.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <ol className="space-y-2 text-[#6B6B6B]">
            <li>
              <a href="#manufacturing-types" className="hover:text-[#FF6B35] transition-colors">
                1. Types of Furniture Manufacturing
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-[#FF6B35] transition-colors">
                2. Materials
              </a>
            </li>
            <li>
              <a href="#flat-pack" className="hover:text-[#FF6B35] transition-colors">
                3. Flat-Pack vs. Assembled
              </a>
            </li>
            <li>
              <a href="#prototyping" className="hover:text-[#FF6B35] transition-colors">
                4. Prototyping &amp; Sampling
              </a>
            </li>
            <li>
              <a href="#shipping" className="hover:text-[#FF6B35] transition-colors">
                5. Shipping Challenges
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
        <section id="manufacturing-types" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            1. Types of Furniture Manufacturing
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Furniture manufacturing spans a wide spectrum from artisan
              hand-crafted pieces to mass-produced flat-pack. Your position on
              this spectrum determines your factory type, pricing, and market
              positioning.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Manufacturing Models</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Model</th>
                  <th className="pb-3 font-semibold">Volume</th>
                  <th className="pb-3 font-semibold">Per-Unit Cost</th>
                  <th className="pb-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Artisan / Workshop</td>
                  <td className="py-3">1-50 pcs</td>
                  <td className="py-3">$$$</td>
                  <td className="py-3 text-[#6B6B6B]">High-end, custom, handcrafted</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Small Factory</td>
                  <td className="py-3">50-500 pcs</td>
                  <td className="py-3">$$</td>
                  <td className="py-3 text-[#6B6B6B]">Mid-range, mixed production</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Industrial Factory</td>
                  <td className="py-3">500-10,000+ pcs</td>
                  <td className="py-3">$</td>
                  <td className="py-3 text-[#6B6B6B]">Mass market, standardized</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">CNC / Automated</td>
                  <td className="py-3">100-5,000+ pcs</td>
                  <td className="py-3">$$</td>
                  <td className="py-3 text-[#6B6B6B]">Flat-pack, precision parts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              Most DTC furniture startups operate in the small factory to
              industrial factory range. The artisan model works for brands like
              custom woodworking studios selling $3,000+ tables, while the
              industrial model serves companies competing in the $200-$800 range
              against IKEA and Wayfair.
            </p>
            <p>
              CNC (Computer Numerical Control) manufacturing is increasingly
              popular for modern furniture brands. CNC routers can cut complex
              shapes from sheet goods (plywood, MDF) with extreme precision and
              repeatability. This enables flat-pack designs with interlocking
              joints that eliminate hardware — a significant cost and assembly
              advantage.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="materials" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            2. Materials
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Material choice is the single biggest driver of both cost and brand
              perception in furniture. A dining table can cost $40 in materials
              (particleboard + melamine) or $800 (solid walnut), with identical
              labor costs.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Wood &amp; Wood Products</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Material</th>
                  <th className="pb-3 font-semibold">Cost/Board Ft</th>
                  <th className="pb-3 font-semibold">Durability</th>
                  <th className="pb-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Solid oak</td>
                  <td className="py-3">$5 - $10</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Industry workhorse, stains well</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Solid walnut</td>
                  <td className="py-3">$8 - $16</td>
                  <td className="py-3">Excellent</td>
                  <td className="py-3 text-[#6B6B6B]">Premium, dark grain, trending</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Pine / poplar</td>
                  <td className="py-3">$2 - $5</td>
                  <td className="py-3">Moderate</td>
                  <td className="py-3 text-[#6B6B6B]">Soft, dents easily, budget option</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Birch plywood</td>
                  <td className="py-3">$2 - $4/sq ft</td>
                  <td className="py-3">Good</td>
                  <td className="py-3 text-[#6B6B6B]">Great for CNC, stable, modern look</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">MDF</td>
                  <td className="py-3">$0.50 - $1.50/sq ft</td>
                  <td className="py-3">Low-Moderate</td>
                  <td className="py-3 text-[#6B6B6B]">Paintable, smooth, swells with moisture</td>
                </tr>
                <tr>
                  <td className="py-3">Particleboard + laminate</td>
                  <td className="py-3">$0.30 - $1.00/sq ft</td>
                  <td className="py-3">Low</td>
                  <td className="py-3 text-[#6B6B6B]">Mass market, IKEA standard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Metal, Upholstery &amp; Composite</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Material</th>
                  <th className="pb-3 font-semibold">Cost Range</th>
                  <th className="pb-3 font-semibold">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Steel tube (powder coated)</td>
                  <td className="py-3">$5 - $25 per piece</td>
                  <td className="py-3 text-[#6B6B6B]">Chair frames, table legs, shelving</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Aluminum (anodized)</td>
                  <td className="py-3">$10 - $40 per piece</td>
                  <td className="py-3 text-[#6B6B6B]">Outdoor furniture, lightweight designs</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Foam (HR / memory)</td>
                  <td className="py-3">$3 - $15 per sq ft</td>
                  <td className="py-3 text-[#6B6B6B]">Cushions, mattresses, seating</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Fabric upholstery</td>
                  <td className="py-3">$5 - $40 per yard</td>
                  <td className="py-3 text-[#6B6B6B]">Sofas, chairs, headboards</td>
                </tr>
                <tr>
                  <td className="py-3">Leather (genuine)</td>
                  <td className="py-3">$8 - $30 per sq ft</td>
                  <td className="py-3 text-[#6B6B6B]">Premium seating, accessories</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Engineered materials (plywood, MDF with veneer) often outperform
              solid wood for stability. Solid wood expands and contracts with
              humidity changes, causing warping and cracking. A walnut veneer on
              birch plywood looks identical to solid walnut but is more
              dimensionally stable and 40-60% cheaper. Many premium furniture
              brands use this approach — including some selling $2,000+ pieces.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="flat-pack" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            3. Flat-Pack vs. Assembled
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              The flat-pack vs. assembled decision ripples through every part of
              your business — manufacturing, shipping, customer experience, and
              returns. IKEA proved that flat-pack can work at massive scale, and
              DTC brands like Floyd, Burrow, and Campaign have shown it can work
              at premium price points too.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Flat-Pack vs. Assembled Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Factor</th>
                  <th className="pb-3 font-semibold">Flat-Pack</th>
                  <th className="pb-3 font-semibold">Pre-Assembled</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Shipping cost</td>
                  <td className="py-3 text-[#6B6B6B]">60-80% less (UPS/FedEx parcel)</td>
                  <td className="py-3 text-[#6B6B6B]">Freight shipping ($100-$500+)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Damage rate</td>
                  <td className="py-3 text-[#6B6B6B]">2-5% (corners, edges)</td>
                  <td className="py-3 text-[#6B6B6B]">5-15% (structural damage)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Return cost</td>
                  <td className="py-3 text-[#6B6B6B]">$10-$30 (parcel return)</td>
                  <td className="py-3 text-[#6B6B6B]">$100-$400 (freight return)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Customer experience</td>
                  <td className="py-3 text-[#6B6B6B]">Assembly required (frustration risk)</td>
                  <td className="py-3 text-[#6B6B6B]">Unbox and enjoy (premium feel)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Warehouse density</td>
                  <td className="py-3 text-[#6B6B6B]">3-5x more units per pallet</td>
                  <td className="py-3 text-[#6B6B6B]">Bulky, expensive to store</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Factory labor</td>
                  <td className="py-3 text-[#6B6B6B]">Less (no final assembly)</td>
                  <td className="py-3 text-[#6B6B6B]">More (full assembly + QC)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">The hybrid approach</p>
            <p className="text-[#6B6B6B]">
              Many successful DTC furniture brands use a hybrid approach: ship
              major components flat-packed (tabletops, shelves, panels) and
              pre-assemble complex sub-assemblies (drawer boxes, upholstered
              seats). Burrow&apos;s modular sofa ships in multiple parcel boxes
              but each module requires just 5 minutes of tool-free assembly.
              This keeps shipping costs manageable while minimizing customer
              frustration.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="prototyping" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            4. Prototyping &amp; Sampling
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Furniture prototyping is more physical and iterative than most
              product categories. You can&apos;t fully evaluate a chair without
              sitting in it, or a table without testing its wobble under load.
              Plan for 2-4 prototype rounds before production.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Prototyping Stages &amp; Costs</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Stage 1: Concept Model — $200 - $1,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  A rough physical model to validate proportions and basic ergonomics.
                  Often made from cheap materials (pine, cardboard, foam) by a local
                  woodworker or your own shop. The goal is to answer: &quot;Does this
                  feel right at full scale?&quot; Many founders skip to CAD, but
                  there&apos;s no substitute for sitting in or touching the real thing.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Stage 2: Engineering Sample — $500 - $3,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Made from actual production materials with proper joinery. This
                  validates structural integrity — load test chairs to 300 lbs (use
                  BIFMA standards as a reference). Test drawer mechanisms, hinges,
                  and any moving parts. If you&apos;re working with a factory, they
                  typically charge $200-$800 for a sample plus $100-$500 in shipping.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Stage 3: Pre-Production Sample — $500 - $2,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Identical to the production piece: final materials, finish, hardware,
                  and packaging. Use this for product photography, customer testing, and
                  as your factory&apos;s quality reference (called a &quot;golden
                  sample&quot;). Sign off in writing with detailed photos and
                  measurements.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Stage 4: Packaging Test — $300 - $1,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Ship one fully packaged unit to yourself via the same carrier
                  your customers will receive it through. This reveals packaging
                  weaknesses — corner dents, scratched surfaces, loose hardware
                  bags — before you ship 500 units. Furniture has a 5-15% transit
                  damage rate if packaging is inadequate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              If manufacturing overseas, request 2-3 identical pre-production
              samples. Keep one as your golden reference, send one to a
              third-party testing lab, and use one for photography and marketing.
              Ordering extra samples later adds weeks of delay.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="shipping" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            5. Shipping Challenges
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Shipping is where furniture economics get brutal. A sofa that costs
              $200 to manufacture can cost $300-$600 to ship to a customer&apos;s
              door. Understanding shipping costs is essential to pricing and
              profitability — many furniture startups have failed because they
              underestimated logistics.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Shipping Cost Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Cost (Domestic US)</th>
                  <th className="pb-3 font-semibold">Transit Time</th>
                  <th className="pb-3 font-semibold">Product Type</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Parcel (UPS/FedEx)</td>
                  <td className="py-3">$15 - $80</td>
                  <td className="py-3">3-7 days</td>
                  <td className="py-3 text-[#6B6B6B]">Small items, flat-pack under 70 lbs</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Large parcel / oversize</td>
                  <td className="py-3">$50 - $200</td>
                  <td className="py-3">5-10 days</td>
                  <td className="py-3 text-[#6B6B6B]">Medium flat-pack, 70-150 lbs</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">LTL freight (curbside)</td>
                  <td className="py-3">$100 - $400</td>
                  <td className="py-3">7-14 days</td>
                  <td className="py-3 text-[#6B6B6B]">Assembled furniture, sofas, large items</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">White glove delivery</td>
                  <td className="py-3">$200 - $600</td>
                  <td className="py-3">7-21 days</td>
                  <td className="py-3 text-[#6B6B6B]">Premium: room of choice, assembly, packaging removal</td>
                </tr>
                <tr>
                  <td className="py-3">Ocean freight (factory to US)</td>
                  <td className="py-3">$3,000 - $8,000/container</td>
                  <td className="py-3">4-6 weeks</td>
                  <td className="py-3 text-[#6B6B6B]">Bulk import from overseas factories</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">The DIM weight trap</p>
            <p className="text-[#6B6B6B]">
              Parcel carriers charge by dimensional weight (DIM weight), not actual
              weight. DIM weight = (L x W x H) / 139 for UPS/FedEx. A lightweight
              but large box (like a disassembled bookshelf at 48&quot; x 24&quot; x 8&quot;)
              has a DIM weight of 66 lbs even if the actual product weighs 35 lbs.
              You&apos;ll be charged at 66 lbs. Design your flat-pack boxes to
              minimize volume, not just protect the product.
            </p>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For assembled furniture shipped via LTL freight, budget for a 5-15%
              damage/claim rate. Claims are time-consuming and often result in
              partial compensation. Investing in robust packaging (corner protectors,
              double-wall corrugated, foam inserts) adds $5-$20 per unit but can
              cut damage rates in half.
            </p>
            <p>
              Shipping from an overseas factory adds another layer. A 40-foot
              container holds roughly 60-80 sofas, 200-400 chairs, or 500-1,000
              flat-pack items. At $5,000 per container, that&apos;s $6-$83 per
              unit in ocean freight, plus customs duties (furniture duty rates
              are typically 0-5% for most categories), plus $500-$1,500 for
              customs brokerage and drayage.
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
              Furniture has a unique cost structure because materials and shipping
              are both major cost components. Unlike electronics or cosmetics where
              COGS is dominated by components or ingredients, furniture costs are
              spread more evenly across materials, labor, and logistics.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Cost Breakdown: Solid Wood Dining Table (200 units, manufactured in Vietnam)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Component</th>
                  <th className="pb-3 font-semibold">Cost/Unit</th>
                  <th className="pb-3 font-semibold">% of Total</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Wood (acacia, 15 board feet)</td>
                  <td className="py-3">$45.00</td>
                  <td className="py-3">22%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Metal legs (powder-coated steel)</td>
                  <td className="py-3">$18.00</td>
                  <td className="py-3">9%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Hardware (bolts, inserts, levelers)</td>
                  <td className="py-3">$4.00</td>
                  <td className="py-3">2%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Finish (stain + polyurethane)</td>
                  <td className="py-3">$6.00</td>
                  <td className="py-3">3%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Factory labor</td>
                  <td className="py-3">$35.00</td>
                  <td className="py-3">17%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Packaging (corrugated + foam + corner guards)</td>
                  <td className="py-3">$15.00</td>
                  <td className="py-3">7%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Ocean freight (allocated per unit)</td>
                  <td className="py-3">$35.00</td>
                  <td className="py-3">17%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Customs duty + brokerage</td>
                  <td className="py-3">$8.00</td>
                  <td className="py-3">4%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">US warehousing (1 month)</td>
                  <td className="py-3">$12.00</td>
                  <td className="py-3">6%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Last-mile delivery (LTL avg)</td>
                  <td className="py-3">$25.00</td>
                  <td className="py-3">12%</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total Landed + Delivered Cost</td>
                  <td className="py-3 font-semibold">$203.00</td>
                  <td className="py-3 font-semibold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Pricing rule of thumb</p>
            <p className="text-[#6B6B6B]">
              DTC furniture brands typically price at 2.5-4x their total landed
              and delivered cost. A $203 all-in cost table should retail for
              $500-$800. At $599, your gross margin is about 66% — healthy for a
              DTC brand that needs to cover marketing (typically 20-30% of
              revenue), returns (5-10%), and operations. If you sell through
              retailers, wholesale at 1.5-2x cost and let them mark up 2x.
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
              Furniture manufacturing has shifted dramatically over the past two
              decades. China dominated for years, but rising costs and tariffs
              have pushed production to Southeast Asia, Mexico, and Eastern Europe.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Country Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Strengths</th>
                  <th className="pb-3 font-semibold">Typical MOQ</th>
                  <th className="pb-3 font-semibold">Cost Level</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">China</td>
                  <td className="py-3 text-[#6B6B6B]">Versatile, metal furniture, upholstery, fast</td>
                  <td className="py-3">100-300 pcs</td>
                  <td className="py-3">$$ (+ 25% tariff)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Vietnam</td>
                  <td className="py-3 text-[#6B6B6B]">Wood furniture leader, lower tariffs, growing fast</td>
                  <td className="py-3">200-500 pcs</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">India</td>
                  <td className="py-3 text-[#6B6B6B]">Hand-crafted, rattan, carved wood, artisan</td>
                  <td className="py-3">50-200 pcs</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Mexico</td>
                  <td className="py-3 text-[#6B6B6B]">Nearshoring, no tariff (USMCA), fast delivery</td>
                  <td className="py-3">100-500 pcs</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Poland</td>
                  <td className="py-3 text-[#6B6B6B]">EU&apos;s furniture hub, upholstery, quality</td>
                  <td className="py-3">100-300 pcs</td>
                  <td className="py-3">$$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              <strong className="text-[#1A1A1A]">Vietnam</strong> has become the
              world&apos;s second-largest furniture exporter, surpassing Italy.
              Vietnamese factories excel at wood furniture — tables, chairs,
              shelving, bedroom sets — using locally sourced acacia, rubberwood,
              and imported hardwoods. The 25% Section 301 tariff on Chinese
              furniture has accelerated this shift. Vietnam furniture faces
              0-3.5% duty rates.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">Mexico</strong> is the top
              nearshoring choice for US-market furniture. Transit times are 1-2
              weeks (vs. 6-8 weeks from Asia), there are no tariffs under USMCA,
              and you can visit factories with a short flight. Mexico excels at
              metal furniture, upholstery, and mixed-material designs. Many
              premium DTC brands like Article source from Mexico and Vietnam.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">Poland</strong> produces 2% of
              the world&apos;s furniture and is Europe&apos;s largest furniture
              exporter. Polish factories are known for upholstered furniture
              (sofas, armchairs) and modern flat-pack designs. If you&apos;re
              targeting the EU market, Poland offers a strong combination of
              quality, cost, and logistics.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="mistakes" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            8. Common Mistakes &amp; Tips
          </h2>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Top mistakes furniture founders make</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Underestimating shipping costs.</strong>{" "}
                Founders budget $50 for shipping a sofa and discover the real cost is
                $250-$500. Model your full delivered cost (factory to customer door)
                before setting prices. Shipping can be 15-30% of your retail price.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Ignoring packaging engineering.</strong>{" "}
                Furniture gets damaged in transit. Period. If your packaging isn&apos;t
                engineered for the specific carrier and handling it will experience,
                you&apos;ll eat 10-15% in damage claims and replacements. Invest in
                a proper packaging design ($500-$2,000) and drop-test it.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Not testing assembly instructions.</strong>{" "}
                For flat-pack products, give your assembly instructions to 5 people
                who&apos;ve never seen the product. If any of them can&apos;t assemble
                it in under 30 minutes without calling you, your instructions need
                work. Bad assembly experiences drive 1-star reviews.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Choosing wood without understanding moisture content.</strong>{" "}
                Wood that arrives at 12% moisture content from a tropical factory
                will shrink and crack in a heated US home at 6-8% MC. Specify
                kiln-dried wood at 6-8% MC for North American and European markets.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Offering too many finishes.</strong>{" "}
                Each finish option (stain color, fabric, leather) multiplies your
                SKUs and inventory. Start with 2-3 finish options and expand
                based on demand. &quot;Natural oak&quot; and &quot;walnut stain&quot;
                cover 70%+ of customer preferences.
              </li>
            </ul>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Pro tips for furniture founders</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Design for the shipping box first.</strong>{" "}
                Your product dimensions should work within standard parcel or LTL
                size limits. A table that&apos;s 1 inch too long for parcel shipping
                jumps to LTL freight, adding $100+ per order.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Use FSC-certified wood.</strong>{" "}
                Forest Stewardship Council certification is increasingly expected by
                consumers and required by some retailers. It adds $0.50-$2 per board
                foot but opens up major retail channels and builds brand trust.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Order a container sample.</strong>{" "}
                Before your first full production order, have the factory pack and
                ship a small test container (LCL — less than container load). This
                reveals how products survive the 4-6 week ocean journey including
                temperature swings and humidity in the container.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Include spare hardware in every box.</strong>{" "}
                Extra bolts, Allen keys, and spare leveler feet cost $0.50-$1.00
                per unit and prevent the most common customer support tickets.
                Nothing kills a $600 furniture purchase like a missing bolt.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-10 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your furniture product?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a complete manufacturing feasibility report with cost breakdowns,
            factory recommendations, and shipping logistics analysis — delivered
            in minutes, not weeks.
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