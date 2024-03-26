import jwt from "jsonwebtoken";
export const generateToken = (id, email, expiresIn) => {
    const payload = { id, email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn || "1d" });
};
//# sourceMappingURL=token-manager.js.map