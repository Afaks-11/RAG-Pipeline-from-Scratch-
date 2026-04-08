import { eq, and, like, inArray } from "drizzle-orm";
import { db } from "../index.js";
import { documents } from "../schema/documents.js";
import { chunks } from "../schema/chunks.js";

export async function insertWithVersioning(
  userId: string,
  fileName: string,
  rawText: string,
  metadata: any,
  chunkTexts: string[],
  embeddings: number[][],
) {
  console.log(`[4/5] Checking for previous document versions...`);

  // Extract the base name using regex
  const match = fileName.match(/^(.*?)(?:_v\d+)?(\.[^.]+)$/i);
  // Fixed logic: extract group 1 from match, otherwise fallback
  const baseName = match ? match : fileName.replace(/\.[^/.]+$/, "");

  // Query the database for potential old versions belonging to this user
  const potentialOldDocs = await db
    .select({ id: documents.id, title: documents.document_name }) // Maps document_name to title for the check
    .from(documents)
    .where(
      and(
        eq(documents.user_id, userId),
        like(documents.document_name, `${baseName}%`), // Added % wildcard to match variations
      ),
    );

  // Strictly filter results so "Manual_For_Admins.pdf" isn't accidentally deleted
  const regexPattern = new RegExp(`^${baseName}(?:_v\\d+)?\\.[^.]+$`, "i");
  const docsToDelete = potentialOldDocs.filter((doc) =>
    regexPattern.test(doc.title),
  );

  // Wipe out the old versions
  if (docsToDelete.length > 0) {
    const docIdsToDelete = docsToDelete.map((doc) => doc.id);

    console.log(
      `      🗑️ Found old versions: ${docsToDelete.map((d) => d.title).join(", ")}`,
    );
    console.log(`      🗑️ Deleting old chunks and document records...`);

    await db.delete(chunks).where(inArray(chunks.documentId, docIdsToDelete));
    await db.delete(documents).where(inArray(documents.id, docIdsToDelete));
  } else {
    console.log(
      `      ✨ No previous versions found. Proceeding as new upload.`,
    );
  }

  // Insert the new document
  console.log(
    `[5/5] Inserting ${fileName} and its embeddings into the database...`,
  );

  const [newDoc] = await db
    .insert(documents)
    .values({
      user_id: userId,
      document_name: fileName, // 👈 FIXED: Changed from 'title' to 'document_name'
      metadata: metadata, // 👈 FIXED: Removed 'content' as it's not in your documents schema
    })
    .returning({ id: documents.id });

  if (!newDoc) {
    throw new Error("Failed to insert new document");
  }

  // Map and insert the new chunks
  const chunksToInsert = chunkTexts.map((text, index) => {
    const currentEmbedding = embeddings[index];

    // Safety check to satisfy TypeScript (and catch actual API errors!)
    if (!currentEmbedding) {
      throw new Error(
        `Critical Error: Missing embedding vector for chunk ${index}.`,
      );
    }

    return {
      userId: userId,
      documentId: newDoc.id,
      chunkIndex: index,
      content: text,
      embedding: currentEmbedding, // TS now knows this is 100% a number[]
    };
  });

  await db.insert(chunks).values(chunksToInsert);

  console.log(
    `      ✅ Successfully saved ${fileName} and ${chunksToInsert.length} vectorized chunks!`,
  );
}
