import Groq from "groq-sdk";
import { eq, desc } from "drizzle-orm";

import { db } from "../index.js";
import { chatHistory } from "../schema/chatHistory.js";
import { CONFIG } from "../../config/config.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Takes the user's raw query, looks at their recent chat history,
 * and uses Groq to rewrite it into a standalone question.
 */
export async function rewriteQuery(
  currentQuery: string,
  userId: string,
  historyLimit: number = 5,
): Promise<string> {
  // Fetch the last historyLimit messages for this specific user
  const history = await db
    .select()
    .from(chatHistory)
    .where(eq(chatHistory.userId, userId))
    .orderBy(desc(chatHistory.createdAt))
    .limit(historyLimit);

  // If there is no history, the query doesn't need rewriting. Return it as it was
  if (history.length === 0) {
    return currentQuery;
  }

  // Reverse the array so it's in chronological order (oldest to newest) for the LLM
  history.reverse();

  // Format the history into a readable string
  const formattedHistory = history
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n");

  const prompt = `
    You are a query rewriting assistant for a search engine.
    Below is the recent chat history between a User and an Assistant.
    Based on this history, rewrite the User's latest query into a standalone, fully contextualized question so that it can be used for a database search.

    Rules:
    1. Do NOT answer the question. Only return the rewritten question.
    2. Replace pronouns (it, they, he, she) with the actual subjects from the chat history.
    3. If the current query is already self-contained and doesn't need context, return it exactly as is.

    Chat History:
    ${formattedHistory}

    Current User Query: ${currentQuery}

    Rewritten Query:`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const rewrittenQuery =
      completion.choices[0]?.message.content?.trim() || currentQuery;

    console.log(`  Rewrote query from: "${currentQuery}"`);
    console.log(`  To: "${rewrittenQuery}"`);

    return rewrittenQuery;
  } catch (error: any) {
    console.warn(
      ` Query Rewriter API overloaded. Falling back to original query: "${currentQuery}"`,
    );
    // Graceful fallback: Just return the original query if Groq glitches
    return currentQuery;
  }
}

export async function saveChatMessage(
  userId: string,
  role: "user" | "assistant",
  content: string,
) {
  await db.insert(chatHistory).values({
    userId,
    role,
    content,
  });
}
