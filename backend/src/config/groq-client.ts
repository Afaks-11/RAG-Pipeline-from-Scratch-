import Groq from "groq-sdk";
import { CONFIG } from "./config.js";

export const groq = new Groq({ apiKey: CONFIG.GROQ });
