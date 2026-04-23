import { fetchClient } from "./apiClient";
import type {
  ChatMessage,
  ChatRequestPayload,
  ChatAPIResponse,
} from "../types";

export const chatAPI = {
  sendMessage: (query: string, documentId: string) => {
    return fetchClient<ChatAPIResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ query, documentId } satisfies ChatRequestPayload),
    });
  },

  getHistory: (documentId: string) => {
    return fetchClient<ChatMessage[]>(
      `/chat/history?documentId=${documentId}`,
      {
        method: "GET",
      },
    );
  },
};
