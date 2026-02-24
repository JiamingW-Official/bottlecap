import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Apparel Manufacturing Guide for Founders — Bottlecap",
  description:
    "The complete guide to manufacturing clothing and textile products. Tech packs, fabric sourcing, sizing, production processes, cost breakdowns, and top manufacturing countries.",
}

export default function ApparelManufacturingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-10">
          <Link href="/guide" className="hover:text-[#FF6B35] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Apparel Manufacturing</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Apparel Manufacturing Guide for Founders
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Launching a clothing brand sounds simple — until you hit the wall of
            tech packs, fabric minimums, and grading specifications. This guide
            walks you through every stage of apparel manufacturing, from
            selecting a production model to shipping your first collection, with
            real costs and hard-won lessons from brand founders.
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
                1. Types of Apparel Manufacturing
              </a>
            </li>
            <li>
              <a href="#tech-packs" className="hover:text-[#FF6B35] transition-colors">
                2. Tech Packs
              </a>
            </li>
            <li>
              <a href="#fabric-sourcing" className="hover:text-[#FF6B35] transition-colors">
                3. Fabric Sourcing
              </a>
            </li>
            <li>
              <a href="#sizing-grading" className="hover:text-[#FF6B35] transition-colors">
                4. Sizing &amp; Grading
              </a>
            </li>
            <li>
              <a href="#production-process" className="hover:text-[#FF6B35] transition-colors">
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
            1. Types of Apparel Manufacturing
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Before contacting a single factory, you need to decide which
              manufacturing model fits your brand, budget, and level of
              involvement. The three primary models differ dramatically in how
              much the factory handles versus what you provide.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Manufacturing Models Compared</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Model</th>
                  <th className="pb-3 font-semibold">You Provide</th>
                  <th className="pb-3 font-semibold">Factory Provides</th>
                  <th className="pb-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">CMT (Cut, Make, Trim)</td>
                  <td className="py-3 text-[#6B6B6B]">Fabric, trims, patterns, tech pack</td>
                  <td className="py-3 text-[#6B6B6B]">Cutting, sewing, finishing</td>
                  <td className="py-3 text-[#6B6B6B]">Brands with sourcing experience</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Full Package (FPP)</td>
                  <td className="py-3 text-[#6B6B6B]">Tech pack, design specs</td>
                  <td className="py-3 text-[#6B6B6B]">Everything: fabric, trims, production</td>
                  <td className="py-3 text-[#6B6B6B]">New brands, overseas manufacturing</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Private Label</td>
                  <td className="py-3 text-[#6B6B6B]">Logo, labels, color choices</td>
                  <td className="py-3 text-[#6B6B6B]">Existing designs + everything else</td>
                  <td className="py-3 text-[#6B6B6B]">Fastest to market, lowest risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              Most first-time founders should start with Full Package Production
              (FPP). You focus on design and the factory handles sourcing and
              production. The per-unit cost is 10-20% higher than CMT, but you
              avoid the complexity of managing multiple fabric and trim suppliers
              across different countries. Once you hit 5,000+ units per style,
              switching to CMT can save significant money.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="tech-packs" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            2. Tech Packs
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              A tech pack is the blueprint for your garment. It tells the factory
              exactly what to make and eliminates ambiguity. Without a proper tech
              pack, you&apos;re relying on the factory to interpret your vision —
              and they will interpret it differently than you expect.
            </p>
            <p>
              A complete tech pack typically costs $150-$500 per style if you hire
              a freelance technical designer (Upwork, CLO 3D specialists), or
              $300-$1,500 through a design agency. Many factories will create a
              basic tech pack for free if you commit to production, but these
              tend to lack the precision you need.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">What to Include in Your Tech Pack</h3>
            <ul className="space-y-3 text-[#6B6B6B] text-sm">
              <li><strong className="text-[#1A1A1A]">Flat sketches</strong> — Front, back, and detail views with callouts for every design element (pockets, seams, closures)</li>
              <li><strong className="text-[#1A1A1A]">Bill of Materials</strong> — Every fabric, thread, button, zipper, label, and hang tag with exact specifications</li>
              <li><strong className="text-[#1A1A1A]">Colorways</strong> — Pantone references for every color. Never use screen colors — they vary wildly between monitors</li>
              <li><strong className="text-[#1A1A1A]">Measurements</strong> — Grade spec with measurements for every size in your range (in inches or cm, be consistent)</li>
              <li><strong className="text-[#1A1A1A]">Construction details</strong> — Stitch types (lockstitch, overlock, coverstitch), seam allowances, topstitching placement</li>
              <li><strong className="text-[#1A1A1A]">Label placement</strong> — Exact position of brand labels, care labels, size labels, and any printed tags</li>
              <li><strong className="text-[#1A1A1A]">Packaging spec</strong> — How garments should be folded, bagged, and boxed</li>
            </ul>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              The most common tech pack mistake is vague measurements. &quot;Medium
              chest width: 20 inches&quot; is not enough. Specify the exact measurement
              point (1 inch below armhole, laid flat, edge to edge) and the tolerance
              (+/- 0.5 inch). Factories will hit the number they&apos;re given — make
              sure it&apos;s the right number.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="fabric-sourcing" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            3. Fabric Sourcing
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Fabric is typically 40-60% of your garment cost. Choosing the right
              fabric and sourcing it efficiently makes or breaks your margins.
              Fabric is priced per yard or per meter, and costs vary wildly based
              on fiber content, weight (GSM), and finish.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Common Fabric Types &amp; Costs</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Fabric</th>
                  <th className="pb-3 font-semibold">Price/Yard</th>
                  <th className="pb-3 font-semibold">MOQ (Yards)</th>
                  <th className="pb-3 font-semibold">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Cotton jersey (180 GSM)</td>
                  <td className="py-3">$2 - $6</td>
                  <td className="py-3">300-1,000</td>
                  <td className="py-3 text-[#6B6B6B]">T-shirts, basics</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">French terry (280 GSM)</td>
                  <td className="py-3">$4 - $10</td>
                  <td className="py-3">500-1,000</td>
                  <td className="py-3 text-[#6B6B6B]">Hoodies, sweatshirts</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Organic cotton</td>
                  <td className="py-3">$5 - $12</td>
                  <td className="py-3">500-2,000</td>
                  <td className="py-3 text-[#6B6B6B]">Premium basics, eco brands</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Polyester performance</td>
                  <td className="py-3">$3 - $8</td>
                  <td className="py-3">500-1,000</td>
                  <td className="py-3 text-[#6B6B6B]">Activewear, athleisure</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Denim (10-14 oz)</td>
                  <td className="py-3">$4 - $15</td>
                  <td className="py-3">1,000-3,000</td>
                  <td className="py-3 text-[#6B6B6B]">Jeans, jackets</td>
                </tr>
                <tr>
                  <td className="py-3">Nylon ripstop</td>
                  <td className="py-3">$3 - $9</td>
                  <td className="py-3">500-1,500</td>
                  <td className="py-3 text-[#6B6B6B]">Outerwear, bags</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              Fabric MOQs are one of the biggest hurdles for new brands. A 300-yard
              minimum at $5/yard is $1,500 of fabric — enough for roughly 150-200
              T-shirts in one color. If you have 4 colors, that&apos;s $6,000 in
              fabric alone before you&apos;ve cut a single garment.
            </p>
            <p>
              To work around high MOQs, look for fabric mills that offer stock
              fabric programs (Alibaba, Swatchon) or work with domestic jobbers
              who buy mill overruns at a markup. You can also use deadstock fabric
              for your first collection to test the market before committing to
              custom fabric orders.
            </p>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Tip</p>
            <p className="text-[#6B6B6B]">
              Always order a 3-5 yard sample cut (called a &quot;lab dip&quot; for
              color and a &quot;hand loom&quot; for fabric construction) before
              committing to a bulk order. Test it for shrinkage, pilling,
              colorfastness, and hand feel after 5-10 washes. A $50 sample can
              prevent a $5,000 fabric disaster.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="sizing-grading" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            4. Sizing &amp; Grading
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              Sizing is where many new brands stumble. There is no universal
              standard — a &quot;Medium&quot; varies by brand, country, and
              garment type. You need to define your own size chart based on
              your target customer and then &quot;grade&quot; it across your
              full size range.
            </p>
            <p>
              Grading is the process of scaling a pattern up and down from your
              base size. If your base size is Medium, grading creates the Small,
              Large, and XL patterns by applying consistent increments to each
              measurement point. Professional grading costs $25-$75 per size per
              style, and it&apos;s worth every penny.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Typical Grade Rules (Men&apos;s T-Shirt)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Measurement</th>
                  <th className="pb-3 font-semibold">S</th>
                  <th className="pb-3 font-semibold">M (Base)</th>
                  <th className="pb-3 font-semibold">L</th>
                  <th className="pb-3 font-semibold">XL</th>
                  <th className="pb-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Chest (half)</td>
                  <td className="py-3">19&quot;</td>
                  <td className="py-3">20.5&quot;</td>
                  <td className="py-3">22&quot;</td>
                  <td className="py-3">23.5&quot;</td>
                  <td className="py-3 text-[#6B6B6B]">+1.5&quot;</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Body length</td>
                  <td className="py-3">27&quot;</td>
                  <td className="py-3">28&quot;</td>
                  <td className="py-3">29&quot;</td>
                  <td className="py-3">30&quot;</td>
                  <td className="py-3 text-[#6B6B6B]">+1&quot;</td>
                </tr>
                <tr>
                  <td className="py-3">Sleeve length</td>
                  <td className="py-3">8&quot;</td>
                  <td className="py-3">8.5&quot;</td>
                  <td className="py-3">9&quot;</td>
                  <td className="py-3">9.5&quot;</td>
                  <td className="py-3 text-[#6B6B6B]">+0.5&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Watch out</p>
            <p className="text-[#6B6B6B]">
              Start with 3-4 sizes (S/M/L/XL) for your first collection. Adding
              XXS-3XL sounds inclusive but multiplies your inventory by 2-3x and
              makes your first production run significantly more expensive. Expand
              your size range based on sales data after your first drop.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="production-process" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            5. Production Process
          </h2>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            <p>
              A full apparel production cycle from first sample to delivered
              goods typically takes 12-20 weeks. Understanding the timeline
              helps you plan collection drops and avoid the single biggest
              mistake in fashion: missing your season.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Production Timeline</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 1-2: First Sample (Proto Sample)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Factory creates the first sample from your tech pack. Made in your base
                  size using available fabric (not necessarily your final fabric). Cost:
                  $50-$200 per style. Expect 2-3 rounds of revisions.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 3-4: Fit Sample</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Refined sample with fit corrections. Test on a live model that matches
                  your target customer body. This is where you finalize measurements
                  and construction details.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 5-6: Pre-Production Sample (PP Sample)</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Made with final fabric, trims, and labels. This should be identical
                  to what you&apos;ll sell. Sign off on this sample in writing — it
                  becomes the factory&apos;s reference standard.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 6-10: Fabric Production &amp; Dyeing</h4>
                <p className="text-sm text-[#6B6B6B]">
                  If you&apos;re using custom fabric, the mill needs 4-6 weeks to
                  produce and dye it. Stock fabric ships in 1-2 weeks.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 10-14: Cutting &amp; Sewing</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Actual garment production. A typical factory can produce 500-2,000
                  pieces per week per line. Your run of 500 pieces might take 3-5 days
                  of line time, but factories batch orders, so expect 2-4 weeks.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">Week 14-16: Quality Check &amp; Shipping</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Final QC inspection (hire a third-party inspector for $200-$400/day),
                  packing, and shipping. Ocean freight adds 3-5 weeks; air freight
                  adds 5-7 days but costs 5-8x more.
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
              Understanding your per-unit cost structure is essential for pricing.
              Apparel margins are tight — most brands target a 60-70% gross margin
              at retail (meaning COGS is 30-40% of retail price). Here&apos;s how
              costs typically break down.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Cost Breakdown: Premium Cotton T-Shirt (500 units)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B6B6B] border-b border-[#E8E8E4]">
                  <th className="pb-3 font-semibold">Cost Component</th>
                  <th className="pb-3 font-semibold">Cost/Unit</th>
                  <th className="pb-3 font-semibold">% of Total</th>
                </tr>
              </thead>
              <tbody className="text-[#1A1A1A]">
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Fabric (1.5 yds @ $5/yd)</td>
                  <td className="py-3">$7.50</td>
                  <td className="py-3">45%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Cut &amp; sew labor</td>
                  <td className="py-3">$3.50</td>
                  <td className="py-3">21%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Trims (labels, tags, thread)</td>
                  <td className="py-3">$1.00</td>
                  <td className="py-3">6%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Printing / embroidery</td>
                  <td className="py-3">$1.50</td>
                  <td className="py-3">9%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Packaging (poly bag + hang tag)</td>
                  <td className="py-3">$0.75</td>
                  <td className="py-3">5%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Shipping (ocean freight, allocated)</td>
                  <td className="py-3">$1.50</td>
                  <td className="py-3">9%</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3">Duty (est. 16.5%)</td>
                  <td className="py-3">$0.80</td>
                  <td className="py-3">5%</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Total Landed Cost</td>
                  <td className="py-3 font-semibold">$16.55</td>
                  <td className="py-3 font-semibold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Pricing rule of thumb</p>
            <p className="text-[#6B6B6B]">
              For DTC (direct-to-consumer) brands, price at 3-4x your landed cost.
              A $16.55 landed cost T-shirt should retail for $48-$65. For wholesale,
              price at 2x landed cost and let retailers mark up another 2-2.5x.
              If you can&apos;t hit your target retail price at 500 units, consider
              whether higher volume or a different fabric can close the gap.
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
              Your choice of manufacturing country affects cost, quality, lead
              times, and minimum order quantities. Here&apos;s how the major
              apparel manufacturing hubs stack up.
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
                  <td className="py-3 text-[#6B6B6B]">Versatile, fast, technical fabrics</td>
                  <td className="py-3">200-500 pcs</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Bangladesh</td>
                  <td className="py-3 text-[#6B6B6B]">Lowest cost for basics, huge capacity</td>
                  <td className="py-3">1,000-3,000 pcs</td>
                  <td className="py-3">$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Vietnam</td>
                  <td className="py-3 text-[#6B6B6B]">Activewear, outerwear, growing fast</td>
                  <td className="py-3">500-1,000 pcs</td>
                  <td className="py-3">$$</td>
                </tr>
                <tr className="border-b border-[#E8E8E4]">
                  <td className="py-3 font-medium">Portugal</td>
                  <td className="py-3 text-[#6B6B6B]">Premium quality, low MOQs, EU access</td>
                  <td className="py-3">100-300 pcs</td>
                  <td className="py-3">$$$</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Turkey</td>
                  <td className="py-3 text-[#6B6B6B]">Denim, knitwear, fast turnaround</td>
                  <td className="py-3">200-500 pcs</td>
                  <td className="py-3">$$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-[#6B6B6B] leading-relaxed mt-6">
            <p>
              For startup brands doing their first run of 200-500 pieces, Portugal
              and Turkey offer the best combination of low MOQs and quality.
              Portuguese factories are especially popular with European and American
              DTC brands — they&apos;re experienced with small runs, communicate
              well in English, and produce at a quality level that justifies premium
              pricing ($40+ retail for a tee).
            </p>
            <p>
              For volume production (3,000+ units), Bangladesh and Vietnam offer
              the best unit economics. Bangladesh dominates basic knitwear and woven
              shirts, while Vietnam excels at performance wear and outerwear.
              China remains the most versatile option and is often the best choice
              when you need technical fabrics or complex construction.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="mistakes" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
            8. Common Mistakes &amp; Tips
          </h2>

          <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Top mistakes apparel founders make</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Too many SKUs in the first collection.</strong>{" "}
                Launching with 15 styles in 5 colors and 6 sizes means 450 SKUs.
                At 100 units per SKU, that&apos;s 45,000 units and a $200,000+ order.
                Start with 3-5 styles, 2-3 colors, 4 sizes.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Not accounting for fabric shrinkage.</strong>{" "}
                Cotton shrinks 3-5% after the first wash. If you don&apos;t pre-shrink
                your fabric or add shrinkage allowance to your patterns, every garment
                will fit tight after the customer&apos;s first wash.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Skipping the fit sample.</strong>{" "}
                Going straight from proto sample to production to save 2 weeks.
                This guarantees fit issues at scale that cost far more than 2 weeks
                to fix — returns, bad reviews, and dead inventory.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Choosing a factory on price alone.</strong>{" "}
                The cheapest factory often has the highest rejection rates, worst
                communication, and longest delays. Get references, see samples
                of past work, and visit if possible.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Ignoring duty rates.</strong>{" "}
                US import duties on apparel range from 5% to 32% depending on
                fiber content and garment type. A 20% duty on a $10 garment adds
                $2 per unit — at 5,000 units, that&apos;s $10,000 you didn&apos;t budget for.
              </li>
            </ul>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-3">Pro tips for your first collection</h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>
                <strong className="text-[#1A1A1A]">Start with basics.</strong>{" "}
                T-shirts, hoodies, and joggers have the simplest construction and
                the widest market. Master production on a basic style before
                attempting complex garments like tailored jackets or swimwear.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Get a wash test from the factory.</strong>{" "}
                Request a sample that&apos;s been washed 5 times per your care
                instructions. Check for shrinkage, color bleeding, pilling, and
                seam integrity.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Negotiate payment terms.</strong>{" "}
                Standard is 30% deposit, 70% before shipping. For your first order
                you may need to pay 50/50, but push for 30/70 as you build trust.
                Never pay 100% upfront.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Photograph the PP sample obsessively.</strong>{" "}
                Take 50+ photos with measurements visible. This is your legal
                reference if the production run doesn&apos;t match. Factories
                respect specificity.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-[#E8E8E4] p-10 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Ready to analyze your apparel product?
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Get a complete manufacturing feasibility report with cost breakdowns,
            factory recommendations, and production planning — delivered in
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