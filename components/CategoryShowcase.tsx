"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Smartphone,
  Home,
  Watch,
  Headphones,
  UtensilsCrossed,
  Lamp,
  Armchair,
  Dog,
  Baby,
  Tent,
  Dumbbell,
  Sparkles,
  ShoppingBag,
  Footprints,
  Gamepad2,
  Car,
  Pencil,
  Stethoscope,
  Shirt,
  Package,
  ArrowRight,
} from "lucide-react"

const categories = [
  { Icon: Smartphone, name: "Consumer Electronics", examples: "Smart devices, IoT, gadgets", avgCost: "$8–$45", moq: "200–1,000 units", trend: "hot" },
  { Icon: Home,       name: "Smart Home",           examples: "Sensors, controllers, hubs",    avgCost: "$12–$60", moq: "300–2,000 units", trend: null },
  { Icon: Watch,      name: "Wearable Tech",         examples: "Fitness bands, smart rings",   avgCost: "$15–$80", moq: "500–2,000 units", trend: "hot" },
  { Icon: Headphones, name: "Audio Equipment",       examples: "Earbuds, speakers, mics",      avgCost: "$6–$35",  moq: "300–1,500 units", trend: null },
  { Icon: UtensilsCrossed, name: "Kitchen & Dining", examples: "Cookware, utensils, storage",  avgCost: "$2–$25",  moq: "100–500 units",  trend: null },
  { Icon: Lamp,       name: "Home Decor",            examples: "Vases, frames, lighting",      avgCost: "$3–$30",  moq: "100–1,000 units", trend: null },
  { Icon: Armchair,   name: "Furniture",             examples: "Desks, shelving, seating",     avgCost: "$25–$200",moq: "50–200 units",   trend: null },
  { Icon: Dog,        name: "Pet Products",          examples: "Bowls, toys, accessories",     avgCost: "$2–$18",  moq: "200–1,000 units", trend: "new" },
  { Icon: Baby,       name: "Baby & Kids",           examples: "Safety gear, toys, feeding",   avgCost: "$4–$25",  moq: "300–1,500 units", trend: null },
  { Icon: Tent,       name: "Outdoor & Camping",     examples: "Gear, tools, lighting",        avgCost: "$5–$45",  moq: "100–500 units",  trend: null },
  { Icon: Dumbbell,   name: "Fitness & Sports",      examples: "Equipment, accessories",       avgCost: "$4–$50",  moq: "100–500 units",  trend: "hot" },
  { Icon: Sparkles,   name: "Beauty & Cosmetics",    examples: "Containers, tools, devices",   avgCost: "$1–$20",  moq: "500–5,000 units", trend: null },
  { Icon: ShoppingBag,name: "Bags & Luggage",        examples: "Backpacks, cases, wallets",    avgCost: "$5–$40",  moq: "100–500 units",  trend: null },
  { Icon: Footprints, name: "Footwear",              examples: "Sneakers, sandals, boots",     avgCost: "$8–$35",  moq: "300–1,000 units", trend: null },
  { Icon: Gamepad2,   name: "Toys & Games",          examples: "Action figures, puzzles",      avgCost: "$2–$15",  moq: "500–2,000 units", trend: null },
  { Icon: Car,        name: "Auto Accessories",      examples: "Mounts, organizers, tools",    avgCost: "$3–$25",  moq: "200–1,000 units", trend: null },
  { Icon: Pencil,     name: "Office & Stationery",   examples: "Organizers, supplies",         avgCost: "$1–$12",  moq: "500–5,000 units", trend: null },
  { Icon: Stethoscope,name: "Medical Devices",       examples: "Monitors, tools, PPE",         avgCost: "$10–$100",moq: "100–500 units",  trend: null },
  { Icon: Shirt,      name: "Apparel",               examples: "T-shirts, jackets, hats",      avgCost: "$3–$25",  moq: "100–500 units",  trend: null },
  { Icon: Package,    name: "Packaging",             examples: "Boxes, bottles, pouches",      avgCost: "$0.10–$2",moq: "1,000–10,000",   trend: null },
]

export default function CategoryShowcase() {
  const router = useRouter()

  const handleCategoryClick = (name: string) => {
    sessionStorage.setItem("bottlecap_hero_text", name)
    router.push("/analyze")
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {categories.map((cat, i) => (
        <motion.button
          key={cat.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.025 }}
          whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
          onClick={() => handleCategoryClick(cat.name)}
          className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-left hover:border-[#FF6B35]/25 transition-all cursor-pointer group relative"
        >
          {/* Badge */}
          {cat.trend === "hot" && (
            <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              HOT
            </span>
          )}
          {cat.trend === "new" && (
            <span className="absolute -top-2 -right-2 bg-[#22C55E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              NEW
            </span>
          )}

          <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] flex items-center justify-center group-hover:bg-[#FF6B35]/10 transition-colors">
            <cat.Icon className="w-4.5 h-4.5 text-[#FF6B35]" />
          </div>
          <p className="font-semibold text-[#1A1A1A] text-sm mt-2.5 leading-snug">
            {cat.name}
          </p>
          <p className="text-xs text-[#9B9B9B] mt-1 leading-snug">{cat.examples}</p>
          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-xs font-semibold text-[#FF6B35]">{cat.avgCost}/unit</p>
            <ArrowRight className="w-3.5 h-3.5 text-[#D0D0C8] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
          </div>
          <p className="text-[10px] text-[#C0C0BC] mt-0.5">MOQ: {cat.moq}</p>
        </motion.button>
      ))}
    </div>
  )
}
