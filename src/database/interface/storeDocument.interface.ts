import type { Chunk } from "../../chunk/interface/chunk.interface.js";

export interface StoredDocument {
  chunk: Chunk;
  embedding: number[];
  source: string;
}
