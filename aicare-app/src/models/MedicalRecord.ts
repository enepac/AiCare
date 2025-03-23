import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalRecord extends Document {
  userEmail: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;
  filePath: string;
  parsedAI?: Record<string, any>; // ✅ new field for storing GPT output
}

const MedicalRecordSchema = new Schema<IMedicalRecord>({
  userEmail: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true },
  parsedAI: { type: Schema.Types.Mixed, default: {} } // ✅ flexible JSON field
});

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>("MedicalRecord", MedicalRecordSchema);

export default MedicalRecord;
