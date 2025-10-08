"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, Star, Shield, Zap, ArrowRight } from "lucide-react"
import PaymentModal from "@/components/payment-modal"
import { useRouter } from "next/navigation"

export default function PricingSection() {
  const router = useRouter()
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({ name: "", amount: "" })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handlePlanSelection = (planName: string, amount: string) => {
    setSelectedPlan({ name: planName, amount })
    setPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false)
    setPaymentSuccess(true)
    // Redirect to questionnaire page after successful payment
    setTimeout(() => {
      router.push("/questionnaire")
    }, 1500)
  }

  const plans = [
    {
      id: 1,
      name: "Derma Basic",
      price: "₹50",
      period: "/month",
      icon: <Shield className="h-6 w-6 text-primary" />,
      features: ["5 AI Skin Scans", "Basic Weekly Skin Care Routine", "Basic Weekly Diet Plan"],
      popular: false,
      comingSoon: false,
    },
    {
      id: 2,
      name: "Derma Plus",
      price: "₹199",
      period: "/month",
      icon: <Star className="h-6 w-6 text-primary" />,
      features: [
        "10 AI Skin Scans",
        "Personalized Skin Care Routine",
        "Personalized Diet Plan",
        "Beauty Analysis",
        "Community Support",
      ],
      popular: true,
      comingSoon: false,
    },
    {
      id: 3,
      name: "Derma Prime",
      price: "₹5000",
      period: "/month",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      features: [],
      popular: false,
      comingSoon: true,
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1.5 text-sm">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select the perfect plan for your skincare journey
          </p>
        </motion.div>

        {/* Interactive pricing cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredCard(plan.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="h-full"
            >
              <Card
                className={`h-full relative overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-primary/10 hover:border-primary/30 hover:shadow-lg"
                } ${hoveredCard === plan.id ? "bg-card/80" : "bg-card/60"} backdrop-blur-sm`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-bl-lg rounded-tr-lg bg-primary text-primary-foreground px-3 py-1.5">
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 ${
                    hoveredCard === plan.id ? "opacity-100" : ""
                  }`}
                ></div>

                <CardHeader className="pb-4 text-left relative z-10">
                  <motion.div
                    className="mb-2 flex"
                    animate={hoveredCard === plan.id ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-full bg-primary/10 p-2">{plan.icon}</div>
                  </motion.div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-xl font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="pb-6 pt-2 relative z-10">
                  {plan.comingSoon ? (
                    <div className="flex flex-col items-center justify-center space-y-4 h-[180px]">
                      <Badge variant="outline" className="border-primary/50 text-primary mb-2">
                        Coming Soon
                      </Badge>
                      <Zap className="h-12 w-12 text-primary/50" />
                      <p className="text-center text-muted-foreground">
                        Our premium plan with exclusive features is coming soon. Stay tuned for updates!
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-3 text-left min-h-[180px]">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -5 }}
                          animate={hoveredCard === plan.id ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        >
                          <CheckCircle
                            className={`h-5 w-5 mt-0.5 text-primary flex-shrink-0 ${
                              hoveredCard === plan.id ? "text-primary" : "text-primary/80"
                            }`}
                          />
                          <span className="text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter className="pt-2 relative z-10">
                  {plan.comingSoon ? (
                    <Button className="w-full py-6 text-base" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      className={`w-full py-6 text-base group relative overflow-hidden ${
                        plan.popular ? "bg-primary hover:bg-primary/90" : ""
                      }`}
                      onClick={() => handlePlanSelection(plan.name, plan.price + plan.period)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-x-[-8px]">
                        Subscribe Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">All plans include a 7-day free trial. Cancel anytime.</p>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        amount={selectedPlan.amount}
        planName={selectedPlan.name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </section>
  )
}
