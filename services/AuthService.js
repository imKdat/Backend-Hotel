const userRepo = require('../repositories/userRepo');
const AppError = require("../utils/AppError");
const { comparePassword, hashPassword } = require("../utils/UtilPassword");
const { generateAccessToken } = require("../utils/jwt");

class AuthService {

    // 🔐 LOGIN
    async login(username, password) {
        const user = await userRepo.findByUsername(username);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new AppError("Invalid password", 401);
        }

        // tạo token
        const token = generateAccessToken({
            id: user.id,
            username: user.username,
            role: user.role_id
        });

        delete user.password;

        return { user, token };
    }

    // 🔐 CHANGE PASSWORD
    async changePassword(userId, oldPassword, newPassword) {
        const user = await userRepo.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isMatch = await comparePassword(oldPassword, user.password);

        if (!isMatch) {
            throw new AppError("Old password incorrect", 400);
        }

        const newHashed = await hashPassword(newPassword);

        await userRepo.updatePassword(userId, newHashed);

        return { message: "Password changed successfully" };
    }
}

module.exports = new AuthService();