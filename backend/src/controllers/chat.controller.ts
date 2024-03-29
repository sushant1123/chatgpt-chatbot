import { NextFunction, Request, Response } from "express";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { CONSTANTS } from "../utils/constants.js";
import { UserModel } from "../models/user.model.js";
import { ResponseError } from "../utils/customClasses.js";
import { configureOpenAI } from "../configs/openai.config.js";

export const generateChatCompletionFn = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const user = await UserModel.findById(res.locals?.user?.id);

    if (!user?._id) {
      throw new ResponseError("User not registered or token malfunctioned", 401);
    }

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ content: prompt, role: "user" });
    user.chats.push({ content: prompt, role: "user" });

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    return res
      .status(200)
      .json({ status: CONSTANTS.SUCCESS, data: user.chats, errorMessage: null });
  } catch (error) {
    console.log("Error creating new chat: ", error);
    return res
      .status(error.code || 500)
      .json({ status: CONSTANTS.FAILURE, errorMessage: "Error creating new chat.", data: null });
  }
};

export const sendChatsToUserFn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //user token check
    const user = await UserModel.findById(res.locals.user.id);
    if (!user) {
      throw new ResponseError("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.user.id) {
      throw new ResponseError("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ status: CONSTANTS.SUCCESS, errorMessage: null, data: user.chats });
  } catch (error) {
    console.log(error);
    return res
      .status(error.code || 500)
      .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
  }
};

export const deleteChatsFn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //user token check
    const user = await UserModel.findById(res.locals.user.id);
    if (!user) {
      throw new ResponseError("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.user.id) {
      throw new ResponseError("Permissions didn't match", 403);
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res
      .status(200)
      .json({ status: CONSTANTS.SUCCESS, errorMessage: null, data: "Chats deleted successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(error.code || 500)
      .json({ status: CONSTANTS.FAILURE, errorMessage: error.message, data: null });
  }
};
