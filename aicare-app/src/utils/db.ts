import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Missing MONGODB_URI in environment variables");
}

// ✅ Use a simple, local module-scoped variable instead of globalThis
let cachedConnection: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

export async function dbConnect() {
  if (cachedConnection) return cachedConnection;

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGODB_URI, {
        dbName: "AiCareDB",
        bufferCommands: false
      })
      .then((mongoose) => mongoose.connection);
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}
