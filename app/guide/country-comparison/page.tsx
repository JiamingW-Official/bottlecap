import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "Manufacturing Country Comparison: China, Vietnam, India & More — Bottlecap",
  description:
    "Compare 8 top manufacturing countries on cost, quality, lead time, and IP protection. Find the best country to manufacture your product.",
}

export default function CountryComparisonPage() {
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
          <span className="text-[#1A1A1A]">Country Comparison</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            Manufacturing Country Comparison
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            Choosing the right country for manufacturing is one of the most
            important decisions you will make as a product founder. The wrong
            choice can mean higher costs, quality issues, IP theft, or months of
            delays. This guide compares eight of the world&apos;s leading
            manufacturing destinations across every factor that matters.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            Table of Contents
          </h2>
          <nav className="space-y-2">
            <a
              href="#choosing"
              className="block text-[#FF6B35] hover:underline"
            >
              Choosing the Right Manufacturing Country
            </a>
            <a href="#china" className="block text-[#FF6B35] hover:underline">
              China
            </a>
            <a
              href="#vietnam"
              className="block text-[#FF6B35] hover:underline"
            >
              Vietnam
            </a>
            <a href="#india" className="block text-[#FF6B35] hover:underline">
              India
            </a>
            <a href="#mexico" className="block text-[#FF6B35] hover:underline">
              Mexico
            </a>
            <a href="#taiwan" className="block text-[#FF6B35] hover:underline">
              Taiwan
            </a>
            <a
              href="#south-korea"
              className="block text-[#FF6B35] hover:underline"
            >
              South Korea
            </a>
            <a
              href="#thailand"
              className="block text-[#FF6B35] hover:underline"
            >
              Thailand
            </a>
            <a href="#turkey" className="block text-[#FF6B35] hover:underline">
              Turkey
            </a>
            <a
              href="#comparison-table"
              className="block text-[#FF6B35] hover:underline"
            >
              Comparison Summary Table
            </a>
            <a
              href="#how-to-decide"
              className="block text-[#FF6B35] hover:underline"
            >
              How to Decide
            </a>
          </nav>
        </div>

        {/* Content */}
        <article className="space-y-16">
          {/* Intro */}
          <section id="choosing">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Choosing the Right Manufacturing Country
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                There is no single &quot;best&quot; country for manufacturing.
                The right choice depends on your product type, order volume,
                quality requirements, budget, timeline, and tolerance for risk.
                A consumer electronics product with complex PCB assemblies has
                very different needs than a textile product or a simple injection
                molded item.
              </p>
              <p>
                The key factors to evaluate for each country are: cost
                competitiveness (labor rates, material costs, overhead),
                manufacturing capability (technical sophistication, industry
                specialization), quality standards (consistency, QC
                infrastructure), intellectual property protection (legal
                framework, enforcement history), logistics (shipping time to your
                target market, port infrastructure), minimum order quantities
                (flexibility for startups vs. large brands), and communication
                (language, time zones, business culture).
              </p>
              <p>
                Below, we provide a detailed profile for each of eight major
                manufacturing countries. For each, you will find an overview,
                strengths, weaknesses, key statistics, and guidance on when to
                choose that country.
              </p>
            </div>
          </section>

          {/* China */}
          <section id="china">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇨🇳</span>China
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                China remains the world&apos;s largest manufacturing hub,
                responsible for approximately 28-30% of global manufacturing
                output. Its dominance is built on decades of infrastructure
                investment, an enormous skilled labor force, mature supply
                chains, and unmatched production capacity across virtually
                every product category. From electronics and textiles to
                furniture and heavy machinery, China&apos;s manufacturing
                ecosystem is the most complete in the world.
              </p>
              <p>
                Despite rising labor costs and geopolitical tensions, China
                continues to offer the widest range of manufacturing
                capabilities and the deepest supply chains. The country has
                more than 200,000 factories listed on Alibaba alone, and its
                manufacturing clusters (Shenzhen for electronics, Dongguan for
                toys, Yiwu for small commodities) provide specialized expertise
                that is difficult to replicate elsewhere.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Electronics, consumer goods, plastics, metals,
                textiles, complex multi-component products
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Most complete manufacturing ecosystem in the world
                    </li>
                    <li>
                      Unmatched supplier density — easy to find factories for
                      any product type
                    </li>
                    <li>
                      Competitive pricing for medium to high volume orders
                    </li>
                    <li>
                      Advanced capabilities in electronics, CNC, injection
                      molding
                    </li>
                    <li>
                      Excellent infrastructure — ports, roads, logistics
                      networks
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Rising labor costs ($5-8/hr in coastal cities)
                    </li>
                    <li>
                      IP protection concerns — enforcement is improving but
                      still inconsistent
                    </li>
                    <li>
                      US tariffs (up to 25%+) on many product categories
                    </li>
                    <li>
                      Long shipping times to the US (25-35 days by sea)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">30-45 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      500-1,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$5-8/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose China when:
                </strong>{" "}
                You need complex, multi-component products with tight
                tolerances; you want maximum supplier choice and competitive
                pricing at scale; your product involves electronics or advanced
                manufacturing processes; you can manage US tariff implications.
              </p>
            </div>
          </section>

          {/* Vietnam */}
          <section id="vietnam">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇻🇳</span>Vietnam
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Vietnam has emerged as the most popular alternative to China
                for manufacturing, growing its manufacturing output by over 10%
                annually in recent years. The country benefits from low labor
                costs, favorable trade agreements (including CPTPP and EVFTA),
                a young and growing workforce, and strong government support
                for manufacturing investment. Companies like Samsung, Nike,
                and Apple have already shifted significant production to
                Vietnam.
              </p>
              <p>
                Vietnam&apos;s manufacturing sector is particularly strong in
                textiles, footwear, furniture, simple electronics assembly, and
                food processing. While it cannot yet match China&apos;s breadth
                of capabilities, Vietnam is rapidly building expertise and
                infrastructure, especially in the Ho Chi Minh City and Hanoi
                industrial corridors.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Textiles, footwear, furniture, simple electronics
                assembly, food products
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Significantly lower labor costs than China ($2-4/hr)
                    </li>
                    <li>
                      Favorable trade agreements — lower or zero tariffs for
                      many goods
                    </li>
                    <li>Young, motivated, and growing workforce</li>
                    <li>
                      Strong government support and FDI-friendly policies
                    </li>
                    <li>
                      Good port infrastructure in HCMC and Haiphong
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Narrower manufacturing capabilities than China
                    </li>
                    <li>
                      Supply chain less developed — many raw materials still
                      imported from China
                    </li>
                    <li>
                      Limited capacity for high-tech or complex products
                    </li>
                    <li>
                      Infrastructure still developing in some regions
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">35-50 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      500-2,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$2-4/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose Vietnam when:
                </strong>{" "}
                You want lower costs and tariff advantages over China; your
                product is in textiles, footwear, or simple assembly; you
                are looking for a &quot;China+1&quot; diversification strategy;
                you can accept slightly longer lead times.
              </p>
            </div>
          </section>

          {/* India */}
          <section id="india">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇮🇳</span>India
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                India is the world&apos;s fifth-largest economy and a rising
                manufacturing powerhouse, driven by the government&apos;s
                &quot;Make in India&quot; initiative and a massive labor force
                of over 500 million workers. India excels in pharmaceuticals,
                textiles, automotive components, software-hardware integration,
                and chemical manufacturing. Its large English-speaking workforce
                makes communication easier than in many Asian alternatives.
              </p>
              <p>
                India&apos;s manufacturing sector is fragmented and diverse.
                Quality can vary significantly between suppliers, and
                infrastructure challenges (power, roads, ports) remain in
                some regions. However, India&apos;s tech-savvy workforce,
                democratic legal system, and growing manufacturing
                infrastructure make it an increasingly attractive option,
                especially for founders looking to serve the Indian domestic
                market or leverage India&apos;s engineering talent.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Textiles, pharmaceuticals, automotive parts,
                stainless steel products, leather goods
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Very low labor costs ($1.50-3/hr)</li>
                    <li>Large English-speaking workforce</li>
                    <li>
                      Strong in pharmaceuticals, textiles, and metalwork
                    </li>
                    <li>
                      Growing infrastructure investment and government support
                    </li>
                    <li>
                      Better IP protection framework than some Asian
                      alternatives
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Infrastructure gaps — power outages, port congestion
                    </li>
                    <li>
                      Quality consistency can vary widely between suppliers
                    </li>
                    <li>Longer lead times due to logistics challenges</li>
                    <li>Bureaucratic complexity in regulations and customs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">40-60 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      300-1,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$1.50-3/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose India when:
                </strong>{" "}
                You need textiles, pharmaceuticals, or stainless steel products;
                English-language communication is important; you want lower
                costs than China with a large domestic market; you can manage
                longer lead times and quality variability.
              </p>
            </div>
          </section>

          {/* Mexico */}
          <section id="mexico">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇲🇽</span>Mexico
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Mexico is the premier nearshoring destination for US-based
                companies. As a USMCA (formerly NAFTA) member, Mexico offers
                duty-free or reduced-duty access to the US and Canadian
                markets. Its proximity to the US means dramatically shorter
                shipping times — typically 3-7 days by truck, compared to
                25-35 days by sea from Asia. Mexico&apos;s manufacturing
                sector is well-established in automotive, aerospace, medical
                devices, and electronics assembly.
              </p>
              <p>
                The nearshoring trend has accelerated significantly since 2020,
                driven by supply chain disruptions, tariff concerns, and a
                desire for shorter lead times. Major manufacturers including
                Tesla, BMW, and Foxconn have expanded their Mexican operations.
                For US founders, Mexico offers the best combination of cost
                savings and logistical convenience.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Automotive parts, medical devices, electronics
                assembly, packaging, products targeting the US market
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Proximity to the US — 3-7 day shipping by truck
                    </li>
                    <li>
                      USMCA trade agreement — duty-free access to US/Canada
                    </li>
                    <li>
                      Strong automotive and aerospace manufacturing ecosystem
                    </li>
                    <li>Similar time zones to the US for communication</li>
                    <li>Growing pool of skilled manufacturing workers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Higher labor costs than Asia ($3.50-6/hr)
                    </li>
                    <li>
                      Smaller supplier ecosystem than China
                    </li>
                    <li>Security concerns in some regions</li>
                    <li>
                      Limited capabilities for complex electronics
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">15-30 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      500-2,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$3.50-6/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose Mexico when:
                </strong>{" "}
                You sell primarily in the US and need fast shipping; USMCA
                duty savings are important for your margins; you want easy
                factory visits and similar time zones; your product is in
                automotive, medical devices, or assembly-heavy categories.
              </p>
            </div>
          </section>

          {/* Taiwan */}
          <section id="taiwan">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇹🇼</span>Taiwan
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Taiwan is a global leader in high-tech and precision
                manufacturing. The country is home to TSMC (the world&apos;s
                largest semiconductor foundry), Foxconn, and a deep ecosystem
                of electronics, semiconductor, and precision machining
                companies. Taiwan&apos;s manufacturing sector is characterized
                by high quality, technical sophistication, and strong
                intellectual property protections.
              </p>
              <p>
                While Taiwan is more expensive than mainland China or Southeast
                Asia, it offers premium quality and reliability. For products
                requiring tight tolerances, advanced electronics, or precision
                components, Taiwan is often the best choice. The country also
                has strong English-language business communication and a
                well-developed legal system for IP protection.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Semiconductors, PCBs, precision machining, high-end
                electronics, optical components
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>World-class semiconductor and electronics expertise</li>
                    <li>Excellent quality and precision manufacturing</li>
                    <li>Strong IP protection and legal framework</li>
                    <li>
                      Skilled, experienced workforce with technical depth
                    </li>
                    <li>Good English communication in business settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Higher costs than mainland China ($8-15/hr labor)
                    </li>
                    <li>Smaller manufacturing scale than China</li>
                    <li>Limited capabilities outside high-tech sectors</li>
                    <li>
                      Geopolitical risks related to cross-strait tensions
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">25-40 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      100-500 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$8-15/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose Taiwan when:
                </strong>{" "}
                You need high-precision or high-tech components; IP protection
                is critical; you require semiconductor or advanced PCB
                manufacturing; you are willing to pay more for premium quality
                and reliability.
              </p>
            </div>
          </section>

          {/* South Korea */}
          <section id="south-korea">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇰🇷</span>South Korea
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                South Korea is a manufacturing powerhouse known for its
                leadership in electronics, displays, batteries, automotive,
                shipbuilding, and steel. Home to Samsung, LG, Hyundai, and SK,
                the country has world-class capabilities in advanced
                manufacturing and R&amp;D. South Korea&apos;s manufacturing
                sector combines Japanese-style quality discipline with
                aggressive innovation and rapid development cycles.
              </p>
              <p>
                For founders, South Korea is best suited for high-quality,
                technology-intensive products. The country offers strong IP
                protections, excellent infrastructure, and a well-educated
                workforce. However, costs are significantly higher than China
                or Southeast Asia, making it less competitive for cost-sensitive
                products.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Displays, batteries, automotive components, steel
                products, cosmetics packaging, advanced electronics
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      World-leading display, battery, and semiconductor
                      technology
                    </li>
                    <li>
                      Excellent quality and process discipline
                    </li>
                    <li>
                      Strong IP protection and enforcement
                    </li>
                    <li>
                      Advanced automation and Industry 4.0 adoption
                    </li>
                    <li>
                      US-Korea Free Trade Agreement (KORUS FTA) benefits
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>High labor costs ($10-18/hr)</li>
                    <li>
                      Limited flexibility for small orders
                    </li>
                    <li>
                      Language barrier — less English proficiency than Taiwan
                    </li>
                    <li>
                      High minimum investment for custom tooling
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">25-40 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      1,000-3,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$10-18/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose South Korea when:
                </strong>{" "}
                You need cutting-edge display, battery, or electronics
                technology; quality and brand reputation are paramount; you have
                higher volumes that justify premium pricing; you want KORUS FTA
                duty benefits for the US market.
              </p>
            </div>
          </section>

          {/* Thailand */}
          <section id="thailand">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇹🇭</span>Thailand
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Thailand is Southeast Asia&apos;s second-largest economy and a
                well-established manufacturing base, particularly for
                automotive, food processing, rubber products, and electronics.
                The country has a more developed manufacturing infrastructure
                than Vietnam, with decades of experience serving major
                multinational companies. Thailand&apos;s automotive industry
                alone accounts for the production of nearly 2 million vehicles
                per year, earning it the nickname &quot;the Detroit of
                Asia.&quot;
              </p>
              <p>
                Thailand offers a good balance between cost and quality. Its
                manufacturing sector is more mature than Vietnam&apos;s but
                less expensive than South Korea or Taiwan. The country&apos;s
                Eastern Economic Corridor (EEC) initiative is attracting
                significant investment in robotics, aerospace, and digital
                manufacturing.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Automotive parts, rubber/silicone products, food
                processing, hard disk drives, air conditioning components
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Mature manufacturing infrastructure and workforce
                    </li>
                    <li>
                      Strong in automotive, rubber, and food processing
                    </li>
                    <li>
                      Good balance of cost and quality
                    </li>
                    <li>
                      Well-developed port infrastructure in Bangkok region
                    </li>
                    <li>
                      Stable business environment and government incentives
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Higher costs than Vietnam or India ($3-6/hr)
                    </li>
                    <li>
                      Political instability history (coups, protests)
                    </li>
                    <li>Limited English proficiency in many factories</li>
                    <li>
                      Smaller scale than China for most product categories
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">30-45 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      500-1,500 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$3-6/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose Thailand when:
                </strong>{" "}
                Your product involves rubber, silicone, or automotive
                components; you want a mature manufacturing environment at
                moderate cost; you need food processing or packaging
                capabilities; you want a diversified Southeast Asian base
                outside of Vietnam.
              </p>
            </div>
          </section>

          {/* Turkey */}
          <section id="turkey">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              <span className="mr-3">🇹🇷</span>Turkey
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Turkey occupies a unique strategic position at the crossroads
                of Europe and Asia, making it an excellent manufacturing base
                for products targeting the European market. The country has
                strong capabilities in textiles, furniture, automotive,
                construction materials, and food processing. Turkey&apos;s
                customs union with the EU allows duty-free trade in
                manufactured goods with European countries, and its geographic
                position enables 1-5 day shipping to most European destinations.
              </p>
              <p>
                Turkey&apos;s manufacturing sector benefits from a young,
                large workforce and competitive costs that are lower than
                Western Europe but higher than Asia. The country also has a
                well-developed textile industry that rivals China and India in
                quality, and is particularly known for denim, home textiles,
                and fashion manufacturing.
              </p>

              <p className="font-semibold text-[#1A1A1A]">
                Best for: Textiles, furniture, automotive parts, construction
                materials, food products, products targeting the European
                market
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Strengths
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      EU customs union — duty-free access to European markets
                    </li>
                    <li>
                      Strategic location — fast shipping to Europe and Middle
                      East
                    </li>
                    <li>
                      Strong textile and furniture manufacturing tradition
                    </li>
                    <li>
                      Competitive labor costs ($4-7/hr)
                    </li>
                    <li>
                      Young, growing workforce of 30+ million working-age
                      people
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-2">
                    Weaknesses
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Currency volatility (Turkish Lira) creates pricing
                      uncertainty
                    </li>
                    <li>
                      Limited high-tech manufacturing capabilities
                    </li>
                    <li>
                      Less developed supplier platforms than China
                    </li>
                    <li>
                      Far from US market (20-30 day shipping by sea)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E4] p-4 mt-4">
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  Key Stats
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B6B6B]">Avg Lead Time</p>
                    <p className="font-semibold text-[#1A1A1A]">20-35 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Typical MOQ</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      300-1,000 units
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B6B6B]">Avg Labor Cost</p>
                    <p className="font-semibold text-[#1A1A1A]">$4-7/hr</p>
                  </div>
                </div>
              </div>

              <p className="text-sm italic">
                <strong className="text-[#1A1A1A]">
                  Choose Turkey when:
                </strong>{" "}
                You are targeting the European market and want fast shipping
                with duty-free access; your product is in textiles, furniture,
                or construction materials; you want a bridge between European
                quality standards and Asian price competitiveness.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison-table">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Comparison Summary Table
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              This table provides a high-level comparison across the eight
              countries. Cost ratings are relative ($ = lowest, $$$$ = highest).
              Quality and IP Protection are rated on a 5-star scale.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="text-left p-3 font-semibold">Country</th>
                    <th className="text-center p-3 font-semibold">
                      Avg Cost
                    </th>
                    <th className="text-center p-3 font-semibold">
                      Lead Time
                    </th>
                    <th className="text-center p-3 font-semibold">MOQ</th>
                    <th className="text-center p-3 font-semibold">Quality</th>
                    <th className="text-center p-3 font-semibold">
                      IP Protection
                    </th>
                    <th className="text-left p-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      China
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      30-45 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      500-1,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Electronics, plastics, metals
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      Vietnam
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      35-50 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      500-2,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Textiles, footwear, furniture
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      India
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      40-60 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      300-1,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Textiles, pharma, stainless steel
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      Mexico
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      15-30 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      500-2,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Auto parts, medical devices, US nearshoring
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      Taiwan
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      25-40 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      100-500
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★★
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★★
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Semiconductors, PCBs, precision parts
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      South Korea
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      25-40 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      1,000-3,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★★
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★★
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Displays, batteries, advanced electronics
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      Thailand
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      30-45 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      500-1,500
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★☆☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Automotive, rubber, food processing
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8E8E4] bg-[#FAFAF8]">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      Turkey
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">$$</td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      20-35 days
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      300-1,000
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-center text-[#6B6B6B]">
                      ★★★★☆
                    </td>
                    <td className="p-3 text-[#6B6B6B]">
                      Textiles, furniture, EU market
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Decide */}
          <section id="how-to-decide">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              How to Decide
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Choosing the right manufacturing country comes down to answering
              five key questions. Your answers will naturally point you toward
              the best option.
            </p>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  1. What type of product are you making?
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  Some countries specialize in specific product categories. If
                  you are making electronics, China and Taiwan are hard to beat.
                  If you are making textiles, Vietnam, India, and Turkey are
                  strong options. If you need automotive or medical device
                  manufacturing, Mexico is worth serious consideration. Match
                  your product to the country&apos;s strengths.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  2. Where is your primary market?
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  If you sell primarily in the US, Mexico offers the fastest
                  shipping and duty advantages under USMCA. If you target Europe,
                  Turkey&apos;s EU customs union provides duty-free access and
                  1-5 day delivery. For the Asian market, manufacturing in-region
                  (China, Vietnam, Thailand) keeps costs and lead times low.
                  Proximity to your market reduces shipping costs, speeds up
                  restocking, and simplifies returns.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  3. How important is IP protection?
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  If your product has a novel design or proprietary technology,
                  IP protection should be a top priority. Taiwan and South Korea
                  offer the strongest IP protection frameworks in Asia. Mexico
                  and Turkey also have relatively strong protections. China has
                  improved significantly but still carries higher risk,
                  especially for products that are easy to replicate. Use NDAs,
                  patents, and consider splitting manufacturing across multiple
                  suppliers so no single factory has your complete design.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  4. What is your budget and volume?
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  If cost is your primary concern and you have moderate to high
                  volumes, Vietnam and India offer the lowest labor costs.
                  China remains competitive for complex products at scale. If
                  you are doing smaller volumes and can afford premium pricing,
                  Taiwan and South Korea offer excellent quality with lower MOQs.
                  Always calculate total landed cost (including shipping, duties,
                  and QC) rather than comparing factory prices alone.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#FF6B35] p-6 rounded-r-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  5. How fast do you need your products?
                </h3>
                <p className="text-sm text-[#6B6B6B]">
                  If speed is critical, Mexico (3-7 days shipping to the US) and
                  Turkey (1-5 days to Europe) offer the fastest total lead times.
                  Manufacturing in China or Vietnam with air freight can get
                  products to you in 2-3 weeks total, but at a higher shipping
                  cost. If you can plan ahead, sea freight from Asia (25-40 days)
                  is the most cost-effective option. Build buffer into your
                  timeline regardless — delays happen everywhere.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Not sure which country is right for your product?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Bottlecap analyzes your product idea and compares three countries
              side-by-side — with cost breakdowns, lead times, and specific
              recommendations tailored to your product.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-[#FF6B35] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#E85A25] transition-colors"
            >
              Get your country comparison &rarr;
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
