import Groq from "groq-sdk";
import type { SearchResult } from "../database/interface/searchResult.interface.js";
import type { GenerationResult } from "./interface/generationResult.interface.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generate(
  query: string,
  results: SearchResult[],
  options: { model?: string; temperature?: number } = {},
): Promise<GenerationResult> {
  const { model = "llama-3.3-70b-versatile", temperature = 0.2 } = options;

  // 🔴 FIX IS HERE: Mapped to the new Postgres flat structure (r.similarity, r.documentId, r.content)
  const contextBlock = results
    .map(
      (r, i) =>
        `[Source ${i + 1}] (score: ${r.similarity.toFixed(3)}, docId: ${r.documentId})\n${r.content}`,
    )
    .join("\n\n");

  const systemPrompt = `You are a helpful assistant that answers questions based on the provided context documents. 
        Rules:
        - Answer ONLY based on the provided context
        - If the context doesn't contain enough information, say so
        - Cite which source(s) you used with [Source N] notation
        - Be concise and direct`;

  const userPrompt = `Context documents:\n${contextBlock}\n\nQuestion: ${query}`;

  const completion = await groq.chat.completions.create({
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: temperature,
  });

  return {
    answer: completion.choices[0]?.message.content || "",
    sources: results,
    prompt: userPrompt,
  };
}
