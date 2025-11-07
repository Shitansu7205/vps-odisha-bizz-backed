import ProductListing from "../models/productListing.js";

const listing = async (req, res) => {
  try {
    const ownerId = req.userId; // Comes from verifyToken middleware
    let { title, description, category, email, phone, address, socialMedia } = req.body;

    // ✅ Parse JSON fields (because FormData sends them as strings)
    if (typeof address === "string") address = JSON.parse(address);
    if (typeof socialMedia === "string") socialMedia = JSON.parse(socialMedia);

    // ✅ Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !email ||
      !phone ||
      !address?.district ||
      !address?.state ||
      !address?.pincode
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Handle Cloudinary upload
    const imageUrl = req.file?.path || null;        // Cloudinary URL
    const imagePublicId = req.file?.filename || ""; // Cloudinary public ID

    // ✅ Create new listing
    const newListing = new ProductListing({
      title,
      description,
      category,
      email,
      phone,
      address,
      socialMedia,
      owner: ownerId,
      imageUrl,
      imagePublicId,
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
};

export default listing;
