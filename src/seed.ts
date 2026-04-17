import { db } from "./database/index.js";
import { users } from "./database/schema/users.js";
import { ingestPDF } from "./loader/loader.js";

async function run() {
  try {
    console.log("Creating a test user...");

    // Insert a dummy user and return their gnerated ID
    const [newUser] = await db
      .insert(users)
      .values({
        email: `testuser_${Date.now()}@example.com`,
        passwordHash: "securepassword123",
      })
      .returning({ id: users.id });

    if (!newUser) {
      throw new Error("User creation failed");
    }

    console.log(`✅ User created successfully with ID: ${newUser.id}`);

    // Define the path to a test PDF
    // IMPORTANT: Make sure you actually have a file named 'sample.pdf' in your root folder!
    const pdfPath =
      "C:\\Users\\user\\Desktop\\Project school\\599 FINAL\\ROBOTIC ARM CHAPTER_ONE_TO_FIVE [MAIN].pdf";

    console.log(`\nStarting ingestion pipeline for ${pdfPath}...`);

    await ingestPDF(pdfPath, newUser.id);

    console.log(
      "\n🎉 Pipeline complete! Your PDF is now vector-searchable in Postgres.",
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
}

run();
