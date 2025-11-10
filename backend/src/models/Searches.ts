import mongoose from "mongoose";

const SearchesSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  localizacao: { type: String, required: true },
  data_busca: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Searches", SearchesSchema);
