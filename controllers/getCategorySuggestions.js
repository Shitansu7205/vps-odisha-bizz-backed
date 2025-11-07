import ProductListing from "../models/productListing.js";

// Escape regex special characters
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const getCategorySuggestions = async (req, res) => {
  try {
    const { q, district } = req.query;
    if (!q || !district) return res.status(400).json({ suggestions: [] });

    // Split query into words
    const keywords = q.trim().split(/\s+/);

    // Build $or array for regex matching
    const regexArr = keywords.map((word) => ({
      category: { $regex: `.*${escapeRegex(word)}.*`, $options: "i" },
    }));

    const categories = await ProductListing.distinct("category", {
      "address.district": { $regex: district, $options: "i" },
      $or: regexArr,
      status: "active",
    });

    res.status(200).json({ suggestions: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default getCategorySuggestions;
