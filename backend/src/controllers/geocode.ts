import { Request, Response } from "express";
import { GeocodeService } from "../services/geocode";
import { PhotonResponse } from "../types/IPhoton";

const service = new GeocodeService();

export class GeocodeController {
  // GET /geocode/search/?q=
  async address(req: Request, res: Response) {
    const address = req.query.q as string;
    if (!address) {
      return res.status(400).json({ error: "Endereço não fornecido" });
    }
    try {
      const data: PhotonResponse = await service.getAddress(address);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar endereço" });
    }
  }

  // GET /geocode/search/?q=
  async coordinates(req: Request, res: Response) {
    const address = req.query.q as string;
    if (!address){
      return res.status(400).json({ error: "Endereço não fornecido" });
    }
    try {
      const data: PhotonResponse = await service.getAddress(address);
      if (data.features.length === 0 || !data.features[0]) {
        throw new Error("Endereço não encontrado");
      }
      const geometry = data.features[0].geometry;
      if (!geometry || !geometry.coordinates) {
        throw new Error("Coordenadas não encontradas");
      }
      const [lon, lat] = geometry.coordinates;
      return res.json({ lat, lon });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao recuperar coordenadas" });
    }
  }
}
