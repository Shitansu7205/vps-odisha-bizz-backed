import ProductListing from "../models/productListing.js";
const deletelisting = async (req, res) => {
    try {

        const listingId = req.params.id;
        const deletedListing = await ProductListing.findByIdAndDelete(listingId);


        if (!deletedListing) {
            return res
                .status(404)
                .json({ success: false, message: "Listing not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Listing deleted successfully",
            deletedListing,
        });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export default deletelisting