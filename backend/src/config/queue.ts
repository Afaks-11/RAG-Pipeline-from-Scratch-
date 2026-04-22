import { Queue } from "bullmq";
import { Redis } from "ioredis";

import { CONFIG } from "./config.js";

const redisConnection = new Redis(CONFIG.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const pdfQueue = new Queue("pdf-ingestion-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
