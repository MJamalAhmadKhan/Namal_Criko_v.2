import { GoogleGenAI, Type } from "@google/genai";

const getKey = () => process.env.API_KEY || process.env.GEMINI_API_KEY || '';

// Coaching insights for a technique
export const getTechniqueInsights = async (techniqueName: string) => {
  const key = getKey();
  if (!key || key === 'YOUR_GEMINI_API_KEY_HERE') {
    // Fallback when no API key is set
    return {
      commonMistakes: ['Hard hands at impact', 'Moving head off the line', 'Feet not moving to pitch of ball'],
      mnemonic: 'STEP: Stance, Transfer, Eye, Power',
      keyPoints: ['Keep your head still and eyes level', 'Transfer weight onto the front foot', 'Follow through completely']
    };
  }
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Provide expert cricket coaching insights for the technique: "${techniqueName}".
                 Respond ONLY with a valid JSON object (no markdown) with these exact keys:
                 commonMistakes (array of strings), mnemonic (string), keyPoints (array of strings).`,
    });
    const text = (response.text || '{}').replace(/```json|```/g, '').trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini insights error:", e);
    return {
      commonMistakes: ['Check your technique fundamentals'],
      mnemonic: 'Focus on the basics',
      keyPoints: ['Balance', 'Watch the ball', 'Follow through']
    };
  }
};

// Image generation for a technique frame
export const generateTechniqueFrame = async (prompt: string): Promise<string | null> => {
  const key = getKey();
  if (!key || key === 'YOUR_GEMINI_API_KEY_HERE') return null;
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: {
        parts: [{ text: `A professional cricket instructional diagram showing ${prompt}. High contrast, white background, focused on body mechanics.` }]
      }
    });
    if (response.candidates?.[0]?.content) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          return `data:image/png;base64,${(part as any).inlineData.data}`;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("Gemini frame error:", e);
    return null;
  }
};

// Generate flashcards for a topic
export const generateFlashcards = async (topic: string) => {
  const key = getKey();
  if (!key || key === 'YOUR_GEMINI_API_KEY_HERE') {
    return [
      { front: `What is the key to mastering ${topic}?`, back: 'Consistent practice and correct technique', explanation: 'Repetition builds muscle memory.' },
      { front: 'What should you focus on first?', back: 'Stance and balance', explanation: 'A good base is the foundation of all cricket shots.' },
    ];
  }
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Generate 5 cricket coaching flashcards for: "${topic}".
                 Respond ONLY with a valid JSON array (no markdown). Each item must have: front, back, explanation.`,
    });
    const text = (response.text || '[]').replace(/```json|```/g, '').trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini flashcards error:", e);
    return [];
  }
};
