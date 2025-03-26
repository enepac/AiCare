import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * Subdocument interface for each message in the conversation.
 * `_id` is optional because MongoDB auto-generates it by default.
 */
export interface IMessage {
  _id?: Types.ObjectId;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  title: string;
  messages: IMessage[];
  attachments: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      default: "New Conversation"
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "ai"],
          required: true
        },
        content: {
          type: String,
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalRecord"
      }
    ]
  },
  { timestamps: true }
);

const Conversation =
  (mongoose.models.Conversation as Model<IConversation>) ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
