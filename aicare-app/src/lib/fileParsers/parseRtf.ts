import { parseString } from "rtf-parser";

export async function parseRtf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    parseString(buffer.toString("utf-8"), (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc.content);
      }
    });
  });
}
