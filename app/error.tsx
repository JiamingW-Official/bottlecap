"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-6">
        <span className="text-2xl">!</span>
      </div>
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
        Something went wrong
      </h2>
      <p className="text-[#6B6B6B] mb-8 max-w-md">
        An unexpected error occurred. Please try again or contact support if
        the problem persists.
      </p>
      <button
        onClick={reset}
        className="bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold hover:bg-[#E85A25] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
