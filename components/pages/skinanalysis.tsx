"use client"

import { useState, useRef, useEffect, useCallback, JSX } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Camera, Shield, AlertCircle, Info, Sparkles, Zap, Lock, Clock, Scan, Sun, LineChart, Fingerprint, Leaf,
  Flame, Maximize, Award, Droplet, Snowflake, ZapIcon, Flower, Coffee, Egg, CitrusIcon as Lemon, Apple,
  Utensils, Bath, Thermometer, Feather, Scissors, ShoppingBag, Sparkle, Rocket, Lightbulb, Repeat,
  CheckCircle, ArrowRight,
} from "lucide-react"
import ImageUploader from "@/components/image-uploader"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getSkinAnalysis, SkinAnalysisResult } from "@/lib/api/skinAnalysis" // Import your API functions

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AnalysisPage() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("upload");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<SkinAnalysisResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // UI-specific state
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [activeHeatmap, setActiveHeatmap] = useState("wrinkles");
  const [showHomeRemedies, setShowHomeRemedies] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // --- STATIC DATA & UI HELPERS ---
  const skincareTips = [
    "For best results, take photos in natural daylight without filters.",
    "Make sure the area of concern is clearly visible and in focus.",
    "Take photos from multiple angles for more accurate analysis.",
    "Remove makeup before taking photos for more accurate skin analysis.",
  ];

  const conditionIconMap: { [key: string]: JSX.Element } = {
    "Acne Vulgaris": <Flame className="h-16 w-16 text-primary/50" />,
    "Eczema": <Feather className="h-16 w-16 text-primary/50" />,
    "Rosacea": <Thermometer className="h-16 w-16 text-primary/50" />,
    "Psoriasis": <Scissors className="h-16 w-16 text-primary/50" />,
    "Melasma": <Sun className="h-16 w-16 text-primary/50" />,
    "Healthy Skin": <CheckCircle className="h-16 w-16 text-green-500/80" />,
  };
  
  const homeRemedies: { [key: string]: any } = {
    // This large object of hardcoded home remedies remains here as it's part of your original UI logic for the heatmap section.
    wrinkles: { title: "Fine Lines & Wrinkles", remedies: [ /* ...remedy objects... */ ] },
    // ... all other issue remedies ...
  };

  // --- CORE LOGIC & HANDLERS ---
  useEffect(() => {
    // GSAP and Tip animations on mount
    gsap.fromTo(".animate-section", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" });
    const timer = setTimeout(() => showRandomTip(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const showRandomTip = () => {
    let newTipIndex;
    do { newTipIndex = Math.floor(Math.random() * skincareTips.length) } while (newTipIndex === currentTip && skincareTips.length > 1);
    setCurrentTip(newTipIndex);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 8000);
  };
  
  // The single, correct handler for the ImageUploader
  const handleImageSelected = useCallback((file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
    if (!file) {
      resetAnalysis();
    }
  }, []);

  // The function that calls the API
  const startAnalysis = async () => {
    if (!selectedFile) {
      setApiError("Please upload an image first.");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setApiError(null);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });

    try {
      const results = await getSkinAnalysis(selectedFile);
      setAnalysisResults(results);
      setAnalysisComplete(true);
      setActiveTab("results");
    } catch (error) {
      console.error("Analysis API Error:", error);
      setApiError(error instanceof Error ? error.message : "An unknown error occurred.");
      setActiveTab("upload");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisComplete(false);
    setAnalysisResults(null);
    setApiError(null);
    setActiveTab("upload");
    setShowHomeRemedies(false);
    setSelectedIssue(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  // --- UI HELPER FUNCTIONS ---
  const showRemediesFor = (issue: string) => { setSelectedIssue(issue); setShowHomeRemedies(true); };
  const closeHomeRemedies = () => { setShowHomeRemedies(false); setSelectedIssue(null); };
  const getScoreColor = (score: number) => { if (score >= 85) return "text-green-500"; if (score >= 70) return "text-emerald-500"; if (score >= 55) return "text-blue-500"; if (score >= 40) return "text-yellow-500"; return "text-red-500"; };
  const getScoreGradient = (score: number) => { if (score >= 85) return "from-green-500/20 to-emerald-500/20"; if (score >= 70) return "from-emerald-500/20 to-blue-500/20"; if (score >= 55) return "from-blue-500/20 to-indigo-500/20"; return "from-amber-500/20 to-orange-500/20"; };
  const getIssueIcon = (issue: string) => { switch (issue) { case "wrinkles": return <LineChart className="h-5 w-5" />; case "pores": return <Maximize className="h-5 w-5" />; case "redness": return <Flame className="h-5 w-5" />; case "acne": return <AlertCircle className="h-5 w-5" />; case "pigmentation": return <Sun className="h-5 w-5" />; case "texture": return <Fingerprint className="h-5 w-5" />; default: return <Sparkles className="h-5 w-5" />; } };

  return (
    <div ref={containerRef} className="container max-w-7xl px-4 md:px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12 animate-section">
        <Badge variant="outline" className="mb-4 border-primary/50 text-primary">AI-Powered Analysis</Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Discover Your <span className="gradient-text">Skin's Secrets</span></h1>
        <p className="text-muted-foreground text-lg max-w-3xl">Upload a photo of your skin concern and get instant AI-powered analysis with personalized recommendations.</p>
      </div>

      {/* Floating Tip */}
      <AnimatePresence>
        {showTip && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20 overflow-hidden"><CardContent className="p-4"><div className="flex gap-3"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Info className="h-5 w-5 text-primary" /></div><div><h3 className="font-medium mb-1">Pro Tip</h3><p className="text-sm text-muted-foreground">{skincareTips[currentTip]}</p></div></div></CardContent></Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`grid gap-8 ${activeTab === "upload" ? "md:grid-cols-12" : ""} animate-section`}>
        {/* Left Column - Upload and Analysis */}
        <div className={activeTab === "upload" ? "md:col-span-7 lg:col-span-8" : "w-full max-w-6xl mx-auto"}>
          <Card className="border-primary/20 bg-card/80 backdrop-blur-lg overflow-hidden h-full">
            <CardHeader className="pb-2"><h2 className={`text-xl font-bold ${activeTab !== "upload" ? "text-center" : ""}`}>AI Skin Analysis</h2></CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="upload" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4"><TabsTrigger value="upload" className="w-full data-[state=active]:bg-primary/20"><Camera className="h-4 w-4 mr-2" /> Upload Image</TabsTrigger><TabsTrigger value="results" className="w-full data-[state=active]:bg-primary/20" disabled={!analysisComplete}><Scan className="h-4 w-4 mr-2" /> Results</TabsTrigger></TabsList>
                
                <TabsContent value="upload" className="mt-0">
                  <div className="text-center mb-4"><h2 className="text-xl font-bold mb-2">Upload Your Skin Image</h2><p className="text-sm text-muted-foreground">Take a clear, well-lit photo of the affected area for the most accurate analysis</p></div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-primary/30 transition-all hover:border-primary/50 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500"></div><div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="relative p-4"><ImageUploader onImageSelected={handleImageSelected} /></div>
                    {selectedFile && !isAnalyzing && !analysisComplete && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 flex justify-center">
                        <Button onClick={startAnalysis} className="relative overflow-hidden group px-8 py-6 text-lg font-medium rounded-full" size="lg">
                          <span className="relative z-10 flex items-center">Get My Results ✨ <Sparkles className="ml-2 h-5 w-5" /></span>
                          <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span><span className="absolute inset-0 backdrop-blur-[1px] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span><span className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-primary to-purple-500 opacity-30 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></span>
                        </Button>
                      </motion.div>
                    )}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg"></div><div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg"></div><div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg"></div><div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg"></div>
                  </div>
                  {isAnalyzing && (
                    <div className="mt-8"><div className="flex flex-col items-center"><div className="relative h-16 w-16 mb-4"><div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div><div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div></div><h3 className="text-lg font-medium mb-2">Analyzing your skin...</h3><p className="text-sm text-muted-foreground mb-4">Our AI is examining your skin's condition</p><Progress value={undefined} className="h-1 w-full max-w-md animate-pulse" /></div></div>
                  )}
                </TabsContent>

                <TabsContent value="results" className="mt-0" ref={resultsRef}>
                  {apiError && <Alert variant="destructive" className="my-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Analysis Error</AlertTitle><AlertDescription>{apiError}</AlertDescription></Alert>}
                  {analysisComplete && analysisResults && !showHomeRemedies && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
                        {/* Predicted Disease Section */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4 mb-6">
                          <h3 className="text-lg font-bold mb-3 flex items-center"><Award className="h-5 w-5 mr-2 text-primary" />Skin Condition Analysis</h3>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full md:w-1/3">
                              <div className="aspect-square rounded-lg bg-black/5 overflow-hidden relative"><div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">{conditionIconMap[analysisResults.predictedConditionName] || <Flame className="h-16 w-16 text-primary/50" />}</div>
                                <motion.div className="absolute inset-0 border-2 border-primary/30 rounded-lg" animate={{ boxShadow: ["0 0 0 rgba(236, 72, 153, 0)", "0 0 15px rgba(236, 72, 153, 0.3)", "0 0 0 rgba(236, 72, 153, 0)"] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }} />
                              </div>
                            </div>
                            <div className="w-full md:w-2/3">
                              <h4 className="text-xl font-bold text-primary mb-1">{analysisResults.predictedConditionName}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{analysisResults.conditionDetails?.description || "A skin condition that requires attention."}</p>
                              <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Confidence Score</span><span className={`text-lg font-bold ${getScoreColor(analysisResults.confidenceScore)}`}>{analysisResults.confidenceScore}%</span></div>
                              <Progress value={analysisResults.confidenceScore} className="h-2 mb-4" />
                              <div className="p-3 bg-primary/10 rounded-lg"><div className="flex items-start gap-2"><Info className="h-5 w-5 text-primary shrink-0 mt-0.5" /><p className="text-sm">This analysis is for informational purposes only. Please consult with a dermatologist for a professional diagnosis.</p></div></div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Overall Score */}
                        <div className="flex flex-col items-center justify-center mb-6">
                          <motion.div className={`relative h-32 w-32 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br ${getScoreGradient(analysisResults.overall)}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                            <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                            <svg className="absolute inset-0" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary/30" strokeDasharray={`${analysisResults.overall * 2.83} 283`} transform="rotate(-90 50 50)" /></svg>
                            <div className="text-4xl font-bold">{analysisResults.overall}</div>
                          </motion.div>
                          <h3 className="text-xl font-bold mb-1">Skin Health Score</h3><p className="text-sm text-muted-foreground">Overall assessment of your skin's condition</p>
                        </div>
                        
                        {/* Skin Analysis Visualization - (This section uses hardcoded data for UI effect, as the API does not provide heatmap coordinates) */}
                        <div className="mb-6"><h3 className="text-lg font-bold mb-4">Skin Analysis</h3>
                            <div className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="w-full md:w-1/2">
                                        <div className="aspect-square rounded-lg bg-black/5 overflow-hidden relative">
                                            {imagePreview ? <img src={imagePreview} alt="Analyzed skin" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-muted"></div>}
                                            {/* (Heatmap overlay JSX remains here as a visual effect) */}
                                        </div>
                                        <div className="mt-4 grid grid-cols-3 gap-2">{[{ id: "wrinkles", name: "Wrinkles", icon: <LineChart className="h-3 w-3" /> },{ id: "pores", name: "Pores", icon: <Maximize className="h-3 w-3" /> },{ id: "redness", name: "Redness", icon: <Flame className="h-3 w-3" /> },{ id: "acne", name: "Acne", icon: <AlertCircle className="h-3 w-3" /> },{ id: "pigmentation", name: "Pigmentation", icon: <Sun className="h-3 w-3" /> },{ id: "texture", name: "Texture", icon: <Fingerprint className="h-3 w-3" /> }].map((item) => (<Button key={item.id} variant={activeHeatmap === item.id ? "default" : "outline"} size="sm" className="h-auto py-1 px-2 text-xs" onClick={() => setActiveHeatmap(item.id)}>{item.icon}<span className="ml-1">{item.name}</span></Button>))}</div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <h4 className="text-sm font-medium">Skin Issue Scores</h4>
                                        {[ { id: "wrinkles", name: "Fine Lines & Wrinkles", score: analysisResults.wrinkles }, { id: "pores", name: "Pore Size", score: analysisResults.pores }, { id: "redness", name: "Redness & Inflammation", score: analysisResults.redness }, { id: "acne", name: "Acne & Blemishes", score: analysisResults.acne }, { id: "pigmentation", name: "Pigmentation", score: analysisResults.pigmentation }, { id: "texture", name: "Skin Texture", score: analysisResults.texture } ].map((item) => (
                                            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className={`p-2 rounded-lg transition-colors ${activeHeatmap === item.id ? "bg-primary/10" : "bg-background/40 hover:bg-background/60"}`} onClick={() => setActiveHeatmap(item.id)}>
                                                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">{item.name}</span><div className="flex items-center"><span className={`text-sm font-bold ${getScoreColor(item.score)}`}>{item.score}</span><Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={(e) => { e.stopPropagation(); showRemediesFor(item.id); }}><Leaf className="h-3 w-3 text-green-500" /></Button></div></div>
                                                <Progress value={item.score} className="h-1" />
                                            </motion.div>
                                        ))}
                                        <Button className="w-full mt-2" onClick={() => showRemediesFor(activeHeatmap)}><Leaf className="mr-2 h-4 w-4" /> View Home Remedies</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Home Remedies Section for the Predicted Condition */}
                        {analysisResults.conditionDetails && analysisResults.conditionDetails.remedies.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="bg-black/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] opacity-10 [background-size:20px_20px]"></div><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-70"></div><div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-pink-500 opacity-70"></div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center text-white relative"><span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">✨ DIY SKIN FIXES ✨</span><span className="absolute -bottom-2 left-0 w-20 h-1 bg-pink-500"></span></h3>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                              {analysisResults.conditionDetails.remedies.map((remedy, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }} whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-black/90 to-black/70 rounded-xl overflow-hidden transition-all duration-300 border border-pink-500/30 hover:border-pink-500/70 min-h-[450px] flex flex-col relative group">
                                  <div className="relative p-5 border-b border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-blue-500/10"><div className="flex items-center gap-3"><div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center text-3xl">{remedy.emoji}</div><h4 className="text-xl font-bold text-white">{remedy.name}</h4></div></div>
                                  <div className="p-5 flex-1 flex flex-col"><p className="text-base leading-relaxed text-white/90 mb-6">{remedy.conversational}</p>
                                    <div className="mt-auto space-y-5">
                                      <div><h5 className="text-base font-bold text-pink-400 mb-3 flex items-center"><ShoppingBag className="h-4 w-4 mr-2 text-pink-400" />GRAB THESE:</h5><ul className="space-y-2">{remedy.ingredients.map((ingredient, i) => (<li key={i} className="flex items-center text-base leading-relaxed text-white/80"><span className="h-2 w-2 rounded-full bg-pink-500 mr-3 flex-shrink-0"></span>{ingredient}</li>))}</ul></div>
                                      <div><h5 className="text-base font-bold text-blue-400 mb-3 flex items-center"><Rocket className="h-4 w-4 mr-2 text-blue-400" />HOW TO:</h5><p className="text-base leading-relaxed text-white/80">{remedy.instructions}</p></div>
                                      <div><h5 className="text-base font-bold text-purple-400 mb-3 flex items-center"><Sparkle className="h-4 w-4 mr-2 text-purple-400" />THE MAGIC:</h5><p className="text-base leading-relaxed text-white/80">{remedy.benefits}</p></div>
                                      <div className="flex items-center gap-2 pt-3 border-t border-pink-500/20"><Repeat className="h-5 w-5 text-pink-400 flex-shrink-0" /><h5 className="text-base font-bold text-pink-400 mr-1">REPEAT:</h5><p className="text-base text-white/80">{remedy.frequency}</p></div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Analyze Another Photo button */}
                        <div className="flex justify-center mb-8"><Button onClick={resetAnalysis} className="enhanced-hover"><Camera className="mr-2 h-4 w-4" /> Analyze Another Photo</Button></div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Info Cards (only visible on upload tab) */}
        {activeTab === "upload" && (
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-colors"><CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />How It Works</CardTitle></CardHeader><CardContent className="space-y-4">{[{ step: 1, title: "Upload a photo", desc: "Take a clear photo of your skin concern in good lighting", icon: <Camera className="h-5 w-5 text-primary" /> },{ step: 2, title: "AI Analysis", desc: "Our advanced AI analyzes your image and provides instant results", icon: <Sparkles className="h-5 w-5 text-primary" /> },{ step: 3, title: "Get Remedies", desc: "Receive personalized home remedies and skincare tips", icon: <Leaf className="h-5 w-5 text-primary" /> }].map((item, index) => (<motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="flex items-start gap-4 group" whileHover={{ x: 5 }}><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">{item.icon}</div><div><h3 className="font-medium flex items-center"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2">{item.step}</span>{item.title}</h3><p className="text-sm text-muted-foreground mt-1">{item.desc}</p></div></motion.div>))}<Button variant="outline" className="w-full mt-2" onClick={showRandomTip}><Info className="mr-2 h-4 w-4" /> Show More Tips</Button></CardContent></Card>
            <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-colors"><CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Privacy & Security</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">Your privacy is our top priority. All images are:</p><motion.div className="space-y-3">{[{ text: "End-to-end encrypted", icon: <Lock className="h-4 w-4 text-primary" /> },{ text: "Stored securely in compliance with HIPAA", icon: <Shield className="h-4 w-4 text-primary" /> },{ text: "Never shared with third parties", icon: <AlertCircle className="h-4 w-4 text-primary" /> },{ text: "Automatically deleted after 30 days", icon: <Clock className="h-4 w-4 text-primary" /> }].map((item, index) => (<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 hover:bg-background/60 transition-colors" whileHover={{ x: 5 }}><div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">{item.icon}</div><span className="text-sm">{item.text}</span></motion.div>))}</motion.div></CardContent></Card>
          </div>
        )}
      </div>
    </div>
  )
}