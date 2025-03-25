import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseMedicalTextWithGPT(rawText: string): Promise<Record<string, unknown>> {
  const prompt = `
  You're an expert medical assistant. Extract all medical information from the provided text clearly and consistently. Use snake_case naming for all fields. Examples include patient_name, age, chief_complaint, diagnosis, medications, allergies, symptoms, follow_up_instructions, etc. 

  If there are additional fields, infer a suitable, predictable, snake_case field name. Provide all data as flat JSON.

  Medical Note:
  ${rawText}

  JSON Response:
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content!);
  } catch (error) {
    console.error("❌ GPT Parsing Error:", error);
    throw error;
  }
}
