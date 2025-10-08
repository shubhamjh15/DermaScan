"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PaymentConfirmation() {
  const [isPaying, setIsPaying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = () => {
    setIsPaying(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto border-primary/20 bg-card/95 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Your AI skin scan is ready to proceed.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">Thank you for your payment. You can now continue with your skin analysis.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/analysis">
            <Button className="enhanced-hover">
              Continue to Skin Analysis <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto border-primary/20 bg-card/95 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Complete Your Scan Payment</CardTitle>
        <CardDescription>You've used your free scan. Pay ₹10 for an additional scan.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 p-4 bg-muted/40 rounded-lg">
          <div>
            <p className="font-medium">AI Skin Analysis</p>
            <p className="text-sm text-muted-foreground">1 x Additional Scan</p>
          </div>
          <p className="text-xl font-bold">₹10</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <CreditCard className="h-4 w-4" />
          <span>Demo payment - no actual charge will be made</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button className="enhanced-hover" onClick={handlePayment} disabled={isPaying}>
          {isPaying ? "Processing..." : "Pay ₹10"}
        </Button>
      </CardFooter>
    </Card>
  )
}
