const authService = require("../services/AuthService");

// LOGIN
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const { user, token } = await authService.login(username, password);

        // 🍪 set cookie (frontend KHÔNG đọc được)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // true nếu HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 1 ngày
        });

        res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

// LOGOUT
const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (err) {
        next(err);
    }
};

// CHANGE PASSWORD
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id; // lấy từ middleware auth
        const { oldPassword, newPassword } = req.body;

        const result = await authService.changePassword(
            userId,
            oldPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = {
    login,
    logout,
    changePassword
};