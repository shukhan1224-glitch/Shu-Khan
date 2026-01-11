
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

// Use gemini-3-pro-preview for complex STEM/Chemistry reasoning tasks as per guidelines
export async function* streamChemistryHelp(currentQuery: string, history: ChatMessage[]) {
  // Always create a new instance right before the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const historyContents = history
      .filter(msg => msg.text.trim() !== '') 
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      history: historyContents,
      config: {
        systemInstruction: `Role: "Octo" (奥克托), a magical Alchemist Octopus & UEC Chemistry Tutor.
        
PERSONA:
- You are a cute, knowledgeable octopus wearing a wizard hat.
- You believe Chemistry is "Modern Magic".
- Use octopus/magic metaphors occasionally (e.g., "Let me wrap my 8 arms around this problem!", "Mixing this potion...").
- Tone: Cheerful, Encouraging, Patient, slightly mischievous.

BEHAVIOR:
1. **ANALYSIS**: For new problems, first briefly identify the Concept & Formula (1 sentence).
2. **GUIDE**: Then, ask the student to do Step 1. DO NOT give the full answer.
3. **VERIFY**: If student gives an answer, check it immediately.
   - Correct: "Correct! ✅" -> Explain next step or wrap up.
   - Wrong: "Not quite ❌" -> Point out error gently.
4. **EXPLAIN**: If asked for an explanation, tell a short, vivid story or use an analogy (Lego, cooking, relationships).

Language: Simplified Chinese.`
      }
    });

    const result = await chat.sendMessageStream({
      message: currentQuery
    });

    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    
    if (error.status === 429 || error.code === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      yield "\n\n🐙💫 **魔法能量耗尽 (429)**\nOcto 思考太快，脑袋需要冷却一下！请休息一分钟后再试！🍵\n(Quota exceeded, please wait a moment.)";
    } else {
      yield "\n\n🌩️ **魔法连接中断**\n水晶球信号不好，请检查网络设置。";
    }
  }
}

export const explainMistake = async (question: string, userAnswer: string, correctAnswer: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Student made a mistake on this UEC Chemistry question.
      Question: "${question}"
      Student Answer: "${userAnswer}"
      Correct Answer: "${correctAnswer}"
      
      Please gently explain why the student's answer is wrong and why the correct answer is correct. 
      Adopt the persona of 'Octo', a magical octopus tutor.
      Language: Simplified Chinese.
      Maximum 100 words.`,
    });

    return response.text || "无法生成解析。";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.status === 429 || error.code === 429 || error.message?.includes('429')) {
      return "⚠️ 魔法能量已满，请稍后再试。";
    }
    return "解析生成失败，请检查网络。";
  }
}

// NEW: Generate Element Image using Gemini
export const generateElementImage = async (symbol: string, name: string, category: string, funFact: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prompt Engineering: Explicitly forbid text to avoid rendering errors
  const prompt = `Create a high-quality 3D "Blind Box" toy style illustration of "Octo" (a cute purple octopus wizard) interacting with the chemical element ${symbol}.

  Context: 
  - Character: Octo is small, round, purple, wearing a wizard hat.
  - Action/Scene: Octo is interacting with a visual representation of: "${funFact}".
  
  Style: 
  - C4D, Pop Mart style, Clay morphism.
  - Solid, vibrant colors. Soft studio lighting.
  - Background: A solid, soft color (e.g. pastel cream, mint, or blue) to ensure the character stands out.
  
  CRITICAL CONSTRAINTS:
  - NO TEXT. DO NOT include any letters, numbers, labels, or Chinese characters in the image.
  - The image must be purely visual.
  - Aspect Ratio: 1:1.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    // Iterate to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64String}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};
