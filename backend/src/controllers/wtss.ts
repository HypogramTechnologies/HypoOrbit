import { Request, Response } from "express";
import { WTSSService } from "../services/wtss";
import {
  IWTSSCoverages,
  IWTSSTimesSeries,
  ICoverageMetadata,
} from "../types/IWTSSCoverages";

const service = new WTSSService();

export class WTSSController {
  // GET /wtss/coverages
  async coverages(req: Request, res: Response) {
    try {
      const data = await service.getCoverages();
      if (!data) {
        return res.status(404).json({ error: "Coverages não encontradas" });
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar coverages" });
    }
  }

  // GET /wtss/coverage/:coverage
  async coverageDetails(req: Request, res: Response) {
    const { coverage } = req.params;
    if (!coverage) {
      return res.status(400).json({ error: "Coverage não fornecida" });
    }
    try {
      const data = await service.getCoverageDetails(coverage);
      if (!data) {
        return res.status(404).json({ error: "Coverage não encontrada" });
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar detalhes da coverage" });
    }
  }

  // GET /wtss/time_series/:coverage/:attributes/:startDate/:endDate/:latitude/:longitude
  async timeSeries(req: Request, res: Response) {
    const { coverage } = req.params;
    const { attributes, startDate, endDate, latitude, longitude } = req.query;
    if (
      !coverage ||
      !attributes ||
      !startDate ||
      !endDate ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({ error: "Parâmetros insuficientes" });
    }
    try {
      const data = await service.getTimeSeries(
        coverage,
        (attributes as string).split(","),
        new Date(startDate as string),
        new Date(endDate as string),
        parseFloat(latitude as string),
        parseFloat(longitude as string)
      );
      if (!data) {
        return res.status(404).json({ error: "Série temporal não encontrada" });
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar série temporal" });
    }
  }
}
