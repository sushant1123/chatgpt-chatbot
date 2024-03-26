import { Router } from "express";
const userRouter = Router();
userRouter.get("/", (req, res) => {
    return res.status(200).json({ status: "success", message: "Welcome to the user route" });
});
export default userRouter;
//# sourceMappingURL=chats.route.js.map