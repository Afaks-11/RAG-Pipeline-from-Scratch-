import { useState, useEffect, useCallback } from "react";
import { documentAPI } from "../services/documentAPI";
import type { Document } from "../types";

export function useDocs() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the fetch function so we can use it safely inside useEffect
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

  // 1. Initial Fetch & Smart Polling Logic
  useEffect(() => {
    // Fetch immediately on mount
    fetchDocuments();

    // Check if ANY document is currently stuck in the "PROCESSING" state
    const hasProcessingDocs = documents.some(
      (doc) => doc.status === "PROCESSING",
    );

    let intervalId: ReturnType<typeof setInterval>;

    if (hasProcessingDocs) {
      // If we have processing docs, ping the database every 3 seconds
      intervalId = setInterval(() => {
        fetchDocuments();
      }, 3000);
    }

    // Cleanup: Stop the timer if the component unmounts or if processing finishes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [documents, fetchDocuments]);

  // 2. Upload Wrapper
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
