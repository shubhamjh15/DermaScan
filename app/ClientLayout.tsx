"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Client component for scroll to top functionality
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
