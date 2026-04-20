import { fetchClient } from "./apiClient";
import type { ChatRequestPayload } from "../types";

interface ChatAPIResponse {
  reply: string;
  sources?: string[];
  error?: string;
}

export const chatAPI = {
  sendMessage: (query: string, documentId: string) => {
    return fetchClient<ChatAPIResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ query, documentId } satisfies ChatRequestPayload),
    });
  },
};
