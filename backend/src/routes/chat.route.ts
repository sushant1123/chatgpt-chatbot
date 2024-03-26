import { Router } from "express";

const chatRouter = Router();

chatRouter.get("/", (req, res) => {
  return res.status(200).json({ status: "success", message: "Welcome to the chats route" });
});

export default chatRouter;
