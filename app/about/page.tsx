"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, Code, Award, Sparkles, Heart, Star, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("mission")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  useEffect(() => {
    if (containerRef.current) {
      // Only animate sections after the first one
      const sections = containerRef.current.querySelectorAll(".animate-section:not(:first-child)")

      gsap.fromTo(
        sections,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Dermatologist",
      bio: "Board-certified dermatologist with 15+ years of experience specializing in AI-driven skin analysis.",
      image: "/placeholder.svg?height=200&width=200&text=SJ",
    },
    {
      name: "Alex Chen",
      role: "AI Research Lead",
      bio: "PhD in Computer Vision with expertise in developing machine learning models for medical imaging.",
      image: "/placeholder.svg?height=200&width=200&text=AC",
    },
    {
      name: "Maya Patel",
      role: "Product Director",
      bio: "Former beauty industry executive with a passion for making dermatology care accessible to everyone.",
      image: "/placeholder.svg?height=200&width=200&text=MP",
    },
    {
      name: "James Wilson",
      role: "Tech Lead",
      bio: "Full-stack developer specializing in healthcare applications with a focus on privacy and security.",
      image: "/placeholder.svg?height=200&width=200&text=JW",
    },
  ]

  const stats = [
    { value: "98%", label: "Accuracy Rate", icon: <CheckCircle className="h-5 w-5 text-primary" /> },
    { value: "50k+", label: "Users Worldwide", icon: <Users className="h-5 w-5 text-primary" /> },
    { value: "24/7", label: "AI Availability", icon: <Code className="h-5 w-5 text-primary" /> },
    { value: "15+", label: "Dermatologists", icon: <Award className="h-5 w-5 text-primary" /> },
  ]

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Hero Section - Removed ScrollTrigger */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">DermaScan</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Combining cutting-edge AI technology with expert dermatology care to revolutionize skin health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card/60 backdrop-blur-sm border-primary/10 rounded-lg p-4 w-[160px]"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-center">{stat.value}</div>
                  <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto animate-section">
            <Tabs defaultValue="mission" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="mission" className="data-[state=active]:bg-primary/20">
                  Our Mission
                </TabsTrigger>
                <TabsTrigger value="technology" className="data-[state=active]:bg-primary/20">
                  Our Technology
                </TabsTrigger>
                <TabsTrigger value="values" className="data-[state=active]:bg-primary/20">
                  Our Values
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mission" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-6">
                      At DermaScan, our mission is to make professional dermatology care accessible to everyone,
                      everywhere. By combining advanced AI technology with the expertise of board-certified
                      dermatologists, we're breaking down barriers to quality skin care.
                    </p>
                    <p className="text-muted-foreground">
                      We believe that early detection and proper treatment of skin conditions can significantly improve
                      quality of life and health outcomes. That's why we've developed a platform that allows for quick,
                      accurate, and convenient skin analysis and professional consultation.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="DermaScan mission"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-xl font-bold mb-2">Making skincare accessible</div>
                      <p className="text-sm text-muted-foreground">For everyone, everywhere</p>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="technology" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Technology</h2>
                    <p className="text-muted-foreground mb-6">
                      DermaScan's AI technology is built on deep learning algorithms trained on millions of
                      dermatological images. Our system can identify patterns associated with over 200 skin conditions
                      with accuracy comparable to board-certified dermatologists.
                    </p>
                    <p className="text-muted-foreground">
                      The platform continuously improves through machine learning, incorporating new data and
                      dermatologist feedback to enhance accuracy over time. All analysis is validated through rigorous
                      clinical studies and expert review.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {[
                      { title: "Deep Learning", icon: <Sparkles className="h-6 w-6 text-primary" /> },
                      { title: "Computer Vision", icon: <Code className="h-6 w-6 text-primary" /> },
                      { title: "Clinical Validation", icon: <CheckCircle className="h-6 w-6 text-primary" /> },
                      { title: "Continuous Learning", icon: <Award className="h-6 w-6 text-primary" /> },
                    ].map((item, index) => (
                      <Card key={index} className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {item.icon}
                          </div>
                          <h3 className="font-bold mb-2">{item.title}</h3>
                          <div className="h-1 w-12 bg-primary/30 rounded-full"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="values" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
                    <p className="text-muted-foreground mb-6">
                      At the core of DermaScan are our unwavering values that guide everything we do. We believe in
                      making healthcare accessible, maintaining the highest standards of privacy, and ensuring medical
                      excellence in all our services.
                    </p>
                    <p className="text-muted-foreground">
                      We're committed to continuous improvement, both in our technology and in the lives of our users.
                      Our goal is to create a world where everyone has access to quality dermatological care, regardless
                      of location or circumstance.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="space-y-4">
                      {[
                        {
                          title: "Accessibility",
                          desc: "Making dermatology care available to everyone",
                          icon: <Users className="h-5 w-5 text-primary" />,
                        },
                        {
                          title: "Privacy & Security",
                          desc: "Protecting your data with end-to-end encryption",
                          icon: <CheckCircle className="h-5 w-5 text-primary" />,
                        },
                        {
                          title: "Medical Excellence",
                          desc: "Maintaining rigorous medical standards",
                          icon: <Award className="h-5 w-5 text-primary" />,
                        },
                        {
                          title: "Continuous Improvement",
                          desc: "Always evolving to serve you better",
                          icon: <Sparkles className="h-5 w-5 text-primary" />,
                        },
                      ].map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex gap-4 p-4 rounded-lg bg-card/60 backdrop-blur-sm border-primary/10"
                        >
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            {value.icon}
                          </div>
                          <div>
                            <h3 className="font-bold">{value.title}</h3>
                            <p className="text-sm text-muted-foreground">{value.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/20 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The experts behind DermaScan's revolutionary technology and vision
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 animate-section">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="relative h-48 w-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                    <p className="text-primary text-sm text-center mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-center">{member.bio}</p>
                    <div className="flex justify-center mt-4 space-x-2">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From idea to innovation: The DermaScan story
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative animate-section">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/30"></div>

            {[
              {
                year: "2018",
                title: "The Idea",
                desc: "DermaScan was born from a simple idea: make dermatology accessible to everyone.",
              },
              {
                year: "2019",
                title: "Research & Development",
                desc: "Our team began developing the AI algorithms that would power our platform.",
              },
              {
                year: "2020",
                title: "Clinical Trials",
                desc: "Rigorous testing and validation with dermatologists and patients.",
              },
              {
                year: "2021",
                title: "Platform Launch",
                desc: "DermaScan officially launched to the public, revolutionizing skin care.",
              },
              {
                year: "2023",
                title: "Global Expansion",
                desc: "Expanding our services to reach users worldwide with localized support.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <div className="text-primary font-bold text-xl">{item.year}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center z-10">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-16 bg-muted/20 relative">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real stories from people who've transformed their skincare journey with DermaScan
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 animate-section">
            {[
              {
                name: "Emily Chen",
                image: "/placeholder.svg?height=100&width=100&text=EC",
                quote: "DermaScan identified my skin condition when three dermatologists couldn't. Life-changing!",
                rating: 5,
              },
              {
                name: "Michael Rodriguez",
                image: "/placeholder.svg?height=100&width=100&text=MR",
                quote: "The personalized skincare routine completely transformed my skin in just 3 weeks.",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                image: "/placeholder.svg?height=100&width=100&text=PS",
                quote:
                  "As someone living in a rural area, having access to dermatologists through DermaScan is invaluable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Verified User</span>
                      <Heart className="h-4 w-4 text-primary fill-primary" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Skin Health</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users who have discovered the power of AI-driven dermatology care.
            </p>
            <Button size="lg" className="enhanced-hover">
              <span className="relative z-10 flex items-center">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
