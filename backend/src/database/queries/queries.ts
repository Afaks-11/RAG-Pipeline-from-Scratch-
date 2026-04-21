import { eq, and, like, inArray } from "drizzle-orm";
import { db } from "../index.js";
import { documents } from "../schema/documents.js";
import { chunks } from "../schema/chunks.js";

export async function insertWithVersioning(
  userId: string,
  documentId: string,
  metadata: Record<string, unknown>,
  chunkTexts: string[],
  embeddings: number[][],
) {
  await db.transaction(async (tx) => {
    await tx
      .update(documents)
      .set({ metadata: metadata })
      .where(eq(documents.id, documentId));

    await db.delete(chunks).where(eq(chunks.documentId, documentId));

    await tx.insert(chunks).values(chunksToInsert);
  });

  const chunksToInsert = chunkTexts.map((text, index) => {
    const currentEmbedding = embeddings[index];

    if (!currentEmbedding) {
      throw new Error(
        `Critical Error: Missing embedding vector for chunk ${index}.`,
      );
    }

    return {
      userId: userId,
      documentId: documentId,
      chunkIndex: index,
      content: text,
      embedding: currentEmbedding,
    };
  });

  await db.insert(chunks).values(chunksToInsert);

  console.log(
    `       Successfully saved ${chunksToInsert.length} new vectorized chunks!`,
  );
}