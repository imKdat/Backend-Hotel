const { verifyAccessToken } = require("../utils/jwt");
const models = require("../models");
const AppError = require("../utils/AppError");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        console.log("COOKIES:", req.cookies);
        console.log("TOKEN:", req.cookies.accessToken);
        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

        // 1. Decode token
        const decoded = verifyAccessToken(token);

        // 2. Tìm user trong DB
        const user = await models.users.findByPk(decoded.id);

        if (!user) {
            throw new AppError("User not found", 401);
        }
        console.log("TOKEN:", token);
        console.log("DECODED:", decoded);
        // 3. Gán vào request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        next(new AppError("Invalid or expired token", 401));
    }
};

module.exports = authMiddleware;