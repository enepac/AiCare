import { Schema, Document, model, models } from "mongoose";

export interface IAppointmentRecord extends Document {
  userEmail: string;

  type: string; // e.g. "Consultation", "Follow-up"
  location: string;
  purpose?: string;

  appointmentDate: string; // ISO date string
  appointmentTime?: string; // "09:00 AM"

  reminder?: {
    enabled: boolean;
    notifyAt?: string[]; // ISO datetime strings
  };

  notes?: string;

  fileUrl?: string;
  fileName?: string;

  status: "upcoming" | "canceled" | "completed";

  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentRecordSchema = new Schema<IAppointmentRecord>(
  {
    userEmail: { type: String, required: true },

    type: { type: String, required: true },
    location: { type: String, required: true },
    purpose: { type: String },

    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String },

    reminder: {
      enabled: { type: Boolean, default: false },
      notifyAt: { type: [String], default: [] }
    },

    notes: { type: String },
    fileUrl: { type: String },
    fileName: { type: String },

    status: {
      type: String,
      enum: ["upcoming", "canceled", "completed"],
      default: "upcoming"
    }
  },
  { timestamps: true }
);

const AppointmentRecord =
  models.AppointmentRecord ||
  model<IAppointmentRecord>("AppointmentRecord", AppointmentRecordSchema);

export default AppointmentRecord;
