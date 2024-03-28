import { Router } from "express";
import { checkTokenStatus } from "../middlewares/user.middleware.js";
import { validateCreateNewChatFn } from "../middlewares/chat.middleware.js";
import { generateChatCompletion } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/new", validateCreateNewChatFn, checkTokenStatus, generateChatCompletion);

export default chatRouter;
