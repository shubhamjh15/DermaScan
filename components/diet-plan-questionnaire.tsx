"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DietPlanQuestionnaireProps {
  plan: string | null
  onClose: () => void
}

export const DietPlanQuestionnaire = ({ plan, onClose }: DietPlanQuestionnaireProps) => {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border border-primary/20 bg-card/95 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {plan === "premium" ? "Premium Diet Plan" : "Basic Diet Plan"} Questionnaire
          </DialogTitle>
          <DialogDescription>Answer a few questions to personalize your diet plan.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div>
              <p>Question 1: What are your dietary restrictions?</p>
              {/* Add form elements here */}
            </div>
          )}

          {step === 2 && (
            <div>
              <p>Question 2: What are your favorite foods?</p>
              {/* Add form elements here */}
            </div>
          )}

          {step === 3 && (
            <div>
              <p>Question 3: What are your fitness goals?</p>
              {/* Add form elements here */}
            </div>
          )}
        </div>

        <DialogFooter>
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
