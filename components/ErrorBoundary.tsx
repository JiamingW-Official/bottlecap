"use client"

import { Component, type ReactNode } from "react"
import Link from "next/link"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Something went wrong
          </h2>
          <p className="text-[#6B6B6B] mb-6 max-w-md">
            An unexpected error occurred. Try refreshing the page, or contact
            us if the problem persists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#E85A25] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Refresh page
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#E8E8E4] rounded-full px-6 py-2.5 text-sm font-semibold text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            >
              <Home className="w-4 h-4" />
              Return home
            </Link>
          </div>
          <a
            href="mailto:hello@bottlecap.io"
            className="mt-4 text-sm text-[#FF6B35] hover:underline"
          >
            Contact support
          </a>
        </div>
      )
    }

    return this.props.children
  }
}
