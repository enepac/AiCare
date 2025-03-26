import * as cheerio from "cheerio";

export async function parseHtmlCheerio(htmlContent: string): Promise<string> {
  const $ = cheerio.load(htmlContent);

  // explicitly extract text content with proper formatting
  const extractedText = $("body").text().replace(/\s+/g, " ").trim();

  return extractedText;
}
