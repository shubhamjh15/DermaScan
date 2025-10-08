// lib/api/skinAnalysis.ts

// Define the structure of a single remedy
interface Remedy {
    emoji: ReactNode;
    conversational: ReactNode;
    frequency: ReactNode;
    name: string;
    ingredients: string[];
    instructions: string;
    benefits: string;
    image?: string; // Optional image URL
  }
  
  // Define the structure for details about the predicted condition
  interface ConditionDetails {
    name: string;
    description: string;
    remedies: Remedy[];
    // You could add more fields if the API provides them (e.g., severity, common causes)
  }
  
  // Define the main structure for the API response
  export interface SkinAnalysisResult {
    // Skin Health Scores (0-100 integer, assuming higher is better unless specified)
    overall: number;
    hydration: number;
    uvDamage: number; // Lower score might be better here, adjust interpretation if needed
    wrinkles: number; // Higher score = fewer wrinkles (consistent with beauty analysis)
    evenness: number;
    texture: number;
    pores: number; // Lower score might be better, adjust interpretation if needed
    redness: number; // Lower score might be better, adjust interpretation if needed
    acne: number;    // Lower score might be better, adjust interpretation if needed
    pigmentation: number; // Lower score might be better, adjust interpretation if needed
  
    // Condition Prediction
    predictedConditionName: string | null; // Name of the most likely condition, or null if none detected confidently
    confidenceScore: number; // Confidence percentage (0-100) for the prediction
    conditionDetails: ConditionDetails | null; // Full details if a condition was predicted
  
    // Optional: Heatmap data if your API provides it
    // heatmapData?: { [key: string]: any }; // Example structure
  }
  
  // API Function to get skin analysis
  export async function getSkinAnalysis(file: File): Promise<SkinAnalysisResult> {
    const form = new FormData();
    form.append("analysisImage", file); // Match the backend expected field name
  
    // --- IMPORTANT: Update this URL to your actual skin analysis API endpoint ---
    // fixed route
    const apiUrl = "api/skin-analysis";
    // --- IMPORTANT: Update this URL to your actual skin analysis API endpoint ---
  
  
    console.log(`[API] Sending skin analysis request to: ${apiUrl}`); // Debug log
    const res = await fetch(apiUrl, {
      method: "POST",
      body: form,
    });
  
    console.log(`[API] Skin analysis response status: ${res.status}`); // Debug log
  
    if (!res.ok) {
      let errorBody = "Failed to fetch";
      try {
        errorBody = await res.text(); // Try to get more specific error message
      } catch (e) { /* Ignore parsing error */ }
      console.error(`[API] Skin analysis error: ${res.status} - ${errorBody}`); // Debug log
      throw new Error(`Skin analysis failed: ${res.status} ${res.statusText}. ${errorBody}`);
    }
  
    const result: SkinAnalysisResult = await res.json();
    console.log("[API] Skin analysis response data:", result); // Debug log
    return result;
  }
  
  // Helper function to create initial state, ensuring all keys exist
  export const initialSkinAnalysisScores: SkinAnalysisResult = {
    overall: 0, hydration: 0, uvDamage: 0, wrinkles: 0, evenness: 0,
    texture: 0, pores: 0, redness: 0, acne: 0, pigmentation: 0,
    predictedConditionName: null, confidenceScore: 0, conditionDetails: null,
  };