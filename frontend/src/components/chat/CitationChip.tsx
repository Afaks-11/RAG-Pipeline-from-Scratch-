import { BookOpen } from "lucide-react";

interface CitationChipProps {
  citation: string;
  onClick?: () => void;
}

export default function CitationChip({ citation, onClick }: CitationChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md transition-colors mt-2 mr-2"
    >
      <BookOpen className="w-3 h-3" />
      {citation}
    </button>
  );
}
