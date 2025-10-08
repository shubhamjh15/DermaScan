"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Droplets, Frown, Smile, ArrowRight, Clock, Calendar, AlertCircle } from "lucide-react"

export default function SleepInsights() {
  const [activeTab, setActiveTab] = useState("skinImpact")

  return (
    <div className="space-y-8">
      <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Sleep & Skin Insights</CardTitle>
              <CardDescription>Personalized analysis of your sleep-skin connection</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">
              Updated Today
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="skinImpact" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="skinImpact" className="data-[state=active]:bg-primary/20">
                Skin Impact
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary/20">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="patterns" className="data-[state=active]:bg-primary/20">
                Sleep Patterns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skinImpact" className="mt-0 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Droplets className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Hydration & Barrier Function</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impact Level</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-5 rounded-full mx-0.5 ${i < 4 ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Your recent sleep patterns show good support for skin barrier function. The consistent 7+ hours
                        of sleep is helping maintain hydration levels.
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Smile className="h-3.5 w-3.5 text-green-500" />
                        </div>
                        <span>Skin barrier strength improved by 15% this week</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Moon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Dark Circles & Puffiness</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impact Level</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-5 rounded-full mx-0.5 ${i < 3 ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Your irregular bedtimes (varying by 2+ hours) may be contributing to under-eye concerns. Late
                        nights on Friday showed correlation with increased puffiness.
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        </div>
                        <span>More consistent bedtimes could reduce puffiness by 30%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sun className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Cellular Regeneration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impact Level</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-5 rounded-full mx-0.5 ${i < 4 ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Your sleep quality ratings (avg 4/5) indicate good deep sleep cycles, supporting optimal
                        cellular turnover and repair processes.
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Smile className="h-3.5 w-3.5 text-green-500" />
                        </div>
                        <span>Cell regeneration estimated at 85% of optimal</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Frown className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Breakouts & Inflammation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impact Level</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-5 rounded-full mx-0.5 ${i < 2 ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Your sleep data shows a pattern of reduced sleep quality before reported breakouts. Stress
                        hormones from poor sleep may be triggering inflammation.
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        </div>
                        <span>Sleep quality improvements could reduce breakouts by 40%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Moon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">PM Skincare Optimization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Based on your typical bedtime (11:15 PM), optimize your evening skincare routine:
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">9:30 PM - Double Cleanse</p>
                            <p className="text-xs text-muted-foreground">
                              Use oil-based cleanser followed by gentle foaming cleanser
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">9:45 PM - Active Treatment</p>
                            <p className="text-xs text-muted-foreground">
                              Apply retinol or AHA/BHA treatment (alternate nights)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">10:30 PM - Hydration & Occlusion</p>
                            <p className="text-xs text-muted-foreground">
                              Layer hydrating serum and rich night cream to lock in moisture
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full border-primary/50 hover:border-primary">
                        Add to Routine <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sun className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">AM Skincare Optimization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Based on your typical wake time (7:15 AM), optimize your morning skincare routine:
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">7:20 AM - Gentle Cleanse</p>
                            <p className="text-xs text-muted-foreground">
                              Use water-based cleanser to refresh without stripping
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">7:25 AM - Antioxidant Protection</p>
                            <p className="text-xs text-muted-foreground">
                              Apply vitamin C serum to brighten and protect from oxidative stress
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">7:30 AM - Hydrate & Protect</p>
                            <p className="text-xs text-muted-foreground">
                              Apply lightweight moisturizer and broad-spectrum SPF 50
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full border-primary/50 hover:border-primary">
                        Add to Routine <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10 md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Weekly Sleep-Optimized Treatments</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Based on your sleep patterns, we've created a weekly treatment schedule to maximize product
                        efficacy:
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="p-3 rounded-lg bg-background/40 border border-border/20">
                          <p className="font-medium mb-1">Monday</p>
                          <p className="text-xs text-muted-foreground mb-2">Sleep Quality: Good</p>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            Hydrating Mask
                          </Badge>
                        </div>

                        <div className="p-3 rounded-lg bg-background/40 border border-border/20">
                          <p className="font-medium mb-1">Wednesday</p>
                          <p className="text-xs text-muted-foreground mb-2">Sleep Quality: Moderate</p>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            Gentle Exfoliation
                          </Badge>
                        </div>

                        <div className="p-3 rounded-lg bg-background/40 border border-border/20">
                          <p className="font-medium mb-1">Friday</p>
                          <p className="text-xs text-muted-foreground mb-2">Sleep Quality: Variable</p>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            Brightening Treatment
                          </Badge>
                        </div>

                        <div className="p-3 rounded-lg bg-background/40 border border-border/20">
                          <p className="font-medium mb-1">Sunday</p>
                          <p className="text-xs text-muted-foreground mb-2">Sleep Quality: Best</p>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            Intensive Repair Mask
                          </Badge>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full border-primary/50 hover:border-primary">
                        Sync to Calendar <Calendar className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="mt-0 space-y-6">
              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle>Sleep Pattern Analysis</CardTitle>
                  <CardDescription>AI-detected patterns in your sleep data and their skin impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-background/40 border border-border/20">
                      <h3 className="text-lg font-medium mb-2">Weekend Sleep Disruption</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your sleep schedule shifts by 2+ hours on Friday and Saturday nights, creating a "social jet
                        lag" effect.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Frown className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Disrupts hormonal balance that regulates oil production</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Frown className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Increases likelihood of Sunday/Monday breakouts</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Frown className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Reduces effectiveness of weekend skincare treatments</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-background/40 border border-border/20">
                      <h3 className="text-lg font-medium mb-2">Consistent Weekday Pattern</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Monday through Thursday shows a consistent sleep schedule with 7-8 hours of quality sleep.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Smile className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Supports optimal collagen production and repair</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Smile className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Enhances effectiveness of evening skincare products</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Smile className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Maintains stable hydration and barrier function</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-background/40 border border-border/20">
                      <h3 className="text-lg font-medium mb-2">Sleep Quality Fluctuations</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your sleep quality varies significantly, with lowest ratings following late nights.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <AlertCircle className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">
                            Poor quality sleep increases cortisol, triggering inflammation
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <AlertCircle className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Reduced deep sleep impairs cellular regeneration</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                            <AlertCircle className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Inconsistent sleep quality affects product absorption</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
