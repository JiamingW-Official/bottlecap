import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-black text-[#FF6B35] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
        Page not found
      </h2>
      <p className="text-[#6B6B6B] mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#FF6B35] text-white rounded-full px-8 py-3 font-semibold hover:bg-[#E85A25] transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}
