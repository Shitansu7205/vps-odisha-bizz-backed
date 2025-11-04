import Comment from "../models/Comment.js";
import ProductListing from "../models/productListing.js";
const getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Fetch listing
    const listing = await ProductListing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // 2️⃣ Fetch related comments
    const comments = await Comment.find({ listing: id })
      .populate("user", "name email") // show who posted
      .sort({ createdAt: -1 });

    // 3️⃣ Send both together
    res.status(200).json({ listing, comments });
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default getSingleListing