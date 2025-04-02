import { Schema, Document, models, model } from "mongoose";

export interface ISymptomLog extends Document {
  userEmail: string;
  date: string; // ISO format, e.g. "2024-05-04"
  symptoms: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SymptomLogSchema = new Schema<ISymptomLog>(
  {
    userEmail: { type: String, required: true },
    date: { type: String, required: true },
    symptoms: { type: [String], required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

const SymptomLog = models.SymptomLog || model<ISymptomLog>("SymptomLog", SymptomLogSchema);

export default SymptomLog;
