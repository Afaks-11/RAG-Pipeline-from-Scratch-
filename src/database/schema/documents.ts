import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { version } from "node:os";

// The Documents Table
export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  documentName: text("document_name").notNull(),
  status: text("status").notNull().default("PROCESSING"),
  version: integer("version").default(1).notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("creted_at").defaultNow().notNull(),
});
