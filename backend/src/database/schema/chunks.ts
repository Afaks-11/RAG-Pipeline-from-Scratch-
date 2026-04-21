import {
  pgTable,
  uuid,
  integer,
  text,
  halfvec,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { documents } from "./documents.js";


export const chunks = pgTable(
  "chunks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    documentId: uuid("document_id")
      .references(() => documents.id, { onDelete: "cascade" })
      .notNull(),
    chunkIndex: integer("chunk_index").notNull(),
    content: text("content").notNull(),
    embedding: halfvec("embedding", { dimensions: 1024 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdx: index("idx_chunks_user_id").on(table.userId),
      docIdx: index("idx_chunks_document_id").on(table.documentId),
      embeddingIdx: index("idx_chunks_embedding").using(
        "hnsw",
        table.embedding.op("halfvec_cosine_ops"),
      ),
    };
  },
);
