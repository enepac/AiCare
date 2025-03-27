import mongoose, { Schema, Document, Model, Types, models, model } from "mongoose";

export interface IMessage {
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  threadId: string;
  title?: string; // optional if you want to store a title
  attachments?: Types.ObjectId[]; // optional if you want to store attachments
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    threadId: { type: String, required: true, unique: true },
    title: { type: String }, // optional
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }], // optional
    messages: [
      {
        sender: { type: String, enum: ["user", "ai"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Reuse an existing model if it exists, otherwise create a new one
const Conversation: Model<IConversation> =
  models.Conversation || model<IConversation>("Conversation", conversationSchema);

export default Conversation;
