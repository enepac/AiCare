import { Schema, Document, model, models } from "mongoose";

export interface IProcedureRecord extends Document {
  userEmail: string;

  procedureName: string;
  type?: string; // e.g. "MRI", "Surgery", "Blood Test"
  location?: string;

  date: string; // "2024-06-01"
  time?: string; // "10:30 AM"

  status: "scheduled" | "completed" | "canceled";

  reminder?: {
    enabled: boolean;
    notifyAt?: string[]; // ISO timestamps
  };

  notes?: string;
  fileUrl?: string;
  fileName?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const ProcedureRecordSchema = new Schema<IProcedureRecord>(
  {
    userEmail: { type: String, required: true },

    procedureName: { type: String, required: true },
    type: { type: String },
    location: { type: String },

    date: { type: String, required: true },
    time: { type: String },

    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled"
    },

    reminder: {
      enabled: { type: Boolean, default: false },
      notifyAt: { type: [String], default: [] }
    },

    notes: { type: String },
    fileUrl: { type: String },
    fileName: { type: String }
  },
  { timestamps: true }
);

const ProcedureRecord =
  models.ProcedureRecord || model<IProcedureRecord>("ProcedureRecord", ProcedureRecordSchema);

export default ProcedureRecord;
