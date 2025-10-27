import jwt from "jsonwebtoken";

const varifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("The token is: ", token);

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // attach user id to request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

export default varifyToken