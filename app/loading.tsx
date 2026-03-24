export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-11 h-11">
          <div className="absolute inset-0 rounded-full border-2 border-[#E8E8E4]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF6B35] animate-spin" />
          <div className="absolute inset-[6px] rounded-full border border-[#FF6B35]/20 border-t-[#FF6B35]/60 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>
        <p className="text-sm text-[#767676] font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  )
}
