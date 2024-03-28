import { Router } from "express";
import { getAllUsersFn, signupUserFn, signinUserFn, checkAuthStatus, } from "../controllers/user.controller.js";
import { validateUserSignup, validateUserSignin, checkTokenStatus, } from "../middlewares/user.middleware.js";
const userRouter = Router();
userRouter.get("/all", getAllUsersFn);
userRouter.post("/signup", validateUserSignup, signupUserFn);
userRouter.post("/signin", validateUserSignin, signinUserFn);
userRouter.get("/auth-status", checkTokenStatus, checkAuthStatus);
export default userRouter;
//# sourceMappingURL=user.route.js.map