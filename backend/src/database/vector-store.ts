import { eq, sql, and } from "drizzle-orm";

import { db } from "./index.js";
import { chunks } from "./schema/chunks.js";
import { embedBatch } from "../embedding/embedding.js";
import { rerankDocuments } from "../api/services/voyage.service.js";

import type { SearchResult } from "./interface/searchResult.interface.js";
import type { RetrievalResponse } from "./interface/retrievalResponse.interface.js";

const WEIGHT_SEMANTIC = 0.7;
const WEIGHT_KEYWORD = 0.3;
const CONFIDENCE_THRESHOLD = 0.4;

/**
 * Stage 1: Perform a Hybrid Search (Vector + Full-Text BM25) in PostgreSQL (Fetch to 20)
 * Stage 2: Reranking with Voyage AI (Filters down to top 3)
 * @param query The user's search question
 * @param userId The ID of the user searching (to prevent data leaks)
 * @param documentId The ID of the document to search
 * @param dbLimit The top 20 fetch from postgres
 * @param finalLimit The final 3 fetch by Voyage AI
 * @returns limit How many chunks to return
 */
export async function search(
  query: string,
  userId: string,
  documentId?: string,
  dbLimit: number = 20,
  finalLimit: number = 3,
): Promise<RetrievalResponse> {
  console.log(` Stage 1: Running Hybrid Search for: "${query}"...`);

  const [queryEmbedding] = await embedBatch([query]);

  if (!queryEmbedding) {
    throw new Error("Failed to generate embedding for the search query.");
  }

  const vectorScore = sql<number>`1 - (${chunks.embedding} <=> ${JSON.stringify(queryEmbedding)})`;

  // Full-Text Search Score (BM25 Exact keyword Match)
  // to_tsvector parses the chunk, plainto_tsquery parses the user's raw text safely
  const textScore = sql<number>`ts_rank(to_tsvector('english', ${chunks.content}), plainto_tsquery('english', ${query}))`;

  // Combined Score (Weighted: 70% Semantic, 30% Exact Match)
  const combinedScore =
    sql<number>`(${vectorScore} * ${WEIGHT_SEMANTIC}) + (${textScore} * ${WEIGHT_KEYWORD})`.as(
      "similarity",
    );

  const dbResults = (await db
    .select({
      id: chunks.id,
      content: chunks.content,
      documentId: chunks.documentId,
      similarity: combinedScore,
    })
    .from(chunks)
    .where(
      and(
        eq(chunks.userId, userId),
        documentId ? eq(chunks.documentId, documentId) : undefined,
      ),
    )
    .orderBy(sql`${combinedScore} DESC`)
    .limit(dbLimit)) as SearchResult[];

  if (dbResults.length === 0) {
    return { status: "NO_ANSWER", chunks: [] };
  }

  console.log(
    ` Stage 2: Reranking ${dbResults.length} chunks with Voyage AI...`,
  );
  let usableChunks: SearchResult[] = [];

  const documentTexts = dbResults.map((chunk) => chunk.content);

  // Call Voyage AI's Reranker API
  try {
    const rerankData = await rerankDocuments(query, documentTexts, finalLimit);

    usableChunks = rerankData.map((r: any) => {
      const originalChunk = dbResults[r.index];

      if (!originalChunk) {
        throw new Error(`Failed to find original chunk `);
      }

      return {
        id: originalChunk.id,
        content: originalChunk.content,
        documentId: originalChunk.documentId,
        similarity: r.relevance_score, // Note: REST API uses relevance_score
      };
    });
  } catch (voyageError) {
    console.warn(
      ` Voyage Reranking failed. Falling back to Postgres top chunks.`,
      voyageError,
    );
    usableChunks = dbResults.slice(0, finalLimit);
  }

  // Confidence check based on the top result's score
  const [score] = usableChunks;
  const topScore = score?.similarity || 0;

  if (topScore > CONFIDENCE_THRESHOLD) {
    return { status: "CONFIDENT", chunks: usableChunks };
  } else {
    console.log(` Medium/Low confidence. Proceeding with caution.`);
    return { status: "UNSURE", chunks: usableChunks };
  }
}
