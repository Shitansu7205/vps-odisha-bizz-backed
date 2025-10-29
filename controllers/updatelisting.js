import ProductListing from "../models/productListing.js";

const updatelisting = async (req, res) => {
    try {
        const listingId = req.params.id;
        const {
            title,
            description,
            category,
            email,
            phone,
            address,
            socialMedia,
            status,
        } = req.body;

        // 🟢 Log incoming data (optional)
        // console.log("Updating listing:", listingId);

        // 🟢 Find and update
        const updatedListing = await ProductListing.findByIdAndUpdate(
            listingId,
            {
                title,
                description,
                category,
                email,
                phone,
                address,
                socialMedia,
                status,
            },
            {
                new: true, // return the updated document
                runValidators: true, // ensure schema validation
            }
        );

        if (!updatedListing) {
            return res
                .status(404)
                .json({ success: false, message: "Listing not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            listing: updatedListing,
        });
    } catch (err) {
        console.error("Error updating listing:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default updatelisting;
