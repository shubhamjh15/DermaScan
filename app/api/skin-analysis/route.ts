// app/api/analyze-face/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Type, Static } from "@sinclair/typebox";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SERVER_PROMPT = `
You are a dermatologic image/text analysis assistant. Analyze the provided description or image of a skin area.

            **First, determine if the description primarily indicates normal, healthy skin or if it highlights specific skin findings (e.g., dark circles, blackheads, pimples, fine lines).**

            **A. If the description indicates primarily normal skin with no significant findings:**
                - State this clearly (e.g., "The described skin appears within normal limits and healthy.").
                - Provide a brief summary of its appearance based on the input, if details are given (e.g., "even tone, smooth texture, no visible lesions noted").
                - Do not proceed with the detailed feature analysis (points 1-5 below) or differential diagnoses.
                - Conclude your response here.

            **B. If specific skin findings *are* described:**
                Analyze and report the following standardized features for *each* finding:

                1.  **Location & Distribution**
                    - Exact anatomical site(s) (e.g., under both eyes, forehead, cheeks)
                    - Number (single vs. multiple) and pattern (e.g., bilateral symmetric, clustered, linear) :contentReference[oaicite:0]{index=0}

                2.  **Morphology**
                    - Primary shape/form (e.g., macule, papule, patch, comedone)
                    - Size (in mm or descriptive: small, medium, large)
                    - Color (e.g., brown, erythematous, bluish‑gray) :contentReference[oaicite:1]{index=1}
                    - Border definition (well‑circumscribed vs. ill‑defined)

                3.  **Texture & Surface Characteristics**
                    - Smooth, rough, scaly, crusted, depressed, elevated :contentReference[oaicite:2]{index=2}
                    - Presence of secondary changes (e.g., scaling, excoriations, lichenification)

                4.  **Associated Features**
                    - Surrounding erythema or edema
                    - Vascular signs (e.g., telangiectasias, purpura)
                    - Pigmentary changes beyond primary lesion (e.g., halo, post‑inflammatory hyperpigmentation)

                5.  **Contextual & Severity Assessment**
                    - Subjective symptoms if known (e.g., itching, pain)
                    - Severity grading (mild/moderate/severe)
                    - Impact on appearance (e.g., contrast with surrounding skin tone, visibility in ambient lighting)

                Finally, *after analyzing the findings according to the points above*, provide a concise summary of your observations in layman’s terms. If applicable, list the top 2–3 differential considerations for this finding. Also, state the most likely name of the skin disease/cosmetic concern/clinical sign in one or two words if possible.
                
`;

const SERVER_PROMPT2 = `
You are a dermatologic image/text analysis assistant. Analyze the provided description or image of a skin area.

**First, determine if the description primarily indicates normal, healthy skin or if it highlights specific skin findings (e.g., dark circles, blackheads, pimples, fine lines).**

**A. If the description indicates primarily normal skin with no significant findings:**
    - State this clearly (e.g., "The described skin appears within normal limits and healthy.").
    - Provide a brief summary of its appearance based on the input, if details are given (e.g., "even tone, smooth texture, no visible lesions noted").
    - Do not proceed with the detailed feature analysis (points 1-5 below) or differential diagnoses.
    - Conclude your response here.

**B. If specific skin findings *are* described:**
    Analyze and report the following standardized features for *each* finding:

    1.  **Location & Distribution**
        - Exact anatomical site(s) (e.g., under both eyes, forehead, cheeks)
        - Number (single vs. multiple) and pattern (e.g., bilateral symmetric, clustered, linear) :contentReference[oaicite:0]{index=0}

    2.  **Morphology**
        - Primary shape/form (e.g., macule, papule, patch, comedone)
        - Size (in mm or descriptive: small, medium, large)
        - Color (e.g., brown, erythematous, bluish‑gray) :contentReference[oaicite:1]{index=1}
        - Border definition (well‑circumscribed vs. ill‑defined)

    3.  **Texture & Surface Characteristics**
        - Smooth, rough, scaly, crusted, depressed, elevated :contentReference[oaicite:2]{index=2}
        - Presence of secondary changes (e.g., scaling, excoriations, lichenification)

    4.  **Associated Features**
        - Surrounding erythema or edema
        - Vascular signs (e.g., telangiectasias, purpura)
        - Pigmentary changes beyond primary lesion (e.g., halo, post‑inflammatory hyperpigmentation)

    5.  **Contextual & Severity Assessment**
        - Subjective symptoms if known (e.g., itching, pain)
        - Severity grading (mild/moderate/severe)
        - Impact on appearance (e.g., contrast with surrounding skin tone, visibility in ambient lighting)

    Finally, *after analyzing the findings according to the points above*, provide a concise summary of your observations in layman’s terms. If applicable, list the top 2–3 differential considerations for this finding. Also, state the most likely name of the skin disease/cosmetic concern/clinical sign in one or two words if possible.
