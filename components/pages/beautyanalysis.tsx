"use client"

import { useState, useEffect, useCallback, JSX } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Camera, Sparkles, Zap, Award, Ruler, Smile, Heart, Eye, Aperture, History, ChevronRight, ChevronLeft,
  Calendar, TrendingUp, BarChart3, LineChart, Maximize, Star, Compass, Clock, Scan, RefreshCw, Layers,
  AlertCircle, Palette,
  Image as ImageIconLucide,
} from "lucide-react"
import ImageUploader from "@/components/image-uploader"
import { cn } from "@/lib/utils"
import { getBeautyAnalysis, initialBeautyScores, BeautyAnalysisResult } from "@/lib/api/beautyAnalysis"

// Type for a score history entry
type ScoreHistoryEntry = BeautyAnalysisResult & { date: string };

export default function BeautyAnalysisPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [historyView, setHistoryView] = useState(false)
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const [showSymmetryComparison, setShowSymmetryComparison] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // State for current and historical scores
  const [scores, setScores] = useState<ScoreHistoryEntry>({ ...initialBeautyScores, date: new Date().toISOString() });
  const [scoreHistory, setScoreHistory] = useState<ScoreHistoryEntry[]>([]);

  // ---- API & State Management Logic ----

  const handleImageSelected = useCallback((file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
    if (showResults || apiError) {
      resetAnalysis();
    }
  }, [showResults, apiError]);

  const triggerApiAnalysis = useCallback(async () => {
    if (!selectedFile) {
      setApiError("Please select an image to analyze.");
      return;
    }
    setIsLoading(true);
    setApiError(null);
    setShowResults(false);

    try {
      const analysisResult = await getBeautyAnalysis(selectedFile);
      const newScoreEntry: ScoreHistoryEntry = { ...analysisResult, date: new Date().toISOString() };
      
      setScores(newScoreEntry);
      setScoreHistory(prev => [newScoreEntry, ...prev].slice(0, 20)); // Add to history
      setShowResults(true);
      setActiveTab("results");

    } catch (error) {
      console.error("Beauty Analysis Failed:", error);
      setApiError(error instanceof Error ? error.message : "An unknown error occurred during analysis.");
      setActiveTab("upload");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const resetAnalysis = () => {
    setShowResults(false);
    setScores({ ...initialBeautyScores, date: new Date().toISOString() });
    setApiError(null);
    setActiveTab("upload");
    setHistoryView(false);
    setShowSymmetryComparison(false);
    // Note: The ImageUploader state is managed by its onImageSelected callback
  };

  const toggleHistoryView = () => setHistoryView(!historyView);
  const toggleSymmetryComparison = () => setShowSymmetryComparison(!showSymmetryComparison);

  const navigateHistory = (direction: 'next' | 'prev') => {
    if (direction === "next" && currentHistoryIndex < scoreHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    } else if (direction === "prev" && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const currentDisplayScores = historyView && scoreHistory.length > 0
    ? scoreHistory[currentHistoryIndex]
    : scores;

  // ---- Helper & Formatting Functions ----

  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-emerald-500";
    if (score >= 70) return "text-blue-500";
    return "text-amber-500";
  };

  const getScoreGradient = (score: number): string => {
    if (score >= 90) return "from-green-500/20 to-emerald-500/20";
    if (score >= 80) return "from-emerald-500/20 to-blue-500/20";
    if (score >= 70) return "from-blue-500/20 to-indigo-500/20";
    return "from-amber-500/20 to-orange-500/20";
  };
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };
  
  const getScoreChange = (currentScore: number, index: number): number | null => {
    if (index >= scoreHistory.length - 1) return null;
    const prevScore = scoreHistory[index + 1]?.overall;
    if (prevScore === undefined) return null;
    return currentScore - prevScore;
  };
  
  const getStarRating = (score: number): JSX.Element => {
    const fullStars = Math.floor(score / 20);
    const hasHalfStar = score % 20 >= 10;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => ( <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" /> ))}
        {hasHalfStar && ( <div className="relative"><Star className="h-4 w-4 text-yellow-400" /><Star className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden" style={{ clipPath: "inset(0 50% 0 0)" }} /></div> )}
        {[...Array(emptyStars)].map((_, i) => ( <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" /> ))}
      </div>
    );
  };
  
  const formatSymmetryValue = (value: number | undefined | null, unit: string): string => {
    if (value === undefined || value === null) return 'N/A';
    const formattedValue = (unit === 'mm' || unit === '°') ? value.toFixed(1) : value.toString();
    return `${formattedValue}${unit}`;
  }
  
  // ---- RENDER ----
  return (
    <div className="container px-4 md:px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <Badge variant="outline" className="mb-4 border-primary/50 text-primary">AI Beauty Score</Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Your Beauty <span className="gradient-text">Analysis</span></h1>
        <p className="text-muted-foreground text-lg max-w-3xl">Upload your selfie and discover your beauty score with our advanced AI analysis</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-lg overflow-hidden h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Beauty Analysis</h2>
                {showResults && scoreHistory.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={toggleHistoryView} className="flex items-center gap-1 text-primary hover:text-primary/80">
                    {historyView ? "Current Results" : "View History"}
                    {!historyView && <History className="h-4 w-4 ml-1" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <AnimatePresence>
                {apiError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" /><AlertTitle>Analysis Failed</AlertTitle><AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="upload" className="w-full data-[state=active]:bg-primary/20"><Camera className="h-4 w-4 mr-2" /> Upload Image</TabsTrigger>
                  <TabsTrigger value="results" className="w-full data-[state=active]:bg-primary/20" disabled={!showResults}><Award className="h-4 w-4 mr-2" /> Results</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-primary/30 transition-all hover:border-primary/50 group p-4 mb-6 bg-background/20">
                    <ImageUploader onImageSelected={handleImageSelected} />
                  </div>
                  {selectedFile && !isLoading && (
                    <div className="flex justify-center"><Button onClick={triggerApiAnalysis} disabled={isLoading || !selectedFile} className="enhanced-hover w-full max-w-xs"><Sparkles className="mr-2 h-4 w-4" /> Analyze Image</Button></div>
                  )}
                  {isLoading && (
                    <div className="mt-6 text-center flex flex-col items-center justify-center min-h-[150px]">
                      <div className="relative h-16 w-16 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                      </div>
                      <p className="text-lg font-medium text-primary">Analyzing your beauty blueprint...</p>
                      <Progress value={undefined} className="h-1 mt-4 w-full max-w-md animate-pulse" />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="results" className="mt-0 space-y-6">
                  <AnimatePresence mode="wait">
                    {/* --- HISTORY VIEW --- */}
                    {showResults && historyView && (
                      <motion.div key="history-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
                         <div className="flex justify-between items-center"><h3 className="text-xl font-bold flex items-center"><History className="h-5 w-5 mr-2" /> Beauty Score History</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => navigateHistory("prev")} disabled={currentHistoryIndex === 0} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                                <span className="text-sm tabular-nums">{currentHistoryIndex + 1} / {scoreHistory.length}</span>
                                <Button variant="outline" size="icon" onClick={() => navigateHistory("next")} disabled={currentHistoryIndex >= scoreHistory.length - 1} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                         </div>
                         <div className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center text-sm text-muted-foreground"><span>Date: {formatDate(currentDisplayScores.date)}</span>
                                {getScoreChange(currentDisplayScores.overall, currentHistoryIndex) !== null && (
                                <div className={cn("flex items-center gap-1 text-sm font-medium", getScoreChange(currentDisplayScores.overall, currentHistoryIndex)! >= 0 ? "text-green-500" : "text-red-500")}>
                                    {getScoreChange(currentDisplayScores.overall, currentHistoryIndex)! >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 transform rotate-180" />}
                                    {Math.abs(getScoreChange(currentDisplayScores.overall, currentHistoryIndex)!).toFixed(0)} points
                                </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center justify-center"><div className={`text-4xl font-bold ${getScoreColor(currentDisplayScores.overall)} mb-2`}>{currentDisplayScores.overall}</div>{getStarRating(currentDisplayScores.overall)}</div>
                         </div>
                         <div className="flex justify-center mt-4 gap-2"><Button onClick={resetAnalysis} variant="outline"><Camera className="mr-2 h-4 w-4" /> New Analysis</Button><Button onClick={toggleHistoryView}>View Current Results</Button></div>
                      </motion.div>
                    )}

                    {/* --- SYMMETRY VIEW --- */}
                    {showResults && showSymmetryComparison && (
                      <motion.div key="symmetry-view" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="flex justify-between items-center"><h3 className="text-xl font-bold flex items-center"><Maximize className="h-5 w-5 mr-2" /> Facial Symmetry Comparison</h3><Button variant="outline" size="sm" onClick={toggleSymmetryComparison}>Back to Results</Button></div>
                        <div className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><h4 className="text-sm font-medium text-center">Original</h4><div className="aspect-square rounded-lg bg-black/5 overflow-hidden border border-border">{imagePreview ? <img src={imagePreview} alt="Original Face" className="w-full h-full object-contain" /> : <ImageIconLucide className="w-full h-full text-muted-foreground p-8" />}</div></div>
                                <div className="space-y-2"><h4 className="text-sm font-medium text-center">Mirrored</h4><div className="aspect-square rounded-lg bg-black/5 overflow-hidden border border-border">{imagePreview ? <img src={imagePreview} alt="Mirrored Face" className="w-full h-full object-contain transform scale-x-[-1]" /> : <ImageIconLucide className="w-full h-full text-muted-foreground p-8" />}</div></div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-border/50">
                                <h4 className="text-sm font-medium mb-3">Symmetry Analysis Notes</h4>
                                <p className="text-sm text-muted-foreground mb-3">Comparing the original to a mirrored image helps visualize the balance between the left and right sides of the face.</p>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { name: "Eye Level Diff.", value: formatSymmetryValue(currentDisplayScores.symmetryEyeLevelDiff_mm, 'mm') },
                                    { name: "Nose Angle", value: formatSymmetryValue(currentDisplayScores.symmetryNoseAngle_deg, '°') },
                                    { name: "Lip Corner Diff.", value: formatSymmetryValue(currentDisplayScores.symmetryLipCornerDiff_mm, 'mm') },
                                    { name: "Jawline Balance", value: formatSymmetryValue(currentDisplayScores.symmetryJawlineBalance, '%') },
                                  ].map((item, i) => (<div key={i} className="bg-background/40 p-2 rounded flex justify-between items-center"><span className="text-xs">{item.name}</span><span className="text-xs font-medium">{item.value}</span></div>))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4"><Button onClick={toggleSymmetryComparison}>Back to Main Results</Button></div>
                      </motion.div>
                    )}

                    {/* --- MAIN RESULTS VIEW --- */}
                    {showResults && !historyView && !showSymmetryComparison && (
                      <motion.div key="main-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-6">
                        {/* Overall Score Card */}
                        <div className="flex flex-col items-center justify-center">
                          <motion.div className={`relative h-40 w-40 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br ${getScoreGradient(currentDisplayScores.overall)}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                            <svg className="absolute inset-0" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary/30" strokeDasharray={`${currentDisplayScores.overall * 2.83} 283`} transform="rotate(-90 50 50)" /></svg>
                            <div className="text-4xl font-bold">{currentDisplayScores.overall}</div>
                          </motion.div>
                          <h3 className="text-xl font-bold mb-1">Overall Beauty Score</h3><div className="mb-2">{getStarRating(currentDisplayScores.overall)}</div>
                          <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">Based on golden ratio proportions, facial symmetry, feature harmony, and skin health indicators.</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
                            {[
                              { name: "Symmetry", score: currentDisplayScores.symmetry, icon: <Ruler className="h-4 w-4" /> },
                              { name: "Skin Health", score: currentDisplayScores.skinHealth, icon: <Sparkles className="h-4 w-4" /> },
                              { name: "Proportion", score: currentDisplayScores.proportion, icon: <Zap className="h-4 w-4" /> },
                              { name: "Youthfulness", score: currentDisplayScores.youthfulness, icon: <Smile className="h-4 w-4" /> },
                            ].map((item, index) => (
                              <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }} className={`bg-gradient-to-br ${getScoreGradient(item.score)} p-3 rounded-lg text-center hover:scale-105 transition-transform cursor-pointer`} whileHover={{ y: -5 }}>
                                <div className="flex items-center justify-center mb-2">{item.icon}<span className="ml-1 text-sm font-medium">{item.name}</span></div><div className={`text-xl font-bold ${getScoreColor(item.score)}`}>{item.score}</div><Progress value={item.score} className="h-1 mt-1" />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Golden Ratio Card */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4">
                          <h3 className="text-lg font-bold mb-3 flex items-center"><Award className="h-5 w-5 mr-2 text-primary" /> Golden Ratio Match</h3>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative w-full md:w-1/3"><div className="aspect-square rounded-lg bg-black/5 overflow-hidden relative border border-border"><div className="absolute inset-0 flex items-center justify-center">{imagePreview ? <img src={imagePreview} alt="Face for Golden Ratio" className="w-full h-full object-contain opacity-80" /> : <ImageIconLucide className="h-16 w-16 text-muted-foreground" />}<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-50"></div><svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"><path d="M90,90 C78,90 68,80 68,68 C68,56 56,46 44,46 C32,46 22,34 22,22 C22,10 10,0 0,0" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/60 opacity-70" /><path d="M90,90 L90,68 L68,68 L68,90 Z M68,68 L68,46 L46,46 L46,68 Z M46,46 L46,22 L22,22 L22,46 Z" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-primary/40 opacity-50" /></svg></div></div></div>
                            <div className="w-full md:w-2/3">
                              <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Golden Ratio Accuracy</span><span className={`text-lg font-bold ${getScoreColor(currentDisplayScores.goldenRatio)}`}>{currentDisplayScores.goldenRatio}%</span></div><Progress value={currentDisplayScores.goldenRatio} className="h-2 mb-4" />
                              <p className="text-sm text-muted-foreground mb-3">How closely facial proportions match the golden ratio (1.618).</p>
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { name: "Eye-to-Eye Match", match: currentDisplayScores.goldenRatioEyeToEye },
                                  { name: "Nose-to-Chin Match", match: currentDisplayScores.goldenRatioNoseToChin },
                                  { name: "Lips-to-Chin Match", match: currentDisplayScores.goldenRatioLipsToChin },
                                  { name: "Forehead Ratio Match", match: currentDisplayScores.goldenRatioForehead },
                                ].map((item, i) => (
                                  <div key={i} className="bg-background/40 p-2 rounded"><div className="flex justify-between items-center mb-1"><span className="text-xs">{item.name}</span><span className={`text-xs font-bold ${getScoreColor(item.match)}`}>{item.match}%</span></div><Progress value={item.match} className="h-1" /></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Facial Symmetry Card */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3"><h3 className="text-lg font-bold flex items-center"><Maximize className="h-5 w-5 mr-2 text-primary" /> Facial Symmetry</h3><Button variant="outline" size="sm" onClick={toggleSymmetryComparison}><RefreshCw className="h-4 w-4 mr-1" /> View Comparison</Button></div>
                            <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Left-Right Balance Score</span><span className={`text-lg font-bold ${getScoreColor(currentDisplayScores.symmetry)}`}>{currentDisplayScores.symmetry}%</span></div>
                            <Progress value={currentDisplayScores.symmetry} className="h-2 mb-4" />
                            <p className="text-sm text-muted-foreground">The degree of similarity between the left and right sides of the face, scored 0-100.</p>
                        </motion.div>

                        {/* Youthfulness Card */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-3 flex items-center"><Clock className="h-5 w-5 mr-2 text-primary" /> Youthfulness Score</h3>
                            <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Overall Youthfulness</span><span className={`text-lg font-bold ${getScoreColor(currentDisplayScores.youthfulness)}`}>{currentDisplayScores.youthfulness}%</span></div>
                            <Progress value={currentDisplayScores.youthfulness} className="h-2 mb-4" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {[
                                { name: "Skin Firmness", score: currentDisplayScores.firmness, icon: <Zap className="h-3 w-3" /> },
                                { name: "Wrinkle Level", score: currentDisplayScores.wrinkles, icon: <LineChart className="h-3 w-3" /> },
                                { name: "Eye Area", score: currentDisplayScores.eyeArea, icon: <Eye className="h-3 w-3" /> },
                                { name: "Jawline Def.", score: currentDisplayScores.jawline, icon: <Ruler className="h-3 w-3" /> },
                                { name: "Skin Tone", score: currentDisplayScores.skinTone, icon: <Palette className="h-3 w-3" /> },
                                { name: "Facial Volume", score: currentDisplayScores.facialVolume, icon: <Layers className="h-3 w-3" /> },
                              ].map((item, i) => (
                                <div key={i} className="bg-background/40 p-2 rounded"><div className="flex items-center gap-1 mb-1">{item.icon}<span className="text-xs">{item.name}</span></div><div className="flex justify-between items-center"><span className={`text-sm font-bold ${getScoreColor(item.score)}`}>{item.score}</span><Progress value={item.score} className="h-1 w-16" /></div></div>
                              ))}
                            </div>
                        </motion.div>

                        {/* Feature Specific Scores */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                          <h3 className="text-lg font-bold mb-4">Feature-Specific Scores</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {[
                              { name: "Lips", score: currentDisplayScores.lips, icon: <Heart className="h-4 w-4" /> },
                              { name: "Eyes", score: currentDisplayScores.eyes, icon: <Eye className="h-4 w-4" /> },
                              { name: "Nose", score: currentDisplayScores.nose, icon: <Aperture className="h-4 w-4" /> },
                              { name: "Jawline", score: currentDisplayScores.jawline, icon: <Zap className="h-4 w-4" /> },
                              { name: "Cheekbones", score: currentDisplayScores.cheekbones, icon: <Compass className="h-4 w-4" /> },
                              { name: "Skin Health", score: currentDisplayScores.skinHealth, icon: <Sparkles className="h-4 w-4" /> },
                            ].map((item, index) => (
                              <motion.div key={item.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }} className={`bg-gradient-to-br ${getScoreGradient(item.score)} p-3 rounded-lg text-center hover:scale-105 transition-transform cursor-pointer`} whileHover={{ y: -3 }}>
                                <div className="flex items-center justify-center mb-1">{item.icon}<span className="ml-1 text-xs font-medium">{item.name}</span></div>
                                <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>{item.score}</div>
                                <Progress value={item.score} className="h-1 mt-1" />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <div className="flex justify-center mt-8"><Button onClick={resetAnalysis} className="enhanced-hover"><Camera className="mr-2 h-4 w-4" /> Analyze Another Photo</Button></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-colors">
            <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> How It Works</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { step: 1, title: "Upload a selfie", desc: "Take a clear front-facing photo in good lighting", icon: <Camera className="h-5 w-5 text-primary" /> },
                { step: 2, title: "AI Analysis", desc: "Our AI measures facial features and proportions", icon: <Sparkles className="h-5 w-5 text-primary" /> },
                { step: 3, title: "Get Your Score", desc: "Receive detailed beauty scores based on golden ratio", icon: <Award className="h-5 w-5 text-primary" /> },
              ].map((item, index) => (<motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="flex items-start gap-4 group" whileHover={{ x: 5 }}><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">{item.icon}</div><div><h3 className="font-medium flex items-center"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2">{item.step}</span>{item.title}</h3><p className="text-sm text-muted-foreground mt-1">{item.desc}</p></div></motion.div>))}
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-colors">
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Track Your Progress</CardTitle><CardDescription>Monitor how your beauty scores change over time</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-background/40 p-4 rounded-lg"><h4 className="text-sm font-medium mb-2">Benefits of Tracking</h4><ul className="space-y-2">{["See how skincare routines affect your scores", "Track improvements in symmetry and proportion", "Monitor the effects of lifestyle changes"].map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm"><div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-xs text-primary">{i + 1}</span></div><span className="text-muted-foreground">{item}</span></li>))}</ul></div>
                <Button className="w-full" onClick={toggleHistoryView} disabled={!showResults || scoreHistory.length === 0}><History className="mr-2 h-4 w-4" />{historyView ? "Hide History" : "View Score History"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}