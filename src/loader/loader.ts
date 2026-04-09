import fs from "fs";
import path from "path";
// @ts-ignore - The TS types are broken and claim this isn't callable, but it is.
import { PDFParse } from "pdf-parse";

import { chunkText } from "../chunk/chunker.js";
import { embedBatch } from "../embedding/embedding.js";
import { insertWithVersioning } from "../database/queries/queries.js";
// You don't even need to import db, documents, or chunks here anymore!

/**
 * Ingests a raw PDF file, chunks it, embeds it, and saves it securely to Postgres.
 * @param filePath The local path to the PDF file
 * @param userId The UUID of the user who owns this document
 */
export async function ingestPDF(filePath: string, userId: string) {
  console.log(`[1/5] Loading file from disk: ${filePath}...`);
  const dataBuffer = fs.readFileSync(filePath);

  console.log(`[2/5] Extracting raw text from PDF...`);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  const rawText = result.text;

  const info = await parser.getInfo();
  // Bypass TypeScript's strict rules so we can safely check both metadata locations
  const pdfInfo = (info as any).info || {};
  const pdfMeta = (info as any).metadata || {};

  const documentMetadata = {
    pages: info.total || (info as any).pages || 0,
    // Fallbacks just in case the PDF was saved without author properties
    author: pdfInfo.Author || pdfMeta.Author || pdfMeta.author || "Unknown",
    source: filePath,
  };
  await parser.destroy();
  console.log(`      Extracted ${result.total} pages.`);
  console.log(`      Extracted ${documentMetadata.pages} pages.`);
  console.log(`      Author: ${documentMetadata.author}`);

  console.log(`[3/5] Slicing text into chunks...`);
  const textChunks = chunkText(rawText, { maxChunkSize: 500, overlap: 50 });
  console.log(`      Created ${textChunks.length} chunks.`);

  console.log(
    `[4/5] Fetching embeddings from Gemini (this may take a moment)...`,
  );

  // Convert objects to pure strings for the embedder and the database
  const chunkStrings = textChunks.map((c) => c.text);
  const embeddings = await embedBatch(chunkStrings);

  // [5/5] Save to the database using the robust versioning logic!
  const fileName = path.basename(filePath);
  await insertWithVersioning(
    userId,
    fileName,
    rawText,
    documentMetadata,
    chunkStrings, // 👈 Using the pure string array here!
    embeddings,
  );

  console.log(
    `\n🎉 Success! Document fully ingested and secured in vector database.`,
  );
}
