// controllers/commentController.js
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
    try {
        const { listingId, text } = req.body;

        if (!listingId || !text) {
            return res.status(400).json({ message: "Listing ID and text are required" });
        }

        const comment = new Comment({
            listing: listingId,
            user: req.userId, // ✅ from verifyToken
            text,
        });

        await comment.save();

        // console.log("✅ Comment added successfully:", comment);
        res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("❌ Error adding comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getCommentsByListing = async (req, res) => {
    try {
        const { listingId } = req.params;

        const comments = await Comment.find({ listing: listingId })
            .populate("user", "name email") // ✅ show user details
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        console.error("❌ Error fetching comments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};