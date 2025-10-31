import ProductListing from "../models/productListing.js";
import { v2 as cloudinary } from "cloudinary";

const updatelisting = async (req, res) => {
    try {
        const listingId = req.params.id;

        let {
            title,
            description,
            category,
            email,
            phone,
            address,
            socialMedia,
            status,
        } = req.body;

        // Parse JSON strings (in case they come as strings)
        if (typeof address === "string") address = JSON.parse(address);
        if (typeof socialMedia === "string") socialMedia = JSON.parse(socialMedia);

        // Find existing listing
        const existingListing = await ProductListing.findById(listingId);
        if (!existingListing) {
            return res
                .status(404)
                .json({ success: false, message: "Listing not found" });
        }

        // Keep old image details by default
        let updatedImageUrl = existingListing.imageUrl;
        let updatedPublicId = existingListing.imagePublicId;

        // If new image is uploaded
        if (req.file) {
            // Delete old image from Cloudinary (if exists)
            if (existingListing.imagePublicId) {
                try {
                    await cloudinary.uploader.destroy(existingListing.imagePublicId);
                } catch (err) {
                    console.error("❌ Error deleting old image from Cloudinary:", err);
                }
            }

            // Use new image data
            updatedImageUrl = req.file.path; // ✅ Cloudinary URL
            updatedPublicId = req.file.filename; // ✅ Cloudinary public_id
        }

        // Update listing in DB
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
                imageUrl: updatedImageUrl,
                imagePublicId: updatedPublicId,
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            listing: updatedListing,
        });
    } catch (err) {
        console.error("🔥 Error updating listing:", err.message, err.stack);
        return res
            .status(500)
            .json({ success: false, message: err.message || "Internal Server Error" });
    }
};

export default updatelisting;
