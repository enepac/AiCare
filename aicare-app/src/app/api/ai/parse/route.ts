import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OpenAI API key." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { extractedText } = body;

    if (!extractedText || typeof extractedText !== "string") {
      return NextResponse.json({ error: "Missing or invalid extractedText" }, { status: 400 });
    }

    const systemPrompt = `
You are a medical AI assistant. Extract structured data from unstructured medical text.

Return a JSON object with any of the following if found:
- patient name
- age
- gender
- diagnosis
- blood pressure
- hemoglobin
- glucose
- cholesterol
- prescribed medications
- next follow-up

Respond only with JSON.
    `.trim();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: extractedText }
        ],
        temperature: 0
      })
    });

    const json = await res.json();

    const output = json.choices?.[0]?.message?.content;

    try {
      const parsed = JSON.parse(output);
      return NextResponse.json({ parsed });
    } catch {
      return NextResponse.json(
        {
          error: "OpenAI response was not valid JSON",
          raw: output
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("❌ AI parsing error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
