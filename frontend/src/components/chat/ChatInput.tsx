import React, { useState } from "react";
import { Send } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText(""); // Clear input after sending
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question about your documents..."
          disabled={isLoading}
          className="pr-16 shadow-sm" // Extra padding on right for the absolute button
        />
        <div className="absolute right-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={!text.trim()}
            className="p-2! rounded-lg" // Override padding to make it a square icon button
          >
            {/* Only show Send icon if not loading */}
            {!isLoading && <Send className="w-5 h-5" />}
          </Button>
        </div>
      </form>
      <p className="text-center text-xs text-gray-400 mt-2">
        AI can make mistakes. Always verify with your source documents.
      </p>
    </div>
  );
}
