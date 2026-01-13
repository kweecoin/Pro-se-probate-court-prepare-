
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, LegalDocument } from "../types";

const getAIClient = () => {
  // Always use a named parameter and direct process.env.API_KEY as per guidelines
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const chatWithAI = async (
  messages: Message[],
  documents: LegalDocument[] = []
): Promise<string> => {
  const ai = getAIClient();
  
  // Map conversation history to content objects for contextual reasoning
  const contents = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  // Append document context to the latest user message to provide multimodal analysis
  if (documents.length > 0) {
    const latestUserTurn = contents.reverse().find(c => c.role === 'user');
    contents.reverse(); // Restore original order

    if (latestUserTurn) {
      documents.forEach(doc => {
        latestUserTurn.parts.push({
          inlineData: {
            mimeType: doc.type,
            data: doc.base64
          }
        });
        latestUserTurn.parts.push({ text: `Analysis context for document: ${doc.name}` });
      });
    }
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });

  // Property .text returns the extracted string output directly
  return response.text || "I'm sorry, I couldn't process that request.";
};

export const generateReport = async (
  messages: Message[],
  documents: LegalDocument[]
): Promise<string> => {
  const ai = getAIClient();
  const context = messages.map(m => `${m.role}: ${m.text}`).join('\n');
  const docNames = documents.map(d => d.name).join(', ');

  const prompt = `Based on our conversation and the documents uploaded (${docNames}), please generate a "Court Preparation Cheat Sheet" for a pro se litigant. 
  Include:
  1. Case Overview (What is this about?)
  2. Timeline of Key Facts
  3. Your Main Arguments (What points should you make?)
  4. Evidence Checklist (What documents to bring?)
  5. Mock Questions (What might the judge ask?)
  6. Practical Court Tips (e.g., addressing the judge, behavior).
  
  Format this in clean Markdown with sections.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt + "\n\nContext:\n" + context,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  // Use .text property to retrieve the generated string
  return response.text || "Failed to generate report.";
};
