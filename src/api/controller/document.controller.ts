import type { Request, Response } from "express";
import { eq, and } from "drizzle-orm";

import { db } from "../../database/index.js";
import { documents } from "../../database/schema/documents.js";
import { pdfQueue } from "../config/queue.js";

export class DocumentController {
  static async uploadDocument(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;

      const user = req.user as { userId: string; email: string };
      if (!file) {
        res.status(400).json({ error: "No PDF file provided" });
        return;
      }

      //  Create the "PROCESSING" row in the database
      const [newDocument] = await db
        .insert(documents)
        .values({
          user_id: user.userId,
          document_name: file.originalname,
          status: "PROCESSING",
        })
        .returning();

      // Drop the job in the queue (pass the local file path, NOT the file buffer)
      await pdfQueue.add("process-pdf", {
        documentId: newDocument!.id,
        userId: user.userId,
        fileUrl: file.path, // e.g., "temp/1b9d6bcd..."
      });

      //  Instantly reply to the user without waiting for Voyage AI
      res.status(202).json({
        message: "Document uploaded and queued for processing",
        document: newDocument,
      });
    } catch (error) {
      console.error("[DocumentController] Upload error:", error);
      res.status(500).json({ error: "Internal server error during upload" });
    }
  }

  static async listDocuments(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { userId: string };

      const userDocs = await db
        .select()
        .from(documents)
        .where(eq(documents.user_id, user.userId));

      res.status(200).json(userDocs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  }

  static async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { userId: string };
      const { id } = req.params;

      const [deleteDoc] = await db
        .delete(documents)
        .where(and(eq(documents.user_id, user.userId)))
        .returning();

      if (!deleteDoc) {
        res.status(404).json({ error: "Document not found or unauthorized" });
        return;
      }

      // Note: Since we set up cascading deletes in Drizzle, deleting this row
      // automatically wipes all associated vectors in the chunks table!
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete document" });
    }
  }
}
