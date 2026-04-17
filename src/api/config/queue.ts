import { Queue } from "bullmq";
import { Redis } from "ioredis";

const redisConnection = new Redis(
  process.env.Redis_URL || "redis://localhost:6379",
);

export const pdfQueue = new Queue("pdf-ingestion-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true, // Keep Redis memory clean after success
    removeOnFail: false, // Keep failed jobs so you can inspect them
  },
});
