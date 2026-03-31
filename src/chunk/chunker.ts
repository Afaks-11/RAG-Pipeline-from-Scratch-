import type { Chunk } from "./interface/chunk.interface.js";

export function chunkText(
  text: string,
  options: {
    maxChunkSize?: number;
    overlap?: number;
    separators?: string[];
  } = {},
): Chunk[] {
  const {
    maxChunkSize = 500,
    overlap = 50,
    separators = ["\n\n", "\n", ".", ",", " "],
  } = options;

  const chunks: Chunk[] = [];

  function splitRecursive(text: string, separatorIndex: number): string[] {
    if (text.length <= maxChunkSize) return [text];
    if (separatorIndex >= separators.length) {
      const parts: string[] = [];
      for (let i = 0; i < text.length; i += maxChunkSize - overlap) {
        parts.push(text.slice(i, i + maxChunkSize));
      }
      return parts;
    }

    const separator = separators[separatorIndex] as string;
    const parts = text.split(separator);

    const merged: string[] = [];
    let current = "";

    for (const part of parts) {
      const candidate = current ? current + separator + part : part;
      if (candidate.length > maxChunkSize && current) {
        merged.push(current);
        current = part;
      } else {
        current = candidate;
      }
    }

    if (current) merged.push(current);

    // If any chunk is still too large, split it with the next separator
    const result: string[] = [];
    for (const chunk of merged) {
      if (chunk.length > maxChunkSize) {
        result.push(...splitRecursive(chunk, separatorIndex + 1));
      } else {
        result.push(chunk);
      }
    }
    return result;
  }

  const rawChunks = splitRecursive(text, 0);

  for (let i = 0; i < rawChunks.length; i++) {
    const currentChunk = rawChunks[i];

    if (!currentChunk) {
      continue;
    }

    const trimmed = currentChunk.trim();

    if (trimmed.length > 0) {
      chunks.push({ text: trimmed, index: chunks.length });
    }
  }

  return chunks;
}
