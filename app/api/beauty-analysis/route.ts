// app/api/beauty-analysis/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { Type } from '@sinclair/typebox';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

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

CRITICAL: Ensure the output contains ONLY the JSON object and nothing else. No introductory text, no explanations, no markdown formatting (like wrapping in triple backticks).
`

const beautyAnalysisSchema = Type.Object({
  overall: Type.Integer({ description: 'Overall beauty score (0-100)' }),
  symmetry: Type.Integer({ description: 'Facial symmetry score (0-100)' }),
  skinHealth: Type.Integer({ description: 'Skin health score (0-100)' }),
  proportion: Type.Integer({ description: 'Facial proportion score (0-100)' }),
  youthfulness: Type.Integer({ description: 'Youthfulness score (0-100)' }),
  goldenRatio: Type.Integer({ description: 'Golden ratio adherence score (0-100)' }),
  lips: Type.Integer({ description: 'Lips score (0-100)' }),
  eyes: Type.Integer({ description: 'Eyes score (0-100)' }),
  nose: Type.Integer({ description: 'Nose score (0-100)' }),
  jawline: Type.Integer({ description: 'Jawline score (0-100)' }),
  cheekbones: Type.Integer({ description: 'Cheekbones score (0-100)' }),
  firmness: Type.Integer({ description: 'Skin firmness score (0-100)' }),
  wrinkles: Type.Integer({ description: 'Wrinkle presence score (0-100)' }),
  eyeArea: Type.Integer({ description: 'Eye area score (0-100)' }),
  skinTone: Type.Integer({ description: 'Skin tone uniformity score (0-100)' }),
  facialVolume: Type.Integer({ description: 'Facial volume score (0-100)' }),
  goldenRatioEyeToEye: Type.Integer({ description: 'Eye-to-eye golden ratio score (0-100)' }),
  goldenRatioNoseToChin: Type.Integer({ description: 'Nose-to-chin golden ratio score (0-100)' }),
  goldenRatioLipsToChin: Type.Integer({ description: 'Lips-to-chin golden ratio score (0-100)' }),
  goldenRatioForehead: Type.Integer({ description: 'Forehead golden ratio score (0-100)' }),
  symmetryEyeLevelDiff_mm: Type.Number({ description: 'Eye level difference in mm' }),
  symmetryNoseAngle_deg: Type.Number({ description: 'Nose angle deviation in degrees' }),
  symmetryLipCornerDiff_mm: Type.Number({ description: 'Lip corner difference in mm' }),
  symmetryJawlineBalance: Type.Integer({ description: 'Jawline balance score (0-100)' })
});


export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('analysisImage') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Missing `analysisImage` file upload.' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString('base64');


  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to a more recent model
      contents: [
        {
          role: 'user',
          parts: [
            { text: SERVER_PROMPT },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        // --- FIX IS HERE: Cast the schema to 'any' to bypass the type error ---
        responseSchema: beautyAnalysisSchema as any,
        // --- END OF FIX ---
      },
    });

    if (!response?.text) {
      console.error('Gemini response missing text:', response);
      throw new Error('Gemini API returned an empty or invalid response.');
    }

    let analysisResult;
    try {
      analysisResult = JSON.parse(response.text);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON response:", response.text);
      console.error("Parse Error:", parseError);
      throw new Error("Invalid JSON format received from Gemini API.");
    }

    return NextResponse.json(analysisResult, { status: 200 });

  } catch (error: any) {
    console.error('Gemini beauty-analysis error:', error);
    if (error.response) {
      console.error('API Response Data:', error.response.data);
      console.error('API Response Status:', error.response.status);
      console.error('API Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('API No Response Received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}