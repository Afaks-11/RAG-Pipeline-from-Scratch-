import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONFIG } from "../config/config.js";

const genAI = new GoogleGenerativeAI(CONFIG.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const requests = texts.map((text) => ({
    content: { role: "user", parts: [{ text }] },
  }));

  const response = await model.batchEmbedContents({ requests });

  return response.embeddings.map((item) => item.values);
}

export async function embedQuery(query: string): Promise<number[]> {
  const response = await model.embedContent(query);
  return response.embedding.values;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function embedBatch(
  texts: string[],
  batchSize = 100,
): Promise<number[][]> {
  const allEmbeddings: number[][] = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const embeddings = await embedTexts(batch);
    allEmbeddings.push(...embeddings);

    if (i + batchSize < texts.length) {
      console.log(
        `Processed ${i + batch.length} chunks. Pausing to respect rate limits... `,
      );
      await delay(5000);
    }
  }

  return allEmbeddings;
}
