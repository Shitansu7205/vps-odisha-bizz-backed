import ProductListing from "../models/productListing.js";

const getlistingscategory = async (req, res) => {
    try {
        // Get category from route param
        const category = decodeURIComponent(req.params.category);

        // Find listings that match this category
        const listings = await ProductListing.find({ category });

        // If no listings found, return a friendly message
        if (!listings || listings.length === 0) {
            return res.status(404).json({ message: "No listings found for this category." });
        }

        // Send the listings back
        return res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching category listings:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default getlistingscategory;
