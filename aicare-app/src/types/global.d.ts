import mongoose from "mongoose";

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// ✅ Use `interface GlobalThis` instead of `var` to avoid ESLint errors
declare global {
  interface GlobalThis {
    globalMongoose: MongooseCache;
  }
}

export {}; // Ensure TypeScript treats this file as a module
