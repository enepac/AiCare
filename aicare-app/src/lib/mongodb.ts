/* eslint-disable no-var */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables.");
}

// ✅ Define a global type for mongoose caching
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// ✅ Explicitly extend `globalThis` to avoid TypeScript errors
declare global {
  // Use `var` here to ensure it's declared in the global scope

  var mongooseCache: MongooseCache | undefined;
}

// ✅ Use a local-scoped cache with proper typing
const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null
};

export async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "AiCareDB",
        bufferCommands: false
      })
      .then((mongoose) => {
        console.log("✅ Successfully connected to MongoDB");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
      });
  }

  cached.conn = await cached.promise;
  globalThis.mongooseCache = cached; // ✅ Properly assigning to `globalThis`
  return cached.conn;
}
