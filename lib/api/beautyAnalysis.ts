// lib/api/beautyAnalysis.ts

export interface BeautyAnalysisResult {
  // Core Scores (0-100 integer)
  overall: number;
  symmetry: number;
  skinHealth: number;
  proportion: number;
  youthfulness: number;
  goldenRatio: number;
  lips: number;
  eyes: number;
  nose: number;
  jawline: number;
  cheekbones: number;
  firmness: number;
  wrinkles: number; // Higher score = fewer wrinkles
  eyeArea: number;
  skinTone: number;
  facialVolume: number;

  // Golden Ratio Details (0-100 integer, representing percentage match)
  goldenRatioEyeToEye: number;
  goldenRatioNoseToChin: number;
  goldenRatioLipsToChin: number;
  goldenRatioForehead: number;

  // Symmetry Details (Specific metrics)
  symmetryEyeLevelDiff_mm: number;
  symmetryNoseAngle_deg: number;
  symmetryLipCornerDiff_mm: number;
  symmetryJawlineBalance: number; // Percentage 0-100
}

// Function to fetch the analysis from the API
export async function getBeautyAnalysis(file: File): Promise<BeautyAnalysisResult> {
  const form = new FormData();
  form.append("analysisImage", file); // Match the backend expected field name

  // The relative URL to your API route
  const apiUrl = "/api/beauty-analysis";

  console.log(`[API] Sending beauty analysis request to: ${apiUrl}`);
  const res = await fetch(apiUrl, {
    method: "POST",
    body: form,
  });

  console.log(`[API] Beauty analysis response status: ${res.status}`);

  if (!res.ok) {
    let errorBody = "Failed to fetch";
    try {
      errorBody = await res.text();
    } catch (e) {
      // Ignore if parsing fails
    }
    console.error(`[API] Beauty analysis error: ${res.status} - ${errorBody}`);
    throw new Error(`Analysis failed: ${res.statusText}. ${errorBody}`);
  }

  const result: BeautyAnalysisResult = await res.json();
  console.log("[API] Beauty analysis response data:", result);
  return result;
}

// Helper object for initializing state, ensuring all keys exist.
export const initialBeautyScores: BeautyAnalysisResult = {
  overall: 0, symmetry: 0, skinHealth: 0, proportion: 0, youthfulness: 0,
  goldenRatio: 0, lips: 0, eyes: 0, nose: 0, jawline: 0, cheekbones: 0,
  firmness: 0, wrinkles: 0, eyeArea: 0, skinTone: 0, facialVolume: 0,
  goldenRatioEyeToEye: 0, goldenRatioNoseToChin: 0, goldenRatioLipsToChin: 0, goldenRatioForehead: 0,
  symmetryEyeLevelDiff_mm: 0, symmetryNoseAngle_deg: 0, symmetryLipCornerDiff_mm: 0, symmetryJawlineBalance: 0,
};