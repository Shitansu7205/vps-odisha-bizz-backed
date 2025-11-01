import ProductListing from "../models/productListing.js";
const getlistings = async (req, res) => {
    // console.log("Request received....");
    try {
        const listings = await ProductListing.find();
        
        res.status(200).json({ listings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default getlistings