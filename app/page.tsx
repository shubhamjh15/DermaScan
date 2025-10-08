"use client"

import { useEffect, useRef, useState } from "react" // Import useState
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Upload, Camera, Sparkles, MessageSquare, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AiChatbot from "@/components/ai-chatbot"
import PersonalizedRoutine from "@/components/personalized-routine"
import PricingSection from "@/components/pricing-section"
import {auth} from "@/lib/auth";


// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const pulseAnimation = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}

const floatAnimation = {
  initial: { y: 0 },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
}

// Animated component that triggers on scroll
const AnimateOnScroll = ({ children, className, variants, delay = 0 }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || fadeInUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false) // <-- Add state for client-side check

  // Effect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Parallax effect for hero section
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll(".parallax-element")
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const x = (clientX / window.innerWidth - 0.5) * 20
        const y = (clientY / window.innerHeight - 0.5) * 20

        heroElements.forEach((el) => {
          gsap.to(el, {
            x: x * (Math.random() * 0.5 + 0.5),
            y: y * (Math.random() * 0.5 + 0.5),
            duration: 1,
            ease: "power2.out",
          })
        })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove) // Cleanup listener
    }
  }, []) // Removed isClient dependency as it's not needed here

  useEffect(() => {
    // Scroll-triggered animations
    if (featuresRef.current) {
      gsap.fromTo(
        ".feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        },
      )
    }

    // Magnetic button effect
    const buttons = document.querySelectorAll(".magnetic-button")
    const handleButtonMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    const handleButtonMouseLeave = (e: MouseEvent) => {
       const button = e.currentTarget as HTMLElement
       gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    buttons.forEach((button) => {
      button.addEventListener("mousemove", handleButtonMouseMove)
      button.addEventListener("mouseleave", handleButtonMouseLeave)
    })

    return () => {
       // Cleanup magnetic button listeners
       buttons.forEach((button) => {
         button.removeEventListener("mousemove", handleButtonMouseMove)
         button.removeEventListener("mouseleave", handleButtonMouseLeave)
       })
    }
  }, []) // Also removed isClient dependency here
  

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg"></div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl parallax-element"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] w-40 h-40 bg-secondary/5 rounded-full blur-3xl parallax-element"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        />

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="grid gap-12 lg:grid-cols-2 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="flex flex-col space-y-6">
              <motion.div variants={fadeInUp}>
                <Badge variant="outline" className="w-fit border-primary/50 text-primary">
                  AI-Powered Beauty Tech
                </Badge>
              </motion.div>

              <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight" variants={fadeInUp}>
                <span className="gradient-text">Scan.</span> Glow. <span className="text-glow text-primary">Slay.</span>
              </motion.h1>

              <motion.p className="text-muted-foreground text-lg max-w-md" variants={fadeInUp}>
                A game-changing AI-powered skincare assistant for the people's glow-up.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <Link href="/analysis" legacyBehavior>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="magnetic-button">
                    <Button size="lg" className="enhanced-hover relative overflow-hidden group">
                      <span className="relative z-10 flex items-center">
                        Try AI Analysis
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                        >
                          <Camera className="ml-2 h-4 w-4" />
                        </motion.div>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div className="flex items-center gap-4 text-sm text-muted-foreground" variants={fadeInUp}>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background overflow-hidden"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${i}`} // Replace with actual image paths or a placeholder generator
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Join 100 Gen Z beauty enthusiasts
                </motion.span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px] md:h-[600px]"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden neon-border"
                variants={pulseAnimation}
                initial="initial"
                animate="pulse"
              >
                <Image
                  src="/placeholder.svg?height=600&width=500&text=App+Screenshot" // Replace with actual hero image
                  alt="AI Beauty Analysis App Screenshot"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="glass-effect rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className="h-3 w-3 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-sm font-medium">AI analyzing your beauty profile</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Skin analysis</span>
                        <span>75%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/20 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Next-Gen</span> Beauty Experience
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover how our AI-powered platform revolutionizes your beauty and skincare routine
            </p>
          </AnimateOnScroll>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                icon: <Camera className="h-6 w-6 text-primary" />,
                title: "AI Beauty Analysis",
                description:
                  "Upload a selfie and get instant AI-powered analysis of your skin type, tone, and concerns with personalized recommendations.",
                link: "/analysis" // Example link
              },
              {
                icon: <Sparkles className="h-6 w-6 text-primary" />,
                title: "Trend-Based Styling",
                description:
                  "Get AI-curated makeup looks, outfit ideas, and skincare routines based on your features and the latest Gen Z trends.",
                link: "/trends" // Example link
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "Expert Consultations",
                description:
                  "Connect with beauty influencers, skincare experts, and stylists for personalized advice and virtual sessions.",
                link: "/experts" // Example link
              },
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "Personalized Routines",
                description:
                  "Receive custom skincare routines tailored to your unique skin profile, concerns, and lifestyle factors.",
                link: "/routines" // Example link
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "AI Beauty Assistant",
                description:
                  "Chat with our AI beauty assistant for instant skincare advice, product recommendations, and beauty hacks anytime.",
                link: "/chat" // Example link
              },
              {
                icon: <Upload className="h-6 w-6 text-primary" />,
                title: "Progress Tracking",
                description:
                  "Track your skin's improvement over time with AI-powered analysis that measures changes and celebrates your progress.",
                link: "/progress" // Example link
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={fadeInUp}
                custom={index * 0.1}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <motion.div
                      className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 flex-shrink-0"
                      variants={floatAnimation}
                      initial="initial"
                      animate="float"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>
                    <Link href={feature.link} legacyBehavior>
                      <Button variant="link" className="p-0 h-auto text-primary group self-start mt-auto">
                         <span className="inline-flex items-center">
                           Try it now
                           <motion.span
                             className="inline-block ml-1"
                             initial={{ x: 0 }}
                             whileHover={{ x: 5 }}
                             transition={{ duration: 0.2 }}
                           >
                             →
                           </motion.span>
                         </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Personalized Skincare Routine Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="gradient-text">Personalized</span> Skincare Routine
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered skincare routines tailored to your unique skin profile, goals, and lifestyle
            </p>
          </AnimateOnScroll>

          <PersonalizedRoutine />
        </div>
      </section>

      {/* AI Chatbot Demo */}
      <section className="py-20 bg-muted/20 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Personal <span className="gradient-text">AI Beauty Assistant</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Get instant skincare advice, makeup tips, and product recommendations from our AI beauty assistant.
              </p>
              <motion.ul
                className="space-y-3 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {["24/7 beauty advice", "Personalized recommendations", "Trend insights", "Step-by-step tutorials"].map(
                  (item, i) => (
                    <motion.li key={i} className="flex items-center gap-3" variants={fadeInUp} custom={i * 0.1}>
                      <motion.div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" whileHover={{ scale: 1.5 }} />
                      <span>{item}</span>
                    </motion.li>
                  ),
                )}
              </motion.ul>
              <Link href="/chat" legacyBehavior>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="magnetic-button">Start chatting now</Button>
                </motion.div>
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <AiChatbot />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <PricingSection />

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="absolute inset-0 grid-bg"></div>

        {/* Animated particles - Conditionally render only on client */}
        {isClient && [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 pointer-events-none" // Added pointer-events-none
            style={{
              // Random values calculated only on the client
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              repeatType: "reverse", // Added repeatType
              ease: "easeInOut" // Added ease
            }}
          />
        ))}

        <div className="container px-4 md:px-6 relative z-10">
          <AnimateOnScroll className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Beauty Routine</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of Gen Z beauty enthusiasts who are revolutionizing their skincare and style with AI
              technology.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block" // Ensure motion div wraps link/button correctly
            >
              <Link href="/analysis" legacyBehavior>
                <Button size="lg" className="enhanced-hover magnetic-button">
                  <motion.span
                    className="relative z-10"
                    initial={{ opacity: 1 }}
                    whileHover={{
                      opacity: [1, 0.8, 1],
                      transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    Get Started Free
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}