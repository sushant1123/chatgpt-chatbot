import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { ResponseError } from "../utils/customClasses.js";
import { generateToken } from "../utils/token-manager.js";
import { CONSTANTS } from "../utils/constants.js";
export const getAllUsersFn = async (req, res, next) => {
    try {
        const getAllUsersResponse = await UserModel.find({}, { password: 0 });
        res
            .status(200)
            .json({ status: CONSTANTS.SUCCESS, errorMessage: null, data: getAllUsersResponse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
export const signupUserFn = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            let err = new ResponseError("User already exists");
            throw err;
        }
        const obj = { name, email };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = new UserModel({ ...obj, password: hashedPassword });
        const resp = await createdUser.save();
        // clear any existing cookie before generating a new token
        res.clearCookie(CONSTANTS.COOKIE_NAME, {
            httpOnly: true,
            domain: CONSTANTS.DOMAIN,
            signed: true,
            path: "/",
        });
        // generate a jwt token
        const token = generateToken(user?._id.toString(), user?.email);
        // set cookie in response
        res.cookie(CONSTANTS.COOKIE_NAME, token, {
            httpOnly: true,
            domain: CONSTANTS.DOMAIN,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // expires after 7d
            signed: true,
            path: "/",
        });
        res.status(201).json({ status: CONSTANTS.SUCCESS, errorMessage: null, data: resp._id });
    }
    catch (error) {
        console.log(error);
        res
            .status(error.code)
            .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
export const signinUserFn = async (req, res, next) => {
    try {
        const { email, password: pwd } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user?._id) {
            let err = new ResponseError("User not found.", 401);
            throw err;
        }
        const validatePassword = await bcrypt.compare(pwd, user.password);
        if (!validatePassword) {
            let err = new ResponseError("Username or password is incorrect.", 401);
            throw err;
        }
        // clear any existing cookie before generating a new token
        res.clearCookie(CONSTANTS.COOKIE_NAME, {
            httpOnly: true,
            domain: CONSTANTS.DOMAIN,
            signed: true,
            path: "/",
        });
        // generate a jwt token
        const token = generateToken(user?._id.toString(), user?.email);
        // set cookie in response
        res.cookie(CONSTANTS.COOKIE_NAME, token, {
            httpOnly: true,
            domain: CONSTANTS.DOMAIN,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // expires after 7d
            signed: true,
            path: "/",
        });
        const returnedUser = JSON.parse(JSON.stringify(user));
        // delete password from the returned user object
        delete returnedUser.password;
        res.status(200).json({ status: CONSTANTS.SUCCESS, errorMessage: null, data: returnedUser });
    }
    catch (error) {
        console.log(error);
        res
            .status(error.code)
            .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
//# sourceMappingURL=user.controller.js.map