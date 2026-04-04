import { GoogleGenerativeAI } from "@google/generative-ai";
import type { SearchResult } from "../database/interface/searchResult.interface.js";
import type { GenerationResult } from "./interface/generationResult.interface.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generate(
  query: string,
  results: SearchResult[],
  options: { model?: string; temperature?: number } = {},
): Promise<GenerationResult> {
  const { model = "gemini-2.5-flash", temperature = 0.2 } = options;

  // 2. Build the context block (This stays exactly the same!
  const contextBlock = results
    .map(
      (r, i) =>
        `[Source ${i + 1}] (score: ${r.score.toFixed(3)}, from: ${r.source})\n${r.chunk.text}`,
    )
    .join("\n\n");

  // 3. Define the System Instructions (The Rules)
  const systemPrompt = `You are a helpful assistant that answers questions based on the provided context documents. 
        Rules:
        - Answer ONLY based on the provided context
        - If the context doesn't contain enough information, say so
        - Cite which source(s) you used with [Source N] notation
        - Be concise and direct`;

  // 4. Define the User Prompt (The Question + The Data)
  const userPrompt = `Context documents:\n${contextBlock}\n\nQuestion: ${query}\n\nAnswer based on the context above:`;

  // 5. Setup the Gemini Model with our specific configurations
  const generativeModel = genAI.getGenerativeModel({
    model: model,
    systemInstruction: systemPrompt, // Gemini takes system instructions right here
    generationConfig: {
      temperature: temperature, // Controls how creative/random the AI is
    },
  });

  // 6. Generate the answer!
  const response = await generativeModel.generateContent(userPrompt);

  return {
    answer: response.response.text(), // Extract the text from the Gemini response object
    sources: results,
    prompt: userPrompt,
  };
}
