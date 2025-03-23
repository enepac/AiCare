import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const PROJECT_ROOT = "/workspaces/aicare/aicare-app/src";

/**
 * Recursively scan files and find dependencies.
 * @param filePath The entry point file.
 * @param checkedFiles Already checked files (to avoid duplicate scans).
 * @returns A list of dependent files.
 */
function findDependencies(filePath: string, checkedFiles: Set<string> = new Set()): string[] {
  if (checkedFiles.has(filePath)) return [];
  checkedFiles.add(filePath);

  const content = fs.readFileSync(filePath, "utf8");
  const regex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  const dependencies: string[] = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    let importPath = match[1];

    if (importPath.startsWith("@/")) {
      importPath = path.join(PROJECT_ROOT, importPath.replace("@/", ""));
    } else if (!importPath.startsWith(".")) {
      continue;
    }

    let absolutePath = path.resolve(path.dirname(filePath), importPath);
    if (fs.existsSync(absolutePath + ".ts")) absolutePath += ".ts";
    if (fs.existsSync(absolutePath + ".tsx")) absolutePath += ".tsx";
    if (fs.existsSync(absolutePath + "/index.ts")) absolutePath += "/index.ts";

    if (fs.existsSync(absolutePath)) {
      dependencies.push(absolutePath, ...findDependencies(absolutePath, checkedFiles));
    }
  }

  return dependencies;
}

/**
 * Run ESLint and TypeScript checks.
 * @param filePath The file to check.
 * @returns Errors found in the file.
 */
function checkFileErrors(filePath: string): string[] {
  const errors: string[] = [];

  try {
    execSync(`eslint ${filePath} --format compact`, { stdio: "pipe" });
  } catch (error: any) {
    errors.push(`ESLint Errors:\n${error.stdout.toString()}`);
  }

  try {
    execSync(`tsc --noEmit ${filePath}`, { stdio: "pipe" });
  } catch (error: any) {
    errors.push(`TypeScript Errors:\n${error.stdout.toString()}`);
  }

  return errors;
}

/**
 * Generate a corrected version of a file.
 * @param filePath The file to correct.
 * @returns Corrected code.
 */
function fixFile(filePath: string): string {
  let content = fs.readFileSync(filePath, "utf8");

  // Fix common issues (e.g., TypeScript unknown type errors)
  content = content.replace(/_id: unknown/g, "_id: Types.ObjectId");
  content = content.replace(/\.findOne\(.*?\)/g, ".findOne({ email }).lean().exec()");
  content = content.replace(/import\s+.*?mongoose.*?;/, "import mongoose, { Types } from 'mongoose';");

  return content;
}

/**
 * Main function to run the debugging process.
 */
function runDebugger(entryFile: string) {
  console.log(`🔍 Debugging: ${entryFile}\n`);

  if (!fs.existsSync(entryFile)) {
    console.error(`❌ File not found: ${entryFile}`);
    return;
  }

  console.log("📂 Scanning dependencies...");
  const dependencies = findDependencies(entryFile);
  console.log(`🔗 Found ${dependencies.length} linked files.\n`);

  console.log("🔎 Checking for errors...");
  const allFiles = [entryFile, ...dependencies];
  const errorsFound: { [key: string]: string[] } = {};

  allFiles.forEach((file) => {
    const errors = checkFileErrors(file);
    if (errors.length > 0) {
      errorsFound[file] = errors;
    }
  });

  if (Object.keys(errorsFound).length === 0) {
    console.log("✅ No errors found!");
    return;
  }

  console.log("\n❌ Errors detected in the following files:\n");
  for (const [file, errors] of Object.entries(errorsFound)) {
    console.log(`📌 ${file}:\n`);
    console.log(errors.join("\n"));
  }

  console.log("\n🛠 Generating corrected versions...\n");
  const fixedFiles: { [key: string]: string } = {};

  for (const file of Object.keys(errorsFound)) {
    fixedFiles[file] = fixFile(file);
  }

  console.log("✅ Fixed files generated. Saving...\n");

  for (const [file, content] of Object.entries(fixedFiles)) {
    fs.writeFileSync(file, content);
    console.log(`💾 Fixed file saved: ${file}`);
  }

  console.log("\n🚀 Debugging complete! Restart your server to apply changes.");
}

// Run the debugger for a specific file
const entryFile = process.argv[2];
if (!entryFile) {
  console.error("❌ Please provide a file path.");
  process.exit(1);
}

runDebugger(path.resolve(PROJECT_ROOT, entryFile));
