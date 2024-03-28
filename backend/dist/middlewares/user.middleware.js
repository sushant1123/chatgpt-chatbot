import Joi from "joi";
import { emailRegex, passwordRegex } from "../utils/regex.js";
import { ResponseError } from "../utils/customClasses.js";
import { CONSTANTS } from "../utils/constants.js";
import { verifyToken } from "../utils/token-manager.js";
const nameSchema = Joi.string().trim().min(3).max(30).required();
const emailSchema = Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(emailRegex))
    .error(new ResponseError("Invalid email"));
const passwordSchema = Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(new RegExp(passwordRegex))
    .required()
    .error(new ResponseError("Password should have at least one uppercase, one lowercase, one digit, one special character, and a minimum length of 8"));
export const validateUserSignup = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: nameSchema,
            email: emailSchema,
            password: passwordSchema,
        });
        const value = await schema.validateAsync(req.body);
        if (value.error) {
            return res.status(400).json({
                status: CONSTANTS.FAILURE,
                message: value.error.message,
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(error.code || 500)
            .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
export const validateUserSignin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: emailSchema,
            password: passwordSchema,
        });
        const value = await schema.validateAsync(req.body);
        if (value.error) {
            return res.status(400).json({
                status: CONSTANTS.FAILURE,
                message: value.error.message,
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
export const clearCookieFn = async (req, res, next) => {
    res.clearCookie(CONSTANTS.COOKIE_NAME, {
        httpOnly: true,
        domain: CONSTANTS.DOMAIN,
        signed: true,
    });
    next();
};
export const checkTokenStatus = (req, res, next) => {
    try {
        const token = req.signedCookies[CONSTANTS.COOKIE_NAME];
        if (!token || token.trim() === "") {
            throw new ResponseError("Token not received.", 401);
        }
        const data = verifyToken(token);
        res.locals.user = data;
        next();
    }
    catch (error) {
        console.log("checkTokenStatusError", error);
        return res
            .status(error.code || 500)
            .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
    }
};
//# sourceMappingURL=user.middleware.js.map