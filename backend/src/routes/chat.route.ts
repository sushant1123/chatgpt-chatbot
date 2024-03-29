import { Router } from "express";
import { checkTokenStatus } from "../middlewares/user.middleware.js";
import { validateCreateNewChatFn } from "../middlewares/chat.middleware.js";
import {
  generateChatCompletionFn,
  sendChatsToUserFn,
  deleteChatsFn,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/new", validateCreateNewChatFn, checkTokenStatus, generateChatCompletionFn);
chatRouter.get("/all-chats", checkTokenStatus, sendChatsToUserFn);
chatRouter.delete("/delete", checkTokenStatus, deleteChatsFn);

export default chatRouter;
