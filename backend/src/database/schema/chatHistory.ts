import { pgTable, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";

import { documents } from "./documents.js";
import { users } from "./users.js";

export const roleEnum = pgEnum("role", ["user", "assistant"]);

export const chatHistory = pgTable("chat_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  documentId: uuid("document_id").references(() => documents.id, {
    onDelete: "cascade",
  }),
  role: roleEnum("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
