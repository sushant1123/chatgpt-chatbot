import mongoose from "mongoose";
import { randomUUID } from "crypto";
const { ObjectId } = mongoose.Schema.Types;

const chatSchema = new mongoose.Schema(
  {
    id: { type: String, default: randomUUID() },
    role: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model("Chat", chatSchema);
