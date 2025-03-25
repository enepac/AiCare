import { parentPort, workerData } from "worker_threads";
import { parseMedicalRecordWithGPT } from "@/lib/parser/parseWithGPT";
import { saveParsedRecord } from "@/lib/db/saveParsedRecord";

async function parseAndSaveDocument(filePath: string) {
  try {
    const parsedData = await parseMedicalRecordWithGPT(filePath);
    const recordId = await saveParsedRecord(parsedData);

    parentPort?.postMessage({ success: true, recordId });
  } catch (error) {
    parentPort?.postMessage({ success: false, error: (error as Error).message });
  }
}

parseAndSaveDocument(workerData.filePath);
