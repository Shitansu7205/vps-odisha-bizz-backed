import ProductListing from "../models/productListing.js";

const getAnalytics = async (req, res) => {
  try {
    // Optional filters from query
    const { category, state, status } = req.query;

    // Build match stage dynamically
    const match = {};
    if (category) match.category = category.trim().toLowerCase();
    if (state) match["address.state"] = state.trim().toLowerCase();
    if (status) match.status = status.trim().toLowerCase();

    // Aggregation pipeline
    const aggregationPipeline = [
      { $match: match },
      {
        $facet: {
          totalListings: [{ $count: "count" }],
          byCategory: [
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byState: [
            { $group: { _id: "$address.state", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byDistrict: [
            { $group: { _id: "$address.district", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ];

    const result = await ProductListing.aggregate(aggregationPipeline);

    const analytics = {
      totalListings: result[0].totalListings[0]?.count || 0,
      byCategory: result[0].byCategory,
      byState: result[0].byState,
      byDistrict: result[0].byDistrict,
      byStatus: result[0].byStatus,
    };

    res.status(200).json({ success: true, data: analytics });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default getAnalytics;
