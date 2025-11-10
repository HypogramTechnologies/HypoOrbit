import { Request, Response } from "express";
import SearchesModel from "../models/Searches";
import { GeocodeService } from "../services/geocode";
import { GeoJSONFeatureCollection } from "../types/IPhotonReverse";

const geocodeService = new GeocodeService();

export class SearchesController {
  async createSearch(req: Request, res: Response) {
    try {
      const { latitude, longitude } = req.body;
      const data: GeoJSONFeatureCollection =
        await geocodeService.reverseGeocode(latitude, longitude);

      let location = "Localização desconhecida";

      if (data.features.length > 0) {
        const props = data.features[0]?.properties ?? {};
        const { name, district, city, state, country, postcode } = props as {
          name?: string;
          district?: string;
          city?: string;
          state?: string;
          country?: string;
          postcode?: string;
        };
        location = `${name ? name : ""}${district ? `${name ? ", " : ""}${district}` : ""}${city ? ` ${city}` : ""}${state ? ` - ${state}` : ""}${country ? `, ${country}` : ""}${postcode ? ` ${postcode}` : ""}`.trim();


      }

      const newSearch = new SearchesModel({
        latitude,
        longitude,
        localizacao: location,
      });
      const savedSearch = await newSearch.save();

      res.status(201).json({
        message: "Busca criada com sucesso!",
        search: savedSearch,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar busca.", error });
    }
  }

  async getSearches(req: Request, res: Response) {
    try {
      const searches = await SearchesModel.find().sort({ data_busca: -1 });
      res.status(200).json(searches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar buscas.", error });
    }
  }

  async getLastSearches(req: Request, res: Response) {
    try {
      const searches = await SearchesModel.find()
        .sort({ data_busca: -1 })
        .limit(5);
      res.status(200).json(searches);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar últimas buscas.", error });
    }
  }

  async deleteAllSearches(req: Request, res: Response) {
    try {
      await SearchesModel.deleteMany({});
      res.status(200).json({ message: "Todas as buscas foram deletadas." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao deletar buscas.", error });
    }
  }
}
