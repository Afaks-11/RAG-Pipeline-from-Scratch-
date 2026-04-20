import { fetchClient } from "./apiClient";
import type { Document } from "../types";

export const documentAPI = {
  // GET all the document
  listDocuments: () => {
    return fetchClient<Document[]>("/documents", {
      method: "GET",
    });
  },

  //POST Upload a new PDF
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchClient<{ message: string; document: Document }>(
      "/documents/upload",
      {
        method: "POST",
        body: formData,
      },
    );
  },

  // Delete Remove a document
  deleteDocument: (documentId: string) => {
    return fetchClient<{ message: string }>(`/documents/${documentId}`, {
      method: "DELETE",
    });
  },
};
