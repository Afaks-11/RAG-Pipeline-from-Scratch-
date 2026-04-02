import type { SearchResult } from "../../database/interface/searchResult.interface.js";

export interface GenerationResult {
  answer: string;
  sources: SearchResult[];
  prompt: string;
}
