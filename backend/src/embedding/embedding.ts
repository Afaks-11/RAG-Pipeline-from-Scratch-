import { createEmbeddings } from "../api/services/voyage.service.js";

// Delay helper to respect Voyage's 3 RPM limit
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const DELAY_MS = 61000; // 61 seconds ensures we stay under 3 requests per minute

export async function embedQuery(query: string): Promise<number[]> {
  const [embeddings] = await createEmbeddings([query]);
  if (!embeddings) {
    throw new Error("No embedding returned from Voyage API");
  }

  return embeddings;
}

/**
 * Generates vectors for a batch of documents, pausing to respect rate limits.
 */
export async function embedBatch(
  texts: string[],
  batchSize = 70,
): Promise<number[][]> {
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const currentBatchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(texts.length / batchSize);

    console.log(
      `      -> Processing batch ${currentBatchNum} of ${totalBatches} (${batch.length} chunks)...`,
    );

    const embeddings = await createEmbeddings(batch);
    allEmbeddings.push(...embeddings);

    // If we have more chunks to process, we MUST pause to respect the 3 RPM limit
    if (i + batchSize < texts.length) {
      console.log(
        `       Pausing for 61 seconds to respect Voyage free tier limits... `,
      );
      await delay(DELAY_MS);
    }
  }

  return allEmbeddings;
}

export const embedTexts = embedBatch;
