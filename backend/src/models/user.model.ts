import mongoose from "mongoose";
import { chatSchema } from "./chat.model.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    chats: [chatSchema],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
