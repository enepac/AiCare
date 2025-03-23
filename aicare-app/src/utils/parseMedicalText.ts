interface ParsedResult {
  knownFields: Record<string, string>;
  dynamicFields: Record<string, string>;
}

export function parseMedicalText(text: string): ParsedResult {
  const known: Record<string, string> = {};
  const dynamic: Record<string, string> = {};

  const flatText = text.toLowerCase().replace(/\n+/g, " ");
  console.log("🧪 Flat Text:", flatText);

  const patterns: Record<string, RegExp> = {
    age: /age\s*[:\-]?\s*(\d{1,3})/,
    gender: /gender\s*[:\-]?\s*(male|female|other)/,
    diagnosis: /diagnosis\s*[:\-]?\s*([a-z0-9 ,\-]+)/,
    blood_pressure: /blood pressure\s*[:\-]?\s*(\d{2,3}\/\d{2,3})/,
    hemoglobin: /hemoglobin\s*[:\-]?\s*([\d.]+)\s*g\/dL/,
    glucose: /glucose\s*[:\-]?\s*([\d.]+)\s*mg\/dL/,
    cholesterol: /cholesterol\s*[:\-]?\s*([\d.]+)\s*mg\/dL/,
    medications: /prescribed medications?\s*[:\-]?\s*(.+?)(?:\s+[A-Z]|$)/
  };

  for (const [key, regex] of Object.entries(patterns)) {
    const match = flatText.match(regex);
    if (match) {
      const value = match[1].trim();
      console.log(`✅ Matched ${key}:`, value);
      known[key] = value;
      dynamic[key] = value;
    }
  }

  return {
    knownFields: known,
    dynamicFields: dynamic
  };
}
