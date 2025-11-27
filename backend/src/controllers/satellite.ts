import { Request, Response } from "express";
import SatelliteModel from "../models/Satellite";
import SatelliteItemAssetsModel from "../models/SatelliteItemAssets";
import { IStacCollection } from "../types/IStacCollection";
import { SatelliteService } from "../services/satellite";

const service = new SatelliteService();

export class SatelliteController {
  async createSatellite(req: Request, res: Response) {
    try {
      const satellite = await service.createSatelliteFromStac(req.body);
      if (!satellite) {
        return res.status(409).json({ message: "Satélite já existe." });
      }

      res
        .status(201)
        .json({ message: "Satélite criado com sucesso!", satellite });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar satélite.", error });
    }
  }

  async getSatellites(req: Request, res: Response) {
    try {
      const satellites = await SatelliteModel.find();
      res.status(200).json(satellites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar satélites.", error });
    }
  }

  async getSatelliteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Parâmetro 'id' é obrigatório." });
      }

      const satellite = await service.getSatelliteById(id);
      if (!satellite) {
        return res.status(404).json({ message: "Satélite não encontrado." });
      }
      res.status(200).json(satellite);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar satélite.", error });
    }
  }

  async getSatellitesWithAssets(req: Request, res: Response) {
    try {
      const satellitesWithAssets = await service.getAllSatellites();

      res.status(200).json(satellitesWithAssets);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar satélites com assets.", error });
    }
  }

  async getSatelliteByIdWithAssets(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const satellite = await SatelliteModel.findOne({ id });
      if (!satellite) {
        return res.status(404).json({ message: "Satélite não encontrado." });
      }

      const assets = await SatelliteItemAssetsModel.find({
        satellite: satellite._id,
      });

      res.status(200).json({ ...satellite.toObject(), item_assets: assets });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar satélite com assets.", error });
    }
  }
}
