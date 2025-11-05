import mongoose from "mongoose";
import slugify from "slugify";
import shortid from "shortid";

const productListingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        slug: { type: String, unique: true, lowercase: true },
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


// Pre-save middleware to generate SEO-friendly slug
productListingSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        const baseSlug = slugify(this.title, { lower: true, strict: true });

        // Check for existing slugs and make unique if needed  
        const existing = await mongoose.models.ProductListing.findOne({ slug: baseSlug });
        if (existing && existing._id.toString() !== this._id.toString()) {
            this.slug = `${baseSlug}-${shortid.generate()}`; // append short id  
        } else {
            this.slug = baseSlug;
        }

    }
    next();
});



const ProductListing = mongoose.model("ProductListing", productListingSchema);

export default ProductListing;
