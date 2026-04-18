import { Worker, Job } from "bullmq";
import { Redis } from "ioredis";
import { eq } from "drizzle-orm";
import fs from "fs";

import { db } from "../database/index.js";
import { documents } from "../database/schema/documents.js";
import { ingestPDF } from "../loader/loader.js";

const redisConnection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  { maxRetriesPerRequest: null },
);

/**
 * The secret sauce: A helper to pause execution and respect Voyage AI's rate limits.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper to pause execution and respect Voyage AI's rate limits.
 */
export const pdfworker = new Worker(
  "pdf-ingestion-queue",
  async (job: Job) => {
    const { fileUrl, documentId, userId } = job.data;

    console.log(
      `[Worker] Job ${job.id}: Starting ingestion for doc ${documentId}`,
    );

    try {
      // Update DB status to "PROCESSING"
      await db
        .update(documents)
        .set({ status: "PROCESSING" })
        .where(eq(documents.id, documentId));

      // Fetch and Parse PDF
      console.log(`[Worker] Extracting text...`);
      await ingestPDF(fileUrl, userId, documentId);

      //  Mark Document as "COMPLETED" in the database
      await db
        .update(documents)
        .set({ status: "COMPLETED" })
        .where(eq(documents.id, documentId));
      const chunks = ["chunk1", "chunk2", "chunk3"]; // Placeholder until we drop in your chunk logic

      //  Delete the temporary file from the disk
      if (fs.existsSync(fileUrl)) {
        fs.unlinkSync(fileUrl);
      }

      // 5. Mark Document as "COMPLETED" in the database
      await db
        .update(documents)
        .set({ status: "COMPLETED" })
        .where(eq(documents.id, documentId));

      // Delete the temporary file from the disk to prevent server bloat
      if (fs.existsSync(fileUrl)) {
        fs.unlinkSync(fileUrl);
      }

      console.log(`[Worker] Job ${job.id} completed successfully!`);
      return { success: true };
    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error);

      // 6. Mark Document as "FAILED" so the user sees it on the frontend
      await db
        .update(documents)
        .set({ status: "FAILED" })
        .where(eq(documents.id, documentId));

      // Throw error to trigger BullMQ's automatic retry backoff
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 1,
  },
);

pdfworker.on("error", (err) => {
  console.error("[Worker] Connection error: ", err);
});
