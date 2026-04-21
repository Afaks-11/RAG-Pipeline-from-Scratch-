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

export async function runChatPipeline(
  rawQuery: string,
  userId: string,
  documentId: string,
) {
  const totalStartTime = performance.now();
  console.log(`\n==========================================`);
  console.log(` STARTING PIPELINE: "${rawQuery}"`);
  console.log(`==========================================`);

  try {
    const cacheDocScope = documentId || "global";
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

    await saveChatMessage(userId, "user", rawQuery, documentId);

    const rewriteStart = performance.now();
    const finalQuery = await rewriteQuery(rawQuery, userId, documentId);
    console.log(
      ` Rewrite took: ${(performance.now() - rewriteStart).toFixed(2)}ms`,
    );

    const searchStart = performance.now();
    let searchResults;
    try {
      searchResults = await search(finalQuery, userId, documentId);
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

      await saveChatMessage(userId, "assistant", finalAnswer, documentId!);

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

