import ProductListing from "../models/productListing.js";
const listing = async (req, res) => {
    try {
        const ownerId = req.userId; // Comes from verifyToken middleware
        const { title, description, category, email, phone, address, socialMedia } = req.body

        // Validate required fields
        if (!title || !description || !category || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new listing
        const newListing = new ProductListing({
            title,
            description,
            category,
            email,
            phone,
            address,
            socialMedia,
            owner: ownerId,
        });

        await newListing.save();

        return res.status(201).json({
            message: "Listing created successfully",
            listing: newListing,
        });

    } catch (error) {

        console.error("Error creating listing:", error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

export default listing