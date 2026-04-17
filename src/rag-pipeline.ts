import { db } from "./database/index.js";
import { users } from "./database/schema/users.js";
import { runChatPipeline } from "./chat/chat-pipeline.js";
import { redisClient } from "./config/redis.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const DELAY_MS = 61000; // Dropped to 61 seconds because Groq is fast!

function assertSuccess(response: any, testName: string) {
  if (response.error || !response.answer) {
    console.error(`\n ${testName} FAILED! Stopping tests.`);
    if (response.error) console.error(`Reason: ${response.error}`);
    process.exit(1);
  }
}

async function runTests() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log(" Connected to Redis for testing.");
    }

    const [existingUsers] = await db.select().from(users).limit(1);

    if (!existingUsers) {
      console.error(" No users found in the database. Did you run seed.ts?");
      process.exit(1);
    }

    const testUserId = existingUsers.id;
    console.log(` Testing Pipeline with User ID: ${testUserId}\n`);

    console.log("========== TEST 1: CASUAL GREETING ==========");
    const response1 = await runChatPipeline(
      "Hey there! How is it going?",
      testUserId,
    );
    assertSuccess(response1, "TEST 1");
    console.log(" AI Answer:", response1.answer);
    console.log("Waiting 61 seconds...");
    await delay(DELAY_MS);

    console.log("\n========== TEST 2: FULL KNOWLEDGE SEARCH ==========");
    const response2 = await runChatPipeline(
      "What is the main objective of the robotic arm project?",
      testUserId,
    );
    assertSuccess(response2, "TEST 2");
    console.log(" AI Answer:", response2.answer);
    console.log("Waiting 61 seconds...");
    await delay(DELAY_MS);

    console.log("\n========== TEST 3: REDIS CACHE HIT ==========");
    const response3 = await runChatPipeline(
      "What is the main objective of the robotic arm project?",
      testUserId,
    );
    assertSuccess(response3, "TEST 3");
    console.log(" AI Answer:", response3.answer);
    console.log("Waiting 61 seconds...");
    await delay(DELAY_MS);

    console.log("\n========== TEST 4: MEMORY REWRITE ==========");
    const response4 = await runChatPipeline(
      "What components or materials were used to build it?",
      testUserId,
    );
    assertSuccess(response4, "TEST 4");
    console.log(" AI Answer:", response4.answer);

    console.log("\n ALL TESTS COMPLETED SUCCESSFULLY!");
  } catch (error) {
    console.error(" Test script encountered a fatal error:", error);
  } finally {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
    process.exit(0);
  }
}

runTests();
