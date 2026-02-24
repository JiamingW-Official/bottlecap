import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "IP Protection for Manufacturers — Bottlecap",
  description:
    "Learn how to protect your intellectual property when manufacturing overseas. Covers NNN agreements, trademark registration, patent strategy, practical IP tactics, and country-by-country risk assessment.",
}

export default function IPProtectionGuidePage() {
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
          <span className="text-[#1A1A1A]">IP Protection</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-6">
            IP Protection for Manufacturers
          </h1>
          <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-3xl">
            When you share your product designs with a factory overseas, you are
            trusting them with the core of your business. Without proper
            intellectual property protection, your supplier — or their other
            customers — can copy your product, register your brand name, or
            undercut you with a knockoff. This guide walks you through every
            layer of IP protection available to you, from legal agreements to
            practical manufacturing tactics.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-8 mb-12">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
            In this guide
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: "#why-ip", label: "Why IP Protection Matters" },
              { href: "#types", label: "Types of Intellectual Property" },
              { href: "#nnn", label: "NNN Agreements" },
              { href: "#trademarks", label: "Trademark Registration" },
              { href: "#patents", label: "Patent Strategy" },
              { href: "#tactics", label: "Practical Protection Tactics" },
              { href: "#stolen", label: "What to Do If IP Is Stolen" },
              { href: "#risk-table", label: "Country-by-Country IP Risk" },
              { href: "#attorneys", label: "Working with IP Attorneys" },
              { href: "#checklist", label: "IP Protection Checklist" },
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
          {/* Why IP Matters */}
          <section id="why-ip">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Why IP Protection Matters
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Intellectual property theft is one of the most common and
                devastating risks in overseas manufacturing. It is not a matter
                of if someone will try to copy a successful product — it is a
                matter of when. The global counterfeit goods market is estimated
                at $500 billion annually, and hardware products are among the
                most frequently copied categories.
              </p>
              <p>
                The risk is particularly acute in the early stages when you are
                working with new suppliers. You are sharing detailed technical
                drawings, CAD files, material specifications, and manufacturing
                processes. Any supplier employee with access to these files
                could potentially reproduce your product. In some cases,
                factories have been known to run a &quot;night shift&quot;
                producing unauthorized copies of their clients&apos; products.
              </p>
              <p>
                IP protection is not just about preventing theft — it is about
                creating legal recourse when it happens. Without registered IP,
                you have very limited options. With properly registered
                trademarks and patents, you can take action through customs
                enforcement, online marketplace takedowns, and legal proceedings
                in the country where the infringement occurs.
              </p>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                The Reality Check
              </p>
              <p className="text-sm text-[#6B6B6B]">
                No IP protection strategy is bulletproof. The goal is to make
                copying your product more difficult, more expensive, and more
                legally risky than developing something original. Each layer of
                protection you add raises the barrier. A comprehensive approach
                combining legal, technical, and operational measures provides
                the strongest defense.
              </p>
            </div>
          </section>

          {/* Types of IP */}
          <section id="types">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Types of Intellectual Property
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Understanding the different types of IP helps you determine
                which protections are relevant for your product. Most physical
                products benefit from multiple types of IP protection used
                together.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  type: "Patents",
                  description:
                    "Protect inventions — novel, non-obvious functional features of your product. A utility patent protects how something works. A design patent protects how something looks. Patents give you the right to exclude others from making, using, or selling your invention for 20 years (utility) or 15 years (design).",
                  cost: "$5,000–$15,000 (provisional), $15,000–$50,000 (full utility)",
                  timeline: "Provisional: 1-2 months. Full utility: 2-4 years.",
                },
                {
                  type: "Trademarks",
                  description:
                    "Protect brand identifiers — your product name, logo, tagline, and distinctive packaging. A trademark prevents others from using confusingly similar branding. Unlike patents, trademarks can last indefinitely as long as you continue using them and renew registrations.",
                  cost: "$250–$800 per class per country",
                  timeline: "6-12 months for registration",
                },
                {
                  type: "Trade Secrets",
                  description:
                    "Protect confidential business information that gives you a competitive advantage — manufacturing processes, formulas, supplier relationships, cost structures. Trade secrets have no registration process. Protection comes from keeping the information secret through NDAs, access controls, and contractual obligations.",
                  cost: "Cost of legal agreements and security measures",
                  timeline: "Immediate, no registration required",
                },
                {
                  type: "Copyrights",
                  description:
                    "Protect original creative works — your product photography, marketing copy, instruction manuals, software code, and packaging artwork. Copyright exists automatically upon creation but registration strengthens enforcement. Particularly relevant for products with embedded software.",
                  cost: "$35–$55 per registration (US Copyright Office)",
                  timeline: "3-6 months for registration",
                },
                {
                  type: "Design Rights",
                  description:
                    "Protect the ornamental or aesthetic appearance of a product. In the US, this is covered by design patents. In the EU, registered Community designs provide similar protection. Design protection is particularly valuable for products where visual distinctiveness is a key selling point.",
                  cost: "$1,500–$5,000 (US design patent), $350–$1,000 (EU registered design)",
                  timeline: "US: 12-18 months. EU: 2-4 months.",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {item.type}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Cost: </span>
                      <span className="text-[#6B6B6B]">{item.cost}</span>
                    </div>
                    <div className="bg-[#F5F5F0] rounded-xl p-3 text-sm">
                      <span className="font-medium text-[#1A1A1A]">Timeline: </span>
                      <span className="text-[#6B6B6B]">{item.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NNN Agreements */}
          <section id="nnn">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              NNN Agreements
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                A standard NDA (Non-Disclosure Agreement) is nearly worthless
                when dealing with Chinese manufacturers. NDAs are designed for
                Western legal systems and are difficult to enforce in Chinese
                courts. More importantly, they only cover one of three risks you
                face. This is why experienced importers use NNN agreements
                instead.
              </p>
              <p>
                NNN stands for Non-use, Non-disclosure, and
                Non-circumvention. Each component addresses a specific threat
                that suppliers can pose to your business.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Non-Disclosure
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  The supplier agrees not to share your confidential information
                  (designs, specs, pricing, business plans) with any third
                  party. This is the same as a standard NDA, but drafted to be
                  enforceable under Chinese law, written in Chinese, and subject
                  to Chinese jurisdiction.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Non-Use
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  The supplier agrees not to use your confidential information
                  for any purpose other than manufacturing your product. Without
                  this clause, a supplier could argue they are free to use your
                  design to manufacture products for themselves or other
                  customers — they just cannot tell anyone about it. The non-use
                  clause closes this critical loophole.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Non-Circumvention
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  The supplier agrees not to bypass you to sell directly to your
                  customers or contacts. Without this, a supplier who sees your
                  customer list or learns your distribution channels could
                  approach your buyers directly with a cheaper version of your
                  product. This is surprisingly common, especially with
                  Amazon-focused brands.
                </p>
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Critical Requirements for Enforceable NNN Agreements
              </p>
              <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc pl-5">
                <li>Written in Chinese (with English translation for your reference)</li>
                <li>Subject to Chinese jurisdiction and Chinese law (specifically the contract law of the PRC)</li>
                <li>Include specific, pre-agreed monetary penalties for breach (Chinese courts prefer liquidated damages)</li>
                <li>Signed by the legal entity of the factory (not a trading company or individual)</li>
                <li>Include the factory&apos;s official company chop/seal</li>
                <li>Drafted by a lawyer experienced in Chinese commercial law</li>
              </ul>
              <p className="text-sm text-[#6B6B6B] mt-3">
                <span className="font-medium text-[#1A1A1A]">Cost to draft: </span>
                $500–$2,000 from a qualified China law firm. This is one of the
                best investments you can make before sharing any designs with a
                supplier.
              </p>
            </div>
          </section>

          {/* Trademark Registration */}
          <section id="trademarks">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Trademark Registration
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Trademark registration is often the single most important and
                cost-effective IP protection step for product businesses. A
                registered trademark prevents others from using your brand name,
                logo, or tagline in commerce. It also gives you the ability to
                file takedown requests on Amazon, Alibaba, and other
                marketplaces.
              </p>
              <p>
                Critically, you should register your trademark in your home
                country AND in the country of manufacture. China operates on a
                &quot;first to file&quot; system, not &quot;first to use.&quot;
                This means anyone can register your brand name in China before
                you do — even your supplier. If this happens, they can legally
                prevent you from putting your own brand name on products made in
                China. This is called trademark squatting, and it happens
                constantly.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Trademark Registration Costs by Country
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { country: "United States (USPTO)", cost: "$250–$350 per class", timeline: "8–12 months", notes: "Use-based system; must show use in commerce" },
                  { country: "China (CNIPA)", cost: "$300–$600 per class", timeline: "9–14 months", notes: "First-to-file; register before sharing designs" },
                  { country: "European Union (EUIPO)", cost: "$900–$1,200 per class", timeline: "4–6 months", notes: "Covers all 27 EU member states" },
                  { country: "United Kingdom (UKIPO)", cost: "$250–$400 per class", timeline: "3–4 months", notes: "Separate from EU since Brexit" },
                  { country: "Canada (CIPO)", cost: "$300–$500 per class", timeline: "24–30 months", notes: "Longest timeline among major markets" },
                  { country: "Madrid Protocol (WIPO)", cost: "$600–$800 base + per country", timeline: "12–18 months", notes: "File in multiple countries through one application" },
                ].map((row) => (
                  <div
                    key={row.country}
                    className="py-3 border-b border-[#E8E8E4] last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-[#1A1A1A]">{row.country}</span>
                      <span className="text-[#FF6B35] font-semibold ml-4 whitespace-nowrap">
                        {row.cost}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] mt-1">
                      Timeline: {row.timeline}. {row.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Pro Tip
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Register your trademark in China in both English and Chinese
                characters. If you do not choose a Chinese version of your brand
                name, consumers and competitors will create one for you — and
                they might register it. Also register your trademark in relevant
                product classes. Most consumer products fall under classes 9
                (electronics), 11 (lighting/appliances), 20 (furniture), 21
                (housewares), or 28 (toys/games).
              </p>
            </div>
          </section>

          {/* Patent Strategy */}
          <section id="patents">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Patent Strategy
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Patents protect the functional and ornamental aspects of your
                invention. They are the strongest form of IP protection but also
                the most expensive and time-consuming. Not every product needs a
                patent, and the decision to pursue one should be a strategic
                business decision, not a reflexive one.
              </p>
              <p>
                A provisional patent application costs $5,000-$15,000 and gives
                you 12 months of &quot;patent pending&quot; status. During this
                time, you can test the market, refine your product, and decide
                whether to invest in a full utility patent ($15,000-$50,000+).
                The provisional application establishes your priority date —
                critical if a competitor files a similar patent later.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                When Patents Make Sense
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4">
                  <p className="font-semibold text-[#1A1A1A] mb-2">Good Candidates</p>
                  <ul className="text-[#6B6B6B] space-y-1 list-disc pl-4">
                    <li>Novel mechanism or functional feature</li>
                    <li>High-margin product (&gt;60% gross margin)</li>
                    <li>Product with long market life (5+ years)</li>
                    <li>Large addressable market ($10M+)</li>
                    <li>Difficult to design around</li>
                    <li>Seeking investment (patents signal value)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-xl p-4">
                  <p className="font-semibold text-[#1A1A1A] mb-2">Poor Candidates</p>
                  <ul className="text-[#6B6B6B] space-y-1 list-disc pl-4">
                    <li>Incremental improvement to existing product</li>
                    <li>Low-margin commodity product</li>
                    <li>Fast-moving trend product (1-2 year life)</li>
                    <li>Easy to design around the feature</li>
                    <li>Small niche market</li>
                    <li>Cash-constrained early stage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF4EE] border border-[#FFD4BC] rounded-2xl p-6 mt-6">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                Design Patents: The Affordable Alternative
              </p>
              <p className="text-sm text-[#6B6B6B]">
                If your product&apos;s innovation is primarily aesthetic rather
                than functional, consider a design patent instead. Design
                patents protect the ornamental appearance and cost $1,500-$5,000
                to file. They are granted in 12-18 months (vs. 2-4 years for
                utility patents) and provide 15 years of protection. They are
                particularly effective for consumer products where the unique
                shape or visual design is the key differentiator.
              </p>
            </div>
          </section>

          {/* Practical Tactics */}
          <section id="tactics">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Practical Protection Tactics
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Legal protections are important but they are reactive — they
                help you after a violation occurs. Practical operational tactics
                make it harder to copy your product in the first place. The best
                IP strategy combines legal filings with these hands-on
                protective measures.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  tactic: "Split Manufacturing",
                  description:
                    "Divide production across multiple factories so no single supplier has the complete picture. Factory A makes the housing, Factory B makes the electronics, Factory C does final assembly. Each factory only sees their portion of the design. This is the most effective single tactic for protecting complex products.",
                  effort: "High — requires managing multiple suppliers and logistics",
                },
                {
                  tactic: "Watermark Your Design Files",
                  description:
                    "Add unique, invisible watermarks to every version of your CAD files, technical drawings, and specifications. Each supplier gets a uniquely watermarked version. If a copy appears on the market, you can trace which file was used and which supplier leaked it.",
                  effort: "Low — add watermarks to your standard file distribution process",
                },
                {
                  tactic: "Escrow Tooling Ownership",
                  description:
                    "Injection molds and tooling are expensive ($5,000-$50,000+). If you pay for the tooling, it is your property. Include explicit tooling ownership clauses in your manufacturing agreement. Some founders escrow the tooling with a third party or require the factory to return molds upon request.",
                  effort: "Medium — requires contractual negotiation and tracking",
                },
                {
                  tactic: "Compiled-Only Firmware",
                  description:
                    "For electronic products, never share source code with your manufacturer. Provide only compiled firmware files. Use secure boot and code signing to prevent firmware extraction and modification. Consider using one-time-programmable (OTP) security features in your microcontroller.",
                  effort: "Medium — requires embedded engineering expertise",
                },
                {
                  tactic: "Control Key Components",
                  description:
                    "Source one or more critical components yourself and ship them to the factory for assembly. This could be a custom chip, a proprietary ingredient, or a specialized part. Without this component, the factory cannot produce a complete product even if they have everything else.",
                  effort: "High — adds supply chain complexity but very effective",
                },
                {
                  tactic: "Stagger Information Sharing",
                  description:
                    "Do not share your complete design upfront. Share only what the supplier needs at each stage: general specs for quoting, detailed specs for sampling, full production files only after your NNN agreement is signed and you have verified the factory. Never share more than necessary.",
                  effort: "Low — a discipline rather than a process change",
                },
              ].map((item) => (
                <div
                  key={item.tactic}
                  className="bg-white rounded-2xl border border-[#E8E8E4] p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">
                      {item.tactic}
                    </h3>
                    <span className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-3 py-1 rounded-full whitespace-nowrap ml-3">
                      {item.effort}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What to Do If IP Is Stolen */}
          <section id="stolen">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              What to Do If Your IP Is Stolen
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Discovering that someone has copied your product is stressful,
                but acting quickly and strategically is critical. Here is a
                step-by-step response plan.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <ol className="space-y-4 text-sm">
                {[
                  {
                    step: "Document everything immediately",
                    detail:
                      "Buy the counterfeit product. Screenshot all online listings. Record the seller's name, platform, and any identifying information. Document the date you first discovered the infringement. This evidence is critical for any legal or marketplace action.",
                  },
                  {
                    step: "File marketplace takedown requests",
                    detail:
                      "Amazon Brand Registry, Alibaba IPP Platform, and eBay VeRO all have IP infringement reporting systems. If you have registered trademarks or patents, takedowns can happen within 24-72 hours. This is your fastest line of defense.",
                  },
                  {
                    step: "Send a cease and desist letter",
                    detail:
                      "Have your attorney send a formal C&D letter to the infringing party. In many cases, especially with smaller operations, a well-crafted legal letter is enough to stop the infringement. Use a local attorney in the infringer's country for maximum impact.",
                  },
                  {
                    step: "File with customs",
                    detail:
                      "In the US, you can record your trademark or copyright with US Customs (CBP) to have infringing goods seized at the border. The recording costs $190 per trademark and can be incredibly effective at stopping imports of counterfeits.",
                  },
                  {
                    step: "Consider legal action",
                    detail:
                      "If the infringement is significant and other measures fail, you may need to pursue litigation. In China, this is surprisingly effective — Chinese courts have increasingly ruled in favor of foreign IP holders. Litigation costs $10,000-$50,000+ depending on complexity.",
                  },
                  {
                    step: "Strengthen your defenses",
                    detail:
                      "Use the incident as a catalyst to close whatever gap allowed the theft. Update your NNN agreements, file additional IP registrations, implement split manufacturing, or change suppliers if necessary.",
                  },
                ].map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">
                        {item.step}
                      </p>
                      <p className="text-[#6B6B6B] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Country Risk Table */}
          <section id="risk-table">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Country-by-Country IP Risk
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                IP risk varies significantly by manufacturing country. This
                assessment considers the legal framework, enforcement
                effectiveness, cultural attitudes toward IP, and practical risk
                based on industry experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E8E8E4]">
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Country</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">IP Risk</th>
                    <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Enforcement</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Key Considerations</th>
                  </tr>
                </thead>
                <tbody className="text-[#6B6B6B]">
                  {[
                    { country: "China", risk: "High", riskColor: "text-red-600", enforcement: "Improving", notes: "First-to-file trademarks. NNN agreements essential. Courts increasingly pro-IP but enforcement remains challenging outside major cities." },
                    { country: "Vietnam", risk: "Moderate", riskColor: "text-yellow-600", enforcement: "Developing", notes: "Growing manufacturing hub with less IP infrastructure. Register trademarks locally. Less sophisticated copying capability than China." },
                    { country: "India", risk: "Moderate", riskColor: "text-yellow-600", enforcement: "Moderate", notes: "Strong legal framework on paper but slow enforcement. Patent examination backlog is significant. Trademark squatting is less common." },
                    { country: "Taiwan", risk: "Low-Moderate", riskColor: "text-yellow-600", enforcement: "Good", notes: "Strong IP laws and enforcement. Well-established manufacturing sector with professional standards. Lower risk for most categories." },
                    { country: "South Korea", risk: "Low", riskColor: "text-green-600", enforcement: "Strong", notes: "Robust IP protection and enforcement. Major IP-producing country with strong respect for IP rights. Premium manufacturing costs." },
                    { country: "Mexico", risk: "Low", riskColor: "text-green-600", enforcement: "Moderate", notes: "USMCA provides strong IP framework. Proximity to US market. Less risk of IP theft but growing manufacturing sector." },
                    { country: "Thailand", risk: "Moderate", riskColor: "text-yellow-600", enforcement: "Developing", notes: "Improving IP regime. Register trademarks before manufacturing. Electronics and automotive sectors have better IP practices." },
                    { country: "Japan", risk: "Very Low", riskColor: "text-green-600", enforcement: "Excellent", notes: "Among the strongest IP protections globally. Premium costs but minimal risk. Cultural respect for IP rights." },
                  ].map((row) => (
                    <tr key={row.country} className="border-b border-[#E8E8E4] last:border-0">
                      <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{row.country}</td>
                      <td className={`py-3 pr-4 font-semibold ${row.riskColor}`}>{row.risk}</td>
                      <td className="py-3 pr-4">{row.enforcement}</td>
                      <td className="py-3">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Working with IP Attorneys */}
          <section id="attorneys">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Working with IP Attorneys
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                IP law is specialized. A general business attorney is not
                qualified to draft patent applications, evaluate trade secret
                strategies, or navigate Chinese trademark law. You need
                attorneys who specialize in intellectual property and,
                ideally, who have experience in international manufacturing.
              </p>
              <p>
                Most IP attorneys charge $200-$500 per hour. For startups, a
                common approach is to use a combination: a US-based IP attorney
                for domestic filings and strategy, and a local attorney in the
                manufacturing country for NNN agreements and local trademark
                registrations. Many China-focused law firms offer flat-rate
                packages for NNN agreements and trademark filings.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Typical IP Attorney Costs
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { service: "Hourly rate (US IP attorney)", cost: "$200–$500/hr" },
                  { service: "NNN agreement drafting (China)", cost: "$500–$2,000 flat" },
                  { service: "US trademark filing", cost: "$800–$2,000 total" },
                  { service: "China trademark filing", cost: "$600–$1,500 total" },
                  { service: "Provisional patent application", cost: "$5,000–$15,000" },
                  { service: "Full utility patent", cost: "$15,000–$50,000" },
                  { service: "Design patent", cost: "$1,500–$5,000" },
                  { service: "Cease and desist letter", cost: "$500–$2,000" },
                  { service: "IP portfolio strategy consultation", cost: "$1,000–$3,000" },
                ].map((row) => (
                  <div
                    key={row.service}
                    className="flex justify-between items-center py-2 border-b border-[#E8E8E4] last:border-0"
                  >
                    <span className="text-[#1A1A1A] font-medium">{row.service}</span>
                    <span className="text-[#FF6B35] font-semibold ml-4 whitespace-nowrap">
                      {row.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* IP Checklist */}
          <section id="checklist">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              IP Protection Checklist
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Use this checklist to ensure you have addressed every layer of
                IP protection before and during manufacturing. Not every item
                will apply to every product, but reviewing each one ensures
                nothing is overlooked.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 mt-6">
              <div className="space-y-4 text-sm">
                {[
                  {
                    phase: "Before Contacting Suppliers",
                    items: [
                      "Register trademark in home country",
                      "Register trademark in manufacturing country (especially China)",
                      "File provisional patent if product has novel features",
                      "Prepare NNN agreement with qualified local attorney",
                      "Document your design creation date (email to yourself, copyright registration)",
                      "Decide which information to share and what to withhold at each stage",
                    ],
                  },
                  {
                    phase: "During Supplier Selection",
                    items: [
                      "Have NNN agreement signed before sharing detailed designs",
                      "Verify supplier is a legitimate legal entity (not a broker)",
                      "Check if supplier has existing IP complaints or lawsuits",
                      "Share only general specs during quoting phase",
                      "Watermark all files with supplier-specific identifiers",
                    ],
                  },
                  {
                    phase: "During Production",
                    items: [
                      "Include tooling ownership clause in manufacturing agreement",
                      "Implement split manufacturing for complex products",
                      "Provide compiled-only firmware for electronic products",
                      "Control supply of at least one key component",
                      "Conduct unannounced factory visits when possible",
                    ],
                  },
                  {
                    phase: "Ongoing",
                    items: [
                      "Monitor marketplaces for counterfeits (Amazon, Alibaba, eBay)",
                      "Record trademarks with customs (CBP in US)",
                      "Renew trademark registrations on schedule",
                      "Update NNN agreements when changing suppliers",
                      "Review and strengthen IP strategy annually",
                    ],
                  },
                ].map((phase) => (
                  <div key={phase.phase}>
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">
                      {phase.phase}
                    </h3>
                    <ul className="space-y-1 text-[#6B6B6B]">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#E8E8E4] mt-0.5">&#9744;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-[#E8E8E4] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to protect your product idea?
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto mb-8">
              Start with a Bottlecap feasibility report. Get manufacturing
              recommendations, cost estimates, and country-specific guidance
              including IP risk factors — so you can move forward with
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
