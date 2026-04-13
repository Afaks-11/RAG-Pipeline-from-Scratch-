import { performance } from "perf_hooks";
import Groq from "groq-sdk";

import { routeQuery } from "../intelligence/query-router.js";
import {
  rewriteQuery,
  saveChatMessage,
} from "../database/queries/query-rewriter.js";
import { search } from "../database/vector-store.js";
import { CONFIG } from "../config/config.js";
import { redisClient } from "../config/redis.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function runChatPipeline(rawQuery: string, userId: string) {
  const totalStartTime = performance.now();
  console.log(`\n==========================================`);
  console.log(` STARTING PIPELINE: "${rawQuery}"`);
  console.log(`==========================================`);

  try {
    const cacheKey = `chat_cache_v2:${userId}:${rawQuery.toLowerCase().trim()}`;
    let cachedResponse: string | null = null;

    const isRedisReady = redisClient.isOpen;
    if (isRedisReady) {
      try {
        cachedResponse = await redisClient.get(cacheKey);
      } catch {
        console.warn("Cache read failed");
      }
    }

    if (cachedResponse) {
      console.log(` CACHE HIT: Returning instant answer )`);
      const totalTime = performance.now() - totalStartTime;
      console.log(` Total Pipeline Time: ${totalTime.toFixed(2)}ms\n`);
      return JSON.parse(cachedResponse);
    }

    const routingDecision = await routeQuery(rawQuery);
    if (routingDecision.action === "GREETING") {
      const responsePayload = {
        answer:
          "Hello! I am your AI assistant. How can I help you with your documents today?",
        sources: [],
      };
      if (isRedisReady) {
        try {
          await redisClient.setEx(
            cacheKey,
            3600,
            JSON.stringify(responsePayload),
          );
        } catch {
          console.warn("Cache write failed");
        }
      }
      return responsePayload;
    }

    await saveChatMessage(userId, "user", rawQuery);

    const rewriteStart = performance.now();
    const finalQuery = await rewriteQuery(rawQuery, userId);
    console.log(
      ` Rewrite took: ${(performance.now() - rewriteStart).toFixed(2)}ms`,
    );

    const searchStart = performance.now();
    let searchResults;
    try {
      searchResults = await search(finalQuery, userId);
      console.log(
        ` Hybrid Search & Rerank took: ${(performance.now() - searchStart).toFixed(2)}ms`,
      );
    } catch (dbError) {
      console.error(" Database Pipeline Failed:", dbError);
      return { error: "An internal database error occurred." };
    }

    if (searchResults.status === "NO_ANSWER") {
      console.log(` NO ANSWER: Could not find relevant documents.`);
      return {
        answer: "I couldn't find any documents to answer that.",
        sources: [],
      };
    }

    const llmStart = performance.now();
    try {
      const contextText = searchResults.chunks
        .map((c: any) => c.content)
        .join("\n\n");

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a helpful enterprise assistant. Use ONLY the following context to answer the user's question. If the status is "UNSURE", add a disclaimer that you might not have the full picture.\n\nStatus: ${searchResults.status}`,
          },
          {
            role: "user",
            content: `Context:\n${contextText}\n\nQuestion: ${finalQuery}`,
          },
        ],
        temperature: 0.1,
      });

      const finalAnswer = completion.choices[0]?.message?.content || "";

      console.log(
        ` LLM Generation took: ${(performance.now() - llmStart).toFixed(2)}ms`,
      );

      await saveChatMessage(userId, "assistant", finalAnswer);

      const successPayload = {
        answer: finalAnswer,
        sources: searchResults.chunks.map((c: any) => c.id),
      };

      try {
        await redisClient.setEx(cacheKey, 300, JSON.stringify(successPayload));
      } catch {
        console.warn("Cache write failed");
      }

      const totalTime = performance.now() - totalStartTime;
      console.log(` Total Pipeline Time: ${totalTime.toFixed(2)}ms\n`);

      return successPayload;
    } catch (aiError) {
      console.error(" LLM Generation Failed:", aiError);
      return {
        answer:
          "I found these documents, but the AI couldn't summarize them right now.",
        sources: searchResults.chunks,
      };
    }
  } catch (globalError) {
    console.error(" Critical Pipeline Failure:", globalError);
    return { error: "A critical error occurred processing your request." };
  }
}

// import { performance } from "perf_hooks";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// import { routeQuery } from "../intelligence/query-router.js";
// import {
//   rewriteQuery,
//   saveChatMessage,
// } from "../database/queries/query-rewriter.js";
// import { search } from "../database/vector-store.js";
// import { CONFIG } from "../config/config.js";
// import { redisClient } from "../config/redis.js";

// const genAI = new GoogleGenerativeAI(CONFIG.API_KEY || "");

// /**
//  * The Master RAG Pipeline
//  * Enforces Phase 4 requirements: Caching, Error Boundaries, and Observability.
//  */
// export async function runChatPipeline(rawQuery: string, userId: string) {
//   const totalStartTime = performance.now();
//   console.log(`\n==========================================`);
//   console.log(` STARTING PIPELINE: "${rawQuery}"`);
//   console.log(`==========================================`);

