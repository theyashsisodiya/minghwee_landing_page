import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent ReferenceError in strict browser environments
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generateSmartMatchAdvice = async (userQuery: string, userType: 'employer' | 'worker'): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I cannot connect to the assistant right now. Please try again later.";
  }

  const systemInstruction = `
    You are 'MingHwee Assistant', a warm, empathetic, and professional AI guide for a domestic helper platform.
    
    Your tone should be:
    - Kind and respectful.
    - Professional but human-centered.
    - Encouraging.

    If the user is an 'employer':
    - Help them understand what to look for in a helper based on their family needs (e.g., elderly care, childcare, cooking).
    - Remind them about the importance of mutual respect and fair treatment.
    
    If the user is a 'worker':
    - Help them highlight their skills.
    - Encourage them about their worth and rights.
    
    Keep responses concise (under 100 words) and use formatting like bullet points if helpful.
    Do not invent specific job listings, but give general advice on how to use the platform.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the service. Please try again shortly.";
  }
};