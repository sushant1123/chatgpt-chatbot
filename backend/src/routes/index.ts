import { Router } from "express";
import userRouter from "./user.route.js";
import chatRouter from "./chat.route.js";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);

export default appRouter;
