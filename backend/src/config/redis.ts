import { createClient } from "redis";
import { CONFIG } from "./config.js";

export const redisClient = createClient({
  url: CONFIG.REDIS_URL,
});
redisClient.on("error", (err) => console.error(" Redis Error:", err));

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log(" Redis connected");
  } catch (err) {
    console.warn("Redis failed to connect, continuing without cache");
  }
}

connectRedis();