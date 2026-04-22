import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

import { CONFIG } from "../config/config.js";

const pool = new pg.Pool({
  connectionString: CONFIG.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
