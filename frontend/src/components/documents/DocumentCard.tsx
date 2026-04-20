import { CheckCircle2, Loader2, AlertCircle, FileText } from "lucide-react";
import type { Document } from "../../types";

interface DocumentCardProps {
  document: Document;
  isActive?: boolean;
  onClick?: () => void;
}

export default function DocumentCard({
  document,
  isActive,
  onClick,
}: DocumentCardProps) {
  const isCompleted = document.status === "COMPLETED";
  const isProcessing = document.status === "PROCESSING";

  return (
    <div
      onClick={onClick}
      className={`p-3.5 border rounded-xl transition-all cursor-pointer ${
        isActive
          ? "ring-2 ring-blue-500 bg-blue-50 border-transparent"
          : isCompleted
            ? "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
            : "bg-gray-50 border-gray-200 opacity-70"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <FileText className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-semibold text-sm text-gray-800 truncate pr-2">
            {document.documentName}
          </span>
        </div>
        <span className="bg-gray-100 text-gray-500 font-bold text-[10px] px-2 py-0.5 rounded-full border border-gray-200 shrink-0">
          v{document.version || 1}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-green-600 font-medium">Ready to chat</span>
          </>
        ) : isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
            <span className="text-yellow-600 font-medium animate-pulse">
              Processing...
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-600 font-medium">Failed</span>
          </>
        )}
      </div>
    </div>
  );
}
