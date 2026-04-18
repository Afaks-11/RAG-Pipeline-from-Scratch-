import { eq, and, like, inArray } from "drizzle-orm";
import { db } from "../index.js";
import { documents } from "../schema/documents.js";
import { chunks } from "../schema/chunks.js";

export async function insertWithVersioning(
  userId: string,
  documentId: string,
  metadata: any,
  chunkTexts: string[],
  embeddings: number[][],
) {
  console.log(`[4/5] Updating database for document ID: ${documentId}...`);

  //  Update the metadata for the existing row
  await db
    .update(documents)
    .set({ metadata: metadata })
    .where(eq(documents.id, documentId));

  // DELETE OLD CHUNKS (Wipes out version 1's chunks so they don't overlap)
  console.log(`       Deleting any old chunks for this document...`);
  await db.delete(chunks).where(eq(chunks.documentId, documentId));

  // INSERT NEW CHUNKS (Inserts version 2's chunks)
  console.log(
    `[5/5] Inserting ${chunkTexts.length} new vectorized chunks into the database...`,
  );

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