import { db } from "../database/index.js";
import { users } from "../database/schema/users.js";
import { documents } from "../database/schema/documents.js";
import { ingestPDF } from "../ingestion/ingestion.js";
import bcrypt from "bcrypt";
import path from "path";

async function run() {
  try {
    console.log("--- SEEDING DATABASE ---");

    // Create a test user
    console.log("Creating a test user...");
    const password = await bcrypt.hash("securepassword123", 10);
    const [newUser] = await db
      .insert(users)
      .values({
        email: `testuser_${Date.now()}@example.com`,
        passwordHash: password,
        authProvider: "email",
      })
      .returning({ id: users.id });

    if (!newUser) throw new Error("User creation failed");

    console.log(` User created successfully with ID: ${newUser.id}`);

    // Define the pdf path
    const pdfPath =
      "C:\\Users\\user\\Desktop\\Project school\\599 FINAL\\ROBOTIC ARM CHAPTER_ONE_TO_FIVE [MAIN].pdf";
    const fileName = path.basename(pdfPath);

    // Create a Document record first (REQUIRED for ingestPDF)
    console.log("Creating document record in database...");
    const [newDoc] = await db
      .insert(documents)
      .values({
        userId: newUser.id,
        documentName: fileName,
        status: "PROCESSING",
        version: 1,
      })
      .returning({ id: documents.id });

    if (!newDoc) throw new Error("Document record creation failed");
    console.log(` Document record created: ${newDoc.id}`);

    console.log(`\nStarting ingestion pipeline for ${fileName}...`);
    await ingestPDF(pdfPath, newUser.id, newDoc.id);

    console.log(
      "\n Pipeline completed! Your PDF is now vector-searchable in Postgres.",
    );
    process.exit(0);
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
}

run();
