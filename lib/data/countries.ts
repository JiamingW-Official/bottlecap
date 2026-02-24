// Manufacturing country data library for Bottlecap manufacturing analysis platform
// Sources: World Bank, ILO, WTO, industry surveys

export interface ManufacturingCountry {
  name: string;
  code: string;
  emoji: string;
  region: string;
  strengths: string[];
  weaknesses: string[];
  avgLeadTimeDays: number;
  avgMoq: number;
  laborCostPerHour: number;
  qualityRating: number;
  ipProtection: number;
  infrastructure: number;
  specializations: string[];
  keyPorts: string[];
  timezone: string;
  language: string;
  currency: string;
  tradingBlocs: string[];
  avgTariffToUS: number;
  description: string;
}

export const MANUFACTURING_COUNTRIES: readonly ManufacturingCountry[] = [
  {
    name: 'China',
    code: 'CN',
    emoji: '\u{1F1E8}\u{1F1F3}',
    region: 'East Asia',
    strengths: [
      'Unmatched manufacturing scale and supplier density',
      'Full vertical integration across nearly every product category',
      'Highly developed logistics and port infrastructure',
      'Competitive pricing due to economies of scale',
      'Rapid prototyping and short development cycles',
    ],
    weaknesses: [
      'Section 301 tariffs (7.5%-25%) significantly increase landed cost to US',
      'IP theft and counterfeiting remain persistent concerns',
      'Rising labor costs eroding price advantage vs. SE Asia',
      'Geopolitical tensions creating supply chain uncertainty',
    ],
    avgLeadTimeDays: 35,
    avgMoq: 500,
    laborCostPerHour: 6.5,
    qualityRating: 7,
    ipProtection: 4,
    infrastructure: 9,
    specializations: [
      'Consumer Electronics',
      'Plastics & Injection Molding',
      'Textiles & Apparel',
      'Toys & Games',
      'Furniture',
      'Metal Fabrication',
    ],
    keyPorts: ['Shanghai', 'Shenzhen (Yantian)', 'Ningbo-Zhoushan', 'Guangzhou'],
    timezone: 'UTC+8',
    language: 'Mandarin Chinese',
    currency: 'CNY (Chinese Yuan)',
    tradingBlocs: ['RCEP', 'APEC'],
    avgTariffToUS: 19.3,
    description:
      'China remains the world\'s largest manufacturing hub, producing roughly 30% of global manufacturing output. Its unparalleled supplier ecosystem spans virtually every product category, with clusters like Shenzhen for electronics and Yiwu for small commodities. However, escalating trade tensions and Section 301 tariffs are prompting many importers to diversify their supply chains.',
  },
  {
    name: 'Vietnam',
    code: 'VN',
    emoji: '\u{1F1FB}\u{1F1F3}',
    region: 'Southeast Asia',
    strengths: [
      'Rapidly growing manufacturing sector with strong government support',
      'Competitive labor costs significantly below China',
      'Favorable trade agreements (CPTPP, EU-Vietnam FTA)',
      'Young and trainable workforce',
      'Strong in apparel, footwear, and light assembly',
    ],
    weaknesses: [
      'Limited domestic supply chain compared to China',
      'Infrastructure still developing outside major cities',
      'Skilled labor shortage for high-tech manufacturing',
    ],
    avgLeadTimeDays: 42,
    avgMoq: 1000,
    laborCostPerHour: 2.99,
    qualityRating: 6,
    ipProtection: 4,
    infrastructure: 6,
    specializations: [
      'Footwear',
      'Apparel & Textiles',
      'Electronics Assembly',
      'Furniture',
      'Bags & Luggage',
      'Seafood Processing',
    ],
    keyPorts: ['Ho Chi Minh City (Cat Lai)', 'Hai Phong', 'Da Nang'],
    timezone: 'UTC+7',
    language: 'Vietnamese',
    currency: 'VND (Vietnamese Dong)',
    tradingBlocs: ['RCEP', 'CPTPP', 'ASEAN', 'APEC'],
    avgTariffToUS: 6.7,
    description:
      'Vietnam has emerged as one of the top "China+1" alternatives, benefiting enormously from trade war dynamics. Samsung, Nike, and Adidas all have major production facilities in the country. The government is actively investing in infrastructure and industrial zones, though the domestic supply chain still relies on imported raw materials from China for many product categories.',
  },
  {
    name: 'India',
    code: 'IN',
    emoji: '\u{1F1EE}\u{1F1F3}',
    region: 'South Asia',
    strengths: [
      'Massive labor pool with growing technical skills',
      'Strong pharmaceutical, textile, and IT manufacturing base',
      'Government incentives via "Make in India" and PLI schemes',
      'Large domestic market provides economies of scale',
      'English widely spoken in business environments',
    ],
    weaknesses: [
      'Bureaucratic complexity and inconsistent regulatory enforcement',
      'Infrastructure gaps in logistics, power, and roads',
      'Quality consistency can be challenging across suppliers',
      'Longer lead times due to port congestion and customs delays',
    ],
    avgLeadTimeDays: 50,
    avgMoq: 500,
    laborCostPerHour: 2.0,
    qualityRating: 6,
    ipProtection: 5,
    infrastructure: 5,
    specializations: [
      'Textiles & Apparel',
      'Pharmaceuticals',
      'Jewelry & Gemstones',
      'Leather Goods',
      'Auto Components',
      'IT Hardware',
    ],
    keyPorts: ['Nhava Sheva (JNPT)', 'Mundra', 'Chennai', 'Visakhapatnam'],
    timezone: 'UTC+5:30',
    language: 'Hindi / English',
    currency: 'INR (Indian Rupee)',
    tradingBlocs: ['SAARC', 'BIMSTEC'],
    avgTariffToUS: 3.4,
    description:
      'India is rapidly positioning itself as a manufacturing powerhouse with government programs like "Make in India" offering substantial incentives. Apple supplier Foxconn and Tata Electronics are expanding iPhone assembly operations. The country excels in textiles, pharmaceuticals, and auto components, though lead times and logistics remain challenges compared to East Asian alternatives.',
  },
  {
    name: 'Mexico',
    code: 'MX',
    emoji: '\u{1F1F2}\u{1F1FD}',
    region: 'North America',
    strengths: [
      'USMCA enables duty-free access to the US market for qualifying goods',
      'Geographic proximity to US cuts shipping time to 3-5 days overland',
      'Established automotive and aerospace manufacturing ecosystem',
      'Nearshoring momentum attracting major investment',
      'Same or overlapping time zones with US buyers',
    ],
    weaknesses: [
      'Higher labor costs than Southeast Asia',
      'Security concerns in certain regions',
      'Limited depth in consumer electronics manufacturing',
    ],
    avgLeadTimeDays: 18,
    avgMoq: 300,
    laborCostPerHour: 4.82,
    qualityRating: 7,
    ipProtection: 6,
    infrastructure: 7,
    specializations: [
      'Automotive Parts',
      'Aerospace Components',
      'Medical Devices',
      'Appliances',
      'Furniture',
      'Plastics',
    ],
    keyPorts: ['Manzanillo', 'Lazaro Cardenas', 'Veracruz', 'Altamira'],
    timezone: 'UTC-6',
    language: 'Spanish',
    currency: 'MXN (Mexican Peso)',
    tradingBlocs: ['USMCA', 'Pacific Alliance', 'CPTPP'],
    avgTariffToUS: 0,
    description:
      'Mexico is the top nearshoring destination for US importers, offering duty-free access under USMCA and overland shipping that cuts transit times to days instead of weeks. The country has a mature automotive and aerospace manufacturing base, and is increasingly attracting electronics and consumer goods production as companies diversify from Asia.',
  },
  {
    name: 'Taiwan',
    code: 'TW',
    emoji: '\u{1F1F9}\u{1F1FC}',
    region: 'East Asia',
    strengths: [
      'World-leading semiconductor and precision electronics manufacturing',
      'Exceptional quality control and engineering capabilities',
      'Strong IP protection and rule of law',
      'Deep expertise in PCB, IC, and display technologies',
      'Well-educated, highly skilled workforce',
    ],
    weaknesses: [
      'High manufacturing costs vs. mainland China and SE Asia',
      'Limited capacity for labor-intensive mass production',
      'Geopolitical risk related to cross-strait tensions',
    ],
    avgLeadTimeDays: 30,
    avgMoq: 200,
    laborCostPerHour: 10.5,
    qualityRating: 9,
    ipProtection: 8,
    infrastructure: 9,
    specializations: [
      'Semiconductors',
      'PCBs & Electronics',
      'Precision Machinery',
      'Displays & Optics',
      'Bicycle Manufacturing',
      'Medical Equipment',
    ],
    keyPorts: ['Kaohsiung', 'Keelung', 'Taichung'],
    timezone: 'UTC+8',
    language: 'Mandarin Chinese',
    currency: 'TWD (New Taiwan Dollar)',
    tradingBlocs: ['APEC', 'WTO'],
    avgTariffToUS: 2.4,
    description:
      'Taiwan is the global epicenter of semiconductor manufacturing, home to TSMC, the world\'s most advanced chip foundry. Beyond semiconductors, Taiwan excels in precision electronics, PCBs, optics, and bicycle manufacturing (Giant, Merida). Manufacturing costs are higher than mainland China, making it best suited for high-value, technology-intensive products.',
  },
  {
    name: 'South Korea',
    code: 'KR',
    emoji: '\u{1F1F0}\u{1F1F7}',
    region: 'East Asia',
    strengths: [
      'Advanced technology manufacturing (semiconductors, displays, batteries)',
      'Exceptional quality standards and process engineering',
      'Strong R&D ecosystem and innovation culture',
      'Robust IP protection and legal framework',
      'KORUS FTA provides preferential US access',
    ],
    weaknesses: [
      'High labor costs limit competitiveness for low-value goods',
      'Relatively small manufacturing base vs. China',
      'Complex business culture can slow negotiations',
    ],
    avgLeadTimeDays: 28,
    avgMoq: 200,
    laborCostPerHour: 16.0,
    qualityRating: 9,
    ipProtection: 8,
    infrastructure: 9,
    specializations: [
      'Semiconductors & Memory',
      'Displays (OLED/LCD)',
      'Batteries & EVs',
      'Shipbuilding',
      'Cosmetics & Beauty',
      'Steel & Petrochemicals',
    ],
    keyPorts: ['Busan', 'Incheon', 'Ulsan'],
    timezone: 'UTC+9',
    language: 'Korean',
    currency: 'KRW (South Korean Won)',
    tradingBlocs: ['RCEP', 'KORUS FTA', 'APEC'],
    avgTariffToUS: 1.6,
    description:
      'South Korea is a global leader in high-tech manufacturing, home to Samsung, LG, SK Hynix, and Hyundai. The KORUS FTA provides duty-free or reduced-tariff access for many products entering the US. The country is best suited for high-value manufacturing where quality, technology, and IP security are paramount, rather than cost-competitive mass production.',
  },
  {
    name: 'Thailand',
    code: 'TH',
    emoji: '\u{1F1F9}\u{1F1ED}',
    region: 'Southeast Asia',
    strengths: [
      'Well-established manufacturing base across multiple sectors',
      'Good infrastructure by SE Asian standards',
      'Strong automotive manufacturing hub (Detroit of Asia)',
      'Competitive labor costs with decent skill levels',
      'Politically stable trade relationships with major economies',
    ],
    weaknesses: [
      'Aging workforce with slower population growth',
      'Rising wages reducing cost advantage vs. Vietnam/Cambodia',
      'Political instability can occasionally disrupt business',
      'No bilateral FTA with the US',
    ],
    avgLeadTimeDays: 38,
    avgMoq: 500,
    laborCostPerHour: 3.5,
    qualityRating: 7,
    ipProtection: 5,
    infrastructure: 7,
    specializations: [
      'Automotive & Auto Parts',
      'Rubber Products',
      'Electronics Assembly',
      'Food Processing',
      'Jewelry',
      'Plastics',
    ],
    keyPorts: ['Laem Chabang', 'Bangkok Port (Klong Toey)', 'Map Ta Phut'],
    timezone: 'UTC+7',
    language: 'Thai',
    currency: 'THB (Thai Baht)',
    tradingBlocs: ['RCEP', 'ASEAN', 'APEC'],
    avgTariffToUS: 4.8,
    description:
      'Thailand is Southeast Asia\'s most industrialized economy after Singapore, with a mature manufacturing ecosystem especially strong in automotive (Toyota, Honda, Ford all operate here), electronics, and food processing. Known as the "Detroit of Asia," it produces over 1.5 million vehicles annually. It offers a good balance of cost, quality, and infrastructure.',
  },
  {
    name: 'Indonesia',
    code: 'ID',
    emoji: '\u{1F1EE}\u{1F1E9}',
    region: 'Southeast Asia',
    strengths: [
      'Largest economy in ASEAN with a massive domestic market',
      'Very competitive labor costs',
      'Rich in natural resources (palm oil, nickel, rubber, timber)',
      'Government actively promoting manufacturing investment',
      'Growing footwear, furniture, and electronics sectors',
    ],
    weaknesses: [
      'Fragmented archipelago complicates logistics',
      'Bureaucracy and regulatory complexity',
      'Infrastructure outside Java still underdeveloped',
      'Quality consistency requires careful supplier vetting',
    ],
    avgLeadTimeDays: 45,
    avgMoq: 1000,
    laborCostPerHour: 1.9,
    qualityRating: 5,
    ipProtection: 4,
    infrastructure: 5,
    specializations: [
      'Footwear',
      'Furniture & Wood Products',
      'Palm Oil Products',
      'Rubber & Tires',
      'Textiles',
      'Nickel & Battery Materials',
    ],
    keyPorts: ['Tanjung Priok (Jakarta)', 'Tanjung Perak (Surabaya)', 'Belawan (Medan)'],
    timezone: 'UTC+7',
    language: 'Bahasa Indonesia',
    currency: 'IDR (Indonesian Rupiah)',
    tradingBlocs: ['RCEP', 'ASEAN', 'APEC'],
    avgTariffToUS: 5.2,
    description:
      'Indonesia is the fourth most-populous country and ASEAN\'s largest economy, offering very low labor costs and abundant natural resources. Nike and Adidas both source footwear heavily from Indonesia. The country is emerging as a key player in EV battery supply chains due to its vast nickel reserves. Logistics can be complex given its archipelago geography.',
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    emoji: '\u{1F1E7}\u{1F1E9}',
    region: 'South Asia',
    strengths: [
      'Among the lowest manufacturing labor costs in the world',
      'Second-largest garment exporter globally after China',
      'Deep expertise in apparel and textile production',
      'Duty-free access to EU under Everything But Arms (EBA)',
      'Large and young workforce',
    ],
    weaknesses: [
      'Limited manufacturing diversity beyond apparel',
      'Infrastructure and power supply challenges',
      'Workplace safety concerns despite post-Rana Plaza improvements',
      'Longer lead times and customs inefficiencies',
    ],
    avgLeadTimeDays: 55,
    avgMoq: 2000,
    laborCostPerHour: 0.95,
    qualityRating: 5,
    ipProtection: 3,
    infrastructure: 4,
    specializations: [
      'Ready-Made Garments',
      'Knitwear',
      'Denim & Jeans',
      'Leather & Footwear',
      'Home Textiles',
      'Jute Products',
    ],
    keyPorts: ['Chittagong', 'Mongla'],
    timezone: 'UTC+6',
    language: 'Bengali',
    currency: 'BDT (Bangladeshi Taka)',
    tradingBlocs: ['SAARC', 'BIMSTEC'],
    avgTariffToUS: 15.3,
    description:
      'Bangladesh is the world\'s second-largest garment exporter, producing for brands like H&M, Zara, Primark, and Walmart. The country offers extremely low labor costs, making it ideal for high-volume apparel orders. Manufacturing is heavily concentrated in the Dhaka-Chittagong corridor. Note that unlike some competitors, Bangladesh does not have a preferential trade agreement with the US.',
  },
  {
    name: 'Turkey',
    code: 'TR',
    emoji: '\u{1F1F9}\u{1F1F7}',
    region: 'Europe / Middle East',
    strengths: [
      'Strategic location bridging Europe and Asia',
      'Strong textile, apparel, and home goods manufacturing',
      'EU Customs Union provides access to European markets',
      'Lower MOQs and faster turnarounds for European/US markets',
      'Good quality for mid-range products',
    ],
    weaknesses: [
      'Currency volatility (Turkish Lira) complicates pricing',
      'Higher costs than Asian alternatives',
      'Political and economic uncertainty',
    ],
    avgLeadTimeDays: 25,
    avgMoq: 200,
    laborCostPerHour: 4.5,
    qualityRating: 7,
    ipProtection: 6,
    infrastructure: 7,
    specializations: [
      'Textiles & Apparel',
      'Home Textiles (Towels, Linens)',
      'Furniture',
      'Automotive Parts',
      'Ceramics & Tiles',
      'Jewelry',
    ],
    keyPorts: ['Mersin', 'Ambarli (Istanbul)', 'Izmir (Alsancak)'],
    timezone: 'UTC+3',
    language: 'Turkish',
    currency: 'TRY (Turkish Lira)',
    tradingBlocs: ['EU Customs Union', 'BSEC', 'ECO'],
    avgTariffToUS: 3.5,
    description:
      'Turkey is a significant manufacturing hub known especially for textiles, home goods, and furniture, with a unique geographic advantage bridging Europe and Asia. Turkish manufacturers typically offer lower MOQs and faster response times than Asian suppliers, making the country well-suited for DTC brands and smaller importers. Currency depreciation has improved export competitiveness in recent years.',
  },
  {
    name: 'Poland',
    code: 'PL',
    emoji: '\u{1F1F5}\u{1F1F1}',
    region: 'Central Europe',
    strengths: [
      'EU membership provides regulatory stability and market access',
      'Strong engineering talent and technical education system',
      'Well-developed infrastructure and logistics networks',
      'Growing automotive, electronics, and appliance manufacturing',
      'Excellent IP protection under EU framework',
    ],
    weaknesses: [
      'Higher labor costs than Asian competitors',
      'Smaller manufacturing scale than Asian hubs',
      'Skilled labor shortage in some technical fields',
    ],
    avgLeadTimeDays: 22,
    avgMoq: 100,
    laborCostPerHour: 12.0,
    qualityRating: 8,
    ipProtection: 8,
    infrastructure: 8,
    specializations: [
      'Automotive Components',
      'Home Appliances',
      'Furniture',
      'Electronics Assembly',
      'Cosmetics & Personal Care',
      'Machinery & Metal Parts',
    ],
    keyPorts: ['Gdansk', 'Gdynia', 'Szczecin'],
    timezone: 'UTC+1',
    language: 'Polish',
    currency: 'PLN (Polish Zloty)',
    tradingBlocs: ['EU', 'EEA', 'NATO'],
    avgTariffToUS: 3.5,
    description:
      'Poland has become Central Europe\'s manufacturing powerhouse, attracting billions in foreign investment from companies like LG, Samsung, and Volkswagen. The country offers EU-standard quality and IP protection with labor costs well below Western Europe. It is particularly strong in automotive components, household appliances, and furniture manufacturing.',
  },
  {
    name: 'Philippines',
    code: 'PH',
    emoji: '\u{1F1F5}\u{1F1ED}',
    region: 'Southeast Asia',
    strengths: [
      'Strong English language proficiency among workforce',
      'Competitive labor costs with good educational foundation',
      'Growing electronics and semiconductor assembly sector',
      'Government incentives for export-oriented manufacturing',
      'Cultural affinity with US business practices',
    ],
    weaknesses: [
      'Archipelago geography complicates logistics',
      'Infrastructure gaps outside Metro Manila and Cebu',
      'Typhoon-prone geography creates supply chain risk',
      'Smaller manufacturing base than Vietnam or Thailand',
    ],
    avgLeadTimeDays: 40,
    avgMoq: 500,
    laborCostPerHour: 2.3,
    qualityRating: 6,
    ipProtection: 5,
    infrastructure: 5,
    specializations: [
      'Semiconductor Assembly & Testing',
      'Electronics Components',
      'Furniture & Handicrafts',
      'Garments',
      'Food Processing',
      'Wiring Harnesses',
    ],
    keyPorts: ['Manila (Port of Manila)', 'Subic Bay', 'Cebu'],
    timezone: 'UTC+8',
    language: 'Filipino / English',
    currency: 'PHP (Philippine Peso)',
    tradingBlocs: ['RCEP', 'ASEAN', 'APEC'],
    avgTariffToUS: 4.1,
    description:
      'The Philippines is a significant player in semiconductor assembly and testing, handling roughly 10% of the global supply. English proficiency and cultural alignment with the US make communication easier than many Asian alternatives. The country also has a growing furniture and handicraft export sector leveraging local wood and rattan resources.',
  },
] as const satisfies readonly ManufacturingCountry[];

