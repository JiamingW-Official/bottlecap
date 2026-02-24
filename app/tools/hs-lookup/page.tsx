"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowLeft } from "lucide-react"

interface HsCode {
  code: string
  description: string
  category: string
  usRate: number
  chinaAdditional: number
  examples: string[]
}

const HS_DATABASE: HsCode[] = [
  { code: "3923.30", description: "Carboys, bottles, flasks and similar articles of plastics", category: "Plastics", usRate: 3.0, chinaAdditional: 25, examples: ["Water bottles", "Cosmetic containers", "Spray bottles"] },
  { code: "3924.10", description: "Tableware and kitchenware of plastics", category: "Plastics", usRate: 3.4, chinaAdditional: 25, examples: ["Plastic plates", "Food containers", "Measuring cups"] },
  { code: "3926.90", description: "Other articles of plastics", category: "Plastics", usRate: 5.3, chinaAdditional: 25, examples: ["Phone cases", "Cable organizers", "Plastic hooks"] },
  { code: "4202.12", description: "Trunks, suitcases with outer surface of plastics or textile", category: "Bags & Luggage", usRate: 20.0, chinaAdditional: 7.5, examples: ["Hard shell suitcases", "Laptop bags", "Travel cases"] },
  { code: "4202.22", description: "Handbags with outer surface of sheeting of plastics or textile", category: "Bags & Luggage", usRate: 17.6, chinaAdditional: 7.5, examples: ["Tote bags", "Crossbody bags", "Purses"] },
  { code: "4202.32", description: "Articles normally carried in pocket or handbag", category: "Bags & Luggage", usRate: 8.0, chinaAdditional: 15, examples: ["Wallets", "Card holders", "Key cases"] },
  { code: "4202.92", description: "Other containers with outer surface of textile", category: "Bags & Luggage", usRate: 17.6, chinaAdditional: 7.5, examples: ["Cosmetic bags", "Pencil cases", "Tool bags"] },
  { code: "4419.12", description: "Chopsticks of bamboo", category: "Wood Products", usRate: 3.2, chinaAdditional: 25, examples: ["Bamboo chopsticks", "Bamboo utensils", "Bamboo kitchen tools"] },
  { code: "6101.30", description: "Men's overcoats, anoraks of man-made fibers, knitted", category: "Apparel", usRate: 28.2, chinaAdditional: 7.5, examples: ["Windbreakers", "Fleece jackets", "Sport anoraks"] },
  { code: "6104.63", description: "Women's trousers of synthetic fibers, knitted", category: "Apparel", usRate: 28.2, chinaAdditional: 7.5, examples: ["Leggings", "Yoga pants", "Athletic shorts"] },
  { code: "6109.10", description: "T-shirts, singlets of cotton, knitted", category: "Apparel", usRate: 16.5, chinaAdditional: 7.5, examples: ["Cotton t-shirts", "Tank tops", "Undershirts"] },
  { code: "6110.30", description: "Sweaters, pullovers of man-made fibers, knitted", category: "Apparel", usRate: 32.0, chinaAdditional: 7.5, examples: ["Hoodies", "Fleece pullovers", "Sweatshirts"] },
  { code: "6116.93", description: "Gloves of synthetic fibers, knitted", category: "Apparel", usRate: 18.6, chinaAdditional: 7.5, examples: ["Work gloves", "Touchscreen gloves", "Sports gloves"] },
  { code: "6211.43", description: "Women's garments of man-made fibers, not knitted", category: "Apparel", usRate: 16.0, chinaAdditional: 7.5, examples: ["Activewear", "Rain jackets", "Vests"] },
  { code: "6302.60", description: "Toilet linen and kitchen linen of terry toweling", category: "Household Textiles", usRate: 9.1, chinaAdditional: 7.5, examples: ["Bath towels", "Kitchen towels", "Washcloths"] },
  { code: "6401.10", description: "Waterproof footwear with metal toe-cap", category: "Footwear", usRate: 37.5, chinaAdditional: 15, examples: ["Safety boots", "Work boots", "Rain boots"] },
  { code: "6402.99", description: "Other footwear with rubber or plastics outer soles and uppers", category: "Footwear", usRate: 20.0, chinaAdditional: 15, examples: ["Sneakers", "Sandals", "Flip-flops"] },
  { code: "6404.11", description: "Sports footwear with rubber/plastics soles, textile uppers", category: "Footwear", usRate: 20.0, chinaAdditional: 15, examples: ["Running shoes", "Tennis shoes", "Training shoes"] },
  { code: "6506.10", description: "Safety headgear", category: "Headwear", usRate: 0, chinaAdditional: 25, examples: ["Hard hats", "Bike helmets", "Construction helmets"] },
  { code: "6911.10", description: "Tableware and kitchenware of porcelain or china", category: "Ceramics", usRate: 8.0, chinaAdditional: 25, examples: ["Mugs", "Plates", "Bowls"] },
  { code: "7013.49", description: "Glassware for table, kitchen, office or indoor decoration", category: "Glassware", usRate: 22.5, chinaAdditional: 25, examples: ["Drinking glasses", "Vases", "Glass candle holders"] },
  { code: "7310.29", description: "Tanks, casks and similar containers of iron or steel", category: "Metals", usRate: 0, chinaAdditional: 25, examples: ["Metal canisters", "Tins", "Storage containers"] },
  { code: "7323.93", description: "Table, kitchen articles of stainless steel", category: "Metals", usRate: 2.0, chinaAdditional: 25, examples: ["Stainless steel bottles", "Cookware", "Cutlery"] },
  { code: "7615.10", description: "Table, kitchen articles of aluminum", category: "Metals", usRate: 3.1, chinaAdditional: 25, examples: ["Aluminum bottles", "Baking trays", "Aluminum containers"] },
  { code: "8471.30", description: "Portable automatic data-processing machines (laptops)", category: "Electronics", usRate: 0, chinaAdditional: 25, examples: ["Laptops", "Tablets", "Portable computers"] },
  { code: "8504.40", description: "Static converters (power supplies, chargers)", category: "Electronics", usRate: 1.5, chinaAdditional: 25, examples: ["Phone chargers", "Power adapters", "USB hubs"] },
  { code: "8516.79", description: "Other electrothermic appliances", category: "Electronics", usRate: 3.4, chinaAdditional: 25, examples: ["Electric kettles", "Space heaters", "Hair dryers"] },
  { code: "8517.62", description: "Machines for reception/conversion/transmission of data", category: "Electronics", usRate: 0, chinaAdditional: 25, examples: ["Routers", "Modems", "Network switches"] },
  { code: "8517.70", description: "Parts of telephones and communication apparatus", category: "Electronics", usRate: 0, chinaAdditional: 25, examples: ["Phone cases with circuits", "Antenna modules", "SIM trays"] },
  { code: "8518.10", description: "Microphones and stands therefor", category: "Audio", usRate: 4.9, chinaAdditional: 25, examples: ["USB microphones", "Lavalier mics", "Podcast microphones"] },
  { code: "8518.30", description: "Headphones and earphones", category: "Audio", usRate: 4.9, chinaAdditional: 25, examples: ["Wireless earbuds", "Over-ear headphones", "Gaming headsets"] },
  { code: "8518.40", description: "Audio-frequency electric amplifiers", category: "Audio", usRate: 4.9, chinaAdditional: 25, examples: ["Guitar amps", "Portable speakers", "Bluetooth speakers"] },
  { code: "8519.81", description: "Sound recording or reproducing apparatus using magnetic media", category: "Audio", usRate: 3.9, chinaAdditional: 25, examples: ["Voice recorders", "Audio players", "Cassette players"] },
  { code: "8523.51", description: "Solid-state non-volatile storage devices (flash drives)", category: "Electronics", usRate: 0, chinaAdditional: 25, examples: ["USB drives", "SD cards", "SSDs"] },
  { code: "8525.80", description: "Television cameras, digital cameras and video recorders", category: "Electronics", usRate: 2.1, chinaAdditional: 25, examples: ["Webcams", "Action cameras", "Dashcams"] },
  { code: "8528.72", description: "Reception apparatus for television (monitors)", category: "Electronics", usRate: 3.9, chinaAdditional: 25, examples: ["Computer monitors", "TV screens", "Display panels"] },
  { code: "8536.50", description: "Switches for voltage not exceeding 1,000 V", category: "Electronics", usRate: 2.7, chinaAdditional: 25, examples: ["Light switches", "Toggle switches", "Push buttons"] },
  { code: "8541.40", description: "Photosensitive semiconductor devices (solar cells, LEDs)", category: "Electronics", usRate: 0, chinaAdditional: 25, examples: ["LED strips", "Solar panels", "Photodiodes"] },
  { code: "8543.70", description: "Other electrical machines with individual functions", category: "Electronics", usRate: 2.6, chinaAdditional: 25, examples: ["Fitness trackers", "Smart home sensors", "Signal generators"] },
  { code: "8544.42", description: "Electric conductors fitted with connectors, voltage ≤ 1000V", category: "Electronics", usRate: 3.5, chinaAdditional: 25, examples: ["USB cables", "Charging cables", "Audio cables"] },
  { code: "8708.29", description: "Other parts and accessories of motor vehicle bodies", category: "Automotive", usRate: 2.5, chinaAdditional: 25, examples: ["Phone mounts", "Seat covers", "Floor mats"] },
  { code: "9401.71", description: "Seats with metal frames, upholstered", category: "Furniture", usRate: 0, chinaAdditional: 25, examples: ["Office chairs", "Bar stools", "Gaming chairs"] },
  { code: "9403.20", description: "Other metal furniture", category: "Furniture", usRate: 0, chinaAdditional: 25, examples: ["Metal shelving", "Filing cabinets", "Metal desks"] },
  { code: "9403.60", description: "Other wooden furniture", category: "Furniture", usRate: 0, chinaAdditional: 25, examples: ["Wooden desks", "Bookshelves", "Coffee tables"] },
  { code: "9405.42", description: "Other electric lamps and lighting, LED", category: "Lighting", usRate: 3.9, chinaAdditional: 25, examples: ["LED desk lamps", "LED strips", "Smart bulbs"] },
  { code: "9503.00", description: "Tricycles, scooters, pedal cars and similar wheeled toys", category: "Toys", usRate: 0, chinaAdditional: 25, examples: ["Toy cars", "Building blocks", "Board games"] },
  { code: "9504.50", description: "Video game consoles and machines", category: "Toys", usRate: 0, chinaAdditional: 25, examples: ["Handheld consoles", "Game controllers", "Arcade machines"] },
  { code: "9506.62", description: "Inflatable balls", category: "Sports", usRate: 0, chinaAdditional: 25, examples: ["Soccer balls", "Basketballs", "Volleyballs"] },
  { code: "9506.91", description: "Articles and equipment for physical exercise", category: "Sports", usRate: 4.6, chinaAdditional: 25, examples: ["Dumbbells", "Resistance bands", "Yoga mats"] },
  { code: "9617.00", description: "Vacuum flasks and other vacuum vessels", category: "Household Goods", usRate: 7.2, chinaAdditional: 25, examples: ["Smart thermos", "Insulated bottles", "Travel mugs"] },
  { code: "4016.99", description: "Other articles of vulcanized rubber", category: "Rubber", usRate: 2.5, chinaAdditional: 25, examples: ["Rubber grips", "Gaskets", "Protective covers"] },
  { code: "3926.20", description: "Articles of apparel and clothing accessories of plastics", category: "Plastics", usRate: 5.3, chinaAdditional: 25, examples: ["Raincoats", "Aprons", "Wristbands"] },
  { code: "7326.90", description: "Other articles of iron or steel", category: "Metals", usRate: 2.9, chinaAdditional: 25, examples: ["Carabiners", "Hooks", "Metal brackets"] },
  { code: "8414.59", description: "Fans (other)", category: "Electronics", usRate: 2.3, chinaAdditional: 25, examples: ["Desk fans", "Portable fans", "USB fans"] },
  { code: "8501.10", description: "Motors of an output not exceeding 37.5 W", category: "Electronics", usRate: 2.8, chinaAdditional: 25, examples: ["Small DC motors", "Vibration motors", "Micro servos"] },
  { code: "8507.60", description: "Lithium-ion accumulators (batteries)", category: "Electronics", usRate: 3.4, chinaAdditional: 25, examples: ["Battery packs", "Power banks", "Rechargeable batteries"] },
  { code: "8512.20", description: "Other lighting or visual signaling equipment for vehicles", category: "Automotive", usRate: 2.5, chinaAdditional: 25, examples: ["LED light bars", "Turn signals", "Interior lights"] },
  { code: "9018.90", description: "Other medical instruments and appliances", category: "Medical", usRate: 0, chinaAdditional: 25, examples: ["Pulse oximeters", "Thermometers", "Blood pressure monitors"] },
  { code: "9021.10", description: "Orthopedic appliances", category: "Medical", usRate: 0, chinaAdditional: 25, examples: ["Braces", "Supports", "Orthopedic insoles"] },
  { code: "9209.94", description: "Parts and accessories of musical instruments", category: "Music", usRate: 4.5, chinaAdditional: 25, examples: ["Guitar picks", "Drum sticks", "Capos"] },
  { code: "4823.90", description: "Other paper, paperboard, cellulose wadding", category: "Paper", usRate: 0.4, chinaAdditional: 25, examples: ["Packaging inserts", "Display cards", "Paper tubes"] },
  { code: "6505.00", description: "Hats and other headgear, knitted", category: "Apparel", usRate: 20.7, chinaAdditional: 7.5, examples: ["Beanies", "Baseball caps", "Bucket hats"] },
  { code: "6217.10", description: "Other made up clothing accessories", category: "Apparel", usRate: 14.6, chinaAdditional: 7.5, examples: ["Belts", "Scarves", "Ties"] },
  { code: "3304.99", description: "Other beauty or make-up preparations", category: "Cosmetics", usRate: 0, chinaAdditional: 25, examples: ["Lip balm", "Foundation", "Eye shadow palettes"] },
  { code: "3307.49", description: "Room deodorizing preparations", category: "Household", usRate: 6.0, chinaAdditional: 25, examples: ["Air fresheners", "Scented candles", "Reed diffusers"] },
  { code: "7117.19", description: "Imitation jewellery of base metal", category: "Accessories", usRate: 11.0, chinaAdditional: 7.5, examples: ["Fashion rings", "Bracelets", "Necklaces"] },
  { code: "7116.20", description: "Articles of precious or semi-precious stones", category: "Accessories", usRate: 6.5, chinaAdditional: 7.5, examples: ["Gemstone jewelry", "Crystal accessories", "Stone beads"] },
  { code: "9102.12", description: "Wrist watches, opto-electronic display only", category: "Watches", usRate: 3.9, chinaAdditional: 25, examples: ["Smartwatches", "Digital watches", "Fitness watches"] },
  { code: "9603.30", description: "Artists' brushes, writing brushes", category: "Tools", usRate: 2.6, chinaAdditional: 25, examples: ["Paint brushes", "Calligraphy brushes", "Makeup brushes"] },
  { code: "9613.10", description: "Pocket lighters, gas fueled, non-refillable", category: "Misc", usRate: 9.0, chinaAdditional: 25, examples: ["Disposable lighters", "BBQ lighters", "Candle lighters"] },
  { code: "9615.11", description: "Combs of hard rubber or plastics", category: "Personal Care", usRate: 5.3, chinaAdditional: 25, examples: ["Hair combs", "Beard combs", "Detangling brushes"] },
  { code: "6912.00", description: "Ceramic tableware, kitchenware (non-porcelain)", category: "Ceramics", usRate: 9.8, chinaAdditional: 25, examples: ["Stoneware plates", "Earthenware bowls", "Ceramic pots"] },
  { code: "7010.90", description: "Carboys, bottles, jars and similar glass containers", category: "Glassware", usRate: 0.5, chinaAdditional: 25, examples: ["Glass bottles", "Glass jars", "Perfume bottles"] },
  { code: "8415.10", description: "Window or wall air conditioning units", category: "Appliances", usRate: 2.2, chinaAdditional: 25, examples: ["Portable AC units", "Mini split units", "Window ACs"] },
  { code: "8450.11", description: "Fully automatic household washing machines", category: "Appliances", usRate: 1.4, chinaAdditional: 25, examples: ["Portable washers", "Mini washing machines", "Compact laundry"] },
  { code: "8509.40", description: "Food grinders and mixers", category: "Kitchen", usRate: 3.4, chinaAdditional: 25, examples: ["Blenders", "Food processors", "Hand mixers"] },
  { code: "8516.10", description: "Electric instantaneous or storage water heaters", category: "Appliances", usRate: 3.4, chinaAdditional: 25, examples: ["Tankless heaters", "Electric kettles", "Water dispensers"] },
]

