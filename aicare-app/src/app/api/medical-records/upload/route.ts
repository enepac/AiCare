import { NextRequest, NextResponse } from "next/server";
import { Worker } from "worker_threads";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadDir, file.name);

  // Save file locally
  const buffer = Buffer.from(await file.arrayBuffer());
  const fs = await import("fs/promises");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);

  // Initialize worker to parse document asynchronously
  const worker = new Worker(path.join(process.cwd(), "src/workers/parseWorker.js"), {
    workerData: { filePath }
  });

  worker.on("message", (result) => {
    if (result.success) {
      console.log("Parsed Data:", result.data);
      // TODO: Save parsed data into MongoDB here
    } else {
      console.error("Parsing Error:", result.error);
    }
  });

  worker.on("error", (error) => {
    console.error("Worker Error:", error);
  });

  return NextResponse.json({ message: "File uploaded, parsing in progress." });
}
