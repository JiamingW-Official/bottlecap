"use client"

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
} from "lucide-react"

const categories = [
  { Icon: Smartphone, name: "Consumer Electronics", examples: "Smart devices, gadgets, IoT", avgCost: "$8-45" },
  { Icon: Home, name: "Smart Home", examples: "Sensors, controllers, hubs", avgCost: "$12-60" },
  { Icon: Watch, name: "Wearable Tech", examples: "Fitness bands, smart rings", avgCost: "$15-80" },
  { Icon: Headphones, name: "Audio Equipment", examples: "Earbuds, speakers, mics", avgCost: "$6-35" },
  { Icon: UtensilsCrossed, name: "Kitchen & Dining", examples: "Cookware, utensils, storage", avgCost: "$2-25" },
  { Icon: Lamp, name: "Home Decor", examples: "Vases, frames, lighting", avgCost: "$3-30" },
  { Icon: Armchair, name: "Furniture", examples: "Desks, shelving, seating", avgCost: "$25-200" },
  { Icon: Dog, name: "Pet Products", examples: "Bowls, toys, accessories", avgCost: "$2-18" },
  { Icon: Baby, name: "Baby & Kids", examples: "Safety gear, toys, feeding", avgCost: "$4-25" },
  { Icon: Tent, name: "Outdoor & Camping", examples: "Gear, tools, lighting", avgCost: "$5-45" },
  { Icon: Dumbbell, name: "Fitness & Sports", examples: "Equipment, accessories", avgCost: "$4-50" },
  { Icon: Sparkles, name: "Beauty & Cosmetics", examples: "Containers, tools, devices", avgCost: "$1-20" },
  { Icon: ShoppingBag, name: "Bags & Luggage", examples: "Backpacks, cases, wallets", avgCost: "$5-40" },
  { Icon: Footprints, name: "Footwear", examples: "Sneakers, sandals, boots", avgCost: "$8-35" },
  { Icon: Gamepad2, name: "Toys & Games", examples: "Action figures, puzzles", avgCost: "$2-15" },
  { Icon: Car, name: "Auto Accessories", examples: "Mounts, organizers, tools", avgCost: "$3-25" },
  { Icon: Pencil, name: "Office & Stationery", examples: "Organizers, supplies", avgCost: "$1-12" },
  { Icon: Stethoscope, name: "Medical Devices", examples: "Monitors, tools, PPE", avgCost: "$10-100" },
  { Icon: Shirt, name: "Apparel", examples: "T-shirts, jackets, hats", avgCost: "$3-25" },
  { Icon: Package, name: "Packaging", examples: "Boxes, bottles, pouches", avgCost: "$0.10-2" },
]

export default function CategoryShowcase() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl border border-[#E8E8E4] p-4 text-center hover:shadow-sm transition-all cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] flex items-center justify-center mx-auto">
            <cat.Icon className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <p className="font-semibold text-[#1A1A1A] text-sm mt-3">
            {cat.name}
          </p>
          <p className="text-xs text-[#9B9B9B] mt-1">{cat.examples}</p>
          <p className="text-xs font-medium text-[#FF6B35] mt-2">
            {cat.avgCost}/unit
          </p>
        </motion.div>
      ))}
    </div>
  )
}