export default function HsLookupPage() {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = useMemo(() => {
    const cats = new Set(HS_DATABASE.map((h) => h.category))
    return ["All", ...Array.from(cats).sort()]
  }, [])

  const results = useMemo(() => {
    let filtered = HS_DATABASE
    if (selectedCategory !== "All") {
      filtered = filtered.filter((h) => h.category === selectedCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (h) =>
          h.code.includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.examples.some((e) => e.toLowerCase().includes(q)) ||
          h.category.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [query, selectedCategory])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/tools"
        className="text-[#6B6B6B] hover:text-[#1A1A1A] text-sm flex items-center gap-1 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
        HS Code Lookup
      </h1>
      <p className="text-[#6B6B6B] mb-8 max-w-2xl">
        Search our database of {HS_DATABASE.length} common HS codes used in
        manufacturing. Find the right classification and see US tariff rates,
        including China-specific additional duties.
      </p>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
          <input
            type="text"
            placeholder="Search by code, product, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border-2 border-[#E8E8E4] focus:border-[#FF6B35] rounded-xl pl-12 pr-4 py-3 outline-none text-base"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border-2 border-[#E8E8E4] rounded-xl px-4 py-3 outline-none text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[#9B9B9B] mb-4">
        Showing {results.length} of {HS_DATABASE.length} codes
      </p>

      {/* Results */}
      <div className="space-y-3">
        {results.map((hs) => (
          <div
            key={hs.code}
            className="bg-white rounded-xl border border-[#E8E8E4] p-5 hover:border-[#FF6B35]/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#FF6B35] text-lg">
                  {hs.code}
                </span>
                <span className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-1 rounded-full">
                  {hs.category}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-[#9B9B9B]">US MFN: </span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {hs.usRate}%
                  </span>
                </div>
                {hs.chinaAdditional > 0 && (
                  <div>
                    <span className="text-[#9B9B9B]">+China: </span>
                    <span className="font-semibold text-[#EF4444]">
                      {hs.chinaAdditional}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[#1A1A1A] text-sm mb-2">{hs.description}</p>
            <div className="flex flex-wrap gap-2">
              {hs.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-xs bg-[#F5F5F0] text-[#6B6B6B] px-2 py-1 rounded-md"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#9B9B9B] text-lg">No matching HS codes found.</p>
          <p className="text-[#9B9B9B] text-sm mt-2">
            Try a different search term or category.
          </p>
        </div>
      )}

      <div className="mt-12 p-6 bg-[#FFF0EB] rounded-xl text-center">
        <p className="text-sm text-[#1A1A1A]">
          Need an exact HS code for your specific product?{" "}
          <Link
            href="/analyze"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            Get a full Bottlecap analysis
          </Link>{" "}
          — includes precise HS classification with confidence score.
        </p>
      </div>
    </div>
  )
}
