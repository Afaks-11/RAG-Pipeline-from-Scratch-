import type { Chunk } from "../chunk/interface/chunk.interface.js";
import type { StoredDocument } from "./interface/storeDocument.interface.js";
import type { SearchResult } from "./interface/searchResult.interface.js";

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += (a[i] as number) * (b[i] as number);
    normA += (a[i] as number) * (a[i] as number);
    normB += (b[i] as number) * (b[i] as number);
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export class VectorStore {
  private documents: StoredDocument[] = [];

  add(chunks: Chunk[], embeddings: number[][], source: string): void {
    for (let i = 0; i < chunks.length; i++) {
      this.documents.push({
        chunk: chunks[i] as Chunk,
        embedding: embeddings[i] as number[],
        source,
      });
    }
  }

  search(queryEmbedding: number[], topK: number = 3): SearchResult[] {
    const scored = this.documents.map((doc) => ({
      chunk: doc.chunk,
      source: doc.source,
      score: cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  get size(): number {
    return this.documents.length;
  }
}
