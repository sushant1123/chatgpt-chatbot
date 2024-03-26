import jwt from "jsonwebtoken";

export const generateToken = (id: string, email: String, expiresIn?: string) => {
  const payload = { id, email };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn || "1d" });
};
