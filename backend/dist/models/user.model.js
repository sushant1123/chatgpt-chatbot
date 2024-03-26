import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    chats: [{ type: ObjectId, ref: "Chat" }],
}, { timestamps: true });
export const UserModel = mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map