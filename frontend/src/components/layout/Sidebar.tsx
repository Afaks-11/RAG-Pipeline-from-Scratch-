import React, { useRef } from "react";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { useDocs } from "../../hooks/useDocs";
import DocumentList from "../documents/DocumentList";
import Button from "../ui/Button";
import type { SideBarProps } from "../../types";

export default function Sidebar({ selectedDocId, onSelectDoc }: SideBarProps) {
  const { documents, isLoading, error, uploadFile } = useDocs();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const file = files[0];

    try {
      setIsUploading(true);
      await uploadFile(file);
    } catch (err) {
      alert("Upload failed. Make sure your backend is running!");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  return (
    <aside className="w-75 h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Header & Primary Action */}
      <div className="p-5 border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-600 mb-5 flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          DocuRAG AI
        </h1>

        {/* Hidden file input controlled by our Button */}
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button
          className="w-full"
          isLoading={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {!isUploading && <UploadCloud className="w-5 h-5" />}
          <span>Upload PDF</span>
        </Button>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Your Documents
        </h2>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-3 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading && documents.length === 0 ? (
          <div className="text-sm text-gray-400 text-center mt-4">
            Loading documents...
          </div>
        ) : (
          <DocumentList
            documents={documents}
            selectedDocumentId={selectedDocId}
            onSelectDocument={(id: string) => {
              const doc = documents.find((d: any) => d.id === id);
              const docName = doc?.documentName || "unknown Document";
              onSelectDoc(id, docName);
            }}
          />
        )}
      </div>
    </aside>
  );
}
