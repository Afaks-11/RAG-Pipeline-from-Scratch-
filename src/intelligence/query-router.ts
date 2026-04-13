import Groq from "groq-sdk";
import { CONFIG } from "../config/config.js";
import type { RouteDecision } from "./interface/routeDecision.interface.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function routeQuery(query: string): Promise<RouteDecision> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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

// import { GoogleGenerativeAI } from "@google/generative-ai";

// import { CONFIG } from "../config/config.js";
// import type { RouteDecision } from "./interface/routeDecision.interface.js";

// const genAI = new GoogleGenerativeAI(CONFIG.API_KEY || "");

// /**
//  * Acts as the bouncer for the RAG pipeline.
//  * Evaluates if a query needs a database search, or if it's just casual small talk.
//  */
// export async function routeQuery(query: string): Promise<RouteDecision> {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: { responseMimeType: "application/json" },
//   });

//   const prompt = `
//         You are a highly efficient query router for an enterprise search system.
//         Analyze the user's message and decide if it requires searching a database for documents, or if it is just a casual greeting/small talk.

//         If it is a simple greeting (e.g., "Hi", "Hello", "How are you", "Who are you"):
//         Respond with EXACTLY this JSON format:
//         { "action": "GREETING", "directResponse": "A short, friendly, helpful greeting." }

//         If it is a question that requires actual knowledge, facts, or context:
//         Respond with EXACTLY this JSON format:
//         { "action": "SEARCH" }

//         User Message: "${query}"
//         JSON Response:`;

//   try {
//     const result = await model.generateContent(prompt);
//     let text = result.response.text().trim();

//     // Strip out markdown code blocks if the LLM wrapped the JSON
//     text = text
//       .replace(/```json/gi, "")
//       .replace(/```/g, "")
//       .trim();

//     const decision = JSON.parse(text) as RouteDecision;

//     if (decision.action === "GREETING") {
//       console.log(` Router: Intercepted casual greeting. Bypassing database.`);
//     } else {
//       console.log(
//         ` Router: Knowledge required. Waving through to vector search.`,
//       );
//     }

//     return decision;
//   } catch (error) {
//     // If the LLM glitches or returns bad JSON, default to searching just to be safe!
//     console.warn(" Router failed to parse response. Defaulting to SEARCH.");
//     return { action: "SEARCH" };
//   }
// }
