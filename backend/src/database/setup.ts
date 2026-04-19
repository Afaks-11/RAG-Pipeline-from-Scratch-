import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

async function setupDatabase() {
  console.log("Connecting to Postgres...");
  const pool = new pg.Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres:password@localhost:5432/RAG_engine",
  });

  await pool.query("CREATE EXTENSION IF NOT EXISTS vector;");
  console.log("pgVector extension enabled!");

  process.exit(0);
}

setupDatabase();
