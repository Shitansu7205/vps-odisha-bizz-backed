import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hash the token to match DB value
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user by token and check expiry
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful! You can now log in." });
    } catch (error) {
        // console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default resetPassword;
