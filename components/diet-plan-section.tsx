"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Utensils, Clock, Calendar, ArrowRight } from "lucide-react"
import { DietPlanQuestionnaire } from "./diet-plan-questionnaire"

export function DietPlanSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
    setShowQuestionnaire(true)
  }

  const handleCloseQuestionnaire = () => {
    setShowQuestionnaire(false)
  }

  const plans = [
    {
      title: "Basic Diet Plan",
      description: "Perfect for beginners looking to improve their eating habits",
      features: ["Personalized meal suggestions", "Basic nutritional guidance", "Weekly meal planning template"],
      price: "$9.99",
      id: "basic",
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Premium Diet Plan",
      description: "Comprehensive nutrition plan for optimal health and wellness",
      features: [
        "Detailed macro and micronutrient analysis",
        "Custom meal plans based on your preferences",
        "Grocery shopping lists",
        "Recipe database access",
        "Nutritionist consultation",
      ],
      price: "$19.99",
      id: "premium",
      color: "from-pink-600 to-purple-600",
      popular: true,
    },
  ]

  return (
    <section className="py-16 grid-bg relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Personalized Diet Plans
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get a customized diet plan tailored to your unique needs and goals. Our AI-powered system analyzes your
            preferences and creates the perfect nutrition strategy for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border border-gray-700 bg-gray-800/95 backdrop-blur-lg text-white overflow-hidden card-hover">
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-pink-400" />
                    {plan.title}
                  </CardTitle>
                  <div className="mt-2 text-gray-300 text-sm">{plan.description}</div>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-pink-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 ml-1">/month</span>
                    </div>
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full enhanced-hover bg-gradient-to-r ${plan.color} text-white border-0 flex items-center justify-center gap-2`}
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="h-5 w-5 text-pink-400" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="h-5 w-5 text-pink-400" />
              <span>Monthly Updates</span>
            </div>
          </div>
        </div>
      </div>

      {showQuestionnaire && <DietPlanQuestionnaire plan={selectedPlan} onClose={handleCloseQuestionnaire} />}
    </section>
  )
}
