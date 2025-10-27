import User from "../models/User.js";

const dashboard = async (req, res) => {
    try {
        // Fetch all users, exclude password
        const users = await User.find().select("-password");
        res.status(200).json({ users });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default dashboard