import { useState, useEffect, useCallback } from "react";
import { documentAPI } from "../services/documentAPI";
import type { Document } from "../types";

export function useDocs() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchDocuments = useCallback(async () => {
    try {
      const data = await documentAPI.listDocuments();
      setDocuments(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial Fetch & Smart Polling Logic
  useEffect(() => {
    fetchDocuments();

      const hasProcessingDocs = documents.some(
      (doc) => doc.status === "PROCESSING",
    );

    let intervalId: ReturnType<typeof setInterval>;

    if (hasProcessingDocs) {

      intervalId = setInterval(() => {
        fetchDocuments();
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [documents, fetchDocuments]);

 const uploadFile = async (file: File) => {
    try {
      await documentAPI.uploadDocument(file);
      // Immediately refetch so the UI instantly shows the new "PROCESSING" card
      await fetchDocuments();
    } catch (err: any) {
      throw new Error(err.message || "Failed to upload document");
    }
  };

  return {
    documents,
    isLoading,
    error,
    uploadFile,
    refetch: fetchDocuments,
  };
}
