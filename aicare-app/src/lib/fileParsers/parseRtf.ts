import { parseString } from "rtf-parser";

export async function parseRtf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    parseString(buffer, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        // Safe access after type guard
        const content = (doc as { content?: string }).content;
        if (typeof content === "string") {
          resolve(content);
        } else {
          reject(new Error("RTF content missing or invalid"));
        }
      }
    });
  });
}
