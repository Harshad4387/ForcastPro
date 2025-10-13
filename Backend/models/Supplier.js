import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "Bhargav Bhai"
  contactNumber: { type: String },
  email: { type: String },
  address: { type: String }
});

export default mongoose.model("Supplier", supplierSchema);
