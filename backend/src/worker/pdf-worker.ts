import { Worker, Job } from "bullmq";
import { Redis } from "ioredis";
import { eq } from "drizzle-orm";
import fs from "fs/promises";

import { db } from "../database/index.js";
import { documents } from "../database/schema/documents.js";
import { ingestPDF } from "../ingestion/ingestion.js";
import { CONFIG } from "../config/config.js";

const redisConnection = new Redis(CONFIG.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const pdfworker = new Worker(
  "pdf-ingestion-queue",
  async (job: Job) => {
    const { fileUrl, documentId, userId } = job.data;

    console.log(
      `[Worker] Job ${job.id}: Starting ingestion for doc ${documentId}`,
    );

    try {
      await db
        .update(documents)
        .set({ status: "PROCESSING" })
        .where(eq(documents.id, documentId));

      await ingestPDF(fileUrl, userId, documentId);

      await db
        .update(documents)
        .set({ status: "COMPLETED" })
        .where(eq(documents.id, documentId));

      await fs.unlink(fileUrl);

      console.log(`[Worker] Job ${job.id} completed successfully!`);
      return { success: true };
    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error);

      const isLastAttempt = job.attemptsMade + 1 >= (job.opts.attempts || 3);

      if (isLastAttempt) {
        await db
          .update(documents)
          .set({ status: "FAILED" })
          .where(eq(documents.id, documentId));

        try {
          await fs.unlink(fileUrl);
        } catch {}
      }

      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 1,
    limiter: {
      max: 3,
      duration: 61000,
    },
  },
);

pdfworker.on("error", (err) => {
  console.error("[Worker] Connection error: ", err);
});
