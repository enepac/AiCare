import fs from "fs";
import path from "path";
import { promisify } from "util";
import ignore from "ignore";

// ✅ Define paths
const WORKSPACE_DIR = "/workspaces/aicare/aicare-app";
const OUTPUT_FILE = path.join(WORKSPACE_DIR, "workspace_code_snapshot.md");
const GITIGNORE_FILE = path.join(WORKSPACE_DIR, ".gitignore");

// ✅ Async file functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// ✅ Read and parse `.gitignore`
async function getIgnoredPaths(): Promise<ignore.Ignore> {
  try {
    const gitignoreContent = await readFile(GITIGNORE_FILE, "utf8");
    return ignore().add(gitignoreContent);
  } catch (error) {
    console.warn("⚠️ .gitignore not found, skipping exclusion.");
    return ignore();
  }
}

// ✅ Recursively scan files while respecting `.gitignore`
async function scanDirectory(dir: string, ig: ignore.Ignore): Promise<string[]> {
  let fileList: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(WORKSPACE_DIR, fullPath);

    // Skip ignored paths
    if (ig.ignores(relativePath)) continue;

    if (entry.isDirectory()) {
      fileList = fileList.concat(await scanDirectory(fullPath, ig));
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// ✅ Determine if a file is a code file
function isCodeFile(filePath: string): boolean {
  const extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".html", ".md"];
  return extensions.some((ext) => filePath.endsWith(ext));
}

// ✅ Format content for Markdown
async function formatFilesAsMarkdown(filePaths: string[]): Promise<string> {
  let markdownContent = `# Workspace Code Snapshot\n\n🗓 **Generated on:** ${new Date().toISOString()}\n\n`;

  for (const filePath of filePaths) {
    if (!isCodeFile(filePath)) continue;

    const relativePath = path.relative(WORKSPACE_DIR, filePath);
    const extension = path.extname(filePath).slice(1); // Get file extension without dot
    const codeBlockSyntax = extension ? extension : "txt"; // Default to plain text if no extension

    try {
      const content = await readFile(filePath, "utf8");
      markdownContent += `## File: ${relativePath}\n\n\`\`\`${codeBlockSyntax}\n${content}\n\`\`\`\n\n`;
    } catch (error) {
      console.warn(`⚠️ Skipping unreadable file: ${relativePath}`);
    }
  }
  return markdownContent;
}

// ✅ Main function to generate snapshot
async function generateSnapshot() {
  console.log("🔍 Scanning workspace...");
  const ig = await getIgnoredPaths();
  const allFiles = await scanDirectory(WORKSPACE_DIR, ig);
  console.log(`📂 Found ${allFiles.length} files.`);

  const markdownContent = await formatFilesAsMarkdown(allFiles);
  await writeFile(OUTPUT_FILE, markdownContent, "utf8");

  console.log(`✅ Code snapshot saved at: ${OUTPUT_FILE}`);
}

// ✅ Run the script
generateSnapshot().catch((error) => console.error("❌ Error generating snapshot:", error));
