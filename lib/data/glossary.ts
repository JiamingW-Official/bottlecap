// Manufacturing and trade glossary data library for Bottlecap manufacturing analysis platform
// Sources: ICC Incoterms 2020, ISO standards, US CBP, industry best practices

export interface GlossaryTerm {
  slug: string;
  term: string;
  acronym?: string;
  definition: string;
  longDescription: string;
  category: 'Trade Terms' | 'Manufacturing' | 'Quality' | 'Logistics' | 'Finance' | 'Legal';
  relatedTerms: string[];
  practicalTip: string;
}

export const GLOSSARY_TERMS = [
  // ── Trade Terms ──────────────────────────────────────────────────────
  {
    slug: 'fob',
    term: 'Free on Board',
    acronym: 'FOB',
    definition:
      'An Incoterm where the seller delivers goods on board the vessel at the named port of shipment. Risk transfers from seller to buyer once goods pass the ship\'s rail.',
    longDescription:
      'Free on Board (FOB) is the most commonly used Incoterm in international trade between importers and overseas factories. Under FOB terms, the supplier is responsible for manufacturing the goods, transporting them to the port, clearing export customs, and loading them onto the vessel. Once the goods are on the ship, all risk and cost transfer to the buyer.\n\nFOB pricing is the standard way suppliers quote prices on platforms like Alibaba and Global Sources. When a factory quotes you "$2.50 FOB Shenzhen," that means the price includes everything up to loading the goods onto a ship at the port of Shenzhen. You, the buyer, then arrange and pay for ocean freight, insurance, customs clearance at the destination, and last-mile delivery.\n\nFor most DTC founders importing from Asia, FOB is the recommended Incoterm. It gives you control over shipping costs by letting you choose your own freight forwarder, which often results in better rates than the supplier\'s forwarder. It also gives you visibility into the shipping process and lets you consolidate shipments from multiple suppliers.',
    category: 'Trade Terms',
    relatedTerms: ['cif', 'exw', 'fca', 'incoterms', 'freight-forwarder', 'port-of-loading'],
    practicalTip:
      'Always negotiate FOB pricing rather than CIF. This lets you pick your own freight forwarder and avoid inflated shipping markups from the supplier.',
  },
  {
    slug: 'cif',
    term: 'Cost, Insurance, and Freight',
    acronym: 'CIF',
    definition:
      'An Incoterm where the seller pays for cost of goods, insurance, and freight to the named destination port. Risk transfers to the buyer once goods are loaded on the vessel at origin.',
    longDescription:
      'Cost, Insurance, and Freight (CIF) is an Incoterm where the supplier includes the cost of ocean freight and basic marine insurance in the quoted price. While this sounds convenient, it is important to understand that risk still transfers to the buyer at the port of origin -- the same as FOB. The seller merely arranges and pays for shipping on your behalf.\n\nMany new importers prefer CIF because it feels simpler: you get one all-in price to your destination port. However, experienced importers generally avoid CIF terms. Suppliers often mark up freight costs by 20-40% compared to what you would pay using your own freight forwarder. The insurance included in CIF is typically the bare minimum required (110% of invoice value with Institute Cargo Clause C), which may not adequately cover your goods.\n\nCIF can make sense for very small shipments where the hassle of arranging your own freight outweighs the cost savings, or when you are first starting out and do not yet have a freight forwarder relationship. As your import volume grows, switching to FOB terms will almost always save you money.',
    category: 'Trade Terms',
    relatedTerms: ['fob', 'cfr', 'incoterms', 'freight-forwarder', 'landed-cost'],
    practicalTip:
      'If a supplier only quotes CIF, ask for the FOB price separately. Compare their freight cost to quotes from independent freight forwarders -- you will often find significant savings.',
  },
  {
    slug: 'ddp',
    term: 'Delivered Duty Paid',
    acronym: 'DDP',
    definition:
      'An Incoterm where the seller bears all costs and risks of delivering goods to the buyer\'s named destination, including import duties and taxes.',
    longDescription:
      'Delivered Duty Paid (DDP) places the maximum obligation on the seller. Under DDP terms, the supplier is responsible for everything: manufacturing, export clearance, ocean freight, insurance, import customs clearance, payment of duties and taxes, and delivery to your specified address. You receive the goods at your door with no additional logistics to manage.\n\nDDP sounds ideal but comes with significant trade-offs. First, suppliers bake substantial markups into all of the logistics and customs costs they handle. Second, you lose visibility into the customs process, which can be problematic if issues arise. Third, many overseas suppliers lack the expertise to navigate US customs regulations efficiently, increasing the risk of delays or compliance problems.\n\nDDP is most commonly used for small sample shipments, trade show deliveries, or when working with trading companies (as opposed to factories) that have established logistics networks. It is rarely the most cost-effective option for production orders. Some e-commerce fulfillment models use DDP for direct-to-consumer cross-border shipments where the seller wants to guarantee the buyer will not face unexpected duties at delivery.',
    category: 'Trade Terms',
    relatedTerms: ['dap', 'fob', 'exw', 'incoterms', 'customs-broker', 'landed-cost'],
    practicalTip:
      'Use DDP only for samples or very small shipments. For production orders, FOB with your own freight forwarder and customs broker will nearly always be cheaper and give you more control.',
  },
  {
    slug: 'exw',
    term: 'Ex Works',
    acronym: 'EXW',
    definition:
      'An Incoterm where the seller makes goods available at their premises. The buyer bears all costs and risks from the factory door onward, including export clearance.',
    longDescription:
      'Ex Works (EXW) places the minimum obligation on the seller. The supplier simply makes the finished goods available at their factory or warehouse. Every cost and risk after that point -- loading, inland transport to the port, export customs clearance, ocean freight, insurance, import clearance, and delivery -- falls on the buyer.\n\nWhile EXW might seem like it would yield the lowest product price, it is generally not recommended for international trade. The main problem is that EXW requires the buyer (a foreign party) to handle export customs clearance in the seller\'s country. In practice, this is extremely difficult. In China, for example, a foreign company cannot directly clear goods for export; you would need a licensed export agent, adding complexity and cost.\n\nEXW is more commonly used for domestic transactions or within the EU where customs clearance between countries is not required. For international purchases from Asia, FOB is almost always a better choice. The supplier is better positioned to handle inland transport and export formalities in their own country, and FOB pricing typically reflects this efficiency.',
    category: 'Trade Terms',
    relatedTerms: ['fob', 'fca', 'incoterms', 'port-of-loading'],
    practicalTip:
      'Avoid EXW for imports from Asia. You would need to handle export customs in the supplier\'s country, which is impractical for most foreign buyers. Use FOB instead.',
  },
  {
    slug: 'fca',
    term: 'Free Carrier',
    acronym: 'FCA',
    definition:
      'An Incoterm where the seller delivers goods, cleared for export, to a carrier nominated by the buyer at a named place. Risk transfers at the point of handoff to the carrier.',
    longDescription:
      'Free Carrier (FCA) is an increasingly popular Incoterm that works for any mode of transport, unlike FOB which is strictly for sea freight. Under FCA terms, the seller is responsible for export clearance and delivering the goods to a carrier or location specified by the buyer. This could be the supplier\'s factory, a freight forwarder\'s warehouse, or a container freight station.\n\nFCA is particularly useful when shipping by air, by truck (for example, from Mexico under USMCA), or when using multimodal transport. It is also the recommended alternative to FOB when the buyer wants the supplier to handle export formalities but the goods are not being loaded directly onto a vessel. The ICC (International Chamber of Commerce) has been encouraging the use of FCA over FOB for containerized cargo, since container goods are typically delivered to a terminal rather than loaded directly onto a ship.\n\nFor DTC importers, FCA works well when you want your freight forwarder to pick up goods directly from the factory or from an inland consolidation point. It avoids the ambiguity of the FOB "ship\'s rail" transfer point for containerized cargo and provides a cleaner risk transfer moment.',
    category: 'Trade Terms',
    relatedTerms: ['fob', 'exw', 'dap', 'incoterms', 'freight-forwarder'],
    practicalTip:
      'Consider FCA for air shipments or when your freight forwarder picks up goods from the factory. It provides clearer risk transfer than FOB for containerized and non-sea shipments.',
  },
  {
    slug: 'dap',
    term: 'Delivered at Place',
    acronym: 'DAP',
    definition:
      'An Incoterm where the seller delivers goods to a named destination, ready for unloading. The buyer is responsible for import clearance, duties, and unloading.',
    longDescription:
      'Delivered at Place (DAP) means the seller handles everything up to delivering the goods to an agreed-upon destination in the buyer\'s country, but the buyer is responsible for import customs clearance, duties, taxes, and unloading. This sits between CIF (where risk transfers at origin) and DDP (where the seller handles everything including duties).\n\nDAP is useful when you want the supplier to manage international shipping but you want to control the import customs process yourself. This makes sense when you have a customs broker you trust, when the goods require specific import procedures (like FDA prior notice for food-contact items), or when you want to ensure proper tariff classification to minimize duties.\n\nThe key distinction between DAP and DDP is who handles import customs. Under DAP, if your goods get held at customs due to documentation issues, that is your problem to solve. Under DDP, the seller would need to resolve it. For most importers, DAP offers a good balance: the supplier handles the logistics they are good at (export and shipping), while you control the regulatory aspects in your own country.',
    category: 'Trade Terms',
    relatedTerms: ['ddp', 'cif', 'fob', 'incoterms', 'customs-broker'],
    practicalTip:
      'DAP works well when you want door-to-door logistics from your supplier but prefer to handle US customs clearance yourself through your own customs broker.',
  },
  {
    slug: 'cfr',
    term: 'Cost and Freight',
    acronym: 'CFR',
    definition:
      'An Incoterm where the seller pays for the cost of goods and freight to the named destination port. Unlike CIF, insurance is not included and must be arranged by the buyer.',
    longDescription:
      'Cost and Freight (CFR), sometimes written as CNF or C&F in older contracts, is similar to CIF but without insurance. The seller pays for manufacturing and ocean freight to the named destination port, but the buyer must arrange their own marine cargo insurance. Risk transfers to the buyer at the port of origin, just as with FOB and CIF.\n\nCFR is less commonly used than FOB or CIF in modern trade, but you may encounter it when suppliers quote prices. Some suppliers default to CFR because it avoids the hassle of arranging insurance while still offering an "all-in" feel to the price. However, this creates a dangerous gap: if your goods are damaged or lost at sea and you forgot to arrange insurance, the loss is entirely yours.\n\nThe practical difference between CFR and CIF is typically small in cost (marine cargo insurance adds roughly 0.3-0.5% to the invoice value), but the consequences of being uninsured can be catastrophic. If you receive a CFR quote, either ask the supplier to convert it to CIF, or immediately arrange your own cargo insurance through your freight forwarder or an insurance broker.',
    category: 'Trade Terms',
    relatedTerms: ['cif', 'fob', 'incoterms', 'landed-cost'],
    practicalTip:
      'If offered CFR terms, always arrange your own marine cargo insurance immediately. The cost is minimal (0.3-0.5% of invoice value) compared to the risk of an uninsured shipment loss.',
  },
  {
    slug: 'cnf',
    term: 'Cost and Freight (Informal)',
    acronym: 'CNF',
    definition:
      'An informal abbreviation for Cost and Freight (CFR). Often used colloquially by suppliers and on trading platforms, but the official ICC Incoterm code is CFR.',
    longDescription:
      'CNF (also written as C&F) is the informal, colloquial term for what the ICC officially designates as CFR (Cost and Freight). You will frequently encounter CNF in supplier quotes on Alibaba, in emails from Chinese factories, and in casual trade conversations. While it means the same thing as CFR, using non-standard terminology in contracts can create ambiguity.\n\nThe prevalence of CNF in everyday trade communication reflects the gap between formal Incoterms rules and actual business practice, especially in Asian manufacturing. Most suppliers in China use CNF interchangeably with CFR, and in practice, everyone understands the intent. However, if a dispute arises, a court or arbitration panel will look at the official ICC Incoterms definitions.\n\nWhen finalizing purchase orders or contracts, always use the official ICC abbreviation CFR rather than CNF. In your initial negotiation emails and quotes, either term is fine, but your formal documents should reference "CFR (Incoterms 2020)" followed by the named destination port.',
    category: 'Trade Terms',
    relatedTerms: ['cfr', 'cif', 'fob', 'incoterms'],
    practicalTip:
      'When you see CNF or C&F in a supplier quote, it means CFR. Always use the official term CFR in your purchase orders and contracts to avoid ambiguity.',
  },

  // ── Manufacturing ────────────────────────────────────────────────────
  {
    slug: 'moq',
    term: 'Minimum Order Quantity',
    acronym: 'MOQ',
    definition:
      'The smallest number of units a manufacturer will produce in a single order. MOQs exist because factories need minimum volumes to justify setup costs, material purchases, and production line time.',
    longDescription:
      'Minimum Order Quantity (MOQ) is one of the first numbers you will encounter when sourcing from overseas manufacturers. It represents the lowest quantity a factory is willing to produce per order, and it varies enormously by product type, manufacturing process, and factory size. Injection-molded plastic products might have MOQs of 1,000-5,000 units, while custom-sewn textile products might start at 200-500 pieces per color per size.\n\nMOQs exist for practical reasons. Factories need to purchase raw materials (which have their own MOQs from material suppliers), set up production lines and tooling, and allocate worker time. A factory producing 10,000 units per day cannot economically stop their line to run a batch of 50 units for a single customer. The setup time, quality control overhead, and material waste make small runs unprofitable at standard pricing.\n\nNegotiating MOQs is an art. Strategies include: offering to pay a slightly higher per-unit price for a smaller initial order, committing to larger follow-up orders in a purchase agreement, consolidating multiple SKUs into a single production run, working with trading companies who aggregate orders from multiple buyers, or targeting smaller factories that specialize in lower-volume production.',
    category: 'Manufacturing',
    relatedTerms: ['rfq', 'sku', 'tooling', 'landed-cost'],
    practicalTip:
      'For your first order, ask the factory for their MOQ and then ask what the price would be at 50% of MOQ. Many factories will accommodate a smaller first order at a 10-20% price premium to win a new customer.',
  },
  {
    slug: 'rfq',
    term: 'Request for Quotation',
    acronym: 'RFQ',
    definition:
      'A formal document sent to manufacturers requesting pricing, lead times, and terms for producing a specific product. A well-prepared RFQ dramatically improves the quality and speed of supplier responses.',
    longDescription:
      'A Request for Quotation (RFQ) is your formal ask to a manufacturer for pricing and terms. The quality of your RFQ directly determines the quality of quotes you receive. A vague RFQ ("I want to make a water bottle, how much?") will get vague, often inflated responses. A detailed RFQ with specifications, quantities, target pricing, and timeline will get serious, competitive quotes.\n\nA strong RFQ should include: product specifications or reference samples, material requirements, dimensions and tolerances, quantity tiers (e.g., pricing at 500, 1,000, and 5,000 units), packaging requirements, target FOB price if you have one, required certifications (FDA, CE, UL, etc.), timeline expectations, and any special requirements like custom colors or printing. Including a 2D drawing or 3D CAD file dramatically improves quote accuracy.\n\nBest practice is to send your RFQ to 5-10 qualified suppliers simultaneously. This gives you a range of pricing to compare and helps you identify outliers. A supplier quoting significantly below the pack may be cutting corners on materials or quality, while one quoting far above may be a trading company adding middleman margins. The cluster of quotes in the middle usually represents the true market price.',
    category: 'Manufacturing',
    relatedTerms: ['moq', 'bom', 'tooling', 'oem', 'odm'],
    practicalTip:
      'Include 3 quantity tiers in your RFQ (e.g., 500, 1,000, 5,000 units). This shows the factory you are planning for growth and helps you understand how pricing scales with volume.',
  },
  {
    slug: 'bom',
    term: 'Bill of Materials',
    acronym: 'BOM',
    definition:
      'A comprehensive list of all raw materials, components, sub-assemblies, and quantities needed to manufacture a finished product. The BOM is the foundation of cost estimation and production planning.',
    longDescription:
      'A Bill of Materials (BOM) is essentially the recipe for your product. It lists every single component, material, and sub-assembly required to build one finished unit, along with quantities, specifications, and often supplier information. For a simple product like a water bottle, the BOM might include 5-10 line items. For an electronic device, it could have hundreds.\n\nThe BOM serves multiple critical functions in manufacturing. First, it is the basis for cost estimation -- your factory uses the BOM to calculate material costs, which typically represent 40-60% of the total unit cost. Second, it drives procurement: the factory needs to order all BOM components with sufficient lead time before production starts. Third, it is essential for quality control, as inspectors verify that the correct materials and components are being used.\n\nAs a DTC founder, you may not create the BOM yourself (the factory or product designer typically does), but you should always review and understand it. Key things to look for: Are the materials specified correctly (e.g., food-grade silicone vs. industrial-grade)? Are there alternatives for expensive components? Does the BOM account for packaging and labeling materials? Understanding your BOM gives you leverage in cost negotiations because you can discuss specific line items rather than just the total price.',
    category: 'Manufacturing',
    relatedTerms: ['rfq', 'moq', 'sku', 'oem', 'landed-cost'],
    practicalTip:
      'Request the full BOM from your supplier and review it line by line. If a component seems expensive, ask about alternative materials. Even small per-unit savings add up significantly at scale.',
  },
  {
    slug: 'oem',
    term: 'Original Equipment Manufacturer',
    acronym: 'OEM',
    definition:
      'A manufacturer that produces goods based on the buyer\'s specifications and design. The buyer owns the design and IP, while the factory provides manufacturing capability.',
    longDescription:
      'Original Equipment Manufacturer (OEM) refers to a manufacturing arrangement where the factory produces products according to your exact specifications and design. You provide the design, engineering drawings, BOM, and brand specifications; the factory provides the manufacturing capability, labor, and quality systems. The finished product is your brand, your design, your IP.\n\nOEM manufacturing is the standard model for brands that have developed their own product designs. Apple, for example, designs the iPhone but contracts Foxconn (an OEM) to manufacture it. At a smaller scale, a DTC kitchenware brand might design a unique silicone spatula and contract a Chinese factory to produce it. The key distinction is that intellectual property ownership remains with the brand, not the factory.\n\nThe OEM model requires more upfront investment than ODM. You need product designs, engineering specifications, and often custom tooling (molds, dies, jigs). Development timelines are longer because the factory needs to build samples, iterate on feedback, and dial in production processes for your specific design. However, the payoff is a truly differentiated product that cannot be easily copied by competitors buying from the same factory\'s catalog.',
    category: 'Manufacturing',
    relatedTerms: ['odm', 'rfq', 'tooling', 'bom', 'ip-protection'],
    practicalTip:
      'When doing OEM manufacturing, always sign an NDA before sharing designs and include IP ownership clauses in your manufacturing agreement. Consider registering your design patent before sending files to factories.',
  },
  {
    slug: 'odm',
    term: 'Original Design Manufacturer',
    acronym: 'ODM',
    definition:
      'A manufacturer that designs and produces products which buyers can purchase and rebrand under their own label. The factory owns the base design, though minor customizations are usually available.',
    longDescription:
      'Original Design Manufacturer (ODM) refers to a factory that designs and develops products in-house, then sells them to brands who apply their own label and branding. Think of it as "white-label" or "private-label" manufacturing. The factory has already invested in the product design, tooling, and production process. You select from their catalog, choose customization options (colors, materials, logo placement), and receive branded products.\n\nODM is the fastest and most affordable path to launching a physical product. Since the factory already has tooling and a proven production process, you skip the entire product development phase. MOQs are often lower (the factory is already running production), lead times are shorter, and upfront costs are minimal. Many successful DTC brands started with ODM products and transitioned to custom OEM designs after validating market demand.\n\nThe trade-off is differentiation. Since the factory sells the same base design to multiple brands, your competitors may be selling nearly identical products. Your competitive advantage must come from branding, marketing, customer experience, and potentially minor product customizations rather than a truly unique product design. This is perfectly viable in many categories where brand and marketing drive purchasing decisions more than product uniqueness.',
    category: 'Manufacturing',
    relatedTerms: ['oem', 'rfq', 'moq', 'sku', 'ip-protection'],
    practicalTip:
      'ODM is great for validating product-market fit quickly. Start with an ODM product, build your brand and customer base, then invest in custom OEM designs once you have the sales volume to justify tooling costs.',
  },
  {
    slug: 'sku',
    term: 'Stock Keeping Unit',
    acronym: 'SKU',
    definition:
      'A unique identifier for each distinct product variant in your inventory. Each combination of product, size, color, and material gets its own SKU for tracking and management purposes.',
    longDescription:
      'A Stock Keeping Unit (SKU) is a unique alphanumeric code assigned to every distinct product variant you sell. If you sell a t-shirt in 3 colors and 4 sizes, that is 12 SKUs. Each SKU represents a specific, trackable item in your inventory system. SKUs are foundational to inventory management, order fulfillment, and financial reporting.\n\nSKU count has a direct and often underappreciated impact on manufacturing costs and complexity. Every additional SKU means the factory needs to track separate components, potentially change production setups, maintain separate inventory, and manage more complex quality control. Packaging must be labeled differently for each SKU. Your warehouse needs separate bins. Your website needs separate listings. The proliferation of SKUs (sometimes called "SKU creep") is one of the most common ways DTC founders accidentally destroy their margins.\n\nWhen designing your product line, be strategic about SKU count. Start with fewer variants and expand based on actual customer demand data. Each SKU should carry its weight in sales volume. A rule of thumb: if a SKU represents less than 5% of total unit sales, consider discontinuing it. The inventory carrying costs, complexity overhead, and MOQ challenges of low-velocity SKUs often outweigh their revenue contribution.',
    category: 'Manufacturing',
    relatedTerms: ['moq', 'bom', 'rfq'],
    practicalTip:
      'Keep your initial SKU count as low as possible. Each additional color or size variant multiplies your MOQ requirements. Launch with your top 2-3 variants and expand based on real customer demand.',
  },
  {
    slug: 'tooling',
    term: 'Tooling',
    definition:
      'The molds, dies, jigs, and fixtures required to manufacture a specific product. Tooling is typically a one-time upfront cost that enables mass production of your custom design.',
    longDescription:
      'Tooling refers to the specialized equipment -- molds, dies, jigs, fixtures, and patterns -- that a factory creates specifically for your product before mass production can begin. For injection-molded products, tooling is the steel or aluminum mold that shapes molten plastic. For die-cast metal products, it is the die cavity. For stamped sheet metal, it is the stamping die. Tooling is what transforms your product design into a repeatable, mass-producible reality.\n\nTooling costs vary enormously based on product complexity, material, and precision requirements. A simple single-cavity injection mold for a small plastic part might cost $2,000-$5,000. A complex multi-cavity mold with slides, lifters, and hot runners for a large, intricate part could cost $30,000-$100,000 or more. Die-casting molds, CNC fixtures, and progressive stamping dies each have their own cost ranges. These are one-time costs that the factory amortizes across your production volume.\n\nA critical consideration: who owns the tooling? This should be explicitly stated in your manufacturing agreement. In most cases, if you pay for the tooling, you own it. This means you can theoretically move production to a different factory and take your molds with you. Some factories offer "free" tooling by amortizing the cost into per-unit pricing over a committed volume, but this typically means the factory retains ownership. Always negotiate clear tooling ownership terms before production begins.',
    category: 'Manufacturing',
    relatedTerms: ['injection-molding', 'die-casting', 'oem', 'moq', 'rfq'],
    practicalTip:
      'Always ensure your contract states that you own the tooling if you paid for it. Get this in writing before production. Some factories will hold tooling hostage to prevent you from switching manufacturers.',
  },
  {
    slug: 'injection-molding',
    term: 'Injection Molding',
    definition:
      'A manufacturing process where molten plastic is injected under high pressure into a steel or aluminum mold cavity, then cooled to form a solid part. It is the most common process for producing plastic components at scale.',
    longDescription:
      'Injection molding is the workhorse manufacturing process for plastic products. It works by heating plastic resin pellets until molten, then injecting the liquid plastic under high pressure (typically 10,000-30,000 PSI) into a precision-machined mold cavity. The plastic cools and solidifies in the shape of the cavity, the mold opens, the part ejects, and the cycle repeats -- typically every 15-60 seconds depending on part size.\n\nThe economics of injection molding favor high volumes. The upfront tooling cost (the mold) is significant, but once the mold is built, each part costs very little to produce -- often just pennies for small parts. This makes injection molding extremely cost-effective for production runs of 1,000+ units. Common injection-molded products include phone cases, water bottle caps, food containers, toy parts, electronic housings, and automotive interior components.\n\nKey design considerations for injection molding include: uniform wall thickness (to prevent sink marks and warping), draft angles (slight tapers that allow parts to eject from the mold), gate location (where plastic enters the cavity, which can leave a small mark), and undercuts (features that complicate mold design). Working with a designer experienced in DFM (Design for Manufacturability) can save thousands in tooling costs and prevent production headaches.',
    category: 'Manufacturing',
    relatedTerms: ['tooling', 'bom', 'moq', 'blow-molding', 'thermoforming'],
    practicalTip:
      'Request a DFM (Design for Manufacturability) review from your factory before finalizing tooling. They will identify potential issues like sink marks, weld lines, or ejection problems that are cheap to fix in design but expensive to fix in steel.',
  },
  {
    slug: 'die-casting',
    term: 'Die Casting',
    definition:
      'A manufacturing process where molten metal is forced under high pressure into a reusable steel mold (die) to produce complex-shaped metal parts with high dimensional accuracy and smooth surface finish.',
    longDescription:
      'Die casting is a metal forming process used to produce parts with complex geometries, thin walls, and excellent surface finish. Molten metal (most commonly aluminum, zinc, or magnesium alloys) is injected at high pressure into a hardened steel die, where it solidifies rapidly. The process produces near-net-shape parts that require minimal secondary machining, making it economical for medium to high production volumes.\n\nDie casting is used extensively for consumer electronics housings (laptop bodies, speaker enclosures), automotive components (engine blocks, transmission cases), hardware (door handles, cabinet knobs), and industrial equipment. Aluminum die casting is particularly popular for products that need to be lightweight yet rigid, like camera bodies and drone frames. Zinc die casting (using Zamak alloys) is common for smaller, more intricate parts like belt buckles, zipper pulls, and decorative hardware.\n\nThe main trade-offs with die casting are high tooling costs and long tooling lead times. Die casting molds (dies) are machined from tool steel and typically cost $5,000-$50,000 depending on part size and complexity. Lead time for die fabrication is usually 4-8 weeks. However, once the die is complete, per-unit production costs are very competitive, and cycle times are fast (often under 60 seconds per part).',
    category: 'Manufacturing',
    relatedTerms: ['tooling', 'cnc-machining', 'bom', 'moq'],
    practicalTip:
      'Die casting is cost-effective above 1,000 units. For smaller quantities or prototypes, consider CNC machining the same design from billet metal -- it avoids tooling costs and lets you test the market before committing to die investment.',
  },
  {
    slug: 'cnc-machining',
    term: 'CNC Machining',
    definition:
      'A subtractive manufacturing process where computer-controlled cutting tools remove material from a solid block (billet) to create a finished part. CNC offers exceptional precision and works with metals, plastics, and wood.',
    longDescription:
      'CNC (Computer Numerical Control) machining uses computer-programmed machine tools -- mills, lathes, routers, and grinders -- to precisely cut material from a solid block into a finished part. Unlike injection molding or die casting which shape material, CNC is subtractive: you start with more material than you need and cut away the excess. This makes CNC ideal for prototypes, low-volume production, and parts requiring very tight tolerances.\n\nCNC machining is the go-to process for metal prototypes, precision components, and products where surface finish and tolerances are critical. It works with virtually any machinable material: aluminum, steel, titanium, brass, copper, Delrin, nylon, PEEK, and more. Apple uses CNC machining to produce MacBook unibody enclosures from solid blocks of aluminum -- one of the most famous examples of CNC at consumer product scale.\n\nThe economics of CNC favor low to medium volumes. There is no tooling cost (the cutting tools are standard), so setup costs are minimal. However, per-unit costs are higher than injection molding or die casting at volume because each part requires significant machine time. CNC machining costs are driven by: material type and cost, part complexity (number of setups and operations), tolerances required, surface finish requirements, and quantity. It is common to prototype with CNC and then transition to casting or molding for production.',
    category: 'Manufacturing',
    relatedTerms: ['die-casting', 'tooling', '3d-printing', 'bom'],
    practicalTip:
      'Use CNC machining for your first 50-200 units to validate your design before investing in injection mold or die casting tooling. This lets you iterate on the design without expensive mold modifications.',
  },
  {
    slug: '3d-printing',
    term: '3D Printing / Additive Manufacturing',
    definition:
      'A manufacturing process that builds parts layer by layer from digital files, using materials like plastic, resin, metal, or nylon. Ideal for prototyping and very low-volume production with no tooling required.',
    longDescription:
      '3D printing (also called additive manufacturing) creates physical objects by depositing material layer by layer based on a digital 3D model. The main consumer and industrial technologies include FDM (Fused Deposition Modeling, which extrudes plastic filament), SLA (Stereolithography, which cures liquid resin with a laser), SLS (Selective Laser Sintering, which fuses nylon powder), and DMLS (Direct Metal Laser Sintering, which fuses metal powder). Each technology has different strengths in terms of material options, surface finish, precision, and cost.\n\n3D printing has revolutionized product development by making it fast and affordable to produce physical prototypes. A part that might take 6 weeks and $5,000 to produce via CNC machining can often be 3D printed in 1-3 days for $50-$500. This enables rapid design iteration -- you can test, modify, and reprint multiple versions in a week. For DTC founders, this means you can validate form, fit, and function before committing to expensive tooling.\n\nWhile 3D printing is exceptional for prototyping, it has significant limitations for mass production. Per-unit costs do not decrease meaningfully with volume (unlike injection molding). Surface finish is generally inferior to molded or machined parts. Material properties are often weaker than traditionally manufactured equivalents. Print speed limits throughput. That said, some businesses successfully use 3D printing for production of low-volume, high-value items like custom medical devices, jewelry, and aerospace components.',
    category: 'Manufacturing',
    relatedTerms: ['cnc-machining', 'injection-molding', 'tooling', 'rfq'],
    practicalTip:
      'Always 3D print a prototype before committing to tooling. Services like Xometry, Protolabs, and Shapeways offer fast turnaround. Test the physical prototype with real users before investing in production molds.',
  },
  {
    slug: 'extrusion',
    term: 'Extrusion',
    definition:
      'A manufacturing process where material is pushed through a shaped opening (die) to create objects with a continuous cross-sectional profile, like pipes, tubes, channels, and weather stripping.',
    longDescription:
      'Extrusion is a continuous manufacturing process where raw material (typically plastic or aluminum) is heated and forced through a die -- a shaped opening that determines the cross-sectional profile of the finished product. The material emerges from the die in a continuous length, like toothpaste from a tube, and is then cooled, cut to length, and potentially further processed. If you imagine slicing through the finished product at any point along its length and seeing the same cross-section, that product was likely extruded.\n\nPlastic extrusion produces pipes, tubing, window frames, weather stripping, edge trim, and film/sheet stock. Aluminum extrusion produces structural profiles, heat sinks, window frames, curtain rods, and railing systems. The process is extremely efficient for high-volume production of parts with consistent cross-sections. Tooling costs (the extrusion die) are relatively low compared to injection molds -- typically $500-$5,000 for custom profiles.\n\nFor DTC product developers, extrusion is relevant when your product includes tubular, channel, or profile components. Custom aluminum extrusions are popular for product frames, enclosures, and structural elements. Silicone extrusions are used for seals, gaskets, and tubing. Understanding extrusion as a manufacturing option can open up cost-effective design solutions that might not be obvious if you are only thinking in terms of molding and machining.',
    category: 'Manufacturing',
    relatedTerms: ['injection-molding', 'tooling', 'blow-molding', 'bom'],
    practicalTip:
      'Extrusion dies are far cheaper than injection molds ($500-$5,000 vs. $5,000-$50,000). If your product can incorporate extruded profiles for structural elements, it can significantly reduce tooling costs.',
  },
  {
    slug: 'blow-molding',
    term: 'Blow Molding',
    definition:
      'A manufacturing process for creating hollow plastic parts by inflating a heated plastic tube (parison) inside a mold cavity using air pressure. Used for bottles, containers, and hollow shapes.',
    longDescription:
      'Blow molding is the primary manufacturing process for hollow plastic products -- if a product has an enclosed air space, it was probably blow molded. The process starts with a heated tube of plastic (called a parison), which is placed inside a mold. Compressed air is then blown into the parison, inflating it like a balloon to conform to the mold cavity shape. The plastic cools against the mold walls, the mold opens, and the hollow part is ejected.\n\nThere are three main types of blow molding. Extrusion blow molding (EBM) is the most common, used for bottles, jerry cans, and automotive ducting. Injection blow molding (IBM) produces smaller, more precise containers like pharmaceutical bottles. Stretch blow molding (SBM) is used for PET water and soda bottles, where the plastic is both stretched and blown to create oriented molecular structure for strength and clarity.\n\nFor DTC brands in food, beverage, personal care, or household products, blow molding is often relevant for primary packaging. Custom blow molds are moderately priced ($3,000-$15,000) and can produce bottles and containers at very high speeds. If you are designing a product that comes in a custom-shaped bottle or container, understanding blow molding constraints (uniform wall thickness, avoiding sharp corners, allowing for parting lines) will help you create manufacturable designs.',
    category: 'Manufacturing',
    relatedTerms: ['injection-molding', 'extrusion', 'tooling', 'bom'],
    practicalTip:
      'For custom bottles or containers, start by reviewing stock mold options from blow molding suppliers. A stock mold with custom labeling can save $5,000-$15,000 in tooling versus a fully custom bottle shape.',
  },
  {
    slug: 'thermoforming',
    term: 'Thermoforming',
    definition:
      'A manufacturing process where a plastic sheet is heated until pliable, then formed over a mold using vacuum, pressure, or both. Used for packaging trays, clamshells, and large thin-walled parts.',
    longDescription:
      'Thermoforming is a plastic shaping process where a flat sheet of plastic is heated until soft, then formed over or into a mold using vacuum pressure (vacuum forming), air pressure (pressure forming), or both. Once cooled, the plastic retains the mold shape. The formed part is then trimmed from the sheet. Thermoforming is ideal for large, thin-walled parts and packaging where injection molding would be prohibitively expensive due to part size.\n\nThermoforming comes in two main variants. Vacuum forming is simpler and cheaper, producing parts with less detail -- common for packaging trays, blister packs, and simple covers. Pressure forming adds air pressure to push the plastic more tightly against the mold, producing parts with sharper detail, textures, and tighter tolerances -- used for appliance housings, equipment panels, and point-of-purchase displays that mimic the look of injection molding at a fraction of the tooling cost.\n\nThe key advantage of thermoforming for DTC founders is dramatically lower tooling costs compared to injection molding. A thermoforming mold (typically machined from aluminum or even produced from 3D-printed patterns) might cost $1,000-$10,000 versus $10,000-$100,000 for an equivalent injection mold. The trade-off is that thermoforming is limited to relatively simple geometries, cannot produce enclosed features, and has less dimensional precision than injection molding.',
    category: 'Manufacturing',
    relatedTerms: ['injection-molding', 'blow-molding', 'tooling', 'bom'],
    practicalTip:
      'Consider thermoforming for large parts or product packaging. It offers 80% of the visual quality of injection molding at 10-20% of the tooling cost. Ideal for packaging inserts, display trays, and large enclosures.',
  },

  // ── Quality ──────────────────────────────────────────────────────────
  {
    slug: 'qc',
    term: 'Quality Control',
    acronym: 'QC',
    definition:
      'The process of inspecting products during and after manufacturing to ensure they meet specifications. QC includes incoming material inspection, in-process checks, and final random sampling before shipment.',
    longDescription:
      'Quality Control (QC) is the systematic process of verifying that manufactured products meet your specifications and quality standards. In the context of importing from overseas factories, QC typically involves three stages: incoming material inspection (verifying raw materials meet specs), in-process inspection (checking quality during production), and final inspection (random sampling of finished goods before shipment).\n\nFor most DTC importers, the most critical QC touchpoint is the pre-shipment inspection (PSI), conducted when production is 80-100% complete. This involves a third-party inspector visiting the factory, randomly sampling products according to AQL (Acceptable Quality Level) standards, and checking them against your specifications and a detailed checklist. Common checks include dimensions, weight, color matching, functionality testing, labeling accuracy, packaging quality, and drop/stress tests.\n\nThe cost of QC inspections is one of the best investments you can make as an importer. A standard third-party inspection costs $200-$400 per day (companies like QIMA, SGS, Bureau Veritas, and AsiaInspection offer this service). Compare this to the cost of receiving a container of defective products: lost sales, customer returns, negative reviews, and potential safety liability. Many experienced importers budget 1-2% of order value for QC costs.',
    category: 'Quality',
    relatedTerms: ['aql', 'first-article-inspection', 'pre-shipment-inspection', 'iso-9001'],
    practicalTip:
      'Never skip pre-shipment inspection, even with trusted suppliers. Quality can drift between orders. Budget $200-$400 per inspection through services like QIMA or SGS -- it is the cheapest insurance in importing.',
  },
  {
    slug: 'aql',
    term: 'Acceptable Quality Level',
    acronym: 'AQL',
    definition:
      'A statistical sampling system that defines the maximum acceptable defect rate in a production batch. AQL tables specify how many units to inspect and how many defects are allowed based on batch size.',
    longDescription:
      'Acceptable Quality Level (AQL) is the international standard (ISO 2859-1) for statistical quality sampling during product inspections. Rather than inspecting every single unit in a production run (which would be prohibitively expensive), AQL provides a scientific method for determining how many units to randomly sample and how many defects can be found before the batch is rejected.\n\nAQL is expressed as a percentage representing the maximum defect rate considered acceptable. The most common AQL levels used in consumer products are: AQL 0.65 for critical defects (safety hazards -- essentially zero tolerance), AQL 2.5 for major defects (functional problems that would cause a customer complaint or return), and AQL 4.0 for minor defects (cosmetic issues that most customers would not notice). These levels mean you are accepting a 0.65%, 2.5%, and 4.0% probability of defective units, respectively.\n\nHere is how it works in practice: if your production batch is 5,000 units and you are using General Inspection Level II (the standard level), the AQL table tells you to randomly inspect 200 units. At AQL 2.5 for major defects, you can accept the batch if 10 or fewer of those 200 units have major defects, but must reject the batch if 11 or more have major defects. The sample size and accept/reject numbers are all predetermined by the AQL tables based on your batch size and chosen inspection level.',
    category: 'Quality',
    relatedTerms: ['qc', 'pre-shipment-inspection', 'first-article-inspection'],
    practicalTip:
      'Use AQL 2.5 for major defects (the industry standard for consumer products). For your first order with a new supplier, consider tightening to AQL 1.5 until you have confidence in their quality consistency.',
  },
  {
    slug: 'first-article-inspection',
    term: 'First Article Inspection',
    acronym: 'FAI',
    definition:
      'A thorough inspection of the very first production units off the line before mass production begins. FAI verifies that the factory can produce your product correctly and catches problems before they multiply across thousands of units.',
    longDescription:
      'A First Article Inspection (FAI) is a comprehensive quality check performed on the initial units produced at the start of a production run, before the factory ramps up to full speed. The purpose is to verify that the factory has correctly interpreted your specifications, set up tooling properly, and can produce conforming products. Finding a dimensional error or color mismatch at this stage costs almost nothing to fix; finding it after 10,000 units are produced can be catastrophic.\n\nDuring an FAI, the inspector checks every specification on your product drawing and quality checklist against the actual produced sample. This includes precise dimensional measurements (using calipers, CMMs, or gauges), material verification, color matching against Pantone references or approved samples, functionality testing, assembly verification, labeling and packaging review, and often destructive testing (cut-tests for material thickness, drop tests, etc.).\n\nFAI is especially critical for first-time production runs with a new supplier, products with tight tolerances, safety-critical items, and products where the tooling or manufacturing process has been modified. Many importers make the mistake of skipping FAI and only doing a pre-shipment inspection. By that point, if there is a systematic problem, the entire production run may be defective and the only options are rework (expensive) or rejection (very expensive).',
    category: 'Quality',
    relatedTerms: ['qc', 'aql', 'pre-shipment-inspection', 'tooling'],
    practicalTip:
      'Always request an FAI when starting production with a new factory or launching a new product. Ask the factory to send you photos and measurements of the first 5-10 units for your approval before they continue production.',
  },
  {
    slug: 'pre-shipment-inspection',
    term: 'Pre-Shipment Inspection',
    acronym: 'PSI',
    definition:
      'A quality inspection conducted when production is 80-100% complete, using AQL sampling to determine whether the batch meets quality standards before it ships. The last line of defense before goods leave the factory.',
    longDescription:
      'Pre-Shipment Inspection (PSI) is the most common type of quality inspection in international trade. It is conducted at the factory when at least 80% of the order is finished and export-packed. A trained inspector randomly samples products from the completed batch according to AQL standards, systematically checks them against your specifications and quality checklist, and issues a pass, fail, or conditional pass report.\n\nA standard PSI covers: quantity verification (are all ordered units produced?), workmanship check (visual inspection for defects), dimensional check (measurements against specs), functionality testing (does the product work as intended?), labeling and packaging verification (correct labels, barcodes, carton markings), barcode scanning (ensuring barcodes are readable), drop test (carton dropped from specified height to check protective packaging), and product-specific tests (water resistance, weight, color matching, etc.).\n\nThe PSI report typically includes a clear pass/fail/pending recommendation, defect photos with descriptions, a summary of quantities checked and defects found by category (critical, major, minor), and overall batch disposition. If the batch fails, you have several options: request the factory to sort and rework defective units and re-inspect, negotiate a price discount to accept the batch with known defects, or reject the batch entirely. Having a PSI report gives you documented leverage for these negotiations.',
    category: 'Quality',
    relatedTerms: ['qc', 'aql', 'first-article-inspection', 'iso-9001'],
    practicalTip:
      'Book your PSI when the factory reports 80% production completion. Create a detailed inspection checklist with photos of acceptable vs. unacceptable quality. Share this with both the factory and the inspection company.',
  },
  {
    slug: 'iso-9001',
    term: 'ISO 9001',
    definition:
      'The international standard for Quality Management Systems (QMS). An ISO 9001 certified factory has documented processes for consistent quality, but certification alone does not guarantee product quality.',
    longDescription:
      'ISO 9001 is the world\'s most widely recognized quality management standard, published by the International Organization for Standardization (ISO). It specifies requirements for a Quality Management System (QMS) -- a documented framework of processes, procedures, and responsibilities for achieving quality objectives. When a factory is "ISO 9001 certified," it means an accredited auditing body has verified that the factory has implemented and maintains a QMS that meets the standard\'s requirements.\n\nIt is important to understand what ISO 9001 does and does not guarantee. It certifies that the factory has quality processes in place: documented procedures, management commitment, internal auditing, corrective action systems, supplier management, and continuous improvement mechanisms. It does NOT certify that the factory\'s products are good, that their workers are skilled, or that your specific order will be defect-free. A factory can be ISO 9001 certified and still produce poor-quality products if their quality targets are set low.\n\nThat said, ISO 9001 certification is a meaningful signal. It demonstrates the factory has invested in quality infrastructure, submits to external audits, and has at minimum a systematic approach to quality management. When evaluating suppliers, treat ISO 9001 as a baseline qualification (factories without it may lack basic quality systems) but not as a guarantee. Always combine supplier certifications with your own QC processes: factory audits, sample evaluation, and third-party inspections.',
    category: 'Quality',
    relatedTerms: ['iso-13485', 'qc', 'aql', 'first-article-inspection'],
    practicalTip:
      'ISO 9001 is necessary but not sufficient. Ask to see the factory\'s actual certificate (check the expiration date and certifying body), but always conduct your own quality inspections regardless of their certifications.',
  },
  {
    slug: 'iso-13485',
    term: 'ISO 13485',
    definition:
      'The international standard for Quality Management Systems specific to medical device manufacturing. Required for factories producing medical devices intended for regulated markets like the US and EU.',
    longDescription:
      'ISO 13485 is the specialized quality management standard for organizations involved in the design, production, installation, and servicing of medical devices. While it shares the same quality management framework as ISO 9001, it includes additional requirements specific to medical device manufacturing: design controls, risk management (per ISO 14971), traceability, sterile manufacturing controls, and regulatory compliance documentation.\n\nIf you are developing a medical device or health-related product, working with an ISO 13485 certified manufacturer is typically a regulatory requirement, not just a nice-to-have. The US FDA expects medical device manufacturers to maintain quality systems equivalent to 21 CFR Part 820 (Quality System Regulation), and ISO 13485 is recognized as substantially equivalent. The EU Medical Device Regulation (MDR) similarly requires ISO 13485 compliance for CE marking.\n\nFinding ISO 13485 certified contract manufacturers requires more targeted sourcing than standard consumer products. Medical device contract manufacturing hubs include Shenzhen and Suzhou (China), Penang (Malaysia), Guadalajara and Tijuana (Mexico), and various locations in Ireland and Germany. Expect higher per-unit costs, longer qualification timelines, and more extensive documentation requirements compared to standard consumer product manufacturing.',
    category: 'Quality',
    relatedTerms: ['iso-9001', 'fda-compliance', 'ce-marking', 'qc'],
    practicalTip:
      'If your product touches the body or makes health claims, you likely need an ISO 13485 certified manufacturer. Start the manufacturer qualification process early -- it can take 3-6 months to validate a medical device supplier.',
  },
  {
    slug: 'rohs',
    term: 'Restriction of Hazardous Substances',
    acronym: 'RoHS',
    definition:
      'An EU directive restricting the use of specific hazardous materials (lead, mercury, cadmium, etc.) in electrical and electronic equipment. RoHS compliance is required for selling electronics in the EU and is widely adopted globally.',
    longDescription:
      'RoHS (Restriction of Hazardous Substances) is a European Union directive (2011/65/EU, commonly called RoHS 2) that restricts the use of ten hazardous substances in electrical and electronic equipment (EEE). The restricted substances include lead (Pb), mercury (Hg), cadmium (Cd), hexavalent chromium (Cr6+), polybrominated biphenyls (PBB), polybrominated diphenyl ethers (PBDE), and four types of phthalates (DEHP, BBP, DBP, DIBP). Maximum concentration limits are set at 0.1% by weight for most substances and 0.01% for cadmium.\n\nWhile RoHS is an EU directive, its influence is global. Most reputable electronics manufacturers now produce RoHS-compliant products by default, because maintaining separate compliant and non-compliant production lines is impractical. Many other countries have adopted similar regulations (China RoHS, Korea RoHS, India RoHS), and major US retailers increasingly require RoHS compliance even though the US has not adopted a federal equivalent.\n\nFor DTC founders selling electronics or products containing electronic components, RoHS compliance is straightforward if you work with established manufacturers. Ask your supplier for a RoHS declaration of conformity and material test reports. The supplier should be able to provide XRF (X-ray fluorescence) test results for each material in the product demonstrating compliance with the restricted substance limits.',
    category: 'Quality',
    relatedTerms: ['reach', 'ce-marking', 'ul-certification', 'cpsia'],
    practicalTip:
      'Request RoHS test reports from your supplier, not just a self-declaration. Reputable factories will have XRF test results available. If selling globally, treat RoHS compliance as a baseline requirement for any product with electronic components.',
  },
  {
    slug: 'reach',
    term: 'Registration, Evaluation, Authorization and Restriction of Chemicals',
    acronym: 'REACH',
    definition:
      'An EU regulation governing the use of chemical substances in products sold in Europe. REACH applies to all physical products (not just electronics) and restricts over 200 Substances of Very High Concern (SVHCs).',
    longDescription:
      'REACH (EC 1907/2006) is the European Union\'s comprehensive chemical regulation framework. Unlike RoHS, which targets specific substances in electronics, REACH applies to virtually all products sold in the EU and covers a much broader range of chemicals. The regulation requires manufacturers and importers to identify and manage risks linked to chemicals used in their products, and to provide safety information to users.\n\nThe key concept in REACH is the "Candidate List" of Substances of Very High Concern (SVHCs), which is updated twice a year and currently contains over 200 substances. If any SVHC is present in your product above 0.1% by weight, you must notify the European Chemicals Agency (ECHA) and inform your customers. Some SVHCs are further added to the "Authorization List," meaning they cannot be used without specific authorization from ECHA.\n\nFor DTC founders, REACH compliance requires understanding the chemical composition of every material in your product. This is managed through your supply chain: you request REACH compliance declarations from your material suppliers and manufacturers, who should be able to confirm that their materials do not contain restricted SVHCs above threshold levels. Third-party testing through labs like SGS, Bureau Veritas, or Intertek can verify compliance if supplier declarations are insufficient.',
    category: 'Quality',
    relatedTerms: ['rohs', 'ce-marking', 'cpsia', 'fda-compliance'],
    practicalTip:
      'REACH applies to ALL products sold in the EU, not just chemicals or electronics. Ask your supplier for a REACH SVHC declaration. If they are unfamiliar with REACH, it is a red flag about their export experience.',
  },
  {
    slug: 'cpsia',
    term: 'Consumer Product Safety Improvement Act',
    acronym: 'CPSIA',
    definition:
      'US federal law establishing safety standards for consumer products, with especially strict requirements for children\'s products including lead limits, phthalate restrictions, and mandatory third-party testing.',
    longDescription:
      'The Consumer Product Safety Improvement Act (CPSIA), enacted in 2008, is the primary US federal law governing consumer product safety, enforced by the Consumer Product Safety Commission (CPSC). While it applies broadly to consumer products, its most stringent requirements target children\'s products (designed or intended primarily for children 12 years and under).\n\nFor children\'s products, CPSIA requires: total lead content below 100 ppm in any accessible part, specific phthalate restrictions (DEHP, DBP, BBP, DINP, DIBP, DPENP, DHEXP, and DCHP are banned above 0.1%), compliance with applicable ASTM F963 toy safety standard, mandatory third-party testing by a CPSC-accepted laboratory, a Children\'s Product Certificate (CPC) based on third-party test results, permanent tracking labels on products and packaging, and age-grade labeling and choking hazard warnings where applicable.\n\nCPSIA compliance costs can be significant for DTC founders in the children\'s products space. Third-party testing typically costs $2,000-$8,000 per SKU depending on the product and number of tests required. Testing must be performed by a CPSC-accepted laboratory (not just any lab), and must be repeated periodically or whenever the product design, materials, or manufacturing process changes. Budget for testing costs in your product development timeline and factor them into your per-unit cost analysis.',
    category: 'Quality',
    relatedTerms: ['rohs', 'reach', 'fda-compliance', 'ul-certification'],
    practicalTip:
      'If your product targets children under 12, budget $3,000-$8,000 per SKU for CPSIA testing. Start the testing process during your sample approval phase, not after production is complete -- failed tests mean costly redesigns.',
  },
  {
    slug: 'fda-compliance',
    term: 'FDA Compliance',
    definition:
      'Meeting the requirements of the US Food and Drug Administration for products under its jurisdiction, including food-contact materials, cosmetics, dietary supplements, medical devices, and pharmaceutical products.',
    longDescription:
      'FDA compliance encompasses a range of requirements that vary significantly depending on your product category. The FDA regulates food and food-contact materials, cosmetics, dietary supplements, over-the-counter drugs, medical devices, tobacco products, and animal products. The specific compliance requirements differ dramatically between categories -- a food-contact silicone spatula has very different FDA obligations than a Class II medical device.\n\nFor food-contact products (kitchenware, food storage, drinkware), FDA compliance means the materials used must be recognized as safe for food contact under 21 CFR Parts 170-199. Common requirements include: materials must be "food-grade" (FDA-approved polymers, food-safe coatings, compliant inks), manufacturing must occur in sanitary conditions, and products must not impart taste, color, or harmful substances to food. There is no pre-market FDA approval required for most food-contact articles, but you must be able to demonstrate compliance if challenged.\n\nFor cosmetics, FDA registration is technically voluntary, but ingredient restrictions and labeling requirements are mandatory. Medical devices require varying levels of FDA involvement: Class I devices may only need registration and listing, while Class II devices typically require a 510(k) premarket submission, and Class III devices need full Premarket Approval (PMA). Understanding your FDA classification early in product development is critical for timeline and budget planning.',
    category: 'Quality',
    relatedTerms: ['cpsia', 'iso-13485', 'ul-certification', 'ce-marking'],
    practicalTip:
      'Identify your FDA product classification before starting product development. Requirements range from simple self-certification (food-contact items) to multi-year approval processes (medical devices). This determines your timeline and budget.',
  },
  {
    slug: 'ul-certification',
    term: 'UL Certification',
    acronym: 'UL',
    definition:
      'Safety certification from Underwriters Laboratories (UL) for products that involve electrical components, fire risk, or safety-critical applications. While not legally required, UL certification is effectively mandatory for retail distribution in the US.',
    longDescription:
      'UL (Underwriters Laboratories) is a global safety certification company that tests products to published safety standards and certifies those that pass. UL certification (indicated by the UL mark on the product) means the product has been independently tested and found to comply with specific safety standards for its category. Common UL standards include UL 60950 (IT equipment), UL 1026 (electric household cooking appliances), UL 2056 (portable lithium-ion batteries), and hundreds of others.\n\nWhile UL certification is not legally mandated by the US government (with some exceptions like products installed in buildings, which must meet UL or equivalent standards per building codes), it is effectively required for commercial success. Major retailers (Amazon, Walmart, Target, Best Buy) require UL certification for electrical products. Insurance companies may deny claims for fires caused by non-UL-certified products. Amazon has increasingly been suspending listings for electrical products lacking UL certification.\n\nThe UL certification process involves submitting product samples to a UL laboratory, where engineers test them against the applicable standard. If the product passes, UL issues a certificate and conducts periodic factory inspections to ensure continued compliance. The process typically takes 8-16 weeks and costs $5,000-$50,000 depending on the product type and applicable standards. Plan for this in your product development timeline -- it cannot be done retroactively after products are manufactured.',
    category: 'Quality',
    relatedTerms: ['ce-marking', 'fda-compliance', 'rohs', 'cpsia'],
    practicalTip:
      'Start the UL certification process in parallel with tooling development, not after production. It takes 8-16 weeks. If your factory is already UL-certified for similar products, the process may be faster and cheaper.',
  },
  {
    slug: 'ce-marking',
    term: 'CE Marking',
    acronym: 'CE',
    definition:
      'A mandatory conformity marking for products sold in the European Economic Area (EEA), indicating compliance with EU health, safety, and environmental protection legislation. Required for electronics, toys, machinery, medical devices, and many other product categories.',
    longDescription:
      'CE marking (from the French "Conformit\u00e9 Europ\u00e9enne") is a mandatory certification mark for products sold in the European Economic Area. It indicates that the product complies with all applicable EU directives and regulations for its product category. Unlike UL, which is a third-party certification, CE marking is primarily a self-declaration by the manufacturer or importer -- though certain product categories require third-party assessment by a "Notified Body."\n\nThe CE marking process involves: identifying which EU directives apply to your product (a toy might fall under the Toy Safety Directive, EMC Directive, and RoHS Directive simultaneously), ensuring the product meets all requirements of each applicable directive, preparing technical documentation, performing or commissioning any required testing, drafting a Declaration of Conformity (DoC), and affixing the CE mark to the product. For most consumer products, you can self-declare conformity based on test results from a competent laboratory.\n\nFor DTC founders planning to sell in Europe (directly or through Amazon EU), CE marking is non-negotiable. Products without CE marking can be seized at EU borders and you can face significant fines. Your factory may offer to handle CE marking, but as the importer of record in the EU, the legal responsibility for compliance falls on you. Always verify the factory\'s CE documentation independently rather than simply trusting their claims.',
    category: 'Quality',
    relatedTerms: ['ul-certification', 'rohs', 'reach', 'fda-compliance'],
    practicalTip:
      'CE marking is your legal responsibility as the EU importer, not the factory\'s. Even if the factory provides CE documentation, verify it independently. Budget EUR 2,000-10,000 for testing depending on product type.',
  },

  // ── Logistics ────────────────────────────────────────────────────────
  {
    slug: 'hts',
    term: 'Harmonized Tariff Schedule',
    acronym: 'HTS',
    definition:
      'The US system for classifying imported goods and determining applicable duty rates. Every imported product is assigned an HTS code that determines how much customs duty you pay.',
    longDescription:
      'The Harmonized Tariff Schedule of the United States (HTSUS or HTS) is the comprehensive classification system used by US Customs and Border Protection (CBP) to categorize imported goods and determine applicable duty rates. The HTS is based on the international Harmonized System (HS) developed by the World Customs Organization, with the first 6 digits being internationally standardized and the remaining digits being US-specific for tariff purposes.\n\nHTS codes are typically 10 digits long. The structure works like this: Chapter (first 2 digits, e.g., 85 for electrical machinery), Heading (first 4 digits, e.g., 8518 for microphones and speakers), Subheading (first 6 digits, e.g., 8518.30 for headphones), and US-specific classification (digits 7-10, e.g., 8518.30.2000 for over-ear headphones). Each level of specificity can have different duty rates.\n\nCorrect HTS classification is critically important for several reasons. First, it directly determines your duty rate, which can range from 0% to 50%+ depending on the product and country of origin. Misclassification can result in overpaying duties (costing you money) or underpaying duties (resulting in penalties, fines, and potential fraud charges from CBP). Second, HTS classification determines whether your products are subject to additional tariffs like Section 301 (China tariffs) or antidumping duties. Work with a licensed customs broker to ensure correct classification.',
    category: 'Logistics',
    relatedTerms: ['hs-code', 'customs-broker', 'landed-cost', 'duty-drawback'],
    practicalTip:
      'Get a binding ruling from CBP on your HTS classification before your first import. This eliminates classification risk and gives you a definitive duty rate for your landed cost calculations.',
  },
  {
    slug: 'hs-code',
    term: 'Harmonized System Code',
    acronym: 'HS',
    definition:
      'An international product classification system using 6-digit codes standardized by the World Customs Organization. The first 6 digits are universal; countries add additional digits for national tariff and statistical purposes.',
    longDescription:
      'The Harmonized System (HS) is the global standard for classifying traded products, maintained by the World Customs Organization (WCO) and used by over 200 countries. The HS uses a standardized 6-digit code structure to classify every physical product in international trade. When people refer to an "HS code," they typically mean these first 6 internationally harmonized digits.\n\nThe HS code structure is hierarchical: Chapters (2 digits) group products broadly (e.g., Chapter 61: knitted apparel), Headings (4 digits) provide more specificity (e.g., 6109: T-shirts and vests), and Subheadings (6 digits) offer the finest internationally standardized classification (e.g., 6109.10: T-shirts of cotton). Beyond 6 digits, each country adds its own extensions for tariff and statistical purposes -- this is where the US HTS, EU TARIC, and other national tariff schedules diverge.\n\nUnderstanding HS codes is essential for accurate cost estimation. Your HS code determines duty rates in every country you sell to, affects whether your products qualify for preferential treatment under free trade agreements (like USMCA or CPTPP), and determines whether additional trade remedies (antidumping duties, countervailing duties, Section 301 tariffs) apply. Your factory should provide the HS code on their commercial invoice, but always verify it independently or with your customs broker.',
    category: 'Logistics',
    relatedTerms: ['hts', 'customs-broker', 'landed-cost', 'incoterms'],
    practicalTip:
      'Your factory\'s suggested HS code is not always correct. Verify it using the USITC HTS search tool (hts.usitc.gov) or consult a customs broker. An incorrect HS code can mean paying thousands extra in duties -- or facing penalties for underpayment.',
  },
  {
    slug: 'bill-of-lading',
    term: 'Bill of Lading',
    acronym: 'B/L',
    definition:
      'A legal document issued by the carrier (shipping line) that serves as a receipt for goods, a contract of carriage, and a document of title. It is one of the most important documents in international shipping.',
    longDescription:
      'The Bill of Lading (B/L or BOL) is the cornerstone document of ocean freight shipping, serving three simultaneous functions: it is a receipt acknowledging that the carrier has received the goods, a contract between the shipper and carrier defining the terms of transport, and a document of title that can be used to transfer ownership of the goods. There are different types: an Original B/L (a negotiable document of title that must be physically presented to claim goods), a Telex Release (an electronic release that eliminates the need for original documents), and a Sea Waybill (a non-negotiable receipt commonly used for shipments between trusted parties).\n\nThe information on a B/L includes: shipper name and address, consignee (receiver) name and address, notify party, vessel name and voyage number, port of loading and port of discharge, container numbers, goods description, weight and measurements, freight charges (prepaid or collect), number of original B/Ls issued, and the date the goods were loaded on board. Every detail must be accurate -- discrepancies can cause customs clearance delays.\n\nFor DTC importers, the most important B/L decision is whether to use an Original B/L or a Telex Release. Original B/Ls provide maximum security (the cargo cannot be released without the physical document) but can cause delays if the documents arrive after the ship. Telex Release is faster and simpler. Most importers working with trusted freight forwarders use Telex Release for routine shipments and reserve Original B/Ls for situations where additional security is needed, such as when using a Letter of Credit.',
    category: 'Logistics',
    relatedTerms: ['freight-forwarder', 'fcl', 'lcl', 'port-of-loading', 'port-of-discharge'],
    practicalTip:
      'Use Telex Release instead of Original B/L for routine shipments to avoid delays from physical document courier. Save Original B/Ls for Letter of Credit transactions where the bank requires them.',
  },
  {
    slug: 'lcl',
    term: 'Less than Container Load',
    acronym: 'LCL',
    definition:
      'A shipping method where your cargo shares a container with goods from other shippers. Used when your shipment is too small to fill a full container, typically under 15 cubic meters.',
    longDescription:
      'Less than Container Load (LCL) is a shipping method where your cargo is consolidated with goods from other shippers into a shared container. This is the standard shipping method for smaller shipments that do not justify the cost of a full 20-foot or 40-foot container. LCL is priced per cubic meter (CBM) or per revenue ton (whichever is greater), with rates typically ranging from $30-$100 per CBM depending on the trade lane and season.\n\nThe LCL process works as follows: your goods are delivered to a Container Freight Station (CFS) at the origin port, where they are consolidated with other shippers\' goods into a shared container. At the destination port, the container goes to the destination CFS, where it is deconsolidated and individual shipments are made available for pickup or delivery. This additional handling at both ends adds time (typically 3-7 extra days) and cost (CFS handling charges) compared to FCL.\n\nLCL makes economic sense for shipments under approximately 15 CBM (cubic meters). Above that volume, an FCL container often becomes more cost-effective because you avoid CFS handling charges, reduce transit time, lower the risk of damage from co-loading with other cargo, and pay a fixed container rate regardless of how full it is. The break-even point between LCL and FCL depends on the specific trade lane and current freight rates.',
    category: 'Logistics',
    relatedTerms: ['fcl', 'freight-forwarder', 'bill-of-lading', 'landed-cost'],
    practicalTip:
      'LCL is cost-effective up to about 10-15 CBM. Get both LCL and FCL quotes from your freight forwarder for every shipment -- the crossover point where FCL becomes cheaper varies by trade lane and season.',
  },
  {
    slug: 'fcl',
    term: 'Full Container Load',
    acronym: 'FCL',
    definition:
      'A shipping method where you rent an entire container (20-foot or 40-foot) exclusively for your goods. More cost-effective than LCL for larger shipments and offers faster transit times with lower damage risk.',
    longDescription:
      'Full Container Load (FCL) means you have exclusive use of an entire shipping container for your goods. Standard container sizes are 20-foot (approximately 33 CBM capacity, 21,700 kg max payload), 40-foot (approximately 67 CBM, 26,500 kg max), and 40-foot High Cube (approximately 76 CBM, 26,280 kg max). The 40-foot High Cube (40HC) is the most commonly used container in consumer product imports due to its additional height (9.5 feet vs. 8.5 feet standard).\n\nFCL offers several advantages over LCL: lower per-CBM cost for large shipments, faster transit times (no CFS consolidation/deconsolidation delays), reduced risk of cargo damage (your goods are not handled at CFS facilities or stacked with other cargo), better security (the container is sealed at the factory and ideally not opened until it reaches your warehouse), and simpler logistics (one container, one delivery). FCL containers can often be loaded directly at the factory ("factory-stuffed"), eliminating the need for inland transport to a CFS.\n\nFCL pricing is quoted as a flat rate per container, regardless of how full it is. This creates the incentive to maximize container utilization -- an 80% full container costs the same as a 100% full one. Work with your freight forwarder to optimize loading plans, consider consolidating orders from multiple suppliers into one container, and coordinate order timing to maximize container fill rates. A well-loaded 40HC container can hold approximately 20,000-30,000 units of typical consumer products, depending on product size.',
    category: 'Logistics',
    relatedTerms: ['lcl', 'freight-forwarder', 'bill-of-lading', 'port-of-loading'],
    practicalTip:
      'A 40HC container is the sweet spot for most DTC imports. Ask your freight forwarder for a loading plan showing how many cartons fit. Aim for 85%+ utilization -- every empty space in a container is money wasted.',
  },
  {
    slug: 'freight-forwarder',
    term: 'Freight Forwarder',
    definition:
      'A logistics company that arranges international shipping on your behalf, handling booking cargo space, documentation, customs brokerage, and coordinating the door-to-door movement of your goods.',
    longDescription:
      'A freight forwarder is your logistics partner for international shipping. They act as an intermediary between you and the various carriers (ocean lines, airlines, trucking companies) and service providers (customs brokers, warehouses, insurance companies) involved in moving goods from a factory overseas to your warehouse or fulfillment center. Think of them as a travel agent for your cargo.\n\nA good freight forwarder handles: quoting and booking ocean, air, or multimodal transport, preparing and managing shipping documentation (B/L, commercial invoice, packing list), arranging cargo insurance, coordinating customs clearance at both origin and destination (often through in-house or partner customs brokers), arranging last-mile trucking delivery, tracking your shipment in transit, and advising on regulatory requirements and cost optimization strategies.\n\nChoosing the right freight forwarder is one of the most impactful decisions for a DTC importer. Key criteria include: experience with your specific trade lane (e.g., China to US West Coast), competitive rates (get quotes from 3-5 forwarders), communication quality and responsiveness, in-house customs brokerage capabilities, technology platform for tracking and documentation, and references from other importers. Digital freight forwarders like Flexport, Freightos, and Zencargo offer tech-forward platforms with transparent pricing, while traditional forwarders may offer deeper relationships and more personalized service.',
    category: 'Logistics',
    relatedTerms: ['customs-broker', 'bill-of-lading', 'fcl', 'lcl', 'fob'],
    practicalTip:
      'Interview at least 3 freight forwarders before choosing one. Ask about their experience with your product type and trade lane, request references, and compare all-in pricing (not just freight rates -- include origin charges, destination charges, and customs brokerage fees).',
  },
  {
    slug: 'customs-broker',
    term: 'Customs Broker',
    definition:
      'A licensed professional authorized to clear goods through customs on behalf of importers. In the US, customs brokers must hold a federal license and are responsible for correctly classifying goods, calculating duties, and ensuring regulatory compliance.',
    longDescription:
      'A customs broker is a licensed specialist who handles the complex process of clearing your imported goods through US Customs and Border Protection (CBP). In the US, customs brokers must pass a rigorous federal exam and hold a CBP-issued license. They serve as your agent at the border, submitting entry paperwork, paying duties and taxes on your behalf, and ensuring your imports comply with all applicable regulations.\n\nThe customs broker\'s responsibilities include: filing entry documents with CBP (the ISF/10+2, entry summary, and supporting documentation), classifying your products under the correct HTS codes, calculating and paying applicable duties and taxes, ensuring compliance with Other Government Agency (OGA) requirements (FDA, CPSC, EPA, FCC, etc.), managing examination and hold situations if CBP selects your shipment for inspection, and maintaining records for the required 5-year retention period.\n\nMany freight forwarders offer in-house customs brokerage, which simplifies your logistics chain by having a single point of contact. Alternatively, you can hire an independent customs broker. The cost of customs brokerage is modest -- typically $100-$200 per entry for standard shipments, plus any examination or special handling fees. This is a small price for professional handling of a process where errors can result in penalties, shipment delays, or even seizure of goods.',
    category: 'Logistics',
    relatedTerms: ['freight-forwarder', 'hts', 'hs-code', 'bonded-warehouse', 'landed-cost'],
    practicalTip:
      'Use a licensed customs broker for every import shipment. The $100-$200 per entry fee is trivial compared to the penalties for incorrect classification or missing compliance requirements. Many freight forwarders include brokerage in their service.',
  },
  {
    slug: 'bonded-warehouse',
    term: 'Bonded Warehouse',
    definition:
      'A customs-approved storage facility where imported goods can be stored without paying duties or taxes until they are withdrawn for domestic consumption, re-exported, or destroyed.',
    longDescription:
      'A bonded warehouse (also called a customs bonded warehouse or CBW) is a secure storage facility licensed by customs authorities where imported goods can be held without payment of import duties and taxes. Duties are deferred until the goods are officially "entered" into the domestic commerce of the country. If goods are re-exported, duties may never need to be paid at all. In the US, bonded warehouses are authorized under 19 CFR Part 19.\n\nBonded warehousing offers several strategic advantages for importers. Cash flow optimization is the primary benefit: instead of paying duties on your entire container upon arrival, you only pay duties as you withdraw goods from the bonded warehouse for sale. This is particularly valuable for seasonal products or slow-moving inventory. Goods can be stored in a bonded warehouse for up to 5 years in the US before duties must be paid or the goods must be exported or destroyed.\n\nOther uses for bonded warehouses include: holding goods pending product testing or certification (you do not want to pay duties on products that might fail testing), storing goods intended for re-export (no duties owed), performing minor processing like labeling, repacking, or sorting (certain operations are permitted), and managing inventory for foreign trade zone (FTZ) operations. For DTC founders with inconsistent sales velocity or products requiring post-import processing, bonded warehousing can significantly improve cash flow.',
    category: 'Logistics',
    relatedTerms: ['customs-broker', 'hts', 'landed-cost', 'duty-drawback'],
    practicalTip:
      'Consider bonded warehousing if you import large quantities but sell gradually. Deferring duties until you actually sell the goods can free up significant working capital, especially for high-duty products.',
  },
  {
    slug: 'incoterms',
    term: 'Incoterms',
    definition:
      'A set of 11 internationally recognized trade terms published by the International Chamber of Commerce (ICC) that define the responsibilities, costs, and risks between buyers and sellers in international transactions.',
    longDescription:
      'Incoterms (International Commercial Terms) are a standardized set of 11 trade terms published by the International Chamber of Commerce (ICC), most recently updated in 2020. They define precisely who is responsible for what in an international transaction: which party arranges transport, which party pays for transport, where risk transfers from seller to buyer, which party handles customs clearance, and which party arranges insurance.\n\nThe 11 Incoterms 2020 rules are divided into two groups. Rules for any mode of transport: EXW (Ex Works), FCA (Free Carrier), CPT (Carriage Paid To), CIP (Carriage and Insurance Paid To), DAP (Delivered at Place), DPU (Delivered at Place Unloaded), and DDP (Delivered Duty Paid). Rules for sea and inland waterway transport only: FAS (Free Alongside Ship), FOB (Free on Board), CFR (Cost and Freight), and CIF (Cost, Insurance, and Freight). Using the wrong Incoterm for your transport mode can create legal ambiguity.\n\nFor DTC importers, the most commonly used Incoterms are FOB (you control shipping, the most popular choice), CIF (supplier handles shipping but you handle customs), and DDP (supplier handles everything, used mainly for samples). When specifying an Incoterm, always include the year version and the named place: "FOB Shenzhen (Incoterms 2020)" is a complete reference; "FOB" alone is ambiguous and can lead to disputes.',
    category: 'Logistics',
    relatedTerms: ['fob', 'cif', 'ddp', 'exw', 'fca', 'dap', 'cfr'],
    practicalTip:
      'Always specify the Incoterms version year and named place in contracts: "FOB Shanghai (Incoterms 2020)" not just "FOB." This eliminates ambiguity about which rules apply and exactly where cost and risk transfer.',
  },
  {
    slug: 'port-of-loading',
    term: 'Port of Loading',
    acronym: 'POL',
    definition:
      'The port where goods are loaded onto the ocean vessel at the origin country. The choice of POL affects freight costs, transit times, and under FOB terms, is where risk typically transfers from seller to buyer.',
    longDescription:
      'The Port of Loading (POL) is the origin port where your goods are physically loaded onto the ocean vessel for international transit. The POL choice depends on the factory\'s location and the available port infrastructure. For imports from China, the most common POLs are Shanghai (the world\'s busiest container port), Shenzhen/Yantian (serving the Pearl River Delta manufacturing region), Ningbo-Zhoushan, Qingdao, and Xiamen.\n\nThe POL matters for several practical reasons. Under FOB terms, the POL is where risk transfers from seller to buyer -- if your container falls into the sea during loading at FOB Shenzhen, that is your loss (and your insurance claim), not the supplier\'s. Freight rates vary significantly by POL: rates from Shanghai are typically the most competitive due to high volume and carrier competition, while smaller ports may have fewer sailing options and higher rates.\n\nTransit times from the POL to US ports vary considerably. Shanghai to Los Angeles is typically 14-18 days. Shenzhen to Los Angeles is 13-16 days. Vietnam (Ho Chi Minh City) to Los Angeles is 18-22 days. India (Nhava Sheva) to New York is 25-35 days. These transit times affect your inventory planning, cash flow, and ability to respond to demand changes. When evaluating suppliers in different regions, always factor in the transit time difference to your destination port.',
    category: 'Logistics',
    relatedTerms: ['port-of-discharge', 'fob', 'bill-of-lading', 'freight-forwarder', 'fcl'],
    practicalTip:
      'If your supplier is far from the nearest major port, ask about inland freight costs and transit time to the POL. These costs are included in FOB pricing but can significantly vary between factories in different regions of the same country.',
  },
  {
    slug: 'port-of-discharge',
    term: 'Port of Discharge',
    acronym: 'POD',
    definition:
      'The destination port where goods are unloaded from the ocean vessel. Choosing the right POD affects your total logistics cost, customs clearance speed, and last-mile delivery time to your warehouse.',
    longDescription:
      'The Port of Discharge (POD) is the destination port where your container is unloaded from the ocean vessel. In the US, the major container ports are: Los Angeles/Long Beach (the busiest US port complex, handling roughly 40% of US container imports), New York/New Jersey (the largest East Coast port), Savannah, Houston, Charleston, Seattle/Tacoma, and Oakland. The choice of POD significantly impacts your total logistics cost and delivery timeline.\n\nFactors to consider when choosing a POD include: proximity to your warehouse or fulfillment center (shorter drayage/trucking distance means lower cost and faster delivery), port congestion (LA/Long Beach has historically experienced severe congestion, adding days of delay), customs clearance speed (some ports have faster CBP processing than others), rail connections (for cross-country delivery, West Coast ports connect to efficient rail networks), and carrier availability (not all ocean carriers serve all ports, and frequency of sailings varies).\n\nA common strategy for DTC importers is to ship to the West Coast port closest to their 3PL or fulfillment center. If your warehouse is on the East Coast, you can either ship directly to an East Coast port (longer ocean transit but shorter trucking) or ship to a West Coast port and use rail transport to the East Coast (faster total transit in some cases). Run the numbers both ways with your freight forwarder to find the optimal route.',
    category: 'Logistics',
    relatedTerms: ['port-of-loading', 'freight-forwarder', 'customs-broker', 'fcl', 'lcl'],
    practicalTip:
      'Do not default to LA/Long Beach just because it is the biggest port. If your warehouse is in the Southeast, direct shipping to Savannah or Charleston may save days and hundreds of dollars in drayage costs.',
  },
  {
    slug: 'demurrage',
    term: 'Demurrage',
    definition:
      'Charges imposed by the shipping line when a container stays at the port terminal beyond the allotted free days after vessel discharge. Demurrage fees escalate rapidly and can cost hundreds of dollars per day.',
    longDescription:
      'Demurrage is a charge levied by the ocean carrier (shipping line) when a container remains at the port terminal beyond the "free time" allowed after the vessel discharges the container. Free time is typically 3-5 business days for most carriers and ports, though this can vary. After free time expires, demurrage charges begin accruing daily, typically starting at $50-$150 per day and escalating to $200-$400+ per day the longer the container sits.\n\nDemurrage commonly occurs due to: delays in customs clearance (missing documents, CBP examinations, OGA holds), slow arrangement of drayage/trucking to pick up the container, the importer not being aware the container has arrived, documentation discrepancies between the B/L and actual cargo, or disputes between the importer and broker/forwarder causing processing delays.\n\nDemurrage is distinct from detention (see related term), though they are often confused. Demurrage is charged while the container is at the port terminal. Detention is charged after the container leaves the port but the empty container is not returned to the carrier within the allowed time. Together, these charges (often called "D&D") can add up to thousands of dollars if a shipment is not cleared and returned promptly. Proactive management -- having all documents ready before the vessel arrives, pre-clearing customs when possible, and having a drayage appointment scheduled -- is the best way to avoid these charges.',
    category: 'Logistics',
    relatedTerms: ['detention', 'bill-of-lading', 'customs-broker', 'freight-forwarder'],
    practicalTip:
      'Track your vessel arrival date and have all customs documents submitted to your broker 5-7 days before arrival. Pre-clear customs whenever possible so the container can be picked up within the free time window.',
  },
  {
    slug: 'detention',
    term: 'Detention',
    definition:
      'Charges imposed by the shipping line when an empty container is not returned to the designated depot within the allotted free days after being picked up from the port. Distinct from demurrage, which is charged at the port terminal.',
    longDescription:
      'Detention charges begin when you (or your drayage carrier) pick up a container from the port terminal but do not return the empty container to the carrier\'s designated container depot within the allowed "free time." Carriers typically allow 4-7 free days for container use from the time of pickup. After that, detention charges accrue daily, similar in magnitude to demurrage ($50-$300+ per day depending on the carrier and container type).\n\nDetention commonly occurs when: your warehouse cannot unload the container quickly enough (insufficient dock space, labor shortages, or the goods need inspection before unloading), the container is used for temporary storage at your warehouse beyond the free days, the empty container return depot is far from your warehouse or has limited operating hours, or holidays and weekends reduce the effective number of working days within the free time window.\n\nTo avoid detention charges, plan your container unloading schedule before the container arrives. Ensure your warehouse has dock space and labor available to unload the container promptly (a standard 40-foot container takes 2-4 hours to unload manually, or under an hour with a forklift and experienced crew). Identify the nearest empty container return location and its operating hours. If you anticipate needing the container for longer than free time, negotiate extended free days with the carrier through your freight forwarder before the shipment.',
    category: 'Logistics',
    relatedTerms: ['demurrage', 'fcl', 'freight-forwarder', 'bill-of-lading'],
    practicalTip:
      'Schedule your warehouse unloading crew and dock door before the container arrives, not after. Return the empty container on the same day you unload it. Ask your freight forwarder to negotiate extended free time if you need it.',
  },

  // ── Finance ──────────────────────────────────────────────────────────
  {
    slug: 'letter-of-credit',
    term: 'Letter of Credit',
    acronym: 'L/C',
    definition:
      'A financial instrument issued by a bank guaranteeing the seller will receive payment as long as the terms and conditions specified in the letter of credit are met. Provides security for both buyer and seller in international transactions.',
    longDescription:
      'A Letter of Credit (L/C or LC) is a bank-guaranteed payment mechanism used in international trade. The buyer\'s bank (the "issuing bank") provides a written guarantee to the seller that payment will be made upon presentation of specified documents proving the goods have been shipped according to the agreed terms. This eliminates the need for the buyer and seller to trust each other directly -- the bank intermediates the transaction.\n\nThe L/C process works as follows: the buyer applies for an L/C at their bank, specifying the transaction terms (product description, quantity, price, shipping terms, required documents, latest shipment date). The issuing bank sends the L/C to the seller\'s bank (the "advising bank"). The seller ships the goods and presents the required documents (typically B/L, commercial invoice, packing list, certificate of origin, inspection certificate) to their bank. The advising bank reviews the documents and, if compliant, forwards them to the issuing bank for payment.\n\nFor DTC importers, L/Cs are less common than wire transfers due to their complexity and cost (bank fees typically run 1-3% of the transaction value plus fixed charges). L/Cs make sense for large orders with new or unverified suppliers, transactions where trust has not been established, and situations where either party needs the security of a bank guarantee. For orders under $50,000 with established suppliers, most importers use simpler payment methods like wire transfer with a 30/70 deposit/balance split.',
    category: 'Finance',
    relatedTerms: ['wire-transfer', 'trade-assurance', 'escrow', 'net-30'],
    practicalTip:
      'L/Cs are worth the cost and complexity for first orders above $25,000 with unverified suppliers. For smaller orders or established relationships, a 30% deposit / 70% balance against inspection report is simpler and cheaper.',
  },
  {
    slug: 'wire-transfer',
    term: 'Wire Transfer',
    acronym: 'T/T',
    definition:
      'An electronic bank-to-bank payment (also called Telegraphic Transfer or T/T) that is the most common payment method for international manufacturing orders. Typically structured as a deposit before production and balance before shipment.',
    longDescription:
      'Wire transfer (commonly called T/T for Telegraphic Transfer in international trade) is the standard payment method for overseas manufacturing orders. It is a direct electronic transfer of funds from your bank account to the supplier\'s bank account, typically via the SWIFT network for international transfers. Wire transfers are fast (1-5 business days depending on banks and countries), relatively inexpensive ($15-$50 per transfer for most banks), and universally accepted by overseas suppliers.\n\nThe standard payment structure for manufacturing orders is a 30/70 split: 30% deposit via wire transfer to initiate production, and the remaining 70% balance paid after production is complete and (ideally) after a successful pre-shipment inspection. Some suppliers request a 50/50 split for first orders, while repeat customers may negotiate more favorable terms like 20/80 or even payment after shipment. The deposit funds the factory\'s raw material purchases and initiates production.\n\nRisks of wire transfer include: deposits are non-refundable if the factory fails to deliver (mitigate with due diligence and trade assurance), fraudulent bank account changes via email compromise (always verify bank details by phone or video call before the first transfer), and exchange rate fluctuations between the time of quote and payment (consider forward contracts for very large orders). Always ensure you are transferring to the company\'s verified account, not a personal account or an account in a different name.',
    category: 'Finance',
    relatedTerms: ['letter-of-credit', 'trade-assurance', 'escrow', 'net-30', 'landed-cost'],
    practicalTip:
      'Before your first wire transfer to a new supplier, verify their bank details through a second communication channel (phone or video call). Email compromise scams that change bank account details are increasingly common in international trade.',
  },
  {
    slug: 'trade-assurance',
    term: 'Trade Assurance',
    definition:
      'Alibaba\'s built-in payment protection program that safeguards buyers when orders placed through the platform are not shipped on time or do not meet quality standards specified in the contract.',
    longDescription:
      'Trade Assurance is Alibaba Group\'s buyer protection program designed to reduce the risk of transacting with suppliers on their platform. When you place an order through Alibaba\'s Trade Assurance program and pay through their designated payment channels, Alibaba acts as a guarantor. If the supplier fails to ship on time or the products do not meet the quality terms specified in the online contract, you can file a claim and Alibaba will mediate and potentially refund your payment.\n\nThe program covers two main scenarios: on-time shipment protection (if the supplier misses the agreed shipping deadline) and product quality protection (if the received products do not match the agreed specifications). Coverage limits are displayed on each supplier\'s Trade Assurance badge and vary by supplier. The program requires orders to be placed and paid through Alibaba\'s platform using supported payment methods.\n\nTrade Assurance has genuine value for new importers making their first purchases, but it has limitations. Coverage caps may be lower than your order value. The claims process can be lengthy and Alibaba tends to encourage settlement between parties rather than issuing full refunds. Quality claims require strong evidence (inspection reports, photos, video). And the protection only applies to orders transacted through Alibaba\'s platform -- if you negotiate a deal on Alibaba but pay the factory directly via wire transfer, Trade Assurance does not apply.',
    category: 'Finance',
    relatedTerms: ['wire-transfer', 'escrow', 'letter-of-credit'],
    practicalTip:
      'Use Trade Assurance for your first 1-2 orders with a new Alibaba supplier. After building trust and a track record, you can transition to direct wire transfers to save on platform fees. Always document quality specs in the online contract.',
  },
  {
    slug: 'escrow',
    term: 'Escrow',
    definition:
      'A financial arrangement where a trusted third party holds payment funds until both buyer and seller have fulfilled their contractual obligations. Common in high-value transactions where mutual trust is limited.',
    longDescription:
      'Escrow is a payment arrangement where a neutral third party (the escrow agent) holds the buyer\'s funds until predefined conditions are met, at which point the funds are released to the seller. In international manufacturing, escrow provides security for both parties: the buyer knows their money is safe until they confirm the goods are satisfactory, and the seller knows the funds exist and will be released upon fulfillment.\n\nEscrow services for international trade are offered by specialized platforms like Escrow.com, certain banks, and is effectively what Alibaba\'s Trade Assurance provides in a simplified form. The typical process is: the buyer deposits funds into the escrow account, the seller ships the goods, the buyer inspects the goods upon receipt and either approves release of funds or raises a dispute, and the escrow agent releases funds to the seller upon buyer approval or mediates the dispute.\n\nEscrow adds cost (typically 1-3% of the transaction value) and complexity to transactions. It works best for high-value, one-time transactions where the parties do not have an established trust relationship. For ongoing manufacturing relationships, most importers find that the standard deposit/balance wire transfer structure (with pre-shipment inspection as the quality gate) provides sufficient protection at lower cost. However, escrow can be valuable for very large first orders, purchases from unverified suppliers, or transactions involving custom tooling where the risk of loss is significant.',
    category: 'Finance',
    relatedTerms: ['letter-of-credit', 'wire-transfer', 'trade-assurance'],
    practicalTip:
      'Escrow is most valuable for first-time large orders ($10,000+) with unknown suppliers. For repeat orders with proven factories, the cost and friction of escrow usually is not justified -- use standard T/T terms with third-party inspection instead.',
  },
  {
    slug: 'net-30',
    term: 'Net 30 Payment Terms',
    definition:
      'Payment terms where the full invoice amount is due 30 days after the goods are shipped or received. A sign of strong buyer-supplier trust and beneficial for the buyer\'s cash flow.',
    longDescription:
      'Net 30 (also written as "Net-30" or "N30") means the buyer has 30 days from the invoice date (or shipment date, depending on the agreement) to pay the full invoice amount. This is a significant benefit for the buyer\'s cash flow: you receive the goods, can start selling them, and potentially collect revenue before you need to pay the supplier. In contrast, standard T/T terms require payment (or at least the balance) before shipment.\n\nNet 30 terms are a privilege earned through a track record of reliable payment and consistent order volume. Most overseas factories will not offer Net 30 to new customers. Typical progression: first order is 50% deposit / 50% before shipment, subsequent orders shift to 30% deposit / 70% before shipment, after 6-12 months of regular orders the factory may offer 100% payment against B/L (pay upon shipment), and after 1-2 years of proven reliability, Net 30 or even Net 60 may be negotiated.\n\nNet 30 dramatically improves your working capital cycle. If your products take 30 days to ship, 5 days to clear customs, and you sell through in 30 days, standard payment terms mean your capital is tied up for 65+ days before you see any return. With Net 30, your cash outflow is delayed by 30 days, potentially meaning you can sell products before paying for them. This is the ideal position for a growing DTC brand.',
    category: 'Finance',
    relatedTerms: ['wire-transfer', 'letter-of-credit', 'landed-cost'],
    practicalTip:
      'Start working toward Net 30 terms after 3-4 successful orders. Begin by asking to reduce the deposit percentage, then shift to payment against B/L, then propose Net 15, and finally Net 30. Each step builds trust.',
  },
  {
    slug: 'landed-cost',
    term: 'Landed Cost',
    definition:
      'The total cost of a product delivered to your warehouse, including the product price, shipping, insurance, customs duties, customs broker fees, and drayage. The true cost you must use for pricing and margin calculations.',
    longDescription:
      'Landed cost is the total, all-in cost of getting a product from the factory to your warehouse shelf, ready to sell. It is the number that matters for your business -- not the FOB price the factory quotes. Landed cost includes: the product cost (FOB or equivalent), ocean/air freight, marine cargo insurance, customs duties (based on HTS classification and country of origin), merchandise processing fee (MPF, 0.3464% of goods value, capped at $538.40), harbor maintenance fee (HMF, 0.125% of goods value), customs broker fee, drayage (trucking from port to warehouse), warehouse receiving costs, and any inspection or testing fees.\n\nA common mistake for new importers is basing pricing decisions on the FOB cost. The additional costs from factory to warehouse typically add 25-50% to the FOB price, depending on the product, shipping mode, and duty rate. For example: a product quoted at $5.00 FOB China might have a landed cost of $7.50 per unit after freight ($0.50), duties ($1.25 at 25%), and other logistics costs ($0.75). If you priced based on $5.00 cost, your margins are much thinner than you thought.\n\nCalculate your landed cost before committing to any order. Create a landed cost spreadsheet that accounts for every line item between FOB and warehouse receipt. Update it with actual costs after each shipment and use the actual landed cost (not estimates) for future pricing decisions. Freight rates, exchange rates, and duty rates all fluctuate, so your landed cost is a moving target that needs regular monitoring.',
    category: 'Finance',
    relatedTerms: ['fob', 'hts', 'customs-broker', 'freight-forwarder', 'duty-drawback'],
    practicalTip:
      'Build a landed cost calculator spreadsheet that accounts for every cost between FOB and your warehouse. The total typically adds 25-50% to the FOB price. Never set retail pricing based on FOB cost alone.',
  },
  {
    slug: 'duty-drawback',
    term: 'Duty Drawback',
    definition:
      'A refund of customs duties paid on imported goods that are subsequently exported, either in their original form or as part of a manufactured product. A powerful cost recovery tool for brands that sell internationally.',
    longDescription:
      'Duty drawback is a US customs program that allows importers to recover up to 99% of duties, taxes, and fees paid on imported goods that are subsequently exported. If you import a product, pay 25% duties, and then export that product (or a product made from it) to another country, you can claim back most of those duties from CBP. This program has existed since 1789 and is one of the most underutilized cost savings tools in international trade.\n\nThere are three main types of drawback: unused merchandise drawback (goods imported and then exported in the same condition -- for example, products shipped to Amazon fulfillment centers in Canada or Europe), manufacturing drawback (imported materials or components used to manufacture goods that are then exported), and rejected merchandise drawback (goods that are returned to the foreign supplier due to defects or other issues).\n\nFor DTC brands selling internationally, duty drawback can be significant. If you import products from China at a 25% duty rate and 30% of your sales are international (shipped to customers in Canada, UK, or EU), you could potentially recover nearly 25% of duties on 30% of your imports. On $500,000 in annual imports, that could mean $37,000+ in recovered duties. The process requires detailed record-keeping and typically a drawback specialist or broker, but the return is often substantial.',
    category: 'Finance',
    relatedTerms: ['hts', 'customs-broker', 'landed-cost', 'bonded-warehouse'],
    practicalTip:
      'If you re-export any percentage of your imports (including selling to international customers via Amazon global or your own website), investigate duty drawback. A drawback specialist can assess your potential recovery with minimal upfront cost.',
  },

  // ── Legal ────────────────────────────────────────────────────────────
  {
    slug: 'nda',
    term: 'Non-Disclosure Agreement',
    acronym: 'NDA',
    definition:
      'A legal contract that establishes a confidential relationship between parties, preventing the recipient from sharing proprietary information like product designs, business plans, and trade secrets with third parties.',
    longDescription:
      'A Non-Disclosure Agreement (NDA) is a legally binding contract that protects confidential information shared between parties. In manufacturing, NDAs are typically signed before sharing product designs, specifications, pricing, business strategies, or other proprietary information with a potential supplier. The NDA creates a legal obligation for the supplier to keep your information confidential and not use it for their own benefit (like producing your design for a competitor).\n\nThe enforceability of NDAs varies significantly by jurisdiction. An NDA with a US company, enforceable in US courts, is relatively strong. An NDA with a Chinese factory is more complex -- while China has improved IP protection laws, enforcement remains inconsistent and expensive. For maximum protection in China, consider: having the NDA written in both English and Chinese (with the Chinese version controlling in case of dispute), specifying a Chinese arbitration body (like CIETAC) for dispute resolution, registering your designs and trademarks in China separately from your home country filings, and including specific penalty clauses with predetermined damage amounts.\n\nDespite enforcement challenges, NDAs are still worth signing. They establish the confidential nature of the relationship, create a documented legal record of what information was shared, deter some bad actors, and are necessary evidence if you ever do need to pursue legal action. Think of an NDA as one layer in your IP protection strategy, not the entire strategy.',
    category: 'Legal',
    relatedTerms: ['ip-protection', 'design-patent', 'trade-secret', 'oem'],
    practicalTip:
      'Sign an NDA before sharing any design files with factories. For China-based suppliers, have the NDA include Chinese-language text and specify CIETAC arbitration. But do not rely on the NDA alone -- register your IP in the manufacturing country.',
  },
  {
    slug: 'ip-protection',
    term: 'Intellectual Property Protection',
    acronym: 'IP',
    definition:
      'The legal framework for protecting your creative works, inventions, designs, and brand assets from unauthorized use. For product businesses, IP protection includes patents, trademarks, design rights, and trade secrets.',
    longDescription:
      'Intellectual Property (IP) protection is a critical concern for DTC brands manufacturing overseas. IP encompasses several categories: patents (protecting inventions and functional innovations), design patents (protecting ornamental appearance), trademarks (protecting brand names, logos, and identifiers), copyrights (protecting creative works), and trade secrets (protecting confidential business information). Each type of IP has different registration requirements, protection periods, and enforcement mechanisms.\n\nThe most important IP principle for international manufacturing is that IP rights are territorial -- a US patent does not protect you in China, and a Chinese trademark does not protect you in the US. If you are manufacturing in China and selling in the US, you ideally need IP protection in both countries. Many brands have been surprised to discover that someone in China has registered their trademark (a practice called "trademark squatting"), which can block their own goods from being exported. Registering your trademark in China before you start manufacturing there is a prudent preventive measure.\n\nA comprehensive IP strategy for a DTC product brand includes: filing for trademark registration in the US (and any other sales markets), filing for trademark registration in the manufacturing country (especially China), filing for design patents or utility patents as appropriate, maintaining trade secret protections through NDAs and limited information sharing, using manufacturing agreements with strong IP clauses, and monitoring marketplaces for counterfeits and unauthorized use of your brand.',
    category: 'Legal',
    relatedTerms: ['nda', 'design-patent', 'utility-patent', 'trademark', 'trade-secret'],
    practicalTip:
      'Register your trademark in China BEFORE you start manufacturing there, even if you only plan to sell in the US. Trademark squatting in China is common and can prevent you from exporting your own products.',
  },
  {
    slug: 'design-patent',
    term: 'Design Patent',
    definition:
      'A patent that protects the ornamental appearance (shape, configuration, surface decoration) of a functional item. Lasts 15 years in the US and is faster and cheaper to obtain than a utility patent.',
    longDescription:
      'A design patent protects the unique visual appearance of a manufactured article -- its shape, configuration, surface ornamentation, or combination thereof. It does not protect how the product works (that is a utility patent\'s domain) but rather how it looks. If your product has a distinctive visual design that differentiates it from competitors, a design patent prevents others from making, using, or selling products with a substantially similar appearance.\n\nDesign patents are particularly relevant for DTC consumer products where aesthetics drive purchasing decisions: distinctive bottle shapes, unique furniture forms, recognizable product silhouettes, and ornamental surface patterns. They are faster to obtain (typically 12-18 months in the US) and less expensive ($1,500-$5,000 including attorney fees) than utility patents. The 15-year term (from the date of grant) provides meaningful protection during a product\'s commercial lifecycle.\n\nFor DTC founders, design patents offer accessible and valuable IP protection. The application requires formal drawings showing your design from multiple angles, a brief description, and a single claim. The drawings are critical -- they define the scope of your protection, and a skilled patent illustrator can help ensure your drawings capture the essential design elements while maintaining broad enough scope to prevent easy workarounds. File your design patent application before publicly disclosing or selling the product (or within 12 months of first public disclosure in the US under the grace period).',
    category: 'Legal',
    relatedTerms: ['utility-patent', 'ip-protection', 'trademark', 'oem'],
    practicalTip:
      'File a design patent for any product with a distinctive visual appearance before sharing designs with manufacturers. At $1,500-$5,000, it is affordable protection. Use a patent attorney who specializes in industrial design.',
  },
  {
    slug: 'utility-patent',
    term: 'Utility Patent',
    definition:
      'A patent that protects how a product works -- its functional aspects, mechanisms, processes, or composition. Provides the strongest form of patent protection but is more expensive and time-consuming to obtain than a design patent.',
    longDescription:
      'A utility patent protects the functional aspects of an invention: how it works, what it does, and how it is made. This is the "classic" patent that most people think of -- it grants the holder the exclusive right to make, use, sell, or import the invention for 20 years from the filing date. Utility patents are the strongest form of IP protection for products with genuine functional innovation.\n\nObtaining a utility patent is a significant investment. Attorney fees typically run $8,000-$20,000 for a straightforward application, with complex inventions costing more. The patent office examination process takes 2-4 years on average in the US. You will need to demonstrate that your invention is novel (no one has done it before), non-obvious (it would not be an obvious solution to someone skilled in the field), and useful (it has a practical application). The application includes a detailed written description, claims defining the scope of protection, and drawings.\n\nFor DTC product founders, utility patents make sense when your product involves a genuinely new mechanism, material composition, manufacturing process, or functional approach. Examples might include a novel closure mechanism for a water bottle, a unique ergonomic design for a kitchen tool, or an innovative material formulation. If your product\'s value proposition is primarily aesthetic or brand-driven rather than functionally innovative, a design patent and trademark may provide sufficient and more cost-effective protection.',
    category: 'Legal',
    relatedTerms: ['design-patent', 'ip-protection', 'trade-secret', 'nda'],
    practicalTip:
      'Before investing $10,000+ in a utility patent, conduct a prior art search ($500-$1,500 with a patent attorney) to assess whether your invention is truly novel. Many "new" product ideas already exist in the patent literature.',
  },
  {
    slug: 'trademark',
    term: 'Trademark',
    definition:
      'A registered symbol, word, phrase, logo, or combination that identifies and distinguishes your brand\'s goods from those of others. Trademarks protect brand identity and can last indefinitely with proper maintenance.',
    longDescription:
      'A trademark is a form of intellectual property that protects brand identifiers -- your brand name, logo, tagline, distinctive packaging, and even sounds or colors associated with your brand. Trademarks allow consumers to identify the source of goods and prevent competitors from using confusingly similar marks. Unlike patents, which expire, trademarks can last indefinitely as long as they are actively used in commerce and renewal filings are maintained.\n\nFor DTC product brands, trademark registration is arguably the most important IP step. A registered trademark (denoted by the (R) symbol) provides: nationwide priority (even if you are not yet selling in every state), the ability to file trademark infringement lawsuits in federal court, the legal presumption of ownership and validity, the ability to register with US Customs to block counterfeit imports, eligibility for the Amazon Brand Registry (which provides significant benefits for controlling your listings), and the ability to use the registration as a basis for filing in other countries.\n\nRegistering a trademark in the US costs approximately $250-$350 per class per mark for the USPTO filing fee, plus $500-$2,000 in attorney fees for a standard application. The process takes 8-12 months. It is critical to also register your trademark in any country where you manufacture or sell, particularly China (which uses a first-to-file system rather than first-to-use, meaning someone else can register your brand name in China before you do, even if you have been using it for years).',
    category: 'Legal',
    relatedTerms: ['ip-protection', 'design-patent', 'trade-secret', 'nda'],
    practicalTip:
      'File your US trademark application as soon as you have settled on a brand name, even before launching. Register in China simultaneously if you plan to manufacture there. Budget $1,000-$2,500 total for both filings with attorney assistance.',
  },
  {
    slug: 'trade-secret',
    term: 'Trade Secret',
    definition:
      'Confidential business information that provides a competitive advantage, such as proprietary formulas, manufacturing processes, supplier lists, or customer data. Protected through secrecy rather than registration.',
    longDescription:
      'A trade secret is any confidential business information that derives economic value from not being generally known and is subject to reasonable efforts to maintain its secrecy. Unlike patents and trademarks, trade secrets are not registered with any government agency -- they are protected by keeping them secret. Famous examples include the Coca-Cola formula, Google\'s search algorithm, and KFC\'s "11 herbs and spices." For DTC product brands, trade secrets might include proprietary material formulations, manufacturing process optimizations, supplier pricing and terms, customer acquisition strategies, and product development roadmaps.\n\nTrade secret protection lasts as long as the information remains secret -- potentially forever, unlike patents which expire. However, once a trade secret is publicly disclosed (whether intentionally or through a leak), protection is lost. Trade secrets are protected under the federal Defend Trade Secrets Act (DTSA) and state laws (most states have adopted the Uniform Trade Secrets Act). These laws provide remedies against misappropriation, including injunctions and damages.\n\nFor manufacturing businesses, maintaining trade secrets requires practical measures: NDAs with all parties who access confidential information, limiting access to sensitive information on a need-to-know basis, marking confidential documents clearly, using separate NDA-protected communications channels for sensitive specifications, not including your complete "secret sauce" in manufacturing documents (for example, providing a formulation to a contract manufacturer without revealing the ratio of key ingredients), and conducting exit interviews with departing employees to remind them of confidentiality obligations.',
    category: 'Legal',
    relatedTerms: ['nda', 'ip-protection', 'utility-patent', 'oem'],
    practicalTip:
      'Not everything should be patented. If your competitive advantage comes from a proprietary process or formulation that is hard to reverse-engineer, trade secret protection may be more valuable than a patent, which requires public disclosure of the invention.',
  },
] as const satisfies readonly GlossaryTerm[];

// ── Utility helpers ────────────────────────────────────────────────────

export type GlossaryCategory = GlossaryTerm['category'];

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  'Trade Terms',
  'Manufacturing',
  'Quality',
  'Logistics',
  'Finance',
  'Legal',
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (t) =>
      t.slug.includes(q) ||
      t.term.toLowerCase().includes(q) ||
      ('acronym' in t && t.acronym && t.acronym.toLowerCase().includes(q)) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((t) => t.category === category);
}
