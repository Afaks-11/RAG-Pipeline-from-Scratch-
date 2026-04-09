import { eq, sql } from "drizzle-orm";

import { db } from "./index.js";
import { chunks } from "./schema/chunks.js";
import { embedBatch } from "../embedding/embedding.js";

import type { Chunk } from "../chunk/interface/chunk.interface.js";
import type { StoredDocument } from "./interface/storeDocument.interface.js";
import type { SearchResult } from "./interface/searchResult.interface.js";
import type { RetrievalResponse } from "./interface/retrievalResponse.interface.js";

/**
 * Performs a vector similarity search directly in PostgreSQL
 * @param query The user's search question
 * @param userId The ID of the user searching (to prevent data leaks)
 * @returns limit How many chunks to return
 */
export async function search(
  query: string,
  userId: string,
  limit: number = 5,
): Promise<RetrievalResponse> {
  console.log(` Embedding search query: "${query}"...`);

  const [queryEmbedding] = await embedBatch([query]);

  if (!queryEmbedding) {
    throw new Error("Failed to generate embedding for the search query.");
  }

  const cosineDistance = sql`${chunks.embedding} <=> ${JSON.stringify(queryEmbedding)}`;

  // Let Postgres do the math and sorting
  const results = (await db
    .select({
      id: chunks.id,
      content: chunks.content,
      documentId: chunks.documentId,
      similarity: sql<number>`1 - (${cosineDistance})`.as("similarity"),
    })
    .from(chunks)
    // FIX 1: eq() is properly called with both the column and the variable
    .where(eq(chunks.userId, userId))
    .orderBy(cosineDistance)
    .limit(limit)) as SearchResult[];

  if (results.length === 0) {
    return { status: "NO_ANSWER", chunks: [] };
  }

  const [topResult] = results;

  if (!topResult) {
    return { status: "NO_ANSWER", chunks: [] };
  }

  // FIX 2: We use to get the similarity of the FIRST item in the array
  const topScore = topResult.similarity;
  console.log(` Top match score: ${topScore.toFixed(3)}`);

  if (topScore < 0.5) {
    console.log(` Score too low. Discarding results.`);
    return { status: "NO_ANSWER", chunks: [] };
  }

  // We check 'chunk.similarity', not 'results.similarity'
  const usableChunks = results.filter((chunk) => chunk.similarity >= 0.5);

  if (topScore >= 0.8) {
    console.log(` High confidence match found!`);
    return { status: "CONFIDENT", chunks: usableChunks };
  } else {
    console.log(` Medium/Low confidence. Proceeding with caution.`);
    return { status: "UNSURE", chunks: usableChunks };
  }
}

// Old code was using in-memory
// function cosineSimilarity(a: number[], b: number[]): number {
//   let dotProduct = 0;
//   let normA = 0;
//   let normB = 0;
//   for (let i = 0; i < a.length; i++) {
//     dotProduct += (a[i] as number) * (b[i] as number);
//     normA += (a[i] as number) * (a[i] as number);
//     normB += (b[i] as number) * (b[i] as number);
//   }
//   return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// }

// export class VectorStore {
//   private documents: StoredDocument[] = [];

//   add(chunks: Chunk[], embeddings: number[][], source: string): void {
//     for (let i = 0; i < chunks.length; i++) {
//       this.documents.push({
//         chunk: chunks[i] as Chunk,
//         embedding: embeddings[i] as number[],
//         source,
//       });
//     }
//   }

//   search(queryEmbedding: number[], topK: number = 3): SearchResult[] {
//     const scored = this.documents.map((doc) => ({
//       chunk: doc.chunk,
//       source: doc.source,
//       score: cosineSimilarity(queryEmbedding, doc.embedding),
//     }));

//     scored.sort((a, b) => b.score - a.score);
//     return scored.slice(0, topK);
//   }

//   get size(): number {
//     return this.documents.length;
//   }
// }
