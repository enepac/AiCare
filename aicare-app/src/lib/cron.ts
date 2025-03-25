import cron from "node-cron";
import { generateSchemaSummary } from "@/lib/mongodb/schemaSummary";

export function startCronJobs() {
  // Runs at midnight daily
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ Running daily schema summary...");
    await generateSchemaSummary();
  });
}
