import { Schema, Document, models, model } from "mongoose";

export type MedicalHistoryType = "diagnosis" | "allergy" | "immunization" | "other";
export type MedicalHistoryStatus = "active" | "resolved" | "unknown";

export interface IMedicalHistory extends Document {
  userEmail: string;

  type: MedicalHistoryType;
  title: string;
  date: Date;
  notes?: string;
  status?: MedicalHistoryStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

const MedicalHistorySchema = new Schema<IMedicalHistory>(
  {
    userEmail: { type: String, required: true },
    type: { type: String, enum: ["diagnosis", "allergy", "immunization", "other"], required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, enum: ["active", "resolved", "unknown"], default: "active" }
  },
  { timestamps: true }
);

const MedicalHistory =
  models.MedicalHistory || model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);

export default MedicalHistory;
