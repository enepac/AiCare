import "dotenv/config"; // Automatically loads `.env.local"
import { execSync } from "child_process";
import mongoose from "mongoose";
import { dbConnect } from "./src/utils/db";
import { authOptions } from "./src/lib/authOptions";
import fs from "fs";

// Debug log file
const debugLog = "/workspaces/aicare/aicare-app/debug.log";
fs.writeFileSync(debugLog, "🚀 TypeScript Debugging Report\n\n");

// Helper function to run shell commands
function runCommand(command: string, description: string) {
  try {
    fs.appendFileSync(debugLog, `\n🔍 ${description}:\n`);
    const output = execSync(command, { encoding: "utf-8" });
    fs.appendFileSync(debugLog, output + "\n");
    console.log(`✅ ${description} - Success`);
  } catch (error) {
    fs.appendFileSync(debugLog, `❌ ${description} Failed:\n${error.message}\n`);
    console.error(`❌ ${description} - Failed`, error.message);
  }
}

// 1. Find Incorrect Imports
runCommand("npx tsc --noEmit", "Finding Incorrect Imports (tsc --noEmit)");

// 2. Check Runtime Types in REPL
try {
  console.log("🔍 Checking NextAuth Options...");
  fs.appendFileSync(debugLog, `\n🔍 NextAuth Options:\n${JSON.stringify(authOptions, null, 2)}\n`);
} catch (error) {
  fs.appendFileSync(debugLog, `❌ NextAuth Runtime Check Failed:\n${error.message}\n`);
}

// 3. Generate Type Definitions (use --module & --out)
runCommand(
  "npx dts-gen --module next-auth --out next-auth-custom.d.ts",
  "Generating Type Definitions (dts-gen)"
);

// Remove the generated file to avoid overshadowing node_modules/next-auth
try {
  fs.unlinkSync("/workspaces/aicare/aicare-app/next-auth-custom.d.ts");
  fs.appendFileSync(
    debugLog,
    "\n✅ Removed next-auth-custom.d.ts to prevent overshadowing next-auth.\n"
  );
} catch (err) {
  fs.appendFileSync(
    debugLog,
    `\n❌ Could not remove next-auth-custom.d.ts:\n${(err as Error).message}\n`
  );
}

// 4. Check MongoDB Schema Safely
async function checkMongoDB() {
  try {
    await dbConnect();

    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection is not established.");
    }

    const db = mongoose.connection.useDb("your-database-name");
    const user = await db.collection("users").findOne({});

    fs.appendFileSync(debugLog, `\n🔍 MongoDB Schema:\n${JSON.stringify(user, null, 2)}\n`);
    console.log("✅ MongoDB Schema Check - Success");
  } catch (error) {
    fs.appendFileSync(debugLog, `❌ MongoDB Schema Check Failed:\n${error.message}\n`);
    console.error("❌ MongoDB Schema Check - Failed", error.message);
  } finally {
    await mongoose.connection.close();
  }
}
checkMongoDB();

// 5. Fetch NextAuth Session
runCommand("curl -s http://localhost:4000/api/auth/session", "Checking NextAuth Session");
