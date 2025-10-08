const SERVER_PROMPT = `
Analyze the submitted facial image and provide a detailed, human-readable assessment covering:

1. **Overall Aesthetics & Symmetry**  
   • Balance of facial features (eyes, nose, mouth, jawline)  
   • Left/right symmetry and any notable asymmetries  

2. **Skin Quality & Texture**  
   • Hydration level, pore visibility, smoothness  
   • Presence of fine lines, wrinkles, redness, pigmentation  

3. **Proportions & Golden Ratio**  
   • How well facial proportions align with classical aesthetics  
   • Measurements or visual comparisons (e.g. eye-to-eye span, nose-to-chin)  

4. **Youthfulness Indicators**  
   • Firmness, wrinkle depth, fullness of cheeks and lips  
   • Signs of aging vs. areas that appear youthful  

5. **Feature Highlights**  
   • Eyes: shape, brightness, under-eye condition  
   • Lips: fullness, definition, color tone  
   • Jawline & Chin: contour, sharpness, balance  
   • Cheekbones: prominence, shadows, lift  

Example Structure (values are illustrative):
{
  "overall": 88, "symmetry": 92, "skinHealth": 85, "proportion": 87, "youthfulness": 90, "goldenRatio": 91, "lips": 85, "eyes": 90, "nose": 88, "jawline": 86, "cheekbones": 89, "firmness": 91, "wrinkles": 94, "eyeArea": 89, "skinTone": 86, "facialVolume": 87, "goldenRatioEyeToEye": 95, "goldenRatioNoseToChin": 92, "goldenRatioLipsToChin": 90, "goldenRatioForehead": 89, "symmetryEyeLevelDiff_mm": 0.8, "symmetryNoseAngle_deg": 1.1, "symmetryLipCornerDiff_mm": 0.4, "symmetryJawlineBalance": 93
}

CRITICAL: Ensure the output contains ONLY the JSON object and nothing else. No introductory text, no explanations, no markdown formatting.
`
