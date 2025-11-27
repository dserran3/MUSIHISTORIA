import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { QuizQuestion, EraData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateQuizForEra = async (era: EraData): Promise<QuizQuestion[]> => {
  try {
    const modelId = "gemini-2.5-flash";
    const prompt = `Genera un examen de 5 preguntes tipus test sobre l'època musical: ${era.title} (${era.years}).
    El públic objectiu són alumnes de 2n d'ESO (13-14 anys).
    Assegura't que les preguntes cobreixin característiques, formes musicals i compositors.
    Retorna només un array JSON vàlid.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
              explanation: { type: Type.STRING, description: "Short explanation suitable for a teenager" }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback static quiz if AI fails
    return [
      {
        question: `Quina és una característica principal del ${era.title}?`,
        options: ["Ús de sintetitzadors", era.characteristics[0], "Música atonal", "Silenci absolut"],
        correctAnswer: 1,
        explanation: "És una de les característiques definides d'aquest període."
      }
    ];
  }
};

export const explainConcept = async (concept: string, eraTitle: string): Promise<string> => {
  try {
    const modelId = "gemini-2.5-flash";
    const prompt = `Ets un professor de música de secundària divertit i clar.
    Un alumne et pregunta: "Què és ${concept}?" en el context de ${eraTitle}.
    Respon breument (màxim 3 frases) de manera entenedora.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt
    });

    return response.text || "No he pogut trobar una explicació en aquest moment.";
  } catch (error) {
    console.error("Error explaining concept:", error);
    return "Error de connexió amb el professor virtual.";
  }
};
