"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Sun, Moon, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PersonalizedRoutine() {
  const [activeTab, setActiveTab] = useState("daily")

  const routineSteps = {
    daily: [
      {
        id: "morning",
        title: "Morning Routine",
        icon: <Sun className="h-5 w-5 text-yellow-400" />,
        steps: [
          {
            id: 1,
            name: "Gentle Cleanser",
            description: "Start with a pH-balanced cleanser to remove overnight buildup",
            time: "1 min",
          },
          {
            id: 2,
            name: "Vitamin C Serum",
            description: "Apply antioxidant serum to protect against environmental damage",
            time: "30 sec",
          },
          {
            id: 3,
            name: "Hydrating Moisturizer",
            description: "Lock in hydration with a lightweight gel moisturizer",
            time: "30 sec",
          },
          { id: 4, name: "SPF Protection", description: "Finish with broad-spectrum SPF 50 sunscreen", time: "1 min" },
        ],
      },
      {
        id: "evening",
        title: "Evening Routine",
        icon: <Moon className="h-5 w-5 text-indigo-300" />,
        steps: [
          {
            id: 1,
            name: "Double Cleanse",
            description: "Oil-based cleanser followed by water-based cleanser",
            time: "2 min",
          },
          {
            id: 2,
            name: "Exfoliating Toner",
            description: "Use 2-3 times weekly to remove dead skin cells",
            time: "30 sec",
          },
          {
            id: 3,
            name: "Retinol Treatment",
            description: "Apply pea-sized amount to promote cell turnover",
            time: "30 sec",
          },
          {
            id: 4,
            name: "Nourishing Night Cream",
            description: "Seal in treatments with a rich moisturizer",
            time: "1 min",
          },
        ],
      },
    ],
    weekly: [
      {
        id: "treatments",
        title: "Weekly Treatments",
        icon: <Sparkles className="h-5 w-5 text-purple-400" />,
        steps: [
          {
            id: 1,
            name: "Clay Mask",
            description: "Deep cleanse with kaolin clay mask to detoxify pores",
            day: "Monday",
          },
          {
            id: 2,
            name: "Chemical Exfoliation",
            description: "AHA/BHA treatment to remove dead skin cells",
            day: "Wednesday",
          },
          {
            id: 3,
            name: "Hydrating Sheet Mask",
            description: "Intense hydration with hyaluronic acid mask",
            day: "Friday",
          },
          { id: 4, name: "Facial Massage", description: "Lymphatic drainage massage with facial oil", day: "Sunday" },
        ],
      },
    ],
    monthly: [
      {
        id: "goals",
        title: "Monthly Goals",
        icon: <Shield className="h-5 w-5 text-emerald-400" />,
        steps: [
          {
            id: 1,
            name: "Skin Barrier Repair",
            description: "Focus on strengthening your moisture barrier",
            progress: 65,
          },
          {
            id: 2,
            name: "Hyperpigmentation Reduction",
            description: "Target dark spots with brightening ingredients",
            progress: 40,
          },
          {
            id: 3,
            name: "Texture Improvement",
            description: "Smooth uneven texture with consistent exfoliation",
            progress: 75,
          },
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle Adjustments",
        icon: <Droplets className="h-5 w-5 text-blue-400" />,
        steps: [
          { id: 1, name: "Hydration Tracking", description: "Increase water intake to 2.5L daily", progress: 80 },
          { id: 2, name: "Sleep Quality", description: "Maintain 7-8 hours of quality sleep", progress: 60 },
          { id: 3, name: "Stress Management", description: "Practice daily meditation for skin health", progress: 45 },
        ],
      },
    ],
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="daily" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="daily" className="data-[state=active]:bg-primary/20">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-primary/20">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary/20">
              Monthly
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            {routineSteps.daily.map((routine) => (
              <Card key={routine.id} className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    {routine.icon}
                    {routine.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routine.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-lg bg-background/40"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {step.id}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{step.name}</h4>
                            <Badge variant="outline" className="text-xs border-primary/30">
                              {step.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <div className="grid gap-6">
            {routineSteps.weekly.map((routine) => (
              <Card key={routine.id} className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    {routine.icon}
                    {routine.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {routine.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-lg bg-background/40"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {step.id}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{step.name}</h4>
                            <Badge variant="outline" className="text-xs border-primary/30">
                              {step.day}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <div className="grid gap-6">
            {routineSteps.monthly.map((routine) => (
              <Card key={routine.id} className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    {routine.icon}
                    {routine.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routine.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-lg bg-background/40"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                          <div className="mt-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${step.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Progress</span>
                              <span>{step.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Link href="/#pricing">
          <Button className="modern-hover-effect">
            <span className="relative z-10 flex items-center">
              Get Your Personalized Routine <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
