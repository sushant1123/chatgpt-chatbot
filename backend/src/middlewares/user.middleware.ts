import { Request, Response, NextFunction } from "express";
import { emailRegex, passwordRegex } from "../utils/regex.js";
import Joi from "joi";
import { ResponseError } from "../utils/customClasses.js";

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
  .error(
    new ResponseError(
      "Password should have at least one uppercase, one lowercase, one digit, one special character, and a minimum length of 8"
    )
  );

export const validateUserSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
    });

    const value = await schema.validateAsync(req.body);

    if (value.error) {
      return res.status(400).json({
        status: "error",
        message: value.error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(error.code)
      .json({ status: "Failure", errorMessage: error.message, data: null });
  }
};

export const validateUserSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      email: emailSchema,
      password: passwordSchema,
    });

    const value = await schema.validateAsync(req.body);

    if (value.error) {
      return res.status(400).json({
        status: "error",
        message: value.error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failure", errorMessage: error.message, data: null });
  }
};
