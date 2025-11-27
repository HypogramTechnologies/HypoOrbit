import SatelliteModel from "../models/Satellite";
import SatelliteItemAssetsModel from "../models/SatelliteItemAssets";
import { IStacCollection } from "../types/IStacCollection";

export class SatelliteService {
  async createSatelliteFromStac(stac: IStacCollection) {
    const { item_assets, ...satelliteData }: IStacCollection = stac;

    const existing = await SatelliteModel.findOne({ id: satelliteData.id });
    if (existing) {
      return null;
    }

    const satellite = new SatelliteModel(satelliteData);
    await satellite.save();

    if (item_assets) {
      await Promise.all(
        Object.entries(item_assets).map(([key, value]) =>
          SatelliteItemAssetsModel.create({
            key,
            ...value,
            satellite: satellite._id,
          })
        )
      );
    }

    return satellite;
  }

  async getSatelliteById(id: string) {
    const satellite = await SatelliteModel.findOne({ id }).populate(
      "item_assets"
    );

    if (!satellite) {
      return null;
    }

    return satellite;
  }

  async getAllSatellites() {
    const satellites = await SatelliteModel.find();
    const satellitesWithAssets = await Promise.all(
      satellites.map(async (sat) => {
        const assets = await SatelliteItemAssetsModel.find({
          satellite: sat._id,
        });
        return { ...sat.toObject(), item_assets: assets };
      })
    );
    return satellitesWithAssets;
  }
}
