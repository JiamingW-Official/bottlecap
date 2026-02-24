import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shipping & Logistics Guide for Importers — Bottlecap",
  description:
    "Everything you need to know about international shipping, freight forwarding, customs clearance, and logistics costs. Includes Incoterms explained, cost breakdowns, and timelines for importing from Asia.",
}

export default function ShippingLogisticsGuidePage() {
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
          <span className="text-[#1A1A1A]">Shipping &amp; Logistics</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Shipping &amp; Logistics Guide for Importers
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Getting your product manufactured is only half the battle. Moving it
            from a factory overseas to your warehouse, Amazon FBA center, or
            customer&apos;s doorstep requires navigating international shipping,
            customs regulations, and a chain of logistics partners. This guide
            breaks down every step so you can budget accurately, avoid costly
            mistakes, and get your goods delivered on time.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: "#overview", label: "Overview of International Shipping" },
              { href: "#methods", label: "Shipping Methods Compared" },
              { href: "#incoterms", label: "Understanding Incoterms" },
              { href: "#freight-forwarders", label: "Working with Freight Forwarders" },
              { href: "#customs", label: "Customs Clearance" },
              { href: "#cost-breakdown", label: "Full Cost Breakdown" },
              { href: "#timelines", label: "Shipping Timelines" },
              { href: "#problems", label: "Common Problems & Solutions" },
              { href: "#first-time", label: "Tips for First-Time Importers" },
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
          {/* Overview */}
          <section id="overview">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Overview of International Shipping
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                International shipping is the process of moving goods from a
                manufacturer in one country to a buyer in another. For most
                hardware and consumer product founders, this means shipping from
                factories in China, Vietnam, India, or other manufacturing hubs
                to destinations in the United States, Europe, or other markets.
              </p>
              <p>
                The logistics chain typically involves multiple parties: your
                supplier, a freight forwarder, an ocean or air carrier, a customs
                broker, a drayage company (for trucking from port), and
                potentially a third-party logistics (3PL) warehouse. Each
                handoff introduces cost, time, and risk.
              </p>
              <p>
                Shipping costs typically represent 5-15% of your total landed
                cost for ocean freight, or 15-35% for air freight. Getting this
                right is critical to your margins. A $5 product that costs $3 to
                ship by air has very different economics than one that costs
                $0.50 to ship by ocean.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Key Insight
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Your shipping strategy should be decided before you finalize
                your product pricing. Many first-time importers underestimate
                logistics costs by 30-50%, which destroys their margins. Always
                get freight quotes before committing to retail prices.
              </p>
            </div>
          </section>

          {/* Shipping Methods */}
          <section id="methods">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Shipping Methods Compared
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                There are five primary methods for shipping goods
                internationally. The right choice depends on your shipment size,
                urgency, budget, and product type. Here is a detailed comparison
                of each.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Ocean Freight — Full Container Load (FCL)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  You rent an entire shipping container (20ft or 40ft) for your
                  goods exclusively. A 20ft container holds roughly 28 cubic
                  meters and up to 21,000 kg. A 40ft container holds about 58
                  cubic meters. FCL is the most cost-effective method for large
                  shipments.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Cost</p>
                    <p className="text-[#6B6B6B]">$2,000–$5,000/container</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Transit</p>
                    <p className="text-[#6B6B6B]">14–35 days</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Best For</p>
                    <p className="text-[#6B6B6B]">Large orders, 10+ CBM</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Per-Unit</p>
                    <p className="text-[#6B6B6B]">Lowest cost option</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Ocean Freight — Less Than Container Load (LCL)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Your goods share container space with other shippers. You pay
                  per cubic meter (CBM). LCL is ideal when your shipment is too
                  large for air freight but too small to fill a container. The
                  consolidation and deconsolidation process adds 5-7 days to
                  transit time compared to FCL.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Cost</p>
                    <p className="text-[#6B6B6B]">$50–$100/CBM</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Transit</p>
                    <p className="text-[#6B6B6B]">20–40 days</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Best For</p>
                    <p className="text-[#6B6B6B]">1–10 CBM shipments</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Per-Unit</p>
                    <p className="text-[#6B6B6B]">Low, but higher than FCL</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Air Freight
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Goods are shipped on commercial or cargo airlines. Air freight
                  is 4-5x more expensive than ocean but 5-10x faster. It makes
                  sense for high-value, low-weight products, urgent restocks, or
                  initial sample shipments. Most air freight is priced by
                  whichever is greater: actual weight or volumetric weight
                  (length x width x height / 6000 in cm).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Cost</p>
                    <p className="text-[#6B6B6B]">$4–$8/kg</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Transit</p>
                    <p className="text-[#6B6B6B]">3–5 days</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Best For</p>
                    <p className="text-[#6B6B6B]">Urgent, high-value goods</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Per-Unit</p>
                    <p className="text-[#6B6B6B]">High</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Express Courier (DHL, FedEx, UPS)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Door-to-door service with tracking and customs handled by the
                  courier. Express is the simplest option but the most expensive.
                  It is ideal for samples, prototypes, and very small shipments
                  under 100 kg. Many Chinese suppliers have discounted DHL/FedEx
                  accounts and can offer better rates than you would get directly.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Cost</p>
                    <p className="text-[#6B6B6B]">$20–$50/kg</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Transit</p>
                    <p className="text-[#6B6B6B]">2–5 days</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Best For</p>
                    <p className="text-[#6B6B6B]">Samples, under 100 kg</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Per-Unit</p>
                    <p className="text-[#6B6B6B]">Highest</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Rail Freight (China–Europe)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Rail freight via the China-Europe Railway Express has become a
                  viable middle ground between ocean and air. Trains travel from
                  Chinese manufacturing hubs through Central Asia to European
                  destinations. Transit times are roughly half of ocean freight
                  at about 60-70% of air freight cost. This option is primarily
                  relevant for Europe-bound shipments.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Cost</p>
                    <p className="text-[#6B6B6B]">$3,000–$8,000/container</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Transit</p>
                    <p className="text-[#6B6B6B]">14–18 days</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Best For</p>
                    <p className="text-[#6B6B6B]">China to Europe</p>
                  </div>
                  <div className="bg-[#F5F5F0] rounded-xl p-3">
                    <p className="font-semibold text-[#1A1A1A]">Per-Unit</p>
                    <p className="text-[#6B6B6B]">Mid-range</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Incoterms */}
          <section id="incoterms">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Understanding Incoterms
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Incoterms (International Commercial Terms) are standardized
                trade terms published by the International Chamber of Commerce.
                They define who pays for what, who bears the risk at each stage,
                and where responsibility transfers from seller to buyer. Getting
                this wrong can mean unexpected costs of thousands of dollars.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                  EXW (Ex Works)
                </h3>
                <p className="text-sm text-[#FF6B35] font-medium mb-3">
                  Buyer bears all cost and risk from factory gate
                </p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The supplier makes the goods available at their premises. You
                  are responsible for everything: loading, inland transport to
                  port, export clearance, ocean/air freight, import clearance,
                  and delivery. This gives you maximum control but requires
                  significant logistics knowledge.
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  When to use: You have an experienced freight forwarder and want
                  full control over shipping costs. Not recommended for
                  beginners.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                  FOB (Free on Board)
                </h3>
                <p className="text-sm text-[#FF6B35] font-medium mb-3">
                  Risk transfers when goods are loaded onto the vessel
                </p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The most common Incoterm for importing from Asia. The supplier
                  handles inland transport, export customs, and loading onto the
                  ship. You take over once the goods are on board. You pay for
                  ocean freight, marine insurance, import customs, and delivery.
                  FOB pricing from suppliers is the industry standard for
                  comparing quotes.
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  When to use: Most import situations. This is the recommended
                  default for founders importing from Asia.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                  CIF (Cost, Insurance, and Freight)
                </h3>
                <p className="text-sm text-[#FF6B35] font-medium mb-3">
                  Supplier pays for freight and insurance to destination port
                </p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The supplier arranges and pays for ocean freight and minimum
                  insurance to the destination port. Risk still transfers at the
                  origin port. This seems simpler, but suppliers often mark up
                  freight costs by 15-30%. You also have less control over
                  carrier selection, routing, and insurance coverage.
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  When to use: When you want simplicity and do not mind paying a
                  premium. Compare the CIF price against FOB + your own freight
                  quote to see if it makes sense.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                  DDP (Delivered Duty Paid)
                </h3>
                <p className="text-sm text-[#FF6B35] font-medium mb-3">
                  Supplier handles everything to your door
                </p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The supplier is responsible for all costs and risk until the
                  goods arrive at your specified destination, including import
                  duties and taxes. This is the most hands-off option for you,
                  but also the most expensive. Suppliers typically add a
                  substantial margin for taking on this responsibility. It also
                  means you cannot claim import duty drawbacks or reclaim VAT.
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  When to use: Small shipments where convenience outweighs cost,
                  or when you have zero logistics experience and need a simple
                  starting point.
                </p>
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Always get quotes on FOB terms, even if you plan to use CIF or
                DDP. This gives you a baseline to compare against and negotiate.
                Many experienced importers start with DDP for their first order
                to learn the process, then switch to FOB once they have a
                reliable freight forwarder.
              </p>
            </div>
          </section>

          {/* Freight Forwarders */}
          <section id="freight-forwarders">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Working with Freight Forwarders
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                A freight forwarder is your logistics quarterback. They
                coordinate the movement of your goods from the supplier&apos;s
                factory to your warehouse, handling booking cargo space,
                preparing documentation, arranging customs clearance, and
                managing the handoffs between carriers. For most importers, a
                good freight forwarder is the single most important logistics
                partner you will have.
              </p>
              <p>
                Freight forwarders do not own ships or planes. They are
                intermediaries who negotiate rates with carriers on behalf of
                their clients. Because they consolidate volume from many
                shippers, they typically get better rates than you could
                negotiate directly. Their fee is usually built into the freight
                rate or charged as a flat service fee.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Freight Forwarder Cost Structure
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { item: "Service/management fee", cost: "$100–$300 per shipment" },
                  { item: "Origin charges (pickup, consolidation)", cost: "$50–$200" },
                  { item: "Documentation (B/L, certificates)", cost: "$25–$75" },
                  { item: "Customs brokerage (destination)", cost: "$150–$500" },
                  { item: "Overall margin on freight", cost: "2–5% of shipment value" },
                ].map((row) => (
                  <div
                    key={row.item}
                    className="flex justify-between items-center py-2 border-b border-[#E8E8E4] last:border-0"
                  >
                    <span className="text-[#1A1A1A] font-medium">{row.item}</span>
                    <span className="text-[#6B6B6B]">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                How to Choose a Freight Forwarder
              </p>
              <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc pl-5">
                <li>Get quotes from at least 3 forwarders for the same shipment</li>
                <li>Ask about their experience with your origin country and product type</li>
                <li>Check if they have offices or agents at both origin and destination</li>
                <li>Ask for references from other importers in your product category</li>
                <li>Verify they are licensed (FMC license for US, FIATA for international)</li>
                <li>Test their communication responsiveness before committing</li>
              </ul>
            </div>
          </section>

          {/* Customs Clearance */}
          <section id="customs">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Customs Clearance
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Customs clearance is the process of getting your imported goods
                approved by the destination country&apos;s customs authority.
                This involves submitting documentation, paying applicable duties
                and taxes, and passing any required inspections. In the US, this
                is handled by US Customs and Border Protection (CBP).
              </p>
              <p>
                Most importers use a licensed customs broker (often your freight
                forwarder offers this service) to handle clearance. The broker
                prepares and submits the entry documents, classifies your goods
                under the correct HS code, calculates duties owed, and pays them
                on your behalf.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Required Documents for US Import
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { doc: "Commercial Invoice", desc: "From your supplier, showing product description, quantity, value, and terms" },
                  { doc: "Packing List", desc: "Detailed breakdown of carton count, dimensions, weights, and contents" },
                  { doc: "Bill of Lading (B/L)", desc: "Contract between shipper and carrier, serves as receipt and title document" },
                  { doc: "Arrival Notice", desc: "Issued by the carrier when the shipment arrives at destination port" },
                  { doc: "ISF Filing (10+2)", desc: "Importer Security Filing required 24 hours before vessel loading. Late filing penalty: $5,000" },
                  { doc: "Certificate of Origin", desc: "Required for preferential duty rates under trade agreements" },
                  { doc: "Product-Specific Certificates", desc: "FCC, UL, FDA, CPSIA, or other certificates depending on product type" },
                ].map((row) => (
                  <div
                    key={row.doc}
                    className="py-2 border-b border-[#E8E8E4] last:border-0"
                  >
                    <p className="font-medium text-[#1A1A1A]">{row.doc}</p>
                    <p className="text-[#6B6B6B] mt-1">{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                HS Codes and Duty Calculation
              </p>
              <p className="text-sm text-[#6B6B6B]">
                The Harmonized System (HS) code is a 6-10 digit number that
                classifies your product for customs purposes. The code
                determines the duty rate you pay. Getting the HS code wrong can
                mean overpaying duties, underpaying (which triggers penalties
                and audits), or having your shipment held at customs. US duty
                rates range from 0% to 25%+ depending on the product and country
                of origin. Use the USITC Harmonized Tariff Schedule or our
                HS Lookup tool to find the correct code.
              </p>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section id="cost-breakdown">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Full Cost Breakdown
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Your total landed cost includes far more than just the freight
                charge. Here is a comprehensive breakdown of every cost category
                you should budget for when importing goods. These figures
                represent typical ranges for a standard ocean freight shipment
                from China to the US.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Landed Cost Components
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { category: "Factory price (FOB)", range: "Varies", note: "The quoted unit price from your supplier" },
                  { category: "Ocean freight (FCL 20ft)", range: "$2,000–$5,000", note: "Rates fluctuate seasonally; peak season (Aug–Oct) can be 2x higher" },
                  { category: "Ocean freight (LCL)", range: "$50–$100/CBM", note: "Minimum charge usually 1 CBM" },
                  { category: "Marine insurance", range: "0.3–0.5% of cargo value", note: "All-risk coverage recommended; never skip insurance" },
                  { category: "Customs brokerage", range: "$150–$500", note: "Flat fee per entry; may be higher for complex shipments" },
                  { category: "Import duties", range: "0–25%+ of declared value", note: "Based on HS code and country of origin; check for Section 301 tariffs" },
                  { category: "Merchandise Processing Fee", range: "0.3464% (min $31, max $614)", note: "US CBP fee on all imports" },
                  { category: "Harbor Maintenance Fee", range: "0.125% of cargo value", note: "US fee on ocean imports only" },
                  { category: "Drayage (port to warehouse)", range: "$300–$800", note: "Trucking from port; varies by distance" },
                  { category: "Warehousing", range: "$15–$40/pallet/month", note: "3PL receiving fees of $25–$50/shipment additional" },
                  { category: "ISF filing", range: "$25–$50", note: "Must be filed 24+ hours before vessel departure" },
                ].map((row) => (
                  <div
                    key={row.category}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-[#1A1A1A]">{row.category}</span>
                      <span className="text-[#FF6B35] font-semibold ml-4 whitespace-nowrap">
                        {row.range}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] mt-1">{row.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Quick Formula
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Landed cost per unit = FOB price + (total freight / units) +
                (duty rate x FOB price) + (insurance / units) + (brokerage /
                units) + (drayage / units) + (warehouse receiving / units). For
                a rough estimate, add 30-45% to your FOB price for ocean
                freight to the US, or 50-80% for air freight.
              </p>
            </div>
          </section>

          {/* Timelines */}
          <section id="timelines">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Shipping Timelines
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Understanding realistic shipping timelines is essential for
                inventory planning, product launches, and cash flow management.
                The times below represent port-to-port transit plus typical
                customs clearance and delivery. Add 3-7 days for factory to port
                at origin and warehouse delivery at destination.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Route</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Ocean (FCL)</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Ocean (LCL)</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Air</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Express</th>
                  </tr>
                </thead>
                <tbody className="text-[#6B6B6B]">
                  {[
                    { route: "China to US West Coast", ocean: "14–21 days", lcl: "20–28 days", air: "3–5 days", express: "2–4 days" },
                    { route: "China to US East Coast", ocean: "25–35 days", lcl: "30–40 days", air: "4–6 days", express: "3–5 days" },
                    { route: "China to Europe (ocean)", ocean: "28–35 days", lcl: "33–42 days", air: "4–7 days", express: "3–5 days" },
                    { route: "China to Europe (rail)", ocean: "14–18 days", lcl: "N/A", air: "—", express: "—" },
                    { route: "Vietnam to US West Coast", ocean: "18–25 days", lcl: "24–32 days", air: "4–6 days", express: "3–5 days" },
                    { route: "India to US East Coast", ocean: "25–35 days", lcl: "30–40 days", air: "4–7 days", express: "3–6 days" },
                    { route: "Mexico to US (truck)", ocean: "3–7 days", lcl: "—", air: "1–2 days", express: "1–3 days" },
                  ].map((row) => (
                    <tr key={row.route} className="border-b border-[#E8E8E4] last:border-0">
                      <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{row.route}</td>
                      <td className="py-3 pr-4">{row.ocean}</td>
                      <td className="py-3 pr-4">{row.lcl}</td>
                      <td className="py-3 pr-4">{row.air}</td>
                      <td className="py-3">{row.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Plan for Delays
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Always add a 25-50% buffer to quoted transit times. Port
                congestion, weather, customs inspections, and holiday seasons
                (especially Chinese New Year in January/February) can add 1-3
                weeks to ocean shipments. Peak shipping season runs from
                August through October, when holiday inventory is being moved.
                Book early and expect higher rates during this period.
              </p>
            </div>
          </section>

          {/* Common Problems */}
          <section id="problems">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Common Problems &amp; Solutions
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Even experienced importers encounter shipping problems. The key
                is knowing what can go wrong, having contingency plans, and
                understanding your recourse options. Here are the most common
                issues and how to handle them.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  problem: "Shipping Delays",
                  description:
                    "Port congestion, weather events, carrier schedule changes, and customs holds can delay your shipment by days to weeks. During COVID, some ocean shipments were delayed by 2-4 weeks.",
                  solution:
                    "Build buffer time into your inventory plan. Maintain 4-6 weeks of safety stock. Use shipment tracking tools and set up alerts. Have a backup air freight plan for critical inventory.",
                },
                {
                  problem: "Cargo Damage",
                  description:
                    "Goods can be damaged during loading, transit, or unloading. Water damage from leaking containers, crush damage from improper stacking, and temperature damage for sensitive goods are all common.",
                  solution:
                    "Always purchase marine insurance (0.3-0.5% of cargo value). Require proper export packaging from your supplier. Use moisture absorbers in containers. Document everything with photos at receiving.",
                },
                {
                  problem: "Demurrage & Detention Charges",
                  description:
                    "Demurrage is charged when your container sits at the port terminal beyond the free days (typically 3-5 days). Detention is charged when you keep the container beyond the allowed time after pickup. Rates are $100-$300 per day per container and escalate over time.",
                  solution:
                    "Have your customs broker and drayage company lined up before the ship arrives. Pre-clear customs when possible. Confirm warehouse receiving appointments in advance. Monitor vessel tracking for ETA changes.",
                },
                {
                  problem: "Customs Holds & Inspections",
                  description:
                    "CBP can hold your shipment for document review, physical inspection, or examination. Inspections typically cost $300-$1,000 for unloading, re-loading, and storage fees, and can delay your shipment by 3-10 business days.",
                  solution:
                    "Ensure all documentation is accurate and complete before the shipment arrives. Use correct HS codes. File ISF on time. Maintain a clean import history. Respond immediately to any CBP requests.",
                },
                {
                  problem: "Lost or Missing Cargo",
                  description:
                    "While rare, containers can be lost at sea, misrouted, or items can go missing during LCL consolidation. About 1,000-3,000 containers are lost at sea annually.",
                  solution:
                    "Always insure your cargo for full replacement value plus freight costs. Keep copies of all shipping documents. Use container tracking. For high-value shipments, consider splitting across multiple containers.",
                },
                {
                  problem: "Incorrect HS Code Classification",
                  description:
                    "Using the wrong HS code can result in overpaying duties, underpaying (triggering audits and penalties), or having your product flagged for additional regulatory requirements.",
                  solution:
                    "Get a binding ruling from CBP before your first shipment. Consult with your customs broker on classification. Keep records of how your HS code was determined. Review classification annually as trade policy changes.",
                },
              ].map((item) => (
                <div
                  key={item.problem}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {item.problem}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="bg-[#F5F5F0] rounded-xl p-4">
                    <p className="text-sm font-medium text-[#1A1A1A] mb-1">
                      Solution
                    </p>
                    <p className="text-sm text-[#6B6B6B]">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips for First-Time Importers */}
          <section id="first-time">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Tips for First-Time Importers
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Your first import shipment is a learning experience. Here are
                the most important things to get right from the start.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <ol className="space-y-4 text-sm">
                {[
                  {
                    title: "Start with a small order via express or air freight",
                    detail:
                      "Your first order should be a test run. Ship a small quantity by express courier to verify product quality, packaging integrity, and your customs clearance process before committing to a full container.",
                  },
                  {
                    title: "Get your customs bond before you need it",
                    detail:
                      "US imports over $2,500 require a customs bond. A single-entry bond costs $50-$100 per shipment. A continuous bond costs $300-$500 per year and covers unlimited entries. If you plan to import regularly, get a continuous bond.",
                  },
                  {
                    title: "Find a freight forwarder before placing your production order",
                    detail:
                      "You need freight quotes to calculate your true landed cost. A good forwarder will also advise on packaging requirements, documentation, and help you avoid common mistakes.",
                  },
                  {
                    title: "Never skip marine insurance",
                    detail:
                      "At 0.3-0.5% of cargo value, insurance is one of the cheapest costs in your supply chain. A single damaged shipment without insurance can cost more than years of premiums. Insure for CIF value plus 10%.",
                  },
                  {
                    title: "Understand your HS code and duty rate before pricing your product",
                    detail:
                      "Duties can range from 0% to over 25%. Section 301 tariffs on Chinese goods add an additional 7.5-25% on many product categories. These costs must be factored into your retail price.",
                  },
                  {
                    title: "Plan for total transit time, not just sailing time",
                    detail:
                      "Total time from factory to warehouse includes production, factory to port, port waiting, ocean transit, customs clearance, drayage, and warehouse receiving. A realistic timeline from China to a US warehouse is 6-10 weeks from production completion.",
                  },
                  {
                    title: "Keep impeccable records",
                    detail:
                      "Save every invoice, packing list, bill of lading, and customs entry for at least 5 years. CBP can audit your imports and request documentation at any time. Organized records also help when filing insurance claims or disputing charges.",
                  },
                  {
                    title: "Build relationships, not just transactions",
                    detail:
                      "Your freight forwarder, customs broker, and drayage company are long-term partners. A good relationship means better rates over time, priority handling during peak seasons, and someone who will go the extra mile when problems arise.",
                  },
                ].map((tip, index) => (
                  <li key={tip.title} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">
                        {tip.title}
                      </p>
                      <p className="text-[#6B6B6B] leading-relaxed">
                        {tip.detail}
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
              Ready to plan your import logistics?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Get a Bottlecap feasibility report with detailed cost estimates
              including shipping, duties, and landed cost projections tailored
              to your specific product and destination market.
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
