import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "CONTACTOR UNIT", "FUSE UNIT"
  description: { type: String }
});

export default mongoose.model("Category", categorySchema);
