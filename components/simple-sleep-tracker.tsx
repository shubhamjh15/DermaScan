"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, isSameDay, subDays } from "date-fns"
import { Moon, Sun, Save, Clock, Star, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

// Sample sleep data for the past week
const initialSleepData = [
  { date: subDays(new Date(), 6), bedtime: "23:30", wakeTime: "07:15", duration: 7.75 },
  { date: subDays(new Date(), 5), bedtime: "00:15", wakeTime: "08:00", duration: 7.75 },
  { date: subDays(new Date(), 4), bedtime: "23:00", wakeTime: "06:45", duration: 7.75 },
  { date: subDays(new Date(), 3), bedtime: "23:45", wakeTime: "07:30", duration: 7.75 },
  { date: subDays(new Date(), 2), bedtime: "22:30", wakeTime: "06:30", duration: 8 },
  { date: subDays(new Date(), 1), bedtime: "01:00", wakeTime: "08:30", duration: 7.5 },
]

export default function SimpleSleepTracker() {
  const [bedtime, setBedtime] = useState("23:00")
  const [wakeTime, setWakeTime] = useState("07:00")
  const [sleepData, setSleepData] = useState(initialSleepData)
  const [showSuccess, setShowSuccess] = useState(false)
  const [streakCount, setStreakCount] = useState(6)

  // Calculate sleep duration
  const calculateDuration = (bed: string, wake: string) => {
    const bedHour = Number.parseInt(bed.split(":")[0])
    const bedMinute = Number.parseInt(bed.split(":")[1])
    const wakeHour = Number.parseInt(wake.split(":")[0])
    const wakeMinute = Number.parseInt(wake.split(":")[1])

    let duration = wakeHour - bedHour + (wakeMinute - bedMinute) / 60
    if (duration < 0) duration += 24 // Handle overnight sleep

    return duration
  }

  const handleSaveEntry = () => {
    // Calculate duration
    const duration = calculateDuration(bedtime, wakeTime)

    // Create new entry
    const newEntry = {
      date: new Date(),
      bedtime,
      wakeTime,
      duration,
    }

    // Update data (replace if same day exists)
    const updatedData = sleepData.filter((entry) => !isSameDay(entry.date, new Date()))
    setSleepData([...updatedData, newEntry].sort((a, b) => a.date.getTime() - b.date.getTime()))

    // Show success message
    setShowSuccess(true)

    // Update streak
    const yesterday = subDays(new Date(), 1)
    const hasYesterdayEntry = sleepData.some((entry) => isSameDay(entry.date, yesterday))

    if (hasYesterdayEntry) {
      setStreakCount((prev) => prev + 1)

      // Trigger confetti for streak
      triggerConfetti()
    }

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const triggerConfetti = () => {
    const duration = 2 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#cb0c62", "#00f2ff", "#9d00ff"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#cb0c62", "#00f2ff", "#9d00ff"],
      })
    }, 250)
  }

  // Calculate average sleep duration
  const avgDuration = sleepData.reduce((sum, entry) => sum + entry.duration, 0) / sleepData.length

  // Share streak with parent component
  useEffect(() => {
    // This would typically use a context or prop function to share data
    window.localStorage.setItem("sleepStreak", streakCount.toString())
  }, [streakCount])

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
      <CardHeader>
        <CardTitle>Sleep Log</CardTitle>
        <CardDescription>Track your sleep to optimize your skincare routine</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bedtime" className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" /> Bedtime
              </Label>
              <Input
                id="bedtime"
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="border-border/50 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wakeTime" className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" /> Wake Time
              </Label>
              <Input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="border-border/50 bg-background/50"
              />
            </div>
          </div>

          <Button onClick={handleSaveEntry} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Log Sleep
          </Button>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center"
            >
              <p className="text-sm font-medium text-primary">Sleep logged successfully!</p>
              <p className="text-xs text-muted-foreground">Your skincare routine has been optimized.</p>
            </motion.div>
          )}

          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Sleep</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Avg: {avgDuration.toFixed(1)} hrs</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {sleepData.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex flex-col items-center p-2 rounded-lg bg-background/40 border border-border/20"
                >
                  <span className="text-xs text-muted-foreground mb-1">{format(entry.date, "EEE")}</span>
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium",
                      entry.duration >= 7 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {entry.duration.toFixed(1)}
                  </div>
                  <span className="text-xs mt-1">{format(entry.date, "d")}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <h3 className="font-medium mb-3">Sleep Insights</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">
                  {avgDuration >= 7
                    ? "Your sleep duration is optimal for skin repair"
                    : "Try to get at least 7 hours of sleep for better skin"}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                  <Calendar className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">
                  {streakCount > 3
                    ? `Great job! ${streakCount} day streak of logging sleep`
                    : "Build a streak by logging sleep daily"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
