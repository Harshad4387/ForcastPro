import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema({
  rawMaterial: { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial", required: true },
  type: { type: String, enum: ["IN", "OUT"], required: true },  // IN = purchase, OUT = used
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  notes: { type: String }
});

export default mongoose.model("InventoryTransaction", inventoryTransactionSchema);
