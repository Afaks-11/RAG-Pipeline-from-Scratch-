import type { Request, Response } from "express";
import { eq, desc } from "drizzle-orm";

import { db } from "../../database/index.js";
import { chatHistory } from "../../database/schema/chatHistory.js";
import { runChatPipeline } from "../../chat/chat-pipeline.js";

export class ChatController {
  static async chat(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { userId: string };
      const { message } = req.body;

      if (!message) {
        res
          .status(400)
          .json({ error: "Message is required in the request body" });
        return;
      }

      console.log(
        `[ChatController] Processing message for user ${user.userId}`,
      );

      const pipelineResponse = await runChatPipeline(message, user.userId);

      // Handle potential errors from your pipeline
      if (pipelineResponse.error) {
        res.status(400).json({ error: pipelineResponse.error });
        return;
      }

      // Send the REAL AI answer to the frontend
      res.status(200).json({ reply: pipelineResponse.answer });
    } catch (error) {
      console.error("[ChatController] Chat error:", error);
      res
        .status(500)
        .json({ error: "Internal server error during chat processing" });
    }
  }

  // 2. GET /api/chat/history
  static async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { userId: string };

      const history = await db
        .select()
        .from(chatHistory)
        .where(eq(chatHistory.userId, user.userId))
        .orderBy(desc(chatHistory.createdAt)); // Newest messages first

      res.status(200).json(history);
    } catch (error) {
      console.error("[ChatController] History fetch error:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  }
}
