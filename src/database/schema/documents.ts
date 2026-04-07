import {
  pgTable,
  uuid,
  varchar,
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
  document_name: varchar("document_name", { length: 255 }).notNull(),
  version: integer("version").default(1).notNull(),
  metadat: jsonb("metadata"),
  createdAt: timestamp("creted_at").defaultNow().notNull(),
});
