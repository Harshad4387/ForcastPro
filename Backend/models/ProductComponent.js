import mongoose from "mongoose";

const productComponentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rawMaterial: { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial", required: true },
  quantityRequired: { type: Number, required: true }  // e.g. 2 pieces of wire
});

export default mongoose.model("ProductComponent", productComponentSchema);
