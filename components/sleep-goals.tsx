"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Moon, Clock, Award, Calendar, Plus, Check, Trash2 } from "lucide-react"

export default function SleepGoals() {
  const [goals, setGoals] = useState([
    { id: 1, title: "8 hours of sleep", target: "8 hours", progress: 75, streak: 5 },
    { id: 2, title: "Consistent bedtime", target: "11:00 PM ±30min", progress: 60, streak: 3 },
    { id: 3, title: "No screen time before bed", target: "1 hour before sleep", progress: 40, streak: 2 },
  ])

  const [reminders, setReminders] = useState([
    { id: 1, title: "Bedtime reminder", time: "10:30 PM", days: ["Mon", "Tue", "Wed", "Thu", "Sun"], active: true },
    { id: 2, title: "Evening skincare routine", time: "9:45 PM", days: ["Every day"], active: true },
    { id: 3, title: "Sleep tracking reminder", time: "7:15 AM", days: ["Every day"], active: false },
  ])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
          <CardHeader>
            <CardTitle>Sleep Goals</CardTitle>
            <CardDescription>Set and track your sleep goals for better skin health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-background/40 border border-border/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-xs text-muted-foreground">Target: {goal.target}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/50 text-primary flex items-center gap-1">
                      <Award className="h-3 w-3" /> {goal.streak} day streak
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm" className="h-8 px-2 border-border/50">
                      <Check className="h-3.5 w-3.5 mr-1" /> Log Progress
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              <div className="p-4 rounded-lg border border-dashed border-border/50 flex items-center justify-center">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-4 w-4" /> Add New Goal
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h3 className="font-medium mb-3">Skin Benefits of Your Goals</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Moon className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">8 hours of sleep maximizes collagen production</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Consistent bedtime regulates hormones that affect acne</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Calendar className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Reducing screen time decreases blue light skin damage</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
          <CardHeader>
            <CardTitle>Sleep & Skincare Reminders</CardTitle>
            <CardDescription>Set reminders for better sleep and skincare habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-background/40 border border-border/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{reminder.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {reminder.time} • {reminder.days.join(", ")}
                        </p>
                      </div>
                    </div>
                    <Switch checked={reminder.active} />
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              <div className="space-y-4 p-4 rounded-lg border border-dashed border-border/50">
                <h3 className="font-medium">Add New Reminder</h3>

                <div className="space-y-2">
                  <Label htmlFor="reminder-title">Reminder Title</Label>
                  <Input
                    id="reminder-title"
                    placeholder="e.g., Bedtime reminder"
                    className="border-border/50 bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-time">Time</Label>
                    <Input
                      id="reminder-time"
                      type="time"
                      defaultValue="22:00"
                      className="border-border/50 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminder-frequency">Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="reminder-frequency" className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Every day</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Reminder
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h3 className="font-medium mb-3">Reminder Tips</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Bell className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Set a reminder 1-2 hours before bedtime for evening skincare</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Bell className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Morning reminders help track sleep quality while it's fresh</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Bell className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Consistent reminders help build long-term sleep habits</span>
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
