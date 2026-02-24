import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cosmetics Manufacturing Guide for Founders — Bottlecap",
  description:
    "The complete guide to manufacturing beauty and personal care products. Formulation, FDA compliance, packaging, cost breakdowns, and top manufacturing countries for cosmetics startups.",
}

export default function CosmeticsManufacturingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Cosmetics Manufacturing</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Cosmetics Manufacturing Guide for Founders
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            The beauty industry generates over $570 billion annually, and barriers
            to entry have never been lower. But &quot;lower&quot; doesn&apos;t
            mean &quot;low.&quot; Between FDA regulations, stability testing, and
            packaging complexities, cosmetics manufacturing has unique challenges
            that trip up even experienced product founders. This guide gives you
            the practical roadmap.
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
                1. Types of Cosmetics Manufacturing
              </a>
            </li>
            <li>
              <a href="#formulation" className="hover:text-[#FF6B35] transition-colors">
                2. Formulation Development
              </a>
            </li>
            <li>
              <a href="#regulatory" className="hover:text-[#FF6B35] transition-colors">
                3. FDA &amp; Regulatory Compliance
              </a>
            </li>
            <li>
              <a href="#packaging" className="hover:text-[#FF6B35] transition-colors">
                4. Packaging Options
              </a>
            </li>
            <li>
              <a href="#production" className="hover:text-[#FF6B35] transition-colors">
                5. Production Process
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
            1. Types of Cosmetics Manufacturing
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              How you manufacture determines your differentiation, margins, and
              speed to market. The three main models serve very different brand
              strategies.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Manufacturing Models</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Model</th>
                  <th className="pb-3 font-semibold">What You Get</th>
                  <th className="pb-3 font-semibold">MOQ</th>
                  <th className="pb-3 font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Private Label</td>
                  <td className="py-3 text-[#6B6B6B]">Pre-made formulas with your branding</td>
                  <td className="py-3">100-500 units</td>
                  <td className="py-3">4-8 weeks</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Contract Manufacturing</td>
                  <td className="py-3 text-[#6B6B6B]">Custom formulas made to your spec</td>
                  <td className="py-3">500-2,500 units</td>
                  <td className="py-3">12-20 weeks</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">In-House Manufacturing</td>
                  <td className="py-3 text-[#6B6B6B]">Full control, your own facility</td>
                  <td className="py-3">No minimum</td>
                  <td className="py-3">6-12 months setup</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              <strong className="text-[#1A1A1A]">Private label</strong> is the
              fastest path to market. Companies like TrendMood Labs, Cosmetic
              Solutions, and Lady Burd offer catalogs of hundreds of pre-formulated
              products. You choose a formula, pick packaging, add your labels, and
              you&apos;re selling in 4-8 weeks. The downside: your product is
              identical to dozens of other brands using the same formula.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">Contract manufacturing</strong>{" "}
              gives you a unique product. You work with the lab to develop a custom
              formula, then they scale it for production. This is where most
              serious indie brands operate. MOQs are higher (typically 2,500-5,000
              units per SKU) but you own a differentiated product.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">In-house manufacturing</strong>{" "}
              makes sense only at significant scale (typically $2M+ annual revenue)
              or for very simple products (candles, bath bombs, lip balms). Facility
              setup costs $50,000-$500,000 depending on product complexity and
              regulatory requirements.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="formulation" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            2. Formulation Development
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Formulation is the science of creating your product. Whether it&apos;s
              a serum, lipstick, or sunscreen, the formula determines performance,
              safety, stability, and cost. Most founders work with a contract
              manufacturer&apos;s in-house chemist or hire an independent cosmetic
              chemist.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Formulation Development Costs</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Stage</th>
                  <th className="pb-3 font-semibold">Cost</th>
                  <th className="pb-3 font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Initial formula development (3-5 iterations)</td>
                  <td className="py-3">$1,500 - $10,000</td>
                  <td className="py-3">4-8 weeks</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Stability testing (accelerated)</td>
                  <td className="py-3">$500 - $3,000 per SKU</td>
                  <td className="py-3">8-12 weeks</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Compatibility testing (formula + packaging)</td>
                  <td className="py-3">$500 - $2,000 per SKU</td>
                  <td className="py-3">8-12 weeks</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Preservative efficacy testing (PET)</td>
                  <td className="py-3">$800 - $2,500 per SKU</td>
                  <td className="py-3">4-6 weeks</td>
                </tr>
                <tr>
                  <td className="py-3">Microbial testing</td>
                  <td className="py-3">$200 - $800 per SKU</td>
                  <td className="py-3">1-2 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              Many contract manufacturers will waive or reduce formulation fees if
              you commit to a production order. But &quot;free&quot; formulation
              comes with a catch — they typically own the formula. If you ever want
              to switch manufacturers, you&apos;ll need to start formulation from
              scratch. Always negotiate formula ownership in writing before
              development begins.
            </p>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              Stability testing is non-negotiable. It subjects your product to
              accelerated aging conditions (40C/75% humidity for 12 weeks) to
              predict how it will perform over its shelf life. Skipping this step
              risks products that separate, change color, or grow bacteria after
              a few months on the shelf — a lawsuit and brand-killer waiting
              to happen.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="regulatory" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            3. FDA &amp; Regulatory Compliance
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              In the US, cosmetics are regulated by the FDA under the Federal Food,
              Drug, and Cosmetic Act (FD&C Act) and the Modernization of Cosmetics
              Regulation Act (MoCRA) of 2022. Understanding what&apos;s required
              versus what&apos;s optional can save you thousands of dollars and
              keep you out of legal trouble.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Key Regulatory Requirements (US Market)</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">FDA Facility Registration (Required)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Under MoCRA, all facilities manufacturing cosmetics for the US
                  market must register with the FDA. This is free and done online.
                  Your contract manufacturer should already be registered — verify it.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Product Listing (Required)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Every cosmetic product sold in the US must be listed with the FDA,
                  including the product category, ingredient list, and responsible
                  person. This is also free and done online.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Ingredient Labeling (Required)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  All ingredients must be listed in INCI (International Nomenclature
                  of Cosmetic Ingredients) format, in descending order of
                  concentration. Ingredients at 1% or less can be listed in any order
                  after the 1% threshold.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Good Manufacturing Practices (Required under MoCRA)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Facilities must follow cGMP (current Good Manufacturing Practices).
                  This includes documented procedures, lot tracking, sanitation
                  protocols, and adverse event reporting. Ensure your contract
                  manufacturer is cGMP compliant.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">SPF / Sunscreen Claims (FDA Drug Status)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  If your product claims sun protection (SPF), it is regulated as an
                  OTC drug, not a cosmetic. This requires an OTC drug monograph
                  compliance, drug establishment registration, and NDC (National Drug
                  Code) labeling. Budget an extra $10,000-$50,000 and 6-12 months.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              If you plan to sell in the EU, you&apos;ll also need to comply with
              the EU Cosmetics Regulation (EC 1223/2009), which is stricter than US
              rules. The EU bans over 1,600 ingredients that are allowed in the US.
              Hire a regulatory consultant ($1,500-$5,000 per product) to create
              your Product Information File (PIF) and ensure compliance.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="packaging" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            4. Packaging Options
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Packaging in cosmetics serves two functions: protecting the product
              (primary packaging) and marketing it (secondary packaging). Packaging
              decisions directly affect your perceived brand value, shelf stability,
              and cost structure. It&apos;s common for packaging to cost more than
              the formula itself.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Primary Packaging Costs</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Packaging Type</th>
                  <th className="pb-3 font-semibold">Cost/Unit (1,000 pcs)</th>
                  <th className="pb-3 font-semibold">MOQ</th>
                  <th className="pb-3 font-semibold">Common Products</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Glass dropper bottle (30ml)</td>
                  <td className="py-3">$0.80 - $2.50</td>
                  <td className="py-3">500-5,000</td>
                  <td className="py-3 text-[#6B6B6B]">Serums, oils</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Airless pump bottle (30-50ml)</td>
                  <td className="py-3">$1.00 - $3.50</td>
                  <td className="py-3">1,000-5,000</td>
                  <td className="py-3 text-[#6B6B6B]">Moisturizers, serums</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Tube (squeeze, 50-100ml)</td>
                  <td className="py-3">$0.30 - $1.00</td>
                  <td className="py-3">3,000-10,000</td>
                  <td className="py-3 text-[#6B6B6B]">Cleanser, sunscreen</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Jar (glass or acrylic, 50ml)</td>
                  <td className="py-3">$0.60 - $3.00</td>
                  <td className="py-3">500-5,000</td>
                  <td className="py-3 text-[#6B6B6B]">Creams, masks</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Lipstick tube (custom mold)</td>
                  <td className="py-3">$1.50 - $5.00</td>
                  <td className="py-3">5,000-10,000</td>
                  <td className="py-3 text-[#6B6B6B]">Lip products</td>
                </tr>
                <tr>
                  <td className="py-3">Compact (with mirror)</td>
                  <td className="py-3">$2.00 - $8.00</td>
                  <td className="py-3">3,000-10,000</td>
                  <td className="py-3 text-[#6B6B6B]">Powder, blush, foundation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              Secondary packaging (boxes, inserts, tissue paper) adds $0.50-$3.00
              per unit depending on complexity. A rigid gift box with embossing and
              spot UV can cost $3-$8, while a simple folding carton is $0.30-$1.00.
            </p>
            <p>
              For your first run, source stock packaging (pre-made components in
              standard shapes) rather than custom molds. Custom packaging molds cost
              $3,000-$20,000 and require 5,000-10,000 unit minimums. Stock packaging
              is available from suppliers like SKS Bottle, Berlin Packaging, and
              APC Packaging with MOQs as low as 100-500 units.
            </p>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Always run compatibility testing between your formula and packaging.
              Certain ingredients (essential oils, retinol, vitamin C) can react
              with plastics, causing discoloration, warping, or degradation. This
              is why premium serums almost always use glass — it&apos;s chemically
              inert.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="production" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            5. Production Process
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              A full cosmetics production cycle from formula finalization to
              delivered goods takes 16-24 weeks for a custom formulation, or
              6-10 weeks for private label. Here&apos;s the typical timeline
              for contract manufacturing.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Production Timeline (Contract Manufacturing)</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 1-8: Formulation &amp; Testing</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Formula development (3-5 iterations), stability testing initiation,
                  and preservative efficacy testing. You&apos;ll receive lab samples
                  for evaluation. This runs in parallel with packaging sourcing.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 4-10: Packaging Sourcing</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Order primary and secondary packaging. Stock packaging ships in
                  2-4 weeks; custom packaging takes 8-12 weeks. Start packaging
                  sourcing as soon as you finalize your formula direction — don&apos;t
                  wait for final stability results.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 10-12: Pre-Production</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Raw material procurement, batch planning, and final artwork approval
                  for labels and packaging. Your contract manufacturer orders
                  ingredients based on the production batch size.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 12-16: Batching &amp; Filling</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Mixing, filling, capping, labeling, and quality inspection. A
                  2,500-unit run typically takes 2-5 production days. Each batch
                  gets a unique lot number and undergoes microbial testing before
                  release. Final QC checks 3-5% of units.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 16-18: QC &amp; Shipping</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Final quality inspection, packing into shipper cartons, and
                  freight coordination. Domestic shipping takes 3-7 days; international
                  ocean freight takes 4-6 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="cost-breakdown" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            6. Cost Breakdown
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Cosmetics have some of the highest margins in consumer products — but
              only if you understand your cost structure. The formula itself is often
              the smallest cost component; packaging and labor dominate.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Cost Breakdown: Face Serum (30ml, 2,500 units)</h3>
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
                  <td className="py-3">Formula (raw ingredients)</td>
                  <td className="py-3">$1.20</td>
                  <td className="py-3">14%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Primary packaging (glass dropper bottle)</td>
                  <td className="py-3">$1.80</td>
                  <td className="py-3">21%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Secondary packaging (folding carton)</td>
                  <td className="py-3">$0.75</td>
                  <td className="py-3">9%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Labels &amp; printing</td>
                  <td className="py-3">$0.40</td>
                  <td className="py-3">5%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Filling &amp; labor</td>
                  <td className="py-3">$1.50</td>
                  <td className="py-3">18%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Testing (stability, micro, allocated)</td>
                  <td className="py-3">$0.80</td>
                  <td className="py-3">9%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Freight &amp; duties</td>
                  <td className="py-3">$1.00</td>
                  <td className="py-3">12%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Shrink wrap / tamper seal</td>
                  <td className="py-3">$0.15</td>
                  <td className="py-3">2%</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total Landed Cost</td>
                  <td className="py-3 font-semibold">$7.60</td>
                  <td className="py-3 font-semibold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Pricing rule of thumb</p>
            <p className="text-[#6B6B6B]">
              Premium skincare brands price at 8-12x COGS for DTC. A $7.60 cost
              serum can retail for $58-$85. Mass-market brands target 5-6x. If
              you&apos;re selling through retailers, your wholesale price should
              be 4-5x COGS, and the retailer marks up another 2-2.5x. At $7.60
              cost, wholesale to Sephora at $32-$38, retail at $65-$85.
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
              The cosmetics industry has strong manufacturing clusters in several
              countries, each with distinct advantages depending on your product
              type, brand positioning, and volume needs.
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
                  <td className="py-3 font-medium">China (Guangzhou)</td>
                  <td className="py-3 text-[#6B6B6B]">Lowest cost, huge capacity, fast iteration</td>
                  <td className="py-3">1,000-3,000</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">South Korea</td>
                  <td className="py-3 text-[#6B6B6B]">Innovation leader, K-beauty expertise, sheet masks</td>
                  <td className="py-3">2,000-5,000</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Italy</td>
                  <td className="py-3 text-[#6B6B6B]">Premium color cosmetics, fragrance, &quot;Made in Italy&quot;</td>
                  <td className="py-3">5,000-10,000</td>
                  <td className="py-3">$$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">USA</td>
                  <td className="py-3 text-[#6B6B6B]">FDA compliance, &quot;Made in USA,&quot; low MOQs</td>
                  <td className="py-3">500-2,500</td>
                  <td className="py-3">$$$</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Canada</td>
                  <td className="py-3 text-[#6B6B6B]">Clean beauty focus, natural ingredients, low MOQs</td>
                  <td className="py-3">500-2,000</td>
                  <td className="py-3">$$$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              <strong className="text-[#1A1A1A]">Guangzhou, China</strong> is
              the cosmetics manufacturing capital of Asia. The Baiyun district
              alone has over 2,000 cosmetics factories. Cost advantages are
              significant — the same serum that costs $7-$8 landed from a US
              manufacturer may cost $3-$4 from Guangzhou. However, quality
              varies enormously, and FDA compliance is not guaranteed.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">South Korea</strong> dominates
              innovation — sheet masks, cushion compacts, and snail mucin all
              originated there. Korean contract manufacturers excel at novel
              textures, delivery systems, and trending ingredients. Many US
              indie brands quietly manufacture in Korea.
            </p>
            <p>
              <strong className="text-[#1A1A1A]">For first-time founders,</strong>{" "}
              a US-based contract manufacturer is often the safest choice despite
              higher costs. You avoid import logistics, can visit the facility
              easily, and FDA compliance is built in. Companies like Cosmetic
              Solutions (Florida), Dynamic Blending (Utah), and Bioland (California)
              work with startups.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="mistakes" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            8. Common Mistakes &amp; Tips
          </h2>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Top mistakes cosmetics founders make</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Launching with too many SKUs.</strong>{" "}
                Starting with a 12-product line requires $100,000+ in inventory and
                splits your marketing spend across too many products. Start with 1-3
                hero products and expand based on customer demand.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Skipping stability testing.</strong>{" "}
                Products that separate, discolor, or grow mold after 3 months destroy
                your brand. The $2,000 in testing costs is nothing compared to a
                product recall and refund campaign.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Making drug claims on a cosmetic.</strong>{" "}
                Saying your product &quot;treats acne,&quot; &quot;reduces wrinkles,&quot;
                or &quot;heals eczema&quot; makes it a drug in the FDA&apos;s eyes.
                Drug claims without drug approval can result in warning letters,
                seizures, and injunctions.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Overspending on packaging too early.</strong>{" "}
                Custom molds and premium finishes look amazing but add $10,000-$30,000
                in upfront cost and lock you into high MOQs. Use stock packaging for
                your first 2-3 production runs.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Not budgeting for testing.</strong>{" "}
                Stability testing, PET, micro testing, and compatibility testing add
                $2,000-$8,000 per SKU. Many founders discover this cost after
                formulation and scramble for budget.
              </li>
            </ul>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Pro tips for cosmetics founders</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Test market with private label first.</strong>{" "}
                Before investing $15,000+ in custom formulation, validate demand with
                a private label product. If it sells, invest in a custom formula for
                version 2.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Get your own product liability insurance.</strong>{" "}
                Costs $500-$2,000/year and is required by most retailers. It protects
                you if a customer has an adverse reaction.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Build a brand story around ingredients.</strong>{" "}
                Consumers care about hero ingredients. &quot;10% Niacinamide +
                Zinc PCA&quot; is more compelling than &quot;anti-aging serum.&quot;
                Work with your chemist to identify 2-3 hero ingredients that are
                both effective and marketable.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Order 10% extra packaging.</strong>{" "}
                Packaging breakage, filling errors, and label misalignment are
                inevitable. Running out of packaging mid-production halts the
                line and delays your launch. A 10% buffer costs little but saves
                weeks.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-10 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your beauty product?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a complete manufacturing feasibility report with cost breakdowns,
            supplier recommendations, and regulatory guidance — delivered in
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