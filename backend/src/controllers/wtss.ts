import { Request, Response } from "express";
import { WTSSService } from "../services/wtss";
import {
  IWTSSCoverages,
  IWTSSTimesSeries,
  ICoverageMetadata,
  IBand,
  IAttributesCoverages,
} from "../types/IWTSSCoverages";
import { get } from "http";

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
    const { coverage, attributes, startDate, endDate, latitude, longitude } =
      req.params;
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
        coverage as string,
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

  async attributesCoverages(req: Request, res: Response) {
    const { coverages } = req.body as { coverages?: string[] };
    if (!coverages || !Array.isArray(coverages)) {
      return res.status(400).json({ error: "Coverages inválidas" });
    }
    try {
      const coverageAttributes: IAttributesCoverages[] =
        await service.getAttributesCoverages(coverages);

      if (!coverageAttributes) {
        return res
          .status(404)
          .json({ error: "Atributos das coverages não encontrados" });
      }
      return res.json({ coverages: coverageAttributes });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar atributos das coverages" });
    }
  }

  async timeSeriesCoverages(req: Request, res: Response) {
    const { coverages, startDate, endDate, latitude, longitude } = req.body as {
      coverages?: string[];
      startDate?: string;
      endDate?: string;
      latitude?: number;
      longitude?: number;
    };

    if (
      !coverages?.length ||
      !startDate ||
      !endDate ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({ error: "Parâmetros insuficientes" });
    }

    try {
      const coverageAttributes = await service.getAttributesCoverages(
        coverages
      );
      if (!coverageAttributes?.length) {
        return res.status(404).json({
          error: "Atributos das coverages não encontrados",
        });
      }

      const coveragesTimesSeries: IWTSSTimesSeries[] = [];

      for (const { coverage, attributes } of coverageAttributes) {
        if (!attributes?.length) continue;

        const timesSeries = await service.getTimeSeries(
          coverage,
          attributes,
          new Date(startDate),
          new Date(endDate),
          latitude,
          longitude
        );

        coveragesTimesSeries.push(timesSeries);
      }

      return res.json({ timeSeries: coveragesTimesSeries });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar séries temporais das coverages" });
    }
  }

  async statisticsTimeSeriesCoverages(req: Request, res: Response) {
    const coveragesTimesSeries = req.body.timeSeries as IWTSSTimesSeries[];
    if (!coveragesTimesSeries || !Array.isArray(coveragesTimesSeries)) {
      return res.status(400).json({ error: "Séries temporais inválidas" });
    }
    try {
      const statistics = await service.calculateStatistics(coveragesTimesSeries);
      /* console.log("statistics:");
      console.log(statistics); */
      return res.json({ statistics });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao calcular estatísticas das séries temporais" });
    }
  }

  async getUpdateTime(req: Request, res: Response) {
    const { coverage } = req.params;
    if (!coverage) return res.status(400).json({ error: 'Coverage não fornecida' });

    try {
      const updateTime = await service.getCoverageUpdateTime(coverage);
      res.json({ updateTime });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao recuperar tempo de atualização' });
    }
  }

}
