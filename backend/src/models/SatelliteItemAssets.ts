import mongoose from "mongoose";

const SatelliteItemAssetsSchema = new mongoose.Schema({
  key: { type: String, required: true }, 
  type: String,
  roles: [String],
  title: String,
  bands: mongoose.Schema.Types.Mixed,
  satellite: { type: mongoose.Schema.Types.ObjectId, ref: "Satellite", required: true }
});

export default mongoose.model("Satellite_Item_Assets", SatelliteItemAssetsSchema);
