import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONSTANTS } from "./constants.js";

export const generateToken = (id: string, email: String, expiresIn?: string) => {
  const payload = { id, email };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn || "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
