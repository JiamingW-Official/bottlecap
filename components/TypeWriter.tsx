"use client"

import { useState, useEffect, useCallback } from "react"

interface TypeWriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypeWriter({
  texts,
  speed = 50,
  deleteSpeed = 30,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleTyping = useCallback(() => {
    const currentFullText = texts[textIndex]

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        return {
          nextText: currentFullText.slice(0, displayText.length + 1),
          delay: speed,
          shouldToggleDelete: false,
          shouldAdvanceText: false,
        }
      }
      return {
        nextText: displayText,
        delay: pauseTime,
        shouldToggleDelete: true,
        shouldAdvanceText: false,
      }
    } else {
      if (displayText.length > 0) {
        return {
          nextText: displayText.slice(0, -1),
          delay: deleteSpeed,
          shouldToggleDelete: false,
          shouldAdvanceText: false,
        }
      }
      return {
        nextText: "",
        delay: speed,
        shouldToggleDelete: true,
        shouldAdvanceText: true,
      }
    }
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  useEffect(() => {
    const result = handleTyping()

    const timeout = setTimeout(() => {
      setDisplayText(result.nextText)
      if (result.shouldToggleDelete) {
        setIsDeleting((prev) => !prev)
      }
      if (result.shouldAdvanceText) {
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }, result.delay)

    return () => clearTimeout(timeout)
  }, [handleTyping, texts.length])

  return (
    <span>
      {displayText}
      <span className="border-r-2 border-[#FF6B35] animate-pulse ml-0.5">
        &nbsp;
      </span>
    </span>
  )
}
