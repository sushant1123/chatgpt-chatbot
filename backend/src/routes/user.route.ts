import { Router } from "express";
import {
  getAllUsersFn,
  signupUserFn,
  signinUserFn,
  checkAuthStatusFn,
  userLogoutFn,
} from "../controllers/user.controller.js";
import {
  validateUserSignup,
  validateUserSignin,
  checkTokenStatus,
} from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.get("/all", getAllUsersFn);
userRouter.post("/signup", validateUserSignup, signupUserFn);
userRouter.post("/signin", validateUserSignin, signinUserFn);
userRouter.get("/auth-status", checkTokenStatus, checkAuthStatusFn);
userRouter.get("/logout", checkTokenStatus, userLogoutFn);

export default userRouter;
