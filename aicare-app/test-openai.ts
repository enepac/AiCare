import { config } from "dotenv";
config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY");
  process.exit(1);
}

fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello GPT, what’s the normal blood pressure range?" }]
  })
})
  .then((res) => res.json())
  .then((data) => {
    console.log("✅ Response:", data.choices?.[0]?.message?.content ?? data);
  }).catch;
