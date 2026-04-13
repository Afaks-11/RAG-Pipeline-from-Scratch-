import { CONFIG } from "../config/config.js";

// Delay helper to respect Voyage's 3 RPM limit
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function embedQuery(query: string): Promise<number[]> {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: [query],
      model: "voyage-3",
    }),
  });

  const data = await response.json();
  return data.data.embedding;
}

/**
 * Generates vectors for a batch of documents, pausing to respect rate limits.
 */
export async function embedBatch(
  texts: string[],
  batchSize = 70, // Voyage can take up to 128 per batch
): Promise<number[][]> {
  const allEmbeddings: number[][] = [];
  const DELAY_MS = 61000; // 61 seconds ensures we stay under 3 requests per minute

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const currentBatchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(texts.length / batchSize);

    console.log(
      `      -> Processing batch ${currentBatchNum} of ${totalBatches} (${batch.length} chunks)...`,
    );

    const response = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        input: batch,
        model: "voyage-3",
      }),
    });

    const data = await response.json();

    if (!data.data) {
      throw new Error(`Voyage API Error: ${JSON.stringify(data)}`);
    }

    const embeddings = data.data.map((item: any) => item.embedding);
    allEmbeddings.push(...embeddings);

    // If we have more chunks to process, we MUST pause to respect the 3 RPM limit
    if (i + batchSize < texts.length) {
      console.log(
        `      ⏳ Pausing for 61 seconds to respect Voyage free tier limits... `,
      );
      await delay(DELAY_MS);
    }
  }

  return allEmbeddings;
}

export const embedTexts = embedBatch;
