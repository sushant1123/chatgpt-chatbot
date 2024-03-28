import { randomUUID } from "crypto";
import mongoose from "mongoose";
export const chatSchema = new mongoose.Schema({
    id: { type: String, default: randomUUID() },
    role: { type: String, required: true },
    content: { type: String, required: true },
});
//# sourceMappingURL=chat.model.js.map