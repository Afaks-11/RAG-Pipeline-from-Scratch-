import CitationChip from "./CitationChip";
import type { ChatMessage } from "../../types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-5 ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
        }`}
      >
        <div className="whitespace-pre-wrap leading-relaxed text-sm">
          {message.content}
        </div>

        {/* Render citations if this is an AI message and citations exist */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Sources
            </p>
            <div className="flex flex-wrap">
              {message.citations.map((cite, index) => (
                <CitationChip key={index} citation={cite} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
