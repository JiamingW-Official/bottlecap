"use client"

import { motion } from "framer-motion"

const categories = [
  { icon: "📱", name: "Consumer Electronics", examples: "Smart devices, gadgets, IoT", avgCost: "$8-45" },
  { icon: "🏠", name: "Smart Home", examples: "Sensors, controllers, hubs", avgCost: "$12-60" },
  { icon: "⌚", name: "Wearable Tech", examples: "Fitness bands, smart rings", avgCost: "$15-80" },
  { icon: "🎧", name: "Audio Equipment", examples: "Earbuds, speakers, mics", avgCost: "$6-35" },
  { icon: "🍳", name: "Kitchen & Dining", examples: "Cookware, utensils, storage", avgCost: "$2-25" },
  { icon: "🪴", name: "Home Decor", examples: "Vases, frames, lighting", avgCost: "$3-30" },
  { icon: "🪑", name: "Furniture", examples: "Desks, shelving, seating", avgCost: "$25-200" },
  { icon: "🐕", name: "Pet Products", examples: "Bowls, toys, accessories", avgCost: "$2-18" },
  { icon: "👶", name: "Baby & Kids", examples: "Safety gear, toys, feeding", avgCost: "$4-25" },
  { icon: "⛺", name: "Outdoor & Camping", examples: "Gear, tools, lighting", avgCost: "$5-45" },
  { icon: "💪", name: "Fitness & Sports", examples: "Equipment, accessories", avgCost: "$4-50" },
  { icon: "💄", name: "Beauty & Cosmetics", examples: "Containers, tools, devices", avgCost: "$1-20" },
  { icon: "👜", name: "Bags & Luggage", examples: "Backpacks, cases, wallets", avgCost: "$5-40" },
  { icon: "👟", name: "Footwear", examples: "Sneakers, sandals, boots", avgCost: "$8-35" },
  { icon: "🧸", name: "Toys & Games", examples: "Action figures, puzzles", avgCost: "$2-15" },
  { icon: "🚗", name: "Auto Accessories", examples: "Mounts, organizers, tools", avgCost: "$3-25" },
  { icon: "✏️", name: "Office & Stationery", examples: "Organizers, supplies", avgCost: "$1-12" },
  { icon: "🏥", name: "Medical Devices", examples: "Monitors, tools, PPE", avgCost: "$10-100" },
  { icon: "👕", name: "Apparel", examples: "T-shirts, jackets, hats", avgCost: "$3-25" },
  { icon: "📦", name: "Packaging", examples: "Boxes, bottles, pouches", avgCost: "$0.10-2" },
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
          <span className="text-3xl">{cat.icon}</span>
          <p className="font-semibold text-[#1A1A1A] text-sm mt-2">
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
