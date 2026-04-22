import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { CONFIG } from "../config/config.js";

async function setupDatabase() {
  console.log("Connecting to Postgres...");
  const pool = new pg.Pool({
    connectionString: CONFIG.DATABASE_URL,
  });

  try {
    await pool.query("CREATE EXTENSION IF NOT EXISTS vector;");
    console.log("pgVector extension enabled!");
  } catch (error) {
    console.error("Failed to enable pgVector:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
