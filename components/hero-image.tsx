"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    tl.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 rounded-xl"></div>
      <Image
        src="/placeholder.svg?height=500&width=700"
        alt="AI-powered skin analysis"
        fill
        className="object-cover rounded-xl"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20">
        <div className="flex items-center gap-2 text-white">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">AI-powered analysis in seconds</span>
        </div>
      </div>
    </div>
  )
}
