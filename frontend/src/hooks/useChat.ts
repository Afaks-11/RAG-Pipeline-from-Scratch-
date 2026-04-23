import { useState } from "react";
import { chatAPI } from "../services/chatAPI";
import type { ChatMessage } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async (documentId: string) => {
    setMessages([]);
    setError(null);

    try {
      const history = await chatAPI.getHistory(documentId);

      const formattedHistory = history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        citations: [],
      }));

      setMessages(formattedHistory);
    } catch (err: any) {
      console.error("Failed to load history", err);
      setError("Failed to load chat history for this document.");
    }
  };

  const sendMessage = async (query: string, documentId: string) => {
    const userMessage: ChatMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const rawResponse = await chatAPI.sendMessage(query, documentId);

      const formattedMessage: ChatMessage = {
        role: "assistant",
        content: rawResponse.reply || "No response text received from backend.",
        citations: rawResponse.sources || [],
      };

      setMessages((prev) => [...prev, formattedMessage]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(err.message || "Failed to get a response");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error connecting to the knowledge base. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => setMessages([]);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
    loadHistory,
  };
}
