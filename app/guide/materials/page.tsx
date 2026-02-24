import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Materials Selection Guide for Product Manufacturing — Bottlecap",
  description:
    "Complete guide to manufacturing materials — metals, plastics, natural materials, and composites. Understand properties, costs, and best uses for every material.",
}

export default function MaterialsGuidePage() {
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
          <span className="text-[#1A1A1A]">Materials Guide</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Materials Selection Guide
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            The materials you choose define your product&apos;s quality, cost,
            durability, weight, and environmental impact. This guide covers
            every major material category used in product manufacturing, with
            properties, cost ranges, and practical guidance for choosing the
            right material for your product.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            Table of Contents
          </h2>
          <nav className="space-y-2">
            <a
              href="#why-materials-matter"
              className="block text-[#FF6B35] hover:underline"
            >
              Why Materials Matter
            </a>
            <a
              href="#metals"
              className="block text-[#FF6B35] hover:underline"
            >
              Metals
            </a>
            <a
              href="#plastics"
              className="block text-[#FF6B35] hover:underline"
            >
              Plastics
            </a>
            <a
              href="#natural-materials"
              className="block text-[#FF6B35] hover:underline"
            >
              Natural Materials
            </a>
            <a
              href="#composites"
              className="block text-[#FF6B35] hover:underline"
            >
              Composites &amp; Advanced Materials
            </a>
            <a
              href="#selection-matrix"
              className="block text-[#FF6B35] hover:underline"
            >
              Material Selection Matrix
            </a>
            <a
              href="#sustainability"
              className="block text-[#FF6B35] hover:underline"
            >
              Sustainability Considerations
            </a>
          </nav>
        </div>

        {/* Content */}
        <article className="space-y-16">
          {/* Why Materials Matter */}
          <section id="why-materials-matter">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Why Materials Matter
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Material selection is one of the earliest and most consequential
                decisions in product development. The material you choose
                determines not just how your product looks and feels, but also
                how it is manufactured, how much it costs, how long it lasts,
                and how it impacts the environment. Changing materials late in
                the development process is expensive and time-consuming, which
                is why getting this decision right early matters so much.
              </p>
              <p>
                Every material involves trade-offs. Stainless steel is durable
                and premium-feeling but heavy and expensive to machine.
                Aluminum is lightweight and recyclable but scratches easily.
                ABS plastic is cheap and versatile but not biodegradable.
                Understanding these trade-offs allows you to make informed
                choices that align with your product&apos;s requirements,
                target price, and brand positioning.
              </p>
              <p>
                Material costs can represent 30-60% of your total manufacturing
                cost, so selecting the right material — and the right grade of
                that material — has a direct impact on your margins. In many
                cases, a slightly different alloy or plastic grade can deliver
                the performance you need at a significantly lower cost.
              </p>
            </div>
          </section>

          {/* Metals */}
          <section id="metals">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Metals
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Metals are used in products ranging from kitchenware and tools to
              electronics enclosures and structural components. Each metal has
              distinct properties that make it suitable for different
              applications.
            </p>

            <div className="space-y-8">
              {/* Stainless Steel */}
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  Stainless Steel
                </h3>
                <div className="space-y-3 text-[#6B6B6B] leading-relaxed">
                  <p>
                    Stainless steel is an alloy of iron, chromium (at least
                    10.5%), and often nickel. It is prized for its corrosion
                    resistance, strength, and premium appearance. The most
                    common grades in consumer products are 304 (18/8 — 18%
                    chromium, 8% nickel), which is the general-purpose food-safe
                    grade; and 316 (marine grade), which offers superior
                    corrosion resistance for harsh environments, medical devices,
                    and outdoor products.
                  </p>
                  <p>
                    Grade 201 is a lower-cost alternative that substitutes some
                    nickel with manganese, offering good corrosion resistance
                    at 20-30% lower cost, though it is slightly less durable.
                    For structural applications, 430 stainless (ferritic) offers
                    good strength at a lower price point but with less
                    corrosion resistance than 304.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Properties
                      </p>
                      <p className="text-sm">
                        Corrosion resistant, strong, food-safe, recyclable,
                        premium feel
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Cost Range
                      </p>
                      <p className="text-sm">$2,500-4,500/ton (raw)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Best Uses
                      </p>
                      <p className="text-sm">
                        Water bottles, cookware, medical devices, outdoor gear,
                        hardware
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aluminum */}
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  Aluminum
                </h3>
                <div className="space-y-3 text-[#6B6B6B] leading-relaxed">
                  <p>
                    Aluminum is the most widely used non-ferrous metal in
                    manufacturing. It is approximately one-third the weight of
                    steel, naturally corrosion resistant (thanks to its oxide
                    layer), and highly machinable. The most common alloys are
                    6061 (structural, good machinability, widely available),
                    6063 (excellent for extrusions and anodizing), and 7075
                    (aerospace-grade, extremely strong but more expensive).
                  </p>
                  <p>
                    Aluminum can be die cast, extruded, CNC machined, or sheet
                    formed, making it versatile for many product types. It
                    accepts anodizing exceptionally well, allowing for durable
                    colored finishes. Aluminum is 100% recyclable without loss
                    of properties, making it a strong choice for sustainability-conscious brands.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Properties
                      </p>
                      <p className="text-sm">
                        Lightweight, corrosion resistant, machinable,
                        anodizable, recyclable
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Cost Range
                      </p>
                      <p className="text-sm">$2,200-3,500/ton (raw)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Best Uses
                      </p>
                      <p className="text-sm">
                        Electronics enclosures, laptop bodies, bike frames,
                        heat sinks, packaging
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carbon Steel */}
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  Carbon Steel
                </h3>
                <div className="space-y-3 text-[#6B6B6B] leading-relaxed">
                  <p>
                    Carbon steel is the most common and affordable type of
                    steel, composed of iron and 0.05-2.0% carbon. Low carbon
                    steel (mild steel, under 0.3% carbon) is easy to form
                    and weld, making it ideal for structural components,
                    brackets, and frames. Medium carbon steel (0.3-0.6%) offers
                    better strength and is used for gears, axles, and tools.
                    High carbon steel (0.6-2.0%) is very hard and is used for
                    cutting tools, springs, and knives.
                  </p>
                  <p>
                    Carbon steel is significantly cheaper than stainless steel
                    but requires surface treatment (painting, powder coating,
                    galvanizing, or plating) to prevent rust. For products
                    where corrosion is not a concern or where a protective
                    finish is applied, carbon steel is often the most
                    cost-effective metal choice.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Properties
                      </p>
                      <p className="text-sm">
                        Strong, affordable, weldable, requires coating
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Cost Range
                      </p>
                      <p className="text-sm">$600-1,200/ton (raw)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Best Uses
                      </p>
                      <p className="text-sm">
                        Frames, brackets, tools, automotive parts, furniture
                        structure
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brass & Copper */}
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  Brass &amp; Copper
                </h3>
                <div className="space-y-3 text-[#6B6B6B] leading-relaxed">
                  <p>
                    Brass (copper-zinc alloy) and copper are valued for their
                    excellent machinability, antimicrobial properties, electrical
                    conductivity, and warm golden or rose-gold appearance. Brass
                    is commonly used for fittings, valves, decorative hardware,
                    musical instruments, and zippers. Copper is primarily used
                    for electrical wiring, heat exchangers, and plumbing, but
                    also increasingly in antimicrobial surfaces for healthcare
                    and public spaces.
                  </p>
                  <p>
                    Both materials are more expensive than steel or aluminum
                    but offer unique properties that justify the premium in
                    the right applications. They are both highly recyclable
                    and develop an attractive patina over time, which can be
                    a desirable feature for premium consumer goods.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Properties
                      </p>
                      <p className="text-sm">
                        Antimicrobial, conductive, machinable, decorative,
                        develops patina
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Cost Range
                      </p>
                      <p className="text-sm">
                        Brass: $4,000-6,000/ton; Copper: $8,000-10,000/ton
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Best Uses
                      </p>
                      <p className="text-sm">
                        Hardware, fittings, electrical components, decorative
                        items, zippers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Plastics */}
          <section id="plastics">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Plastics
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Plastics are the most versatile and widely used materials in
              consumer product manufacturing. They can be injection molded,
              blow molded, thermoformed, extruded, and 3D printed into
              virtually any shape. Understanding the properties of different
              plastic types is essential for choosing the right one.
            </p>

            <div className="space-y-6">
              {[
                {
                  name: "ABS (Acrylonitrile Butadiene Styrene)",
                  description:
                    "The most popular engineering plastic for consumer products. ABS offers a good balance of strength, impact resistance, and surface quality. It is easy to injection mold, paint, and glue. It is the standard material for electronics enclosures, toys (LEGO bricks are ABS), automotive interior parts, and appliance housings.",
                  properties: "Impact resistant, rigid, good surface finish, paintable, easy to mold",
                  cost: "$1,200-1,800/ton",
                  uses: "Electronics housings, toys, appliances, automotive interiors, tool handles",
                },
                {
                  name: "PC (Polycarbonate)",
                  description:
                    "Polycarbonate is a transparent, extremely impact-resistant thermoplastic. It is virtually unbreakable — up to 250 times stronger than glass — and offers excellent optical clarity. PC is used for safety glasses, phone cases, headlight lenses, and transparent enclosures. It can be injection molded, thermoformed, and CNC machined.",
                  properties: "Transparent, extremely impact resistant, heat resistant, optically clear",
                  cost: "$2,500-3,500/ton",
                  uses: "Safety glasses, phone cases, headlight lenses, transparent covers, medical devices",
                },
                {
                  name: "PP (Polypropylene)",
                  description:
                    "Polypropylene is one of the most widely used plastics globally, valued for its chemical resistance, flexibility, and low cost. It has a living hinge property — it can be bent repeatedly without breaking — making it ideal for flip-top caps and snap closures. PP is food-safe and used extensively in food containers, medical packaging, and automotive components.",
                  properties: "Chemical resistant, flexible, food-safe, living hinge capability, low cost",
                  cost: "$1,000-1,400/ton",
                  uses: "Food containers, bottle caps, automotive parts, packaging, medical containers",
                },
                {
                  name: "HDPE (High-Density Polyethylene)",
                  description:
                    "HDPE is a strong, lightweight plastic with excellent chemical resistance. It is one of the easiest plastics to recycle (recycling code #2) and is used for bottles, containers, pipes, and outdoor furniture. HDPE is UV resistant and performs well in outdoor applications.",
                  properties: "Chemical resistant, UV resistant, recyclable, lightweight, food-safe",
                  cost: "$1,100-1,500/ton",
                  uses: "Bottles, containers, cutting boards, pipes, outdoor furniture, trash cans",
                },
                {
                  name: "PET (Polyethylene Terephthalate)",
                  description:
                    "PET is the clear, strong plastic used for water bottles, food packaging, and polyester fibers. It offers excellent clarity, is lightweight, and is one of the most recyclable plastics (recycling code #1). PET is food-safe, shatterproof, and has good barrier properties against gas and moisture.",
                  properties: "Clear, strong, food-safe, highly recyclable, good gas barrier",
                  cost: "$1,000-1,500/ton",
                  uses: "Water bottles, food packaging, thermoformed containers, polyester textiles",
                },
                {
                  name: "Nylon (Polyamide / PA)",
                  description:
                    "Nylon is an engineering thermoplastic with excellent mechanical strength, abrasion resistance, and chemical resistance. It is commonly used for gears, bearings, fasteners, cable ties, and structural components. Glass-filled nylon (PA66-GF30) is a popular choice for high-strength applications where metal replacement is desired.",
                  properties: "Strong, abrasion resistant, self-lubricating, heat resistant, chemical resistant",
                  cost: "$2,000-3,500/ton",
                  uses: "Gears, bearings, cable ties, fasteners, structural parts, power tool housings",
                },
                {
                  name: "Silicone",
                  description:
                    "Silicone is a flexible, heat-resistant elastomer with excellent biocompatibility. It maintains its properties from -60 C to +230 C, making it ideal for kitchen utensils, baby products, medical devices, and seals. Liquid silicone rubber (LSR) is injection molded for high-volume production, while solid silicone rubber (HTV) is compression molded for lower volumes.",
                  properties: "Heat resistant, flexible, food-safe, biocompatible, waterproof",
                  cost: "$4,000-8,000/ton",
                  uses: "Kitchen utensils, baby products, seals/gaskets, medical devices, wearables",
                },
                {
                  name: "TPU (Thermoplastic Polyurethane)",
                  description:
                    "TPU is a flexible, rubber-like plastic that bridges the gap between rigid plastics and soft silicone. It offers excellent abrasion resistance, tear strength, and elasticity. TPU is used for phone cases, shoe soles, sports equipment, cable jackets, and protective covers. It can be injection molded, extruded, and 3D printed.",
                  properties: "Flexible, abrasion resistant, elastic, oil resistant, tear resistant",
                  cost: "$3,000-5,000/ton",
                  uses: "Phone cases, shoe soles, watch bands, cable jackets, protective equipment",
                },
                {
                  name: "Acrylic (PMMA)",
                  description:
                    "Acrylic (polymethyl methacrylate) is a transparent thermoplastic often used as a lightweight, shatter-resistant alternative to glass. It transmits up to 92% of visible light — better clarity than glass — and is 50% lighter. Acrylic can be laser cut, CNC machined, thermoformed, and polished to a crystal-clear finish.",
                  properties: "Optically clear, UV resistant, lightweight, shatter resistant, easy to fabricate",
                  cost: "$2,000-3,000/ton",
                  uses: "Displays, signage, light fixtures, aquariums, protective barriers, point-of-sale",
                },
              ].map((plastic) => (
                <div
                  key={plastic.name}
                  className="bg-white rounded-xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {plastic.name}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                    {plastic.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">
                        Properties
                      </p>
                      <p className="text-[#6B6B6B]">{plastic.properties}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">
                        Cost Range
                      </p>
                      <p className="text-[#6B6B6B]">{plastic.cost}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                      <p className="text-[#6B6B6B]">{plastic.uses}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Natural Materials */}
          <section id="natural-materials">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Natural Materials
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Natural materials offer unique aesthetic qualities, sustainability
              benefits, and tactile warmth that synthetic materials cannot
              replicate. They are increasingly popular as consumers seek
              eco-friendly alternatives.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Wood
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Wood remains one of the most versatile natural materials.
                  Common species for manufacturing include walnut (premium,
                  dark, strong), maple (light, hard, food-safe), beech
                  (affordable, workable, good for CNC), oak (durable, classic
                  grain), and pine (budget-friendly, lightweight). Wood can be
                  CNC machined, laser cut, turned, and hand-finished. It
                  requires sealing or coating for moisture protection. FSC
                  certification ensures sustainable sourcing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Warm aesthetic, renewable, workable, biodegradable
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">
                      $500-$3,000/m3 depending on species
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Furniture, kitchenware, toys, phone cases, decor, handles
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Bamboo
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Bamboo is one of the fastest-growing plants on Earth,
                  making it an exceptionally sustainable material. It is
                  harder than most hardwoods, naturally antibacterial, and
                  has a distinctive grain pattern. Bamboo is processed into
                  sheets, fibers, and composites for a wide range of products.
                  Moso bamboo is the most common species used in
                  manufacturing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Sustainable, strong, antibacterial, lightweight, fast-growing
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">$400-$1,200/m3</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Utensils, cutting boards, sunglasses, toothbrushes,
                      packaging
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Cork
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Cork is harvested from the bark of cork oak trees without
                  harming the tree, making it one of the most sustainable
                  materials available. It is lightweight, waterproof, fire
                  resistant, and has excellent insulation properties. Cork is
                  increasingly used in fashion accessories, home goods, and
                  packaging as an eco-friendly alternative to leather and
                  synthetic materials.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Sustainable, waterproof, lightweight, insulating,
                      fire resistant
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">$8-20/kg processed</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Wallets, bags, coasters, flooring, yoga blocks, wine
                      stoppers
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Cotton &amp; Textiles
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Cotton is the most widely used natural fiber in textile
                  manufacturing. Organic cotton (grown without synthetic
                  pesticides) commands a premium but appeals to eco-conscious
                  consumers. Other natural textiles include linen (from flax,
                  durable and breathable), hemp (strong, sustainable, fast-growing),
                  and wool (insulating, moisture-wicking, naturally
                  flame-retardant). Textile manufacturing is centered in
                  China, India, Vietnam, Bangladesh, and Turkey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Breathable, soft, biodegradable, dyeable, versatile
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">
                      $1.50-4.00/kg (conventional); $3-7/kg (organic)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Apparel, bags, home textiles, packaging, accessories
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Leather
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Genuine leather is a byproduct of the meat industry and
                  offers unmatched durability, texture, and patina
                  development over time. Full-grain leather (highest quality,
                  no surface alteration) is used for premium goods, while
                  top-grain and corrected-grain leathers are more affordable
                  alternatives. Vegan leather alternatives (PU, mushroom
                  leather, cactus leather, apple leather) are growing rapidly
                  as consumers seek animal-free options.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Durable, premium feel, develops patina, breathable
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">
                      $5-25/sq ft (genuine); $2-8/sq ft (vegan)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Bags, wallets, belts, shoes, watch bands, furniture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Composites */}
          <section id="composites">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Composites &amp; Advanced Materials
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Composite materials combine two or more materials to achieve
              properties that neither material offers alone. They are
              increasingly used in premium and performance-oriented products.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Carbon Fiber
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Carbon fiber reinforced polymer (CFRP) offers an extraordinary
                  strength-to-weight ratio — five times stronger than steel
                  at one-fifth the weight. It is used in aerospace, automotive,
                  sports equipment, and premium consumer goods. Carbon fiber
                  products are typically made using layup (hand or automated),
                  resin transfer molding, or filament winding. The material
                  commands a premium price, but its lightweight strength is
                  unmatched.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Extremely strong, very lightweight, stiff, corrosion
                      resistant
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">$15-30/kg (raw fiber)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Bike frames, drone bodies, laptop shells, sports gear,
                      automotive
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Fiberglass (GRP / FRP)
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Fiberglass (glass fiber reinforced polymer) is the more
                  affordable cousin of carbon fiber. It offers good strength,
                  corrosion resistance, and electrical insulation at a
                  fraction of the cost. Fiberglass is widely used in boats,
                  automotive body panels, bathtubs, storage tanks, and
                  architectural elements. It can be molded into complex shapes
                  and is easier to repair than carbon fiber.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Strong, lightweight, corrosion resistant, insulating,
                      moldable
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">$2-5/kg (raw fiber)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Boats, automotive panels, tanks, architectural elements,
                      sporting goods
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Ceramic
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                  Technical ceramics (alumina, zirconia, silicon carbide)
                  offer extreme hardness, heat resistance, and chemical
                  inertness. They are used in watch cases (Apple Watch
                  Edition used zirconia ceramic), knife blades, bearings,
                  dental implants, and electronic substrates. Traditional
                  ceramics (porcelain, stoneware) remain essential for
                  tableware, tiles, and decorative items. Ceramic
                  manufacturing requires specialized kilns and expertise.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Properties</p>
                    <p className="text-[#6B6B6B]">
                      Extremely hard, heat resistant, scratch resistant,
                      chemically inert
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Cost Range</p>
                    <p className="text-[#6B6B6B]">
                      $20-100/kg (technical); $1-5/kg (traditional)
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Best Uses</p>
                    <p className="text-[#6B6B6B]">
                      Watch cases, knife blades, tableware, tiles, medical
                      implants
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Selection Matrix */}
          <section id="selection-matrix">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Material Selection Matrix
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Use this comparison table to quickly evaluate materials across
              key criteria. Ratings are relative within each category (Low,
              Medium, High).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="text-left p-3 font-semibold">Material</th>
                    <th className="text-center p-3 font-semibold">Cost</th>
                    <th className="text-center p-3 font-semibold">
                      Durability
                    </th>
                    <th className="text-center p-3 font-semibold">Weight</th>
                    <th className="text-center p-3 font-semibold">
                      Sustainability
                    </th>
                    <th className="text-left p-3 font-semibold">
                      Best Use Case
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      material: "Stainless Steel",
                      cost: "Medium-High",
                      durability: "Very High",
                      weight: "Heavy",
                      sustainability: "High (recyclable)",
                      use: "Food-contact, medical, outdoor",
                    },
                    {
                      material: "Aluminum",
                      cost: "Medium",
                      durability: "High",
                      weight: "Light",
                      sustainability: "Very High (recyclable)",
                      use: "Electronics, lightweight products",
                    },
                    {
                      material: "Carbon Steel",
                      cost: "Low",
                      durability: "High",
                      weight: "Heavy",
                      sustainability: "High (recyclable)",
                      use: "Structural, industrial, tools",
                    },
                    {
                      material: "ABS Plastic",
                      cost: "Low",
                      durability: "Medium",
                      weight: "Light",
                      sustainability: "Low",
                      use: "Consumer electronics, toys",
                    },
                    {
                      material: "Polycarbonate",
                      cost: "Medium",
                      durability: "Very High",
                      weight: "Light",
                      sustainability: "Low",
                      use: "Transparent parts, impact resistance",
                    },
                    {
                      material: "Polypropylene",
                      cost: "Low",
                      durability: "Medium",
                      weight: "Very Light",
                      sustainability: "Medium (recyclable)",
                      use: "Food containers, caps, packaging",
                    },
                    {
                      material: "Silicone",
                      cost: "High",
                      durability: "High",
                      weight: "Light",
                      sustainability: "Medium",
                      use: "Kitchen, baby, medical, seals",
                    },
                    {
                      material: "Wood (Hardwood)",
                      cost: "Medium-High",
                      durability: "Medium",
                      weight: "Medium",
                      sustainability: "High (FSC certified)",
                      use: "Furniture, kitchenware, decor",
                    },
                    {
                      material: "Bamboo",
                      cost: "Low-Medium",
                      durability: "Medium",
                      weight: "Light",
                      sustainability: "Very High",
                      use: "Utensils, packaging, accessories",
                    },
                    {
                      material: "Leather",
                      cost: "High",
                      durability: "Very High",
                      weight: "Medium",
                      sustainability: "Medium",
                      use: "Bags, wallets, premium accessories",
                    },
                    {
                      material: "Carbon Fiber",
                      cost: "Very High",
                      durability: "Very High",
                      weight: "Very Light",
                      sustainability: "Low",
                      use: "Performance, aerospace, premium",
                    },
                    {
                      material: "Ceramic",
                      cost: "Medium-High",
                      durability: "High (scratch)",
                      weight: "Heavy",
                      sustainability: "High",
                      use: "Tableware, premium housings",
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.material}
                      className={`border-b border-[#E8E8E4] ${
                        i % 2 === 1 ? "bg-[#FAFAF8]" : ""
                      }`}
                    >
                      <td className="p-3 font-semibold text-[#1A1A1A]">
                        {row.material}
                      </td>
                      <td className="p-3 text-center text-[#6B6B6B]">
                        {row.cost}
                      </td>
                      <td className="p-3 text-center text-[#6B6B6B]">
                        {row.durability}
                      </td>
                      <td className="p-3 text-center text-[#6B6B6B]">
                        {row.weight}
                      </td>
                      <td className="p-3 text-center text-[#6B6B6B]">
                        {row.sustainability}
                      </td>
                      <td className="p-3 text-[#6B6B6B]">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sustainability */}
          <section id="sustainability">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Sustainability Considerations
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Sustainability is no longer optional for consumer products.
                Customers increasingly expect eco-friendly materials and
                responsible manufacturing practices. Beyond customer demand,
                regulatory requirements around recyclability, chemical safety,
                and environmental impact are tightening globally.
              </p>
              <p>
                Here are the most impactful ways to make your material choices
                more sustainable:
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Choose recyclable materials
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Metals (aluminum, steel) are infinitely recyclable without
                  quality loss. PET and HDPE plastics have established recycling
                  streams. Design your product for easy disassembly so
                  materials can be separated and recycled at end of life.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Use recycled content
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Recycled aluminum uses 95% less energy than virgin aluminum.
                  Recycled PET (rPET) is widely available and increasingly
                  cost-competitive. Post-consumer recycled (PCR) plastics are
                  available for many plastic types, though supply and quality
                  vary.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Explore bio-based alternatives
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  PLA (polylactic acid) is a bio-based plastic derived from
                  corn starch that is compostable in industrial facilities.
                  Mushroom leather (Mylo, Reishi) is emerging as a genuine
                  leather alternative. Seaweed-based packaging is replacing
                  plastic films. These materials are still maturing but
                  represent the future of sustainable manufacturing.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Seek certified materials
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Look for FSC-certified wood, GOTS-certified organic cotton,
                  OEKO-TEX certified textiles, and GRS-certified recycled
                  materials. These certifications provide credible proof of
                  sustainability claims and can be powerful marketing assets.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  Minimize material usage
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  The most sustainable material is less material. Optimize your
                  design to use the minimum material necessary for function
                  and durability. Reduce packaging materials. Consider
                  refillable or modular designs that extend product lifespan
                  and reduce waste.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Not sure which materials are right for your product?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Bottlecap&apos;s AI analysis includes material recommendations
              tailored to your product — with cost estimates, manufacturing
              process suggestions, and sustainability options.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Get material recommendations &rarr;
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
