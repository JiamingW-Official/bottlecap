"use client"

const TRENDING = [
  { emoji: "💧", name: "Smart water bottle", score: 88, country: "🇻🇳 Vietnam", time: "3 min ago" },
  { emoji: "🎧", name: "Wireless earbuds", score: 79, country: "🇨🇳 China", time: "7 min ago" },
  { emoji: "🧴", name: "Skincare serum kit", score: 91, country: "🇰🇷 Korea", time: "12 min ago" },
  { emoji: "🐕", name: "Smart pet feeder", score: 74, country: "🇨🇳 China", time: "18 min ago" },
  { emoji: "🏕️", name: "Portable solar charger", score: 82, country: "🇨🇳 China", time: "24 min ago" },
  { emoji: "👟", name: "Custom sneaker line", score: 68, country: "🇻🇳 Vietnam", time: "31 min ago" },
  { emoji: "🔑", name: "RFID blocking wallet", score: 93, country: "🇨🇳 China", time: "38 min ago" },
  { emoji: "🌿", name: "Bamboo cutlery set", score: 87, country: "🇮🇳 India", time: "45 min ago" },
  { emoji: "💡", name: "Smart home sensor", score: 76, country: "🇨🇳 China", time: "52 min ago" },
  { emoji: "🎒", name: "Anti-theft backpack", score: 85, country: "🇻🇳 Vietnam", time: "1 hr ago" },
  { emoji: "🍳", name: "Ceramic cookware set", score: 72, country: "🇨🇳 China", time: "1.2 hr ago" },
  { emoji: "🚲", name: "E-bike accessories kit", score: 81, country: "🇨🇳 China", time: "1.5 hr ago" },
  { emoji: "👶", name: "Baby monitor camera", score: 77, country: "🇨🇳 China", time: "2 hr ago" },
  { emoji: "🎮", name: "Gaming controller grip", score: 89, country: "🇨🇳 China", time: "2.3 hr ago" },
  { emoji: "🌙", name: "LED night light orb", score: 84, country: "🇻🇳 Vietnam", time: "2.7 hr ago" },
  { emoji: "🧘", name: "Cork yoga mat", score: 90, country: "🇮🇳 India", time: "3 hr ago" },
]

function scoreColor(score: number): string {
  if (score >= 80) return "#22C55E"
  if (score >= 65) return "#F59E0B"
  return "#EF4444"
}

function scoreBg(score: number): string {
  if (score >= 80) return "rgba(34,197,94,0.12)"
  if (score >= 65) return "rgba(245,158,11,0.12)"
  return "rgba(239,68,68,0.12)"
}

// Duplicate for seamless loop
const ITEMS = [...TRENDING, ...TRENDING]

export default function TrendingProducts() {
  return (
    <section className="py-16 bg-white border-t border-[#E8E8E4] overflow-hidden">
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 48s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-3">
          {/* Pulsing green dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
          </span>
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B]">
            What founders are analyzing right now
          </p>
        </div>
      </div>

      {/* Ticker */}
      <div className="w-full overflow-hidden">
        <div className="ticker-track">
          {ITEMS.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex-shrink-0 mx-2 bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl px-4 py-3 w-[220px]
                         hover:border-[#D0D0C8] hover:shadow-sm transition-all duration-200 cursor-default"
            >
              {/* Top row: emoji + score */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ color: scoreColor(item.score), backgroundColor: scoreBg(item.score) }}
                >
                  {item.score}
                </span>
              </div>

              {/* Product name */}
              <p className="text-sm font-semibold text-[#1A1A1A] leading-tight mb-1 truncate">
                {item.name}
              </p>

              {/* Country + time */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#6B6B6B]">{item.country}</span>
                <span className="text-[10px] text-[#9B9B9B]">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
