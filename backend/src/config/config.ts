import * as dotenv from "dotenv";
dotenv.config();

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const CONFIG = {
  GROQ: requireEnv("GROQ_API_KEY"),
  VOYAGE: requireEnv("VOYAGE_API_KEY"),
  JWT: requireEnv("JWT_SECRET"),
  REDIS_URL: requireEnv("REDIS_URL") || "redis://localhost:6379",
};
