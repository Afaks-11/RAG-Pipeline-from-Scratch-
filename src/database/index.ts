import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";
import * as dotenv from "dotenv";

dotenv.config();

// Create the connection pool
const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:password@localhost:5432/RAG_engine",
});

// Export the ready-to-use db instance
export const db = drizzle(pool, { schema });
