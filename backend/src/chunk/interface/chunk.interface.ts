export interface Chunk {
  text: string;
  index: number;
  metadata?: Record<string, unknown>;
}
