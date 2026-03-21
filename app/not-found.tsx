import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Visual number */}
        <div className="mb-8">
          <span className="text-[120px] font-black leading-none text-[#F5F5F0] select-none">404</span>
        </div>

        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B35] mb-3 -mt-8">
          Page not found
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] mb-4">
          Nothing here.
        </h1>
        <p className="text-[#6B6B6B] text-base mb-10 max-w-sm mx-auto leading-relaxed">
          This page doesn&apos;t exist or has been moved. Head back home or explore our free tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#E85A25] shadow-[0_2px_8px_rgba(255,107,53,0.3)] hover:shadow-[0_4px_14px_rgba(255,107,53,0.4)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 border-2 border-[#E8E8E4] text-[#1A1A1A] rounded-full px-6 py-3 font-semibold hover:border-[#FF6B35]/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            Free tools
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E8E4]">
          <p className="text-xs text-[#9B9B9B] mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: "/analyze", label: "Analyze my product" },
              { href: "/report/demo", label: "Sample report" },
              { href: "/pricing", label: "Pricing" },
              { href: "/guide", label: "Guides" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#6B6B6B] hover:text-[#FF6B35] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#9B9B9B] mt-8">
          Need help?{" "}
          <a href="mailto:hello@bottlecap.io" className="text-[#FF6B35] hover:underline">
            hello@bottlecap.io
          </a>
        </p>
      </div>
    </div>
  )
}
