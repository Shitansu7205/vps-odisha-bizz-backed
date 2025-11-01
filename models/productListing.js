import mongoose from "mongoose";

const productListingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        category: { type: String, required: true },

        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true },

        address: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },

        socialMedia: {
            facebook: { type: String },
            instagram: { type: String },
            twitter: { type: String },
            linkedin: { type: String },
            website: { type: String },
        },

        imageUrl: String,       // ✅ for Cloudinary URL
        imagePublicId: String,  // ✅ for Cloudinary ID
        
        status: {
            type: String,
            enum: ["active", "pending", "inactive"],
            default: "pending",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assuming you have a User model
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);

const ProductListing = mongoose.model("ProductListing", productListingSchema);

export default ProductListing;
