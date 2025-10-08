"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, subDays, isSameDay } from "date-fns"
import { CalendarIcon, Moon, Plus, Save, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample sleep data for the past week
const sampleSleepData = [
  { date: subDays(new Date(), 6), bedtime: "23:30", wakeTime: "07:15", quality: 4, duration: 7.75 },
  { date: subDays(new Date(), 5), bedtime: "00:15", wakeTime: "08:00", quality: 3, duration: 7.75 },
  { date: subDays(new Date(), 4), bedtime: "23:00", wakeTime: "06:45", quality: 5, duration: 7.75 },
  { date: subDays(new Date(), 3), bedtime: "23:45", wakeTime: "07:30", quality: 4, duration: 7.75 },
  { date: subDays(new Date(), 2), bedtime: "22:30", wakeTime: "06:30", quality: 5, duration: 8 },
  { date: subDays(new Date(), 1), bedtime: "01:00", wakeTime: "08:30", quality: 2, duration: 7.5 },
  { date: new Date(), bedtime: "23:15", wakeTime: "07:00", quality: 4, duration: 7.75 },
]

export default function SleepTracker() {
  const [date, setDate] = useState<Date>(new Date())
  const [bedtime, setBedtime] = useState("23:00")
  const [wakeTime, setWakeTime] = useState("07:00")
  const [quality, setQuality] = useState<number[]>([4])
  const [sleepData, setSleepData] = useState(sampleSleepData)

  const handleSaveEntry = () => {
    // Calculate duration
    const bedHour = Number.parseInt(bedtime.split(":")[0])
    const bedMinute = Number.parseInt(bedtime.split(":")[1])
    const wakeHour = Number.parseInt(wakeTime.split(":")[0])
    const wakeMinute = Number.parseInt(wakeTime.split(":")[1])

    let duration = wakeHour - bedHour + (wakeMinute - bedMinute) / 60
    if (duration < 0) duration += 24 // Handle overnight sleep

    // Create new entry
    const newEntry = {
      date: date,
      bedtime,
      wakeTime,
      quality: quality[0],
      duration,
    }

    // Update data (replace if same day exists)
    const updatedData = sleepData.filter((entry) => !isSameDay(entry.date, date))
    setSleepData([...updatedData, newEntry].sort((a, b) => a.date.getTime() - b.date.getTime()))
  }

  // Calculate average sleep metrics
  const avgDuration = sleepData.reduce((sum, entry) => sum + entry.duration, 0) / sleepData.length
  const avgQuality = sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
          <CardHeader>
            <CardTitle>Sleep Log</CardTitle>
            <CardDescription>Track your sleep patterns to optimize your skincare routine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-border/50 bg-background/50"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Bedtime</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="border-border/50 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wakeTime">Wake Time</Label>
                    <Input
                      id="wakeTime"
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="border-border/50 bg-background/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="quality">Sleep Quality</Label>
                  <span className="text-sm text-muted-foreground">{quality[0]}/5</span>
                </div>
                <Slider
                  id="quality"
                  min={1}
                  max={5}
                  step={1}
                  value={quality}
                  onValueChange={setQuality}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <Button onClick={handleSaveEntry} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Sleep Entry
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Recent Sleep Log</h3>
              <div className="space-y-4">
                {sleepData
                  .slice(-5)
                  .reverse()
                  .map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-background/40 border border-border/20"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Moon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="font-medium">{format(entry.date, "EEE, MMM d")}</p>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  i < entry.quality ? "text-primary fill-primary" : "text-muted-foreground",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            <Clock className="inline h-3.5 w-3.5 mr-1" />
                            {entry.bedtime} - {entry.wakeTime}
                          </span>
                          <span>{entry.duration.toFixed(1)} hrs</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
          <CardHeader>
            <CardTitle>Sleep Summary</CardTitle>
            <CardDescription>Your sleep metrics and skin impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Average Sleep Duration</span>
                  <span className="text-sm text-primary">{avgDuration.toFixed(1)} hrs</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(avgDuration / 9) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {avgDuration >= 7
                    ? "Optimal for skin cell regeneration"
                    : "Increase sleep time for better skin repair"}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Sleep Quality</span>
                  <span className="text-sm text-primary">{avgQuality.toFixed(1)}/5</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(avgQuality / 5) * 100}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {avgQuality >= 4
                    ? "Great quality sleep supports collagen production"
                    : "Improve sleep quality for better skin texture"}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Sleep Consistency</span>
                  <span className="text-sm text-primary">Moderate</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  More consistent sleep times will help regulate hormones that affect skin
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium mb-3">Skin Impact Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Plus className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Your sleep pattern is supporting good hydration levels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Plus className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Recent consistent sleep is reducing inflammation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Plus className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">More deep sleep could improve under-eye appearance</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
