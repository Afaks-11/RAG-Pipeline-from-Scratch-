import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  API_KEY: process.env.GEMINI_API_KEY,
};
