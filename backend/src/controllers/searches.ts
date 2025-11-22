import { Request, Response } from "express";
import SearchesModel from "../models/Searches";
import { GeocodeService } from "../services/geocode";
import { GeoJSONFeatureCollection } from "../types/IPhotonReverse";

const geocodeService = new GeocodeService();

export class SearchesController {
  async createSearch(req: Request, res: Response) {
    try {
      const { latitude, longitude } = req.body;

      //Validando se as coordenadas fornecidas já correspondem a última busca e atualizando a data_busca se for o caso
      const lastSearch = await SearchesModel.findOne()
        .sort({ data_busca: -1 })
        .limit(1);

      if (
        lastSearch &&
        lastSearch.latitude === latitude &&
        lastSearch.longitude === longitude
      ) {
        lastSearch.data_busca = new Date();
        const updatedSearch = await lastSearch.save();
        return res.status(200).json({
          message: "As coordenadas fornecidas correspondem à última busca. Data da busca atualizada.",
          search: updatedSearch,
        });
      }
      
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
        location = `${name ?? ""}${
          district ? `${name ? ", " : ""}${district}` : ""
        }${city ? `${district || name ? ", " : ""}${city}` : ""}${
          state ? ` - ${state}` : ""
        }${country ? `, ${country}` : ""}${
          postcode ? `, ${postcode}` : ""
        }`.trim();
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
