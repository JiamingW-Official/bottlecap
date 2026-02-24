import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#E8E8E4] text-center text-sm text-[#9B9B9B]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="mb-4">
          Bottlecap &mdash; Bridging creativity and manufacturing
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/privacy"
            className="hover:text-[#6B6B6B] transition-colors"
          >
            Privacy
          </Link>
          <span>&middot;</span>
          <Link
            href="/terms"
            className="hover:text-[#6B6B6B] transition-colors"
          >
            Terms
          </Link>
          <span>&middot;</span>
          <a
            href="https://twitter.com/bottlecap_io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6B6B6B] transition-colors"
          >
            @bottlecap_io
          </a>
        </div>
      </div>
    </footer>
  )
}
