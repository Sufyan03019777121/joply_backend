import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }, // field name consistent
  },
  { timestamps: true }
);

export default mongoose.model("Logo", logoSchema);
