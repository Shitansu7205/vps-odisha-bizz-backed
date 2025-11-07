// import ProductListing from "../models/productListing.js";

// const getAllListings = async (req, res) => {
//     try {
//         const { district, category } = req.query;

//         if (!district || !category) {
//             return res.status(400).json({ products: [] });
//         }

//         const products = await ProductListing.find({
//             "address.district": { $regex: district, $options: "i" },
//             category: { $regex: category, $options: "i" },
//             status: "active",
//         }).sort({ createdAt: -1 }); // newest first

//         res.status(200).json({ products });




//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// }

// export default getAllListings










import ProductListing from "../models/productListing.js";

// Escape regex special characters
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

// Helper: extract keywords from a string
const extractKeywords = (text) => {
    if (!text) return [];
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, "") // remove special chars
        .split(/\s+/)
        .filter((word) => word.length > 3); // ignore very short words
};

const getRelatedCategories = async (req, res) => {
    try {
        const { district, category } = req.query;
        if (!district || !category) return res.status(400).json({ related: [] });

        // 1️⃣ Get all listings in the same district for the main category
        const mainListings = await ProductListing.find({
            "address.district": { $regex: district, $options: "i" },
            category: { $regex: category, $options: "i" },
            status: "active",
        }); // ✅ remove .select() to get all fields

        if (!mainListings.length) return res.status(200).json({ related: [] });

        // 2️⃣ Extract keywords from main category listings
        let keywords = [];
        mainListings.forEach((listing) => {
            keywords.push(...extractKeywords(listing.title));
            keywords.push(...extractKeywords(listing.description));
        });

        keywords = [...new Set(keywords)]; // unique keywords

        if (!keywords.length) return res.status(200).json({ related: [] });

        // 3️⃣ Find other categories in the same district matching these keywords
        const keywordRegexArr = keywords.map((word) => ({
            $or: [
                { title: { $regex: `.*${escapeRegex(word)}.*`, $options: "i" } },
                { description: { $regex: `.*${escapeRegex(word)}.*`, $options: "i" } },
            ],
        }));

        const relatedCategories = await ProductListing.distinct("category", {
            "address.district": { $regex: district, $options: "i" },
            category: { $ne: category }, // exclude main category
            status: "active",
            $or: keywordRegexArr,
        });

        // console.log("Hitted....");
        res.status(200).json({ related: relatedCategories, mainListings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export default getRelatedCategories;