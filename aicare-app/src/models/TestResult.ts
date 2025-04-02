import { Schema, Document, model, models } from "mongoose";

export interface ITestResult extends Document {
  userEmail: string;
  testName: string;
  value?: string | number;
  unit?: string;
  referenceRange?: string;
  interpretation?: "Normal" | "High" | "Low" | "Borderline";

  category?: string;
  subcategory?: string;

  testDate: Date;
  notes?: string;

  sourceType: "manual" | "upload";
  fileName?: string;
  fileUrl?: string;

  parsedByAI?: boolean;
  rawText?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const TestResultSchema = new Schema<ITestResult>(
  {
    userEmail: { type: String, required: true },
    testName: { type: String, required: true },
    value: { type: Schema.Types.Mixed },
    unit: { type: String },
    referenceRange: { type: String },
    interpretation: { type: String, enum: ["Normal", "High", "Low", "Borderline"] },

    category: { type: String },
    subcategory: { type: String },

    testDate: { type: Date, required: true },
    notes: { type: String },

    sourceType: { type: String, enum: ["manual", "upload"], required: true },
    fileName: { type: String },
    fileUrl: { type: String },
    parsedByAI: { type: Boolean, default: false },
    rawText: { type: String }
  },
  { timestamps: true }
);

const TestResult = models.TestResult || model<ITestResult>("TestResult", TestResultSchema);
export default TestResult;
