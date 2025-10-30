import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    purpose: {
      type: String,
      required: true,
      enum: ["project", "support", "partnership", "career", "other"],
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
