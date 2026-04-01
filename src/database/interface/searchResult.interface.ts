import type { Chunk } from "../../chunk/interface/chunk.interface.js";

export interface SearchResult {
  chunk: Chunk;
  score: number;
  source: string;
}
