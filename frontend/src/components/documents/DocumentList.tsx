import DocumentCard from "./DocumentCard";
import type { Document } from "../../types";

interface DocumentListProps {
  documents: Document[];
  onSelectDocument?: (id: string) => void;
  selectedDocumentId: string | null;
}

export default function DocumentList({
  documents,
  onSelectDocument,
  selectedDocumentId,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center p-4 text-sm text-gray-500">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          isActive={doc.id === selectedDocumentId}
          onClick={() => onSelectDocument && onSelectDocument(doc.id)}
        />
      ))}
    </div>
  );
}
