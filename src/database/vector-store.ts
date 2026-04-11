import { eq, sql } from "drizzle-orm";
import { CohereClient } from "cohere-ai";

import { db } from "./index.js";
import { chunks } from "./schema/chunks.js";
import { embedBatch } from "../embedding/embedding.js";
import { CONFIG } from "../config/config.js";

import type { Chunk } from "../chunk/interface/chunk.interface.js";
import type { StoredDocument } from "./interface/storeDocument.interface.js";
import type { SearchResult } from "./interface/searchResult.interface.js";
import type { RetrievalResponse } from "./interface/retrievalResponse.interface.js";

const cohere = new CohereClient({ token: CONFIG.token || "" });
/**
 * Stage 1: Perform a Hybrid Search (Vector + Full-Text BM25) in PostgreSQL (Fetch to 20)
 * Stage 2: Reranking with Cohere (Filters down to top 3)
 * @param query The user's search question
 * @param userId The ID of the user searching (to prevent data leaks)
 * @param dbLimit The top 20 fetch from postgres
 * @param finalLimit The final 3 fetch by cohere-ai
 * @returns limit How many chunks to return
 */
export async function search(
  query: string,
  userId: string,
  dbLimit: number = 20,
  finalLimit: number = 3,
): Promise<RetrievalResponse> {
  console.log(` Stage 1: Running Hybrid Search for: "${query}"...`);

  const [queryEmbedding] = await embedBatch([query]);

  if (!queryEmbedding) {
    throw new Error("Failed to generate embedding for the search query.");
  }

  // Vector Score (Semantic Match: 0 to 1)
  const vectorScore = sql<number>`1 - (${chunks.embedding} <=> ${JSON.stringify(queryEmbedding)})`;

  // Full-Text Search Score (BM25 Exact keyword Match)
  // to_tsvector parses the chunk, plaininto_tsquery parses the user's raw text safely
  const textScore = sql<number>`ts_rank(to_tsvector('english', ${chunks.content}), plaininto_tsquery('english', ${query}))`;

  // Combined Score (Weighted: 70% Semantic, 30% Exact Match)
  const combinedScore =
    sql<number>`(${vectorScore} * 0.7) + (${textScore} * 0.3)`.as("similarity");

  // Let Postgres do the math and sorting
  const dbResults = (await db
    .select({
      id: chunks.id,
      content: chunks.content,
      documentId: chunks.documentId,
      similarity: combinedScore,
    })
    .from(chunks)
    // FIX 1: eq() is properly called with both the column and the variable
    .where(eq(chunks.userId, userId))
    .orderBy(sql`${combinedScore} DESC`)
    .limit(dbLimit)) as SearchResult[];

  if (dbResults.length === 0) {
    return { status: "NO_ANSWER", chunks: [] };
  }

  console.log(` Stage 2: Reranking ${dbResults.length} chunks with Cohere...`);

  // Extract just the text content to send to the Reranker
  const documentTexts = dbResults.map((chunk) => chunk.content);

  // Call COhere's Rerank v3 API
  const rerankedResponse = await cohere.rerank({
    model: "rerank-english-v3.0",
    query: query,
    documents: documentTexts,
    topN: finalLimit,
  });

  // Map Cohere's responses back to our original database objects
  const finalChunks: SearchResult[] = rerankedResponse.results.map(
    (rerankedItem) => {
      const originalChunk = dbResults[rerankedItem.index];

      if (!originalChunk) {
        throw new Error(
          `Failed to find original chunk at index ${rerankedItem.index}`,
        );
      }

      return {
        id: originalChunk.id,
        content: originalChunk.content,
        documentId: originalChunk.documentId,
        similarity: rerankedItem.relevanceScore,
      };
    },
  );

  const [topChunk] = finalChunks;

  if (!topChunk) {
    throw new Error("No reranked results found");
  }

  const topScore = topChunk.similarity;
  console.log(` Top reranked match score: ${topScore.toFixed(3)}`);

  if (topScore < 0.5) {
    console.log(` Reranker score too low. Discarding results.`);
    return { status: "NO_ANSWER", chunks: [] };
  }

  // We check 'chunk.similarity', not 'results.similarity'
  const usableChunks = finalChunks.filter((chunk) => chunk.similarity >= 0.5);

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
