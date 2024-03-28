import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { CONSTANTS } from "../utils/constants.js";

const promptSchema = Joi.string().trim().required();

export const validateCreateNewChatFn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      prompt: promptSchema,
    });

    const value = await schema.validateAsync(req.body);

    if (value.error) {
      return res.status(400).json({
        status: CONSTANTS.FAILURE,
        message: value.error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
  }
};
