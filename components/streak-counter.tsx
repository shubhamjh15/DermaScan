"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Calendar, Star, TrendingUp } from "lucide-react"
import confetti from "canvas-confetti"

export default function StreakCounter() {
  const [streak, setStreak] = useState(6)
  const [goal, setGoal] = useState(7)
  const [showCelebration, setShowCelebration] = useState(false)

  // Get streak from localStorage (set by SimpleSleepTracker)
  useEffect(() => {
    const storedStreak = window.localStorage.getItem("sleepStreak")
    if (storedStreak) {
      setStreak(Number.parseInt(storedStreak))
    }
  }, [])

  // Check if goal reached
  useEffect(() => {
    if (streak >= goal && !showCelebration) {
      setShowCelebration(true)
      celebrateGoal()

      // Reset celebration after 5 seconds
      setTimeout(() => {
        setShowCelebration(false)
      }, 5000)
    }
  }, [streak, goal, showCelebration])

  const celebrateGoal = () => {
    // First burst of confetti
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    }

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#cb0c62", "#00f2ff"],
    })
    fire(0.2, {
      spread: 60,
      colors: ["#cb0c62", "#9d00ff"],
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#00f2ff", "#9d00ff"],
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#cb0c62", "#00f2ff", "#9d00ff"],
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#cb0c62", "#00f2ff", "#9d00ff"],
    })
  }

  const incrementStreak = () => {
    setStreak((prev) => prev + 1)
    window.localStorage.setItem("sleepStreak", (streak + 1).toString())

    // Simple confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#cb0c62", "#00f2ff", "#9d00ff"],
    })
  }

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
      <CardHeader>
        <CardTitle>Streak Tracker</CardTitle>
        <CardDescription>Build consistent sleep habits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="relative">
            <motion.div
              animate={
                showCelebration
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5, repeat: showCelebration ? 2 : 0 }}
              className="h-32 w-32 rounded-full bg-primary/10 border-4 border-primary/30 flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-bold text-primary">{streak}</span>
              <span className="text-xs text-muted-foreground">days</span>
            </motion.div>

            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center"
              >
                <Award className="h-5 w-5 text-primary-foreground" />
              </motion.div>
            )}
          </div>

          <div className="w-full space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Goal: {goal} days</span>
                <span>
                  {Math.min(streak, goal)}/{goal}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min((streak / goal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {showCelebration ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center"
              >
                <p className="text-sm font-medium text-primary">Goal achieved! 🎉</p>
                <p className="text-xs text-muted-foreground">Your skin will thank you!</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Calendar className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">
                    {streak < goal
                      ? `${goal - streak} more days to reach your goal!`
                      : "Set a new goal to keep improving"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">Consistent sleep improves skin texture and tone</span>
                </div>
              </div>
            )}

            <Button onClick={incrementStreak} className="w-full">
              <Star className="mr-2 h-4 w-4" />
              Test Streak Animation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
