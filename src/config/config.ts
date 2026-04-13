import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  GROQ: process.env.GROQ_API_KEY,
  VOYAGE: process.env.VOYAGE_API_KEY,
};
