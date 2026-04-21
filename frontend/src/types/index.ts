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
  sources?: string[];
}

export interface ChatRequestPayload {
  query: string;
  documentId: string;
}

export interface SideBarProps {
  selectedDocId: string | null;
  onSelectDoc: (id: string, docName: string) => void;
}

export interface MainStageProps {
  selectedDocId: string | null;
  selectedDocName: string | null;
}
