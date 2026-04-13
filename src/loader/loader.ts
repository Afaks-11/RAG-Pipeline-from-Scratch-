import fs from "fs";
import path from "path";
// @ts-ignore - The TS types are broken and claim this isn't callable, but it is.
import { PDFParse } from "pdf-parse";

import { chunkText } from "../chunk/chunker.js";
import { embedBatch } from "../embedding/embedding.js";
import { insertWithVersioning } from "../database/queries/queries.js";

export async function ingestPDF(filePath: string, userId: string) {
  console.log(`[1/5] Loading file from disk: ${filePath}...`);
  const dataBuffer = fs.readFileSync(filePath);

  console.log(`[2/5] Extracting raw text from PDF...`);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  const rawText = result.text;

  const info = await parser.getInfo();
  const pdfInfo = (info as any).info || {};
  const pdfMeta = (info as any).metadata || {};

  const documentMetadata = {
    pages: info.total || (info as any).pages || 0,
    author: pdfInfo.Author || pdfMeta.Author || pdfMeta.author || "Unknown",
    source: filePath,
  };
  await parser.destroy();
  console.log(`      Extracted ${result.total} pages.`);
  console.log(`      Author: ${documentMetadata.author}`);

  console.log(`[3/5] Slicing text into chunks...`);
  const textChunks = chunkText(rawText, { maxChunkSize: 500, overlap: 50 });
  console.log(`      Created ${textChunks.length} chunks.`);

  // Updated Log here!
  console.log(
    `[4/5] Fetching embeddings from Voyage AI (this may take a moment)...`,
  );

  const chunkStrings = textChunks.map((c) => c.text);
  const embeddings = await embedBatch(chunkStrings);

  const fileName = path.basename(filePath);
  await insertWithVersioning(
    userId,
    fileName,
    rawText,
    documentMetadata,
    chunkStrings,
    embeddings,
  );

  console.log(
    `\n🎉 Success! Document fully ingested and secured in vector database.`,
  );
}