import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISharedAccess extends Document {
  ownerId: Types.ObjectId;
  viewerId: Types.ObjectId;
  status: "pending" | "accepted";
  createdAt: Date;
}

const sharedAccessSchema = new Schema<ISharedAccess>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    viewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Ensure a viewer can only receive one invite per owner
sharedAccessSchema.index({ ownerId: 1, viewerId: 1 }, { unique: true });

export const SharedAccess =
  mongoose.models.SharedAccess || mongoose.model<ISharedAccess>("SharedAccess", sharedAccessSchema);
