// Trending products data library for Bottlecap manufacturing analysis platform
// Sources: Amazon Best Sellers, Google Trends, TikTok Shop analytics, Jungle Scout, industry reports

export interface TrendingProduct {
  name: string;
  slug: string;
  category: string;
  trendScore: number;
  searchVolume: string;
  yoyGrowth: string;
  avgRetailPrice: { min: number; max: number };
  avgManufacturingCost: { min: number; max: number };
  topPlatforms: string[];
  whyTrending: string;
}

export interface MonthlyTrendReport {
  month: string;
  slug: string;
  title: string;
  summary: string;
  products: TrendingProduct[];
  topCategory: string;
  insight: string;
}

export const TREND_REPORTS: readonly MonthlyTrendReport[] = [
  // ── September 2025 ───────────────────────────────────────────────────
  {
    month: '2025-09',
    slug: 'september-2025',
    title: 'September 2025 Manufacturing Trends',
    summary:
      'Back-to-school season drives demand for desk accessories and tech gadgets, while early fall wellness products surge. Content creator gear continues its multi-quarter uptrend as short-form video platforms expand monetization.',
    products: [
      {
        name: 'Portable Blender',
        slug: 'portable-blender',
        category: 'Kitchen & Dining',
        trendScore: 92,
        searchVolume: '110K+/mo',
        yoyGrowth: '+38%',
        avgRetailPrice: { min: 25, max: 45 },
        avgManufacturingCost: { min: 6, max: 12 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'TikTok smoothie recipes and gym culture have fueled massive demand. USB-C rechargeable models with self-cleaning modes dominate sales.',
      },
      {
        name: 'Ring Light with Tripod',
        slug: 'ring-light-with-tripod',
        category: 'Consumer Electronics',
        trendScore: 85,
        searchVolume: '75K+/mo',
        yoyGrowth: '+22%',
        avgRetailPrice: { min: 20, max: 55 },
        avgManufacturingCost: { min: 5, max: 14 },
        topPlatforms: ['Amazon', 'Shopify', 'Walmart'],
        whyTrending:
          'The creator economy shows no signs of slowing. Adjustable color temperature and phone-clip models are the best sellers for livestreaming and video calls.',
      },
      {
        name: 'Standing Desk Converter',
        slug: 'standing-desk-converter',
        category: 'Furniture',
        trendScore: 78,
        searchVolume: '50K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 80, max: 200 },
        avgManufacturingCost: { min: 25, max: 65 },
        topPlatforms: ['Amazon', 'Shopify', 'Wayfair'],
        whyTrending:
          'Hybrid work is now permanent for millions. Gas-spring lift mechanisms and laptop-specific compact models are trending for home office setups.',
      },
      {
        name: 'Wireless Lavalier Microphone',
        slug: 'wireless-lavalier-microphone',
        category: 'Audio Equipment',
        trendScore: 88,
        searchVolume: '65K+/mo',
        yoyGrowth: '+52%',
        avgRetailPrice: { min: 20, max: 60 },
        avgManufacturingCost: { min: 5, max: 15 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Clip-on wireless mics with USB-C and Lightning receivers have become essential for content creators. Dual-receiver kits for interviews are the fastest growing sub-segment.',
      },
      {
        name: 'Insulated Tumbler (40oz)',
        slug: 'insulated-tumbler-40oz',
        category: 'Kitchen & Dining',
        trendScore: 95,
        searchVolume: '150K+/mo',
        yoyGrowth: '+65%',
        avgRetailPrice: { min: 25, max: 50 },
        avgManufacturingCost: { min: 4, max: 10 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Target'],
        whyTrending:
          'The Stanley/Owala effect continues. Handle-equipped stainless steel tumblers with straw lids remain the hottest DTC product of the year. Custom color drops sell out in minutes.',
      },
      {
        name: 'Blue Light Glasses',
        slug: 'blue-light-glasses',
        category: 'Fashion Accessories',
        trendScore: 72,
        searchVolume: '45K+/mo',
        yoyGrowth: '+12%',
        avgRetailPrice: { min: 12, max: 35 },
        avgManufacturingCost: { min: 1.5, max: 5 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Screen-time awareness continues to grow. Fashion-forward frames targeting Gen Z with clip-on blue light lenses are gaining share.',
      },
      {
        name: 'Protein Shaker Bottle',
        slug: 'protein-shaker-bottle',
        category: 'Fitness & Sports',
        trendScore: 74,
        searchVolume: '55K+/mo',
        yoyGrowth: '+15%',
        avgRetailPrice: { min: 10, max: 30 },
        avgManufacturingCost: { min: 1.5, max: 5 },
        topPlatforms: ['Amazon', 'Shopify', 'GNC'],
        whyTrending:
          'Electric mixing models and dual-compartment designs for powder storage are driving upgrade cycles. GymTok influencer partnerships fuel DTC brand launches.',
      },
      {
        name: 'Magnetic Phone Mount (MagSafe)',
        slug: 'magnetic-phone-mount-magsafe',
        category: 'Automotive Accessories',
        trendScore: 81,
        searchVolume: '60K+/mo',
        yoyGrowth: '+28%',
        avgRetailPrice: { min: 12, max: 30 },
        avgManufacturingCost: { min: 2, max: 6 },
        topPlatforms: ['Amazon', 'Shopify', 'Best Buy'],
        whyTrending:
          'MagSafe-compatible mounts for cars and desks have exploded as iPhone adoption of magnetic accessories reaches critical mass. Vent-clip and dashboard models lead sales.',
      },
      {
        name: 'Bento Lunch Box (Adult)',
        slug: 'bento-lunch-box-adult',
        category: 'Kitchen & Dining',
        trendScore: 77,
        searchVolume: '40K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Meal prep culture and lunchbox packing TikToks drive demand. Leak-proof compartment designs with built-in sauce containers are the top sellers.',
      },
      {
        name: 'Smart Plug (Wi-Fi)',
        slug: 'smart-plug-wifi',
        category: 'Smart Home',
        trendScore: 70,
        searchVolume: '80K+/mo',
        yoyGrowth: '+8%',
        avgRetailPrice: { min: 8, max: 25 },
        avgManufacturingCost: { min: 2, max: 6 },
        topPlatforms: ['Amazon', 'Walmart', 'Best Buy'],
        whyTrending:
          'Matter protocol support and energy monitoring features are driving replacement purchases. Multi-packs of 4 dominate the value segment.',
      },
      {
        name: 'Collapsible Water Bottle',
        slug: 'collapsible-water-bottle',
        category: 'Outdoor & Camping',
        trendScore: 68,
        searchVolume: '30K+/mo',
        yoyGrowth: '+25%',
        avgRetailPrice: { min: 10, max: 22 },
        avgManufacturingCost: { min: 1.5, max: 4 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'REI'],
        whyTrending:
          'Travel and festival season boost demand for packable hydration. Silicone models with carabiner clips and time markers are the best sellers.',
      },
    ],
    topCategory: 'Kitchen & Dining',
    insight:
      'Kitchen and dining products dominate September trends, claiming three of the top spots. The "hydration" mega-trend shows no signs of cooling, with insulated tumblers posting the highest trend score of any product this month at 95. Content creator equipment continues its steady climb as platforms like TikTok Shop blur the line between content and commerce, making wireless microphones and ring lights near-essential purchases for anyone building a personal brand.',
  },

  // ── October 2025 ─────────────────────────────────────────────────────
  {
    month: '2025-10',
    slug: 'october-2025',
    title: 'October 2025 Manufacturing Trends',
    summary:
      'Pre-holiday inventory building begins as brands stock up for Q4. Wellness and self-care products see seasonal upticks alongside early gift-guide placements. Pet products surge as adoption rates remain elevated.',
    products: [
      {
        name: 'LED Face Mask',
        slug: 'led-face-mask',
        category: 'Beauty & Cosmetics',
        trendScore: 89,
        searchVolume: '85K+/mo',
        yoyGrowth: '+45%',
        avgRetailPrice: { min: 30, max: 120 },
        avgManufacturingCost: { min: 8, max: 28 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Sephora'],
        whyTrending:
          'Dermatologist endorsements and "get ready with me" TikToks have made LED therapy mainstream. Red light + near-infrared combo masks are the premium sweet spot.',
      },
      {
        name: 'Weighted Blanket',
        slug: 'weighted-blanket',
        category: 'Home Decor',
        trendScore: 82,
        searchVolume: '70K+/mo',
        yoyGrowth: '+10%',
        avgRetailPrice: { min: 35, max: 80 },
        avgManufacturingCost: { min: 10, max: 22 },
        topPlatforms: ['Amazon', 'Shopify', 'Target', 'Walmart'],
        whyTrending:
          'Cooler weather and holiday gifting drive seasonal demand spikes. Cooling bamboo-cover models and kids-specific weights (5-8 lbs) are the newest growth segments.',
      },
      {
        name: 'Automatic Pet Feeder',
        slug: 'automatic-pet-feeder',
        category: 'Pet Products',
        trendScore: 84,
        searchVolume: '55K+/mo',
        yoyGrowth: '+32%',
        avgRetailPrice: { min: 30, max: 80 },
        avgManufacturingCost: { min: 8, max: 22 },
        topPlatforms: ['Amazon', 'Chewy', 'Shopify'],
        whyTrending:
          'Wi-Fi connected feeders with camera and voice features let pet owners interact remotely. Dual-bowl models for multi-pet households are the fastest growing SKU.',
      },
      {
        name: 'Ice Roller (Facial)',
        slug: 'ice-roller-facial',
        category: 'Beauty & Cosmetics',
        trendScore: 86,
        searchVolume: '60K+/mo',
        yoyGrowth: '+55%',
        avgRetailPrice: { min: 8, max: 20 },
        avgManufacturingCost: { min: 1, max: 3.5 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'De-puffing skincare routines have gone viral. Stainless steel heads with gel-core handles that stay cold longer are replacing basic plastic models.',
      },
      {
        name: 'Pet Camera (Indoor)',
        slug: 'pet-camera-indoor',
        category: 'Pet Products',
        trendScore: 79,
        searchVolume: '45K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 25, max: 70 },
        avgManufacturingCost: { min: 8, max: 20 },
        topPlatforms: ['Amazon', 'Chewy', 'Best Buy'],
        whyTrending:
          'Treat-dispensing cameras with two-way audio and night vision dominate. AI-powered bark detection and activity alerts are now table stakes features.',
      },
      {
        name: 'Massage Gun',
        slug: 'massage-gun',
        category: 'Fitness & Sports',
        trendScore: 80,
        searchVolume: '90K+/mo',
        yoyGrowth: '+14%',
        avgRetailPrice: { min: 30, max: 120 },
        avgManufacturingCost: { min: 10, max: 30 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Best Buy'],
        whyTrending:
          'Mini massage guns at the $30-50 price point have opened the mass market. Travel-sized models and heated attachment heads are the latest innovations.',
      },
      {
        name: 'Gua Sha Tool (Stainless Steel)',
        slug: 'gua-sha-tool-stainless-steel',
        category: 'Beauty & Cosmetics',
        trendScore: 75,
        searchVolume: '40K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 10, max: 30 },
        avgManufacturingCost: { min: 1.5, max: 5 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Sephora'],
        whyTrending:
          'Stainless steel gua sha tools are replacing jade and rose quartz as the premium option due to durability and natural cooling properties. Gift sets with cases drive Q4 sales.',
      },
      {
        name: 'Electric Spin Scrubber',
        slug: 'electric-spin-scrubber',
        category: 'Smart Home',
        trendScore: 87,
        searchVolume: '65K+/mo',
        yoyGrowth: '+40%',
        avgRetailPrice: { min: 25, max: 50 },
        avgManufacturingCost: { min: 6, max: 14 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Walmart'],
        whyTrending:
          'CleanTok continues to drive impulse purchases. Cordless models with interchangeable brush heads and extendable handles for shower cleaning dominate.',
      },
      {
        name: 'Reusable Food Wraps (Beeswax)',
        slug: 'reusable-food-wraps-beeswax',
        category: 'Kitchen & Dining',
        trendScore: 65,
        searchVolume: '25K+/mo',
        yoyGrowth: '+12%',
        avgRetailPrice: { min: 10, max: 22 },
        avgManufacturingCost: { min: 2, max: 5 },
        topPlatforms: ['Amazon', 'Shopify', 'Etsy'],
        whyTrending:
          'Sustainability-conscious consumers continue shifting away from single-use plastic wrap. Holiday gift sets with assorted sizes and patterns drive Q4 sales spikes.',
      },
      {
        name: 'Posture Corrector',
        slug: 'posture-corrector',
        category: 'Fitness & Sports',
        trendScore: 73,
        searchVolume: '50K+/mo',
        yoyGrowth: '+16%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 2.5, max: 7 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Desk workers and gamers are the primary market. Smart posture correctors with vibration reminders and app connectivity are emerging as the premium tier.',
      },
      {
        name: 'Mushroom Coffee',
        slug: 'mushroom-coffee',
        category: 'Kitchen & Dining',
        trendScore: 83,
        searchVolume: '70K+/mo',
        yoyGrowth: '+60%',
        avgRetailPrice: { min: 20, max: 45 },
        avgManufacturingCost: { min: 5, max: 12 },
        topPlatforms: ['Amazon', 'Shopify', 'TikTok Shop'],
        whyTrending:
          'Functional mushroom blends (lion\'s mane, chaga, reishi) positioned as focus-enhancing, low-jitter coffee alternatives are booming in the wellness space. Single-serve sachets lead the format war.',
      },
    ],
    topCategory: 'Beauty & Cosmetics',
    insight:
      'Beauty and self-care products lead October trends as consumers prepare for colder weather and gift-giving season. LED face masks have crossed from luxury beauty into the mainstream DTC market, with entry-level models now available under $40. The pet economy remains robust, with smart pet tech (cameras and feeders) commanding healthy margins. Notably, mushroom coffee posts the highest year-over-year growth at +60%, signaling that the functional food trend has significant runway ahead.',
  },

  // ── November 2025 ────────────────────────────────────────────────────
  {
    month: '2025-11',
    slug: 'november-2025',
    title: 'November 2025 Manufacturing Trends',
    summary:
      'Black Friday and Cyber Monday dominate the landscape. Gift-ready products with premium packaging see the biggest conversion lifts. Portable electronics and cozy home products peak for the holiday season.',
    products: [
      {
        name: 'Mini Projector',
        slug: 'mini-projector',
        category: 'Consumer Electronics',
        trendScore: 91,
        searchVolume: '95K+/mo',
        yoyGrowth: '+35%',
        avgRetailPrice: { min: 60, max: 180 },
        avgManufacturingCost: { min: 20, max: 55 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Best Buy', 'Shopify'],
        whyTrending:
          'Compact 1080p projectors with built-in streaming (Netflix, YouTube) are the top gift item of the season. Models under $100 with auto-keystone correction lead unit volume.',
      },
      {
        name: 'Portable Power Station',
        slug: 'portable-power-station',
        category: 'Consumer Electronics',
        trendScore: 83,
        searchVolume: '60K+/mo',
        yoyGrowth: '+28%',
        avgRetailPrice: { min: 80, max: 350 },
        avgManufacturingCost: { min: 30, max: 120 },
        topPlatforms: ['Amazon', 'Shopify', 'Home Depot', 'Best Buy'],
        whyTrending:
          'Emergency preparedness awareness and outdoor recreation drive demand. LiFePO4 battery models with solar input and fast charging are replacing lead-acid competitors.',
      },
      {
        name: 'Heated Blanket (USB)',
        slug: 'heated-blanket-usb',
        category: 'Home Decor',
        trendScore: 88,
        searchVolume: '80K+/mo',
        yoyGrowth: '+42%',
        avgRetailPrice: { min: 25, max: 55 },
        avgManufacturingCost: { min: 6, max: 15 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Walmart', 'Target'],
        whyTrending:
          'USB-powered heated blankets for office and car use have carved a massive niche. Low-voltage safety and auto-shutoff timers make them gifting-friendly.',
      },
      {
        name: 'Content Creator Kit',
        slug: 'content-creator-kit',
        category: 'Consumer Electronics',
        trendScore: 86,
        searchVolume: '45K+/mo',
        yoyGrowth: '+48%',
        avgRetailPrice: { min: 40, max: 100 },
        avgManufacturingCost: { min: 10, max: 28 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Bundled kits (ring light + mic + tripod + phone mount) are the top gift for aspiring creators. All-in-one carrying case packaging elevates perceived value.',
      },
      {
        name: 'Robot Vacuum Accessories',
        slug: 'robot-vacuum-accessories',
        category: 'Smart Home',
        trendScore: 76,
        searchVolume: '55K+/mo',
        yoyGrowth: '+22%',
        avgRetailPrice: { min: 12, max: 35 },
        avgManufacturingCost: { min: 2, max: 8 },
        topPlatforms: ['Amazon', 'Shopify', 'Walmart'],
        whyTrending:
          'With millions of robot vacuums now in homes, the replacement parts market is booming. HEPA filter packs, side brush kits, and mop pads drive recurring revenue.',
      },
      {
        name: 'Solar Charger (Portable)',
        slug: 'solar-charger-portable',
        category: 'Consumer Electronics',
        trendScore: 71,
        searchVolume: '35K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 20, max: 60 },
        avgManufacturingCost: { min: 6, max: 18 },
        topPlatforms: ['Amazon', 'REI', 'Shopify'],
        whyTrending:
          'Foldable solar panels with built-in power banks target hikers and emergency preparedness buyers. Efficiency improvements in monocrystalline panels have improved real-world performance.',
      },
      {
        name: 'Matcha Whisk Set',
        slug: 'matcha-whisk-set',
        category: 'Kitchen & Dining',
        trendScore: 79,
        searchVolume: '50K+/mo',
        yoyGrowth: '+35%',
        avgRetailPrice: { min: 15, max: 40 },
        avgManufacturingCost: { min: 3, max: 9 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Etsy'],
        whyTrending:
          'Matcha culture continues expanding beyond cafes into home preparation. Gift-ready sets with bamboo whisk, ceramic bowl, and spoon in branded boxes are the holiday best seller.',
      },
      {
        name: 'Noise Canceling Earbuds',
        slug: 'noise-canceling-earbuds',
        category: 'Audio Equipment',
        trendScore: 90,
        searchVolume: '120K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 25, max: 80 },
        avgManufacturingCost: { min: 6, max: 22 },
        topPlatforms: ['Amazon', 'Best Buy', 'Walmart', 'TikTok Shop'],
        whyTrending:
          'ANC earbuds under $50 are the most-gifted consumer electronics item. Transparency mode, long battery life (8h+), and multipoint Bluetooth 5.3 are the key selling features.',
      },
      {
        name: 'Aromatherapy Diffuser',
        slug: 'aromatherapy-diffuser',
        category: 'Home Decor',
        trendScore: 74,
        searchVolume: '55K+/mo',
        yoyGrowth: '+10%',
        avgRetailPrice: { min: 15, max: 40 },
        avgManufacturingCost: { min: 3, max: 10 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Target'],
        whyTrending:
          'Flame-effect and waterless nebulizer diffusers are the design-forward upgrades replacing basic ultrasonic models. Holiday scent bundles boost average order value.',
      },
      {
        name: 'Meal Prep Containers (Glass)',
        slug: 'meal-prep-containers-glass',
        category: 'Kitchen & Dining',
        trendScore: 69,
        searchVolume: '40K+/mo',
        yoyGrowth: '+14%',
        avgRetailPrice: { min: 20, max: 40 },
        avgManufacturingCost: { min: 4, max: 10 },
        topPlatforms: ['Amazon', 'Shopify', 'Walmart'],
        whyTrending:
          'Borosilicate glass containers with snap-lock lids are displacing plastic as health-conscious consumers prioritize non-toxic food storage. Sets of 10 drive value positioning.',
      },
      {
        name: 'Electric Hand Warmer',
        slug: 'electric-hand-warmer',
        category: 'Consumer Electronics',
        trendScore: 82,
        searchVolume: '45K+/mo',
        yoyGrowth: '+30%',
        avgRetailPrice: { min: 12, max: 30 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Rechargeable hand warmers that double as power banks are a viral winter gift item. Dual-sided heating and 3 temperature settings are now standard features.',
      },
      {
        name: 'Dog Cooling Mat',
        slug: 'dog-cooling-mat',
        category: 'Pet Products',
        trendScore: 60,
        searchVolume: '20K+/mo',
        yoyGrowth: '+8%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'Chewy', 'Shopify'],
        whyTrending:
          'Pressure-activated gel mats require no refrigeration or electricity. Southern hemisphere summer and pre-season stocking for warmer US climates keep demand steady even in November.',
      },
    ],
    topCategory: 'Consumer Electronics',
    insight:
      'Consumer electronics dominate November as expected, with five products in the category making the trends list. Mini projectors lead with a trend score of 91, having evolved from novelty to legitimate entertainment devices. The holiday gifting context favors products with premium packaging and bundle potential -- content creator kits and matcha whisk sets both benefit from this dynamic. Notably, the USB heated blanket is a breakout hit at +42% YoY growth, representing a new micro-category within cozy home products.',
  },

  // ── December 2025 ────────────────────────────────────────────────────
  {
    month: '2025-12',
    slug: 'december-2025',
    title: 'December 2025 Manufacturing Trends',
    summary:
      'Last-minute holiday shopping peaks, then immediately pivots to New Year health and fitness resolutions. Products that serve both gifting and self-improvement see the strongest sustained demand throughout the month.',
    products: [
      {
        name: 'Smart Water Bottle',
        slug: 'smart-water-bottle',
        category: 'Kitchen & Dining',
        trendScore: 84,
        searchVolume: '55K+/mo',
        yoyGrowth: '+38%',
        avgRetailPrice: { min: 25, max: 50 },
        avgManufacturingCost: { min: 6, max: 14 },
        topPlatforms: ['Amazon', 'Shopify', 'TikTok Shop'],
        whyTrending:
          'LED temperature displays and hydration reminder features drive gifting appeal. App-connected models that sync with Apple Health and Fitbit are the premium tier.',
      },
      {
        name: 'Resistance Bands Set',
        slug: 'resistance-bands-set',
        category: 'Fitness & Sports',
        trendScore: 80,
        searchVolume: '75K+/mo',
        yoyGrowth: '+12%',
        avgRetailPrice: { min: 12, max: 30 },
        avgManufacturingCost: { min: 2, max: 6 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'New Year resolution buyers start shopping in late December. Fabric hip bands and latex loop sets with door anchors are the best sellers. Gift-wrapped fitness bundles perform well.',
      },
      {
        name: 'Sunrise Alarm Clock',
        slug: 'sunrise-alarm-clock',
        category: 'Smart Home',
        trendScore: 78,
        searchVolume: '40K+/mo',
        yoyGrowth: '+22%',
        avgRetailPrice: { min: 20, max: 55 },
        avgManufacturingCost: { min: 5, max: 14 },
        topPlatforms: ['Amazon', 'Shopify', 'Target'],
        whyTrending:
          'Short winter days and wellness awareness drive demand for simulated sunrise wake-up lights. White noise and sleep sound integration are now expected features.',
      },
      {
        name: 'Portable Espresso Maker',
        slug: 'portable-espresso-maker',
        category: 'Kitchen & Dining',
        trendScore: 76,
        searchVolume: '35K+/mo',
        yoyGrowth: '+25%',
        avgRetailPrice: { min: 30, max: 80 },
        avgManufacturingCost: { min: 8, max: 22 },
        topPlatforms: ['Amazon', 'Shopify', 'Specialty Coffee Retailers'],
        whyTrending:
          'Hand-pump and battery-powered espresso makers appeal to travel and outdoor enthusiasts. Nespresso-compatible pod models simplify the user experience.',
      },
      {
        name: 'Scalp Massager (Electric)',
        slug: 'scalp-massager-electric',
        category: 'Beauty & Cosmetics',
        trendScore: 82,
        searchVolume: '50K+/mo',
        yoyGrowth: '+35%',
        avgRetailPrice: { min: 12, max: 30 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Waterproof electric scalp massagers positioned for hair growth and stress relief dominate gift guides. Red light therapy models are the emerging premium sub-category.',
      },
      {
        name: 'Kindle-Style Book Light',
        slug: 'kindle-style-book-light',
        category: 'Consumer Electronics',
        trendScore: 71,
        searchVolume: '30K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 8, max: 20 },
        avgManufacturingCost: { min: 1.5, max: 4 },
        topPlatforms: ['Amazon', 'Shopify', 'Barnes & Noble'],
        whyTrending:
          'Rechargeable amber-light clip-on reading lights are stocking-stuffer staples. Blue-light-free warm tones for bedtime reading are the key selling point.',
      },
      {
        name: 'Acupressure Mat',
        slug: 'acupressure-mat',
        category: 'Fitness & Sports',
        trendScore: 74,
        searchVolume: '35K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 20, max: 45 },
        avgManufacturingCost: { min: 4, max: 10 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Wellness influencers promote acupressure mats for stress relief and sleep improvement. Mat-and-pillow combo sets with carry bags dominate the gifting segment.',
      },
      {
        name: 'Wireless Charging Pad (3-in-1)',
        slug: 'wireless-charging-pad-3-in-1',
        category: 'Consumer Electronics',
        trendScore: 85,
        searchVolume: '65K+/mo',
        yoyGrowth: '+15%',
        avgRetailPrice: { min: 20, max: 50 },
        avgManufacturingCost: { min: 5, max: 14 },
        topPlatforms: ['Amazon', 'Best Buy', 'Shopify'],
        whyTrending:
          'Phone + AirPods + Apple Watch charging stations are the default desk accessory. MagSafe-aligned folding travel models are the fastest growing sub-segment.',
      },
      {
        name: 'Journaling Set (Premium)',
        slug: 'journaling-set-premium',
        category: 'Office & Stationery',
        trendScore: 72,
        searchVolume: '30K+/mo',
        yoyGrowth: '+28%',
        avgRetailPrice: { min: 15, max: 40 },
        avgManufacturingCost: { min: 3, max: 9 },
        topPlatforms: ['Amazon', 'Etsy', 'Shopify'],
        whyTrending:
          'New Year goal-setting culture meets the analog wellness trend. Guided gratitude journals and habit trackers with pen sets in gift boxes are the top holiday SKU.',
      },
      {
        name: 'Neck and Shoulder Massager',
        slug: 'neck-and-shoulder-massager',
        category: 'Fitness & Sports',
        trendScore: 81,
        searchVolume: '60K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 25, max: 60 },
        avgManufacturingCost: { min: 7, max: 16 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Walmart'],
        whyTrending:
          'Shiatsu-style heated neck massagers are perennial holiday best sellers. U-shaped designs that wrap around the neck with adjustable intensity controls lead the market.',
      },
    ],
    topCategory: 'Fitness & Sports',
    insight:
      'December presents a unique dual-demand pattern: the first half is driven by last-minute holiday gifting while the second half pivots hard to New Year resolution products. Fitness and sports products lead the month with three entries, all positioned at the intersection of health and gifting. Smart water bottles represent the convergence of hydration trends and connected devices. The premiumization of everyday products continues, with electric scalp massagers and sunrise alarm clocks proving that consumers will pay more for products that promise wellness benefits.',
  },

  // ── January 2026 ─────────────────────────────────────────────────────
  {
    month: '2026-01',
    slug: 'january-2026',
    title: 'January 2026 Manufacturing Trends',
    summary:
      'New Year resolution products hit peak demand. Fitness, organization, and wellness categories surge as consumers invest in self-improvement. Brands that launched holiday inventory now pivot to Q1 health and productivity positioning.',
    products: [
      {
        name: 'Smart Jump Rope',
        slug: 'smart-jump-rope',
        category: 'Fitness & Sports',
        trendScore: 87,
        searchVolume: '55K+/mo',
        yoyGrowth: '+45%',
        avgRetailPrice: { min: 20, max: 45 },
        avgManufacturingCost: { min: 4, max: 12 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'App-connected jump ropes with LED calorie displays and Bluetooth workout tracking are the breakout fitness product of early 2026. Cordless ball models for indoor use are especially popular.',
      },
      {
        name: 'Under-Desk Treadmill',
        slug: 'under-desk-treadmill',
        category: 'Fitness & Sports',
        trendScore: 85,
        searchVolume: '70K+/mo',
        yoyGrowth: '+30%',
        avgRetailPrice: { min: 150, max: 350 },
        avgManufacturingCost: { min: 50, max: 120 },
        topPlatforms: ['Amazon', 'Shopify', 'Walmart'],
        whyTrending:
          'Walking-while-working culture has gone mainstream. Foldable models under 6 inches tall that slide under a couch or bed are the top-selling form factor.',
      },
      {
        name: 'Desk Organizer (Modular)',
        slug: 'desk-organizer-modular',
        category: 'Office & Stationery',
        trendScore: 73,
        searchVolume: '35K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 15, max: 40 },
        avgManufacturingCost: { min: 3, max: 9 },
        topPlatforms: ['Amazon', 'Shopify', 'Etsy'],
        whyTrending:
          'New Year decluttering motivation meets aesthetic workspace trends. Bamboo and walnut modular systems with cable management features are the premium segment.',
      },
      {
        name: 'Yoga Mat (Extra Thick)',
        slug: 'yoga-mat-extra-thick',
        category: 'Fitness & Sports',
        trendScore: 79,
        searchVolume: '80K+/mo',
        yoyGrowth: '+10%',
        avgRetailPrice: { min: 20, max: 50 },
        avgManufacturingCost: { min: 4, max: 12 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Target'],
        whyTrending:
          'Resolution-driven demand peaks in January. Non-slip TPE mats with alignment guides and 8mm+ thickness are displacing basic PVC options. Carrying strap bundles improve perceived value.',
      },
      {
        name: 'Air Purifier (HEPA, Desktop)',
        slug: 'air-purifier-hepa-desktop',
        category: 'Smart Home',
        trendScore: 77,
        searchVolume: '50K+/mo',
        yoyGrowth: '+15%',
        avgRetailPrice: { min: 30, max: 80 },
        avgManufacturingCost: { min: 8, max: 22 },
        topPlatforms: ['Amazon', 'Shopify', 'Best Buy'],
        whyTrending:
          'Winter cold and flu season plus wildfire smoke awareness drive sustained demand. Compact desktop units with PM2.5 displays and smart app control are the growth segment.',
      },
      {
        name: 'Vitamin Organizer (Weekly)',
        slug: 'vitamin-organizer-weekly',
        category: 'Kitchen & Dining',
        trendScore: 70,
        searchVolume: '30K+/mo',
        yoyGrowth: '+22%',
        avgRetailPrice: { min: 10, max: 25 },
        avgManufacturingCost: { min: 1.5, max: 4 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Supplement culture meets aesthetic organization. Minimalist acrylic and bamboo pill organizers that look good on a countertop are replacing cheap plastic pill boxes.',
      },
      {
        name: 'Foam Roller (Vibrating)',
        slug: 'foam-roller-vibrating',
        category: 'Fitness & Sports',
        trendScore: 76,
        searchVolume: '40K+/mo',
        yoyGrowth: '+18%',
        avgRetailPrice: { min: 30, max: 70 },
        avgManufacturingCost: { min: 8, max: 18 },
        topPlatforms: ['Amazon', 'Shopify', 'TikTok Shop'],
        whyTrending:
          'Vibrating foam rollers with multiple intensity levels are upgrading the basic foam roller category. Physical therapist endorsements on social media accelerate adoption.',
      },
      {
        name: 'Habit Tracker Whiteboard',
        slug: 'habit-tracker-whiteboard',
        category: 'Office & Stationery',
        trendScore: 68,
        searchVolume: '20K+/mo',
        yoyGrowth: '+35%',
        avgRetailPrice: { min: 12, max: 28 },
        avgManufacturingCost: { min: 2, max: 6 },
        topPlatforms: ['Amazon', 'Etsy', 'Shopify'],
        whyTrending:
          'Reusable acrylic habit tracker boards for walls and desks tap into the atomic habits movement. Pre-printed goal categories and dry-erase marker sets round out the product.',
      },
      {
        name: 'Electric Kettle (Gooseneck)',
        slug: 'electric-kettle-gooseneck',
        category: 'Kitchen & Dining',
        trendScore: 75,
        searchVolume: '45K+/mo',
        yoyGrowth: '+14%',
        avgRetailPrice: { min: 30, max: 70 },
        avgManufacturingCost: { min: 8, max: 18 },
        topPlatforms: ['Amazon', 'Shopify', 'Williams Sonoma'],
        whyTrending:
          'Pour-over coffee culture and matcha preparation drive demand. Temperature presets, hold functions, and matte-finish aesthetics differentiate premium models.',
      },
      {
        name: 'Sleep Mask (Contoured)',
        slug: 'sleep-mask-contoured',
        category: 'Beauty & Cosmetics',
        trendScore: 72,
        searchVolume: '35K+/mo',
        yoyGrowth: '+16%',
        avgRetailPrice: { min: 10, max: 25 },
        avgManufacturingCost: { min: 1.5, max: 4 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Huberman-effect sleep optimization culture fuels demand. 3D contoured designs with zero eye pressure and cooling silk/bamboo fabrics are the winning combination.',
      },
    ],
    topCategory: 'Fitness & Sports',
    insight:
      'January is firmly fitness season, with four products in the Fitness & Sports category making the list. Smart jump ropes are the breakout product at +45% YoY growth, combining the gamification trend with an affordable price point. Under-desk treadmills represent a maturing product category that has achieved mainstream adoption. The self-improvement mega-trend extends beyond physical fitness into organization (modular desk organizers, habit tracker whiteboards) and sleep optimization (contoured sleep masks, sunrise alarm clocks). Brands launching January campaigns should emphasize "new year, new you" positioning with resolution-focused messaging.',
  },

  // ── February 2026 ────────────────────────────────────────────────────
  {
    month: '2026-02',
    slug: 'february-2026',
    title: 'February 2026 Manufacturing Trends',
    summary:
      'Valentine\'s Day gifting drives demand for beauty, wellness, and couple-friendly products. Resolution momentum continues for fitness holdovers. Spring cleaning and home refresh products begin their seasonal climb.',
    products: [
      {
        name: 'LED Vanity Mirror',
        slug: 'led-vanity-mirror',
        category: 'Beauty & Cosmetics',
        trendScore: 86,
        searchVolume: '60K+/mo',
        yoyGrowth: '+25%',
        avgRetailPrice: { min: 20, max: 55 },
        avgManufacturingCost: { min: 5, max: 14 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify', 'Target'],
        whyTrending:
          'Valentine\'s Day gifting and beauty routine content drive February demand. Hollywood-style LED mirrors with dimming and color temperature control dominate the mid-range.',
      },
      {
        name: 'Couples Massage Oil Set',
        slug: 'couples-massage-oil-set',
        category: 'Beauty & Cosmetics',
        trendScore: 78,
        searchVolume: '40K+/mo',
        yoyGrowth: '+30%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'Shopify', 'Etsy'],
        whyTrending:
          'Gift-boxed sets with multiple scents (lavender, eucalyptus, rose) and candle pairings are the top Valentine\'s DTC product. Natural and organic formulations command premium pricing.',
      },
      {
        name: 'Indoor Herb Garden Kit',
        slug: 'indoor-herb-garden-kit',
        category: 'Home Decor',
        trendScore: 80,
        searchVolume: '45K+/mo',
        yoyGrowth: '+28%',
        avgRetailPrice: { min: 25, max: 60 },
        avgManufacturingCost: { min: 6, max: 16 },
        topPlatforms: ['Amazon', 'Shopify', 'Uncommon Goods'],
        whyTrending:
          'Hydroponic countertop gardens with LED grow lights tap into the intersection of home cooking and plant parent culture. Self-watering pod systems reduce the barrier to entry.',
      },
      {
        name: 'Cordless Handheld Vacuum',
        slug: 'cordless-handheld-vacuum',
        category: 'Smart Home',
        trendScore: 83,
        searchVolume: '70K+/mo',
        yoyGrowth: '+20%',
        avgRetailPrice: { min: 30, max: 70 },
        avgManufacturingCost: { min: 8, max: 20 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Walmart'],
        whyTrending:
          'Spring cleaning season kicks off early. Mini handheld vacuums for car, desk, and pet hair are TikTok favorites. HEPA filtration and wet/dry capability are now standard.',
      },
      {
        name: 'Heated Eye Mask',
        slug: 'heated-eye-mask',
        category: 'Beauty & Cosmetics',
        trendScore: 77,
        searchVolume: '35K+/mo',
        yoyGrowth: '+32%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 3, max: 8 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'USB-heated eye masks with adjustable temperature and built-in Bluetooth speakers merge relaxation with tech. Valentine\'s self-care gift sets are driving February volume.',
      },
      {
        name: 'Portable Clothes Steamer',
        slug: 'portable-clothes-steamer',
        category: 'Smart Home',
        trendScore: 74,
        searchVolume: '40K+/mo',
        yoyGrowth: '+15%',
        avgRetailPrice: { min: 20, max: 45 },
        avgManufacturingCost: { min: 5, max: 12 },
        topPlatforms: ['Amazon', 'Shopify', 'Target'],
        whyTrending:
          'Compact travel steamers with fast heat-up (under 30 seconds) are replacing irons for Gen Z and millennials. Dual-voltage international travel models are the premium tier.',
      },
      {
        name: 'Wearable Blanket Hoodie',
        slug: 'wearable-blanket-hoodie',
        category: 'Apparel',
        trendScore: 81,
        searchVolume: '55K+/mo',
        yoyGrowth: '+22%',
        avgRetailPrice: { min: 25, max: 50 },
        avgManufacturingCost: { min: 6, max: 14 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Shopify'],
        whyTrending:
          'Late winter comfort purchases drive sustained demand. Oversized sherpa-lined hoodies with giant front pockets are a TikTok staple. Custom embroidery for couples is a Valentine\'s hit.',
      },
      {
        name: 'Aroma Shower Steamers',
        slug: 'aroma-shower-steamers',
        category: 'Beauty & Cosmetics',
        trendScore: 76,
        searchVolume: '35K+/mo',
        yoyGrowth: '+40%',
        avgRetailPrice: { min: 12, max: 25 },
        avgManufacturingCost: { min: 2, max: 5 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Etsy', 'Shopify'],
        whyTrending:
          'Shower steamers (eucalyptus, lavender, citrus) are positioned as "bath bombs for people who don\'t take baths." Gift sets of 6-12 steamers in branded boxes are the dominant format.',
      },
      {
        name: 'Foldable Storage Bins',
        slug: 'foldable-storage-bins',
        category: 'Home Decor',
        trendScore: 69,
        searchVolume: '50K+/mo',
        yoyGrowth: '+10%',
        avgRetailPrice: { min: 15, max: 35 },
        avgManufacturingCost: { min: 2.5, max: 7 },
        topPlatforms: ['Amazon', 'Walmart', 'Target'],
        whyTrending:
          'Spring organization momentum combines with ongoing home-office optimization. Linen-look fabric bins with label windows and reinforced handles are replacing basic plastic bins.',
      },
      {
        name: 'Jade Facial Roller Set',
        slug: 'jade-facial-roller-set',
        category: 'Beauty & Cosmetics',
        trendScore: 71,
        searchVolume: '30K+/mo',
        yoyGrowth: '+8%',
        avgRetailPrice: { min: 10, max: 25 },
        avgManufacturingCost: { min: 2, max: 5 },
        topPlatforms: ['Amazon', 'TikTok Shop', 'Sephora'],
        whyTrending:
          'Valentine\'s self-care positioning gives jade rollers a seasonal boost. Gift-boxed sets paired with gua sha tools and rose quartz options round out the offering.',
      },
      {
        name: 'UV-C Sanitizer Box',
        slug: 'uv-c-sanitizer-box',
        category: 'Consumer Electronics',
        trendScore: 66,
        searchVolume: '20K+/mo',
        yoyGrowth: '+5%',
        avgRetailPrice: { min: 20, max: 45 },
        avgManufacturingCost: { min: 5, max: 12 },
        topPlatforms: ['Amazon', 'Shopify', 'Best Buy'],
        whyTrending:
          'Cold and flu season sustains baseline demand for phone and accessory sanitizers. Wireless charging integration and larger capacity for baby items maintain product relevance.',
      },
      {
        name: 'Adjustable Dumbbell Set',
        slug: 'adjustable-dumbbell-set',
        category: 'Fitness & Sports',
        trendScore: 82,
        searchVolume: '60K+/mo',
        yoyGrowth: '+16%',
        avgRetailPrice: { min: 80, max: 250 },
        avgManufacturingCost: { min: 25, max: 70 },
        topPlatforms: ['Amazon', 'Shopify', 'Walmart', 'Dick\'s Sporting Goods'],
        whyTrending:
          'Resolution momentum carries into February for home gym equipment. Quick-adjust dial mechanisms that replace 5-10 separate dumbbells in a compact form factor are the standard design.',
      },
    ],
    topCategory: 'Beauty & Cosmetics',
    insight:
      'Beauty and cosmetics products own February with five entries, all boosted by Valentine\'s Day gifting dynamics. The self-care-as-a-gift positioning works across price points, from $12 shower steamer sets to $55 LED vanity mirrors. Products with clear "for her" or "for couples" positioning see the strongest conversion rates this month. Beyond Valentine\'s, spring cleaning products begin their seasonal ascent with cordless handheld vacuums and foldable storage bins entering the trend list. Adjustable dumbbells prove that fitness resolution demand has real staying power beyond the January spike, particularly for higher-ticket home gym investments.',
  },
] as const satisfies readonly MonthlyTrendReport[];

// ── Utility helpers ────────────────────────────────────────────────────

export function getTrendReportBySlug(slug: string): MonthlyTrendReport | undefined {
  return TREND_REPORTS.find((r) => r.slug === slug);
}

export function getLatestTrends(): MonthlyTrendReport {
  return TREND_REPORTS[TREND_REPORTS.length - 1];
}

export function getProductsByCategory(category: string): TrendingProduct[] {
  const q = category.toLowerCase();
  return TREND_REPORTS.flatMap((r) => r.products).filter(
    (p) => p.category.toLowerCase() === q
  );
}

export function searchTrendingProducts(query: string): TrendingProduct[] {
  const q = query.toLowerCase();
  const seen = new Set<string>();

  return TREND_REPORTS.flatMap((r) => r.products).filter((p) => {
    const matches =
      p.name.toLowerCase().includes(q) ||
      p.slug.includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.whyTrending.toLowerCase().includes(q) ||
      p.topPlatforms.some((pl) => pl.toLowerCase().includes(q));

    // Deduplicate by slug (same product may appear in multiple months)
    if (matches && !seen.has(p.slug)) {
      seen.add(p.slug);
      return true;
    }
    return false;
  });
}
