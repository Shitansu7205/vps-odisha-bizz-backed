import User from "../models/User.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);


        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();


        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export default signup