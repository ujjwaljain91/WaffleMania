import { GoogleGenAI, Type } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWaffleDescription = async (
  base: string,
  toppings: string[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Our AI chef is currently on break (API Key missing). Enjoy your creation!";

  try {
    const toppingList = toppings.join(", ");
    const prompt = `
      I am creating a custom waffle on a luxury website called "Waffle Mania".
      The waffle has a ${base} base.
      It is topped with: ${toppingList || "nothing but love"}.

      Write a short, 2-sentence hyper-aesthetic, mouth-watering description of this creation.
      Focus on sensory details like texture, warmth, and premium ingredients.
      Do not use hashtags. Keep it under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "A delicious custom creation made just for you.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "A unique combination of flavors that excites the palate.";
  }
};

export const generateWaffleFromMood = async (mood: string): Promise<{ baseId: string, toppingIds: string[], reason: string } | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    const prompt = `
      You are a specialized Waffle Sommelier for "Waffle Mania".
      The user describes their mood or situation as: "${mood}".
      
      Available Bases (choose one ID):
      - classic (Classic Vanilla)
      - choco (Dark Chocolate)
      - matcha (Kyoto Matcha)
      - redvelvet (Red Velvet)

      Available Toppings (choose 1 to 4 IDs):
      - strawberry (Fresh Strawberries)
      - banana (Sliced Banana)
      - maple (Maple Syrup)
      - chocolate_sauce (Belgian Choco Sauce)
      - nuts (Candied Pecans)
      - oreo (Oreo Crumbs)

      Based on the mood, curate a waffle combination.
      "reason" must be a short, poetic, aesthetic description of why this fits the mood (max 30 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            baseId: { type: Type.STRING },
            toppingIds: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            reason: { type: Type.STRING }
          },
          required: ["baseId", "toppingIds", "reason"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Sommelier error:", error);
    return null;
  }
};

export const generateWaffleImage = async (prompt: string): Promise<string | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    // gemini-3-pro-image-preview is required for image generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};