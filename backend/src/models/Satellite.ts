import mongoose, { Schema } from 'mongoose';
import { IStacCollection } from '../types/IStacCollection';


const SatelliteSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['Collection'], default: 'Collection' },
    stac_version: { type: String, required: true },
    stac_extensions: { type: [String], required: true },
    title: { type: String, required: true },
    version: { type: String, required: true },
    deprecated: { type: Boolean, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    providers: { type: Array, required: true },
    summaries: { type: Object, required: true },
    item_assets: { type: Object, required: false },
    properties: { type: Object, required: false },
    "bdc:type": { type: String, required: false },
    "bdc:public": { type: Boolean, required: false },
    license: { type: String, required: true },
    extent: { type: Object, required: true },
    links: { type: Array, required: true },
}, { timestamps: true });

export default mongoose.model<IStacCollection>('Satellite', SatelliteSchema);

