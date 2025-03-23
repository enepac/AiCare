import mongoose, { Schema, Document } from "mongoose";

interface IMedicalRecord extends Document {
  userEmail: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;
  filePath: string;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>({
  userEmail: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true }
});

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>("MedicalRecord", MedicalRecordSchema);

export default MedicalRecord;
