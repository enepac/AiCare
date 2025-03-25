import { generateSchemaSummary } from "@/lib/mongodb/schemaSummary";

generateSchemaSummary()
  .then(() => console.log("✅ Schema summary completed."))
  .catch((err) => console.error("❌ Schema summary error:", err));
