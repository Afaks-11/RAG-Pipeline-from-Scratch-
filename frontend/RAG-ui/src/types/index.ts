export interface Document {
  id: string;
  documentName: string;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  version: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  citations?: string[];
}
