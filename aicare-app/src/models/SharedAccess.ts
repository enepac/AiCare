import { Schema, Document, model, models } from "mongoose";

export interface ISharedAccess extends Document {
  patientEmail: string;
  viewerEmail: string;
  status: "pending" | "accepted" | "revoked";
  createdAt?: Date;
  updatedAt?: Date;
}

const SharedAccessSchema = new Schema<ISharedAccess>(
  {
    patientEmail: { type: String, required: true },
    viewerEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "revoked"],
      default: "pending"
    }
  },
  { timestamps: true }
);

SharedAccessSchema.index({ patientEmail: 1, viewerEmail: 1 }, { unique: true });

const SharedAccess =
  models.SharedAccess || model<ISharedAccess>("SharedAccess", SharedAccessSchema);

export default SharedAccess;
