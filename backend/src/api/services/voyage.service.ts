import { CONFIG } from "../../config/config.js";

interface VoyageEmbeddingResponse {
  data?: { embedding: number[] }[];
}

export interface RerankData {
  index: number;
  relevance_score: number;
}

interface VoyageRerankResponse {
  data?: RerankData[];
}

const VOYAGE_API_URL = "https://api.voyageai.com/v1";
const DEFAULT_TIMEOUT_MS = 61000; // 61 seconds

/**
 * Fetch wrapper that throws an error if the request takes too long
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(`Voyage API request timed out after ${timeoutMs}ms`);
    }
    throw error;
  }
}

export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetchWithTimeout(`${VOYAGE_API_URL}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.VOYAGE}`,
    },
    body: JSON.stringify({
      input: texts,
      model: "voyage-3",
    }),
  });

  const data = (await response.json()) as VoyageEmbeddingResponse;

  if (!response.ok || !data.data) {
    throw new Error(`Voyage Embedding API Error: ${JSON.stringify(data)}`);
  }

  return data.data.map((item) => item.embedding);
}

export async function rerankDocuments(
  query: string,
  documents: string[],
  topK: number,
): Promise<RerankData[]> {
  const response = await fetchWithTimeout(`${VOYAGE_API_URL}/rerank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.VOYAGE}`,
    },
    body: JSON.stringify({
      query: query,
      documents: documents,
      model: "rerank-2.5",
      top_k: topK,
    }),
  });

  const data = (await response.json()) as VoyageRerankResponse;

  if (!response.ok || !data.data) {
    throw new Error(`Voyage Rerank API Error: ${JSON.stringify(data)}`);
  }

  return data.data;
}
