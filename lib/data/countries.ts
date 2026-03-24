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
  redFlags: string[];
  complianceTimeline: string;
  factoryClusters: string[];
  laborCostTrend: string;
  tradeAgreements: string[];
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
    redFlags: [
      'IP theft common without NDA enforcement — register patents/trademarks in China before sharing designs',
      'Section 301 tariffs at 25% on most goods significantly increase landed cost',
      'Currency manipulation risk (CNY) — always negotiate in USD and lock exchange rates in contracts',
    ],
    complianceTimeline: 'Business registration: 20-30 days, Import/export license: 15-30 days, Factory audit (BSCI/SMETA): 2-4 weeks, Product certification (CCC): 8-12 weeks',
    factoryClusters: [
      'Shenzhen (consumer electronics, PCBs, IoT devices)',
      'Yiwu (small commodities, toys, decorations)',
      'Dongguan (toys, plastics, shoes, furniture)',
      'Foshan (ceramics, furniture, lighting)',
      'Wenzhou (eyewear, footwear, valves)',
      'Ningbo (appliances, auto parts, molds)',
    ],
    laborCostTrend: '+6% YoY (2024-2025), minimum wage varies by province — Shenzhen $3.80/hr, inland provinces $2.50/hr; expect continued upward pressure',
    tradeAgreements: [
      'RCEP (Regional Comprehensive Economic Partnership)',
      'ASEAN-China FTA',
      'China-Australia FTA',
      'China-South Korea FTA',
      'China-New Zealand FTA',
    ],
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
    redFlags: [
      'Many factories import raw materials from China — potential transshipment scrutiny from US Customs (EAPA investigations)',
      'IP enforcement is weak; counterfeit production has increased as manufacturing grows',
      'Power outages in northern provinces can delay production 1-2 weeks during peak summer',
    ],
    complianceTimeline: 'Business registration: 15-20 days, Import license: 20-30 days, Factory audit: 2-3 weeks, Product certification: 6-8 weeks depending on category',
    factoryClusters: [
      'Ho Chi Minh City (garments, footwear, light electronics)',
      'Binh Duong (furniture, footwear, plastics)',
      'Bac Ninh (Samsung electronics hub, PCBs)',
      'Hai Phong (textiles, electronics assembly)',
      'Dong Nai (shoes, bags, industrial goods)',
    ],
    laborCostTrend: '+8% YoY (2024-2025), minimum wage increased to ~$2.99/hr in Region I (HCMC area); Region IV (rural) at ~$2.10/hr; labor costs rising faster than productivity',
    tradeAgreements: [
      'CPTPP (Comprehensive and Progressive Agreement for Trans-Pacific Partnership)',
      'EU-Vietnam Free Trade Agreement (EVFTA)',
      'RCEP (Regional Comprehensive Economic Partnership)',
      'ASEAN Trade in Goods Agreement (ATIGA)',
      'Vietnam-South Korea FTA',
    ],
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
    redFlags: [
      'Customs delays average 3-5 extra days at major ports — build buffer into delivery timelines',
      'Quality inconsistency between factories is common; always require pre-shipment inspection',
      'GST and import duty structure is complex — engage a local compliance agent to avoid surprise levies',
    ],
    complianceTimeline: 'Business registration (IEC code): 10-15 days, Import license (DGFT): 30-45 days, Factory audit: 2-4 weeks, BIS certification: 8-16 weeks, FSSAI (food): 60 days',
    factoryClusters: [
      'Tiruppur (knitwear and cotton garments)',
      'Surat (diamonds, textiles, synthetic fabrics)',
      'Pune (automotive components, engineering)',
      'Noida/Greater Noida (electronics assembly, mobile phones)',
      'Jaipur (jewelry, gemstones, handicrafts)',
      'Ludhiana (hosiery, bicycle parts, hand tools)',
    ],
    laborCostTrend: '+5% YoY (2024-2025), minimum wage varies by state — Delhi $2.50/hr, Maharashtra $2.20/hr, rural states under $1.50/hr; PLI schemes driving wage growth in electronics',
    tradeAgreements: [
      'India-ASEAN Trade in Goods Agreement',
      'India-South Korea CEPA',
      'India-Japan CEPA',
      'South Asian Free Trade Area (SAFTA)',
      'India-UAE CEPA (2022)',
    ],
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
    redFlags: [
      'Cartel activity in certain states (Tamaulipas, Guerrero, Sinaloa) — vet factory locations carefully',
      'USMCA rules of origin are strict — products must meet regional value content (RVC) thresholds or duties apply',
      'Peso volatility can affect pricing; 10-15% annual swings are common — use forward contracts',
    ],
    complianceTimeline: 'Business registration (RFC): 5-10 days, IMMEX program enrollment: 30-45 days, Factory audit: 1-2 weeks, NOM certification (consumer goods): 4-8 weeks, Customs broker setup: 1 week',
    factoryClusters: [
      'Monterrey (automotive, steel, appliances)',
      'Guadalajara (electronics, software, IT equipment)',
      'Juarez (electronics assembly, automotive)',
      'Queretaro (aerospace, automotive)',
      'Saltillo (automotive OEM, auto parts)',
      'Tijuana (medical devices, electronics, furniture)',
    ],
    laborCostTrend: '+12% YoY (2024-2025), minimum wage doubled since 2019 to ~$4.82/hr; maquiladora wages rising due to nearshoring demand — skilled labor premiums increasing',
    tradeAgreements: [
      'USMCA (United States-Mexico-Canada Agreement)',
      'CPTPP (Comprehensive and Progressive Agreement for Trans-Pacific Partnership)',
      'Mexico-EU Global Agreement (modernized 2024)',
      'Pacific Alliance (with Chile, Colombia, Peru)',
      'Mexico-Japan EPA',
    ],
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
    redFlags: [
      'Cross-strait tensions with China create supply chain risk — have contingency sourcing plans',
      'Limited FTA coverage means no preferential tariff access to most markets including the US',
      'Earthquake-prone geography — major quakes can disrupt semiconductor fabs for weeks (see April 2024 Hualien quake)',
    ],
    complianceTimeline: 'Business registration: 10-15 days, Import/export license: 7-14 days, Factory audit: 1-2 weeks, Product certification (BSMI): 4-8 weeks',
    factoryClusters: [
      'Hsinchu Science Park (semiconductors, TSMC, UMC)',
      'Taoyuan (PCBs, electronics, optoelectronics)',
      'Taichung (precision machinery, bicycles, hand tools)',
      'Tainan Science Park (advanced semiconductors, TSMC Fab 18)',
      'Kaohsiung (shipbuilding, petrochemicals, steel)',
    ],
    laborCostTrend: '+4% YoY (2024-2025), minimum wage at ~$10.50/hr; semiconductor engineers command $25-50/hr; TSMC talent competition driving overall wage inflation',
    tradeAgreements: [
      'WTO membership (as "Separate Customs Territory of Taiwan")',
      'APEC participation',
      'Taiwan-Singapore ASTEP',
      'Taiwan-New Zealand ECA',
      'Taiwan-Panama FTA',
    ],
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
    redFlags: [
      'High minimum wage ($16/hr) makes labor-intensive goods uncompetitive — only suitable for high-value products',
      'Chaebol-dominated supply chain can make it difficult for SMEs to find willing suppliers for small orders',
      'North Korea geopolitical risk — while business impact is rare, insurance and investor sentiment can be affected',
    ],
    complianceTimeline: 'Business registration: 7-14 days, Import license (customs broker): 5-10 days, Factory audit: 1-2 weeks, KC certification (consumer electronics): 6-10 weeks, KFDA (cosmetics): 4-8 weeks',
    factoryClusters: [
      'Gyeonggi Province (Samsung semiconductor fabs, electronics)',
      'Busan (shipbuilding, auto parts, footwear)',
      'Ulsan (Hyundai Motor, petrochemicals, heavy industry)',
      'Chungcheong (SK Hynix, display panels, batteries)',
      'Incheon (cosmetics, food processing, logistics)',
    ],
    laborCostTrend: '+3% YoY (2024-2025), minimum wage at ~$16/hr; skilled manufacturing labor at $20-30/hr; automation adoption accelerating to offset rising costs',
    tradeAgreements: [
      'KORUS FTA (Korea-US Free Trade Agreement)',
      'RCEP (Regional Comprehensive Economic Partnership)',
      'Korea-EU FTA',
      'Korea-China FTA',
      'Korea-ASEAN FTA',
    ],
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
    redFlags: [
      'No US FTA means no preferential tariff rates — standard MFN duties apply on all goods',
      'Military coup history creates periodic political uncertainty — though factories typically continue operating',
      'Flooding risk in central Thailand industrial zones (2011 floods caused $45B in damages) — verify factory elevation and insurance',
    ],
    complianceTimeline: 'Business registration (BOI): 15-30 days, Import license: 15-20 days, Factory audit: 2-3 weeks, TISI certification (industrial standards): 6-10 weeks, Thai FDA (food/cosmetics): 8-12 weeks',
    factoryClusters: [
      'Eastern Seaboard / Rayong (automotive OEM, petrochemicals)',
      'Bangkok metropolitan area (electronics, food processing)',
      'Chonburi (auto parts, steel, logistics hub)',
      'Chiang Mai (handicrafts, food processing)',
      'Lamphun (electronics, hard disk drives)',
    ],
    laborCostTrend: '+5% YoY (2024-2025), minimum wage at ~$3.50/hr; skilled automotive workers at $5-8/hr; government pushing EV industry incentives to attract higher-skill jobs',
    tradeAgreements: [
      'RCEP (Regional Comprehensive Economic Partnership)',
      'ASEAN Trade in Goods Agreement (ATIGA)',
      'Thailand-Australia FTA (TAFTA)',
      'Thailand-Japan EPA (JTEPA)',
      'ASEAN-China FTA',
    ],
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
    redFlags: [
      'Nickel export ban and resource nationalism — government frequently changes export rules with short notice',
      'Corruption index remains high (rank ~100/180) — vet partners carefully and maintain compliance documentation',
      'Inter-island shipping adds 5-10 days and significant cost if factory is not on Java',
    ],
    complianceTimeline: 'Business registration (PMA): 30-45 days, Import license (API/NPIK): 30-60 days, Factory audit: 3-4 weeks, SNI certification (national standards): 8-14 weeks, Halal certification (if required): 12-16 weeks',
    factoryClusters: [
      'Greater Jakarta / Tangerang (footwear, garments, electronics)',
      'Surabaya / East Java (furniture, tobacco, food processing)',
      'Bandung / West Java (textiles, garments)',
      'Semarang / Central Java (furniture, wood products)',
      'Batam Island (electronics assembly, free trade zone)',
    ],
    laborCostTrend: '+7% YoY (2024-2025), minimum wage at ~$1.90/hr in Jakarta province; Batam FTZ at ~$2.20/hr; rural Java under $1.50/hr; government seeking to keep labor competitive vs. Vietnam',
    tradeAgreements: [
      'RCEP (Regional Comprehensive Economic Partnership)',
      'ASEAN Trade in Goods Agreement (ATIGA)',
      'Indonesia-Australia CEPA (IA-CEPA)',
      'Indonesia-EFTA CEPA',
      'ASEAN-China FTA',
    ],
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
    redFlags: [
      'No US FTA or GSP — garments face 15-32% tariffs; factor into landed cost calculations',
      'Factory safety remains a concern — require ACCORD/Alliance or RSC audit reports before placing orders',
      'Chittagong port congestion adds 7-14 days to shipping time — plan 2-3 weeks buffer',
    ],
    complianceTimeline: 'Business registration: 15-30 days, Import/export license (IRC/ERC): 20-30 days, Factory audit (BSCI/WRAP): 3-4 weeks, Product testing (Oeko-Tex): 4-6 weeks, Customs clearance: 5-10 days avg',
    factoryClusters: [
      'Dhaka (Gazipur, Savar, Ashulia — mega garment hub)',
      'Chittagong (garments, leather, shipbreaking)',
      'Narayanganj (knitwear, dyeing, textiles)',
      'Comilla (light manufacturing, garments)',
    ],
    laborCostTrend: '+15% YoY (2024-2025), minimum wage increased to $113/month in Dec 2023 (~$0.95/hr); still the lowest in the region but rapid increases expected after worker protests',
    tradeAgreements: [
      'EU Everything But Arms (EBA) — duty-free access to EU (graduation expected ~2029)',
      'SAFTA (South Asian Free Trade Area)',
      'BIMSTEC (Bay of Bengal Initiative)',
      'Bangladesh-India bilateral trade agreement',
      'APTA (Asia-Pacific Trade Agreement)',
    ],
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
    redFlags: [
      'Turkish Lira lost ~40% value in 2023 alone — negotiate prices in USD/EUR and include currency clauses in contracts',
      'Inflation running 50%+ causes frequent supplier price renegotiation requests mid-order',
      'EU Customs Union does NOT cover agricultural products — separate tariff schedules apply for food/cosmetics',
    ],
    complianceTimeline: 'Business registration: 3-7 days, Import license: 10-15 days, Factory audit: 1-2 weeks, TSE certification (industrial standards): 4-8 weeks, CE marking (EU products): varies by directive',
    factoryClusters: [
      'Istanbul (garments, jewelry, general manufacturing)',
      'Bursa (automotive, textiles)',
      'Denizli (home textiles, towels)',
      'Gaziantep (carpets, food processing)',
      'Kayseri (furniture, appliances)',
      'Izmir (automotive parts, ceramics)',
    ],
    laborCostTrend: '+30% YoY in TRY terms (2024-2025), but only +5% in USD terms due to Lira depreciation; minimum wage at ~$4.50/hr; real purchasing power declining for workers',
    tradeAgreements: [
      'EU Customs Union (industrial goods)',
      'Turkey-UK FTA (2021)',
      'Turkey-South Korea FTA',
      'EFTA-Turkey FTA',
      'Turkey-Malaysia FTA',
    ],
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
    redFlags: [
      'EU tariff rates apply to US exports — no US-EU FTA means standard MFN duties of 2-12% depending on product',
      'Skilled labor shortage worsening — some factories have 3-6 month waiting lists for new orders',
      'PLN currency can swing 5-10% against USD — use hedging or EUR-denominated contracts',
    ],
    complianceTimeline: 'Business registration: 3-5 days (EU framework), Import/export permits: 5-10 days, Factory audit: 1-2 weeks, CE marking compliance: varies by directive, REACH registration (chemicals): 8-12 weeks',
    factoryClusters: [
      'Wroclaw (electronics, LG appliances, automotive)',
      'Poznan (VW commercial vehicles, food processing)',
      'Katowice / Upper Silesia (automotive, steel, mining)',
      'Lodz (textiles, cosmetics, logistics hub)',
      'Gdansk/Gdynia (shipbuilding, electronics, port logistics)',
    ],
    laborCostTrend: '+8% YoY (2024-2025), minimum wage at ~$12/hr; EU accession continues to drive wage convergence with Western Europe; automation investment increasing',
    tradeAgreements: [
      'EU Single Market (full access to 27 member states)',
      'EU-Canada CETA',
      'EU-Japan EPA',
      'EU-South Korea FTA',
      'EU-Vietnam FTA (as EU member)',
    ],
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
    redFlags: [
      'Average 20 typhoons/year — factories in Visayas and Luzon at highest risk; require supplier disaster recovery plans',
      'Manila port congestion ranks among worst in SE Asia — average dwell time 6-8 days',
      'Limited electronics supply chain depth — most components must be imported, adding lead time and cost',
    ],
    complianceTimeline: 'Business registration (SEC/DTI): 10-20 days, Import license (BOI/PEZA): 20-45 days, Factory audit: 2-3 weeks, PS/ICC mark (product standards): 6-10 weeks, FDA registration (food/cosmetics): 8-12 weeks',
    factoryClusters: [
      'Cavite/Laguna CALABARZON (electronics, semiconductors, auto parts)',
      'Metro Manila / Pasig (garments, food processing)',
      'Cebu (furniture, handicrafts, electronics)',
      'Subic Bay Freeport (shipbuilding, logistics, light manufacturing)',
      'Clark Freeport (electronics, aerospace maintenance)',
    ],
    laborCostTrend: '+6% YoY (2024-2025), minimum wage at ~$2.30/hr in Metro Manila; provinces at $1.50-1.80/hr; BPO sector competition drives wages up for English-speaking skilled labor',
    tradeAgreements: [
      'RCEP (Regional Comprehensive Economic Partnership)',
      'ASEAN Trade in Goods Agreement (ATIGA)',
      'Philippines-Japan EPA (PJEPA)',
      'ASEAN-Australia-NZ FTA (AANZFTA)',
      'US GSP (Generalized System of Preferences) — select products eligible',
    ],
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
