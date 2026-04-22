import { defineConfig } from "drizzle-kit";

import { CONFIG } from "./src/config/config";

export default defineConfig({
  schema: "./src/database/schema",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: CONFIG.DATABASE_URL,
  },
});
