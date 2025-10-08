"use client"

import { useEffect, useRef } from "react"
import { Camera, Search, MessageSquare, FileCheck } from "lucide-react"
import gsap from "gsap"

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const steps = containerRef.current.querySelectorAll(".step-item")

    gsap.from(steps, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    })

    return () => {
      gsap.killTweensOf(steps)
    }
  }, [])

  const steps = [
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Upload Photo",
      description: "Take a clear photo of your skin concern and securely upload it to our platform.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your image and provides instant preliminary results.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Expert Consultation",
      description: "Connect with a certified dermatologist for professional diagnosis and treatment.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Treatment Plan",
      description: "Receive a personalized treatment plan and follow-up care recommendations.",
    },
  ]

  return (
    <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={index} className="step-item flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">{step.icon}</div>
          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
              <div className="w-8 h-0.5 bg-primary/30"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
