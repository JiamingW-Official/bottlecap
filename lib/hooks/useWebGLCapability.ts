"use client"

import { useState, useEffect } from "react"

export type GPUTier = "high" | "medium" | "low" | "none"

interface WebGLCapability {
  supported: boolean
  tier: GPUTier
  isMobile: boolean
}

export function useWebGLCapability(): WebGLCapability {
  const [capability, setCapability] = useState<WebGLCapability>({
    supported: false,
    tier: "none",
    isMobile: false,
  })

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      setCapability({ supported: false, tier: "none", isMobile })
      return
    }

    try {
      const canvas = document.createElement("canvas")
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl")

      if (!gl) {
        setCapability({ supported: false, tier: "none", isMobile })
        return
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : ""

      const isLowEnd =
        isMobile ||
        /SwiftShader|llvmpipe|Software/i.test(renderer)

      const isHighEnd =
        !isMobile &&
        /NVIDIA|GeForce|Radeon RX|RTX|Arc A/i.test(renderer)

      let tier: GPUTier = "medium"
      if (isLowEnd) tier = "low"
      if (isHighEnd) tier = "high"

      canvas.remove()
      setCapability({ supported: true, tier, isMobile })
    } catch {
      setCapability({ supported: false, tier: "none", isMobile })
    }
  }, [])

  return capability
}
