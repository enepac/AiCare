import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * 1) Define the IUser interface, explicitly including `_id` as `Types.ObjectId`.
 */
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  image?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  role: "Admin" | "User";
  age?: number;
  gender?: string;
  allergies?: string;
  medications?: string;
  familyHistory?: string;
  activityLevel?: string;
  diet?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  bloodType?: string;
  isPregnant?: boolean;
  isProfileComplete?: boolean;
  profileCompletionSteps: string[];
}

/**
 * 2) Define the schema with the same fields, referencing `IUser`.
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }
    },
    googleId: { type: String, default: null },
    image: { type: String, default: null },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    role: { type: String, enum: ["Admin", "User"], default: "User" },

    age: { type: Number, min: 0 },
    height: { type: Number, min: 50, max: 250 },
    weight: { type: Number, min: 2, max: 300 },
    bmi: { type: Number, min: 10, max: 60 },
    gender: { type: String, trim: true },
    allergies: { type: String, trim: true },
    medications: { type: String, trim: true },
    familyHistory: { type: String, trim: true },
    activityLevel: { type: String, trim: true },
    diet: { type: String, trim: true },
    bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""] },
    isPregnant: { type: Boolean, default: false },

    isProfileComplete: { type: Boolean, default: false },
    profileCompletionSteps: { type: [String], default: [] }
  },
  { timestamps: true }
);

/**
 * 3) Auto-calculate BMI before saving
 */
UserSchema.pre("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
  } else {
    this.bmi = undefined;
  }
  next();
});

/**
 * 4) Fix Model Registration in Next.js to Prevent Recompilation
 */
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
