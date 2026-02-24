import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Electronics Manufacturing Guide for Founders — Bottlecap",
  description:
    "The complete guide to manufacturing electronic products. PCB assembly, enclosures, certifications, cost breakdowns, and top manufacturing countries for hardware startups.",
}

export default function ElectronicsManufacturingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Electronics Manufacturing</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Electronics Manufacturing Guide for Founders
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Building a hardware product is one of the most complex things a
            founder can take on. From PCB layout to FCC certification, every
            step involves trade-offs between cost, quality, and time. This guide
            covers the entire journey from prototype to mass production — with
            real cost data and practical advice from the trenches.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <ol className="space-y-2 text-[#6B6B6B]">
            <li>
              <a href="#pcb-design" className="hover:text-[#FF6B35] transition-colors">
                1. PCB Design &amp; Assembly
              </a>
            </li>
            <li>
              <a href="#component-sourcing" className="hover:text-[#FF6B35] transition-colors">
                2. Component Sourcing &amp; BOM Management
              </a>
            </li>
            <li>
              <a href="#enclosure-design" className="hover:text-[#FF6B35] transition-colors">
                3. Enclosure Design
              </a>
            </li>
            <li>
              <a href="#prototyping" className="hover:text-[#FF6B35] transition-colors">
                4. Prototyping Process (EVT / DVT / PVT)
              </a>
            </li>
            <li>
              <a href="#cost-breakdown" className="hover:text-[#FF6B35] transition-colors">
                5. Cost Breakdown
              </a>
            </li>
            <li>
              <a href="#certifications" className="hover:text-[#FF6B35] transition-colors">
                6. Certifications (FCC, CE, UL)
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
        <section id="pcb-design" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            1. PCB Design &amp; Assembly
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              The printed circuit board is the heart of any electronic product. Your
              PCB design determines manufacturing cost, reliability, and how easily
              you can iterate. Most founders use KiCad (free) or Altium Designer
              ($2,000-$7,000/year) for schematic capture and layout.
            </p>
            <p>
              For assembly, you have two main options: surface mount technology (SMT)
              and through-hole. SMT dominates modern electronics — it&apos;s faster,
              cheaper at scale, and allows smaller form factors. Through-hole is used
              for components that need mechanical strength (connectors, large capacitors).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">PCB Assembly Cost Ranges</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Stage</th>
                  <th className="pb-3 font-semibold">Quantity</th>
                  <th className="pb-3 font-semibold">Cost per Board</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Prototype (bare PCB)</td>
                  <td className="py-3">5-10 pcs</td>
                  <td className="py-3">$2 - $15 each</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Prototype (assembled)</td>
                  <td className="py-3">5-20 pcs</td>
                  <td className="py-3">$50 - $300 each</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Pilot run</td>
                  <td className="py-3">100-500 pcs</td>
                  <td className="py-3">$10 - $80 each</td>
                </tr>
                <tr>
                  <td className="py-3">Mass production</td>
                  <td className="py-3">1,000+ pcs</td>
                  <td className="py-3">$3 - $40 each</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Use JLCPCB or PCBWay for prototypes — you can get 5 bare PCBs for
              under $5 with 5-7 day delivery. For assembled prototypes, their SMT
              service starts at $8 per board plus component cost, with a $30 setup fee.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="component-sourcing" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            2. Component Sourcing &amp; BOM Management
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Your Bill of Materials (BOM) is the master list of every component in
              your product. Managing it well is the difference between a smooth
              production run and costly delays. A typical IoT device BOM has 80-200
              unique line items.
            </p>
            <p>
              Source components from authorized distributors (DigiKey, Mouser, Arrow)
              for prototyping. For production, your CM (contract manufacturer) will
              typically handle procurement, but you should always specify approved
              alternates for critical components to avoid single-source risk.
            </p>
            <p>
              The global chip shortage of 2021-2023 taught a hard lesson: lead times
              for common microcontrollers went from 12 weeks to 52+ weeks. Always
              design with at least two footprint-compatible MCU options, and keep a
              buffer stock of long-lead-time parts.
            </p>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              Never buy components from unauthorized brokers (Alibaba, eBay) for
              production. Counterfeit components are rampant — fake ICs can pass
              visual inspection but fail under load. One bad batch of counterfeit
              capacitors can fry your entire production run.
            </p>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              BOM cost typically represents 40-60% of your total COGS. Track it
              obsessively. Even saving $0.05 per component across 50 parts saves
              $2.50/unit — which at 10,000 units is $25,000 back in your pocket.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="enclosure-design" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            3. Enclosure Design
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Your enclosure is what customers see and touch. It protects the
              electronics, defines the product&apos;s look and feel, and often
              represents the single largest NRE (non-recurring engineering) cost
              in your project.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Enclosure Manufacturing Methods</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Tooling Cost</th>
                  <th className="pb-3 font-semibold">Per-Unit Cost</th>
                  <th className="pb-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">3D Printing (FDM)</td>
                  <td className="py-3">$0</td>
                  <td className="py-3">$5 - $50</td>
                  <td className="py-3">Prototypes (1-50 pcs)</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">3D Printing (SLA/SLS)</td>
                  <td className="py-3">$0</td>
                  <td className="py-3">$15 - $150</td>
                  <td className="py-3">High-detail prototypes</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">CNC Machining</td>
                  <td className="py-3">$0 - $500</td>
                  <td className="py-3">$30 - $300</td>
                  <td className="py-3">Metal parts, 10-500 pcs</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Injection Molding</td>
                  <td className="py-3">$3,000 - $100,000</td>
                  <td className="py-3">$0.50 - $5</td>
                  <td className="py-3">Plastic parts, 1,000+ pcs</td>
                </tr>
                <tr>
                  <td className="py-3">Die Casting</td>
                  <td className="py-3">$5,000 - $75,000</td>
                  <td className="py-3">$2 - $15</td>
                  <td className="py-3">Metal parts, 5,000+ pcs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For most consumer electronics startups, injection molding is the path
              to production. A simple two-part enclosure (top + bottom shell) with a
              single-cavity steel mold costs $3,000-$8,000 in China. Multi-cavity
              molds for high-volume production run $15,000-$100,000. Aluminum soft
              tooling (for runs under 5,000 units) costs $1,500-$4,000 and is a
              popular bridge option.
            </p>
            <p>
              Design for Manufacturing (DFM) review with your mold maker is
              non-negotiable. Wall thickness should be uniform (1.5-3mm for ABS),
              draft angles need to be at least 1-2 degrees, and bosses/ribs should
              be 60-80% of the adjacent wall thickness to avoid sink marks.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="prototyping" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            4. Prototyping Process (EVT / DVT / PVT)
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Hardware development follows a structured validation process. Skipping
              stages is the number one cause of costly recalls and delays. Budget
              3-6 months and $15,000-$80,000 for the full EVT-DVT-PVT cycle,
              depending on product complexity.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Validation Stages</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">EVT — Engineering Validation Test</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Does the product work? Build 20-50 units using prototype PCBs and
                  3D-printed enclosures. Test all core functions, power consumption,
                  thermal performance, and wireless range. Expect a 60-80% yield at
                  this stage. Timeline: 4-8 weeks. Cost: $5,000-$25,000.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">DVT — Design Validation Test</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Does it survive real-world conditions? Build 50-200 units with
                  production-intent tooling (soft molds). Run drop tests, temperature
                  cycling (-20C to 60C), humidity tests, and ESD testing. Submit for
                  pre-compliance certification testing. Timeline: 6-10 weeks. Cost: $10,000-$40,000.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">PVT — Production Validation Test</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Can it be manufactured consistently? Build 200-500 units on the
                  actual production line. Validate yield rates (target 95%+), cycle
                  times, and quality processes. This is your dress rehearsal. Timeline:
                  4-6 weeks. Cost: $5,000-$20,000 (plus unit costs).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Many founders try to skip DVT to save time. This almost always backfires.
              A product that passes EVT but fails environmental testing will require
              board respins, new tooling, and 2-4 months of delays. The $15,000 you
              &quot;saved&quot; by skipping DVT turns into $50,000+ in fixes.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="cost-breakdown" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            5. Cost Breakdown
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Electronics manufacturing costs split into two categories: NRE
              (non-recurring engineering) costs that you pay once, and COGS
              (cost of goods sold) that you pay per unit. Understanding both is
              critical for pricing and fundraising.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Typical NRE Costs (One-Time)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Item</th>
                  <th className="pb-3 font-semibold">Cost Range</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Industrial design</td>
                  <td className="py-3">$5,000 - $50,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Electrical engineering (schematic + layout)</td>
                  <td className="py-3">$5,000 - $30,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Firmware development</td>
                  <td className="py-3">$10,000 - $60,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Injection mold tooling</td>
                  <td className="py-3">$3,000 - $100,000</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Certifications (FCC + CE + UL)</td>
                  <td className="py-3">$10,000 - $50,000</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total NRE (typical)</td>
                  <td className="py-3 font-semibold">$40,000 - $250,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Typical Per-Unit COGS (at 1,000 units)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Component</th>
                  <th className="pb-3 font-semibold">% of COGS</th>
                  <th className="pb-3 font-semibold">Example (Smart Home Device)</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">PCB + assembly</td>
                  <td className="py-3">15-25%</td>
                  <td className="py-3">$4.50</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Electronic components (BOM)</td>
                  <td className="py-3">30-50%</td>
                  <td className="py-3">$8.00</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Enclosure + mechanical</td>
                  <td className="py-3">10-20%</td>
                  <td className="py-3">$3.00</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Assembly labor</td>
                  <td className="py-3">5-15%</td>
                  <td className="py-3">$2.00</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Packaging</td>
                  <td className="py-3">5-10%</td>
                  <td className="py-3">$1.50</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total COGS</td>
                  <td className="py-3 font-semibold">100%</td>
                  <td className="py-3 font-semibold">$19.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Rule of thumb</p>
            <p className="text-[#6B6B6B]">
              Your retail price should be 4-5x your COGS to cover marketing,
              shipping, returns, support, and profit. A $19 COGS product should
              retail for $79-$99. If your COGS is too high for your target price,
              redesign before tooling — not after.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="certifications" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            6. Certifications (FCC, CE, UL)
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Selling electronic products in the US and EU requires mandatory
              certifications. Selling without them is illegal and can result in
              customs seizures, fines, and forced recalls. Budget 8-16 weeks and
              plan certification testing during or immediately after DVT.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Key Certifications</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">FCC (USA) — $5,000 - $15,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Required for all electronic devices sold in the US. Part 15 covers
                  unintentional radiators (anything with a clock signal). If your
                  device has WiFi, Bluetooth, or cellular, you also need intentional
                  radiator testing, which adds $3,000-$8,000. Timeline: 4-8 weeks.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">CE Marking (EU) — $5,000 - $20,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Required for the European market. Covers EMC (electromagnetic
                  compatibility), LVD (low voltage directive for products over 50V AC
                  or 75V DC), RED (radio equipment directive for wireless devices),
                  and RoHS (restriction of hazardous substances). Most test labs can
                  run FCC and CE testing in parallel.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">UL / ETL (Safety) — $8,000 - $30,000</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Not legally required in all cases, but practically mandatory if you
                  want to sell through major retailers or if your product plugs into
                  mains power. Amazon requires UL certification for many categories.
                  Timeline: 8-16 weeks. UL listing also requires ongoing factory audits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Run a pre-compliance scan ($500-$1,500) at an EMC lab before submitting
              for formal testing. This catches ~90% of issues and saves you from
              failing the $10,000+ formal test. Most failures are due to insufficient
              ground planes, missing ferrite beads, or poor cable shielding.
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
              Where you manufacture depends on your product complexity, volume,
              budget, and IP sensitivity. Here&apos;s how the major electronics
              manufacturing hubs compare.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Country Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Strengths</th>
                  <th className="pb-3 font-semibold">MOQ</th>
                  <th className="pb-3 font-semibold">Cost Level</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Shenzhen, China</td>
                  <td className="py-3 text-[#6B6B6B]">Deepest supply chain, fastest iteration, lowest MOQs</td>
                  <td className="py-3">100+</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Taiwan</td>
                  <td className="py-3 text-[#6B6B6B]">High-precision, semiconductors, better IP protection</td>
                  <td className="py-3">500+</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Mexico</td>
                  <td className="py-3 text-[#6B6B6B]">Nearshoring, USMCA tariff benefits, same timezone</td>
                  <td className="py-3">1,000+</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Vietnam</td>
                  <td className="py-3 text-[#6B6B6B]">Lower labor costs than China, growing ecosystem</td>
                  <td className="py-3">1,000+</td>
                  <td className="py-3">$</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">USA</td>
                  <td className="py-3 text-[#6B6B6B]">IP protection, &quot;Made in USA&quot; label, fast shipping</td>
                  <td className="py-3">100+</td>
                  <td className="py-3">$$$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For most hardware startups doing their first production run of
              500-5,000 units, Shenzhen remains the default choice. The component
              supply chain within the Huaqiangbei ecosystem is unmatched — your CM
              can source most components locally within 24 hours. Shenzhen CMs are
              also the most experienced with low-MOQ runs and rapid iteration.
            </p>
            <p>
              Taiwan is excellent for precision electronics, medical devices, and
              semiconductor-adjacent products. Mexico is increasingly popular for
              companies selling primarily to the US market that want to avoid China
              tariffs (currently 25% on most electronics under Section 301).
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="mistakes" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            8. Common Mistakes &amp; Tips
          </h2>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Top mistakes hardware founders make</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Skipping DFM review.</strong>{" "}
                Designing a beautiful enclosure that can&apos;t be injection-molded
                without $50,000 in tooling changes. Always get DFM feedback before
                finalizing your CAD.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Underestimating certification costs.</strong>{" "}
                FCC + CE + UL can easily cost $25,000-$50,000 and take 3-4 months.
                Budget for it from day one.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Single-source components.</strong>{" "}
                Using a chip that only one vendor makes. When it goes end-of-life or
                out of stock, your entire product line stops.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">No test fixtures.</strong>{" "}
                Manufacturing without a functional test jig means relying on manual
                QC. At 1,000+ units, you need automated testing. Budget $2,000-$10,000
                for a custom test fixture.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Starting with injection molds too early.</strong>{" "}
                Committing to $10,000+ in steel tooling before your design is
                validated. Use 3D printing or CNC until you&apos;re confident in the
                design, then cut steel.
              </li>
            </ul>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Pro tips from experienced hardware founders</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Visit your factory.</strong>{" "}
                A one-week trip to Shenzhen ($2,000-$3,000 all-in) will save you
                months of back-and-forth. See the line, meet the engineers, and catch
                problems early.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Get a golden sample.</strong>{" "}
                Before mass production, get one perfect unit signed off by both you
                and the factory. This is your quality reference standard.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Build firmware update capability from day one.</strong>{" "}
                OTA updates will save you from costly hardware recalls. Every
                connected device should have a bootloader and secure update mechanism.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Budget 20% contingency.</strong>{" "}
                Hardware always costs more than you think. Tooling modifications,
                certification re-tests, and component substitutions add up fast.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-10 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your electronics product?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a complete manufacturing feasibility report with cost breakdowns,
            supplier recommendations, and certification roadmap — delivered in
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