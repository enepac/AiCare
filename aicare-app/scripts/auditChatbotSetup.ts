#!/usr/bin/env ts-node

/*
  Basic AiCare Chatbot Setup Audit
  --------------------------------
  Usage: npx ts-node scripts/auditChatbotSetup.ts
*/

import fs from "fs";
import path from "path";
import "dotenv/config"; // Loads .env variables
import fetch from "node-fetch"; // If you're using node-fetch@2 for CommonJS

// 1) Check Next.js version in package.json
function checkNextVersion() {
  // Assuming your scripts folder is one level below the project root:
  // /workspaces/aicare/aicare-app
  // ├── package.json
  // └── scripts
  //     └── auditChatbotSetup.ts
  //
  // => So going one ".." up lands at package.json
  const pkgPath = path.join(__dirname, "..", "package.json");

  console.log("Script __dirname:", __dirname);
  console.log("Looking for package.json at:", pkgPath);

  if (!fs.existsSync(pkgPath)) {
    console.log("❌ package.json not found");
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const nextVersion = pkg.dependencies?.next || pkg.devDependencies?.next || "Not found";
  console.log(`Next.js version declared: ${nextVersion}`);
}

// 2) Check required environment variables
const requiredEnvVars = ["OPENAI_API_KEY", "NEXTAUTH_SECRET"];
function checkEnvVariables() {
  let allOk = true;
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(`❌ Missing ENV var: ${envVar}`);
      allOk = false;
    } else {
      console.log(`✅ Found ENV var: ${envVar}`);
    }
  });
  if (!allOk) {
    console.log("Some environment variables are missing. Make sure they're in .env / .env.local.");
  }
}

// 3) Check presence of critical files
// Assuming your src folder is also one level above the scripts folder.
const criticalFiles = [
  "src/app/api/chatbot/route.ts",
  "src/app/api/chatbot/new-thread/route.ts",
  "src/app/api/chatbot/threads/route.ts",
  "src/app/api/chatbot/threads/[threadId]/route.ts",
  "src/app/api/chatbot/threads/[threadId]/messages/route.ts",
  "src/models/conversation.ts",
  "src/models/user.ts"
];

function checkCriticalFiles() {
  let allOk = true;
  criticalFiles.forEach((file) => {
    // We only go one ".." up from the scripts folder:
    const filePath = path.join(__dirname, "..", file);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ Missing file: ${file}`);
      allOk = false;
    } else {
      console.log(`✅ Found file: ${file}`);
    }
  });
  if (!allOk) {
    console.log("Some required files are missing or misnamed. Verify your folder structure.");
  }
}

// 4) [Optional] Check live routes if dev server is running
// Adjust the port if your dev server is on 3000 or 4000.
async function checkLiveRoutes() {
  const baseUrl = "http://localhost:5000";
  const endpoints = ["/api/chatbot", "/api/chatbot/new-thread", "/api/chatbot/threads"];

  console.log("\n--- Checking live endpoints ---");
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${baseUrl}${ep}`, { method: "GET" });
      if (res.status === 401) {
        console.log(`⚠️  ${ep} returned 401 Unauthorized (this is normal if no session cookie)`);
      } else if (res.status === 404) {
        console.log(`❌ ${ep} returned 404 Not Found`);
      } else {
        console.log(`✅ ${ep} returned status: ${res.status}`);
      }
    } catch (err) {
      console.log(`❌ Error fetching ${ep}: ${err}`);
    }
  }
}

// Main Audit
(async function main() {
  console.log("===== AiCare Chatbot Setup Audit =====\n");

  // (1) Next.js version
  checkNextVersion();

  // (2) Env variables
  console.log("\n--- Checking environment variables ---");
  checkEnvVariables();

  // (3) Critical files
  console.log("\n--- Checking critical files/folders ---");
  checkCriticalFiles();

  // (4) Live route checks
  console.log("\n--- Checking live routes (optional) ---");
  await checkLiveRoutes();

  console.log("\nAudit complete.\n");
})();
