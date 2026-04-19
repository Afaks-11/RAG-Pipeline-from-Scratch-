import Groq from "groq-sdk";
import { CONFIG } from "../config/config.js";
import type { RouteDecision } from "./interface/routeDecision.interface.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function routeQuery(query: string): Promise<RouteDecision> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // llama-3.3-70b-versatile or gemma2-9b-it
      messages: [
        {
          role: "system",
          content: `You are a strict query router for a RAG system.
Analyze the user's message and decide if it requires searching a document database, or if it is just a casual greeting.

If it is a greeting (e.g., "Hi", "Hello", "How is it going", "Hey there"):
Return EXACTLY: {"action": "GREETING"}

If it is a question requiring knowledge, facts, or context:
Return EXACTLY: {"action": "SEARCH"}

Return ONLY raw JSON. No markdown, no explanations, no other keys.`,
        },
        {
          role: "user",
          content: `Analyze this query: "${query}"`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    });

    const decision = JSON.parse(
      completion.choices[0]?.message.content!,
    ) as RouteDecision;
    if (decision.action === "GREETING") {
      console.log(` Router: Intercepted casual greeting. Bypassing database.`);
    } else {
      decision.action = "SEARCH";
      console.log(
        ` Router: Knowledge required. Waving through to vector search.`,
      );
    }

    return decision;
  } catch (error) {
    console.warn(
      " Router failed to parse response. Defaulting to SEARCH.",
      error,
    );
    return { action: "SEARCH" };
  }
}
