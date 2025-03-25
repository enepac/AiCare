import { extractTextFromDocument } from "@/lib/aws/textract";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseMedicalRecordWithGPT(filePath: string) {
  const extractedText = await extractTextFromDocument(filePath);

  const prompt = `
    Extract all relevant medical information from the provided text and return it as a structured JSON object.
    Do not wrap the response in markdown or code blocks. Return pure JSON.

    Document Text:
    ${extractedText}

    Structured Medical JSON:
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  const jsonData = completion.choices[0].message.content;

  if (!jsonData) {
    throw new Error("GPT response is empty");
  }

  // Clean markdown formatting if present
  const cleanJsonData = jsonData.replace(/^```json\s*|```$/g, "").trim();

  return JSON.parse(cleanJsonData);
}
