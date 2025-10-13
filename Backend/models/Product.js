import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },       // e.g. "1 PH DOL", "VIRAT FUSE UNIT"
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: { type: String },
  productionTime: { type: Number },             // e.g. minutes or hours
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
