import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import ChatBubble from "../chat/ChatBubble";
import ChatInput from "../chat/ChatInput";
import type { MainStageProps } from "../../types";

export default function MainStage({
  selectedDocId,
  selectedDocName,
}: MainStageProps) {
  const { messages, isTyping, sendMessage, loadHistory } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    if (!selectedDocId) {
      alert("Please select a document from the sidebar first!");
      return;
    }
    sendMessage(text, selectedDocId);
  };

  // Auto-scroll to the bottom whenever messages change or AI is typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (selectedDocId) {
      loadHistory(selectedDocId);
    }
  }, [selectedDocId]);

  return (
    <main className="flex-1 flex flex-col relative bg-white h-screen">
      {/* Top Header - Now handles the Document Name display! */}
      <header className="h-19 border-b border-gray-100 flex flex-col justify-center px-8 bg-white shrink-0">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          Knowledge Base Chat
        </h2>
        {selectedDocName && (
          <p className="text-sm text-blue-600 flex items-center ml-7 mt-0.5">
            Chatting with:{" "}
            <span className="font-semibold ml-1 truncate max-w-md">
              {selectedDocName}
            </span>
          </p>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              How can I help you?
            </h3>
            <p className="text-gray-500 text-sm">
              Upload a document on the left and ask me questions about it. I
              will provide answers with exact citations.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            {isTyping && (
              <div className="flex w-full mb-6 justify-start">
                <div className="bg-gray-100 text-gray-500 rounded-2xl py-3 px-5 text-sm rounded-tl-sm animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-100 shrink-0">
        <ChatInput
          onSend={handleSend}
          isLoading={isTyping}
          disabled={!selectedDocId}
        />
      </div>
    </main>
  );
}
