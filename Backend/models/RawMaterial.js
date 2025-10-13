import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },          // e.g. "PCB", "WIRE", "STICKER"
  specification: { type: String },                 // e.g. "5A", "220V"
  unit: { type: String, default: "pcs" },          // e.g. pcs, meter, kg
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  stockQuantity: { type: Number, default: 0 },
  reorderLevel: { type: Number, default: 10 }
});

export default mongoose.model("RawMaterial", rawMaterialSchema);