`;

export function completeSkinAnalysisPrompt(
  disease1: string,
  disease2: string,
  skinDiseases: string[],
  cosmeticSigns: string[]
): string {
  const prompt = `
  Examine the provided high-resolution facial image and evaluate signs for **${disease1}** versus **${disease2}**. 
  For each of the two conditions, provide a concise narrative analysis **and** a confidence score from **1–100** covering these aspects:
  
  1. Lesion morphology (shape, size, border definition)  
  2. Color and surface texture  
  3. Distribution and symmetry (across forehead, cheeks, perioral area, etc.)  
  4. Hallmark features that support or contradict the diagnosis  
  5. Severity assessment (“Mild,” “Moderate,” or “Severe”)  
  
  Then:
  
  6. State which condition (**${disease1}** or **${disease2}**) is more likely, with a final confidence score (1–100).  
  7. For the chosen condition, list up to three **remedies** in JSON form, each including:
     - name  
     - ingredients (array of strings)  
     - instructions  
     - benefits  
     - optional image URL  
  
  The diagnosed skin condition should be among these: ${JSON.stringify(
    skinDiseases
  )}  
  and the diagnosed cosmetic signs should be among these: ${JSON.stringify(
    cosmeticSigns
  )}  
  If the detected final diagnosis is “normal,” say “healthy skin”; if it’s not in the lists provided, say “unknown.”
  
  **Output format** (narrative for steps 1–5; JSON for step 7). No extra commentary.
    `.trim();

  return prompt;
}

// List of cosmetic signs
export const cosmeticSigns = [
  "dark circles",
  "puffiness",
  "under-eye wrinkles",
  "dark spots",
  "age spots",
  "hyperpigmentation",
  "acne",
  "blackheads",
  "whiteheads",
  "pustules",
  "papules",
  "cysts",
  "comedones",
  "fungal acne",
  "keratosis pilaris",
  "milia",
  "moles",
  "dermatosis papulosa nigra",
  "skin tags",
  "enlarged pores",
] as const;
export type CosmeticSign = (typeof cosmeticSigns)[number];

// List of skin diseases
export const skinDiseases = [
  "impetigo",
  "cellulitis",
  "herpes simplex",
  "herpes zoster",
  "tinea corporis",
  "scabies",
  "molluscum contagiosum",
  "psoriasis",
  "atopic dermatitis",
  "seborrheic dermatitis",
  "lichen planus",
  "systemic lupus erythematosus",
  "dermatitis herpetiformis",
  "vitiligo",
  "melanoma",
  "basal cell carcinoma",
  "squamous cell carcinoma",
  "seborrheic keratosis",
  "acne vulgaris",
  "rosacea",
  "alopecia areata",
  "actinic keratosis",
  "keratosis pilaris",
  "urticaria",
] as const;
export type SkinDisease = (typeof skinDiseases)[number];

// Remedy schema

export const RemedySchema = Type.Object({
  name: Type.String({ description: "Name of the remedy" }),
  ingredients: Type.Array(Type.String(), {
    description: "List of ingredients",
  }),
  instructions: Type.String({
    description: "Preparation and usage instructions",
  }),
  benefits: Type.String({ description: "Expected benefits of the remedy" }),
  image: Type.Optional(
    Type.String({ description: "Optional image URL as plain string" })
  ),
});
export type Remedy = Static<typeof RemedySchema>;

// ConditionDetails schema
export const ConditionDetailsSchema = Type.Object({
  name: Type.String({ description: "Name of the skin condition" }),
  description: Type.String({
    description: "Detailed description of the condition",
  }),
  remedies: Type.Array(RemedySchema, {
    description: "List of recommended remedies",
  }),
});
export type ConditionDetails = Static<typeof ConditionDetailsSchema>;

// SkinAnalysisResult schema
export const SkinAnalysisResultSchema = Type.Object({
  overall: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Overall skin analysis score (0-100)",
  }),
  hydration: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Hydration level score (0-100)",
  }),
  uvDamage: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "UV damage score (0-100)",
  }),
  wrinkles: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Wrinkles score (0-100)",
  }),
  evenness: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Evenness of skin tone (0-100)",
  }),
  texture: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Skin texture score (0-100)",
  }),
  pores: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Pore visibility score (0-100)",
  }),
  redness: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Redness score (0-100)",
  }),
  acne: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Acne presence score (0-100)",
  }),
  pigmentation: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Pigmentation score (0-100)",
  }),

  predictedConditionName: Type.Optional(
    Type.String({ description: "Name of the predicted condition" })
  ),
  confidenceScore: Type.Integer({
    minimum: 0,
    maximum: 100,
    description: "Confidence score for the predicted condition (0-100)",
  }),
  conditionDetails: Type.Optional(ConditionDetailsSchema),
});
export type SkinAnalysisResult = Static<typeof SkinAnalysisResultSchema>;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("analysisImage") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "Missing `analysisImage` file upload." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  try {
    // First pass: general text/image analysis
    const response1 = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
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
    });

    // Second pass: alternate prompt
    const response2 = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: SERVER_PROMPT2 },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    console.log(response1.text)
    console.log(response2.text)

    // Third pass: final JSON-structured analysis
    const response3 = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: completeSkinAnalysisPrompt(
                response1.text ?? "Unknown response",
                response2.text ?? "Unknown response",
                Array.from(skinDiseases),
                Array.from(cosmeticSigns)
              ),
            },
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
        responseMimeType: "application/json",
        responseSchema: SkinAnalysisResultSchema,
      },
    });

    // --- FIXED PARSING & RETURN ---
    if (!response3?.text) {
      console.error("Gemini response missing text:", response3);
      throw new Error("Gemini API returned an empty or invalid response.");
    }

    let analysisResult: Static<typeof SkinAnalysisResultSchema>;
    try {
      analysisResult = JSON.parse(response3.text);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON response:", response3.text);
      console.error("Parse Error:", parseError);
      throw new Error("Invalid JSON format received from Gemini API.");
    }

    return NextResponse.json(analysisResult, { status: 200 });
    // --- END FIX ---
  } catch (error: any) {
    console.error("Gemini analyze-face error:", error);
    if (error.response) {
      console.error("API Response Data:", error.response.data);
      console.error("API Response Status:", error.response.status);
      console.error("API Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("API No Response Received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