//   try {
//     // IMPLEMENT CACHING (Speed)
//     // Normalize the query so "What is X" and "what is x " hit the same cache
//     const cacheKey = `chat_cache:${userId}:${rawQuery.toLowerCase().trim()}`;
//     let cachedResponse: string | null = null;

//     // check Redis status here
//     const isRedisReady = redisClient.isOpen;
//     if (isRedisReady) {
//       try {
//         cachedResponse = await redisClient.get(cacheKey);
//       } catch {
//         console.warn("Cache read failed");
//       }
//     }

//     if (cachedResponse) {
//       console.log(` CACHE HIT: Returning instant answer )`);
//       const totalTime = performance.now() - totalStartTime;
//       console.log(` Total Pipeline Time: ${totalTime.toFixed(2)}ms\n`);
//       return JSON.parse(cachedResponse);
//     }

//     // STEP 10: QUERY ROUTING (The Bouncer)
//     const routingDecision = await routeQuery(rawQuery);
//     if (routingDecision.action === "GREETING") {
//       const responsePayload = {
//         answer: routingDecision.directResponse,
//         sources: [],
//       };
//       // Cache greetings for 1 hour (3600 seconds)
//       if (isRedisReady) {
//         try {
//           await redisClient.setEx(
//             cacheKey,
//             3600,
//             JSON.stringify(responsePayload),
//           );
//         } catch {
//           console.warn("Cache write failed");
//         }
//       }
//       return responsePayload;
//     }

//     //  MEMORY & REWRITER
//     await saveChatMessage(userId, "user", rawQuery); // Save raw question to memory

//     const rewriteStart = performance.now();
//     const finalQuery = await rewriteQuery(rawQuery, userId);
//     console.log(
//       ` Rewrite took: ${(performance.now() - rewriteStart).toFixed(2)}ms`,
//     );

//     //  ERROR BOUNDARY (Database/Search)
//     const searchStart = performance.now();
//     let searchResults;
//     try {
//       searchResults = await search(finalQuery, userId);
//       console.log(
//         ` Hybrid Search & Rerank took: ${(performance.now() - searchStart).toFixed(2)}ms`,
//       );
//     } catch (dbError) {
//       console.error(" Database Pipeline Failed:", dbError);
//       return { error: "An internal database error occurred." };
//     }

//     if (searchResults.status === "NO_ANSWER") {
//       console.log(` NO ANSWER: Could not find relevant documents.`);
//       return {
//         answer: "I couldn't find any documents to answer that.",
//         sources: [],
//       };
//     }

//     //  ERROR BOUNDARY (LLM Generation)
//     const llmStart = performance.now();
//     try {
//       const contextText = searchResults.chunks
//         .map((c) => c.content)
//         .join("\n\n");
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const prompt = `
//         You are a helpful enterprise assistant. Use ONLY the following context to answer the user's question.
//         If the status is "UNSURE", add a disclaimer that you might not have the full picture.

//         Status: ${searchResults.status}

//         Context:
//         ${contextText}

//         Question: ${finalQuery}
//       `;

//       const result = await model.generateContent(prompt);
//       const finalAnswer = result.response.text();

//       //  OBSERVABILITY (Tokens & Timers)

//       const usage = result.response.usageMetadata;
//       console.log(
//         ` LLM Generation took: ${(performance.now() - llmStart).toFixed(2)}ms`,
//       );
//       if (usage) {
//         console.log(
//           ` Tokens Used - Prompt: ${usage.promptTokenCount} | Output: ${usage.candidatesTokenCount} | Total: ${usage.totalTokenCount}`,
//         );
//       }

//       // Save AI's response to memory for the next question
//       await saveChatMessage(userId, "assistant", finalAnswer);

//       const successPayload = {
//         answer: finalAnswer,
//         sources: searchResults.chunks.map((c) => c.id), // Pass IDs back for citation mapping later
//       };

//       //  Completion: Cache the successful complex answer for 5 minutes (300 seconds)
//       try {
//         await redisClient.setEx(cacheKey, 300, JSON.stringify(successPayload));
//       } catch {
//         console.warn("Cache write failed");
//       }

//       const totalTime = performance.now() - totalStartTime;
//       console.log(` Total Pipeline Time: ${totalTime.toFixed(2)}ms\n`);

//       return successPayload;
//     } catch (aiError) {
//       console.error(" LLM Generation Failed:", aiError);
//       // THE STEP 12 GRACEFUL FALLBACK
//       return {
//         answer:
//           "I found these documents, but the AI couldn't summarize them right now.",
//         sources: searchResults.chunks, // Send the raw chunks so the frontend can still display the data!
//       };
//     }
//   } catch (globalError) {
//     console.error(" Critical Pipeline Failure:", globalError);
//     return { error: "A critical error occurred processing your request." };
//   }
// }
