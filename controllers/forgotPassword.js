import crypto from "crypto";
import User from "../models/User.js";
import { Resend } from "resend";

// Initialize Resend (make sure your API key is in .env)
const resend = new Resend(process.env.RESEND_API_KEY);

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const findUserEmail = await User.findOne({ email });
        if (!findUserEmail) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        // Save token + expiry to DB
        findUserEmail.resetPasswordToken = hashedToken;
        findUserEmail.resetPasswordExpires = tokenExpiry;
        await findUserEmail.save({ validateBeforeSave: false });

        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send email via Resend
        await resend.emails.send({
            from: "Odisha Bizz <noreply@thetechtide.site>", // ✅ Use your domain or verified sender
            to: findUserEmail.email,
            subject: "Password Reset Request",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #b6985a;">Password Reset Request</h2>
          <p>Hello ${findUserEmail.name || "User"},</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <p>
            <a href="${resetLink}" 
               style="background-color: #b6985a; color: white; padding: 10px 20px; 
                      border-radius: 5px; text-decoration: none; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 15 minutes.</p>
          <hr />
          <p>If you didn’t request this, please ignore this email.</p>
          <p style="font-size: 12px; color: gray;">&copy; Odisha Bizz</p>
        </div>
      `,
        });

        // console.log("✅ Reset link sent to:", findUserEmail.email);
        return res.status(200).json({ message: "Reset link sent successfully", resetLink });
    } catch (error) {
        // console.error("❌ Error in forgotPassword:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export default forgotPassword;
