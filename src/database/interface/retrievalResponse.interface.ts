import type { SearchResult } from "./searchResult.interface.js";

export interface RetrievalResponse {
  status: "CONFIDENT" | "UNSURE" | "NO_ANSWER";
  chunks: SearchResult[];
}
