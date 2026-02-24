"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1A1A1A] group-[.toaster]:border-[#E8E8E4] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#6B6B6B]",
          actionButton:
            "group-[.toast]:bg-[#FF6B35] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#F5F5F0] group-[.toast]:text-[#6B6B6B]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
