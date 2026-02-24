import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packaging Design for Manufactured Products — Bottlecap",
  description:
    "Complete guide to packaging design for manufactured products. Covers packaging types, materials, printing methods, sustainable options, costs, MOQs, and common mistakes to avoid.",
}

export default function PackagingDesignGuidePage() {
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
          <span className="text-[#1A1A1A]">Packaging Design</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Packaging Design for Manufactured Products
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Packaging is your product&apos;s first impression. It protects your
            product during shipping, communicates your brand story on the shelf
            or in a customer&apos;s hands, and can be the difference between a
            product that feels premium and one that feels cheap. This guide
            covers everything you need to know about packaging design,
            materials, printing, costs, and working with packaging suppliers.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: "#why-packaging", label: "Why Packaging Matters" },
              { href: "#types", label: "Types of Packaging" },
              { href: "#materials", label: "Packaging Materials & Costs" },
              { href: "#designing", label: "Designing for Manufacturing" },
              { href: "#printing", label: "Printing Methods" },
              { href: "#sustainable", label: "Sustainable Packaging Options" },
              { href: "#cost-breakdown", label: "Cost Breakdown" },
              { href: "#moq-leadtimes", label: "MOQs & Lead Times" },
              { href: "#suppliers", label: "Working with Packaging Suppliers" },
              { href: "#mistakes", label: "Common Mistakes to Avoid" },
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
          {/* Why Packaging Matters */}
          <section id="why-packaging">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Why Packaging Matters
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Packaging serves three critical functions: protection, branding,
                and information. Getting any one of these wrong has real
                consequences for your business.
              </p>
              <p>
                <strong className="text-[#1A1A1A]">Protection:</strong> Your
                product travels thousands of miles in a shipping container,
                gets tossed around by logistics workers, and sits on shelves or
                in warehouses. Packaging must protect against impact, moisture,
                temperature, and UV exposure. A beautiful product that arrives
                damaged is worse than an ugly product that arrives intact.
              </p>
              <p>
                <strong className="text-[#1A1A1A]">Branding:</strong> For
                direct-to-consumer brands, the unboxing experience is a
                marketing channel. 72% of consumers say packaging design
                influences their purchase decision. For Amazon sellers,
                packaging is one of the few touchpoints where you control the
                customer experience. Premium packaging can justify a higher
                price point and drive repeat purchases.
              </p>
              <p>
                <strong className="text-[#1A1A1A]">Information:</strong>{" "}
                Packaging must communicate regulatory information (UPC codes,
                safety warnings, country of origin), usage instructions, and
                brand messaging. For retail distribution, packaging must meet
                specific retailer requirements for labeling, sizing, and
                barcoding.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                The Hidden Cost of Bad Packaging
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Amazon data shows that products with &quot;packaging
                issues&quot; as a return reason cost sellers an average of
                $8-$15 per return in shipping, processing, and lost inventory.
                For high-volume sellers, upgrading packaging to reduce damage
                returns by even 2-3% can save thousands per month.
              </p>
            </div>
          </section>

          {/* Types of Packaging */}
          <section id="types">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Types of Packaging
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Packaging is organized into three layers, each serving a
                different purpose. Understanding these layers helps you make
                informed decisions about where to invest your packaging budget.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Primary Packaging
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The packaging that directly contains or touches your product.
                  This is what the customer sees first when they open the box.
                  Examples include the retail box, clamshell, sleeve, pouch, or
                  blister pack. Primary packaging is where your branding,
                  product photos, and key selling points live. It is the
                  highest-value and most design-intensive layer.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <span className="font-medium text-[#1A1A1A]">Budget allocation: </span>
                  <span className="text-[#6B6B6B]">50-70% of total packaging cost</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Secondary Packaging
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Groups multiple primary packages together for shipping and
                  retail display. Examples include master cartons, display boxes,
                  and shrink-wrap bundles. For e-commerce brands, secondary
                  packaging is often the shipping box itself. This is where
                  Amazon FBA requirements and shipping durability come into play.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <span className="font-medium text-[#1A1A1A]">Budget allocation: </span>
                  <span className="text-[#6B6B6B]">20-35% of total packaging cost</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Tertiary Packaging
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  The outer shipping packaging used for bulk transport. This is
                  the master export carton that goes into the shipping container.
                  It must be sturdy enough to survive stacking, moisture, and
                  rough handling during international transit. Standard export
                  cartons are double-wall corrugated, rated for the weight they
                  will carry.
                </p>
                <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                  <span className="font-medium text-[#1A1A1A]">Budget allocation: </span>
                  <span className="text-[#6B6B6B]">10-20% of total packaging cost</span>
                </div>
              </div>
            </div>
          </section>

          {/* Materials */}
          <section id="materials">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Packaging Materials &amp; Costs
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                The material you choose affects your cost, brand perception,
                product protection, and sustainability profile. Here is a
                breakdown of the most common packaging materials, their cost
                ranges, and best use cases.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  material: "Corrugated Cardboard",
                  cost: "$0.50–$3.00 per unit",
                  description:
                    "The workhorse of packaging. Corrugated board consists of a fluted inner layer sandwiched between flat liner boards. Available in single-wall, double-wall, and triple-wall. Highly customizable with printing, die-cutting, and coatings. Best for shipping boxes, mailer boxes, and product boxes for heavier items.",
                  pros: "Cost-effective, recyclable, excellent protection, customizable",
                  cons: "Not moisture-resistant, limited print quality vs. folding carton",
                },
                {
                  material: "Folding Cartons (Paperboard)",
                  cost: "$0.30–$2.00 per unit",
                  description:
                    "Thin, single-layer cardboard used for retail packaging. Think cereal boxes, cosmetic packaging, and small electronics boxes. Folding cartons offer excellent print quality with vibrant colors, foil stamping, embossing, and spot UV effects. They are shipped flat and assembled at the factory.",
                  pros: "Excellent print quality, lightweight, premium feel, recyclable",
                  cons: "Less protective than corrugated, not suitable for heavy items",
                },
                {
                  material: "Rigid Boxes",
                  cost: "$2.00–$10.00 per unit",
                  description:
                    "Non-collapsible boxes wrapped in printed paper or specialty material. Think Apple iPhone boxes, luxury perfume packaging, or premium gift boxes. Rigid boxes signal quality and justify premium pricing. They are the most expensive option but create the strongest unboxing impression.",
                  pros: "Premium look and feel, excellent protection, strong shelf presence",
                  cons: "Expensive, heavy, higher shipping volume (cannot ship flat)",
                },
                {
                  material: "Flexible Packaging (Pouches/Bags)",
                  cost: "$0.10–$1.00 per unit",
                  description:
                    "Stand-up pouches, poly bags, ziplock bags, and other flexible formats. Increasingly popular for supplements, food products, small accessories, and apparel. Available with barrier films for moisture and oxygen protection. Printed pouches can look surprisingly premium.",
                  pros: "Lowest cost, lightweight, space-efficient, resealable options",
                  cons: "Limited protection for fragile items, less premium perception",
                },
                {
                  material: "Inserts & Fitments",
                  cost: "$0.10–$1.00 per unit",
                  description:
                    "Internal packaging that holds the product in place within the box. Options include molded pulp (eco-friendly), EVA foam (protective), vacuum-formed plastic trays (precise fit), and die-cut cardboard inserts (cost-effective). The insert is critical for the unboxing experience and product protection.",
                  pros: "Product protection, premium presentation, prevents movement",
                  cons: "Adds cost and complexity, requires tooling for molded options",
                },
              ].map((item) => (
                <div
                  key={item.material}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {item.material}
                    </h3>
                    <span className="text-sm font-semibold text-[#FF6B35] ml-4 whitespace-nowrap">
                      {item.cost}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Pros: </span>
                      <span className="text-[#6B6B6B]">{item.pros}</span>
                    </div>
                    <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Cons: </span>
                      <span className="text-[#6B6B6B]">{item.cons}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Designing for Manufacturing */}
          <section id="designing">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Designing for Manufacturing
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Packaging design for manufacturing is different from graphic
                design. Your beautiful Photoshop mockup needs to become a
                physical object produced on industrial printing and die-cutting
                equipment. Understanding the manufacturing constraints ensures
                your design translates cleanly to production.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Key Design Specifications
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  {
                    spec: "Dieline",
                    detail:
                      "A vector template showing all cut, fold, and glue lines of your packaging laid flat. Your packaging supplier provides the dieline; your designer places artwork onto it. Always get the dieline from your specific supplier — dimensions vary by machinery.",
                  },
                  {
                    spec: "Bleed & Safe Zone",
                    detail:
                      "Bleed: extend artwork 3mm beyond the cut line to prevent white edges. Safe zone: keep critical text and logos 5mm inside the fold/cut lines. These tolerances account for cutting variation in production.",
                  },
                  {
                    spec: "Color (Pantone Matching)",
                    detail:
                      "For brand consistency, specify colors using Pantone (PMS) numbers, not CMYK values. CMYK printing can vary between runs. Pantone inks are pre-mixed to an exact formula. Request a Pantone color bridge swatch book to see how your PMS colors convert to CMYK.",
                  },
                  {
                    spec: "Resolution",
                    detail:
                      "All images must be 300 DPI at actual print size. Web images (72 DPI) will appear blurry and pixelated when printed. Vector graphics (AI, EPS, SVG) are preferred for logos and text — they scale to any size without quality loss.",
                  },
                  {
                    spec: "File Format",
                    detail:
                      "Submit print-ready files as PDF/X-1a or Adobe Illustrator (.ai) with all fonts outlined (converted to shapes). Include a separate file with live text for reference. Embed or link all images. Include the Pantone color callouts.",
                  },
                  {
                    spec: "Barcode Placement",
                    detail:
                      "UPC/EAN barcodes need a minimum quiet zone (white space) of 2.5mm on each side and 5mm top and bottom. Place on a white or very light background. Test scannability before production. Incorrect barcodes can result in products being rejected by retailers.",
                  },
                ].map((item) => (
                  <div
                    key={item.spec}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <p className="font-medium text-[#1A1A1A]">{item.spec}</p>
                    <p className="text-[#6B6B6B] mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Before committing to a full production run, always request a
                physical proof (also called a pre-production sample or white
                proof). This is a single printed and assembled sample of your
                packaging. Check color accuracy, structural integrity, fit with
                your product, and print quality. Proofs typically cost $50-$200
                and take 5-10 days. Never skip this step.
              </p>
            </div>
          </section>

          {/* Printing Methods */}
          <section id="printing">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Printing Methods
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                The printing method you choose affects cost, quality, lead time,
                and minimum order quantities. Here are the primary methods used
                in packaging production.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  method: "Offset Lithography",
                  bestFor: "5,000+ units",
                  description:
                    "The industry standard for high-quality packaging printing. Ink is transferred from plates to a rubber blanket to the substrate. Produces sharp, vibrant images with consistent color across large runs. Setup involves creating printing plates ($200-$500 per color), so the per-unit cost drops significantly at higher volumes.",
                  unitCost: "$0.05–$0.30/unit at volume",
                  quality: "Highest",
                },
                {
                  method: "Digital Printing",
                  bestFor: "50–5,000 units",
                  description:
                    "No plates required — the file goes directly from computer to printer. Ideal for short runs, prototyping, variable data (different designs in one run), and testing packaging concepts. Quality has improved dramatically and is now near-offset for most applications. No setup costs but higher per-unit cost.",
                  unitCost: "$0.30–$2.00/unit",
                  quality: "High (near-offset)",
                },
                {
                  method: "Flexography",
                  bestFor: "10,000+ units",
                  description:
                    "Uses flexible relief plates to print on a variety of substrates including corrugated cardboard, flexible packaging, and labels. Flexo is the most common method for printing on corrugated boxes and flexible pouches. Quality is good but not as sharp as offset for detailed images.",
                  unitCost: "$0.02–$0.15/unit at volume",
                  quality: "Good",
                },
                {
                  method: "Screen Printing",
                  bestFor: "Specialty applications",
                  description:
                    "Ink is pushed through a mesh screen onto the substrate. Produces thick, opaque ink layers that are tactile and vibrant. Best for specialty effects like metallic inks, textures, and printing on unusual surfaces (wood, fabric, glass). Not suitable for detailed photographic images.",
                  unitCost: "$0.10–$0.50/unit",
                  quality: "Specialty",
                },
                {
                  method: "Hot Stamping / Foil",
                  bestFor: "Premium accent",
                  description:
                    "A heated die presses metallic or colored foil onto the packaging surface. Creates a shiny, reflective accent that catches the eye. Available in gold, silver, holographic, and custom colors. Used for logos, product names, and decorative elements on premium packaging.",
                  unitCost: "$0.05–$0.20/unit additional",
                  quality: "Premium accent",
                },
              ].map((item) => (
                <div
                  key={item.method}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {item.method}
                    </h3>
                    <span className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-3 py-1 rounded-full whitespace-nowrap ml-3">
                      Best for {item.bestFor}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Unit cost: </span>
                      <span className="text-[#6B6B6B]">{item.unitCost}</span>
                    </div>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Quality: </span>
                      <span className="text-[#6B6B6B]">{item.quality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sustainable Options */}
          <section id="sustainable">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Sustainable Packaging Options
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Sustainability is no longer just a nice-to-have — it is
                increasingly a customer expectation and a regulatory
                requirement. The EU is implementing Extended Producer
                Responsibility (EPR) regulations that charge fees based on
                packaging recyclability. Amazon has its &quot;Frustration-Free
                Packaging&quot; and &quot;Ships in Own Container&quot; programs
                that reward sustainable packaging with fee reductions and
                visibility boosts.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Sustainable Materials & Alternatives
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { option: "Recycled cardboard (PCW)", detail: "Post-consumer waste recycled board. Available in various grades. Slight color/texture variation adds an eco-friendly aesthetic. 10-20% more expensive than virgin board.", premium: "+10–20%" },
                  { option: "Molded pulp inserts", detail: "Replaces plastic inserts and foam. Made from recycled paper pulp. Fully biodegradable and recyclable. Common in electronics (Apple uses these). Tooling: $2,000-$5,000.", premium: "+5–15%" },
                  { option: "Soy-based inks", detail: "Petroleum-free inks made from soybean oil. Easier to de-ink during recycling. Comparable print quality to conventional inks. Minimal cost premium.", premium: "+0–5%" },
                  { option: "Water-based coatings", detail: "Replace petroleum-based lamination and varnish. Fully recyclable. Slightly less glossy than traditional lamination but acceptable for most applications.", premium: "+0–5%" },
                  { option: "Compostable poly bags", detail: "PLA or PBAT-based bags that decompose in commercial composting facilities. Replace traditional poly bags for lightweight products. Limited shelf life (12-18 months).", premium: "+50–100%" },
                  { option: "FSC-certified paper", detail: "Paper sourced from responsibly managed forests. FSC certification is widely recognized and adds credibility to sustainability claims. Audit required for supply chain.", premium: "+5–15%" },
                ].map((item) => (
                  <div
                    key={item.option}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-[#1A1A1A]">{item.option}</span>
                      <span className="text-[#FF6B35] font-semibold ml-4 whitespace-nowrap">
                        {item.premium}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section id="cost-breakdown">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Cost Breakdown
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Packaging cost is typically 5-15% of your total product cost for
                standard packaging, or 15-30% for premium packaging. Here is a
                detailed breakdown of what drives packaging costs and how to
                budget accurately.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Example: Packaging Cost for a Consumer Electronics Product
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { component: "Folding carton box (printed, matte lamination)", cost: "$0.80–$1.50" },
                  { component: "EVA foam insert (die-cut)", cost: "$0.30–$0.60" },
                  { component: "Printed quick-start guide", cost: "$0.05–$0.15" },
                  { component: "Thank-you card / warranty card", cost: "$0.03–$0.08" },
                  { component: "Poly bag (inner protection)", cost: "$0.02–$0.05" },
                  { component: "Stickers / seals", cost: "$0.02–$0.05" },
                  { component: "Master carton (export)", cost: "$0.15–$0.30" },
                  { component: "Total packaging per unit", cost: "$1.37–$2.73" },
                ].map((item) => (
                  <div
                    key={item.component}
                    className="flex justify-between items-center py-2 border-b border-[#E8E8E4] last:border-0"
                  >
                    <span className="text-[#1A1A1A] font-medium">{item.component}</span>
                    <span className="text-[#FF6B35] font-semibold ml-4 whitespace-nowrap">
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                One-Time Setup Costs
              </p>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Beyond per-unit costs, budget for these one-time expenses:
              </p>
              <ul className="text-sm text-[#6B6B6B] space-y-1 list-disc pl-5">
                <li>Packaging design (freelancer): $500–$2,000</li>
                <li>Packaging design (agency): $2,000–$10,000</li>
                <li>Printing plates (offset): $200–$500 per color</li>
                <li>Die-cutting tooling: $200–$800</li>
                <li>Foam/pulp insert mold: $2,000–$5,000</li>
                <li>Physical proofs/samples: $50–$200</li>
              </ul>
            </div>
          </section>

          {/* MOQs & Lead Times */}
          <section id="moq-leadtimes">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              MOQs &amp; Lead Times
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Packaging lead times are often the bottleneck in your production
                schedule. Packaging must be ordered and delivered to the product
                factory before assembly begins. Plan your packaging timeline
                alongside your production timeline, not after it.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Packaging Type</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Typical MOQ</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Lead Time</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Reorder Lead</th>
                  </tr>
                </thead>
                <tbody className="text-[#6B6B6B]">
                  {[
                    { type: "Corrugated boxes (custom print)", moq: "500–1,000", lead: "3–4 weeks", reorder: "2–3 weeks" },
                    { type: "Folding cartons (offset)", moq: "3,000–5,000", lead: "4–6 weeks", reorder: "2–3 weeks" },
                    { type: "Folding cartons (digital)", moq: "100–500", lead: "2–3 weeks", reorder: "1–2 weeks" },
                    { type: "Rigid boxes", moq: "500–1,000", lead: "4–8 weeks", reorder: "3–4 weeks" },
                    { type: "Flexible pouches", moq: "5,000–10,000", lead: "4–6 weeks", reorder: "3–4 weeks" },
                    { type: "Foam inserts", moq: "500–1,000", lead: "3–5 weeks", reorder: "2–3 weeks" },
                    { type: "Molded pulp inserts", moq: "3,000–5,000", lead: "6–8 weeks", reorder: "3–4 weeks" },
                    { type: "Printed poly bags", moq: "5,000–10,000", lead: "3–4 weeks", reorder: "2–3 weeks" },
                  ].map((row) => (
                    <tr key={row.type} className="border-b border-[#E8E8E4] last:border-0">
                      <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{row.type}</td>
                      <td className="py-3 pr-4">{row.moq}</td>
                      <td className="py-3 pr-4">{row.lead}</td>
                      <td className="py-3">{row.reorder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Order packaging 2-3 weeks before your product production is
                complete. Packaging should arrive at the assembly factory with
                buffer time. If packaging is delayed, your entire production
                schedule slips. For your first order, add an extra week of
                buffer for potential revisions and shipping delays.
              </p>
            </div>
          </section>

          {/* Working with Suppliers */}
          <section id="suppliers">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Working with Packaging Suppliers
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Many product factories offer packaging as a bundled service.
                This is convenient but often results in generic, low-quality
                packaging. For a premium brand, consider working with a
                dedicated packaging supplier who specializes in your packaging
                type.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Finding Packaging Suppliers
              </h3>
              <ul className="space-y-3 text-sm text-[#6B6B6B]">
                <li className="flex gap-3">
                  <span className="text-[#FF6B35] font-bold">1.</span>
                  <span>
                    <strong className="text-[#1A1A1A]">Your product factory:</strong> Ask if they have an
                    in-house packaging team or a preferred packaging supplier. This is the simplest
                    option and eliminates the need to ship packaging separately.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF6B35] font-bold">2.</span>
                  <span>
                    <strong className="text-[#1A1A1A]">Alibaba/Global Sources:</strong> Search for packaging
                    suppliers specializing in your packaging type. Look for &quot;gold
                    supplier&quot; status, trade assurance, and a portfolio of work
                    similar to what you need.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF6B35] font-bold">3.</span>
                  <span>
                    <strong className="text-[#1A1A1A]">Local packaging companies:</strong> For smaller runs
                    or US-based packaging, companies like Packlane, Arka, or
                    PakFactory offer online ordering with lower MOQs (as low as
                    10-50 units) at premium pricing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF6B35] font-bold">4.</span>
                  <span>
                    <strong className="text-[#1A1A1A]">Packaging brokers:</strong> Brokers manage the
                    relationship with overseas packaging factories and handle
                    logistics. They add 10-20% to the cost but reduce your
                    management burden significantly.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Common Mistakes */}
          <section id="mistakes">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Common Packaging Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                These are the most expensive packaging mistakes founders make.
                Each one is easily avoidable with planning.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  mistake: "Designing packaging before finalizing the product",
                  consequence: "Product dimensions change, packaging does not fit, you waste the entire packaging order.",
                  fix: "Finalize product dimensions and confirm with production samples before ordering packaging. Leave 2-3mm tolerance for variation.",
                },
                {
                  mistake: "Not testing packaging for shipping durability",
                  consequence: "Products arrive damaged. High return rates. Negative reviews. Amazon can suppress listings for excessive damage returns.",
                  fix: "Perform ISTA 6-Amazon or ISTA 3A transit testing. At minimum, drop-test your packaged product from 76cm onto each face, edge, and corner.",
                },
                {
                  mistake: "Ignoring Amazon packaging requirements",
                  consequence: "Products rejected at FBA, sent back at your expense, or charged prep fees ($1.00-$2.20/unit for Amazon to repackage).",
                  fix: "Review Amazon's packaging certification guidelines. Products must be scannable, arrive undamaged, and be packaged so they can be shipped without additional Amazon packaging.",
                },
                {
                  mistake: "Overengineering packaging for the first order",
                  consequence: "Spending $5,000+ on premium rigid boxes and custom inserts for a product that has not been market-validated. Budget blown before you have revenue.",
                  fix: "Start with quality but cost-effective packaging. Upgrade once you have product-market fit and consistent sales. A clean folding carton is perfectly acceptable for launch.",
                },
                {
                  mistake: "Forgetting regulatory requirements on packaging",
                  consequence: "Missing UPC codes, safety warnings, country of origin, or material composition disclosures. Products cannot be sold in retail or may violate regulations.",
                  fix: "Research all labeling requirements for your target markets before design. Include: UPC/EAN, country of origin, safety warnings, material disclosures, recycling symbols, and age warnings where applicable.",
                },
                {
                  mistake: "Not accounting for packaging in landed cost",
                  consequence: "Packaging adds volume and weight, increasing shipping costs. A rigid box that is 3x the size of a folding carton can double your per-unit freight cost.",
                  fix: "Calculate packaging dimensional weight impact on shipping before committing to a packaging format. Smaller, lighter packaging almost always saves money overall.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {item.mistake}
                  </h3>
                  <p className="text-sm text-red-600 mb-2">
                    {item.consequence}
                  </p>
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
                    <p className="text-sm text-[#6B6B6B]">
                      <span className="font-medium text-[#1A1A1A]">Fix: </span>
                      {item.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to bring your product to market?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Get a Bottlecap feasibility report with manufacturing cost
              estimates, packaging recommendations, and supplier guidance
              tailored to your specific product — so you can launch with
              confidence.
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
