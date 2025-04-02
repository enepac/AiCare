import { Schema, Document, model, models } from "mongoose";

export interface IMedicationRecord extends Document {
  userEmail: string;

  name: string;
  dosageAmount: number;
  dosageUnit: string;
  frequency: string;

  reminder?: {
    enabled: boolean;
    times?: string[]; // ["08:00", "20:00"]
  };

  status: "active" | "discontinued";
  startDate: Date;
  endDate?: Date;

  notes?: string;

  fileUrl?: string;
  fileName?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const MedicationRecordSchema = new Schema<IMedicationRecord>(
  {
    userEmail: { type: String, required: true },

    name: { type: String, required: true },
    dosageAmount: { type: Number, required: true },
    dosageUnit: { type: String, required: true },
    frequency: { type: String, required: true },

    reminder: {
      enabled: { type: Boolean, default: false },
      times: { type: [String], default: [] }
    },

    status: { type: String, enum: ["active", "discontinued"], default: "active" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },

    notes: { type: String },
    fileUrl: { type: String },
    fileName: { type: String }
  },
  { timestamps: true }
);

const MedicationRecord =
  models.MedicationRecord || model<IMedicationRecord>("MedicationRecord", MedicationRecordSchema);

export default MedicationRecord;
