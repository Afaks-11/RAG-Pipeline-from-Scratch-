import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONFIG } from "../config/config.js";

const genAI = new GoogleGenerativeAI(CONFIG.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001 " }); // or gemini-embedding-2-preview

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

// 1. Add a simple sleep helper at the top or inside the file
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function embedBatch(
  texts: string[],
  batchSize = 100,
): Promise<number[][]> {
  const allEmbeddings: number[][] = [];
  // Keep batch size under the 100/minute limit
  const BATCH_SIZE = 90;
  // Wait slightly longer than 60 seconds to ensure the quota completely resets
  const DELAY_MS = 70000;

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const currentBatchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(texts.length / BATCH_SIZE);
    console.log(
      `      -> Processing batch ${currentBatchNum} of ${totalBatches} (${batch.length} chunks)...`,
    );

    const embeddings = await embedTexts(batch);
    allEmbeddings.push(...embeddings);

    // If we still have more chunks to process, we MUST pause to respect the rate limit
    if (i + batchSize < texts.length) {
      console.log(
        `Processed ${i + batch.length} chunks. Pausing  for 65 seconds to respect rate limits... `,
      );
      await delay(DELAY_MS);
    }
  }

  return allEmbeddings;
}
