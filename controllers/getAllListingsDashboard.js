import ProductListing from "../models/productListing.js";

const getAllListingsDashboard = async (req, res) => {
  try {
    const { category, status, state, page = 1, limit = 10 } = req.query;

    // Dynamically build the filter
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (state) filter["address.state"] = state;

    const skip = (Number(page) - 1) * Number(limit);

    const listings = await ProductListing.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await ProductListing.countDocuments(filter);

    res.status(200).json({
      listings,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllListingsDashboard;
