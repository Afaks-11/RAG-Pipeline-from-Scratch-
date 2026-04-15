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
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  document_name: text("document_name").notNull(),
  status: text("status").notNull().default("processing"),
  version: integer("version").default(1).notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("creted_at").defaultNow().notNull(),
});
