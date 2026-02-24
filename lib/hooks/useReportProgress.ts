'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface ProgressEvent {
  step: 'starting' | 'scraping' | 'analyzing' | 'finalizing' | 'complete' | 'error'
  progress: number
  message: string
}

interface UseReportProgressOptions {
  reportId: string
  enabled?: boolean
}

export function useReportProgress({ reportId, enabled = true }: UseReportProgressOptions) {
  const [progress, setProgress] = useState<ProgressEvent | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const connect = useCallback(async () => {
    if (!enabled || !reportId) return

    // Get SSE auth token
    let token: string
    try {
      const res = await fetch('/api/progress-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      })
      if (!res.ok) throw new Error('Failed to get progress token')
      const data = await res.json()
      token = data.token
    } catch {
      // If token endpoint fails, SSE is not available (backend might not be running)
      return
    }

    const backendUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL
    if (!backendUrl) return

    const url = `${backendUrl}/api/v1/progress/${reportId}?token=${encodeURIComponent(token)}`

    const es = new EventSource(url)
    eventSourceRef.current = es

    es.onopen = () => {
      setIsConnected(true)
      setError(null)
    }

    es.addEventListener('progress', (event) => {
      try {
        const data = JSON.parse(event.data) as ProgressEvent
        setProgress(data)

        if (data.step === 'complete' || data.step === 'error') {
          es.close()
          setIsConnected(false)
        }
      } catch {
        // Ignore parse errors
      }
    })

    es.onerror = () => {
      setError('Connection lost')
      setIsConnected(false)
      es.close()
    }
  }, [reportId, enabled])

  useEffect(() => {
    connect()

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [connect])

  return {
    progress,
    isConnected,
    error,
    isComplete: progress?.step === 'complete',
    isError: progress?.step === 'error',
  }
}
