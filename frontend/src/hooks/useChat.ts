import { useState } from "react";
import { chatAPI } from "../services/chatAPI";
import type { ChatMessage } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async (documentId: string) => {
    setMessages([]); // Clear the screen instantly
    setError(null);

    try {
      // Fetch the history for this specific document
      const history = await chatAPI.getHistory(documentId);

      // Ensure the history maps to your UI's ChatMessage format
      const formattedHistory = history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        // Optional: If you stored citations in the DB, map them here. Otherwise, leave empty.
        citations: [],
      }));

      setMessages(formattedHistory);
    } catch (err: any) {
      console.error("Failed to load history", err);
      setError("Failed to load chat history for this document.");
    }
  };

  const sendMessage = async (query: string, documentId: string) => {
    // Instantly push the user's message to the UI
    const userMessage: ChatMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);

    // Trigger the "AI is thinking..." visual state
    setIsTyping(true);
    setError(null);

    try {
      // Make the actual POST request to your Express /chat endpoint
      const rawResponse = await chatAPI.sendMessage(query, documentId);

      // Format the response to exactly what ChatBubble.tsx expects
      const formattedMessage: ChatMessage = {
        role: "assistant",
        content: rawResponse.reply || "No response text received from backend.",
        citations: rawResponse.sources || [],
      };

      // Append the formatted AI response to the screen
      setMessages((prev) => [...prev, formattedMessage]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(err.message || "Failed to get a response");

      // Graceful fallback: show an error bubble in the chat UI
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error connecting to the knowledge base. Please try again.",
        },
      ]);
    } finally {
      // 6. Turn off the loading spinner
      setIsTyping(false);
    }
  };

  // Helper to clear the screen
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
