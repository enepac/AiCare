import cron from "node-cron";
import { generateSchemaSummary } from "./src/lib/mongodb/schemaSummary";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI); // explicitly check

cron.schedule("* * * * *", async () => {
  console.log("⏰ Running schema summary every minute for testing...");
  try {
    await generateSchemaSummary();
    console.log("✅ Schema summary generated successfully");
  } catch (error) {
    console.error("❌ Schema summary failed:", error);
  }
});

console.log("🚀 Cron job started locally");
