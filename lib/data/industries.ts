// Industry categories data library for Bottlecap manufacturing analysis platform
// Sources: Industry research, import/export data, manufacturing surveys

export interface IndustryCategory {
  name: string;
  icon: string;
  subcategories: string[];
  avgCostRange: { min: number; max: number };
  avgLeadTimeDays: number;
  topCountries: string[];
  commonMaterials: string[];
  description: string;
}

export const INDUSTRY_CATEGORIES: readonly IndustryCategory[] = [
  {
    name: 'Consumer Electronics',
    icon: '\u{1F4F1}',
    subcategories: [
      'Smartphones & Accessories',
      'Tablets & E-Readers',
      'Laptops & Desktops',
      'Chargers & Power Banks',
      'Cables & Adapters',
      'Computer Peripherals',
    ],
    avgCostRange: { min: 5, max: 500 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Taiwan', 'South Korea'],
    commonMaterials: [
      'ABS',
      'Polycarbonate',
      'Aluminum 6061',
      'Glass (Soda-Lime)',
      'PCBs',
      'Silicone Rubber',
    ],
    description:
      'Consumer electronics is the largest manufacturing category by value, dominated by Chinese production with critical components from Taiwan (semiconductors) and South Korea (displays, memory). Typical MOQs range from 500 to 5,000 units, with significant tooling costs for custom injection-molded housings.',
  },
  {
    name: 'Smart Home',
    icon: '\u{1F3E0}',
    subcategories: [
      'Smart Speakers',
      'Smart Lighting',
      'Security Cameras',
      'Smart Plugs & Switches',
      'Thermostats',
      'Smart Locks',
    ],
    avgCostRange: { min: 10, max: 200 },
    avgLeadTimeDays: 40,
    topCountries: ['China', 'Taiwan', 'Vietnam'],
    commonMaterials: [
      'ABS',
      'Polycarbonate',
      'Silicone Rubber',
      'Aluminum 6061',
      'TPE',
      'PCBs',
    ],
    description:
      'Smart home products combine consumer electronics with IoT connectivity, requiring expertise in both hardware and firmware. China\'s Shenzhen ecosystem is the primary production hub, with strong PCB assembly and wireless module supply chains. Products typically require FCC, UL, and CE certifications.',
  },
  {
    name: 'Wearable Tech',
    icon: '\u{231A}',
    subcategories: [
      'Smartwatches',
      'Fitness Trackers',
      'Smart Rings',
      'AR/VR Headsets',
      'Health Monitors',
      'GPS Trackers',
    ],
    avgCostRange: { min: 15, max: 300 },
    avgLeadTimeDays: 45,
    topCountries: ['China', 'Taiwan', 'South Korea'],
    commonMaterials: [
      'Stainless Steel 316',
      'Silicone Rubber',
      'Polycarbonate',
      'TPU',
      'Glass (Soda-Lime)',
      'Aluminum 7075',
    ],
    description:
      'Wearable technology requires miniaturized components, reliable sensors, and durable materials that can withstand daily wear and sweat. Battery life, waterproofing (IP67/IP68), and biocompatible materials are key considerations. The supply chain is concentrated in Shenzhen with display components from South Korea and Japan.',
  },
  {
    name: 'Audio Equipment',
    icon: '\u{1F3A7}',
    subcategories: [
      'Headphones & Earbuds',
      'Portable Speakers',
      'Soundbars',
      'Microphones',
      'Home Audio Systems',
      'Amplifiers',
    ],
    avgCostRange: { min: 5, max: 350 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Vietnam', 'Taiwan'],
    commonMaterials: [
      'ABS',
      'Aluminum 6061',
      'Silicone Rubber',
      'Memory Foam',
      'Faux Leather (PU)',
      'TPU',
    ],
    description:
      'Audio equipment manufacturing has largely consolidated in China, with Dongguan and Shenzhen serving as the primary hubs. Key quality differentiators include driver unit quality, acoustic tuning, and comfort materials. ANC (Active Noise Cancellation) and Bluetooth chipset selection significantly impact both cost and performance.',
  },
  {
    name: 'Kitchen & Dining',
    icon: '\u{1F373}',
    subcategories: [
      'Cookware',
      'Small Appliances',
      'Drinkware',
      'Cutlery & Utensils',
      'Food Storage',
      'Bakeware',
    ],
    avgCostRange: { min: 2, max: 150 },
    avgLeadTimeDays: 30,
    topCountries: ['China', 'India', 'Turkey'],
    commonMaterials: [
      'Stainless Steel 304',
      'Stainless Steel 430',
      'Aluminum 6061',
      'Silicone Rubber',
      'Polypropylene',
      'Glass (Borosilicate)',
    ],
    description:
      'Kitchen and dining products span a wide cost and complexity range, from simple plastic utensils to premium stainless steel cookware sets. China\'s Guangdong province (particularly Chaoshan and Jieyang) is the dominant hub for stainless steel kitchenware. FDA/food-contact compliance is essential for the US market.',
  },
  {
    name: 'Home Decor',
    icon: '\u{1F6CB}\u{FE0F}',
    subcategories: [
      'Candles & Diffusers',
      'Wall Art & Frames',
      'Vases & Planters',
      'Decorative Pillows',
      'Mirrors',
      'Clocks',
    ],
    avgCostRange: { min: 2, max: 100 },
    avgLeadTimeDays: 30,
    topCountries: ['China', 'India', 'Vietnam'],
    commonMaterials: [
      'Ceramic (Earthenware)',
      'Glass (Soda-Lime)',
      'Cotton',
      'Solid Pine',
      'Brass',
      'Concrete',
    ],
    description:
      'Home decor is a highly diverse category where design and aesthetics drive purchasing decisions over technical specifications. India is strong in handcrafted and artisan products, while China excels at mass-produced items. Low tooling costs and flexible MOQs make this category accessible to DTC startups.',
  },
  {
    name: 'Furniture',
    icon: '\u{1FA91}',
    subcategories: [
      'Office Furniture',
      'Living Room Furniture',
      'Bedroom Furniture',
      'Outdoor Furniture',
      'Shelving & Storage',
      'Children\'s Furniture',
    ],
    avgCostRange: { min: 30, max: 800 },
    avgLeadTimeDays: 45,
    topCountries: ['China', 'Vietnam', 'Poland'],
    commonMaterials: [
      'Plywood',
      'MDF',
      'Solid Oak',
      'Carbon Steel',
      'PU Foam',
      'Polyester Fabric',
    ],
    description:
      'Furniture manufacturing requires significant space, labor, and materials. China (particularly Foshan and Dongguan) and Vietnam are the dominant exporters. Flat-pack/KD (knock-down) designs reduce shipping costs significantly. Section 301 tariffs on Chinese furniture (25%) have driven substantial production shifts to Vietnam.',
  },
  {
    name: 'Pet Products',
    icon: '\u{1F43E}',
    subcategories: [
      'Pet Beds & Furniture',
      'Leashes & Collars',
      'Feeding Accessories',
      'Toys & Enrichment',
      'Grooming Tools',
      'Pet Carriers',
    ],
    avgCostRange: { min: 2, max: 80 },
    avgLeadTimeDays: 30,
    topCountries: ['China', 'Vietnam', 'India'],
    commonMaterials: [
      'Nylon Fabric',
      'Polypropylene',
      'TPE',
      'Stainless Steel 304',
      'PU Foam',
      'Natural Rubber',
    ],
    description:
      'The pet products market has grown substantially, with premiumization driving higher quality standards. China produces the majority of pet accessories, with Ningbo and Yiwu as key hubs. Non-toxic and BPA-free materials are essential. FDA compliance is required for pet food-contact items in the US market.',
  },
  {
    name: 'Baby & Kids',
    icon: '\u{1F476}',
    subcategories: [
      'Strollers & Car Seats',
      'Baby Clothing',
      'Nursery Furniture',
      'Feeding Products',
      'Baby Carriers',
      'Educational Toys',
    ],
    avgCostRange: { min: 3, max: 400 },
    avgLeadTimeDays: 40,
    topCountries: ['China', 'Vietnam', 'Bangladesh'],
    commonMaterials: [
      'Organic Cotton',
      'Polypropylene',
      'Silicone Rubber',
      'ABS',
      'EVA',
      'Bamboo',
    ],
    description:
      'Baby and kids products face the strictest safety regulations in manufacturing, including CPSIA (US), EN 71 (EU), and extensive testing for small parts, lead, and phthalates. Compliance and testing costs are significant. Organic and non-toxic materials command premium pricing. Third-party testing is mandatory before US import.',
  },
  {
    name: 'Outdoor & Camping',
    icon: '\u{26FA}',
    subcategories: [
      'Tents & Shelters',
      'Sleeping Bags & Pads',
      'Camping Cookware',
      'Hiking Gear',
      'Portable Lighting',
      'Water Filtration',
    ],
    avgCostRange: { min: 5, max: 300 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Vietnam', 'South Korea'],
    commonMaterials: [
      'Nylon Fabric (Ripstop)',
      'Aluminum 7075',
      'Silicone Rubber',
      'HDPE',
      'Stainless Steel 304',
      'EVA Foam',
    ],
    description:
      'Outdoor gear requires high-performance materials that withstand extreme conditions while remaining lightweight and packable. China\'s Zhejiang province (Ningbo, Yongkang) is the primary hub. Technical fabrics, waterproof coatings (DWR), and precision metalwork are key competencies. Many brands leverage "designed in [country], manufactured in China" positioning.',
  },
  {
    name: 'Fitness & Sports',
    icon: '\u{1F3CB}\u{FE0F}',
    subcategories: [
      'Free Weights & Machines',
      'Yoga & Pilates',
      'Resistance Training',
      'Cardio Equipment',
      'Recovery & Massage',
      'Sports Accessories',
    ],
    avgCostRange: { min: 5, max: 500 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Taiwan', 'India'],
    commonMaterials: [
      'Carbon Steel',
      'Natural Rubber',
      'EVA Foam',
      'Stainless Steel 304',
      'Nylon PA6',
      'TPE',
    ],
    description:
      'Fitness equipment ranges from simple accessories (resistance bands, yoga mats) to complex machinery (treadmills, rowing machines). China produces the vast majority of global fitness equipment, with Shandong province as a key hub for commercial-grade equipment. Freight costs are a major consideration for heavy items like dumbbells and weight plates.',
  },
  {
    name: 'Beauty & Cosmetics',
    icon: '\u{1F484}',
    subcategories: [
      'Makeup Products',
      'Skincare',
      'Haircare Tools',
      'Fragrance',
      'Packaging & Containers',
      'Beauty Accessories',
    ],
    avgCostRange: { min: 1, max: 50 },
    avgLeadTimeDays: 30,
    topCountries: ['China', 'South Korea', 'Italy'],
    commonMaterials: [
      'Glass (Soda-Lime)',
      'PET',
      'Polypropylene',
      'Aluminum 6061',
      'Acrylic / PMMA',
      'Bamboo',
    ],
    description:
      'Beauty and cosmetics manufacturing splits into two segments: formulation (the product itself) and packaging (containers, pumps, caps). South Korea excels in skincare formulation with innovative ingredients. China leads in packaging manufacturing. FDA regulations require product registration and ingredient compliance for the US market.',
  },
  {
    name: 'Fashion Accessories',
    icon: '\u{1F48E}',
    subcategories: [
      'Jewelry',
      'Watches',
      'Sunglasses',
      'Hats & Caps',
      'Scarves & Wraps',
      'Belts',
    ],
    avgCostRange: { min: 2, max: 200 },
    avgLeadTimeDays: 25,
    topCountries: ['China', 'India', 'Turkey'],
    commonMaterials: [
      'Stainless Steel 316',
      'Brass',
      'Leather (Full Grain)',
      'Faux Leather (PU)',
      'Acrylic / PMMA',
      'Zinc Alloy (Zamak)',
    ],
    description:
      'Fashion accessories encompass a broad range of products where design, materials, and branding drive margins. China\'s Yiwu and Guangzhou are major hubs for costume jewelry and accessories. India excels in precious and semi-precious jewelry. Low MOQs are often available due to simpler production processes.',
  },
  {
    name: 'Bags & Luggage',
    icon: '\u{1F392}',
    subcategories: [
      'Backpacks',
      'Suitcases & Luggage',
      'Tote Bags',
      'Messenger Bags',
      'Cosmetic Bags',
      'Laptop Bags',
    ],
    avgCostRange: { min: 5, max: 200 },
    avgLeadTimeDays: 30,
    topCountries: ['China', 'Vietnam', 'India'],
    commonMaterials: [
      'Nylon Fabric (Ripstop)',
      'Polyester Fabric',
      'Faux Leather (PU)',
      'Canvas',
      'Polycarbonate',
      'Zinc Alloy (Zamak)',
    ],
    description:
      'Bags and luggage manufacturing requires specialized sewing, pattern-cutting, and hardware integration expertise. China (particularly Guangdong) and Vietnam are the dominant producers. Key quality indicators include stitch density, zipper quality (YKK vs. generic), and material denier count. Hard-shell luggage uses injection-molded polycarbonate or ABS.',
  },
  {
    name: 'Footwear',
    icon: '\u{1F45F}',
    subcategories: [
      'Athletic Shoes',
      'Casual Footwear',
      'Sandals & Slides',
      'Boots',
      'Dress Shoes',
      'Slippers',
    ],
    avgCostRange: { min: 3, max: 80 },
    avgLeadTimeDays: 45,
    topCountries: ['China', 'Vietnam', 'Indonesia'],
    commonMaterials: [
      'EVA',
      'TPU',
      'Leather (Full Grain)',
      'Faux Leather (PU)',
      'Natural Rubber',
      'Polyester Fabric',
    ],
    description:
      'Footwear is one of the most complex manufacturing categories, with a single shoe potentially containing 20+ materials and 200+ processing steps. Vietnam has overtaken China for athletic footwear (Nike, Adidas), while Indonesia is strong in casual and canvas shoes. Mold/last development is a significant upfront cost.',
  },
  {
    name: 'Apparel',
    icon: '\u{1F455}',
    subcategories: [
      'Casual Wear',
      'Activewear & Athleisure',
      'Workwear & Uniforms',
      'Outerwear',
      'Underwear & Intimates',
      'Swimwear',
    ],
    avgCostRange: { min: 2, max: 50 },
    avgLeadTimeDays: 40,
    topCountries: ['Bangladesh', 'Vietnam', 'China'],
    commonMaterials: [
      'Cotton',
      'Polyester Fabric',
      'Nylon PA6',
      'Spandex / Elastane',
      'Organic Cotton',
      'Bamboo Fabric',
    ],
    description:
      'Apparel manufacturing is labor-intensive, making countries with low labor costs (Bangladesh, Vietnam, Cambodia) highly competitive. Bangladesh leads in basic knits and woven garments, while China retains dominance in technical and performance fabrics. Typical MOQs range from 200-500 units per style per color. Lead times include fabric sourcing, sampling, and production.',
  },
  {
    name: 'Toys & Games',
    icon: '\u{1F3B2}',
    subcategories: [
      'Construction & Building Sets',
      'Dolls & Figures',
      'Board Games & Puzzles',
      'Remote Control Toys',
      'Educational Toys',
      'Outdoor Play Equipment',
    ],
    avgCostRange: { min: 2, max: 100 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Vietnam', 'India'],
    commonMaterials: [
      'ABS',
      'Polypropylene',
      'Polyester Fabric',
      'EVA',
      'Plywood',
      'Natural Rubber',
    ],
    description:
      'Toy manufacturing is heavily concentrated in China (Guangdong province accounts for ~70% of world production), with Shantou and Dongguan as key hubs. Safety testing under ASTM F963 (US) and EN 71 (EU) is mandatory and adds $2,000-5,000 per SKU. Products targeting children under 3 face the strictest requirements.',
  },
  {
    name: 'Automotive Accessories',
    icon: '\u{1F697}',
    subcategories: [
      'Interior Accessories',
      'Exterior Accessories',
      'Electronics & Dash Cams',
      'Lighting',
      'Organizers & Storage',
      'Car Care Products',
    ],
    avgCostRange: { min: 5, max: 200 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Taiwan', 'Mexico'],
    commonMaterials: [
      'ABS',
      'Polycarbonate',
      'Faux Leather (PU)',
      'Silicone Rubber',
      'Carbon Fiber',
      'EVA Foam',
    ],
    description:
      'Automotive accessories range from simple interior organizers to complex electronic dash cams. China dominates the aftermarket accessories sector, while Mexico and Thailand lead in OEM automotive parts. Products with electronic components require FCC certification. UV and heat resistance are critical material considerations for in-vehicle use.',
  },
  {
    name: 'Office & Stationery',
    icon: '\u{1F4DD}',
    subcategories: [
      'Writing Instruments',
      'Notebooks & Planners',
      'Desk Organizers',
      'Filing & Storage',
      'Whiteboards & Boards',
      'Desk Accessories',
    ],
    avgCostRange: { min: 0.5, max: 50 },
    avgLeadTimeDays: 25,
    topCountries: ['China', 'India', 'Vietnam'],
    commonMaterials: [
      'Paper / Cardboard',
      'Polypropylene',
      'ABS',
      'Bamboo',
      'Faux Leather (PU)',
      'Aluminum 6061',
    ],
    description:
      'Office and stationery products are typically low-cost, high-volume items with thin margins. China\'s Ningbo and Yiwu are the primary sourcing hubs. Customization (logo printing, embossing, custom colors) is readily available at minimal additional cost. Eco-friendly materials (recycled paper, bamboo) are increasingly demanded by corporate buyers.',
  },
  {
    name: 'Medical Devices',
    icon: '\u{1FA7A}',
    subcategories: [
      'Diagnostic Equipment',
      'Surgical Instruments',
      'Wearable Health Monitors',
      'Rehabilitation Devices',
      'Disposable Medical Supplies',
      'Dental Equipment',
    ],
    avgCostRange: { min: 5, max: 5000 },
    avgLeadTimeDays: 60,
    topCountries: ['China', 'Mexico', 'Taiwan'],
    commonMaterials: [
      'Stainless Steel 316',
      'Silicone Rubber',
      'Polycarbonate',
      'Titanium (Grade 5)',
      'PEEK',
      'Nylon PA66',
    ],
    description:
      'Medical device manufacturing requires the highest quality standards, cleanroom environments, and extensive regulatory compliance (FDA 510(k), ISO 13485, CE marking). China and Mexico are growing hubs for contract manufacturing, while Taiwan excels in precision medical electronics. Regulatory approval timelines (6-18 months) must be factored into product launch planning.',
  },
  {
    name: 'Packaging',
    icon: '\u{1F4E6}',
    subcategories: [
      'Corrugated Boxes',
      'Rigid Boxes',
      'Flexible Packaging',
      'Bottles & Jars',
      'Blister & Clamshell',
      'Labels & Inserts',
    ],
    avgCostRange: { min: 0.1, max: 10 },
    avgLeadTimeDays: 20,
    topCountries: ['China', 'Vietnam', 'India'],
    commonMaterials: [
      'Corrugated Cardboard',
      'Paper / Cardboard',
      'PET',
      'Polypropylene',
      'Glass (Soda-Lime)',
      'LDPE',
    ],
    description:
      'Packaging is an essential companion to nearly every manufactured product. China offers the widest range of packaging options at the lowest costs, from simple kraft boxes to complex rigid gift boxes with magnetic closures. Sustainable packaging (FSC-certified, soy-based inks, recyclable materials) is increasingly required by retailers. Lead times are short relative to the products being packaged.',
  },
  {
    name: 'Industrial Tools',
    icon: '\u{1F527}',
    subcategories: [
      'Hand Tools',
      'Power Tool Accessories',
      'Measuring Instruments',
      'Safety Equipment',
      'Welding Supplies',
      'Cutting Tools',
    ],
    avgCostRange: { min: 2, max: 300 },
    avgLeadTimeDays: 35,
    topCountries: ['China', 'Taiwan', 'India'],
    commonMaterials: [
      'Carbon Steel',
      'Stainless Steel 304',
      'Aluminum 6061',
      'Natural Rubber',
      'Nylon PA6',
      'Polypropylene',
    ],
    description:
      'Industrial tools require precise metallurgy, heat treatment, and finish quality. China (particularly Yongkang, known as "Hardware Capital") produces the majority of global hand tools and power tool accessories. Taiwan excels in precision measuring instruments and high-end cutting tools. Quality certifications (ANSI, DIN, ISO) are important for professional-grade products.',
  },
] as const satisfies readonly IndustryCategory[];

// ── Utility helpers ────────────────────────────────────────────────────

export function getIndustryByName(name: string): IndustryCategory | undefined {
  return INDUSTRY_CATEGORIES.find(
    (i) => i.name.toLowerCase() === name.toLowerCase()
  );
}

export function searchIndustries(query: string): IndustryCategory[] {
  const q = query.toLowerCase();
  return INDUSTRY_CATEGORIES.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.subcategories.some((s) => s.toLowerCase().includes(q)) ||
      i.description.toLowerCase().includes(q)
  );
}

export function getIndustriesByCountry(countryName: string): IndustryCategory[] {
  return INDUSTRY_CATEGORIES.filter((i) =>
    i.topCountries.some(
      (c) => c.toLowerCase() === countryName.toLowerCase()
    )
  );
}

export function getIndustriesByMaterial(materialName: string): IndustryCategory[] {
  const q = materialName.toLowerCase();
  return INDUSTRY_CATEGORIES.filter((i) =>
    i.commonMaterials.some((m) => m.toLowerCase().includes(q))
  );
}
