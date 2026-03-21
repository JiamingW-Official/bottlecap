export function SkeletonText({ className = "", lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-[#E8E8E4] rounded animate-pulse"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#E8E8E4] p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#E8E8E4] animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#E8E8E4] rounded animate-pulse w-2/3" />
          <div className="h-3 bg-[#E8E8E4] rounded animate-pulse w-1/3" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  )
}

export function SkeletonChart({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#E8E8E4] p-6 ${className}`}>
      <div className="h-4 bg-[#E8E8E4] rounded animate-pulse w-1/3 mb-4" />
      <div className="h-48 bg-[#E8E8E4] rounded-xl animate-pulse" />
    </div>
  )
}

export function SkeletonReportRow({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-[#E8E8E4] p-5 flex items-center justify-between ${className}`}>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#E8E8E4] rounded animate-pulse w-1/2" />
        <div className="h-3 bg-[#E8E8E4] rounded animate-pulse w-1/4" />
      </div>
      <div className="w-10 h-10 rounded-full bg-[#E8E8E4] animate-pulse" />
    </div>
  )
}
