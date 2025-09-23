import { Request, Response } from 'express';
import SatelliteModel from '../models/Satellite';
import { IStacCollection } from '../types/IStacCollection';

export class SatelliteController {
  async createSatellite(req: Request, res: Response) {
    try {
      const satelliteData: IStacCollection = req.body;
      const existing = await SatelliteModel.findOne({ id: satelliteData.id });
      if (existing) {
        return res.status(409).json({ message: 'Satélite já existe.' });
      }

      const satellite = new SatelliteModel(satelliteData);
      await satellite.save();

      res.status(201).json({ message: "Satélite criado com sucesso!", satellite });
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
      const satellite = await SatelliteModel.findOne({ id });
      if (!satellite) {
        return res.status(404).json({ message: "Satélite não encontrado." });
      }
      res.status(200).json(satellite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar satélite.", error });
    }
  }
}
