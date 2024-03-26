import { Router } from "express";
import { getAllUsersFn, signupUserFn, signinUserFn } from "../controllers/user.controller.js";
import { validateUserSignup, validateUserSignin } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.get("/all", getAllUsersFn);
userRouter.post("/signup", validateUserSignup, signupUserFn);
userRouter.post("/signin", validateUserSignin, signinUserFn);

export default userRouter;
