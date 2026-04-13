import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
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
