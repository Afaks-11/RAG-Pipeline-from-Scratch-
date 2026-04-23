import { fetchClient } from "./apiClient";
import type { Document } from "../types";

export const documentAPI = {
  listDocuments: () => {
    return fetchClient<Document[]>("/documents", {
      method: "GET",
    });
  },

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

  deleteDocument: (documentId: string) => {
    return fetchClient<{ message: string }>(`/documents/${documentId}`, {
      method: "DELETE",
    });
  },
};