// ── Utility helpers ────────────────────────────────────────────────────

export function getCountryByCode(code: string): ManufacturingCountry | undefined {
  return MANUFACTURING_COUNTRIES.find((c) => c.code === code);
}

export function getCountryByName(name: string): ManufacturingCountry | undefined {
  return MANUFACTURING_COUNTRIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getCountriesByRegion(region: string): ManufacturingCountry[] {
  return MANUFACTURING_COUNTRIES.filter((c) => c.region === region);
}

export function getCountriesBySpecialization(specialization: string): ManufacturingCountry[] {
  const q = specialization.toLowerCase();
  return MANUFACTURING_COUNTRIES.filter((c) =>
    c.specializations.some((s) => s.toLowerCase().includes(q))
  );
}

export function rankCountriesByScore(
  weights: {
    quality?: number;
    cost?: number;
    speed?: number;
    ip?: number;
    infrastructure?: number;
  } = {}
): ManufacturingCountry[] {
  const w = {
    quality: weights.quality ?? 1,
    cost: weights.cost ?? 1,
    speed: weights.speed ?? 1,
    ip: weights.ip ?? 1,
    infrastructure: weights.infrastructure ?? 1,
  };

  const maxLabor = Math.max(...MANUFACTURING_COUNTRIES.map((c) => c.laborCostPerHour));
  const maxLead = Math.max(...MANUFACTURING_COUNTRIES.map((c) => c.avgLeadTimeDays));

  return [...MANUFACTURING_COUNTRIES].sort((a, b) => {
    const scoreA =
      a.qualityRating * w.quality +
      ((maxLabor - a.laborCostPerHour) / maxLabor) * 10 * w.cost +
      ((maxLead - a.avgLeadTimeDays) / maxLead) * 10 * w.speed +
      a.ipProtection * w.ip +
      a.infrastructure * w.infrastructure;
    const scoreB =
      b.qualityRating * w.quality +
      ((maxLabor - b.laborCostPerHour) / maxLabor) * 10 * w.cost +
      ((maxLead - b.avgLeadTimeDays) / maxLead) * 10 * w.speed +
      b.ipProtection * w.ip +
      b.infrastructure * w.infrastructure;
    return scoreB - scoreA;
  });
}
