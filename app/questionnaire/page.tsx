"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowRight, ArrowLeft, Download, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [section, setSection] = useState<"diet" | "skin">("diet")
  const [progress, setProgress] = useState(4.5)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Diet plan form data
  const [dietForm, setDietForm] = useState({
    healthGoal: "",
    activityLevel: "",
    currentDiet: "",
    dietaryRestrictions: "",
    mealsPerDay: "",
    snackPreferences: "",
    eatingOutFrequency: "",
    waterIntake: "",
    mealSuggestions: "",
    energyLevel: "",
    followLikelihood: "",
  })

  // Skincare form data
  const [skinForm, setSkinForm] = useState({
    skinType: "",
    skinConcerns: [] as string[],
    routineFrequency: "",
    currentProducts: [] as string[],
    sunscreen: "",
    timeWilling: "",
    recentIssues: "",
    stressLevel: "",
    environmentExposure: "",
    routinePreference: "",
    followLikelihood: "",
  })

  // Diet plan questions
  const dietQuestions = [
    {
      id: "healthGoal",
      question: "What's your main health goal?",
      options: [
        "Weight loss",
        "Weight gain",
        "Maintain weight",
        "Improve energy",
        "Better nutrition",
        "Manage health condition",
      ],
      type: "radio",
    },
    {
      id: "activityLevel",
      question: "How active are you during the day?",
      options: ["Sedentary", "Lightly active", "Moderately active", "Very active", "Extremely active"],
      type: "radio",
    },
    {
      id: "currentDiet",
      question: "What type of diet do you currently follow?",
      options: ["No specific diet", "Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Gluten-free", "Other"],
      type: "radio",
    },
    {
      id: "dietaryRestrictions",
      question: "Do you have any dietary restrictions or allergies?",
      options: ["None", "Gluten", "Dairy", "Nuts", "Shellfish", "Eggs", "Soy", "Other"],
      type: "radio",
    },
    {
      id: "mealsPerDay",
      question: "How many meals do you eat per day?",
      options: ["1-2", "3", "4-5", "6+"],
      type: "radio",
    },
    {
      id: "snackPreferences",
      question: "What kind of snacks do you prefer?",
      options: ["Sweet", "Savory", "Fruits & vegetables", "Protein-based", "I don't snack"],
      type: "radio",
    },
    {
      id: "eatingOutFrequency",
      question: "How often do you eat out or order in?",
      options: ["Rarely", "1-2 times a week", "3-5 times a week", "Almost every day"],
      type: "radio",
    },
    {
      id: "waterIntake",
      question: "How much water do you drink every day?",
      options: ["Less than 1L", "1-2L", "2-3L", "3L+"],
      type: "radio",
    },
    {
      id: "mealSuggestions",
      question: "Would you like meal or recipe suggestions?",
      options: ["Yes, detailed recipes", "Yes, simple meal ideas", "No, just general guidelines"],
      type: "radio",
    },
    {
      id: "energyLevel",
      question: "How would you describe your daily energy level?",
      options: ["Low throughout the day", "Fluctuates significantly", "Moderate and stable", "High most of the day"],
      type: "radio",
    },
    {
      id: "followLikelihood",
      question: "How likely are you to follow the personalized diet plan we give you?",
      options: ["Very likely", "I'll try my best", "Not sure yet"],
      type: "radio",
    },
  ]

  // Skincare questions
  const skinQuestions = [
    {
      id: "skinType",
      question: "What is your skin type?",
      options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"],
      type: "radio",
    },
    {
      id: "skinConcerns",
      question: "What are your top skin concerns? (Select all that apply)",
      options: [
        "Acne",
        "Aging/Fine lines",
        "Dark spots",
        "Dryness",
        "Redness",
        "Uneven texture",
        "Enlarged pores",
        "Dullness",
      ],
      type: "checkbox",
    },
    {
      id: "routineFrequency",
      question: "How often do you follow a skincare routine?",
      options: ["Every day, morning and night", "Once a day", "A few times a week", "Rarely", "Never"],
      type: "radio",
    },
    {
      id: "currentProducts",
      question: "Which skincare products do you currently use? (Select all that apply)",
      options: [
        "Cleanser",
        "Toner",
        "Serum",
        "Moisturizer",
        "Sunscreen",
        "Eye cream",
        "Face mask",
        "Exfoliator",
        "None",
      ],
      type: "checkbox",
    },
    {
      id: "sunscreen",
      question: "Do you apply sunscreen every day?",
      options: ["Yes, always", "Only when it's sunny", "Rarely", "Never"],
      type: "radio",
    },
    {
      id: "timeWilling",
      question: "How much time are you willing to spend on skincare?",
      options: ["Just a few minutes", "5-10 minutes", "10-20 minutes", "20+ minutes"],
      type: "radio",
    },
    {
      id: "recentIssues",
      question: "Have you experienced any skin issues recently?",
      options: ["Breakouts", "Dryness/Flaking", "Redness/Irritation", "Oiliness", "None"],
      type: "radio",
    },
    {
      id: "stressLevel",
      question: "How would you describe your current stress level?",
      options: ["Low", "Moderate", "High", "Very high"],
      type: "radio",
    },
    {
      id: "environmentExposure",
      question: "How exposed are you to pollution or sunlight daily?",
      options: ["Minimal exposure", "Moderate exposure", "High exposure"],
      type: "radio",
    },
    {
      id: "routinePreference",
      question: "What type of skincare routine do you prefer?",
      options: ["Minimal (3 steps or less)", "Moderate (4-6 steps)", "Comprehensive (7+ steps)"],
      type: "radio",
    },
    {
      id: "followLikelihood",
      question: "How likely are you to follow the personalized skincare plan we recommend?",
      options: ["Very likely", "I'll try to be consistent", "Not sure yet"],
      type: "radio",
    },
  ]

  const totalDietSteps = dietQuestions.length
  const totalSkinSteps = skinQuestions.length
  const totalSteps = totalDietSteps + totalSkinSteps

  useEffect(() => {
    // Update progress based on current step and section
    if (section === "diet") {
      setProgress((currentStep / totalSteps) * 100)
    } else {
      setProgress(((totalDietSteps + currentStep) / totalSteps) * 100)
    }
  }, [currentStep, section, totalDietSteps, totalSteps])

  const handleNext = () => {
    // Check if current question is answered
    if (section === "diet") {
      const currentQuestion = dietQuestions[currentStep - 1]
      if (currentQuestion.type === "radio" && !dietForm[currentQuestion.id as keyof typeof dietForm]) {
        // If not answered, don't proceed
        return
      }
    } else {
      const currentQuestion = skinQuestions[currentStep - 1]
      if (
        (currentQuestion.type === "radio" && !skinForm[currentQuestion.id as keyof typeof skinForm]) ||
        (currentQuestion.type === "checkbox" &&
          Array.isArray(skinForm[currentQuestion.id as keyof typeof skinForm]) &&
          (skinForm[currentQuestion.id as keyof typeof skinForm] as string[]).length === 0)
      ) {
        // If not answered, don't proceed
        return
      }
    }

    if (section === "diet" && currentStep < totalDietSteps) {
      // Still in diet section
      setCurrentStep(currentStep + 1)
    } else if (section === "diet" && currentStep === totalDietSteps) {
      // Finished diet section, move to skin section
      setSection("skin")
      setCurrentStep(1)
    } else if (section === "skin" && currentStep < totalSkinSteps) {
      // Still in skin section
      setCurrentStep(currentStep + 1)
    } else {
      // Completed both sections
      setShowConfetti(true)
      setTimeout(() => {
        setIsComplete(true)
      }, 1000)
    }
  }

  const handlePrevious = () => {
    if (section === "diet" && currentStep > 1) {
      // Still in diet section
      setCurrentStep(currentStep - 1)
    } else if (section === "diet" && currentStep === 1) {
      // Can't go back further in diet section
      return
    } else if (section === "skin" && currentStep > 1) {
      // Still in skin section
      setCurrentStep(currentStep - 1)
    } else if (section === "skin" && currentStep === 1) {
      // Go back to diet section
      setSection("diet")
      setCurrentStep(totalDietSteps)
    }
  }

  const handleDietChange = (field: string, value: string) => {
    setDietForm({
      ...dietForm,
      [field]: value,
    })
  }

  const handleSkinChange = (field: string, value: string) => {
    setSkinForm({
      ...skinForm,
      [field]: value,
    })
  }

  const handleSkinCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (checked) {
      setSkinForm({
        ...skinForm,
        [field]: [...(skinForm[field as keyof typeof skinForm] as string[]), value],
      })
    } else {
      setSkinForm({
        ...skinForm,
        [field]: (skinForm[field as keyof typeof skinForm] as string[]).filter((item) => item !== value),
      })
    }
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    // For demo purposes, we'll just redirect to the analysis page
    setTimeout(() => {
      router.push("/analysis")
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  if (isComplete) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center grid-bg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border border-gray-700 bg-gray-800/95 backdrop-blur-lg text-white">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Your Personalized Plans Are Ready!
              </CardTitle>
              <CardDescription className="text-gray-300">
                We've created custom recommendations just for you
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-300">
                Based on your responses, we've crafted a personalized diet plan and skincare routine designed
                specifically for your needs.
              </p>
              <div className="flex justify-center">
                <Button
                  className="enhanced-hover bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0 flex items-center gap-2"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4" />
                  Download Your Plans
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => router.push("/analysis")}
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Get current question based on section and step
  const currentQuestion = section === "diet" ? dietQuestions[currentStep - 1] : skinQuestions[currentStep - 1]
  const sectionTitle = section === "diet" ? "Diet Plan Questionnaire" : "Skin Care Routine Questionnaire"
  const sectionIcon = section === "diet" ? "🥗" : "💆‍♀️"
  const sectionColor = section === "diet" ? "from-emerald-600 to-teal-600" : "from-pink-600 to-purple-600"

  return (
    <div className="min-h-screen py-10 px-4 grid-bg text-white">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* This would be where confetti animation would go in a real implementation */}
        </div>
      )}

      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="text-2xl">{sectionIcon}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              {sectionTitle}
            </span>
          </h1>
          <p className="text-gray-400">Help us create your personalized plan</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span>
              Step {section === "diet" ? currentStep : totalDietSteps + currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${sectionColor}`}
              style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
            ></div>
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${section === "diet" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-gray-700"}`}
              >
                <span className="text-xs">🥗</span>
              </div>
              <div
                className={`h-1 w-16 ${section === "diet" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-gray-700"}`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${section === "skin" ? "bg-gradient-to-r from-pink-600 to-purple-600" : "bg-gray-700"}`}
              >
                <span className="text-xs">💆‍♀️</span>
              </div>
              <div
                className={`h-1 w-16 ${section === "skin" && currentStep === totalSkinSteps ? "bg-gradient-to-r from-pink-600 to-purple-600" : "bg-gray-700"}`}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isComplete ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gray-700"}`}
            >
              <span className="text-xs">✨</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${section}-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-700 bg-gray-800/95 backdrop-blur-lg text-white shadow-xl">
              <CardHeader>
                <CardTitle
                  className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${sectionColor}`}
                >
                  {currentQuestion?.question}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {currentQuestion?.type === "checkbox"
                    ? "Select all that apply"
                    : "Select the option that best applies to you"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {section === "diet" && currentQuestion?.type === "radio" && (
                  <RadioGroup
                    value={dietForm[currentQuestion?.id as keyof typeof dietForm] as string}
                    onValueChange={(value) => handleDietChange(currentQuestion?.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion?.options.map((option, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-all cursor-pointer"
                        onClick={() => handleDietChange(currentQuestion?.id, option)}
                      >
                        <RadioGroupItem
                          value={option}
                          id={`diet-${currentQuestion?.id}-${index}`}
                          className="text-emerald-500 border-gray-600"
                        />
                        <Label
                          htmlFor={`diet-${currentQuestion?.id}-${index}`}
                          className="cursor-pointer text-gray-200 font-medium flex-1"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                )}

                {section === "skin" && currentQuestion?.type === "radio" && (
                  <RadioGroup
                    value={skinForm[currentQuestion?.id as keyof typeof skinForm] as string}
                    onValueChange={(value) => handleSkinChange(currentQuestion?.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion?.options.map((option, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-all cursor-pointer"
                        onClick={() => handleSkinChange(currentQuestion?.id, option)}
                      >
                        <RadioGroupItem
                          value={option}
                          id={`skin-${currentQuestion?.id}-${index}`}
                          className="text-pink-500 border-gray-600"
                        />
                        <Label
                          htmlFor={`skin-${currentQuestion?.id}-${index}`}
                          className="cursor-pointer text-gray-200 font-medium flex-1"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                )}

                {section === "skin" && currentQuestion?.type === "checkbox" && (
                  <div className="space-y-3">
                    {currentQuestion?.options.map((option, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-all cursor-pointer"
                        onClick={() => {
                          const currentValues = skinForm[currentQuestion?.id as keyof typeof skinForm] as string[]
                          const isSelected = currentValues.includes(option)
                          handleSkinCheckboxChange(currentQuestion?.id, option, !isSelected)
                        }}
                      >
                        <Checkbox
                          id={`skin-${currentQuestion?.id}-${index}`}
                          checked={(skinForm[currentQuestion?.id as keyof typeof skinForm] as string[]).includes(
                            option,
                          )}
                          onCheckedChange={(checked) => {
                            handleSkinCheckboxChange(currentQuestion?.id, option, checked as boolean)
                          }}
                          className="text-pink-500 border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                        />
                        <Label
                          htmlFor={`skin-${currentQuestion?.id}-${index}`}
                          className="cursor-pointer text-gray-200 font-medium flex-1"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={section === "diet" && currentStep === 1}
                  className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className={`enhanced-hover flex items-center gap-2 border-0 text-white bg-gradient-to-r ${sectionColor}`}
                  disabled={
                    (section === "diet" && !dietForm[currentQuestion?.id as keyof typeof dietForm]) ||
                    (section === "skin" &&
                      currentQuestion?.type === "radio" &&
                      !skinForm[currentQuestion?.id as keyof typeof skinForm]) ||
                    (section === "skin" &&
                      currentQuestion?.type === "checkbox" &&
                      Array.isArray(skinForm[currentQuestion?.id as keyof typeof skinForm]) &&
                      (skinForm[currentQuestion?.id as keyof typeof skinForm] as string[]).length === 0)
                  }
                >
                  {section === "skin" && currentStep === totalSkinSteps ? (
                    <>
                      Complete <Sparkles className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
