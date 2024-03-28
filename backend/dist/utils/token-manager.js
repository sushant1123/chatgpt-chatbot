import jwt from "jsonwebtoken";
export const generateToken = (id, email, expiresIn) => {
    const payload = { id, email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn || "7d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
//# sourceMappingURL=token-manager.js.map